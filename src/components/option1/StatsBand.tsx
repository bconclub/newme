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
      // Figma: stats card top y=1219, hero card bottom y=1099 → 120px artboard
      // gap. Hero contributes pb-3/4 (≤16px), so stats pt fills the rest. The
      // next section (WhatIsNewMe) provides its own 120px pt → pb here is 0.
      className="relative pb-0"
      style={{
        paddingTop: 'clamp(40px, calc(104 / 1920 * 100vw), 104px)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1920,
          paddingLeft: 'clamp(20px, 3.13vw, 60px)',
          paddingRight: 'clamp(20px, 3.13vw, 60px)',
        }}
      >
        {/*
          Figma node 1:6261 — ONE white rounded card 1800×320, radius 34,
          backdrop-blur 10.25px. Inside: 4 stat columns split by 3 vertical
          lines (Vectors 226/227/228) at x=497, 915, 1371 — each 2px solid
          #193D3A, FULL card height (320).
        */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white"
          style={{
            backdropFilter: 'blur(10.25px)',
            overflow: 'clip',
            borderRadius: 'clamp(20px, 1.77vw, 34px)',
            // Card height is driven by the cells (padding-y 80 + content ~160 + 80
            // = 320 at full bleed). No minHeight needed — the grid would otherwise
            // shrink to content and leave dead space at the bottom of the card.
          }}
        >
          {/* Cells use Figma's exact column widths via grid-template-columns:
              437 / 418 / 456 / 489 (sum 1800). Mobile falls back to 2×2. */}
          <div className="newme-stats-grid grid">
            {stats.map((s, i) => (
              <StatCell key={s.label} stat={s} index={i} />
            ))}
          </div>

          {/* Figma Vectors 226/227/228 — 3 full-height lines INSIDE the
              1800-wide card. Stroke-width 2 / color #193D3A (verified from
              the exported SVG of node 1:6262). Width scales with viewport so
              it stays visually proportional to the rest of the card.
              Card-relative x = 437/855/1311 = 24.278% / 47.500% / 72.833%. */}
          <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none">
            {[437, 855, 1311].map((x) => (
              <span
                key={x}
                className="absolute top-0 bottom-0 bg-[#193D3A]"
                style={{
                  left: `${(x / 1800) * 100}%`,
                  width: 'clamp(1px, calc(2 / 1920 * 100vw), 2px)',
                  transform: 'translateX(-50%)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: 0.06 * index }}
      // Figma cell vertical layout: 80 top + 160 content + 80 bottom = 320
      // (= card height). Padding-y replaces minHeight so the card is exactly
      // tall enough — no dead space at the bottom.
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        paddingTop: 'clamp(28px, calc(80 / 1920 * 100vw), 80px)',
        paddingBottom: 'clamp(28px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(12px, calc(40 / 1920 * 100vw), 40px)',
        paddingRight: 'clamp(12px, calc(40 / 1920 * 100vw), 40px)',
      }}
    >
      {/* Number — Poppins Light 80px (lh 72) black, suffix 40px (lh 32) #FF8547,
          8px gap between number and suffix. */}
      <p
        className="font-[family-name:var(--font-poppins)] text-black flex items-baseline justify-center"
        style={{ fontWeight: 300 }}
      >
        <span
          style={{
            fontSize: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            lineHeight: 'calc(72 / 80)',
            letterSpacing: 0,
          }}
        >
          {stat.value}
        </span>
        <span
          className="text-[#FF8547]"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            lineHeight: 'calc(32 / 40)',
            marginLeft: 'clamp(4px, calc(8 / 1920 * 100vw), 8px)',
          }}
        >
          {stat.suffix}
        </span>
      </p>
      {/* Label — Urbanist Medium 24px lh 28 black, centered, 32px above. */}
      <p
        className="font-[family-name:var(--font-urbanist)] whitespace-pre-line text-center text-black"
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
