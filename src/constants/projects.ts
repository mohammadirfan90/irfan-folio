import { Project } from "@/types";

export interface ExtendedProject extends Project {
  role: string;
  architecture: string;
  lessons_learned: string;
  screenshots: string[];
}

export const MOCK_PROJECTS: Record<string, ExtendedProject> = {
  "skilltern": {
    id: "1",
    title: "Skilltern",
    slug: "skilltern",
    summary: "AI-driven internship matchmaking platform for high-growth startups.",
    description: "Skilltern was engineered to solve the inefficiencies in matching university students with early-stage startups. Traditional platforms rely on keyword matching, leading to high rejection rates and poor cultural fits. Skilltern uses semantic search and multi-agent LLM systems to analyze student GitHub profiles, projects, and startup requirement docs to produce highly aligned matches.",
    category: "AI / PLATFORM",
    technologies: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "Vector DB", "Tailwind CSS"],
    github_url: "https://github.com",
    live_url: "https://skilltern.com",
    challenges: "One of the key technical hurdles was processing diverse and noisy GitHub profiles. We overcame this by implementing an asynchronous pipeline in Go that fetches public repositories, processes Readmes, analyzes code style using AST parsers, and creates dense vector embeddings stored in pgvector. Rate limiting from the GitHub API was bypassed by maintaining an authenticated token pool.",
    future_plans: "We plan to integrate real-time collaborative coding assessments using shared WebAssembly environments, allowing candidates to show their actual coding ability inside the platform without needing external IDE configurations.",
    featured: true,
    published: true,
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcGlKbSlVLHYy3fo2qhj1L6bDJ01GX-9I0sOl4qGnjRLaPZiVsk8vCDXa46XXvpC4luBKnIkJLuus5VmDup8p3caFe2tON3oVh6iSYcYFpfpAn9ajjhOg-Mg8PwKBPlyLvcHWMHSum-oC-14z61Awt1tveUlb3sgqWi0KdZslRV3iTN3PFnTl3sIR2ESey4yMklbBlXt3y597kMm4xp7dbaPReMs7TU74Nf0_xKaIBhp5cSEuk_HQ",
    role: "Lead Systems Architect & Full-stack Engineer",
    architecture: "The backend is structured around a microservice layout. Node.js manages user session flows, while a FastAPI service handles the computationally heavy AI matchmaking engine. Matches are calculated asynchronously using cosine similarity vectors on OpenAI embeddings.",
    lessons_learned: "We discovered that semantic matching is only as good as the source profiles. Standardizing user inputs while using LLMs to infer context from messy code repositories vastly improved matching scores compared to raw keyword parsing.",
    screenshots: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcGlKbSlVLHYy3fo2qhj1L6bDJ01GX-9I0sOl4qGnjRLaPZiVsk8vCDXa46XXvpC4luBKnIkJLuus5VmDup8p3caFe2tON3oVh6iSYcYFpfpAn9ajjhOg-Mg8PwKBPlyLvcHWMHSum-oC-14z61Awt1tveUlb3sgqWi0KdZslRV3iTN3PFnTl3sIR2ESey4yMklbBlXt3y597kMm4xp7dbaPReMs7TU74Nf0_xKaIBhp5cSEuk_HQ"
    ]
  },
  "smuct-cse-fest": {
    id: "2",
    title: "SMUCT CSE Fest",
    slug: "smuct-cse-fest",
    summary: "Official portal for the regional Computer Science Engineering festival.",
    description: "The official registration and event portal built for the annual Computer Science Engineering festival. The app handles user registrations, hackathon team formations, payment processing, live results announcements, and real-time interactive quizzes for over 2,000 active participants.",
    category: "EVENT / WEB",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase PostgreSQL", "Prisma", "Websockets"],
    github_url: "https://github.com",
    live_url: "https://csefest.smuct.edu.bd",
    challenges: "During the peak registration hours, we faced database lock contention due to multiple users trying to claim the same limited seats in programming contests. We resolved this by implementing a Redis-based distributed lock system and queuing ticket purchases with BullMQ.",
    future_plans: "Adding a automated digital certificate generation service that automatically compiles participant names and emails into PDF vouchers using web assembly canvas rendering.",
    featured: true,
    published: true,
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXI-MWZdpNpc26m6k_iCgvWvRoNKRn3Jr41l3cU3EZ-Wu4YDYZWMROXhbBz0ANi0w8VhM0mY8Nzx7NyTcRRTTfBx8cDov31lCrlZSbBFcqOZKdoVqt3Z1VpEwREdW5-6qjYNXZcTf71FlR7L1FPPjOL1z0A24LXAOuFxcsHZvrmPcgBv432nhWoab07e6lX-LqPgw9a6Eo62R-kH02AKyCq920yc-HDpbMFkSEzaDMNWiYJH380qq",
    role: "Full-stack Web Developer",
    architecture: "Monolithic Next.js architecture utilizing serverless API endpoints connected directly to Supabase. Real-time quiz sections are orchestrated using WebSocket layers powered by an autonomous Node.js service running on a VPS.",
    lessons_learned: "Using serverless SQL connections without connection pooling can quickly exhaust DB limits under high traffic. Integrating Prisma Accelerate or Supabase Connection Pooler was vital.",
    screenshots: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXI-MWZdpNpc26m6k_iCgvWvRoNKRn3Jr41l3cU3EZ-Wu4YDYZWMROXhbBz0ANi0w8VhM0mY8Nzx7NyTcRRTTfBx8cDov31lCrlZSbBFcqOZKdoVqt3Z1VpEwREdW5-6qjYNXZcTf71FlR7L1FPPjOL1z0A24LXAOuFxcsHZvrmPcgBv432nhWoab07e6lX-LqPgw9a6Eo62R-kH02AKyCq920yc-HDpbMFkSEzaDMNWiYJH380qq"
    ]
  },
  "lumora-studio": {
    id: "3",
    title: "Lumora Studio",
    slug: "lumora-studio",
    summary: "Bespoke portfolio site for a boutique creative and technical agency.",
    description: "Lumora Studio required a high-end agency website that acted as a virtual showroom of their work. The core focus was on visual excellence, fluidity, and absolute precision. The system features fluid animations, glassmorphic UI controls, dynamic layouts, and full custom content management functionality.",
    category: "AGENCY / UI",
    technologies: ["React", "Gatsby", "Framer Motion", "Vanilla CSS", "Sanity CMS", "Netlify"],
    github_url: "https://github.com",
    live_url: "https://lumora.studio",
    challenges: "The main challenge was delivering fluid, high-frame-rate animations across lower-end devices without causing layout shifts. We solved this by using Hardware Accelerated CSS rules, ensuring all animations used composite-only properties (transform, opacity) instead of height/width transitions.",
    future_plans: "Transitioning to a dynamic Next.js 16 setup to support dynamic case study generation on-demand and real-time layout customizing.",
    featured: true,
    published: true,
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNc5AgYM5FoSAaHkwvcM6jBSfbzY7_gwhV9p2sQygBr8sQPHxTDf5NbhAjyoPijDzWhWHssF4z2BreaT9lPv3O7JOlcjhq1thcuFIBojMK5WV2pzUtZry_HG7WV7SpvMF2RxnD3YpjtYgYE3ZCv1sQKLHtH7AKIvaRI_uadoxnvgYE_eisqT5OL6XrynVIDuF3MSO2ux_yf6fm9zDF63Tm9XblBC20q-wTgUt3ltv4ZZtKLA3u-YQw",
    role: "Lead Creative Technologist",
    architecture: "Jamstack architecture consisting of a React-based frontend compiled statically and hydrated on-demand, fetching assets directly from a headless Sanity CMS content API.",
    lessons_learned: "Generous whitespace and subtle depth are highly effective tools for directing user attention, but must be paired with clear navigational markers to maintain usability.",
    screenshots: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNc5AgYM5FoSAaHkwvcM6jBSfbzY7_gwhV9p2sQygBr8sQPHxTDf5NbhAjyoPijDzWhWHssF4z2BreaT9lPv3O7JOlcjhq1thcuFIBojMK5WV2pzUtZry_HG7WV7SpvMF2RxnD3YpjtYgYE3ZCv1sQKLHtH7AKIvaRI_uadoxnvgYE_eisqT5OL6XrynVIDuF3MSO2ux_yf6fm9zDF63Tm9XblBC20q-wTgUt3ltv4ZZtKLA3u-YQw"
    ]
  }
};
