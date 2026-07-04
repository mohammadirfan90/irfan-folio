import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  slug: string;
  summary: string;
  category: string;
  imageUrl: string;
  liveUrl?: string;
  technologies?: string[];
}

export function ProjectCard({
  title,
  slug,
  summary,
  category,
  imageUrl,
  liveUrl,
  technologies,
}: ProjectCardProps) {
  const displayTechs = (technologies ?? []).slice(0, 3);
  const overflowCount = (technologies ?? []).length - displayTechs.length;

  return (
    <Card
      className="group relative bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
      style={{
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Animated lime border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, rgba(163, 230, 53, 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Image Showcase */}
      <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
        {/* Base dim layer (fades on hover) */}
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10" />

        {/* Blue tint overlay on hover */}
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.18) 0%, rgba(17, 24, 39, 0.10) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Diagonal shine sweep on hover */}
        <div
          className="absolute inset-0 z-20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.22) 55%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110 group-hover:saturate-110"
          loading="lazy"
        />

        {/* Category pill */}
        <div className="absolute top-4 left-4 z-30">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 rounded-full font-label-mono text-[10px] uppercase tracking-widest text-primary border border-white/20 font-semibold shadow-sm">
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            {category}
          </span>
        </div>

        {/* Bottom gradient fade for legibility */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(17, 24, 39, 0.6), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Info Content */}
      <CardContent className="p-6 flex-1 flex flex-col justify-between relative z-10">
        <div className="space-y-3">
          {/* Title with arrow + animated underline */}
          <h3 className="relative font-display text-xl font-bold text-on-surface inline-flex items-center gap-2">
            <span className="relative inline-block">
              {title}
              <span
                className="absolute left-0 -bottom-0.5 h-px bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out"
                aria-hidden="true"
              />
            </span>
            <span
              className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-label-mono text-base"
              aria-hidden="true"
            >
              →
            </span>
          </h3>

          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
            {summary}
          </p>

          {/* Tech stack chips — stagger fade-in on hover */}
          {displayTechs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {displayTechs.map((tech, i) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-container-lowest border border-outline-variant/20 group-hover:border-accent/40 font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant group-hover:text-primary transition-all duration-300 opacity-80 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0"
                  style={{
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0 group-hover:animate-pulse" />
                  {tech}
                </span>
              ))}
              {overflowCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant/60">
                  +{overflowCount}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>

      {/* Buttons Action Bar */}
      <CardFooter className="flex items-center gap-3 p-6 pt-4 border-t border-outline-variant/10 bg-transparent rounded-b-2xl relative z-10">
        <Link href={`/projects/${slug}`} className="flex-1 relative group/btn">
          <Button
            variant="outline"
            className="w-full justify-center text-sm font-semibold cursor-pointer h-10 relative"
          >
            <span
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"
              aria-hidden="true"
            />
            Details
          </Button>
        </Link>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full justify-center text-sm font-semibold cursor-pointer bg-primary text-on-primary hover:bg-on-surface-variant border-transparent h-10 gap-1.5 transition-all duration-300 hover:gap-2.5">
              Live Link
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}