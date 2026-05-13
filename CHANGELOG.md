# Changelog

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
