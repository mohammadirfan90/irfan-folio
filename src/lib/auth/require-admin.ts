import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Server-only guard for admin actions and admin pages.
 *
 * - Gets the currently logged-in user (Supabase auth).
 * - Confirms the user has a row in public.admins.
 * - Throws "Unauthorized" on either failure; otherwise returns the user.
 *
 * Throwing is intentional: server actions and RSC pages should treat an
 * unauthenticated or non-admin caller as a hard failure (returns 500/redirect
 * to /login), not as a soft error that could leak data.
 */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new Error("Unauthorized");
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (adminError || !adminRow) {
    throw new Error("Unauthorized");
  }

  return data.user;
}
