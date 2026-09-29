import { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { Project, showcaseService } from '@/services/showcase';
import { Visual, ProjectCard } from '@/components/ProjectCard';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react';

export function ProjectDetailPage() {
  const [, params] = useRoute('/projects/:slug');
  const slug = params?.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedClone, setCopiedClone] = useState(false);
  const [galleryViewer, setGalleryViewer] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    setLoading(true);
    Promise.all([
      showcaseService.getProject(slug),
      showcaseService.listProjects()
    ])
      .then(([curr, list]) => {
        setProject(curr || null);
        setAllProjects(list);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Update dynamic document title
  useEffect(() => {
    if (project) {
      document.title = `${project.name} — Git Club CHARUSAT`;
    }
    return () => {
      document.title = 'Git Club CHARUSAT — Project Showcase';
    };
  }, [project]);

  // Lightbox keyboard controls and scroll lock
  useEffect(() => {
    if (galleryViewer === null || !project?.gallery?.length) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGalleryViewer(null);
      } else if (e.key === 'ArrowRight') {
        setGalleryViewer((prev) => (prev !== null ? (prev + 1) % project.gallery.length : null));
      } else if (e.key === 'ArrowLeft') {
        setGalleryViewer((prev) =>
          prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryViewer, project]);

  if (loading) {
    return (
      <main className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-10 w-2/3 rounded bg-muted" />
          <div className="aspect-[2.2] w-full rounded-3xl bg-muted" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-[1380px] px-5 py-24 text-center lg:px-10">
        <p className="mono text-xs uppercase tracking-widest text-primary font-bold">404 / NOT FOUND</p>
        <h1 className="display mt-4 text-3xl sm:text-5xl font-bold">Project not found</h1>
        <p className="mt-3 text-muted-foreground">The requested project is not currently in the Git Club showcase archive.</p>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground"
        >
          <ArrowLeft size={14} /> Back to All Projects
        </Link>
      </main>
    );
  }

  // Related projects in same category
  const similarProjects = allProjects
    .filter((p) => p.slug !== project.slug && (p.category === project.category || p.stack.some((s) => project.stack.includes(s))))
    .slice(0, 3);

  const handleCopyClone = () => {
    const cmd = `git clone ${project.githubUrl}.git`;
    navigator.clipboard?.writeText(cmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <main>
      {/* 1. OVERVIEW (HERO & DOMINANT VISUAL) */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1380px] px-5 pb-12 pt-8 lg:px-10 lg:pb-16 lg:pt-10">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center gap-2 mono text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-foreground font-bold truncate max-w-[200px]">{project.name}</span>
            </nav>

            <Link
              href="/projects"
              data-testid="link-back-projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={13} /> Back to Directory
            </Link>
          </div>

          {/* Project Overview Header */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left: Metadata & Value Prop */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-0.5 rounded-md">
                  {project.category}
                </span>
                <span className="mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md font-semibold">
                  {project.year}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold"
                  style={{ color: project.accent, backgroundColor: `${project.accent}15` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                  {project.status} Deployment
                </span>
                <span className="mono text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-md">
                  {project.license}
                </span>
              </div>

              <h1
                data-testid={`text-project-title-${project.slug}`}
                className="display mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.08]"
              >
                {project.name}
              </h1>

              <p className="mt-3 text-base sm:text-lg font-medium text-primary leading-snug">
                {project.tagline}
              </p>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-project-live"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-project-github"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
                >
                  <Github size={15} />
                  <span>GitHub Repository</span>
                  <ArrowUpRight size={12} className="text-muted-foreground" />
                </a>

                {/* Clone snippet */}
                <button
                  type="button"
                  onClick={handleCopyClone}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2.5 text-xs mono text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                  title="Copy clone command"
                >
                  {copiedClone ? <Check size={13} className="text-emerald-500" /> : <Terminal size={13} />}
                  <span>{copiedClone ? 'Copied clone!' : 'git clone'}</span>
                </button>
              </div>
            </div>

            {/* Right: Dominant Visual Frame */}
            <div>
              <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden preserve-3d">
                <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2 text-xs mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500/70" />
                    <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-[11px] text-muted-foreground truncate">
                      gitclub-charusat/{project.slug}
                    </span>
                  </div>
                  <span className="mono text-[10px] text-primary font-bold">{project.branch}</span>
                </div>
                <Visual
                  project={project}
                  className="aspect-[1.65] w-full"
                />
              </div>
            </div>
          </div>

          {/* 15-Second Executive Brief Cards */}
          {project.brief && (
            <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
              <div className="flex items-center gap-2 mono text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles size={13} />
                <span>Executive Summary</span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="border-l-2 border-primary/40 pl-3">
                  <p className="mono text-[10px] uppercase font-bold text-muted-foreground">The Problem</p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground leading-snug">{project.brief.problemBrief}</p>
                </div>
                <div className="border-l-2 border-accent/60 pl-3">
                  <p className="mono text-[10px] uppercase font-bold text-muted-foreground">The Solution</p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground leading-snug">{project.brief.innovationBrief}</p>
                </div>
                <div className="border-l-2 border-emerald-500/60 pl-3">
                  <p className="mono text-[10px] uppercase font-bold text-muted-foreground">The Impact</p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground leading-snug">{project.brief.impactBrief}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. PROBLEM & 3. SOLUTION */}
      <section className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Problem */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <span className="mono text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-md">
              01 / The Problem
            </span>
            <h2 className="display mt-3 text-xl sm:text-2xl font-bold text-foreground">
              What broke down before?
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <span className="mono text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
              02 / The Solution
            </span>
            <h2 className="display mt-3 text-xl sm:text-2xl font-bold text-foreground">
              How Git Club solved it
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Metrics Row */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:p-6 text-center">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="display text-2xl sm:text-3xl font-extrabold text-primary">{m.value}</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. FEATURES */}
      <section className="border-t border-border bg-card py-14 lg:py-18">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
              CORE FEATURES
            </p>
            <h2 className="display mt-1.5 text-2xl sm:text-3xl font-extrabold text-foreground">
              Engineered Capabilities
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, idx) => (
              <div
                key={feature.title}
                className="flex flex-col justify-between rounded-2xl border border-border bg-background p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="mono text-xs font-bold text-primary">0{idx + 1}</span>
                    {feature.badge && (
                      <span className="mono text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="display mt-3 text-base sm:text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {feature.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECH STACK */}
      <section className="border-t border-border bg-muted/30 py-14 lg:py-18">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            <h2 className="display text-2xl sm:text-3xl font-extrabold text-foreground">
              Architecture & Tech Stack
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Technologies mapped to their architectural purpose in the repository.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.architecture ? (
              project.architecture.map((layer) => (
                <div key={layer.layer} className="rounded-xl border border-border bg-card p-4 shadow-xs">
                  <span className="mono text-[10px] uppercase font-bold text-primary tracking-wider">
                    {layer.layer}
                  </span>
                  <p className="display mt-1 text-base font-bold text-foreground">
                    {layer.technology}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {layer.purpose}
                  </p>
                </div>
              ))
            ) : (
              project.stack.map((tech) => (
                <div key={tech} className="rounded-xl border border-border bg-card p-4 shadow-xs">
                  <span className="mono text-[10px] uppercase font-bold text-primary tracking-wider">Stack Item</span>
                  <p className="display mt-1 text-base font-bold text-foreground">{tech}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. SCREENSHOTS & GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="border-t border-border bg-card py-14 lg:py-18">
          <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
                  SCREENSHOTS & INTERFACE
                </p>
                <h2 className="display mt-1.5 text-2xl sm:text-3xl font-extrabold text-foreground">
                  Visuals from the build
                </h2>
              </div>
              <p className="mono text-xs text-muted-foreground">Click any frame to inspect</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {project.gallery.map((frame, idx) => (
                <button
                  type="button"
                  key={frame.title}
                  onClick={() => setGalleryViewer(idx)}
                  className={`group relative overflow-hidden rounded-2xl text-left border border-border transition-all hover:scale-[1.01] cursor-pointer ${
                    idx === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div
                    className={`${idx === 0 ? 'aspect-[2.2]' : 'aspect-[1.5]'} relative w-full`}
                    style={{ background: frame.visual }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="mono text-[10px] uppercase font-bold tracking-wider text-accent">
                        Frame 0{idx + 1}
                      </span>
                      <p className="display mt-1 text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                        {frame.title}
                      </p>
                      <p className="mt-0.5 text-xs text-white/80 max-w-md line-clamp-1">
                        {frame.copy}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. TEAM */}
      <section className="border-t border-border bg-muted/30 py-14 lg:py-18">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
              STUDENT BUILDERS
            </p>
            <h2 className="display mt-1.5 text-2xl sm:text-3xl font-extrabold text-foreground">
              Team & Contributors
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Students from CSPIT CHARUSAT who engineered and contributed to this repository.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.team.map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-xs font-bold text-secondary-foreground shadow-2xs">
                    {member.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-snug">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    {member.department && (
                      <p className="mono text-[10px] text-primary/80 mt-0.5">{member.department}</p>
                    )}
                  </div>
                </div>

                {member.github && (
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    title={`@${member.github} on GitHub`}
                    aria-label={`${member.name} on GitHub`}
                  >
                    <Github size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LINKS (VERIFIED & TESTED) */}
      <section className="border-t border-border bg-card py-14 lg:py-18">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
              VERIFIED DESTINATIONS
            </p>
            <h2 className="display mt-1.5 text-xl sm:text-2xl font-bold text-foreground">
              Project Links & Resources
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Official tested repositories and deployments for this project.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:scale-[1.02] transition-transform"
              >
                <Github size={14} />
                <span>GitHub Repository</span>
                <ArrowUpRight size={12} />
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Live Deployment</span>
                  <ArrowUpRight size={12} className="text-muted-foreground" />
                </a>
              )}

              <a
                href="https://github.com/gitclub-charusat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
              >
                <span>Git Club Organization</span>
                <ArrowUpRight size={12} className="text-muted-foreground" />
              </a>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                <ArrowLeft size={13} />
                <span>Back to All Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {similarProjects.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-14 lg:py-18">
          <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
                  KEEP EXPLORING
                </p>
                <h2 className="display mt-1.5 text-2xl font-bold text-foreground">
                  Related Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Directory</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarProjects.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Lightbox Gallery Viewer */}
      {galleryViewer !== null && project.gallery && project.gallery[galleryViewer] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Frame ${galleryViewer + 1} preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setGalleryViewer(null)}
        >
          <button
            type="button"
            onClick={() => setGalleryViewer(null)}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            title="Close viewer (Esc)"
            aria-label="Close fullscreen frame viewer"
          >
            <X size={20} />
          </button>

          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-2xl"
              style={{ background: project.gallery[galleryViewer].visual }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="mono text-xs font-bold uppercase tracking-wider text-accent">
                  Frame {galleryViewer + 1} of {project.gallery.length}
                </span>
                <h3 className="display mt-1 text-2xl sm:text-3xl font-bold">
                  {project.gallery[galleryViewer].title}
                </h3>
                <p className="mt-2 text-sm text-white/80 max-w-xl">
                  {project.gallery[galleryViewer].copy}
                </p>
              </div>
            </div>

            {/* Gallery Navigation buttons */}
            <div className="mt-4 flex items-center justify-between text-white">
              <button
                type="button"
                onClick={() =>
                  setGalleryViewer((galleryViewer - 1 + project.gallery.length) % project.gallery.length)
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-3.5 py-1.5 text-xs font-bold hover:bg-white/10 cursor-pointer"
                aria-label="Previous frame"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="mono text-xs text-white/50 hidden sm:inline">
                Use ← / → keys to navigate, Esc to close
              </span>
              <button
                type="button"
                onClick={() => setGalleryViewer((galleryViewer + 1) % project.gallery.length)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-3.5 py-1.5 text-xs font-bold hover:bg-white/10 cursor-pointer"
                aria-label="Next frame"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
