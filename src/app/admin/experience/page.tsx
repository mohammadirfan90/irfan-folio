import React from "react";
import { createClient } from "@/lib/supabase/server";
import { ExperienceManager } from "@/components/admin/ExperienceManager";

export default async function AdminExperiencePage() {
  const supabase = await createClient();

  // Fetch experiences
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  // Fetch educations
  const { data: educations } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-2">
          Management
        </span>
        <h1 className="font-display text-4xl text-primary font-bold">
          Chronicle History
        </h1>
        <p className="font-body-md text-on-surface-variant mt-2">
          Add, edit, or delete work experience and academic credentials displayed on the homepage.
        </p>
      </div>

      <ExperienceManager
        initialExperiences={experiences || []}
        initialEducations={educations || []}
      />
    </div>
  );
}
