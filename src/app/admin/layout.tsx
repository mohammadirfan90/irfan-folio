"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { 
  LayoutDashboard, 
  Inbox, 
  FolderGit2, 
  Briefcase, 
  Code2, 
  User, 
  LogOut,
  ChevronsUpDown
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Inbox", href: "/admin/messages", icon: Inbox },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Skills", href: "/admin/skills", icon: Code2 },
    { label: "Profile", href: "/admin/about", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-[#fbfbfb] text-neutral-900 font-sans antialiased">
      {/* Vercel-style Admin Sidebar */}
      <aside className="w-60 border-r border-neutral-200/80 bg-[#fafafa] flex flex-col justify-between h-screen sticky top-0 flex-shrink-0">
        <div>
          {/* User scope selector header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-neutral-200/60 select-none">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                MI
              </div>
              <div className="min-w-0">
                <span className="text-sm font-semibold text-neutral-900 block truncate leading-tight">
                  Mohammad Irfan
                </span>
                <span className="text-[10px] text-neutral-500 font-medium bg-neutral-200/60 px-1.5 py-0.5 rounded-full uppercase tracking-wider block w-fit mt-0.5 leading-none">
                  Hobby
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-neutral-400 shrink-0 cursor-pointer hover:text-neutral-600 transition-colors" />
          </div>

          {/* Links list */}
          <nav className="p-3 space-y-1">
            {sidebarLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    active
                      ? "text-neutral-900 bg-neutral-200/50 font-semibold shadow-xs"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-900"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom sign out */}
        <div className="p-3 border-t border-neutral-200/60">
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-red-50 text-neutral-600 hover:text-red-600 border border-neutral-200 hover:border-red-200 rounded-md text-sm font-semibold cursor-pointer transition-all active:scale-[0.98]"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Content pane */}
      <main className="flex-grow p-8 md:p-10 overflow-y-auto w-full max-w-6xl">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
