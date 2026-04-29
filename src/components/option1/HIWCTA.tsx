'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:1478 (Group 423) — "Let's Discover Your Path To Better Health"
 *
 * 1800×818 frame at (60,9464). Layout: text LEFT + image RIGHT.
 *
 *   Image (Mask group 58:1479) — 883×818 at (977,9464), radius ~40
 *   Left text (Group 308 — 828×510 at 60,9618):
 *     · Eyebrow 58:1483 — "Let's Begin" (159×48 at 60,9618)
 *     · Heading 58:1487 — "Let's Discover Your Path To Better Health In 3 Minutes."
 *       (801×216 at 60,9690) — 3 lines ~72/72
 *     · Body 58:1486 — short description (828×102 at 60,9938)
 *     · CTA 58:1488 — "Start Your Assessment" pill (319×64 at 60,10064)
 */

const IMAGE = '/how%20it%20works/Lets%20Discover%20HEalth%20Path.webp'

export default function HIWCTA() {
  return (
    <section
      id="hiw-cta"
      className="relative"
      style={{
        // Figma: human-guidance ends y=9224, divider Vector 255 at y=9344,
        // CTA frame at y=9464 → 240 gap with the 120px section gutter.
        paddingTop: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(80px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/*
          1800×818 frame, no card bg in Figma — image on right, text on left.
          Rounded image at 977..1860 of the 1800px frame width.
        */}
        <div className="flex flex-col lg:flex-row items-stretch gap-[clamp(28px,calc(60/1920*100vw),60px)]">
          {/* Left text — Figma 828×510 starting y=9618 (154 below frame top) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col flex-1 justify-center"
            style={{
              maxWidth: 'clamp(320px, calc(828 / 1920 * 100vw), 828px)',
            }}
          >
            <EyebrowPill>Let&rsquo;s Begin</EyebrowPill>

            {/* Figma 58:1487 — 801×216, 3 lines, ~72/72 */}
            <h2
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                marginTop: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
                maxWidth: 'clamp(320px, calc(801 / 1920 * 100vw), 801px)',
              }}
            >
              Let&rsquo;s Discover Your Path To Better Health In 3 Minutes.
            </h2>

            {/* Figma 58:1486 — 828×102 ~3 lines */}
            <p
              className="font-[family-name:var(--font-urbanist)] text-white/70"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
                lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                maxWidth: 'clamp(320px, calc(828 / 1920 * 100vw), 828px)',
              }}
            >
              Your assessment maps your metabolic and gut patterns, identifies
              your phase of care, and gives you a structured starting point.
              It&rsquo;s designed to provide clarity about what your body needs
              next.
            </p>

            {/* CTA — Figma 58:1488 — solid pill 319×64 (no arrow circle here) */}
            <motion.a
              href="/pathways"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] font-medium font-[family-name:var(--font-bricolage)] transition-[background-color,box-shadow,transform] duration-300 ease-out hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] will-change-transform self-start"
              style={{
                marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                paddingLeft: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                paddingRight: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                fontSize: 'clamp(15px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 1.2,
                minWidth: 'clamp(220px, calc(319 / 1920 * 100vw), 319px)',
              }}
            >
              Start Your Assessment
            </motion.a>
          </motion.div>

          {/* Right image — Figma 883×818, radius ~40 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
              aria-label="Person beginning their NewME assessment"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGE}')` }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
