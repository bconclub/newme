'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const CARDS = [
  {
    title: 'Personalised Nutrition & Coaching Protocols',
    body: 'Food and lifestyle protocols built around your metabolic markers, not generic macros. Adjusted as your labs and responses evolve.',
    accent: false,
  },
  {
    title: 'Nutritional Clinics & Specialist Access',
    body: 'Direct access to registered dietitians and specialist clinicians — not filtered through a generic chat interface or delayed referrals.',
    accent: true,
  },
  {
    title: 'Metabolic & Gut Health Pathway',
    body: 'A structured clinical pathway that addresses the root causes of metabolic and gut dysfunction — not just the symptoms presenting today.',
    accent: false,
  },
  {
    title: 'Bloodwork & Biomarker Tracking',
    body: 'Scheduled labs tied to your care milestones so every protocol adjustment is based on data, not guesswork or how you felt last week.',
    accent: false,
  },
  {
    title: 'Done-With-You Accountability',
    body: 'Coaches who stay accountable to your clinical plan, check in consistently, and escalate when something needs a clinician\'s review.',
    accent: false,
  },
  {
    title: 'Behavioural Systems & Habit Architecture',
    body: 'Structured frameworks that translate clinical recommendations into daily habits — and ensure those habits hold even when motivation fluctuates.',
    accent: false,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HIWSuccessCards() {
  return (
    <section
      id="hiw-success"
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
        <div className="flex flex-col items-center text-center mb-[clamp(48px,calc(72/1920*100vw),72px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <EyebrowPill>What&apos;s included</EyebrowPill>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(64 / 1920 * 100vw), 64px)',
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              marginTop: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
              maxWidth: 800,
            }}
          >
            Designed To Help You Succeed
          </motion.h2>
        </div>

        {/* 3×2 cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              className="flex flex-col"
              style={{
                borderRadius: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                padding: 'clamp(28px, calc(44 / 1920 * 100vw), 44px) clamp(24px, calc(40 / 1920 * 100vw), 40px)',
                background: card.accent ? '#FEF272' : 'rgba(255,255,255,0.05)',
                border: card.accent ? 'none' : '1px solid rgba(255,255,255,0.09)',
                backdropFilter: card.accent ? 'none' : 'blur(6px)',
                WebkitBackdropFilter: card.accent ? 'none' : 'blur(6px)',
                minHeight: 'clamp(220px, calc(320 / 1920 * 100vw), 320px)',
              }}
            >
              {/* Number */}
              <span
                className="font-[family-name:var(--font-bricolage)]"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
                  color: card.accent ? 'rgba(23,59,57,0.45)' : 'rgba(254,242,114,0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3
                className="font-[family-name:var(--font-bricolage)]"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(17px, calc(24 / 1920 * 100vw), 24px)',
                  lineHeight: 1.2,
                  color: card.accent ? '#0E2827' : '#ffffff',
                  marginTop: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                }}
              >
                {card.title}
              </h3>

              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
                  lineHeight: 1.6,
                  color: card.accent ? 'rgba(14,40,39,0.70)' : 'rgba(255,255,255,0.58)',
                  marginTop: 'clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
