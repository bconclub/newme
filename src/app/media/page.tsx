import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import MediaHero from '@/components/option1/MediaHero'
import MediaArticles from '@/components/option1/MediaArticles'

export const metadata: Metadata = {
  title: "Media | Dr. Pal's NewME",
  description:
    'NewMe in the media — coverage of our work in metabolic and gut regulation across leading publications.',
}

export default function MediaPage() {
  return (
    <>
      <Header />
      <main className="newme-page">
        {/*
          Page-level atmosphere — Figma artboard is 1920×3218 (taller than
          Research Lab's 1970). Two ellipses lifted from Figma 100:980.

          Ellipses (Figma artboard coords):
            · Ellipse 28 — green wash, 4480 at top=1807 left=-1306 (covers
              the article-grid band, bleeding up through the section heading)
            · Ellipse 34 — yellow accent, 895×982 at top=1845 left=1610
              (right-side halo behind the bottom row of cards)
        */}
        <div
          aria-hidden
          className="newme-bg-media pointer-events-none"
          style={{
            // Inline `position: absolute` defeats the .newme-page > *
            // { position: relative } rule that would otherwise pin this
            // div in flow and push content down.
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
          {/* Ellipse 28 — green wash bleeding up from below the hero */}
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
          {/* Ellipse 34 — yellow accent behind the right side of the grid */}
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

        {/* Figma artboard cap — 1920px. */}
        <div className="newme-frame">
          <MediaHero />
          <MediaArticles />
        </div>
      </main>
      <Footer />
    </>
  )
}
