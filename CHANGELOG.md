# Changelog

## 2026-05-13 · Testimonials hover fix, darker inactive cards, compact ratings banner

- **Testimonials – option1.scss**: removed `:hover` CSS rules; only `[data-active="true"]` now triggers the white flip, eliminating conflict with the auto-advance timer
- **Testimonials card**: inactive card background deepened to `rgba(3,28,24,0.78)` for stronger contrast against the active white card
- **Ratings card**: reduced py padding (py-5→py-4 mobile, py-8→py-5 desktop), score max 52→38 px, stars max 18→14 px, labels max 22→15 px, shield max 72→48 px — reads as a compact trust badge rather than a tall banner

## 2026-05-13 · Fix pillar count, assessment plan label, and add NewME card entrance animation

- **Pillars**: removed Metabolism pillar; section now shows 8 pillars (heading, body copy, and orbit all updated)
- **Assessment – OrderPage**: "3 months · Save $51" tab now correctly shows "GI Core · 3 month Clinical Pathway" (duration was hardcoded to "1 month" regardless of billing toggle)
- **StructuredCare**: NewME card scales up from 0.88→1 as the section scrolls into view (`whileInView` entrance wrapper, `once: true`, 0.8 s ease)
