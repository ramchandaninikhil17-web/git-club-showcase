import { useState, useRef } from 'react';
import { Project } from '@/services/showcase';
import { Link } from 'wouter';
import { ExternalLink, Github, ArrowRight, Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onCompare?: (project: Project) => void;
  comparing?: boolean;
  onQuickView?: (project: Project) => void;
  layout?: 'grid' | 'list';
}

export function Visual({ project, className = '' }: { project: Project; className?: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isImageSrc =
    Boolean(project.cover) &&
    (project.cover.startsWith('http') ||
      project.cover.startsWith('/') ||
      /\.(png|jpe?g|webp|svg|gif)($|\?)/i.test(project.cover));

  const fallbackGradient = project.cover?.startsWith('linear-gradient')
    ? project.cover
    : `linear-gradient(135deg, #07090e 0%, #101828 50%, ${project.accent || '#d4af5a'} 100%)`;

  return (
    <div
      className={`relative overflow-hidden select-none bg-muted/40 ${className}`}
      style={{
        background: !isImageSrc || imgFailed ? fallbackGradient : undefined,
      }}
    >
      {/* Real Project Image with Lazy Loading & Fallback */}
      {isImageSrc && !imgFailed && (
        <img
          src={project.cover}
          alt={project.name}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      )}

      {/* Subtle Geometric Overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(120deg, transparent 18%, rgba(255,255,255,.18) 19%, transparent 20%), linear-gradient(35deg, transparent 50%, rgba(255,255,255,.1) 51%, transparent 52%)',
          backgroundSize: '55px 55px, 85px 85px',
        }}
      />

      {/* Category Pill */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 backdrop-blur-md border border-white/15 text-white/95 shadow-md">
        <span className="mono text-[10px] font-semibold tracking-wide text-white/95">{project.category}</span>
      </div>

      {/* Brand Footnote */}
      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white/95">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="mono text-[9px] uppercase tracking-[.2em] text-accent font-bold">Git Club · CSPIT</span>
          <span className="display text-sm sm:text-base font-bold text-white drop-shadow-md truncate">{project.name}</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  onQuickView,
  layout = 'grid',
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number; mouseX: number; mouseY: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    mouseX: 50,
    mouseY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    // Subdued tilt for crisp readability
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    setTilt({ x, y, mouseX, mouseY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50, isHovered: false });
  };

  // Status configuration
  const statusConfig = {
    Live: {
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.28)',
      dotClass: 'bg-emerald-500',
    },
    Beta: {
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.12)',
      border: 'rgba(168, 85, 247, 0.28)',
      dotClass: 'bg-purple-500',
    },
    Research: {
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.28)',
      dotClass: 'bg-amber-500',
    },
  }[project.status] || {
    color: project.accent,
    bg: `${project.accent}15`,
    border: `${project.accent}30`,
    dotClass: 'bg-primary',
  };

  // 1. LIST VIEW (Image → Project Name → Short Purpose → Category → Technologies → Team → Actions)
  if (layout === 'list') {
    return (
      <article
        data-testid={`card-project-${project.slug}`}
        className="group relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
      >
        <div className="flex items-start gap-4 min-w-0 flex-1">
          {/* Image */}
          <Link href={`/projects/${project.slug}`} className="shrink-0 hidden sm:block">
            <Visual project={project} className="h-24 w-36 rounded-xl transition-transform duration-300 group-hover:scale-[1.02]" />
          </Link>

          <div className="min-w-0 flex-1">
            {/* Project Name */}
            <Link
              href={`/projects/${project.slug}`}
              data-testid={`link-project-name-${project.slug}`}
              className="display text-lg font-bold text-foreground hover:text-primary transition-colors block truncate"
            >
              {project.name}
            </Link>

            {/* Short Purpose */}
            <p className="line-clamp-2 text-xs text-muted-foreground mt-1 leading-relaxed">
              {project.tagline || project.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {/* Category & Status */}
              <div className="flex items-center gap-1.5">
                <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                  {project.category}
                </span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{
                    color: statusConfig.color,
                    backgroundColor: statusConfig.bg,
                    border: `1px solid ${statusConfig.border}`,
                  }}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClass}`} />
                  {project.status}
                </span>
              </div>

              {/* Technologies */}
              <span className="text-border hidden sm:inline">·</span>
              <div className="flex flex-wrap gap-1">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="mono rounded-md border border-border/70 bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Team */}
              <span className="text-border hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5 items-center">
                  {project.team.slice(0, 3).map((person) => (
                    <span
                      key={person.name}
                      title={`${person.name} · ${person.role}`}
                      className="grid h-5 w-5 place-items-center rounded-full border border-card bg-secondary text-[8px] font-bold text-secondary-foreground shadow-2xs"
                    >
                      {person.initials}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground truncate max-w-[130px]">
                  {project.team[0]?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions: View Project, GitHub, Live Demo */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 border-t border-border/60 pt-3 md:border-t-0 md:pt-0">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(project)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              title="Quick view"
              aria-label={`Quick view ${project.name}`}
            >
              <Eye size={13} />
            </button>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-testid={`button-github-${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
            title="GitHub Repository"
            aria-label={`View ${project.name} on GitHub`}
          >
            <Github size={13} />
            <span className="hidden sm:inline">Code</span>
          </a>

          {Boolean(project.demoUrl) && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-testid={`button-demo-${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-muted transition-colors"
              title="Live Demo"
              aria-label={`Open ${project.name} Live Demo`}
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Demo</span>
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            data-testid={`link-project-${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            <span>View Project</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </article>
    );
  }

  // 2. GRID VIEW (Image → Project Name → Short Purpose → Category → Technologies → Team → Actions)
  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`card-project-${project.slug}`}
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        boxShadow: tilt.isHovered
          ? '0 16px 36px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(212, 175, 90, 0.22)'
          : undefined,
        transition: tilt.isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.15s ease-out'
          : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.2s ease',
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:border-primary/45"
    >
      {/* 1. Image */}
      <Link
        href={`/projects/${project.slug}`}
        data-testid={`link-project-${project.slug}`}
        className="block relative overflow-hidden z-10"
      >
        <Visual project={project} className="aspect-[1.62] transition-transform duration-500 ease-out group-hover:scale-[1.03]" />

        {/* Quick View trigger */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer"
          >
            <Eye size={12} /> Preview
          </button>
        )}
      </Link>

      {/* Card Content */}
      <div className="relative z-10 flex flex-1 flex-col p-5">
        {/* 2. Project Name */}
        <Link
          href={`/projects/${project.slug}`}
          data-testid={`link-project-name-${project.slug}`}
          className="display block text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1"
        >
          {project.name}
        </Link>

        {/* 3. Short Purpose */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground flex-1">
          {project.tagline || project.description}
        </p>

        {/* 4. Category & Status */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
            {project.category}
          </span>

          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{
              color: statusConfig.color,
              backgroundColor: statusConfig.bg,
              border: `1px solid ${statusConfig.border}`,
            }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClass}`} />
            {project.status}
          </span>
        </div>

        {/* 5. Technologies */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="mono rounded-md border border-border/70 bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="mono rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground border border-border/40">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* 6. Team & 7. Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
          {/* Team */}
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5 items-center">
              {project.team.slice(0, 3).map((person) => (
                <span
                  key={person.name}
                  title={`${person.name} · ${person.role}`}
                  className="grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-secondary text-[8px] font-bold text-secondary-foreground shadow-2xs"
                >
                  {person.initials}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground truncate max-w-[105px]">
              {project.team[0]?.name}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-testid={`button-github-${project.slug}`}
              className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground hover:border-primary/50 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
              title="GitHub Repository"
              aria-label={`View ${project.name} on GitHub`}
            >
              <Github size={13} />
            </a>

            {Boolean(project.demoUrl) && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-testid={`button-demo-${project.slug}`}
                className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground hover:border-primary/50 hover:bg-muted hover:text-foreground transition-all hover:scale-105"
                title="Live Demo"
                aria-label={`Open ${project.name} Live Demo`}
              >
                <ExternalLink size={13} />
              </a>
            )}

            <Link
              href={`/projects/${project.slug}`}
              data-testid={`button-view-${project.slug}`}
              className="group/btn inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground hover:scale-[1.02] transition-transform shadow-xs"
            >
              <span>View</span>
              <ArrowRight size={11} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
