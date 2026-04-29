'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const PORTRAIT = '/Dr Pal.webp'

// Figma node 1:2668 — Group 165
// Card: 1800×1124 left:60 top:2269 border-radius:80 — light sage-green gradient
// Photo: 667×1004 inside card, clean rounded-rectangle portrait + grain overlay
// Eyebrow: shared EyebrowPill component (same as WhatIsNewMe / Pathways / etc)
// Heading: Bricolage SemiBold 72 / lh72 white
// Divider: 1px white/30, 830 wide
// Body: Urbanist Medium 28 / lh34 white, 883 max-w
export default function DrPal() {
  return (
    <section
      id="care-team"
      style={{
        paddingTop: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
        style={{
          borderRadius: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          minHeight: 'clamp(480px, calc(1124 / 1800 * 100vw), 1124px)',
          // Figma node 1:2670 — light sage-green gradient. Top edge is the
          // lightest (mint-sage glow), bottom edge slightly darker. Mostly
          // vertical with a faint left-side highlight. Much lighter than a
          // pine green: this is closer to a fresh moss/sage palette.
          background: [
            'linear-gradient(180deg, rgba(200,222,212,0.55) 0%, rgba(200,222,212,0) 35%)',
            'linear-gradient(90deg, rgba(200,222,212,0.30) 0%, rgba(200,222,212,0) 25%)',
            'linear-gradient(180deg, #82A99B 0%, #6E988A 30%, #5C8779 60%, #50796C 100%)',
          ].join(', '),
        }}
      >
        {/* Card grain — clearly visible noise riding across the full card.
            Figma's noise effect on this surface is prominent, not subtle. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.55,
            mixBlendMode: 'soft-light',
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: '180px 180px',
          }}
        />

        <div
          className="relative grid lg:grid-cols-[667fr_1073fr]"
          style={{ minHeight: 'inherit' }}
        >
          {/* ── Photo column ─────────────────────────────────────────── */}
          {/* Figma: 667×1004 portrait with rounded corners. Photo padded
              60px from card top/left/bottom. No fade — clean rectangular
              photo with a subtle grain matching the card. */}
          <div
            className="relative min-h-[360px] lg:min-h-full"
            style={{
              padding: 'clamp(16px, calc(60 / 1920 * 100vw), 60px)',
              paddingRight: 0,
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                backgroundImage: `url('${encodeURI(PORTRAIT)}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                aspectRatio: '667 / 1004',
              }}
            >
              {/* Photo grain — same noise as the card so the photo feels
                  embedded in the design rather than pasted on. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.18,
                  mixBlendMode: 'soft-light',
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                  backgroundSize: '200px 200px',
                }}
              />
            </div>
          </div>

          {/* ── Content column ───────────────────────────────────────── */}
          <div
            className="relative flex flex-col"
            style={{
              paddingTop: 'clamp(32px, calc(150 / 1920 * 100vw), 150px)',
              paddingBottom: 'clamp(40px, calc(100 / 1920 * 100vw), 100px)',
              paddingLeft: 'clamp(20px, calc(92 / 1920 * 100vw), 92px)',
              paddingRight: 'clamp(24px, calc(92 / 1920 * 100vw), 92px)',
            }}
          >
            {/* Eyebrow — shared component (matches every other section). */}
            <div className="self-start">
              <EyebrowPill variant="dark">Meet Dr. Pal</EyebrowPill>
            </div>

            <h2
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                maxWidth: 840,
                marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
              }}
            >
              Clinical Expertise,
              <br />
              Shaped By Real
              <br />
              Experience
            </h2>

            <div
              className="bg-white/30"
              style={{
                height: 1,
                maxWidth: 830,
                marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
              }}
            />

            <div
              className="newme-drpal-body"
              style={{ marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)' }}
            >
              <p
                className="text-white font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
                  lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                  maxWidth: 883,
                }}
              >
                Dr. Pal is a US-based gastroenterologist whose clinical
                perspective is shaped not just by medical training, but by
                personal experience.
              </p>
              <p
                className="text-white font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
                  lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                  maxWidth: 883,
                }}
              >
                In his early 30s, despite professional success, his own health
                declined due to long work hours, poor sleep, and unstructured
                living. All of it culminated with a heart attack at the age of
                35. That moment exposed a critical gap: the absence of
                structured, sustainable approaches to building long-term health.
              </p>
              <p
                className="text-white font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
                  lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                  maxWidth: 883,
                }}
              >
                This realization became the foundation of NewME. Today, Dr. Pal
                leads a system that focuses on restoring metabolic and gut
                regulation through structured care, guided accountability, and
                consistency over time, bringing together clinical insight and
                real-world application to support lasting health.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
