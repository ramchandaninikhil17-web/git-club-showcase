import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { showcaseService } from '@/services/showcase';
import { ArrowRight, Layers3, Landmark, ShieldCheck } from 'lucide-react';

export function TechnologiesPage() {
  const [techs, setTechs] = useState<{ name: string; count: number; type: string; color: string }[]>([]);
  const [activeType, setActiveType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Technology Toolbox — Git Club CHARUSAT';
    showcaseService.listTechnologies().then((data) => {
      setTechs(data);
      setLoading(false);
    });
  }, []);

  const types = ['All', ...Array.from(new Set(techs.map((item) => item.type)))];
  const filtered = techs.filter((item) => activeType === 'All' || item.type === activeType);

  return (
    <main className="mx-auto max-w-[1380px] px-5 py-12 lg:px-10 lg:py-16">
      {/* Header */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div className="animate-rise">
          <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
            TECHNOLOGIES
          </p>
          <h1 className="display mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Technologies & <span className="text-primary">Tooling.</span>
          </h1>
        </div>
        <p className="max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          Browse the languages, frameworks, edge runtimes, and tools used to build verified Git Club student projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mt-12 flex gap-2 overflow-x-auto border-b border-border pb-4 scrollbar-none">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            data-testid={`button-tech-filter-${type.toLowerCase().replaceAll(' ', '-')}`}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeType === type
                ? 'bg-secondary text-secondary-foreground shadow-2xs font-bold'
                : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid of Technology Cards */}
      {loading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="animate-pulse rounded-2xl border border-border bg-card p-5 h-36" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 perspective-1200">
          {filtered.map((tech) => (
            <Link
              key={tech.name}
              href={`/projects?tech=${encodeURIComponent(tech.name)}`}
              data-testid={`card-technology-${tech.name.toLowerCase().replaceAll('.', '-')}`}
              className="group preserve-3d flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
            >
              <div className="layer-depth-2 flex items-center justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${tech.color}18`, color: tech.color }}
                >
                  {tech.name.slice(0, 2)}
                </span>
                <span className="mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  {tech.count} {tech.count === 1 ? 'project' : 'projects'}
                </span>
              </div>

              <div className="layer-depth-1 mt-6">
                <h2 className="display text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{tech.name}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-xs">
                  <span className="text-muted-foreground">{tech.type}</span>
                  <span className="mono text-[11px] text-muted-foreground">Filter repos →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Engineering Philosophy Cards */}
      <section className="mt-16 rounded-3xl bg-secondary p-8 text-secondary-foreground sm:p-12 lg:p-16 shadow-lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-accent">
              ARCHITECTURAL PATTERN
            </p>
            <h2 className="display mt-3 text-3xl sm:text-5xl font-extrabold leading-tight text-white">
              The stack follows the constraint.
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-secondary-foreground/75">
            A student might reach for WebSockets because a bus stop needs sub-second telemetry, SQLite because rural Anand farms have zero bars, or local Ollama instances to eliminate API billing limits.
          </p>
        </div>

        <div className="mt-12 grid gap-6 border-t border-secondary-foreground/15 pt-8 sm:grid-cols-3">
          <div>
            <span className="text-accent inline-block mb-3">
              <Layers3 size={20} />
            </span>
            <h3 className="font-bold text-base text-white">Interface Ergonomics</h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary-foreground/65">
              Next.js, React, Remix, Vue — selected for speed, layout stability, and accessibility across low-tier student smartphones.
            </p>
          </div>
          <div>
            <span className="text-accent inline-block mb-3">
              <Landmark size={20} />
            </span>
            <h3 className="font-bold text-base text-white">Campus Infrastructure</h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary-foreground/65">
              PostgreSQL, Go, Redis, Docker — resilient backends engineered to operate reliably on university LANs and student budgets.
            </p>
          </div>
          <div>
            <span className="text-accent inline-block mb-3">
              <ShieldCheck size={20} />
            </span>
            <h3 className="font-bold text-base text-white">Ethics & Offline-First</h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary-foreground/65">
              Strict privacy guarantees, minimal telemetry, zero tracking, and local embedded data stores that function offline.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
