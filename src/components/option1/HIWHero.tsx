'use client'

import { motion } from 'framer-motion'

// Figma 58:31 / 58:36 — Hero card 1880×694 at (20,152), corners 48.
// Text block left-pinned at x=120 (heading y=322, body y=490, CTA y=612).
// Image: doctor-white-coat-sitting-his-desk-talking-his-female-patient.
const HERO_IMAGE = '/how%20it%20works/hero.webp'

export default function HIWHero() {
  return (
    <section
      id="hiw-hero"
      className="relative pb-3 md:pb-4"
      style={{
        // Figma artboard top of hero card y=152 with header y=39 h=74 → 39px gap.
        paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        paddingRight: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          // Figma 58:33 — 1880×694, radius 48
          borderRadius: 'clamp(20px, calc(48 / 1920 * 100vw), 48px)',
          // Floor 320 (was 420) — at 390px viewport the 420px floor made
          // the hero a near-square that ate the entire viewport before
          // any content below could be seen.
          minHeight: 'clamp(320px, calc(694 / 1880 * 100vw), 694px)',
        }}
      >
        {/* Background image (Figma 58:34) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        {/* Fallback color in case image is missing */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: '#0E2827', zIndex: -1 }}
        />

        {/*
          Figma 58:39 Ellipse 27 — 1599×1600 at (-462,-264), green gradient
          mask wash. Same treatment as homepage hero.
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

        {/* Monotone noise — masked left only */}
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

        {/* Content. Figma:
            heading at x=120 y=322, 1086×144 (Bricolage SemiBold ~92/96)
            body at x=120 y=490, 718×90 (Urbanist 24/30)
            CTA group at x=120 y=612, 376×64
        */}
        <div
          className="relative z-10 flex flex-col items-center text-center mx-auto"
          style={{
            // Center-aligned per site-wide hero sweep (triggered by /team
            // feedback). Padding floors halved on mobile so the headline
            // doesn't sit at the bottom of a tall card when narrow.
            paddingTop: 'clamp(40px, calc(170 / 1920 * 100vw), 170px)',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingBottom: 'clamp(28px, calc(80 / 1920 * 100vw), 80px)',
          }}
        >
          {/* Figma 58:47 — "You Don't Choose A Program. You're Prescribed A Path." */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              // Floor 26 (was 34) so on a 390-wide viewport the headline
              // wraps to 2 lines tops instead of 4 and doesn't dominate.
              fontSize: 'clamp(26px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1.1,
              letterSpacing: 0,
              maxWidth: 'clamp(280px, calc(1086 / 1920 * 100vw), 1086px)',
            }}
          >
            You Don&rsquo;t Choose A Program.
            <br />
            You&rsquo;re Prescribed A Path.
          </motion.h1>

          {/* Figma 58:48 — body */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 'clamp(18px, calc(30 / 1920 * 100vw), 30px)',
              maxWidth: 'clamp(280px, calc(718 / 1920 * 100vw), 718px)',
              // heading bottom y=466, body top y=490 → gap 24
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            NewME isn&rsquo;t a trend or a fad. It&rsquo;s a structured clinical system.
            Your journey begins with an assessment that maps your metabolic and gut
            patterns and guides you into the right phase of care.
          </motion.p>

          {/*
            Figma 58:40 Group 224 — 376×64, pill (319×64) + arrow circle (64×64),
            arrow on the right, pill overlapping by 7px.
          */}
          <div
            className="group/cta flex items-center flex-row-reverse justify-end"
            style={{
              // body bottom y=580, CTA top y=612 → gap 32
              marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
            }}
          >
            <motion.a
              href="#hiw-comparison"
              aria-label="Start your assessment"
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-0 rounded-full bg-[#FF8547] hover:bg-[#F08B55] text-white flex items-center justify-center shrink-0 transition-colors will-change-transform"
              style={{
                width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
              }}
            >
              <svg
                viewBox="0 0 30 30"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
                style={{
                  width: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                  height: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                }}
              >
                <path
                  d="M9 21L21 9M21 9H11M21 9V19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
            <motion.a
              href="/pathways"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] font-medium font-[family-name:var(--font-bricolage)] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] transition-[background-color,box-shadow] duration-300 ease-out will-change-transform"
              style={{
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                paddingLeft: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                paddingRight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                fontSize: 'clamp(15px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                marginRight: 'clamp(-10px, calc(-7 / 1920 * 100vw), -7px)',
              }}
            >
              Start Your Assessment
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
