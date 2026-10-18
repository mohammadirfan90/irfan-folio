"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { revalidatePath } from "next/cache";

const NAME_MIN = 1;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const SUBJECT_MIN = 1;
const SUBJECT_MAX = 150;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
// Minimum time the form must be visible before submitting, in milliseconds.
const MIN_RENDER_MS = 3000;

// Conservative email regex; the canonical check is performed by the browser
// and the check constraints on the contact_messages table. This is good
// enough to reject obvious garbage.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimOrEmpty(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

export async function submitContactFormAction(formData: FormData) {
  const name = truncate(trimOrEmpty(formData.get("name")), NAME_MAX);
  const email = truncate(trimOrEmpty(formData.get("email")), EMAIL_MAX).toLowerCase();
  const subject = truncate(trimOrEmpty(formData.get("subject")), SUBJECT_MAX);
  const message = truncate(trimOrEmpty(formData.get("message")), MESSAGE_MAX);

  // Honeypot: if the hidden "website" field is filled in, treat the submission
  // as bot traffic. Return success without saving so bots don't retry.
  const honeypot = trimOrEmpty(formData.get("website"));
  if (honeypot) {
    return { success: true };
  }

  // Minimum-time check: humans need a moment to read and fill the form.
  const renderedAtRaw = trimOrEmpty(formData.get("rendered_at"));
  if (renderedAtRaw) {
    const renderedAt = Number(renderedAtRaw);
    if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_RENDER_MS) {
      return { error: "Please take a moment to fill out the form before sending." };
    }
  }

  if (name.length < NAME_MIN) {
    return { error: "Please enter your name." };
  }
  if (email.length === 0 || !EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (subject.length < SUBJECT_MIN) {
    return { error: "Please add a short subject." };
  }
  if (message.length < MESSAGE_MIN) {
    return { error: `Your message should be at least ${MESSAGE_MIN} characters.` };
  }
  if (message.length > MESSAGE_MAX) {
    return { error: `Your message must be at most ${MESSAGE_MAX} characters.` };
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
      console.error("Contact form insert failed:", error);
      return { error: "Could not send your message. Please try again later." };
    }

    return { success: true };
  } catch (err) {
    console.error("Contact form unexpected error:", err);
    return { error: "Could not send your message. Please try again later." };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete message failed:", error);
      return { error: "Could not delete the message. Please try again." };
    }

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    console.error("Delete message unexpected error:", err);
    return { error: "Could not delete the message. Please try again." };
  }
}
