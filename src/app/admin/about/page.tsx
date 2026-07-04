import React from "react";
import { createClient } from "@/lib/supabase/server";
import { AboutForm } from "@/components/admin/AboutForm";

export default async function AdminAboutPage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch site settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-sm text-neutral-500 font-bold uppercase tracking-widest block mb-1">
          Management
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
          Profile Settings
        </h1>
      </div>

      <AboutForm profile={profile} settings={settings} />
    </div>
  );
}
