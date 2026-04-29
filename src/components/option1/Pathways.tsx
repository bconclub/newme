'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    image: '/images/pathways/Reset.webp',
  },
  {
    title: 'Rebuild',
    duration: 'Duration: 12 Weeks',
    desc: 'A structured metabolic correction for those with stable foundations.',
    image: '/images/pathways/Rebuild.webp',
  },
  {
    title: 'Sustain',
    duration: 'Duration: 24 Weeks',
    desc: 'A consolidated approach to metabolic and gut stability that reinforces good habits for the long run.',
    image: '/images/pathways/Sustain.webp',
  },
]

const AUTO_MS = 4500
const N = cards.length

export default function Pathways() {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % N)
    }, AUTO_MS)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = (i: number) => {
    if (i === active) return
    setActive(i)
    startTimer()
  }

  const card = cards[active]

  return (
    <section
      id="pathways"
      className="relative pb-0"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="mx-auto grid lg:grid-cols-[640fr_980fr] items-center"
        style={{
          maxWidth: 1800,
          gap: 'clamp(24px, calc(180 / 1920 * 100vw), 180px)',
        }}
      >
        {/* ── Left ────────────────────────────────────── */}
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
            The pathways<br />To Better Health
          </h2>

          <p
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
              lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
              marginTop: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
              maxWidth: 640,
            }}
          >
            Each of our defined pathways of care are aligned to a specific level of metabolic
            and gastrointestinal complexity. Your assessment determines the appropriate pathway,
            ensuring care is structured, personalized, and clinically grounded.
          </p>

          {/* Tab button + dot nav */}
          <div style={{ marginTop: 'clamp(28px, calc(50 / 1920 * 100vw), 50px)' }}>
            {/* Active tab label button */}
            <div
              className="rounded-full border border-white inline-flex items-center justify-center overflow-hidden"
              style={{
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                paddingLeft: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                paddingRight: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                background: '#629675',
              }}
            >
              {/* Invisible sizer so the button stays at max-width */}
              <span
                aria-hidden
                className="font-[family-name:var(--font-bricolage)] text-white whitespace-nowrap invisible h-0 overflow-hidden block"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
                }}
              >
                The Gastrointestinal Pathways
              </span>

              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[family-name:var(--font-bricolage)] text-white whitespace-nowrap absolute"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
                  }}
                >
                  {tabs[active]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Dot nav */}
            <div className="flex items-center" style={{ gap: 8, marginTop: 14 }}>
              {tabs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${cards[i].title}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    background: i === active ? '#629675' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — single card with crossfade ───────── */}
        <div
          className="relative"
          style={{
            height: 'clamp(200px, calc(263 / 1920 * 100vw), 263px)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                border: '2px solid rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background:
                  'linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0) 100%),linear-gradient(90deg,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0.26) 100%)',
              }}
            >
              {/* Mobile: image + title overlay */}
              <div className="block sm:hidden relative h-full">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 pb-3 pt-8"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                  }}
                >
                  <h3 className="text-white font-[family-name:var(--font-bricolage)] text-xl font-semibold">
                    {card.title}
                  </h3>
                  <span
                    className="rounded-full text-xs font-[family-name:var(--font-bricolage)] inline-flex items-center"
                    style={{ background: '#e3ffed', color: '#162e20', padding: '3px 10px' }}
                  >
                    {card.duration}
                  </span>
                </div>
              </div>

              {/* Desktop: image left, content right */}
              <div
                className="hidden sm:grid h-full"
                style={{ gridTemplateColumns: '327fr 653fr' }}
              >
                <div
                  className="bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${card.image}')`,
                    margin: 'clamp(2px, calc(4 / 1920 * 100vw), 4px)',
                    borderRadius: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                  }}
                />
                <div
                  style={{
                    padding: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                  }}
                >
                  <div
                    className="flex items-center flex-wrap"
                    style={{ gap: 'clamp(8px, calc(14 / 1920 * 100vw), 14px)' }}
                  >
                    <h3
                      className="text-white font-[family-name:var(--font-bricolage)]"
                      style={{
                        fontWeight: 600,
                        fontSize: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                        lineHeight: 1.2,
                      }}
                    >
                      {card.title}
                    </h3>
                    <span
                      className="rounded-full font-[family-name:var(--font-bricolage)] inline-flex items-center"
                      style={{
                        fontWeight: 400,
                        fontSize: 'clamp(11px, calc(20 / 1920 * 100vw), 20px)',
                        background: '#e3ffed',
                        color: '#162e20',
                        paddingLeft: 'clamp(10px, calc(20 / 1920 * 100vw), 20px)',
                        paddingRight: 'clamp(10px, calc(20 / 1920 * 100vw), 20px)',
                        height: 'clamp(26px, calc(40 / 1920 * 100vw), 40px)',
                      }}
                    >
                      {card.duration}
                    </span>
                  </div>
                  <p
                    className="text-white font-[family-name:var(--font-urbanist)]"
                    style={{
                      fontWeight: 500,
                      fontSize: 'clamp(13px, calc(24 / 1920 * 100vw), 24px)',
                      lineHeight: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                      marginTop: 'clamp(12px, calc(32 / 1920 * 100vw), 32px)',
                      opacity: 0.85,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
