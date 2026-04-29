'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────
// Dial-style pillar carousel.
//
// Desktop: 8 icons positioned on a circular orbit to the left. A shared
//   `discAngle` MotionValue drives every icon's (x, y) via useTransform,
//   so all icons slide along the arc simultaneously — no straight-line jumps.
//
// Mobile: the same discAngle drives a half-circle arc on the left side
//   of the screen. The arc center sits at the left edge; icons fan out to
//   the right. Text panel occupies the right half.
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

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const N = PILLARS.length // 8
const STEP_DEG = 360 / N // 45°

// Desktop orbit radius in artboard px (scales with orbit anchor's CSS scale)
const ORBIT_R = 440
// Mobile half-circle — big arc (~80 % of phone width at 375px)
const MOB_R = 155
const MOB_BADGE_ACTIVE = 82
const MOB_BADGE_INACTIVE = 56
const MOB_CENTER_Y = MOB_R + MOB_BADGE_ACTIVE / 2 + 10  // vertical mid of arc
const MOB_ARC_H    = MOB_CENTER_Y * 2                   // total arc section height

/** Angle (degrees) of pillar i when discAngle=0. Pillar 0 starts at 0° (rightmost). */
function pillarBaseDeg(i: number) {
  return i * STEP_DEG
}

export default function Pillars() {
  const [activeIdx, setActiveIdx] = useState(0)
  // Cumulative disc rotation. Increases on prev, decreases on next.
  const discAngle = useMotionValue(0)
  const stepRef = useRef(0)

  const advance = (dir: 1 | -1) => {
    stepRef.current += dir
    const target = -stepRef.current * STEP_DEG
    animate(discAngle, target, { duration: 0.65, ease: EASE })
    setActiveIdx(((stepRef.current % N) + N) % N)
  }

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

      {/* Mobile — hidden on md+ */}
      <div className="block md:hidden">
        <MobilePillars
          active={active}
          activeIdx={activeIdx}
          discAngle={discAngle}
          onPrev={() => advance(-1)}
          onNext={() => advance(1)}
        />
      </div>

      {/* Desktop — hidden on mobile */}
      <div className="hidden md:block">
        <DesktopStage
          activeIdx={activeIdx}
          active={active}
          discAngle={discAngle}
          onPrev={() => advance(-1)}
          onNext={() => advance(1)}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────────────────────────────
function DesktopStage({
  activeIdx,
  active,
  discAngle,
  onPrev,
  onNext,
}: {
  activeIdx: number
  active: Pillar
  discAngle: ReturnType<typeof useMotionValue<number>>
  onPrev: () => void
  onNext: () => void
}) {
  const orbitAnchorRef = useRef<HTMLDivElement>(null)

  // Rotational drag — advance/retreat one step per 22.5° drag
  const dragRef = useRef<{
    pointerId: number
    startAngle: number
    accumulated: number
  } | null>(null)

  const angleFromCenter = (cx: number, cy: number) => {
    const el = orbitAnchorRef.current
    if (!el) return 0
    const r = el.getBoundingClientRect()
    return (Math.atan2(cy - (r.top + r.height / 2), cx - (r.left + r.width / 2)) * 180) / Math.PI
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-nav-button]')) return
    dragRef.current = { pointerId: e.pointerId, startAngle: angleFromCenter(e.clientX, e.clientY), accumulated: 0 }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const s = dragRef.current
    if (!s || s.pointerId !== e.pointerId) return
    let delta = angleFromCenter(e.clientX, e.clientY) - s.startAngle
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360
    s.accumulated += delta
    s.startAngle = angleFromCenter(e.clientX, e.clientY)
    while (s.accumulated >= 22.5) { s.accumulated -= 22.5; onPrev() }
    while (s.accumulated <= -22.5) { s.accumulated += 22.5; onNext() }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return
    dragRef.current = null
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId) } catch { /* noop */ }
  }

  return (
    <div
      className="relative w-full"
      style={{
        marginTop: 'clamp(32px, calc(60 / 1920 * 100vw), 60px)',
        height: 'clamp(560px, calc(1000 / 1920 * 100vw), 1000px)',
      }}
    >
      {/* Orbit anchor — 0×0 point at artboard-pixel (169, 50%). All child
          positions are artboard pixels. CSS scale maps artboard→viewport. */}
      <div
        ref={orbitAnchorRef}
        className="absolute"
        style={{
          left: 'calc(169 / 1920 * 100%)',
          top: '50%',
          width: 0,
          height: 0,
          // Use CSS scale() so it stays purely a transform and doesn't affect layout
          transform: 'scale(min(1, calc(100vw / 1920px)))',
          transformOrigin: 'center',
        }}
      >
        {/* Drag-catch disc */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute rounded-full cursor-grab active:cursor-grabbing"
          style={{ width: 1100, height: 1100, transform: 'translate(-50%,-50%)', touchAction: 'none', zIndex: 0 }}
        />

        {/* Hub logo */}
        <div className="absolute pointer-events-none" style={{ transform: 'translate(-50%,-50%)', zIndex: 5 }}>
          <Image src="/newme-logo.png" alt="Dr. Pal's NewME" width={240} height={74} unoptimized priority
            style={{ width: 260, height: 'auto' }} />
        </div>

        {/* Pillar icons — each follows the arc via discAngle */}
        {PILLARS.map((p, i) => (
          <DesktopPillar
            key={p.name}
            pillar={p}
            pillarIdx={i}
            discAngle={discAngle}
            active={i === activeIdx}
          />
        ))}
      </div>

      {/* Active text panel */}
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
          transition={{ duration: 0.4, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(28px, calc(64 / 1920 * 100vw), 64px)',
            lineHeight: 1.05,
            color: '#FEF272',
          }}
        >
          {active.name}
        </motion.h3>
        <motion.p
          key={`desc-${activeIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
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
          <Dots activeIdx={activeIdx} />
        </div>
      </div>
    </div>
  )
}

function DesktopPillar({
  pillar,
  pillarIdx,
  discAngle,
  active,
}: {
  pillar: Pillar
  pillarIdx: number
  discAngle: ReturnType<typeof useMotionValue<number>>
  active: boolean
}) {
  // Derive screen angle (radians) from discAngle — all icons slide along the arc
  const screenRad = useTransform(discAngle, (d) =>
    ((pillarBaseDeg(pillarIdx) + d) * Math.PI) / 180
  )
  const x = useTransform(screenRad, (a) => ORBIT_R * Math.cos(a))
  const y = useTransform(screenRad, (a) => ORBIT_R * Math.sin(a))

  // Fade icons as they slide behind the logo hub (left side of orbit)
  const opacity = useTransform(screenRad, (a) => {
    const cos = Math.cos(a)
    if (cos < -0.65) return 0
    if (cos < -0.35) return (cos + 0.65) / 0.3
    return 1
  })
  const pointerEvents = useTransform(screenRad, (a): 'auto' | 'none' =>
    Math.cos(a) < -0.35 ? 'none' : 'auto'
  )

  return (
    <motion.div
      className="absolute"
      style={{ x, y, opacity, pointerEvents, zIndex: active ? 3 : 2 }}
    >
      <div style={{ transform: 'translate(-50%,-50%)' }}>
        <PillarBadge pillar={pillar} active={active} />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// MOBILE — large arc fills the section, text sits bottom-right
// ─────────────────────────────────────────────────────────────────────
function MobilePillars({
  active,
  activeIdx,
  discAngle,
  onPrev,
  onNext,
}: {
  active: Pillar
  activeIdx: number
  discAngle: ReturnType<typeof useMotionValue<number>>
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div style={{ marginTop: 24 }}>
      {/* Arc + text share one relative container so the text can overlap */}
      <div className="relative w-full" style={{ height: MOB_ARC_H }}>

        {/* Arc icons — clipped to left half so they don't bleed right */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PILLARS.map((p, i) => (
            <MobileArcPillar
              key={p.name}
              pillar={p}
              pillarIdx={i}
              discAngle={discAngle}
              active={i === activeIdx}
              centerY={MOB_CENTER_Y}
            />
          ))}
        </div>

        {/* Text panel — bottom-right, overlapping the arc */}
        <div
          className="absolute bottom-5 right-5 flex flex-col items-end text-right"
          style={{ maxWidth: '56%' }}
        >
          <motion.h3
            key={`mob-name-${activeIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="font-[family-name:var(--font-bricolage)]"
            style={{ fontWeight: 600, fontSize: 'clamp(22px, 6vw, 34px)', lineHeight: 1.1, color: '#FEF272' }}
          >
            {active.name}
          </motion.h3>
          <motion.p
            key={`mob-desc-${activeIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.06 }}
            className="text-white/85 font-[family-name:var(--font-urbanist)]"
            style={{ fontWeight: 400, fontSize: 'clamp(12px, 3.2vw, 16px)', lineHeight: 1.55, marginTop: 10 }}
          >
            {active.desc}
          </motion.p>
          <div className="flex items-center gap-2 mt-4">
            <NavButton dir="prev" onClick={onPrev} small />
            <NavButton dir="next" onClick={onNext} small />
          </div>
          <div className="mt-2">
            <Dots activeIdx={activeIdx} />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileArcPillar({
  pillar,
  pillarIdx,
  discAngle,
  active,
  centerY,
}: {
  pillar: Pillar
  pillarIdx: number
  discAngle: ReturnType<typeof useMotionValue<number>>
  active: boolean
  centerY: number
}) {
  // Arc center at (0, centerY). Icons fan out to the right.
  const screenRad = useTransform(discAngle, (d) =>
    ((pillarBaseDeg(pillarIdx) + d) * Math.PI) / 180
  )
  const x = useTransform(screenRad, (a) => MOB_R * Math.cos(a))
  const y = useTransform(screenRad, (a) => centerY + MOB_R * Math.sin(a))

  // Fade icons heading left (cos < 0) and at extreme top/bottom
  const opacity = useTransform(screenRad, (a) => {
    const cos = Math.cos(a)
    if (cos < 0) return 0
    const sinAbs = Math.abs(Math.sin(a))
    if (sinAbs > 0.92) return Math.max(0, (1 - sinAbs) / 0.08)
    return cos < 0.25 ? cos / 0.25 : 1
  })

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: 0, top: 0, x, y, opacity }}
    >
      <div style={{ transform: 'translate(-50%,-50%)' }}>
        <MobileBadge pillar={pillar} active={active} />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Shared badge components
// ─────────────────────────────────────────────────────────────────────
function PillarBadge({ pillar, active }: { pillar: Pillar; active: boolean }) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.6125 : 1,
        backgroundColor: active ? '#FEF272' : 'rgba(0,0,0,0)',
        borderColor: active ? '#FEF272' : 'rgba(255,255,255,0.85)',
      }}
      transition={{ duration: 0.5, ease: EASE }}
      className="rounded-full flex items-center justify-center"
      style={{ width: 160, height: 160, border: '1px solid' }}
    >
      <span
        aria-hidden
        className="block"
        style={{
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

function MobileBadge({ pillar, active }: { pillar: Pillar; active: boolean }) {
  const size = active ? MOB_BADGE_ACTIVE : MOB_BADGE_INACTIVE
  return (
    <motion.div
      animate={{
        backgroundColor: active ? '#FEF272' : 'rgba(0,0,0,0)',
        borderColor: active ? '#FEF272' : 'rgba(255,255,255,0.70)',
        width: size,
        height: size,
      }}
      transition={{ duration: 0.45, ease: EASE }}
      className="rounded-full flex items-center justify-center"
      style={{ border: '1.5px solid', willChange: 'width, height' }}
    >
      <span
        aria-hidden
        className="block"
        style={{
          width: '64%',
          height: '64%',
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
function Dots({ activeIdx }: { activeIdx: number }) {
  return (
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
  )
}

function NavButton({
  dir,
  onClick,
  small,
}: {
  dir: 'prev' | 'next'
  onClick: () => void
  small?: boolean
}) {
  const sz = small ? 44 : 'clamp(44px, calc(56 / 1920 * 100vw), 56px)'
  return (
    <motion.button
      type="button"
      data-nav-button
      onClick={onClick}
      aria-label={dir === 'next' ? 'Next pillar' : 'Previous pillar'}
      whileHover={{ scale: 1.07, backgroundColor: '#FEF272', color: '#173B39' }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="rounded-full flex items-center justify-center cursor-pointer shrink-0"
      style={{ width: sz, height: sz, border: '1px solid #FEF272', color: '#FEF272', background: 'transparent' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: dir === 'prev' ? 'rotate(180deg)' : undefined }}>
        <path d="M5 12h14" />
        <path d="m13 5 7 7-7 7" />
      </svg>
    </motion.button>
  )
}
