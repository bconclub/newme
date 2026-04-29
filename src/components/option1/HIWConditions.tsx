'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const CONDITIONS = [
  'Type 2 Diabetes',
  'Pre-Diabetes',
  'Insulin Resistance',
  'Metabolic Syndrome',
  'Fatty Liver (NAFLD)',
  'IBS',
  'SIBO',
  'Leaky Gut',
  'Crohn\'s Disease',
  'Ulcerative Colitis',
  'GERD / Acid Reflux',
  'Hypothyroidism',
  'Hashimoto\'s',
  'PCOS',
  'Hormonal Imbalance',
  'Adrenal Fatigue',
  'Chronic Inflammation',
  'Obesity',
  'High Cholesterol',
  'Hypertension',
  'Chronic Fatigue',
  'Brain Fog',
  'Sleep Disorders',
  'Anxiety (metabolic-linked)',
]

export default function HIWConditions() {
  return (
    <section
      id="hiw-conditions"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Card shell */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: 'clamp(40px, calc(72/1920*100vw), 72px) clamp(28px, calc(64/1920*100vw), 64px)',
          }}
        >
          {/* Gold ellipse glow top-right */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(300px, calc(700 / 1920 * 100vw), 700px)',
              height: 'clamp(300px, calc(700 / 1920 * 100vw), 700px)',
              borderRadius: '50%',
              background: '#FEF272',
              filter: 'blur(clamp(120px, calc(260 / 1920 * 100vw), 260px))',
              opacity: 0.12,
              top: '-30%',
              right: '-10%',
            }}
          />

          {/* Header row */}
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 md:justify-between mb-[clamp(32px,calc(56/1920*100vw),56px)]">
            <div>
              <EyebrowPill>Conditions addressed</EyebrowPill>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(24px, calc(52 / 1920 * 100vw), 52px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                  maxWidth: 660,
                }}
              >
                Conditions Addressed
                <br />Within The NewME System
              </motion.h2>
            </div>
            <p
              className="font-[family-name:var(--font-urbanist)] text-white/55 md:text-right"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
                lineHeight: 1.55,
                maxWidth: 340,
                flexShrink: 0,
              }}
            >
              NewME is designed for root-cause care. These conditions are not
              treated in isolation — they are addressed as interconnected systems.
            </p>
          </div>

          {/* Pill tags */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
            }}
            className="relative flex flex-wrap gap-3"
          >
            {CONDITIONS.map((condition) => (
              <motion.span
                key={condition}
                variants={{
                  hidden: { opacity: 0, scale: 0.88 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="inline-flex items-center rounded-full font-[family-name:var(--font-urbanist)] text-white/85"
                style={{
                  padding: 'clamp(7px, calc(10/1920*100vw), 10px) clamp(14px, calc(22/1920*100vw), 22px)',
                  fontSize: 'clamp(12px, calc(15 / 1920 * 100vw), 15px)',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.13)',
                }}
              >
                {condition}
              </motion.span>
            ))}
          </motion.div>

          {/* Bottom note */}
          <p
            className="relative font-[family-name:var(--font-urbanist)] text-white/35 mt-[clamp(24px,calc(36/1920*100vw),36px)]"
            style={{
              fontSize: 'clamp(11px, calc(13 / 1920 * 100vw), 13px)',
              lineHeight: 1.5,
            }}
          >
            This list is not exhaustive. If your condition is not listed, speak with our intake
            team — NewME assesses eligibility on a case-by-case clinical basis.
          </p>
        </div>
      </div>
    </section>
  )
}
