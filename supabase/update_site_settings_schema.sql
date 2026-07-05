-- Add contact_phone and contact_whatsapp columns to site_settings table
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS contact_phone TEXT;

ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS contact_whatsapp TEXT;