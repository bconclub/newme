'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Eyebrow pill — repeats throughout the NewME design.
 *
 * Appears in WhatIsNewMe ("What is NewME"), DrPal ("Meet Dr. Pal"),
 * Pathways ("Pathways"), Testimonials ("Testimonials"), etc. All share:
 *
 *  · Height 48, padding 20px horizontal / 16px vertical, radius 40 (fully rounded)
 *  · backdrop-blur 2px (frosted glass on dark bg)
 *  · 1px gradient border — TOP, LEFT, RIGHT are solid white. The BOTTOM-LEFT
 *    fades in, and the BOTTOM-RIGHT corner is fully transparent (no border).
 *  · Text: Bricolage Grotesque Light 24px white
 *
 * The fade-in-the-bottom-right effect is implemented with a radial gradient
 * centered at 100% 100% — solid white outside the ellipse, transparent inside.
 * The gradient is then masked into a 1px ring with mask-composite.
 *
 * Entrance animation (whileInView, fires once per page load):
 *   1. Pill rises from y=14 → 0 with opacity 0 → 1 (550ms)
 *   2. SVG stroke draws around the perimeter (pathLength 0 → 1, 700ms, delay 150ms)
 *   3. SVG stroke crossfades out as the radial-gradient border fades in (~delay 700ms)
 *   4. Text content fades in (350ms, delay 450ms)
 */

const EASE = [0.22, 1, 0.36, 1] as const

const RISE = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.55, ease: EASE },
} as const

const STROKE_DRAW = {
  initial: { pathLength: 0, opacity: 1 },
  whileInView: { pathLength: 1, opacity: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: {
    pathLength: { duration: 0.7, delay: 0.15, ease: EASE },
    opacity: { duration: 0.3, delay: 0.7, ease: 'linear' },
  },
} as const

const BORDER_SETTLE = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.4, delay: 0.75 },
} as const

const TEXT_FADE = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.35, delay: 0.45 },
} as const

export default function EyebrowPill({
  children,
  className = '',
  variant = 'light',
}: {
  children: ReactNode
  className?: string
  /**
   * `light` (default): white text on dark page bg — used everywhere except DrPal.
   * `dark`: dark pine text on the light sage DrPal card. Sage-green border ramp.
   */
  variant?: 'light' | 'dark'
}) {
  const isDark = variant === 'dark'
  // Stroke color used for the entrance draw — matches the variant's settled border.
  const strokeColor = isDark ? '#629675' : 'rgba(255,255,255,0.95)'

  // Settled-border radial-gradient string (matches each variant's existing look).
  const settledBorderBg = isDark
    ? 'radial-gradient(ellipse 115% 95% at 100% 100%, rgba(98,150,117,0) 0%, rgba(98,150,117,0) 25%, rgba(98,150,117,0.10) 38%, rgba(98,150,117,0.28) 50%, rgba(98,150,117,0.50) 62%, rgba(98,150,117,0.72) 74%, rgba(98,150,117,0.90) 86%, #629675 96%)'
    : 'radial-gradient(ellipse 115% 95% at 100% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.45) 62%, rgba(255,255,255,0.7) 74%, rgba(255,255,255,0.9) 86%, #FFFFFF 96%)'

  return (
    <motion.span
      {...RISE}
      className={[
        'relative inline-flex items-center justify-center rounded-full font-[family-name:var(--font-bricolage)]',
        isDark ? '' : 'text-white',
        className,
      ].join(' ')}
      style={{
        height: 48,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        fontWeight: isDark ? 400 : 300,
        fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
        lineHeight: 1,
        letterSpacing: 0,
        color: isDark ? '#173b39' : undefined,
        backdropFilter: 'blur(8px) saturate(110%)',
        WebkitBackdropFilter: 'blur(8px) saturate(110%)',
        background: isDark
          ? 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0) 100%)',
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 18px -10px rgba(23,59,57,0.25)'
          : 'inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 18px -10px rgba(0,0,0,0.45)',
      }}
    >
      {/* Entrance stroke — SVG rect that draws around the perimeter.
          Uses pixel coordinate system (no viewBox) so rx="23.5" maps to
          actual pixels. The rect insets 0.5px on each side so the 1px
          stroke sits flush inside the pill border. */}
      <svg
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <motion.rect
          x="0.5"
          y="0.5"
          rx="23.5"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            // Percent-minus-1px so the rect insets evenly inside the pill.
            width: 'calc(100% - 1px)',
            height: 'calc(100% - 1px)',
          }}
          {...STROKE_DRAW}
        />
      </svg>

      {/* Settled border — fades in after the stroke completes its draw.
          This is the original asymmetric radial-gradient border (top/left/right
          solid, bottom-right fading out). After it settles, the entrance stroke
          has fully crossfaded out so we're back to the designed look. */}
      <motion.span
        aria-hidden
        {...BORDER_SETTLE}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: 1,
          background: settledBorderBg,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
        }}
      />

      {/* Text — fades in slightly delayed so it lands as the border settles. */}
      <motion.span {...TEXT_FADE} className="relative">
        {children}
      </motion.span>
    </motion.span>
  )
}
