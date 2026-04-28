'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

// Figma frames 2414:1393 … 2414:1414 in sequential order → /public/icons/pillar-1..8.svg
// Default mapping assumes clockwise orbit from top (Nutrition). If any label
// doesn't match its icon visually, swap the `svg` value in this array.
const pillars = [
  { label: 'Nutrition',   svg: '/icons/pillar-1.svg' },
  { label: 'Movement',    svg: '/icons/pillar-2.svg' },
  { label: 'Sleep',       svg: '/icons/pillar-3.svg' },
  { label: 'Stress',      svg: '/icons/pillar-4.svg' },
  { label: 'Gut Health',  svg: '/icons/pillar-5.svg' },
  { label: 'Metabolism',  svg: '/icons/pillar-6.svg' },
  { label: 'Hormones',    svg: '/icons/pillar-7.svg' },
  { label: 'Mind',        svg: '/icons/pillar-8.svg' },
]

export default function Pillars() {
  return (
    <section id="pillars" className="relative pb-0"
      style={{
        // Figma: DrPal card ends y=3393, Pillars heading y=3517 → 124px gap.
        paddingTop: 'clamp(60px, calc(124 / 1920 * 100vw), 124px)',
        paddingLeft: 'clamp(20px, calc(363 / 1920 * 100vw), 363px)',
        paddingRight: 'clamp(20px, calc(363 / 1920 * 100vw), 363px)',
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 1194 }}>
        {/* Heading — Figma: Bricolage Grotesque SemiBold 72px lh 72,
            white, centered. Position from artboard top:3517 left:582. */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          The 8 Pillars of Health
        </motion.h2>
        {/* Body — Figma: Urbanist Medium 28px lh 34, centered. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white font-[family-name:var(--font-urbanist)] mx-auto"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            letterSpacing: 0,
            marginTop: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
            maxWidth: 1194,
          }}
        >
          Your body comprises eight different systems working cohesively to ensure that your body runs smoothly. The NewME framework is designed keeping these 8 pillars in mind.
        </motion.p>

        <div className="relative mt-12 md:mt-14 mx-auto w-[min(720px,94vw)] aspect-square newme-orbit">
          {/* Subtle concentric orbit guides */}
          <div className="absolute inset-[8%] rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-[22%] rounded-full border border-dashed border-white/8" />

          {/* Center NewME mark */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] md:w-[26%] aspect-square rounded-full flex flex-col items-center justify-center text-[#043C39]"
            style={{
              background: 'radial-gradient(circle at 50% 40%, #FFF8B8 0%, #FEF272 60%, #FAD451 100%)',
              boxShadow:
                '0 24px 60px -12px rgba(254,242,114,0.45), inset 0 0 0 1px rgba(0,0,0,0.04)',
            }}
          >
            <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] font-[family-name:var(--font-urbanist)]">
              Dr. Pal&apos;s
            </p>
            <p className="text-[18px] md:text-[22px] font-semibold font-[family-name:var(--font-bricolage)] leading-none mt-1">
              NewME
            </p>
          </div>

          {/* Orbiting pillars */}
          {pillars.map((p, i) => {
            const angle = (i / pillars.length) * Math.PI * 2 - Math.PI / 2
            const cos = Math.cos(angle)
            const sin = Math.sin(angle)
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{
                  left: `calc(50% + (${cos} * var(--orbit-r, 46%)))`,
                  top: `calc(50% + (${sin} * var(--orbit-r, 46%)))`,
                }}
                className="orbit-item absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 md:gap-2"
              >
                <div
                  className="w-[60px] h-[60px] md:w-[74px] md:h-[74px] rounded-full flex items-center justify-center border"
                  style={{
                    background: 'rgba(4, 60, 57, 0.85)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <Image
                    src={p.svg}
                    alt=""
                    width={40}
                    height={40}
                    className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
                  />
                </div>
                <p className="text-white/85 text-[10.5px] md:text-[12px] font-medium font-[family-name:var(--font-urbanist)] whitespace-nowrap">
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
