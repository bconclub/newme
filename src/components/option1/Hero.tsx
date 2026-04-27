'use client'

import { motion } from 'framer-motion'

// Hero — final design.
// Single rounded photo card. No notch / no slider / no inline stats.
const HERO_IMAGE = '/images/home/Hero image.webp'

export default function Hero() {
  return (
    <section
      id="home"
      // Figma spec: width 1880, left 20 on a 1920 artboard.
      // Padding scales as 20/1920 = 1.04vw, capped at 20px.
      className="relative pt-[88px] md:pt-[96px] pb-3 md:pb-4"
      style={{
        paddingLeft: 'clamp(12px, 1.04vw, 20px)',
        paddingRight: 'clamp(12px, 1.04vw, 20px)',
      }}
    >
      <div>
        {/* Hero card — no fade-in animation on outer (was causing the
            heading text to render faded on slow/SSR-hydrated paths because
            the parent opacity multiplied through to children). */}
        <div
          // Figma: 1880 × 947 → aspect 1.985:1, radius 48
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(28px, 2.5vw, 48px)',
            minHeight: 'clamp(520px, calc(947 / 1880 * 100vw), 947px)',
          }}
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

          {/* Content
              Figma exact specs (1920 artboard, hero card is 1880×947 at top:152 left:20):
              - Heading: top 343 from card, left 100 from card, 810×276,
                Bricolage Grotesque 600, 92px, line-height 92
              - Body: top 651 (= heading + 32 gap), left 100, 640×60,
                Urbanist 400, 24px, line-height 30
              - Button group: top 735 (= body + 24 gap), left 100, 244×64
              All values scaled with viewport using ?vw clamp so they hold
              proportion at any width up to the 1920 artboard cap.
          */}
          <div
            className="relative z-10 flex flex-col"
            style={{
              paddingTop: 'clamp(120px, calc(343 / 1920 * 100vw), 343px)',
              paddingLeft: 'clamp(40px, calc(100 / 1920 * 100vw), 100px)',
              paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
              paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
              maxWidth: 'clamp(360px, calc(910 / 1920 * 100vw), 910px)', // 100 left pad + 810 content
            }}
          >
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(36px, calc(92 / 1920 * 100vw), 92px)',
                lineHeight: 1, // Figma: line-height 92 = 1×92 = 1
                letterSpacing: 0,
                maxWidth: 'clamp(320px, calc(810 / 1920 * 100vw), 810px)',
              }}
            >
              Doctor-Led Care,
              <br />
              Personalized For
              <br />
              Your Body
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white font-[family-name:var(--font-urbanist)]"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'clamp(18px, calc(30 / 1920 * 100vw), 30px)',
                letterSpacing: 0,
                maxWidth: 'clamp(280px, calc(640 / 1920 * 100vw), 640px)',
                marginTop: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
              }}
            >
              NewMe combines clinical insights with structured care to better
              understand your body and provide the care it needs.
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex items-center"
              style={{ marginTop: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)' }}
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
        </div>
      </div>
    </section>
  )
}
