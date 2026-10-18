-- ============================================================================
-- migration_admin_only.sql
--
-- Replaces "auth.role() = 'authenticated'" with a real admin check.
-- Before running this, all existing public write policies let ANY logged-in
-- Supabase user (including self-signups) edit or read everything. This file:
--   1. Creates a public.admins table (controlled by the owner).
--   2. Adds an is_admin() function usable from RLS policies.
--   3. Re-creates every admin-side policy to gate on is_admin().
--   4. Tightens contact_messages read/update/delete to admins only.
--   5. Tightens projects SELECT to "published OR admin".
--   6. Tightens storage.objects for the 'portfolio-assets' bucket to admins only.
--
-- This script is idempotent. It can be re-run safely.
-- It runs in a single transaction.
-- ============================================================================

BEGIN;

-- 1. admins table ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
    user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Each user can only see their own row (so a non-admin can't enumerate admins).
DROP POLICY IF EXISTS "Allow users to read their own admin row" ON public.admins;
CREATE POLICY "Allow users to read their own admin row"
    ON public.admins FOR SELECT
    USING (auth.uid() = user_id);

-- 2. is_admin() helper -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admins WHERE user_id = auth.uid()
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 3. Re-create policies on every table that used auth.role() = 'authenticated'

-- profiles -------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated update to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow authenticated insert to profiles" ON public.profiles;
CREATE POLICY "Allow admin update to profiles"
    ON public.profiles FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin insert to profiles"
    ON public.profiles FOR INSERT
    WITH CHECK (public.is_admin());

-- projects -------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access to published projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated write access to projects" ON public.projects;
CREATE POLICY "Allow public read of published projects or admin read of all"
    ON public.projects FOR SELECT
    USING (published = true OR public.is_admin());

CREATE POLICY "Allow admin write to projects"
    ON public.projects FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- project_images -------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated write access to project images" ON public.project_images;
CREATE POLICY "Allow admin write to project images"
    ON public.project_images FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- skills ---------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated write access to skills" ON public.skills;
CREATE POLICY "Allow admin write to skills"
    ON public.skills FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- experiences ----------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated write access to experiences" ON public.experiences;
CREATE POLICY "Allow admin write to experiences"
    ON public.experiences FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- education ------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated write access to education" ON public.education;
CREATE POLICY "Allow admin write to education"
    ON public.education FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- social_links ---------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated write access to social links" ON public.social_links;
CREATE POLICY "Allow admin write to social links"
    ON public.social_links FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- site_settings --------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated write access to site settings" ON public.site_settings;
CREATE POLICY "Allow admin write to site settings"
    ON public.site_settings FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- contact_messages -----------------------------------------------------------
-- The public INSERT policy (anonymous visitors can submit) stays. Read,
-- update and delete are admin-only.
DROP POLICY IF EXISTS "Allow authenticated read/write to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow admin read contact_messages"
    ON public.contact_messages FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Allow admin update contact_messages"
    ON public.contact_messages FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Allow admin delete contact_messages"
    ON public.contact_messages FOR DELETE
    USING (public.is_admin());

-- 4. Storage: portfolio-assets bucket ----------------------------------------
DROP POLICY IF EXISTS "Allow authenticated insert to portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated manage to portfolio assets" ON storage.objects;

-- Public read for the bucket is preserved.
CREATE POLICY "Allow admin insert to portfolio assets"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'portfolio-assets' AND public.is_admin());

CREATE POLICY "Allow admin update to portfolio assets"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'portfolio-assets' AND public.is_admin())
    WITH CHECK (bucket_id = 'portfolio-assets' AND public.is_admin());

CREATE POLICY "Allow admin delete to portfolio assets"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'portfolio-assets' AND public.is_admin());

COMMIT;

-- ============================================================================
-- Run this ONE line yourself in the Supabase SQL editor, replacing the email
-- with the Supabase login you actually use:
--
--   insert into public.admins(user_id)
--   select id from auth.users where email = '<YOUR ADMIN LOGIN EMAIL>';
-- ============================================================================
