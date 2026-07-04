-- Alter projects table to add new columns for detailed metrics, case studies metadata, and key learnings
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS role TEXT,
ADD COLUMN IF NOT EXISTS team_size TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS status TEXT,
ADD COLUMN IF NOT EXISTS metrics TEXT,
ADD COLUMN IF NOT EXISTS architecture_preview TEXT,
ADD COLUMN IF NOT EXISTS lessons_learned TEXT,
ADD COLUMN IF NOT EXISTS key_features TEXT;
