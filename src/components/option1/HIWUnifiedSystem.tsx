'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:1242–58:2621 — "A Unified System Of Care"
 *
 * Header (centered, all on artboard 1920):
 *   · Eyebrow pill 58:1242 — "About The Clinical System"
 *   · Heading 58:1249 — "A Unified System Of Care" (874×72 at 523,1038)
 *   · Body 58:1248 — long description (1181×102 at 370,1142)
 *
 * Cards: 2-column zig-zag, image on LEFT edge of each card (215px wide), text right.
 *   1. Assessment           — 828×292 at (120,1371) — image (128,1379) 215×276
 *   2. Prescription         — 828×292 at (972,1449) — image (980,1457) 215×276
 *   3. Structured Care      — 828×326 at (120,1687) — image (128,1695) 215×310
 *   4. Monitoring & Recal.  — 828×340 at (972,1765) — image (980,1773) 215×324
 *   5. Continuity           — 828×294 at (120,2029) — image (128,2037) 215×278
 *   6. CTA card (text only) — 828×192 at (972,2129)
 */

type Card = {
  title: string
  body: string
  image?: string
  imageAlt?: string
  cta?: boolean
}

const CARDS: Card[] = [
  {
    title: 'Assessment',
    body:
      'A structured clinical intake that maps your symptoms, health history, and metabolic patterns. This is not a quiz. It is the foundation of your care.',
    image: '/how%20it%20works/Assesment.png',
    imageAlt: 'Clinical assessment',
  },
  {
    title: 'Prescription',
    body:
      'Based on your assessment, you are guided into a specific phase of care. Your pathway is prescribed to address what your body needs right now.',
    image: '/how%20it%20works/Prescription.png',
    imageAlt: 'Prescribed care pathway',
  },
  {
    title: 'Structured Care',
    body:
      'You enter your phase with a dedicated clinical health coach & an expert care team. Nutrition, movement, sleep, and stress are addressed in a coordinated, week-by-week structure.',
    image: '/how%20it%20works/Structured%20Care.png',
    imageAlt: 'Structured weekly care',
  },
  {
    title: 'Monitoring & Recalibration',
    body:
      'Your progress is tracked against clinical markers and real responses. Your care is adjusted as your body stabilizes, not left unchanged.',
    image: '/how%20it%20works/MOnitoring.png',
    imageAlt: 'Clinical monitoring',
  },
  {
    title: 'Continuity',
    body:
      'Care does not end with one phase. Ongoing monitoring and structured accountability help maintain stability over the long term.',
    image: '/how%20it%20works/Continuity.png',
    imageAlt: 'Long-term continuity',
  },
  {
    title: '',
    body: "See how NewME's structured approach applies to your body.",
    cta: true,
  },
]

export default function HIWUnifiedSystem() {
  return (
    <section
      id="hiw-unified"
      className="relative"
      style={{
        // Figma: hero ends y=846, eyebrow y=966 → 120 gap.
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        // Cards end y=2323, comparison section y=2454 → 131 gap.
        paddingBottom: 'clamp(72px, calc(131 / 1920 * 100vw), 131px)',
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
            <EyebrowPill>About The Clinical System</EyebrowPill>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              // Figma: 874×72, line-height 72 → ~72/1
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              letterSpacing: 0,
              // pill bottom y=1014, heading y=1038 → 24 gap
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 'clamp(320px, calc(874 / 1920 * 100vw), 874px)',
            }}
          >
            A Unified System Of Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-white/80 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              // Figma 1181×102 → ~24/34 over 3 lines
              fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              // heading bottom y=1110, body y=1142 → 32 gap
              marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
              maxWidth: 'clamp(320px, calc(1181 / 1920 * 100vw), 1181px)',
            }}
          >
            At NewME, we follow a framework that has been carefully designed and
            perfected by doctors. The phases may differ, but the system does not.
            From assessment to long-term continuity, each step is connected,
            guided, and built around how your body responds over time.
          </motion.p>
        </div>

        {/*
          Cards grid. Figma: 2 columns × 3 rows zig-zag with vertical offsets.
          Card width 828, total content area 120..1800 = 1680, gap 144 between
          col 1 (120..948) and col 2 (972..1800).
          Vertical offsets (each col against its own row top):
            row 0: col-L y=1371, col-R y=1449 → R offset +78
            row 1: col-L y=1687, col-R y=1765 → R offset +78
            row 2: col-L y=2029, col-R y=2129 → R offset +100
        */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-[clamp(20px,calc(40/1920*100vw),40px)] lg:gap-y-[clamp(20px,calc(36/1920*100vw),36px)]"
          style={{
            // header body bottom y=1244, first card y=1371 → 127 gap
            marginTop: 'clamp(56px, calc(127 / 1920 * 100vw), 127px)',
          }}
        >
          {/* Left column */}
          <div className="flex flex-col gap-[clamp(20px,calc(40/1920*100vw),40px)]">
            {[CARDS[0], CARDS[2], CARDS[4]].map((card, i) => (
              <UnifiedCard key={card.title} card={card} delay={i * 0.06} />
            ))}
          </div>
          {/* Right column — Figma offset down 78px on first card */}
          <div
            className="flex flex-col gap-[clamp(20px,calc(40/1920*100vw),40px)]"
            style={{
              marginTop:
                'clamp(0px, calc(78 / 1920 * 100vw), 78px)',
            }}
          >
            {[CARDS[1], CARDS[3], CARDS[5]].map((card, i) => (
              <UnifiedCard key={card.title || 'cta'} card={card} delay={0.04 + i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function UnifiedCard({ card, delay }: { card: Card; delay: number }) {
  const isCta = card.cta

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden flex"
      style={{
        // Figma card heights vary 192..340. Use min-height proportional to
        // card content, allow text to expand naturally.
        minHeight: isCta
          ? 'clamp(140px, calc(192 / 1920 * 100vw), 192px)'
          : 'clamp(220px, calc(292 / 1920 * 100vw), 292px)',
        borderRadius: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
        background: isCta
          ? 'linear-gradient(135deg, rgba(254,242,114,0.12) 0%, rgba(254,242,114,0.04) 100%)'
          : 'rgba(255,255,255,0.04)',
        border: isCta
          ? '1px solid rgba(254,242,114,0.32)'
          : '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Image — Figma: 215px wide on LEFT edge of card */}
      {card.image && (
        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            width: 'clamp(110px, calc(215 / 1920 * 100vw), 215px)',
            margin: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
            borderRadius: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)',
            background:
              'linear-gradient(135deg, #1A4F49 0%, #0E3B37 100%)',
          }}
        >
          {/* Image with fallback color if file missing */}
          <div
            aria-label={card.imageAlt}
            role="img"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${card.image}')` }}
          />
          {/* Subtle inner shadow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              borderRadius: 'inherit',
            }}
          />
        </div>
      )}

      {/* Text */}
      <div
        className="flex flex-col justify-center"
        style={{
          flex: '1 1 0',
          padding: isCta
            ? 'clamp(20px, calc(32 / 1920 * 100vw), 32px) clamp(24px, calc(56 / 1920 * 100vw), 56px)'
            : 'clamp(20px, calc(32 / 1920 * 100vw), 32px) clamp(20px, calc(40 / 1920 * 100vw), 40px) clamp(20px, calc(32 / 1920 * 100vw), 32px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
        }}
      >
        {!isCta && (
          <h3
            className="font-[family-name:var(--font-bricolage)] text-[#FEF272]"
            style={{
              fontWeight: 600,
              // Figma title sizes: ~36-40px
              fontSize: 'clamp(20px, calc(36 / 1920 * 100vw), 36px)',
              lineHeight: 1.1,
              letterSpacing: 0,
            }}
          >
            {card.title}
          </h3>
        )}
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 400,
            // Figma body: ~20/30 (498×136 ~ 7 lines, 509×170 ~ 7 lines)
            fontSize: isCta
              ? 'clamp(15px, calc(24 / 1920 * 100vw), 24px)'
              : 'clamp(13px, calc(20 / 1920 * 100vw), 20px)',
            lineHeight: isCta
              ? 'clamp(20px, calc(32 / 1920 * 100vw), 32px)'
              : 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
            color: isCta ? '#FEF272' : 'rgba(255,255,255,0.78)',
            marginTop: isCta ? 0 : 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
          }}
        >
          {card.body}
        </p>
      </div>
    </motion.div>
  )
}
