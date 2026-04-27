'use client'

import { motion } from 'framer-motion'

const PORTRAIT = '/images/home/Dr Pal.webp'

// Figma section: 1800 × 1124, top 2269, left 60.
// Gradient: light moss (top-left) → deep forest (bottom-right).
// Inner photo: portrait 3:5 ratio with rounded corners and visible card around it.
export default function DrPal() {
  return (
    <section
      id="care-team"
      // Figma spec: width 1800, height 1124, left 60 on 1920 artboard.
      // Gutter scales 60/1920 = 3.13vw, capped at 60px.
      className="relative py-[clamp(40px,6vw,80px)]"
      style={{
        paddingLeft: 'clamp(20px, 3.13vw, 60px)',
        paddingRight: 'clamp(20px, 3.13vw, 60px)',
      }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
          style={{
            // Figma spec: linear-gradient #629675 (moss) -> #013E37 (deep pine).
            // Multi-stop ramp prevents the top-left from washing out to mint.
            background:
              'linear-gradient(135deg, #629675 0%, #4F8369 25%, #2F7269 50%, #144F49 75%, #013E37 100%)',
            borderRadius: 'clamp(20px, 1.77vw, 34px)',
            minHeight: 'clamp(640px, calc(1124 / 1800 * 100vw), 1124px)',
          }}
        >
          {/* Soft yellow glow on the right side — Figma highlight */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 65% at 95% 55%, rgba(254,242,114,0.16) 0%, rgba(254,242,114,0.04) 35%, rgba(254,242,114,0) 60%)',
            }}
          />

          {/* Monotone noise — Figma effect: #000 @ 25%, density 100%, size 0.5 */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.18,
              mixBlendMode: 'multiply',
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '200px 200px',
            }}
          />

          {/* Card content — Figma exact:
              Photo: 667×1004 at top:60 left:60 inside 1800×1124 card.
              Eyebrow "Meet Dr. Pal": 172×48 at top:150 left:819 (= 759 from photo right edge).
              Heading: 840×216 at top:238 left:819, Bricolage SemiBold 72px lh 72.
              Body: 883×170+ at top:618 left:819, Urbanist Medium 28px lh 34. */}
          <div
            className="relative grid lg:grid-cols-[667fr_1073fr] items-center"
            style={{
              padding: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
              gap: 'clamp(24px, calc(92 / 1920 * 100vw), 92px)', // 819 - (60 + 667) = 92px
            }}
          >
            {/* Photo — Figma 667×1004 at top:60 left:60 inside the card. */}
            <div className="w-full">
              <div
                className="relative aspect-[667/1004] rounded-[18px] md:rounded-[22px] lg:rounded-[24px] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${encodeURI(PORTRAIT)}')` }}
              />
            </div>

            {/* Right — copy column */}
            <div className="relative flex flex-col">
              {/* Eyebrow pill — Figma: 172×48, fill #173B39, 1px moss gradient
                  border (#629675 → 0% opacity), radius 40 (fully rounded). */}
              <span
                className="relative inline-flex w-[172px] items-center justify-center h-[48px] rounded-full font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  background: '#173B39',
                  fontWeight: 300,
                  fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                  letterSpacing: 0,
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    padding: 1,
                    background:
                      'linear-gradient(135deg, #629675 0%, rgba(98,150,117,0) 100%)',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    maskComposite: 'exclude',
                  }}
                />
                Meet Dr. Pal
              </span>

              {/* Heading — Figma: Bricolage Grotesque SemiBold 72px, lh 72, 840 wide. */}
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

              {/* Divider — Figma Vector 216 horizontal line below heading. */}
              <div
                className="bg-white/30"
                style={{
                  height: 1,
                  marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                }}
              />

              <div
                className="space-y-4 md:space-y-5"
                style={{
                  marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                }}
              >
                {/* Body paragraphs — Figma: Urbanist Medium 28px lh 34. */}
                <p
                  className="text-white font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
                    lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                    letterSpacing: 0,
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
                    letterSpacing: 0,
                    maxWidth: 883,
                  }}
                >
                  In his early 30s, despite professional success, his own
                  health declined due to long work hours, poor sleep, and
                  unstructured living. All of it culminated with a heart
                  attack at the age of 35. That moment exposed a critical
                  gap: the absence of structured, sustainable approaches to
                  building long-term health.
                </p>
                <p
                  className="text-white font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(14px, calc(28 / 1920 * 100vw), 28px)',
                    lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                    letterSpacing: 0,
                    maxWidth: 883,
                  }}
                >
                  This realization became the foundation of NewME. Today, Dr.
                  Pal leads a system that focuses on restoring metabolic and
                  gut regulation through structured care, guided
                  accountability, and consistency over time, bringing
                  together clinical insight and real-world application to
                  support lasting health.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
