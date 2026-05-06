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
  { label: 'Metabolic Care Pathways', href: '/pathways/metabolic', active: true },
  { label: 'GastroIntestinal Care Pathways', href: '/pathways/gi', active: false },
  { label: 'Continuity Pathways', href: '/pathways/continuity', active: false },
]

const PHASES: Phase[] = [
  {
    id: 'reset',
    heading: 'Reset',
    description: 'Foundational stabilization of lifestyle to establish baseline awareness and consistent habits before deeper metabolic work begins.',
    duration: 'Duration: 4 Weeks',
    whoFor: [
      'Individuals new to structured lifestyle work',
      'Inconsistent sleep and eating patterns',
      'Fatigue, cravings, or early digestive discomfort',
    ],
    areasOfFocus: [
      'Food quality correction',
      'Habit structure and daily routine',
      'Foundational lifestyle improvements',
    ],
    careItems: [
      { num: '01', title: 'Dedicated Clinical Health Coach', desc: 'Assigned as your accountability partner with weekly check-ins, daily support, and guided progress tracking.' },
      { num: '02', title: 'Foundational Nutrition Guidance', desc: 'Balanced plate approach with daily meal reviews to improve food quality and build consistency.' },
      { num: '03', title: 'Lifestyle & Habit Structuring', desc: 'Daily habit logs, goal tracking, and routine correction to establish stable patterns.' },
      { num: '04', title: 'Movement Readiness & Activity Support', desc: 'Physiotherapy screening, step goals, and beginner movement routines to safely build activity.' },
      { num: '05', title: 'Stress Regulation & Breathwork', desc: 'Introductory practices to support nervous system balance and reduce lifestyle-driven stress.' },
      { num: '06', title: 'Clinical Review & Guidance', desc: 'Case and blood work reviewed by the medical team with insights integrated into your care. (Specialist referrals if clinically necessary)' },
      { num: '07', title: 'Education & Community Support', desc: 'Group sessions, masterclasses, and peer support to reinforce learning and consistency.' },
    ],
    bannerImg: '/images/pathways/reset-banner.jpg',
    bannerHeading: 'Who Is Prescribed The RESET Pathway?',
    bannerBody: 'RESET is best suited for patients who need to stabilize the body and establish consistency before deeper metabolic correction begins.',
    bannerOverlay: 'rgba(1,62,55,0.47)',
  },
  {
    id: 'rebuild',
    heading: 'Rebuild',
    description: 'Structured metabolic correction and addressing associated gut concerns such as bloating and acidity, with measurable tracking to drive consistent and sustained health improvements.',
    duration: 'Duration: 12 Weeks',
    whoFor: [
      'Individuals with metabolic or hormonal conditions',
      'Those requiring sustained lifestyle correction',
      'Cases where short-term intervention is not sufficient',
    ],
    areasOfFocus: [
      'Structured nutrition planning',
      'Macronutrient balance and meal timing',
      'Habit tracking and measurable progress',
      'Condition-specific support for metabolic and hormonal conditions such as diabetes, thyroid disorders, PCOS, and fatty liver, among others.',
    ],
    careItems: [
      { num: '01', title: 'Dedicated Clinical Health Coach', desc: 'Ongoing support with weekly coaching calls, daily accountability, and continuous guidance.' },
      { num: '02', title: 'Structured Nutrition System', desc: 'Progression from foundational eating patterns to macro awareness, meal timing, and metabolic flexibility.' },
      { num: '03', title: 'Clinical Monitoring & Case Review', desc: 'Blood work analysis, symptom tracking, and ongoing evaluation by the medical team.' },
      { num: '04', title: 'Habit Tracking & Measurable Progress', desc: 'Daily logs, structured goals, and transition into data-based tracking for sustained improvement.' },
      { num: '05', title: 'Disease-Specific Support or Coaching', desc: 'Targeted guidance for metabolic and hormonal conditions such as PCOS, thyroid, diabetes, fatty liver amongst others.' },
      { num: '06', title: 'Movement & Physical Activity Integration', desc: 'Step goals, structured routines, and access to guided workouts aligned with your capacity.' },
      { num: '07', title: 'Sleep, Stress & Recovery Support', desc: 'Mindfulness, breathwork, and structured practices to improve sleep and regulate stress.' },
      { num: '08', title: 'Education & Ongoing Learning', desc: 'Access to expert-led discussions, masterclasses and continuous knowledge support.' },
    ],
    bannerImg: '/images/pathways/rebuild-banner.jpg',
    bannerHeading: 'Who Is Prescribed The REBUILD Pathway?',
    bannerBody: 'The REBUILD pathway is prescribed to patients who are looking to address underlying metabolic and gut imbalances through structured, measurable, and sustained intervention.',
    bannerOverlay: 'rgba(1,62,55,0.47)',
  },
  {
    id: 'sustain',
    heading: 'Sustain',
    description: 'Long-term consolidation of metabolic stability and relapse prevention through continued structured care.',
    duration: 'Duration: 24 Weeks',
    whoFor: [
      'Individuals with long-standing or multiple health conditions',
      'Those requiring extended support for stable outcomes',
      'Cases where long-term consistency is essential',
    ],
    areasOfFocus: [
      'Long-term habit consistency',
      'Lifestyle flexibility and real-life application',
      'Symptom stability and relapse prevention',
      'Designed for long-standing conditions like hypertension, high cholesterol, chronic gastritis, and gestational diabetes, where stability and relapse prevention become critical.',
    ],
    careItems: [
      { num: '01', title: 'Dedicated Clinical Health Coach', desc: 'Continued guidance with structured check-ins to reinforce long-term consistency and independence.' },
      { num: '02', title: 'Advanced Nutrition Planning', desc: 'Long-term meal structuring, macro flexibility, and nutrition autonomy for sustainable habits.' },
      { num: '03', title: 'Disease-Specific Support or Coaching', desc: 'Condition-specific support for moderate to advanced metabolic and hormonal conditions, including hypertension, cholesterol, gastritis, gestational diabetes and more, often with overlapping conditions and complexities.' },
      { num: '04', title: 'Long-Term Habit Reinforcement', desc: 'Structured tracking and real-life application of habits across varying environments and routines.' },
      { num: '05', title: 'Relapse Prevention Planning', desc: 'Proactive strategies to manage setbacks and maintain progress over time.' },
      { num: '06', title: 'Movement & Fitness Integration', desc: 'Continued activity support, including a wide range of workouts from strength and cardio to yoga with the NewME virtual gym.' },
      { num: '07', title: 'Sleep, Stress & Lifestyle Stability', desc: 'Ongoing practices to maintain balance across stress, recovery, and daily routines.' },
      { num: '08', title: 'Education, Community & Support Systems', desc: 'Continued access to expert guidance, group sessions, and peer accountability.' },
    ],
    bannerImg: '/images/pathways/sustain-banner.jpg',
    bannerHeading: 'Who Is Prescribed The SUSTAIN Pathway?',
    bannerBody: "The SUSTAIN pathway becomes a way for patients to inculcate the good habits they've learned in a sustained and integrated way into everyday life.",
    bannerOverlay: 'rgba(1,62,55,0.59)',
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

export default function MetabolicPathwayPage() {
  return (
    <>
      <Header />
      <main className="pathway-page">
      {/* ── Atmospheric background — 1920px artboard, scrolls with page ── */}
      <div className="pathway-bg" aria-hidden style={{ height: 8000 }}>
        {/* Green wash 1 — behind hero + Reset phase */}
        <span className="pathway-ellipse pathway-green-wash" style={{ top: 600, opacity: 0.40 }} />
        <span className="pathway-noise pathway-green-noise" style={{ top: 600 }} />
        {/* Gold accent — top right */}
        <span className="pathway-ellipse pathway-gold-accent" style={{ top: 400, left: 1268 }} />
        {/* Green wash 2 — behind Rebuild + Sustain phases */}
        <span className="pathway-ellipse pathway-green-wash pathway-green-wash-2" style={{ top: 4200, opacity: 0.32 }} />
        <span className="pathway-noise pathway-green-noise pathway-green-noise-2" style={{ top: 4200 }} />
        {/* Gold accent — mid page left */}
        <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-2" style={{ top: 3900, left: -625 }} />
        {/* Gold accent — lower right */}
        <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-3" style={{ top: 6800, left: 1268, opacity: 0.4 }} />
      </div>

      {/* Hero — tabs straddle the card's bottom edge (Figma: tab y=673 in 694px card) */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)', paddingBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)' }}>
        <div style={{ position: 'relative', margin: '0 clamp(12px,1.04vw,20px)' }}>

          {/* Image card */}
          <div style={{ position: 'relative', borderRadius: 'clamp(16px,1.25vw,24px)', overflow: 'hidden', height: 'clamp(280px,36.15vw,694px)' }}>
            <Image
              src="/images/pathways/metabolic-hero.jpg"
              alt="Metabolic Care — doctor with patient"
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
                Metabolic Care Pathways
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: 'clamp(260px,40.7vw,783px)' }}
              >
                These pathways are designed to address metabolic health through structured lifestyle correction, guided accountability, and continuous monitoring. Each pathway reflects a different level of need, from foundational stabilization to long-term sustainability.
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
