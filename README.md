# SharksAgency

Production website for Sharks Agency, an Arabic-first creative agency focused on strategy, identity, marketing, content, and digital experiences.

The site uses an editorial RTL composition, light and dark themes, smooth scrolling, kinetic typography, scroll-linked sequences, and an interactive shark while keeping the content server-renderable and the client bundle focused on genuine interactions.

## Technology stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS v4
- GSAP and ScrollTrigger for advanced scroll sequences
- Lenis for synchronized smooth scrolling
- Thmanyah Sans for Arabic typography
- Inter for English metadata
- ESLint for code quality and autofix formatting

## Local development

Requirements:

- Node.js 20.9 or newer (Node.js 22 LTS recommended)
- npm 10 or newer

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

The application runs at [http://localhost:8443](http://localhost:8443).

## Production validation

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` when the canonical production URL differs from the default:

```bash
NEXT_PUBLIC_SITE_URL=https://sharks.agency
```

No credentials are required for the current local-content version.

## Project structure

```text
src/
  app/                 Route files, metadata, error states, robots, and sitemap
  components/
    animations/        Smooth scrolling and transition behavior
    approach/          Capability-scenario presentation
    blog/              Journal index and article presentation
    interactions/      Custom pointer behavior
    layout/            Global navigation and footer
    navigation/        Theme and navigation controls
    sections/          Homepage and shared editorial sections
    sharks/            Shark illustration
    ui/                Small reusable visual primitives
  data/                Navigation, services, scenarios, approaches, and articles
  hooks/               Browser interaction and motion hooks
  lib/                 Shared asset URL helpers
public/
  brand/               Sharks Agency brand assets
```

## Content and routes

- `/` — agency homepage
- `/blog` — journal index
- `/blog/[slug]` — local structured articles
- `/approach/[slug]` — capability scenarios, not client case studies
- `/studio` — studio and process
- `/contact` — contact experience

Unknown blog and approach slugs resolve through the shared not-found experience.

## Animation responsibilities

- GSAP and ScrollTrigger manage scrubbed and pinned editorial sequences.
- Lenis owns smooth wheel scrolling and synchronizes updates with ScrollTrigger.
- CSS transitions handle small hover and reveal details.
- `requestAnimationFrame` drives the shark and custom cursor without pointer-driven React state updates.
- Reduced-motion users receive static or simplified alternatives to complex sequences.

## Future backend integration

Content is intentionally isolated in typed modules under `src/data`. A future Supabase data source and the separate Sharks Agency Dashboard can replace these modules without changing route layouts or visual components. This repository does not contain the dashboard or backend credentials.
