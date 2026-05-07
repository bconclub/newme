# Sanity Schemas — Field Reference

> Every field in every schema, what it does, and where it surfaces on the live site. Treat this as the dictionary the SEO and content team can search when filling in CMS forms.

Schema files live at: `sanity/schemas/<name>.ts`

| Schema | File | Type | Document or Object |
|---|---|---|---|
| `seo` | `seo.ts` | Object (reusable) | Embedded inside `post` |
| `mediaMention` | `mediaMention.ts` | Document | Standalone |
| `mediaOutlet` | `mediaOutlet.ts` | Document | Standalone |
| `post` | `post.ts` | Document | Standalone |
| `author` | `author.ts` | Document | Standalone |
| `testimonial` | `testimonial.ts` | Document | Standalone |
| `teamMember` | `teamMember.ts` | Document | Standalone |
| `faq` | `faq.ts` | Document | Standalone |
| `redirect` | `redirect.ts` | Document | Standalone |

---

## `seo` — reusable SEO + social sharing block

Embedded inside `post`. Every Blog Post has its own SEO block.

| Field | Type | Required? | Where it shows |
|---|---|---|---|
| `metaTitle` | string (≤ 70 chars warn) | optional | `<title>` tag · Google search snippet · browser tab. Falls back to `post.title`. |
| `metaDescription` | text (≤ 170 chars warn) | optional | `<meta name="description">` · Google snippet description. Falls back to `post.excerpt` → `post.subtitle`. |
| `canonicalUrl` | url | optional | `<link rel="canonical">` override. Leave **blank** for the default `/blog/{slug}` canonical. Only set when this page should point search engines to a different URL (e.g. re-publishing third-party content). |
| `ogTitle` | string (≤ 95 chars warn) | optional | `og:title` · Twitter card title. Falls back to `metaTitle` → `title`. |
| `ogDescription` | text (≤ 200 chars warn) | optional | `og:description` · Twitter card description. Falls back to `metaDescription`. |
| `ogImage` | image (with `alt`) | optional | `og:image` · Twitter card image. **Recommended 1200×630.** Falls back to `coverImage`. |
| `noIndex` | boolean (default: false) | optional | When `true`, sets `<meta name="robots" content="noindex,nofollow">`. **Only effective once the site-wide pre-launch block is removed.** |
| `keywords` | array of strings (tags layout) | optional | Internal SEO taxonomy. Not rendered on the page. Use for grouping/reporting. |

---

## `mediaMention` — Media Mention

Brand mention / press feature. Renders as a card on `/media`. **Card click opens the external article URL in a new tab.** No in-site detail page.

| Field | Type | Required? | What it does |
|---|---|---|---|
| `title` | string | ✓ | Headline of the press article — shown on the card. |
| `outlet` | reference → `mediaOutlet` | ✓ | The publication. **Add new outlets in Studio first** (Content → Media Outlet). |
| `coverImage` | image (with `alt` required) | ✓ | Card cover. Recommended 16:9, minimum **1200×675**. |
| `externalUrl` | url (`http`/`https`) | ✓ | Where the card click takes the user. Must be the live URL of the article on the publication's site. |
| `publishedAt` | date | ✓ | Used to order `/media` newest-first. |
| `excerpt` | text (1–2 sentences) | optional | Teaser shown under the headline on the card. |

---

## `mediaOutlet` — Media Outlet

Reusable record for a publication. Add a new outlet **once**, then reference it from many `mediaMention` documents.

| Field | Type | Required? | What it does |
|---|---|---|---|
| `name` | string | ✓ | Display name shown next to the logo on `/media` cards (e.g. "Forbes"). |
| `slug` | slug (auto from name) | ✓ | Internal sorting/grouping. Not shown to readers. |
| `logo` | image (with `alt` required) | ✓ | Outlet brand logo. Prefer a transparent PNG/SVG. |
| `website` | url | optional | Publication's homepage. NOT the article URL — that goes on the Media Mention. |

---

## `post` — Blog Post

Long-form authored content. Rendered at `/blog/{slug}` *(route pending)*. Has full SEO controls.

Fields are organised into three inline **fieldsets** that the editor can collapse/expand: **Editorial structure**, **Body**, and **SEO & social sharing**. Top-level required fields sit above the fieldsets.

### Top-level fields

| Field | Type | Required? | What it does |
|---|---|---|---|
| `title` | string | ✓ | Post title. |
| `slug` | slug (auto from title, ≤ 96 chars) | ✓ | URL — `/blog/{slug}`. **Do not rename after publishing** (breaks links). |
| `subtitle` | text | optional | Lead paragraph under the title. Used as fallback for `metaDescription`. |
| `excerpt` | text | optional | Short summary on the `/blog` listing card. |
| `coverImage` | image (with `alt` required) | ✓ | Hero at top of post + listing card image. Recommended 16:9, **minimum 1600×900**. |
| `author` | reference → `author` | ✓ | Person who wrote the post. |
| `publishedAt` | datetime | ✓ | Publish date — drives sort order on `/blog`. |
| `city` | string | optional | Location tag (e.g. "Bangalore"). |
| `tags` | array of strings (tags layout) | optional | Topic tags. |

### Editorial structure fieldset (optional)

| Field | Type | Required? | What it does |
|---|---|---|---|
| `intro` | array of paragraphs | optional | Opening paragraphs before the main body. |
| `sectionTitle` | string | optional | Heading shown above the numbered list (e.g. "Five things to try"). |
| `sectionLead` | text | optional | Paragraph between the section heading and numbered list. |
| `habits` | array of `{num, title, body}` | optional | Numbered list block — habits, steps, tips. Each item has its own number, title, and body. |

### Body fieldset (optional)

| Field | Type | Required? | What it does |
|---|---|---|---|
| `body` | Portable Text (rich text + inline images) | optional | Free-form rich text. Use this when the structured intro/section/habits layout doesn't fit. |
| `disclaimer` | text | optional | Note shown at the bottom of the post (medical disclaimer, etc.). |

### SEO & social sharing fieldset

These fields appear flat inside the SEO fieldset — no extra clicks. Each falls back sensibly when blank, so a Blog Post is never SEO-broken even if the editor leaves them all empty.

| Field | Type | Required? | Where it shows |
|---|---|---|---|
| `metaTitle` | string (≤ 70 chars warn) | optional | `<title>` · Google snippet · browser tab. Falls back to `post.title`. |
| `metaDescription` | text (≤ 170 chars warn) | optional | `<meta name="description">`. Falls back to `excerpt` → `subtitle`. |
| `canonicalUrl` | url | optional | `<link rel="canonical">` override. Leave **blank** for the default `/blog/{slug}` canonical. |
| `ogTitle` | string (≤ 95 chars warn) | optional | `og:title`. Falls back to `metaTitle` → `title`. |
| `ogDescription` | text (≤ 200 chars warn) | optional | `og:description`. Falls back to `metaDescription`. |
| `ogImage` | image (with `alt`) | optional | `og:image`. Recommended 1200×630. Falls back to `coverImage`. |
| `noIndex` | boolean (default `false`) | optional | When `true`, sets `<meta name="robots" content="noindex,nofollow">`. Only effective once the site-wide pre-launch block is removed. |
| `keywords` | array of strings (tags layout) | optional | Internal SEO taxonomy. Not rendered on the page. |

---

## `author`

| Field | Type | Required? | What it does |
|---|---|---|---|
| `name` | string | ✓ | Display name. |
| `slug` | slug | ✓ | Reserved for future `/authors/{slug}` archive page. |
| `role` | string | optional | "Gastroenterologist", "Lifestyle Editor", etc. |
| `avatar` | image | optional | Profile photo — appears on Blog Post pages. |
| `bio` | text (4 rows) | optional | Short author bio. |

---

## `testimonial`

| Field | Type | Required? | What it does |
|---|---|---|---|
| `quote` | text | ✓ | The testimonial copy. |
| `personName` | string | ✓ | |
| `personRole` | string | optional | Where the person is in their NewMe journey. |
| `personAvatar` | image | optional | Photo for the testimonial card. |
| `order` | number | optional (default 0) | Lower numbers appear first on the homepage. |

---

## `teamMember`

| Field | Type | Required? | What it does |
|---|---|---|---|
| `name` | string | ✓ | |
| `slug` | slug | ✓ | URL — future `/care-team/{slug}`. |
| `role` | string | optional | Job title. |
| `photo` | image | optional | Profile photo. |
| `bio` | Portable Text | optional | Rich text bio (paragraphs, links, lists). |
| `order` | number | optional | Sort order on the team grid. |

---

## `faq`

| Field | Type | Required? | What it does |
|---|---|---|---|
| `question` | string | ✓ | The question. |
| `answer` | Portable Text | ✓ | The answer. Supports paragraphs, links, lists. |
| `category` | string (dropdown: general, pricing, care, privacy) | optional | Used to group FAQs into sections. |
| `order` | number | optional | Sort order within a category. |

---

## `redirect`

CMS-driven URL redirect. Used by the Next.js middleware to issue 308 (permanent) or 307 (temporary) redirects on incoming requests. Live within ~60 s of publishing — no deploy required.

| Field | Type | Required? | What it does |
|---|---|---|---|
| `source` | string | ✓ | Old / source path. Must start with `/`. Strip query strings — match the path only. e.g. `/old-blog/post-name`, `/services/legacy-page`. |
| `destination` | string | ✓ | Where the request should go. Either a relative path on this site (`/blog/new-post`) or a full external URL (`https://example.com/page`). |
| `permanent` | boolean (default `true`) | ✓ | **ON** → 308 Permanent Redirect — passes ~95% of SEO authority. Use when the page has moved for good. **OFF** → 307 Temporary Redirect — does NOT transfer SEO authority. Use only for short-term redirects. |
| `enabled` | boolean (default `true`) | ✓ | Quick toggle. Disabled redirects are ignored without losing the record. |
| `note` | text | optional | Internal note about why this redirect exists. |

### Behaviour

- Query strings on the incoming request are **preserved** and appended to the destination (unless the destination already has a query string).
- Trailing slashes are normalised — `/foo` and `/foo/` both match a redirect with `source: "/foo"`.
- The redirect table is fetched once per ~60 s per edge node from Sanity's CDN. Newly published redirects take effect within that window.
- Self-redirects (where `destination === source`) are blocked at the schema level and ignored at runtime as a defensive backstop.

