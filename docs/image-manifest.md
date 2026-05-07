# Image Manifest

> Inventory of every image in `/public` — current path, size, and which page or component uses it. Use this to decide where to drop NEW images and to spot legacy assets that should be cleaned up.

Generated: 2026-05-07. Re-run with `bash scripts/manifest.sh` (or just `find`) when assets change significantly.

---

## Folder structure (current)

`/public/` has page-named folders ready for new uploads, plus some legacy folders/files we haven't migrated yet.

### New per-page folders (target home for new uploads)

| Folder | What goes here |
|---|---|
| `/home/` | Home page hero, doctor portrait, atmospheric overlays, section images |
| `/how-it-works/` | /how-it-works hero, section diagrams, conditions cards |
| `/pathways/` | /pathways hero + sub-pathway banners (metabolic / GI / continuity) |
| `/virtual-clinic/` | /virtual-clinic hero, doctor card, gallery photos |
| `/research-lab/` | /research-lab hero, lab / clinic photos |
| `/team/` | /team hero + individual care-team portraits |
| `/contact/` | /contact hero, decorative imagery |
| `/faq/` | /faq hero, decorative imagery |
| `/assessment/` | /assessment app overlays, decorative atmospheric layers |
| `/blog/` | /blog and /blog/{slug} marketing imagery (per-post covers live in Sanity) |
| `/brand/` | Logo source files, brand swirls, brand-color reference |
| `/icons/` | Shared SVG icons (already exists, keep as is) |
| `/testimonials/` | Testimonial avatar photos (already exists, keep as is) |
| `/media/` | Media page assets — already exists; per-mention covers live in Sanity |

Each folder has a README.md explaining what to drop in it.

### Legacy locations (not yet migrated)

These still exist for backwards-compat with code that references them. Do **not** add new files here — use the per-page folder instead.

| Legacy path | Contents | Migration target |
|---|---|---|
| Root `/Dr Pal.webp`, `/Hero image.webp`, `/Hero Overlay.webp` | Home hero + overlay | `/home/` |
| `/dr-pal-portrait.png`, `/swirl-cream.png`, `/ellipse-bg.png` | Home doctor portrait + brand decorations | `/home/` or `/brand/` |
| `/clinic/` | Virtual clinic hero photo + ellipse SVGs | `/virtual-clinic/` |
| `/how it works/` (with space) | How-it-works section images | `/how-it-works/` (rename, hyphenated) |
| `/research lab/` (with space) | Research lab hero | `/research-lab/` |
| `/virtual clinic/` (with space) | Old virtual clinic photo | `/virtual-clinic/` |
| `/images/home/`, `/images/pathways/`, `/images/team/`, `/images/research-lab/`, `/images/virtual-clinic/`, `/images/how-it-works/` | Half-organised existing assets under an `images/` parent | Move up one level into the per-page folder (`/images/home/X.jpg` → `/home/X.jpg`) |
| `/newme-logo.png` (root) | Site logo | Stays at root for legacy refs; brand-source mirror in `/brand/` |
| `/media/avatars/` | Article author avatars on /media | `/media/` is fine; nested `avatars/` ok |

---

## Full inventory (file size in KB)

### Root (legacy — should move to `/home/` or `/brand/`)

| Path | Size | Used by |
|---|---|---|
| `/newme-logo.png` | 8 KB | All pages — `<Image src="/newme-logo.png">` in `Header.tsx` and `Footer.tsx` |
| `/Dr Pal.webp` | 147 KB | Home hero |
| `/Hero image.webp` | 93 KB | Home hero |
| `/Hero Overlay.webp` | 46 KB | Home hero overlay |
| `/dr-pal-portrait.png` | 1116 KB | Home — Dr Pal portrait card. **Heavy — compress.** |
| `/swirl-cream.png` | 75 KB | Brand decoration — swirl asset |
| `/ellipse-bg.png` | 1 KB | Background decoration |
| `/robots.txt` | 26 B | Crawler directives |

### `/clinic/` (legacy — move to `/virtual-clinic/`)

| Path | Size | Used by |
|---|---|---|
| `/clinic/doctor-hero.png` | **5292 KB** | Virtual Clinic hero. **MUST compress / convert to WebP.** |
| `/clinic/virtual-clinic-hero.webp` | 225 KB | Virtual Clinic hero (alternate) |
| `/clinic/ellipse-28.svg` | 1 KB | Background ellipse |
| `/clinic/ellipse-34.svg` | <1 KB | Background ellipse |
| `/clinic/ellipse-39.svg` | <1 KB | Background ellipse |

### `/how it works/` (legacy — rename to `/how-it-works/`)

| Path | Size | Used by |
|---|---|---|
| `/how it works/hero.webp` | 111 KB | /how-it-works hero |
| `/how it works/Assesment.png` | 102 KB | Section image |
| `/how it works/Prescription.png` | 114 KB | Section image |
| `/how it works/Structured Care.png` | 108 KB | Section image |
| `/how it works/MOnitoring.png` | 108 KB | Section image |
| `/how it works/Continuity.png` | 92 KB | Section image |
| `/how it works/Lets Discover HEalth Path.webp` | 56 KB | Section banner |
| `/how it works/Structred care needs human guidance.webp` | 144 KB | Section banner |
| `/how it works/Why astarting early matters.png` | **985 KB** | Section banner. **Compress — there's already a 89 KB .webp version, the .png shouldn't ship.** |
| `/how it works/Why astarting early matters.webp` | 89 KB | Section banner (use this) |

### `/icons/`

| Path | Size | Used by |
|---|---|---|
| `/icons/circadian.svg` | 9 KB | Pillars / how-it-works icons |
| `/icons/community.svg` | 4 KB | |
| `/icons/digestion.svg` | 5 KB | |
| `/icons/fitness.svg` | 4 KB | |
| `/icons/metabolism.svg` | 1 KB | |
| `/icons/mobility.svg` | 2 KB | |
| `/icons/nutrition.svg` | 8 KB | |
| `/icons/pillar-8.svg` | 4 KB | |
| `/icons/pillar-met.svg` | 1 KB | |
| `/icons/pillar-mob.svg` | 1 KB | |
| `/icons/sleep.svg` | 5 KB | |
| `/icons/stress.svg` | 8 KB | |
| `/icons/whatsnewme-orange.png` | 4 KB | WhatIsNewME icon set |
| `/icons/whatsnewme-yellow.png` | 2 KB | WhatIsNewME icon set |

### `/images/home/`

| Path | Size | Used by |
|---|---|---|
| `/images/home/Hero image.webp` | 93 KB | Home hero (newer copy of root version) |
| `/images/home/Dr Pal.webp` | 142 KB | Home doctor portrait |

### `/images/pathways/`

| Path | Size | Used by |
|---|---|---|
| `/images/pathways/hero-doctor.jpg` | 67 KB | /pathways hero |
| `/images/pathways/section-clinical.jpg` | 153 KB | /pathways section image |
| `/images/pathways/Reset.webp` | 86 KB | Pathways selector card |
| `/images/pathways/Rebuild.webp` | 157 KB | Pathways selector card |
| `/images/pathways/Sustain.webp` | 155 KB | Pathways selector card |
| `/images/pathways/metabolic-hero.jpg` | 220 KB | /pathways/metabolic hero |
| `/images/pathways/gi-hero.jpg` | 142 KB | /pathways/gi hero |
| `/images/pathways/continuity-hero.jpg` | 109 KB | /pathways/continuity hero |
| `/images/pathways/reset-banner.jpg` | 34 KB | Sub-pathway banner |
| `/images/pathways/rebuild-banner.jpg` | 58 KB | Sub-pathway banner |
| `/images/pathways/sustain-banner.jpg` | 58 KB | Sub-pathway banner |
| `/images/pathways/gi-core-banner.jpg` | 58 KB | Sub-pathway banner |
| `/images/pathways/gi-advanced-banner.jpg` | 189 KB | Sub-pathway banner |
| `/images/pathways/movement-banner.jpg` | 58 KB | Sub-pathway banner |
| `/images/pathways/newme360-banner.jpg` | 55 KB | Sub-pathway banner |

### `/images/team/`

| Path | Size | Used by |
|---|---|---|
| `/images/team/dr-palaniappan.jpg` | **1546 KB** | Founder portrait. **COMPRESS.** |
| `/images/team/priya-pal.jpg` | **6095 KB** | Co-founder portrait. **COMPRESS — 6 MB is unacceptable for a portrait.** |
| `/images/team/shakeela.jpg` | **2290 KB** | CEO portrait. **COMPRESS.** |
| `/images/team/karthik-ravi.jpg` | **2224 KB** | Team portrait. **COMPRESS.** |
| `/images/team/gayatri-rajamani.jpg` | 665 KB | Team portrait. **Compress (target 200 KB).** |
| `/images/team/reshmi-sinha.jpg` | **1653 KB** | Team portrait. **COMPRESS.** |
| `/images/team/devi-palaniappan.jpg` | **1387 KB** | Team portrait. **COMPRESS.** |
| `/images/team/namratha-nataraj.jpg` | **1596 KB** | Team portrait. **COMPRESS.** |
| `/images/team/ashwini-saras.jpg` | **1906 KB** | Team portrait. **COMPRESS.** |
| `/images/team/dr-indira.jpg` | 54 KB | Team portrait (already compressed) |

⚠ The /team folder ships ~21 MB of imagery total — half the page weight on a fresh load. Convert to 1200×1500 WebP at quality 80–85, target 200–250 KB each.

### `/images/research-lab/`

| Path | Size | Used by |
|---|---|---|
| `/images/research-lab/hero.jpg` | **516 KB** | /research-lab hero. WebP version exists below. |
| `/images/research-lab/hero.webp` | 68 KB | /research-lab hero (use this one) |

### `/media/`

| Path | Size | Used by |
|---|---|---|
| `/media/Media Hero.webp` | 131 KB | /media hero (also OG image) |
| `/media/Media 03.webp` | 26 KB | Media card fallback |
| `/media/Virtual CLinic.webp` | 83 KB | Media card fallback |
| `/media/Weight Loss.webp` | 94 KB | Media card fallback |
| `/media/avatars/debapriya.png` | 107 KB | Author avatar |
| `/media/avatars/lifestyle-desk.png` | 107 KB | Author avatar |

### `/research lab/` (legacy — rename to `/research-lab/`)

| Path | Size | Used by |
|---|---|---|
| `/research lab/Research Lab.webp` | 110 KB | /research-lab section image |

### `/testimonials/`

| Path | Size | Used by |
|---|---|---|
| `/testimonials/kat.jpg` | 8 KB | Homepage testimonial |
| `/testimonials/nithya.jpg` | 9 KB | Homepage testimonial |
| `/testimonials/thamarai.jpg` | 9 KB | Homepage testimonial |

### `/virtual clinic/` (legacy — rename to `/virtual-clinic/`)

| Path | Size | Used by |
|---|---|---|
| `/virtual clinic/Virtual CLinic.webp` | 225 KB | Old virtual clinic photo |

---

## Critical action items

1. **Compress team portraits** — 9 of 10 photos are over 1 MB; one is 6 MB. Page total ~21 MB. Target each at < 250 KB after WebP conversion.
2. **Compress `/clinic/doctor-hero.png` (5.2 MB)** — convert to WebP, target ~150 KB.
3. **Drop the duplicate PNG of "Why astarting early matters" (985 KB)** — the WebP version (89 KB) is already there.
4. **Rename folders with spaces** — `/how it works/`, `/research lab/`, `/virtual clinic/` should all use hyphens. Update code references in tandem (~20 places).
5. **Decide on root-level legacy files** — `Dr Pal.webp`, `Hero image.webp`, etc. should either move to `/home/` (and code updated) or stay if too disruptive to move now.

---

## When you add a new image

1. Pick the folder matching the page that owns it.
2. Use a clean lowercase-hyphenated filename: `hero.webp`, `section-clinical.webp`, `conditions-card-1.webp`.
3. Compress before upload (see [`docs/image-guidelines.md`](./image-guidelines.md) for targets).
4. Reference it as `/{folder}/{filename}` in code.
5. Set the `alt` attribute on the React component — never leave it empty for content imagery.
