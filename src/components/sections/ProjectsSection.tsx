"use client";

import React from "react";
import { ProjectCard } from "../portfolio/ProjectCard";
import { Project } from "@/types";
import { BlurFade } from "@/components/ui/blur-fade";

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({
  projects = [
    {
      id: "1",
      title: "Skilltern",
      slug: "skilltern",
      summary: "AI-driven internship matchmaking platform for high-growth startups.",
      category: "AI / PLATFORM",
      technologies: ["React", "Next.js", "AI", "TypeScript"],
      featured: true,
      published: true,
      thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJcGlKbSlVLHYy3fo2qhj1L6bDJ01GX-9I0sOl4qGnjRLaPZiVsk8vCDXa46XXvpC4luBKnIkJLuus5VmDup8p3caFe2tON3oVh6iSYcYFpfpAn9ajjhOg-Mg8PwKBPlyLvcHWMHSum-oC-14z61Awt1tveUlb3sgqWi0KdZslRV3iTN3PFnTl3sIR2ESey4yMklbBlXt3y597kMm4xp7dbaPReMs7TU74Nf0_xKaIBhp5cSEuk_HQ",
    },
    {
      id: "2",
      title: "SMUCT CSE Fest",
      slug: "smuct-cse-fest",
      summary: "Official portal for the regional Computer Science Engineering festival.",
      category: "EVENT / WEB",
      technologies: ["Next.js", "Tailwind CSS", "Brutalist Design"],
      featured: true,
      published: true,
      thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXI-MWZdpNpc26m6k_iCgvWvRoNKRn3Jr41l3cU3EZ-Wu4YDYZWMROXhbBz0ANi0w8VhM0mY8Nzx7NyTcRRTTfBx8cDov31lCrlZSbBFcqOZKdoVqt3Z1VpEwREdW5-6qjYNXZcTf71FlR7L1FPPjOL1z0A24LXAOuFxcsHZvrmPcgBv432nhWoab07e6lX-LqPgw9a6Eo62R-kH02AKyCq920yc-HDpbMFkSEzaDMNWiYJH380qq",
    },
    {
      id: "3",
      title: "Lumora Studio",
      slug: "lumora-studio",
      summary: "Bespoke portfolio site for a boutique creative and technical agency.",
      category: "AGENCY / UI",
      technologies: ["Design System", "Vanilla CSS", "React"],
      featured: true,
      published: true,
      thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNc5AgYM5FoSAaHkwvcM6jBSfbzY7_gwhV9p2sQygBr8sQPHxTDf5NbhAjyoPijDzWhWHssF4z2BreaT9lPv3O7JOlcjhq1thcuFIBojMK5WV2pzUtZry_HG7WV7SpvMF2RxnD3YpjtYgYE3ZCv1sQKLHtH7AKIvaRI_uadoxnvgYE_eisqT5OL6XrynVIDuF3MSO2ux_yf6fm9zDF63Tm9XblBC20q-wTgUt3ltv4ZZtKLA3u-YQw",
    },
  ],
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
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Projects
              </h2>
            </div>
          </BlurFade>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <BlurFade key={project.id} delay={0.1 + index * 0.1} inView>
              <ProjectCard
                title={project.title}
                slug={project.slug}
                summary={project.summary}
                category={project.category}
                imageUrl={project.thumbnail_url || ""}
                liveUrl={project.live_url || undefined}
              />
            </BlurFade>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-16">
          <BlurFade delay={0.4} inView>
            <a href="#projects">
              <button className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-semibold font-label-mono text-label-mono shadow-md hover:bg-on-surface-variant transition-all active:scale-95 duration-200 cursor-pointer">
                View All Projects
              </button>
            </a>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
