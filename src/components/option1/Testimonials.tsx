'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

export type TestimonialItem = {
  quote: string
  name: string
  pathway: string
  avatar: string | null
}

// Figma 1:6293 (default/inactive) = backdrop-blur-10.25px, 2px solid white
// border, gradient (white 0.20→0) + white 0.30, rounded-34. Behind each card
// sits Figma 1:6296 (Ellipse 55) — a soft sage-green radial that the
// backdrop-blur diffuses, giving the card its green undertone.
// Figma 1:6292 (active/center) = solid white surface, dark text, sage byline.

const EASE = [0.22, 1, 0.36, 1] as const
const COPIES = 12
const ADVANCE_MS = 5000

export default function Testimonials({ initialTestimonials }: { initialTestimonials?: TestimonialItem[] }) {
  // Parent guarantees at least 1 entry; section is rendered conditionally upstream.
  const testimonials = initialTestimonials ?? []
  const N = testimonials.length
  const TOTAL = COPIES * N
  // `cycle` is a monotonically increasing index into the duplicated card
  // array. On desktop the active card is the CENTER one (cycle + 1) — 3
  // cards visible. On mobile only one card fits, so the active card is the
  // LEFTMOST card (cycle + 0) — the user sees it fully + a peek of next.
  const [cycle, setCycle] = useState(0)
  const [cardStep, setCardStep] = useState(0)
  const [skipAnim, setSkipAnim] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)

  // Active offset: 0 on mobile (leftmost), 1 on desktop (middle of 3 visible).
  const activeOffset = isMobile ? 0 : 1
  // The "active" testimonial = whichever card sits in the highlight slot.
  const activeOrigIdx = ((cycle + activeOffset) % N + N) % N

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCycle((c) => c + 1), ADVANCE_MS)
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  // When we approach the end of the duplicated track, snap back to an
  // equivalent earlier cycle (same testimonial centered) with the animation
  // disabled for one frame so the jump is invisible.
  useEffect(() => {
    if (cycle >= TOTAL - N) {
      setSkipAnim(true)
      const equivalent = cycle % N
      // Defer the cycle reset so the no-transition style applies first.
      requestAnimationFrame(() => {
        setCycle(equivalent)
        requestAnimationFrame(() => setSkipAnim(false))
      })
    }
  }, [cycle])

  // Measure one card's width + the track's gap so the translateX moves the
  // row by exactly one card per cycle. Recomputes on viewport resize.
  // Also tracks the mobile breakpoint so we know whether the active card
  // sits in the leftmost slot (mobile) or the middle slot (desktop).
  useEffect(() => {
    const updateStep = () => {
      const card = firstCardRef.current
      const track = trackRef.current
      if (!card || !track) return
      const gap = parseFloat(getComputedStyle(track).gap) || 0
      setCardStep(card.offsetWidth + gap)
      setIsMobile(window.matchMedia('(max-width: 639px)').matches)
    }
    updateStep()
    window.addEventListener('resize', updateStep)
    return () => window.removeEventListener('resize', updateStep)
  }, [])

  // Dot click: advance forward to the nearest cycle that puts the
  // requested testimonial in the active slot (leftmost on mobile, middle
  // on desktop). Always moves forward so the slide direction stays
  // consistent.
  const goTo = (origIdx: number) => {
    const targetMod = ((origIdx - activeOffset) % N + N) % N
    const currentMod = ((cycle % N) + N) % N
    const delta = (targetMod - currentMod + N) % N
    setCycle((c) => c + delta)
    startTimer()
  }

  return (
    <section
      id="testimonials"
      className="relative"
      style={{
        paddingTop: 'clamp(80px, calc(160 / 1920 * 100vw), 160px)',
        paddingBottom: 'clamp(48px, calc(96 / 1920 * 100vw), 96px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1801 }}>
        {/* Header row */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              <EyebrowPill>Testimonials</EyebrowPill>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(26px, calc(58 / 1920 * 100vw), 58px)',
                lineHeight: 1,
                letterSpacing: 0,
                marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                maxWidth: 611,
              }}
            >
              Real Clients.
              <br />
              Real Experiences.
            </motion.h2>
          </div>
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

        {/* Carousel viewport — clips the off-screen cards on the sides.
            The negative margins + matching padding give cards room to grow
            vertically (shadow + scale) without being clipped at the edges. */}
        <div
          className="relative overflow-hidden"
          style={{
            marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
            marginLeft: 'calc(-1 * clamp(20px, calc(60 / 1920 * 100vw), 60px))',
            marginRight: 'calc(-1 * clamp(20px, calc(60 / 1920 * 100vw), 60px))',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingTop: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)',
            paddingBottom: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)',
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'pan-y',
          }}
          onPointerDown={(e) => {
            dragStartX.current = e.clientX
            isDragging.current = true
          }}
          onPointerUp={(e) => {
            if (!isDragging.current) return
            isDragging.current = false
            const delta = dragStartX.current - e.clientX
            if (Math.abs(delta) < 40) return
            const currentOrig = ((cycle + activeOffset) % N + N) % N
            if (delta > 0) {
              goTo((currentOrig + 1) % N)
            } else {
              goTo((currentOrig - 1 + N) % N)
            }
          }}
          onPointerLeave={() => { isDragging.current = false }}
          onPointerCancel={() => { isDragging.current = false }}
        >
          <motion.div
            ref={trackRef}
            className="flex"
            style={{
              gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
              willChange: 'transform',
            }}
            animate={{ x: -cycle * cardStep }}
            transition={
              skipAnim
                ? { duration: 0 }
                : { duration: 0.85, ease: EASE }
            }
          >
            {Array.from({ length: TOTAL }).map((_, i) => {
              const t = testimonials[i % N]
              const isActive = i === cycle + activeOffset
              return (
                <TestimonialCard
                  key={i}
                  measureRef={i === 0 ? firstCardRef : undefined}
                  testimonial={t}
                  isActive={isActive}
                />
              )
            })}
          </motion.div>
        </div>

        {/* Pagination dots — three dots, one per original testimonial */}
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
                width:
                  i === activeOrigIdx
                    ? 'clamp(18px, calc(28 / 1920 * 100vw), 28px)'
                    : 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                height: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                background:
                  i === activeOrigIdx ? '#FEF272' : 'rgba(255,255,255,0.30)',
                border: 'none',
                padding: 0,
                minWidth: 10,
              }}
            />
          ))}
        </div>

        <RatingsCard />
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial: t,
  isActive,
  measureRef,
}: {
  testimonial: TestimonialItem
  isActive: boolean
  measureRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <motion.div
      ref={measureRef}
      data-active={isActive ? 'true' : undefined}
      animate={{
        scale: isActive ? 1 : 0.96,
        boxShadow: isActive
          ? '0 0 0 2px rgba(254,242,114,0.65), 0 12px 36px rgba(0,0,0,0.22)'
          : '0 0 0 0px rgba(254,242,114,0), 0 4px 14px rgba(0,0,0,0.10)',
      }}
      transition={{ duration: 0.6, ease: EASE }}
      className="testimonial-card relative overflow-hidden shrink-0"
      style={{
        // Figma 1:6293 inactive surface — translucent white glass.
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 100%)',
        backdropFilter: 'blur(10.25px)',
        WebkitBackdropFilter: 'blur(10.25px)',
        border: '2px solid #ffffff',
        borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
        minHeight: 'clamp(280px, calc(402 / 1920 * 100vw), 402px)',
        transformOrigin: 'center center',
        transition:
          'background-image 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Figma 1:6296 — sage-green Ellipse 55 sitting behind the glass. The
          card's backdrop-blur softens it into a green undertone. */}
      <div
        aria-hidden
        className="testimonial-tint absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '128%',
          height: '128%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(98, 150, 117, 0.85) 0%, rgba(98, 150, 117, 0.55) 30%, rgba(98, 150, 117, 0.20) 60%, rgba(98, 150, 117, 0) 85%)',
          filter: 'blur(28px)',
          opacity: 1,
          transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
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
            transition: 'color 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
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
          {t.avatar ? (
            <div
              className="rounded-full bg-cover shrink-0"
              style={{
                width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                backgroundImage: `url('${t.avatar}')`,
                backgroundPosition: '50% 15%',
              }}
            />
          ) : (
            <div
              className="rounded-full shrink-0 flex items-center justify-center font-[family-name:var(--font-bricolage)]"
              style={{
                width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                background: 'rgba(254,242,114,0.18)',
                border: '1.5px solid rgba(254,242,114,0.35)',
                color: '#FEF272',
                fontSize: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)',
                fontWeight: 600,
              }}
            >
              {t.name.charAt(0)}
            </div>
          )}
          <div>
            <p
              className="testimonial-name font-[family-name:var(--font-bricolage)]"
              style={{
                color: '#FEF272',
                fontWeight: 300,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 1,
                transition: 'color 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
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
                transition: 'color 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
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
      className="relative overflow-hidden bg-white border-2 border-white mx-auto"
      style={{
        marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
        borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
        backdropFilter: 'blur(10.25px)',
        WebkitBackdropFilter: 'blur(10.25px)',
        // Keep the trust badge compact — sits centered, not stretched edge-to-edge.
        maxWidth: 'clamp(320px, calc(720 / 1920 * 100vw), 720px)',
      }}
    >
      <div className="relative grid grid-cols-3 items-center py-4 sm:py-5 gap-2 sm:gap-0">
        <RatingBlock score="4.6" label="Patient Satisfaction on" trustpilot />
        <div className="flex items-center justify-center">
          <ShieldIcon size="clamp(56px, calc(96 / 1920 * 100vw), 96px)" />
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
  // The Trustpilot block becomes a clickable link to the public review page.
  // Non-Trustpilot blocks (program-completion rate, etc.) remain plain text.
  const inner = (
    <>
      <div className="flex items-center gap-[2px] sm:gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size="clamp(10px, calc(14 / 1920 * 100vw), 14px)" />
        ))}
      </div>
      <p
        className="font-[family-name:var(--font-poppins)]"
        style={{
          color: '#629675',
          fontWeight: 600,
          fontSize: 'clamp(22px, calc(38 / 1920 * 100vw), 38px)',
          lineHeight: 1,
          marginTop: 4,
        }}
      >
        {score}
      </p>
      <p
        className="font-[family-name:var(--font-urbanist)]"
        style={{
          color: '#013e37',
          fontWeight: 500,
          fontSize: 'clamp(9px, calc(15 / 1920 * 100vw), 15px)',
          lineHeight: 1.3,
          marginTop: 4,
        }}
      >
        {label}
      </p>
      {trustpilot && (
        <div
          className="flex items-center justify-center gap-1 font-[family-name:var(--font-poppins)]"
          style={{
            color: '#191919',
            fontWeight: 400,
            fontSize: 'clamp(9px, calc(15 / 1920 * 100vw), 15px)',
            marginTop: 2,
          }}
        >
          <TrustpilotStar />
          Trustpilot
        </div>
      )}
    </>
  )

  if (trustpilot) {
    return (
      <a
        href="https://www.trustpilot.com/review/drpalsnewme.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Read our reviews on Trustpilot"
        className="flex flex-col items-center justify-center text-center px-2 sm:px-6 transition-opacity hover:opacity-80"
        style={{ textDecoration: 'none' }}
      >
        {inner}
      </a>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center text-center px-2 sm:px-6">
      {inner}
    </div>
  )
}

function TrustpilotStar() {
  return (
    <svg
      width="14"
      height="14"
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

function ShieldIcon({ size }: { size: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 200 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M100 6L188 36V108C188 162 150 206 100 220C50 206 12 162 12 108V36L100 6Z"
        fill="#013e37"
      />
      <circle cx="100" cy="130" r="52" fill="white" />
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
