import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.com";

  // Default routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  try {
    const supabase = createClient();
    const { data: projects } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("published", true);

    if (projects) {
      projects.forEach((project) => {
        routes.push({
          url: `${siteUrl}/projects/${project.slug}`,
          lastModified: new Date(project.updated_at || Date.now()),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.warn("Could not fetch projects for sitemap generation:", error);
  }

  return routes;
}
