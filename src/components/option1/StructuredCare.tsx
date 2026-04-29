'use client'

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

export default function StructuredCare() {
  return (
    <section
      id="structured-care"
      className="relative"
      style={{
        paddingTop: 'clamp(80px, calc(200 / 1920 * 100vw), 200px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 0,
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/*
         * Figma 1:5104 — section background
         * fills: SOLID rgba(255,255,255,0.30) + GRADIENT_LINEAR white 0.20→0
         * stroke: GRADIENT_LINEAR (approximated as white border)
         * effect: BACKGROUND_BLUR radius 20.5
         * cornerRadius: 34
         */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            border: '2px solid rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20.5px)',
            WebkitBackdropFilter: 'blur(20.5px)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 60%), ' +
              'rgba(255,255,255,0.30)',
            paddingTop: 'clamp(40px, calc(120 / 1920 * 100vw), 120px)',
            paddingBottom: 'clamp(60px, calc(120 / 1920 * 100vw), 120px)',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          }}
        >
          {/*
           * Figma 1:5112 — decorative yellow blurred vector
           * fill: #FEF272, LAYER_BLUR 50, x=710 y=6097 w=784 h=784
           * (relative to section bg x=60,y=5797 → local x=650,y=300)
           */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: 'clamp(60px, calc(180 / 1920 * 100vw), 180px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(300px, calc(784 / 1920 * 100vw), 784px)',
              height: 'clamp(300px, calc(784 / 1920 * 100vw), 784px)',
              background: 'rgba(254,242,114,0.18)',
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />

          {/*
           * Figma 1:5115 — decorative top-right yellow circle outline
           * stroke: #FEF272, x=1339 y=5703 w=785 h=856
           * (relative to section bg → local x≈1279, y≈-94)
           */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: 'clamp(-60px, calc(-94 / 1920 * 100vw), -94px)',
              right: 'clamp(-100px, calc(-281 / 1920 * 100vw), -281px)',
              width: 'clamp(300px, calc(785 / 1920 * 100vw), 785px)',
              height: 'clamp(300px, calc(856 / 1920 * 100vw), 856px)',
              borderRadius: '50%',
              border: '1px solid rgba(254,242,114,0.6)',
            }}
          />

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
              marginBottom: 'clamp(40px, calc(100 / 1920 * 100vw), 100px)',
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
            className="relative mx-auto flex items-start"
            style={{ maxWidth: 'clamp(600px, calc(1223 / 1920 * 100vw), 1223px)' }}
          >
            {/* Left — Typical Wellness Program (1:6323/1:6324) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col overflow-hidden"
              style={{
                flex: '573 1 0',
                // Figma left card y=6467, right y=6377 → offset down by 90px
                marginTop: 'clamp(45px, calc(90 / 1920 * 100vw), 90px)',
                minHeight: 'clamp(460px, calc(920 / 1920 * 100vw), 920px)',
                borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                border: '2px solid rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20.5px)',
                WebkitBackdropFilter: 'blur(20.5px)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 60%), ' +
                  'rgba(255,255,255,0.30)',
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col overflow-hidden"
              style={{
                flex: '680 1 0',
                // Figma right card extends 30px under the left card
                marginLeft: 'clamp(-15px, calc(-30 / 1920 * 100vw), -30px)',
                minHeight: 'clamp(540px, calc(1092 / 1920 * 100vw), 1092px)',
                borderRadius: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                // Figma 1:6339 — SOLID white, DROP_SHADOW radius 12.7
                background: '#ffffff',
                boxShadow: '0 16px 48px 0 rgba(0,0,0,0.18)',
                zIndex: 2,
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
