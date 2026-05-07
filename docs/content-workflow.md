# Content Workflow

> Step-by-step guide for the SEO/content team. No code involved.

---

## 1. Logging in

1. Open `https://newme.health/studio` (production) or `http://localhost:3000/studio` (local dev).
2. Sign in with the Google/email account that's been added to the Sanity project as **Editor**.
3. If you can't log in, the developer needs to add you at `https://sanity.io/manage` → Members → Invite.

---

## 2. Studio overview

The left sidebar lists every content type. Order:

1. **Media Mention** — press features
2. **Media Outlet** — publication records (logos, names)
3. **Blog Post** — long-form authored content
4. **Author** — people who write blog posts
5. **Testimonial** — homepage testimonials
6. **Team Member** — care-team profiles
7. **FAQ** — Q&A items

---

## 3. Add a Media Mention (press feature)

A "Media Mention" is a card on `/media` that links out to an external publication. There is **no in-site detail page** — clicking the card opens the publication's URL in a new tab.

**Step 1 — Make sure the outlet exists.**
Go to **Media Outlet** in the sidebar. If "Forbes" / "The Hindu" / etc. isn't there yet:
1. Click **+ Create new Media Outlet**.
2. Fill in: **Outlet name**, **Logo** (transparent PNG/SVG preferred), **Logo alt text** (usually "*Outlet name* logo"), and optionally the publication's homepage URL.
3. Click **Publish**.

**Step 2 — Create the mention.**
Go to **Media Mention** → **+ Create new Media Mention**:
| Field | What to enter |
|---|---|
| Article headline | The exact headline of the press article |
| Outlet | Pick the outlet you created (or an existing one) |
| Cover image | Upload the article's cover image (16:9, min 1200×675) and write **alt text** describing the image |
| External article URL | Full `https://…` URL of the article on the publication's site |
| Published at | The date the article was published |
| Excerpt (optional) | 1–2 sentence teaser shown under the headline |

Click **Publish**. The card will appear on `/media` within 60 seconds (cached listing revalidates every minute).

---

## 4. Write a Blog Post

Go to **Blog Post** → **+ Create new Blog Post**.

The form is split into two tabs at the top: **Content** and **SEO & sharing**.

### Content tab

1. **Title** — the post title.
2. **Slug** — auto-generated from the title. Click **Generate** to refresh it. **Do not edit a published post's slug** — you break inbound links and reset its SEO.
3. **Subtitle** — short lead paragraph under the title. Also serves as the fallback meta description.
4. **Excerpt** — short summary used on the `/blog` listing card.
5. **Cover image** — main hero. **16:9, minimum 1600×900.** Always fill in **Alt text**.
6. **Author** — pick the author. If they don't exist yet, create them under **Author** first.
7. **Published at** — date the post should appear publicly.
8. **City** *(optional)* — location tag.
9. **Intro paragraphs** — opening paragraphs before the main body. Add as many as needed.
10. **Section heading** *(optional)* — heading above the numbered list block (e.g. "Five things to try").
11. **Section lead** *(optional)* — paragraph between the section heading and the numbered list.
12. **Numbered list** *(optional)* — habits / steps / tips. Each entry has a number ("01", "02"), a title, and a body paragraph.
13. **Body (rich text)** *(optional)* — free-form body. Use this when the structured intro / section / habits layout doesn't fit.
14. **Disclaimer** *(optional)* — small print at the end of the post.
15. **Tags** — topic tags (e.g. `metabolic`, `gut-health`).

### SEO & sharing tab

| Field | Recommendation |
|---|---|
| **Meta title** | Best version of the title for Google. Aim for **50–60 chars**. Include the primary keyword. |
| **Meta description** | Compelling 140–160 char summary. Include keyword + clear benefit. |
| **Canonical URL override** | Leave blank unless you're republishing third-party content. |
| **OG title** | Shorter, punchier version for social shares (≤ 95 chars). |
| **OG description** | Conversational version for social shares (≤ 200 chars). |
| **OG image** | Upload a **dedicated 1200×630 image** for social sharing. Falls back to the cover image but a tailored OG image converts better. **Always fill in alt text.** |
| **Hide from search engines** | Leave OFF unless the post is intentionally unlisted. |
| **Keyword tags** | Internal taxonomy — primary keyword + 2–3 related terms. Not shown on the page. |

Click **Publish**. The post appears at `/blog/{slug}` within 60 seconds.

See [`seo-checklist.md`](./seo-checklist.md) for the full pre-publish checklist.

---

## 5. Add an Author

**Author** → **+ Create new Author**:
| Field | What to enter |
|---|---|
| Name | Full name |
| Slug | auto-generated |
| Role | "Gastroenterologist", "Lifestyle Editor", etc. |
| Avatar | Profile photo, square crop |
| Bio | Short author bio (3–4 lines) |

---

## 6. Add a Testimonial

**Testimonial** → **+ Create new Testimonial**:
| Field | What to enter |
|---|---|
| Quote | The testimonial copy |
| Person name | |
| Person role | "Reset cohort, 6 months" — where they are in the NewME journey |
| Person avatar | Profile photo |
| Order | Lower numbers appear first on the homepage. Use 10, 20, 30 so you can insert in between later. |

---

## 7. Add a Team Member

**Team Member** → **+ Create new Team Member**:
| Field | What to enter |
|---|---|
| Name | |
| Slug | auto-generated |
| Role | Job title |
| Photo | Profile photo |
| Bio | Rich text — supports paragraphs, links, lists |
| Order | Display order on the team grid |

---

## 8. Add a Redirect

When migrating from a previous website, or when content moves on this site, add a redirect so old URLs still land somewhere useful.

**Site → Redirects → + Create new Redirect**:

| Field | What to enter |
|---|---|
| **Old / source path** | The path on the previous site you want to redirect. Must start with `/`. Examples: `/old-blog/post-name`, `/services/legacy-page`, `/contact-us`. Don't include query strings. |
| **New destination** | Where to send the user. Either a relative path on this site (e.g. `/blog/new-post`) or a full external URL (`https://newme.health/something`). |
| **Permanent (301 / 308)** | **ON** for content that has moved for good (passes ~95% of SEO authority). **OFF** only for short-term temporary redirects. Default ON. |
| **Enabled** | Default ON. Toggle OFF to disable a redirect without deleting it. |
| **Internal note** | Why this redirect exists. Examples: "Migrated from old WordPress site", "Renamed slug from launch-2024 to gut-microbiome-explained". |

Click **Publish**. The redirect takes effect within ~60 seconds (the middleware re-fetches the redirect table from Sanity at most once a minute per edge node).

### Important rules

- **Source must be a path on the new site's domain.** e.g. if your old site was `oldsite.com/foo`, you can only redirect `newme.health/foo` to wherever you want. The DNS for `oldsite.com` is a separate setup.
- **Don't redirect `/`.** The schema blocks this — redirecting the root creates infinite loops.
- **Don't redirect to a page that itself redirects.** Resolve to the final destination directly.
- **301 vs 302** — when in doubt, use **Permanent** (308 / 301). Use Temporary only for things like a "site under maintenance" page.

### Bulk import (developer-assisted)

If you have hundreds of redirects from a CSV migration, export a list with columns `source`, `destination`, `permanent` and ask the dev team to bulk-import them via `sanity dataset import`.

---

## 9. Add an FAQ

**FAQ** → **+ Create new FAQ**:
| Field | What to enter |
|---|---|
| Question | |
| Answer | Rich text — supports paragraphs, links, lists |
| Category | general / pricing / care / privacy |
| Order | Sort order within the category |

---

## 10. Publish, draft, and unpublish

- **Publish** — saves and makes the document live. The site picks up the change within 60 seconds.
- **Save as draft** — stores progress without exposing it on the live site (Sanity creates a `drafts.{id}` shadow document).
- **Unpublish** — removes the document from the live site. Drafts are kept.

---

## 11. Previewing

> **Visual editing / live preview is not yet wired up.** For now, the workflow is:
> 1. Save and Publish in Studio.
> 2. Wait 60 seconds.
> 3. Refresh the live page (`/blog/{slug}`, `/media`, etc.).
>
> Visual Editing with draft preview is on the dev roadmap.

---

## 12. Common pitfalls

| Don't | Why |
|---|---|
| Rename the slug of a published post | Breaks inbound links and Google indexing. Create a new post + add a redirect instead. |
| Skip alt text on cover/OG images | Hurts accessibility and image SEO. The schema requires it for `coverImage` and `outlet.logo`. |
| Publish a Media Outlet without a logo | The card will look broken. Always upload the logo before referencing the outlet from a Mention. |
| Re-use the same `excerpt` and `metaDescription` | Wasted space — Google snippet would benefit from a different angle than the on-page excerpt. |
| Set `canonicalUrl` on a brand-new post | Tells Google to ignore the post. Only set it for republished content. |
| Leave `noIndex: true` on for testing | Easy to forget. Search engines will respect it once the site goes live. |
