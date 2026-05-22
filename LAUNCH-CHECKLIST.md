# NewME — Pre-Launch Checklist
**Target launch date:** 23 May 2026  
**Prepared by:** BCON / Development Team  
**Last updated:** 21 May 2026

Legend: ✅ Done · ⚠️ Action needed · 🔲 To verify · ❌ Not done

---

## 1. SEO & Discoverability

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1.1 | Global meta title | ✅ | "NewME \| Doctor-Led Care, Personalized For Your Body" |
| 1.2 | Global meta description | ✅ | Set in `layout.tsx` |
| 1.3 | Open Graph title + description | ✅ | Configured in `layout.tsx` |
| 1.4 | OG image (1200×630) | ✅ | `/media/Media Hero.webp` |
| 1.5 | Twitter card (`summary_large_image`) | ✅ | Configured |
| 1.6 | Favicon (`.ico` + `.png`) | ✅ | Both formats present |
| 1.7 | `sitemap.xml` | ✅ | Auto-generated via `sitemap.ts`, covers all routes |
| 1.8 | Per-page meta title — `/how-it-works` | ✅ | |
| 1.9 | Per-page meta title — `/virtual-consult` | ✅ | |
| 1.10 | Per-page meta title — `/research-lab` | ✅ | |
| 1.11 | Per-page meta title — `/blogs` | ✅ | |
| 1.12 | Per-page meta title — `/media` | ✅ | |
| 1.13 | Per-page meta title — `/terms`, `/privacy-policy`, `/cookie-policy` | ✅ | |
| 1.14 | Per-page meta title — `/pathways` | ⚠️ | Missing `export const metadata` |
| 1.15 | Per-page meta title — `/pathways/metabolic`, `/gi`, `/continuity` | ⚠️ | Missing `export const metadata` |
| 1.16 | Per-page meta title — `/faq` | ⚠️ | Missing `export const metadata` |
| 1.17 | Per-page meta title — `/team` | ⚠️ | Missing `export const metadata` |
| 1.18 | Per-page meta title — `/contact` | ⚠️ | Missing `export const metadata` |
| 1.19 | Per-page meta title — `/assessment` | ⚠️ | Missing `export const metadata` |
| 1.20 | **Remove noindex before launch** — `layout.tsx` | ⚠️ | `robots: { index: false }` must be flipped |
| 1.21 | **Remove noindex before launch** — `next.config.ts` header | ⚠️ | `X-Robots-Tag: noindex` must be removed |
| 1.22 | **Remove noindex before launch** — `robots.ts` | ⚠️ | Currently `Disallow: /` — must be changed to `Allow: /` |
| 1.23 | Canonical URLs on all pages | ✅ | `metadataBase` set in layout |
| 1.24 | H1 on every page | 🔲 | Verify visually — each page should have exactly one H1 |
| 1.25 | Heading hierarchy (H1 → H2 → H3) | 🔲 | Spot-check in browser DevTools |
| 1.26 | Alt text on all images | ⚠️ | Logo uses `alt=""` (decorative — ok); hero/person images need alt review |
| 1.27 | No `Lorem ipsum` / placeholder copy | ✅ | Build scanned — none found |
| 1.28 | Structured data / JSON-LD | ❌ | Not implemented — `Organization` + `MedicalBusiness` schema recommended |

---

## 2. Performance

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 2.1 | Next.js production build passes | ✅ | No errors or warnings |
| 2.2 | Next.js `<Image>` used for all images | 🔲 | Verify no raw `<img>` tags serving large assets |
| 2.3 | Fonts loaded via `next/font` | ✅ | Bricolage, Urbanist, Poppins — all via `next/font/google` |
| 2.4 | Fonts display `swap` | ✅ | Default behaviour with `next/font` |
| 2.5 | Largest Contentful Paint (LCP) < 2.5s | 🔲 | Run Lighthouse on production URL |
| 2.6 | Cumulative Layout Shift (CLS) < 0.1 | 🔲 | Run Lighthouse |
| 2.7 | Total Blocking Time (TBT) < 200ms | 🔲 | Run Lighthouse |
| 2.8 | Lighthouse Performance score ≥ 85 | 🔲 | Target: mobile ≥ 75, desktop ≥ 90 |
| 2.9 | No unused JavaScript bundles > 100 KB | 🔲 | Check Next.js bundle analyser |
| 2.10 | Images in `.webp` / `.avif` where possible | ✅ | Most images already `.webp` |
| 2.11 | Videos / heavy assets on CDN | 🔲 | Confirm any video assets are not in `/public` directly |

---

## 3. Responsive & Cross-Device

| # | Check | Device / Viewport | Status |
|---|-------|--------------------|--------|
| 3.1 | Home page | iPhone SE — 375×667 | 🔲 |
| 3.2 | Home page | iPhone 14 Pro — 390×844 | 🔲 |
| 3.3 | Home page | iPad — 768×1024 | 🔲 |
| 3.4 | Home page | iPad Pro — 1024×1366 | 🔲 |
| 3.5 | Home page | Desktop — 1440×900 | 🔲 |
| 3.6 | Home page | Wide — 1920×1080 | 🔲 |
| 3.7 | Assessment flow | iPhone 14 Pro | 🔲 |
| 3.8 | Assessment flow | iPad | 🔲 |
| 3.9 | Pathways pages | Mobile + Desktop | 🔲 |
| 3.10 | FAQ page — pill nav on mobile, text on desktop | ✅ | Implemented |
| 3.11 | Footer — newsletter form stacking | ✅ | Fixed |
| 3.12 | Header nav — hamburger menu on mobile | 🔲 | Open/close, all links work |
| 3.13 | Legal pages (Privacy, Terms, Cookie) | Mobile + Desktop | 🔲 |

**Cross-browser matrix:**

| # | Browser | Desktop | Mobile |
|---|---------|---------|--------|
| 3.14 | Chrome (latest) | 🔲 | 🔲 |
| 3.15 | Safari (latest) | 🔲 | 🔲 |
| 3.16 | Firefox (latest) | 🔲 | — |
| 3.17 | Edge (latest) | 🔲 | — |
| 3.18 | Samsung Internet | — | 🔲 |

---

## 4. Security

### 4a. Vercel Platform (provided automatically)

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 4.1 | HTTPS / TLS everywhere | ✅ | Vercel auto-provisions Let's Encrypt SSL, auto-renews |
| 4.2 | HTTP → HTTPS redirect | ✅ | Enforced at Vercel edge — all HTTP requests redirect to HTTPS |
| 4.3 | DDoS protection | ✅ | Vercel Edge Network absorbs volumetric attacks out-of-the-box |
| 4.4 | Global CDN / edge caching | ✅ | Pages served from Vercel's global edge network |
| 4.5 | Automatic GZIP / Brotli compression | ✅ | Handled by Vercel |
| 4.6 | Uptime SLA | ✅ | Vercel guarantees 99.99% uptime on Pro/Enterprise |

### 4b. HTTP Security Headers (must add to `next.config.ts`)

| # | Header | Status | Risk if missing |
|---|--------|--------|-----------------|
| 4.7 | `Strict-Transport-Security` (HSTS) | ⚠️ | Browsers may downgrade to HTTP |
| 4.8 | `X-Frame-Options: DENY` | ⚠️ | Clickjacking attacks possible |
| 4.9 | `X-Content-Type-Options: nosniff` | ⚠️ | MIME-type sniffing attacks |
| 4.10 | `Referrer-Policy: strict-origin-when-cross-origin` | ⚠️ | User data leaked in referrer headers |
| 4.11 | `Permissions-Policy` | ⚠️ | Camera/mic/geolocation could be invoked by third-party scripts |
| 4.12 | `Content-Security-Policy` (CSP) | ⚠️ | XSS attacks. Complex — implement after launch with report-only first |

### 4c. Code & Secrets

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 4.13 | No API keys in client-side bundle | 🔲 | Verify with `NEXT_PUBLIC_*` audit — only safe keys should be public |
| 4.14 | Sanity write token in git history | ⚠️ | **Must rotate at sanity.io/manage** — token was committed in `scripts/seed-media-mentions.mjs` |
| 4.15 | GitHub PAT revoked | ⚠️ | **Must revoke at github.com/settings/tokens** — was shared in session |
| 4.16 | `.env` files in `.gitignore` | ✅ | Confirmed not tracked |
| 4.17 | Vercel env vars set in dashboard | 🔲 | Verify `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `NEXT_PUBLIC_SITE_URL` are all set in Vercel production |
| 4.18 | Debug `console.log` statements removed | ⚠️ | Found in `crmService.ts`, `QuizPage.tsx`, `routing.ts` — should be stripped before launch |
| 4.19 | Source maps disabled in production | 🔲 | Ensure `productionBrowserSourceMaps: false` in `next.config.ts` (default) |

### 4d. Application Security

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 4.20 | Forms — server-side validation | 🔲 | Contact form and assessment should validate on server, not just client |
| 4.21 | Rate limiting on form endpoints | ❌ | No rate limiting — Zoho/CRM endpoints should have it |
| 4.22 | No user-supplied content rendered as raw HTML | 🔲 | Check any `dangerouslySetInnerHTML` usage |
| 4.23 | Dependency vulnerability scan | 🔲 | Run `npm audit` — fix any high/critical CVEs |

---

## 5. Functional QA

| # | Check | Status |
|---|-------|--------|
| 5.1 | Home page — all sections render correctly | 🔲 |
| 5.2 | Home page — scroll animations trigger | 🔲 |
| 5.3 | Smooth scroll (Lenis) — mouse wheel + touch | 🔲 |
| 5.4 | Assessment flow — start to end (all question paths) | 🔲 |
| 5.5 | Assessment — CRM lead creation fires | 🔲 |
| 5.6 | Assessment — Zoho payment redirect works | ✅ |
| 5.7 | Assessment — Thank You page renders post-payment | 🔲 |
| 5.8 | Assessment — duplicate email handling (enrolled users) | 🔲 |
| 5.9 | Assessment — limit-reached state | 🔲 |
| 5.10 | Newsletter form — email submit + success state | ✅ Optimistic |
| 5.11 | Newsletter form — **real endpoint needed** | ⚠️ `NEWSLETTER_ENDPOINT` is still a placeholder |
| 5.12 | Contact form — submit + confirmation | 🔲 |
| 5.13 | All nav links resolve correctly | 🔲 |
| 5.14 | All CTA buttons link to correct destinations | 🔲 |
| 5.15 | Blog — article pages render (Sanity connected) | 🔲 |
| 5.16 | Blog — graceful fallback when Sanity offline | ✅ |
| 5.17 | 404 page — custom not-found renders | 🔲 |
| 5.18 | No broken image links | 🔲 |
| 5.19 | All external links open in new tab | 🔲 |

---

## 6. Legal & Compliance

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 6.1 | Privacy Policy page | ✅ | `/privacy-policy` — May 2026 version |
| 6.2 | Terms & Conditions page | ✅ | `/terms` — May 2026 version |
| 6.3 | Cookie Policy page | ✅ | `/cookie-policy` — May 2026 version |
| 6.4 | Footer links to all three legal pages | ✅ | Privacy · Cookies · Terms |
| 6.5 | Cookie consent banner | ❌ | Not implemented — required for GDPR/CCPA compliance |
| 6.6 | "Do Not Sell My Personal Information" link | ❌ | Referenced in Privacy Policy but not on site |
| 6.7 | HIPAA — Business Associate Agreements in place | 🔲 | Required for all vendors handling PHI (Zoho, OpenAI etc.) |
| 6.8 | HIPAA — PHI not logged in analytics tools | 🔲 | Verify Mixpanel / Clarity do not capture health data |

---

## 7. Domain & Infrastructure

| # | Check | Status |
|---|-------|--------|
| 7.1 | Custom domain configured on Vercel | 🔲 |
| 7.2 | DNS A/CNAME records pointing to Vercel | 🔲 |
| 7.3 | DNS fully propagated (check dnschecker.org) | 🔲 |
| 7.4 | `www` redirect → apex (or vice versa) | 🔲 |
| 7.5 | SSL certificate issued for custom domain | 🔲 |
| 7.6 | `NEXT_PUBLIC_SITE_URL` set to production domain | ⚠️ |
| 7.7 | Sanity CORS origin includes production domain | 🔲 |
| 7.8 | Zoho payment URL set to production domain | 🔲 |

---

## 8. Analytics & Monitoring

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 8.1 | Mixpanel — events firing on production | 🔲 | |
| 8.2 | Microsoft Clarity — session recording active | 🔲 | |
| 8.3 | Sentry — error capture connected | 🔲 | |
| 8.4 | Better Stack / Site24x7 — uptime monitor set up | 🔲 | |
| 8.5 | Firebase Crashlytics (App) | 🔲 | For mobile app if applicable |
| 8.6 | Vercel Analytics — enabled in dashboard | 🔲 | |

---

## 9. Accessibility

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 9.1 | Colour contrast — body text on backgrounds ≥ 4.5:1 | 🔲 | Use axe DevTools or Colour Contrast Analyser |
| 9.2 | All interactive elements keyboard-accessible | 🔲 | Tab through entire site |
| 9.3 | Focus indicators visible | 🔲 | |
| 9.4 | No keyboard traps | 🔲 | |
| 9.5 | ARIA labels on icon-only buttons | 🔲 | |
| 9.6 | Skip-to-content link | ❌ | Not implemented |
| 9.7 | Screen reader smoke test (VoiceOver / NVDA) | 🔲 | |

---

## 10. Handover Deliverables

| # | Item | Status | Notes |
|---|------|--------|-------|
| 10.1 | GitHub repository access transferred | 🔲 | Add client as owner/admin |
| 10.2 | Vercel project access transferred | 🔲 | Add client to Vercel team |
| 10.3 | Sanity project access transferred | 🔲 | Add client at sanity.io/manage |
| 10.4 | Domain registrar access transferred | 🔲 | |
| 10.5 | All environment variables documented | 🔲 | Provide `.env.example` with all keys |
| 10.6 | Deployment guide written | 🔲 | How to push, how to add Sanity content |
| 10.7 | Sanity content editor guide | 🔲 | How to add blog posts, media mentions |
| 10.8 | Analytics dashboard access | 🔲 | Mixpanel, Clarity, Sentry |
| 10.9 | Payment integration docs (Zoho) | 🔲 | Keys, webhook URLs, test vs. live mode |
| 10.10 | CRM newsletter endpoint documented | ⚠️ | Endpoint still needed from client |

---

## Pre-Launch Final Actions (Do These Last, In Order)

```
□  1. Rotate Sanity write token (security — token was in git history)
□  2. Revoke old GitHub PAT
□  3. Add missing metadata to /pathways, /faq, /team, /contact, /assessment
□  4. Add HTTP security headers to next.config.ts (HSTS, X-Frame-Options etc.)
□  5. Strip console.log statements from crmService.ts, QuizPage.tsx, routing.ts
□  6. Set NEWSLETTER_ENDPOINT to real CRM URL
□  7. Remove noindex from ALL THREE locations (layout.tsx, next.config.ts, robots.ts)
□  8. Set NEXT_PUBLIC_SITE_URL to production domain in Vercel dashboard
□  9. Run npm audit — fix any high/critical CVEs
□ 10. Run Lighthouse on production URL — confirm scores
□ 11. Do full functional walkthrough on mobile (real device, not simulator)
□ 12. Push final build → confirm Vercel deploy succeeds
□ 13. DNS check — drpalsnewme.com resolves correctly
□ 14. Hard reload on incognito — confirm no console errors
```

---

*Generated by BCON for Dr. Pal's NewME — v1.0 · 21 May 2026*
