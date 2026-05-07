'use client'

import { motion } from 'framer-motion'

// ResearchLab hero — Figma node 83:2498 (page) / 83:2511 (mask group).
// Single rounded photo card 1880×694 at top:152 left:20 of the 1920 artboard.
// Same left moss→pine wash pattern as the home Hero, just shorter.
const HERO_IMAGE = '/images/research-lab/hero.webp'

export default function ResearchHero() {
  return (
    <section
      // Hero card top sits at y=152, header is 74px → 39px gap below the
      // header. Match the home Hero's padding-top formula so the visible
      // gap is identical across pages.
      className="relative pb-3 md:pb-4"
      style={{
        paddingTop: 'clamp(66px, calc(74 / 1920 * 100vw), 74px)',
        paddingLeft: 'clamp(12px, 1.04vw, 20px)',
        paddingRight: 'clamp(12px, 1.04vw, 20px)',
      }}
    >
      <div>
        {/* Hero card — Figma 1880 × 694, aspect ≈ 2.71:1, radius 48 */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(28px, 2.5vw, 48px)',
            minHeight: 'clamp(320px, calc(694 / 1880 * 100vw), 694px)',
          }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-[position:72%_center] md:bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />

          {/* Left moss→pine wash — Ellipse 27 in Figma, same gradient as
              home Hero so the brand carries across the site. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
              opacity: 0.9,
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 70%)',
            }}
          />

          {/* Monotone noise — masked to the left zone only */}
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
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 32%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0) 72%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 32%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0) 72%)',
            }}
          />

          {/* Content
              Figma exact specs (1920 artboard, hero card 1880×694 at top:152 left:20):
              - Heading: x=120 (artboard) y=400 → from card: x=100, y=248
                width 1086, Bricolage SemiBold 72px / lh 72
              - Subtitle: x=120 y=568 → from card: x=100, y=416
                width 783, Urbanist Regular 24px / lh 30
                Gap between heading bottom (y=392) and subtitle top (y=416) = 24px
          */}
          <div
            className="relative z-10 flex flex-col"
            style={{
              paddingTop: 'clamp(180px, calc(248 / 1920 * 100vw), 248px)',
              paddingLeft: 'clamp(28px, calc(100 / 1920 * 100vw), 100px)',
              paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
              paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
              maxWidth: 'clamp(360px, calc(1186 / 1920 * 100vw), 1186px)',
            }}
          >
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(32px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1, // Figma: 72/72 = 1
                letterSpacing: 0,
                maxWidth: 'clamp(320px, calc(1086 / 1920 * 100vw), 1086px)',
              }}
            >
              We Rely On Research-Based
              <br />
              Evidence.
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
                maxWidth: 'clamp(280px, calc(783 / 1920 * 100vw), 783px)',
                marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              }}
            >
              You Should Too.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
