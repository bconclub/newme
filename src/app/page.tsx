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
import type { TestimonialItem } from '@/components/option1/Testimonials'

const LOCAL_AVATARS: Record<string, string> = {
  'abilash':    '/testimonials/abilash.webp',
  'jyothi':     '/testimonials/jyothi.webp',
  'kavita':     '/testimonials/kavitha.webp',
  'kavitha':    '/testimonials/kavitha.webp',
  'ramya':      '/testimonials/ramya.webp',
  'sai deepti': '/testimonials/sai deepti.webp',
  'nithya':     '/testimonials/nithya.jpg',
  'karan':      '/testimonials/kat.jpg',
  'thamarai':   '/testimonials/thamarai.jpg',
}

async function loadTestimonials(): Promise<TestimonialItem[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const [{ client }, { testimonialsQuery }, { urlFor }] = await Promise.all([
      import('@/lib/sanity/client'),
      import('@/lib/sanity/queries'),
      import('@/lib/sanity/image'),
    ])
    const docs = await client.fetch(testimonialsQuery)
    return docs.map((d: any) => ({
      quote: d.quote,
      name: d.personName,
      pathway: d.personRole ?? '',
      avatar: d.personAvatar
        ? urlFor(d.personAvatar).width(120).height(120).fit('crop').url()
        : LOCAL_AVATARS[d.personName?.toLowerCase().trim()] ?? null,
    }))
  } catch {
    return []
  }
}

export default async function Home() {
  const sanityTestimonials = await loadTestimonials()
  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Background ellipses — exact Figma spec.
            1920-wide artboard centered on viewport, scaled down at smaller
            widths. Two big moss→pine gradient washes (Ellipse 28 + 38) with
            their own monotone noise overlays, plus three small gold accents
            (Ellipse 34 / 40 / 39). See option1.scss .newme-bg. */}
        <div className="newme-bg" aria-hidden>
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
          <Testimonials initialTestimonials={sanityTestimonials} />
        </div>
      </main>
      <Footer />
    </>
  )
}
