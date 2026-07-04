"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface AboutSectionProps {
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  location?: string;
  focusArea?: string;
}

export function AboutSection({
  title = "Engineering with intent.",
  paragraph1 = "With over half a decade of experience in the digital trenches, I specialize in building scalable systems that don't just work—they perform. My philosophy is rooted in the belief that clean code is a prerequisite for a premium user experience.",
  paragraph2 = "I bridge the gap between complex backend architectures and pixel-perfect frontends. Whether it's optimizing database queries or crafting smooth micro-interactions, I treat every line of code as a building block for something meaningful.",
  location = "San Francisco, CA (Remote)",
  focusArea = "Scalable Systems & UI/UX",
}: AboutSectionProps) {
  return (
    <section
      className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-low"
      id="about"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {/* Left Column - Header info */}
          <div className="md:col-span-5">
            <BlurFade delay={0.1} inView>
              <span className="font-label-mono text-sm md:text-base text-secondary uppercase tracking-widest mb-4 block font-semibold">
                About Me
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-8">
                {title}
              </h2>
            </BlurFade>
          </div>

          {/* Right Column - Text descriptions */}
          <div className="md:col-span-7">
            <BlurFade delay={0.2} inView>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                {paragraph1}
              </p>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                {paragraph2}
              </p>
            </BlurFade>
            
            <BlurFade delay={0.4} inView>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
                <div>
                  <h4 className="font-label-mono text-label-mono text-primary mb-2">
                    Location
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-body-md">
                    {location}
                  </p>
                </div>
                <div>
                  <h4 className="font-label-mono text-label-mono text-primary mb-2">
                    Focus
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-body-md">
                    {focusArea}
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
