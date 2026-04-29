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
  variant = 'light',
}: {
  children: ReactNode
  className?: string
  /**
   * `light` (default): white text on dark page bg — used everywhere except DrPal.
   * `dark`: dark pine text on the light sage DrPal card. Solid `#629675` border,
   * no fade, no glassy backdrop — matches Figma node 1:2674.
   */
  variant?: 'light' | 'dark'
}) {
  if (variant === 'dark') {
    // Same glassy pill + fading bottom-right border as light, but tinted for
    // the light sage card: dark pine text, sage-green gradient border, faint
    // dark inner tint instead of white. Border ramp uses #629675.
    return (
      <span
        className={[
          'relative inline-flex items-center justify-center rounded-full font-[family-name:var(--font-bricolage)]',
          className,
        ].join(' ')}
        style={{
          height: 48,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 16,
          paddingBottom: 16,
          fontWeight: 400,
          fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          lineHeight: 1,
          letterSpacing: 0,
          color: '#173b39',
          backdropFilter: 'blur(8px) saturate(110%)',
          WebkitBackdropFilter: 'blur(8px) saturate(110%)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0) 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 18px -10px rgba(23,59,57,0.25)',
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            padding: 1,
            background:
              'radial-gradient(ellipse 115% 95% at 100% 100%, rgba(98,150,117,0) 0%, rgba(98,150,117,0) 25%, rgba(98,150,117,0.10) 38%, rgba(98,150,117,0.28) 50%, rgba(98,150,117,0.50) 62%, rgba(98,150,117,0.72) 74%, rgba(98,150,117,0.90) 86%, #629675 96%)',
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
        backdropFilter: 'blur(8px) saturate(110%)',
        WebkitBackdropFilter: 'blur(8px) saturate(110%)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0) 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 18px -10px rgba(0,0,0,0.45)',
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          padding: 1,
          background:
            'radial-gradient(ellipse 115% 95% at 100% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.45) 62%, rgba(255,255,255,0.7) 74%, rgba(255,255,255,0.9) 86%, #FFFFFF 96%)',
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
