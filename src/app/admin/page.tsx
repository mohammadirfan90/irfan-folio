import React from "react";
import { createClient } from "@/lib/supabase/server";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { Project, ContactMessage } from "@/types";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Fetch Projects list
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  // 2. Fetch counts for stats
  const { count: projectsCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: skillsCount } = await supabase
    .from("skills")
    .select("*", { count: "exact", head: true });

  const { count: experiencesCount } = await supabase
    .from("experiences")
    .select("*", { count: "exact", head: true });

  let messagesCount = 0;
  try {
    const { count } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true });
    messagesCount = count || 0;
  } catch (e) {
    // Table might not exist yet or error
  }

  // 3. Fetch latest messages for alerts
  let recentMessages: ContactMessage[] = [];
  try {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    if (data) {
      recentMessages = data as ContactMessage[];
    }
  } catch (e) {
    // Fallback if table doesn't exist
  }

  return (
    <DashboardOverview
      initialProjects={(projects || []) as Project[]}
      stats={{
        projectsCount: projectsCount || 0,
        skillsCount: skillsCount || 0,
        experiencesCount: experiencesCount || 0,
        messagesCount: messagesCount,
      }}
      recentMessages={recentMessages}
    />
  );
}
