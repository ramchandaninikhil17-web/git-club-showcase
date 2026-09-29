export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  category: string;
  status: 'Live' | 'Beta' | 'Research';
  featured?: boolean;
  verified?: boolean;
  isUpcoming?: boolean;
  trustBadge?: string;
  submissionNotice?: string;
  accent: string;
  cover: string;
  tags: string[];
  stack: string[];
  department: string;
  updatedAt: string;
  stars?: number;
  forks?: number;
  license: string;
  branch: string;
  githubUrl: string;
  demoUrl?: string;
  team: {
    name: string;
    role: string;
    initials: string;
    department?: string;
    github?: string;
  }[];
  metrics: { value: string; label: string }[];
  brief: {
    problemBrief: string;
    innovationBrief: string;
    impactBrief: string;
  };
  problem: string;
  solution: string;
  whyItMatters: {
    before: string;
    after: string;
    impactNote: string;
  };
  workflow: { title: string; copy: string }[];
  features: { title: string; copy: string; badge?: string }[];
  architecture: { layer: string; technology: string; purpose: string }[];
  techDecisions: { technology: string; rationale: string }[];
  timeline: { date: string; title: string; copy: string }[];
  links: { label: string; href: string }[];
  gallery: { title: string; copy: string; visual: string }[];
};

export type ClubEvent = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  eligibility: string;
  format: string;
  contacts: { name: string; phone: string }[];
  portalUrl: string;
  instagramUrl: string;
};

export const verifiedClubEvents: ClubEvent[] = [
  {
    id: 'chamber-of-secrets',
    name: 'CHARUSAT and The Chamber of Secrets',
    tagline: 'A campus-wide cryptic treasure quest and riddle hunt.',
    description: 'Step into a world of mysterious clues, code snippets, and hidden chambers. Solve physical and intellectual puzzles, decode secrets, and follow the magical trail across the campus to uncover the chamber\'s treasure.',
    date: '30 September 2026',
    time: '9:10 AM – 4:20 PM',
    venue: 'A6 Building, 1st Floor Seminar Hall, CHARUSAT',
    eligibility: 'First Year Wizards (First Year Students)',
    format: 'Campus-wide intellectual & physical puzzle quest',
    contacts: [
      { name: 'Ohm Bhatia', phone: '+91 8849379509' },
      { name: 'Om Rashiya', phone: '+91 9727662885' }
    ],
    portalUrl: 'https://gitclub.hogwartsxcharusat.workers.dev/#events',
    instagramUrl: 'https://www.instagram.com/gitclub.charusat/'
  },
  {
    id: 'coding-wizards',
    name: 'Coding Wizards — Think · Code · Solve',
    tagline: 'An intensive 6-hour hackathon-style competitive coding arena.',
    description: 'Team up with fellow student developers to analyze real-world problem statements, build elegant software solutions, and present your working creation to expert judges.',
    date: '01 October 2026',
    time: '9:00 AM – 4:20 PM',
    venue: 'A6 Building, 1st Floor Seminar Hall, CHARUSAT',
    eligibility: 'Juniors & Seniors (CSPIT & CHARUSAT)',
    format: '6-Hour Intensive Hackathon Sprint & Judged Presentations',
    contacts: [
      { name: 'Ohm Bhatia', phone: '+91 8849379509' },
      { name: 'Om Rashiya', phone: '+91 9727662885' }
    ],
    portalUrl: 'https://gitclub.hogwartsxcharusat.workers.dev/#events',
    instagramUrl: 'https://www.instagram.com/gitclub.charusat/'
  }
];

export const officialInstitutionalLinks = {
  gitClub: {
    name: 'GIT Club',
    fullName: 'GIT Club CSPIT CHARUSAT',
    instagram: 'https://www.instagram.com/gitclub.charusat/',
    eventPortal: 'https://gitclub.hogwartsxcharusat.workers.dev/',
    github: 'https://github.com/gitclub-charusat'
  },
  cspit: {
    name: 'CSPIT',
    fullName: 'Chandubhai S. Patel Institute of Technology',
    url: 'https://cspit.charusat.ac.in/'
  },
  charusat: {
    name: 'CHARUSAT',
    fullName: 'Charotar University of Science & Technology',
    url: 'https://www.charusat.ac.in/'
  }
};

const makeVisual = (a: string, b: string, c: string) =>
  `linear-gradient(135deg, ${a} 0%, ${b} 52%, ${c} 100%)`;

const projects: Project[] = [
  {
    slug: 'coding-wizards-platform',
    name: 'Git Club Event Platform — Coding Wizards & Chamber of Secrets',
    tagline: 'Official tournament & quest portal for Git Club CSPIT CHARUSAT.',
    description: 'The real-world web application deployed by Git Club at CSPIT CHARUSAT to coordinate the 2-day technical festival, including the campus treasure hunt and 6-hour hackathon-style coding arena.',
    year: '2026',
    category: 'Campus Events & Hackathons',
    status: 'Live',
    featured: true,
    verified: true,
    trustBadge: 'Built by CHARUSAT Students',
    accent: '#d4af5a',
    cover: makeVisual('#080b14', '#111b35', '#d4af5a'),
    tags: ['Official Event', 'Hackathon Arena', 'CSPIT', 'CHARUSAT'],
    stack: ['Cloudflare Workers', 'TypeScript', 'Tailwind CSS', 'Vite'],
    department: 'CSPIT — Information Technology & Computer Science',
    updatedAt: 'Updated for 2026 event',
    license: 'MIT',
    branch: 'main',
    githubUrl: 'https://github.com/gitclub-charusat',
    demoUrl: 'https://gitclub.hogwartsxcharusat.workers.dev/',
    team: [
      { name: 'Ohm Bhatia', role: 'Event Lead', initials: 'OB', department: 'CSPIT CHARUSAT' },
      { name: 'Om Rashiya', role: 'Event Lead', initials: 'OR', department: 'CSPIT CHARUSAT' },
      { name: 'Git Club Technical Team', role: 'Platform Engineering', initials: 'GC', department: 'CSPIT CHARUSAT' }
    ],
    metrics: [
      { value: '2 Days', label: 'Flagship Event Duration' },
      { value: '6 Hours', label: 'Hackathon Arena Sprint' },
      { value: 'A6 Hall', label: '1st Floor Seminar Hall Venue' }
    ],
    brief: {
      problemBrief: 'Students needed a unified, engaging digital portal to navigate challenges, schedule, and live rules for the university coding festival.',
      innovationBrief: 'Ultra-low latency serverless architecture deployed on Cloudflare edge workers with immersive visual identity.',
      impactBrief: 'Live deployment serving first-years, juniors, and seniors across CSPIT CHARUSAT.'
    },
    problem: 'Hosting an intensive campus hackathon with over a hundred competitive programmers requires real-time coordination, clear problem statement distribution, and an accessible schedule that handles burst traffic during event launch without downtime.',
    solution: 'The Git Club team engineered a fast, serverless web platform deployed across edge nodes, featuring event announcements, rulebooks, and live query contacts for both the Chamber of Secrets cryptic treasure quest and the Coding Wizards arena.',
    whyItMatters: {
      before: 'Scattered PDF rulebooks, confusing WhatsApp updates, and lack of a centralized destination for university tech events.',
      after: 'A unified, cinematic, responsive event hub accessible instantly from any mobile device or laptop across campus Wi-Fi.',
      impactNote: 'Powers the flagship technical festival for Git Club CSPIT CHARUSAT.'
    },
    workflow: [
      { title: '01 — Edge Deployment', copy: 'Built with Vite and TypeScript, bundled into Cloudflare Workers for instant global response times.' },
      { title: '02 — Interactive Event Matrix', copy: 'Dedicated tracks for first-year explorers and junior/senior hackathon wizards.' },
      { title: '03 — Live Contact & Queries', copy: 'Direct contact conduits with event leads Ohm Bhatia and Om Rashiya for instant team verification.' }
    ],
    features: [
      { title: 'Cinematic Visual Identity', copy: 'High-contrast cosmic obsidian and gold styling matching the Git Club identity.', badge: 'UI/UX' },
      { title: 'Chamber of Secrets Quest', copy: 'Cryptic clue solving and campus navigation challenges across CSPIT.', badge: 'Treasure Hunt' },
      { title: 'Coding Wizards Hack Arena', copy: '6-hour intensive software sprint with real-world industry problem statements.', badge: 'Hackathon' }
    ],
    architecture: [
      { layer: 'Compute & Edge', technology: 'Cloudflare Workers', purpose: 'Zero-cold-start edge compute serving static assets and dynamic routes' },
      { layer: 'Frontend', technology: 'TypeScript & Vite', purpose: 'Optimized, reactive client-side rendering with fluid animations' },
      { layer: 'Design & Tokens', technology: 'Tailwind CSS', purpose: 'Custom responsive design system with Hogwarts x Git Club color grading' }
    ],
    techDecisions: [
      { technology: 'Cloudflare Workers', rationale: 'Guaranteed 100% uptime during campus registration spikes with edge routing.' },
      { technology: 'TypeScript', rationale: 'Strict type safety preventing runtime faults during live tournament operations.' }
    ],
    timeline: [
      { date: 'Phase 1', title: 'Portal Launch & Registrations', copy: 'Event announcement and team formation opened to all CHARUSAT students.' },
      { date: '30 Sept', title: 'The Chamber of Secrets', copy: 'Campus-wide cryptic treasure hunt begins at A6 Seminar Hall.' },
      { date: '01 Oct', title: 'Coding Wizards Hackathon', copy: '6-hour hackathon arena followed by project demos and prize awards.' }
    ],
    links: [
      { label: 'Live Event Portal', href: 'https://gitclub.hogwartsxcharusat.workers.dev/' },
      { label: 'Git Club Instagram', href: 'https://www.instagram.com/gitclub.charusat/' },
      { label: 'GitHub Organization', href: 'https://github.com/gitclub-charusat' }
    ],
    gallery: [
      { title: 'Flagship Event Interface', copy: 'The interactive event showcase portal for Git Club CSPIT CHARUSAT.', visual: makeVisual('#080b14', '#111b35', '#d4af5a') },
      { title: 'Arena & Quest Tracks', copy: 'Dedicated schedule and challenge descriptions for participants.', visual: makeVisual('#111b35', '#080b14', '#e6c978') }
    ]
  },
  {
    slug: 'git-club-showcase',
    name: 'Git Club Project Showcase',
    tagline: 'Open repository and discovery archive for student-engineered software at CHARUSAT.',
    description: 'A developer-first showcase platform engineered by Git Club to index, review, and celebrate real tools, systems, and open-source contributions built by students across CHARUSAT institutes.',
    year: '2026',
    category: 'Developer Tools',
    status: 'Live',
    featured: true,
    verified: true,
    trustBadge: 'Official Git Club Initiative',
    accent: '#d4af5a',
    cover: makeVisual('#0d1424', '#162238', '#d4af5a'),
    tags: ['Open Source', 'Project Directory', 'Git Club', 'CSPIT'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Wouter'],
    department: 'CSPIT · CHARUSAT',
    updatedAt: 'Active development',
    license: 'MIT',
    branch: 'main',
    githubUrl: 'https://github.com/gitclub-charusat',
    team: [
      { name: 'Git Club Core Team', role: 'Architecture & Design', initials: 'GC', department: 'CSPIT CHARUSAT' }
    ],
    metrics: [
      { value: '100%', label: 'Open Source Community' },
      { value: 'CSPIT', label: 'Host Institute' },
      { value: 'V2.0', label: 'Showcase Architecture' }
    ],
    brief: {
      problemBrief: 'Student software projects and hackathon builds were often lost after semester submissions or event conclusions.',
      innovationBrief: 'Centralized, peer-reviewed project archive with architecture teardowns, tech stacks, and live demo access.',
      impactBrief: 'Provides a lasting portfolio of campus engineering excellence for students and prospective collaborators.'
    },
    problem: 'Without an organized, curated showcase, high-quality projects developed during university hackathons, final year capstones, and club sprints remained invisible on personal GitHub profiles with no institutional record.',
    solution: 'Git Club created this unified platform combining GitHub metadata, direct demonstration previews, and architectural breakdowns so the university community can discover and learn from peer work.',
    whyItMatters: {
      before: 'Projects discarded after grading, duplication of effort by succeeding batches, and lost portfolios.',
      after: 'A searchable, categorised, permanent showcase of student software with peer verification.',
      impactNote: 'Official showcase index for Git Club CSPIT CHARUSAT.'
    },
    workflow: [
      { title: '01 — Code Verification', copy: 'Peer review of repository structure, dependencies, and documentation.' },
      { title: '02 — Architecture Teardown', copy: 'Extracting key technical decisions and problem-solution narratives.' },
      { title: '03 — Permanent Indexing', copy: 'Published on the showcase with tech filters and live links.' }
    ],
    features: [
      { title: 'Dual-View Explorer', copy: 'Browse via dense grid cards or tabular technical views.', badge: 'UI' },
      { title: 'Deep Filter Engine', copy: 'Filter by technology stack, status, category, or search keywords.', badge: 'Search' },
      { title: 'Multi-Project Comparison', copy: 'Side-by-side technical evaluation matrix for peer architectures.', badge: 'Tools' }
    ],
    architecture: [
      { layer: 'UI Framework', technology: 'React & Vite', purpose: 'Ultra-fast client rendering with sub-second page transitions' },
      { layer: 'State & Routing', technology: 'Wouter', purpose: 'Lightweight hash/browser routing with query param sync' },
      { layer: 'Styling', technology: 'Tailwind CSS & CSS Tokens', purpose: 'Official Git Club cosmic obsidian and gold grading' }
    ],
    techDecisions: [
      { technology: 'Vite', rationale: 'Fast builds and lightweight production output for zero lag.' },
      { technology: 'Wouter', rationale: 'Minimal bundle size footprint compared to heavy routing libraries.' }
    ],
    timeline: [
      { date: 'Initial', title: 'Architecture Planning', copy: 'Showcase schema and data modeling established.' },
      { date: 'Current', title: 'Official Launch', copy: 'Connected to official Git Club, CSPIT, and CHARUSAT domains.' }
    ],
    links: [
      { label: 'GitHub Organization', href: 'https://github.com/gitclub-charusat' },
      { label: 'Official Event Portal', href: 'https://gitclub.hogwartsxcharusat.workers.dev/' },
      { label: 'Git Club Instagram', href: 'https://www.instagram.com/gitclub.charusat/' }
    ],
    gallery: [
      { title: 'Project Explorer', copy: 'The responsive project discovery interface.', visual: makeVisual('#080b14', '#111b35', '#d4af5a') },
      { title: 'Technical Comparison', copy: 'Multi-project architectural comparison matrix.', visual: makeVisual('#111b35', '#080b14', '#e6c978') }
    ]
  },
  {
    slug: 'grow-with-git',
    name: 'Grow With Git — Hands-On Curriculum & Certification Track',
    tagline: 'Version control laboratory track and GitHub certification roadmap.',
    description: 'The practical workshop and lab curriculum conducted by Git Club across CSPIT computer labs to teach Git CLI fundamentals, branch workflows, collaborative pull requests, and GitHub certification pathways.',
    year: '2026',
    category: 'Open Source & Education',
    status: 'Live',
    featured: true,
    verified: true,
    trustBadge: 'Official Club Curriculum',
    accent: '#38bdf8',
    cover: makeVisual('#080f20', '#102244', '#38bdf8'),
    tags: ['Workshops', 'Certification', 'CSPIT Labs', 'Version Control'],
    stack: ['Git', 'GitHub', 'GitHub Actions', 'Markdown', 'CLI'],
    department: 'CSPIT · CHARUSAT',
    updatedAt: 'Active academic year track',
    license: 'CC-BY-4.0',
    branch: 'main',
    githubUrl: 'https://github.com/gitclub-charusat',
    team: [
      { name: 'Git Club Mentors', role: 'Lab Instructors & Workshop Leads', initials: 'GC', department: 'CSPIT CHARUSAT' }
    ],
    metrics: [
      { value: 'CSPIT', label: 'Computer Lab Sessions' },
      { value: 'Git CLI', label: 'Hands-on Curriculum' },
      { value: 'Annual', label: 'Certification Journey' }
    ],
    brief: {
      problemBrief: 'Students often learn coding syntax without mastering collaborative version control and terminal workflows.',
      innovationBrief: 'Hands-on lab modules focused on interactive Git graph commands, merge conflict resolution, and pull request hygiene.',
      impactBrief: 'Elevates the open-source readiness of engineers across CSPIT and CHARUSAT.'
    },
    problem: 'Standard academic syllabi rarely dedicate sufficient lab time to advanced Git workflows, cherry-picking, rebase operations, and real-world GitHub team permissions.',
    solution: 'Git Club structured an ongoing practical curriculum conducted in CSPIT labs, pairing senior student mentors with junior developers to practice version control in real repository simulations.',
    whyItMatters: {
      before: 'Code shared via zip archives or single-branch commits with broken histories.',
      after: 'Professional branch hygiene, semantic commit messages, and confident open-source contribution.',
      impactNote: 'Flagship skill-building initiative of Git Club at CSPIT CHARUSAT.'
    },
    workflow: [
      { title: '01 — Terminal Basics', copy: 'Configuring Git CLI, SSH authentication, and working directory mechanics.' },
      { title: '02 — Branching Strategies', copy: 'Feature branching, rebasing, and resolving tricky merge conflicts.' },
      { title: '03 — Pull Requests & CI', copy: 'Peer review standards, GitHub Actions pipelines, and open-source contribution.' }
    ],
    features: [
      { title: 'Interactive Lab Worksheets', copy: 'Step-by-step terminal exercises designed for CSPIT lab environments.', badge: 'Labs' },
      { title: 'GitHub Foundations Path', copy: 'Structured prep roadmap for official GitHub certification exams.', badge: 'Certification' },
      { title: 'Open Source Mentorship', copy: 'Guidance on finding good first issues and contributing to upstream projects.', badge: 'Community' }
    ],
    architecture: [
      { layer: 'Curriculum Content', technology: 'Markdown & Git', purpose: 'Open-source documentation maintained via pull requests' },
      { layer: 'Automation', technology: 'GitHub Actions', purpose: 'Automated validation of lab exercises and exercise repositories' }
    ],
    techDecisions: [
      { technology: 'Git CLI', rationale: 'Prioritizes terminal command mastery before introducing GUI wrappers.' },
      { technology: 'GitHub Actions', rationale: 'Teaches modern CI/CD directly inside student repository workflows.' }
    ],
    timeline: [
      { date: 'Phase 1', title: 'Core Git Workshops', copy: 'Semester initiation hands-on sessions for first and second year students.' },
      { date: 'Phase 2', title: 'Certification Bootcamps', copy: 'Intensive prep sessions for GitHub Foundation credentials.' }
    ],
    links: [
      { label: 'Git Club Instagram', href: 'https://www.instagram.com/gitclub.charusat/' },
      { label: 'GitHub Organization', href: 'https://github.com/gitclub-charusat' },
      { label: 'CSPIT Institute Portal', href: 'https://cspit.charusat.ac.in/' }
    ],
    gallery: [
      { title: 'Curriculum Modules', copy: 'The hands-on workshop guide for version control mastery.', visual: makeVisual('#080f20', '#102244', '#38bdf8') },
      { title: 'Lab Practice', copy: 'Branching and conflict resolution exercises.', visual: makeVisual('#102244', '#080f20', '#60a5fa') }
    ]
  },
  {
    slug: 'campus-solutions-pipeline',
    name: 'Campus Engineering & IDP/UDP Capstone Index',
    tagline: 'Project information coming soon',
    description: 'Submissions are currently open for CSPIT and CHARUSAT students. Final year Industry Defined Projects (IDP), User Defined Projects (UDP), and hackathon solutions will be indexed here after peer review.',
    year: '2026',
    category: 'Campus Systems',
    status: 'Beta',
    featured: false,
    verified: false,
    isUpcoming: true,
    trustBadge: 'Submissions Open',
    submissionNotice: 'Project information coming soon — Verified submissions open for CHARUSAT students.',
    accent: '#f59e0b',
    cover: makeVisual('#121624', '#1f273d', '#f59e0b'),
    tags: ['Submissions Open', 'IDP / UDP', 'Campus Systems', 'CSPIT'],
    stack: ['Peer Review in Progress'],
    department: 'CSPIT · CHARUSAT (All Departments)',
    updatedAt: 'Submissions open',
    license: 'Pending Review',
    branch: 'main',
    githubUrl: 'https://github.com/gitclub-charusat',
    team: [
      { name: 'CHARUSAT Student Builders', role: 'Submissions Open', initials: 'CS', department: 'CSPIT & CHARUSAT' }
    ],
    metrics: [
      { value: 'Open', label: 'Call for Projects' },
      { value: 'CSPIT', label: 'All Disciplines' },
      { value: 'Peer Review', label: 'Review Process' }
    ],
    brief: {
      problemBrief: 'Project information coming soon — submissions currently being gathered from campus innovators.',
      innovationBrief: 'Curated technical validation by Git Club before public indexing.',
      impactBrief: 'Will connect student engineering teams with campus recognition and mentorship.'
    },
    problem: 'Project information coming soon. This slot is reserved for authentic student capstone projects currently undergoing code review and repository validation by Git Club.',
    solution: 'Students from CSPIT and CHARUSAT are invited to submit their repositories and live links to be indexed with verified contributor badges and architectural breakdowns.',
    whyItMatters: {
      before: 'Unverified project claims and lost capstone software.',
      after: 'Genuine, verified engineering records evaluated by peers.',
      impactNote: 'Submit your project via Git Club to appear in this verified index.'
    },
    workflow: [
      { title: '01 — Project Submission', copy: 'Submit repository link, team details, and live deployment credentials.' },
      { title: '02 — Repository Review', copy: 'Git Club reviews code quality, documentation, and licensing.' },
      { title: '03 — Verified Publication', copy: 'Published on the showcase with verified contributor attribution.' }
    ],
    features: [
      { title: 'Submissions Open', copy: 'Open to all registered CHARUSAT students across engineering disciplines.', badge: 'Open' },
      { title: 'Code Hygiene Check', copy: 'Verification of README, license, and repository best practices.', badge: 'Review' }
    ],
    architecture: [
      { layer: 'Submission Pipeline', technology: 'Git Club Review', purpose: 'Authenticity verification and metadata validation' }
    ],
    techDecisions: [
      { technology: 'Verified Review', rationale: 'Guarantees that every project indexed represents authentic student software.' }
    ],
    timeline: [
      { date: 'Current', title: 'Open Call for Submissions', copy: 'Accepting submissions from CSPIT and CHARUSAT students.' }
    ],
    links: [
      { label: 'Submit via Instagram', href: 'https://www.instagram.com/gitclub.charusat/' },
      { label: 'GitHub Organization', href: 'https://github.com/gitclub-charusat' },
      { label: 'CSPIT Official', href: 'https://cspit.charusat.ac.in/' }
    ],
    gallery: [
      { title: 'Submissions Open', copy: 'Submit your authentic project to Git Club.', visual: makeVisual('#121624', '#1f273d', '#f59e0b') }
    ]
  },
  {
    slug: 'aiml-engineering-pipeline',
    name: 'AI, Machine Learning & Intelligent Systems Track',
    tagline: 'Project information coming soon',
    description: 'Machine learning models, computer vision pipelines, and intelligent systems developed by CSPIT and CHARUSAT students currently undergoing evaluation for showcase archiving.',
    year: '2026',
    category: 'AI & Machine Learning',
    status: 'Research',
    featured: false,
    verified: false,
    isUpcoming: true,
    trustBadge: 'Review in Progress',
    submissionNotice: 'Project information coming soon — Submissions undergoing code verification.',
    accent: '#a855f7',
    cover: makeVisual('#171026', '#251b3d', '#a855f7'),
    tags: ['AI / ML', 'Research', 'Submissions Open', 'CHARUSAT'],
    stack: ['Evaluation in Progress'],
    department: 'CSPIT & DEPSTAR — Computer Engineering',
    updatedAt: 'Evaluation in progress',
    license: 'Pending Review',
    branch: 'main',
    githubUrl: 'https://github.com/gitclub-charusat',
    team: [
      { name: 'Student AI/ML Researchers', role: 'Submissions Open', initials: 'AI', department: 'CHARUSAT' }
    ],
    metrics: [
      { value: 'AI / ML', label: 'Domain Category' },
      { value: 'Review', label: 'Evaluation Phase' },
      { value: 'Open', label: 'Student Submissions' }
    ],
    brief: {
      problemBrief: 'Project information coming soon — machine learning projects undergoing repository verification.',
      innovationBrief: 'Focusing on reproducible datasets, model weights, and clear problem scopes.',
      impactBrief: 'Showcases student research in practical artificial intelligence.'
    },
    problem: 'Project information coming soon. Student AI/ML projects submitted to Git Club are evaluated for reproducibility and code quality prior to public showcase listing.',
    solution: 'This slot will highlight verified machine learning solutions built by CHARUSAT students that solve practical problems with genuine datasets.',
    whyItMatters: {
      before: 'Unverified claims about model accuracy without code proof.',
      after: 'Tested repositories with clear documentation and instructions.',
      impactNote: 'Submissions open for student AI/ML builders.'
    },
    workflow: [
      { title: '01 — Model Verification', copy: 'Checking inference code, requirements, and training scripts.' },
      { title: '02 — Documentation Audit', copy: 'Ensuring model architecture and dataset sources are properly cited.' }
    ],
    features: [
      { title: 'Reproducible Models', copy: 'Prioritizing projects with clear test scripts and reproducible metrics.', badge: 'Quality' }
    ],
    architecture: [
      { layer: 'Evaluation', technology: 'Peer Verification', purpose: 'Ensures genuine technical claims' }
    ],
    techDecisions: [
      { technology: 'Authenticity First', rationale: 'Never fabricating model metrics or test scores.' }
    ],
    timeline: [
      { date: 'Current', title: 'Evaluation Phase', copy: 'Reviewing student machine learning submissions.' }
    ],
    links: [
      { label: 'Git Club Instagram', href: 'https://www.instagram.com/gitclub.charusat/' },
      { label: 'GitHub Organization', href: 'https://github.com/gitclub-charusat' }
    ],
    gallery: [
      { title: 'AI/ML Track', copy: 'Machine learning track coming soon.', visual: makeVisual('#171026', '#251b3d', '#a855f7') }
    ]
  },
  {
    slug: 'open-source-tools-pipeline',
    name: 'Open Source Utilities, CLI Tools & Libraries',
    tagline: 'Project information coming soon',
    description: 'Developer tooling, terminal CLI utilities, and reusable packages authored by Git Club members. Verified repository links and package details will be posted as each repository is approved.',
    year: '2026',
    category: 'Developer Tools',
    status: 'Research',
    featured: false,
    verified: false,
    isUpcoming: true,
    trustBadge: 'Review in Progress',
    submissionNotice: 'Project information coming soon — Open Source review in progress.',
    accent: '#10b981',
    cover: makeVisual('#0c1a17', '#142e27', '#10b981'),
    tags: ['CLI Tools', 'Developer Utilities', 'Open Source', 'Git Club'],
    stack: ['Review in Progress'],
    department: 'CSPIT · CHARUSAT',
    updatedAt: 'Review in progress',
    license: 'MIT Pending',
    branch: 'main',
    githubUrl: 'https://github.com/gitclub-charusat',
    team: [
      { name: 'Git Club Contributors', role: 'Open Source Builders', initials: 'GC', department: 'CSPIT CHARUSAT' }
    ],
    metrics: [
      { value: 'CLI & Tools', label: 'Domain Category' },
      { value: 'Open Source', label: 'License Target' },
      { value: 'Review', label: 'Verification Phase' }
    ],
    brief: {
      problemBrief: 'Project information coming soon — open-source tooling currently under peer review.',
      innovationBrief: 'Developer ergonomics and reusable utilities authored by student engineers.',
      impactBrief: 'Will be published under verified MIT licenses on GitHub.'
    },
    problem: 'Project information coming soon. Open source developer packages are tested across platforms before receiving verified listing status.',
    solution: 'This track archives verified tools that solve daily developer friction for students and the wider open-source community.',
    whyItMatters: {
      before: 'Useful scripts lost in personal repositories.',
      after: 'Packaged, version-controlled developer tools with clear setup instructions.',
      impactNote: 'Submissions open for student open-source developers.'
    },
    workflow: [
      { title: '01 — Package Audit', copy: 'Checking build scripts, tests, and dependencies.' },
      { title: '02 — Licensing Check', copy: 'Ensuring permissive open-source licensing and clear contribution guidelines.' }
    ],
    features: [
      { title: 'Developer Ergonomics', copy: 'Terminal tools and reusable software components.', badge: 'Tools' }
    ],
    architecture: [
      { layer: 'Packaging', technology: 'Open Source', purpose: 'Standardized release workflows' }
    ],
    techDecisions: [
      { technology: 'Peer Verification', rationale: 'Ensures utilities build and install cleanly.' }
    ],
    timeline: [
      { date: 'Current', title: 'Submissions Under Review', copy: 'Reviewing student developer tools for inclusion.' }
    ],
    links: [
      { label: 'Git Club Instagram', href: 'https://www.instagram.com/gitclub.charusat/' },
      { label: 'GitHub Organization', href: 'https://github.com/gitclub-charusat' }
    ],
    gallery: [
      { title: 'Developer Tools', copy: 'Open-source utilities coming soon.', visual: makeVisual('#0c1a17', '#142e27', '#10b981') }
    ]
  }
];

export const showcaseService = {
  async listProjects(): Promise<Project[]> {
    return projects;
  },

  async getProject(slug: string): Promise<Project | undefined> {
    return projects.find((p) => p.slug === slug);
  },

  async listFeatured(): Promise<Project[]> {
    return projects.filter((p) => p.featured);
  },

  async listCategories(): Promise<string[]> {
    const cats = new Set<string>();
    projects.forEach((p) => cats.add(p.category));
    return ['All', ...Array.from(cats)];
  },

  async listTechnologies(): Promise<{ name: string; count: number; type: string; color: string }[]> {
    const techCounts: Record<string, number> = {};
    projects.forEach((p) => {
      p.stack.forEach((tech) => {
        if (!tech.includes('Progress') && !tech.includes('Review')) {
          techCounts[tech] = (techCounts[tech] || 0) + 1;
        }
      });
    });

    const techMeta: Record<string, { type: string; color: string }> = {
      'Cloudflare Workers': { type: 'Edge Compute', color: '#f38020' },
      'TypeScript': { type: 'Language', color: '#3178c6' },
      'Vite': { type: 'Build Tool', color: '#646cff' },
      'Tailwind CSS': { type: 'Styling', color: '#06b6d4' },
      'React': { type: 'Frontend Framework', color: '#61dafb' },
      'Wouter': { type: 'Routing', color: '#eab308' },
      'Git': { type: 'Version Control', color: '#f05032' },
      'GitHub': { type: 'Platform', color: '#d4af5a' },
      'GitHub Actions': { type: 'CI/CD', color: '#2088ff' },
      'Markdown': { type: 'Documentation', color: '#8b5cf6' },
      'CLI': { type: 'Terminal', color: '#22c55e' },
      'Bash': { type: 'Shell', color: '#4eaa25' }
    };

    return Object.entries(techCounts)
      .map(([name, count]) => ({
        name,
        count,
        type: techMeta[name]?.type || 'Technology',
        color: techMeta[name]?.color || '#d4af5a',
      }))
      .sort((a, b) => b.count - a.count);
  },

  async getClubStats() {
    const totalProjects = projects.length;
    const verifiedProjects = projects.filter((p) => p.verified).length;
    return {
      totalProjects,
      verifiedProjects,
      openSourceRatio: '100%',
      hostInstitute: 'CSPIT',
      university: 'CHARUSAT'
    };
  },

  async getVerifiedEvents(): Promise<ClubEvent[]> {
    return verifiedClubEvents;
  }
};