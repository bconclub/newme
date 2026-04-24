'use client'

import { motion } from 'framer-motion'
import { SectionHeader, ArrowUpRight } from './Programs'

const ease = [0.22, 1, 0.36, 1] as const

const items = [
  {
    n: '01',
    title: 'Individualised Diet Planning',
    body:
      'A personalised diet plan is created based on your health profile analysis, your blood work reports and daily lifestyle habits, reviewed by our health coach.',
  },
  {
    n: '02',
    title: 'Structured Lifestyle Coaching',
    body:
      'Weekly one-on-one coaching with your lifestyle expert, focused on habits, movement, sleep and accountability so change sticks.',
  },
  {
    n: '03',
    title: 'Clinical Lab Reviews',
    body:
      'Lab work is ordered and reviewed by a physician — the plan adapts to what your bloodwork shows, not to a generic template.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        <SectionHeader
          eyebrow="Benefits"
          trailing={
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-black/25 pl-4 pr-5 py-2.5 text-[14px] font-[family-name:var(--font-bricolage)] hover:bg-black/5 transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              View all Benefits
            </a>
          }
        />

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease }}
              className="font-[family-name:var(--font-bricolage)] font-semibold text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.012em]"
            >
              What will you get?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="mt-6 text-[#444] text-[15px] leading-[1.65] font-[family-name:var(--font-bricolage)] font-light max-w-[420px]"
            >
              NewME is on a dedicated mission to promote health and wellbeing.
              We employ a holistic, evidence based approach to reverse metabolic
              disorders by integrating personalised diet, exercise, and
              lifestyle interventions into our meticulously designed programs.
              With hardcore accountability support offered to you by our team of
              health coaches, we aim to place you on a path of optimal health
              and wellness continuum.
            </motion.p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {items.map((it, i) => (
              <motion.div
                key={it.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="rounded-[24px] bg-white border border-black/10 p-6 md:p-7"
              >
                <SwirlNumber n={it.n} />
                <h3 className="mt-6 font-[family-name:var(--font-bricolage)] font-semibold text-[18px] md:text-[19px] text-black leading-snug">
                  {it.title}
                </h3>
                <p className="mt-3 text-[#444] text-[13.5px] leading-[1.55] font-[family-name:var(--font-bricolage)] font-light">
                  {it.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SwirlNumber({ n }: { n: string }) {
  // Decorative concentric swirl made from dashed arc + number overlay
  return (
    <div className="relative w-[88px] h-[88px]">
      <svg viewBox="0 0 88 88" className="w-full h-full">
        <circle
          cx="44"
          cy="44"
          r="36"
          fill="none"
          stroke="#629675"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 8"
        />
        <circle
          cx="44"
          cy="44"
          r="26"
          fill="none"
          stroke="#629675"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 6"
          opacity="0.6"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[18px] font-[family-name:var(--font-bricolage)] font-medium text-black">
        {n}
      </span>
    </div>
  )
}
