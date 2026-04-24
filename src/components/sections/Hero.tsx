'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-[#173B39] text-white overflow-hidden pt-[120px] md:pt-[140px] pb-16 md:pb-24"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left */}
        <div className="lg:col-span-6 xl:col-span-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-[family-name:var(--font-bricolage)] font-semibold text-white text-[38px] sm:text-[48px] md:text-[58px] lg:text-[64px] leading-[1.04] tracking-[-0.012em]"
          >
            Your body has stopped responding.
            <br />
            That&apos;s not a failure.{' '}
            <span className="text-[#FEF272]">It&apos;s a signal.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="mt-6 md:mt-8 text-white/80 text-[16px] md:text-[18px] leading-[1.55] max-w-[560px] font-[family-name:var(--font-bricolage)] font-light"
          >
            Root cause functional medicine to resolve your underlying symptoms
            and optimize for lasting health. Sign up for our Complete Care
            program, or start with advanced Longevity Labs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-8 md:gap-12"
          >
            <StatBadge value="100%" label="Wellness programs" />
            <StatBadge value="900+" label="Happy customers" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease }}
            className="mt-8 md:mt-10"
          >
            <a
              href="#enroll"
              className="inline-flex items-center gap-2 bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] px-6 py-3.5 rounded-full text-[15px] md:text-[16px] font-[family-name:var(--font-poppins)] transition-colors"
            >
              Start My Assessment
            </a>
          </motion.div>
        </div>

        {/* Right — portrait + swirl */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative w-full max-w-[560px] aspect-square"
          >
            {/* Cream swirl behind */}
            <Image
              src="/swirl-cream.png"
              alt=""
              aria-hidden
              width={900}
              height={900}
              className="absolute inset-0 w-full h-full object-contain opacity-90 pointer-events-none"
            />

            {/* Portrait */}
            <div className="relative z-10 w-[85%] h-[85%] mx-auto mt-[7%] rounded-[28px] overflow-hidden ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
              <Image
                src="/dr-pal-portrait.png"
                alt="Dr. Palaniappan Manickam"
                width={824}
                height={874}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span
        className="font-[family-name:var(--font-bricolage)] font-semibold text-[#FEF272] text-[44px] md:text-[52px] leading-none"
      >
        {value}
      </span>
      <span className="mt-2 text-white/80 text-[14px] md:text-[15px] font-[family-name:var(--font-urbanist)] tracking-[0.01em]">
        {label}
      </span>
    </div>
  )
}
