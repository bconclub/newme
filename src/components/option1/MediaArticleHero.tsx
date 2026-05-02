'use client'

import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'

const EASE = [0.22, 1, 0.36, 1] as const
const HERO_BG = '/media/Media Hero.webp'

/**
 * Article-detail hero — Figma node 107:69 top zone.
 *
 * Reuses the Media listing hero card pattern (1880×694 doctor photo with
 * left moss→pine wash) but with the "Our Latest News." overlay and the
 * article title/subtitle/author block + featured image stacked underneath
 * on the dark page background.
 */
export default function MediaArticleHero({ article }: { article: Article }) {
  return (
    <>
      {/* Top photo card — same pattern as MediaHero, just shorter overlay text. */}
      <section
        className="relative pb-3 md:pb-4"
        style={{
          paddingTop: 'clamp(66px, calc(74 / 1920 * 100vw), 74px)',
          paddingLeft: 'clamp(12px, 1.04vw, 20px)',
          paddingRight: 'clamp(12px, 1.04vw, 20px)',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(28px, 2.5vw, 48px)',
            minHeight: 'clamp(420px, calc(694 / 1880 * 100vw), 694px)',
          }}
        >
          {/* Doctor photo */}
          <div
            className="absolute inset-0 bg-cover bg-[position:72%_center] md:bg-center"
            style={{ backgroundImage: `url('${HERO_BG}')` }}
          />
          {/* Left moss→pine wash */}
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
          {/* Noise */}
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

          {/* Overlay copy — "Our Latest News." + subtitle.
              Figma 107:2410 / 107:2411:
              - title at (120, 421) → card-relative (100, 269), Bricolage 600 72/72
              - subtitle at (120, 517) → card-relative (100, 365), Urbanist 400 24/30, max 783 */}
          <div
            className="relative z-10 flex flex-col"
            style={{
              paddingTop: 'clamp(170px, calc(269 / 1920 * 100vw), 269px)',
              paddingLeft: 'clamp(28px, calc(100 / 1920 * 100vw), 100px)',
              paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
              paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
              maxWidth: 'clamp(360px, calc(1186 / 1920 * 100vw), 1186px)',
            }}
          >
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(32px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                maxWidth: 'clamp(320px, calc(719 / 1920 * 100vw), 719px)',
              }}
            >
              Our Latest News.
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
              Consult with NewME’s clinical team from wherever you are. Focused,
              evidence-based care without referral chains or waiting.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Article header block — title + subtitle + author, centered on the
          dark page bg below the hero card. */}
      <section
        className="relative"
        style={{
          paddingTop: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
          paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 1200 }}>
          {/* Article title — Figma 107:2412: Bricolage 600 72/72, max 1085 */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(56 / 1920 * 100vw), 56px)',
              lineHeight: 1.1,
              letterSpacing: 0,
              maxWidth: 'clamp(320px, calc(1085 / 1920 * 100vw), 1085px)',
            }}
          >
            {article.title}
          </motion.h2>

          {/* Subtitle — Figma 107:2418: Urbanist 400 22/30, max 1001 */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto text-white/85 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
              maxWidth: 'clamp(280px, calc(1001 / 1920 * 100vw), 1001px)',
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            {article.subtitle}
          </motion.p>

          {/* Author row — Figma 107:2415 (avatar 48) + 107:2413 (name) + 107:2414 (date) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center justify-center"
            style={{
              gap: 'clamp(10px, calc(12 / 1920 * 100vw), 12px)',
              marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            <div
              className="rounded-full overflow-hidden bg-cover bg-center shrink-0"
              style={{
                width: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                height: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                backgroundImage: `url('${article.avatar}')`,
              }}
              aria-hidden
            />
            <div className="flex flex-col text-left">
              <span
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  lineHeight: 1.1,
                }}
              >
                {article.authorName}
              </span>
              <span
                className="font-[family-name:var(--font-urbanist)] text-white/70"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
                  lineHeight: 1.1,
                  marginTop: 6,
                }}
              >
                {article.city} {article.date}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Featured article image — Figma 107:2422: 1194×533, rounded ~24px */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto overflow-hidden"
          style={{
            marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
            maxWidth: 'clamp(320px, calc(1194 / 1920 * 100vw), 1194px)',
            aspectRatio: '1194 / 533',
            borderRadius: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${article.heroImage}')` }}
          />
        </motion.figure>
      </section>
    </>
  )
}
