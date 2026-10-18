import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer, FooterSocial } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { createClient } from "@/lib/supabase/client";
import { PublicLayoutShell } from "@/components/layout/PublicLayoutShell";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch social links server-side so the footer never has to render
  // a placeholder href="#". If the row is missing, we pass an empty list
  // and the footer renders nothing.
  const supabase = createClient();
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("platform, url")
    .order("display_order", { ascending: true });

  const footerSocials: FooterSocial[] = (socialLinks || [])
    .filter((s): s is { platform: string; url: string } =>
      typeof s.platform === "string" && typeof s.url === "string"
    )
    .map((s) => ({ label: s.platform, href: s.url }));

  return (
    <PublicLayoutShell footerSocials={footerSocials}>
      {children}
    </PublicLayoutShell>
  );
}