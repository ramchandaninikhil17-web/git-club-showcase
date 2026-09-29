import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Project, showcaseService } from '@/services/showcase';
import { ProjectCard, Visual } from '@/components/ProjectCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { HeroGitGraph } from '@/components/HeroGitGraph';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Search,
  Github,
  Sparkles,
  GitBranch,
} from 'lucide-react';

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<{ name: string; count: number; type: string; color: string }[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroSearch, setHeroSearch] = useState('');
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = 'Git Club CHARUSAT — Project Showcase';
    Promise.all([
      showcaseService.listProjects(),
      showcaseService.listTechnologies(),
      showcaseService.listCategories()
    ])
      .then(([p, t, c]) => {
        setProjects(p);
        setTechnologies(t);
        setCategories(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.filter((p) => p.featured);
  const spotlight = featured[0] || projects[0];

  const previewProjects = projects.filter((p) =>
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setLocation(`/projects?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      setLocation('/projects');
    }
  };

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="grid-paper relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-[1380px] px-5 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column: Heading, Value Prop, Search */}
            <div className="animate-rise">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="mono text-[11px] tracking-wide uppercase">GIT CLUB · CSPIT · CHARUSAT</span>
              </div>

              {/* Main Headline */}
              <h1 className="display mt-5 text-[clamp(2rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-foreground break-words">
                Projects Built by <br />
                <span className="text-primary inline-flex items-center gap-2">
                  Git Club Members<span className="font-mono text-accent">.</span>
                </span>
              </h1>

              {/* Subtitle - crystal clear purpose */}
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                An open engineering showcase of student-built software, developer tools, and campus technical initiatives engineered by students at CHARUSAT.
              </p>

              {/* Search quick jump */}
              <form onSubmit={handleHeroSearch} className="mt-8 max-w-md">
                <div className="relative flex items-center shadow-xs">
                  <Search className="absolute left-4 text-muted-foreground" size={16} />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search projects, technologies, or authors..."
                    className="w-full rounded-2xl border border-border bg-card pl-11 pr-24 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  data-testid="link-hero-explore"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://github.com/gitclub-charusat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
                >
                  <Github size={15} />
                  <span>GitHub Org</span>
                  <ArrowUpRight size={13} className="text-muted-foreground" />
                </a>

                <Link
                  href="/featured"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>Featured Case Studies</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* 3D Floating Feature Pills */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/70">
                <div className="animate-float-3d flex items-center gap-1.5 rounded-full border border-primary/40 bg-card/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="mono text-[10px] text-primary font-bold">100% Student Engineered</span>
                </div>
                <div className="animate-float-3d-delayed flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-2xs backdrop-blur-md">
                  <span className="mono text-[10px]">CSPIT · CHARUSAT</span>
                </div>
                <div className="animate-float-3d flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-2xs backdrop-blur-md">
                  <span className="mono text-[10px]">Edge Architecture</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Git Branch Visual */}
            <div className="animate-rise delay-1">
              <HeroGitGraph />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROJECT (HERO SPOTLIGHT) */}
      {spotlight && (
        <section className="border-b border-border bg-card/40 py-16 lg:py-20">
          <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  <Sparkles size={12} />
                  <span className="mono text-[10px] uppercase font-bold tracking-wider">
                    FEATURED PROJECT
                  </span>
                </div>
                <h2 className="display mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  Spotlight: {spotlight.name}
                </h2>
              </div>
              <Link
                href={`/projects/${spotlight.slug}`}
                className="mono text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Read Full Case Study</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Featured Project 3D Stage Card */}
            <div className="perspective-1200 relative">
              <div className="preserve-3d rounded-3xl border border-border/90 bg-card p-6 sm:p-8 lg:p-10 shadow-2xl club-card-glow relative overflow-hidden transition-all duration-300">
                {/* 3D ambient glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
                  {/* Left: Project Visual Preview with 3D Depth */}
                  <div className="preserve-3d layer-depth-2 relative rounded-2xl border border-border bg-muted/20 overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.01]">
                    <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2 text-xs mono">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/70" />
                        <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-[11px] text-muted-foreground truncate">
                          gitclub-charusat/{spotlight.slug}
                        </span>
                      </div>
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {spotlight.status}
                      </span>
                    </div>

                    <Visual
                      project={spotlight}
                      className="aspect-[1.65] w-full"
                    />
                  </div>

                  {/* Right: Project Details with 3D Layer Elevation */}
                  <div className="preserve-3d layer-depth-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-0.5 rounded-md">
                        {spotlight.category}
                      </span>
                      <span className="mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-semibold">
                        {spotlight.year}
                      </span>
                    </div>

                    <h3 className="display mt-3 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {spotlight.name}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base font-medium text-primary">
                      {spotlight.tagline}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {spotlight.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-5">
                      <p className="mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2">
                        Key Technologies:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {spotlight.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="mono rounded-lg border border-border/80 bg-muted/60 px-2.5 py-1 text-xs font-semibold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contributors */}
                    <div className="mt-5 border-t border-border/70 pt-4">
                      <p className="mono text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2">
                        Contributors:
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {spotlight.team.map((person) => (
                          <div
                            key={person.name}
                            className="flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1 text-xs"
                          >
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary text-[8px] font-bold text-secondary-foreground">
                              {person.initials}
                            </span>
                            <span className="font-semibold text-foreground">{person.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border/70 pt-5">
                    {spotlight.demoUrl && (
                      <a
                        href={spotlight.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
                      >
                        <span>Open Live Demo</span>
                        <ExternalLink size={13} />
                      </a>
                    )}

                    <a
                      href={spotlight.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                      <ArrowUpRight size={12} className="text-muted-foreground" />
                    </a>

                    <Link
                      href={`/projects/${spotlight.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs sm:text-sm font-bold text-primary hover:bg-primary/20 transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. PROJECT EXPLORER */}
      <section className="mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
              PROJECT EXPLORER
            </p>
            <h2 className="display mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Software with a point of view.
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
              Filter by category or explore the complete directory of verified student software.
            </p>
          </div>

          <Link
            href="/projects"
            data-testid="link-home-featured"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            <span>Browse All {projects.length} Projects</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Category Pill Filters */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-border bg-card p-4 space-y-4">
                <div className="aspect-[1.62] rounded-xl bg-muted" />
                <div className="h-4 w-1/3 rounded bg-muted" />
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-10 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewProjects.slice(0, 6).map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onQuickView={setQuickViewProject}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs sm:text-sm font-bold text-foreground hover:border-primary/50 hover:bg-muted transition-colors shadow-xs"
          >
            <span>Explore All {projects.length} Projects in the Directory</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 4. TECHNOLOGY DISCOVERY */}
      <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
                TECHNOLOGY TOOLBOX
              </p>
              <h2 className="display mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Built with modern stacks.
              </h2>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
                Git Club builders choose practical, production-ready tools tailored to each problem.
              </p>
            </div>

            <Link
              href="/technologies"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
            >
              <span>View Full Stack Directory</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 perspective-1000">
            {technologies.slice(0, 6).map((tech) => (
              <Link
                key={tech.name}
                href={`/projects?tech=${encodeURIComponent(tech.name)}`}
                className="group preserve-3d flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="layer-depth-2 flex items-center justify-between">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: `${tech.color}18`, color: tech.color }}
                  >
                    {tech.name.slice(0, 2)}
                  </span>
                  <span className="mono text-[10px] font-semibold text-muted-foreground">
                    {tech.count} {tech.count === 1 ? 'project' : 'projects'}
                  </span>
                </div>
                <div className="layer-depth-1 mt-5">
                  <p className="display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mono mt-0.5">{tech.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SMALL GIT CLUB IDENTITY BANNER */}
      <section className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl">
            <span className="mono text-[10px] font-bold uppercase tracking-wider text-primary">
              GIT CLUB · CSPIT · CHARUSAT
            </span>
            <h3 className="display mt-1.5 text-xl sm:text-2xl font-bold text-foreground">
              Official Student Tech Community
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Empowering students at Chandubhai S. Patel Institute of Technology to build, share, and ship open-source engineering projects.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:scale-[1.02] transition-transform"
            >
              <GitBranch size={13} />
              <span>Explore Projects</span>
            </Link>

            <a
              href="https://github.com/gitclub-charusat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={11} className="text-muted-foreground" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        project={quickViewProject}
        onClose={() => setQuickViewProject(null)}
      />
    </main>
  );
}
