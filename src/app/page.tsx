import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import WhatIsNewMe from '@/components/sections/WhatIsNewMe'
import DrPal from '@/components/sections/DrPal'
import USPs from '@/components/sections/USPs'
import Pathways from '@/components/sections/Pathways'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="newme-page">
        <Hero />
        <WhatIsNewMe />
        <DrPal />
        <USPs />
        <Pathways />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
