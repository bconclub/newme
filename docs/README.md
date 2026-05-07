# NewME — Documentation

Project: **Dr. Pal's NewME** marketing site & clinical assessment app.
Stack: Next.js 16 · React 19 · Tailwind v4 · Sanity CMS · Vercel.

This folder is the source of truth for **everyone who is not writing code on the site** — the SEO team, content team, marketing, and anyone who needs to publish or audit content without opening the codebase.

---

## Documents

| Doc | Audience | What it answers |
|---|---|---|
| [`handoff-seo-team.md`](./handoff-seo-team.md) | SEO + Marketing leads | What's editable, what the developer controls, what's still pending. Replaces the v1 handoff PDF. |
| [`sanity-schemas.md`](./sanity-schemas.md) | Content editors + SEO | Every Sanity schema field-by-field — what it does, what to fill in, where it appears on the live site. |
| [`content-workflow.md`](./content-workflow.md) | Content editors | Step-by-step: how to log into Studio, create a Blog Post / Media Mention / Outlet, preview, publish. |
| [`seo-checklist.md`](./seo-checklist.md) | SEO team | Per-page-type checklist — "before publishing a Blog Post, fill in these N fields." |
| [`image-guidelines.md`](./image-guidelines.md) | Content + design | Image dimensions, alt-text rules, file format. |
| [`url-structure.md`](./url-structure.md) | SEO + dev | All site URLs, how each is generated, sitemap behaviour, canonical rules. |
| [`launch-checklist.md`](./launch-checklist.md) | Launch coordinator | Everything that must happen the day we go live (remove noindex, submit sitemap to Google, switch DNS, etc.). |
| [`env-vars.md`](./env-vars.md) | Dev + DevOps | Every env var the site reads, what to set on Vercel, and the assessment backend contract (15 endpoints + CORS). |
| [`image-manifest.md`](./image-manifest.md) | Content + dev | Inventory of every image in /public — paths, sizes, which page uses it, and which assets need compressing. |

---

## Quick links

- **Studio:** `https://newme.health/studio` (production) · `http://localhost:3000/studio` (dev)
- **Code repo:** `https://github.com/bconclub/newme`
- **Hosting:** Vercel (auto-deploy from `main`)

## Roles

| Role | Owns | Edits via |
|---|---|---|
| **Developer** | Page layouts, components, route shapes, deployment, schema definitions | Code |
| **SEO team** | Page metadata, OG images, slugs, canonical URLs, keyword tags, noindex flags | Sanity Studio |
| **Content team** | Blog posts, media mentions, team bios, FAQs, testimonials | Sanity Studio |
