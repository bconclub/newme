'use client'

import PageHero from './PageHero'

/**
 * Blog page hero — Figma 121:93 template.
 * Composes <PageHero> so /blog and /media render with the exact same
 * shell. Blog hero photo lands at /public/blog/hero.webp; until then the
 * pine fallback shows through the moss→pine wash.
 */
export default function BlogHero() {
  return (
    <PageHero
      imageSrc="/blog/hero.webp"
      imageAlt=""
      heading={
        <>
          Notes From
          <br />
          The Clinic.
        </>
      }
      subheading="Insights from the NewME team on metabolic health, the gut–brain axis, and what structured clinical care actually looks like."
      headingMaxWidthPx={880}
    />
  )
}
