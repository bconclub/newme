'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const pathways = [
  {
    id: 'metabolic',
    label: 'Metabolic Reset',
    title: 'Metabolic Reset',
    desc: 'A 12-week clinically supervised plan that rebalances blood sugar, inflammation, and fat-loss biomarkers.',
    image:
      'https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'gut',
    label: 'Gut Regulation',
    title: 'Gut Regulation',
    desc: 'Gut-first protocols built around stool diagnostics, food-trigger mapping, and microbiome rehab.',
    image:
      'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'weight',
    label: 'Weight &amp; Body',
    title: 'Weight & Body Composition',
    desc: 'Sustainable fat loss with structured movement, nutrient-density tracking, and weekly clinician reviews.',
    image:
      'https://images.pexels.com/photos/4098150/pexels-photo-4098150.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]

export default function Pathways() {
  const [active, setActive] = useState(pathways[0].id)
  const current = pathways.find((p) => p.id === active) ?? pathways[0]

  return (
    <section
      id="pathways"
      className="newme-pathways newme-section relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.95fr_1.1fr] gap-8 md:gap-10 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/70 font-[family-name:var(--font-urbanist)]">
            Pathways
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[26px] sm:text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] md:leading-[1.08] tracking-[-0.01em]">
            The pathways to <span className="text-[#FEF272]">Better Health</span>
          </h2>
          <p className="mt-5 text-white/75 text-[15px] md:text-[16px] leading-[1.6] max-w-[520px] font-[family-name:var(--font-poppins)]">
            Choose the clinical track that fits your starting point. Each
            pathway adapts to your weekly diagnostics and goals.
          </p>
          <a
            href="#assessment"
            className="mt-7 inline-flex items-center rounded-full border border-[#FEF272]/35 text-[#FEF272] hover:bg-white/5 px-5 py-2.5 text-[13px] font-semibold font-[family-name:var(--font-urbanist)] transition-colors"
          >
            See all pathways
          </a>
        </div>

        {/* Right — card with tabs + image */}
        <div className="relative rounded-[20px] md:rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md p-4 sm:p-5 md:p-6">
          <div className="flex flex-wrap gap-2">
            {pathways.map((p) => {
              const selected = p.id === active
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  aria-selected={selected}
                  className={`px-4 py-2 rounded-full text-[12.5px] font-medium font-[family-name:var(--font-urbanist)] transition-colors ${
                    selected
                      ? 'bg-[#FEF272] text-[#043C39]'
                      : 'bg-white/5 text-white/75 hover:bg-white/10'
                  }`}
                >
                  {p.label.replace('&amp;', '&')}
                </button>
              )
            })}
          </div>

          <div className="relative mt-5 rounded-[18px] overflow-hidden aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${current.image}')` }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,60,57,0)_40%,rgba(4,60,57,0.75)_100%)]" />
            <div className="absolute left-4 bottom-4 right-4">
              <p className="text-white text-[15px] md:text-[17px] font-semibold font-[family-name:var(--font-bricolage)]">
                {current.title}
              </p>
              <p className="text-white/75 text-[12.5px] md:text-[13px] mt-1 font-[family-name:var(--font-poppins)]">
                {current.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
