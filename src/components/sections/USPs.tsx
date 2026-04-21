'use client'

import { motion } from 'framer-motion'

const pillars = [
  { label: 'Nutrition', icon: '🥗' },
  { label: 'Movement', icon: '🏃' },
  { label: 'Sleep', icon: '🌙' },
  { label: 'Stress', icon: '🧘' },
  { label: 'Gut Health', icon: '🌿' },
  { label: 'Metabolism', icon: '⚡' },
  { label: 'Hormones', icon: '🧬' },
  { label: 'Mind', icon: '🧠' },
]

export default function USPs() {
  return (
    <section
      id="pillars"
      className="newme-usps newme-section relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]">
          The framework
        </span>
        <h2 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[28px] sm:text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] md:leading-[1.06] tracking-[-0.01em]">
          The 8 Pillars of <span className="text-[#FEF272]">Health</span>
        </h2>
        <p className="mt-4 md:mt-5 text-white/75 text-[14.5px] sm:text-[15px] md:text-[16px] leading-[1.6] max-w-[640px] mx-auto font-[family-name:var(--font-poppins)]">
          Every NewME plan is engineered across eight interconnected systems
          — together they compound into sustained clinical outcomes.
        </p>

        {/*
          Radial diagram.
          The orbit circle itself is sized to a safe fraction of the outer box
          (via `inset-[14%]` on mobile, 0 on desktop) so the label text that
          sits outside each icon stays inside the viewport at narrow widths.
        */}
        <div
          className="relative mt-12 md:mt-14 mx-auto w-[min(640px,94vw)] aspect-square newme-orbit"
        >
          {/* orbit rings — padded in on mobile so the icon circle has room for labels */}
          <div className="absolute inset-[10%] md:inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[20%] md:inset-[12%] rounded-full border border-white/8" />
          <div className="absolute inset-[30%] md:inset-[25%] rounded-full border border-dashed border-white/10" />

          {/* center badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] md:w-[36%] aspect-square rounded-full bg-[#FEF272] text-[#043C39] flex flex-col items-center justify-center shadow-[0_20px_60px_-10px_rgba(254,242,114,0.5)]">
            <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] font-[family-name:var(--font-urbanist)]">
              Dr. Pal&apos;s
            </p>
            <p className="text-[20px] md:text-[28px] font-bold font-[family-name:var(--font-bricolage)] leading-none mt-1">
              NewME
            </p>
          </div>

          {/* Orbiting pillars */}
          {pillars.map((p, i) => {
            const angle = (i / pillars.length) * Math.PI * 2 - Math.PI / 2
            // On mobile the orbit circle is padded 10% in on each side, so the
            // icon centers land at 38% from center (48% radius - 10% inset).
            // Use CSS vars to pick the right radius at the right breakpoint.
            const cos = Math.cos(angle)
            const sin = Math.sin(angle)
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{
                  // Use var --r so we can swap orbit radius responsively
                  left: `calc(50% + (${cos} * var(--orbit-r, 46%)))`,
                  top: `calc(50% + (${sin} * var(--orbit-r, 46%)))`,
                }}
                className="orbit-item absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 md:gap-2"
              >
                <div className="w-[48px] h-[48px] md:w-[68px] md:h-[68px] rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-lg md:text-2xl flex items-center justify-center">
                  {p.icon}
                </div>
                <p className="text-white/85 text-[10.5px] md:text-[12.5px] font-medium font-[family-name:var(--font-urbanist)] whitespace-nowrap">
                  {p.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
