export const nav = {
  wordmark: "debopam.dev",
  links: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "open to software engineering roles — 2027",
  headlinePre: "I build the ",
  headlineAccent: "systems",
  headlinePost: " that keep everything else running.",
  subhead:
    "Backend-focused software engineer working across APIs, data pipelines, and ML-adjacent systems. Final-year CSBS student at Academy of Technology, Kolkata.",
  ctaPrimary: { label: "See the work", href: "#work" },
  ctaGhost: { label: "Get in touch", href: "#contact" },
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
};

export const work = {
  index: "03",
  title: "Work",
  projects: [
    {
      name: "MedCare Pharma",
      tag: "Flagship · Hackathon",
      flagship: true,
      description:
        "A pharma supply-chain platform combining demand-sensing/replenishment planning with autonomous procure-to-pay. Built for the Cognizant NPN Hackathon as integration lead.",
      metric: "XGBRegressor forecast model · 14.2% MAPE · 3-way invoice matching at 2% tolerance.",
      tags: ["FastAPI", "React/Vite", "XGBoost", "OCR", "Docker"],
    },
    {
      name: "Sanvix",
      tag: "SIH 2024 · Finalist",
      description: "Full-stack application, backend lead. SIH 2024 institutional finalist.",
      tags: ["FastAPI", "Supabase", "React"],
    },
    {
      name: "Code Arena",
      tag: "Real-time",
      description: "Competitive coding platform with sandboxed remote code execution.",
      tags: ["Node.js", "Express", "Socket.io"],
    },
    {
      name: "GreenLedger",
      tag: "Hackathon team",
      description:
        "Estimates carbon footprint from bank statement data via an LLM API behind a FastAPI backend.",
      tags: ["FastAPI", "LLM API"],
    },
    {
      name: "AssetPulse",
      tag: "Systems",
      description: "Asset management system on a Spring Boot/JPA backend.",
      tags: ["Spring Boot", "JPA"],
    },
  ] satisfies Project[],
};

export const contact = {
  index: "04",
  title: "Contact",
  headline: "Let's talk about what you're building.",
  supporting: "Open to software engineering roles starting 2027 — reach out any time.",
  links: [
    { label: "Email", href: "mailto:placeholder@example.com" },
    { label: "GitHub", href: "https://github.com/placeholder" },
    { label: "LinkedIn", href: "https://linkedin.com/in/placeholder" },
    { label: "Resume", href: "#" },
  ],
};

export const footer = {
  text: `© ${new Date().getFullYear()} Debopam Ghosh — built with React, Three.js, and GSAP.`,
};
