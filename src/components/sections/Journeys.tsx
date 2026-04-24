'use client'

import { motion } from 'framer-motion'
import { SectionHeader, ArrowUpRight } from './Programs'

const ease = [0.22, 1, 0.36, 1] as const

const journeys = [
  { name: 'Saniya', quote: '"Healing my body from within."' },
  { name: 'James', quote: '"The lab tests were the game-changer."' },
  { name: 'Rabeka Jasmin', quote: '"Healing my body from within."' },
  { name: 'Sunny', quote: '"The lab tests were the game-changer."' },
]

export default function Journeys() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        <SectionHeader
          eyebrow="Transitions"
          trailing={
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-black/25 pl-4 pr-5 py-2.5 text-[14px] font-[family-name:var(--font-bricolage)] hover:bg-black/5 transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                View all Transformations
              </a>
              <div className="flex gap-2">
                <RoundBtn ariaLabel="Previous">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </RoundBtn>
                <RoundBtn ariaLabel="Next">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </RoundBtn>
              </div>
            </div>
          }
        />

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="font-[family-name:var(--font-bricolage)] font-semibold text-[42px] md:text-[64px] leading-[1.02] tracking-[-0.012em] max-w-[720px]"
          >
            Transformative Journeys
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="text-[#444] text-[16px] md:text-[18px] leading-[1.5] font-[family-name:var(--font-bricolage)] font-light max-w-[520px]"
          >
            From food logging to accountability, sleep tracking to mindfulness,
            movement to fitness, experience the comprehensive top-tier
            well-being support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {journeys.map((j, i) => (
            <motion.div
              key={j.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="flex flex-col"
            >
              <div className="aspect-[4/3] rounded-[24px] bg-[#D9D9D9] relative flex items-center justify-center">
                <button
                  aria-label={`Play ${j.name}'s story`}
                  className="w-12 h-12 rounded-full border border-black/60 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M3 1.5v11l10-5.5L3 1.5z" />
                  </svg>
                </button>
              </div>
              <p className="mt-4 font-[family-name:var(--font-bricolage)] font-semibold text-[18px] text-black">
                {j.name}
              </p>
              <p className="mt-1 text-[#444] text-[14.5px] italic font-[family-name:var(--font-bricolage)] font-light">
                {j.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RoundBtn({
  children,
  ariaLabel,
}: {
  children: React.ReactNode
  ariaLabel: string
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="w-11 h-11 rounded-full border border-black/25 flex items-center justify-center text-black hover:bg-black/5 transition-colors"
    >
      {children}
    </button>
  )
}
