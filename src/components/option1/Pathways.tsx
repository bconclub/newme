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
    <section
      id="pathways"
      // Figma: 1800 wide at left:60. Section content matches that.
      className="relative py-[clamp(56px,8vw,120px)]"
      style={{
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto grid lg:grid-cols-[640fr_1100fr] items-start"
        style={{
          maxWidth: 1800,
          gap: 'clamp(24px, calc(60 / 1920 * 100vw), 60px)',
        }}>
        {/* Left column — Figma 640 wide */}
        <div>
          {/* Eyebrow pill — Figma: 149×48, Bricolage Light 24px,
              gradient border (135deg #FFFFFF -> 0% at 50%), backdrop blur 4. */}
          <span
            className="relative inline-flex items-center justify-center w-[149px] h-[48px] rounded-full text-white font-[family-name:var(--font-bricolage)]"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              letterSpacing: 0,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                padding: 1,
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0) 50%)',
                WebkitMask:
                  'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                maskComposite: 'exclude',
              }}
            />
            Pathways
          </span>
          {/* Heading — Figma: Bricolage SemiBold 72px lh 72, white. */}
          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              letterSpacing: 0,
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            The pathways<br />To Better Health
          </h2>
          {/* Body — Figma: Urbanist Medium 28px lh 34. */}
          <p
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              letterSpacing: 0,
              marginTop: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
              maxWidth: 559,
            }}
          >
            Each of our defined pathways of care are aligned to a specific level of metabolic
            and gastrointestinal complexity. Your assessment determines the appropriate pathway,
            ensuring care is structured, personalized, and clinically grounded.
          </p>

          {/* Pathway tabs — pill-shaped buttons */}
          <div
            className="flex flex-col"
            style={{
              gap: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
              marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className="text-left rounded-full font-[family-name:var(--font-bricolage)] transition-all border"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                  paddingLeft: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                  paddingRight: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                  paddingTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                  paddingBottom: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                  background: i === activeTab ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderColor: 'rgba(255,255,255,0.30)',
                  color: '#FFFFFF',
                }}
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
