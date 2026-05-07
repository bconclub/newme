# Responsive & Layout Audit — 2026-05-07

> Sweep across every public page at desktop width (1440×900). The Chrome MCP tool I used can't reliably emulate sub-768px viewports, so this audit covers desktop layout + the responsive-class behaviour visible in the source. **Manual mobile testing is recommended** before launch — every page needs an eyes-on QA at 375×812 and 768×1024 in real Chrome / Safari devtools.

---

## Critical issues

### 🔴 1. Three pages share the same hero photo

| Page | Hero image | Status |
|---|---|---|
| `/virtual-clinic` | `/clinic/virtual-clinic-hero.webp` (woman-in-scrubs-at-laptop) | original use |
| `/team` | `/clinic/virtual-clinic-hero.webp` | **DUPLICATE** |
| `/contact` | `/clinic/virtual-clinic-hero.webp` | **DUPLICATE** |

Three different pages with the same hero photo makes the site feel templated / unfinished. Need three distinct hero images. **Action**: source one team group photo for `/team` and one communication-themed photo for `/contact`. Same goes for `/faq` (currently using a different doctor-with-patient image) — verify it's not also duplicated elsewhere.

### 🔴 2. /blog page missing hero block

The `/media` page opens with a large doctor-with-patient hero panel (Figma 100:980 spec). The `/blog` page jumps straight to a centered text title with no hero photo. Per the previous Figma direction (#1 in pending), `/blog` should mirror `/media` exactly. **Action**: add a `BlogHero` component matching `MediaHero`'s layout but with a different photo so they don't duplicate either.

### 🔴 3. Heavy team portraits

`/images/team/*` ships **~21 MB** of imagery on a fresh `/team` page load. Nine of ten portraits are over 1 MB; one (priya-pal.jpg) is **6 MB**. This kills LCP and mobile data budgets.

**Action**: convert each portrait to WebP at quality 80–85, target ≤ 250 KB each. See `docs/image-manifest.md` for per-file sizes.

### 🔴 4. /clinic/doctor-hero.png is 5.2 MB

PNG of a hero photo — should be WebP. Currently unused per code search but still in the bundle. **Action**: delete or convert to WebP < 200 KB.

---

## Medium issues

### 🟡 5. /pathways hero photo crops oddly on narrow viewports

`/pathways` hero uses `objectPosition: '60% center'`, which on narrow viewports shifts the focus to the right side of the image — pushing the doctor / patient out of frame and leaving the dark scrubs portion behind the CTA button. The "Find Your Pathway" arrow circle sits over a mostly-black region on mobile, hurting visual contrast.

**Action**: use a media-query-driven `object-position` (e.g. `40% center` on mobile, `60% center` on desktop) or swap the hero to a more centered crop.

### 🟡 6. /pathways category cards have inconsistent heights

The 3 pathway category cards (Metabolic / GI / Continuity) on `/pathways` are sized `clamp(80px, 6.25vw, 120px)` height. On widescreens that gives 120px but the labels wrap differently for "Metabolic Care Pathway" (2 lines) vs "Continuity Pathways" (also 2 lines, but shorter). Result: same card dimensions, different visual rhythm.

**Action**: either let them auto-size to content + min-height, or normalise the labels (currently `t.label.split(' ').slice(0, -1).join(' ')` then a `<br>` then last word — fragile when labels change).

### 🟡 7. /research-lab text overlay too dark on right side

The research-lab hero overlay covers more than just the text zone — the lab scientists on the right are also tinted dark green, making the photo feel less alive. Compare with `/pathways` (which now has the moss-green diagonal that fades cleanly) — same recipe should apply here.

**Action**: re-tune the overlay gradient on `/research-lab` to fade out before the right edge.

### 🟡 8. /pathways/{metabolic,gi,continuity} sub-pathway pills are unclickable as a whole row

Pill chips in the pathway tabs row look interactive but only the active pill changes state — there's no hover affordance for the inactive ones. Adding the same hover effect we just added on `/pathways` (text → gold on hover) would help.

**Action**: apply the gold hover state to the `Tab` chips in the sub-pages.

### 🟡 9. /assessment intro is a long vertical block on mobile-equivalent narrow widths

Looking at the source layout, the assessment intro page renders as a single column with eyebrow → headline → body → avatar row → CTA. On narrow viewports the avatars + social-proof text can stack awkwardly with the row of 5 avatar circles wrapping unevenly.

**Action**: verify on real mobile devtools; consider stacking the avatars over the social-proof text (avatars row → text below) instead of side-by-side.

---

## Low-priority / cosmetic

### ⚪ 10. Footer column gaps not matching at narrow viewports

The 4-column footer (Brand / Quick Links / Resources / Connect) compresses awkwardly on small viewports. Tailwind classes are `grid grid-cols-2 md:grid-cols-12` which works at desktop but at exactly 768px the columns become tight.

### ⚪ 11. /how-it-works hero photo is a hand with a blood-pressure cuff

Photo choice is fine but the wide negative space on the right looks empty on widescreens (1920+). Consider a wider crop or a secondary element (badge / decoration) to anchor the right side.

### ⚪ 12. Empty `Hero Overlay.webp` legacy file

`/Hero Overlay.webp` (46 KB) is at the root of `/public` but never referenced in code (grep confirms). Safe to delete.

---

## Pages reviewed

| Page | URL | Hero | Layout | Footer | Notes |
|---|---|---|---|---|---|
| Home | `/` | ✅ | ✅ | ✅ | Doctor-led care heading + doctor photo. Looks solid. |
| How It Works | `/how-it-works` | ⚠ | ✅ | ✅ | Hero photo: hand with BP cuff — a bit clinical / sterile. |
| Pathways | `/pathways` | ✅ | ⚠ | ✅ | Object-position issue on mobile (#5). |
| Pathways · Metabolic | `/pathways/metabolic` | ✅ | ✅ | ✅ | Unique photo, clean layout. |
| Pathways · GI | `/pathways/gi` | ✅ | ✅ | ✅ | Unique photo, clean layout. |
| Pathways · Continuity | `/pathways/continuity` | ✅ | ✅ | ✅ | Unique photo, clean layout. |
| Virtual Clinic | `/virtual-clinic` | 🔴 | ✅ | ✅ | Hero photo duplicated on /team and /contact. |
| Research Lab | `/research-lab` | ⚠ | ✅ | ✅ | Overlay too dark on right (#7). |
| Team | `/team` | 🔴 | ✅ | ✅ | Hero photo duplicated; team cards now show centered name+role on hover ✓. |
| Contact | `/contact` | 🔴 | ✅ | ✅ | Hero photo duplicated. |
| FAQ | `/faq` | ✅ | ✅ | ✅ | Doctor-with-patient photo, unique. |
| Media | `/media` | ✅ | ✅ | ✅ | Microscope photo, unique. |
| Blog | `/blog` | 🔴 | ✅ | ✅ | Missing hero block (#2). |
| Blog · Detail | `/blog/{slug}` | ✅ | ✅ | ✅ | Cover image renders correctly. Body lacks the structured habits/related layout per Figma 107:69. |
| Assessment | `/assessment` | ✅ | ⚠ | n/a | Single-column layout; avatar row may stack awkwardly on mobile. |

Legend: ✅ no issue · ⚠ medium · 🔴 critical

---

## What I couldn't test

- **Sub-768px viewports** — Chrome MCP couldn't reliably emulate them; the `resize_window` call resized the chrome window but the page content kept rendering at desktop breakpoints. Real device-emulation in Chrome / Safari devtools is needed.
- **Touch interactions** — hover states on the team cards, sub-pathway pill hover, etc. don't have a tap-equivalent on touch devices. Worth adding `:focus-within` styles for keyboard / touch nav.
- **Reduced-motion preferences** — Framer Motion animations don't currently honor `prefers-reduced-motion`. Should be added before launch.
- **Slow connections** — the 21 MB team page would crawl on 3G. Lighthouse run in dev tools would surface this.

---

## Recommended next steps

1. **Source unique hero photos** for `/team` and `/contact` (both currently duplicate `/virtual-clinic`). Drop them into the new `/public/team/` and `/public/contact/` folders.
2. **Compress all team portraits** (target < 250 KB each) before any pre-launch deploy.
3. **Add `BlogHero` component** to `/blog` (mirror of MediaHero) and re-source a unique photo.
4. **Manual mobile QA** — pull the site up on a real iPhone + Android, walk through every page, log layout breaks.
5. **Run Lighthouse** on `/team` specifically — flag everything > 90 score before launch.
