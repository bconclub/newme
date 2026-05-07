import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import MediaHero from '@/components/option1/MediaHero'
import MediaArticles from '@/components/option1/MediaArticles'
import { mediaMentionsQuery } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: "Media | Dr. Pal's NewME",
  description:
    'NewME in the media — coverage of our work in metabolic and gut regulation across leading publications.',
}

/** Revalidate the listing every 60s in production so newly added
 *  Sanity Mentions surface without a fresh deploy. */
export const revalidate = 60

export type MediaMention = {
  _id: string
  title: string
  excerpt?: string
  publishedAt: string
  externalUrl: string
  coverImage?: { asset?: { _ref?: string }; alt?: string } & Record<string, unknown>
  outlet?: {
    _id: string
    name: string
    slug?: string
    logo?: { asset?: { _ref?: string }; alt?: string } & Record<string, unknown>
    website?: string
  }
}

/** Build-safe Sanity fetch — guards on env vars and dynamically imports
 *  the client so missing creds during a Vercel preview build don't crash
 *  the page. Returns [] when Sanity is unreachable; the listing component
 *  falls back to its hardcoded sample mentions in that case. */
async function loadMentions(): Promise<MediaMention[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const data = await client.fetch<MediaMention[]>(mediaMentionsQuery)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export default async function MediaPage() {
  const mentions = await loadMentions()

  return (
    <>
      <Header />
      <main className="newme-page">
        {/*
          Page-level atmosphere — Figma artboard is 1920×3218.
          Two ellipses lifted from Figma 100:980.
        */}
        <div
          aria-hidden
          className="newme-bg-media pointer-events-none"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 1920,
            height: 3218,
            transform: 'translateX(-50%) scale(min(1, calc(100vw / 1920px)))',
            transformOrigin: 'top center',
            zIndex: 0,
            clipPath: 'inset(0 -200vw 0 -200vw)',
          }}
        >
          {/* Ellipse 28 — green wash */}
          <span
            className="absolute rounded-full"
            style={{
              width: 4480,
              height: 4480,
              top: 1807,
              left: -1306,
              background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
              filter: 'blur(280px)',
              opacity: 0.32,
              maskImage:
                'radial-gradient(closest-side, black 0%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(closest-side, black 0%, transparent 100%)',
            }}
          />
          {/* Ellipse 34 — yellow accent */}
          <span
            className="absolute rounded-full"
            style={{
              width: 1100,
              height: 1100,
              top: 1785,
              left: 1500,
              background: '#FEF272',
              filter: 'blur(300px)',
              opacity: 0.40,
            }}
          />
        </div>

        <div className="newme-frame">
          <MediaHero />
          <MediaArticles mentions={mentions} />
        </div>
      </main>
      <Footer />
    </>
  )
}
