'use client'

import { motion } from 'framer-motion'

const PORTRAIT = '/images/home/Dr Pal.webp'

// Figma section: 1800 × 1124, top 2269, left 60.
// Gradient: light moss (top-left) → deep forest (bottom-right).
// Inner photo: portrait 3:5 ratio with rounded corners and visible card around it.
export default function DrPal() {
  return (
    <section
      id="care-team"
      // Figma spec: width 1800, height 1124, left 60 on 1920 artboard.
      // Gutter scales 60/1920 = 3.13vw, capped at 60px.
      className="relative py-[clamp(40px,6vw,80px)]"
      style={{
        paddingLeft: 'clamp(20px, 3.13vw, 60px)',
        paddingRight: 'clamp(20px, 3.13vw, 60px)',
      }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
          style={{
            // Figma spec: linear-gradient #629675 (moss) -> #013E37 (deep pine).
            // Multi-stop ramp prevents the top-left from washing out to mint.
            background:
              'linear-gradient(135deg, #629675 0%, #4F8369 25%, #2F7269 50%, #144F49 75%, #013E37 100%)',
            borderRadius: 'clamp(20px, 1.77vw, 34px)',
            minHeight: 'clamp(640px, calc(1124 / 1800 * 100vw), 1124px)',
          }}
        >
          {/* Soft yellow glow on the right side — Figma highlight */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 65% at 95% 55%, rgba(254,242,114,0.16) 0%, rgba(254,242,114,0.04) 35%, rgba(254,242,114,0) 60%)',
            }}
          />

          {/* Monotone noise — Figma effect: #000 @ 25%, density 100%, size 0.5 */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.18,
              mixBlendMode: 'multiply',
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '200px 200px',
            }}
          />

          {/* Card content. Photo is portrait (3:5) with proportional padding around it. */}
          <div
            className="relative grid lg:grid-cols-[auto_1fr] gap-6 md:gap-10 lg:gap-14 xl:gap-20 items-center"
            style={{ padding: 'clamp(16px, 3.5vw, 60px)' }}
          >
            {/* Photo — portrait container, capped width so aspect stays right at any viewport */}
            <div className="w-full lg:w-[clamp(360px,32vw,560px)]">
              <div
                className="relative aspect-[3/5] rounded-[18px] md:rounded-[22px] lg:rounded-[24px] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${encodeURI(PORTRAIT)}')` }}
              />
            </div>

            {/* Right — copy column */}
            <div className="relative max-w-[640px] flex flex-col">
              <span className="inline-flex w-fit items-center px-3.5 py-1.5 rounded-full border border-white/30 text-[12px] md:text-[13px] text-white font-[family-name:var(--font-urbanist)]">
                Meet Dr. Pal
              </span>

              <h2 className="mt-5 md:mt-6 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.06] tracking-[-0.012em]">
                Clinical Expertise,
                <br />
                Shaped By Real
                <br />
                Experience
              </h2>

              <div className="mt-7 md:mt-8 h-px bg-white/25" />

              <div className="mt-6 md:mt-7 space-y-4 md:space-y-5">
                <p className="text-white/90 text-[14px] md:text-[15.5px] leading-[1.6] font-[family-name:var(--font-poppins)] font-light">
                  Dr. Pal is a US-based gastroenterologist whose clinical
                  perspective is shaped not just by medical training, but by
                  personal experience.
                </p>
                <p className="text-white/90 text-[14px] md:text-[15.5px] leading-[1.6] font-[family-name:var(--font-poppins)] font-light">
                  In his early 30s, despite professional success, his own
                  health declined due to long work hours, poor sleep, and
                  unstructured living. All of it culminated with a heart
                  attack at the age of 35. That moment exposed a critical
                  gap: the absence of structured, sustainable approaches to
                  building long-term health.
                </p>
                <p className="text-white/90 text-[14px] md:text-[15.5px] leading-[1.6] font-[family-name:var(--font-poppins)] font-light">
                  This realization became the foundation of NewME. Today, Dr.
                  Pal leads a system that focuses on restoring metabolic and
                  gut regulation through structured care, guided
                  accountability, and consistency over time, bringing
                  together clinical insight and real-world application to
                  support lasting health.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
