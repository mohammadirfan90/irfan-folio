"use client";

import React from "react";
import { motion } from "framer-motion";
import { AvailabilityBadge } from "../portfolio/AvailabilityBadge";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  isAvailable?: boolean;
  availabilityMessage?: string;
  name?: string;
  designation?: string;
  bio?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  socials?: {
    githubUrl?: string;
    linkedinUrl?: string;
  };
}

export function HeroSection({
  isAvailable = true,
  availabilityMessage = "Available for new opportunities",
  name = "Software Engineer",
  designation = "Full-stack Developer.",
  bio = "Architecting robust digital experiences with a focus on technical precision and editorial-grade user interfaces.",
  profileImageUrl,
  resumeUrl,
  socials = {
    githubUrl: "#",
    linkedinUrl: "#",
  },
}: HeroSectionProps) {
  const displayImageUrl = profileImageUrl || "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg";
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const, // Custom premium ease-out
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-section-gap-mobile md:pb-section-gap-desktop overflow-hidden bg-surface">
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        color="#2a4dd7"
        size={0.6}
        staticity={60}
      />
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Hero Left Content */}
        <div className="md:col-span-7 order-2 md:order-1 flex flex-col items-start pr-0 md:pr-8">
          <BlurFade delay={0.1} direction="up" inView>
            <AvailabilityBadge
              isAvailable={isAvailable}
              message={availabilityMessage}
            />
          </BlurFade>

          <BlurFade delay={0.2} direction="up" inView>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-[1.05] mb-2">
              {name}
            </h1>
          </BlurFade>

          <BlurFade delay={0.28} direction="up" inView>
            <h2 className="text-xl md:text-2xl font-label-mono text-label-mono text-on-surface-variant mb-6 uppercase tracking-wider">
              {designation.replace(/\.$/, "")}
            </h2>
          </BlurFade>

          <BlurFade delay={0.35} direction="up" inView>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {bio}
            </p>
          </BlurFade>

          <BlurFade delay={0.42} direction="up" inView>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#contact" className="inline-block">
                <ShinyButton className="bg-black text-white hover:bg-black/90 border-transparent rounded-lg font-semibold px-8 py-4 shadow-lg active:scale-95 duration-150 transition-all font-label-mono text-label-mono h-auto">
                  Get in touch
                </ShinyButton>
              </a>
              <a href={resumeUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-block">
                <ShinyButton className="bg-surface-container-low/70 text-on-surface hover:bg-surface-container-low hover:text-secondary border-outline-variant/30 rounded-lg font-semibold px-8 py-4 shadow-md active:scale-95 duration-150 transition-all font-label-mono text-label-mono h-auto">
                  <span className="flex items-center gap-2 justify-center">
                    Resume
                    <ArrowUpRight className="w-4 h-4 text-secondary" />
                  </span>
                </ShinyButton>
              </a>
            </div>
          </BlurFade>
        </div>

        {/* Hero Right Image */}
        <BlurFade className="md:col-span-5 order-1 md:order-2 w-full" delay={0.3} direction="up" inView>
          <div className="relative group">
            <div className="absolute -inset-4 bg-secondary-container/5 rounded-3xl blur-3xl group-hover:bg-secondary-container/10 transition-colors duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 aspect-[4/5] bg-white">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={displayImageUrl}
                alt="Profile portrait"
              />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
