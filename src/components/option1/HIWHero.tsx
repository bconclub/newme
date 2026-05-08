'use client'

import { motion } from 'framer-motion'
import PageHero from './PageHero'

/**
 * /how-it-works hero — Figma 58:31 / 121:93 template.
 * Same shell as every other secondary-page hero, with a custom CTA pair
 * (gold pill + orange arrow) injected via the `cta` prop.
 */
export default function HIWHero() {
  return (
    <PageHero
      imageSrc="/how%20it%20works/hero.webp"
      imageAlt="Doctor and patient consultation"
      heading={
        <>
          You Don&rsquo;t Choose A Program.
          <br />
          You&rsquo;re Prescribed A Path.
        </>
      }
      subheading="NewME isn’t a trend or a fad. It’s a structured clinical system. Your journey begins with an assessment that maps your metabolic and gut patterns and guides you into the right phase of care."
      headingMaxWidthPx={1086}
      bodyMaxWidthPx={718}
      cta={<HIWCta />}
    />
  )
}

// CTA group — gold pill + orange arrow. Both pieces animate in TOGETHER
// (single wrapper motion.div, single delay) so the cluster reads as one
// element instead of staggered. Mirrors the unified pattern used in
// VCHeroCta and PathwaysHeroCta — every CTA pair on the site behaves the
// same way now.
function HIWCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="group/cta flex items-center flex-row-reverse justify-end"
    >
      <motion.a
        href="#hiw-comparison"
        aria-label="Start your assessment"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-0 rounded-full bg-[#FF8547] hover:bg-[#F08B55] text-white flex items-center justify-center shrink-0 transition-colors will-change-transform"
        style={{
          width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
          height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
        }}
      >
        <svg
          viewBox="0 0 30 30"
          fill="none"
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
          style={{
            width: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
            height: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
          }}
        >
          <path
            d="M9 21L21 9M21 9H11M21 9V19"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
      <motion.a
        href="/pathways"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] font-medium font-[family-name:var(--font-bricolage)] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] transition-[background-color,box-shadow] duration-300 ease-out will-change-transform"
        style={{
          height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
          paddingLeft: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
          paddingRight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
          fontSize: 'clamp(15px, calc(24 / 1920 * 100vw), 24px)',
          lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
          marginRight: 'clamp(-10px, calc(-7 / 1920 * 100vw), -7px)',
        }}
      >
        Start Your Assessment
      </motion.a>
    </motion.div>
  )
}
