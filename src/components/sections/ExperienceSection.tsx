"use client";

import React from "react";
import { TimelineItem } from "../portfolio/TimelineItem";
import { Experience, Education } from "@/types";
import { BlurFade } from "@/components/ui/blur-fade";

interface ExperienceSectionProps {
  experiences?: Experience[];
  educations?: Education[];
}

export function ExperienceSection({
  experiences = [
    {
      id: "1",
      role: "Lead Frontend Engineer",
      company: "TechScale Innovations",
      duration: "2022 — PRES",
      description: "Pioneering the migration to a micro-frontend architecture, reducing bundle sizes by 40% and improving lighthouse scores across 5 core products.",
      display_order: 1,
    },
    {
      id: "2",
      role: "Full-stack Developer",
      company: "DataStream Core",
      duration: "2020 — 2022",
      description: "Developed real-time data visualization dashboards for enterprise clients using React, D3.js, and specialized WebGL shaders.",
      display_order: 2,
    },
  ],
  educations = [
    {
      id: "1",
      degree: "B.Sc. in Computer Science",
      school: "University of Technology",
      duration: "2016 — 2020",
      description: "Specialized in Distributed Systems and Human-Computer Interaction. Graduated with Honors.",
      display_order: 1,
    },
  ],
}: ExperienceSectionProps) {
  // Combine and structure the items into a single timeline as per the static HTML layout.
  // In the mock, experience items are followed by education items.
  const timelineItems = [
    ...experiences.map((exp) => ({
      id: `exp-${exp.id}`,
      duration: exp.duration,
      title: exp.role,
      subtitle: exp.company,
      description: exp.description,
      display_order: exp.display_order,
      type: "experience" as const,
    })),
    ...educations.map((edu) => ({
      id: `edu-${edu.id}`,
      duration: edu.duration,
      title: edu.degree,
      subtitle: edu.school,
      description: edu.description || "",
      display_order: edu.display_order + 100, // offset to place after experience
      type: "education" as const,
    })),
  ].sort((a, b) => a.display_order - b.display_order);

  return (
    <section
      className="py-section-gap-mobile md:py-section-gap-desktop"
      id="services"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="max-w-3xl">
          {/* Header */}
          <BlurFade delay={0.1} inView>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4 block">
              Chronicle
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-12">
              Experience &amp; Education
            </h2>
          </BlurFade>

          {/* Timeline List */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <BlurFade key={item.id} delay={0.1 + index * 0.08} inView>
                <TimelineItem
                  duration={item.duration}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  isLast={index === timelineItems.length - 1}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
