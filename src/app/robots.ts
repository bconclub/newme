import type { MetadataRoute } from 'next'

/**
 * Pre-launch site-wide block.
 *
 * Disallows EVERY path for EVERY crawler. We do not want Google or any
 * other bot indexing the marketing site or the assessment app while
 * content migration to Sanity is still in progress.
 *
 * This is one of THREE layers blocking indexing — keep them in sync:
 *   1. `src/app/robots.ts`           ← this file (robots.txt)
 *   2. `next.config.ts` headers()    ← X-Robots-Tag response header
 *   3. `src/app/layout.tsx` metadata ← <meta name="robots" ...> tag
 *
 * At launch, ALL THREE must be removed together. Until then, do not
 * add any `allow:` rules here — they undo the disallow.
 *
 * Sitemap is intentionally NOT advertised here so crawlers don't get
 * a map of pages they're already blocked from indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  }
}
