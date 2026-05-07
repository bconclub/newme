# URL Structure

> Every public URL on the site, where it comes from, how it's indexed, and how it appears in the sitemap.

---

## Public routes

| URL | Source | Indexable? (post-launch) | In sitemap |
|---|---|---|---|
| `/` | Code | yes | yes |
| `/how-it-works` | Code | yes | yes |
| `/pathways` | Code | yes | yes |
| `/pathways/metabolic` | Code | yes | yes |
| `/pathways/gi` | Code | yes | yes |
| `/pathways/continuity` | Code | yes | yes |
| `/virtual-clinic` | Code | yes | yes |
| `/research-lab` | Code | yes | yes |
| `/team` | Code | yes | yes |
| `/care-team/{slug}` | Sanity (`teamMember`) — *route in progress* | yes | yes (when live) |
| `/contact` | Code | yes | yes |
| `/faq` | Code (will pull from Sanity) | yes | yes |
| `/blog` | Sanity (`post` listing) — *route in progress* | yes | yes (when live) |
| `/blog/{slug}` | Sanity (`post`) — *route in progress* | yes (per `seo.noIndex`) | yes (when live) |
| `/media` | Sanity (`mediaMention` listing) | yes | yes |
| `/assessment` | Code (client-only React app) | yes | no — interactive funnel, not content |

There is **no `/media/{slug}` detail page** — Media Mention cards open the publication's `externalUrl` in a new tab.

## Non-public routes (always noindex)

| URL | Purpose |
|---|---|
| `/studio*` | Sanity Studio mount |
| `/api/*` | Internal API routes |

---

## Canonical URL rules

The canonical URL tells Google "this is the master version of this page."

| Page | Canonical |
|---|---|
| Static marketing pages | The page's own URL (`/pathways`, etc.) |
| `/blog/{slug}` | `/blog/{slug}` by default. Editor can override per-post via `seo.canonicalUrl`. |
| `/media` | `/media` |

**When to set `seo.canonicalUrl` override:**

- Republishing third-party content with the publisher's permission → set the canonical to the original URL.
- Otherwise, leave it blank.

---

## Slug rules

Slugs are part of the URL and are user-visible. Keep them stable.

- **Lowercase**, **hyphenated**, no spaces, no underscores.
- **Descriptive** but **short** — under 60 characters.
- **Stable** — once a Blog Post or Team Member is published, do **not** rename the slug. If you must move content, file a request for a 301 redirect.
- Sanity auto-generates slugs from the `title` field; click "Generate" to refresh while the post is still in draft.

Examples:

| ✓ Good slug | ✗ Bad slug |
|---|---|
| `seven-habits-block-weight-loss` | `Seven_Habits_That_Block_Weight_Loss_FINAL_v3` |
| `dr-pal-stress-management` | `dr-pal-stress-management-habits-for-working-professionals-and-everyone-else` |
| `gut-brain-axis-explained` | `the-gut-brain-axis-explained-by-dr-pal-2026` |

---

## Sitemap

Generated automatically by `src/app/sitemap.ts` and exposed at `/sitemap.xml`.

- Lists every public marketing route.
- Will list every published `/blog/{slug}` once the route ships (dynamic GROQ query inside `sitemap.ts`).
- Updates on every deploy + on revalidate (60s default for CMS-backed lists).
- **Not advertised in `robots.txt`** during the pre-launch block — see `launch-checklist.md`.

`changefreq` and `priority` are set per route inside `sitemap.ts`. Default values:
- Home: `priority: 1.0`, `changefreq: weekly`
- Marketing routes: `priority: 0.8`, `changefreq: monthly`
- Blog Posts: `priority: 0.7`, `changefreq: weekly`
- Media listing: `priority: 0.6`, `changefreq: weekly`

---

## Trailing slashes

Next.js does **not** redirect trailing-slash variants by default. The canonical form is **without** trailing slash:

- ✓ `https://newme.health/blog/post-slug`
- ✗ `https://newme.health/blog/post-slug/`

If you see external links pointing to the trailing-slash form, file a redirect request.

---

## Redirects

Redirects live in `next.config.ts` under `async redirects()`. To add one:

1. File a request with the dev team — include the **old URL**, **new URL**, and whether it's permanent (`permanent: true`, 308) or temporary (`permanent: false`, 307).
2. Test on a preview deploy.
3. Verify in production after deploy.

301/308 redirects pass roughly 95% of SEO authority — use them when content moves, not when content is deleted (delete = 404 or `noindex`).

---

## URL parameter conventions

Avoid query-string-driven content where possible (Google treats `/blog?id=42` and `/blog?id=42&utm=x` as separate URLs).

- **Tracking**: UTM params are fine — they're stripped by canonical.
- **Filtering**: Use static routes when possible (`/blog/category/gut-health`) over `/blog?cat=gut-health`.
