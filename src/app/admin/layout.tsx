import React from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

/**
 * Server-side guard for the entire /admin area.
 *
 * If the middleware ever stops running (matcher change, route bypass), this
 * RSC layout is the last line of defense: every /admin/* render has to clear
 * requireAdmin() first.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/login");
  }

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}