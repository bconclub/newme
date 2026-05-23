import { NextResponse } from 'next/server'

/**
 * /robots.txt — served from the Sanity `robotsTxt` singleton.
 *
 * Editors update the content from Studio → Site → robots.txt. Changes
 * propagate within ~60 s (the Next.js data cache layer + Sanity CDN edge).
 *
 * Fallback: if Sanity is unreachable OR the doc has no content, the
 * handler returns "User-agent: * / Disallow: /" — the SAFE default that
 * keeps the site noindexed. Never accidentally exposes a half-built site.
 *
 * Replaced the previous static `src/app/robots.ts` (which used Next.js
 * MetadataRoute.Robots) because that pattern is build-time only and
 * can't read from Sanity at request time.
 */

// Post-launch fallback — if Sanity is unreachable, serve a minimal
// "allow + sitemap" response. We deliberately don't block crawlers as
// the fallback anymore (was `Disallow: /` pre-launch) because the site
// IS supposed to be indexed; a momentary Sanity outage shouldn't
// accidentally noindex everything.
const FALLBACK_BODY = [
  'User-agent: *',
  'Allow: /',
  '',
  'Sitemap: https://drpalsnewme.com/sitemap.xml',
  '',
].join('\n')

// 60s revalidate matches the redirects middleware cache for consistency.
export const revalidate = 60

async function fetchContent(): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const { client } = await import('@/lib/sanity/client')
    const doc = await client.fetch<{ content?: string } | null>(
      `*[_id == "site-robots-txt"][0]{content}`,
    )
    const content = doc?.content?.trim()
    return content && content.length > 0 ? content : null
  } catch {
    // Network / auth / parse error — fall back to safe default.
    return null
  }
}

export async function GET() {
  const content = (await fetchContent()) ?? FALLBACK_BODY
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Edge + browser cache for 60s; matches `revalidate`.
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
    },
  })
}
