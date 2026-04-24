# Dr. Pal's NewME — Design System

Source of truth: Figma file `CrcIFtZCH8PDLyKHcQrRFZ`, node `2002:470`.
Tokens extracted via `scripts/extract-tokens.mjs` from `figma/node.json`.

---

## 1. Color palette (from Figma, ranked by usage)

| Token                   | Hex         | Usage                                                                    |
| ----------------------- | ----------- | ------------------------------------------------------------------------ |
| `--color-ink`           | `#000000`   | Default text on light surfaces, headings in Programs / Benefits / FAQ    |
| `--color-pine-teal`     | `#173B39`   | Hero background, Enroll CTA band, primary button bg, footer base         |
| `--color-pine-deep`     | `#013E37`   | Secondary pine shade (edges, accents within hero)                        |
| `--color-white`         | `#FFFFFF`   | Section backgrounds, card fills, button text on dark                     |
| `--color-light-gold`    | `#FEF272`   | Hero accent text ("It's a signal."), chip backgrounds                    |
| `--color-gold-soft`     | `#FDF185`   | Hover state for gold elements                                            |
| `--color-moss-green`    | `#629675`   | Circular icon strokes, small accents (swirls in cards)                   |
| `--color-tangerine`     | `#FF8547`   | Arrow CTA icon background                                                |
| `--color-tangerine-alt` | `#F08B55`   | Tangerine hover / alternate shade                                        |
| `--color-ice-mint`      | `#E3FFED`   | Soft mint chip / tag background                                          |
| `--color-ice-aqua`      | `#C7FDFC`   | Soft aqua accent                                                         |
| `--color-surface-gray`  | `#D9D9D9`   | Testimonial / Stats / Mission card fill, placeholder image bg            |
| `--color-surface-soft`  | `#F3F3F3`   | Program card outer background                                            |
| `--color-surface-faint` | `#F9F9F9`   | Alternate section tints                                                  |
| `--color-muted`         | `#444444`   | Secondary body text on light                                             |
| `--color-muted-soft`    | `#BCBCBC`   | Tertiary copy, labels                                                    |
| `--color-white-30`      | `rgba(255,255,255,0.30)` | Dividers on dark                                            |

Overlay / state tokens:
- `--color-gold-soft-overlay`: `rgba(254,242,114,0.31)` — hero stat chips
- `--color-white-overlay-soft`: `rgba(255,255,255,0.06)` — glass bands on dark

---

## 2. Typography

Bricolage Grotesque is used broadly — display, subhead, and body — with Urbanist
for captions / longer meta and Poppins reserved for pill button labels.

| Role             | Font                   | Weight | Desktop size | Line-height |
| ---------------- | ---------------------- | ------ | ------------ | ----------- |
| Display XL       | Bricolage Grotesque    | 600    | 72px         | 1.04        |
| Display L        | Bricolage Grotesque    | 600    | 56px         | 1.06        |
| H2               | Bricolage Grotesque    | 500    | 40px         | 1.15        |
| H3               | Bricolage Grotesque    | 500    | 24px         | 1.25        |
| Eyebrow          | Bricolage Grotesque    | 400    | 20px         | 1.3         |
| Body             | Bricolage Grotesque    | 300-400 | 16-20px      | 1.55        |
| Meta / caption   | Urbanist               | 400/500 | 14-24px      | 1.4         |
| Button label     | Poppins                | 400    | 16px         | 1           |

Rules:
- Never italics. Emphasise with Light Gold `#FEF272` on dark, or black underline on light.
- Default tracking `-0.01em` on display sizes; normal elsewhere.

---

## 3. Layout

- Max content width: `1440px` for standard sections, `1800px` only for edge-to-edge
  gray bands (stats, journeys).
- Horizontal gutters: `20px` mobile, `56px` tablet, `96px` desktop.
- Section vertical rhythm: `120px` desktop, `72px` mobile.
- Cards: `24px` inner padding, `32px` outer gap.

---

## 4. Elevation & Corners

| Token           | Value                                        |
| --------------- | -------------------------------------------- |
| `--radius-sm`   | `12px`                                       |
| `--radius-md`   | `20px`                                       |
| `--radius-lg`   | `28px`                                       |
| `--radius-xl`   | `40px`                                       |
| `--radius-pill` | `9999px`                                     |
| `--shadow-card` | `0 14px 40px -20px rgba(0,0,0,0.18)`         |

---

## 5. Components

### Buttons

- **Primary (Pine pill)** — bg `#173B39`, text white, Poppins 400 16px, padding `14px 28px`, radius pill. Hover bg `#0E2827`.
- **Ghost (outline pine)** — transparent, border `rgba(0,0,0,0.2)`, text `#000`. Hover bg `#F3F3F3`.
- **Gold (hero accent)** — bg `#FEF272`, text `#173B39`. Hover bg `#FDF185`.
- **Arrow link** — inline "View programs ↗" / "View all Benefits ↗" — Bricolage 500 16px, small arrow icon right. Hover: underline.
- **Icon arrow (ghost circle)** — 48×48 round, border `#000`, arrow `↗` black. Used as "View all" trailing controls.

### Stat callouts (hero)

Rounded card, yellow bg with low opacity (`rgba(254,242,114,0.31)`), large Bricolage 600 number, Urbanist label below. Examples: `100%` + "Wellness programs", `900+` + "Happy customers".

### Program card

- Outer radius `28px`, bg `#D9D9D9` (or `#F3F3F3`).
- Inner image well: radius `20px`, bg white placeholder, aspect ~4:3.
- Title: Bricolage 600 28px, `#000`.
- Body: Bricolage 400 16px, `#444`.
- Footer link: "View programs ↗" Bricolage 500 16px.

### Mission / quote card

- Rounded `40px`, bg `#D9D9D9`, black text centered.
- Five stars above copy.
- Attribution row at bottom: name (Bricolage 500 16px) + role (Urbanist 400 12px, uppercase, tracking `0.08em`).
- Trailing CTA pill: "Book an Appointment".

### FAQ accordion

- Item divider-only style (no card), 32px vertical padding between.
- Question: Bricolage 500 24px `#000`, right-aligned + icon.
- Answer: Bricolage 300 20px `#444`.
- "Still have questions?" side card: bg `#E8E8E8`, radius `24px`, with "Ask a Question" white pill.

### Testimonial card

- Radius `28px`, bg `#F3F3F3`.
- Quote: Bricolage 400 20px `#000`, leading `1.5`.
- Author line: avatar circle `48px` bg `#000`, name Bricolage 500 18px, location Urbanist 400 14px `#666`.
- Decorative swirl + giant `"` glyph bottom-right in moss tint.

### Navigation (Header)

- Transparent over hero (logo + links white).
- Links: Urbanist 500 14px, gap `32px`.
- Trailing CTA pill "Start My Assessment" Poppins 400 16px, bg `#FEF272` text `#173B39`.

---

## 6. Sections (top → bottom)

1. **Hero** — Pine teal `#173B39`. Left: H1 ("Your body has stopped responding. That's not a failure. **It's a signal.**"), body copy, stat callouts (100%, 900+), CTA "Start My Assessment". Right: Dr. Pal portrait with cream swirl vector behind.
2. **Our Programs** — Light section. "Pick a Wellness Program that's right for you" + intro copy. 4 gray program cards in a row (PCOS Programs, etc), arrow link per card.
3. **Mission quote** — Centered gray `#D9D9D9` rounded card with 5 stars + dedicated-mission quote + Samson attribution + "Book an Appointment" pill.
4. **What will you get? (Benefits)** — Eyebrow `• Benefits`, trailing "View all Benefits ↗". Left: H1 + lead. Right: 3 cards with numbered moss swirl circles (01/02/03), subtitle + body.
5. **Frequently Asked Questions** — Eyebrow + trailing "↗". H1 left + lead. Below: accordion list. Side block "Still have questions?" card + ask pill.
6. **Transformative Journeys** — Eyebrow `• Transitions`, trailing "View all Transformations ↗" + paginator arrows. Big H1 + lead. 4 video thumbnail cards with name + quote.
7. **Get more out of medicine** (Stats band) — Full-width gray `#D9D9D9` rounded rect; left headline, right 92% / 87% / 66k rows with descriptions.
8. **Testimonials** — Eyebrow `• Testimonials`. H1 + lead. 3 testimonial cards row with swirl watermarks.
9. **Enroll CTA band** — Pine teal `#173B39` rounded rect with "Enroll with NewME Now" + lead + gold pill CTA.
10. **Footer** — Pine teal, logo + newsletter + socials, 4-column link list (Quick Links / Care / What We Offer / Resources), address + phone + email, thin copyright row.

---

## 7. Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Reveal: fade + translate `y: 12px → 0`, 420ms, stagger 80ms between siblings.
- Hover: 180ms. Press: scale `0.98`.
- Respect `prefers-reduced-motion`.

---

## 8. Accessibility

- Min contrast 4.5:1 on body, 3:1 for display text.
- Focus ring: `2px solid #173B39` offset `2px` on light; `#FEF272` on dark.
- Min target `44 × 44`.
- Accordion items `<button>` with `aria-expanded`.

---

## 9. Imagery

- Doctor portrait (Dr. Pal) on hero right — warm tones, ~824×874 source. Use `/public/dr-pal-portrait.png`.
- Cream swirl vector (ornamental) surrounds or backs portraits in hero, testimonials, FAQ "still have questions" card, and mission card. Color `#FFF1D6` / cream.
- Program and Journey image wells: placeholder neutral gray until assets are provided.
