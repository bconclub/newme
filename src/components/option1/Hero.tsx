'use client'

import { motion } from 'framer-motion'

// Hero — final design.
// Single rounded photo card. No notch / no slider / no inline stats.
const HERO_IMAGE = '/images/home/Hero image.webp'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative px-3 sm:px-4 md:px-6 lg:px-8 pt-[88px] md:pt-[96px] pb-3 md:pb-4"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[20px] md:rounded-[24px] overflow-hidden min-h-[520px] sm:min-h-[560px] md:min-h-[600px] lg:min-h-[640px]"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />

          {/*
            Left moss→pine wash — Figma spec:
              · Linear gradient #629675 → #013E37
              · 1599×1600 shape, top -264 / left -462, radius 48
              · Layer blur 900 (heavily diffused)
              · Monotone noise #000 @ 25%, density 100%, size 0.5
            The mask cuts off sharply by ~55% so the right side of the
            photo (the doctor's face) stays untouched and clean.
          */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
              opacity: 0.9,
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 44%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0) 62%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 44%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0) 62%)',
            }}
          />

          {/* Monotone noise — masked to the left zone only, never touches the doctor */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.22,
              mixBlendMode: 'multiply',
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '220px 220px',
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 46%, rgba(0,0,0,0.05) 56%, rgba(0,0,0,0) 64%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 46%, rgba(0,0,0,0.05) 56%, rgba(0,0,0,0) 64%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-14 flex flex-col gap-6 md:gap-7 max-w-full md:max-w-[640px] lg:max-w-[680px]">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] font-semibold text-white text-[36px] sm:text-[44px] md:text-[58px] lg:text-[68px] leading-[1.04] tracking-[-0.018em]"
            >
              Doctor-Led Care,
              <br />
              Personalized For
              <br />
              Your Body
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white/85 text-[14px] md:text-[15px] leading-[1.6] max-w-[420px] font-[family-name:var(--font-poppins)] font-light"
            >
              NewMe combines clinical insights with structured care to better
              understand your body and provide the care it needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex items-center mt-1"
            >
              <a
                href="#how-it-works"
                className="relative z-10 inline-flex items-center h-11 md:h-12 rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] pl-6 pr-8 md:pl-7 md:pr-9 text-[14px] md:text-[15px] font-semibold tracking-[0.005em] font-[family-name:var(--font-urbanist)] transition-colors"
              >
                Know more
              </a>
              <a
                href="#assessment"
                aria-label="Start assessment"
                className="relative z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#FF8547] hover:bg-[#F08B55] text-white flex items-center justify-center transition-colors shrink-0 -ml-4 md:-ml-5"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M5 13L13 5M13 5H6.5M13 5V11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
