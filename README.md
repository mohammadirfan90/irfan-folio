# Mohammad Irfan — Portfolio

A Next.js 16 portfolio site with a Supabase backend and a private admin
dashboard for editing projects, skills, experience, profile, and incoming
contact messages.

The site itself is fully public and statically rendered. The `/admin` area
is gated behind Supabase Auth and a server-side admin allowlist.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Auth + DB:** Supabase (Postgres + RLS + Auth + Storage)
- **Markdown editor:** `react-markdown` + `rehype-raw` + `rehype-sanitize` + `rehype-slug` + `remark-gfm` + `mermaid` + `prismjs`
- **Animation:** `framer-motion`
- **Icons:** `lucide-react`
- **Cloud storage:** Cloudinary (for uploaded media)

## Admin dashboard

The `/admin` routes are protected by:

1. A Supabase Auth session (`getUser()`).
2. A row in the `public.admins` table — only those rows can call admin
   server actions or read/update the protected tables.
3. A server-side `requireAdmin()` helper called from every admin RSC page
   and every admin server action.

There is no public sign-up. The only admin is the owner.

## Supabase setup

Run the SQL files in this order inside the Supabase SQL editor (or via the
Supabase CLI):

1. `supabase/schema.sql` — base tables, RLS policies, and storage bucket.
2. `supabase/update_projects_schema.sql` — adds case-study columns to
   `projects`.
3. `supabase/update_skills_schema.sql` — drops the unused proficiency
   column and adds `custom_logo_url` to `skills`.
4. `supabase/update_site_settings_schema.sql` — adds phone/whatsapp to
   `site_settings`.
5. `supabase/add_messages_table.sql` — creates the `contact_messages`
   table and the public-insert / admin-only RLS policies.
6. `supabase/migration_admin_only.sql` — replaces every
   `auth.role() = 'authenticated'` policy with a real `is_admin()` check
   and creates the `public.admins` table.
7. **Manually** insert your own admin row. Open the Supabase SQL editor
   and run (replace the email with the one you used to sign in):
   ```sql
   insert into public.admins(user_id)
   select id from auth.users where email = '<YOUR ADMIN LOGIN EMAIL>';
   ```
8. In Supabase Auth settings, **turn OFF** "Allow new users to sign up"
   so the public cannot create accounts.

If you re-run `migration_admin_only.sql` it is idempotent.

## Environment variables

Add these to `.env.local` (never commit the file). The names are the same
ones the code reads — values are not checked in.

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | All Supabase clients |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All Supabase clients |
| `NEXT_PUBLIC_SITE_URL` | SEO / sitemap / JSON-LD (e.g. `https://your-domain.com`) |
| `CLOUDINARY_CLOUD_NAME` | Asset uploads from the admin dashboard |
| `CLOUDINARY_API_KEY` | Asset uploads from the admin dashboard |
| `CLOUDINARY_API_SECRET` | Asset uploads from the admin dashboard |

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`. The admin dashboard is at
`/admin`; you'll be redirected to `/login` if not signed in.

## Build and lint

```bash
npm run lint
npm run build
```

`npm run build` runs the production build. `npm run start` serves the
built output.

## Project layout

```
src/
  app/
    (auth)/login/        # login page (client component)
    (public)/            # public pages (home, project detail)
    admin/               # admin pages, protected by requireAdmin()
  actions/               # server actions (admin mutations, contact form)
  components/
    admin/               # admin forms, layout shell, managers
    layout/              # Navbar, Footer, public layout shell
    markdown/            # Markdown renderer, editor, Mermaid, code block
    portfolio/           # Project card, detail view, skill card
    sections/            # Hero, About, Skills, Projects, Experience, Contact
    ui/                  # primitives (button, input, card, etc.)
  lib/
    auth/require-admin.ts  # server-side admin guard
    supabase/              # server, client, middleware, storage
  types/                 # shared TypeScript types
supabase/                # schema + migration SQL files
```

## Security notes

- All write policies on tables and storage use `is_admin()`. Public reads
  (published projects, public profile, public skills, public social links,
  public site settings) are still allowed.
- The contact form is protected by a hidden honeypot field, a
  render-time check (submissions faster than 3 seconds are rejected), and
  server-side length/format validation.
- The markdown renderer sanitizes HTML with `rehype-sanitize` after
  `rehype-raw`, and headings still get `id` attributes for the in-page
  table of contents.
- The login action does not leak the raw Supabase error to the user.
