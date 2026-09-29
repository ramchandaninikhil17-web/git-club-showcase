import { useEffect } from 'react';
import { Project } from '@/services/showcase';
import { X, ExternalLink, Github, ArrowRight, GitBranch, Star, GitFork, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

interface QuickViewModalProps {
  project: Project | null;
  onClose: () => void;
}

export function QuickViewModal({ project, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-card-foreground animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close quick view modal"
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        {/* Top Badges & Category */}
        <div className="flex flex-wrap items-center gap-2 pr-8">
          <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            {project.category} · {project.year}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style={{ color: project.accent, backgroundColor: `${project.accent}18` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
            {project.status}
          </span>
          {project.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-2 py-0.5 text-[10px] font-bold text-primary">
              <CheckCircle2 size={11} className="text-primary" />
              {project.trustBadge || 'Verified Project'}
            </span>
          )}
          {project.isUpcoming && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-500">
              Project information coming soon
            </span>
          )}
          <span className="mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            {project.department}
          </span>
        </div>

        {/* Title & Tagline */}
        <h2 id="quickview-modal-title" className="display mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {project.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {project.tagline}
        </p>

        {/* Repository Stats Ribbon */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-xs text-muted-foreground mono">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
          >
            <Github size={13} className="text-primary" />
            <strong className="text-foreground">github.com/gitclub-charusat</strong>
          </a>
          <span className="flex items-center gap-1">
            <GitBranch size={13} className="text-primary" />
            <span className="text-foreground">{project.branch}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            <span>{project.updatedAt}</span>
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {project.description}
        </p>

        {/* 15-Second Brief */}
        {project.brief && (
          <div className="mt-5 rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2 text-xs">
            <p className="mono font-bold text-[10px] uppercase tracking-wider text-primary">
              15-Second Executive Brief
            </p>
            <div className="grid gap-2">
              <div className="flex gap-2">
                <span className="font-semibold text-foreground shrink-0 w-24">The Challenge:</span>
                <span className="text-muted-foreground">{project.brief.problemBrief}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-foreground shrink-0 w-24">Solution:</span>
                <span className="text-muted-foreground">{project.brief.innovationBrief}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-foreground shrink-0 w-24">Impact:</span>
                <span className="text-muted-foreground">{project.brief.impactBrief}</span>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-border py-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="display text-xl sm:text-2xl font-bold" style={{ color: project.accent }}>
                {m.value}
              </p>
              <p className="text-[11px] leading-tight text-muted-foreground mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack (Clickable Discovery) */}
        <div className="mt-5">
          <p className="mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Technology Stack · Click to explore related projects
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Link
                key={tech}
                href={`/projects?tech=${encodeURIComponent(tech)}`}
                onClick={onClose}
                className="rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-xs font-mono font-medium text-foreground hover:border-primary/50 hover:bg-muted transition-colors inline-block"
                title={`Find other projects using ${tech}`}
              >
                {tech}
              </Link>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div className="mt-5">
          <p className="mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Built by Git Club Students
          </p>
          <div className="flex flex-wrap gap-2.5">
            {project.team.map((member) => (
              <div key={member.name} className="flex items-center gap-2 bg-muted/40 rounded-lg px-2.5 py-1.5 border border-border/60">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-[9px] font-bold text-secondary-foreground">
                  {member.initials}
                </span>
                <div className="text-[11px]">
                  <p className="font-bold text-foreground leading-none">{member.name}</p>
                  <p className="text-muted-foreground text-[10px] leading-none mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-bold text-foreground hover:bg-muted/80 transition-colors"
            >
              <Github size={14} /> Repository
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-bold text-foreground hover:bg-muted/80 transition-colors"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:scale-[1.02] transition-transform"
          >
            Full Case Study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
