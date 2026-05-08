'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * <PageHero> — single source of truth for every secondary-page hero
 * (Figma 121:93). Every page should compose this component instead of
 * hand-rolling the same gradient + grain + image stack.
 *
 * The recipe (locked-in):
 *   • 1880×694 photo card with 48px corners
 *   • LEFT-anchored moss→pine gradient (118deg) masked to ~70% from left
 *   • LEFT-anchored monotone grain (fractal-noise SVG) masked to ~72%
 *   • Heading + body LEFT-aligned at ~100px from the left edge
 *   • Optional CTA group (gold pill + orange arrow) below the body
 *
 * Why a template: every page used to roll its own copy of this and they
 * drifted (Pathways differed from Virtual Clinic differed from Media…).
 * Now there's one component — change the recipe in one place and every
 * hero on the site updates.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export type PageHeroProps = {
  /** Required hero photo. Use a path under /public. */
  imageSrc: string
  /** Accessible alt; pass '' if purely decorative behind a heavy wash. */
  imageAlt?: string
  /**
   * CSS background-position for the photo. Default 'center'. For photos
   * where the subject is far-right, push to '72% center' so the gradient
   * still covers the left text zone without the subject being clipped.
   */
  imagePosition?: string
  /** Optional small-caps label above the heading. */
  eyebrow?: string
  /** Heading content. Pass JSX (with <br />) to control line breaks. */
  heading: ReactNode
  /** Body paragraph below the heading. */
  subheading?: ReactNode
  /**
   * Optional CTA cluster. Pass any JSX (typically the gold-pill +
   * orange-arrow pair from /how-it-works). Renders below the body.
   */
  cta?: ReactNode
  /**
   * Cap on heading width — only override when the headline is unusually
   * long (e.g. /research-lab "We Rely On Research-Based Evidence.").
   * Default 880px which fits a 2-line 72px Bricolage headline.
   */
  headingMaxWidthPx?: number
  /** Cap on body width. Default 783 per Figma. */
  bodyMaxWidthPx?: number
  /**
   * Override the gradient strength. Default mask reaches 0% opacity at
   * 70%; increase for photos where the subject sits closer to the
   * horizontal center.
   */
  gradientMaskEnd?: number
}

export default function PageHero({
  imageSrc,
  imageAlt = '',
  imagePosition = 'center',
  eyebrow,
  heading,
  subheading,
  cta,
  headingMaxWidthPx = 880,
  bodyMaxWidthPx = 783,
  gradientMaskEnd = 70,
}: PageHeroProps) {
  const maskGrad = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.6) 48%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) ${gradientMaskEnd}%)`
  const grainMaskGrad = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 32%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0) ${gradientMaskEnd + 2}%)`

  return (
    <section
      className="relative pb-3 md:pb-4"
      style={{
        // Header sits at y=39 h=74 → 39px gap below the header. Match the
        // home Hero's padding-top formula so the visible gap is identical
        // across pages.
        paddingTop: 'clamp(66px, calc(74 / 1920 * 100vw), 74px)',
        paddingLeft: 'clamp(12px, 1.04vw, 20px)',
        paddingRight: 'clamp(12px, 1.04vw, 20px)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          // 48 unified across every hero card so they all read as siblings.
          borderRadius: 'clamp(28px, 2.5vw, 48px)',
          // Internal-page hero is intentionally SHORTER than the home Hero
          // (which sits at ~947px) — per client feedback the home page
          // should feel taller; secondary pages should not. Floor stays at
          // 320 (mobile) but ceiling drops 694 → 580 (16% shorter).
          minHeight: 'clamp(320px, calc(580 / 1880 * 100vw), 580px)',
        }}
      >
        {/* ── Background image ── */}
        <div
          aria-label={imageAlt || undefined}
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('${imageSrc}')`,
            backgroundPosition: imagePosition,
          }}
        />

        {/* ── LEFT moss→pine wash (Figma Ellipse 27 / 121:93) ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
            opacity: 0.9,
            maskImage: maskGrad,
            WebkitMaskImage: maskGrad,
          }}
        />

        {/* ── LEFT monotone noise grain ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.22,
            mixBlendMode: 'multiply',
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: '220px 220px',
            maskImage: grainMaskGrad,
            WebkitMaskImage: grainMaskGrad,
          }}
        />

        {/* ── Content (LEFT-anchored, Figma 121:93 spec) ── */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            // paddingTop reduced 233 → 160 to track the 580 card height
            // (was sized for a 694 card). Heading + body now sit in the
            // bottom-third of the panel without crashing into the bottom.
            paddingTop: 'clamp(120px, calc(160 / 1920 * 100vw), 160px)',
            paddingLeft: 'clamp(28px, calc(100 / 1920 * 100vw), 100px)',
            paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
            paddingBottom: 'clamp(36px, calc(64 / 1920 * 100vw), 64px)',
            maxWidth: 'clamp(360px, calc(1186 / 1920 * 100vw), 1186px)',
          }}
        >
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-[family-name:var(--font-urbanist)]"
              style={{
                fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
                color: 'rgba(255,255,255,0.65)',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
              }}
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.005em',
              maxWidth: `clamp(280px, calc(${headingMaxWidthPx} / 1920 * 100vw), ${headingMaxWidthPx}px)`,
            }}
          >
            {heading}
          </motion.h1>

          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
              className="text-white font-[family-name:var(--font-urbanist)]"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'clamp(18px, calc(30 / 1920 * 100vw), 30px)',
                letterSpacing: 0,
                opacity: 0.88,
                maxWidth: `clamp(280px, calc(${bodyMaxWidthPx} / 1920 * 100vw), ${bodyMaxWidthPx}px)`,
                marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              }}
            >
              {subheading}
            </motion.p>
          )}

          {cta && (
            <div style={{ marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}>
              {cta}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
