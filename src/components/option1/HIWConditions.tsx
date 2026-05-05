'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:1345–58:1447 — "Conditions addressed within the NewME System"
 *
 * Section background: Mask group 58:1345 (1800×924 at 59,6952) with
 * Ellipse 59 (2247×1049) green-gradient blur fill, radius 34.
 *
 * Header (centered):
 *   · Eyebrow 58:1349 — "Ailments" (137×48 at 892,7072)
 *   · Heading 58:1447 — "Conditions addressed within the NewME System"
 *     (989×144 at 466,7144)
 *   · Body 58:1446 — long description (1181×68 at 370,7320)
 *
 * Pills (groups 299, 300, 414, 415, 417, 305) — 6 rows centered.
 */

// Final consolidated list, ordered as per Figma rows.
// Per client feedback: Fibromyalgia and Weight Gain removed; Grave's Disease added.
const CONDITIONS = [
  // Row 1 (5)
  'Acid reflux',
  'Autoimmune conditions',
  'Bloating and Burping',
  'Chronic Gastritis',
  'Crohn’s Disease',
  // Row 2 (5) — Fibromyalgia removed; replaced with Grave's Disease.
  'Gestational Diabetes',
  'Type-2 Diabetes and Prediabetes',
  'Endometriosis',
  'Fatty Liver',
  'Grave’s Disease',
  // Row 3 (5)
  'Fissures, Piles, Anal Erosions',
  'Food Intolerances',
  'GERD',
  'Hashimoto’s Thyroiditis',
  'Heart Conditions',
  // Row 4 (6)
  'Hormonal Imbalances',
  'Hypertension',
  'IBD',
  'IBS, IBS-D, IBS-M',
  'Menopause',
  'Obesity',
  // Row 5 (6)
  'Postpartum',
  'Psoriasis',
  'SIBO',
  'Thyroid Conditions',
  'Thyroid Nodules',
  'Ulcerative Colitis',
  // (Weight Gain removed per client feedback.)
]

export default function HIWConditions() {
  return (
    <section
      id="hiw-conditions"
      className="relative"
      style={{
        // Figma: success cards end y=6700, mask group y=6952 → 252 gap.
        paddingTop: 'clamp(80px, calc(140 / 1920 * 100vw), 140px)',
        paddingBottom: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/*
          Mask group + Rectangle 126 (Figma 58:1346 + 58:1348):
          1800×924 rounded-34 panel with 1px solid rgba(255,255,255,0.28)
          border, green-gradient Ellipse 59 inside, soft fractal noise on top.
          The faded white outline is the "short border" the user noticed —
          it defines the panel even when the green wash is dim.

          Per user feedback: card should be TRANSLUCENT, not transparent.
          A semi-opaque dark-pine fill dims the page-bg yellow (Ellipse 67)
          so it only bleeds in subtly at the bottom edge per Figma, instead
          of shining through at full intensity.
        */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            border: '1px solid rgba(255,255,255,0.28)',
            background: 'rgba(4, 60, 57, 0.55)',
            paddingTop: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
            paddingBottom: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          }}
        >
          {/* Ellipse 59 green gradient */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: 'calc(-169 / 1800 * 100%)',
              top: 'calc(-78 / 924 * 100%)',
              width: 'calc(2247 / 1800 * 100%)',
              height: 'calc(1049 / 924 * 100%)',
              borderRadius: '50%',
              background: 'linear-gradient(0deg, #629675 0%, #013E37 100%)',
              filter: 'blur(clamp(180px, calc(500 / 1920 * 100vw), 500px))',
              opacity: 0.7,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '180px 180px',
              mixBlendMode: 'overlay',
              opacity: 0.55,
            }}
          />

          {/* Header — centered */}
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              <EyebrowPill>Ailments</EyebrowPill>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                // Figma 989×144 → ~72/72
                fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                marginTop: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
                maxWidth: 'clamp(320px, calc(989 / 1920 * 100vw), 989px)',
              }}
            >
              Conditions Addressed<br />Within The NewME System
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-white/80 font-[family-name:var(--font-urbanist)]"
              style={{
                fontWeight: 400,
                // Figma 1181×68 → ~22/34 over 2 lines
                fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
                lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                marginTop: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                maxWidth: 'clamp(320px, calc(1181 / 1920 * 100vw), 1181px)',
              }}
            >
              NewME works with a wide range of metabolic, gastrointestinal, and
              hormonal conditions that are often interconnected. The complete
              range of conditions include:
            </motion.p>
          </div>

          {/*
            Pill grid — desktop renders as a centered flex-wrap blob (max
            1280px). On mobile (<md) the inner blob is forced to 640px
            min-width and the outer wrapper scrolls horizontally — so the
            user swipes left/right through a wider word-blob instead of
            scrolling vertically through 7+ stacked rows. Mobile-only
            scrollbar is hidden via the `condition-pills-scroll` class.
          */}
          <div
            className="condition-pills-scroll relative md:overflow-visible overflow-x-auto -mx-5 md:mx-0"
            style={{
              marginTop: 'clamp(40px, calc(72 / 1920 * 100vw), 72px)',
              scrollbarWidth: 'none',
            }}
          >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
            }}
            className="relative flex flex-wrap justify-center min-w-[640px] md:min-w-0 mx-5 md:mx-auto"
            style={{
              gap: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
              maxWidth: 'clamp(320px, calc(1280 / 1920 * 100vw), 1280px)',
            }}
          >
            {CONDITIONS.map((condition) => (
              <motion.span
                key={condition}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                // Hover state per Figma 58:1372 — chip flips to solid
                // white bg with dark-green #013E37 text. Long-ish duration
                // (0.45s) with smooth ease so the chip-to-chip motion
                // creates a trail instead of a hard snap.
                whileHover={{
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                  color: '#013E37',
                  scale: 1.04,
                  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                }}
                className="inline-flex items-center rounded-full font-[family-name:var(--font-bricolage)] text-white cursor-default whitespace-nowrap"
                style={{
                  // Figma 58:1354 — pill: 1px solid white on transparent fill
                  // with 2px backdrop blur, h=48.
                  // Figma 58:1387 — text: Bricolage Grotesque Light 24/14 white.
                  // (Was Urbanist 14 before, way too small.)
                  height: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                  padding:
                    '0 clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                  fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: 0,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                }}
              >
                {condition}
              </motion.span>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
