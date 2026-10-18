# Fixes to existing text

This is a short list of small, targeted edits the owner can paste into
the admin's **Profile** form to clean up the existing home / hero
copy. Each fix is a single-line change; no facts are invented.

## 1. Hero subtitle

- **Where:** Profiles → `bio_description` (shown in the hero card).
- **Current default (in code):**
  `Architecting robust digital experiences with a focus on technical precision and editorial-grade user interfaces.`
- **Suggested replacement (only if the owner wants a tighter line):**
  `TODO(owner: write one sentence in your own voice — what you build and why. Plain English, no buzzwords.)`
- **Why:** the default in `HeroSection.tsx` is generic. Replacing the
  DB value gives the owner a voice without touching code.

## 2. About section summary

- **Where:** Profiles → `bio_description` (also feeds the About section
  via `AboutSection.summary`).
- **Current behavior:** both the hero and the About section read from
  the same field. If the owner wants them to differ, the `AboutSection`
  should be re-wired to its own column in a follow-up.
- **Suggested split (deferred):** TODO(add a separate
  `about_summary` column on `profiles` and re-wire `AboutSection` to
  use it; until then both sections share the hero line.)

## 3. Focus area

- **Where:** Profiles → `focus_area`.
- **Current default (in code):** none — the section simply renders
  whatever is in the row.
- **Suggested value:** TODO(one short noun phrase, e.g.
  `Full-stack product engineering` or `Backend systems & developer
  tooling`. Keep it under ~40 characters so it fits the section
  layout.)

## 4. Location

- **Where:** Profiles → `location`.
- **Important:** the public page's JSON-LD `<script>` block splits
  this on `,` and emits `addressLocality`, `addressRegion`, and
  `addressCountry` from the parts. Leaving it blank is fine — the
  block is omitted entirely. Do **not** put a placeholder city in
  here.
- **Suggested value:** TODO(the real city, region, country — or leave
  blank if the owner prefers not to publish it.)

## 5. Availability message

- **Where:** Site Settings → `availability_message`.
- **Suggested value:** TODO(one short, honest sentence — e.g. `Open to
  full-time roles, remote.`, or `Currently focused on contract work.`)

## 6. Resume button

- **Where:** Profiles → `resume_url`.
- **Important:** the Hero section only renders the **Resume** button
  when this field is non-empty. Leaving it blank hides the button
  cleanly — no `href="#"` placeholder is ever shown.
- **Suggested value:** TODO(real public PDF URL, or blank to hide the
  button.)

## 7. Footer copy

- **Where:** Footer component default `copyrightText` (in code, not in
  the DB).
- **Current default:**
  `© <year> Engineering Portfolio. build: stable.`
- **Suggested edit (optional):** TODO(replace `Engineering Portfolio`
  with the owner-preferred brand word. This is a code change, not a DB
  change, so it is **deferred** — the current copy is intentionally
  generic and ships fine.)
