import { NextResponse } from 'next/server'

/**
 * /llms.txt — served from the Sanity `llmsTxt` singleton.
 *
 * Editors update the content from Studio → Site → llms.txt. Changes
 * propagate within ~60 s (the Next.js data cache layer + Sanity CDN edge).
 *
 * llms.txt is an emerging discoverability standard (https://llmstxt.org).
 * AI assistants (ChatGPT, Claude, Perplexity, Gemini) check this file
 * for a curated summary of the site before parsing rendered HTML.
 *
 * Fallback: if Sanity is unreachable OR the doc has no content, the
 * handler returns a minimal markdown stub so we never serve a 404 here.
 * The full content lives in the schema's `initialValue` and is editable
 * from Studio after the singleton is opened once.
 *
 * Replaced the previous static `public/llms.txt`. The static-file
 * version meant the SEO team had to ask a developer to update the brand
 * description; now they can do it themselves from Studio.
 */

const FALLBACK_BODY = [
  "# Dr. Pal's NewME",
  '',
  '> A doctor-led clinical system for metabolic and gut regulation,',
  '> founded by Dr. Palaniappan Manickam, MD.',
  '',
  'See https://drpalsnewme.com for the full site.',
  '',
].join('\n')

export const revalidate = 60

async function fetchContent(): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const { client } = await import('@/lib/sanity/client')
    const doc = await client.fetch<{ content?: string } | null>(
      `*[_id == "site-llms-txt"][0]{content}`,
    )
    const content = doc?.content?.trim()
    return content && content.length > 0 ? content : null
  } catch {
    return null
  }
}

export async function GET() {
  const content = (await fetchContent()) ?? FALLBACK_BODY
  return new NextResponse(content, {
    status: 200,
    headers: {
      // text/markdown so AI assistants (and humans viewing in a browser)
      // get the right Content-Type. UTF-8 to preserve any em-dashes etc.
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=120',
    },
  })
}
