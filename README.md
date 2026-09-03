# SharksAgency

Sharks Agency’s Arabic-first public website: an editorial experience for strategy, identity, marketing, content, and digital products. The existing visual language is preserved while content is read from Supabase and rendered through the Next.js App Router.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS v4
- Supabase (`@supabase/ssr` and `@supabase/supabase-js`) for public content reads
- GSAP + ScrollTrigger for pinned and scrubbed sequences
- Lenis for smooth scrolling
- Thmanyah Sans for Arabic and Inter for English metadata

## Requirements

- Node.js 20.9 or newer (22 LTS recommended)
- npm 10 or newer

## Local development

```powershell
npm install
Copy-Item .env.example .env.local
# Fill in the public Supabase connection values before starting.
npm run dev
```

The development server runs at [http://localhost:8443](http://localhost:8443).

Supabase is the content source of truth. There is no bundled runtime content fallback. Configure a database with the migrations below before starting; an intentionally empty table remains empty in the UI. Queries run on the server on each request, with request-level deduplication, so published dashboard edits appear on the next page load without rebuilding the site.

## Validation and production

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment variables

Create `.env.local` from `.env.example`:

```dotenv
NEXT_PUBLIC_SITE_URL=https://sharks.agency
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Only the publishable Supabase key belongs in this public application. Never add a service-role key or other secret to this repository.

## Supabase content model

The migrations in `supabase/migrations/` create and seed the public content model:

- `site_settings` — hero, manifesto, studio, section headings, process, navigation, contact/social links, footer copy, and route/default SEO
- `services` — active services ordered by `sort_order`
- `scenarios` and `scenario_steps` — capability/approach content
- `blog_categories` and `blog_posts` — published journal content with structured JSON blocks
- `projects` and `project_gallery` — real work only; intentionally empty until published
- `partners` and `team_members` — future content; intentionally empty until verified
- `profiles` and `media_assets` — future SharksDashboard roles and media metadata
- Storage bucket `website-media` — public reads, editor-only writes

Every public table has RLS. Anonymous users can read only public rows and cannot write content or upload media. Authenticated `admin`/`editor` profiles receive content CRUD access; only admins manage profile roles. Draft, archived, and future-dated articles are not public. The separate SharksDashboard will own editorial workflows; no admin UI is included here.

The migrations are already applied to the connected SharksAgency project. To link this checkout or deploy the same schema to another authorized project:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Migration filenames match the hosted migration history. Do not re-run individual seed statements against edited production content. Future schema changes should use `npx supabase migration new descriptive_name`, be reviewed, and then be applied in order.

Storage objects are not included in SQL database backups. The current 14 content images are in `website-media`; `supabase/media-manifest.json` lists their paths. Copy those objects separately when restoring or creating another environment. Permanent brand assets remain under `public/`.

`src/types/database.ts` matches the hosted schema. Regenerate it with the Supabase CLI after schema changes. Transactional role checks are in `supabase/tests/content_access.sql`; run them through an authorized SQL connection in a test environment. The script rolls its changes back.

For the future dashboard, create/invite the first administrator through trusted Supabase administration and insert its matching `auth.users.id` into `profiles` with role `admin`. There is no public role assignment or self-promotion endpoint.

## Content contracts

- `site_settings` uses the keys `site_identity`, `home_hero`, `home_manifesto`, `studio`, `contact`, `social_links`, `default_seo`, and `editorial`. JSON is validated by the schemas in `src/lib/content/queries.ts`.
- Article `content` uses a TipTap-compatible `{ "type": "doc", "content": [...] }` document. The existing renderer supports paragraphs, level-2/3 headings, blockquotes, lists, images, and the custom `sharksHighlight` node. Images accept `src`, `alt`, `caption`, and `fullWidth` attributes. Inline marks are currently flattened to plain text; unsupported nodes are not rendered. Coordinate future editor extensions with this contract.
- Store CMS media paths relative to `website-media`, such as `blog/article-cover.jpg`. Approved absolute image URLs and local brand paths are also supported.
- Projects, partners, and team tables start empty. Future project routes and partner rendering are ready for real published data. Team access is prepared without adding a new section to the current UI.
- Layout, classes, breakpoints, animation timing, and shark behavior remain in code, not in database settings.

## Routes

- `/` — homepage and capability experience
- `/approach/[slug]` — scenario pages (not client case studies)
- `/blog` and `/blog/[slug]` — published journal
- `/studio` — studio and process
- `/contact` — contact CTA and social information (no submission form)
- `/works` and `/work/[slug]` — prepared for future real projects; empty `/works` returns to the current scenario section

## Project structure

```text
src/
  app/                 App Router pages, metadata, sitemap, and error states
  components/          Layout, sections, blog, approach, projects, animations, and UI primitives
  hooks/               Browser interaction and motion hooks
  lib/content/         Typed Supabase queries, mapping, validation, and media URLs
  lib/supabase/        Browser/server clients and environment helpers
  types/               Content and database types
supabase/
  migrations/          Schema, RLS, storage policies, and legitimate content seed
  tests/               Transactional authorization checks
  media-manifest.json  Content-image inventory for separate Storage backups
public/                Permanent brand and interface assets
```

Contact and newsletter submission systems are intentionally not part of this website. Content, design, animation, RTL composition, themes, and the interactive shark remain controlled by Next.js and the existing components.
