'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:1245–58:1342 — "Designed To Help You Succeed"
 *
 * Header (centered):
 *   · Eyebrow 58:1245 — "What It Includes?" (229×48 at 846,5808)
 *   · Heading 58:1250 — "Designed To Help You Succeed" (1058×72 at 431,5880)
 *
 * 3×2 grid of cards, separated by thin grid lines (no card bgs):
 *   Top row:
 *     · Personalized Nutrition Protocol      (LEFT)   — text only
 *     · Dedicated Clinical Health Coach      (CENTER) — FEATURED yellow card
 *         Rectangle 127 (605×347) + Ellipse 55 (271×271) circular image
 *     · Metabolic & Gut Marker Tracking      (RIGHT)  — text only
 *
 *   Top horiz divider: Vector 254 y=5688 (above heading)
 *   Mid  horiz divider: Vector 1342 + Vector 246 y=6403 (between rows)
 *
 *   Bottom row (vertical dividers Vector 244 x=657, Vector 245 x=1263):
 *     · Movement & Recovery Protocols
 *     · Sleep & Stress Frameworks
 *     · Structured Community Accountability
 */

const TOP_ROW = [
  {
    title: 'Personalized Nutrition Protocol',
    body:
      'Built from your assessment, symptoms, and clinical markers. Adapted as your body responds.',
    featured: false,
  },
  {
    title: 'Dedicated Clinical Health Coach',
    body:
      'Guides your progress, maintains accountability, and ensures continuity across your care.',
    featured: true,
  },
  {
    title: 'Metabolic & Gut Marker Tracking',
    body:
      'Progress is measured through clinical signals, not guesswork.',
    featured: false,
  },
]

const BOTTOM_ROW = [
  {
    title: 'Movement & Recovery Protocols',
    body:
      'Integrated into your care based on your energy, stress, and metabolic state.',
  },
  {
    title: 'Sleep & Stress Frameworks',
    body:
      'Addressed as core drivers of metabolic & gut stability, not optional add-ons.',
  },
  {
    title: 'Structured Community Accountability',
    body:
      'Designed to reinforce consistency through shared progress and support.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function HIWSuccessCards() {
  return (
    <section
      id="hiw-success"
      className="relative"
      style={{
        // Figma: Why Early callout ends y=5448, eyebrow starts y=5808 → 360 gap.
        paddingTop: 'clamp(80px, calc(180 / 1920 * 100vw), 180px)',
        paddingBottom: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Header — centered */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <EyebrowPill>What It Includes?</EyebrowPill>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              letterSpacing: 0,
              marginTop: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 'clamp(320px, calc(1058 / 1920 * 100vw), 1058px)',
            }}
          >
            Designed To Help You Succeed
          </motion.h2>
        </div>

        {/* Top horizontal divider (Vector 254) */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="origin-left"
          style={{
            // Figma top divider y=5688 is above the heading. Place it just below.
            marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            height: 1,
            background: 'rgba(255,255,255,0.18)',
          }}
        />

        {/* Top row — 3 cards (middle is featured yellow card with image) */}
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ minHeight: 'clamp(280px, calc(347 / 1920 * 100vw), 347px)' }}>
          {TOP_ROW.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className={`relative flex ${
                card.featured
                  ? 'flex-row items-center'
                  : 'flex-col justify-center'
              }`}
              style={{
                padding: card.featured
                  ? 'clamp(20px, calc(28 / 1920 * 100vw), 28px) clamp(20px, calc(36 / 1920 * 100vw), 36px)'
                  : 'clamp(28px, calc(56 / 1920 * 100vw), 56px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                background: card.featured ? '#FEF272' : 'transparent',
                borderRadius: card.featured
                  ? 'clamp(20px, calc(28 / 1920 * 100vw), 28px)'
                  : 0,
                // Right-side vertical lines: between col 1-2 and col 2-3
                borderRight:
                  !card.featured && i === 0
                    ? '1px solid rgba(255,255,255,0.18)'
                    : 'none',
                borderLeft:
                  !card.featured && i === 2
                    ? '1px solid rgba(255,255,255,0.18)'
                    : 'none',
              }}
            >
              {card.featured ? (
                <>
                  {/* Featured card — text + circular image (Ellipse 55 271×271) */}
                  <div className="flex flex-col flex-1">
                    <h3
                      className="font-[family-name:var(--font-bricolage)] text-[#173B39]"
                      style={{
                        fontWeight: 600,
                        // Figma 430×96 → ~36/40 over 2 lines
                        fontSize: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                        lineHeight: 1.18,
                        letterSpacing: 0,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{
                        fontWeight: 500,
                        fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                        lineHeight: 1.5,
                        color: 'rgba(14,40,39,0.78)',
                        marginTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                      }}
                    >
                      {card.body}
                    </p>
                  </div>
                  {/* Circular image (Ellipse 55) */}
                  <div
                    aria-hidden
                    className="shrink-0 rounded-full overflow-hidden"
                    style={{
                      width: 'clamp(110px, calc(180 / 1920 * 100vw), 180px)',
                      height: 'clamp(110px, calc(180 / 1920 * 100vw), 180px)',
                      marginLeft: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                      background: '#173B39',
                      backgroundImage: "url('/dr-pal-portrait.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      boxShadow: 'inset 0 0 0 4px rgba(23,59,57,0.10)',
                    }}
                  />
                </>
              ) : (
                <>
                  <h3
                    className="font-[family-name:var(--font-bricolage)] text-white"
                    style={{
                      fontWeight: 600,
                      fontSize: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                      lineHeight: 1.18,
                      letterSpacing: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-urbanist)] text-white/65"
                    style={{
                      fontWeight: 400,
                      fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                      lineHeight: 1.55,
                      marginTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                      maxWidth: 'clamp(280px, calc(471 / 1920 * 100vw), 471px)',
                    }}
                  >
                    {card.body}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Middle horizontal divider (Vector 246 + Vector 1342) */}
        <div
          aria-hidden
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.18)',
          }}
        />

        {/* Bottom row — 3 cards with vertical dividers (Vectors 244 + 245) */}
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ minHeight: 'clamp(220px, calc(280 / 1920 * 100vw), 280px)' }}>
          {BOTTOM_ROW.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i + 3}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative flex flex-col justify-center"
              style={{
                padding:
                  'clamp(28px, calc(56 / 1920 * 100vw), 56px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                borderRight:
                  i < 2 ? '1px solid rgba(255,255,255,0.18)' : 'none',
              }}
            >
              <h3
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                  lineHeight: 1.18,
                  letterSpacing: 0,
                }}
              >
                {card.title}
              </h3>
              <p
                className="font-[family-name:var(--font-urbanist)] text-white/65"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                  lineHeight: 1.55,
                  marginTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                  maxWidth: 'clamp(280px, calc(471 / 1920 * 100vw), 471px)',
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
