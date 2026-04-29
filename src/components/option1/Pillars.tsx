'use client'

import Image from 'next/image'
import { useState, useCallback, useRef, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  animate,
  type MotionValue,
} from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────
// 8-slot carousel that matches the Figma layout exactly. Each slot is
// expressed as an (x, y) offset from the orbit center on the 1920 artboard
// (origin at artboard 169, 4279 — Group 184 active center is +425 right).
// 5 visible slots (2..6), 3 hidden behind the wordmark area (0, 1, 7).
// ─────────────────────────────────────────────────────────────────────

type Pillar = { name: string; desc: string; icon: string }

const PILLARS: Pillar[] = [
  {
    name: 'Circadian Rhythm',
    desc: "Regulates your body's internal clock, affecting energy, metabolism, and recovery.",
    icon: '/icons/pillar-1.svg',
  },
  {
    name: 'Sleep',
    desc: 'Regulates hormones, recovery, and insulin sensitivity overnight.',
    icon: '/icons/pillar-2.svg',
  },
  {
    name: 'Stress',
    desc: 'Impacts physical and mental well-being, as well as cardiovascular health.',
    icon: '/icons/pillar-3.svg',
  },
  {
    name: 'Digestion',
    desc: 'Determines how effectively your body absorbs and responds to nutrition.',
    icon: '/icons/pillar-4.svg',
  },
  {
    name: 'Nutrition',
    desc: 'Fuels metabolic stability and gut repair through personalised food protocols.',
    icon: '/icons/pillar-5.svg',
  },
  {
    name: 'Fitness',
    desc: 'Builds strength, improves metabolic efficiency, and supports long-term health.',
    icon: '/icons/pillar-6.svg',
  },
  {
    name: 'Physical Therapy',
    desc: "Ensures safe movement, injury prevention, and aligns to your body's capacity.",
    icon: '/icons/pillar-7.svg',
  },
  {
    name: 'Community',
    desc: 'Shared accountability and peer support that sustains behaviour change.',
    icon: '/icons/pillar-8.svg',
  },
]

// Slot offsets (artboard px) from orbit center (169, 4279). Mapped from
// the 8 Figma group centers via Plugin API:
//   0 / 7 / 1 — hidden behind hub area
//   2 / 6      — visible top / bottom
//   3 / 5      — visible upper-right / lower-right
//   4          — ACTIVE (right edge)
const SLOTS: { x: number; y: number }[] = [
  { x: -382, y: 19 },   // 0 — Group 185 (hidden)
  { x: -251, y: -289 }, // 1 — Group 189 (hidden)
  { x: -26, y: -462 },  // 2 — Group 182 (top, visible)
  { x: 272, y: -344 },  // 3 — Group 186 (upper-right, visible)
  { x: 425, y: 5 },     // 4 — Group 184 ACTIVE (right edge)
  { x: 272, y: 339 },   // 5 — Group 187 (lower-right, visible)
  { x: -26, y: 429 },   // 6 — Group 183 (bottom, visible)
  { x: -281, y: 302 },  // 7 — Group 188 (hidden)
]

const ACTIVE_SLOT = 4
const slotForPillar = (i: number, activeIdx: number) =>
  ((i - activeIdx) + ACTIVE_SLOT + 8) % 8
const isVisible = (slot: number) => slot >= 2 && slot <= 6

export default function Pillars() {
  const [activeIdx, setActiveIdx] = useState(0)
  const goNext = useCallback(
    () => setActiveIdx((i) => (i + 1) % PILLARS.length),
    []
  )
  const goPrev = useCallback(
    () => setActiveIdx((i) => (i - 1 + PILLARS.length) % PILLARS.length),
    []
  )
  const active = PILLARS[activeIdx]

  return (
    <section
      id="pillars"
      style={{
        position: 'relative',
        paddingTop: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
      }}
    >
      <div className="text-center mx-auto" style={{ maxWidth: 1194 }}>
        <h2
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          The 8 Pillars of Health
        </h2>
        <p
          className="text-white font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          Your body comprises eight different systems working cohesively to
          ensure that your body runs smoothly. The NewME framework is designed
          keeping these 8 pillars in mind.
        </p>
      </div>

      {/* Mobile — simple card layout, hidden on md+ */}
      <div className="block md:hidden px-6 mt-8">
        <MobilePillars
          active={active}
          activeIdx={activeIdx}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>

      {/* Desktop orbit stage, hidden on mobile */}
      <div className="hidden md:block">
        <Stage
          activeIdx={activeIdx}
          active={active}
          onNext={goNext}
          onPrev={goPrev}
        />
      </div>
    </section>
  )
}

function MobilePillars({
  active,
  activeIdx,
  onPrev,
  onNext,
}: {
  active: Pillar
  activeIdx: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        key={`mob-icon-${activeIdx}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-full flex items-center justify-center"
        style={{ width: 96, height: 96, background: '#FEF272' }}
      >
        <span
          aria-hidden
          className="block"
          style={{
            width: '65%',
            height: '65%',
            backgroundColor: '#173B39',
            WebkitMaskImage: `url(${active.icon})`,
            maskImage: `url(${active.icon})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      </motion.div>

      <motion.h3
        key={`mob-name-${activeIdx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="font-[family-name:var(--font-bricolage)] mt-5"
        style={{ fontWeight: 500, fontSize: 'clamp(26px, 7vw, 36px)', color: '#FEF272', lineHeight: 1.05 }}
      >
        {active.name}
      </motion.h3>

      <motion.p
        key={`mob-desc-${activeIdx}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="text-white font-[family-name:var(--font-urbanist)] mt-4"
        style={{ fontWeight: 500, fontSize: 'clamp(15px, 4vw, 18px)', lineHeight: 1.6, maxWidth: 340 }}
      >
        {active.desc}
      </motion.p>

      <div className="flex items-center justify-between w-full mt-8" style={{ maxWidth: 340 }}>
        <div className="flex gap-3">
          <NavButton dir="prev" onClick={onPrev} />
          <NavButton dir="next" onClick={onNext} />
        </div>
        <div className="flex gap-2 items-center">
          {PILLARS.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 24 : 8,
                height: 8,
                background: i === activeIdx ? '#FEF272' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
function Stage({
  activeIdx,
  active,
  onNext,
  onPrev,
}: {
  activeIdx: number
  active: Pillar
  onNext: () => void
  onPrev: () => void
}) {
  const orbitAnchorRef = useRef<HTMLDivElement>(null)

  // Drag-to-cycle: rotational drag advances/retreats one pillar per ~22.5°.
  const dragStateRef = useRef<{
    pointerId: number
    startAngle: number
    accumulated: number
  } | null>(null)

  const angleFromCenter = (clientX: number, clientY: number) => {
    const el = orbitAnchorRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    const dx = clientX - (rect.left + rect.width / 2)
    const dy = clientY - (rect.top + rect.height / 2)
    return (Math.atan2(dy, dx) * 180) / Math.PI
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement
    if (t.closest('[data-nav-button]')) return
    dragStateRef.current = {
      pointerId: e.pointerId,
      startAngle: angleFromCenter(e.clientX, e.clientY),
      accumulated: 0,
    }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const s = dragStateRef.current
    if (!s || s.pointerId !== e.pointerId) return
    const a = angleFromCenter(e.clientX, e.clientY)
    let delta = a - s.startAngle
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    s.accumulated += delta
    s.startAngle = a
    while (s.accumulated >= 22.5) {
      s.accumulated -= 22.5
      onPrev()
    }
    while (s.accumulated <= -22.5) {
      s.accumulated += 22.5
      onNext()
    }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const s = dragStateRef.current
    if (!s || s.pointerId !== e.pointerId) return
    dragStateRef.current = null
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  return (
    <div
      className="relative w-full"
      style={{
        marginTop: 'clamp(32px, calc(60 / 1920 * 100vw), 60px)',
        height: 'clamp(560px, calc(1000 / 1920 * 100vw), 1000px)',
      }}
    >
      {/* Orbit anchor — exact Figma artboard position (169, vertical center).
          Children inside use ARTBOARD PIXEL coordinates; the whole anchor
          scales uniformly with viewport via CSS variable + transform: scale. */}
      <div
        ref={orbitAnchorRef}
        className="absolute"
        style={{
          left: 'calc(169 / 1920 * 100%)',
          top: '50%',
          width: 0,
          height: 0,
          transform: 'scale(min(calc(100vw / 1920px), 1))',
          transformOrigin: 'center',
        }}
      >
        {/* Drag-catch disc (1100px artboard ≈ orbit diameter + slack). */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute rounded-full cursor-grab active:cursor-grabbing"
          style={{
            width: 1100,
            height: 1100,
            transform: 'translate(-50%, -50%)',
            touchAction: 'none',
            zIndex: 0,
          }}
        />

        {/* Center hub — full Dr. Pal's NewME logo.
            unoptimized is required: the 0×0 orbit anchor causes Next.js image
            optimization to compute 0px width, collapsing the image. */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}
        >
          <Image
            src="/newme-logo.png"
            alt="Dr. Pal's NewME"
            width={240}
            height={74}
            unoptimized
            priority
            className="block"
            style={{ width: 260, height: 'auto' }}
          />
        </div>

        {/* Pillars — each rendered at its current slot's (x, y) artboard offset. */}
        {PILLARS.map((p, i) => (
          <PillarAtSlot
            key={p.name}
            pillar={p}
            slotIdx={slotForPillar(i, activeIdx)}
            active={i === activeIdx}
          />
        ))}
      </div>

      {/* Active text panel — Figma left=869 → 869/1920 from viewport. */}
      <div
        className="absolute flex flex-col"
        style={{
          left: 'calc(869 / 1920 * 100%)',
          right: 'calc(60 / 1920 * 100%)',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <motion.h3
          key={`name-${activeIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(28px, calc(64 / 1920 * 100vw), 64px)',
            lineHeight: 1.05,
            letterSpacing: 0,
            color: '#FEF272',
          }}
        >
          {active.name}
        </motion.h3>
        <motion.p
          key={`desc-${activeIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="text-white font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
            maxWidth: 789,
            marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          {active.desc}
        </motion.p>

        <div className="flex items-center justify-between gap-6 mt-10 flex-wrap">
          <div className="flex gap-3">
            <NavButton dir="prev" onClick={onPrev} />
            <NavButton dir="next" onClick={onNext} />
          </div>
          <div className="flex gap-2 items-center">
            {PILLARS.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? 28 : 8,
                  height: 8,
                  background: i === activeIdx ? '#FEF272' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Pillar at a specific slot — animates x/y between SLOTS as slotIdx changes.
// Coordinates are ARTBOARD pixels (not viewport); the parent orbit anchor
// applies the viewport scaling.
// ─────────────────────────────────────────────────────────────────────
function PillarAtSlot({
  pillar,
  slotIdx,
  active,
}: {
  pillar: Pillar
  slotIdx: number
  active: boolean
}) {
  const x = useMotionValue(SLOTS[slotIdx].x)
  const y = useMotionValue(SLOTS[slotIdx].y)

  useEffect(() => {
    const tx = animate(x, SLOTS[slotIdx].x, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    })
    const ty = animate(y, SLOTS[slotIdx].y, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => {
      tx.stop()
      ty.stop()
    }
  }, [slotIdx, x, y])

  const visible = isVisible(slotIdx)

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.45s ease',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: active ? 3 : 2,
      }}
    >
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        <PillarBadge pillar={pillar} active={active} />
      </div>
    </motion.div>
  )
}

function PillarBadge({ pillar, active }: { pillar: Pillar; active: boolean }) {
  // Sizes are in ARTBOARD pixels — orbit anchor's CSS scale resizes to viewport.
  return (
    <motion.div
      animate={{
        scale: active ? 1.6125 : 1, // 160 → 258
        backgroundColor: active ? '#FEF272' : 'rgba(0,0,0,0)',
        borderColor: active ? '#FEF272' : 'rgba(255,255,255,0.85)',
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-full flex items-center justify-center"
      style={{
        width: 160,
        height: 160,
        border: '1px solid',
      }}
    >
      <span
        aria-hidden
        className="block"
        style={{
          // Figma: inactive 126/160 ≈ 78%, active 180/258 ≈ 70%.
          width: active ? '70%' : '78%',
          height: active ? '70%' : '78%',
          backgroundColor: active ? '#173B39' : '#FEF272',
          WebkitMaskImage: `url(${pillar.icon})`,
          maskImage: `url(${pillar.icon})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────
function NavButton({
  dir,
  onClick,
}: {
  dir: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      data-nav-button
      onClick={onClick}
      aria-label={dir === 'next' ? 'Next pillar' : 'Previous pillar'}
      whileHover={{
        scale: 1.07,
        backgroundColor: '#FEF272',
        color: '#173B39',
      }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-full flex items-center justify-center cursor-pointer"
      style={{
        width: 'clamp(44px, calc(56 / 1920 * 100vw), 56px)',
        height: 'clamp(44px, calc(56 / 1920 * 100vw), 56px)',
        border: '1px solid #FEF272',
        color: '#FEF272',
        background: 'transparent',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === 'prev' ? 'rotate(180deg)' : undefined }}
      >
        <path d="M5 12h14" />
        <path d="m13 5 7 7-7 7" />
      </svg>
    </motion.button>
  )
}
