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
  return (
    <div
      className={`relative overflow-hidden preserve-3d select-none ${className}`}
      style={{ background: project.cover }}
    >
      {/* 3D Geometric Overlay Lines */}
      <div
        className="absolute inset-0 opacity-45 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(120deg, transparent 18%, rgba(255,255,255,.25) 19%, transparent 20%), linear-gradient(35deg, transparent 50%, rgba(255,255,255,.16) 51%, transparent 52%)',
          backgroundSize: '55px 55px, 85px 85px',
        }}
      />

      {/* Floating 3D Category Pill */}
      <div className="absolute top-3.5 right-3.5 layer-depth-2 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 backdrop-blur-md border border-white/20 text-white/95 shadow-md">
        <span className="mono text-[10px] font-semibold tracking-wide text-white/95">{project.category}</span>
      </div>

      {/* Brand Footnote in 3D */}
      <div className="absolute bottom-3.5 left-4 right-4 layer-depth-2 flex items-end justify-between text-white/95">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="mono text-[9px] uppercase tracking-[.22em] text-accent font-bold">Git Club · CSPIT</span>
          <span className="display text-base font-bold text-white drop-shadow-md truncate">{project.name}</span>
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
    // Enhanced 3D tilt calculation
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
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
      dotClass: 'bg-emerald-500 animate-pulse',
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

  // 1. LIST VIEW
  if (layout === 'list') {
    return (
      <article
        data-testid={`card-project-${project.slug}`}
        className="group relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 club-card-glow"
      >
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <Link href={`/projects/${project.slug}`} className="shrink-0 hidden sm:block">
            <Visual project={project} className="h-24 w-36 rounded-xl transition-transform duration-300 group-hover:scale-[1.02]" />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                {project.category}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
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

            <Link
              href={`/projects/${project.slug}`}
              data-testid={`link-project-name-${project.slug}`}
              className="display text-lg font-bold text-foreground hover:text-primary transition-colors block truncate"
            >
              {project.name}
            </Link>

            <p className="line-clamp-2 text-xs text-muted-foreground mt-1">
              {project.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {/* 2-4 Key Technologies */}
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

              {/* Contributors */}
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
                <span className="text-[11px] text-muted-foreground truncate max-w-[140px]">
                  {project.team[0]?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
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

          {project.demoUrl && (
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
            <span>View</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </article>
    );
  }

  // 2. GRID VIEW (ENHANCED 3D DEPTH & PERSPECTIVE)
  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`card-project-${project.slug}`}
      style={{
        transform: tilt.isHovered
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        boxShadow: tilt.isHovered
          ? `${-tilt.y * 1.5}px ${tilt.x * 1.5 + 16}px 36px -12px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(212, 175, 90, 0.25)`
          : undefined,
        transition: tilt.isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.15s ease-out'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.25s ease',
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:border-primary/50 preserve-3d"
    >
      {/* 3D Specular Light Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(350px circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(212, 175, 90, 0.16), transparent 75%)`,
        }}
      />

      {/* Thumbnail Visual with 3D Layer Elevation */}
      <Link
        href={`/projects/${project.slug}`}
        data-testid={`link-project-${project.slug}`}
        className="block relative overflow-hidden z-10 layer-depth-1"
      >
        <Visual project={project} className="aspect-[1.62] transition-transform duration-500 group-hover:scale-[1.03]" />

        {/* Quick View trigger */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer layer-depth-3"
          >
            <Eye size={12} /> Preview
          </button>
        )}
      </Link>

      {/* Card Content with 3D Depth Layers */}
      <div className="relative z-10 flex flex-1 flex-col p-5 preserve-3d">
        {/* Category & Status (Elevated Layer) */}
        <div className="layer-depth-2 flex items-center justify-between gap-2">
          <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
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

        {/* Project Name (Elevated Layer) */}
        <Link
          href={`/projects/${project.slug}`}
          data-testid={`link-project-name-${project.slug}`}
          className="layer-depth-2 display mt-2.5 block text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1"
        >
          {project.name}
        </Link>

        {/* Short description */}
        <p className="layer-depth-1 mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground flex-1">
          {project.description}
        </p>

        {/* 2-4 Key Technologies (Elevated Layer) */}
        <div className="layer-depth-2 mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="mono rounded-md border border-border/70 bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-foreground shadow-2xs"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="mono rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground border border-border/50">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Row: Team & Actions (Highest 3D Elevation Layer) */}
        <div className="layer-depth-3 mt-4 flex items-center justify-between border-t border-border/80 pt-3">
          {/* Contributors */}
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
            <span className="text-[11px] text-muted-foreground truncate max-w-[110px]">
              {project.team[0]?.name}
            </span>
          </div>

          {/* Working Links & View Project */}
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

            {project.demoUrl && (
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
              className="group/btn inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground hover:scale-[1.04] transition-transform shadow-xs"
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
