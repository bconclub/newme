import { NextResponse, type NextRequest } from 'next/server'

/**
 * CMS-driven redirects.
 *
 * On every request to a site path (excluding static assets, API, and
 * Studio), fetch the active `redirect` documents from Sanity and check
 * if the request path matches one. If it does, issue a 308 (permanent)
 * or 307 (temporary) redirect — preserving any query string on the
 * incoming request.
 *
 * The Sanity fetch is cached via Next's data cache with `revalidate: 60`,
 * so each edge node refetches the redirect table at most once a minute.
 * Editors will see new redirects take effect within ~60 s of publishing
 * in Studio (no deploy required).
 *
 * Why middleware (not next.config.ts redirects()):
 *   - `next.config.ts` redirects() runs at build time only — adding a
 *     redirect would require redeploying the site.
 *   - Middleware runs on every request, fetches dynamically, supports
 *     CMS-driven workflows.
 *
 * Why fetch the table on every request (not just when the path matches):
 *   - We don't know which paths have redirects without knowing the
 *     table. Caching the FULL table (typically tiny — < 5 KB) is cheap.
 *   - The cached fetch is a single response that all incoming requests
 *     in a given 60 s window share.
 */

type Redirect = {
  source: string
  destination: string
  permanent: boolean
}

function getSanityUrl(): string | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  if (!projectId || !dataset) return null
  // GROQ — fetch only the fields we need for active redirects.
  const query = `*[_type=="redirect" && enabled==true && defined(source) && defined(destination)]{source,destination,permanent}`
  // Use `apicdn.sanity.io` — globally cached, ~10s freshness from Sanity's side.
  return `https://${projectId}.apicdn.sanity.io/v2024-10-01/data/query/${dataset}?query=${encodeURIComponent(query)}`
}

async function fetchRedirects(): Promise<Redirect[]> {
  const url = getSanityUrl()
  if (!url) return []
  try {
    const res = await fetch(url, {
      // 60s revalidate at the Next.js data-cache layer + Sanity CDN's own
      // ~10s edge cache. Combined: editors see new redirects within ~60s.
      next: { revalidate: 60, tags: ['redirects'] },
    })
    if (!res.ok) return []
    const data = (await res.json()) as { result?: Redirect[] }
    return Array.isArray(data.result) ? data.result : []
  } catch {
    return []
  }
}

/** Strip a trailing slash unless the path is just "/". */
function normalize(path: string): string {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const redirects = await fetchRedirects()
  if (redirects.length === 0) return NextResponse.next()

  const inputPath = normalize(pathname)
  const match = redirects.find((r) => normalize(r.source) === inputPath)
  if (!match) return NextResponse.next()

  // Build the destination URL.
  // - If destination is absolute (http(s)://...) → redirect to it directly,
  //   preserving the incoming query string.
  // - If destination is a relative path → resolve against current origin.
  let destination: string
  if (/^https?:\/\//i.test(match.destination)) {
    const url = new URL(match.destination)
    if (search && !url.search) url.search = search
    destination = url.toString()
  } else {
    const url = new URL(match.destination, request.nextUrl.origin)
    if (search && !url.search) url.search = search
    destination = url.toString()
  }

  // Defensive guard against self-redirects that slipped past schema validation.
  if (destination === request.nextUrl.toString()) return NextResponse.next()

  return NextResponse.redirect(destination, match.permanent ? 308 : 307)
}

/**
 * Matcher: run middleware on everything EXCEPT
 *   - /_next/* (build assets, image optimisation)
 *   - /api/*   (API routes; redirects don't apply to JSON endpoints)
 *   - /studio* (Sanity Studio mount)
 *   - common public files (favicon, robots, sitemap, well-known)
 *   - file-extension paths (anything with a dot — covers images, fonts, CSS)
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|studio|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)',
  ],
}
