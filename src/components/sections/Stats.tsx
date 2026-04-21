'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    icon: '🩺',
    title: 'Integrated clinical diagnostics',
    desc: 'Gut, metabolic, and hormonal panels reviewed by your care team.',
  },
  {
    icon: '📊',
    title: 'Weekly measurable outcomes',
    desc: 'Track HbA1c, weight, triggers, and gut scores every 7 days.',
  },
  {
    icon: '🥗',
    title: 'Personalised nutrition protocol',
    desc: 'Menus tuned to your food triggers, microbiome, and goals.',
  },
  {
    icon: '🧘',
    title: 'Structured lifestyle coaching',
    desc: 'Sleep, stress, and movement plans set by clinicians.',
  },
  {
    icon: '📱',
    title: 'Always-on care team in your pocket',
    desc: 'Message your doctor and coach without the wait.',
  },
]

export default function Stats() {
  return (
    <section
      id="structured-care"
      className="newme-stats newme-section relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center max-w-[760px] mx-auto">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]">
            Structured care
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[28px] sm:text-[32px] md:text-[44px] lg:text-[48px] leading-[1.1] md:leading-[1.08] tracking-[-0.01em]">
            What Structured Care <span className="text-[#FEF272]">Looks Like</span>
          </h2>
        </div>

        <div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`glass-card rounded-[20px] p-5 md:p-6 ${
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-[#FEF272]/15 text-[#FEF272] flex items-center justify-center text-lg">
                {c.icon}
              </div>
              <h3 className="mt-4 text-white text-[16px] md:text-[17px] font-semibold font-[family-name:var(--font-bricolage)] leading-[1.3]">
                {c.title}
              </h3>
              <p className="mt-2 text-white/70 text-[13px] md:text-[13.5px] leading-[1.55] font-[family-name:var(--font-poppins)]">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
