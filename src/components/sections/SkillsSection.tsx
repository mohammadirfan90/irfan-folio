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
  // Group skills by category while preserving the original display_order within each group.
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const key = skill.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});
  const orderedCategories = Object.keys(grouped);

  return (
    <section id="skills" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4 block font-semibold">
              <span className="text-accent mr-1.5 select-none">//</span>
              Stack
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Skills
            </h2>
          </BlurFade>
        </div>

        <div className="space-y-12">
          {orderedCategories.map((category, catIdx) => (
            <div key={category}>
              {/* Section comment-style divider: // frontend ────────── */}
              <BlurFade delay={0.1} direction={catIdx % 2 === 0 ? "left" : "right"} inView>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-label-mono text-label-mono text-accent uppercase tracking-widest text-xs select-none">
                    // {category.toLowerCase()}
                  </span>
                  <span className="flex-1 h-px bg-outline-variant/30" aria-hidden="true" />
                </div>
              </BlurFade>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {grouped[category].map((skill, index) => (
                  <BlurFade key={skill.id} delay={0.05 + index * 0.04} inView>
                    <SkillCard
                      name={skill.name}
                      customLogoUrl={skill.custom_logo_url}
                    />
                  </BlurFade>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling tech marquee */}
        <BlurFade delay={0.4} inView>
          <h3 className="font-label-mono text-label-mono text-center text-on-surface-variant/40 uppercase tracking-widest mt-20 mb-8">
            <span className="text-accent mr-1.5 select-none">//</span>
            Complementary Tools &amp; Libraries
          </h3>
          <Marquee className="[--duration:40s] py-2" pauseOnHover>
            {secondarySkills.map((tech) => (
              <div
                key={tech}
                className="px-5 py-2.5 bg-white border border-outline-variant/15 rounded-full font-label-mono text-label-mono text-on-surface-variant flex items-center gap-2 shadow-sm select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{tech}</span>
              </div>
            ))}
          </Marquee>
        </BlurFade>
      </div>
    </section>
  );
}
