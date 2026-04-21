'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stats = [
  { value: '6,000+', label: 'Clients with at least one', sub: 'clinical outcome' },
  { value: '20,000', suffix: 'kg', label: 'Total weight lost', sub: 'across clients' },
  { value: '100', suffix: '%', label: 'HbA1c reduction in', sub: 'every tracked client' },
  { value: '5,000', suffix: '+', label: 'Personal food', sub: 'triggers identified' },
]

const slides = [
  {
    title: 'The First Step To Understanding',
    title2: 'Your Body Better.',
    image:
      'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'A Protocol That Adapts',
    title2: 'To Your Weekly Labs.',
    image:
      'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    title: 'Measurable Outcomes',
    title2: 'Reviewed Every Week.',
    image:
      'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
]

// Bottom-left notch container + info card geometry
const CARD_W = 500 // info card width
const CARD_H = 124 // info card height
const CARD_PAD = 14 // equal breathing room around the card on all 4 sides
const NOTCH_W = CARD_W + CARD_PAD * 2 // container = card + symmetric padding
const NOTCH_H = CARD_H + CARD_PAD * 2
const NOTCH_CONCAVE = 48 // single concave curve at the notch's top-right corner
const CARD_RADIUS = 18 // info card corner radius (all 4 corners)
const HERO_RADIUS = 28 // hero card corner radius
const PAGE_BG = '#043C39'
const BORDER = '#0E5551'

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const current = slides[idx]

  return (
    <section
      id="home"
      className="newme-hero relative px-3 md:px-5 pt-[84px] md:pt-[92px] pb-3 md:pb-5"
    >
      <div className="max-w-[1480px] mx-auto">
        {/*
          Hero frame — no traditional border.
          Using inset box-shadow so the notch child element (which has a solid
          page-bg fill) naturally covers the border on the L-shape's cutout.
          Combined with the notch's own top/right/concave borders, this yields
          a clean continuous outline that traces the image silhouette.
        */}
        <div
          className="relative rounded-[20px] md:rounded-[28px] overflow-hidden min-h-[580px] sm:min-h-[640px] md:min-h-[700px]"
          style={{
            boxShadow: 'inset 0 0 0 1px #0E5551',
          }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero.webp')" }}
          />

          {/*
            Brand filter — built per the design spec:
              • Linear gradient #629675 → #013E37
              • Layer blur 900 (effectively a soft color wash)
              • Monotone noise #000000 @ 25%, size 0.5, density 100%
            Rendered as two stacked layers: the color wash + the grain.
          */}

          {/*
            Color wash — gradient between the two brand greens, masked to
            cover ONLY the left half of the hero so the photograph on the
            right stays clean and the filter reads lighter overall.
          */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              background:
                'linear-gradient(180deg, #629675 0%, #013E37 100%)',
              opacity: 0.78,
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0) 82%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0) 82%)',
            }}
          />

          {/*
            Monotone noise grain — black monochrome fractal turbulence, tuned
            to read clearly on the LEFT side of the hero. Masked with the same
            left-biased gradient as the color wash so the right side of the
            photograph remains clean and sharp.
          */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.4,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '180px 180px',
              mixBlendMode: 'multiply',
              maskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0) 82%)',
              WebkitMaskImage:
                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0) 82%)',
            }}
          />

          {/* Gentle bottom darken for stats-row legibility only (does not affect the image body) */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(4,60,57,0)_65%,rgba(4,60,57,0.35)_100%)]" />

          {/* Content — mobile uses small bottom padding; desktop reserves space for the notch cutout */}
          <div
            className="relative z-10 px-5 sm:px-6 md:px-12 lg:px-14 pt-8 sm:pt-10 md:pt-14 pb-6 md:pb-[184px] flex flex-col min-h-[580px] sm:min-h-[640px] md:min-h-[700px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[640px]"
            >
              <h1 className="font-[family-name:var(--font-bricolage)] font-semibold text-white text-[34px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.04] md:leading-[1.02] tracking-[-0.012em]">
                You&rsquo;ve Done Things The Right Way.
                <br className="hidden sm:inline" />{' '}
                So, What&rsquo;s Not Working?
              </h1>

              <p className="mt-4 md:mt-5 text-white/85 text-[14px] md:text-[15.5px] leading-[1.55] max-w-[440px] font-[family-name:var(--font-poppins)]">
                Understand what&rsquo;s actually happening in your body with
                NewME, and find a structured approach that works for you.
              </p>

              <div className="mt-6 md:mt-8 flex items-center gap-3 sm:gap-4">
                <a
                  href="#how-it-works"
                  className="inline-flex items-center h-11 md:h-12 rounded-full bg-[#FEF272] hover:bg-[#FFF8B8] text-[#043C39] px-5 md:px-7 text-[14px] md:text-[15px] font-semibold tracking-[0.005em] font-[family-name:var(--font-urbanist)] transition-colors"
                >
                  Know more
                </a>
                <a
                  href="#assessment"
                  aria-label="Start assessment"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#FF8547] hover:bg-[#FFAA7A] text-[#0B0B0B] flex items-center justify-center transition-colors shrink-0"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 13L13 5M13 5H6.5M13 5V11.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Stats — sits above the notch (on mobile they sit inline) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 md:mt-auto"
            >
              <div className="max-w-[780px] grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 md:gap-6 pt-5 md:pt-7">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`md:pr-5 ${
                      i < stats.length - 1 ? 'md:border-r md:border-white/15' : ''
                    }`}
                  >
                    <p className="font-[family-name:var(--font-bricolage)] text-[#FEF272] leading-none">
                      <span className="text-[28px] sm:text-[32px] md:text-[38px] font-semibold">
                        {s.value}
                      </span>
                      {s.suffix && (
                        <span className="text-[14px] sm:text-[16px] md:text-[18px] font-medium ml-0.5 align-baseline">
                          {s.suffix}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-white/80 text-[11px] md:text-[12.5px] leading-[1.35] font-[family-name:var(--font-poppins)]">
                      {s.label}
                      <br />
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mobile-only info card — sits inline at the end of hero content */}
            <div className="md:hidden mt-8">
              <div
                className="relative w-full flex items-center gap-3 px-3.5 py-3 overflow-hidden"
                style={{
                  borderRadius: CARD_RADIUS,
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 55%, rgba(254,242,114,0.12) 100%)',
                  backdropFilter: 'blur(20px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)',
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 45%)',
                    borderRadius: CARD_RADIUS,
                  }}
                />
                <div className="w-[64px] h-[64px] rounded-[12px] overflow-hidden shrink-0 ring-1 ring-white/15 relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${current.image}')` }}
                    />
                  </AnimatePresence>
                </div>
                <div className="min-w-0 flex-1 relative z-10">
                  <div className="flex items-center gap-3 text-[11.5px] font-[family-name:var(--font-urbanist)] tracking-[0.02em]">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        className={`transition-colors ${
                          i === idx
                            ? 'text-white font-medium'
                            : 'text-white/45 hover:text-white/80'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 text-white text-[13.5px] leading-[1.3] font-semibold font-[family-name:var(--font-bricolage)]"
                    >
                      {current.title} {current.title2}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/*
            Bottom-left notch container — a pine-teal rectangle with the hero's
            bottom-left corner rounded and a single concave curve at the top-right
            where the notch meets the hero body. The info bar sits inside with
            equal padding on all four sides.
          */}
          <svg
            aria-hidden
            width={NOTCH_W}
            height={NOTCH_H}
            viewBox={`0 0 ${NOTCH_W} ${NOTCH_H}`}
            className="hidden md:block absolute left-0 bottom-0 z-10 pointer-events-none"
            style={{ maxWidth: '100%' }}
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
            <path
              d={[
                `M ${NOTCH_W} ${NOTCH_H}`,
                `L ${NOTCH_W} ${NOTCH_CONCAVE}`,
                `A ${NOTCH_CONCAVE} ${NOTCH_CONCAVE} 0 0 0 ${NOTCH_W - NOTCH_CONCAVE} 0`,
                `L 0 0`,
              ].join(' ')}
              fill="none"
              stroke={BORDER}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/*
            Glass info card — a fully-rounded floating pill that sits directly
            on top of the filtered hero image at the bottom-left. No extra
            backdrop container behind it; the card's own glass blur + stroke
            define its silhouette.
          */}
          <div
            className="hidden md:block absolute z-20"
            style={{
              // symmetric padding: CARD_PAD on every side inside the notch
              left: CARD_PAD,
              bottom: CARD_PAD,
              width: `min(${CARD_W}px, calc(100% - ${CARD_PAD * 2}px))`,
              height: CARD_H,
            }}
          >
            <div
              className="relative w-full h-full flex items-center gap-4 md:gap-5 px-4 md:px-5 overflow-hidden"
              style={{
                borderRadius: CARD_RADIUS,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 55%, rgba(254,242,114,0.12) 100%)',
                backdropFilter: 'blur(20px) saturate(140%)',
                WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)',
              }}
            >
              {/* Top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 45%)',
                  borderRadius: CARD_RADIUS,
                }}
              />

              {/* Avatar */}
              <div className="w-[80px] h-[80px] md:w-[88px] md:h-[88px] rounded-[14px] overflow-hidden shrink-0 ring-1 ring-white/15 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${current.image}')` }}
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
                      className={`transition-colors ${
                        i === idx
                          ? 'text-white font-medium'
                          : 'text-white/45 hover:text-white/80'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1.5 text-white text-[15px] md:text-[17px] leading-[1.25] font-semibold font-[family-name:var(--font-bricolage)]"
                  >
                    {current.title}
                    <br />
                    {current.title2}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

{/* Decorative mark removed — a different asset will replace it. */}
        </div>
      </div>
    </section>
  )
}
