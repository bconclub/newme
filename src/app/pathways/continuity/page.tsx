'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Types ─────────────────────────────────────────────────────────────────

type CareItem = { num: string; title: string; desc: string }

type Phase = {
  id: string
  heading: string
  description: string
  duration: string
  whoFor: string[]
  areasOfFocus: string[]
  careItems: CareItem[]
  bannerImg: string
  bannerHeading: string
  bannerBody: string
  bannerOverlay: string
}

// ── Data ──────────────────────────────────────────────────────────────────

const TABS = [
  { label: 'Metabolic Care Pathways', href: '/pathways/metabolic', active: false },
  { label: 'GastroIntestinal Care Pathways', href: '/pathways/gi', active: false },
  { label: 'Continuity Pathways', href: '/pathways/continuity', active: true },
]

const PHASES: Phase[] = [
  {
    id: 'newme360',
    heading: 'NewME 360',
    description: 'This is a structured post-program accountability and relapse prevention system that provides continued lifestyle guidance and monitoring.',
    duration: 'Duration: 3 Months / 12 Months',
    whoFor: [
      'Individuals who have completed core pathways and require continued accountability',
      'Those looking to maintain metabolic and lifestyle improvements',
      'Clients who benefit from ongoing structure without intensive intervention',
    ],
    areasOfFocus: [
      'Maintenance of lifestyle and nutrition habits',
      'Ongoing accountability and consistency',
      'Relapse prevention and long-term stability',
    ],
    careItems: [
      { num: '01', title: 'Monthly Coach Check-ins', desc: 'Regular structured sessions with your clinical health coach to review progress, address challenges, and refine your approach.' },
      { num: '02', title: 'Habit & Lifestyle Monitoring', desc: 'Ongoing review of your daily habits, nutrition consistency, and lifestyle patterns to maintain the progress you have achieved.' },
      { num: '03', title: 'Lifestyle Correction Guidance', desc: 'Targeted guidance to address any drift or setbacks in your established routines, keeping your health habits on track.' },
      { num: '04', title: 'Relapse Prevention Support', desc: 'Proactive strategies and check-ins designed to identify and address early signs of lifestyle regression before they escalate.' },
      { num: '05', title: 'Movement & Activity Access', desc: 'Continued access to the NewME virtual gym and structured movement support to help you maintain an active lifestyle.' },
      { num: '06', title: 'Ongoing Accountability Framework', desc: 'Regular progress tracking and goal-setting to keep you aligned with your long-term health outcomes beyond the core pathway.' },
    ],
    bannerImg: '/images/pathways/newme360-banner.jpg',
    bannerHeading: 'Who Is Prescribed The NewME 360 Pathway?',
    bannerBody: 'NewME 360 is prescribed for individuals who need continued accountability and structured oversight to maintain results and prevent relapse after completing their primary pathway.',
    bannerOverlay: 'rgba(1,62,55,0.47)',
  },
  {
    id: 'movement',
    heading: 'NewME Movement',
    description: 'This is a fitness-focused continuity pathway designed to support physical activity and performance without clinical lifestyle supervision.',
    duration: 'Duration: 3 Months / 12 Months',
    whoFor: [
      'Individuals with stable health who do not require ongoing clinical oversight',
      'Those looking to maintain fitness through structured workouts',
      'Clients focused on physical activity rather than metabolic correction',
    ],
    areasOfFocus: [
      'Strength and mobility',
      'Physical performance',
      'Structured workouts',
    ],
    careItems: [
      { num: '01', title: 'Live & Recorded Workouts', desc: 'Access to live group sessions and an on-demand workout library spanning strength, cardio, yoga, and mobility formats.' },
      { num: '02', title: 'Virtual Gym Access', desc: 'Full access to the NewME virtual gym with 180+ weekly sessions across a wide range of formats and difficulty levels.' },
      { num: '03', title: 'Strength & Mobility Training', desc: 'Structured programs targeting functional strength, joint mobility, and physical performance improvements over time.' },
      { num: '04', title: 'Community-Based Participation', desc: 'Group-based workout formats and community engagement to support consistency, motivation, and long-term adherence.' },
    ],
    bannerImg: '/images/pathways/movement-banner.jpg',
    bannerHeading: 'Who Is Prescribed The NewME Movement Pathway?',
    bannerBody: 'NewME Movement is prescribed for individuals who want to maintain physical fitness through structured workouts, without the need for ongoing clinical or lifestyle intervention.',
    bannerOverlay: 'rgba(1,62,55,0.47)',
  },
]

// ── Phase section component ────────────────────────────────────────────────

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <section id={phase.id} style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(60px,5.21vw,100px)' }}>

      {/* Phase heading + description + duration */}
      <div style={{ textAlign: 'center', paddingLeft: 'clamp(20px,6.25vw,120px)', paddingRight: 'clamp(20px,6.25vw,120px)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(32px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: 'clamp(12px,1.04vw,20px)' }}
        >
          {phase.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 'clamp(14px,1.46vw,28px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 'clamp(260px,47.8vw,917px)', margin: '0 auto clamp(16px,1.25vw,24px)' }}
        >
          {phase.description}
        </motion.p>

        {/* Duration pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          style={{ display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 20px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.28)', marginBottom: 'clamp(24px,2.08vw,40px)' }}
        >
          <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', fontWeight: 500 }}>{phase.duration}</span>
        </motion.div>
      </div>

      {/* 2-column info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,1.04vw,20px)', padding: '0 clamp(20px,9.32vw,179px) clamp(24px,2.08vw,40px)' }}>
        {/* Who It's For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 'clamp(14px,1.04vw,20px)',
            padding: 'clamp(20px,2.08vw,40px)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <h3
            className="font-[family-name:var(--font-bricolage)]"
            style={{ fontSize: 'clamp(18px,1.67vw,32px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(12px,1.04vw,20px)' }}
          >
            Who It&apos;s For:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,0.83vw,16px)' }}>
            {phase.whoFor.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#629675', marginTop: 6, flexShrink: 0 }} />
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Areas Of Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 'clamp(14px,1.04vw,20px)',
            padding: 'clamp(20px,2.08vw,40px)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <h3
            className="font-[family-name:var(--font-bricolage)]"
            style={{ fontSize: 'clamp(18px,1.67vw,32px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(12px,1.04vw,20px)' }}
          >
            Areas Of Focus:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,0.83vw,16px)' }}>
            {phase.areasOfFocus.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#629675', marginTop: 6, flexShrink: 0 }} />
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What Structured Care Entails heading */}
      <div style={{ padding: '0 clamp(20px,9.32vw,179px)', textAlign: 'center' }}>
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(18px,1.67vw,32px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(16px,1.67vw,32px)', paddingTop: 'clamp(12px,1.04vw,20px)' }}
        >
          What Structured Care Entails:
        </motion.h3>

        {/* Numbered care items */}
        <div style={{ maxWidth: 'clamp(300px,62.19vw,1194px)', margin: '0 auto', textAlign: 'left' }}>
          {phase.careItems.map((item, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: EASE, delay: ci * 0.04 }}
            >
              <div style={{ display: 'flex', gap: 'clamp(12px,1.67vw,32px)', alignItems: 'flex-start', padding: 'clamp(12px,1.25vw,24px) 0' }}>
                {/* Ghost number */}
                <div
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{
                    fontSize: 'clamp(36px,4.17vw,80px)',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.10)',
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: 'clamp(36px,4.17vw,80px)',
                    textAlign: 'right',
                  }}
                >
                  {item.num}
                </div>
                {/* Title + description */}
                <div style={{ flex: 1 }}>
                  <p
                    className="font-[family-name:var(--font-bricolage)]"
                    style={{ fontSize: 'clamp(14px,1.25vw,24px)', fontWeight: 600, color: '#fff', marginBottom: 6 }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
              {/* Divider */}
              {ci < phase.careItems.length - 1 && (
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prescription banner */}
      <div style={{ padding: 'clamp(32px,3.13vw,60px) clamp(20px,10.99vw,211px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ position: 'relative', borderRadius: 'clamp(24px,2.92vw,56px)', overflow: 'hidden', minHeight: 'clamp(180px,21.04vw,404px)' }}
        >
          <Image
            src={phase.bannerImg}
            alt={phase.bannerHeading}
            fill
            unoptimized
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: phase.bannerOverlay }} />
          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(24px,4.17vw,80px) clamp(20px,4.17vw,80px)' }}>
            <h3
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 'clamp(22px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, maxWidth: 'clamp(240px,41.35vw,794px)', marginBottom: 'clamp(12px,1.04vw,20px)' }}
            >
              {phase.bannerHeading}
            </h3>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 'clamp(13px,1.46vw,28px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, maxWidth: 'clamp(240px,54.69vw,1050px)', fontWeight: 500 }}
            >
              {phase.bannerBody}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ContinuityPathwayPage() {
  return (
    <>
      <Header />
      <main className="pathway-page">
      {/* ── Atmospheric background — 1920px artboard, scrolls with page ── */}
      <div className="pathway-bg" aria-hidden style={{ height: 5500 }}>
        {/* Green wash 1 — behind hero + NewME 360 phase */}
        <span className="pathway-ellipse pathway-green-wash" style={{ top: 600, opacity: 0.40 }} />
        <span className="pathway-noise pathway-green-noise" style={{ top: 600 }} />
        {/* Gold accent — top right */}
        <span className="pathway-ellipse pathway-gold-accent" style={{ top: 400, left: 1268 }} />
        {/* Green wash 2 — behind NewME Movement phase */}
        <span className="pathway-ellipse pathway-green-wash pathway-green-wash-2" style={{ top: 3400, opacity: 0.32 }} />
        <span className="pathway-noise pathway-green-noise pathway-green-noise-2" style={{ top: 3400 }} />
        {/* Gold accent — mid page left */}
        <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-2" style={{ top: 3100, left: -625 }} />
      </div>

      {/* Hero — tabs straddle the card's bottom edge (Figma: tab y=673 in 694px card) */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)', paddingBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)' }}>
        <div style={{ position: 'relative', margin: '0 clamp(12px,1.04vw,20px)' }}>

          {/* Image card */}
          <div style={{ position: 'relative', borderRadius: 'clamp(20px, calc(48 / 1920 * 100vw), 48px)', overflow: 'hidden', height: 'clamp(280px,36.15vw,694px)' }}>
            <Image
              src="/images/pathways/continuity-hero.jpg"
              alt="Continuity Pathways — ongoing care"
              fill
              unoptimized
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(1,62,55,0.92) 0%, rgba(1,62,55,0.65) 40%, rgba(1,62,55,0.10) 70%, transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px,3.13vw,60px) clamp(24px,6.25vw,120px) clamp(56px,4.58vw,88px)' }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 'clamp(28px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: 'clamp(10px,1.04vw,20px)' }}
              >
                Continuity Pathways
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: 'clamp(260px,40.7vw,783px)' }}
              >
                Continuity Pathways are designed to maintain results, prevent relapse, and provide structured support beyond the core phases. Available for clients who have completed a primary pathway or as a standalone fitness and accountability program.
              </motion.p>
            </div>
          </div>

          {/* Tabs — absolute, extending ~24px below the card */}
          <div style={{ position: 'absolute', bottom: 'clamp(-16px, calc(-24 / 1920 * 100vw), -24px)', left: 'clamp(20px, calc(120 / 1920 * 100vw), 120px)', display: 'flex', gap: 8, flexWrap: 'wrap', zIndex: 10 }}>
            {TABS.map((tab) => (
              <Link key={tab.href} href={tab.href} style={{ textDecoration: 'none' }}>
                <span
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 48,
                    padding: '0 clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                    borderRadius: 40,
                    fontSize: 'clamp(12px, calc(14 / 1920 * 100vw), 14px)',
                    fontWeight: 500,
                    border: tab.active ? 'none' : '1px solid rgba(255,255,255,0.28)',
                    background: tab.active ? '#fff' : 'rgba(255,255,255,0.08)',
                    color: tab.active ? '#013E37' : 'rgba(255,255,255,0.65)',
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Phase sections */}
      {PHASES.map((phase) => (
        <PhaseSection key={phase.id} phase={phase} />
      ))}

      {/* Bottom spacer before footer */}
      <div style={{ height: 'clamp(40px,3.13vw,60px)' }} />

      <Footer />
    </main>
    </>
  )
}
