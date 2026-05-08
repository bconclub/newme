'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

// Figma 1:6322 — comparison columns
const typical = [
  'Generic protocols applied to everyone',
  'Baseline assessment at intake only',
  'Coach-only guidance',
  'Isolated interventions (diet or exercise or sleep)',
  'Single point of contact',
  'Short-terms fixes and quick wins',
]

const newme = [
  'Pathway personalised to your physiology and history',
  'Baseline assessment with scheduled clinical reviews',
  'Doctor-led oversight through every phase',
  'Integrated approach across gut, metabolic, and lifestyle system',
  'Coordinated team of coaches, clinicians, and specialists',
  'Built for long-term stability and sustained outcomes',
]

type ActiveCard = 'typical' | 'newme'

export default function StructuredCare() {
  // Click-to-swap pattern: whichever card the user clicks moves to the
  // front (full size, colorful header) and the other dims + scales down.
  // Default to 'newme' so the recommended option is highlighted on load.
  const [active, setActive] = useState<ActiveCard>('newme')

  return (
    <section
      id="structured-care"
      className="relative"
      style={{
        paddingTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 0,
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/*
         * Figma 1:5104 — section background
         * fills: SOLID rgba(255,255,255,0.30) + GRADIENT_LINEAR white 0.20→0
         * stroke: white 2px
         * effect: BACKGROUND_BLUR radius 10.25
         * cornerRadius: 34
         * Figma 1:5105/1:5106 — green mask group starts 180px below the
         * section shell at x=59 y=5977, w=1800 h=1647.
         */}
        <div
          className="relative overflow-hidden"
          data-node-id="1:5104"
          style={{
            borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            paddingTop: 'clamp(120px, calc(300 / 1920 * 100vw), 300px)',
            paddingBottom: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          }}
        >
          {/*
           * Figma 1:5105 — Mask group: green gradient overlay inside section.
           *   Ellipse 59 (1:5107): 2583×2150 ellipse. Fill GRADIENT_LINEAR
           *     #629675 (bottom) → #013E37 (top). LAYER_BLUR 800.
           *   Mask frame starts at y=5977 while section shell starts y=5797,
           *   so the mask is +180px relative to this card. Ellipse top is
           *   5698 - 5977 = -279px inside that mask.
           */}
          <div
            aria-hidden
            className="absolute pointer-events-none overflow-hidden"
            data-node-id="1:5105"
            style={{
              left: '-1px',
              right: '-1px',
              top: 'clamp(90px, calc(180 / 1920 * 100vw), 180px)',
              height: 'calc(100% - clamp(90px, calc(180 / 1920 * 100vw), 180px))',
              borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            }}
          >
            <div
              data-node-id="1:5107"
              style={{
                position: 'absolute',
                left: 'calc(-396 / 1800 * 100%)',
                top: 'calc(-279 / 1647 * 100%)',
                width: 'calc(2583 / 1800 * 100%)',
                height: 'calc(2150 / 1647 * 100%)',
                borderRadius: '50%',
                background: 'linear-gradient(0deg, #629675 0%, #013E37 100%)',
                filter: 'blur(clamp(220px, calc(800 / 1920 * 100vw), 800px))',
              }}
            />
            {/* Figma 1:5107 NOISE effect: MONOTONE black (α=0.25), density=1,
                noiseSize=0.5. SVG fractalNoise approximation, soft-light blend. */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                backgroundSize: '180px 180px',
                mixBlendMode: 'overlay',
                opacity: 0.6,
              }}
            />
          </div>

          {/* Figma 1:5108/1:5109 — "USPs" pill, centered */}
          <div className="relative flex justify-center" style={{ marginBottom: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)' }}>
            <EyebrowPill>USPs</EyebrowPill>
          </div>

          {/*
           * Figma 1:5111 — heading
           * "What Structured Care Looks Like"
           * Bricolage SemiBold 72px, white, centered, x=555 y=6169 w=759
           */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-[family-name:var(--font-bricolage)] text-white text-center mx-auto"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1,
              maxWidth: 'clamp(300px, calc(759 / 1920 * 100vw), 759px)',
              marginBottom: 'clamp(32px, calc(64 / 1920 * 100vw), 64px)',
            }}
          >
            What Structured Care<br />Looks Like
          </motion.h2>

          {/*
           * Figma 1:6322 — comparison row
           * Group x=349 y=6377 w=1223 h=1092
           * Left card (1:6323): x=349 y=6467 w=573 h=920 → starts 90px below right
           * Right card (1:6338): x=892 y=6377 w=680 h=1092
           * Overlap: left right-edge=922, right left-edge=892 → 30px overlap
           */}
          <div
            className="relative mx-auto flex items-start newme-compare-wrap"
            style={{ maxWidth: 1223 }}
            data-active={active}
          >
            {/* Left — Typical Wellness Program (1:6323/1:6324) */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-pressed={active === 'typical'}
              onClick={() => setActive('typical')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive('typical') } }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={{
                // Inactive card scales to ~0.92 and dims to 0.65; active
                // returns to full size + opacity. Transform-origin is set
                // below so the inactive card recedes toward its outer
                // edge instead of toward the center seam.
                scale: active === 'typical' ? 1 : 0.92,
                opacity: active === 'typical' ? 1 : 0.55,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col overflow-hidden newme-typical-col cursor-pointer"
              data-node-id="1:6323"
              style={{
                flex: '573 1 0',
                // Figma left card y=6467, right y=6377 → offset down by 90px
                marginTop: 'clamp(45px, calc(90 / 1920 * 100vw), 90px)',
                minHeight: 'clamp(460px, calc(920 / 1920 * 100vw), 920px)',
                borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                backdropFilter: 'blur(10.25px)',
                WebkitBackdropFilter: 'blur(10.25px)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%), ' +
                  'rgba(255,255,255,0.30)',
                // Recede toward the outer (left) edge, so the active card
                // visually grows toward the center.
                transformOrigin: 'left center',
                zIndex: active === 'typical' ? 3 : 1,
              }}
            >
              {/* Figma 1:6325 — header band, fill #173b39, h=162, corners [40,40,0,0] */}
              <div
                className="flex items-center justify-center text-center flex-shrink-0"
                style={{
                  minHeight: 'clamp(80px, calc(162 / 1920 * 100vw), 162px)',
                  padding: 'clamp(16px, calc(28 / 1920 * 100vw), 28px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                  background: '#173b39',
                  borderRadius:
                    'clamp(20px, calc(40 / 1920 * 100vw), 40px) ' +
                    'clamp(20px, calc(40 / 1920 * 100vw), 40px) 0 0',
                }}
              >
                {/* Figma 1:6337 — Bricolage SemiBold white */}
                <h3
                  className="font-[family-name:var(--font-bricolage)] text-white"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(16px, calc(34 / 1920 * 100vw), 34px)',
                    lineHeight: 1.2,
                  }}
                >
                  Typical Wellness Program
                </h3>
              </div>

              {/* Figma 1:6326–1:6336 — item rows, white text, white dividers */}
              <ul className="flex flex-col flex-1">
                {typical.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      padding: '0 clamp(16px, calc(48 / 1920 * 100vw), 48px)',
                      // Figma: Vector 229–233 stroke white 0.84
                      borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.84)',
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-urbanist)] text-white"
                      style={{
                        fontWeight: 500,
                        fontSize: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)',
                        lineHeight: 'clamp(18px, calc(30 / 1920 * 100vw), 30px)',
                        opacity: 0.9,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — Structured Care With NewME Method (1:6338/1:6339) */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-pressed={active === 'newme'}
              onClick={() => setActive('newme')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive('newme') } }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={{
                scale: active === 'newme' ? 1 : 0.92,
                opacity: active === 'newme' ? 1 : 0.7,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col overflow-hidden newme-newme-col cursor-pointer"
              data-node-id="1:6338"
              style={{
                flex: '680 1 0',
                // Figma right card extends 30px under the left card
                marginLeft: 'clamp(-15px, calc(-30 / 1920 * 100vw), -30px)',
                minHeight: 'clamp(540px, calc(1092 / 1920 * 100vw), 1092px)',
                borderRadius: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                // Figma 1:6339 — SOLID white, transparent shadow effect
                background: '#ffffff',
                boxShadow: active === 'newme' ? '0 24px 60px -28px rgba(0,0,0,0.55)' : 'none',
                // Recede toward the outer (right) edge so the active card
                // grows visually toward the center seam.
                transformOrigin: 'right center',
                zIndex: active === 'newme' ? 3 : 1,
              }}
            >
              {/* Figma 1:6340 — header band, fill #013e37, h=192, corners [48,48,0,0] */}
              <div
                className="flex items-center justify-center text-center flex-shrink-0"
                style={{
                  minHeight: 'clamp(100px, calc(192 / 1920 * 100vw), 192px)',
                  padding: 'clamp(20px, calc(36 / 1920 * 100vw), 36px) clamp(20px, calc(48 / 1920 * 100vw), 48px)',
                  background: '#013e37',
                  borderRadius:
                    'clamp(24px, calc(48 / 1920 * 100vw), 48px) ' +
                    'clamp(24px, calc(48 / 1920 * 100vw), 48px) 0 0',
                }}
              >
                {/* Figma 1:6352 — Bricolage Bold #FEF272 */}
                <h3
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                    lineHeight: 1.2,
                    color: '#FEF272',
                  }}
                >
                  Structured Care With<br />NewME Method
                </h3>
              </div>

              {/* Figma 1:6341–1:6351 — item rows, #013e37 text, #629675 dividers */}
              <ul className="flex flex-col flex-1" style={{ background: '#ffffff' }}>
                {newme.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      padding: '0 clamp(20px, calc(60 / 1920 * 100vw), 60px)',
                      background: '#ffffff',
                      // Figma: Vector 234–238 stroke #629675
                      borderTop: i === 0 ? 'none' : '1px solid rgba(98,150,117,0.4)',
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{
                        fontWeight: 600,
                        fontSize: 'clamp(13px, calc(28 / 1920 * 100vw), 28px)',
                        lineHeight: 'clamp(18px, calc(34 / 1920 * 100vw), 34px)',
                        color: '#013e37',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
