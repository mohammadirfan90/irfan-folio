-- 1. Add custom_logo_url column to skills table
ALTER TABLE public.skills 
ADD COLUMN IF NOT EXISTS custom_logo_url TEXT;

-- 2. Drop proficiency_percentage column from skills table
ALTER TABLE public.skills 
DROP COLUMN IF EXISTS proficiency_percentage;
