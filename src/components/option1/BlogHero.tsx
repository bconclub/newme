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
      imageSrc="/blogs/Main%20Banner.webp"
      imageAlt="NewME blog cover"
      imagePosition="center"
      heading={<>Our Blogs</>}
      headingMaxWidthPx={719}
    />
  )
}
