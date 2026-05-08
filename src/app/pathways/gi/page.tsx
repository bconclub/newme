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
  { label: 'GastroIntestinal Care Pathways', href: '/pathways/gi', active: true },
  { label: 'Continuity Pathways', href: '/pathways/continuity', active: false },
]

const PHASES: Phase[] = [
  {
    id: 'gi-core',
    heading: 'GastroIntestinal Core',
    description: 'Structured gastrointestinal stabilization for moderate digestive dysfunction, including conditions such IBS, Gastritis, amongst other GI conditions.',
    duration: 'Duration: 4 Weeks',
    whoFor: [
      'Individuals with IBS, GERD, bloating, constipation, or diarrhea',
      'People suffering from certain skin conditions like Psoriasis, Rosacia, Eczema, Urticaria/Hives',
      'Individuals with multiple food intolerances',
      'Individuals with co-morbidities such as Insulin-dependent Type 2 Diabetes, Fatty Liver Type 2, Cardiac conditions',
      'Patients with auto-immune conditions who require structured support to manage digestive symptoms',
    ],
    areasOfFocus: [
      'Identification of food triggers',
      'Elimination and reintroduction of foods',
      'Stabilization of digestive function',
      'Nutritional adequacy during restrictive phases',
    ],
    careItems: [
      { num: '01', title: 'Clinical Oversight & Consultation', desc: 'Guidance from a senior doctor with clinical inputs integrated into your care.' },
      { num: '02', title: 'Dedicated GI Coach Support', desc: 'Weekly consultations with Senior GI-trained coaches along with daily check-ins and dietary review.' },
      { num: '03', title: 'Elimination & Reintroduction Protocols', desc: 'Structured dietary plans based on symptoms, followed by phased reintroduction to identify triggers.' },
      { num: '04', title: 'Symptom Tracking & Dietary Adjustments', desc: 'Continuous monitoring of digestive responses with real-time corrections to nutrition.' },
      { num: '05', title: 'Targeted Supplement Guidance', desc: 'Supplement recommendations aligned with your symptoms and nutritional requirements.' },
      { num: '06', title: 'Mental Health Support', desc: 'Behavioural therapist evaluation for habit change and stress management, with a focus on assessment of behavioral and psychological factors that may impact gut health.' },
      { num: '07', title: 'Movement Readiness & Activity Support', desc: 'Physiotherapy screening and access to guided movement through the NewME Virtual Gym.' },
      { num: '08', title: 'Education & Clinical Guidance', desc: 'Monthly sessions with Dr. Pal and ongoing support to build sustainable gut-friendly habits.' },
    ],
    bannerImg: '/images/pathways/gi-core-banner.jpg',
    bannerHeading: 'Who Is Prescribed The GI CORE Pathway?',
    bannerBody: 'The GI Core pathway is prescribed for individuals who require structured support to identify triggers, stabilize digestion, and build sustainable dietary and lifestyle patterns.',
    bannerOverlay: 'rgba(1,62,55,0.47)',
  },
  {
    id: 'gi-advanced',
    heading: 'GastroIntestinal Advanced',
    description: 'Clinically supervised gastrointestinal care for complex or long-standing digestive conditions requiring deeper medical oversight and coordinated intervention.',
    duration: 'Duration: 4 Weeks',
    whoFor: [
      "Individuals with chronic conditions such as IBD, Crohn's, Ulcerative colitis, SIBO amongst others",
      'Clients with long-standing digestive dysfunction and multiple symptoms',
      'Those on prescription medications with persistent gut-related issues',
      'Cases requiring closer clinical supervision and intensive support',
    ],
    areasOfFocus: [
      'Management of complex gut conditions',
      'Intensive dietary and protocol adjustments',
      'Gut-brain interaction and symptom regulation',
      'Coordinated clinical care and monitoring',
    ],
    careItems: [
      { num: '01', title: 'Direct Clinical Supervision', desc: "Program delivered under Dr. Pal's direct guidance with mid-program consultation." },
      { num: '02', title: 'Senior Medical Team Involvement', desc: 'Initial consultation with senior doctors and coordinated clinical oversight.' },
      { num: '03', title: 'Specialized GI Coaching', desc: 'Weekly sessions with senior GI nutritionists supported by daily check-ins and dietary review.' },
      { num: '04', title: 'Advanced Nutrition Protocols', desc: 'Deeper elimination, reintroduction, and ongoing dietary adjustments based on complex symptoms.' },
      { num: '05', title: 'Therapeutic Gut-Brain Support', desc: 'Weekly therapy sessions and integrative mind-body sessions.' },
      { num: '06', title: 'Symptom Tracking & Clinical Monitoring', desc: 'Close tracking of symptoms with continuous recalibration of care, and access to guided sessions at NewME Virtual Gym.' },
      { num: '07', title: 'Movement & Recovery Integration', desc: 'Physiotherapist screening for fitness readiness assessment and safe exercise guidance.' },
    ],
    bannerImg: '/images/pathways/gi-advanced-banner.jpg',
    bannerHeading: 'Who Is Prescribed The GI ADVANCED Pathway?',
    bannerBody: 'The GI Advanced pathway is prescribed for individuals with complex or long-standing digestive conditions who require intensive support, closer clinical supervision, and coordinated care.',
    bannerOverlay: 'rgba(1,62,55,0.57)',
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
          style={{ fontSize: 'clamp(28px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: 'clamp(12px,1.04vw,20px)' }}
        >
          {phase.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 'clamp(14px,1.46vw,28px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 'clamp(260px,51.04vw,980px)', margin: '0 auto clamp(16px,1.25vw,24px)' }}
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
          <h3 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,1.67vw,32px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(12px,1.04vw,20px)' }}>
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
          <h3 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,1.67vw,32px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(12px,1.04vw,20px)' }}>
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

      {/* What Structured Care Entails */}
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
                <div
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{ fontSize: 'clamp(36px,4.17vw,80px)', fontWeight: 700, color: 'rgba(255,255,255,0.10)', lineHeight: 1, flexShrink: 0, minWidth: 'clamp(36px,4.17vw,80px)', textAlign: 'right' }}
                >
                  {item.num}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(14px,1.25vw,24px)', fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                    {item.title}
                  </p>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
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
          <Image src={phase.bannerImg} alt={phase.bannerHeading} fill unoptimized style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: phase.bannerOverlay }} />
          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(24px,4.17vw,80px) clamp(20px,4.17vw,80px)' }}>
            <h3
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 'clamp(22px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, maxWidth: 'clamp(240px,45.47vw,871px)', marginBottom: 'clamp(12px,1.04vw,20px)' }}
            >
              {phase.bannerHeading}
            </h3>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 'clamp(13px,1.46vw,28px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, maxWidth: 'clamp(240px,56.51vw,1085px)', fontWeight: 500 }}
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

export default function GIPathwayPage() {
  return (
    <>
      <Header />
      <main className="pathway-page">
      {/* ── Atmospheric background — 1920px artboard, scrolls with page ── */}
      <div className="pathway-bg" aria-hidden style={{ height: 6500 }}>
        {/* Green wash 1 — behind hero + GI Core phase */}
        <span className="pathway-ellipse pathway-green-wash" style={{ top: 600, opacity: 0.40 }} />
        <span className="pathway-noise pathway-green-noise" style={{ top: 600 }} />
        {/* Gold accent — top right */}
        <span className="pathway-ellipse pathway-gold-accent" style={{ top: 400, left: 1268 }} />
        {/* Green wash 2 — behind GI Advanced phase */}
        <span className="pathway-ellipse pathway-green-wash pathway-green-wash-2" style={{ top: 3800, opacity: 0.32 }} />
        <span className="pathway-noise pathway-green-noise pathway-green-noise-2" style={{ top: 3800 }} />
        {/* Gold accent — mid page left */}
        <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-2" style={{ top: 3500, left: -625 }} />
        {/* Gold accent — lower right */}
        <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-3" style={{ top: 5500, left: 1268, opacity: 0.4 }} />
      </div>

      {/* Hero — tabs are inside the card, straddling its bottom edge (Figma: tab y=673 in 694px card) */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)', paddingBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)' }}>
        {/* Outer wrapper — positioning context for the tabs, no overflow:hidden */}
        <div style={{ position: 'relative', margin: '0 clamp(12px,1.04vw,20px)' }}>

          {/* Image card — overflow:hidden clips only the image/overlay */}
          <div style={{ position: 'relative', borderRadius: 'clamp(20px, calc(48 / 1920 * 100vw), 48px)', overflow: 'hidden', height: 'clamp(280px,36.15vw,694px)' }}>
            <Image
              src="/images/pathways/gi-hero.jpg"
              alt="GastroIntestinal Care — clinical team"
              fill
              unoptimized
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(1,62,55,0.30) 0%, rgba(1,62,55,0.55) 50%, rgba(1,62,55,0.85) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center', padding: 'clamp(24px,3.13vw,60px) clamp(20px,3.13vw,60px) clamp(56px,4.58vw,88px)' }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 'clamp(28px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: 'clamp(10px,1.04vw,20px)' }}
              >
                GastroIntestinal Care Pathways
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 'clamp(13px,1.04vw,20px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: 'clamp(260px,40.7vw,783px)' }}
              >
                Our two GI pathways are designed to address digestive dysfunction through structured dietary protocols, clinical oversight, and continuous symptom monitoring. Each pathway reflects a different level of gastrointestinal complexity, from moderate instability to long-standing or chronic conditions.
              </motion.p>
            </div>
          </div>

          {/* Tabs — absolute, bottom of card, extending ~24px below the card edge */}
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

      <div style={{ height: 'clamp(40px,3.13vw,60px)' }} />

      <Footer />
    </main>
    </>
  )
}
