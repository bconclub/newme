# Dr. Pal's NewME — Design System

Single source of truth for visual design. Updated to the official brand palette.

---

## 1. Primary Color Palette

| Token                 | Hex       | Name        | Usage                                            |
| --------------------- | --------- | ----------- | ------------------------------------------------ |
| `--color-pine-teal`   | `#043C39` | Pine Teal   | Primary background, headings on light, surfaces  |
| `--color-light-gold`  | `#FEF272` | Light Gold  | Primary accent, CTAs, highlight text             |
| `--color-tangerine`   | `#FF8547` | Tangerine   | Secondary accent, icons, arrow buttons           |
| `--color-moss-green`  | `#519872` | Moss Green  | Support accent, tags, success, chips             |
| `--color-icy-aqua`    | `#B8FFFD` | Icy Aqua    | Accent color, soft callouts, chip backgrounds    |

### Gradient

- **Warm Gradient** — `linear-gradient(90deg, #FF8547 0%, #FEF272 100%)`  
  Used on: hero highlight marks, badge rings, CTAs with emphasis.

### Derived surfaces (tints of Pine Teal)

| Token                   | Hex       | Usage                                   |
| ----------------------- | --------- | --------------------------------------- |
| `--color-pine-deep`     | `#032E2C` | Page base / deepest background          |
| `--color-pine-card`     | `#0A4A45` | Elevated card surface                   |
| `--color-pine-raised`   | `#0E5551` | Raised card / hover / borders           |
| `--color-pine-divider`  | `rgba(255,255,255,0.10)` | Dividers on dark            |

### Text / borders on dark

| Token                        | Value                        |
| ---------------------------- | ---------------------------- |
| `--color-text-primary`       | `#FFFFFF`                    |
| `--color-text-secondary`     | `rgba(255,255,255,0.75)`     |
| `--color-text-muted`         | `rgba(255,255,255,0.55)`     |
| `--color-border-subtle`      | `rgba(255,255,255,0.10)`     |
| `--color-border-gold-soft`   | `rgba(254,242,114,0.35)`     |

### Soft variants for hover / glass

| Token                    | Hex        | Purpose                               |
| ------------------------ | ---------- | ------------------------------------- |
| `--color-gold-soft`      | `#FFF8B8`  | Yellow hover                          |
| `--color-tangerine-soft` | `#FFAA7A`  | Orange hover                          |
| `--color-aqua-soft`      | `#D4FFFC`  | Aqua hover                            |

---

## 2. Typography

Fonts (loaded via `next/font`):

- **Display** — `Bricolage Grotesque` (500 / 600) — headlines
- **UI** — `Urbanist` (400 / 500 / 600) — nav, buttons, meta
- **Body** — `Poppins` (300 / 400 / 500) — long-form copy, stats

Type scale (desktop → mobile):

| Role        | Desktop  | Mobile | Weight | Font        | Leading |
| ----------- | -------- | ------ | ------ | ----------- | ------- |
| Display XL  | 72px     | 40px   | 600    | Bricolage   | 1.02    |
| Display L   | 56px     | 36px   | 600    | Bricolage   | 1.05    |
| Display M   | 44px     | 32px   | 500    | Bricolage   | 1.10    |
| H2          | 32px     | 26px   | 500    | Bricolage   | 1.15    |
| H3          | 22px     | 20px   | 500    | Bricolage   | 1.25    |
| Body L      | 18px     | 16px   | 400    | Poppins     | 1.55    |
| Body M      | 16px     | 14px   | 400    | Poppins     | 1.55    |
| Caption     | 13px     | 12px   | 400    | Urbanist    | 1.4     |
| Eyebrow     | 12px UC  | 11px   | 500    | Urbanist    | 1.2     |

Rules:

- Headings default to Bricolage; always tracking `-0.01em`.
- Body copy defaults to Poppins.
- Emphasise with **Light Gold (`#FEF272`)** — never italics.

---

## 3. Layout

- Max content width: `1280px` for narrow sections, `1480px` for hero.
- Horizontal gutters: `24px` mobile, `48px` tablet, `80px` desktop.
- Section vertical rhythm: `96px` desktop, `64px` mobile.
- Grid: 12-column desktop, 4-column mobile, `24px` gutter.

---

## 4. Elevation & Corners

| Token            | Value                                        |
| ---------------- | -------------------------------------------- |
| `--radius-sm`    | `10px`                                       |
| `--radius-md`    | `16px`                                       |
| `--radius-lg`    | `24px`                                       |
| `--radius-xl`    | `32px`                                       |
| `--radius-pill`  | `9999px`                                     |
| `--shadow-card`  | `0 30px 60px -20px rgba(0,0,0,0.45)`         |
| `--shadow-glow`  | `0 0 80px rgba(254,242,114,0.22)`            |

---

## 5. Components

### Buttons

- **Primary (Light Gold Pill)** — bg `#FEF272`, text `#043C39`, Urbanist 500, `14px`, padding `14px 28px`, radius pill. Hover bg `#FFF8B8`.
- **Secondary (Ghost Gold)** — transparent, border `rgba(254,242,114,0.35)`, text `#FEF272`. Hover bg `rgba(255,255,255,0.05)`.
- **Arrow Circle (Tangerine)** — `44 × 44`, bg `#FF8547`, white `↗`, hover `#FFAA7A`.

### Badges / Icon chips

- Round gold badge — `72 × 72` circle, bg `#FEF272`, icon `#043C39`.
- Moss chip — pill, bg `#519872`, white text.
- Aqua chip — pill, bg `#B8FFFD`, text `#043C39`.

### Cards

- **Glass** — `bg: rgba(255,255,255,0.06)`, border `rgba(255,255,255,0.10)`, radius `lg`, `backdrop-filter: blur(14px)`.
- **Solid (pine-card)** — bg `#0A4A45`, radius `xl`.
- **Raised (pine-raised)** — bg `#0E5551`, radius `xl`, `shadow-card`.

### Navigation

- Transparent on hero; darkens to `#043C39 / 85%` when scrolled > 40px.
- Active link: underline Light Gold, 2px.
- Mobile menu: full-screen overlay Pine Teal `#043C39`.

---

## 6. Sections

1. **Hero** — Doctor-Led Care. Full-bleed doctor image; bottom-left L-shaped notch carved with Pine Teal; glass info bar fills the notch.
2. **Clinical System** — Centered copy + 3 round gold icon badges.
3. **Clinical Expertise** — Doctor portrait + copy, gold accent on title.
4. **8 Pillars of Health** — Radial orbiting circles around a Light Gold NewME core.
5. **Pathways to Better Health** — Tabs (Light Gold active state) + image.
6. **What Structured Care Looks Like** — 5 glass cards.
7. **Real Patients, Real Experiences** — 3 cards + 4.6 / 4.7 rating cards (Light Gold background).
8. **Footer** — Pine Teal gradient, Light Gold headings + border.

---

## 7. Motion

- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Durations: `180ms` micro, `360ms` standard, `600ms` reveal.
- Page reveal: fade + translate `y: 16px → 0`.
- Buttons: scale `0.98` on active, no bounce.

---

## 8. Accessibility

- Min contrast 4.5:1 for body, 3:1 for large text.
- Focus ring: `2px solid #FEF272`, offset `2px`.
- All interactive elements ≥ `44 × 44`.
- `prefers-reduced-motion`: disables non-essential motion.

---

## 9. Imagery

- Real clinical photography, warm neutral tones.
- On hero images: `linear-gradient(92deg, rgba(4,60,57,0.92) 0%, rgba(4,60,57,0.45) 55%, rgba(4,60,57,0) 100%)` scrim for text legibility.
- Subtle film grain (`opacity: 0.04`) on large image blocks.
