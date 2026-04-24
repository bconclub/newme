'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  'The Metabolic Care Pathways',
  'The Gastrointestinal Pathways',
  'The NewME Continuity Pathways',
]

const cards = [
  {
    title: 'Reset',
    duration: 'Duration: 4 Weeks',
    desc: 'A lifestyle stabilisation for early-stage imbalance or inconsistent habits and patterns.',
    image: 'https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Rebuild',
    duration: 'Duration: 12 Weeks',
    desc: 'A structured metabolic correction for those with stable foundations.',
    image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Sustain',
    duration: 'Duration: 24 Weeks',
    desc: 'A consolidated approach to metabolic and gut stability that reinforces good habits for the long run.',
    image: 'https://images.pexels.com/photos/4098150/pexels-photo-4098150.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export default function Pathways() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="pathways" className="relative px-5 sm:px-6 md:px-10 lg:px-16 py-[clamp(56px,8vw,120px)]">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.95fr_1.1fr] gap-8 md:gap-10 lg:gap-16 items-start">
        {/* Left */}
        <div>
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]">
            Pathways
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[26px] sm:text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] md:leading-[1.08] tracking-[-0.01em]">
            The pathways to <span className="text-[#FEF272]">Better Health</span>
          </h2>
          <p className="mt-5 text-white/75 text-[15px] md:text-[16px] leading-[1.6] max-w-[520px] font-[family-name:var(--font-poppins)]">
            Each of our defined pathways of care are aligned to a specific level of metabolic
            and gastrointestinal complexity. Your assessment determines the appropriate pathway,
            ensuring care is structured, personalized, and clinically grounded.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className={`text-left px-5 py-3 rounded-full text-[13px] md:text-[14px] font-medium font-[family-name:var(--font-urbanist)] transition-all border ${
                  i === activeTab
                    ? 'bg-[#FEF272] text-[#043C39] border-[#FEF272]'
                    : 'bg-transparent text-white/75 border-white/15 hover:border-white/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Right — stacked cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-[20px] md:rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden"
            >
              <div className="grid sm:grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-0">
                <div
                  className="h-[140px] sm:h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-white text-[17px] md:text-[19px] font-semibold font-[family-name:var(--font-bricolage)]">
                      {card.title}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full bg-[#FEF272]/15 text-[#FEF272] text-[11px] font-medium font-[family-name:var(--font-urbanist)]">
                      {card.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-white/70 text-[13px] md:text-[14px] leading-[1.55] font-[family-name:var(--font-poppins)]">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
