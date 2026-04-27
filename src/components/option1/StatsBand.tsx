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
      // Figma spec: width 1800, left 60 on 1920 artboard.
      // Gutter scales 60/1920 = 3.13vw, capped at 60px.
      className="relative pt-6 md:pt-8 pb-2"
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1920,
          paddingLeft: 'clamp(20px, 3.13vw, 60px)',
          paddingRight: 'clamp(20px, 3.13vw, 60px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          // Figma: 1800 × 320, radius 34
          className="bg-white border border-black/[0.06] overflow-hidden flex"
          style={{
            boxShadow: '0 14px 40px -28px rgba(0,0,0,0.18)',
            borderRadius: 'clamp(20px, 1.77vw, 34px)',
            minHeight: 'clamp(220px, calc(320 / 1800 * 100vw), 320px)',
          }}
        >
          {/* flex-1 + grid lets the cells stretch to fill the card's full height,
              and StatCell vertically centers its own content. */}
          <div className="grid grid-cols-2 md:grid-cols-4 flex-1">
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
  // Right divider on every cell except the last in each row (Figma: 2px #193D3A).
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
        'relative px-4 sm:px-5 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col items-center justify-center text-center',
        // Figma divider spec: 2px solid #193D3A
        !isRightEdgeMd ? 'md:border-r-2 md:border-[#193D3A]' : '',
        !isRightEdgeSm ? 'border-r-2 border-[#193D3A] md:border-r-2' : '',
        !isBottomRowSm ? 'border-b-2 border-[#193D3A] md:border-b-0' : '',
      ].join(' ')}
    >
      {/* Number row — Figma: Poppins Light 80px, line-height 72px.
          Suffix: Poppins Light 40px, line-height 32px, orange #FF8547. */}
      <p
        className="font-[family-name:var(--font-poppins)] text-[#0F1724] flex items-baseline justify-center"
        style={{ fontWeight: 300 }}
      >
        <span
          style={{
            fontSize: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            lineHeight: 'calc(72 / 80)', // 0.9
            letterSpacing: 0,
          }}
        >
          {stat.value}
        </span>
        <span
          className="ml-1 text-[#FF8547]"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            lineHeight: 'calc(32 / 40)', // 0.8
          }}
        >
          {stat.suffix}
        </span>
      </p>
      {/* Label — Figma: Urbanist Medium 24px, line-height 28px, center.
          32px gap from number row. */}
      <p
        className="font-[family-name:var(--font-urbanist)] whitespace-pre-line text-center text-[#444444]"
        style={{
          fontWeight: 500,
          fontSize: 'clamp(13px, calc(24 / 1920 * 100vw), 24px)',
          lineHeight: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
          marginTop: 'clamp(12px, calc(32 / 1920 * 100vw), 32px)',
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  )
}
