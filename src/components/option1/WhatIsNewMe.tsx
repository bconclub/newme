'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function WhatIsNewMe() {
  return (
    <section
      id="how-it-works"
      className="relative px-5 sm:px-6 md:px-10 lg:px-16 py-[clamp(72px,9vw,140px)]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow pill — asymmetric: rounded top-left/top-right/bottom-left, square bottom-right */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center px-3.5 py-1.5 border border-white/25 text-[12px] md:text-[13px] text-white font-[family-name:var(--font-urbanist)]"
          style={{
            borderTopLeftRadius: 9999,
            borderTopRightRadius: 9999,
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 0,
          }}
        >
          What is NewME
        </motion.span>

        {/* Heading row: H2 on left, icons on right */}
        <div className="mt-6 md:mt-8 flex items-start justify-between gap-6 md:gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] font-semibold text-white text-[34px] sm:text-[44px] md:text-[58px] lg:text-[72px] leading-[1.04] tracking-[-0.015em] max-w-[1100px]"
          >
            A Clinical System Designed For Metabolic &amp; Gut Regulation.
          </motion.h2>

          {/* Icon pair — overlapping circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:flex items-center shrink-0 pt-3"
          >
            <div
              className="w-[88px] h-[88px] md:w-[104px] md:h-[104px] rounded-full bg-[#F08B55] flex items-center justify-center"
              style={{ zIndex: 2 }}
            >
              <Image
                src="/icons/pillar-1.svg"
                alt=""
                width={56}
                height={56}
                className="w-[52px] h-[52px] md:w-[60px] md:h-[60px]"
              />
            </div>
            <div
              className="w-[88px] h-[88px] md:w-[104px] md:h-[104px] rounded-full bg-[#FEF272] flex items-center justify-center -ml-5"
              style={{ zIndex: 1 }}
            >
              <span
                aria-hidden
                className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] block"
                style={{
                  backgroundColor: '#173B39',
                  WebkitMaskImage: 'url(/icons/pillar-5.svg)',
                  maskImage: 'url(/icons/pillar-5.svg)',
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

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 md:mt-10 h-px bg-white/20 origin-left"
        />

        {/* Body copy */}
        <div className="mt-6 md:mt-8 max-w-[820px] space-y-5 md:space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/80 text-[15px] md:text-[17px] leading-[1.6] font-[family-name:var(--font-bricolage)] font-light"
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
            className="text-white/80 text-[15px] md:text-[17px] leading-[1.6] font-[family-name:var(--font-bricolage)] font-light"
          >
            Our system brings your symptoms, history, and responses into one cohesive
            pathway of care, instead of having to rely on isolated, short-term interventions.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

