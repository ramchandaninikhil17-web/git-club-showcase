import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Project, showcaseService } from '@/services/showcase';
import { Visual } from '@/components/ProjectCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { ArrowRight, Sparkles, ExternalLink, Github, Eye } from 'lucide-react';

export function FeaturedPage() {
  const [featured, setFeatured] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  useEffect(() => {
    document.title = 'Featured Case Studies — Git Club CHARUSAT';
    showcaseService.listProjects().then((items) => {
      setFeatured(items.filter((p) => p.featured));
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3.5 py-1 text-xs font-semibold text-accent">
            <Sparkles size={13} />
            <span className="mono text-[11px] uppercase tracking-wider">VERIFIED INITIATIVES · CSPIT CHARUSAT</span>
          </div>

          <h1 className="display mt-6 max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-white">
            The builds that changed <br />
            <span className="text-accent">the conversation.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-secondary-foreground/75">
            A curated deep dive into standout software projects built by Git Club CHARUSAT. These builds demonstrate deep empathy for campus users, sophisticated architectural choices, and battle-tested reliability.
          </p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-20">
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse rounded-3xl border border-border bg-card p-6 h-96" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {featured.map((project) => (
              <article
                key={project.slug}
                data-testid={`card-featured-${project.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 club-card-glow"
              >
                <div>
                  <div className="relative overflow-hidden">
                    <Link href={`/projects/${project.slug}`} className="block">
                      <Visual project={project} className="aspect-[1.7] transition-transform duration-500 group-hover:scale-[1.02]" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setQuickViewProject(project)}
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/20 cursor-pointer"
                      title="Quick preview"
                    >
                      <Eye size={12} /> Quick View
                    </button>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        {project.category} · {project.year}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                        style={{ color: project.accent, backgroundColor: `${project.accent}15` }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="display mt-3 block text-2xl font-bold text-foreground group-hover:text-primary transition-colors"
                    >
                      {project.name}
                    </Link>

                    <p className="mt-1 text-sm font-medium text-foreground/80">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {/* Stack & Metrics */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <Link
                          key={tech}
                          href={`/projects?tech=${encodeURIComponent(tech)}`}
                          className="mono rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground hover:bg-muted/80 hover:text-primary transition-colors"
                          title={`Explore ${tech} projects`}
                        >
                          {tech}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="display text-xl font-bold" style={{ color: project.accent }}>
                            {m.value}
                          </p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="border-t border-border p-6 flex items-center justify-between bg-muted/20">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors"
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
                        className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors"
                        title="Live Demo"
                        aria-label={`Open ${project.name} Live Demo`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setQuickViewProject(project)}
                      className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                      title="Quick Preview"
                    >
                      <Eye size={13} />
                      <span>Preview</span>
                    </button>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <QuickViewModal
        project={quickViewProject}
        onClose={() => setQuickViewProject(null)}
      />
    </main>
  );
}
