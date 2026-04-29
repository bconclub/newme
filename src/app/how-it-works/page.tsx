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
        <span aria-hidden className="newme-blob-2" />
        <span aria-hidden className="newme-blob-3" />
        <HIWHero />
        <HIWUnifiedSystem />
        <HIWComparison />
        <HIWWhyEarly />
        <HIWSuccessCards />
        <HIWConditions />
        <HIWHumanGuidance />
        <HIWCTA />
      </main>
      <Footer />
    </>
  )
}
