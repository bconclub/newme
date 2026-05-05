'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

// Placeholder images — using assets from /public/how it works for now
// since /images/pathways/* don't exist yet. Will swap to real pathway
// images later.
const PLACEHOLDER_IMAGES = [
  '/how%20it%20works/Assesment.png',
  '/how%20it%20works/Prescription.png',
  '/how%20it%20works/Structured%20Care.png',
  '/how%20it%20works/MOnitoring.png',
  '/how%20it%20works/Continuity.png',
]

const tabGroups = [
  {
    tab: 'The Metabolic Care Pathways',
    cards: [
      {
        title: 'Reset',
        duration: 'Duration: 4 Weeks',
        desc: 'A lifestyle stabilisation for early-stage imbalance or inconsistent habits and patterns.',
        image: PLACEHOLDER_IMAGES[0],
      },
      {
        title: 'Rebuild',
        duration: 'Duration: 12 Weeks',
        desc: 'A structured metabolic correction for those with stable foundations.',
        image: PLACEHOLDER_IMAGES[1],
      },
      {
        title: 'Sustain',
        duration: 'Duration: 24 Weeks',
        desc: 'A consolidated approach to metabolic & gut stability that reinforces good habits for the long run.',
        image: PLACEHOLDER_IMAGES[2],
      },
    ],
  },
  {
    tab: 'The Gastrointestinal Pathways',
    cards: [
      {
        title: 'GI Core',
        duration: 'Duration: 4 Weeks',
        desc: 'Prescribed for moderate digestive dysfunction impacting overall metabolic stability.',
        image: PLACEHOLDER_IMAGES[3],
      },
      {
        title: 'GI Advanced',
        duration: 'Duration: 4 Weeks',
        desc: 'A clinically supervised pathway for complex and/or long-standing gastrointestinal conditions.',
        image: PLACEHOLDER_IMAGES[4],
      },
    ],
  },
  {
    tab: 'The NewME Continuity Pathways',
    cards: [
      {
        title: 'NewME 360',
        duration: 'Duration: 12 / 52 Weeks',
        desc: 'Structured continuation for long-term metabolic & gut stability.',
        image: PLACEHOLDER_IMAGES[0],
      },
      {
        title: 'NewME Movement',
        duration: 'Duration: 12 / 52 Weeks',
        desc: 'A carefully crafted fitness regiment designed to focus on physical performance and strength building.',
        image: PLACEHOLDER_IMAGES[1],
      },
    ],
  },
]

// Auto-advance interval. 4s was too quick to read each pathway's body copy
// and CTA — bumped to 8s per client feedback so users can actually scan
// what's on screen before the next tab takes over.
const TAB_MS = 8000
const ease = [0.22, 1, 0.36, 1] as const

export default function Pathways() {
  const [activeTab, setActiveTab] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabGroups.length)
    }, TAB_MS)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTabClick = () => {
    setActiveTab(prev => (prev + 1) % tabGroups.length)
    startTimer()
  }

  const group = tabGroups[activeTab]

  return (
    <section
      id="pathways"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="mx-auto grid lg:grid-cols-[580fr_980fr] items-start"
        style={{
          maxWidth: 1800,
          gap: 'clamp(24px, calc(100 / 1920 * 100vw), 100px)',
        }}
      >
        {/* ── Left ── */}
        <div>
          <EyebrowPill>Pathways</EyebrowPill>

          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            The Pathways<br />To Better Health
          </h2>

          <p
            className="text-white/85 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
              lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
              marginTop: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
              maxWidth: 540,
            }}
          >
            Each of our defined pathways of care are aligned to a specific level
            of metabolic and gastrointestinal complexity. Your assessment determines
            the appropriate pathway, ensuring care is structured, personalized,
            and clinically grounded.
          </p>

          {/* Single auto-fill progress pill — one tab at a time */}
          <div style={{ marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)' }}>
            <div className="relative inline-block">
              {/* Invisible max-width sizer */}
              <span
                aria-hidden
                className="invisible block font-[family-name:var(--font-bricolage)] whitespace-nowrap"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(12px, calc(19 / 1920 * 100vw), 19px)',
                  paddingLeft: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                  paddingRight: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                  height: 'clamp(44px, calc(58 / 1920 * 100vw), 58px)',
                  lineHeight: 'clamp(44px, calc(58 / 1920 * 100vw), 58px)',
                }}
              >
                The NewME Continuity Pathways
              </span>

              <button
                onClick={handleTabClick}
                className="absolute inset-0 rounded-full border border-white/30 flex items-center overflow-hidden"
                style={{
                  paddingLeft: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                  paddingRight: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)',
                  background: 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Thin bottom-edge progress line sweeping left→right */}
                <motion.span
                  key={activeTab}
                  aria-hidden
                  className="absolute bottom-0 left-0 bg-[#629675]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: TAB_MS / 1000, ease: 'linear' }}
                  style={{ height: 3, borderRadius: '0 0 99px 99px' }}
                />
                {/* Tab label crossfade */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease }}
                    className="relative z-10 font-[family-name:var(--font-bricolage)] text-white whitespace-nowrap"
                    style={{ fontWeight: 500, fontSize: 'clamp(12px, calc(19 / 1920 * 100vw), 19px)' }}
                  >
                    {tabGroups[activeTab].tab}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Right — stacked cards for active tab ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            className="flex flex-col"
            style={{ gap: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)' }}
          >
            {group.cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease }}
                className="overflow-hidden"
                style={{
                  borderRadius: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  background:
                    'linear-gradient(180deg,rgba(255,255,255,0.16) 0%,rgba(255,255,255,0) 100%),linear-gradient(90deg,rgba(255,255,255,0.20) 0%,rgba(255,255,255,0.20) 100%)',
                }}
              >
                <div
                  className="grid"
                  style={{ gridTemplateColumns: 'clamp(90px, calc(200 / 1920 * 100vw), 200px) 1fr' }}
                >
                  <div
                    className="bg-cover bg-center bg-[#0a4a45]"
                    style={{
                      backgroundImage: `url('${card.image}')`,
                      margin: 'clamp(3px, calc(5 / 1920 * 100vw), 5px)',
                      borderRadius: 'clamp(12px, calc(18 / 1920 * 100vw), 18px)',
                      minHeight: 'clamp(100px, calc(150 / 1920 * 100vw), 150px)',
                    }}
                  />
                  <div style={{ padding: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)' }}>
                    <div className="flex items-center flex-wrap" style={{ gap: 'clamp(6px, calc(12 / 1920 * 100vw), 12px)' }}>
                      <h3
                        className="text-white font-[family-name:var(--font-bricolage)]"
                        style={{ fontWeight: 600, fontSize: 'clamp(18px, calc(32 / 1920 * 100vw), 32px)', lineHeight: 1.1 }}
                      >
                        {card.title}
                      </h3>
                      <span
                        className="rounded-full font-[family-name:var(--font-bricolage)] inline-flex items-center shrink-0"
                        style={{
                          fontWeight: 400,
                          /* Mobile floor 12px (was 10) so the duration badge
                             clears the legibility floor on phones. */
                          fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                          background: '#e3ffed',
                          color: '#162e20',
                          paddingLeft: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
                          paddingRight: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
                          height: 'clamp(24px, calc(34 / 1920 * 100vw), 34px)',
                        }}
                      >
                        {card.duration}
                      </span>
                    </div>
                    <p
                      className="text-white/85 font-[family-name:var(--font-urbanist)]"
                      style={{
                        fontWeight: 400,
                        fontSize: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                        lineHeight: 'clamp(16px, calc(26 / 1920 * 100vw), 26px)',
                        marginTop: 'clamp(8px, calc(14 / 1920 * 100vw), 14px)',
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
