# /public/pathways

**Used by:** /pathways page (and /pathways/metabolic, /gi, /continuity) — hero photos, pathway category banners, section illustrations.

## How to add an image
1. Drop the file in this folder (recommended naming: `hero.webp`, `section-{name}.webp`, etc.)
2. Reference it in code as `/pathways/{filename}` — e.g. `<Image src="/pathways/hero.webp" />`
3. Follow [docs/image-guidelines.md](../../docs/image-guidelines.md) for dimensions, formats, alt text.

## Conventions
- Lowercase hyphenated filenames (`hero-banner.webp`, not `Hero Banner.webp`).
- WebP for photos, PNG for transparent assets, SVG for icons / illustrations.
- Compress before upload (target listed in `docs/image-guidelines.md`).
- `alt` text is required when the image is rendered — set it on the component, not in the filename.
