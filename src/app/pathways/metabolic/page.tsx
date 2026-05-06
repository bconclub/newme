'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

function PathwayBg() {
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #013E37 0%, rgba(1,62,55,0.6) 35%, transparent 60%)' }} />
      <div style={{ position: 'absolute', width: '200vw', height: '200vw', left: '-30%', top: '-40vw', background: 'radial-gradient(ellipse, #629675 0%, #013E37 65%)', borderRadius: '50%', filter: 'blur(clamp(160px,20vw,300px))', opacity: 0.35 }} />
      <div style={{ position: 'absolute', width: 'clamp(260px,45vw,680px)', height: 'clamp(260px,45vw,680px)', right: 'clamp(-200px,-12vw,-60px)', top: '8%', background: '#FEF272', borderRadius: '50%', filter: 'blur(clamp(120px,15vw,220px))', opacity: 0.18 }} />
    </div>
  )
}

const PHASES = [
  {
    id: 'reset',
    tag: 'Reset',
    duration: '4-Week Foundation Phase',
    badge: 'STARTING POINT',
    heading: 'Build the foundation before anything else.',
    body: 'Most people skip this step. They jump straight into diets and routines and wonder why nothing sticks. Reset is a four-week structured stabilisation phase that corrects the habits and patterns driving your symptoms — before any deeper intervention begins.',
    who: 'New to structured care, inconsistent habits, or returning after a gap.',
    tags: ['Habits first', 'Daily coach access', 'Clinically reviewed'],
    bullets: [
      'Dedicated clinical health coach with direct daily text access and weekly progress calls',
      'Blood work and case reviewed by the medical team with insights shared directly with you',
      'Daily meal plate review with real-time qualitative feedback from your coach',
      'Physiotherapist and behavioral therapist screening, breathwork and stress-regulation practices',
      'Weekly Dr. Pal live health education sessions, habit tracking and 180+ Virtual Gym sessions per week',
    ],
    price: '$200 / month',
    priceNote: '4-week phase · $6.67 / day',
    accent: '#629675',
  },
  {
    id: 'rebuild',
    tag: 'Rebuild',
    duration: '12-Week Metabolic Phase',
    badge: 'MOST COMMON',
    heading: 'Twelve weeks of targeted metabolic correction.',
    body: 'Rebuild is built around your diagnosis. Real metabolic change takes time — Rebuild gives it the twelve weeks it needs, built around your specific symptoms and what your body actually needs to shift. You\'ve been through enough to know a generic plan won\'t cut it.',
    who: 'Existing metabolic diagnosis, inconsistent past results, complex symptoms.',
    tags: ['Built around your diagnosis', '12 weeks of targeted correction', 'Progress you can measure'],
    bullets: [
      'Dedicated clinical health coach with daily text access and weekly accountability calls',
      'Condition-specific coaching for thyroid, diabetes, fatty liver and metabolic health',
      'Nutrition progression from balanced plate guidance to calorie awareness, macro tracking and metabolic flexibility',
      'Blood work and case reviewed by the medical team, with ongoing symptom and progress monitoring',
      'Physio and behavioural therapist screening, Dr. Pal live sessions and 180+ Virtual Gym sessions per week',
    ],
    price: '$699 / 3 months',
    priceNote: '12-week phase · $7.77 / day',
    accent: '#FEF272',
  },
  {
    id: 'sustain',
    tag: 'Sustain',
    duration: '24-Week Comprehensive Phase',
    badge: 'MOST INTENSIVE',
    heading: 'Twenty-four weeks. Built so results hold.',
    body: 'Complex conditions, overlapping diagnoses, a history of losing progress. This phase is built for exactly that. Twenty-four weeks of structured clinical support, built for complexity and designed so results hold when the phase ends.',
    who: 'Multiple diagnoses, long-standing conditions, previous programs that didn\'t hold.',
    tags: ['24 weeks of structure', 'Relapse prevention built in', 'Results that hold'],
    bullets: [
      'A dedicated clinical health coach, condition-specific coaching and weekly accountability calls across all 24 weeks',
      'Weekly 1:1 virtual personal trainer sessions via the Virtual Gym',
      'Macro flexibility and nutrition autonomy guidance for sustainable, independent eating',
      'Relapse prevention planning built into the final stage so results hold when the phase ends',
      'Full symptom, energy and progress tracking throughout, with specialist referrals if required',
    ],
    price: '$899 / 6 months',
    priceNote: '24-week phase · $4.99 / day',
    accent: '#FEF272',
  },
]

export default function MetabolicPathwayPage() {
  return (
    <main style={{ background: '#013E37', color: '#fff', overflowX: 'hidden' }}>
      <PathwayBg />
      <Header />

      {/* ── Page intro ── */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(110px,9.5vw,150px)', paddingBottom: 'clamp(40px,3.13vw,60px)', paddingLeft: 'clamp(20px,7.29vw,140px)', paddingRight: 'clamp(20px,7.29vw,140px)' }}>
        <Link href="/pathways" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none', marginBottom: 24 }} className="font-[family-name:var(--font-urbanist)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M9 2.5L4 7l5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          All Pathways
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 9999, padding: '0 18px', height: 40, backdropFilter: 'blur(2px)', marginBottom: 20 }}>
          <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 13, fontWeight: 300, color: '#fff' }}>Metabolic Care Pathway</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(30px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, maxWidth: 860, marginBottom: 20 }}>
          Three Phases. One Metabolic System.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 'clamp(15px,1.15vw,22px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 700 }}>
          The Metabolic Care Pathway contains three phases — Reset, Rebuild, and Sustain. Your assessment determines which phase is right for your body right now.
        </motion.p>
      </section>

      {/* ── Phase cards ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 clamp(20px,7.29vw,140px) clamp(80px,6.25vw,120px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,1.25vw,24px)' }}>
          {PHASES.map((phase, i) => (
            <motion.article
              key={phase.id}
              id={phase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
              style={{
                background: 'linear-gradient(180deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 'clamp(16px,1.25vw,24px)',
                backdropFilter: 'blur(14px)',
                overflow: 'hidden',
              }}
            >
              {/* Card header strip */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(16px,1.25vw,24px) clamp(20px,2.08vw,40px)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(20px,1.87vw,36px)', fontWeight: 700, color: phase.accent }}>{phase.tag}</span>
                <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 9, fontWeight: 800, color: '#013E37', background: phase.accent, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.10em' }}>{phase.badge}</span>
                <span className="font-[family-name:var(--font-urbanist)]" style={{ marginLeft: 'auto', fontSize: 11, color: '#629675', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{phase.duration}</span>
              </div>

              {/* Card body — 2 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,2.08vw,40px)', padding: 'clamp(20px,2.08vw,40px)' }}>
                {/* Left */}
                <div>
                  <h3 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,1.46vw,28px)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>{phase.heading}</h3>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,0.78vw,15px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, marginBottom: 16 }}>{phase.body}</p>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: 18 }}>Best for: {phase.who}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
                    {phase.tags.map((tag) => (
                      <span key={tag} className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.20)', borderRadius: 9999, padding: '4px 12px' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,1.46vw,28px)', fontWeight: 700, color: phase.accent }}>{phase.price}</span>
                  </div>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>{phase.priceNote}</p>
                  <Link href="/assessment" style={{ textDecoration: 'none' }}>
                    <span className="font-[family-name:var(--font-bricolage)]" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#FEF272', color: '#013E37', borderRadius: 9999, fontSize: 14, fontWeight: 600, padding: '11px 26px', cursor: 'pointer' }}>
                      Start my assessment →
                    </span>
                  </Link>
                </div>

                {/* Right — bullets */}
                <div>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 10, color: '#629675', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 14 }}>What&apos;s included</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {phase.bullets.map((b, bi) => (
                      <div key={bi} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: phase.accent, marginTop: 5, flexShrink: 0 }} />
                        <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(12px,0.68vw,13px)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
