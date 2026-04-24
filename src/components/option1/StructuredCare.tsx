'use client'

import { motion } from 'framer-motion'

const items = [
  { num: '01', title: 'Integrated gut and metabolic approach' },
  { num: '02', title: 'Doctor-led clinical oversight through every phase' },
  { num: '03', title: 'Structured assessment that identifies underlying metabolic and gut patterns' },
  { num: '04', title: 'Prescribed pathways based on your physiology, not generic plans' },
  { num: '05', title: 'Continuous monitoring, adjustment, and accountability' },
  { num: '06', title: 'Coordinated care across coaches, clinical teams, and specialists' },
  { num: '07', title: 'Built for long-term stability, not short-term fixes' },
]

export default function StructuredCare() {
  const left = items.filter((_, i) => i % 2 === 0)
  const right = items.filter((_, i) => i % 2 === 1)

  return (
    <section id="structured-care" className="relative px-5 sm:px-6 md:px-10 lg:px-16 py-[clamp(56px,8vw,120px)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[760px] mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/25 text-[12px] md:text-[13px] text-white font-[family-name:var(--font-urbanist)]"
          >
            USPs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 md:mt-6 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1.06] tracking-[-0.012em]"
          >
            What Structured Care
            <br />
            Looks Like
          </motion.h2>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {left.map((item, i) => (
              <Card key={item.num} item={item} delay={i * 0.08} />
            ))}
          </div>
          {/* Right column — offset down on desktop for staggered look */}
          <div className="flex flex-col gap-4 md:gap-6 md:mt-16">
            {right.map((item, i) => (
              <Card key={item.num} item={item} delay={i * 0.08 + 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({
  item,
  delay,
}: {
  item: { num: string; title: string }
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-[20px] md:rounded-[24px] px-6 py-7 md:px-8 md:py-10 min-h-[140px] md:min-h-[160px] overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <h3 className="relative z-10 max-w-[72%] text-white text-[16px] md:text-[18px] font-[family-name:var(--font-bricolage)] font-medium leading-[1.35]">
        {item.title}
      </h3>

      <span
        aria-hidden
        className="absolute bottom-2 right-5 md:bottom-3 md:right-7 font-[family-name:var(--font-bricolage)] font-light leading-none select-none"
        style={{
          fontSize: 'clamp(56px, 8vw, 96px)',
          color: '#FEF272',
          opacity: 0.9,
        }}
      >
        {item.num}
      </span>
    </motion.div>
  )
}
