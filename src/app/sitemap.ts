import type { MetadataRoute } from 'next'

/**
 * Sitemap for Dr. Pal's NewME.
 *
 * Set NEXT_PUBLIC_SITE_URL in .env.local to your canonical domain
 * (e.g. https://newme.health). Falls back to https://newme.health.
 *
 * Blog posts and CMS-managed pages will be appended here once the
 * Sanity (or chosen CMS) integration lands — see TODO at bottom.
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
  // The following are planned but not yet built. They are commented out
  // until the routes exist so we don't ship a sitemap that points at 404s.
  // { path: '/care-team',              changeFrequency: 'monthly', priority: 0.7 },
  // { path: '/contact',                changeFrequency: 'yearly',  priority: 0.5 },
  // { path: '/resources',              changeFrequency: 'weekly',  priority: 0.7 },
  // { path: '/blog',                   changeFrequency: 'daily',   priority: 0.8 },
  // { path: '/legal/privacy-policy',   changeFrequency: 'yearly',  priority: 0.3 },
  // { path: '/legal/terms-of-service', changeFrequency: 'yearly',  priority: 0.3 },
  // { path: '/legal/cookie-policy',    changeFrequency: 'yearly',  priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // TODO: when the CMS is wired up, fetch and append dynamic entries here.
  // Example:
  //   const posts = await getAllBlogPosts()
  //   const blogEntries = posts.map((p) => ({
  //     url: `${SITE_URL}/blog/${p.slug}`,
  //     lastModified: new Date(p.updatedAt),
  //     changeFrequency: 'monthly',
  //     priority: 0.6,
  //   }))
  //   return [...staticEntries, ...blogEntries]

  return staticEntries
}
