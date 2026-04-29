import Header from '@/components/option1/Header'
import Hero from '@/components/option1/Hero'
import StatsBand from '@/components/option1/StatsBand'
import WhatIsNewMe from '@/components/option1/WhatIsNewMe'
import DrPal from '@/components/option1/DrPal'
import Pillars from '@/components/option1/Pillars'
import Pathways from '@/components/option1/Pathways'
import StructuredCare from '@/components/option1/StructuredCare'
import Testimonials from '@/components/option1/Testimonials'
import Footer from '@/components/option1/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Background ellipses — exact Figma spec.
            1920-wide artboard centered on viewport, scaled down at smaller
            widths. Two big moss→pine gradient washes (Ellipse 28 + 38) with
            their own monotone noise overlays, plus three small gold accents
            (Ellipse 34 / 40 / 39). See option1.scss .newme-bg. */}
        <div
          className="newme-bg"
          aria-hidden
          style={{ transform: 'translateX(-50%) scale(min(calc(100vw / 1920px), 1))' }}
        >
          <span className="newme-ellipse newme-ellipse-28" />
          <span className="newme-noise newme-noise-28" />
          <span className="newme-ellipse newme-ellipse-38" />
          <span className="newme-noise newme-noise-38" />
          <span className="newme-ellipse newme-ellipse-34" />
          <span className="newme-ellipse newme-ellipse-39" />
          <span className="newme-ellipse newme-ellipse-40" />
        </div>
        {/* Figma artboard cap — 1920px. Sections sit inside this and own
            their own left/right gutter (Hero: 20, Stats/DrPal: 60). */}
        <div className="newme-frame">
          <Hero />
          <StatsBand />
          <WhatIsNewMe />
          <DrPal />
          <Pillars />
          <Pathways />
          <StructuredCare />
          <Testimonials />
        </div>
      </main>
      <Footer />
    </>
  )
}
