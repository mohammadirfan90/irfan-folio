-- CREATE EXTENSIONS (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked 1:1 with Auth Users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio_description TEXT NOT NULL,
    avatar_url TEXT,
    location TEXT NOT NULL,
    focus_area TEXT NOT NULL,
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated update to profiles" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow authenticated insert to profiles" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. PROJECTS TABLE
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    github_url TEXT,
    live_url TEXT,
    challenges TEXT,
    future_plans TEXT,
    featured BOOLEAN DEFAULT false NOT NULL,
    published BOOLEAN DEFAULT false NOT NULL,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects Policies
CREATE POLICY "Allow public read access to published projects" ON public.projects
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated write access to projects" ON public.projects
    FOR ALL USING (auth.role() = 'authenticated');

-- 3. PROJECT IMAGES TABLE
CREATE TABLE public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Project Images
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Project Images Policies
CREATE POLICY "Allow public read access to project images" ON public.project_images
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access to project images" ON public.project_images
    FOR ALL USING (auth.role() = 'authenticated');

-- 4. SKILLS TABLE
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. "Frontend", "Backend", "Design", "DevOps"
    custom_logo_url TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Skills
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Skills Policies
CREATE POLICY "Allow public read access to skills" ON public.skills
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access to skills" ON public.skills
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. EXPERIENCES TABLE
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    duration TEXT NOT NULL, -- e.g. "2022 — PRES"
    description TEXT NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Experiences
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Experiences Policies
CREATE POLICY "Allow public read access to experiences" ON public.experiences
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access to experiences" ON public.experiences
    FOR ALL USING (auth.role() = 'authenticated');

-- 6. EDUCATION TABLE
CREATE TABLE public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    school TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Education
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Education Policies
CREATE POLICY "Allow public read access to education" ON public.education
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access to education" ON public.education
    FOR ALL USING (auth.role() = 'authenticated');

-- 7. SOCIAL LINKS TABLE
CREATE TABLE public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL, -- e.g. "GitHub", "LinkedIn"
    url TEXT NOT NULL,
    icon_name TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Social Links
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Social Links Policies
CREATE POLICY "Allow public read access to social links" ON public.social_links
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access to social links" ON public.social_links
    FOR ALL USING (auth.role() = 'authenticated');

-- 8. SITE SETTINGS TABLE (Single record for global settings)
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_available_for_hire BOOLEAN DEFAULT true NOT NULL,
    availability_message TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Site Settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Site Settings Policies
CREATE POLICY "Allow public read access to site settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access to site settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');


-- AUTOMATIC PROFILE CREATION TRIGGER
-- When a user registers in auth.users, automatically create an empty profile.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, title, bio_description, location, focus_area)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', 'Software Engineer'),
        'Full-stack Developer',
        'Architecting robust digital experiences with a focus on technical precision and editorial-grade user interfaces.',
        'San Francisco, CA (Remote)',
        'Scalable Systems & UI/UX'
    );
    
    INSERT INTO public.site_settings (is_available_for_hire, availability_message, contact_email)
    VALUES (
        true,
        'Available for new opportunities',
        new.email
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- STORAGE BUCKETS SETUP
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage.objects
CREATE POLICY "Allow public read access to portfolio assets"
    ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Allow authenticated insert to portfolio assets"
    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated manage to portfolio assets"
    ON storage.objects FOR ALL USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');

