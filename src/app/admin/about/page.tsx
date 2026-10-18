import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { AboutForm } from "@/components/admin/AboutForm";

export default async function AdminAboutPage() {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    redirect("/login");
  }

  const supabase = await createClient();

  // Fetch profile for the current admin user
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

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