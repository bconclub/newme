# Image Guidelines

> What dimensions, formats, and alt text to use for every image uploaded into Sanity. Following these keeps the site fast and SEO-friendly.

---

## File formats

| Format | Use for |
|---|---|
| **WebP** (preferred) | Photos — covers, hero images, OG images |
| **JPG** | Photos when WebP isn't available |
| **PNG** | Logos with transparency, icons |
| **SVG** | Logos with transparency where possible (sharp at any size) |

Avoid GIFs and BMPs.

---

## Dimensions by field

| Field | Aspect ratio | Minimum | Recommended | Max file size |
|---|---|---|---|---|
| Blog Post `coverImage` | 16:9 | 1600 × 900 | 1920 × 1080 | 250 KB |
| Blog Post `seo.ogImage` | 1.91:1 | 1200 × 630 | 1200 × 630 | 200 KB |
| Media Mention `coverImage` | 16:9 | 1200 × 675 | 1600 × 900 | 200 KB |
| Media Outlet `logo` | square or close to it | 256 × 256 | 512 × 512 | 80 KB (PNG) / 30 KB (SVG) |
| Author `avatar` | 1:1 | 256 × 256 | 512 × 512 | 80 KB |
| Testimonial `personAvatar` | 1:1 | 256 × 256 | 512 × 512 | 80 KB |
| Team Member `photo` | 4:5 (portrait) | 800 × 1000 | 1200 × 1500 | 250 KB |
| FAQ inline images (in `answer`) | any | 1200 wide | 1600 wide | 200 KB |

Sanity stores the original; the live site requests sized variants on demand. Uploading larger than the recommended is fine — it doesn't slow the site, just the Studio uploader.

---

## Compression

Before uploading:

- **WebP / JPG** → run through Squoosh, TinyJPG, or similar at quality 80–85%.
- **PNG** with transparency → run through TinyPNG.
- **SVG** → run through SVGOMG.

Target file sizes are in the table above. If your file is double the recommended max after compression, the dimensions are too large.

---

## Alt text — required on every image

Schemas now **require** alt text on every important image (`coverImage`, `ogImage`, `outlet.logo`).

Good alt text:

- Describes **what's in the image** AND **why it's there**.
- Reads naturally if a screen reader speaks it aloud.
- Is **specific** — not "image" or "photo".
- Includes the **primary subject** + **action / context** when relevant.

| ✗ Don't | ✓ Do |
|---|---|
| `image` | `Dr. Pal in his clinic, talking with a patient` |
| `photo of food` | `A bowl of dal with curry leaves and rice on a wooden table` |
| `Forbes` | `Forbes logo` |
| `team` | `The NewME care team standing outside the Bangalore clinic` |

For **decorative images** that add nothing semantic (background patterns, ornaments), set alt to an empty string explicitly — never leave it `undefined`.

---

## Outlet logos

- Use the publication's official logo (download from their press kit when possible).
- Prefer the **horizontal lockup** if both square and horizontal are available — it reads better at the size used on `/media` cards.
- If the publication has a dark and a light version, use the **dark version on a light card** (our cards are white).
- Make sure transparency is preserved — no white box around the logo.

---

## OG images (social sharing)

Every Blog Post should have a dedicated OG image.

- **Exactly 1200 × 630.**
- Brand-consistent: pine-teal background or the post's hero with a dark scrim.
- **Headline overlay** (the post title or a tightened version) in Bricolage Grotesque, white, 48–64px.
- Logo bug in a corner.
- Don't put critical content within 50 px of any edge — Twitter/Slack/etc. crop differently.

If you skip the OG image, Sanity falls back to `coverImage`, which works but converts worse on social.

---

## Naming uploads

Sanity strips most filename info, so naming doesn't drive SEO. But a clean filename helps Studio search:

| ✓ Do | ✗ Avoid |
|---|---|
| `dr-pal-clinic-bangalore.webp` | `IMG_4521.jpeg` |
| `forbes-logo.svg` | `download (3).png` |
| `gut-microbiome-cover-1920x1080.jpg` | `cover.jpg` |
