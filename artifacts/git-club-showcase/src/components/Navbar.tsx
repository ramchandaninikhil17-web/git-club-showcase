import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Sun, Moon, Github, Menu, X, ArrowUpRight, Search, GitBranch, Instagram } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" data-testid="link-brand" className="group flex items-center gap-3 select-none">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-primary/40 bg-card p-1 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(212,175,90,0.3)] flex items-center justify-center">
        {!imgError ? (
          <img
            src="/gitclub-logo.png"
            alt="Git Club CHARUSAT Logo"
            className="h-full w-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
            <GitBranch size={22} className="text-primary animate-pulse" />
          </div>
        )}
      </div>
      {!compact && (
        <div className="flex flex-col">
          <span className="display text-lg font-extrabold tracking-tight leading-none text-foreground flex items-center gap-1.5">
            Git Club <span className="text-primary font-mono text-xs">/</span> <span className="text-sm font-semibold text-muted-foreground">Showcase</span>
          </span>
          <span className="mono text-[10px] text-primary font-bold uppercase tracking-widest mt-1">
            CSPIT · CHARUSAT
          </span>
        </div>
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gc-theme');
      if (stored) return stored === 'dark';
      return true; // Default to GitHub Dark / OLED
    }
    return true;
  });

  const [location, setLocation] = useLocation();
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('gc-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/technologies', label: 'Technologies' },
    { href: '/featured', label: 'Featured' },
  ];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setLocation(`/projects?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setOpen(false);
    } else {
      setLocation('/projects');
    }
  };

  const isNavActive = (href: string) => {
    if (href === '/') return location === '/';
    return location === href || location.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-5 lg:px-10 gap-4">
        <BrandMark />

        {/* Desktop Quick Search */}
        <form onSubmit={handleQuickSearch} className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search projects, stack, authors..."
              className="w-full rounded-full border border-border/70 bg-muted/60 pl-8 pr-12 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
            <kbd className="mono absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[9px] text-muted-foreground shadow-xs pointer-events-none">
              ↵
            </kbd>
          </div>
        </form>

        {/* Navigation Links: Home | Projects | Technologies | Featured */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const active = isNavActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                className={`text-[13px] font-semibold transition-colors ${
                  active ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Toggle color theme"
            data-testid="button-theme-toggle"
            onClick={() => setDark(!dark)}
            className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {dark ? <Sun size={17} className="text-accent" /> : <Moon size={17} />}
          </button>

          <a
            href="https://github.com/gitclub-charusat"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github-header"
            aria-label="Git Club GitHub"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-muted/70 hover:shadow-xs"
          >
            <Github size={14} />
            <span className="mono text-[11px]">GitHub</span>
            <ArrowUpRight size={12} className="text-muted-foreground" />
          </a>

          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <GitBranch size={13} />
            <span>Explore</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-testid="button-mobile-menu"
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border md:hidden text-foreground hover:bg-muted cursor-pointer"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-5 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleQuickSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border border-border bg-muted/50 pl-9 pr-4 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
          </form>
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                className={`rounded-xl px-3.5 py-3 text-sm font-semibold flex items-center justify-between ${
                  isNavActive(item.href) ? 'bg-primary/10 text-primary font-bold' : 'text-foreground hover:bg-muted'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={14} className="text-muted-foreground" />
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2.5">
              <a
                href="https://github.com/gitclub-charusat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                <Github size={14} /> GitHub Organisation <ArrowUpRight size={12} className="ml-auto" />
              </a>
              <span className="mono text-[10px] text-muted-foreground pt-1">CSPIT · CHARUSAT</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
