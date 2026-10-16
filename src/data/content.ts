// ============================================================================
// SITE CONTENT — single source of truth for everything editable on the page.
//
// This file holds no layout/styling logic — components read from here and
// render it. To add or change what's *shown* on the site (a new project, a
// new achievement, a link, resume path, etc.), edit the arrays/objects below.
// See WORKFLOW.md at the project root for a step-by-step editing guide.
// ============================================================================

// ----------------------------------------------------------------------------
// siteMeta — canonical profile links and file paths, reused across sections
// (nav actions, hero buttons, the Contact card, footer credit, etc.) so each
// URL/path is defined exactly once.
// ----------------------------------------------------------------------------
export const siteMeta = {
  githubUrl: "https://github.com/debopamghosh12",
  linkedinUrl: "https://www.linkedin.com/in/debopam-ghosh12/",
  email: "debopamghosh2004@gmail.com",
  /** Root-relative path — the file living at public/resume.pdf. */
  resumePath: "/resume.pdf",
};

// ----------------------------------------------------------------------------
// nav — top navigation bar wordmark + section links.
// ----------------------------------------------------------------------------
export const nav = {
  wordmark: "debopam.dev",
  links: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Work", href: "#work" },
    { label: "Open Source", href: "#open-source" },
    { label: "Contact", href: "#contact" },
  ],
};

// ----------------------------------------------------------------------------
// heroContent — the top hero section: status line, headline, subhead, and
// its row of action buttons. The hero's small social icon row is driven by
// `contactLinks` below (see Hero.tsx), not duplicated here.
// ----------------------------------------------------------------------------
export const heroContent = {
  eyebrow: "open to software engineering roles — 2027",
  headlinePre: "I build the ",
  headlineAccent: "systems",
  headlinePost: " that keep everything else running.",
  subhead:
    "Backend-focused software engineer working across APIs, data pipelines, and ML-adjacent systems. Final-year CSBS student at Academy of Technology, Kolkata.",
  ctaPrimary: { label: "See the work", href: "#work" },
  resumeAction: { label: "Resume", href: siteMeta.resumePath },
  contactAction: { label: "Contact", href: "#contact" },
};

// ----------------------------------------------------------------------------
// aboutContent — About section copy: intro paragraphs (rendered in order)
// and the fact list (Institution / Program / Based in / Focus).
// ----------------------------------------------------------------------------
export const aboutContent = {
  index: "00",
  title: "About",
  paragraphs: [
    "I'm a backend-first, systems-minded engineer in my final year of a CSBS program at Academy of Technology, Kolkata. I care more about how a system behaves under load, bad data, and edge cases than how it looks — the interesting problems live in the plumbing.",
    "Most of my work sits across FastAPI, Spring Boot, and Node.js/Express, building APIs and data pipelines that other things depend on. Over the last year that's pulled me increasingly into ML-adjacent territory — forecasting, classification, and the infrastructure needed to serve those models reliably.",
    "This year I was integration lead on MedCare Pharma, a full pharma supply-chain platform, and I rebuilt my final-year project, BlockEvidence, as a Spring Boot backend on a real Hyperledger Fabric ledger with per-user identities and envelope encryption.",
    "Lately I've been contributing to open source data tooling — fixing change-data-capture bugs in Kestra's Debezium plugin and building shared embedding infrastructure for Filament's vector-database sinks.",
  ],
  facts: [
    { label: "Institution", value: "Academy of Technology, Kolkata" },
    { label: "Program", value: "CSBS · Class of 2027" },
    { label: "Based in", value: "Kolkata, West Bengal" },
    { label: "Focus", value: "Backend systems · ML-adjacent infra" },
  ],
};

// ----------------------------------------------------------------------------
// stackContent / stackIcons — the Stack section header, and the ordered list
// of tech-icon tiles.
//
// `iconKey` must match the name of a `simple-icons` export (e.g. "siReact").
// Adding an icon that isn't already imported in Stack.tsx requires adding
// that one import + map entry there too — simple-icons has thousands of
// icons, so the component only imports the ones actually used. See
// WORKFLOW.md for the exact steps.
// ----------------------------------------------------------------------------
export const stackContent = {
  index: "01",
  title: "Stack",
  label: "Tech Stack",
};

export type StackIcon = {
  name: string;
  iconKey: string;
};

export const stackIcons: StackIcon[] = [
  { name: "TypeScript", iconKey: "siTypescript" },
  { name: "JavaScript", iconKey: "siJavascript" },
  { name: "Python", iconKey: "siPython" },
  { name: "Java", iconKey: "deviconJava" },
  { name: "C++", iconKey: "siCplusplus" },
  { name: "Node.js", iconKey: "siNodedotjs" },
  { name: "React", iconKey: "siReact" },
  { name: "Next.js", iconKey: "siNextdotjs" },
  { name: "Tailwind CSS", iconKey: "siTailwindcss" },
  { name: "Express", iconKey: "siExpress" },
  { name: "FastAPI", iconKey: "siFastapi" },
  { name: "Flask", iconKey: "siFlask" },
  { name: "Spring Boot", iconKey: "siSpringboot" },
  { name: "Docker", iconKey: "siDocker" },
  { name: "Vercel", iconKey: "siVercel" },
  { name: "PostgreSQL", iconKey: "siPostgresql" },
  { name: "MongoDB", iconKey: "siMongodb" },
  { name: "Supabase", iconKey: "siSupabase" },
  { name: "Git", iconKey: "siGit" },
  { name: "GitHub", iconKey: "siGithub" },
  { name: "Figma", iconKey: "siFigma" },
  { name: "Postman", iconKey: "siPostman" },
];

// ----------------------------------------------------------------------------
// githubActivityContent — GitHub contribution-graph section header + the
// username whose public contributions are fetched and rendered.
// ----------------------------------------------------------------------------
export const githubActivityContent = {
  index: "02",
  title: "GitHub activity",
  username: "debopamghosh12",
};

// ----------------------------------------------------------------------------
// workContent / projects — Work section header, and one entry per pipeline
// module, in display order. Adding an object here is enough to add a new
// module to the page — no component changes needed.
//
// `flagship: true` gives a module the filled dot marker + bold tag styling
// (currently only MedCare Pharma); every other module uses `false`.
// `demoUrl` is optional — omit it entirely until a project has a live demo
// (no placeholder/dead links).
// ----------------------------------------------------------------------------
export const workContent = {
  index: "03",
  title: "Work",
};

export type Project = {
  name: string;
  tag: string;
  flagship: boolean;
  description: string;
  metric?: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    name: "MedCare Pharma",
    tag: "Flagship · Supply chain",
    flagship: true,
    description:
      "An end-to-end pharma supply-chain platform that combines demand-sensing and replenishment planning with autonomous procure-to-pay. Built as integration lead, wiring forecasting, expiry-aware stock allocation, supplier scoring, and OCR-based invoice processing into one working system.",
    metric: "XGBRegressor forecast model · 14.2% MAPE · 3-way invoice matching at 2% tolerance.",
    tags: ["FastAPI", "React/Vite", "XGBoost", "OCR", "Docker"],
    githubUrl: "https://github.com/debopamghosh12/Cognizant_Hackathon",
  },
  {
    name: "BlockEvidence",
    tag: "Final-year project",
    flagship: false,
    description:
      "A tamper-evident crime-evidence management system: a Spring Boot rewrite of my earlier Node.js/Hyperledger Fabric prototype, with a Next.js frontend. Every ledger write is signed with the calling user's own Fabric-CA-issued identity and checked again inside Go chaincode. Evidence is never deleted — updates are versioned, disposal needs approval, and a verify endpoint re-hashes files against the ledger. Files are envelope-encrypted (a per-file AES-256-GCM key wrapped with RSA-OAEP per authorised user) before going to IPFS, and a ledger event listener syncs chaincode writes into Postgres for search, dashboards, and live tamper alerts.",
    metric: "6 roles · two-step custody transfer · SHA-256 verify · chain-of-custody PDF reports",
    tags: ["Java 21", "Spring Boot", "Hyperledger Fabric", "Go chaincode", "IPFS", "PostgreSQL", "Next.js"],
    githubUrl: "https://github.com/debopamghosh12/Crime_evidence_Spring",
  },
  {
    name: "Matchday",
    tag: "Live · Serverless",
    flagship: false,
    description:
      "A football calendar for Indian fans: fixtures, live scores, tables, and top scorers for Europe's big leagues and the Champions League, with every kick-off on the correct IST date. A Vercel serverless proxy keeps the API key off the client and layers CDN caching (stale-while-revalidate), per-instance caching, and React Query so the whole app fits inside the API's 10-requests-per-minute free tier. Installable PWA with .ics calendar export and team follow feeds.",
    metric: "3-level caching · 29-day range in 3 upstream calls · UTC→IST date boundaries",
    tags: ["React", "TypeScript", "Vercel Functions", "React Query", "PWA"],
    githubUrl: "https://github.com/debopamghosh12/Matchday",
    demoUrl: "https://matchday-two-beryl.vercel.app/",
  },
  {
    name: "Sanvix",
    tag: "SIH 2024 · Finalist",
    flagship: false,
    description:
      "FastAPI backend with 8+ REST endpoints (auth, medicine search, prescription scanning, subscriptions, payments) on Supabase PostgreSQL, as backend lead in a 5-member hackathon team. Built an AI-assisted prescription-scanning pipeline using fuzzy string matching to resolve OCR-extracted medicine names, plus an automated refill-reminder engine. Secured multi-patient access with Supabase Auth + Row-Level Security.",
    metric: "8+ REST endpoints · 80%+ match-confidence threshold",
    tags: ["FastAPI", "Supabase", "PostgreSQL", "React 19"],
    githubUrl: "https://github.com/debopamghosh12/Sanvix_hacksprite",
  },
  {
    name: "Code Arena",
    tag: "Real-time",
    flagship: false,
    description:
      "RESTful backend managing 300+ algorithm challenges with automated test-case validation and difficulty scaling, plus a sandboxed remote code execution engine for C++/Python submissions. Real-time collaboration via Socket.io with sub-100ms sync, deployed on Render with automated CI/CD health-check cron jobs.",
    metric: "300+ challenges · sub-100ms sync · 99% uptime",
    tags: ["Node.js", "Express", "Socket.io", "MongoDB Atlas", "React.js"],
    githubUrl: "https://github.com/debopamghosh12/CodeArena",
  },
  {
    name: "Persist",
    tag: "Live · Personal tool",
    flagship: false,
    description:
      "The study tracker I use for placement season: a 13-week plan across five subjects with an hour-by-hour daily timetable, automatic carry-forward of unfinished tasks at midnight, honest streak rules, weekly reviews, and a GitHub-style heatmap. Works offline from local storage first, with optional cross-device sync through Supabase magic-link auth and Row-Level Security.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vitest"],
    githubUrl: "https://github.com/debopamghosh12/Streak_Tracker",
    demoUrl: "https://streak-tracker-liart-chi.vercel.app/",
  },
  {
    name: "AssetPulse",
    tag: "Systems",
    flagship: false,
    description:
      "Production-ready REST API (Spring Boot + Spring Data JPA) managing assets with a PostgreSQL backend and UUID-based entity IDs. Layered Controller → Service → Repository architecture following SOLID principles, packaged as a runnable JAR via Maven with JUnit test coverage.",
    tags: ["Java 21", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Maven"],
    githubUrl: "https://github.com/debopamghosh12/AssetPulse",
  },
  {
    name: "VectorDB_personal",
    tag: "Personal project",
    flagship: false,
    description:
      "A vector database and semantic search engine built from scratch — implements cosine similarity search over embeddings generated with Sentence-Transformers, with PCA-based dimensionality reduction for visualizing the vector space, wrapped in a Streamlit interface.",
    tags: ["NumPy", "Sentence-Transformers", "PCA", "Streamlit", "Python"],
    githubUrl: "https://github.com/debopamghosh12/VectorDB_personal",
  },
];

// ----------------------------------------------------------------------------
// openSourceContent / openSource — Open Source section header, and one row
// per contribution, in display order. Each row links to its repository.
// ----------------------------------------------------------------------------
export const openSourceContent = {
  index: "04",
  title: "Open Source",
};

export type OpenSourceItem = {
  project: string;
  description: string;
  url: string;
};

export const openSource: OpenSourceItem[] = [
  {
    project: "Kestra · plugin-debezium",
    description:
      "Fixed change-data-capture bugs in Kestra's Debezium plugin (Java): delete events weren't being dropped when deleted: DROP was set, and MicroDuration values were being converted from the wrong unit. Part of Kestra's Hacktoberfest 2026.",
    url: "https://github.com/kestra-io/plugin-debezium",
  },
  {
    project: "Filament · galaxy-io",
    description:
      "Opened issue #557 on flaws in the Milvus and Qdrant vector-database sinks, and am building the shared internal/embedding package that those sinks and upcoming Pinecone support will build on (Go).",
    url: "https://github.com/galaxy-io/filament",
  },
];

// ----------------------------------------------------------------------------
// achievementsContent / achievements — Achievements & Certifications section
// header, and one row per entry, in display order.
// ----------------------------------------------------------------------------
export const achievementsContent = {
  index: "05",
  title: "Achievements & Certifications",
};

export type Achievement = {
  label: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    label: "Smart India Hackathon 2024",
    description:
      "Institutional Finalist — selected and nominated by Academy of Technology among top teams for National Finals consideration.",
  },
  {
    label: "Amazon ML Challenge 2025",
    description: "Ranked 1309 out of 8,000+ participants — top 16% globally.",
  },
  {
    label: "TCS CodeVita Season 13",
    description: "Cleared Round 1 with a global rank of 12,233.",
  },
  {
    label: "Competitive Programming",
    description:
      "Codeforces max rating 1223 (Terminator12) and regular LeetCode practice (Debopam_), working through structured DSA sheets.",
  },
  {
    label: "Machine Learning Specialization",
    description: "Certification issued by Andrew Ng, via Coursera.",
  },
];

// ----------------------------------------------------------------------------
// contactContent / contactLinks — Contact section header/copy, and the list
// of channels. `contactLinks` is the single source for both the Contact
// card's channel list and the hero's small icon-button row (Hero.tsx picks a
// fixed icon order from this same array — see the comment there).
// ----------------------------------------------------------------------------
export const contactContent = {
  index: "06",
  title: "Contact",
  eyebrow: "Let's work together",
  heading: "Get in Touch",
  supporting:
    "Open to opportunities and always happy to talk about my work — pick whichever's easiest.",
};

export type ContactLink = {
  icon: "github" | "mail" | "linkedin";
  label: string;
  description?: string;
  url: string;
};

export const contactLinks: ContactLink[] = [
  {
    icon: "github",
    label: "GitHub",
    description: "Repos, contributions & open source",
    url: siteMeta.githubUrl,
  },
  {
    icon: "mail",
    label: siteMeta.email,
    description: "Direct email",
    url: `mailto:${siteMeta.email}`,
  },
  {
    icon: "linkedin",
    label: "Connect on LinkedIn",
    description: "Updates & professional background",
    url: siteMeta.linkedinUrl,
  },
];

// ----------------------------------------------------------------------------
// footer — bottom credit line.
// ----------------------------------------------------------------------------
export const footer = {
  text: `© ${new Date().getFullYear()} Debopam Ghosh — built with React, Three.js, and GSAP.`,
};
