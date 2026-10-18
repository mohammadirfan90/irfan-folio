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

  // Only emit an address when we actually know the location. The schema.org
  // address block is omitted entirely otherwise so we never lie about it.
  const locationParts: string[] = profile?.location
    ? profile.location.split(",").map((part: string) => part.trim()).filter(Boolean)
    : [];
  const addressBlock = locationParts.length > 0
    ? {
        "@type": "PostalAddress",
        addressLocality: locationParts[0],
        ...(locationParts[1] ? { addressRegion: locationParts[1] } : {}),
        ...(locationParts[2] ? { addressCountry: locationParts[2] } : {}),
      }
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile?.full_name || "Mohammad Irfan",
    "jobTitle": profile?.title || "Full-stack Developer",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.com",
    "sameAs": socialLinks && socialLinks.length > 0
      ? socialLinks.map((s) => s.url)
      : undefined,
    "knowsAbout": skills && skills.length > 0
      ? skills.map((s) => s.name)
      : undefined,
    ...(addressBlock ? { address: addressBlock } : {}),
  };

  // Strip any keys that ended up undefined so the JSON-LD stays clean.
  const cleanJsonLd = Object.fromEntries(
    Object.entries(jsonLd).filter(([, value]) => value !== undefined)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
      />
      <HeroSection
        isAvailable={settings?.is_available_for_hire ?? undefined}
        availabilityMessage={settings?.availability_message ?? undefined}
        name={profile?.full_name ?? undefined}
        designation={profile?.title ?? undefined}
        bio={profile?.bio_description ?? undefined}
        profileImageUrl={profile?.avatar_url ?? undefined}
        resumeUrl={profile?.resume_url ?? undefined}
      />
      <AboutSection
        summary={profile?.bio_description ?? undefined}
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
        phone={settings?.contact_phone ?? undefined}
        whatsapp={settings?.contact_whatsapp ?? undefined}
        socials={socialLinks && socialLinks.length > 0 ? socialLinks.map(s => ({
          label: s.platform,
          href: s.url
        })) : undefined}
      />
    </>
  );
}
