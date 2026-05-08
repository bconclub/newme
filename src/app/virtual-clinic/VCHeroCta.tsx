'use client'

import { motion } from 'framer-motion'

/**
 * Virtual-clinic hero CTA pair — gold pill ("Book A Consultation") +
 * tangerine arrow circle, with the same -7px overlap pattern used on
 * every other CTA pair in the site.
 *
 * Lives in its own client-component file because the parent page
 * (/virtual-clinic) is a server component (exports `metadata`) and
 * can't import framer-motion directly. Same animation cadence as
 * HIWCta and PathwaysHeroCta — both pieces fade-up TOGETHER under one
 * wrapper transition so the cluster reads as one unit.
 */
export default function VCHeroCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="group/cta flex items-center flex-row-reverse justify-end"
    >
      <motion.a
        href="#contact"
        aria-label="Book a consultation"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-0 rounded-full bg-[#F08B55] hover:bg-[#FF8547] text-white flex items-center justify-center shrink-0 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors will-change-transform"
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
        href="#contact"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-black font-medium font-[family-name:var(--font-bricolage)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors will-change-transform"
        style={{
          height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
          paddingLeft: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
          paddingRight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
          fontSize: 'clamp(15px, calc(24 / 1920 * 100vw), 24px)',
          lineHeight: 1,
          marginRight: 'clamp(-12px, calc(-9 / 1920 * 100vw), -9px)',
        }}
      >
        Book A Consultation
      </motion.a>
    </motion.div>
  )
}
