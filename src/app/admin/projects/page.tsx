import React from "react";
import { createClient } from "@/lib/supabase/server";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-2">
          Management
        </span>
        <h1 className="font-display text-4xl text-primary font-bold">
          Featured Projects
        </h1>
      </div>

      <ProjectsManager initialProjects={projects || []} />
    </div>
  );
}
