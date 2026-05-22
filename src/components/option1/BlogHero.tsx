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
      imageSrc="/media/Media Hero.webp"
      imageAlt="NewME team in clinical setting"
      imagePosition="72% center"
      heading={<>Our Blogs</>}
      headingMaxWidthPx={719}
    />
  )
}
