import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { GitBranch, GitCommit, ArrowRight } from 'lucide-react';

interface GitNode {
  id: string;
  name: string;
  branch: string;
  status: 'Live' | 'Beta' | 'Research';
  category: string;
  accent: string;
  svgX: number;
  svgY: number;
  pctX: number;
  pctY: number;
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
    svgX: 370,
    svgY: 65,
    pctX: 74,
    pctY: 23.2,
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
    svgX: 250,
    svgY: 140,
    pctX: 50,
    pctY: 50,
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
    svgX: 130,
    svgY: 215,
    pctX: 26,
    pctY: 76.8,
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
    svgX: 370,
    svgY: 215,
    pctX: 74,
    pctY: 76.8,
    commitHash: '0x4d5b',
    slug: 'campus-solutions-pipeline',
    summary: 'Verified student submissions undergoing review'
  }
];

export function HeroGitGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<GitNode>(gitNodes[0]);
  const [tilt, setTilt] = useState({ rotX: 4, rotY: -3, mouseX: 50, mouseY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Restrained subtle tilt for razor-sharp alignment and readability
    const rotX = (y - 0.5) * -8;
    const rotY = (x - 0.5) * 10;
    setTilt({ rotX, rotY, mouseX: x * 100, mouseY: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 4, rotY: -3, mouseX: 50, mouseY: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Precision Styled OLED Card Container */}
      <div
        style={{
          transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
          transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
        }}
        className="relative w-full rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden"
      >
        {/* Soft specular cursor glow */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-30 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(350px circle at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(212, 175, 90, 0.15), transparent 70%)`,
          }}
        />

        {/* Ambient atmospheric glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

        {/* Header bar with terminal controls */}
        <div className="flex items-center justify-between border-b border-border/70 pb-3 text-xs mono">
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

        {/* Neural Network / Git Branch Visual Arena */}
        <div className="relative mt-4 h-[260px] sm:h-[290px] w-full rounded-2xl bg-muted/30 border border-border/60 overflow-hidden">
          {/* Subtle developer grid floor pattern */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG Connection Mesh with Mathematically Aligned Curves */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 500 280"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6c978" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4af5a" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6c978" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6c978" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" />
              </linearGradient>

              <filter id="branch-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit guide rings centered at main hub (250, 140) */}
            <circle cx="250" cy="140" r="75" fill="none" stroke="rgba(212, 175, 90, 0.15)" strokeDasharray="3 3" />
            <circle cx="250" cy="140" r="145" fill="none" stroke="rgba(212, 175, 90, 0.08)" strokeDasharray="4 4" />

            {/* Branch 1: Center (250, 140) to Event Platform (370, 65) */}
            <path
              d="M 250,140 C 295,140 330,105 370,65"
              fill="none"
              stroke="url(#grad-gold)"
              strokeWidth={activeNode.id === 'events' ? 2.5 : 1.75}
              strokeDasharray="5 4"
              className="git-branch-line"
              filter="url(#branch-glow)"
            />

            {/* Branch 2: Center (250, 140) to Grow with Git (130, 215) */}
            <path
              d="M 250,140 C 205,140 170,175 130,215"
              fill="none"
              stroke="url(#grad-blue)"
              strokeWidth={activeNode.id === 'curriculum' ? 2.5 : 1.75}
              strokeDasharray="5 4"
              className="git-branch-line"
              filter="url(#branch-glow)"
            />

            {/* Branch 3: Center (250, 140) to Capstone Pipeline (370, 215) */}
            <path
              d="M 250,140 C 295,140 330,175 370,215"
              fill="none"
              stroke="url(#grad-amber)"
              strokeWidth={activeNode.id === 'capstones' ? 2.5 : 1.75}
              strokeDasharray="5 4"
              className="git-branch-line"
              filter="url(#branch-glow)"
            />

            {/* Terminal Hub Anchor Circles right at the junction points */}
            {gitNodes.map((n) => {
              const isSelected = activeNode.id === n.id;
              return (
                <g key={`hub-${n.id}`}>
                  {/* Subtle radiating aura ring */}
                  <circle
                    cx={n.svgX}
                    cy={n.svgY}
                    r={isSelected ? 16 : 10}
                    fill={isSelected ? `${n.accent}20` : 'transparent'}
                    stroke={isSelected ? n.accent : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isSelected ? 1.5 : 1}
                    className="transition-all duration-300"
                  />
                  {/* Outer solid color dot */}
                  <circle
                    cx={n.svgX}
                    cy={n.svgY}
                    r="5"
                    fill={n.accent}
                    className="transition-all duration-300"
                  />
                  {/* Inner white core */}
                  <circle
                    cx={n.svgX}
                    cy={n.svgY}
                    r="2"
                    fill="#ffffff"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Node Buttons precisely anchored at corresponding node centers */}
          {gitNodes.map((node) => {
            const isSelected = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                className={`absolute group/node cursor-pointer focus:outline-none transition-transform duration-200 z-10 ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{
                  left: `${node.pctX}%`,
                  top: `${node.pctY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={`Inspect ${node.name}`}
              >
                {/* Active Ping Glow */}
                {isSelected && (
                  <div
                    className="absolute -inset-1 rounded-full animate-ping opacity-40 pointer-events-none"
                    style={{ backgroundColor: node.accent }}
                  />
                )}

                {/* Tactile Capsule Pill */}
                <div
                  className={`relative flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-md transition-all select-none ${
                    isSelected
                      ? 'bg-card text-foreground border-2 shadow-[0_0_20px_rgba(212,175,90,0.3)]'
                      : 'bg-card/90 text-muted-foreground border border-border/80 hover:text-foreground hover:border-primary/50'
                  }`}
                  style={{
                    borderColor: isSelected ? node.accent : undefined,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: node.accent }}
                  />
                  <span className="mono text-[11px] sm:text-xs font-bold whitespace-nowrap text-foreground">
                    {node.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Precision Active Node Detail Card Preview */}
        <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-4 shadow-sm transition-all">
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

            <div className="flex items-center gap-1.5 mono text-[11px] text-muted-foreground">
              <GitCommit size={13} className="text-primary" />
              <span>commit {activeNode.commitHash}</span>
            </div>
          </div>

          <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="display text-base sm:text-lg font-bold text-foreground">
                {activeNode.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 break-words">
                {activeNode.summary}
              </p>
            </div>

            <Link
              href={`/projects/${activeNode.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:scale-[1.02] transition-transform shadow-xs shrink-0 self-start sm:self-auto"
            >
              <span>Explore Build</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
