# Dr. Pal's NewME — Design System

The single source of truth for tokens, components, and visual recipes.
Tokens live in [src/app/globals.css](src/app/globals.css) (`@theme inline` block — Tailwind v4).
Page-specific atmosphere (background ellipses, noise) lives in
[src/app/option1.scss](src/app/option1.scss).

If you're starting work, **read [CLAUDE.md](CLAUDE.md) first** — it has the
codebase map and the recipes for adding a section or page. This file is the
spec; CLAUDE.md is the how-to.

---

## 1. Stack

| What | Version | Notes |
| --- | --- | --- |
| Next.js | 16.2.4 (App Router, Turbopack) | Breaking changes vs. older Next — see AGENTS.md |
| React | 19.2.4 | Server components by default; mark `'use client'` only when needed |
| Tailwind CSS | v4 (PostCSS) | Tokens declared in `@theme inline { … }`, NOT `tailwind.config` |
| Framer Motion | 12.x | Animations + `useTransform` / `useMotionValue` orbits |
| Lenis | 1.3.x | Smooth scroll wrapper at root (`SmoothScroll` in `layout.tsx`). Config: `{ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1.15, touchMultiplier: 1.8 }` — lerp-based (no `duration`). |
| GSAP | 3.15.x | Available; used sparingly |
| Sanity | 5.x | CMS, mounted at `/studio` |
| SCSS | dart-sass | Reserved for page-skin files (ellipses, complex selectors) |

The home page lives in `src/app/page.tsx` and pulls in `src/app/option1.scss`,
which is **scoped under `main.newme-page`** so other pages stay default-white.

---

## 2. Color tokens

All colors are CSS custom properties declared in
[globals.css `@theme`](src/app/globals.css). Reference them as
`var(--color-pine-teal)` in inline styles or as the Tailwind class
`bg-pine-teal` / `text-pine-teal` / `border-pine-teal` (Tailwind v4
auto-generates utilities for tokens it sees).

### Primary

| Token | Hex | Use |
| --- | --- | --- |
| `--color-pine-teal` | `#173B39` | Hero bg, primary surface on dark |
| `--color-pine-deep` | `#013E37` | Deeper pine, edges, accents |
| `--color-pine-darker` | `#0E2827` | Hover state for `pine-teal` |
| `--color-pine-card` | `#0A4A45` | Raised dark card |
| `--color-pine-raised` | `#0E5551` | Hover/focus on dark cards |

### Accents

| Token | Hex | Use |
| --- | --- | --- |
| `--color-light-gold` | `#FEF272` | **Primary CTA bg, accent text on dark** |
| `--color-gold-soft` | `#FDF185` | Hover for gold |
| `--color-gold-cream` | `#FFF8B8` | Light gold variant for radial fills |
| `--color-moss-green` | `#629675` | Organic moss accent — wash gradient top, dividers, dark-card text |
| `--color-moss-deep` | `#4D8060` | Deeper moss, success state |
| `--color-tangerine` | `#FF8547` | Secondary CTA accent (orange CTA arrow) |
| `--color-tangerine-alt` | `#F08B55` | Tangerine hover |
| `--color-amber` | `#FFD17D` | Warm amber accent |
| `--color-ice-mint` | `#E3FFED` | Mint chip / tag bg |
| `--color-ice-aqua` | `#C7FDFC` | Aqua accent |

### Surfaces (light sections)

| Token | Hex | Use |
| --- | --- | --- |
| `--color-surface-gray` | `#D9D9D9` | Card fill |
| `--color-surface-soft` | `#F3F3F3` | Outer card bg |
| `--color-surface-faint` | `#F9F9F9` | Alternate section tint |

### Text

| Token | Hex | Use |
| --- | --- | --- |
| `--color-ink` | `#000000` | Default text on light |
| `--color-text-on-dark` | `#FFFFFF` | Default text on dark |
| `--color-muted` | `#444444` | Secondary body on light |
| `--color-muted-soft` | `#BCBCBC` | Tertiary copy on light |

### Overlays (used inline a lot)

| Token | Value |
| --- | --- |
| `--color-white-30` | `rgba(255,255,255,0.30)` |
| `--color-white-15` | `rgba(255,255,255,0.15)` |
| `--color-white-12` | `rgba(255,255,255,0.12)` |
| `--color-white-08` | `rgba(255,255,255,0.08)` |
| `--color-white-06` | `rgba(255,255,255,0.06)` |
| `--color-gold-overlay` | `rgba(254,242,114,0.31)` — hero stat chip |

---

## 3. Typography

Three font families loaded at the layout root via `next/font/google`. They
expose CSS variables `--font-bricolage`, `--font-urbanist`, `--font-poppins`.

| Family | Variable | Where to use |
| --- | --- | --- |
| **Bricolage Grotesque** | `--font-bricolage` | Headings, eyebrows, brand voice. Default on `<body>`. |
| **Urbanist** | `--font-urbanist` | Body copy, longer paragraphs, captions, secondary meta |
| **Poppins** | `--font-poppins` | Button labels, ratings card numerals (Poppins SemiBold for the big 4.6 / 4.7) |
| **Abhaya Libre** | `--font-quote` | Decorative giant quote glyph only |

Apply via Tailwind: `font-[family-name:var(--font-bricolage)]`.

### Type scale (desktop targets)

Mobile sizes are derived per-component using `clamp()` (see §4). These are
the *ceilings* used at the 1920 artboard:

| Token | Size | Used as |
| --- | --- | --- |
| `--text-display-xl` | 80px | Hero H1 (rare) |
| `--text-display-l` | 72px | Section H2 (`What is NewME`, `Real Patients`) |
| `--text-display-m` | 64px | Pillar / Pathway active titles |
| `--text-display-s` | 56px | Mid-section emphasis |
| `--text-h2` | 48px | — |
| `--text-h3` | 40px | RatingsCard / Method header |
| `--text-h4` | 32px | — |
| `--text-h5` | 24px | Body lead, eyebrow |
| `--text-eyebrow` | 20px | Eyebrow pill |
| `--text-body-lg` | 20px | Lead body copy |
| `--text-body` | 16px | Default body |
| `--text-body-sm` | 14px | Caption / meta |

Line-heights: `--leading-display: 1.04`, `--leading-h2: 1.10`, `--leading-h3: 1.20`,
`--leading-body: 1.55`, `--leading-tight: 1.25`, `--leading-loose: 1.6`.

Default tracking: `-0.01em` on display sizes, normal otherwise.

**Never italics.** Emphasis is done with `--color-light-gold` on dark, or a
black underline on light.

---

## 4. Layout & fluid sizing

### Artboard-relative clamp pattern

The home page is designed at a **1920×9544 Figma artboard**. Every dimension —
font size, padding, margin, card height — is anchored to that artboard via
this template:

```ts
clamp(MOBILE_FLOOR, calc(FIGMA_SPEC / 1920 * 100vw), FIGMA_SPEC)
```

Examples in the codebase:

```ts
fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)'        // H2
paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)'     // section gutter
height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)'          // CTA button
marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)'       // intra-section gap
```

What the three values mean:
- **Floor** — minimum at small viewports. Tune per element so mobile reads cleanly.
- **Middle calc** — scales linearly with viewport between mobile and 1920.
- **Ceiling** — caps at the Figma spec at 1920+ widths.

If you're tempted to skip the floor and use `calc(...)` alone, **don't** —
text gets unreadably small on phones.

### Containers

| Token | Width | Use |
| --- | --- | --- |
| `--container-wide` | 1800px | Edge-to-edge gray bands (Stats, hero card frame) |
| `--container-default` | 1440px | Most sections |
| `--container-narrow` | 1200px | Dense content |
| `--container-tight` | 720px | Prose |

In practice, sections wrap their content in `<div className="mx-auto" style={{ maxWidth: 1801 }}>`
(or 1493, 1800, 1194 — match the Figma spec for that section).

### Gutters

| Token | Mobile | Desktop |
| --- | --- | --- |
| `--gutter-mobile` | 20px | — |
| `--gutter-tablet` | 56px | — |
| `--gutter-desktop` | — | 96px |

Standard inline gutter: `paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)'`
(20px on phones → 60px at 1920).

### Section vertical rhythm

`--rhythm-section-mobile: 72px`, `--rhythm-section-desktop: 120px`. In code,
`paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)'`.

### Breakpoints

The codebase uses the standard Tailwind breakpoints. The most common one is
`md:` (768px) which divides "mobile" from "desktop" in this project.

| Tailwind | Width |
| --- | --- |
| `sm:` | 640px |
| `md:` | 768px ← **mobile / desktop boundary used in components** |
| `lg:` | 1024px |
| `xl:` | 1280px |

For mobile-only adjustments inside SCSS, use `@media (max-width: 767px) { ... }`.

---

## 5. Radii, elevation, motion

| Token | Value |
| --- | --- |
| `--radius-xs` | 8px |
| `--radius-sm` | 12px |
| `--radius-md` | 20px |
| `--radius-lg` | 28px |
| `--radius-xl` | 40px |
| `--radius-pill` | 9999px |

Cards on the dark page (StatsBand, Testimonials) use **40px** rounded; the
big shell card (StructuredCare) uses **34px** scaled with viewport.

| Shadow | Value |
| --- | --- |
| `--shadow-card` | `0 14px 40px -20px rgba(0,0,0,0.18)` |
| `--shadow-card-lg` | `0 24px 60px -24px rgba(0,0,0,0.22)` |
| `--shadow-glow-gold` | `0 24px 60px -12px rgba(254,242,114,0.45)` |

Motion tokens (apply via inline style or Framer Motion `transition`):

```ts
const EASE = [0.22, 1, 0.36, 1] as const          // --ease-out-soft
duration: 0.18  // --duration-fast — hover, micro
duration: 0.32  // --duration-base — most reveals
duration: 0.6   // --duration-slow — heading reveals
```

All sections respect `prefers-reduced-motion` via the global override at the
bottom of `globals.css`.

### Z-index stack

| Token | Value | Use |
| --- | --- | --- |
| `--z-bg` | 0 | Page-bg ellipses |
| `--z-content` | 1 | Section content |
| `--z-overlay` | 50 | Modal-like overlays |
| `--z-header` | 60 | Fixed header |
| `--z-modal` | 100 | Modal dialogs |
| `--z-grain` | 200 | Fixed page-grain (above section content) |

---

## 6. Buttons

Three variants are wired up as utility classes in `globals.css`:

```html
<a class="btn-pine">Start My Assessment</a>
<a class="btn-gold">How it works</a>
<a class="btn-ghost">Learn more</a>
```

In the home sections, the gold pill + tangerine arrow circle pattern (Hero,
Pathways CTA) is built **inline** rather than via these utilities, because
the visual needs the arrow to be a sibling with `flex-row-reverse`. See
[Hero.tsx](src/components/option1/Hero.tsx) lines 148–211 for the canonical
implementation. Copy that block when you need the same CTA pair.

Hover states:
- Pine → `--color-pine-darker` (`#0E2827`)
- Gold → `--color-gold-soft` (`#FDF185`)
- Tangerine → `--color-tangerine-alt` (`#F08B55`)
- Ghost → `--color-surface-soft` (`#F3F3F3`)

---

## 7. Components

### `<EyebrowPill>` ([EyebrowPill.tsx](src/components/option1/EyebrowPill.tsx))

The reusable label pill. Used as the section eyebrow (`What is NewME`,
`Meet Dr. Pal`, `Pathways`, `Testimonials`, `USPs`).

```tsx
<EyebrowPill>What is NewME</EyebrowPill>          // light variant (white text on dark)
<EyebrowPill variant="dark">Meet Dr. Pal</EyebrowPill>   // dark variant for the sage DrPal card
```

Visual: 48px tall pill with a backdrop-blur frost background. The 1px border
runs along the top/left/right but **fades through the bottom-right corner**
via a radial gradient mask — that asymmetric fade is the hallmark of the
component.

**Animation sequence** (all Framer Motion, `whileInView`, `once: true`):

1. **Outer pill** rises from `y:14` + `opacity:0` to rest over `550ms`.
2. **SVG stroke border** (`motion.rect`, `pathLength: 0 → 1`) draws around the
   pill over `700ms` with a `150ms` delay, then fades out at `750ms` once the
   settled border takes over.
3. **Settled border** (`motion.span` with the gradient mask) fades in at
   `delay: 750ms` / `duration: 300ms`.
4. **Text** fades in at `delay: 450ms` / `duration: 350ms`.

Do not simplify this to a plain opacity reveal — the stroke-draw step is
intentional brand motion and must be preserved.

### Section template

The standard section in `src/components/option1/*.tsx` follows this shape:

```tsx
'use client'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

export default function MySection() {
  return (
    <section
      id="my-section"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(56px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1801 /* match Figma */ }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          <EyebrowPill>Eyebrow</EyebrowPill>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
            lineHeight: 1,
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          Your heading here
        </motion.h2>

        {/* …content… */}
      </div>
    </section>
  )
}
```

**Animation defaults**:
- Eyebrow pill: `opacity 0→1, y 10→0`, `duration 0.4`, `viewport amount: 0.6`.
- H2: `opacity 0→1, y 16→0`, `duration 0.6`, `ease [0.22, 1, 0.36, 1]`, `amount: 0.5`.
- Body paragraph: `opacity 0→1, y 12→0`, `duration 0.5`, `delay 0.1–0.2`.
- Cards row: stagger via `delay: i * 0.08`.

### Header CTA (`motion.a`)

The desktop "Start My Assessment" CTA in `Header.tsx` is a `motion.a` (not a
plain `<a>`) to enable hover lift and glow:

```tsx
<motion.a
  href="#assessment"
  whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(254,242,114,0.40)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
  className="inline-flex items-center justify-center bg-[#FEF272] text-[#013E37] rounded-full text-[16px] font-[family-name:var(--font-bricolage)]"
  style={{ padding: '14px 24px', minHeight: 48, fontWeight: 500, lineHeight: 'normal' }}
>
  Start My Assessment
</motion.a>
```

Mobile menu CTA uses the same gold pill at `minHeight: 52`, `padding: '14px 28px'`.

### Testimonials interactive state

`Testimonials.tsx` tracks the active card with a single `activeIdx` state
and drives two behaviours from it:

- **Mobile scroll tracking**: An `onScroll` handler on the scroll container
  calculates `Math.round(scrollLeft / (scrollWidth / N))` and calls
  `setActiveIdx`.
- **Desktop auto-cycle**: A `MediaQueryList` for `(min-width: 640px)` starts
  a `setInterval` at 5 000 ms on mount; each tick advances `activeIdx` by 1
  (wrapping). Clicking a dot restarts the timer.
- **Pagination dots**: Each dot is a `<button>` that calls `goTo(i)`. Active
  dot expands to a wider pill via `width: activeIdx === i ? 20 : 8`. Color
  is `#FEF272` (gold) when active, `rgba(255,255,255,0.35)` otherwise.
- **Active card glow** (desktop): `animate={{ boxShadow: isActive ? '0 8px 40px rgba(254,242,114,0.30)' : 'none' }}`.

Pattern: `activeIdx` is the single source of truth — scroll position and
auto-cycle both converge on it. Never sync the two separately.

### Glass card (testimonials, NewME hero card frame)

```ts
background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 100%), linear-gradient(90deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 100%)',
backdropFilter: 'blur(18px) saturate(85%)',
border: '2px solid rgba(255,255,255,0.85)',
borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
```

The `saturate(85%)` desaturates whatever shows through, which is what keeps
the card from looking *green* over the page-bg green wash.

### Solid white card (testimonial 0, RatingsCard)

```ts
background: '#FFFFFF',
borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
```

---

## 8. Page background — ellipse atmosphere

The home page's atmospheric glow comes from a fixed 1920×9544 absolute frame
inside `<main class="newme-page">`. The frame is centered and scaled-to-fit
on smaller viewports. All the ellipses are children of `.newme-bg`.

```html
<main class="newme-page">
  <div class="newme-bg" aria-hidden>
    <span class="newme-ellipse newme-ellipse-28" />
    <span class="newme-noise newme-noise-28" />
    <span class="newme-ellipse newme-ellipse-38" />
    <span class="newme-noise newme-noise-38" />
    <span class="newme-ellipse newme-ellipse-34" />
    <span class="newme-ellipse newme-ellipse-39" />
    <span class="newme-ellipse newme-ellipse-40" />
  </div>
  <!-- sections go here -->
</main>
```

| Class | Role | Notes |
| --- | --- | --- |
| `.newme-ellipse-28` | Green wash behind WhatIsNewMe / DrPal / Pillars | 4480px circle, top=1807, linear gradient `#629675→#013E37`, blur 280px, opacity 0.35 with radial mask |
| `.newme-ellipse-38` | Green wash behind Pathways / StructuredCare / Testimonials | 4480px, top=6241, opacity 0.28 |
| `.newme-ellipse-34` | Yellow accent right of Pillars | 1100px, top=3359, left=1268, `#FEF272`, blur 280px, opacity 0.5 |
| `.newme-ellipse-39` | Yellow accent right of Pathways | 1100px, top=5736, left=1268 |
| `.newme-ellipse-40` | Yellow accent **left** of Testimonials | 1100px, top=8010, left=-625 |

Mobile (`< 768px`) hides Ellipse 38 / 39 / 40 and `noise-38` because the
1920 layout doesn't downscale gracefully — see the `@media (max-width: 767px)`
block at the bottom of `option1.scss`.

The scale & centering happens here (option1.scss):

```scss
.newme-bg {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1920px;
  height: 9544px;
  --scale: min(1, calc(100vw / 1920px));     // ← unitless because 1920px / 1920px
  transform: translateX(-50%) scale(var(--scale));
  transform-origin: top center;
  pointer-events: none;
  z-index: 0;
  clip-path: inset(0 -200vw -99999px -200vw); // clip-path crosses filter contexts
}
```

⚠️ **Trap**: `calc(100vw / 1920)` (unitless divisor) returns a *length* and
breaks `min(1, …)`. Always divide by `1920px` so it resolves to a unitless
ratio.

---

## 9. Page architecture (home)

[src/app/page.tsx](src/app/page.tsx) composes the page top-to-bottom:

1. **Header** — fixed, transparent → pine + blur on scroll
2. **Hero** — pine card with portrait, gold + tangerine CTA pair
3. **StatsBand** — 4-column white card (`6,000+ / 100% / 5,000+ / 20,000Kg`)
4. **WhatIsNewMe** — heading + 2 paragraphs + the orange/yellow icon pair
5. **DrPal** — sage card with portrait + bio
6. **Pillars** — 9-pillar dial (orbital arc; mobile = arc + tab below)
7. **Pathways** — tabbed program list with image cards
8. **StructuredCare** — comparison: Typical vs NewME Method
9. **Testimonials** — 3 testimonial cards + RatingsCard (4.6 / shield / 4.7)
10. **Footer** — pine-deep gradient, logo + 3 link columns + newsletter

---

## 10. Imagery

All assets are in `/public`:

- `/newme-logo.png` — main brand mark (240×74)
- `/dr-pal-portrait.png` — DrPal card portrait
- `/images/home/Hero image.webp` — hero photo
- `/images/pathways/{Reset, Rebuild, Sustain, GI-Core, GI-Advanced, NewME-360, NewME-Movement}.webp`
- `/testimonials/{nithya, kat, thamarai}.jpg`
- `/icons/{fitness,mobility,sleep,circadian,stress,digestion,metabolism,community,nutrition}.svg`
  — 9 pillar icon masks (130×130, white-fill paths, used as CSS `mask-image`)

Pillar icons are rendered via `WebkitMaskImage: url('/icons/<name>.svg')`
+ a `backgroundColor` so the icon takes on the active/inactive color.
The order in `PILLARS[]` is: Fitness → Mobility → Sleep → Circadian Rhythm →
Stress → Digestion → Metabolism → Community → Nutrition (`N=9`, `STEP_DEG=40°`).

---

## 11. Accessibility

- Min contrast 4.5:1 body, 3:1 display.
- Focus ring: `2px solid #173B39` offset `2px` on light; `#FEF272` on dark.
- Min target 44×44.
- Accordions and tabs use `<button>` with `aria-expanded`.
- `prefers-reduced-motion` disables animations globally — see globals.css.
- Pages currently set `robots: { index: false, follow: false }` in
  [layout.tsx](src/app/layout.tsx) — site is not yet live. Remove on launch.
