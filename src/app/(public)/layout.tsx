"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProjectDetail = pathname?.startsWith("/projects/");

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!isProjectDetail && <Footer />}
    </>
  );
}

