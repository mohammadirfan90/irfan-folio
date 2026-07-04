"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { upsertProject, deleteProject } from "@/actions/admin";
import { MediaUploader } from "./MediaUploader";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  ArrowLeft,
  Globe,
  Code,
  FileText
} from "lucide-react";

interface ProjectsManagerProps {
  initialProjects: Project[];
}

function ProjectsManagerContent({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle URL query parameters for edit/new project
  useEffect(() => {
    const editId = searchParams.get("edit");
    const action = searchParams.get("action");

    if (editId) {
      const proj = projects.find((p) => p.id === editId);
      if (proj) {
        setEditingProject(proj);
        setThumbnailUrl(proj.thumbnail_url || "");
        fetchProjectImages(proj.id);
      }
    } else if (action === "new") {
      setEditingProject({
        title: "",
        summary: "",
        description: "",
        category: "AI / PLATFORM",
        technologies: [],
        github_url: "",
        live_url: "",
        featured: false,
        published: false,
        thumbnail_url: "",
      });
      setThumbnailUrl("");
      setGalleryUrls([]);
      setMsg("");
    } else {
      setEditingProject(null);
    }
  }, [searchParams, projects]);

  const fetchProjectImages = async (projectId: string) => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("project_images")
        .select("image_url")
        .eq("project_id", projectId)
        .order("display_order", { ascending: true });
      if (data) {
        setGalleryUrls(data.map((img) => img.image_url));
      }
    } catch (err) {
      console.error("Failed to load project images:", err);
    }
  };

  const handleEditClick = (project: Project) => {
    window.history.pushState(null, "", `/admin/projects?edit=${project.id}`);
    setEditingProject(project);
    setThumbnailUrl(project.thumbnail_url || "");
    setGalleryUrls([]);
    setMsg("");
    fetchProjectImages(project.id);
  };

  const handleAddNewClick = () => {
    window.history.pushState(null, "", "/admin/projects?action=new");
    setEditingProject({
      title: "",
      summary: "",
      description: "",
      category: "AI / PLATFORM",
      technologies: [],
      github_url: "",
      live_url: "",
      featured: false,
      published: false,
      thumbnail_url: "",
    });
    setThumbnailUrl("");
    setGalleryUrls([]);
    setMsg("");
  };

  const handleCancelClick = () => {
    window.history.pushState(null, "", "/admin/projects");
    setEditingProject(null);
    setMsg("");
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg("");

    const formData = new FormData(e.currentTarget);
    if (editingProject?.id) {
      formData.append("id", editingProject.id);
    }
    formData.append("thumbnail_url", thumbnailUrl);
    formData.append("gallery_urls", JSON.stringify(galleryUrls));

    // Auto-generate slug from title if not already present on editingProject
    const title = formData.get("title") as string;
    const slug = editingProject?.slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "");
    formData.append("slug", slug);

    try {
      const res = await upsertProject(formData);
      if (res?.error) {
        setMsg(`Error: ${res.error}`);
      } else {
        setMsg("Project saved successfully.");
        window.history.pushState(null, "", "/admin/projects");
        window.location.reload();
      }
    } catch (err: any) {
      setMsg(`Error: ${err.message || "Failed to save."}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsDeletingId(id);
    try {
      const res = await deleteProject(id, slug);
      if (res?.error) {
        alert(`Error: ${res.error}`);
      } else {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to delete."}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      
      {/* 1. Page Header */}
      {!editingProject ? (
        <div className="flex justify-end items-center border-b border-neutral-200/60 pb-4 select-none">
          <Button 
            onClick={handleAddNewClick} 
            size="sm" 
            className="h-9 text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Project
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-neutral-200/60 pb-4 select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancelClick}
              className="p-1.5 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500 transition-colors cursor-pointer"
              title="Back to Projects"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-sm text-neutral-500 font-bold uppercase tracking-widest block mb-0.5">
                Editor Mode
              </span>
              <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                {editingProject.id ? `Edit Project: ${editingProject.title}` : "Create New Project"}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* 2. Toggleable UI View (Grid vs Editor) */}
      {!editingProject ? (
        
        /* GRID LIST VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Right panel: Grid list (Col span 12) */}
          <div className="lg:col-span-12 space-y-5">
            {/* Search filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-neutral-200/80 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all h-9.5 placeholder:text-neutral-400"
              />
            </div>

            {/* Project cards grid */}
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
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-700 shrink-0 select-none">
                              {project.title.substring(0, 2).toUpperCase()}
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 truncate leading-tight">
                              {project.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 select-none">
                            <span className={`w-1.5 h-1.5 rounded-full ${isDraft ? "bg-neutral-300" : "bg-emerald-500"}`} />
                            <span className="text-sm font-semibold text-neutral-400 uppercase">
                              {isDraft ? "Draft" : "Active"}
                            </span>
                          </div>
                        </div>

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

                        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed mt-1">
                          {project.summary}
                        </p>
                      </div>

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

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditClick(project)}
                            className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id, project.slug)}
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

      ) : (
        
        /* FORM COMPACT EDITOR VIEW */
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Card 1: General Info */}
            <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-base font-semibold text-neutral-900 uppercase tracking-wider select-none border-b border-neutral-100 pb-2">
                1. General Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingProject.title || ""}
                  required
                  placeholder="e.g. Skilltern"
                  className="h-9.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Category Tag
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingProject.category || ""}
                    required
                    placeholder="e.g. AI / PLATFORM"
                    className="h-9.5 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Technologies (Comma Separated)
                  </Label>
                  <Input
                    id="technologies"
                    name="technologies"
                    defaultValue={editingProject.technologies?.join(", ") || ""}
                    required
                    placeholder="e.g. React, Next.js, FastAPI"
                    className="h-9.5 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Summary Header
                </Label>
                <Input
                  id="summary"
                  name="summary"
                  defaultValue={editingProject.summary || ""}
                  required
                  placeholder="e.g. AI-driven internship matchmaking platform..."
                  className="h-9.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Description / Overview
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={editingProject.description || ""}
                  placeholder="Briefly explain the project concept..."
                  className="text-sm min-h-[90px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-100">
                <div className="space-y-2">
                  <Label htmlFor="featured" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Featured Status
                  </Label>
                  <select
                    id="featured"
                    name="featured"
                    defaultValue={editingProject.featured ? "true" : "false"}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-md text-sm focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all h-9.5 font-medium"
                  >
                    <option value="false">Standard Case Study</option>
                    <option value="true">Featured Showcase (Homepage)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="published" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Publishing Status
                  </Label>
                  <select
                    id="published"
                    name="published"
                    defaultValue={editingProject.published ? "true" : "false"}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-md text-sm focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all h-9.5 font-medium"
                  >
                    <option value="false">Draft (Hidden from public)</option>
                    <option value="true">Published (Live to public)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card 2: Project Metadata */}
            <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-base font-semibold text-neutral-900 uppercase tracking-wider select-none border-b border-neutral-100 pb-2">
                2. Project Metadata
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Your Role
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    defaultValue={editingProject.role || ""}
                    placeholder="e.g. Lead Full-stack Developer"
                    className="h-9.5 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team_size" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Team Size
                  </Label>
                  <Input
                    id="team_size"
                    name="team_size"
                    defaultValue={editingProject.team_size || ""}
                    placeholder="e.g. 4 Members"
                    className="h-9.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Duration / Timeline
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    defaultValue={editingProject.duration || ""}
                    placeholder="e.g. 3 Months"
                    className="h-9.5 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Project Status
                  </Label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={editingProject.status || "Completed"}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-md text-sm focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all h-9.5 font-medium"
                  >
                    <option value="Production">Production</option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card 3: Detailed Case Study Info */}
            <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-base font-semibold text-neutral-900 uppercase tracking-wider select-none border-b border-neutral-100 pb-2">
                3. Technical Case Study Details
              </h3>

              <div className="space-y-2">
                <Label htmlFor="key_features" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Key Features (One Per Line - Max 3 recommended)
                </Label>
                <Textarea
                  id="key_features"
                  name="key_features"
                  rows={3}
                  defaultValue={editingProject.key_features || ""}
                  placeholder="e.g. - AI semantic candidate matching&#10;- Authenticated GitHub API pipeline"
                  className="text-sm min-h-[70px]"
                />
              </div>



              <div className="space-y-2">
                <Label htmlFor="lessons_learned" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Lessons Learned (One Per Line)
                </Label>
                <Textarea
                  id="lessons_learned"
                  name="lessons_learned"
                  rows={3}
                  defaultValue={editingProject.lessons_learned || ""}
                  placeholder="e.g. Cosine similarity calculations require vector indices."
                  className="text-sm min-h-[70px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metrics" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Quick Scale Metrics (One Per Line)
                  </Label>
                  <Textarea
                    id="metrics"
                    name="metrics"
                    rows={2}
                    defaultValue={editingProject.metrics || ""}
                    placeholder="e.g. 2000+ Active Users&#10;10s Response Rate"
                    className="text-sm min-h-[60px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="architecture_preview" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Architecture Flow (Text Format)
                  </Label>
                  <Textarea
                    id="architecture_preview"
                    name="architecture_preview"
                    rows={2}
                    defaultValue={editingProject.architecture_preview || ""}
                    placeholder="e.g. Next.js ➡️ FastAPI ➡️ pgvector DB"
                    className="text-sm min-h-[60px]"
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Links & Gallery */}
            <div className="bg-white border border-neutral-200/60 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-base font-semibold text-neutral-900 uppercase tracking-wider select-none border-b border-neutral-100 pb-2">
                4. Links &amp; Project Media
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github_url" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    GitHub Code Repository URL
                  </Label>
                  <Input
                    id="github_url"
                    name="github_url"
                    defaultValue={editingProject.github_url || ""}
                    placeholder="https://github.com/..."
                    className="h-9.5 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="live_url" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Live Demo / Site URL
                  </Label>
                  <Input
                    id="live_url"
                    name="live_url"
                    defaultValue={editingProject.live_url || ""}
                    placeholder="https://example.com"
                    className="h-9.5 text-sm"
                  />
                </div>
              </div>

              {/* Thumbnail screenshot uploader */}
              <div className="pt-2 border-t border-neutral-100">
                <MediaUploader
                  label="Project Mockup / Main Thumbnail Screenshot"
                  destinationPath="projects"
                  currentUrl={thumbnailUrl}
                  onUploadSuccess={setThumbnailUrl}
                />
              </div>

              {/* Screenshot gallery uploader */}
              <div className="space-y-3 pt-3 border-t border-neutral-100">
                <Label className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">
                  Screenshots Gallery Slides
                </Label>
                
                {galleryUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {galleryUrls.map((url, index) => (
                      <div key={index} className="relative group/img rounded-lg overflow-hidden border border-neutral-200 aspect-[16/10] bg-neutral-50 animate-fade-in">
                        <img src={url} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setGalleryUrls(prev => prev.filter((_, i) => i !== index))}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                          aria-label="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <MediaUploader
                  key={galleryUrls.length}
                  label="Add Screenshot Slide to Gallery"
                  destinationPath="projects"
                  onUploadSuccess={(url) => setGalleryUrls((prev) => [...prev, url])}
                />
              </div>
            </div>

            {/* Error or Success Msg */}
            {msg && (
              <div className="p-3.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700">
                {msg}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                size="sm"
                className="h-9 px-4 text-sm bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
              >
                {isSaving ? "Saving changes..." : "Save Project"}
              </Button>
              <Button
                type="button"
                onClick={handleCancelClick}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm border-neutral-200 cursor-pointer"
              >
                Cancel
              </Button>
            </div>
            
          </form>
        </div>

      )}
    </div>
  );
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  return (
    <Suspense fallback={
      <div className="text-center py-12 text-sm text-neutral-400 select-none">
        Loading Projects Hub...
      </div>
    }>
      <ProjectsManagerContent initialProjects={initialProjects} />
    </Suspense>
  );
}
