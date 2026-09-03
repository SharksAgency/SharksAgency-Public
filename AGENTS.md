# SharksAgency

Arabic-first Next.js website for Sharks Agency.

## Architecture

- Next.js App Router and TypeScript
- Tailwind CSS v4 through PostCSS
- Server Components by default
- Client Components only for navigation state, theme, motion, pointer interaction, and filtering
- Local structured content in `src/data`
- Reusable site elements in `src/components`

## Commands

- `npm run dev` — development server on port 8443
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript validation
- `npm run format` — format source files

## Conventions

- Keep the document Arabic-first with correct RTL behavior.
- Use `next/link` for internal navigation and `next/image` for raster imagery.
- Keep static route files thin; content belongs in `src/data` and presentation in components.
- Scope GSAP animations with `gsap.context()` and clean them on unmount.
- Respect `prefers-reduced-motion` and preserve keyboard-visible focus states.
- Do not add client directives to static components without a browser-side requirement.
- Do not add fake clients, case studies, projects, or metrics.
