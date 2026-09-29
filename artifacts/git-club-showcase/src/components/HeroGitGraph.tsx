import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { GitBranch, GitCommit, ArrowRight, Sparkles, Layers, Activity } from 'lucide-react';

interface GitNode {
  id: string;
  name: string;
  branch: string;
  status: 'Live' | 'Beta' | 'Research';
  category: string;
  accent: string;
  x: number;
  y: number;
  z: number;
  commitHash: string;
  slug: string;
  summary: string;
}

const gitNodes: GitNode[] = [
  {
    id: 'events',
    name: 'Event Platform',
    branch: 'feat/hackathon-arena',
    status: 'Live',
    category: 'Hackathon & Quest',
    accent: '#d4af5a',
    x: 70,
    y: 25,
    z: 32,
    commitHash: '0x8f2a',
    slug: 'coding-wizards-platform',
    summary: 'Chamber of Secrets & Coding Wizards Arena'
  },
  {
    id: 'showcase',
    name: 'Showcase V2',
    branch: 'main',
    status: 'Live',
    category: 'Developer Directory',
    accent: '#e6c978',
    x: 50,
    y: 48,
    z: 22,
    commitHash: '0x3c91',
    slug: 'git-club-showcase',
    summary: 'Peer-reviewed project archive & metrics'
  },
  {
    id: 'curriculum',
    name: 'Grow with Git',
    branch: 'feat/lab-workshops',
    status: 'Live',
    category: 'Open Source Labs',
    accent: '#38bdf8',
    x: 30,
    y: 72,
    z: 28,
    commitHash: '0x7e12',
    slug: 'grow-with-git',
    summary: 'CSPIT lab modules & GitHub certifications'
  },
  {
    id: 'capstones',
    name: 'Capstone Pipeline',
    branch: 'review/idp-udp',
    status: 'Beta',
    category: 'Campus Systems',
    accent: '#f59e0b',
    x: 70,
    y: 74,
    z: 26,
    commitHash: '0x4d5b',
    slug: 'campus-solutions-pipeline',
    summary: 'Verified student submissions undergoing review'
  }
];

export function HeroGitGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<GitNode>(gitNodes[0]);
  const [tilt, setTilt] = useState({ rotX: 8, rotY: -6, mouseX: 50, mouseY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Map to subtle 3D tilt
    const rotX = (y - 0.5) * -16;
    const rotY = (x - 0.5) * 20;
    setTilt({ rotX, rotY, mouseX: x * 100, mouseY: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 8, rotY: -6, mouseX: 50, mouseY: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1200 relative w-full select-none"
    >
      {/* 3D Tilted Main Card Stage */}
      <div
        style={{
          transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
          transition: 'transform 0.12s ease-out, box-shadow 0.25s ease',
        }}
        className="preserve-3d relative w-full rounded-3xl border border-border/90 bg-card/95 p-5 sm:p-7 shadow-2xl backdrop-blur-md overflow-hidden"
      >
        {/* Dynamic 3D specular glare highlight */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-40 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(400px circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(212, 175, 90, 0.18), transparent 75%)`,
          }}
        />

        {/* Ambient atmospheric glow */}
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        {/* Header bar with terminal controls */}
        <div className="layer-depth-2 flex items-center justify-between border-b border-border/80 pb-3 text-xs mono">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-xs" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-xs" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shadow-xs" />
            </span>
            <span className="ml-2 font-bold text-foreground flex items-center gap-1.5">
              <GitBranch size={13} className="text-primary" />
              <span>gitclub-charusat/showcase</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline font-medium text-foreground/80">Interactive Git Graph</span>
          </div>
        </div>

        {/* 3D Canvas Visual Arena */}
        <div className="preserve-3d relative mt-4 h-[260px] sm:h-[300px] w-full rounded-2xl bg-muted/40 border border-border/70 overflow-hidden">
          {/* 3D Floor Grid Plane */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(212, 175, 90, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 90, 0.12) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              transform: 'scale(1.2) rotateX(45deg) translateY(-20px)',
              transformOrigin: '50% 100%',
            }}
          />

          {/* SVG Git Branches and Bezier curves */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none layer-depth-1"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="hero-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af5a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e6c978" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="hero-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6c978" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="hero-grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6c978" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Root to Events curve with glow */}
            <path
              d="M 50,48 C 58,38 64,30 70,25"
              fill="none"
              stroke="url(#hero-grad-gold)"
              strokeWidth="2"
              className="git-branch-line"
              filter="url(#glow-filter)"
            />

            {/* Root to Curriculum curve */}
            <path
              d="M 50,48 C 42,58 36,66 30,72"
              fill="none"
              stroke="url(#hero-grad-blue)"
              strokeWidth="2"
              className="git-branch-line"
              filter="url(#glow-filter)"
            />

            {/* Root to Capstones curve */}
            <path
              d="M 50,48 C 58,58 64,66 70,74"
              fill="none"
              stroke="url(#hero-grad-amber)"
              strokeWidth="2"
              className="git-branch-line"
              filter="url(#glow-filter)"
            />

            {/* Concentric 3D Orbit rings */}
            <circle cx="50" cy="48" r="18" fill="none" stroke="rgba(212,175,90,0.2)" strokeDasharray="3 3" />
            <circle cx="50" cy="48" r="30" fill="none" stroke="rgba(212,175,90,0.12)" strokeDasharray="4 4" />
          </svg>

          {/* Interactive 3D Nodes */}
          {gitNodes.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer focus:outline-none transition-transform duration-300 z-10 ${
                  isSelected ? 'scale-115' : 'hover:scale-110'
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) translateZ(${isSelected ? node.z + 16 : node.z}px)`,
                }}
                aria-label={`Inspect ${node.name}`}
              >
                {/* 3D Vertical connector post down to grid floor */}
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 w-[1px] bg-gradient-to-b from-primary/60 to-transparent pointer-events-none"
                  style={{ height: `${node.z * 1.2}px` }}
                />

                {/* Pulsing indicator aura */}
                <div
                  className={`absolute -inset-3 rounded-full transition-opacity duration-300 ${
                    isSelected ? 'opacity-90 animate-ping' : 'opacity-0 group-hover/node:opacity-50'
                  }`}
                  style={{ backgroundColor: `${node.accent}33` }}
                />

                {/* 3D Elevated Node capsule */}
                <div
                  className={`relative flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold shadow-xl backdrop-blur-md transition-all select-none ${
                    isSelected
                      ? 'border-2 bg-card text-foreground shadow-[0_10px_25px_rgba(212,175,90,0.35)]'
                      : 'border border-border/90 bg-card/95 text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                  style={{
                    borderColor: isSelected ? node.accent : undefined,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: node.accent }}
                  />
                  <span className="mono text-[10px] sm:text-[11px] whitespace-nowrap text-foreground">{node.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Active Node Detail Card Preview */}
        <div className="layer-depth-2 mt-4 rounded-2xl border border-border bg-card p-4 shadow-md transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                {activeNode.category}
              </span>
              <span className="text-border">·</span>
              <span
                className="mono text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ color: activeNode.accent, backgroundColor: `${activeNode.accent}15` }}
              >
                {activeNode.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mono text-[10px] text-muted-foreground">
              <GitCommit size={12} className="text-primary" />
              <span>commit {activeNode.commitHash}</span>
            </div>
          </div>

          <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="display text-base sm:text-lg font-bold text-foreground">
                {activeNode.name}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 break-words">
                {activeNode.summary}
              </p>
            </div>

            <Link
              href={`/projects/${activeNode.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:scale-[1.02] transition-transform shadow-xs shrink-0 self-start sm:self-auto"
            >
              <span>Explore Build</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
