import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Programs from '@/components/sections/Programs'
import Mission from '@/components/sections/Mission'
import Benefits from '@/components/sections/Benefits'
import FAQ from '@/components/sections/FAQ'
import Journeys from '@/components/sections/Journeys'
import StatsBand from '@/components/sections/StatsBand'
import Testimonials from '@/components/sections/Testimonials'
import EnrollCTA from '@/components/sections/EnrollCTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programs />
        <Mission />
        <Benefits />
        <FAQ />
        <Journeys />
        <StatsBand />
        <Testimonials />
        <EnrollCTA />
      </main>
      <Footer />
    </>
  )
}
