'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import PageHero from '@/components/option1/PageHero'
import PathwayTabs from '@/components/option1/PathwayTabs'
import EyebrowPill from '@/components/option1/EyebrowPill'

const EASE = [0.22, 1, 0.36, 1] as const

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
    bannerImg: '/pathways/cp1%20vertical%20banners.webp',
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
    bannerImg: '/pathways/cp%202%20vertical%20banners.webp',
    bannerHeading: 'Who Is Prescribed The NewME Movement Pathway?',
    bannerBody: 'NewME Movement is prescribed for individuals who want to maintain physical fitness through structured workouts, without the need for ongoing clinical or lifestyle intervention.',
    bannerOverlay: 'rgba(1,62,55,0.47)',
  },
]

function Dot() {
  return <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#629675', marginTop: 6, flexShrink: 0 }} />
}

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <section id={phase.id} style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(60px,5.21vw,100px)' }}>

      {/* Heading + description + duration â€” left aligned */}
      <div style={{ paddingLeft: 'clamp(16px,6.25vw,120px)', paddingRight: 'clamp(16px,6.25vw,120px)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(28px, calc(58 / 1920 * 100vw), 58px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: 'clamp(12px,1.04vw,20px)' }}
        >
          {phase.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 'clamp(14px,1.25vw,22px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, maxWidth: 720, marginBottom: 'clamp(16px,1.25vw,24px)' }}
        >
          {phase.description}
        </motion.p>

        {/* Duration pill — uses the brand EyebrowPill (gold variant). */}
        <div style={{ display: 'inline-flex', marginBottom: 'clamp(24px,2.08vw,40px)' }}>
          <EyebrowPill
            variant="gold"
            style={{
              height: 'clamp(38px, calc(44 / 1920 * 100vw), 44px)',
              fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
              paddingLeft: 18,
              paddingRight: 18,
            }}
          >
            {phase.duration}
          </EyebrowPill>
        </div>
      </div>

      {/* 2-column info cards â€” stacks on mobile */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 'clamp(10px,1.04vw,20px)', padding: '0 clamp(16px,6.25vw,120px) clamp(24px,2.08vw,40px)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 'clamp(14px,1.04vw,20px)',
            padding: 'clamp(16px,2.08vw,36px)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <h3 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(16px,1.25vw,22px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(12px,1.04vw,20px)' }}>
            Who It&apos;s For:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,0.83vw,14px)' }}>
            {phase.whoFor.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Dot />
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,0.9vw,16px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 'clamp(14px,1.04vw,20px)',
            padding: 'clamp(16px,2.08vw,36px)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <h3 className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(16px,1.25vw,22px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(12px,1.04vw,20px)' }}>
            Areas Of Focus:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,0.83vw,14px)' }}>
            {phase.areasOfFocus.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Dot />
                <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,0.9vw,16px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What Structured Care Entails â€” left aligned */}
      <div style={{ padding: '0 clamp(16px,6.25vw,120px)' }}>
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(16px,1.25vw,22px)', fontWeight: 600, color: '#fff', marginBottom: 'clamp(16px,1.67vw,32px)', paddingTop: 'clamp(12px,1.04vw,20px)' }}
        >
          What Structured Care Entails:
        </motion.h3>

        <div style={{ maxWidth: 880 }}>
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
                  style={{ fontSize: 'clamp(28px,3vw,56px)', fontWeight: 700, color: 'rgba(255,255,255,0.10)', lineHeight: 1, flexShrink: 0, minWidth: 'clamp(28px,3vw,56px)', textAlign: 'right' }}
                >
                  {item.num}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(14px,1.04vw,18px)', fontWeight: 600, color: '#fff', marginBottom: 4 }}>{item.title}</p>
                  <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 'clamp(13px,0.9vw,16px)', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
              {ci < phase.careItems.length - 1 && <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prescription banner */}
      <div style={{ padding: 'clamp(32px,3.13vw,60px) clamp(16px,6.25vw,120px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ position: 'relative', borderRadius: 'clamp(20px,2.92vw,56px)', overflow: 'hidden', minHeight: 'clamp(160px,21.04vw,404px)' }}
        >
          <Image src={phase.bannerImg} alt={phase.bannerHeading} fill unoptimized style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: phase.bannerOverlay }} />
          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(24px,4.17vw,80px)' }}>
            <h3
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 'clamp(20px,2.5vw,48px)', fontWeight: 600, color: '#fff', lineHeight: 1.15, maxWidth: 720, marginBottom: 'clamp(10px,1.04vw,20px)' }}
            >
              {phase.bannerHeading}
            </h3>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 'clamp(13px,1.04vw,18px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, maxWidth: 640, fontWeight: 500 }}
            >
              {phase.bannerBody}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ContinuityPathwayPage() {
  return (
    <>
      <Header />
      <main className="pathway-page">
        <div className="pathway-bg" aria-hidden style={{ height: 5500 }}>
          <span className="pathway-ellipse pathway-green-wash" style={{ top: 600, opacity: 0.40 }} />
          <span className="pathway-noise pathway-green-noise" style={{ top: 600 }} />
          <span className="pathway-ellipse pathway-gold-accent" style={{ top: 400, left: 1268 }} />
          <span className="pathway-ellipse pathway-green-wash pathway-green-wash-2" style={{ top: 3400, opacity: 0.32 }} />
          <span className="pathway-noise pathway-green-noise pathway-green-noise-2" style={{ top: 3400 }} />
          <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-2" style={{ top: 3100, left: -625 }} />
        </div>

        {/* Hero — uses shared PageHero template (matches every other internal page) */}
        <PageHero
          heading="Continuity Pathways"
          subheading="The Continuity pathways are designed to support long-term stability through continued accountability, monitoring, and lifestyle alignment. They are recommended after structured care to help maintain progress and prevent relapse."
          overlayImage="/images/pathways/continuity-anatomy.png"
          overlayImageAlt="Glowing upper body nervous system illustration"
          // The continuity anatomy is a wide upper-body silhouette, so at
          // `height: 125%, width: auto` it ends up ~45% of the card width
          // — visibly larger than the metabolic thyroid and GI organs
          // overlays on the sibling pages. Cap the width so all three
          // pathway heros read at a comparable horizontal footprint.
          overlayStyle={{
            right: '-5%',
            bottom: '-15%',
            height: '125%',
            maxWidth: 'clamp(280px, calc(560 / 1920 * 100vw), 560px)',
          }}
          pathwayBlobs
          cta={<PathwayTabs active="/pathways/continuity" />}
        />

        {PHASES.map((phase) => (
          <PhaseSection key={phase.id} phase={phase} />
        ))}

        <div style={{ height: 'clamp(40px,3.13vw,60px)' }} />
        <Footer />
      </main>
    </>
  )
}
