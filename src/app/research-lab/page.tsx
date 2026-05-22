import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import ResearchHero from '@/components/option1/ResearchHero'
import ResearchEvidence from '@/components/option1/ResearchEvidence'

export const metadata: Metadata = {
  title: "Research Lab | Dr. Pal's NewME",
  description:
    'The NewME Research Lab publishes clinical findings drawn directly from our practice — evidence-led protocols and observed patient outcomes.',
}

export default function ResearchLabPage() {
  return (
    <>
      <Header />
      <main className="newme-page">
        {/*
          Page-level atmosphere — Figma artboard is 1920×1970 (much shorter
          than Home's 9544). The site-wide .newme-bg class is sized for Home,
          so this page paints its own scaled bg frame inline.

          Ellipses (Figma artboard coords):
            · Ellipse 28 — green wash, 4480 at top=1807 left=-1306 (mostly
              below visible area; top edge bleeds up via 280px blur)
            · Ellipse 34 — yellow accent, 895×982 at top=1168 left=1452
              (right-side halo behind the "Built On Clinical Evidence" heading)
        */}
        <div
          aria-hidden
          className="newme-bg-rl pointer-events-none"
          style={{
            // Inline `position: absolute` — defeats the `.newme-page > *
            // { position: relative }` rule in option1.scss that would
            // otherwise pin this div in flow and push content down.
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 1920,
            height: 1970,
            transform: 'translateX(-50%) scale(min(1, calc(100vw / 1920px)))',
            transformOrigin: 'top center',
            zIndex: 0,
            clipPath: 'inset(0 -200vw 0 -200vw)',
          }}
        >
          {/* Ellipse 28 — green wash bleeding up from below */}
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
          {/* Ellipse 34 — yellow accent on the right of the evidence section */}
          <span
            className="absolute rounded-full"
            style={{
              width: 1100,
              height: 1100,
              top: 1108,
              left: 1350,
              background: '#FEF272',
              filter: 'blur(280px)',
              opacity: 0.45,
            }}
          />
        </div>

        {/* Figma artboard cap — 1920px. */}
        <div className="newme-frame">
          <ResearchHero />
          <ResearchEvidence />
        </div>
      </main>
      <Footer />
    </>
  )
}
