# Changelog

## 2026-05-13 · Fix pillar count, assessment plan label, and add NewME card entrance animation

- **Pillars**: removed Metabolism pillar; section now shows 8 pillars (heading, body copy, and orbit all updated)
- **Assessment – OrderPage**: "3 months · Save $51" tab now correctly shows "GI Core · 3 month Clinical Pathway" (duration was hardcoded to "1 month" regardless of billing toggle)
- **StructuredCare**: NewME card scales up from 0.88→1 as the section scrolls into view (`whileInView` entrance wrapper, `once: true`, 0.8 s ease)
