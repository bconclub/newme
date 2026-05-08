'use client'

import PageHero from './PageHero'

// Media page hero — Figma node 100:980 / 121:93 template.
// Composes <PageHero> so the recipe stays shared with every other
// secondary-page hero on the site.
export default function MediaHero() {
  return (
    <PageHero
      imageSrc="/media/Media Hero.webp"
      imageAlt="NewME team in clinical setting"
      imagePosition="72% center"
      heading={
        <>
          Clinical Expertise,
          <br />
          Recognized Globally.
        </>
      }
      subheading="Our work in metabolic and gut regulation has received praise by leading media platforms."
      headingMaxWidthPx={719}
    />
  )
}
