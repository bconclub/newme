'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

// ─── FAQ data — 3 sections from Figma 122:17400 ───────────────────────────
const SECTIONS = [
  {
    id: 'pathways',
    heading: 'The Clinical Pathways',
    sub: 'All you need to know about each Clinical Pathway, who it is designed for, and what it involves.',
    items: [
      {
        q: 'How do I know which Clinical Pathway is right for me?',
        a: 'Your pathway is recommended based on your assessment results. The assessment reviews your symptoms, health history, and prior attempts, and takes approximately five minutes to complete. A specific pathway recommendation is provided upon completion.',
      },
      {
        q: 'What is the difference between the five Clinical Pathways?',
        a: 'Each pathway targets a different clinical need. Metabolic pathways (Reset, Rebuild, Sustain) address fat regulation, insulin sensitivity, and metabolic repair at different stages. The GI pathways (Core and Advanced) focus on gut function and motility. Continuity tracks (NewME 360 and Movement) are long-term maintenance programmes for those who have completed an initial pathway.',
      },
      {
        q: 'What does a personalised nutrition protocol actually mean?',
        a: 'Your nutrition protocol is specific to your metabolic markers, gut markers, lifestyle, and food preferences. It is not a generic meal plan — it is built around your clinical data and adjusted over the course of your pathway as your markers improve.',
      },
      {
        q: 'Can I switch my Clinical Pathway once I\'ve started?',
        a: 'Pathway transitions are reviewed clinically. If your initial assessment indicates one pathway and your progress markers suggest a different need, your clinical team can recommend a pathway change. Self-directed switching is not permitted — all transitions are guided by your clinician.',
      },
    ],
  },
  {
    id: 'clinical',
    heading: 'Clinical and Medical',
    sub: 'NewME Clinical Pathways are clinically informed. Here is what that means in practice.',
    items: [
      {
        q: 'Is NewME a medical service?',
        a: 'NewME is a structured clinical programme led by a licensed physician. While it is not a replacement for emergency or primary care, all pathways are clinically designed and overseen by Dr. Pal and our licensed clinical team. Participants with active medical conditions are reviewed before onboarding.',
      },
      {
        q: 'Are your outcomes evidence-based?',
        a: 'Yes. All NewME pathways draw on peer-reviewed research in metabolic medicine, gut health, and lifestyle medicine. Outcome data from participants is tracked throughout, and protocol adjustments are made based on clinical markers rather than subjective experience alone.',
      },
      {
        q: 'Do I get to speak with Dr Pal directly?',
        a: 'Dr. Pal is involved in protocol design and clinical oversight for all pathways. Direct consultations with Dr. Pal are available within the NewME 360 Continuity track. All other pathways are managed by our specialist clinical team under Dr. Pal\'s supervision.',
      },
      {
        q: 'I have a diagnosed condition, multiple health concerns, and I\'m on medication. Can I still join?',
        a: 'In most cases, yes. NewME is specifically designed for people with complex health histories. Your onboarding assessment includes a full health and medication review. Our clinical team will confirm suitability before your pathway begins and co-ordinate with your existing healthcare providers where needed.',
      },
      {
        q: 'Is NewME suitable if I am pregnant or breastfeeding?',
        a: 'NewME pathways are not recommended during pregnancy or while breastfeeding. If you are planning a pregnancy, please inform your clinical team before beginning a pathway.',
      },
      {
        q: 'Is there an age requirement?',
        a: 'NewME pathways are available for adults aged 18 and above. There is no upper age limit — our programmes are designed to accommodate older adults with appropriate clinical adjustments.',
      },
      {
        q: 'What if my symptoms get worse?',
        a: 'If your symptoms worsen during your pathway, you have direct access to your clinical team. Protocols are reviewed and adjusted based on your reported experience and clinical markers. In the event of a medical emergency, you should contact emergency services immediately.',
      },
      {
        q: 'Is my data private?',
        a: 'Yes. All health data you share with NewME is treated with strict medical confidentiality. Your data is never sold or shared with third parties. We comply with applicable health data protection regulations.',
      },
    ],
  },
  {
    id: 'pricing',
    heading: 'Pricing and Commitment',
    sub: 'Clear answers on cost, payment terms, pause policy, and refund eligibility.',
    items: [
      {
        q: 'How much does it cost?',
        a: 'Pathway pricing varies based on the programme selected and its duration. Full pricing details are provided after your assessment, once your recommended pathway is confirmed. We offer structured payment options for all programmes.',
      },
      {
        q: 'Can I pause my Clinical Pathway?',
        a: 'Pause requests are reviewed on a case-by-case basis. A pause of up to 30 days is available for medical or personal reasons with prior notice to your clinical team. Pathways cannot be paused indefinitely.',
      },
      {
        q: 'What is your refund policy?',
        a: 'Refunds are available within 7 days of pathway commencement if no clinical sessions have been delivered. After the first clinical session, refunds are not available. Please review our full refund policy before enrolling.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="newme-page">
        <FAQHero />
        <FAQSections />
      </main>
      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — Figma 122:17409 — 1880×694 card
// "Frequently Asked Questions"
// ─────────────────────────────────────────────────────────────────────────────
function FAQHero() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(80 / 1920 * 100vw), 80px)',
        paddingLeft: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        paddingRight: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        paddingBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 'clamp(20px, calc(48 / 1920 * 100vw), 48px)',
          height: 'clamp(320px, calc(694 / 1920 * 100vw), 694px)',
          background: '#0E2827',
        }}
      >
        {/* Hero image */}
        <div className="absolute inset-0">
          <Image
            src="/clinic/doctor-hero.png"
            alt="NewME clinical care"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1880px"
            className="object-cover [object-position:60%_center] md:object-center"
          />
        </div>

        {/* Pine gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
            opacity: 0.92,
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 44%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0) 62%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 44%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0) 62%)',
          }}
        />

        {/* Content — center-aligned per site-wide hero sweep. */}
        <div
          className="relative z-10 flex flex-col justify-end items-center h-full text-center"
          style={{
            padding: 'clamp(24px, calc(60 / 1920 * 100vw), 60px) clamp(24px, calc(60 / 1920 * 100vw), 60px) clamp(48px, calc(88 / 1920 * 100vw), 88px)',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(30px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              maxWidth: 'clamp(300px, calc(760 / 1920 * 100vw), 760px)',
            }}
          >
            Frequently Asked<br />Questions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 1.6,
              opacity: 0.85,
              maxWidth: 'clamp(260px, calc(783 / 1920 * 100vw), 783px)',
              marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            Everything you need to know about our clinical pathways, team, and commitment to your health.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ accordion sections
// ─────────────────────────────────────────────────────────────────────────────
function FAQSections() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(60px, calc(100 / 1920 * 100vw), 100px) clamp(20px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 140px)',
      }}
    >
      {SECTIONS.map((section, si) => (
        <div key={section.id}>
          <FAQSection section={section} index={si} />
          {/* Figma: full-width hairline dividers at y=1950 (after section 1) and y=3354 (after section 2) */}
          {si < SECTIONS.length - 1 && (
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.18)',
                marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
                marginBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function FAQSection({
  section,
  index,
}: {
  section: (typeof SECTIONS)[number]
  index: number
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(index === 0 ? 0 : null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
      style={{
        maxWidth: 1193,
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)' }}>
        <h2
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(24px, calc(56 / 1920 * 100vw), 56px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            marginBottom: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
          }}
        >
          {section.heading}
        </h2>
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          {section.sub}
        </p>
      </div>

      {/* Hairline divider above first item */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }} />

      {/* Accordion items */}
      {section.items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.q}
          answer={item.a}
          isOpen={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </motion.div>
  )
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: 'clamp(18px, calc(28 / 1920 * 100vw), 28px) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
            lineHeight: 1.35,
            flex: 1,
          }}
        >
          {question}
        </span>

        {/* Plus / Minus icon */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.35)',
            color: '#fff',
            flexShrink: 0,
            transition: 'background 0.2s, border-color 0.2s, transform 0.3s',
            background: isOpen ? 'rgba(254,242,114,0.15)' : 'transparent',
            borderColor: isOpen ? 'rgba(254,242,114,0.5)' : 'rgba(255,255,255,0.35)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1v12M1 7h12" stroke={isOpen ? '#FEF272' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{
                fontSize: 'clamp(13px, calc(17 / 1920 * 100vw), 17px)',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.7,
                paddingBottom: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                maxWidth: 900,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
