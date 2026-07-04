"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project, ContactMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plus, 
  ExternalLink, 
  TrendingUp,
  Inbox,
  ArrowRight,
  Code,
  FileText,
  Trash2,
  Edit3
} from "lucide-react";
import { deleteProject } from "@/actions/admin";

interface DashboardOverviewProps {
  initialProjects: Project[];
  stats: {
    projectsCount: number;
    skillsCount: number;
    experiencesCount: number;
    messagesCount: number;
  };
  recentMessages: ContactMessage[];
}

export function DashboardOverview({ initialProjects, stats, recentMessages }: DashboardOverviewProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleDelete = async (e: React.MouseEvent, id: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsDeletingId(id);
    try {
      const res = await deleteProject(id, slug);
      if (res?.error) {
        alert(`Error: ${res.error}`);
      } else {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to delete project."}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  // Limits for progress bars
  const projectLimit = 10;
  const messageLimit = 100;
  const skillLimit = 50;
  const experienceLimit = 15;

  return (
    <div className="space-y-6">
      
      {/* 1. Page Header */}
      <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4 select-none">
        <div>
          <span className="text-sm text-neutral-500 font-bold uppercase tracking-widest block mb-1">
            Overview
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/projects?action=new">
            <Button size="sm" className="h-9 text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer">
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Main Dashboard Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Vercel Usage & Alerts Metrics (Col span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* USAGE PANEL */}
          <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex justify-between items-center select-none">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Usage
              </h3>
              <span className="text-sm text-neutral-400 font-medium">
                Current Scope
              </span>
            </div>

            <div className="space-y-4">
              {/* Projects Metric */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-medium text-neutral-600">
                  <span className="flex items-center gap-1.5"><Code className="w-4 h-4 text-neutral-400" /> Projects</span>
                  <span className="font-semibold text-neutral-900">{stats.projectsCount} / {projectLimit}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((stats.projectsCount / projectLimit) * 100, 100)}%` }} 
                  />
                </div>
              </div>

              {/* Messages Metric */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-medium text-neutral-600">
                  <span className="flex items-center gap-1.5"><Inbox className="w-4 h-4 text-neutral-400" /> Messages</span>
                  <span className="font-semibold text-neutral-900">{stats.messagesCount} / {messageLimit}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((stats.messagesCount / messageLimit) * 100, 100)}%` }} 
                  />
                </div>
              </div>

              {/* Skills Metric */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-medium text-neutral-600">
                  <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-neutral-400" /> Skills</span>
                  <span className="font-semibold text-neutral-900">{stats.skillsCount} / {skillLimit}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((stats.skillsCount / skillLimit) * 100, 100)}%` }} 
                  />
                </div>
              </div>

              {/* Experience Metric */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-medium text-neutral-600">
                  <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-neutral-400" /> Experiences</span>
                  <span className="font-semibold text-neutral-900">{stats.experiencesCount} / {experienceLimit}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((stats.experiencesCount / experienceLimit) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full h-9 text-sm font-semibold border-neutral-200 hover:bg-neutral-50 transition-colors select-none mt-2 cursor-pointer">
              Upgrade Account
            </Button>
          </div>

          {/* ALERTS / INBOX CARD */}
          <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex justify-between items-center select-none">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Recent Alerts
              </h3>
              {stats.messagesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </div>

            {recentMessages.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-neutral-500 leading-relaxed">
                  You have <span className="font-semibold text-neutral-800">{stats.messagesCount} total messages</span> in your inbox. Below is the latest contact:
                </p>
                <div className="p-3.5 bg-neutral-50 border border-neutral-200/50 rounded-lg space-y-1.5">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span className="font-semibold text-neutral-700">{recentMessages[0].name}</span>
                    <span>{new Date(recentMessages[0].created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-900 truncate">
                    {recentMessages[0].subject}
                  </h4>
                  <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                    {recentMessages[0].message}
                  </p>
                </div>
                <Link href="/admin/messages" className="block">
                  <Button variant="ghost" className="w-full h-9 justify-between text-sm font-semibold hover:bg-neutral-50 px-2 cursor-pointer">
                    <span>Open Inbox</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-neutral-500 text-center py-4 select-none">
                No recent inbox activity. All systems green.
              </p>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Vercel Interactive Projects Grid (Col span 8) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* SEARCH BAR PANEL */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search case study projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-neutral-200/80 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all h-9.5 placeholder:text-neutral-400"
            />
          </div>

          {/* PROJECTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                const isDraft = !project.published;
                return (
                  <div 
                    key={project.id}
                    className="bg-white border border-neutral-200/60 rounded-xl p-4 md:p-5 shadow-2xs hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between min-h-[180px] h-auto group relative"
                  >
                    <div>
                      {/* Top Row: initials logo + title + status */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-700 shrink-0 select-none">
                            {project.title.substring(0, 2).toUpperCase()}
                          </div>
                          <h4 className="text-sm font-bold text-neutral-900 truncate leading-tight">
                            {project.title}
                          </h4>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-1.5 shrink-0 select-none">
                          <span className={`w-1.5 h-1.5 rounded-full ${isDraft ? "bg-neutral-300" : "bg-emerald-500"}`} />
                          <span className="text-sm font-semibold text-neutral-400 uppercase">
                            {isDraft ? "Draft" : "Active"}
                          </span>
                        </div>
                      </div>

                      {/* Live site link */}
                      {project.live_url ? (
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-2.5 font-medium leading-none"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="truncate max-w-[200px]">{project.live_url.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                        </a>
                      ) : (
                        <span className="text-sm text-neutral-400 block mb-2.5 leading-none select-none">No live URL</span>
                      )}

                      {/* Description / Summary */}
                      <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mt-1">
                        {project.summary}
                      </p>
                    </div>

                    {/* Bottom row: Git repo badge + action controls */}
                    <div className="flex justify-between items-center border-t border-neutral-200/50 pt-3 mt-3 flex-shrink-0">
                      {project.github_url ? (
                        <a 
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/60 rounded-md py-0.5 px-2.5 transition-all font-medium leading-tight max-w-[65%]"
                        >
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                          <span className="truncate">{project.github_url.replace(/^(https?:\/\/)?(www\.)?github\.com\//, "")}</span>
                        </a>
                      ) : (
                        <span className="text-sm text-neutral-400 select-none">Local-only</span>
                      )}

                      {/* Card actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/projects?edit=${project.id}`}>
                          <button
                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={(e) => handleDelete(e, project.id, project.slug)}
                          disabled={isDeletingId === project.id}
                          className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="col-span-2 border border-dashed border-neutral-200 rounded-xl p-12 text-center bg-white text-neutral-400">
                <span className="text-sm select-none">No projects match your search query.</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
