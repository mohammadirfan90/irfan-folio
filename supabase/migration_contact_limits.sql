-- ============================================================================
-- migration_contact_limits.sql
--
-- Adds server-side guard rails to public.contact_messages:
--   1. CHECK constraints matching the lengths enforced by submitContactFormAction
--      in src/actions/contact.ts. The DB is the final source of truth, so any
--      write path (admin form, direct REST, future server actions) is bounded.
--   2. A BEFORE INSERT trigger that rejects a new row when the same email has
--      already submitted more than 3 messages in the last 10 minutes. This
--      prevents script-driven abuse without requiring an external rate limit
--      service.
--
-- The trigger function is SECURITY DEFINER with an empty search_path so the
-- function body can only resolve to pg_catalog objects, never to user-created
-- tables in a public schema.
--
-- Idempotent: safe to re-run.
-- ============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1. CHECK constraints on field lengths.
-- ---------------------------------------------------------------------------

ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_name_length_chk;
ALTER TABLE public.contact_messages
  ADD  CONSTRAINT contact_messages_name_length_chk
       CHECK (char_length(name) BETWEEN 1 AND 100);

ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_email_length_chk;
ALTER TABLE public.contact_messages
  ADD  CONSTRAINT contact_messages_email_length_chk
       CHECK (char_length(email) BETWEEN 3 AND 254);

ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_subject_length_chk;
ALTER TABLE public.contact_messages
  ADD  CONSTRAINT contact_messages_subject_length_chk
       CHECK (char_length(subject) BETWEEN 1 AND 150);

ALTER TABLE public.contact_messages
  DROP CONSTRAINT IF EXISTS contact_messages_message_length_chk;
ALTER TABLE public.contact_messages
  ADD  CONSTRAINT contact_messages_message_length_chk
       CHECK (char_length(message) BETWEEN 10 AND 5000);

-- ---------------------------------------------------------------------------
-- 2. Rate-limit trigger. Uses NEW.email directly (the action has already
--    validated/normalized the address before insert).
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.contact_messages_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- 3 messages per email in the last 10 minutes. The window is computed
  -- against created_at which is set by DEFAULT now() on the table.
  SELECT count(*) INTO recent_count
    FROM public.contact_messages
   WHERE email = NEW.email
     AND created_at > (now() - interval '10 minutes');

  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'rate_limited'
      USING ERRCODE = 'P0001',
            HINT    = 'too many submissions from this email; try again later';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_contact_messages_rate_limit ON public.contact_messages;
CREATE TRIGGER trg_contact_messages_rate_limit
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.contact_messages_rate_limit();

-- ---------------------------------------------------------------------------
-- Done.
-- ---------------------------------------------------------------------------

COMMIT;
