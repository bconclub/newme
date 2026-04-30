'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

/**
 * Figma 58:1256–58:1303 — "Unstructured Care Hasn't Led To Results, Right?"
 *
 * Outer mask group: 1800×2030 at (59,2454), green-gradient ellipse fill
 * (Ellipse 59 — 2247×2305, blur).
 *
 * Header (centered):
 *   · Eyebrow 58:1259 — "The NewME Difference"
 *   · Heading 58:1262 — "Unstructured Care Hasn't Led To Results, Right?"
 *     (1011×144 at 455,2646)
 *   · Body 58:1263 — long description (1098×102 at 411,2822)
 *
 * Comparison cards (Group 263 — 1241×1360 at 340,3004):
 *   Left  (Group 261 — 601×1202 at 340,3083) — header band 169.69 high, fill different
 *   Right (Group 262 — 680×1360 at 901,3004) — header band 192 high
 *   Right card overlaps left by 40px (left ends 941, right starts 901).
 *
 * 8 items each side. Right card is taller (1360 vs 1202) — extends top and bottom.
 */

const TYPICAL = [
  'Trial-and-error dieting',
  'Generic fitness plans',
  'Random supplementation',
  'Inconsistent routines',
  'Advice that does not connect',
  'Short-term transformations',
  'Unstructured coaching',
  'Starting over repeatedly',
]

const NEWME = [
  'Assessment-driven Nutrition architecture',
  'Prescribed movement within clinical pathways',
  'Coordinated metabolic and gut protocols',
  'Structured daily and weekly accountability',
  'One unified system, not fragmented advice',
  'Phased progression designed for stability',
  'Clinical oversight with continuous guidance',
  'Sustained results that compound over time',
]

export default function HIWComparison() {
  return (
    <section
      id="hiw-comparison"
      className="relative"
      style={{
        // Figma section starts y=2454 directly after Unified card section.
        paddingTop: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 0,
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/*
          Figma 58:1257 + 58:1258 — Mask group with ellipse 59 (green gradient
          + LAYER_BLUR) clipped to 1800×2030 frame, radius 34.
        */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            paddingTop: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
            paddingBottom: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          }}
        >
          {/* Green gradient blob (Ellipse 59) */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: 'calc(-169 / 1800 * 100%)',
              top: 'calc(-171 / 2030 * 100%)',
              width: 'calc(2247 / 1800 * 100%)',
              height: 'calc(2305 / 2030 * 100%)',
              borderRadius: '50%',
              background: 'linear-gradient(0deg, #629675 0%, #013E37 100%)',
              filter: 'blur(clamp(180px, calc(600 / 1920 * 100vw), 600px))',
              opacity: 0.7,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              backgroundSize: '180px 180px',
              mixBlendMode: 'overlay',
              opacity: 0.6,
            }}
          />

          {/* Header — centered */}
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              <EyebrowPill>The NewME Difference</EyebrowPill>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                // Figma 1011×144 → ~72/72
                fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                maxWidth: 'clamp(320px, calc(1011 / 1920 * 100vw), 1011px)',
              }}
            >
              Unstructured Care Hasn&rsquo;t<br />Led To Results, Right?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-white/80 font-[family-name:var(--font-urbanist)]"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                maxWidth: 'clamp(320px, calc(1098 / 1920 * 100vw), 1098px)',
              }}
            >
              Most people have already tried multiple approaches. What&rsquo;s missing
              is structure, coordination, and continuity. NewME replaces fragmented
              approaches with a system that is assessment-driven, clinically guided,
              and built for long-term regulation.
            </motion.p>
          </div>

          {/*
            Comparison cards — Figma:
              · Group 263 1241×1360 at (340,3004), centered on 1920 artboard
              · Left  card: 601 wide, 1202 tall, top y=3083 (offset +79 from container)
              · Right card: 680 wide, 1360 tall, top y=3004 — extends 79 above + 79 below
              · Right left-edge x=901 overlaps left right-edge x=941 by 40px
          */}
          <div
            className="relative mx-auto flex flex-col md:flex-row items-start"
            style={{
              maxWidth: 'clamp(560px, calc(1241 / 1920 * 100vw), 1241px)',
              marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            }}
          >
            {/* Left — What Most People Are Doing (Group 261). Figma 601×1202.
                Right card is 158px taller and extends 79 above + 79 below this
                one; left card is offset down 79 inside the row. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col overflow-hidden md:mt-[clamp(40px,calc(79/1920*100vw),79px)] md:h-[clamp(680px,calc(1202/1920*100vw),1202px)]"
              style={{
                flex: '601 1 0',
                borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.30)',
              }}
            >
              {/* Header band (Rectangle 114) — 169.69 high, #173B39 */}
              <div
                className="flex items-center justify-center text-center flex-shrink-0"
                style={{
                  minHeight: 'clamp(80px, calc(170 / 1920 * 100vw), 170px)',
                  padding:
                    'clamp(16px, calc(28 / 1920 * 100vw), 28px) clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                  background: '#173b39',
                  borderRadius:
                    'clamp(20px, calc(40 / 1920 * 100vw), 40px) ' +
                    'clamp(20px, calc(40 / 1920 * 100vw), 40px) 0 0',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)] text-white"
                  style={{
                    fontWeight: 600,
                    // Figma 58:1284 — 362×85 → ~36/42 over 2 lines
                    fontSize: 'clamp(18px, calc(36 / 1920 * 100vw), 36px)',
                    lineHeight: 1.18,
                  }}
                >
                  What Most People<br />Are Doing
                </h3>
              </div>

              <ul className="flex flex-col flex-1">
                {TYPICAL.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      padding:
                        'clamp(14px, calc(20/1920*100vw), 20px) clamp(16px, calc(40 / 1920 * 100vw), 40px)',
                      borderTop:
                        i === 0 ? 'none' : '1px solid rgba(255,255,255,0.84)',
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-urbanist)] text-white"
                      style={{
                        fontWeight: 500,
                        // Figma 58:1269 — Urbanist Medium 24.75/30.05 white
                        fontSize: 'clamp(14px, calc(24.75 / 1920 * 100vw), 24.75px)',
                        lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                        opacity: 0.92,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — The NewME Approach (Group 262). Figma 680×1360, top
                aligned with row top so it extends 79px above the left card
                and 79px below it. Overlaps the left card by 40px on its left
                edge (left ends x=941, right starts x=901). */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col overflow-hidden mt-4 md:mt-0 md:h-[clamp(760px,calc(1360/1920*100vw),1360px)] md:ml-[clamp(-40px,calc(-40/1920*100vw),0px)]"
              style={{
                flex: '680 1 0',
                borderRadius: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                background: '#ffffff',
                zIndex: 2,
              }}
            >
              {/* Header band (Rectangle 116) — 192 high, #013E37 */}
              <div
                className="flex items-center justify-center text-center flex-shrink-0"
                style={{
                  minHeight: 'clamp(100px, calc(192 / 1920 * 100vw), 192px)',
                  padding:
                    'clamp(20px, calc(36 / 1920 * 100vw), 36px) clamp(20px, calc(48 / 1920 * 100vw), 48px)',
                  background: '#013e37',
                  borderRadius:
                    'clamp(24px, calc(48 / 1920 * 100vw), 48px) ' +
                    'clamp(24px, calc(48 / 1920 * 100vw), 48px) 0 0',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{
                    // Figma 58:1303 — Bricolage Grotesque SemiBold 40/48 #FEF272
                    fontWeight: 600,
                    fontSize: 'clamp(22px, calc(40 / 1920 * 100vw), 40px)',
                    lineHeight: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
                    color: '#FEF272',
                  }}
                >
                  The NewME Approach
                </h3>
              </div>

              <ul className="flex flex-col flex-1" style={{ background: '#ffffff' }}>
                {NEWME.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      padding:
                        'clamp(14px, calc(22/1920*100vw), 22px) clamp(20px, calc(56 / 1920 * 100vw), 56px)',
                      background: '#ffffff',
                      borderTop:
                        i === 0 ? 'none' : '1px solid rgba(98,150,117,0.4)',
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{
                        // Figma 58:1288 — Urbanist SemiBold 28/34 #013E37
                        fontWeight: 600,
                        fontSize: 'clamp(15px, calc(28 / 1920 * 100vw), 28px)',
                        lineHeight: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
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
