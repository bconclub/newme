'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function Mission() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease }}
          className="relative rounded-[36px] bg-[#D9D9D9] px-6 md:px-16 py-12 md:py-16 overflow-hidden"
        >
          {/* Decorative swirl */}
          <Image
            src="/swirl-cream.png"
            alt=""
            aria-hidden
            width={800}
            height={800}
            className="absolute -bottom-20 -right-20 w-[420px] h-[420px] opacity-40 pointer-events-none"
          />

          <div className="relative max-w-[760px] mx-auto text-center">
            <div className="flex justify-center gap-1 text-[#000]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            <p className="mt-6 md:mt-8 text-black text-[18px] md:text-[24px] leading-[1.5] font-[family-name:var(--font-bricolage)] font-light">
              NewME is on a dedicated mission to promote health and wellbeing.
              We employ a holistic, evidence based approach to reverse metabolic
              disorders by integrating personalised diet, exercise, and
              lifestyle interventions into our meticulously designed programs.
            </p>
          </div>

          <div className="relative mt-10 md:mt-14 pt-6 border-t border-black/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-bricolage)] font-medium text-[16px] text-black">
                Samson
              </p>
              <p className="mt-1 text-[11px] tracking-[0.14em] uppercase text-[#444] font-[family-name:var(--font-urbanist)]">
                Parsley Health Member
              </p>
            </div>
            <a href="#enroll" className="btn-pine">
              Book an Appointment
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  )
}
