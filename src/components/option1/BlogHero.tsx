'use client'

import { motion } from 'framer-motion'

/**
 * Blog page hero — mirrors the structure of `MediaHero` so /blog and /media
 * feel like sibling pages.
 *
 * Currently no photo background — the content team is sourcing a unique
 * blog hero (responsive-audit.md flagged that re-using any existing hero
 * would duplicate /virtual-clinic, /team, or /media). Until the photo
 * lands, we render a deep moss→pine gradient with the same grain
 * treatment so the visual language stays consistent. When a real photo
 * is dropped into /public/blog/hero.webp, swap the `<div>` for a
 * background-image and reduce the gradient's opacity.
 */
const HERO_IMAGE = '/blog/hero.webp' // Will resolve when content team uploads.

export default function BlogHero() {
  return (
    <section
      className="relative pb-3 md:pb-4"
      style={{
        paddingTop: 'clamp(66px, calc(74 / 1920 * 100vw), 74px)',
        paddingLeft: 'clamp(12px, 1.04vw, 20px)',
        paddingRight: 'clamp(12px, 1.04vw, 20px)',
      }}
    >
      <div>
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(28px, 2.5vw, 48px)',
            minHeight: 'clamp(320px, calc(694 / 1880 * 100vw), 694px)',
            // Solid pine base — ensures the panel renders even if the hero
            // photo file isn't present yet.
            background: '#013E37',
          }}
        >
          {/* Background image — graceful no-op when the file isn't there
              yet (Next will return a 404 but the gradient below covers it). */}
          <div
            className="absolute inset-0 bg-cover bg-[position:50%_center]"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />

          {/* Moss → pine wash — matches MediaHero's recipe. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
              opacity: 0.92,
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 70%)',
            }}
          />

          {/* Grain — masked to the left zone only */}
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

          {/* Content — same padding spec as MediaHero so the headline lands
              in the same visual position across the two pages. */}
          <div
            className="relative z-10 flex flex-col"
            style={{
              paddingTop: 'clamp(170px, calc(233 / 1920 * 100vw), 233px)',
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
                lineHeight: 1,
                letterSpacing: 0,
                maxWidth: 'clamp(320px, calc(880 / 1920 * 100vw), 880px)',
              }}
            >
              Notes From
              <br />
              The Clinic.
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
              Insights from the NewME team on metabolic health, the gut–brain
              axis, and what structured clinical care actually looks like.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
