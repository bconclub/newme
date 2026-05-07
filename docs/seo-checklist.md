# SEO Checklist (per content type)

> Tick every box before clicking **Publish**. Future-you and the SEO scorecard will thank you.

---

## Blog Post

### Content tab
- [ ] **Title** is the on-page H1, written for humans first. Includes the primary keyword naturally.
- [ ] **Slug** is short, lowercase, hyphenated, descriptive. **Never edit after publish.**
- [ ] **Subtitle** is a 1–2 sentence lead that complements (doesn't repeat) the title.
- [ ] **Excerpt** is a unique 1-paragraph summary used on the listing card. Different angle from `subtitle` if possible.
- [ ] **Cover image** is at least 1600×900, 16:9, weighs < 250 KB after compression. **Alt text fills in.**
- [ ] **Author** is set.
- [ ] **Published at** is set to today (or backdated for archived content).
- [ ] **Body** has at least one `H2` (a section heading) — Google needs structure.
- [ ] **Internal links** — at least 1 link to another `/blog/{slug}` or marketing page.
- [ ] **External links** to authoritative sources where claims are made.
- [ ] **Tags** — 3–5 relevant tags from your taxonomy.

### SEO & sharing tab
- [ ] **Meta title** — 50–60 chars, primary keyword near the start, brand suffix optional.
- [ ] **Meta description** — 140–160 chars, includes primary keyword + clear benefit + soft CTA.
- [ ] **Canonical URL override** — left **blank** (uses default `/blog/{slug}` canonical) unless this is republished from elsewhere.
- [ ] **OG title** — punchier social headline (≤ 95 chars).
- [ ] **OG description** — conversational summary (≤ 200 chars).
- [ ] **OG image** — dedicated 1200×630 image with brand styling (don't reuse cover unless it works at that ratio). **Alt text fills in.**
- [ ] **Hide from search engines** is **OFF** (unless intentionally unlisted).
- [ ] **Keyword tags** — 1 primary + 2–3 secondary keywords.

### Pre-publish smoke test
- [ ] Open the post in a draft preview (when available) on **mobile** + **desktop**.
- [ ] Run the meta title through a SERP preview tool to confirm it's not truncated.
- [ ] Verify the cover image isn't pixelated when scaled up.

---

## Media Mention

A press feature card on `/media` linking out to an external article.

- [ ] **Article headline** is the exact headline used by the publication.
- [ ] **Outlet** is selected — and if it's a new publication, you've added a Media Outlet record (with logo + alt) FIRST.
- [ ] **Cover image** is 16:9, minimum 1200×675, with **alt text describing the image** (not just the publication name).
- [ ] **External article URL** opens correctly in a fresh browser (test in incognito to bypass paywalls / personalisation).
- [ ] **Published at** matches the publication's stated date.
- [ ] **Excerpt** (optional) is a tight 1-sentence summary, not the full article opener.

Mentions don't have an SEO block — they don't have an in-site detail page to optimise.

---

## Media Outlet

Reusable publication record. Fill in once.

- [ ] **Outlet name** is the brand-correct casing ("The Hindu", not "the hindu").
- [ ] **Slug** auto-generates fine.
- [ ] **Logo** is a transparent PNG/SVG, square crop or close to it, at least 256×256.
- [ ] **Logo alt text** is the outlet name (e.g. "Forbes logo").
- [ ] **Website** (optional) — homepage URL, not an article URL.

---

## Author

- [ ] **Name** — spelled correctly.
- [ ] **Slug** auto-generates fine.
- [ ] **Role** — "Gastroenterologist", "Founder", etc.
- [ ] **Avatar** — square headshot, ≥ 256×256.
- [ ] **Bio** — 2–3 sentence professional bio.

---

## Testimonial

- [ ] **Quote** — verbatim from the customer, edited only for grammar/typos.
- [ ] **Person name** + **Person role** filled.
- [ ] **Person avatar** uploaded (or omitted entirely — never use a placeholder).
- [ ] **Order** set deliberately (10 / 20 / 30 — leave gaps so you can insert later).

---

## Team Member

- [ ] **Name**, **Slug**, **Role** filled.
- [ ] **Photo** is a professional square crop, ≥ 512×512.
- [ ] **Bio** uses paragraph breaks; no wall of text.
- [ ] **Order** is deliberate.

---

## FAQ

- [ ] **Question** is phrased the way a real user would ask it (Google likes natural questions).
- [ ] **Answer** is a short, direct first sentence (rich-result snippet bait), then expanded if needed.
- [ ] **Category** is set so the FAQ groups correctly on the page.
- [ ] **Order** is set within the category.

---

## Quarterly audit (recurring)

- [ ] All Blog Posts have unique meta titles + descriptions.
- [ ] No two posts share an identical OG image.
- [ ] All cover/OG images have alt text (no `alt=""`).
- [ ] Slugs are stable — no rename history.
- [ ] Sitemap submitted to Google Search Console reflects current Post + Mention counts.
- [ ] No broken external URLs on Media Mentions (external publications occasionally re-org their site).
