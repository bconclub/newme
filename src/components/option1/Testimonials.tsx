'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

// All 3 cards share the same default state: glass with sage green ellipse
// tint behind. On hover the card flips to solid white per Figma.
const testimonials = [
  {
    quote:
      'After years of poor gut health and binge eating, my fasting blood sugar improved and my cravings completely stopped. Physically and mentally, I feel much better now.',
    name: 'Nithya',
    pathway: 'GI Core Pathway',
    avatar: '/testimonials/nithya.jpg',
  },
  {
    quote:
      'In 2 years, my HbA1c dropped from 6.1 to 5.7, LDL from 146 to 86, and my liver size reduced from 16.7 cm to 14.0 cm. I feel healthier and more confident than ever.',
    name: 'Karan',
    pathway: 'Sustain Pathway',
    avatar: '/testimonials/kat.jpg',
  },
  {
    quote:
      "From being worried about diabetes and fatty liver, I've seen my HbA1c come down from 7.2 to 5.7 and my blood sugar stabilize. I'm now navigating my health with much more confidence.",
    name: 'Thamarai',
    pathway: 'Rebuild Pathway',
    avatar: '/testimonials/thamarai.jpg',
  },
]

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // On mobile the carousel is a scroll container — track which card is
  // snapped to the viewport centre and update the active dot.
  const onScroll = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    const cardW = el.scrollWidth / testimonials.length
    const idx = Math.round(el.scrollLeft / cardW)
    setActiveIdx(Math.max(0, Math.min(idx, testimonials.length - 1)))
  }, [])

  // Auto-advance only on desktop (where the 3-col grid doesn't scroll).
  // Cycles the active highlight dot every 5 s.
  const startDesktopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % testimonials.length)
    }, 5000)
  }, [])

  useEffect(() => {
    // Only start auto-advance when wider than mobile breakpoint.
    const mq = window.matchMedia('(min-width: 640px)')
    if (mq.matches) startDesktopTimer()
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) startDesktopTimer()
      else { if (timerRef.current) clearInterval(timerRef.current) }
    }
    mq.addEventListener('change', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startDesktopTimer])

  // Dot click: on mobile scroll to card; on desktop set active + restart timer.
  const goTo = (idx: number) => {
    const el = carouselRef.current
    if (el && el.scrollWidth > el.clientWidth + 4) {
      // Mobile scroll container
      const cardW = el.scrollWidth / testimonials.length
      el.scrollTo({ left: cardW * idx, behavior: 'smooth' })
    } else {
      // Desktop — just flip the highlighted dot and restart timer
      setActiveIdx(idx)
      startDesktopTimer()
    }
  }

  return (
    <section
      id="testimonials"
      className="relative"
      style={{
        paddingTop: 'clamp(80px, calc(160 / 1920 * 100vw), 160px)',
        /* Page-bg offset between the rating card and the footer's darker bg,
           per Figma. Without this the rating card looks fused to the footer. */
        paddingBottom: 'clamp(48px, calc(96 / 1920 * 100vw), 96px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1801 }}>
        {/* Header row — eyebrow + heading left, body text right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              {/* Figma 1:6291 — Bricolage Light 24px white, pill: backdrop-blur-[2px]
                  border border-solid border-white h-[48px] rounded-[40px] w-[179px] */}
              <EyebrowPill>Testimonials</EyebrowPill>
            </motion.div>

            {/* Figma 1:6288 — Bricolage SemiBold 72px white, 2 lines */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                maxWidth: 611,
              }}
            >
              Real Patients.
              <br />
              Real Experiences.
            </motion.h2>
          </div>

          {/* Figma 1:6287 — Urbanist Regular 24px / lh 30px white, 698px wide */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/85 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
              maxWidth: 698,
              marginTop: 'clamp(40px, calc(96 / 1920 * 100vw), 96px)',
            }}
          >
            Structured care produces measurable, sustained outcomes. These are
            not before-and-after stories. They are accounts of bodies returning
            to regulation.
          </motion.p>
        </div>

        {/* Cards row — Figma: 3 cards 587×402 each, gap 20px on desktop.
            Mobile: horizontal scroll-snap carousel so the user can swipe
            between testimonials instead of scrolling through 3 stacked
            cards. */}
        <div
          ref={carouselRef}
          onScroll={onScroll}
          className="flex sm:grid sm:grid-cols-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-5 sm:mx-0 px-5 sm:px-0 testimonial-carousel"
          style={{
            gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
            scrollbarWidth: 'none',
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} activeOnDesktop={i === activeIdx} />
          ))}
        </div>

        {/* Pagination dots — clickable, track real activeIdx */}
        <div
          className="flex items-center justify-center"
          style={{
            gap: 'clamp(4px, calc(6 / 1920 * 100vw), 6px)',
            marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === activeIdx ? 'clamp(18px, calc(28 / 1920 * 100vw), 28px)' : 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                height: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                background: i === activeIdx ? '#FEF272' : 'rgba(255,255,255,0.30)',
                border: 'none',
                padding: 0,
                minWidth: 10,
              }}
            />
          ))}
        </div>

        {/* Ratings card — solid white bg, shield center, orange stars+scores */}
        <RatingsCard />
      </div>
    </section>
  )
}

/**
 * Single testimonial card with default-glass / hover-white state per Figma.
 *
 * Default state (Figma 1:6293):
 *   • backdrop-blur 10.25px
 *   • bg: linear-gradient(white 0.2 → 0) + solid white 0.30
 *   • 2px solid white border (dialed back to 30% opacity to match the
 *     softer rendered look — Figma export says solid white)
 *   • rounded-[34px]
 *   • Sage green Ellipse 55 (Figma 1:6296) tint baked into the middle
 *
 * Hover state (Figma 1:6292):
 *   • Solid white bg, dark text, yellow→green accent for the byline
 */
function TestimonialCard({
  testimonial: t,
  index: i,
  activeOnDesktop,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
  activeOnDesktop?: boolean
}) {
  // CSS-only hover state via the `group` pattern + plain CSS transitions.
  // Avoids conflict between Framer's whileInView (entry) and animate (hover).
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      // On desktop (sm+), when this card is the auto-cycle active one, show a
      // subtle white glow border so the user can track which dot is lit.
      animate={{
        boxShadow: activeOnDesktop
          ? '0 0 0 2px rgba(254,242,114,0.65), 0 8px 32px rgba(0,0,0,0.18)'
          : '0 0 0 0px rgba(254,242,114,0), 0 4px 16px rgba(0,0,0,0.10)',
      }}
      className="testimonial-card group relative overflow-hidden shrink-0 w-[85%] sm:w-auto snap-center sm:snap-align-none cursor-default"
      style={{
        // Default GLASS state per Figma 1:6293. CSS class overrides on hover.
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 100%)',
        backdropFilter: 'blur(10.25px)',
        WebkitBackdropFilter: 'blur(10.25px)',
        border: '2px solid rgba(255,255,255,0.30)',
        borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
        minHeight: 'clamp(280px, calc(402 / 1920 * 100vw), 402px)',
        transition:
          'background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-image 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Sage green Ellipse 55 tint (Figma 1:6296) — fades out on hover */}
      <div
        aria-hidden
        className="testimonial-tint absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse 90% 75% at 50% 50%, rgba(125, 175, 145, 0.55) 0%, rgba(98, 150, 117, 0.30) 35%, rgba(98, 150, 117, 0.10) 65%, rgba(98, 150, 117, 0) 88%)',
          filter: 'blur(40px)',
          opacity: 1,
          transition: 'opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <div
        className="relative h-full flex flex-col"
        style={{
          paddingTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
          paddingBottom: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
          paddingLeft: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
          paddingRight: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
        }}
      >
        <p
          className="testimonial-quote font-[family-name:var(--font-urbanist)]"
          style={{
            color: '#FFFFFF',
            fontWeight: 400,
            fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
            lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
            maxWidth: 491,
            transition: 'color 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {t.quote}
        </p>

        <div
          className="flex items-center mt-auto"
          style={{
            gap: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
            paddingTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
          }}
        >
          <div
            className="rounded-full bg-cover bg-center shrink-0"
            style={{
              width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
              height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
              backgroundImage: `url('${t.avatar}')`,
            }}
          />
          <div>
            <p
              className="testimonial-name font-[family-name:var(--font-bricolage)]"
              style={{
                color: '#FEF272',
                fontWeight: 300,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 1,
                transition: 'color 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {t.name}
            </p>
            <p
              className="testimonial-pathway font-[family-name:var(--font-bricolage)] mt-1"
              style={{
                color: '#FFFFFF',
                fontWeight: 400,
                fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                lineHeight: 1.2,
                transition: 'color 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {t.pathway}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RatingsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      /* Figma 1:3957 — bg-white border-2 border-white backdrop-blur-[10.25px]
         overflow-clip rounded-[34px] h=348 */
      className="relative overflow-hidden bg-white border-2 border-white"
      style={{
        marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
        borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
        backdropFilter: 'blur(10.25px)',
        WebkitBackdropFilter: 'blur(10.25px)',
      }}
    >
      <div className="relative grid grid-cols-3 items-center py-6 sm:py-14 gap-2 sm:gap-0">
        <RatingBlock score="4.6" label="Patient Satisfaction on" trustpilot />
        {/* Figma 1:6354 — shield center */}
        <div className="flex items-center justify-center">
          <ShieldIcon size="clamp(48px, calc(130 / 1920 * 100vw), 130px)" />
        </div>
        <RatingBlock score="4.7" label="Program Completion Rate" />
      </div>
    </motion.div>
  )
}

function RatingBlock({
  score,
  label,
  trustpilot,
}: {
  score: string
  label: string
  trustpilot?: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-2 sm:px-6">
      {/* 5 orange stars */}
      <div className="flex items-center gap-[2px] sm:gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size="clamp(10px, calc(28 / 1920 * 100vw), 28px)" />
        ))}
      </div>
      {/* Score — Figma: Poppins SemiBold 80px #629675 */}
      <p
        className="font-[family-name:var(--font-poppins)]"
        style={{
          color: '#629675',
          fontWeight: 600,
          fontSize: 'clamp(26px, calc(80 / 1920 * 100vw), 80px)',
          lineHeight: 1,
          marginTop: 4,
        }}
      >
        {score}
      </p>
      {/* Label — Figma: Urbanist Medium 24px #013e37 */}
      <p
        className="font-[family-name:var(--font-urbanist)]"
        style={{
          color: '#013e37',
          fontWeight: 500,
          fontSize: 'clamp(9px, calc(20 / 1920 * 100vw), 22px)',
          lineHeight: 1.3,
          marginTop: 4,
        }}
      >
        {label}
      </p>
      {trustpilot && (
        /* Trustpilot on its own line — black ★ svg + "Trustpilot" text */
        <div
          className="flex items-center justify-center gap-1 font-[family-name:var(--font-poppins)]"
          style={{
            color: '#191919',
            fontWeight: 400,
            fontSize: 'clamp(9px, calc(20 / 1920 * 100vw), 22px)',
            marginTop: 2,
          }}
        >
          <TrustpilotStar />
          Trustpilot
        </div>
      )}
    </div>
  )
}

/* Trustpilot logo star — exact Trustpilot green #00B67A */
function TrustpilotStar() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#00B67A"
      aria-hidden
      style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function Star({ size }: { size: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="#FF8547"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* Figma 1:6354 — noun-trusted-1902111 3
   Shield: #013e37 fill, white circle badge with #013e37 checkmark.
   Group inset: 5% top, 14.91% right, 6% bottom, 14% left. */
function ShieldIcon({ size }: { size: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 200 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Shield body */}
      <path
        d="M100 6L188 36V108C188 162 150 206 100 220C50 206 12 162 12 108V36L100 6Z"
        fill="#013e37"
      />
      {/* White circle badge */}
      <circle cx="100" cy="130" r="52" fill="white" />
      {/* Checkmark */}
      <path
        d="M76 130L92 147L126 112"
        stroke="#013e37"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
