'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

export default function WhatIsNewMe() {
  return (
    <section
      id="how-it-works"
      // Figma spec: WhatIsNewMe content block is 1493 wide centered on 1920
      // artboard, so each side gutter is 213px. Section content y=1659–2149,
      // with 120px artboard gap above and below — section py reflects that.
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(213 / 1920 * 100vw), 213px)',
        paddingRight: 'clamp(20px, calc(213 / 1920 * 100vw), 213px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1493 }}>
        {/* Eyebrow pill — shared component (top/left/right border solid,
            bottom-right corner fades to transparent). */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          <EyebrowPill>What is NewME</EyebrowPill>
        </motion.div>

        {/* Heading row: H2 on left, icons on right */}
        <div className="mt-6 md:mt-8 flex items-start justify-between gap-6 md:gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            // Figma: Bricolage Grotesque SemiBold 72px, line-height 72 (1:1),
            // letter-spacing 0%, width up to 1387.
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              letterSpacing: 0,
              maxWidth: 1387,
            }}
          >
            A Clinical System Designed For Metabolic &amp; Gut Regulation.
          </motion.h2>

          {/* Icon pair — Figma: two 120×120 circles overlapping by 20px,
              drop shadow X:-5 Y:4 blur:13.4 #000 18%. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex items-center shrink-0 pt-3"
            style={{
              filter: 'drop-shadow(-5px 4px 13.4px rgba(0, 0, 0, 0.18))',
            }}
          >
            {/* Figma: orange (Group 154 / left circle) is BEHIND.
                Yellow (Group 153 / right circle) overlaps on top. */}
            <div
              className="relative rounded-full bg-[#F08B55] flex items-center justify-center"
              style={{
                width: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
                height: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
                zIndex: 1,
              }}
            >
              <Image
                src="/icons/pillar-1.svg"
                alt=""
                width={64}
                height={64}
                className="w-[42px] h-[42px] md:w-[60px] md:h-[60px] lg:w-[68px] lg:h-[68px]"
              />
            </div>
            <div
              className="relative rounded-full bg-[#FEF272] flex items-center justify-center"
              style={{
                width: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
                height: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
                marginLeft: 'clamp(-12px, calc(-20 / 1920 * 100vw), -20px)',
                zIndex: 2,
              }}
            >
              <span
                aria-hidden
                className="w-[42px] h-[42px] md:w-[60px] md:h-[60px] lg:w-[68px] lg:h-[68px] block"
                style={{
                  backgroundColor: '#173B39',
                  WebkitMaskImage: 'url(/icons/pillar-8.svg)',
                  maskImage: 'url(/icons/pillar-8.svg)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Divider — Figma: 40px below heading bottom (heading: y=1731-1875,
            divider y=1915), 1px white at 20% opacity, full content width. */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-px bg-white/20 origin-left"
          style={{ marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)' }}
        />

        {/* Body copy — Figma: Urbanist Medium 28px, line-height 34, with a
            40px gap from the divider and 24px between paragraphs. */}
        <div
          style={{ marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              letterSpacing: 0,
              maxWidth: 1082,
            }}
          >
            NewME is a doctor-led system designed to restore metabolic and gut regulation
            through structured care and guided accountability. It has been built on the clinical
            expertise of Dr. Palaniappan Manickam (Dr. Pal) and a multidisciplinary care team.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              letterSpacing: 0,
              maxWidth: 1069,
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            Our system brings your symptoms, history, and responses into one cohesive
            pathway, instead of having to rely on isolated, short-term interventions.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

