'use client'

import { useState } from 'react'
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
  // No tile is featured at rest — all three top-row items look like plain
  // centered text. The glass card + white bloom + yellow title appear only
  // when the user hovers a tile. Mouse-leave on the row clears state.
  const [featuredIdx, setFeaturedIdx] = useState<number | null>(null)

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
        {/* Figma Vector 254 (58:1343) — full-width 1800px divider line at
            y=5688, sits 120px above the "What It Includes?" eyebrow pill
            (eyebrow at y=5808) and separates this section from "Why Early"
            above. */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="origin-left"
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.18)',
            marginBottom: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
          }}
        />

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

        {/* ── Mobile carousel — all 6 items in one horizontal scroll-snap
            row. The desktop hover-to-feature interaction doesn't translate
            to touch; on mobile every card renders in a plain "compact"
            state instead, with the user swiping to see each one. ────── */}
        <div
          className="lg:hidden flex overflow-x-auto snap-x snap-mandatory -mx-5 px-5 hiw-success-carousel"
          style={{
            gap: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
            marginTop: 'clamp(40px, calc(56 / 1920 * 100vw), 56px)',
            scrollbarWidth: 'none',
          }}
        >
          {[...TOP_ROW, ...BOTTOM_ROW].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="shrink-0 snap-center relative overflow-hidden flex flex-col justify-center text-center"
              style={{
                width: '78%',
                minHeight: 220,
                padding: '32px 24px',
                background:
                  'radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%), linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 24,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <h3
                className="font-[family-name:var(--font-bricolage)] text-[#FEF272]"
                style={{ fontWeight: 600, fontSize: 19, lineHeight: 1.2 }}
              >
                {card.title}
              </h3>
              <p
                className="font-[family-name:var(--font-urbanist)] text-white/85"
                style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.55, marginTop: 12 }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
        <style>{`.hiw-success-carousel::-webkit-scrollbar { display: none; }`}</style>

        {/* ── Desktop tic-tac-toe — 3 cards. Only internal dividers (vertical
            between columns + horizontal between rows). No outer borders. The
            "featured" treatment (glass card + bloom + yellow title) follows
            the cursor; on mouse-leave of the row state clears. ─────────── */}
        <div
          className="hidden lg:grid lg:grid-cols-3"
          style={{
            minHeight: 'clamp(280px, calc(347 / 1920 * 100vw), 347px)',
            marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          }}
          onMouseLeave={() => setFeaturedIdx(null)}
        >
          {TOP_ROW.map((card, i) => {
            const isFeatured = i === featuredIdx
            return (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={
                isFeatured
                  ? { scale: 1.02, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                  : undefined
              }
              onMouseEnter={() => setFeaturedIdx(i)}
              className={`relative overflow-hidden flex flex-col justify-center text-center items-center cursor-default ${
                isFeatured ? 'group' : ''
              }`}
              style={{
                padding:
                  'clamp(28px, calc(56 / 1920 * 100vw), 56px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                // Tic-tac-toe pattern: only internal vertical dividers
                // (between columns 1-2 and 2-3), nothing on the outer edges.
                borderRight:
                  i < 2 ? '1px solid rgba(255,255,255,0.18)' : 'none',
              }}
            >
              {/*
                Featured tile = Rectangle 127 (Figma 58:1329):
                STRAIGHT-EDGED card (Figma export has no rounded class) with
                a soft sage-green glass tint, a centered white Ellipse 55
                (Figma 58:1330) bloom behind the title, plus a faint green
                vignette around the edges. Grainy fractal-noise overlay
                gives the surface its frosted texture.

                Hover: the white bloom expands and the card lifts subtly,
                giving the user the "slide into focus" feedback they asked
                for.
              */}
              {isFeatured && (
                <>
                  {/* Ellipse 55 (Figma 58:1330) — sage GREEN bloom centered
                      on the tile. Per the Figma screenshot the ellipse is
                      green, not white. The diffused radial gives the
                      "highlight" feel without showing a hard shape. */}
                  <motion.div
                    aria-hidden
                    className="absolute pointer-events-none"
                    initial={false}
                    animate={{}}
                    style={{
                      // Figma 58:1330 — EXACT spec from MCP:
                      //   Position: (833, 6082)  Size: 271 × 271
                      //   Fill: #55936C (darker sage)
                      //   Opacity: 100%   Effect: Layer blur (Gaussian)
                      // Solid color + heavy blur replicates Figma's layer
                      // blur. zIndex 3 so the green tint sits OVER the
                      // glass card's white wash. The card has
                      // overflow:hidden so the blur can't bleed outside.
                      width: 'clamp(180px, calc(271 / 1920 * 100vw), 271px)',
                      height: 'clamp(180px, calc(271 / 1920 * 100vw), 271px)',
                      left: '50%',
                      top: '50%',
                      x: '-50%',
                      y: '-50%',
                      borderRadius: '50%',
                      background: '#55936C',
                      filter: 'blur(80px)',
                      opacity: 1,
                      zIndex: 3,
                    }}
                    whileHover={{}}
                  />
                  {/*
                    Glass card per Figma 58:1329 EXACT recipe:
                      backdrop-blur-[17.2px]
                      border-2 border-solid border-white
                      bg: linear-gradient(white 0.2 → 0) + solid white 0.30
                      no border-radius (straight corners), no mask
                  */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      // Glass card per Figma 58:1329 but with a much
                      // lighter white wash so the sage-green Ellipse 55
                      // (rendered ABOVE this layer at zIndex 3) can tint
                      // the card properly. White-30 was drowning the green.
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(17.2px)',
                      WebkitBackdropFilter: 'blur(17.2px)',
                      border: '1.5px solid rgba(255,255,255,0.30)',
                      zIndex: 2,
                    }}
                  />
                  {/* Grain overlay — fractal noise inside the card, soft-light
                      blend at low opacity so it reads as frosted-glass
                      texture, not visible dots. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                      backgroundSize: '220px 220px',
                      mixBlendMode: 'soft-light',
                      opacity: 0.55,
                      zIndex: 3,
                    }}
                  />
                </>
              )}
              <h3
                className="relative font-[family-name:var(--font-bricolage)] transition-colors duration-300"
                style={{
                  // Figma 58:1333 — Bricolage SemiBold 40/48 #FEF272 centered
                  // (when featured/hovered). Title size also bumps slightly
                  // when promoted so the hovered tile stands out.
                  fontWeight: 600,
                  fontSize: isFeatured
                    ? 'clamp(20px, calc(40 / 1920 * 100vw), 40px)'
                    : 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                  lineHeight: isFeatured
                    ? 'clamp(26px, calc(48 / 1920 * 100vw), 48px)'
                    : 1.18,
                  letterSpacing: 0,
                  color: isFeatured ? '#FEF272' : '#ffffff',
                  // Above bloom (3) so title sits cleanly on top of the green.
                  zIndex: 4,
                }}
              >
                {card.title}
              </h3>
              <p
                className="relative font-[family-name:var(--font-urbanist)] transition-colors duration-300"
                style={{
                  fontWeight: isFeatured ? 500 : 400,
                  fontSize: isFeatured
                    ? 'clamp(14px, calc(24 / 1920 * 100vw), 24px)'
                    : 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                  lineHeight: isFeatured
                    ? 'clamp(18px, calc(32 / 1920 * 100vw), 32px)'
                    : 1.55,
                  color: isFeatured ? '#ffffff' : 'rgba(255,255,255,0.65)',
                  marginTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                  maxWidth: 'clamp(280px, calc(471 / 1920 * 100vw), 471px)',
                  // Above bloom (3) so body sits cleanly on top of the green.
                  zIndex: 4,
                }}
              >
                {card.body}
              </p>
            </motion.div>
            )
          })}
        </div>

        {/* Middle horizontal divider (Vector 246 + Vector 1342) — desktop only */}
        <div
          aria-hidden
          className="hidden lg:block"
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.18)',
          }}
        />

        {/* Bottom row — desktop only (mobile renders both rows in the
            carousel above). 3 cards with vertical dividers + hover-featured
            tic-tac-toe pattern, state indices 3, 4, 5 continuing from the
            top row's 0, 1, 2. */}
        <div
          className="hidden lg:grid lg:grid-cols-3"
          style={{ minHeight: 'clamp(220px, calc(280 / 1920 * 100vw), 280px)' }}
          onMouseLeave={() => setFeaturedIdx(null)}
        >
          {BOTTOM_ROW.map((card, i) => {
            const tileIdx = i + 3
            const isFeatured = tileIdx === featuredIdx
            return (
              <motion.div
                key={card.title}
                custom={tileIdx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                onMouseEnter={() => setFeaturedIdx(tileIdx)}
                className="relative overflow-hidden flex flex-col justify-center text-center items-center cursor-default"
                style={{
                  padding:
                    'clamp(28px, calc(56 / 1920 * 100vw), 56px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                  borderRight:
                    i < 2 ? '1px solid rgba(255,255,255,0.18)' : 'none',
                }}
              >
                {isFeatured && (
                  <>
                    <motion.div
                      aria-hidden
                      className="absolute pointer-events-none"
                      initial={false}
                      animate={{}}
                      style={{
                        // Figma 58:1330 — Ellipse 55, 271×271 with SVG
                        // inset[-36.9%] → effective bloom 471×471. zIndex 3
                        // so it tints OVER the white-30 glass card.
                        width: 'clamp(260px, calc(471 / 1920 * 100vw), 471px)',
                        height: 'clamp(260px, calc(471 / 1920 * 100vw), 471px)',
                        left: '50%',
                        top: '50%',
                        x: '-50%',
                        y: '-50%',
                        borderRadius: '50%',
                        background:
                          'radial-gradient(circle at 50% 50%, rgba(140, 185, 155, 0.85) 0%, rgba(110, 165, 132, 0.55) 35%, rgba(98, 150, 117, 0.22) 65%, rgba(98, 150, 117, 0) 88%)',
                        filter: 'blur(28px)',
                        zIndex: 3,
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        // Lighter white wash so the green bloom (zIndex 3)
                        // can tint through. Was white-30 which obscured it.
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(17.2px)',
                        WebkitBackdropFilter: 'blur(17.2px)',
                        border: '1.5px solid rgba(255,255,255,0.30)',
                        zIndex: 2,
                      }}
                    />
                  </>
                )}
                <h3
                  className="relative font-[family-name:var(--font-bricolage)] transition-colors duration-300"
                  style={{
                    fontWeight: 600,
                    fontSize: isFeatured
                      ? 'clamp(20px, calc(40 / 1920 * 100vw), 40px)'
                      : 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                    lineHeight: isFeatured
                      ? 'clamp(26px, calc(48 / 1920 * 100vw), 48px)'
                      : 1.18,
                    letterSpacing: 0,
                    color: isFeatured ? '#FEF272' : '#ffffff',
                    // Above bloom (3) so title sits cleanly on top of the green.
                    zIndex: 4,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="relative font-[family-name:var(--font-urbanist)] transition-colors duration-300"
                  style={{
                    fontWeight: isFeatured ? 500 : 400,
                    fontSize: isFeatured
                      ? 'clamp(14px, calc(24 / 1920 * 100vw), 24px)'
                      : 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                    lineHeight: isFeatured
                      ? 'clamp(18px, calc(32 / 1920 * 100vw), 32px)'
                      : 1.55,
                    color: isFeatured ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    marginTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                    maxWidth: 'clamp(280px, calc(471 / 1920 * 100vw), 471px)',
                    // Above bloom (3) so body sits cleanly on top of the green.
                    zIndex: 4,
                  }}
                >
                  {card.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
