import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import MediaArticleHero from '@/components/option1/MediaArticleHero'
import MediaArticleBody from '@/components/option1/MediaArticleBody'
import MediaRelated from '@/components/option1/MediaRelated'
import {
  articleFromSanity,
  articles,
  getArticle,
  getRelatedCards,
  type Article,
} from '@/lib/articles'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import {
  articleBySlugQuery,
  articleSlugsQuery,
} from '@/lib/sanity/queries'

type Params = { slug: string }

export const revalidate = 60

async function loadArticle(slug: string): Promise<Article | undefined> {
  // Sanity first; fall back to the in-code store if no document or if the
  // env isn't configured (env.ts throws on missing project id at first read).
  try {
    const doc = await client.fetch<Parameters<typeof articleFromSanity>[0]>(
      articleBySlugQuery,
      { slug },
    )
    if (doc) {
      const fromSanity = articleFromSanity(doc, (ref) =>
        ref?.asset?._ref ? urlFor(ref).width(1600).url() : undefined,
      )
      if (fromSanity) return fromSanity
    }
  } catch {
    // Sanity unreachable / not configured — fall through.
  }
  return getArticle(slug)
}

export async function generateStaticParams() {
  const localSlugs = Object.keys(articles)
  let cmsSlugs: string[] = []
  try {
    cmsSlugs = await client.fetch<string[]>(articleSlugsQuery)
  } catch {
    // Sanity unreachable — only prerender the local fallback set.
  }
  const all = Array.from(new Set([...localSlugs, ...cmsSlugs]))
  return all.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await loadArticle(slug)
  if (!article) {
    return {
      title: "Article not found | Dr. Pal's NewME",
    }
  }
  return {
    title: `${article.title} | Dr. Pal's NewME`,
    description: article.subtitle,
  }
}

export default async function MediaArticlePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const article = await loadArticle(slug)
  if (!article) notFound()

  const related = getRelatedCards(slug, 3)

  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Page-level atmosphere — Figma 107:69 ellipses.
            Recipe matches .newme-ellipse-28 / .vc-bg-ellipse-28 from
            option1.scss: multi-stop radial mask + heavier blur so the
            ellipse boundary dissolves into the page bg, plus a soft-light
            noise overlay on the green wash to camouflage the gradient seam.

            Figma ellipse positions (from MCP metadata, node 107:69):
              · Ellipse 28 (107:71) — (-1306, 1807) 4480×4480 green wash
              · Ellipse 34 (107:2408) — (1610, 1845) 895×981 #FEF272 RIGHT
              · Ellipse 39 (107:2409) — (-659, 3185) 895×981 #FEF272 LEFT
            (Ellipse 38 at y=6241 sits off-canvas for this 5863-tall page.) */}
        <div
          aria-hidden
          className="article-bg pointer-events-none"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 1920,
            height: 5863,
            transform: 'translateX(-50%) scale(min(1, calc(100vw / 1920px)))',
            transformOrigin: 'top center',
            zIndex: 0,
            clipPath: 'inset(0 -200vw -99999px -200vw)',
          }}
        >
          {/* Ellipse 28 — green wash. */}
          <span
            className="absolute rounded-full article-ellipse-28"
            style={{
              width: 4480,
              height: 4480,
              top: 1807,
              left: -1306,
              background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
              filter: 'blur(440px)',
              opacity: 0.42,
              maskImage:
                'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 92%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 92%, transparent 100%)',
            }}
          />
          {/* Noise on Ellipse 28 — soft-light fractal grain so the wash
              boundary doesn't read as a curved seam. */}
          <span
            className="absolute rounded-full article-noise-28"
            style={{
              width: 4480,
              height: 4480,
              top: 1807,
              left: -1306,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '220px 220px',
              mixBlendMode: 'soft-light',
              opacity: 0.45,
              maskImage:
                'radial-gradient(closest-side, black 0%, black 65%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.25) 92%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(closest-side, black 0%, black 65%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.25) 92%, transparent 100%)',
            }}
          />
          {/* Ellipse 34 — right-side gold accent. */}
          <span
            className="absolute rounded-full article-ellipse-34"
            style={{
              width: 895,
              height: 981,
              top: 1845,
              left: 1610,
              background: '#FEF272',
              filter: 'blur(280px)',
              opacity: 0.5,
            }}
          />
          {/* Ellipse 39 — left-side gold accent. */}
          <span
            className="absolute rounded-full article-ellipse-39"
            style={{
              width: 895,
              height: 981,
              top: 3185,
              left: -659,
              background: '#FEF272',
              filter: 'blur(280px)',
              opacity: 0.45,
            }}
          />
        </div>

        <div className="newme-frame">
          <MediaArticleHero article={article} />
          <MediaArticleBody article={article} />
          <MediaRelated cards={related} />
        </div>
      </main>
      <Footer />
    </>
  )
}
