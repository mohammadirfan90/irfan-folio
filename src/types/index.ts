export interface Profile {
  id: string;
  full_name: string;
  title: string;
  bio_description: string;
  avatar_url?: string;
  location: string;
  focus_area: string;
  resume_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  category: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  challenges?: string;
  future_plans?: string;
  featured: boolean;
  published: boolean;
  thumbnail_url?: string;
  role?: string;
  team_size?: string;
  duration?: string;
  status?: string;
  metrics?: string;
  architecture_preview?: string;
  lessons_learned?: string;
  key_features?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string; // e.g. Frontend, Backend, Design
  custom_logo_url?: string;
  display_order: number;
  created_at?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string; // e.g. "2022 — PRES"
  description: string;
  display_order: number;
  created_at?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  description?: string;
  display_order: number;
  created_at?: string;
}

export interface SocialLink {
  id: string;
  platform: string; // e.g. "GitHub", "LinkedIn", "Twitter"
  url: string;
  icon_name?: string;
  display_order: number;
  created_at?: string;
}

export interface SiteSettings {
  id: string;
  is_available_for_hire: boolean;
  availability_message: string;
  contact_email: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}
