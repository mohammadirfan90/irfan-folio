"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 1. PROFILE MUTATION
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const full_name = formData.get("full_name") as string;
  const title = formData.get("title") as string;
  const bio_description = formData.get("bio_description") as string;
  const location = formData.get("location") as string;
  const focus_area = formData.get("focus_area") as string;
  const avatar_url = formData.get("avatar_url") as string || null;
  const resume_url = formData.get("resume_url") as string || null;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name,
    title,
    bio_description,
    location,
    focus_area,
    avatar_url,
    resume_url,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

// 2. SKILL MUTATIONS
export async function upsertSkill(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string || undefined;
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const custom_logo_url = formData.get("custom_logo_url") as string || null;
  const display_order = parseInt(formData.get("display_order") as string || "0");

  const payload: any = {
    name,
    category,
    custom_logo_url,
    display_order,
  };
  if (id) payload.id = id;

  const { error } = await supabase.from("skills").upsert(payload);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

// 3. EXPERIENCE MUTATIONS
export async function upsertExperience(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string || undefined;
  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const display_order = parseInt(formData.get("display_order") as string || "0");

  const payload: any = {
    role,
    company,
    duration,
    description,
    display_order,
  };
  if (id) payload.id = id;

  const { error } = await supabase.from("experiences").upsert(payload);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

// 4. EDUCATION MUTATIONS
export async function upsertEducation(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string || undefined;
  const degree = formData.get("degree") as string;
  const school = formData.get("school") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string || null;
  const display_order = parseInt(formData.get("display_order") as string || "0");

  const payload: any = {
    degree,
    school,
    duration,
    description,
    display_order,
  };
  if (id) payload.id = id;

  const { error } = await supabase.from("education").upsert(payload);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function deleteEducation(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

// 5. PROJECT MUTATIONS
export async function upsertProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string || undefined;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const summary = formData.get("summary") as string;
  const description = formData.get("description") as string || null;

  console.log("--- UPSERT PROJECT IN SERVER ACTION ---");
  console.log("ID:", id);
  console.log("Title:", title);
  console.log("Slug:", slug);
  console.log("Thumbnail URL from Form:", formData.get("thumbnail_url"));
  console.log("Gallery URLs from Form:", formData.get("gallery_urls"));

  const category = formData.get("category") as string;
  const technologiesRaw = formData.get("technologies") as string;
  const github_url = formData.get("github_url") as string || null;
  const live_url = formData.get("live_url") as string || null;
  const challenges = formData.get("challenges") as string || null;
  const future_plans = formData.get("future_plans") as string || null;
  const featured = formData.get("featured") === "true";
  const published = formData.get("published") === "true";
  const thumbnail_url = formData.get("thumbnail_url") as string || null;

  const role = formData.get("role") as string || null;
  const team_size = formData.get("team_size") as string || null;
  const duration = formData.get("duration") as string || null;
  const status = formData.get("status") as string || null;
  const metrics = formData.get("metrics") as string || null;
  const architecture_preview = formData.get("architecture_preview") as string || null;
  const lessons_learned = formData.get("lessons_learned") as string || null;
  const key_features = formData.get("key_features") as string || null;

  const galleryUrlsRaw = formData.get("gallery_urls") as string;
  const galleryUrls: string[] = galleryUrlsRaw ? JSON.parse(galleryUrlsRaw) : [];

  const technologies = technologiesRaw
    ? technologiesRaw.split(",").map((tech) => tech.trim()).filter(Boolean)
    : [];

  const payload: any = {
    title,
    slug,
    summary,
    description,
    category,
    technologies,
    github_url,
    live_url,
    challenges,
    future_plans,
    featured,
    published,
    thumbnail_url,
    role,
    team_size,
    duration,
    status,
    metrics,
    architecture_preview,
    lessons_learned,
    key_features,
    updated_at: new Date().toISOString(),
  };
  if (id) payload.id = id;

  const { data, error } = await supabase
    .from("projects")
    .upsert(payload)
    .select("id")
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return { error: "Failed to retrieve project ID after save." };

  const projectId = data.id;

  // Sync screenshot gallery images
  const { error: deleteError } = await supabase.from("project_images").delete().eq("project_id", projectId);
  if (deleteError) {
    console.error("Error deleting project images:", deleteError);
    return { error: `Failed to sync screenshots: ${deleteError.message}` };
  }

  if (galleryUrls.length > 0) {
    const imageRows = galleryUrls.map((url, index) => ({
      project_id: projectId,
      image_url: url,
      display_order: index,
    }));
    const { error: imgError } = await supabase.from("project_images").insert(imageRows);
    if (imgError) {
      console.error("Error inserting project images:", imgError);
      return { error: `Failed to save screenshots: ${imgError.message}` };
    }
  }

  revalidatePath("/");
  revalidatePath(`/projects/${slug}`);
  return { success: true };
}

export async function deleteProject(id: string, slug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath(`/projects/${slug}`);
  return { success: true };
}

// 6. SITE SETTINGS MUTATION
export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  let id = formData.get("id") as string || undefined;
  const is_available_for_hire = formData.get("is_available_for_hire") === "true";
  const availability_message = formData.get("availability_message") as string;
  const contact_email = formData.get("contact_email") as string;

  if (!id || id === "") {
    // Look up the first existing site settings row to avoid duplicates
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      id = existing.id;
    }
  }

  const payload: any = {
    is_available_for_hire,
    availability_message,
    contact_email,
    updated_at: new Date().toISOString(),
  };
  if (id && id !== "") payload.id = id;

  const { error } = await supabase.from("site_settings").upsert(payload);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

// 7. ASSET UPLOAD WITH CLOUDINARY & SUPABASE FALLBACK
export async function uploadAssetAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const folder = formData.get("folder") as string || "portfolio";

  if (!file) {
    return { error: "No file provided" };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { 
      error: "Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured in your .env.local file." 
    };
  }

  try {
    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message} (HTTP ${error.http_code || 403})`));
          } else {
            resolve(result?.secure_url || "");
          }
        }
      ).end(buffer);
    });

    return { publicUrl };
  } catch (err: any) {
    console.error("Cloudinary upload failed:", err);
    return { error: err.message || "Failed to upload asset to Cloudinary." };
  }
}
