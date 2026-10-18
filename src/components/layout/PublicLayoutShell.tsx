"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer, FooterSocial } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

interface PublicLayoutShellProps {
  children: React.ReactNode;
  footerSocials: FooterSocial[];
}

export function PublicLayoutShell({ children, footerSocials }: PublicLayoutShellProps) {
  const pathname = usePathname();
  const isProjectDetail = pathname?.startsWith("/projects/");

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!isProjectDetail && <ScrollToTop />}
      {!isProjectDetail && <Footer socials={footerSocials} />}
    </>
  );
}