"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface AboutSectionProps {
  /** Short headline rendered under the eyebrow. */
  headline?: string;
  /** Optional 1-2 sentence summary. */
  summary?: string;
  /** List of working principles shown in the left card. */
  principles?: string[];
  /** What the developer is open to right now. */
  openTo?: string;
  /** What the developer is currently learning / deepening. */
  learning?: string;
  /** Optional currently-building note. */
  building?: string;
  /** "Available" / "Open" / "Booked" — drives the status pill color. */
  status?: "available" | "open" | "booked";
  /** Location string (used inside the currently card). */
  location?: string;
  /** Focus area string (used inside the currently card). */
  focusArea?: string;
  /** Curated stack chips shown at the bottom. */
  stack?: string[];
}

const DEFAULT_PRINCIPLES = [
  "Ship to learn — the fastest way to know if an idea works.",
  "Ask dumb questions early; clever debugging comes later.",
  "Read the docs first. Then read them again.",
  "Keep it simple — boring tech, well-applied, wins.",
];

const DEFAULT_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
];

export function AboutSection({
  headline = "Building software people actually use.",
  summary = "I'm a junior full-stack developer who learns by shipping. I write clean, readable code, ship small things often, and treat every project as a chance to get a little better at the craft.",
  principles = DEFAULT_PRINCIPLES,
  openTo = "junior full-stack roles · internships · contract work",
  learning = "react server components · edge functions · postgres internals · design systems",
  building,
  status = "available",
  location,
  focusArea,
  stack = DEFAULT_STACK,
}: AboutSectionProps) {
  const statusLabel =
    status === "available"
      ? "available"
      : status === "open"
        ? "open to offers"
        : "booked";

  const statusDotColor =
    status === "booked"
      ? "bg-amber-500"
      : status === "open"
        ? "bg-blue-500"
        : "bg-accent";

  return (
    <section
      className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low"
      id="about"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <BlurFade delay={0.1} direction="left" inView>
            <span className="font-label-mono text-sm md:text-base text-secondary uppercase tracking-widest mb-4 block font-semibold">
              <span className="text-accent mr-1.5 select-none">//</span>
              About Me
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">
              {headline}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {summary}
            </p>
          </BlurFade>
        </div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT CARD — How I work */}
          <BlurFade delay={0.2} direction="left" inView>
            <div className="h-full p-6 md:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs hover:shadow-md hover:border-outline-variant/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-accent font-label-mono text-xs select-none"
                  aria-hidden="true"
                >
                  //
                </span>
                <h3 className="font-label-mono text-label-mono text-primary uppercase tracking-widest font-semibold">
                  how_i_work
                </h3>
              </div>
              <ul className="space-y-3">
                {principles.map((principle, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-on-surface font-body-md text-body-md leading-relaxed"
                  >
                    <span
                      className="text-accent font-label-mono shrink-0 mt-1 select-none"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          {/* RIGHT CARD — Currently */}
          <BlurFade delay={0.3} direction="right" inView>
            <div className="h-full p-6 md:p-8 rounded-2xl bg-primary text-on-primary border border-primary shadow-xs hover:shadow-md transition-all duration-300 font-label-mono">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-accent text-xs select-none" aria-hidden="true">
                  $
                </span>
                <h3 className="text-label-mono text-white uppercase tracking-widest font-semibold">
                  status --verbose
                </h3>
                <span
                  className={`ml-auto w-1.5 h-1.5 rounded-full ${statusDotColor} animate-pulse`}
                  aria-hidden="true"
                />
              </div>

              <div className="space-y-2.5 text-[13px] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-accent shrink-0 select-none">→</span>
                  <span className="text-white/60">open to:</span>
                  <span className="text-white">{openTo}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent shrink-0 select-none">→</span>
                  <span className="text-white/60">learning:</span>
                  <span className="text-white">{learning}</span>
                </div>
                {building && (
                  <div className="flex items-start gap-2">
                    <span className="text-accent shrink-0 select-none">→</span>
                    <span className="text-white/60">building:</span>
                    <span className="text-white">{building}</span>
                  </div>
                )}
                {focusArea && (
                  <div className="flex items-start gap-2">
                    <span className="text-accent shrink-0 select-none">→</span>
                    <span className="text-white/60">focus:</span>
                    <span className="text-white">{focusArea}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-start gap-2">
                    <span className="text-accent shrink-0 select-none">→</span>
                    <span className="text-white/60">location:</span>
                    <span className="text-white">{location}</span>
                  </div>
                )}
                <div className="flex items-start gap-2 pt-1">
                  <span className="text-accent shrink-0 select-none">→</span>
                  <span className="text-white/60">status:</span>
                  <span className="inline-flex items-center gap-1.5 text-white">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusDotColor}`}
                      aria-hidden="true"
                    />
                    {statusLabel}
                  </span>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Stack at a glance */}
        <BlurFade delay={0.4} direction="up" inView>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="font-label-mono text-xs text-on-surface-variant/60 uppercase tracking-widest">
              stack at a glance:
            </span>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/20 font-label-mono text-[11px] uppercase tracking-wider text-on-surface-variant hover:border-accent/40 hover:text-primary transition-colors duration-200"
                >
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}