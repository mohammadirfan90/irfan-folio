"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitContactFormAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
    });

    if (error) {
      return { error: `Database error: ${error.message}` };
    }

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to submit message." };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to delete message." };
  }
}
