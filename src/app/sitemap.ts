import type { MetadataRoute } from 'next'

/**
 * Sitemap for Dr. Pal's NewME.
 *
 * Combines hardcoded marketing routes with dynamic Sanity-backed entries
 * (Blog Posts + Media listing). Set NEXT_PUBLIC_SITE_URL in .env.local
 * to your canonical domain — defaults to https://newme.health.
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://newme.health').replace(/\/$/, '')

type StaticRoute = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/pathways', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/pathways/metabolic', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pathways/gi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pathways/continuity', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/virtual-clinic', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/research-lab', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/media', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
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
      url: `${SITE_URL}/blog/${p.slug}`,
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
