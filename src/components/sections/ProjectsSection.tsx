"use client";

import React from "react";
import { ProjectCard } from "../portfolio/ProjectCard";
import { Project } from "@/types";
import { BlurFade } from "@/components/ui/blur-fade";

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({
  projects = [],
}: ProjectsSectionProps) {
  return (
    <section
      className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low"
      id="projects"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Section Header */}
        <div className="mb-16">
          <BlurFade delay={0.1} direction="right" inView>
            <div>
              <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4 block font-semibold">
                <span className="text-accent mr-1.5 select-none">//</span>
                Selected Work
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Projects
              </h2>
            </div>
          </BlurFade>
        </div>

        {/* Project Card Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const dir = index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right";
              return (
                <BlurFade key={project.id} delay={0.1 + index * 0.1} direction={dir} inView>
                  <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    summary={project.summary}
                    category={project.category}
                    imageUrl={project.thumbnail_url || ""}
                    liveUrl={project.live_url || undefined}
                    technologies={project.technologies ?? []}
                  />
                </BlurFade>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-outline-variant/40 rounded-2xl p-12 text-center bg-surface text-on-surface-variant">
            <p className="font-body-md text-sm">
              No published projects yet. Add them in the admin dashboard.
            </p>
          </div>
        )}

        {/* View All Projects Button */}
        {projects.length > 0 && (
          <div className="flex justify-center mt-16">
            <BlurFade delay={0.4} inView>
              <a href="#projects">
                <button className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-semibold font-label-mono text-label-mono shadow-md hover:bg-on-surface-variant transition-all active:scale-95 duration-200 cursor-pointer">
                  View All Projects
                </button>
              </a>
            </BlurFade>
          </div>
        )}
      </div>
    </section>
  );
}