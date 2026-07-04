import React from "react";
import { createClient } from "@/lib/supabase/server";
import { SkillsManager } from "@/components/admin/SkillsManager";

export default async function AdminSkillsPage() {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div className="space-y-8">
      <div>
        <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-2">
          Management
        </span>
        <h1 className="font-display text-4xl text-primary font-bold">
          Technical Stack
        </h1>
      </div>

      <SkillsManager initialSkills={skills || []} />
    </div>
  );
}
