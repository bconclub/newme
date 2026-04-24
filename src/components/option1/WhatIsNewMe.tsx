'use client'

import { motion } from 'framer-motion'

export default function WhatIsNewMe() {
  return (
    <section id="how-it-works" className="relative px-5 sm:px-6 md:px-10 lg:px-16 py-[clamp(72px,9vw,140px)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow pill */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center px-4 py-2 rounded-full border border-white/25 text-[13px] md:text-[14px] text-white font-[family-name:var(--font-urbanist)]"
        >
          What is NewME
        </motion.span>

        {/* Heading row: H2 on left, icons on right */}
        <div className="mt-6 md:mt-8 flex items-start justify-between gap-6 md:gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-semibold text-white text-[34px] sm:text-[44px] md:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.015em] max-w-[1100px]"
          >
            A Clinical System Designed For Metabolic &amp; Gut Regulation.
          </motion.h2>

          {/* Icon pair — overlapping circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex items-center shrink-0 pt-3"
          >
            <div
              className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full bg-[#FF8547] flex items-center justify-center"
              style={{ zIndex: 2 }}
            >
              <StickFigureRunning />
            </div>
            <div
              className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full bg-[#FEF272] flex items-center justify-center -ml-4"
              style={{ zIndex: 1 }}
            >
              <StickFigureCheer />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 md:mt-10 h-px bg-white/20 origin-left"
        />

        {/* Body copy */}
        <div className="mt-6 md:mt-8 max-w-[820px] space-y-5 md:space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/80 text-[15px] md:text-[17px] leading-[1.6] font-[family-name:var(--font-bricolage)] font-light"
          >
            NewME is a doctor-led system designed to restore metabolic and gut regulation
            through structured care and guided accountability. It has been built on the clinical
            expertise of Dr. Palaniappan Manickam (Dr. Pal) and a multidisciplinary care team.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-[15px] md:text-[17px] leading-[1.6] font-[family-name:var(--font-bricolage)] font-light"
          >
            Our system brings your symptoms, history, and responses into one cohesive
            pathway of care, instead of having to rely on isolated, short-term interventions.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function StickFigureRunning() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="27" cy="11" r="3.2" />
      <path d="M23 19l3 8-4 10M26 27l6 4M23 19l-6 5M17 24l3 5" />
    </svg>
  )
}

function StickFigureCheer() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="#0B3532" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="24" cy="11" r="3.2" />
      <path d="M24 14v10M24 24l-5 12M24 24l5 12M24 16l-7-5M24 16l7-5" />
    </svg>
  )
}
