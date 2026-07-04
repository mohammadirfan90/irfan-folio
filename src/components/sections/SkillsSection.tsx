"use client";

import React from "react";
import { SkillCard } from "../portfolio/SkillCard";
import { Skill } from "@/types";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";

interface SkillsSectionProps {
  skills?: Skill[];
}

const secondarySkills = [
  "Git", "GitHub", "Prisma", "Supabase", "Redis", "Docker", "Kubernetes", "SST", "Vercel", "Framer Motion", "Python", "SQL", "REST APIs", "CI/CD", "Jest", "Linux"
];

export function SkillsSection({
  skills = [
    { id: "1", name: "React / Next.js", category: "Frontend", display_order: 1 },
    { id: "2", name: "TypeScript", category: "Frontend", display_order: 2 },
    { id: "3", name: "Node.js / Go", category: "Backend", display_order: 3 },
    { id: "4", name: "PostgreSQL", category: "Database", display_order: 4 },
    { id: "5", name: "Tailwind CSS", category: "Frontend", display_order: 5 },
    { id: "6", name: "AWS / Docker", category: "DevOps", display_order: 6 },
    { id: "7", name: "GraphQL", category: "Backend", display_order: 7 },
    { id: "8", name: "Figma", category: "Design", display_order: 8 },
  ],
}: SkillsSectionProps) {
  return (
    <section id="skills" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Skills
            </h2>
          </BlurFade>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {skills.map((skill, index) => (
            <BlurFade key={skill.id} delay={0.1 + index * 0.05} inView>
              <SkillCard
                name={skill.name}
                customLogoUrl={skill.custom_logo_url}
              />
            </BlurFade>
          ))}
        </div>

        {/* Scrolling tech marquee */}
        <BlurFade delay={0.4} inView>
          <h3 className="font-label-mono text-label-mono text-center text-on-surface-variant/40 uppercase tracking-widest mt-20 mb-8">
            Complementary Tools &amp; Libraries
          </h3>
          <Marquee className="[--duration:40s] py-2" pauseOnHover>
            {secondarySkills.map((tech) => (
              <div
                key={tech}
                className="px-5 py-2.5 bg-white border border-outline-variant/15 rounded-full font-label-mono text-label-mono text-on-surface-variant flex items-center gap-2 shadow-sm select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 animate-pulse" />
                <span>{tech}</span>
              </div>
            ))}
          </Marquee>
        </BlurFade>
      </div>
    </section>
  );
}
