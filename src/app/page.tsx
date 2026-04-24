import Header from '@/components/option1/Header'
import Hero from '@/components/option1/Hero'
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
        <span aria-hidden className="newme-blob-2" />
        <span aria-hidden className="newme-blob-3" />
        <Hero />
        <WhatIsNewMe />
        <DrPal />
        <Pillars />
        <Pathways />
        <StructuredCare />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
