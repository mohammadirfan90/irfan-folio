import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Project, LocalProject, AdjacentProject } from "@/types";
import { createClient } from "@/lib/supabase/client";
import type { Metadata } from "next";
import { ProjectDetailView } from "@/components/portfolio/ProjectDetailView";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<LocalProject | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!data) {
    return null;
  }

  const typedData = data as Project;

  // Fetch screenshots from database
  const { data: images } = await supabase
    .from("project_images")
    .select("image_url")
    .eq("project_id", typedData.id)
    .order("display_order", { ascending: true });

  const screenshots = images && images.length > 0
    ? images.map((img) => img.image_url)
    : [typedData.thumbnail_url].filter(Boolean) as string[];

  // Map database row to LocalProject. Empty / missing fields are left empty
  // so the UI can choose not to render them.
  return {
    id: typedData.id,
    title: typedData.title,
    slug: typedData.slug,
    summary: typedData.summary,
    description: typedData.description || "",
    category: typedData.category,
    technologies: typedData.technologies,
    github_url: typedData.github_url,
    live_url: typedData.live_url,
    challenges: typedData.challenges,
    future_plans: typedData.future_plans,
    featured: typedData.featured,
    published: typedData.published,
    thumbnail_url: typedData.thumbnail_url,
    role: typedData.role || "",
    team_size: typedData.team_size || "",
    duration: typedData.duration || "",
    status: typedData.status || "",
    metrics: typedData.metrics || "",
    architecture_preview: typedData.architecture_preview || "",
    lessons_learned: typedData.lessons_learned || "",
    key_features: typedData.key_features || "",
    architecture: typedData.architecture_preview || "",
    screenshots,
  };
}

async function getAdjacentProjects(currentSlug: string): Promise<{ prev: AdjacentProject | null; next: AdjacentProject | null }> {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("title, slug, summary, category, thumbnail_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const projects = (data || []) as AdjacentProject[];

  if (projects.length === 0 || projects.length === 1) {
    return { prev: null, next: null };
  }

  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) {
    return { prev: null, next: null };
  }

  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("slug")
    .eq("published", true);

  if (!projects) {
    return [];
  }

  return projects
    .filter((p): p is { slug: string } => typeof p.slug === "string" && p.slug.length > 0)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.summary,
      type: "article",
      images: [
        {
          url: project.thumbnail_url || "",
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.summary,
      images: [project.thumbnail_url || ""],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { prev: prevProject, next: nextProject } = await getAdjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.summary,
    "image": project.thumbnail_url || "",
    "creator": {
      "@type": "Person",
      "name": "Mohammad Irfan",
    },
    "programmingLanguage": project.technologies,
  };

  return (
    <article className="min-h-screen pt-24 pb-20 bg-surface text-on-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex-shrink-0">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-label-mono text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>~/back-to-portfolio</span>
          </Link>
        </div>

        {/* Redesigned Project Detail View */}
        <ProjectDetailView
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </div>
    </article>
  );
}