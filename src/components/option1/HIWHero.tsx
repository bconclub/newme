'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

export default function HIWHero() {
  return (
    <section
      id="hiw-hero"
      className="relative pb-3 md:pb-4"
      style={{
        paddingTop: 'clamp(88px, calc(113 / 1920 * 100vw), 113px)',
        paddingLeft: 'clamp(12px, 1.04vw, 20px)',
        paddingRight: 'clamp(12px, 1.04vw, 20px)',
      }}
    >
      {/* Hero card — 1880×860 artboard, radius 48 */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 'clamp(28px, 2.5vw, 48px)',
          minHeight: 'clamp(480px, calc(860 / 1920 * 100vw), 860px)',
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/home/Hero image.webp')" }}
        />

        {/* Left overlay — pine gradient wash over the photo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #0E2827 0%, #1A4A48 28%, #144F49 55%, #013E37 80%)',
            opacity: 0.92,
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 76%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0) 76%)',
          }}
        />

        {/* Noise texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.18,
            mixBlendMode: 'multiply',
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: '220px 220px',
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 72%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 72%)',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            paddingTop: 'clamp(100px, calc(280 / 1920 * 100vw), 280px)',
            paddingLeft: 'clamp(40px, calc(100 / 1920 * 100vw), 100px)',
            paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
            paddingBottom: 'clamp(60px, calc(100 / 1920 * 100vw), 100px)',
            maxWidth: 'clamp(360px, calc(960 / 1920 * 100vw), 960px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EyebrowPill>How It Works</EyebrowPill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(34px, calc(88 / 1920 * 100vw), 88px)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              marginTop: 'clamp(20px, calc(36 / 1920 * 100vw), 36px)',
              maxWidth: 'clamp(320px, calc(860 / 1920 * 100vw), 860px)',
            }}
          >
            You Don&apos;t Choose A Program,
            <br />
            You&apos;re Prescribed A Path.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
              lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
              maxWidth: 'clamp(280px, calc(620 / 1920 * 100vw), 620px)',
              marginTop: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
            }}
          >
            NewME isn&apos;t a one-size-fits-all program. Every person enters a
            doctor-led intake, gets assessed, and receives a structured care
            pathway built specifically around their body, history, and goals.
          </motion.p>

          {/* CTA button group */}
          <div
            className="group/cta flex items-center flex-row-reverse justify-end"
            style={{ marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)' }}
          >
            <motion.a
              href="#hiw-unified"
              aria-label="See how it works"
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
                fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
                lineHeight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                marginRight: 'clamp(-10px, calc(-7 / 1920 * 100vw), -7px)',
              }}
            >
              Get your assessment
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
