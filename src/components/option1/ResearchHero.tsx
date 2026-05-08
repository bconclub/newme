'use client'

import PageHero from './PageHero'

// ResearchLab hero — Figma 83:2498 / 121:93 template.
// Composes <PageHero> for site-wide consistency.
export default function ResearchHero() {
  return (
    <PageHero
      imageSrc="/images/research-lab/hero.webp"
      imageAlt=""
      heading={
        <>
          We Rely On Research-Based
          <br />
          Evidence.
        </>
      }
      subheading="You Should Too."
      headingMaxWidthPx={1086}
    />
  )
}
