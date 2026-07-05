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
  experiences = [],
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
  // Build experience and education groups separately, each sorted by display_order.
  const experienceItems = [...experiences]
    .sort((a, b) => a.display_order - b.display_order)
    .map((exp) => ({
      id: `exp-${exp.id}`,
      duration: exp.duration,
      title: exp.role,
      subtitle: exp.company,
      description: exp.description,
      kind: "experience" as const,
    }));

  const educationItems = [...educations]
    .sort((a, b) => a.display_order - b.display_order)
    .map((edu) => ({
      id: `edu-${edu.id}`,
      duration: edu.duration,
      title: edu.degree,
      subtitle: edu.school,
      description: edu.description || "",
      kind: "education" as const,
    }));

  const showExperience = experienceItems.length > 0;
  const showEducation = educationItems.length > 0;

  return (
    <section
      className="py-section-gap-mobile md:py-section-gap-desktop"
      id="education"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="max-w-3xl">
          {/* Header */}
          <BlurFade delay={0.1} direction="left" inView>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4 block">
              <span className="text-accent mr-1.5 select-none">//</span>
              Background
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-12">
              Education
            </h2>
          </BlurFade>

          {/* Experience group (only rendered when there are entries) */}
          {showExperience && (
            <div className="space-y-12">
              {experienceItems.map((item, index) => (
                <BlurFade key={item.id} delay={0.1 + index * 0.08} direction="right" inView>
                  <TimelineItem
                    duration={item.duration}
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.description}
                    kind={item.kind}
                    isLast={
                      index === experienceItems.length - 1 && !showEducation
                    }
                  />
                </BlurFade>
              ))}
            </div>
          )}

          {/* Education group divider (only when both groups exist) */}
          {showExperience && showEducation && (
            <BlurFade delay={0.2} direction="up" inView>
              <div className="flex items-center gap-3 mt-16 mb-10">
                <span className="font-label-mono text-label-mono text-accent uppercase tracking-widest text-xs select-none">
                  // education
                </span>
                <span className="flex-1 h-px bg-outline-variant/30" aria-hidden="true" />
              </div>
            </BlurFade>
          )}

          {/* Education group */}
          {showEducation && (
            <div className="space-y-12">
              {educationItems.map((item, index) => (
                <BlurFade key={item.id} delay={0.1 + index * 0.08} direction="right" inView>
                  <TimelineItem
                    duration={item.duration}
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.description}
                    kind={item.kind}
                    isLast={index === educationItems.length - 1}
                  />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
