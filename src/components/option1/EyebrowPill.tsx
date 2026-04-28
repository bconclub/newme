'use client'

import type { ReactNode } from 'react'

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
 */
export default function EyebrowPill({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={[
        'relative inline-flex items-center justify-center rounded-full text-white font-[family-name:var(--font-bricolage)]',
        className,
      ].join(' ')}
      style={{
        height: 48,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        fontWeight: 300,
        fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
        lineHeight: 1,
        letterSpacing: 0,
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      {/* Gradient ring — radial gradient anchored at the BOTTOM-RIGHT corner.
          Ellipse radii 100%×100% means the gradient covers the full pill width
          and full pill height from the BR corner inward. Around the perimeter:
            · Top edge (all points): normalized distance ≥1 → SOLID white
            · Left edge (all points): normalized distance ≥1 → SOLID white
            · Right edge top portion: distance ≥0.6 → SOLID
            · Right edge bottom portion: distance <0.6 → fades into transparent
            · Bottom edge left portion: distance ≥0.6 → SOLID
            · Bottom edge right portion: distance <0.6 → fades into transparent
            · Bottom-right corner: distance 0 → fully transparent
          Result: top/left/upper-right/lower-left visible; bottom edge & lower-
          right edge fade out (matches the Figma reference). 1px ring punched
          out via mask-composite. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: 1,
          background:
            'radial-gradient(ellipse 100% 100% at 100% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 60%, #FFFFFF 80%)',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </span>
  )
}
