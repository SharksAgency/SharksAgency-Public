# Dynamic content verification

Verified on Windows on 3 September 2026 against the connected SharksAgency database.

## Content and permissions

- Migrated 4 services, 3 scenarios, 15 scenario steps, 7 articles, and 8 structured settings records.
- Verified all 14 Storage images return HTTP 200 with byte sizes matching `supabase/media-manifest.json`.
- Projects, partners, team, and profiles contain no seeded fictional records.
- Transactional RLS checks passed for hidden articles/services/scenarios and scenario steps, denied anonymous content/storage writes, denied anonymous profile reads, editor CRUD without role escalation, and admin profile management. Test mutations were rolled back.
- Security advisor returned no findings. Performance advisor still reports unused indexes on the small/new tables and overlapping public/editor SELECT policies. The working, tested policies were retained; an optional consolidation was not applied because the approval review rejected that broad policy rewrite.
- The one-time `migrate-content-media` Edge Function was retired immediately after copying the existing images. Its current implementation only returns HTTP 410 and has no database or Storage operations. It is not part of the application's runtime.

## Application checks

- `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build` succeeded.
- Both `npm run dev` (8443) and `npm run start` (tested using `PORT=8444`) started successfully.
- Production HTTP checks covered Home, Blog, an article, all three scenario URLs, Studio, Contact, and the sitemap.
- Invalid article/scenario/project slugs render the existing not-found UI with `noindex`. Because these responses are streamed, Next.js can send HTTP 200 before discovering the missing record; this is [documented Next.js behavior](https://nextjs.org/docs/app/api-reference/file-conventions/not-found).
- Empty `/works` redirects to `/#work`, retaining the current scenario experience.
- The production article's browser console had no warnings or errors during the check.
- No contact form, lead API, newsletter system, or admin dashboard is included.

## Visual and interaction spot checks

- Viewports: desktop 1440×900, tablet 768×1024, and mobile 390×844; these are browser viewport checks, not physical-device certification.
- Checked light/dark themes, RTL copy, article rendering, category filtering, horizontal desktop service rows, images, and navigation highlighting.
- Confirmed the manifesto reveals all four lines while pinned, then releases scrolling; scenario progress numbers advance with scroll.
- Fixed streamed homepage anchor navigation and section observation so the existing navigation still works after content arrives asynchronously. Anchor measurement waits for the existing intro/animation hydration signal and cancels on user scrolling or navigation.
- No stylesheet, asset geometry, or layout redesign was introduced. The existing full navigation remains crowded around 768px; its breakpoint was intentionally left unchanged because this task excludes UI changes.

## Operational notes

- Set the public Supabase URL/publishable key in the deployment environment. There is no service-role key in the website.
- The database and Storage are external runtime dependencies; content failures use the existing error presentation, including root-layout recovery.
- Back up Storage separately from SQL. Migration filenames match the hosted migration history.
- The installed Node runtime emits an upstream `module.register()` deprecation warning during builds; it does not fail compilation. Use the Node LTS version described in the README for normal development.
