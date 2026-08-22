"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LocalProject, AdjacentProject } from "@/app/(public)/projects/[slug]/page";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
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
  Activity,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ListTree,
  Send
} from "lucide-react";

interface ProjectDetailViewProps {
  project: LocalProject;
  prevProject?: AdjacentProject | null;
  nextProject?: AdjacentProject | null;
}

// Custom SVGs for Tech Logos
function TechLogo({ name }: { name: string }) {
  const norm = name.toLowerCase();

  if (norm.includes("next.js") || norm.includes("nextjs")) {
    return (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-4 h-4 flex-shrink-0 text-[#3178C6]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#3178C6"/>
        <path d="M72.3 58.7v18.2H61.1V58.7c0-2.8-.7-4.2-2.2-4.2-1.6 0-2.4 1.3-2.4 3.9v18.5H45.3V29.8h11.2v7.7c1.8-3.1 4.7-4.7 8.7-4.7 3.5 0 6.1.9 7.8 2.8s2.6 4.7 2.6 8.5v14.6z" fill="white"/>
      </svg>
    );
  }
  if (norm.includes("tailwind")) {
    return (
      <svg className="w-4 h-4 flex-shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.59 15.029 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.21 14.973 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.54 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.41 8.973 12 5.999 12z"/>
      </svg>
    );
  }
  if (norm.includes("supabase")) {
    return (
      <svg className="w-4 h-4 flex-shrink-0 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.362 10.108L14.437 2.18c-.767-.878-2.186-.337-2.186.818v4.927c0 .245-.2.446-.446.446H4.218c-.808 0-1.282.915-.812 1.572l6.925 9.682c.767.878 2.186.337 2.186-.818V13.88c0-.246.2-.446.446-.446h7.587c.808 0 1.281-.915.812-1.572z"/>
      </svg>
    );
  }
  if (norm.includes("react")) {
    return (
      <svg className="w-4 h-4 flex-shrink-0 text-[#61DAFB] animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-4 h-4 flex-shrink-0 text-[#336791]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.92c-.02.03-.06.08-.09.08H11v-2h2v1.92zm2-4c0 1.1-.9 2-2 2h-2v-2h2v-2h-3v-2h3c1.1 0 2 .9 2 2v2zm-2-6h-2V6h2v1.92z"/>
      </svg>
    );
  }
  if (norm.includes("python")) {
    return (
      <svg className="w-4 h-4 flex-shrink-0 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.91 0c-1.84 0-3.56.24-4.78.68C5.07 1.42 4.9 2.5 4.9 3.86v2.79h7.17v1H2.43c-1.36 0-2.43 1.18-2.43 2.82 0 1.63.85 2.76 2.43 2.76h2.15V11.8c0-1.83 1.62-3.32 3.53-3.32h7.02c1.55 0 2.8-1.28 2.8-2.83V3.86C17.93 1.5 15.42 0 11.91 0zM8.82 1.68c.52 0 .94.42.94.94 0 .53-.42.95-.94.95-.53 0-.95-.42-.95-.95 0-.52.42-.94.95-.94z"/>
      </svg>
    );
  }
  return (
    <span className="material-symbols-outlined text-[16px] text-on-surface-variant flex-shrink-0">
      code
    </span>
  );
}

// Function to extract headings for Table of Contents
function extractHeadings(markdown: string) {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const headings: Array<{ id: string; text: string; level: number }> = [];

  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim();
      const cleanText = rawText.replace(/[*_~`]/g, "");
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      headings.push({ id, text: cleanText, level });
    }
  });

  return headings;
}

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const screenshots = project.screenshots || [];
  const technologies = project.technologies || [];

  // Parse headings for dynamic Table of Contents
  const headings = useMemo(() => {
    return extractHeadings(project.description || "");
  }, [project.description]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Lightbox keyboard controls
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

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const statusColor =
    project.status?.toLowerCase() === "production"
      ? "bg-emerald-500"
      : project.status?.toLowerCase() === "ongoing"
      ? "bg-amber-500"
      : "bg-blue-500";

  return (
    <div className="w-full space-y-12">
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION                                                         */}
      {/* ========================================================================= */}
      <header className="space-y-4 border-b border-outline-variant/15 pb-8">
        <div className="flex flex-wrap items-center gap-3 font-label-mono text-[11px] uppercase tracking-wider">
          <span className="text-accent select-none">
            ~/projects/{project.slug}/
          </span>
          {project.category && (
            <span className="px-2.5 py-0.5 rounded-md bg-surface-container-low border border-outline-variant/30 text-primary font-semibold">
              {project.category}
            </span>
          )}
          {project.status && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-surface-container-low border border-outline-variant/30 text-primary font-semibold">
              <span className={`w-2 h-2 rounded-full ${statusColor} animate-pulse shrink-0`} />
              {project.status}
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary font-extrabold tracking-tight">
              {project.title}
            </h1>
            <p className="font-body-md text-base md:text-lg text-on-surface-variant leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Button className="h-10 px-5 gap-2 font-label-mono text-xs uppercase font-bold tracking-wider cursor-pointer bg-primary text-on-primary hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-10 px-5 gap-2 font-label-mono text-xs uppercase font-bold tracking-wider cursor-pointer border-outline-variant/30 hover:bg-surface-container-low transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub Source
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. OPTION A: FULL-WIDTH CINEMATIC SCREENSHOT SHOWCASE                     */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        {screenshots.length > 0 ? (
          <div className="space-y-3">
            {/* Main Active Screenshot Frame */}
            <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-2xl bg-surface-container-low border border-outline-variant/30 overflow-hidden flex items-center justify-center shadow-md group">
              <div
                className="w-full h-full relative flex items-center justify-center cursor-zoom-in p-4 sm:p-6"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIdx}
                    src={screenshots[currentIdx]}
                    alt={`${project.title} screenshot ${currentIdx + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-xs"
                  />
                </AnimatePresence>

                {/* Top Overlay Badge & Zoom */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 font-label-mono text-[11px] uppercase tracking-wider text-on-surface bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/30 shadow-xs pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>
                    Screen {String(currentIdx + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxOpen(true);
                  }}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center text-on-surface opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background duration-200 cursor-pointer shadow-xs"
                  title="Fullscreen Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Buttons */}
              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-background transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200 shadow-md cursor-pointer"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-background transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200 shadow-md cursor-pointer"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Interactive Thumbnail Scrubber Strip */}
            {screenshots.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-none">
                {screenshots.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      currentIdx === idx
                        ? "border-accent ring-2 ring-accent/30 scale-105 shadow-sm"
                        : "border-outline-variant/30 opacity-60 hover:opacity-100 hover:border-outline-variant/60"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-[21/9] rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col items-center justify-center text-on-surface-variant p-8 text-center">
            <span className="material-symbols-outlined text-[40px] opacity-30 mb-2">
              image
            </span>
            <p className="font-body-md text-sm">No preview screenshots attached.</p>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. TWO-COLUMN SPLIT: 65% NARRATIVE + 35% STICKY SIDEBAR                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pt-4">
        
        {/* LEFT COLUMN: Deep-Dive Markdown Narrative (65% / 8 cols) */}
        <main className="lg:col-span-8 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl border border-outline-variant/20 bg-background shadow-xs">
            <MarkdownRenderer content={project.description || ""} />
          </div>
        </main>

        {/* RIGHT COLUMN: Sticky Specs Sidebar & TOC (35% / 4 cols) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* 1. Project Specs Card */}
          <div className="p-5 sm:p-6 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest dark:bg-card/70 shadow-xs space-y-5">
            <h3 className="font-label-mono text-xs text-on-surface-variant uppercase font-bold tracking-widest flex items-center gap-1.5">
              <span className="text-accent">//</span>
              <span>Project Specs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary/80 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                    Role
                  </span>
                  <span className="font-body-md text-sm font-semibold text-primary block truncate">
                    {project.role || "Full-stack Developer"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary/80 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                    Team Size
                  </span>
                  <span className="font-body-md text-sm font-semibold text-primary block truncate">
                    {project.team_size || "1 Member"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary/80 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                    Timeline
                  </span>
                  <span className="font-body-md text-sm font-semibold text-primary block truncate">
                    {project.duration || "3 Months"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary/80 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                    Status
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor} animate-pulse`} />
                    <span className="font-body-md text-sm font-semibold text-primary">
                      {project.status || "Production"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Categorized Tech Stack */}
          {technologies.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest dark:bg-card/70 shadow-xs space-y-4">
              <h3 className="font-label-mono text-xs text-on-surface-variant uppercase font-bold tracking-widest flex items-center gap-1.5">
                <span className="text-accent">//</span>
                <span>Technologies</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-outline-variant/25 bg-background text-xs font-label-mono font-medium text-primary hover:border-outline-variant/50 transition-all cursor-default"
                  >
                    <TechLogo name={tech} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Dynamic Table of Contents */}
          {headings.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest dark:bg-card/70 shadow-xs space-y-3">
              <h3 className="font-label-mono text-xs text-on-surface-variant uppercase font-bold tracking-widest flex items-center gap-2">
                <ListTree className="w-3.5 h-3.5 text-accent" />
                <span>On This Page</span>
              </h3>

              <nav className="space-y-1 text-sm font-label-mono">
                {headings.map((h) => {
                  const isActive = activeSection === h.id;
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg text-xs transition-all leading-tight ${
                        h.level === 3 ? "pl-5 text-[11px]" : ""
                      } ${
                        isActive
                          ? "bg-accent/15 text-primary font-bold border-l-2 border-accent"
                          : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                      }`}
                    >
                      {h.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* 4. Contact CTA Banner */}
          <div className="p-5 rounded-2xl border border-accent/30 bg-accent/5 space-y-3">
            <div className="flex items-center gap-2 font-label-mono text-xs uppercase font-bold text-primary">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Build A Similar System?</span>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Have an engineering challenge or platform vision? Let&apos;s discuss architecture and execution.
            </p>
            <Link href="/#contact" className="block">
              <Button variant="outline" className="w-full h-8 text-xs font-label-mono uppercase tracking-wider font-bold gap-2 border-accent/40 hover:bg-accent/20 cursor-pointer">
                <Send className="w-3 h-3" />
                Start A Project
              </Button>
            </Link>
          </div>

        </aside>

      </div>

      {/* ========================================================================= */}
      {/* 4. ADJACENT PROJECT NAVIGATION DOCK                                       */}
      {/* ========================================================================= */}
      <footer className="border-t border-outline-variant/20 pt-10 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group p-5 rounded-2xl border border-outline-variant/20 bg-background hover:border-outline-variant/50 transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider mb-2">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Previous Project</span>
              </div>
              <h4 className="font-display text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                {prevProject.title}
              </h4>
              <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 mt-1">
                {prevProject.summary}
              </p>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group p-5 rounded-2xl border border-outline-variant/20 bg-background hover:border-outline-variant/50 transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-2 font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider mb-2">
                <span>Next Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="font-display text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                {nextProject.title}
              </h4>
              <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 mt-1">
                {nextProject.summary}
              </p>
            </Link>
          ) : <div />}
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. LIGHTBOX MODAL OVERLAY                                                 */}
      {/* ========================================================================= */}
      {lightboxOpen && screenshots.length > 0 && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div
            className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between font-label-mono text-xs uppercase text-white/70 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-accent truncate">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>~/projects/{project.slug}/screenshot-{String(currentIdx + 1).padStart(2, "0")}.png</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-white/40">←/→ arrows to navigate • esc to close</span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Image Container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[currentIdx]}
              alt="Screenshot full size"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Next"
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
