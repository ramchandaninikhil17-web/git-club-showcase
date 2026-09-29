import { Link } from 'wouter';
import { Github, ArrowUpRight, Heart, Terminal, Code2 } from 'lucide-react';
import { BrandMark } from './Navbar';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground transition-colors">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:px-10">
        {/* Brand & Identity */}
        <div>
          <BrandMark compact />
          <p className="mt-5 max-w-sm text-sm leading-7 text-secondary-foreground/75">
            A production-ready archive of student-built software, engineering prototypes, and the campus challenges behind them.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary-foreground/10 px-2.5 py-1 text-[11px] font-mono text-secondary-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% Open Source
            </span>
            <span className="mono text-[11px] text-secondary-foreground/60">
              · CHARUSAT Campus
            </span>
          </div>
          <div className="mt-5 space-y-1 text-xs text-secondary-foreground/75">
            <p className="font-semibold text-secondary-foreground">A6 Building, 1st Floor Seminar Hall</p>
            <p className="text-[11px] text-secondary-foreground/60">CSPIT · CHARUSAT Campus, Changa, Gujarat 388421</p>
            <p className="text-[11px] text-accent/90 pt-1">
              Event Leads: Ohm Bhatia (+91 8849379509) · Om Rashiya (+91 9727662885)
            </p>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <p className="mono text-[10px] uppercase tracking-[.18em] text-secondary-foreground/50 font-bold">
            Navigation
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/" className="text-secondary-foreground/75 hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/projects" data-testid="link-footer-projects" className="text-secondary-foreground/75 hover:text-accent transition-colors">
              Projects Directory
            </Link>
            <Link href="/technologies" data-testid="link-footer-technologies" className="text-secondary-foreground/75 hover:text-accent transition-colors">
              Technologies
            </Link>
            <Link href="/featured" data-testid="link-footer-featured" className="text-secondary-foreground/75 hover:text-accent transition-colors">
              Featured Case Studies
            </Link>
            <Link href="/about" data-testid="link-footer-about" className="text-secondary-foreground/75 hover:text-accent transition-colors">
              About the Club
            </Link>
          </div>
        </div>

        {/* Community & Open Source */}
        <div>
          <p className="mono text-[10px] uppercase tracking-[.18em] text-secondary-foreground/50 font-bold">
            Open Source
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <a
              href="https://github.com/gitclub-charusat"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-github"
              className="text-secondary-foreground/75 hover:text-accent transition-colors inline-flex items-center gap-1.5"
            >
              <Github size={13} /> GitHub Organization <ArrowUpRight size={11} className="text-muted-foreground" />
            </a>
            <Link href="/projects?status=Live" className="text-secondary-foreground/75 hover:text-accent transition-colors">
              Live Deployments
            </Link>
            <a
              href="mailto:gitclub@charusat.ac.in"
              className="text-secondary-foreground/75 hover:text-accent transition-colors"
            >
              Contact Club Leads
            </a>
          </div>
        </div>

        {/* Contribution CTA */}
        <div>
          <p className="mono text-[10px] uppercase tracking-[.18em] text-secondary-foreground/50 font-bold">
            Contribute
          </p>
          <p className="mt-4 text-xs leading-6 text-secondary-foreground/70">
            Have you built an interesting tool, hackathon project, or campus service at CHARUSAT?
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/gitclub-charusat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Github size={14} /> Submit via GitHub <ArrowUpRight size={13} />
            </a>
          </div>
          <p className="mono mt-3 text-[10px] text-secondary-foreground/45">
            Submit a PR or email gitclub@charusat.ac.in
          </p>
        </div>
      </div>

      {/* Official Institutional Identity Section */}
      <div className="border-t border-secondary-foreground/15 bg-black/20 py-8">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-accent">
                OFFICIAL INSTITUTIONAL AFFILIATION
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-bold text-white">
                <span>GIT Club</span>
                <span className="text-secondary-foreground/40">/</span>
                <span>CSPIT</span>
                <span className="text-secondary-foreground/40">/</span>
                <span>CHARUSAT</span>
              </div>
              <p className="mt-1 text-xs text-secondary-foreground/70">
                Chandubhai S. Patel Institute of Technology · Charotar University of Science & Technology · Changa, Gujarat 388421
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href="https://www.charusat.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-charusat-official"
                className="inline-flex items-center gap-1.5 rounded-lg border border-secondary-foreground/20 bg-secondary-foreground/5 px-3 py-1.5 text-secondary-foreground/90 hover:border-accent hover:text-white transition-colors"
              >
                <span>CHARUSAT Official Website</span>
                <ArrowUpRight size={12} className="text-accent" />
              </a>

              <a
                href="https://cspit.charusat.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-cspit-official"
                className="inline-flex items-center gap-1.5 rounded-lg border border-secondary-foreground/20 bg-secondary-foreground/5 px-3 py-1.5 text-secondary-foreground/90 hover:border-accent hover:text-white transition-colors"
              >
                <span>CSPIT Official Website</span>
                <ArrowUpRight size={12} className="text-accent" />
              </a>

              <a
                href="https://www.instagram.com/gitclub.charusat/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-instagram-official"
                className="inline-flex items-center gap-1.5 rounded-lg border border-secondary-foreground/20 bg-secondary-foreground/5 px-3 py-1.5 text-pink-400 hover:border-pink-400 hover:text-pink-300 transition-colors"
              >
                <span>Git Club Instagram</span>
                <ArrowUpRight size={12} />
              </a>

              <a
                href="https://gitclub.hogwartsxcharusat.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-event-official"
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent hover:bg-accent/20 transition-colors font-semibold"
              >
                <span>Current Git Club Event Website</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto flex max-w-[1380px] flex-col sm:flex-row items-center justify-between border-t border-secondary-foreground/10 px-5 py-6 text-xs text-secondary-foreground/50 gap-4 lg:px-10">
        <span className="flex items-center gap-1.5">
          <span>Maintained by student developers at Git Club CSPIT CHARUSAT.</span>
        </span>
        <div className="flex items-center gap-4 mono text-[11px]">
          <span>Verified Institutional Portal</span>
          <span>·</span>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  );
}
