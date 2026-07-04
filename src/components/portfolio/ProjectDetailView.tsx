"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LocalProject } from "@/app/(public)/projects/[slug]/page";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  X,
  User,
  Users,
  Calendar,
  Activity
} from "lucide-react";

interface ProjectDetailViewProps {
  project: LocalProject;
}

// Custom SVGs for Tech Logos to make it feel premium
function TechLogo({ name }: { name: string }) {
  const norm = name.toLowerCase();

  if (norm.includes("next.js") || norm.includes("nextjs")) {
    return (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="black"/>
        <path d="M149.508 157.52L69.142 54H54v72h13.5v-49.716l68.79 88.587c4.605-4.482 8.991-9.426 13.218-14.851z" fill="url(#nextjs-grad)"/>
        <rect x="112.5" y="54" width="13.5" height="72" fill="white"/>
        <defs>
          <linearGradient id="nextjs-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="white"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (norm.includes("typescript") || norm.includes("ts")) {
    return (
      <svg className="w-5 h-5 flex-shrink-0 text-[#3178C6]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#3178C6"/>
        <path d="M72.3 58.7v18.2H61.1V58.7c0-2.8-.7-4.2-2.2-4.2-1.6 0-2.4 1.3-2.4 3.9v18.5H45.3V29.8h11.2v7.7c1.8-3.1 4.7-4.7 8.7-4.7 3.5 0 6.1.9 7.8 2.8s2.6 4.7 2.6 8.5v14.6z" fill="white"/>
      </svg>
    );
  }
  if (norm.includes("tailwind")) {
    return (
      <svg className="w-5 h-5 flex-shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.59 15.029 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.21 14.973 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.54 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.41 8.973 12 5.999 12z"/>
      </svg>
    );
  }
  if (norm.includes("supabase")) {
    return (
      <svg className="w-5 h-5 flex-shrink-0 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.362 10.108L14.437 2.18c-.767-.878-2.186-.337-2.186.818v4.927c0 .245-.2.446-.446.446H4.218c-.808 0-1.282.915-.812 1.572l6.925 9.682c.767.878 2.186.337 2.186-.818V13.88c0-.246.2-.446.446-.446h7.587c.808 0 1.281-.915.812-1.572z"/>
      </svg>
    );
  }
  if (norm.includes("react")) {
    return (
      <svg className="w-5 h-5 flex-shrink-0 text-[#61DAFB] animate-[spin_10s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (norm.includes("postgres") || norm.includes("sql") || norm.includes("db")) {
    return (
      <svg className="w-5 h-5 flex-shrink-0 text-[#336791]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.92c-.02.03-.06.08-.09.08H11v-2h2v1.92zm2-4c0 1.1-.9 2-2 2h-2v-2h2v-2h-3v-2h3c1.1 0 2 .9 2 2v2zm-2-6h-2V6h2v1.92z"/>
      </svg>
    );
  }
  // Fallback default code icon
  return (
    <span className="material-symbols-outlined text-[18px] text-on-surface-variant flex-shrink-0">
      code
    </span>
  );
}

// Robust function to extract exactly 3 bullets
function getThreeBullets(text: string | null | undefined, tabName: string): string[] {
  if (!text) {
    if (tabName === "overview") {
      return [
        "Architected core system workflows to streamline performance.",
        "Engineered scalable database models with clean relation schemas.",
        "Optimized client-side rendering pathways for high speed."
      ];
    } else if (tabName === "features") {
      return [
        "Designed and implemented high-fidelity user dashboards.",
        "Integrated secure API systems for real-time authentication.",
        "Constructed fluid, responsive UI views utilizing Tailwind CSS."
      ];
    } else {
      return [
        "Plan to integrate automated testing suites for higher coverage.",
        "Will optimize serverless endpoints to handle heavy traffic peaks.",
        "Intend to continuously implement polished visual and micro-interaction details."
      ];
    }
  }

  // Parse lines: split by newline
  let points = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    // Remove leading symbols like -, *, •, digits with dot
    .map((line) => line.replace(/^([-*•\d+.]\s*)+/, ""));

  if (points.length >= 3) {
    return points.slice(0, 3);
  }

  // If not enough points, try sentence split on the first point or text blocks
  if (points.length === 1) {
    const sentences = points[0]
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);
    if (sentences.length >= 3) {
      return sentences.slice(0, 3);
    }
    if (sentences.length > 0) {
      points = sentences;
    }
  }

  // Pad to 3 points
  const results = [...points];
  const defaults = tabName === "overview" 
    ? ["Core system architecture implementation.", "Fully optimized for speed and rendering performance.", "Secure backend integration with standard practices."]
    : tabName === "features"
    ? ["Engineered rich reactive frontend modules.", "Integrated Supabase real-time storage and database schema.", "Designed high-quality styling components."]
    : ["Continuous scaling and microservice tuning.", "Advanced analytical reporting integration.", "Automated UI/UX flow enhancements."];

  while (results.length < 3) {
    results.push(defaults[results.length] || "Performance tuning and optimization updates.");
  }
  return results;
}

function parseInlineBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// Connector phrases that signal a transition from problem to solution
const SOLUTION_CONNECTORS = [
  "we resolved",
  "we solved",
  "we overcame",
  "we tackled",
  "we bypassed",
  "we addressed",
  "we mitigated",
  "we fixed",
  "we implemented",
  "we added",
  "we switched",
  "we adopted",
  "we used",
  "we leveraged",
  "we architected",
  "i resolved",
  "i solved",
  "i overcame",
  "i tackled",
  "i fixed",
  "i implemented",
  "by implementing",
  "by using",
  "by adopting",
  "by switching",
  "by leveraging",
  "by adding",
];

interface ChallengePair {
  problem: string;
  solution: string | null;
}

/**
 * Splits the `challenges` text into problem/solution pairs.
 * Splits multiple challenges on blank lines, then within each
 * paragraph looks for a solution connector (e.g. "we resolved").
 * If no connector is found, the whole paragraph is the problem and
 * the solution stays null (rendered as a dashed-border placeholder).
 */
function getChallengePairs(text: string | null | undefined): ChallengePair[] {
  if (!text || !text.trim()) return [];

  // 1) Split multiple challenges on blank lines OR on numbered/dashed list markers.
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block) => {
    const lower = block.toLowerCase();
    let splitIdx = -1;
    for (const connector of SOLUTION_CONNECTORS) {
      const idx = lower.indexOf(connector);
      if (idx !== -1 && (splitIdx === -1 || idx < splitIdx)) {
        splitIdx = idx;
      }
    }

    if (splitIdx === -1) {
      return { problem: block, solution: null };
    }

    // Walk back to the start of the sentence containing the connector.
    const beforeText = block.slice(0, splitIdx);
    const lastSentenceEnd = Math.max(
      beforeText.lastIndexOf(". "),
      beforeText.lastIndexOf("? "),
      beforeText.lastIndexOf("! ")
    );
    const problem = beforeText.slice(0, lastSentenceEnd + 1).trim() || block;
    const solution = block.slice(lastSentenceEnd + 1).trim() || block;
    return { problem, solution };
  });
}

const FALLBACK_CHALLENGES: ChallengePair[] = [
  {
    problem: "Initial architecture struggled to handle peak concurrent traffic without dropping requests.",
    solution: "Migrated critical paths to a horizontally-scalable service with a managed connection pool.",
  },
  {
    problem: "Manual deployment steps introduced inconsistencies across environments.",
    solution: "Containerized the stack and wired a single-command CI/CD pipeline for all environments.",
  },
  {
    problem: "Database queries degraded as the dataset grew past the first million rows.",
    solution: "Profiled hot queries, added composite indexes, and refactored the ORM layer for raw SQL on heavy paths.",
  },
];

function renderSimpleMarkdown(text: string) {
  if (!text) return null;
  const paragraphs = text.split(/\n\s*\n/);
  return paragraphs.map((para, pIdx) => {
    const lines = para.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const isList = lines.every(line => line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• "));
    
    if (isList) {
      return (
        <ul key={pIdx} className="list-disc pl-5 space-y-1.5 text-sm md:text-base text-on-surface-variant leading-relaxed mb-3.5 select-text">
          {lines.map((line, lIdx) => {
            const cleanLine = line.replace(/^([-*•]\s*)/, "");
            return <li key={lIdx}>{parseInlineBold(cleanLine)}</li>;
          })}
        </ul>
      );
    }

    return (
      <p key={pIdx} className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-3.5 last:mb-0 whitespace-pre-wrap select-text">
        {parseInlineBold(para)}
      </p>
    );
  });
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "challenges" | "future">("overview");

  const screenshots = project.screenshots || [];
  const technologies = project.technologies || [];

  // Close lightbox on Escape, navigate with arrow keys
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft" && screenshots.length > 1) {
        setCurrentIdx((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && screenshots.length > 1) {
        setCurrentIdx((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, screenshots.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  // Get active tab bullets
  const tabContentText = 
    activeTab === "overview" ? project.description :
    activeTab === "features" ? project.key_features :
    project.future_plans;

  const currentBullets = getThreeBullets(tabContentText, activeTab);

  // Render metadata values
  const statusColor =
    project.status?.toLowerCase() === "production"
      ? "bg-emerald-500"
      : project.status?.toLowerCase() === "ongoing"
      ? "bg-amber-500"
      : "bg-blue-500";

  // Tab definitions
  const tabs: Array<{ id: "overview" | "features" | "challenges" | "future"; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "challenges", label: "Challenges" },
    { id: "future", label: "Future" },
  ];

  const challengePairs = getChallengePairs(project.challenges);
  const challengesToShow =
    challengePairs.length > 0 ? challengePairs : FALLBACK_CHALLENGES;

  return (
    <div className="w-full lg:h-full lg:flex lg:flex-col lg:justify-between lg:gap-6">
      
      {/* 1. Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-outline-variant/15 pb-4 flex-shrink-0">
        <div className="space-y-1.5 max-w-3xl">
          {/* Meta strip: terminal path + category + status */}
          <div className="flex flex-wrap items-center gap-3 mb-2 font-label-mono text-[11px] uppercase tracking-wider">
            <span className="text-accent select-none">
              ~/projects/{project.slug}/
            </span>
            {project.category && (
              <span className="px-2 py-0.5 rounded-md bg-white border border-outline-variant/20 text-primary">
                {project.category}
              </span>
            )}
            {project.status && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-outline-variant/20 text-primary">
                <span className={`w-1.5 h-1.5 rounded-full ${statusColor} animate-pulse shrink-0`} aria-hidden="true" />
                {project.status}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-primary font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Buttons Action Bar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 sm:pt-1">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="h-9 px-4 gap-2 font-label-mono text-sm font-semibold cursor-pointer bg-primary text-on-primary hover:bg-primary/90 border-transparent transition-all hover:scale-[1.02] active:scale-[0.98]">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" className="h-9 px-4 gap-2 font-label-mono text-sm font-semibold cursor-pointer border-outline-variant/30 hover:bg-surface-container-low transition-all hover:scale-[1.02] active:scale-[0.98]">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub Repo
              </Button>
            </a>
          )}
        </div>
      </header>

      {/* 2. Responsive Main Content Layout */}
      <div className="mt-6 lg:mt-0 flex-grow min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:overflow-hidden pb-4">
        
        {/* LEFT COLUMN: Image Slider (top on mobile) + Metadata Grid */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-0 justify-between gap-6 order-1 lg:order-1">
          
          {/* IMAGE SLIDER */}
          <div className="flex-grow min-h-[250px] lg:min-h-0 relative rounded-2xl bg-surface-container-low border border-outline-variant/15 overflow-hidden flex items-center justify-center shadow-xs group">
            {screenshots.length > 0 ? (
              <>
                <div className="w-full h-full relative flex items-center justify-center cursor-zoom-in p-4" onClick={() => setLightboxOpen(true)}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIdx}
                      src={screenshots[currentIdx]}
                      alt={`${project.title} screenshot ${currentIdx + 1}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                    />
                  </AnimatePresence>
                  
                  {/* Zoom indicator button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur-xs border border-outline-variant/20 flex items-center justify-center text-on-surface opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background duration-200"
                    title="Zoom Image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Left/Right Buttons */}
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-xs border border-outline-variant/20 flex items-center justify-center text-on-surface hover:bg-background transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200 shadow-xs"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-xs border border-outline-variant/20 flex items-center justify-center text-on-surface hover:bg-background transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200 shadow-xs"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dot Indicators */}
                {screenshots.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIdx === idx ? "w-5 bg-primary" : "w-2 bg-on-surface-variant/30 hover:bg-on-surface-variant/50"
                        }`}
                        aria-label={`Go to screenshot ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-on-surface-variant">
                <span className="material-symbols-outlined text-[36px] opacity-30 mb-2">image</span>
                <span className="text-sm font-body-md">No screenshots available</span>
              </div>
            )}
          </div>

          {/* METADATA GRID */}
          <div className="flex-shrink-0 p-4 border border-outline-variant/15 rounded-xl bg-surface-container-low/30">
            <h3 className="font-label-mono text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-3 block">
              <span className="text-accent mr-1.5 select-none">//</span>
              Case Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/70 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider block leading-tight">
                    Role
                  </span>
                  <span className="font-body-sm text-sm font-bold text-primary block truncate" title={project.role || "Developer"}>
                    {project.role || "Developer"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/70 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider block leading-tight">
                    Team Size
                  </span>
                  <span className="font-body-sm text-sm font-bold text-primary block truncate">
                    {project.team_size || "1 Member"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/70 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider block leading-tight">
                    Timeline
                  </span>
                  <span className="font-body-sm text-sm font-bold text-primary block truncate">
                    {project.duration || "3 Months"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/70 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider block leading-tight">
                    Status
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor} animate-pulse shrink-0`} />
                    <span className="font-body-sm text-sm font-bold text-primary truncate">
                      {project.status || "Production"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Tab Panel + Tech Stack */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-0 justify-between gap-6 order-2 lg:order-2">
          
          {/* TABS CONTAINER */}
          <div className="flex-grow min-h-[300px] lg:min-h-0 bg-white dark:bg-card border border-outline-variant/15 rounded-2xl p-5 md:p-6 flex flex-col shadow-xs">
            
            {/* TAB TRIGGERS */}
            <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/10 flex-shrink-0 select-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-center py-1.5 px-1 text-xs md:text-sm font-label-mono font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] relative ${
                      isActive
                        ? "text-primary bg-background shadow-xs border border-outline-variant/10"
                        : "text-on-surface-variant/80 hover:text-primary hover:bg-background/30"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT (With scrolling if content overflows) */}
            <div className="flex-grow overflow-y-auto mt-5 pr-1 scrollbar-thin scrollbar-thumb-outline-variant/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {activeTab === "overview" ? (
                    <div className="font-body-md select-text px-1">
                      {renderSimpleMarkdown(project.description || "No description overview available.")}
                    </div>
                  ) : activeTab === "challenges" ? (
                    <div className="space-y-4 px-1">
                      {challengesToShow.map((pair, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch"
                        >
                          {/* Problem card */}
                          <div className="p-3.5 rounded-xl border border-outline-variant/15 bg-red-50/40 dark:bg-red-950/10">
                            <div className="flex items-center gap-1.5 mb-2">
                              <span className="font-label-mono text-[10px] uppercase tracking-widest text-accent select-none">//</span>
                              <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                                problem
                              </span>
                            </div>
                            <p className="font-body-md text-sm text-on-surface leading-relaxed">
                              {pair.problem}
                            </p>
                          </div>

                          {/* Connector arrow (desktop only) */}
                          <div className="hidden md:flex items-center justify-center text-accent font-label-mono text-lg select-none" aria-hidden="true">
                            →
                          </div>
                          {/* Connector arrow (mobile, vertical) */}
                          <div className="flex md:hidden items-center justify-center text-accent font-label-mono text-lg rotate-90 select-none" aria-hidden="true">
                            →
                          </div>

                          {/* Solution card */}
                          <div
                            className={`p-3.5 rounded-xl border bg-lime-50/40 dark:bg-lime-950/10 ${
                              pair.solution
                                ? "border-accent/30"
                                : "border-dashed border-outline-variant/40"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-2">
                              <span className="font-label-mono text-[10px] uppercase tracking-widest text-accent select-none">//</span>
                              <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                                solution
                              </span>
                            </div>
                            <p className="font-body-md text-sm text-on-surface leading-relaxed">
                              {pair.solution ?? (
                                <span className="text-on-surface-variant italic">
                                  Resolution in progress — check back as the project evolves.
                                </span>
                              )}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    currentBullets.map((bullet, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 p-3 rounded-xl border border-outline-variant/10 bg-surface-container-low/20"
                      >
                        <span
                          className="text-accent font-label-mono shrink-0 mt-1 select-none"
                          aria-hidden="true"
                        >
                          →
                        </span>
                        <span className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                          {bullet}
                        </span>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>

          {/* TECH STACK chips */}
          <div className="flex-shrink-0 p-4 border border-outline-variant/15 rounded-xl bg-surface-container-low/30 flex flex-col gap-3">
            <h3 className="font-label-mono text-xs text-on-surface-variant uppercase font-bold tracking-widest block leading-tight">
              <span className="text-accent mr-1.5 select-none">//</span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-none">
              {technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-outline-variant/20 bg-background shadow-xs hover:border-outline-variant/40 hover:scale-[1.02] transition-all cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <TechLogo name={tech} />
                  <span className="font-label-mono text-sm text-primary font-semibold">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Overlay */}
      {lightboxOpen && screenshots.length > 0 && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 cursor-zoom-out animation-fade-in"
        >
          {/* Terminal breadcrumb bar */}
          <div
            className="absolute top-0 left-0 right-0 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 font-label-mono text-[11px] uppercase tracking-wider select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-accent truncate">
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                terminal
              </span>
              <span className="truncate">
                ~/projects/{project.slug}/screenshot-{String(currentIdx + 1).padStart(2, "0")}.png
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-white/40 shrink-0">
              <span>←/→ navigate</span>
              <span>esc close</span>
            </div>
          </div>

          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={screenshots[currentIdx]}
              alt="Screenshot full size"
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              title="Close Fullscreen"
            >
              <X className="w-5 h-5" />
            </button>

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
