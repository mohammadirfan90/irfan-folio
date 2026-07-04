import { createClient } from "./client";

/**
 * Uploads a file to a Supabase Storage bucket and returns the public URL.
 * Requires the bucket to be set to public.
 *
 * @param file The file to upload (from file input)
 * @param path The filepath destination in the bucket (e.g. "projects/thumbnail.png")
 * @param bucket The bucket name (default is "portfolio-assets")
 */
export async function uploadAsset(
  file: File,
  path: string,
  bucket = "portfolio-assets"
): Promise<string> {
  const supabase = createClient();

  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
