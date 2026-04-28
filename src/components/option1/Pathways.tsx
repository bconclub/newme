'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

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
      // Figma "Group 253" 1800×829 at y=5028. Section padding-top targets
      // the artboard gap from the Pillars/Community area above.
      className="relative pb-0"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto grid lg:grid-cols-[640fr_980fr] items-start"
        style={{
          // Figma: left col 640, right col 980, gap = 880-(60+640) = 180px.
          maxWidth: 1800,
          gap: 'clamp(24px, calc(180 / 1920 * 100vw), 180px)',
        }}>
        {/* Left column — Figma 640 wide */}
        <div>
          {/* Eyebrow pill — shared component. */}
          <EyebrowPill>Pathways</EyebrowPill>
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
          {/* Body — Figma: Urbanist Medium 28px lh 34, max-width 640. */}
          <p
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              letterSpacing: 0,
              marginTop: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
              maxWidth: 640,
            }}
          >
            Each of our defined pathways of care are aligned to a specific level of metabolic
            and gastrointestinal complexity. Your assessment determines the appropriate pathway,
            ensuring care is structured, personalized, and clinically grounded.
          </p>

          {/* Pathway tabs — Figma: 461×64 pills, padding ~60×17, Bricolage
              Light 24px, white text on transparent / 30% white border, with
              the active state at 8% white fill. ~50px above the first tab. */}
          <div
            className="flex flex-col"
            style={{
              gap: 'clamp(0px, calc(-1 / 1920 * 100vw), 0px)', // tabs touch in Figma (y diff = 63 vs h=64 → ~1px overlap)
              marginTop: 'clamp(28px, calc(50 / 1920 * 100vw), 50px)',
            }}
          >
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className="text-left rounded-full font-[family-name:var(--font-bricolage)] transition-all border"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                  width: 'clamp(280px, calc(461 / 1920 * 100vw), 461px)',
                  height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                  paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
                  paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
                  background: i === activeTab ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderColor: 'rgba(255,255,255,0.30)',
                  color: '#FFFFFF',
                  marginTop: i === 0 ? 0 : '-1px',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Right — Figma: 3 cards stacked, each 980×263 with image 327×255
            inset 4px (top/left). Title and duration pill share the top row,
            description below. Cards stack with ~20px gap. */}
        <div
          className="flex flex-col"
          style={{
            gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden"
              style={{
                borderRadius: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                minHeight: 'clamp(160px, calc(263 / 1920 * 100vw), 263px)',
              }}
            >
              <div className="grid sm:grid-cols-[327fr_653fr] h-full" style={{ gap: 0 }}>
                <div
                  className="h-[180px] sm:h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${card.image}')`,
                    margin: 'clamp(0px, calc(4 / 1920 * 100vw), 4px)',
                    borderRadius: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                  }}
                />
                <div
                  style={{
                    paddingTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                    paddingLeft: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                    paddingRight: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                    paddingBottom: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                  }}
                >
                  <div className="flex items-center flex-wrap" style={{ gap: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)' }}>
                    {/* Figma title text height 48 → ~32px font Bricolage SemiBold */}
                    <h3
                      className="text-white font-[family-name:var(--font-bricolage)]"
                      style={{
                        fontWeight: 600,
                        fontSize: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                        lineHeight: 1.5,
                      }}
                    >
                      {card.title}
                    </h3>
                    {/* Figma duration pill 209×40, Urbanist Medium 14px, gold-on-pine. */}
                    <span
                      className="rounded-full bg-[#FEF272]/15 text-[#FEF272] font-medium font-[family-name:var(--font-urbanist)]"
                      style={{
                        fontSize: 'clamp(12px, calc(14 / 1920 * 100vw), 14px)',
                        paddingLeft: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                        paddingRight: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                        paddingTop: 'clamp(6px, calc(10 / 1920 * 100vw), 10px)',
                        paddingBottom: 'clamp(6px, calc(10 / 1920 * 100vw), 10px)',
                      }}
                    >
                      {card.duration}
                    </span>
                  </div>
                  {/* Figma body: Urbanist 20px lh 28, 557 wide, 2 lines (h=56),
                      ~40px gap from title row to body. */}
                  <p
                    className="text-white/70 font-[family-name:var(--font-urbanist)]"
                    style={{
                      fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                      lineHeight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                      maxWidth: 557,
                      marginTop: 'clamp(16px, calc(40 / 1920 * 100vw), 40px)',
                    }}
                  >
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
