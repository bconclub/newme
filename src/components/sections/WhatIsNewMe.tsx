'use client'

import { motion } from 'framer-motion'

const badges = [
  {
    icon: '🩺',
    label: 'Clinical Diagnostics',
  },
  {
    icon: '🧬',
    label: 'Metabolic Insights',
  },
  {
    icon: '🌿',
    label: 'Gut Regulation',
  },
]

export default function WhatIsNewMe() {
  return (
    <section
      id="how-it-works"
      className="newme-what newme-section relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[920px] mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]"
        >
          What is NewME
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[28px] sm:text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] md:leading-[1.06] tracking-[-0.01em]"
        >
          A Clinical System Designed For{' '}
          <span className="text-[#FEF272]">Metabolic &amp; Gut Regulation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 md:mt-6 text-white/75 text-[14.5px] sm:text-[15px] md:text-[17px] leading-[1.6] max-w-[720px] mx-auto font-[family-name:var(--font-poppins)]"
        >
          NewME is a doctor-led program that blends advanced diagnostics,
          structured coaching, and gut-first protocols — all tuned to your
          body&apos;s unique metabolic signals.
        </motion.p>

        <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-10">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2.5 md:gap-3"
            >
              <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] rounded-full bg-[#FEF272] text-[#043C39] text-2xl md:text-3xl flex items-center justify-center shadow-[0_14px_30px_-10px_rgba(254,242,114,0.45)]">
                {b.icon}
              </div>
              <p className="text-white/85 text-[12.5px] md:text-[14px] font-medium font-[family-name:var(--font-urbanist)]">
                {b.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
