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

const IMAGE = '/how%20it%20works/why%20starting%20early%20matters.webp'

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
              fontSize: 'clamp(26px, calc(58 / 1920 * 100vw), 58px)',
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

          {/* Callout paragraph — plain body, no box */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(15px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 'clamp(320px, calc(933 / 1920 * 100vw), 933px)',
            }}
          >
            Don&rsquo;t ignore the signs. The earlier you begin, the more
            responsive your treatment is likely to be.
          </motion.p>

          {/* CTA — yellow pill only, no arrow */}
          <motion.a
            href="/assessment"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="self-start inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] font-medium font-[family-name:var(--font-bricolage)] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] transition-[background-color,box-shadow] duration-300 ease-out will-change-transform"
            style={{
              height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
              paddingLeft: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
              paddingRight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
              fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
              marginTop: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            Start My Assessment
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

