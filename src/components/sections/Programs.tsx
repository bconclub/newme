'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const programs = [
  {
    title: 'PCOS Programs',
    body:
      'NewME is on a dedicated mission to promote health and wellbeing. We employ a holistic, evidence based approach to…',
  },
  {
    title: 'Gut Healing',
    body:
      'A structured protocol that addresses the root cause of chronic gut issues, rebalancing microbiome and restoring…',
  },
  {
    title: 'Metabolic Reset',
    body:
      'Personalised labs plus a doctor-led plan to reverse insulin resistance, weight resistance, and metabolic fatigue…',
  },
  {
    title: 'Longevity Labs',
    body:
      'Advanced longevity and preventive diagnostics — biomarkers and actionable insights for the next decade of health…',
  },
]

export default function Programs() {
  return (
    <section
      id="programs"
      className="bg-white text-black py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        <SectionHeader eyebrow="Our Programs" />

        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="font-[family-name:var(--font-bricolage)] font-semibold text-[36px] sm:text-[44px] md:text-[56px] leading-[1.04] tracking-[-0.012em] max-w-[640px]"
          >
            Pick a Wellness Program
            <br />
            that&rsquo;s right for you
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-[#444] text-[16px] md:text-[17px] leading-[1.55] font-[family-name:var(--font-bricolage)] font-light max-w-[560px] md:mt-4"
          >
            Root cause functional medicine to resolve your underlying symptoms
            and optimize for lasting health. Sign up for our Complete Care
            program, or start with advanced Longevity Labs.
          </motion.p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {programs.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="rounded-[24px] bg-[#EDEDED] p-4 md:p-5 flex flex-col"
            >
              <div className="aspect-[4/3] rounded-[16px] bg-white" />
              <h3 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-[22px] md:text-[24px] leading-tight text-black">
                {p.title}
              </h3>
              <p className="mt-3 text-[#444] text-[14.5px] leading-[1.55] font-[family-name:var(--font-bricolage)] font-light line-clamp-3">
                {p.body}
              </p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 text-black text-[15px] font-[family-name:var(--font-bricolage)] font-medium hover:opacity-70 transition-opacity"
              >
                View programs
                <ArrowUpRight />
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 0 ? 'w-8 bg-black' : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  trailing,
}: {
  eyebrow: string
  trailing?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-4">
      <span className="inline-flex items-center gap-2.5 text-[15px] md:text-[17px] font-[family-name:var(--font-bricolage)] font-light text-black">
        <span className="w-1.5 h-1.5 rounded-full bg-black" />
        {eyebrow}
      </span>
      {trailing}
    </div>
  )
}

export function ArrowUpRight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
