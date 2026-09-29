import { useEffect } from 'react';
import { ArrowUpRight, Github, Mail, MapPin, Sparkles, Building2, Globe, Instagram, ShieldCheck } from 'lucide-react';

export function AboutPage() {
  useEffect(() => {
    document.title = 'About the Community & Club — Git Club CHARUSAT';
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles size={13} />
            <span className="mono text-[11px] uppercase tracking-wider">CHARUSAT · GIT CLUB</span>
          </div>

          <h1 className="display mt-6 max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-foreground">
            A sanctuary for <br />
            <span className="text-primary">curious student builders.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Git Club is the student-led software development and open-source community at Charotar University of Science and Technology (CHARUSAT), Changa. We turn campus challenges into working, battle-tested software.
          </p>
        </div>
      </section>

      {/* Point of View & Principles */}
      <section className="mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
              OUR POINT OF VIEW
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl font-extrabold text-foreground">
              The best way to learn is to leave an open trail.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              College coursework teaches syntax and theory. Git Club teaches systems engineering, empathy for real users, and the resilience needed to deploy code into the wild.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="mono text-xs font-bold text-primary">01 / PRINCIPLE</span>
              <h3 className="display mt-3 text-xl font-bold text-foreground">Start Small & Ship</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                A rough, functioning terminal tool or prototype is worth ten perfect slide decks. We make the first version easy to share and test.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="mono text-xs font-bold text-primary">02 / PRINCIPLE</span>
              <h3 className="display mt-3 text-xl font-bold text-foreground">Understand the Human</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                We spend time talking to bus drivers, lab instructors, and fellow students before picking a frontend framework or database.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="mono text-xs font-bold text-primary">03 / PRINCIPLE</span>
              <h3 className="display mt-3 text-xl font-bold text-foreground">Critique as a Material</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Pull request reviews are constructive, kind, and rigorous. Code gets stronger when architectural decisions are questioned in public.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <span className="mono text-xs font-bold text-primary">04 / PRINCIPLE</span>
              <h3 className="display mt-3 text-xl font-bold text-foreground">Credit Everyone</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Research, design, deployment, technical documentation, and testing belong in the commit history just as much as lines of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* University Context Banner */}
      <section className="border-y border-border bg-secondary text-secondary-foreground py-16 lg:py-20">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-accent">
                CHARUSAT ECOSYSTEM
              </p>
              <h2 className="display mt-3 text-3xl sm:text-5xl font-extrabold leading-tight text-white">
                Cross-institute student collaboration.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-secondary-foreground/75">
                Our active contributors represent institutes across Charotar University:
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-bold text-accent">CSPIT</span>
                  <span className="text-xs text-secondary-foreground/80">Chandubhai S Patel Institute of Technology (CSE, IT, CE)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-bold text-accent">DEPSTAR</span>
                  <span className="text-xs text-secondary-foreground/80">Devang Patel Institute of Advance Technology and Research (CSE, AIML, IT)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="mono text-xs font-bold text-accent">CMPICA</span>
                  <span className="text-xs text-secondary-foreground/80">Smt. Chandaben Mohanbhai Patel Institute of Computer Applications (MCA, BCA)</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/5 p-6 sm:p-8">
              <h3 className="display text-xl font-bold text-white">The Weekly Club Loop</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3 border-b border-secondary-foreground/10 pb-3">
                  <span className="mono text-xs font-bold text-accent">01</span>
                  <div>
                    <p className="text-xs font-bold text-white">Open Studio Sessions</p>
                    <p className="text-[11px] text-secondary-foreground/60 mt-0.5">Every Saturday morning at the campus central lab for pairing and debugging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-secondary-foreground/10 pb-3">
                  <span className="mono text-xs font-bold text-accent">02</span>
                  <div>
                    <p className="text-xs font-bold text-white">Architecture Teardowns</p>
                    <p className="text-[11px] text-secondary-foreground/60 mt-0.5">Dissecting real-world open source projects and discussing trade-offs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mono text-xs font-bold text-accent">03</span>
                  <div>
                    <p className="text-xs font-bold text-white">Showcase Deployments</p>
                    <p className="text-[11px] text-secondary-foreground/60 mt-0.5">Pushing peer-reviewed student software live to university staging servers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="mx-auto max-w-[1380px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 lg:flex lg:items-center lg:justify-between shadow-xs">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.22em] text-primary">
              CAMPUS HEADQUARTERS
            </p>
            <h2 className="display mt-2 text-2xl sm:text-3xl font-extrabold text-foreground">
              Find us where the code is compiled.
            </h2>
            <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary shrink-0" />
              <span>A6 Building, 1st Floor Seminar Hall · CSPIT, CHARUSAT Campus, Changa, Gujarat 388421</span>
            </div>
            <p className="mt-2 text-xs text-primary font-mono">
              Event Queries: Ohm Bhatia (+91 8849379509) · Om Rashiya (+91 9727662885)
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-0">
            <a
              href="https://www.instagram.com/gitclub.charusat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              <span>Instagram @gitclub.charusat</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href="https://gitclub.hogwartsxcharusat.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              <span>Hogwarts Event Portal</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href="https://github.com/gitclub-charusat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-xs font-bold text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              <Github size={15} />
              <span>GitHub Org</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
