import type { MetadataRoute } from 'next'

/**
 * Sitemap for Dr. Pal's NewME.
 *
 * Combines hardcoded marketing routes with dynamic Sanity-backed entries
 * (Blog Posts + Media listing). Set NEXT_PUBLIC_SITE_URL in .env.local
 * to your canonical domain — defaults to https://newme.health.
 */

// Same fallback chain as src/app/layout.tsx — explicit env wins; falls
// back to Vercel auto-set deployment URL so preview sitemaps point at the
// actual preview domain instead of the (still WordPress) drpalsnewme.com.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'https://drpalsnewme.com'
}
const SITE_URL = resolveSiteUrl()

type StaticRoute = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

// Routes are listed in roughly descending priority — top-of-funnel +
// conversion paths first, supporting content next, legal pages last.
// Pages that exist in src/app/ but are intentionally NOT listed here:
//   - /studio/...           (Sanity admin, noindexed)
//   - /blogs/[slug]         (dynamic — added below via loadBlogEntries())
//   - /assessment/results   (session-gated deep-link; redirects fresh
//                            visitors to /assessment, so there's no
//                            crawlable content to advertise)
//   - /contact/thank-you    (post-conversion confirmation page — should
//                            never be indexed, otherwise Google may serve
//                            it as a landing page and skew analytics)
const staticRoutes: StaticRoute[] = [
  // Top-of-funnel
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/pathways', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/assessment', changeFrequency: 'monthly', priority: 0.9 },
  // Pathway detail pages
  { path: '/pathways/metabolic', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pathways/gi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pathways/continuity', changeFrequency: 'monthly', priority: 0.8 },
  // Other primary pages
  { path: '/virtual-consult', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blogs', changeFrequency: 'daily', priority: 0.8 },
  { path: '/research-lab', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/media', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  // Conversion-adjacent
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  // Legal
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookie-policy', changeFrequency: 'yearly', priority: 0.3 },
]

type SanityPost = { slug: string; publishedAt?: string; _updatedAt?: string }

async function loadBlogEntries(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const posts = await client.fetch<SanityPost[]>(
      `*[_type == "post" && defined(slug.current) && (noIndex != true)]{
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }`
    )
    return (posts ?? []).map((p) => ({
      url: `${SITE_URL}/blogs/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : (p.publishedAt ? new Date(p.publishedAt) : new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const blogEntries = await loadBlogEntries()

  return [...staticEntries, ...blogEntries]
}
