'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Stat = {
  value: string
  suffix: string
  label: string
}

const parseValue = (v: string) => parseInt(v.replace(/,/g, ''), 10)
const formatValue = (n: number, original: string) =>
  original.includes(',') ? n.toLocaleString('en-US') : String(n)

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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white"
          style={{
            backdropFilter: 'blur(10.25px)',
            overflow: 'clip',
            // Figma 1:6261 — fixed 34px radius; do not clamp, the card is always
            // 1800px-constrained so the corners never need to shrink.
            borderRadius: 34,
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
  const target = parseValue(stat.value)
  // Tick only the last ~1.2% (min 8) so the visible motion is the last
  // couple of digits — no zero-to-target ramp, no layout shift.
  const delta = Math.max(Math.round(target * 0.012), 8)
  const from = Math.max(target - delta, 0)
  const [value, setValue] = useState(from)
  const ref = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    const el = ref.current
    if (!el) return
    const startAnim = () => {
      if (startedRef.current) return
      startedRef.current = true
      const duration = 1000 + index * 80
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(Math.round(from + (target - from) * eased))
        if (p < 1) requestAnimationFrame(tick)
        else setValue(target)
      }
      requestAnimationFrame(tick)
    }
    // Already in view at mount? Fire now. Otherwise wait until 40% visible.
    const rect = el.getBoundingClientRect()
    const inView =
      rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1
    if (inView) {
      startAnim()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            startAnim()
            io.disconnect()
          }
        }
      },
      { threshold: [0, 0.4, 1] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [from, target, index])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: 0.06 * index }}
      // Figma cell vertical layout: 80 top + 160 content + 80 bottom = 320
      // (= card height). Padding-y replaces minHeight so the card is exactly
      // tall enough — no dead space at the bottom.
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        paddingTop: 'clamp(20px, calc(80 / 1920 * 100vw), 80px)',
        paddingBottom: 'clamp(20px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(8px, calc(40 / 1920 * 100vw), 40px)',
        paddingRight: 'clamp(8px, calc(40 / 1920 * 100vw), 40px)',
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
            fontSize: 'clamp(28px, calc(80 / 1920 * 100vw), 80px)',
            lineHeight: 'calc(72 / 80)',
            letterSpacing: 0,
            // Fixed digit width keeps the text from shifting as digits change.
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatValue(value, stat.value)}
        </span>
        <span
          className="text-[#FF8547]"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(14px, calc(40 / 1920 * 100vw), 40px)',
            lineHeight: 'calc(32 / 40)',
            marginLeft: 'clamp(3px, calc(8 / 1920 * 100vw), 8px)',
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
          fontSize: 'clamp(11px, calc(24 / 1920 * 100vw), 24px)',
          lineHeight: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
          marginTop: 'clamp(8px, calc(32 / 1920 * 100vw), 32px)',
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  )
}
