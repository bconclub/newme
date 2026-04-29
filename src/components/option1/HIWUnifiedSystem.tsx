'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const CARE_PILLARS = [
  {
    label: 'Personalized',
    heading: 'Your Care Is Built Around You',
    body:
      'A deep intake assessment maps your symptoms, history, labs, and lifestyle — so every protocol reflects your actual physiology, not a generic template.',
    bg: '#0A3D38',
    accent: '#629675',
  },
  {
    label: 'Physician-Led',
    heading: 'Doctor Oversight At Every Phase',
    body:
      'Dr. Pal and the clinical team review your progress, adjust pathways, and stay involved — not just at intake, but through every stage of your care.',
    bg: '#FEF272',
    accent: '#173B39',
    dark: true,
  },
  {
    label: 'Monitored',
    heading: 'Tracked, Reviewed & Adjusted',
    body:
      'Scheduled check-ins and clinical reviews ensure your pathway adapts as your body responds — not locked into a plan that stopped fitting months ago.',
    bg: '#0A3D38',
    accent: '#629675',
  },
  {
    label: 'Coached',
    heading: 'A Full Team Behind Your Progress',
    body:
      'Coaches, clinicians, and specialists coordinate so you never fall between the cracks. Every touchpoint is connected to the same clinical record.',
    bg: '#0A3D38',
    accent: '#629675',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HIWUnifiedSystem() {
  return (
    <section
      id="hiw-unified"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(140 / 1920 * 100vw), 140px)',
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-[clamp(48px,calc(80/1920*100vw),80px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <EyebrowPill>A unified system</EyebrowPill>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              marginTop: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
              maxWidth: 900,
            }}
          >
            A Unified System Of Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-white/70 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
              lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
              marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              maxWidth: 700,
            }}
          >
            Four interlocking components that work together so nothing in your
            care falls through the cracks.
          </motion.p>
        </div>

        {/* 4-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {CARE_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="flex flex-col overflow-hidden"
              style={{
                borderRadius: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                background: pillar.bg,
                minHeight: 'clamp(320px, calc(540 / 1920 * 100vw), 540px)',
                border: pillar.dark ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Top accent stripe */}
              <div
                style={{
                  height: 'clamp(4px, calc(6 / 1920 * 100vw), 6px)',
                  background: pillar.dark ? '#173B39' : pillar.accent,
                  opacity: 0.6,
                }}
              />

              {/* Card body */}
              <div
                className="flex flex-col flex-1"
                style={{
                  padding: 'clamp(24px, calc(44 / 1920 * 100vw), 44px) clamp(20px, calc(36 / 1920 * 100vw), 36px)',
                }}
              >
                {/* Label pill */}
                <span
                  className="inline-flex self-start items-center rounded-full font-[family-name:var(--font-urbanist)]"
                  style={{
                    padding: '4px 14px',
                    fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: pillar.dark
                      ? 'rgba(23,59,57,0.12)'
                      : 'rgba(255,255,255,0.10)',
                    color: pillar.dark ? '#173B39' : 'rgba(255,255,255,0.7)',
                    border: pillar.dark
                      ? '1px solid rgba(23,59,57,0.20)'
                      : '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  {pillar.label}
                </span>

                <h3
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(18px, calc(30 / 1920 * 100vw), 30px)',
                    lineHeight: 1.15,
                    color: pillar.dark ? '#0E2827' : '#ffffff',
                    marginTop: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
                  }}
                >
                  {pillar.heading}
                </h3>

                <p
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(13px, calc(17 / 1920 * 100vw), 17px)',
                    lineHeight: 1.6,
                    color: pillar.dark ? '#2A4E4B' : 'rgba(255,255,255,0.65)',
                    marginTop: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                  }}
                >
                  {pillar.body}
                </p>

                {/* Bottom decorative dot */}
                <div className="mt-auto pt-8 flex items-center gap-2">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="rounded-full"
                      style={{
                        width: d === 0 ? 22 : 7,
                        height: 7,
                        background: pillar.dark
                          ? d === 0 ? '#173B39' : 'rgba(23,59,57,0.2)'
                          : d === 0 ? pillar.accent : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
