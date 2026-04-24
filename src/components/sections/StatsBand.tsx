'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: '92%', label: 'Improved or eliminated symptoms in the first year' },
  { value: '87%', label: 'Improved mental wellbeing' },
  { value: '66k', label: 'Members served nationwide' },
]

export default function StatsBand() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease }}
          className="rounded-[36px] bg-[#D9D9D9] px-6 md:px-14 lg:px-20 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <h2 className="font-[family-name:var(--font-bricolage)] font-semibold text-[36px] md:text-[52px] leading-[1.04] tracking-[-0.012em] text-black max-w-[520px]">
            Get more out of medicine than you ever thought possible
          </h2>

          <div className="space-y-6 md:space-y-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease }}
                className="flex items-center gap-6 md:gap-8"
              >
                <span className="font-[family-name:var(--font-bricolage)] font-light text-[56px] md:text-[84px] leading-none text-black w-[120px] md:w-[170px] shrink-0">
                  {s.value}
                </span>
                <span className="text-[#222] text-[14.5px] md:text-[16px] font-[family-name:var(--font-bricolage)] font-light max-w-[320px]">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
