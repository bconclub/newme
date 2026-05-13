# Changelog

## 2026-05-13 · Sitemap: add /assessment and /cookie-policy, reorder by priority

- Added `/assessment` (priority 0.9, monthly) — primary conversion route, was missing.
- Added `/cookie-policy` (priority 0.3, yearly) — legal page, was missing.
- Reordered routes by intent (top-of-funnel → pathway detail → other primary → conversion-adjacent → legal) and grouped with section comments. No priorities changed for existing routes.
- Documented intentional exclusions: `/page1` (dev scratch), `/studio/...` (admin, noindexed), `/blog/[slug]` (dynamic via Sanity, already wired).

## 2026-05-13 · Seed 3 new blog posts to Sanity

- Added `scripts/seed-blogs-batch2.mjs` (idempotent, mirrors the existing `seed-blogs.mjs` pattern) to push 3 new posts authored by Dr. Pal:
  - `/blog/constipation-remedies-relief-guide` — *Effective Constipation Remedies: How to Relieve Constipation on the Toilet Immediately*
  - `/blog/how-to-calculate-maintenance-calories` — *How to Calculate Maintenance Calories* (BMR + TDEE walkthrough)
  - `/blog/sibo-symptoms-guide` — *SIBO Symptoms: 10 Warning Signs You Shouldn't Ignore*
- Source: 3 `.docx` files from the client. Each post converted to Portable Text (h2/h3/para/bullet/bold/em helpers), tagged, SEO-loaded (metaTitle, metaDescription, keywords), and given a disclaimer. Cover image is intentionally blank — editors will set the hero photo in Studio (same flow as the original 3 posts).

## 2026-05-13 · Assessment badge fix, mobile carousel active=left, shield 2× bigger

- **Assessment pricing badge**: when GI billing toggle is "3 months upfront", the inner pill now reads "GI Core · 3 months Clinical Pathway" (was stuck at "1 month" because `PHASE_META` hardcodes monthly units). Switched to a derived `displayBadge` that rewrites "1 month" → "3 months" when upfront is active.
- **Mobile testimonial carousel**: active card is now the LEFTMOST card in view (with a peek of the next on the right) instead of being virtually centered. Desktop still has 3 cards visible with the middle one active. Implemented via a viewport-aware `activeOffset` (0 mobile, 1 desktop), wired through `isActive`, `activeOrigIdx`, and `goTo`.
- **Trust badge shield**: doubled the shield/check icon size — `clamp(28→56 px, 48→96 px, 48→96 px)`.

## 2026-05-13 · Homepage scroll bug, duration pill, mobile tabs carousel, VC animations

- **Bug fix (Pathways.tsx)**: scrollIntoView no longer fires on initial mount — replaced with an internal horizontal `scrollTo` that only triggers on real tab changes and only when the tab is actually overflowing horizontally. Stops the homepage from auto-scrolling to the "8 Pillars" section on load.
- **Duration pill** on all 3 pathway pages (Metabolic, GI, Continuity): now renders via the shared `<EyebrowPill variant="gold" />` to match the rest of the site's pill style.
- **PathwayTabs**: mobile layout is now a horizontal scroll-snap carousel (no more stacking). Desktop keeps the wrap layout. Scrollbar hidden via `.pathway-tabs-row::-webkit-scrollbar`.
- **Anatomy overlay**: unified `overlayStyle` across all 3 pathway pages (`right: -5%, bottom: -15%, height: 125%`). On mobile, `.pathway-hero-overlay` is shrunk to 78% height, pushed further right (-22%), and dimmed to 55% opacity so it sits behind the heading and tab carousel instead of overlapping them.
- **Virtual Clinic animations**: VCWhatIs, VCHowItWorks, and VCDoctorCard sections extracted into `VCSections.tsx` (client component) with entry animations — heading fades + rises, list items stagger from the left, contact pills lift on hover. Previously these were fully static.

## 2026-05-13 · Ratings card centered + compact, footer hooked up to real pages

- **Ratings card**: now `max-width: clamp(320px, 720/1920×100vw, 720px)` + `mx-auto` so the trust badge sits centered and compact instead of stretching edge-to-edge
- **Footer Quick Links**: expanded to Home, How it Works, Pathways, Virtual Clinic, Dr Pal & Team, Contact — all live with real routes
- **Footer Resources**: replaced placeholder Podcast/NewME App with FAQ, Blog, Media, Research Lab, Take the Assessment — all live
- **Footer bottom row**: Privacy → `/cookie-policy`, Terms → `/terms` (was `#`); switched to `<Link>` for client-side nav
- **Dr Pal & Team href fix**: was `/care-team` (404), now `/team` (matches the actual route)

## 2026-05-13 · Testimonial carousel: Figma-spec inactive cards + real sliding motion

- **Testimonials**: rebuilt as a true sliding carousel — cards now physically translate horizontally on each cycle (5 s auto-advance), with the centered card flipping to active. Active dot is wired to the centered card's testimonial.
- **Inactive card surface (Figma 1:6293)**: restored to translucent white-glass — `linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%)` + `rgba(255,255,255,0.30)`, `2px solid white` border, `backdrop-blur(10.25px)`, `rounded-34`
- **Sage tint (Figma 1:6296)**: Ellipse 55 sage-green radial sized at 128% so it bleeds beyond the card and diffuses through the blur
- **Active card**: scales 0.96 → 1, picks up gold box-shadow (2 px ring + 36 px drop), inactive cards stay at 0.96 with a softer shadow
- **Track**: 12 copies × 3 testimonials = 36 cards rendered; seamless snap-back near end via one-frame `duration: 0` transition
- **Card width**: `78vw` mobile (peek of next card), `clamp(220px, 587/1920×100vw, 587px)` desktop — three visible per row at 1920 ceiling matches Figma

## 2026-05-13 · Testimonials hover fix, darker inactive cards, compact ratings banner

- **Testimonials – option1.scss**: removed `:hover` CSS rules; only `[data-active="true"]` now triggers the white flip, eliminating conflict with the auto-advance timer
- **Testimonials card**: inactive card background deepened to `rgba(3,28,24,0.78)` for stronger contrast against the active white card
- **Ratings card**: reduced py padding (py-5→py-4 mobile, py-8→py-5 desktop), score max 52→38 px, stars max 18→14 px, labels max 22→15 px, shield max 72→48 px — reads as a compact trust badge rather than a tall banner

## 2026-05-13 · Fix pillar count, assessment plan label, and add NewME card entrance animation

- **Pillars**: removed Metabolism pillar; section now shows 8 pillars (heading, body copy, and orbit all updated)
- **Assessment – OrderPage**: "3 months · Save $51" tab now correctly shows "GI Core · 3 month Clinical Pathway" (duration was hardcoded to "1 month" regardless of billing toggle)
- **StructuredCare**: NewME card scales up from 0.88→1 as the section scrolls into view (`whileInView` entrance wrapper, `once: true`, 0.8 s ease)
