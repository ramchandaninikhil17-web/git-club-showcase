import { ArrowUpRight, ShieldCheck, Instagram, ExternalLink, Globe, Building2 } from 'lucide-react';

export function InstitutionalBar({ className = '' }: { className?: string }) {
  return (
    <div
      data-testid="section-institutional-context"
      className={`border-y border-border/80 bg-muted/40 py-3 text-xs ${className}`}
    >
      <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-5 lg:px-10">
        {/* Institutional Pillars */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-foreground/80 font-medium">
          <span className="flex items-center gap-1.5 text-primary font-bold tracking-tight">
            <ShieldCheck size={14} className="text-primary" />
            <span>Official Student Tech Community</span>
          </span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="font-semibold text-foreground">GIT Club</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">CSPIT</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">CHARUSAT</span>
        </div>

        {/* Real Verified Links */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] mono">
          <a
            href="https://www.charusat.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-charusat-official"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe size={11} className="text-primary" />
            <span>charusat.ac.in</span>
            <ArrowUpRight size={10} className="opacity-60" />
          </a>

          <a
            href="https://cspit.charusat.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-cspit-official"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Building2 size={11} className="text-primary" />
            <span>cspit.charusat.ac.in</span>
            <ArrowUpRight size={10} className="opacity-60" />
          </a>

          <a
            href="https://www.instagram.com/gitclub.charusat/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram-official"
            className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-400 font-semibold transition-colors"
          >
            <Instagram size={11} />
            <span>@gitclub.charusat</span>
            <ArrowUpRight size={10} className="opacity-60" />
          </a>

          <a
            href="https://gitclub.hogwartsxcharusat.workers.dev/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-event-official"
            className="inline-flex items-center gap-1 text-primary hover:underline font-semibold transition-colors"
          >
            <span>Official Event Portal</span>
            <ExternalLink size={10} className="opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
