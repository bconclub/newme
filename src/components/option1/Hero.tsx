'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stats = [
  { value: '6,000', suffix: '+', label: 'Clients with at least one', sub: 'clinical outcome' },
  { value: '20,000', suffix: 'kg', label: 'Total weight lost', sub: 'across clients' },
  { value: '100', suffix: '%', label: 'HbA1c reduction in', sub: 'every tracked client' },
  { value: '5,000', suffix: '+', label: 'Personal food', sub: 'triggers identified' },
]

const slides = [
  { title: 'The First Step To Understanding', title2: 'Your Body Better.', image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { title: 'A Protocol That Adapts',         title2: 'To Your Weekly Labs.',  image: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { title: 'Measurable Outcomes',            title2: 'Reviewed Every Week.',  image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200' },
]

// Notch + info-card geometry — kept in constants so the SVG cutout and the
// floating card stay in sync.
// Info card is docked flush to the hero's bottom-left inner edge.
// The notch SVG just carves the concave curve; no padding on the docked sides.
const CARD_W = 460
const CARD_H = 108
const CARD_PAD_RIGHT = 6       // breathing room to the concave curve
const CARD_PAD_TOP = 6
const NOTCH_W = CARD_W + CARD_PAD_RIGHT
const NOTCH_H = CARD_H + CARD_PAD_TOP
const NOTCH_CONCAVE = 42       // radius of the inward curve at notch top-right
const CARD_RADIUS = 16
const HERO_RADIUS = 24
const PAGE_BG = '#043C39'
const BORDER_COLOR = 'rgba(255,255,255,0.08)'

export default function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])
  const current = slides[idx]

  return (
    <section id="home" className="relative px-3 md:px-5 pt-[84px] md:pt-[92px] pb-3 md:pb-5">
      <div className="max-w-[1480px] mx-auto">
        <div className="relative rounded-[24px] overflow-hidden min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[760px]">
          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/Hero image.webp')" }} />

          {/* Brand color wash — 629675 → 013E37 gradient (Figma spec), masked
              so the right half keeps the clean doctor photo */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
              opacity: 0.78,
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0) 82%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,0) 82%)',
            }}
          />

          {/* Monotone noise grain — #000 @ 25% (Figma spec), left-biased mask */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.35,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '200px 200px',
              mixBlendMode: 'multiply',
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0) 82%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0) 82%)',
            }}
          />

          {/* Hero overlay image — decorative drops/ambient yellow highlights */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: "url('/Hero Overlay.webp')" }}
          />

          {/* Bottom gradient for stats legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(4,60,57,0) 65%, rgba(4,60,57,0.4) 100%)' }}
          />

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-14 md:pt-20 pb-48 md:pb-56 flex flex-col min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[760px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[580px] lg:max-w-[620px] flex-shrink-0"
            >
              <h1 className="font-[family-name:var(--font-bricolage)] font-semibold text-white text-[32px] sm:text-[40px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-[-0.02em]">
                You&rsquo;ve Done Things The Right Way. So, What&rsquo;s Not Working?
              </h1>
              <p className="mt-5 md:mt-6 text-white/75 text-[14px] md:text-[15.5px] leading-[1.6] max-w-[420px] font-[family-name:var(--font-poppins)]">
                Understand what&rsquo;s actually happening in your body with NewME, and find a structured approach that works for you.
              </p>
              <div className="mt-7 md:mt-8 flex items-center gap-3">
                <a href="#how-it-works" className="inline-flex items-center h-11 md:h-12 rounded-full bg-[#FEF272] hover:bg-[#FFF8B8] text-[#043C39] px-6 md:px-7 text-[14px] md:text-[15px] font-semibold tracking-[0.005em] font-[family-name:var(--font-urbanist)] transition-colors">
                  Know more
                </a>
                <a href="#assessment" aria-label="Start assessment" className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#FF8547] hover:bg-[#FFAA7A] text-white flex items-center justify-center transition-colors shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M5 13L13 5M13 5H6.5M13 5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            <div className="flex-grow min-h-[60px] md:min-h-[80px]" />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-shrink-0 pb-4 md:pb-6"
            >
              <div className="max-w-[720px] grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 md:gap-8">
                {stats.map((s, i) => (
                  <div key={s.label} className={i < stats.length - 1 ? 'md:pr-4' : ''}>
                    <p className="font-[family-name:var(--font-bricolage)] text-[#FEF272] leading-none">
                      <span className="text-[28px] sm:text-[32px] md:text-[38px] font-semibold">{s.value}</span>
                      {s.suffix && <span className="text-[14px] sm:text-[16px] md:text-[18px] font-medium ml-0.5 align-baseline">{s.suffix}</span>}
                    </p>
                    <p className="mt-2 text-white/70 text-[11px] md:text-[12.5px] leading-[1.35] font-[family-name:var(--font-poppins)]">
                      {s.label}<br/>{s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/*
            Bottom-left notch (desktop only) — a pine-teal rectangle that
            matches the page background, with:
              • bottom-left corner rounded to hero radius
              • a concave curve at the top-right where it cuts into the hero
            The info card sits inside with symmetric CARD_PAD on every side.
          */}
          <svg
            aria-hidden
            width={NOTCH_W}
            height={NOTCH_H}
            viewBox={`0 0 ${NOTCH_W} ${NOTCH_H}`}
            className="hidden md:block absolute left-0 bottom-0 z-10 pointer-events-none"
          >
            <path
              d={[
                `M 0 ${NOTCH_H - HERO_RADIUS}`,
                `A ${HERO_RADIUS} ${HERO_RADIUS} 0 0 0 ${HERO_RADIUS} ${NOTCH_H}`,
                `L ${NOTCH_W} ${NOTCH_H}`,
                `L ${NOTCH_W} ${NOTCH_CONCAVE}`,
                `A ${NOTCH_CONCAVE} ${NOTCH_CONCAVE} 0 0 0 ${NOTCH_W - NOTCH_CONCAVE} 0`,
                `L 0 0`,
                `Z`,
              ].join(' ')}
              fill={PAGE_BG}
            />
            {/* Hairline along the concave + top edge for definition */}
            <path
              d={[
                `M ${NOTCH_W} ${NOTCH_H}`,
                `L ${NOTCH_W} ${NOTCH_CONCAVE}`,
                `A ${NOTCH_CONCAVE} ${NOTCH_CONCAVE} 0 0 0 ${NOTCH_W - NOTCH_CONCAVE} 0`,
                `L 0 0`,
              ].join(' ')}
              fill="none"
              stroke={BORDER_COLOR}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Desktop info card — sits inside the notch */}
          <div
            className="hidden md:block absolute z-20"
            style={{
              left: 0,
              bottom: 0,
              width: CARD_W,
              height: CARD_H,
            }}
          >
            <div
              className="relative w-full h-full flex items-center gap-4 px-4"
              style={{
                borderRadius: CARD_RADIUS,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%, rgba(254,242,114,0.08) 100%)',
                backdropFilter: 'blur(18px) saturate(140%)',
                WebkitBackdropFilter: 'blur(18px) saturate(140%)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
              }}
            >
              {/* Thumbnail */}
              <div className="w-[72px] h-[72px] rounded-[12px] overflow-hidden shrink-0 ring-1 ring-white/15 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={idx}
                    src={current.image}
                    alt=""
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>

              {/* Copy + dots */}
              <div className="min-w-0 flex-1 relative z-10">
                <div className="flex items-center gap-3 text-[12px] md:text-[13px] font-[family-name:var(--font-urbanist)] tracking-[0.02em]">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={
                        'transition-colors ' +
                        (i === idx ? 'text-white font-medium' : 'text-white/45 hover:text-white/80')
                      }
                      aria-label={'Slide ' + (i + 1)}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 text-white text-[13.5px] leading-[1.3] font-semibold font-[family-name:var(--font-bricolage)]"
                  >
                    {current.title} {current.title2}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile info card — full-width pill at bottom, no notch */}
          <div className="md:hidden absolute left-3 right-3 bottom-3 z-20">
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{
                borderRadius: 16,
                background: 'rgba(4, 60, 57, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={idx}
                    src={current.image}
                    alt=""
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2.5 text-[11px] font-[family-name:var(--font-urbanist)] tracking-wide">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={
                        'transition-colors ' +
                        (i === idx ? 'text-white font-semibold' : 'text-white/40 hover:text-white/70')
                      }
                      aria-label={'Slide ' + (i + 1)}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-[12.5px] leading-[1.35] font-semibold font-[family-name:var(--font-bricolage)]"
                  >
                    {current.title} {current.title2}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
