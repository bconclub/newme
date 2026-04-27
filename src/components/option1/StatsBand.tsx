'use client'

import { motion } from 'framer-motion'

type Stat = {
  value: string
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: '6,000', suffix: '+', label: 'Clients with at least one or\nmore clinical outcomes' },
  { value: '100', suffix: '%', label: 'HbA1c reduction in\nevery tracked client' },
  { value: '5,000', suffix: '+', label: 'Personal food\ntriggers identified' },
  { value: '20,000', suffix: 'Kg', label: 'Total weight lost\nacross clients' },
]

export default function StatsBand() {
  return (
    <section
      aria-label="Outcomes"
      className="relative px-3 sm:px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-2"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] md:rounded-[24px] bg-white border border-black/[0.06] overflow-hidden"
          style={{ boxShadow: '0 14px 40px -28px rgba(0,0,0,0.18)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <StatCell key={s.label} stat={s} index={i} total={stats.length} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatCell({ stat, index, total }: { stat: Stat; index: number; total: number }) {
  // Right divider on every cell except the last in each row.
  // Bottom divider on the top row when wrapped to 2 cols on mobile.
  const isRightEdgeMd = (index + 1) % total === 0
  const isRightEdgeSm = index % 2 === 1
  const isBottomRowSm = index >= 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.06 * index }}
      className={[
        'relative px-6 sm:px-7 md:px-8 lg:px-10 py-9 md:py-12 lg:py-14 flex flex-col items-center text-center',
        // dividers
        !isRightEdgeMd ? 'md:border-r md:border-black/[0.08]' : '',
        !isRightEdgeSm ? 'border-r border-black/[0.08] md:border-r' : '',
        !isBottomRowSm ? 'border-b border-black/[0.08] md:border-b-0' : '',
      ].join(' ')}
    >
      <p className="font-[family-name:var(--font-bricolage)] font-semibold text-[#0F1724] leading-none flex items-baseline justify-center">
        <span className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] tracking-[-0.02em]">
          {stat.value}
        </span>
        <span className="ml-1 text-[#FF8547] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium">
          {stat.suffix}
        </span>
      </p>
      <p className="mt-3 md:mt-4 text-[#444444] text-[12px] md:text-[13px] leading-[1.45] font-[family-name:var(--font-poppins)] whitespace-pre-line">
        {stat.label}
      </p>
    </motion.div>
  )
}
