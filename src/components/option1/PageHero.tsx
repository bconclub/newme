'use client'

import type { ReactNode } from 'react'
import React from 'react'
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
  /** Hero photo. Omit on pages that use only the gradient + overlayImage. */
  imageSrc?: string
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
  /** Gradient wash opacity. Default 0.9; pass 1 for photos where text
   *  competes with a bright background in the left zone. */
  overlayOpacity?: number
  /**
   * Optional anatomy / illustration overlay positioned on the RIGHT side
   * of the hero card (used on pathway pages). Should be a PNG with a
   * transparent background (white removed). The image is clipped by the
   * card's overflow-hidden.
   */
  overlayImage?: string
  /** Alt text for the overlay image. Default ''. */
  overlayImageAlt?: string
  /** Override positioning style for the overlay image. */
  overlayStyle?: React.CSSProperties
  /**
   * When true, renders the four atmospheric ellipse blobs that give the
   * pathway-page hero its deep dark-green + lime atmosphere (Figma 150:157).
   * Ellipse 27: large green-gradient glow (upper-left)
   * Ellipse 28: dark shadow blob (lower-left)
   * Ellipse 29: lime/yellow-green accent (upper area)
   * Ellipse 30: dark shadow blob (right-bottom edge)
   */
  pathwayBlobs?: boolean
  /**
   * Optional slot rendered at the BOTTOM of the hero card — used for
   * the pathway tab bar so the tabs sit inside the hero, as in Figma.
   */
  bottomSlot?: ReactNode
}

export default function PageHero({
  imageSrc = '',
  imageAlt = '',
  imagePosition = 'center',
  eyebrow,
  heading,
  subheading,
  cta,
  headingMaxWidthPx = 880,
  bodyMaxWidthPx = 783,
  gradientMaskEnd = 70,
  overlayOpacity = 0.9,
  overlayImage,
  overlayImageAlt = '',
  overlayStyle,
  pathwayBlobs = false,
  bottomSlot,
}: PageHeroProps) {
  // When there's no photo behind, extend the solid zone a bit further so
  // text stays legible regardless. With a photo the mask already works.
  const solidEnd = imageSrc ? 32 : 42
  const maskGrad = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${solidEnd}%, rgba(0,0,0,0.6) 52%, rgba(0,0,0,0.15) 62%, rgba(0,0,0,0) ${gradientMaskEnd}%)`
  const grainMaskGrad = `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) ${solidEnd}%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.08) 64%, rgba(0,0,0,0) ${gradientMaskEnd + 2}%)`

  return (
    <section
      className="relative pb-3 md:pb-4"
      style={{
        // Match the home Hero's exact padding-top so the header → hero
        // gap is pixel-identical across pages. Was 74 (Figma artboard
        // value) but the home was 80, so the home felt ~6px more
        // breathing room — user noticed. Now both are 80 max.
        paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(12px, 1.04vw, 20px)',
        paddingRight: 'clamp(12px, 1.04vw, 20px)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          // Dark pine-teal base ensures gradient-only heroes (no photo) still
          // have a deep, rich background rather than falling through to the page.
          backgroundColor: '#013E37',
          // 48 unified across every hero card so they all read as siblings.
          borderRadius: 'clamp(28px, 2.5vw, 48px)',
          // 694 ceiling = exact Figma 121:93 hero card spec (1880×694).
          // FIXED height (not min-height) so sibling pages always render
          // the same card dimensions regardless of heading/subheading
          // length — without this, "Continuity Pathways" (short) was
          // shorter than "GastroIntestinal Care Pathways" (long copy) and
          // the three pathway heroes looked inconsistent next to each other.
          // Mobile floor 560 fits the longest heading + body + bottom tab
          // bar without clipping; scales up to the Figma 694 spec.
          height: 'clamp(560px, calc(694 / 1880 * 100vw), 694px)',
        }}
      >
        {/* ── Background image (omit when only gradient + overlay needed) ── */}
        {imageSrc && (
          <div
            aria-label={imageAlt || undefined}
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundPosition: imagePosition,
            }}
          />
        )}

        {/* ── Atmospheric blobs — pathway pages (Figma 150:157) ── */}
        {pathwayBlobs && (
          <>
            {/* Ellipse 27 — large green-gradient glow, upper-left */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: '-5.9%',
                top: '12.1%',
                width: '74%',
                height: '200%',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
                filter: 'blur(clamp(100px, calc(440 / 1920 * 100vw), 440px))',
                opacity: 0.60,
                maskImage: 'radial-gradient(closest-side, black 0%, black 40%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.3) 85%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(closest-side, black 0%, black 40%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.3) 85%, transparent 100%)',
              }}
            />
            {/* Ellipse 28 — dark shadow blob, lower-left */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: '-0.85%',
                top: '53.3%',
                width: '65%',
                height: '176%',
                borderRadius: '50%',
                background: '#000',
                filter: 'blur(clamp(100px, calc(440 / 1920 * 100vw), 440px))',
                opacity: 0.28,
              }}
            />
            {/* Ellipse 30 — dark shadow blob, right-bottom edge */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: '54.7%',
                top: '110.4%',
                width: '40.3%',
                height: '48.7%',
                borderRadius: '50%',
                background: '#000',
                filter: 'blur(clamp(80px, calc(360 / 1920 * 100vw), 360px))',
                opacity: 0.22,
              }}
            />
            {/* Ellipse 29 — lime accent blob, upper area */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: '6%',
                top: '16.3%',
                width: '45.6%',
                height: '41.5%',
                borderRadius: '50%',
                background: '#E2FE72',
                filter: 'blur(clamp(80px, calc(300 / 1920 * 100vw), 300px))',
                opacity: 0.30,
                maskImage: 'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 85%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 85%, transparent 100%)',
              }}
            />
          </>
        )}

        {/* ── LEFT moss→pine wash (Figma Ellipse 27 / 121:93) ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
            opacity: overlayOpacity,
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
            // Restored to Figma 121:93 — heading at y=233 from card top,
            // body at y=401, body bottom at y=580, CTA at y=612. Putting
            // the content block in the lower-half of the 694 card lets
            // the hero photo breathe through the top.
            paddingTop: 'clamp(170px, calc(233 / 1920 * 100vw), 233px)',
            paddingLeft: 'clamp(28px, calc(100 / 1920 * 100vw), 100px)',
            paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
            paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
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
              fontSize: 'clamp(26px, calc(58 / 1920 * 100vw), 58px)',
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

        {/* ── Bottom tab bar slot (pathway pages — sits inside the card) ── */}
        {bottomSlot && (
          <div
            className="absolute left-0 right-0 bottom-0 z-20 pointer-events-none"
            style={{
              paddingLeft: 'clamp(12px, calc(120 / 1920 * 100vw), 120px)',
              paddingBottom: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
            }}
          >
            <div className="pointer-events-auto">
              {bottomSlot}
            </div>
          </div>
        )}

        {/* ── Optional anatomy / illustration overlay (pathway pages) ──
            Class `pathway-hero-overlay` is targeted in option1.scss to
            scale down + lower opacity on mobile so the anatomy doesn't
            fight with the heading, body, and tab carousel. */}
        {overlayImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={overlayImage}
            alt={overlayImageAlt}
            aria-hidden={!overlayImageAlt}
            className="pathway-hero-overlay absolute pointer-events-none select-none"
            style={{
              right: '-2%',
              bottom: '-15%',
              height: '125%',
              width: 'auto',
              objectFit: 'contain',
              ...overlayStyle,
            }}
          />
        )}
      </div>
    </section>
  )
}

