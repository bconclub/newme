@AGENTS.md

# Dr. Pal's NewME — Codebase guide

This file is loaded automatically. **Read it before writing code in this repo.**
For visual tokens, components, and design recipes, see [design.md](design.md).

---

## Stack

- **Next.js 16.2.4** with App Router + Turbopack. APIs differ from older Next.
- **React 19.2.4** — server components by default. Add `'use client'` only when
  you need state, effects, refs, or browser APIs.
- **Tailwind v4 (PostCSS)** — tokens declared in `@theme inline { … }` inside
  [src/app/globals.css](src/app/globals.css). **No `tailwind.config.*` file.**
- **Framer Motion 12** for animations. Standard ease tuple:
  `[0.22, 1, 0.36, 1] as const`.
- **Lenis** smooth scroll wrapped at the layout root via `SmoothScroll`.
- **SCSS** is reserved for `option1.scss` (page-skin: bg ellipses, noise, the
  `main.newme-page` scope). Don't add new SCSS files; use Tailwind + inline
  styles for new sections.
- **Sanity** mounts at `/studio`. Don't touch unless content modeling changes.

---

## File map

```
src/
├── app/
│   ├── layout.tsx              # Loads fonts, mounts SmoothScroll
│   ├── globals.css             # Tailwind v4 @theme tokens (single source of truth)
│   ├── option1.scss            # main.newme-page skin (bg ellipses, noise, mobile media query)
│   ├── page.tsx                # Home — composes the 9 home sections
│   ├── how-it-works/page.tsx   # /how-it-works
│   ├── pathways/page.tsx       # /pathways (+ /metabolic, /gi, /continuity)
│   ├── virtual-clinic/page.tsx
│   ├── research-lab/page.tsx
│   ├── media/[slug]/page.tsx   # Individual media/article pages (Sanity-backed)
│   ├── admin/page.tsx          # Internal page directory (noindex) — lists all routes + Sanity status
│   ├── studio/                 # Sanity mount
│   ├── sitemap.ts, robots.ts
│   └── page1/                  # Standalone wellness design (NOT newme-page scope)
├── components/
│   ├── option1/                # The home + supporting sections
│   │   ├── Header.tsx, Hero.tsx, StatsBand.tsx, WhatIsNewMe.tsx,
│   │   ├── DrPal.tsx, Pillars.tsx, Pathways.tsx, StructuredCare.tsx,
│   │   ├── Testimonials.tsx, Footer.tsx
│   │   ├── EyebrowPill.tsx     # ← reusable label pill (light + dark variants)
│   │   ├── PageStub.tsx        # Placeholder for unbuilt pages
│   │   └── HIW*.tsx            # /how-it-works subsections
│   ├── layout/SmoothScroll.tsx # Lenis wrapper
│   ├── sections/               # (currently empty / shared)
│   └── ui/                     # (currently empty / shared)
├── lib/
│   └── sanity/
│       ├── client.ts           # createClient() — reads env vars via env.ts
│       ├── env.ts              # softRequired() — warns, never throws, returns '' if absent
│       └── queries.ts          # GROQ queries (articlesQuery, etc.)
├── hooks/, types/              # General utilities
└── ...
public/
├── newme-logo.png
├── dr-pal-portrait.png
├── images/home/, images/pathways/
├── testimonials/{nithya,kat,thamarai}.jpg
└── icons/
    ├── fitness.svg             # Person-reaching figure
    ├── mobility.svg            # Walking/running figure
    ├── sleep.svg               # Sleep icon
    ├── circadian.svg           # Circadian rhythm icon
    ├── stress.svg              # Stress icon
    ├── digestion.svg           # Digestion icon
    ├── metabolism.svg          # Flame icon (copy of pillar-met.svg)
    ├── community.svg           # Community icon
    ├── nutrition.svg           # Exercise/globe icon
    ├── pillar-met.svg          # Flame SVG backup (white paths, 130×130)
    └── pillar-mob.svg          # Walking figure SVG backup (white paths, 130×130)
```

---

## Conventions

### 1. Artboard-relative `clamp()` for everything fluid

Home is designed at a **1920×9544 Figma artboard**. Every dimension uses:

```ts
clamp(MOBILE_FLOOR, calc(FIGMA_SPEC / 1920 * 100vw), FIGMA_SPEC)
```

Don't skip the floor — text gets unreadably small on phones. Don't skip the
ceiling — text gets oversized at 1920+ wide displays. See design.md §4 for
worked examples.

### 2. Tokens, not literals

Reach for the CSS custom properties from globals.css before hardcoding.
Tailwind v4 auto-generates utilities from the `@theme` block, so
`bg-pine-teal`, `text-light-gold`, `rounded-xl` etc. are all available.

### 3. Font families via CSS variables

```tsx
className="font-[family-name:var(--font-bricolage)]"   // headings
className="font-[family-name:var(--font-urbanist)]"    // body
className="font-[family-name:var(--font-poppins)]"     // button labels / numerals
```

### 4. The `main.newme-page` scope

`src/app/option1.scss` only applies inside `<main className="newme-page">`.
That's why html/body get the pine-teal bg only on the home page; other pages
stay white by default. **Don't add a `newme-page` class to a page that's
meant to be light.**

### 5. Background ellipses live in `page.tsx`

The 5 atmospheric blobs are siblings under `.newme-bg` inside
[src/app/page.tsx](src/app/page.tsx). Their geometry is in
[option1.scss](src/app/option1.scss). Mobile (`< 768px`) hides the secondary
blobs via the `@media (max-width: 767px)` block.

⚠️ The scaling formula is `min(1, calc(100vw / 1920px))` — note the **`px`**
on `1920px`. Without it, the calc returns a length and the whole transform
silently breaks.

### 6. Animation defaults

```ts
const EASE = [0.22, 1, 0.36, 1] as const

// Eyebrow pill
{ initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 }, transition: { duration: 0.4 } }

// Heading
{ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 }, transition: { duration: 0.6, ease: EASE } }

// Body paragraph
{ initial: { opacity: 0, y: 12 }, ..., transition: { duration: 0.5, delay: 0.15 } }

// Card row stagger
transition: { duration: 0.5, delay: i * 0.08 }
```

Wrap these in `<motion.h2>`, `<motion.p>`, `<motion.div>`. Always use
`whileInView` + `viewport: { once: true }` so reveals don't replay on scroll.

### 7. Sanity — build-safe pattern

`src/lib/sanity/env.ts` uses `softRequired()` which **warns and returns `''`**
instead of throwing when env vars are absent. Never change it back to throwing —
Next.js evaluates every module during the "collect page data" build phase before
any component `try/catch` can run.

For any server component that calls `client.fetch()`, guard the import
**and** the call together inside an env var check + try/catch:

```ts
// ✅ CORRECT — build-safe
let data = []
if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  try {
    const [{ client }, { myQuery }] = await Promise.all([
      import('@/lib/sanity/client'),
      import('@/lib/sanity/queries'),
    ])
    data = await client.fetch(myQuery)
  } catch { /* Sanity not reachable */ }
}

// ❌ WRONG — top-level import crashes the build if vars are absent
import { client } from '@/lib/sanity/client'
```

The dynamic `import()` inside the `if` block is what prevents the Sanity
client module from being evaluated at build time on environments without the
vars (e.g. Vercel preview deploys that don't have the Sanity vars set).

### 8. Don't introduce dependencies

Stack is fixed. Don't `npm install` new libs without asking.

### 9. Line endings

Windows checkout — files have CRLF on disk, LF in git. Don't fight the
auto-conversion warnings; they're harmless.

---

## Recipes

### Adding a new home section

1. Create `src/components/option1/MySection.tsx` using the section template
   in [design.md §7](design.md). Match the artboard padding pattern.
2. Wrap reveals in Framer Motion using the defaults above.
3. Use `<EyebrowPill>` for the label and the standard heading/body sizes.
4. Import + place it in [src/app/page.tsx](src/app/page.tsx) inside the
   `.newme-frame`.
5. Need a green wash behind it? It's already there via `.newme-ellipse-28`
   (covers WhatIsNewMe → Pillars) or `.newme-ellipse-38` (Pathways → end).
6. Need a yellow accent? See `.newme-ellipse-34/39/40` for placement; copy
   the geometry pattern in `option1.scss` if you need a new one.

### Adding a new top-level page

1. Make `src/app/<route>/page.tsx`.
2. **If the page is dark/atmospheric** (matches home), wrap in
   `<main className="newme-page">` and add `<Header />` + `<Footer />`. The
   page-bg ellipses come for free.
3. **If the page is light**, just compose plain sections — Tailwind defaults
   to white bg/black text.
4. Update [Header.tsx navLinks](src/components/option1/Header.tsx) if you
   want it in the top nav.
5. Update [sitemap.ts](src/app/sitemap.ts) if it should be indexed.

### Adding a CTA pair (gold pill + orange arrow)

Don't try to use `.btn-gold` — copy the inline block from
[Hero.tsx:148-211](src/components/option1/Hero.tsx). It uses `flex-row-reverse`
+ negative margin to overlap the pill onto the arrow's left edge from the
front. The DOM order matters for stacking.

### Adding a glass card on dark

```tsx
style={{
  background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 100%), linear-gradient(90deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 100%)',
  backdropFilter: 'blur(18px) saturate(85%)',
  WebkitBackdropFilter: 'blur(18px) saturate(85%)',
  border: '2px solid rgba(255,255,255,0.85)',
  borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
}}
```

The `saturate(85%)` is critical — it desaturates the green wash showing
through so the card reads as light frost, not green tinted.

### Mobile-only adjustments

Use Tailwind responsive prefixes (`md:hidden`, `block md:hidden`) for
layout swaps. For style overrides that don't fit Tailwind cleanly, drop into
the `@media (max-width: 767px)` block at the bottom of
[option1.scss](src/app/option1.scss).

---

## Don't-dos

- **Don't add a `tailwind.config.*` file.** Tokens are in `@theme inline`.
- **Don't write SCSS for new sections.** Use Tailwind + inline styles.
- **Don't use `calc(100vw / 1920)` for scaling.** Always `100vw / 1920px`
  (unitless ratio). The unitless form returns a length and silently breaks
  `min()` / `scale()` / `clamp()`.
- **Don't use the `--scale` variable inside `transform: scale(var(--scale))`
  if `--scale` was computed from a unit-mixed calc.** It evaluates to
  `unset` and the entire transform is dropped.
- **Don't bake noise textures into PNGs.** Use the inline SVG fractal-noise
  data-URL pattern from `.newme-noise` in option1.scss.
- **Don't apply `bg-center` for hero photos on mobile** — the photo subject
  ends up clipped off-screen. Set an explicit `background-position` like
  `[position:72%_center] md:bg-center`.
- **Don't try to verify visuals via the headless preview screenshot tool**
  if the page has heavy `filter: blur(>200px)` on large elements — the
  rasterizer times out. Verify via `preview_eval` (DOM inspection) or have
  the user check the live page.
- **Don't add top-level Sanity imports in server components.** Use the guarded
  dynamic import pattern (§7 above). A top-level `import { client }` will crash
  the Vercel build on any environment where `NEXT_PUBLIC_SANITY_PROJECT_ID` is
  not set.
- **Don't make `env.ts` throw.** The `softRequired()` pattern (warn + return `''`)
  exists for a reason — throwing fires before any try/catch can catch it during
  Next.js module evaluation.

---

## Pointers

- **Visual spec / tokens**: [design.md](design.md)
- **Build commands**: `npm run dev`, `npm run build`, `npm run lint`
- **Sanity studio**: `/studio` route
- **Site is currently noindex** — `robots: { index: false, follow: false }`
  in `layout.tsx`. Remove before launch.
- **Browser preview** is a Next dev server on port 3000. If a stale instance
  is hogging the port, `npm run dev` will tell you the PID to kill.
