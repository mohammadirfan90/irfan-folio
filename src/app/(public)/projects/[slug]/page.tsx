import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_PROJECTS, ExtendedProject } from "@/constants/projects";
import { Project } from "@/types";
import { createClient } from "@/lib/supabase/client";

import type { Metadata } from "next";

import { ProjectDetailView } from "@/components/portfolio/ProjectDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export interface LocalProject extends ExtendedProject {
  key_features?: string;
}

async function getProject(slug: string): Promise<LocalProject | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (data) {
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

      // Map database row to LocalProject
      return {
        id: typedData.id,
        title: typedData.title,
        slug: typedData.slug,
        summary: typedData.summary,
        description: typedData.description || "",
        key_features: typedData.key_features || "",
        category: typedData.category,
        technologies: typedData.technologies,
        github_url: typedData.github_url,
        live_url: typedData.live_url,
        challenges: typedData.challenges,
        future_plans: typedData.future_plans,
        featured: typedData.featured,
        published: typedData.published,
        thumbnail_url: typedData.thumbnail_url,
        role: typedData.role || MOCK_PROJECTS[slug]?.role || "Full-stack Developer",
        team_size: typedData.team_size || MOCK_PROJECTS[slug]?.team_size || "4 Members",
        duration: typedData.duration || MOCK_PROJECTS[slug]?.duration || "3 Months",
        status: typedData.status || MOCK_PROJECTS[slug]?.status || "Completed",
        metrics: typedData.metrics || MOCK_PROJECTS[slug]?.metrics || "",
        architecture_preview: typedData.architecture_preview || MOCK_PROJECTS[slug]?.architecture_preview || "",
        lessons_learned: typedData.lessons_learned || MOCK_PROJECTS[slug]?.lessons_learned || "",
        architecture: typedData.architecture_preview || MOCK_PROJECTS[slug]?.architecture || "",
        screenshots,
      };
    }
  } catch (err) {
    console.error("Error fetching project from Supabase:", err);
  }

  // Fallback to mock data if not in database
  const mock = MOCK_PROJECTS[slug];
  if (mock) {
    return {
      ...mock,
      key_features: mock.key_features || "",
      role: mock.role || "Full-stack Developer",
      team_size: mock.team_size || "4 Members",
      duration: mock.duration || "3 Months",
      status: mock.status || "Completed",
      metrics: mock.metrics || "",
      architecture_preview: mock.architecture_preview || "",
      lessons_learned: mock.lessons_learned || "",
    };
  }
  return null;
}

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = [];

  // Add mock project slugs
  Object.keys(MOCK_PROJECTS).forEach((slug) => {
    params.push({ slug });
  });

  try {
    // Add database project slugs using cookie-less client to prevent build errors
    const supabase = createClient();
    const { data: projects } = await supabase
      .from("projects")
      .select("slug")
      .eq("published", true);

    if (projects) {
      projects.forEach((p) => {
        if (p.slug && !MOCK_PROJECTS[p.slug]) {
          params.push({ slug: p.slug });
        }
      });
    }
  } catch (err) {
    console.warn("Could not fetch project slugs for generateStaticParams:", err);
  }

  return params;
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
    title: project.title,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.summary,
    "image": project.thumbnail_url || "",
    "creator": {
      "@type": "Person",
      "name": "Software Engineer",
    },
    "programmingLanguage": project.technologies,
  };

  return (
    <article className="min-h-screen pt-20 pb-10 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:pt-16 lg:pb-0 bg-surface text-on-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter lg:h-[calc(100vh-4rem)] lg:flex lg:flex-col lg:justify-between lg:py-4">
        {/* Navigation header */}
        <div className="mb-4 lg:mb-2 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-label-mono text-label-mono text-on-surface-variant hover:text-secondary transition-colors group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            Back to Portfolio
          </Link>
        </div>

        <div className="lg:flex-grow lg:min-h-0">
          <ProjectDetailView project={project} />
        </div>
      </div>
    </article>
  );
}
