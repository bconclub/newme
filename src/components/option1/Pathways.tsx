'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

// Metabolic pathway card images (Reset / Rebuild / Sustain) live under
// /public/home/. Indices 3-4 are placeholders for GI Core/Advanced and
// continuity pathway cards until those assets are ready.
const PLACEHOLDER_IMAGES = [
  '/home/reset.webp',
  '/home/rebuild.webp',
  '/home/sustain.webp',
  '/how%20it%20works/MOnitoring.png',
  '/how%20it%20works/Continuity.png',
]

const tabGroups = [
  {
    tab: 'The Metabolic Care Pathways',
    href: '/pathways/metabolic',
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
    href: '/pathways/gi',
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
    href: '/pathways/continuity',
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
  // SKIP the first run so the initial mount (activeTab=0) does not auto-scroll
  // the homepage down to the Pathways section. Only horizontal scrolling
  // within the tabs row is desired, and only after a real tab change.
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    const tabsEl = tabsRef.current
    const el = tabsEl?.children[activeTab] as HTMLElement | undefined
    if (!tabsEl || !el) return
    // Only do an INTERNAL horizontal scroll (left/right) — never let the
    // browser scroll the page vertically to bring the tab into view.
    const tabsRect = tabsEl.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    if (elRect.left < tabsRect.left || elRect.right > tabsRect.right) {
      tabsEl.scrollTo({
        left: el.offsetLeft - tabsEl.offsetLeft,
        behavior: 'smooth',
      })
    }
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
              fontSize: 'clamp(26px, calc(58 / 1920 * 100vw), 58px)',
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
                <motion.div
                  key={`tab-${activeTab}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease }}
                  className="relative w-full"
                >
                  <Link
                    href={tabGroups[activeTab].href}
                    role="tab"
                    aria-selected={true}
                    aria-controls={`pathway-panel-${activeTab}`}
                    className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/[0.13] hover:bg-[#FEF272]/[0.18] hover:border-[#FEF272]/70 text-white transition-colors duration-200 font-[family-name:var(--font-bricolage)]"
                    style={{
                      minHeight: 'clamp(44px, calc(58 / 1920 * 100vw), 58px)',
                      paddingLeft: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                      paddingRight: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                      fontWeight: 500,
                      fontSize: 'clamp(12px, calc(17 / 1920 * 100vw), 17px)',
                      textDecoration: 'none',
                    }}
                  >
                    <span className="relative z-10 whitespace-nowrap">
                      {tabGroups[activeTab].tab}
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Prev / Next pair — manual navigation between pathway groups.
                Each click jumps activeTab and resets the auto-advance timer. */}
            <div className="flex shrink-0 items-center" style={{ gap: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)' }}>
              <motion.button
                type="button"
                aria-label="Previous pathway group"
                onClick={goPrev}
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-md hover:bg-white/20 hover:border-white/55"
                style={{
                  width: 'clamp(36px, calc(42 / 1920 * 100vw), 42px)',
                  height: 'clamp(36px, calc(42 / 1920 * 100vw), 42px)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M11.25 3.75 6 9l5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </motion.button>
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
                <motion.button
                  type="button"
                  aria-label="Next pathway group"
                  onClick={goNext}
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inline-flex items-center justify-center rounded-full bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-md hover:bg-white/20"
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
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right — stacked cards for active tab ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            className="flex min-w-0 flex-col"
            id={`pathway-panel-${activeTab}`}
            role="tabpanel"
            style={{ gap: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)' }}
          >
            {group.cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
                style={{
                  borderRadius: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  backdropFilter: 'blur(10px) saturate(110%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(110%)',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(0,38,34,0.25) 0%, rgba(0,26,23,0.32) 100%)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.08), 0 22px 44px -18px rgba(0,0,0,0.60), 0 6px 14px -6px rgba(0,0,0,0.40)',
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
                          fontWeight: 500,
                          fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
                          color: '#FEF272',
                          background: 'linear-gradient(180deg, rgba(254,242,114,0.16) 0%, rgba(254,242,114,0.07) 100%)',
                          backdropFilter: 'blur(8px) saturate(110%)',
                          WebkitBackdropFilter: 'blur(8px) saturate(110%)',
                          border: '1px solid rgba(254,242,114,0.38)',
                          boxShadow: 'inset 0 1px 0 rgba(254,242,114,0.18)',
                          paddingLeft: 'clamp(8px, calc(14 / 1920 * 100vw), 14px)',
                          paddingRight: 'clamp(8px, calc(14 / 1920 * 100vw), 14px)',
                          height: 'clamp(22px, calc(30 / 1920 * 100vw), 30px)',
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

