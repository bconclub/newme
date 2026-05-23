# Changelog

## 2026-05-23 · Contact + Media banners refreshed, OG share image switched to homepage hero

- **`src/app/contact/page.tsx`** — Contact hero photo swapped from `/contact/contact us opt1.webp` → `/contact/Contact Us.webp`, anchored `center top` to match the rest of the site's heroes (consistent crop behavior across pages).
- **`src/components/option1/MediaHero.tsx`** — /media page banner swapped from `/media/Media Hero.webp` → `/media/Media Page.webp`, also `center top` anchor. The old Media Hero.webp file stays on disk because it's still referenced as the fallback OG image below.
- **`src/app/layout.tsx` (OG + Twitter card image)** — share-preview image switched from `/media/Media Hero.webp` (1880×694) to `/home/Homepage Hero.webp` (2752×1536). Reasons:
  - Aspect closer to Facebook/WhatsApp's recommended 1200×630 (≈1.91:1) — old image was ≈2.7:1 which got awkwardly letterboxed in the rendered card; new image is ≈1.79:1 which renders cleanly.
  - It's the same photo users see above the fold on the homepage, so the share preview matches what visitors actually land on — more consistent brand feel.
  - File is well-sized (124KB) and well within FB's image-size limits.
- Updated `width` / `height` to 2752×1536 to match the new image (Next.js writes these as `og:image:width` / `og:image:height` meta tags which help WhatsApp lay the card out without flickering).
- User-facing: link previews on WhatsApp / Facebook / Twitter now use the homepage hero photo. **Cache-bust to see it**: append `?v=3` to the URL when sharing, or use Facebook's Sharing Debugger to force a re-scrape.

## 2026-05-23 · Fix OG image not showing in WhatsApp / FB / Twitter share previews

- **`src/app/layout.tsx`** + **`src/app/sitemap.ts`** — `metadataBase` was falling back to `https://drpalsnewme.com` (because `NEXT_PUBLIC_SITE_URL` isn't set in Vercel env). That domain is currently still the OLD WordPress site, so the og:image relative URL `/media/Media Hero.webp` resolved to `https://drpalsnewme.com/media/Media Hero.webp` which 404s. WhatsApp scraper fetched that, got nothing, and rendered the link preview with no image.
- **Fix**: extended the env fallback chain with Vercel's auto-set env vars:
  1. `NEXT_PUBLIC_SITE_URL` (explicit override, set this at launch)
  2. `VERCEL_PROJECT_PRODUCTION_URL` (Vercel's prod alias when a custom domain is attached)
  3. `VERCEL_URL` (per-deployment URL — auto-set on every preview, e.g. `newme-web.vercel.app`)
  4. Hard-coded `drpalsnewme.com` fallback for local dev
- Result: on the Vercel preview deployment the og:image now resolves to `https://newme-web.vercel.app/media/Media Hero.webp` (a real file that returns 200) instead of the WordPress 404. At launch, set `NEXT_PUBLIC_SITE_URL=https://drpalsnewme.com` in Vercel and the chain skips straight to the explicit value.
- User-facing: WhatsApp / Facebook / Twitter link previews of any NewME URL now show the OG image. **WhatsApp aggressively caches link previews** — to see the fix immediately, share the URL with a fresh path (`?v=1` query param) or wait ~24h for the cache to expire naturally. Facebook's Sharing Debugger (https://developers.facebook.com/tools/debug/) can also be used to force a re-scrape.

## 2026-05-22 · robots.txt and llms.txt now Sanity-driven (editable from Studio → Site)

The SEO team can now edit both `/robots.txt` and `/llms.txt` content directly from Sanity Studio without a developer or deploy. Sits under Studio → Site, alongside Redirects.

- **`sanity/schemas/robotsTxt.ts`** (new) — singleton document type for `/robots.txt`. Fields: `content` (the raw robots.txt text, required, validated to contain at least one `User-agent:` line), `lastEditedBy`, internal `note`. Schema `initialValue` ships the safe pre-launch default ("Disallow: /") so a fresh dataset auto-populates correctly.
- **`sanity/schemas/llmsTxt.ts`** (new) — singleton document type for `/llms.txt`. Same shape (content + lastEditedBy + note), with the schema `initialValue` carrying the full markdown brand description that used to live in `public/llms.txt`.
- **`sanity/schemas/index.ts`** — registers both new types.
- **`sanity/structure.ts`** — adds both singletons under the "Site" sidebar group alongside Redirects. Uses `S.editor().documentId(...)` so editors open straight into the one fixed document for each type (no list view, no "create new" affordance).
- **`sanity.config.ts`** — locks down the singletons via two safeguards: `schema.templates` filter (so they don't show up in any global "new document" template list) and `document.actions` filter (strips Duplicate / Delete / Unpublish for these types so editors can't accidentally wipe them out).
- **`src/app/robots.txt/route.ts`** (new route handler) — replaces the previous static `src/app/robots.ts` (which was Next.js `MetadataRoute.Robots` — build-time only, couldn't read from Sanity at request time). New handler fetches the `robotsTxt` singleton from Sanity on each request (60s revalidate), falls back to `Disallow: /` if Sanity is unreachable (safe default — never accidentally exposes a half-built site).
- **`src/app/llms.txt/route.ts`** (new route handler) — replaces the static `public/llms.txt`. Fetches the `llmsTxt` singleton from Sanity, serves with `Content-Type: text/markdown`, falls back to a minimal brand stub if Sanity is unreachable.
- **`public/llms.txt`** deleted (now served by route handler). `src/app/robots.ts` deleted (replaced by route handler).
- **`scripts/seed-site-singletons.mjs`** (new) — bulk-seeds both singletons via `createIfNotExists` with the deterministic IDs `site-robots-txt` and `site-llms-txt`. Idempotent — editor changes in Studio are preserved across re-runs. **Already run** against production using the `SANITY_API_WRITE_TOKEN` from `.env.local`, so the live `/robots.txt` and `/llms.txt` now serve the same content they did before (just via Sanity instead of the filesystem).
- User-facing: **no visible change** — the served content is identical to what was there before. What's new is that the SEO team can edit either from Studio → Site → robots.txt or llms.txt and the live site reflects the change within ~60 seconds. No code change, no deploy, no developer required.
- Pre-launch note: robots.txt is now ONE of THREE noindex layers. The other two (`X-Robots-Tag` header in `next.config.ts`, `robots: { index: false }` in `src/app/layout.tsx`) remain in code. At launch all three must be flipped together — robots.txt via Studio, the other two via PR.

## 2026-05-22 · /blog → /blogs URL migration + LISTEN widget removal + 41 legacy WordPress redirects seeded to Sanity

- **Removed LISTEN audio player from blog posts**: deleted `src/components/option1/BlogListen.tsx` (orphaned after removing its only call site in `src/app/blogs/[slug]/page.tsx`), dropped `public/audio/Test sample blog bloating 01.mp3` and `public/audio/blog-sample.mp3`. The audio widget was a per-post feature only enabled on the "Why am I so bloated" post; team decided to remove it.

- **`/blog` → `/blogs` URL rename (full migration)**:
  - Renamed `src/app/blog/` → `src/app/blogs/` (covers both the index page.tsx and `[slug]/page.tsx`)
  - Renamed `public/blog/` → `public/blogs/` so asset URL (Main Banner.webp) lives at the same canonical prefix as the page route. Avoids the `/blog/:slug*` redirect accidentally catching asset paths.
  - Added 2 permanent (308) redirects in `next.config.ts`: `/blog` → `/blogs` AND `/blog/:slug*` → `/blogs/:slug*`. Splitting into two rules avoids the wildcard accidentally swallowing the bare-index request.
  - Updated all internal references: Header + Footer nav hrefs, `sitemap.ts` (both the static entry AND `loadBlogEntries()` URL builder), `sanity/schemas/page.ts` dropdown, `sanity/migrations/seed-pages.ts`, `sanity.config.ts` (Studio "open in production" handler + JSDoc), `BlogHero.tsx` image src, internal `<Link href="/blog">` breadcrumb in `[slug]/page.tsx`, canonical + OpenGraph URL builders, `BlogArticleBody.tsx` and `BlogArticles.tsx` type imports.
  - Updated docs: `public/llms.txt`, `LAUNCH-CHECKLIST.md`.

- **Sanity seed script ran successfully — 42 redirects now live**:
  - `scripts/seed-legacy-redirects.mjs` executed against the production Sanity dataset using `SANITY_API_WRITE_TOKEN` from `.env.local`. First run created 41/42 (one failed with `ETIMEDOUT`); re-run was idempotent via deterministic IDs + `createIfNotExists` and got the last one.
  - Removed the now-redundant `/blogs/` → `/blog` legacy entry from the script (since `/blogs` is now canonical, trailing-slash variant is handled by Next.js automatically).
  - Updated `/feed-2/` destination from `/blog` → `/blogs` in both the seed script and the URL-map PDF generator.
  - Editors can now disable / edit any of the 42 redirects from Studio (Redirect document type) without a redeploy.

- **Regenerated `docs/url-map.pdf`** to reflect: `/blogs` (and `/blogs/[slug]`) as canonical, the two new `/blog → /blogs` code redirects, the updated legacy redirect destinations.

- User-facing: visiting `/blog` or `/blog/<slug>` now 308-redirects to `/blogs/...`. Old WordPress URLs (`/diabetes-care-program/`, etc.) start redirecting within ~60s of the middleware refresh. LISTEN player no longer renders on any blog post.

## 2026-05-22 · Seed script for the 42 legacy WordPress redirects (not yet run)

- **`scripts/seed-legacy-redirects.mjs`** (new) — Node.js script that bulk-creates the 42 Tier 1–4 WordPress migration redirects as `redirect` documents in Sanity. Uses `@sanity/client` + the existing `redirect` schema. Idempotent: each doc gets a deterministic ID (`redirect-<slugified-source>`) and uses `createIfNotExists` so re-running the script doesn't duplicate or overwrite existing entries. If an editor has tweaked a destination in Studio, manual changes win.
- **How to run** (documented in the script header):
  1. Generate a fresh Sanity write token at `sanity.io/manage/personal/project/sljf1wfa/api/tokens` (the old one was leaked in git history and needs rotation — pending LAUNCH-CHECKLIST item 4.14)
  2. `npm install --no-save @sanity/client`
  3. `SANITY_API_TOKEN=skXXXX... node scripts/seed-legacy-redirects.mjs`
  4. Verify in Studio: `/studio` → "Redirect" should show 42 new entries with internal notes like "WordPress: diabetes care program → metabolic pathway"
- **Not run yet** — waiting on token rotation and explicit go-ahead. The script is committed as a deliverable so it's reviewable and re-runnable forever.
- **Rationale recap** — Sanity chosen over hard-coding in `next.config.ts` because the redirect infrastructure was built for exactly this case (migration), editors can disable/edit destinations without redeploys, and we get a single source of truth alongside future editorial redirects.

## 2026-05-22 · url-map.pdf layout fixes — narrow-column inheritance and wrapping bugs

- **`scripts/generate-url-map-pdf.mjs`** — PDFKit bug fix. After `doc.text(str, x, y, { width })` the internal cursor remembers the last x-position AND the last constrained text region; subsequent `doc.text(str)` calls inherit both, so section headers (Tier 5, Dynamic routes, Excluded from sitemap) rendered in narrow columns with text wrapping awkwardly. Fix: added a `resetCursor()` helper that clears the cursor + text region, called after every table row + at the top of every section header. Also: every text() call in the post-table content now passes explicit `MARGIN, doc.y, { width: FULL_W }` so nothing inherits a narrow constraint. Page constants extracted (`PAGE_W`, `MARGIN`, `FULL_W`) so column widths are obvious and consistent.
- **`docs/url-map.pdf`** — regenerated with the fixed renderer. Layout now renders correctly across all 4 sections.

## 2026-05-22 · URL map PDF (supersedes legacy redirects PDF) + mobile HIW image width

- **`docs/url-map.pdf`** (new, ~14 KB) — single comprehensive reference document covering:
  1. All 17 live canonical routes from `sitemap.ts` + dynamic blog posts + 3 intentional exclusions
  2. Code-level redirects from `next.config.ts` (the Zoho payment forward + the new `/virtual-clinic` → `/virtual-consult` 308)
  3. The 42 planned legacy WordPress migration redirects (tiered by priority; reflects `/virtual-consult` as the new destination for `/schedule-a-call/`)
  4. Reference notes on Sanity-driven editorial redirects (managed in Studio)
  Re-generatable any time URLs change via `node scripts/generate-url-map-pdf.mjs` (after `npm install --no-save pdfkit`).
- **Removed**: `docs/legacy-redirects.pdf` and `scripts/generate-legacy-redirects-pdf.mjs` — superseded by the broader URL-map document above. Single source of truth instead of two overlapping PDFs.
- **`src/components/option1/HIWUnifiedSystem.tsx`** — On mobile, the step-card image area was a narrow 96px-wide vertical strip; landscape source photos cropped to a center sliver where subjects often weren't visible (the Assessment card showed only a hand and a desk). Bumped mobile image width floor from 96px → 150px so the image area is closer to square and meaningful subject preservation works. Cost: text area drops ~30px to ~180px (still fits the step descriptions in 5–6 lines instead of 4).

## 2026-05-22 · Virtual Clinic → Virtual Consult full URL migration (route + redirect + internal links)

- **Renamed route**: `src/app/virtual-clinic/` → `src/app/virtual-consult/` (3 files: page.tsx, VCSections.tsx, VCHeroCta.tsx). The new canonical URL is `/virtual-consult`.
- **`next.config.ts`** — added a permanent 308 redirect from `/virtual-clinic` → `/virtual-consult` so any existing inbound links (Google index, social shares, external mentions) continue working. Code-level redirect (not Sanity) because this is a permanent URL change tied to the codebase, not editorial.
- **Internal links updated**:
  - `src/components/option1/Header.tsx` — nav link href `/virtual-clinic` → `/virtual-consult`
  - `src/components/option1/Footer.tsx` — same in footer column
- **Sitemap** — `src/app/sitemap.ts` now lists `/virtual-consult` instead of `/virtual-clinic`. Search Console will re-discover via the redirect for now.
- **Sanity** — `sanity/schemas/page.ts` dropdown option and `sanity/migrations/seed-pages.ts` seed data both updated to the new route + new Virtual Consult metaTitle/Description.
- **`public/llms.txt`** — the AI-discoverability map's "Virtual Consult" entry now points at the new URL.
- **Stale comments / docs cleaned** in `src/app/virtual-consult/VCHeroCta.tsx`, `src/app/option1.scss`, `CLAUDE.md`, `LAUNCH-CHECKLIST.md`, and `public/virtual-clinic/README.md` (the asset folder is intentionally NOT renamed to avoid breaking image paths; the README now flags that the page URL is `/virtual-consult` while the asset folder kept its old name).
- User-facing: visiting `/virtual-clinic` now 308-redirects to `/virtual-consult` with the rebranded heading + body intact. Nav and footer link directly to the new URL. SEO authority preserved via the redirect.

## 2026-05-22 · Internal hero resize + vertical centering, pathway prescription banners, Virtual Consult rename, mobile HIW card breathing room

- **`src/components/option1/PageHero.tsx`** — Internal-page hero card grew from 520px → 620px max (mobile floor 440px → 480px). The flex content container gains `justify-center` + `h-full` so heading + body (+ optional CTA) sit at the vertical midpoint of the card instead of being top-anchored. Padding rebalanced to 110 top / 90 bottom — only acts as a safe-area minimum now since centering does the actual placement. Pages without a CTA (Contact, Team, FAQ, Blog, Media, Research Lab) no longer feel top-heavy; pages with a CTA (Pathways, Virtual Consult, How It Works) still fill the card edge to edge because their content is taller.
- **`src/components/option1/Hero.tsx`** — Home hero image swapped to `/home/Homepage Hero.webp` (was `/home/Main Banner.webp` from the prior commit). Old file left on disk in case of revert.
- **`src/app/pathways/{metabolic,gi,continuity}/page.tsx`** — All 7 "Who Is Prescribed The X Pathway?" prescription banners now use the new `Pathways Small Banner 1/2/3.webp` assets, distributed by phase index:
  - Metabolic (3 phases): Reset → Banner 1, Rebuild → Banner 2, Sustain → Banner 3
  - GI (2 phases): Core → Banner 1, Advanced → Banner 2
  - Continuity (2 phases): NewME 360 → Banner 1, NewME Movement → Banner 2
  - Old jpg paths (`/images/pathways/rebuild-banner.jpg`, `sustain-banner.jpg`) and old vertical-banners WebPs are no longer referenced.
- **Virtual Clinic → Virtual Consult (text only, URL preserved)**:
  - `src/app/virtual-clinic/VCSections.tsx` — Heading "What Is The NewME Virtual Clinic?" → "...Virtual Consult?" + body sentence likewise.
  - `src/app/virtual-clinic/page.tsx` — Meta description "Doctor-led virtual clinic from NewME..." → "...virtual consult..."
  - `src/app/faq/layout.tsx` + `src/app/contact/layout.tsx` — Meta descriptions also mentioned "virtual clinic"; updated for consistency.
  - URL route `/virtual-clinic` deliberately NOT changed — would require a 308 redirect, sitemap update, and breakage of any external backlinks. Defer until SEO team weighs in.
- **`src/components/option1/HIWUnifiedSystem.tsx`** — Mobile cards on the "Unified System of Care" section had cramped text wrapping (~190px text area on a 375px viewport). Two tweaks: section side padding floor 20px → 14px, card image width floor 110px → 96px. Net ~30px more text width on mobile so step descriptions wrap into 4 lines instead of 6.
- User-facing: all internal page heroes feel properly proportioned now (taller card, content centered). Pathway sub-page prescription banners use finalized photography. Virtual Consult naming is consistent across page content + adjacent meta descriptions. Mobile How-It-Works cards breathe.

## 2026-05-22 · Replace all page banners + HIW step cards + home pathway images with finalized art

- **Page banners (7 pages)**: home Hero, FAQ, Blog, How It Works, Team, Pathways, Virtual Clinic — all now use the final WebP banners under their respective `/public/<page>/...` paths instead of the temporary Figma-export placeholders
  - `src/components/option1/Hero.tsx`: home hero → `/home/Main Banner.webp`
  - `src/components/option1/BlogHero.tsx`: → `/blog/Main Banner.webp` (heading also changed to "Our Blogs", subhead removed in a prior commit)
  - `src/components/option1/HIWHero.tsx`: → `/how it works/How it Works Banner.webp`
  - `src/app/faq/page.tsx`: → `/faq/FAQ Banner.webp`
  - `src/app/team/page.tsx`: → `/team/NewME Care Team Banner.webp`
  - `src/app/pathways/page.tsx`: → `/pathways/Main Banner.webp` + `imagePosition` changed from `60% center` to `center top` so the doctor's head and the patient's face stay fully visible (image is 1.91:1 in a 3.62:1 container, so vertical crop is unavoidable — anchoring to top sacrifices the lower coat/clipboard instead)
  - `src/app/virtual-clinic/page.tsx`: → `/virtual clinic/Virtual Consult Banner.webp` with the same `center top` anchor
- **HIW step cards (5 images)**: `src/components/option1/HIWUnifiedSystem.tsx` — Assessment, Prescription, Structured Care, Monitoring & Recalibration, Continuity. Migrated from `.png` to `.webp` and fixed two filename typos in the source paths (`Assesment.png` → `Assessment.webp`, `MOnitoring.png` → `Monitoring and Recalibration.webp`)
- **HIW Coach vs AI section**: `src/components/option1/HIWHumanGuidance.tsx` — swapped the section image to `/how it works/Health Coach vs AI Coach.webp` (was `Structred care needs human guidance.webp`, also a typo)
- **Home pathway card images (5)**: GI Core, GI Advanced, Reset, Rebuild, Sustain — the WebP files in `/public/home/` were replaced in place. No code change needed since `src/components/option1/Pathways.tsx` already referenced these paths. Renamed user-dropped `GI Advance.webp` → `GI Advanced.webp` to match the existing brand naming convention (past participle)
- **Also bundled**: 3 untracked `Pathways Small Banner 1/2/3.webp` files dropped in `/public/pathways/` — assets added but not yet wired into any component (pending decision on where they're meant to live), and `public/pathways/one system multiple pathways.webp` updated in place
- **Untracked dev artifacts also committed**: `docs/legacy-redirects.pdf` (the WordPress → new-site migration map deliverable) and `scripts/generate-legacy-redirects-pdf.mjs` (re-runnable generator for the PDF — uses `pdfkit` installed via `--no-save`, so regenerate-anytime works after `npm install pdfkit`)
- User-facing: every hero across the site now shows the production photography. Old Figma-export images are no longer referenced anywhere

## 2026-05-15 · Home: Hero "Know more" wired + What-is-NewME gets its own CTA + circle badges no longer claim to be clickable

- **`src/components/option1/Hero.tsx`**: Arrow circle next to "Know more" was pointing to `#assessment` (no such anchor). Both the arrow and the yellow "Know more" pill now point to `#how-it-works`, which is the `id` on the What is NewME section — clicking either scrolls there
- **`src/components/option1/WhatIsNewMe.tsx`**:
  - Removed `cursor-pointer` from the orange + yellow circular icon badges. The hover micro-interaction (scale/rotate) is preserved; only the cursor change is gone, so users no longer get a false "this is clickable" signal
  - Added a CTA cluster at the bottom of the section: a yellow "Start My Assessment" pill + orange arrow circle (same recipe as the Hero pair). Both link to `/assessment`
- User-facing: Hero CTAs now scroll cleanly into the What is NewME section; that section ends with a working CTA into the assessment funnel

## 2026-05-15 · Pathway hero overlay sizing — per-pathway, not uniform

- **`src/app/pathways/metabolic/page.tsx`**: overlayStyle `{ right: 5%, bottom: 8%, height: 85% }` — thyroid stays smaller and fully contained inside the card (matches Figma — only metabolic is meant to be smaller)
- **`src/app/pathways/gi/page.tsx`**: overlayStyle `{ right: -2%, bottom: -12%, height: 120% }` — gut organs fill the card edge-to-edge and bleed slightly past the bottom
- **`src/app/pathways/continuity/page.tsx`**: overlayStyle `{ right: -2%, bottom: -12%, height: 120% }` — body silhouette fills edge-to-edge and bleeds past the bottom
- Previous commit had all three at the smaller value, which was wrong — only metabolic should be small per Figma

## 2026-05-15 · Pathway hero anatomy: seat the overlays inside the card (no more bleed)

- **All three pathway pages** (`metabolic`, `gi`, `continuity`): `overlayStyle` changed from `{ right: '-5%', bottom: '-15%', height: '125%' }` to `{ right: '5%', bottom: '8%', height: '80%' }`. Previous values made the anatomy 125% of the card height and bled it past the top / right / bottom edges (the thyroid in particular was getting visibly clipped on the right). The new values seat the anatomy fully inside the card with breathing room on every side — matches the Figma reference

## 2026-05-15 · Pathway hero anatomy overlays: swap to new pre-cropped images

- New assets in `public/pathways/`:
  - `Metabolic care.webp` (thyroid)
  - `Gastro.webp` (digestive system)
  - `Continuity.webp` (upper body / nervous system)
- **`src/app/pathways/metabolic/page.tsx`**: overlayImage → `/pathways/Metabolic%20care.webp`
- **`src/app/pathways/gi/page.tsx`**: overlayImage → `/pathways/Gastro.webp`
- **`src/app/pathways/continuity/page.tsx`**: overlayImage → `/pathways/Continuity.webp`
- Old `/images/pathways/{metabolic,gi,continuity}-anatomy.png` files left in place but no longer referenced. The new images are cropped to a consistent aspect ratio so all 3 pathway heroes now render at the same horizontal footprint without per-page CSS tweaks

## 2026-05-15 · Revert continuity overlay maxWidth cap

- **`src/app/pathways/continuity/page.tsx`**: Reverted the `maxWidth` cap added in the previous commit. The cap shrank the body silhouette but introduced its own clipping at the right edge. All 3 pathway pages are back to the same overlay recipe (`right: -5%, bottom: -15%, height: 125%`). The remaining size discrepancy between the 3 anatomy images is a source-asset problem — they need to be re-cropped to a consistent aspect ratio, then dropped into `public/pathways/`

## 2026-05-15 · Continuity pathway hero: cap overlay width so all 3 pathway heroes read at the same size

- **`src/app/pathways/continuity/page.tsx`**: Added `maxWidth: 'clamp(280px, calc(560 / 1920 * 100vw), 560px)'` to the anatomy overlay style. The continuity anatomy is a wide upper-body silhouette, so at `height: 125%, width: auto` (the same recipe Metabolic and GI use) it ended up ~45% of the card width — visibly larger than the narrow thyroid and the medium GI organ overlays on the sibling pages. Capping the width brings all three pathway heroes to the same horizontal footprint (~30% of card width at desktop 1920w, scaling down on smaller viewports)

## 2026-05-15 · Update pathway pricing across the assessment

- **`src/assessment-app/data/pathways.ts`**: `PRICING` and `PRICING_CENTS` updated to the new figures
  - Reset: $200 → **$249 / month** (4 weeks)
  - Rebuild: **$699 / 3 months** (unchanged)
  - Sustain: $999 / 6 months display kept, cents corrected from 89900 → **99900**
  - GI Core: $300 / month → **$399 / month**
  - GI Advanced: $599 / month → **$699 / month**
  - $/day labels recomputed for every changed plan
- **`src/assessment-app/constants/zohoCheckout.ts`**: `GI_BILLING` toggles updated
  - GI Core monthly: $300 → **$399** (day $13.30); 3-month upfront: $849 → **$1,099** (day $12.21, savings $98)
  - GI Advanced monthly: $599 → **$699** (day $23.30); 3-month upfront: $1,699 → **$1,999** (day $22.21, savings $98)
  - Inline TODO notes on the monthly Zoho URLs updated to reflect the new amounts that those Zoho pages need to be priced at
- Every customer-facing surface that reads from `PRICING` (`ResultsPage`, `OrderPage`, etc.) picks up the new numbers automatically — no per-page edits needed

## 2026-05-15 · Team page: wire LinkedIn profile URLs (hide icon when absent)

- **`src/app/team/page.tsx`**:
  - Added optional `linkedin?: string` field to `TeamMember`. URLs added for Dr. Pal, Shakeela Ranjithkumar, Karthik Ravi, Gayatri Rajamani, Namratha Nataraj
  - Other members (Priya, Rashmi, Devi, Ashwini, Dr. Indira) intentionally left without — the icon is hidden entirely on those cards rather than rendering a dead-looking inert icon
  - `SocialIcons` now takes a `linkedin` prop, returns `null` if missing, and wraps the icon in an `<a target="_blank" rel="noopener noreferrer">` with `aria-label="LinkedIn profile"` when present
- User-facing: clicking the LinkedIn icon on Dr. Pal / Shakeela / Karthik / Gayatri / Namratha now opens their profile in a new tab. Other team cards no longer show a clickable-looking but inert icon

## 2026-05-15 · Header: active-page indicator in desktop + mobile nav

- **`src/components/option1/Header.tsx`**:
  - Header now calls `usePathname()` to know which route is live
  - Added `isLinkActive(link, pathname)` helper. Home matches exactly; other top-level routes match on prefix so nested pages (e.g. `/pathways/metabolic`) still light up their parent tab; the Resources dropdown is active when the path matches the parent OR any sublink (`/blog`, `/media`, `/faq`)
  - Active desktop link: text colour shifts to gold `#FEF272` and a 2px gold underline appears beneath it. The underline uses `motion.span` with `layoutId="nav-active-underline"` so it slides between tabs on client-side route changes instead of fading in/out
  - Active sublinks inside the Resources dropdown also get the gold colour + a subtle `bg-white/[0.06]` highlight
  - Mobile menu picks up the same active gold colour for both top-level links and sublinks
  - Every active link now also exposes `aria-current="page"` for assistive tech

## 2026-05-15 · Assessment intro: swap social-proof avatars to real testimonials, drop Nithya

- **`src/assessment-app/pages/IntroPage/IntroPage.tsx`**: `AVATARS` array now references real testimonial photos (`abilash.webp`, `ramya.webp`, `kat.jpg`, `thamarai.jpg`, `kavitha.webp`) instead of the previous mix of `/assessment/01{1,2,3}.webp` stock photos + Nithya/Thamarai. Nithya was dropped because her photo is reused as an author byline elsewhere — keeping her in the "10,000+ people have found their clinical pathway" strip made it read as "authors" instead of "patients"

## 2026-05-15 · Round of small fixes: footer socials, team LinkedIn-only, Trustpilot link, HIW assessment links, pillars rename, IntroPage avatar, VC phone

- **`src/components/option1/Footer.tsx`**: replaced Dr. Pal's personal social channels with the official NewME accounts:
  - Facebook → `https://www.facebook.com/share/1CzFt2R4SR/?mibextid=wwXIfr`
  - Instagram → `https://www.instagram.com/dr.pals_newme?igsh=Y3U4NXllMHZjdm9u&utm_source=qr`
  - Added LinkedIn (`https://www.linkedin.com/company/newme-drpal/`) — previously absent
  - X and YouTube retained
- **`src/app/team/page.tsx`**:
  - "Shakeela Ranjithkum" → "Shakeela Ranjithkumar" (correct surname)
  - `SocialIcons` now renders LinkedIn only — Facebook / X / Instagram icons removed per team card (team members keep professional presence on LinkedIn only)
- **`src/components/option1/Testimonials.tsx`**: `RatingBlock` with `trustpilot` flag is now an `<a>` linking to `https://www.trustpilot.com/review/drpalsnewme.com` (target `_blank`, `rel="noopener noreferrer"`). The non-Trustpilot rating block remains plain text
- **`src/assessment-app/pages/IntroPage/IntroPage.tsx`**: small Dr. Pal portrait chip now uses `/Dr Pal.webp` (the asset used on the home `DrPal` section) instead of `/dr-pal-portrait.png` — keeps the imagery consistent with the home page
- **`src/app/virtual-clinic/VCSections.tsx`**: virtual-clinic WhatsApp button updated — display value `+91 97906 27006` and href `https://wa.me/919790627006` (was `99441 27006`)
- **`src/components/option1/HIWHero.tsx`**: both the arrow link and the "Start Your Assessment" pill in the How It Works hero now point to `/assessment` (were going to `#hiw-comparison` and `/pathways` respectively)
- **`src/components/option1/HIWCTA.tsx`**: bottom-of-page "Start Your Assessment" pill points to `/assessment` (was `/pathways`)
- **`src/components/option1/Pillars.tsx`**: home-page section heading "The 8 Pillars of Health" → "Foundations of Good Health"

## 2026-05-15 · Home: force-dynamic + inline CDN-free client for testimonials

- **`src/app/page.tsx`**:
  - Replaced `revalidate = 60` with `dynamic = 'force-dynamic'` + `revalidate = 0` — the home is now rendered fresh on every request. Previous ISR window meant first viewers after a Sanity edit got the stale static HTML and we were chasing 60s windows
  - Replaced the `client.fetch(..., { useCdn: false })` per-fetch override (which @sanity/client doesn't actually respect — `useCdn` is locked at client creation) with an inline `createClient({ useCdn: false })` built just for this query. Guarantees we hit `api.sanity.io` directly, bypassing the CDN's ~60s cache
- User-facing: testimonial avatars will now appear immediately after the deploy lands — no more waiting on cache windows. Future Sanity edits to testimonial photos / quotes also propagate on the next request

## 2026-05-15 · Home: ISR + bypass Sanity CDN so testimonial photos appear

- **`src/app/page.tsx`**:
  - Added `export const revalidate = 60` so the statically-generated home page rebuilds itself every minute, picking up Sanity edits without needing a fresh deploy
  - `loadTestimonials()` now calls `client.fetch(query, {}, { useCdn: false })` to bypass the Sanity CDN at build/revalidation time — the CDN's ~60s cache was serving stale "no avatar" rows even though the live Sanity docs already had `personAvatar` attached
- Diagnostics: `scripts/check-testimonials.mjs` (new) lists every testimonial in Sanity with its resolved avatar URL — used to verify the fix
- User-facing: Abilash, Ramya, Jyoti, Sai Deepthi, Kavita avatars will appear within ~60s of the deploy reaching production (no longer stuck on initial-letter placeholders)

## 2026-05-15 · SEO metadata for route segments + .gitignore env hardening

- **`.gitignore`**: added `.env*.local` so any `.env.local`, `.env.development.local` etc. stay out of git (defensive — Next already gitignores `.env*` by default but this is explicit)
- **`src/app/contact/layout.tsx`** (new): adds `metadata` (title + description) for `/contact`
- **`src/app/faq/layout.tsx`** (new): adds `metadata` for `/faq`
- **`src/app/team/layout.tsx`** (new): adds `metadata` for `/team` (NewME Care Team)
- **`src/app/pathways/layout.tsx`** (new): adds `metadata` for the parent `/pathways` page
- **`src/app/pathways/metabolic/layout.tsx`** (new): adds `metadata` for `/pathways/metabolic`
- **`src/app/pathways/gi/layout.tsx`** (new): adds `metadata` for `/pathways/gi`
- **`src/app/pathways/continuity/layout.tsx`** (new): adds `metadata` for `/pathways/continuity`
- User-facing: each route now ships a proper `<title>` and meta-description for search engines and social previews

## 2026-05-15 · Add branded 404 page

- **`src/app/not-found.tsx`** (new): App Router global 404. Composes the `.newme-page` shell + atmospheric ellipse blobs (same family as the home) so the page sits inside the brand world rather than falling back to a stock Next page. Centered glass card with the big "404" headline, "The requested page could not be found." body, and a white "Back to Home" pill linking to `/`

## 2026-05-15 · GI card images on home + FAQ page redesign

- **`src/components/option1/Pathways.tsx`**: GI Core and GI Advanced cards on the home Pathways carousel now use `/home/GI Core.webp` and `/home/GI Advanced.webp` (were sharing placeholder paths)
- **`src/app/faq/page.tsx`**: rebuilt the FAQ layout to match the reference
  - Replaced the centered stacked-sections layout with a 2-column grid: section nav on the left (sticky on desktop, stacks on mobile), accordion content on the right
  - Active section name turns gold; clicking a section swaps the visible content and auto-opens the first item (page never reads "empty" after category change)
  - Question text turns gold when its panel is open
  - Replaced the circular-bordered +/− icons with borderless +/− glyphs that match the design reference

## 2026-05-15 · HIW comparison parity + team name fixes + continuity card images + team-card half-panel on desktop

- **`src/components/option1/HIWComparison.tsx`**: refactored the right "NewME Approach" card to mirror the home StructuredCare structure exactly — outer `motion.div` owns the scroll-entry (`scale: 0.88 → 1`, `opacity: 0 → 1`, 0.8s ease), inner card owns only the click-to-swap `animate`. Previously the entry and the click state were on the SAME `motion.div`, so Framer's `animate` clobbered `whileInView` the moment the parent re-rendered with `active` and the entry pop never read. Now click-to-swap + entry animation behave identically to the home page section
- **`src/app/team/page.tsx`**:
  - Names: "Shakeela" → "Shakeela Ranjithkum"; "Reshmi Sinha" → "Rashmi Sinha" (corrected spelling)
  - Desktop team card: inset panel now opens to BOTTOM HALF only (`top: 52%`) so the face stays visible above the panel; photo dim reduced to `brightness(0.95)` on desktop hover. Mobile/touch behaviour unchanged — panel still fills the card as before
- **`src/components/option1/Pathways.tsx`**: continuity-pathway cards on the home Pathways carousel now use the new images: NewME 360 → `/home/NEwME 360.webp`, NewME Movement → `/home/NEw ME MOvement.webp` (was sharing placeholder paths with the Metabolic cards by index, which would have shown the same image on Reset and NewME 360)

## 2026-05-15 · Contact page: remove duplicate atmospheric blobs in body

- **`src/app/contact/page.tsx`**: Removed the ContactBody's own atmospheric blobs (green-gradient blob, yellow blob, noise overlay). They created a visible green wash that didn't exist in the area above (around the hero card), producing a noticeable horizontal seam between the hero section and the body. The page already has the global `.newme-page` background, so the body now reads continuously with the hero zone

## 2026-05-15 · Image swaps: home metabolic pathway cards + contact hero

- **`src/components/option1/Pathways.tsx`**: Reset / Rebuild / Sustain card images on the home pathway carousel now use `/home/reset.webp`, `/home/rebuild.webp`, `/home/sustain.webp` (replaces the placeholder /how it works/ assets that were standing in)
- **`src/app/contact/page.tsx`**: contact-page hero image switched from `/clinic/virtual-clinic-hero.webp` to `/contact/contact us opt1.webp` (URL-encoded space)

## 2026-05-15 · HIW comparison card now matches home behavior

- **`src/components/option1/HIWComparison.tsx`**: removed the mobile-stack layout (`flex flex-col md:flex-row`) — the comparison cards are now always side-by-side at every breakpoint, matching `StructuredCare` on the home page. The click-to-swap scale/dim was effectively invisible on mobile because users only saw one card at a time
- Converted the `md:`-only Tailwind utilities (`md:flex-[…]`, `md:mt-[…]`, `md:h-[…]`, `md:ml-[…]`, `mt-4`) to single inline `style` values that apply at all widths
- Switched from fixed `height` to `minHeight` so cards still match the home pattern (home uses `minHeight` and `flex: '… 1 0'`)
- User-facing: click-to-swap now reads correctly on mobile — clicking either card brings it forward, dims the other

## 2026-05-15 · Image swaps: RESET banner + "why starting early matters"

- **`src/app/pathways/metabolic/page.tsx`**: RESET prescription banner → `/pathways/MC 3 Inside vertical banners.webp` (was `/images/pathways/reset-banner.jpg`)
- **`src/components/option1/HIWWhyEarly.tsx`**: "Why starting early matters" image → `/how it works/why starting early matters.webp` (was the typo'd `Why astarting early matters.webp`)

## 2026-05-15 · Unify hero card height across pathway pages

- **`src/components/option1/PageHero.tsx`**: Changed the card sizing from `minHeight` → `height` with floor `560px` and the same `clamp(560px, calc(694/1880 * 100vw), 694px)` formula. Previously each pathway hero (Continuity / Metabolic / GI) grew to fit its own content length, which made the three sibling cards visually different. Now every PageHero-based page renders the exact same card dimensions — only the content inside changes
- User-facing: the Continuity / Metabolic / GI hero cards are now the same size; no more drift

## 2026-05-15 · GI pathway: swap both prescription-banner images

- **`src/app/pathways/gi/page.tsx`**: GI Core banner → `/pathways/GI 1 vertical banners.webp`; GI Advanced banner → `/pathways/GI 2 vertical banners.webp`. URL-encoded the spaces. Replaces the old `gi-core-banner.jpg` and `gi-advanced-banner.jpg` refs

## 2026-05-15 · Continuity pathway: swap both prescription-banner images

- **`src/app/pathways/continuity/page.tsx`**: NewME 360 banner now uses `/pathways/cp1 vertical banners.webp`; NewME Movement banner now uses `/pathways/cp 2 vertical banners.webp`. URL-encoded the spaces in each path. Old refs to `/images/pathways/newme360-banner.jpg` and `/images/pathways/movement-banner.jpg` removed

## 2026-05-15 · Replace Pathways "One System" section image

- **`src/app/pathways/page.tsx`**: `SECTION_IMG` swapped from `/images/pathways/section-clinical.jpg` to `/pathways/one%20system%20multiple%20pathways.webp` (URL-encoded spaces). User-facing image under the "One System. Multiple Pathways." heading is now the new asset

## 2026-05-15 · All testimonial avatars now live in Sanity (single source of truth)

- **`scripts/attach-testimonial-avatars.mjs`**: New one-off — finds testimonial docs missing `personAvatar`, matches them against local files via the same normalized-prefix rule used previously (`Jyoti`→`jyothi.webp`, `Sai Deepthi`→`sai deepti.webp`, etc.), uploads each as a Sanity asset, and patches the doc. Idempotent — re-runs skip already-attached docs
- Ran the script: patched 5 docs (Sai Deepthi, Kavita, Jyoti, Abilash, Ramya)
- **`page.tsx`**: Removed `LOCAL_AVATAR_FILES` map and `resolveLocalAvatar()` helper — `loadTestimonials()` now uses *only* the Sanity `personAvatar` field with no local-file fallback
- User-facing: every testimonial photo is now editable from Sanity Studio; nothing in `/public/testimonials/` is read at runtime anymore

## 2026-05-15 · Move 3 hardcoded testimonials into Sanity, drop fallback list

- **`scripts/seed-testimonials.mjs`**: New one-off script — uploads `nithya.jpg`, `kat.jpg`, `thamarai.jpg` as Sanity assets and creates 3 testimonial documents (Nithya / Karan / Thamarai) with `order: 1, 2, 3`. Idempotent — skips if a doc with the same `personName` already exists. Reads creds from `.env.local`
- **`Testimonials.tsx`**: Removed the `FALLBACK_TESTIMONIALS` array entirely — the component now renders only what's passed in from Sanity
- **`page.tsx`**: Section is conditionally rendered only when Sanity returns at least 1 testimonial
- User-facing: all testimonial content is now editable from `/studio` — no more code edits needed to change Nithya/Karan/Thamarai's quotes or photos

## 2026-05-15 · Fix testimonial avatar fallback matching

- **`page.tsx`**: Replaced exact-name `LOCAL_AVATARS` map with `resolveLocalAvatar()` that normalizes names (lowercase, strip spaces) and matches by prefix — handles spelling variants like "Jyoti"/"Jyothi" and "Sai Deepthi"/"Sai Deepti" that previously fell through to the initial-letter placeholder
- Encoded the space in `sai%20deepti.webp` so the CSS `url()` value is safe across browsers
- User-facing: Abilash, Ramya, Kavita, Jyoti, Sai Deepthi testimonials now show their photos

## 2026-05-15 · Testimonial images + drag/touch scroll

- **`page.tsx`**: Added `LOCAL_AVATARS` map — Sanity testimonials without an uploaded `personAvatar` now fall back to matching local `/public/testimonials/*.webp|jpg` files (covers Abilash, Jyothi, Kavita/Kavitha, Ramya, Sai Deepti, plus existing 3)
- **`Testimonials.tsx`**: Added pointer-event drag handlers to the carousel viewport — left/right swipe now advances or retreats the carousel; works on both touch and mouse; `touchAction: pan-y` preserves vertical page scroll on mobile
- User-facing: all testimonial avatars now show photos; carousel is swipeable

## 2026-05-15 · Fix testimonial avatar face centering

- **`Testimonials.tsx`**: Changed avatar background-position from `center` to `50% 15%` so portrait photos show the face rather than the chest/body area in the circular avatar crop
- User-facing: testimonial avatars now frame faces correctly (abc0000)

## 2026-05-15 · Merge branch 14/sai: assessment scroll fix + Lenis skip

- **`SharedResultsPage.tsx`**: removed `bodyVisible` state + scroll listener `getBoundingClientRect` check; `bodyVisible` is now hardcoded `true` — eliminates erratic scroll/layout jumps on the results page
- **`SmoothScroll.tsx`**: Lenis smooth scroll now also disabled for `/assessment` routes (was only `/studio`) — fixes conflict between Lenis and the assessment SPA's own scroll container (f2d55dc)

## 2026-05-14 20:30 IST · Contact form CRM integration + thank-you page

- **`urlConstants.ts`**: `CRM_LEAD_CONTACT_US` endpoint already present from prior session
- **`contact/page.tsx`**: removed fake `setTimeout` submit; real `fetch` POST to CRM with `{name, email, message}`; on success `router.push('/contact/thank-you')`; on failure shows inline red error above submit button
- **`contact/thank-you/page.tsx`**: new page — atmospheric dark design, animated check icon, "Thank You for Reaching Out." heading, `useEffect` fires `dataLayer.push({ event: 'contact_form_submit' })` on mount with commented stubs for GA4 `gtag` and Meta Pixel `fbq`; two CTAs: "Start Free Assessment" → `/assessment`, "Back to Home" → `/`
- **`Testimonials.tsx`**: fixed TypeScript error — `typeof testimonials` reference replaced with `TestimonialItem` (be4f660)

## 2026-05-14 20:00 IST · Wire Contact Us form to CRM endpoint

- **`urlConstants.ts`**: added `CRM_LEAD_CONTACT_US` endpoint (`/api/crm/lead/contact-us`) to the shared ENDPOINTS map
- **`contact/page.tsx`**: replaced fake `setTimeout` submit with real `fetch` POST to CRM; added `error` state that shows a fallback message if the request fails; success/sending/error states all handled
- User-facing: form now stores leads in the CRM on submission; errors surface inline above the Send button

## 2026-05-14 19:30 IST · Fix missing circle icon, Order Summary favicon, and 8-testimonial carousel

- **`public/icons/pillar-1.svg`**: created missing icon file (copy of digestion SVG) — fixes blank yellow circle in WhatIsNewMe section
- **`OrderPage.tsx`**: replaced `LogoMark` asterisk SVG with `<img src="/favicon.png">` in Order Summary card header — shows actual brand favicon
- **`Testimonials.tsx`**: exported `TestimonialItem` type; component now accepts `initialTestimonials` prop; Sanity data is merged after the 3 hardcoded testimonials (which keep their photos); no-avatar testimonials render an initials circle (gold ring + first initial)
- **`page.tsx`**: `Home` is now an async server component that fetches testimonials from Sanity via guarded dynamic import and passes them as props
- **Sanity**: 5 new testimonials seeded (Abilash, Ramya, Jyoti, Sai Deepthi, Kavita) — carousel now shows 8 total

## 2026-05-14 18:00 IST · Seed 25 media mentions + 4 outlets into Sanity

- **scripts/seed-media-mentions.mjs**: one-time migration script that reads 25 Dr. Pal press articles from the spreadsheet and populates Sanity
- **4 mediaOutlet docs created**: Indian Express, Times of India, Hindustan Times, Economic Times — each with logo uploaded as a Sanity image asset
- **25 mediaMention docs created**: all articles from the spreadsheet, with OG cover images scraped and uploaded, article dates from `article:published_time` meta, and excerpts from `og:description`; 8 articles that had no OG image use the outlet logo as fallback cover
- **User-facing**: /media page now shows 25 real press articles sorted newest-first, each card links out to the original article

## 2026-05-14 · Merge branch 14/sai: shareable results + email update

- **`src/app/assessment/results/page.tsx`**: removed session gate; results page now accepts `?email=` param and is fully shareable as a deep link
- **`SharedResultsPage`**: new component that fetches results from CRM by email, manages results → order → payment_success screen flow, and handles Zoho payment redirect
- **Support email** updated from `hello@newme.com` → `support@drpalsnewme.com` in ChatBot, PhaseDetailPage, and QuizPage (two spots)

## 2026-05-13 · `/assessment/results` deep-link route with session gate

- **New route `src/app/assessment/results/page.tsx`**: returning visitors who completed the quiz can now share/bookmark/revisit their results at `/assessment/results`. Fresh visitors (no session, partial session, or missing CRM lead) are redirected to `/assessment` to start the quiz properly.
- **AssessmentApp**: added `initialScreen?: "results"` prop. When set AND `sessionStorage.newme_session` has `res` plus a `newme_lead_id` in localStorage, the SPA boots directly into the results screen with `res`, `selectedPhase`, `step`, `info`, `profile`, and `ans` all restored from session.
- **Atmospheric shell hoisted**: the pine-teal + green wash + noise background previously lived in `assessment/page.tsx` only. Moved to `assessment/layout.tsx` so both `/assessment` and `/assessment/results` render on the same dark background without duplicating the CSS.
- **Sitemap**: `/assessment/results` is intentionally NOT advertised (session-gated, no public crawlable content). Comment updated.
- **TypeScript**: explicit `<number>` and `<string>` types on the `step`/`screen` `useState` calls so the new `savedSession?.step` init value (which is `any` from `JSON.parse`) doesn't leak into the `setStep(s => s + 1)` callbacks. Removes 3 pre-existing implicit-`any` warnings.

## 2026-05-13 · Calendly link updated to the program-specific booking page

- `CALENDLY_URL` in `src/assessment-app/components/ChatBot/ChatBot.tsx` was pointing at `/dr-pal-s-newme` (the older event). Switched to `/dr-pal-s-newme-program` per the new Calendly URL.
- The booking flow (popup widget + the `calendly.event_scheduled` postMessage listener that writes the appointment back to the CRM via `saveCalendlyAppointment`) is unchanged — same constant, two booking buttons in the chatbot ("📅 Book a call" in the main menu and in the menu after answering a question) now point at the right event.

## 2026-05-13 · Blog card fallback, "Physical Therapy" pillar rename, foundation icon

- **Blog cards**: posts without a coverImage no longer render as an empty dark green slab. Fallback now uses a 135° moss-to-pine gradient + soft fractal-noise overlay + the post title in gold so the card still communicates what the post is about. (Editors should still upload real cover images in Studio for the 3 new posts — this is a graceful fallback, not a replacement.)
- **Pillars**: renamed "Mobility" → "Physical Therapy" (label + description). Description now reads "Restores joint range, functional movement, and physical independence through structured rehabilitation."
- **Assessment OrderPage / Foundation note**: replaced the 🌱 plant emoji with a heart-in-hand SVG so the icon clearly reads as "charitable giving" instead of a wellness/growth cue.

## 2026-05-13 · Footer: Resources column now actually clickable

- Previous commit (`8010d43`) marked the Resources items `live: true` in the data array, but the Resources column rendering still hardcoded all entries as disabled `<span>`s — so FAQ / Blog / Media / Research Lab / Take the Assessment all looked greyed-out and didn't navigate. Now mirrors the Quick Links column rendering: respects each item's `live` flag, renders real `<Link>`s for live items and disabled `<span>`s for unbuilt ones.

## 2026-05-13 · Sitemap: add /assessment and /cookie-policy, reorder by priority

- Added `/assessment` (priority 0.9, monthly) — primary conversion route, was missing.
- Added `/cookie-policy` (priority 0.3, yearly) — legal page, was missing.
- Reordered routes by intent (top-of-funnel → pathway detail → other primary → conversion-adjacent → legal) and grouped with section comments. No priorities changed for existing routes.
- Documented intentional exclusions: `/page1` (dev scratch), `/studio/...` (admin, noindexed), `/blog/[slug]` (dynamic via Sanity, already wired).

## 2026-05-13 · Seed 3 new blog posts to Sanity

- Added `scripts/seed-blogs-batch2.mjs` (idempotent, mirrors the existing `seed-blogs.mjs` pattern) to push 3 new posts authored by Dr. Pal:
  - `/blog/constipation-remedies-relief-guide` — *Effective Constipation Remedies: How to Relieve Constipation on the Toilet Immediately*
  - `/blog/how-to-calculate-maintenance-calories` — *How to Calculate Maintenance Calories* (BMR + TDEE walkthrough)
  - `/blog/sibo-symptoms-guide` — *SIBO Symptoms: 10 Warning Signs You Shouldn't Ignore*
- Source: 3 `.docx` files from the client. Each post converted to Portable Text (h2/h3/para/bullet/bold/em helpers), tagged, SEO-loaded (metaTitle, metaDescription, keywords), and given a disclaimer. Cover image is intentionally blank — editors will set the hero photo in Studio (same flow as the original 3 posts).

## 2026-05-13 · Assessment badge fix, mobile carousel active=left, shield 2× bigger

- **Assessment pricing badge**: when GI billing toggle is "3 months upfront", the inner pill now reads "GI Core · 3 months Clinical Pathway" (was stuck at "1 month" because `PHASE_META` hardcodes monthly units). Switched to a derived `displayBadge` that rewrites "1 month" → "3 months" when upfront is active.
- **Mobile testimonial carousel**: active card is now the LEFTMOST card in view (with a peek of the next on the right) instead of being virtually centered. Desktop still has 3 cards visible with the middle one active. Implemented via a viewport-aware `activeOffset` (0 mobile, 1 desktop), wired through `isActive`, `activeOrigIdx`, and `goTo`.
- **Trust badge shield**: doubled the shield/check icon size — `clamp(28→56 px, 48→96 px, 48→96 px)`.

## 2026-05-13 · Homepage scroll bug, duration pill, mobile tabs carousel, VC animations

- **Bug fix (Pathways.tsx)**: scrollIntoView no longer fires on initial mount — replaced with an internal horizontal `scrollTo` that only triggers on real tab changes and only when the tab is actually overflowing horizontally. Stops the homepage from auto-scrolling to the "8 Pillars" section on load.
- **Duration pill** on all 3 pathway pages (Metabolic, GI, Continuity): now renders via the shared `<EyebrowPill variant="gold" />` to match the rest of the site's pill style.
- **PathwayTabs**: mobile layout is now a horizontal scroll-snap carousel (no more stacking). Desktop keeps the wrap layout. Scrollbar hidden via `.pathway-tabs-row::-webkit-scrollbar`.
- **Anatomy overlay**: unified `overlayStyle` across all 3 pathway pages (`right: -5%, bottom: -15%, height: 125%`). On mobile, `.pathway-hero-overlay` is shrunk to 78% height, pushed further right (-22%), and dimmed to 55% opacity so it sits behind the heading and tab carousel instead of overlapping them.
- **Virtual Clinic animations**: VCWhatIs, VCHowItWorks, and VCDoctorCard sections extracted into `VCSections.tsx` (client component) with entry animations — heading fades + rises, list items stagger from the left, contact pills lift on hover. Previously these were fully static.

## 2026-05-13 · Ratings card centered + compact, footer hooked up to real pages

- **Ratings card**: now `max-width: clamp(320px, 720/1920×100vw, 720px)` + `mx-auto` so the trust badge sits centered and compact instead of stretching edge-to-edge
- **Footer Quick Links**: expanded to Home, How it Works, Pathways, Virtual Clinic, Dr Pal & Team, Contact — all live with real routes
- **Footer Resources**: replaced placeholder Podcast/NewME App with FAQ, Blog, Media, Research Lab, Take the Assessment — all live
- **Footer bottom row**: Privacy → `/cookie-policy`, Terms → `/terms` (was `#`); switched to `<Link>` for client-side nav
- **Dr Pal & Team href fix**: was `/care-team` (404), now `/team` (matches the actual route)

## 2026-05-13 · Testimonial carousel: Figma-spec inactive cards + real sliding motion

- **Testimonials**: rebuilt as a true sliding carousel — cards now physically translate horizontally on each cycle (5 s auto-advance), with the centered card flipping to active. Active dot is wired to the centered card's testimonial.
- **Inactive card surface (Figma 1:6293)**: restored to translucent white-glass — `linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%)` + `rgba(255,255,255,0.30)`, `2px solid white` border, `backdrop-blur(10.25px)`, `rounded-34`
- **Sage tint (Figma 1:6296)**: Ellipse 55 sage-green radial sized at 128% so it bleeds beyond the card and diffuses through the blur
- **Active card**: scales 0.96 → 1, picks up gold box-shadow (2 px ring + 36 px drop), inactive cards stay at 0.96 with a softer shadow
- **Track**: 12 copies × 3 testimonials = 36 cards rendered; seamless snap-back near end via one-frame `duration: 0` transition
- **Card width**: `78vw` mobile (peek of next card), `clamp(220px, 587/1920×100vw, 587px)` desktop — three visible per row at 1920 ceiling matches Figma

## 2026-05-13 · Testimonials hover fix, darker inactive cards, compact ratings banner

- **Testimonials – option1.scss**: removed `:hover` CSS rules; only `[data-active="true"]` now triggers the white flip, eliminating conflict with the auto-advance timer
- **Testimonials card**: inactive card background deepened to `rgba(3,28,24,0.78)` for stronger contrast against the active white card
- **Ratings card**: reduced py padding (py-5→py-4 mobile, py-8→py-5 desktop), score max 52→38 px, stars max 18→14 px, labels max 22→15 px, shield max 72→48 px — reads as a compact trust badge rather than a tall banner

## 2026-05-13 · Fix pillar count, assessment plan label, and add NewME card entrance animation

- **Pillars**: removed Metabolism pillar; section now shows 8 pillars (heading, body copy, and orbit all updated)
- **Assessment – OrderPage**: "3 months · Save $51" tab now correctly shows "GI Core · 3 month Clinical Pathway" (duration was hardcoded to "1 month" regardless of billing toggle)
- **StructuredCare**: NewME card scales up from 0.88→1 as the section scrolls into view (`whileInView` entrance wrapper, `once: true`, 0.8 s ease)
