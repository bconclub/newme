'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function EnrollCTA() {
  return (
    <section id="enroll" className="bg-white pt-6 pb-16 md:pb-24">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease }}
          className="relative rounded-[36px] bg-[#173B39] text-white overflow-hidden px-6 md:px-16 py-16 md:py-24 text-center"
        >
          <h2 className="font-[family-name:var(--font-bricolage)] font-semibold text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.012em] max-w-[760px] mx-auto">
            Enroll with NewME Now
          </h2>
          <p className="mt-6 text-white/80 text-[16px] md:text-[18px] leading-[1.55] max-w-[620px] mx-auto font-[family-name:var(--font-bricolage)] font-light">
            Build healthy habits, stay accountable and learn sustainable
            lifestyle change — guided by doctors and coaches who adapt to you.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <a
              href="#"
              className="inline-flex items-center bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] rounded-full px-7 py-4 text-[15px] md:text-[16px] font-[family-name:var(--font-poppins)] transition-colors"
            >
              Start My Assessment
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
