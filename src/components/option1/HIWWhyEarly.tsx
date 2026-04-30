'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:2628 + 58:2640 — "Why Starting Early Matters?"
 *
 * Layout: image LEFT + text RIGHT (no header for the section).
 *
 *   Image (Mask group 58:2640) — 741×964 at (60,4604)
 *   Right group (58:2628) — 933×724 at (921,4724):
 *     · Eyebrow pill 58:2635 — "Why Now" (147×48 at 921,4724)
 *     · Heading 58:2639 — "Why Starting Early Matters?" (652×144 at 921,4796)
 *     · Body 1 58:2633 — short paragraph (933×68 at 921,4962)
 *     · Body 2 58:2638 — long paragraph (933×170 at 921,5056)
 *     · Bottom callout (Group 426 — 864×182 at 921,5266):
 *         "Don't ignore the signs. The earlier you begin..."
 */

const IMAGE = '/how%20it%20works/Why%20astarting%20early%20matters.webp'

export default function HIWWhyEarly() {
  return (
    <section
      id="hiw-why-early"
      className="relative"
      style={{
        // Figma: comparison ends y=4484, image starts y=4604 → 120 gap.
        paddingTop: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-stretch gap-[clamp(28px,calc(60/1920*100vw),60px)]"
        style={{ maxWidth: 1800 }}
      >
        {/* Image — Figma: 741×964, radius ~40 */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative shrink-0 overflow-hidden"
          style={{
            width: '100%',
            maxWidth: 'clamp(280px, calc(741 / 1920 * 100vw), 741px)',
            aspectRatio: '741 / 964',
            borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            background:
              'linear-gradient(135deg, #1A4F49 0%, #0E3B37 100%)',
          }}
        >
          <div
            role="img"
            aria-label="Doctor with patient — early intervention"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGE}')` }}
          />
        </motion.div>

        {/* Right column — text + callout */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col flex-1"
          style={{
            // Figma right group starts y=4724, image starts y=4604 → +120 (top
            // alignment within larger image bounds)
            paddingTop: 'clamp(0px, calc(120 / 1920 * 100vw), 120px)',
          }}
        >
          {/* `self-start` keeps the inline-flex pill from being stretched by
              the flex-col parent. Without it the pill spans the full width of
              the text column, breaking the compact 147×48 Figma sizing. */}
          <span className="self-start">
            <EyebrowPill>Why Now</EyebrowPill>
          </span>

          {/* Figma 58:2639 — "Why Starting Early Matters?" 652×144 → ~72/72 */}
          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              letterSpacing: 0,
              marginTop: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 'clamp(320px, calc(652 / 1920 * 100vw), 652px)',
            }}
          >
            Why Starting Early Matters?
          </h2>

          {/* Body 1 — Figma 58:2633 — Urbanist Medium 28/34 pure white */}
          <p
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(15px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              marginTop: 'clamp(20px, calc(22 / 1920 * 100vw), 22px)',
              maxWidth: 'clamp(320px, calc(933 / 1920 * 100vw), 933px)',
            }}
          >
            Most metabolic and gut conditions don&rsquo;t appear suddenly. They
            build gradually, often without clear signals, until they become
            harder to reverse.
          </p>

          {/* Body 2 — Figma 58:2638 — Urbanist Medium 28/34 pure white */}
          <p
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(15px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 'clamp(320px, calc(933 / 1920 * 100vw), 933px)',
            }}
          >
            Most health markers like blood sugar, cholesterol, and inflammation
            tend to worsen progressively when left unaddressed. What begins
            small, worsens fast. At 33, despite being a practicing doctor, Dr.
            Pal experienced a heart attack. Not because the information
            wasn&rsquo;t available, but because structured, sustainable health
            wasn&rsquo;t part of the system.
          </p>

          {/*
            Bottom callout — Figma Group 426: 864×182 at (921,5266), inner text
            (590×102 at 961,5306) → 40px padding all around. Pine card with
            yellow accent.
          */}
          {/*
            Figma Group 426 (58:2629): 864×182 sage-green panel, left-aligned
            yellow body. Matches the same translucent sage recipe as the
            unified-system cards above so the page rhythm stays consistent.
          */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative overflow-hidden"
            style={{
              marginTop: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
              padding:
                'clamp(20px, calc(40 / 1920 * 100vw), 40px) clamp(24px, calc(48 / 1920 * 100vw), 48px)',
              borderRadius: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
              // Figma 58:1304 / 58:2629 recipe: linear top→0 + 30% white base
              // + 2px solid white-92 border + ~10px backdrop-blur. The "glow"
              // sits as a soft top-edge highlight evenly across the box, not
              // pinned to a corner.
              background:
                'radial-gradient(150% 60% at 50% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.30)',
              backdropFilter: 'blur(10.25px)',
              WebkitBackdropFilter: 'blur(10.25px)',
              border: '1.5px solid rgba(255,255,255,0.30)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.05)',
              maxWidth: 'clamp(320px, calc(864 / 1920 * 100vw), 864px)',
            }}
          >
            <p
              className="relative font-[family-name:var(--font-urbanist)] text-[#FEF272]"
              style={{
                // Figma 58:2631 — Urbanist Medium 28/34 #FEF272
                fontWeight: 500,
                fontSize: 'clamp(15px, calc(28 / 1920 * 100vw), 28px)',
                lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
              }}
            >
              Don&rsquo;t ignore the signs.<br />
              The earlier you begin, the more responsive your treatment is
              likely to be.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
