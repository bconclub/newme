'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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

// Auto-advance interval. Long enough to read the visible pathway copy
// before the section rotates. Manual prev/next buttons (below) reset
// this timer, so a user clicking through stays in their own pace.
const TAB_MS = 12500
const ease = [0.22, 1, 0.36, 1] as const

export default function Pathways() {
  const [activeTab, setActiveTab] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabGroups.length)
    }, TAB_MS)
  }, [])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    startTimer()
  }

  // Manual prev / next — wrap around at the ends so the user can keep
  // clicking without hitting a dead-end. Resets the auto-advance timer.
  const goPrev = () => {
    setActiveTab(prev => (prev - 1 + tabGroups.length) % tabGroups.length)
    startTimer()
  }
  const goNext = () => {
    setActiveTab(prev => (prev + 1) % tabGroups.length)
    startTimer()
  }

  // Keep the visible tab in view of the horizontal scroll on small screens.
  useEffect(() => {
    const el = tabsRef.current?.children[activeTab] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
  }, [activeTab])

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
        className="mx-auto grid lg:grid-cols-[minmax(0,580fr)_minmax(0,980fr)] items-start"
        style={{
          maxWidth: 1800,
          gap: 'clamp(24px, calc(100 / 1920 * 100vw), 100px)',
        }}
      >
        {/* ── Left ── */}
        <div className="min-w-0">
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

          {/* Pathway-group selector — only the ACTIVE tab is rendered (per
              user request "show one button at a time"). Prev / next chevrons
              cycle through the 3 groups. The pill animates a key-changed
              transition when the active group changes so the label swap
              feels deliberate rather than abrupt. */}
          <div
            className="flex max-w-full items-center"
            style={{
              marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
              width: 'min(100%, 540px)',
              gap: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
            }}
          >
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Pathway groups"
              className="flex min-w-0 flex-1 items-center"
            >
              <AnimatePresence mode="wait">
                <motion.button
                  key={`tab-${activeTab}`}
                  type="button"
                  role="tab"
                  aria-selected={true}
                  aria-controls={`pathway-panel-${activeTab}`}
                  onClick={() => handleTabClick(activeTab)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease }}
                  className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border font-[family-name:var(--font-bricolage)]"
                  style={{
                    minHeight: 'clamp(44px, calc(58 / 1920 * 100vw), 58px)',
                    paddingLeft: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                    paddingRight: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                    borderColor: 'rgba(255,255,255,0.60)',
                    background: 'rgba(255,255,255,0.13)',
                    color: '#FFFFFF',
                    fontWeight: 500,
                    fontSize: 'clamp(12px, calc(17 / 1920 * 100vw), 17px)',
                  }}
                >
                  {/* Progress indicator moved out of the pill — it now lives as
                      a ring around the right (next) chevron, see below. */}
                  <span className="relative z-10 whitespace-nowrap">
                    {tabGroups[activeTab].tab}
                  </span>
                </motion.button>
              </AnimatePresence>
            </div>
            {/* Prev / Next pair — manual navigation between pathway groups.
                Each click jumps activeTab and resets the auto-advance timer. */}
            <div className="flex shrink-0 items-center" style={{ gap: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)' }}>
              <button
                type="button"
                aria-label="Previous pathway group"
                onClick={goPrev}
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/20 hover:border-white/55"
                style={{
                  width: 'clamp(36px, calc(42 / 1920 * 100vw), 42px)',
                  height: 'clamp(36px, calc(42 / 1920 * 100vw), 42px)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M11.25 3.75 6 9l5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </button>
              {/* Next button + circular timer ring.
                  The ring is an SVG circle whose dashoffset animates from
                  full to zero over TAB_MS, keyed on activeTab so it restarts
                  cleanly when the tab changes (manually or via auto-advance).
                  Geometry: r=20, circumference = 2π·20 ≈ 125.66. The svg is
                  sized 48×48 around a 42px button, so the ring sits ~3px
                  outside the button border. */}
              <div className="relative inline-flex" style={{ width: 48, height: 48 }}>
                <svg
                  className="absolute inset-0 pointer-events-none"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  aria-hidden
                >
                  {/* Faint track behind the progress ring */}
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                  />
                  {/* Animated progress ring — moss-green stroke, dasharray
                      animation, restarts on every activeTab change. Rotated
                      -90° so the fill starts at 12 o'clock and sweeps clockwise. */}
                  <motion.circle
                    key={`ring-${activeTab}`}
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke="#FEF272"
                    strokeWidth="2"
                    strokeLinecap="round"
                    pathLength={1}
                    transform="rotate(-90 24 24)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: TAB_MS / 1000, ease: 'linear' }}
                  />
                </svg>
                <button
                  type="button"
                  aria-label="Next pathway group"
                  onClick={goNext}
                  className="absolute inline-flex items-center justify-center rounded-full bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/20"
                  style={{
                    top: 3,
                    left: 3,
                    width: 42,
                    height: 42,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                    <path d="M6.75 3.75 12 9l-5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  </svg>
                </button>
              </div>
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
            className="flex min-w-0 flex-col"
            id={`pathway-panel-${activeTab}`}
            role="tabpanel"
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
