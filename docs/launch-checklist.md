# Launch Checklist

> Everything that must happen the day we go live. Treat this as a runbook — work top to bottom.

---

## T-7 days

- [ ] All planned pages reviewed by SEO + Marketing leads.
- [ ] All Blog Posts have full SEO blocks filled in.
- [ ] All cover/OG images compressed and have alt text.
- [ ] Media Mentions populated for top 6–10 press features.
- [ ] Final Lighthouse pass (Performance, Accessibility, Best Practices, SEO ≥ 90 each on home + a sample blog post).
- [ ] Cross-browser smoke test: latest Chrome, Safari, Firefox, Edge; iOS Safari + Android Chrome.
- [ ] DNS planned with hosting + DNS provider — production domain pointing to Vercel.
- [ ] Google Search Console + Bing Webmaster Tools properties claimed.
- [ ] Google Analytics 4 (or chosen analytics) wired up on a feature branch — confirm events fire on staging.

---

## T-1 day

- [ ] Final content review and freeze.
- [ ] Confirm all DNS records (A / CNAME) are correct and TTL is low (300s) for an easy rollback window.
- [ ] Backup current Sanity dataset (`sanity dataset export production backup-pre-launch.tar.gz`).
- [ ] Tag release: `git tag v1.0.0 && git push --tags`.

---

## Launch day — remove the noindex block

The site is currently blocked from indexing on three layers. **All three must be removed in the same commit + deploy.**

### 1. `src/app/robots.ts`

Replace the current "disallow everything" rule with normal rules:

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/studio', '/admin'] },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://newme.health'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://newme.health',
  }
}
```

### 2. `next.config.ts`

Delete the `headers()` block that ships `X-Robots-Tag: noindex`.

### 3. `src/app/layout.tsx`

In `metadata`, remove:

```ts
robots: {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
},
```

— or change to `{ index: true, follow: true }` if you prefer to be explicit.

### 4. Verify

After the deploy lands:

- [ ] `curl -I https://newme.health/` → no `X-Robots-Tag` header
- [ ] `curl https://newme.health/robots.txt` → shows `Allow: /` for `*` and the `Sitemap:` line
- [ ] View page source on `/` → no `<meta name="robots" content="noindex">`
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) passes on home + a Blog Post
- [ ] [URL Inspection in GSC](https://search.google.com/search-console) on home → "URL is available to Google"

---

## Launch day — submit + monitor

- [ ] Submit `https://newme.health/sitemap.xml` to Google Search Console (Sitemaps section).
- [ ] Submit to Bing Webmaster Tools.
- [ ] Request indexing for the home page in GSC URL Inspection.
- [ ] Switch analytics from staging → production property if it was branched.
- [ ] Verify GA4 / event tracker is firing on production.
- [ ] Post-launch: tail Vercel logs for 30 minutes → no 5xx errors.
- [ ] Post-launch: scan first 50 lines of access logs for any 404s on what should be valid routes.

---

## Week 1 post-launch

- [ ] Search Console: confirm sitemap is being processed (status "Success").
- [ ] Search Console: check Coverage report — confirm no unexpected exclusions.
- [ ] Run `site:newme.health` in Google after 48 hours — confirm pages start appearing.
- [ ] Verify OG previews on Twitter Card Validator and Facebook Sharing Debugger for 2–3 representative pages.
- [ ] Lighthouse re-run on production → confirm scores held.

---

## Things that should NOT change at launch

- Slugs of any published Blog Post or Team Member — keep them as-is forever (or 301 if you must move).
- Cover image filenames in Sanity — they don't affect SEO; don't waste time renaming.
- The Studio URL `/studio` — keep it noindex'd permanently (it's the editor surface, not a public page).

---

## Rollback plan

If post-launch metrics tank or a critical bug ships:

1. Revert the launch commit on `main` and push — Vercel redeploys instantly.
2. Lower DNS TTL stays at 300s for the first week, so a DNS flip back to a safe target is fast if needed.
3. Sanity dataset backup (taken T-1) can be restored with `sanity dataset import backup-pre-launch.tar.gz production --replace`.
4. Communicate via the launch channel — don't silently revert.

---

## Long-term maintenance

- Quarterly: run the SEO audit checklist (`docs/seo-checklist.md` → Quarterly audit section).
- Quarterly: audit external URLs on Media Mentions — publications occasionally re-org their site and produce 404s.
- Annually: re-export the Sanity dataset as a backup before any major schema change.
