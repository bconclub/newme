# NewMe — Build & Handoff Documentation

> The current state of what's editable in the CMS, what the developer manages, and what's pending.

---

## 1. Tech stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, React Server Components, Turbopack) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 (tokens in `src/app/globals.css` `@theme inline { … }`) |
| Animation | Framer Motion 12, GSAP, Lenis (smooth scroll) |
| CMS | **Sanity** (Studio mounted at `/studio`) |
| Hosting | **Vercel** — automatic deploys on push to `main` |
| Fonts | Bricolage Grotesque (headings), Urbanist (body), Poppins (buttons) — loaded via `next/font/google` |

---

## 2. Content editor (Sanity)

Studio: `https://newme.health/studio`

| Schema | Type | Used by | Fields the SEO/content team owns |
|---|---|---|---|
| **Blog Post** | Long-form authored content | `/blog/[slug]` *(route in progress)* | title · slug · subtitle · excerpt · cover image (with alt) · author (ref) · publishedAt · city · intro paragraphs · section heading · section lead · numbered habits list · rich body · disclaimer · tags · **full SEO block** |
| **Media Mention** | Brand mention / press feature linking to an external article | `/media` cards | article title · outlet (ref → Media Outlet) · cover image (with alt) · external URL · publishedAt · excerpt |
| **Media Outlet** | Reusable record for a publication (Forbes, The Hindu, etc.) | Referenced by Media Mentions | name · slug · logo (with alt) · website |
| **Author** | Person who writes a blog post | Referenced by Blog Posts | name · slug · role · avatar · bio |
| **Testimonial** | Quote shown on the homepage testimonials section | Homepage | quote · person name · person role · person avatar · order |
| **Team Member** | Individual care-team profile | Future `/care-team/[slug]` | name · slug · role · photo · bio (Portable Text) · order |
| **FAQ** | Q&A item shown in FAQ blocks | Site-wide FAQ blocks | question · answer (Portable Text) · category · order |

Homepage hero and landing copy live in code, not in the CMS.

### What the SEO team controls per Blog Post (full SEO block)

The reusable **SEO** object embedded inside `post` exposes:

- `metaTitle` (≤ 70 chars warning) → `<title>` + Google snippet
- `metaDescription` (≤ 170 chars warning) → meta description
- `canonicalUrl` (override) → only set when this page should point search engines elsewhere
- `ogTitle`, `ogDescription`, `ogImage` (with alt) → social sharing card
- `noIndex` (boolean) → adds `noindex/nofollow` for that page once the site-wide pre-launch block is removed
- `keywords` (array of strings) → internal SEO taxonomy (not rendered on the page)

Falls back to: `metaTitle → title`, `metaDescription → excerpt → subtitle`, `ogImage → coverImage`, `ogTitle → metaTitle → title`.

---

## 3. SEO — already implemented (developer-managed)

- **Server-side rendering** — every public page ships full HTML to crawlers
- **Next Metadata API** — every page exports `title`, `description`, OpenGraph, canonical
- **`robots.txt`** — currently **blocks ALL paths for ALL crawlers** (pre-launch, see §6)
- **`sitemap.xml`** — auto-generated from `src/app/sitemap.ts`; static routes today, dynamic Blog Post entries to be added when `/blog` route ships
- **Page performance** — LCP-optimised hero, font preloading with `display: swap`, Vercel edge caching
- **Schema markup (JSON-LD)** — pending; `Article` and `Organization` markup will be added when `/blog` ships

## 4. SEO — controlled via Sanity (now live on Blog Post)

What the SEO team can edit without a developer:

- Page title and meta description
- OpenGraph title, description, image
- Canonical URL override
- noindex toggle per page
- Keyword tags (internal)
- Slug (Blog Post and Team Member)
- Image alt text — **required** on every image upload now

## 5. SEO — still developer-controlled

These remain in code (page-level metadata for marketing routes that aren't CMS-backed):

- `/`, `/how-it-works`, `/pathways`, `/pathways/metabolic`, `/pathways/gi`, `/pathways/continuity`, `/virtual-clinic`, `/research-lab`, `/contact`, `/faq`, `/team`, `/assessment`
- Site-wide defaults in `src/app/layout.tsx`

To change copy, OG image, or canonical on those pages, file a request with the dev team.

---

## 6. Pre-launch noindex (THREE LAYERS — keep in sync)

The site is **fully blocked from search engines** until launch via three independent layers:

1. **`src/app/robots.ts`** — `Disallow: /` for `*` (no Allow rules, no sitemap directive)
2. **`next.config.ts` headers()** — `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex` on every response
3. **`src/app/layout.tsx` metadata** — `robots: { index: false, follow: false, googleBot: { index: false, follow: false } }`

**At launch, all three layers must be removed together.** See [`launch-checklist.md`](./launch-checklist.md).

The per-page `seo.noIndex` toggle in Sanity only takes effect AFTER the global block is removed.

---

## 7. URL structure

| Path | Source | Indexable? (after launch) |
|---|---|---|
| `/` | Code | yes |
| `/how-it-works` | Code | yes |
| `/pathways`, `/pathways/{metabolic\|gi\|continuity}` | Code | yes |
| `/virtual-clinic` | Code | yes |
| `/research-lab` | Code | yes |
| `/team` | Code (will be CMS-backed) | yes |
| `/care-team/{slug}` | Sanity (Team Member) — route pending | yes |
| `/contact` | Code | yes |
| `/faq` | Code (will pull from CMS) | yes |
| `/media` | Sanity (Media Mention list) | yes |
| `/blog` | Sanity (Post list) — route pending | yes |
| `/blog/{slug}` | Sanity (Post) — route pending | yes (per `seo.noIndex`) |
| `/assessment` | Code (client-only React app) | yes |
| `/studio*`, `/api/*` | Code | **noindex** (always) |

There is **no `/media/{slug}` detail page** — Media Mention cards link directly to the publication's external article URL in a new tab.

See [`url-structure.md`](./url-structure.md) for the full canonical URL strategy.

---

## 8. Pending work (visible to the SEO team)

| Item | Owner | Status |
|---|---|---|
| `/blog` listing route | Dev | Pending |
| `/blog/{slug}` detail route | Dev | Pending |
| JSON-LD `Article` structured data on blog posts | Dev | Pending |
| `/care-team/{slug}` route + wiring `/team` to Sanity | Dev | Pending |
| `/faq` page wired to Sanity | Dev | Pending |
| Sitemap dynamic Blog Post entries | Dev | Pending |
| Sanity Visual Editing / preview / draft mode | Dev | Pending |
| Remove pre-launch noindex block | Dev | At launch |
| Submit sitemap to Google Search Console | SEO | At launch |

---

## 9. Recommendations

- **301 redirects** — when content moves (e.g. `/old-page` → `/new-page`), file a request; redirects live in `next.config.ts`.
- **Image alt text** — never leave it blank. Schemas now require it for every cover, OG image, and outlet logo.
- **Slugs** — keep them stable. Renaming a published Blog Post slug breaks inbound links and resets accumulated SEO.
- **Canonical override** — only use it when re-publishing existing third-party content; leave blank otherwise so the default canonical (`/blog/{slug}`) is used.
- **OG image** — ship a dedicated 1200×630 OG image for every post. The `coverImage` fallback works, but a tailored OG image converts better on social.

