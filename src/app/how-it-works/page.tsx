import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import HIWHero from '@/components/option1/HIWHero'
import HIWUnifiedSystem from '@/components/option1/HIWUnifiedSystem'
import HIWComparison from '@/components/option1/HIWComparison'
import HIWWhyEarly from '@/components/option1/HIWWhyEarly'
import HIWSuccessCards from '@/components/option1/HIWSuccessCards'
import HIWConditions from '@/components/option1/HIWConditions'
import HIWHumanGuidance from '@/components/option1/HIWHumanGuidance'
import HIWCTA from '@/components/option1/HIWCTA'

export const metadata: Metadata = {
  title: 'How It Works | Dr. Pal\'s NewME',
  description:
    'How NewME structures care across assessment, pathways, and continuity — a doctor-led clinical system for metabolic and gut regulation.',
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Background ellipses — Figma 58:20 (1920×10892 artboard).
            Two green gradient washes (Ellipse 28 + 38) with monotone noise
            overlays, plus three #FEF272 yellow accents (Ellipse 34 / 39 / 67)
            placed per the HIW artboard spec. See option1.scss .hiw-bg. */}
        <div className="hiw-bg" aria-hidden>
          <span className="hiw-ellipse hiw-ellipse-28" />
          <span className="hiw-noise hiw-noise-28" />
          <span className="hiw-ellipse hiw-ellipse-38" />
          <span className="hiw-noise hiw-noise-38" />
          <span className="hiw-ellipse hiw-ellipse-34" />
          <span className="hiw-ellipse hiw-ellipse-39" />
          <span className="hiw-ellipse hiw-ellipse-67" />
        </div>
        <div className="newme-frame">
          <HIWHero />
          <HIWUnifiedSystem />
          <HIWComparison />
          <HIWWhyEarly />
          <HIWSuccessCards />
          <HIWConditions />
          <HIWHumanGuidance />
          <HIWCTA />
        </div>
      </main>
      <Footer />
    </>
  )
}
