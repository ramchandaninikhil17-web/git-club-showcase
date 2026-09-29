import { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearch, Link } from 'wouter';
import { Project, showcaseService } from '@/services/showcase';
import { ProjectCard } from '@/components/ProjectCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  X,
  Columns3,
  ArrowUpRight,
  Filter,
  Check,
  ExternalLink,
  Github
} from 'lucide-react';

function parseRecency(str: string): number {
  if (str.toLowerCase().includes('yesterday')) return 1;
  const daysMatch = str.match(/(\d+)\s+day/);
  if (daysMatch) return Number(daysMatch[1]);
  const weeksMatch = str.match(/(\d+)\s+week/);
  if (weeksMatch) return Number(weeksMatch[1]) * 7;
  const monthsMatch = str.match(/(\d+)\s+month/);
  if (monthsMatch) return Number(monthsMatch[1]) * 30;
  return 999;
}

export function ProjectsPage() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  // Extract query parameters from URL reactively
  const searchParams = useMemo(() => new URLSearchParams(searchString), [searchString]);

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';
  const techParam = searchParams.get('tech') || 'All';
  const statusParam = searchParams.get('status') || 'All';
  const yearParam = searchParams.get('year') || 'All';
  const sortParam = searchParams.get('sort') || 'Featured';
  const viewParam = (searchParams.get('view') as 'grid' | 'list') || 'grid';
  const compareParam = (searchParams.get('compare') || '').split(',').filter(Boolean);

  const [queryInput, setQueryInput] = useState(queryParam);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(viewParam);

  // Set document title
  useEffect(() => {
    document.title = 'Projects Directory — Git Club CHARUSAT';
  }, []);

  const loadProjects = () => {
    setLoading(true);
    setError(false);
    showcaseService.listProjects()
      .then((items) => setData(items))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Sync query input when URL changes
  useEffect(() => {
    setQueryInput(queryParam);
  }, [queryParam]);

  // Sync viewMode when URL changes
  useEffect(() => {
    setViewMode(viewParam);
  }, [viewParam]);

  // Debounced search update to URL
  useEffect(() => {
    const handler = setTimeout(() => {
      if (queryInput !== queryParam) {
        updateFilter('q', queryInput);
      }
    }, 200);
    return () => clearTimeout(handler);
  }, [queryInput, queryParam]);

  // Helper to update URL search parameters
  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All' || (key === 'sort' && value === 'Featured')) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    const queryString = next.toString();
    setLocation(`/projects${queryString ? `?${queryString}` : ''}`);
  };

  const clearAllFilters = () => {
    setQueryInput('');
    setLocation('/projects');
  };

  // Extract dynamic filter lists from projects data
  const categories = useMemo(() => ['All', ...Array.from(new Set(data.map((p) => p.category)))], [data]);
  const technologies = useMemo(() => {
    const set = new Set<string>();
    data.forEach((p) => p.stack.forEach((tech) => set.add(tech)));
    return ['All', ...Array.from(set).sort()];
  }, [data]);
  const statuses = ['All', 'Live', 'Beta', 'Research'];
  const years = useMemo(() => ['All', ...Array.from(new Set(data.map((p) => p.year))).sort().reverse()], [data]);

  // Filtering & Sorting logic
  const filteredProjects = useMemo(() => {
    const q = queryParam.toLowerCase().trim();

    return data.filter((project) => {
      // Category filter
      if (categoryParam !== 'All' && project.category !== categoryParam) return false;

      // Technology filter
      if (techParam !== 'All' && !project.stack.includes(techParam)) return false;

      // Status filter
      if (statusParam !== 'All' && project.status !== statusParam) return false;

      // Year filter
      if (yearParam !== 'All' && project.year !== yearParam) return false;

      // Search query across ALL relevant metadata
      if (q) {
        const teamNames = project.team.map((t) => t.name).join(' ');
        const tags = project.tags.join(' ');
        const stack = project.stack.join(' ');
        const searchCorpus = `${project.name} ${project.tagline} ${project.description} ${project.category} ${project.department} ${stack} ${tags} ${teamNames}`.toLowerCase();
        if (!searchCorpus.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortParam) {
        case 'Newest':
          return b.year.localeCompare(a.year) || a.name.localeCompare(b.name);
        case 'Recently Updated':
          return parseRecency(a.updatedAt) - parseRecency(b.updatedAt);
        case 'A—Z':
          return a.name.localeCompare(b.name);
        case 'Featured':
        default:
          return (Number(b.featured) - Number(a.featured)) || (Number(b.verified) - Number(a.verified)) || a.name.localeCompare(b.name);
      }
    });
  }, [data, queryParam, categoryParam, techParam, statusParam, yearParam, sortParam]);

  // Compare handlers
  const toggleCompare = (project: Project) => {
    const next = compareParam.includes(project.slug)
      ? compareParam.filter((s) => s !== project.slug)
      : compareParam.length < 3
      ? [...compareParam, project.slug]
      : compareParam;
    updateFilter('compare', next.join(','));
  };

  const removeCompare = (slug: string) => {
    const next = compareParam.filter((s) => s !== slug);
    updateFilter('compare', next.join(','));
  };

  const clearCompare = () => {
    updateFilter('compare', '');
  };

  const activeFilterCount = (categoryParam !== 'All' ? 1 : 0) +
    (techParam !== 'All' ? 1 : 0) +
    (statusParam !== 'All' ? 1 : 0) +
    (yearParam !== 'All' ? 1 : 0) +
    (queryParam ? 1 : 0);

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-12 lg:px-10 lg:py-16">
        {/* Header */}
        <div className="max-w-3xl animate-rise">
          <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
            THE PROJECT DIRECTORY · CSPIT CHARUSAT
          </p>
          <h1 className="display mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Explore Verified <span className="text-primary">Software.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Browse verified Git Club software, developer tools, and student initiatives by problem domain, tech stack, or campus initiative. Every card includes verified repository links, live demos, and technical breakdowns.
          </p>
        </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              data-testid="input-project-search"
              placeholder="Search by title, stack, department, or problem..."
              className="w-full rounded-xl border border-border/80 bg-muted/50 pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/15"
            />
            {queryInput && (
              <button
                type="button"
                onClick={() => setQueryInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Quick Category Buttons on desktop */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => updateFilter('category', cat)}
                data-testid={`button-filter-${cat.toLowerCase().replaceAll(' ', '-')}`}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  categoryParam === cat
                    ? 'bg-secondary text-secondary-foreground shadow-2xs font-bold'
                    : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortParam}
              onChange={(e) => updateFilter('sort', e.target.value)}
              data-testid="select-project-sort"
              className="rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-semibold text-foreground outline-none cursor-pointer hover:bg-muted"
            >
              <option value="Featured">Featured</option>
              <option value="Newest">Newest</option>
              <option value="Recently Updated">Recently Updated</option>
              <option value="A—Z">A—Z</option>
            </select>

            {/* Layout Toggle (Grid vs List) */}
            <div className="flex items-center rounded-xl border border-border bg-muted/40 p-0.5">
              <button
                type="button"
                onClick={() => {
                  setViewMode('grid');
                  updateFilter('view', 'grid');
                }}
                className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-card text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('list');
                  updateFilter('view', 'list');
                }}
                className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-card text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Repository List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter Row: Tech, Status, Year */}
        <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
            <Filter size={13} />
            <span>Filters:</span>
          </div>

          {/* Category Dropdown (for overflow) */}
          <select
            value={categoryParam}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground outline-none cursor-pointer"
          >
            <option value="All">Category: All</option>
            {categories.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Tech Dropdown */}
          <select
            value={techParam}
            onChange={(e) => updateFilter('tech', e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground outline-none cursor-pointer"
          >
            <option value="All">Stack: All Technologies</option>
            {technologies.filter((t) => t !== 'All').map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusParam}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground outline-none cursor-pointer"
          >
            <option value="All">Status: All</option>
            {statuses.filter((s) => s !== 'All').map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={yearParam}
            onChange={(e) => updateFilter('year', e.target.value)}
            className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground outline-none cursor-pointer"
          >
            <option value="All">Year: All</option>
            {years.filter((y) => y !== 'All').map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Active Filter Chips & Clear */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              data-testid="button-clear-filters"
              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <RotateCcw size={12} /> Clear all filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count & Active Chips */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          {loading ? 'Querying archive...' : `${filteredProjects.length.toString().padStart(2, '0')} projects found`}
        </p>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {categoryParam !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Category: {categoryParam}
                <button type="button" onClick={() => updateFilter('category', 'All')}><X size={12} /></button>
              </span>
            )}
            {techParam !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Stack: {techParam}
                <button type="button" onClick={() => updateFilter('tech', 'All')}><X size={12} /></button>
              </span>
            )}
            {statusParam !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Status: {statusParam}
                <button type="button" onClick={() => updateFilter('status', 'All')}><X size={12} /></button>
              </span>
            )}
            {yearParam !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Year: {yearParam}
                <button type="button" onClick={() => updateFilter('year', 'All')}><X size={12} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Projects Display: Grid or List */}
      {error ? (
        <div className="my-12 rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-bold text-foreground">The archive encountered an issue loading repositories.</p>
          <p className="mt-2 text-sm text-muted-foreground">Check your connection and try loading the project list again.</p>
          <button
            type="button"
            onClick={loadProjects}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            <RotateCcw size={13} /> Retry Load
          </button>
        </div>
      ) : loading ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="animate-pulse rounded-2xl border border-border bg-card p-4 space-y-4">
              <div className="aspect-[1.58] rounded-xl bg-muted" />
              <div className="h-4 w-1/3 rounded bg-muted" />
              <div className="h-6 w-3/4 rounded bg-muted" />
              <div className="h-10 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="mt-12 rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center max-w-xl mx-auto">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-card text-muted-foreground shadow-xs">
            <Search size={24} />
          </span>
          <h2 className="display mt-5 text-2xl font-bold text-foreground">
            No projects match this trail.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {queryParam
              ? `No software currently matches "${queryParam}". Try clearing a filter or searching with different keywords.`
              : 'Try widening your category or technology filters.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['TypeScript', 'Cloudflare Workers', 'Git', 'React', 'Tailwind CSS'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setQueryInput(term);
                  updateFilter('q', term);
                }}
                className="mono rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground transition-colors cursor-pointer"
              >
                + Try "{term}"
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className={`mt-6 ${viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}`}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              layout={viewMode}
              onCompare={toggleCompare}
              comparing={compareParam.includes(project.slug)}
              onQuickView={setQuickViewProject}
            />
          ))}
        </div>
      )}

      {/* Comparison Section (if projects selected) */}
      {compareParam.length > 1 && (
        <section id="comparison-matrix" className="mt-20 scroll-mt-24 rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
                SIDE-BY-SIDE MATRIX
              </p>
              <h2 className="display mt-2 text-2xl sm:text-3xl font-extrabold text-foreground">
                Comparing {compareParam.length} Projects
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Evaluate problem spaces, architectural decisions, and technical impact side by side.
              </p>
            </div>
            <button
              type="button"
              onClick={clearCompare}
              className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Clear Comparison
            </button>
          </div>

          <div className={`mt-8 grid gap-5 ${compareParam.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {data.filter((p) => compareParam.includes(p.slug)).map((project) => (
              <div key={project.slug} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="mono text-[10px] uppercase font-bold text-muted-foreground">
                          {project.category} · {project.year}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                          style={{ color: project.accent, backgroundColor: `${project.accent}15` }}
                        >
                          {project.status}
                        </span>
                      </div>
                      <h3 className="display mt-1.5 text-xl font-bold text-foreground">{project.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCompare(project.slug)}
                      className="rounded-lg p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Remove from comparison"
                      aria-label={`Remove ${project.name} from comparison`}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground font-medium">{project.tagline}</p>

                  {/* Problem & Solution Snippet */}
                  {project.brief && (
                    <div className="mt-4 rounded-xl bg-muted/40 p-3 text-[11px] space-y-1.5">
                      <p className="text-foreground/90 font-semibold leading-relaxed">
                        <span className="text-muted-foreground font-normal">Challenge: </span>
                        {project.brief.problemBrief}
                      </p>
                      <p className="text-primary font-semibold leading-relaxed">
                        <span className="text-muted-foreground font-normal">Answer: </span>
                        {project.brief.innovationBrief}
                      </p>
                    </div>
                  )}

                  {/* Key Metrics */}
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border/70 p-2.5 text-center">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="display text-base font-bold" style={{ color: project.accent }}>
                          {m.value}
                        </p>
                        <p className="text-[9px] text-muted-foreground leading-tight truncate">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 border-t border-border pt-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Stars / Forks:</span>
                      <span className="mono font-semibold text-foreground">{project.stars} ★ / {project.forks} ⑂</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="text-foreground text-[11px] truncate max-w-[170px]" title={project.department}>
                        {project.department}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">License:</span>
                      <span className="mono text-foreground">{project.license}</span>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="mono rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:scale-[1.02] transition-transform"
                  >
                    <span>Full Case Study</span>
                    <ArrowUpRight size={13} />
                  </Link>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-card text-foreground hover:bg-muted"
                    title="GitHub"
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <Github size={14} />
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-card text-foreground hover:bg-muted"
                      title="Live Demo"
                      aria-label={`Open ${project.name} Live Demo`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating Compare Tray if 1+ selected */}
      {compareParam.length > 0 && (
        <aside
          aria-label="Project comparison tray"
          className="fixed inset-x-0 bottom-5 z-30 mx-auto flex max-w-xl items-center gap-3 rounded-2xl border border-primary/30 bg-card/95 p-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto scrollbar-none">
            {compareParam.map((slug) => {
              const p = data.find((proj) => proj.slug === slug);
              return p ? (
                <button
                  type="button"
                  key={slug}
                  onClick={() => removeCompare(slug)}
                  className="flex items-center gap-1.5 rounded-full bg-muted border border-border px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-muted/80 whitespace-nowrap"
                  title="Click to remove"
                >
                  <span>{p.name}</span>
                  <X size={12} className="text-muted-foreground" />
                </button>
              ) : null;
            })}
          </div>

          {compareParam.length === 1 && (
            <span className="text-[11px] text-primary font-medium hidden sm:inline">
              Select 1 more to compare
            </span>
          )}

          {compareParam.length > 1 && (
            <button
              type="button"
              onClick={() => document.getElementById('comparison-matrix')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:scale-[1.02] transition-transform whitespace-nowrap cursor-pointer"
            >
              <Columns3 size={13} />
              <span>Compare ({compareParam.length})</span>
            </button>
          )}

          <span className="mono text-[11px] text-muted-foreground shrink-0">
            {compareParam.length}/3
          </span>

          <button
            type="button"
            onClick={clearCompare}
            className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Clear all"
            aria-label="Clear all compared projects"
          >
            <X size={14} />
          </button>
        </aside>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        project={quickViewProject}
        onClose={() => setQuickViewProject(null)}
      />
    </main>
  );
}
