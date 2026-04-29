'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:1448–58:1473, 58:2624 — "Structured Care Needs Human Guidance"
 *
 * Layout: image LEFT + text RIGHT.
 *
 *   Image (Mask group 58:2624) — 883×818 at (60,7996)
 *   Right column (x=1047):
 *     · Eyebrow 58:1448 — "Health Coach vs AI Coach" (325×48 at 1047,8076)
 *     · Heading 58:1452 — "Structured Care Needs Human Guidance"
 *       (676×216 at 1047,8148) — 3 lines ~72/72
 *     · Body 58:1451 — long description (812×136 at 1047,8396)
 *
 * 5 rows of bullet items, divided by horizontal Vectors 250–253:
 *   1. Reads between the lines       — "Picks up on frustration..."
 *   2. Real accountability           — "People follow through..."
 *   3. Judgment over data            — "Adapts plans to context..."
 *   4. Builds lasting habits         — "Reshapes behaviour..."
 *   5. Trusted human presence        — "A coach who knows your history..."
 */

const POINTS = [
  {
    title: 'Reads between the lines',
    body:
      'Picks up on frustration, resistance, and hesitation that AI misses.',
  },
  {
    title: 'Real accountability',
    body: 'People follow through when a human is watching.',
  },
  {
    title: 'Judgment over data',
    body: 'Adapts plans to context, not just numbers.',
  },
  {
    title: 'Builds lasting habits',
    body: 'Reshapes behaviour through ongoing human guidance.',
  },
  {
    title: 'Trusted human presence',
    body:
      'A coach who knows your history, goals, and setbacks builds confidence AI can’t replicate.',
  },
]

const IMAGE = '/how%20it%20works/Structred%20care%20needs%20human%20guidance.webp'

export default function HIWHumanGuidance() {
  return (
    <section
      id="hiw-human-guidance"
      className="relative"
      style={{
        // Figma: ailments mask ends y=7876, image starts y=7996 → 120 gap.
        paddingTop: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-stretch gap-[clamp(28px,calc(64/1920*100vw),64px)]"
        style={{ maxWidth: 1800 }}
      >
        {/* Image LEFT — 883×818, radius ~40 */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative shrink-0 overflow-hidden"
          style={{
            width: '100%',
            maxWidth: 'clamp(280px, calc(883 / 1920 * 100vw), 883px)',
            aspectRatio: '883 / 818',
            borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            background:
              'linear-gradient(135deg, #1A4F49 0%, #0E3B37 100%)',
          }}
        >
          <div
            role="img"
            aria-label="Health coach with patient"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGE}')` }}
          />
        </motion.div>

        {/* Right column — text + bullet list */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col flex-1"
          style={{
            // Figma right column starts y=8076, image starts y=7996 → +80
            paddingTop: 'clamp(0px, calc(80 / 1920 * 100vw), 80px)',
          }}
        >
          <EyebrowPill>Health Coach vs AI Coach</EyebrowPill>

          {/* Figma 58:1452 — 676×216 ~ 3 lines ~72/72 */}
          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              letterSpacing: 0,
              marginTop: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 'clamp(320px, calc(676 / 1920 * 100vw), 676px)',
            }}
          >
            Structured Care Needs Human Guidance
          </h2>

          {/* Figma 58:1451 — 812×136 ~ 4 lines */}
          <p
            className="font-[family-name:var(--font-urbanist)] text-white/70"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
              maxWidth: 'clamp(320px, calc(812 / 1920 * 100vw), 812px)',
            }}
          >
            AI can support planning and reminders, but structured care goes
            beyond that. It requires interpretation, adaptation, and consistent
            human guidance. Sustained progress depends on how guidance is
            interpreted and applied in real life.
          </p>

          {/* 5-row bullet list with horizontal dividers */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
            }}
            className="flex flex-col"
            style={{
              marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
              maxWidth: 'clamp(320px, calc(733 / 1920 * 100vw), 733px)',
            }}
          >
            {POINTS.map((point, i) => (
              <motion.li
                key={point.title}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex flex-col"
                style={{
                  // Figma row heights: 76-104px each, separated by Vectors 250-253
                  paddingTop:
                    i === 0
                      ? 0
                      : 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                  paddingBottom:
                    'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                  borderTop:
                    i === 0
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)] text-[#FEF272]"
                  style={{
                    fontWeight: 500,
                    // Figma title: 40px tall block → ~28-32 px
                    fontSize: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-urbanist)] text-white/70"
                  style={{
                    fontWeight: 400,
                    // Figma body: 28-56px h → ~18-20px
                    fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                    lineHeight: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                    marginTop: 'clamp(4px, calc(8 / 1920 * 100vw), 8px)',
                  }}
                >
                  {point.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
