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

// All testimonial images available in /public/testimonials/.
// We match by *normalized name prefix* so "Jyoti"/"Jyothi" and
// "Sai Deepthi"/"Sai Deepti" both resolve to the right file even when
// Sanity spells the name slightly differently.
const LOCAL_AVATAR_FILES = [
  { match: 'abilash',   src: '/testimonials/abilash.webp' },
  { match: 'jyoti',     src: '/testimonials/jyothi.webp' },     // "Jyoti" / "Jyothi"
  { match: 'kavit',     src: '/testimonials/kavitha.webp' },    // "Kavita" / "Kavitha"
  { match: 'ramya',     src: '/testimonials/ramya.webp' },
  { match: 'saideep',   src: '/testimonials/sai%20deepti.webp' }, // "Sai Deepti" / "Sai Deepthi"
  { match: 'nithya',    src: '/testimonials/nithya.jpg' },
  { match: 'karan',     src: '/testimonials/kat.jpg' },
  { match: 'thamarai',  src: '/testimonials/thamarai.jpg' },
] as const

function resolveLocalAvatar(name: string | undefined | null): string | null {
  if (!name) return null
  const key = name.toLowerCase().replace(/\s+/g, '').trim()
  for (const { match, src } of LOCAL_AVATAR_FILES) {
    if (key.startsWith(match) || match.startsWith(key)) return src
  }
  return null
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
        : resolveLocalAvatar(d.personName),
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
          {sanityTestimonials.length > 0 && (
            <Testimonials initialTestimonials={sanityTestimonials} />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
