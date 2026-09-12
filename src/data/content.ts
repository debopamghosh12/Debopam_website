export const nav = {
  wordmark: "debopam.dev",
  links: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};

export const social = {
  github: "https://github.com/debopamghosh12",
  linkedin: "https://www.linkedin.com/in/debopam-ghosh12/",
  email: "mailto:debopamghosh2004@gmail.com",
  resume: "/resume.pdf",
};

export const hero = {
  eyebrow: "open to software engineering roles — 2027",
  headlinePre: "I build the ",
  headlineAccent: "systems",
  headlinePost: " that keep everything else running.",
  subhead:
    "Backend-focused software engineer working across APIs, data pipelines, and ML-adjacent systems. Final-year CSBS student at Academy of Technology, Kolkata.",
  ctaPrimary: { label: "See the work", href: "#work" },
  actions: {
    resume: { label: "Resume", href: social.resume },
    contact: { label: "Contact", href: "#contact" },
    social: [
      { icon: "linkedin" as const, label: "LinkedIn", href: social.linkedin },
      { icon: "github" as const, label: "GitHub", href: social.github },
      { icon: "mail" as const, label: "Email", href: social.email },
    ],
  },
};

export const about = {
  index: "00",
  title: "About",
  paragraphs: [
    "I'm a backend-first, systems-minded engineer in my final year of a CSBS program at Academy of Technology, Kolkata. I care more about how a system behaves under load, bad data, and edge cases than how it looks — the interesting problems live in the plumbing.",
    "Most of my work sits across FastAPI, Spring Boot, and Node.js/Express, building APIs and data pipelines that other things depend on. Over the last year that's pulled me increasingly into ML-adjacent territory — forecasting, classification, and the infrastructure needed to serve those models reliably.",
    "Most recently I was integration lead on a full pharma supply-chain platform built for a hackathon, wiring together demand forecasting, procurement automation, and invoice matching into a single working system under a hard deadline.",
  ],
  facts: [
    { label: "Institution", value: "Academy of Technology, Kolkata" },
    { label: "Program", value: "CSBS · Class of 2027" },
    { label: "Based in", value: "Haldia, West Bengal" },
    { label: "Focus", value: "Backend systems · ML-adjacent infra" },
  ],
};

export const stack = {
  index: "01",
  title: "Stack",
  label: "Tech Stack",
};

export const githubActivity = {
  index: "02",
  title: "GitHub activity",
  username: "debopamghosh12",
};

export type Project = {
  name: string;
  tag: string;
  flagship?: boolean;
  description: string;
  metric?: string;
  tags: string[];
  links?: {
    github?: string;
    demo?: string;
  };
};

const workProjects: Project[] = [
    {
      name: "MedCare Pharma",
      tag: "Flagship · Hackathon",
      flagship: true,
      description:
        "A pharma supply-chain platform combining demand-sensing/replenishment planning with autonomous procure-to-pay. Built for the Cognizant NPN Hackathon as integration lead.",
      metric: "XGBRegressor forecast model · 14.2% MAPE · 3-way invoice matching at 2% tolerance.",
      tags: ["FastAPI", "React/Vite", "XGBoost", "OCR", "Docker"],
      links: {
        github: "https://github.com/debopamghosh12/Cognizant_Hackathon",
      },
    },
    {
      name: "Sanvix",
      tag: "SIH 2024 · Finalist",
      description:
        "FastAPI backend with 8+ REST endpoints (auth, medicine search, prescription scanning, subscriptions, payments) on Supabase PostgreSQL, as backend lead in a 5-member hackathon team. Built an AI-assisted prescription-scanning pipeline using fuzzy string matching to resolve OCR-extracted medicine names, plus an automated refill-reminder engine. Secured multi-patient access with Supabase Auth + Row-Level Security.",
      metric: "8+ REST endpoints · 80%+ match-confidence threshold",
      tags: ["FastAPI", "Supabase", "PostgreSQL", "React 19"],
      links: {
        github: "https://github.com/debopamghosh12/Sanvix_hacksprite",
      },
    },
    {
      name: "Code Arena",
      tag: "Real-time",
      description:
        "RESTful backend managing 300+ algorithm challenges with automated test-case validation and difficulty scaling, plus a sandboxed remote code execution engine for C++/Python submissions. Real-time collaboration via Socket.io with sub-100ms sync, deployed on Render with automated CI/CD health-check cron jobs.",
      metric: "300+ challenges · sub-100ms sync · 99% uptime",
      tags: ["Node.js", "Express", "Socket.io", "MongoDB Atlas", "React.js"],
      links: {
        github: "https://github.com/debopamghosh12/CodeArena",
      },
    },
    {
      name: "EvidenceChain",
      tag: "Blockchain · Hackathon",
      description:
        "A forensic evidence management backend combining off-chain metadata storage on IPFS with an on-chain asset ledger on Hyperledger Fabric — built to keep a tamper-evident record of evidence handling from collection through release. Tracks evidence through a five-stage custody lifecycle (Collected → Processing → Analyzed → Archived → Released), logging every transfer between officers with a timestamp against the record, plus search and filtering by case ID, officer, status, date range, and full-text query, with pagination and bulk create/delete endpoints. Only the IPFS content pointer (CID) is written to the Fabric ledger, keeping on-chain storage lean while preserving verifiability.",
      metric: "5-stage custody lifecycle · IPFS-backed metadata · Hyperledger Fabric ledger",
      tags: ["Node.js", "Express", "Hyperledger Fabric", "IPFS", "Blockchain"],
      links: {
        github: "https://github.com/debopamghosh12/Crime_evidence_backend",
      },
    },
    {
      name: "AssetPulse",
      tag: "Systems",
      description:
        "Production-ready REST API (Spring Boot + Spring Data JPA) managing assets with a PostgreSQL backend and UUID-based entity IDs. Layered Controller → Service → Repository architecture following SOLID principles, packaged as a runnable JAR via Maven with JUnit test coverage.",
      tags: ["Java 21", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Maven"],
      links: {
        github: "https://github.com/debopamghosh12/AssetPulse",
      },
    },
    {
      name: "VectorDB_personal",
      tag: "Personal project",
      description:
        "A vector database and semantic search engine built from scratch — implements cosine similarity search over embeddings generated with Sentence-Transformers, with PCA-based dimensionality reduction for visualizing the vector space, wrapped in a Streamlit interface.",
      tags: ["NumPy", "Sentence-Transformers", "PCA", "Streamlit", "Python"],
      links: {
        github: "https://github.com/debopamghosh12/VectorDB_personal",
      },
    },
];

export const work = {
  index: "03",
  title: "Work",
  projects: workProjects,
};

export type Achievement = {
  label: string;
  value: string;
};

export const achievements = {
  index: "04",
  title: "Achievements & Certifications",
  items: [
    {
      label: "Smart India Hackathon 2024",
      value:
        "Institutional Finalist — selected and nominated by Academy of Technology among top teams for National Finals consideration.",
    },
    {
      label: "Amazon ML Challenge 2025",
      value: "Ranked 1309 out of 8,000+ participants — top 16% globally.",
    },
    {
      label: "TCS CodeVita Season 13",
      value: "Secured a global rank of 12,233, recognized for exceptional coding skills.",
    },
    {
      label: "Competitive Programming",
      value:
        "Codeforces participant, max rating 1223. Consistent practice in data structures, algorithms, and debugging logic-heavy solutions.",
    },
    {
      label: "Machine Learning Specialization",
      value: "Certification issued by Andrew Ng, via Coursera.",
    },
  ] satisfies Achievement[],
};

export type ContactChannel = {
  icon: "github" | "mail" | "linkedin";
  label: string;
  description: string;
  href: string;
};

export const contact = {
  index: "05",
  title: "Contact",
  eyebrow: "Let's work together",
  heading: "Get in Touch",
  supporting:
    "Open to opportunities and always happy to talk about my work — pick whichever's easiest.",
  channels: [
    {
      icon: "github",
      label: "GitHub",
      description: "Repos, contributions & open source",
      href: social.github,
    },
    {
      icon: "mail",
      label: "debopamghosh2004@gmail.com",
      description: "Direct email",
      href: social.email,
    },
    {
      icon: "linkedin",
      label: "Connect on LinkedIn",
      description: "Updates & professional background",
      href: social.linkedin,
    },
  ] satisfies ContactChannel[],
};

export const footer = {
  text: `© ${new Date().getFullYear()} Debopam Ghosh — built with React, Three.js, and GSAP.`,
};
