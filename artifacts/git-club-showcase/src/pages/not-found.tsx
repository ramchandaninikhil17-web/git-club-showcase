import { Link } from 'wouter';
import { ArrowLeft, Terminal, GitBranch } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[1380px] flex-col items-center justify-center px-5 py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary mb-6">
        <GitBranch size={32} />
      </span>
      <p className="mono text-xs font-bold uppercase tracking-[.22em] text-primary">
        404 / COMMIT NOT FOUND
      </p>
      <h1 className="display mt-3 text-4xl sm:text-6xl font-extrabold text-foreground">
        Branch or route does not exist.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
        The page you are looking for has not been committed to the Git Club showcase archive yet or has moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:scale-[1.02] transition-transform"
        >
          <ArrowLeft size={14} /> Return to Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
        >
          Explore All Projects
        </Link>
      </div>
    </main>
  );
}
