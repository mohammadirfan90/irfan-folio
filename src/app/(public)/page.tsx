import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { createClient } from "@/lib/supabase/client";

export default async function Home() {
  const supabase = createClient();

  // Fetch all content in parallel from the database
  const [
    { data: profile },
    { data: settings },
    { data: skills },
    { data: projects },
    { data: experiences },
    { data: educations },
    { data: socialLinks },
  ] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    supabase.from("skills").select("*").order("display_order", { ascending: true }),
    supabase.from("projects").select("*").eq("published", true).order("created_at", { ascending: false }),
    supabase.from("experiences").select("*").order("display_order", { ascending: true }),
    supabase.from("education").select("*").order("display_order", { ascending: true }),
    supabase.from("social_links").select("*").order("display_order", { ascending: true }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile?.full_name || "Software Engineer",
    "jobTitle": profile?.title || "Full-stack Developer",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.com",
    "sameAs": socialLinks?.map((s) => s.url) || [
      "https://github.com",
      "https://linkedin.com"
    ],
    "knowsAbout": skills?.map((s) => s.name) || [
      "React", "Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "Tailwind CSS", "AWS", "Docker"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": profile?.location?.split(",")[0] || "San Francisco",
      "addressRegion": profile?.location?.split(",")[1]?.trim().split(" ")[0] || "CA",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        isAvailable={settings?.is_available_for_hire ?? undefined}
        availabilityMessage={settings?.availability_message ?? undefined}
        name={profile?.full_name ?? undefined}
        designation={profile?.title ?? undefined}
        bio={profile?.bio_description ?? undefined}
        profileImageUrl={profile?.avatar_url ?? undefined}
        resumeUrl={profile?.resume_url ?? undefined}
        socials={socialLinks && socialLinks.length > 0 ? {
          githubUrl: socialLinks.find(s => s.platform.toLowerCase() === "github")?.url ?? undefined,
          linkedinUrl: socialLinks.find(s => s.platform.toLowerCase() === "linkedin")?.url ?? undefined,
        } : undefined}
      />
      <AboutSection
        location={profile?.location ?? undefined}
        focusArea={profile?.focus_area ?? undefined}
      />
      <SkillsSection
        skills={skills && skills.length > 0 ? skills : undefined}
      />
      <ProjectsSection
        projects={projects && projects.length > 0 ? projects : undefined}
      />
      <ExperienceSection
        experiences={experiences && experiences.length > 0 ? experiences : undefined}
        educations={educations && educations.length > 0 ? educations : undefined}
      />
      <ContactSection
        email={settings?.contact_email ?? undefined}
        socials={socialLinks && socialLinks.length > 0 ? socialLinks.map(s => ({
          label: s.platform,
          href: s.url
        })) : undefined}
      />
    </>
  );
}
