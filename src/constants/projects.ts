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
    summary: "AI-driven internship matchmaking platform connecting founders with student engineers using semantic AST code analysis.",
    description: `## Executive Summary
Skilltern was engineered to eliminate the massive friction in matching student software engineers with early-stage tech startups. Traditional job portals rely on rigid keyword matching, resulting in over **70% candidate mismatch** and high drop-off rates. 

> [!NOTE]
> Skilltern leverages multi-agent semantic evaluation and dense vector embeddings to parse GitHub repositories, code complexity, and project quality directly into quantifiable affinity scores.

---

## System Architecture
The application runs on a decoupled microservices architecture. A Next.js client interacts with an asynchronous ingestion worker pipeline powered by FastAPI, Celery, and pgvector.

\`\`\`mermaid
graph TD
    subgraph Client Layer
        A[Next.js 16 Web App] -->|HTTPS & TRPC| B[API Gateway]
    end

    subgraph Core Services
        B --> C[Auth & Session Service]
        B --> D[FastAPI Vector Service]
        D --> E[Async Worker Queue]
    end

    subgraph Data & AI Pipeline
        E -->|Parse AST| F[GitHub Ingestion Engine]
        F -->|Extract Embeddings| G[OpenAI text-embedding-3]
        G -->|Store Vectors| H[(Supabase pgvector)]
        D -->|Cosine Similarity Query| H
    end
\`\`\`

---

## Key Engineering Innovations

### 1. AST Code Parsing Pipeline
Instead of relying on written resumes, our worker parses public repositories into Abstract Syntax Trees (AST). We extract architectural patterns, cyclomatic complexity, test coverage, and documentation habits.

\`\`\`typescript
export async function extractCodeSignals(repoUrl: string): Promise<RepoSignal> {
  const astTokens = await parseRepositoryAST(repoUrl);
  const complexityScore = calculateCyclomaticComplexity(astTokens);
  
  return {
    architecturePattern: inferDesignPatterns(astTokens),
    codeQualityIndex: complexityScore.normalized,
    testCoverageRatio: await detectTestSuites(repoUrl),
  };
}
\`\`\`

### 2. Token-Bucket Rate Limit Manager
Handling bursts of candidate imports triggered GitHub API secondary rate limits. We overcame this by maintaining an authenticated token pool with sliding-window queue distribution.

> [!TIP]
> Switching from single-token bursts to distributed token-bucket rotation reduced ingestion failures from **18.4% to under 0.05%**.

---

## Performance & Benchmark Metrics

| Metric | Before Optimization | After pgvector + Cache | Improvement |
| :--- | :--- | :--- | :--- |
| Candidate Search Latency | \`1,420 ms\` | \`88 ms\` | **16.1x faster** |
| Match Relevance Score | \`64.2%\` | \`92.8%\` | **+44.5%** |
| Concurrent AST Ingestion | 5 repos/sec | 65 repos/sec | **13x throughput** |
| Database Index Size | 4.8 GB | 1.2 GB | **-75% reduction** |

---

## Technical Challenges & Solutions

> [!IMPORTANT]
> **Problem:** Cold start vector search queries suffered from high memory allocation spikes in serverless functions.  
> **Solution:** Implemented persistent connection pooling through Supabase connection poolers and partitioned HNSW indexes by tech domain.

---

## Future Roadmap
- [ ] WebAssembly-powered collaborative IDE for live technical assessment sessions.
- [ ] Automated code review AI bot for candidate pull request challenges.
- [ ] Multi-tenant custom hiring portals for enterprise accelerators.
`,
    category: "AI / PLATFORM",
    technologies: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "Supabase", "PostgreSQL", "Tailwind CSS"],
    github_url: "https://github.com",
    live_url: "https://skilltern.com",
    challenges: "One of the key technical hurdles was processing diverse and noisy GitHub profiles. We overcame this by implementing an asynchronous pipeline in Go that fetches public repositories, processes Readmes, analyzes code style using AST parsers, and creates dense vector embeddings stored in pgvector. Rate limiting from the GitHub API was bypassed by maintaining an authenticated token pool.",
    future_plans: "We plan to integrate real-time collaborative coding assessments using shared WebAssembly environments.",
    featured: true,
    published: true,
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcGlKbSlVLHYy3fo2qhj1L6bDJ01GX-9I0sOl4qGnjRLaPZiVsk8vCDXa46XXvpC4luBKnIkJLuus5VmDup8p3caFe2tON3oVh6iSYcYFpfpAn9ajjhOg-Mg8PwKBPlyLvcHWMHSum-oC-14z61Awt1tveUlb3sgqWi0KdZslRV3iTN3PFnTl3sIR2ESey4yMklbBlXt3y597kMm4xp7dbaPReMs7TU74Nf0_xKaIBhp5cSEuk_HQ",
    role: "Lead Systems Architect & Full-stack Engineer",
    team_size: "4 Engineers",
    duration: "3 Months",
    status: "Production",
    metrics: "2,000+ Active Users • <88ms Search • 92.8% Match Accuracy",
    architecture_preview: "Decoupled Next.js client with FastAPI asynchronous ingestion engine and Supabase pgvector cosine search.",
    architecture: "Decoupled Next.js client with FastAPI asynchronous ingestion engine and Supabase pgvector cosine search.",
    lessons_learned: "Standardizing user inputs while using LLMs to infer context from code repositories vastly improved matching accuracy.",
    screenshots: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcGlKbSlVLHYy3fo2qhj1L6bDJ01GX-9I0sOl4qGnjRLaPZiVsk8vCDXa46XXvpC4luBKnIkJLuus5VmDup8p3caFe2tON3oVh6iSYcYFpfpAn9ajjhOg-Mg8PwKBPlyLvcHWMHSum-oC-14z61Awt1tveUlb3sgqWi0KdZslRV3iTN3PFnTl3sIR2ESey4yMklbBlXt3y597kMm4xp7dbaPReMs7TU74Nf0_xKaIBhp5cSEuk_HQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXI-MWZdpNpc26m6k_iCgvWvRoNKRn3Jr41l3cU3EZ-Wu4YDYZWMROXhbBz0ANi0w8VhM0mY8Nzx7NyTcRRTTfBx8cDov31lCrlZSbBFcqOZKdoVqt3Z1VpEwREdW5-6qjYNXZcTf71FlR7L1FPPjOL1z0A24LXAOuFxcsHZvrmPcgBv432nhWoab07e6lX-LqPgw9a6Eo62R-kH02AKyCq920yc-HDpbMFkSEzaDMNWiYJH380qq"
    ]
  },
  "smuct-cse-fest": {
    id: "2",
    title: "SMUCT CSE Fest",
    slug: "smuct-cse-fest",
    summary: "Official portal and real-time live competition engine for 2,000+ festival attendees.",
    description: `## Executive Summary
The official registration and event portal built for the regional Computer Science Engineering festival. The app handles participant registrations, hackathon team formations, payment reconciliation, live results broadcasts, and interactive quiz sessions.

> [!NOTE]
> Successfully handled over **2,000 active concurrent participants** during opening day ticket releases with zero dropped transactions.

---

## Event Architecture

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Participant
    participant App as Next.js Web App
    participant Lock as Redis Distributed Lock
    participant Queue as BullMQ Worker
    participant DB as Supabase DB

    Participant->>App: Click 'Register Seat'
    App->>Lock: Acquire Lock (contest_id, user_id)
    Lock-->>App: Lock Granted
    App->>Queue: Push Registration Payload
    Queue->>DB: Process Booking & Update Seats
    DB-->>Queue: Booking Confirmed
    Queue-->>App: Emit WebSocket 'Confirmed'
    App-->>Participant: Display Ticket QR Code
\`\`\`

---

## Technical Highlights

### 1. Redis Distributed Lock for Seat Allocation
During peak registration hours, thousands of users attempted to claim limited slots in competitive programming and hackathon tracks. We used Redis-backed distributed locks and BullMQ job queues to eliminate database contention.

### 2. Real-time Live Result Broadcasting
Live scoring updates during the programming contest were broadcasted via Supabase Realtime Channels, allowing audience members and participants to see leaderboard shifts with sub-second latency.

---

## Performance Summary

| Metric | Target | Result | Status |
| :--- | :--- | :--- | :--- |
| Max Concurrent Users | 1,500 | 2,240 | Exceeded |
| Booking Latency | < 250ms | 94ms | Passed |
| Payment Success Rate | > 99% | 99.8% | Passed |
| Downtime | 0 min | 0 min | Perfect |
`,
    category: "EVENT / WEB",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Redis", "BullMQ"],
    github_url: "https://github.com",
    live_url: "https://csefest.smuct.edu.bd",
    challenges: "During peak registration, we faced DB lock contention. We resolved this by implementing a Redis distributed lock and BullMQ queue.",
    future_plans: "Adding automated digital certificate generation using WebAssembly canvas rendering.",
    featured: true,
    published: true,
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXI-MWZdpNpc26m6k_iCgvWvRoNKRn3Jr41l3cU3EZ-Wu4YDYZWMROXhbBz0ANi0w8VhM0mY8Nzx7NyTcRRTTfBx8cDov31lCrlZSbBFcqOZKdoVqt3Z1VpEwREdW5-6qjYNXZcTf71FlR7L1FPPjOL1z0A24LXAOuFxcsHZvrmPcgBv432nhWoab07e6lX-LqPgw9a6Eo62R-kH02AKyCq920yc-HDpbMFkSEzaDMNWiYJH380qq",
    role: "Full-stack Web Developer & Team Lead",
    team_size: "3 Members",
    duration: "2 Months",
    status: "Completed",
    metrics: "2,240+ Participants • Zero Downtime • 94ms Booking Latency",
    architecture_preview: "Next.js App with Redis distributed locking and BullMQ worker queue for concurrency protection.",
    architecture: "Next.js App with Redis distributed locking and BullMQ worker queue for concurrency protection.",
    lessons_learned: "Using serverless SQL connections without connection pooling can quickly exhaust limits under sudden traffic spikes.",
    screenshots: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXI-MWZdpNpc26m6k_iCgvWvRoNKRn3Jr41l3cU3EZ-Wu4YDYZWMROXhbBz0ANi0w8VhM0mY8Nzx7NyTcRRTTfBx8cDov31lCrlZSbBFcqOZKdoVqt3Z1VpEwREdW5-6qjYNXZcTf71FlR7L1FPPjOL1z0A24LXAOuFxcsHZvrmPcgBv432nhWoab07e6lX-LqPgw9a6Eo62R-kH02AKyCq920yc-HDpbMFkSEzaDMNWiYJH380qq"
    ]
  },
  "lumora-studio": {
    id: "3",
    title: "Lumora Studio",
    slug: "lumora-studio",
    summary: "Bespoke portfolio site for a boutique creative agency featuring composite CSS hardware acceleration.",
    description: `## Executive Summary
Lumora Studio required a high-end digital agency showroom site that felt cinematic, tactile, and ultra-responsive. The core focus was on 60 FPS interactions, custom layout dynamics, and micro-animations.

---

## Technical Stack & Asset Pipeline

\`\`\`mermaid
graph LR
    subgraph CMS & Assets
        A[Sanity CMS] --> B[Image Pipeline]
        B --> C[WebP / AVIF CDN]
    end

    subgraph Frontend Engine
        D[Next.js SSR] --> E[Framer Motion]
        E --> F[Hardware Accelerated CSS Layer]
    end

    C --> D
\`\`\`

---

## Technical Highlights

### 1. Zero Layout Shift Animations
Every transition operates strictly on composite GPU properties (\`transform\`, \`opacity\`), bypassing browser layout re-calculations.

### 2. Dynamic Theme Orchestration
Utilizes CSS custom properties with real-time contrast calculations to ensure full WCAG 2.1 AA accessibility compliance across all dynamic lighting palettes.
`,
    category: "AGENCY / UI",
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "Sanity CMS"],
    github_url: "https://github.com",
    live_url: "https://lumora.studio",
    challenges: "Delivering fluid, high-frame-rate animations across lower-end devices without causing layout shifts.",
    future_plans: "Transitioning to a dynamic Next.js 16 setup to support dynamic case study generation on-demand.",
    featured: true,
    published: true,
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNc5AgYM5FoSAaHkwvcM6jBSfbzY7_gwhV9p2sQygBr8sQPHxTDf5NbhAjyoPijDzWhWHssF4z2BreaT9lPv3O7JOlcjhq1thcuFIBojMK5WV2pzUtZry_HG7WV7SpvMF2RxnD3YpjtYgYE3ZCv1sQKLHtH7AKIvaRI_uadoxnvgYE_eisqT5OL6XrynVIDuF3MSO2ux_yf6fm9zDF63Tm9XblBC20q-wTgUt3ltv4ZZtKLA3u-YQw",
    role: "Lead Creative Technologist",
    team_size: "2 Members",
    duration: "1 Month",
    status: "Completed",
    metrics: "60 FPS Animations • 100 Lighthouse Performance • 0ms CLS",
    architecture_preview: "Modern headless React architecture with Sanity CMS and GPU-accelerated motion layers.",
    architecture: "Modern headless React architecture with Sanity CMS and GPU-accelerated motion layers.",
    lessons_learned: "Generous whitespace and subtle depth are highly effective tools for directing user attention.",
    screenshots: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNc5AgYM5FoSAaHkwvcM6jBSfbzY7_gwhV9p2sQygBr8sQPHxTDf5NbhAjyoPijDzWhWHssF4z2BreaT9lPv3O7JOlcjhq1thcuFIBojMK5WV2pzUtZry_HG7WV7SpvMF2RxnD3YpjtYgYE3ZCv1sQKLHtH7AKIvaRI_uadoxnvgYE_eisqT5OL6XrynVIDuF3MSO2ux_yf6fm9zDF63Tm9XblBC20q-wTgUt3ltv4ZZtKLA3u-YQw"
    ]
  }
};
