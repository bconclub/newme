'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import PageHero from '@/components/option1/PageHero'

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
// Hero — composes <PageHero> (Figma 121:93 template).
// ─────────────────────────────────────────────────────────────────────────────
function FAQHero() {
  return (
    <PageHero
      imageSrc="/clinic/doctor-hero.png"
      imageAlt="NewME clinical care"
      imagePosition="60% center"
      heading={<>Frequently Asked<br />Questions.</>}
      subheading="Everything you need to know about our clinical pathways, team, and commitment to your health."
      headingMaxWidthPx={760}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — 2-column layout: section nav on the left, accordion on the right.
// Switching the sidebar swaps the visible section. First item of the new
// section auto-opens so the page never reads "empty" after a category change.
// On mobile the nav stacks on top of the content (no sticky behaviour).
// ─────────────────────────────────────────────────────────────────────────────
function FAQSections() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0]

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        padding:
          'clamp(60px, calc(100 / 1920 * 100vw), 100px) clamp(20px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 140px)',
      }}
    >
      <div
        className="mx-auto grid items-start gap-[clamp(24px,calc(64/1920*100vw),96px)] grid-cols-1 md:grid-cols-[clamp(220px,calc(320/1920*100vw),320px)_1fr]"
        style={{ maxWidth: 1400 }}
      >
        {/* ── Section nav ───────────────────────────────────────────────────
             Mobile: horizontal scrollable pill strip (no scrollbar visible)
             Desktop (md+): vertical sticky sidebar with plain text buttons  */}
        <nav
          aria-label="FAQ sections"
          className="faq-cat-nav md:sticky md:top-[clamp(80px,calc(120/1920*100vw),120px)] md:flex-col md:overflow-x-visible md:flex-wrap"
          style={{
            /* Mobile: row with overflow-x scroll */
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            flexWrap: 'nowrap',
            gap: 10,
            paddingBottom: 4,
          }}
        >
          {SECTIONS.map((s) => {
            const isActive = s.id === activeId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveId(s.id)
                  setOpenIdx(0)
                }}
                aria-current={isActive ? 'true' : undefined}
                className="font-[family-name:var(--font-bricolage)] shrink-0"
                style={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: 'clamp(13px, calc(15 / 1920 * 100vw), 15px)',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  // Pill shape — matches site EyebrowPill
                  height: 'clamp(36px, calc(44 / 1920 * 100vw), 44px)',
                  paddingLeft: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                  paddingRight: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                  borderRadius: 9999,
                  border: isActive
                    ? '1px solid #FEF272'
                    : '1px solid rgba(255,255,255,0.30)',
                  background: isActive
                    ? 'rgba(254,242,114,0.12)'
                    : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#FEF272' : 'rgba(255,255,255,0.78)',
                  transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                }}
              >
                {s.heading}
              </button>
            )
          })}
        </nav>

        {/* ── Active section content (heading + accordion list) ─────────── */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(58 / 1920 * 100vw), 58px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            }}
          >
            {active.heading}
          </h2>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{
              fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.55,
              maxWidth: 720,
              marginBottom: 'clamp(28px, calc(56 / 1920 * 100vw), 56px)',
            }}
          >
            {active.sub}
          </p>

          {/* Hairline divider above first item — mirrors design reference */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }} />

          {active.items.map((item, i) => (
            <AccordionItem
              key={`${active.id}-${i}`}
              question={item.q}
              answer={item.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </div>
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
          padding: 'clamp(20px, calc(32 / 1920 * 100vw), 32px) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(16px, calc(22 / 1920 * 100vw), 24px)',
            lineHeight: 1.3,
            color: isOpen ? '#FEF272' : '#ffffff',
            transition: 'color 0.2s ease',
            flex: 1,
          }}
        >
          {question}
        </span>

        {/* +/− glyph — borderless to match the reference. Open = minus, closed = plus. */}
        <span
          aria-hidden
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
            height: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
            color: isOpen ? '#FEF272' : 'rgba(255,255,255,0.75)',
            flexShrink: 0,
            transition: 'color 0.2s ease',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 12h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {!isOpen && (
              <path
                d="M12 4v16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
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
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.7,
                paddingBottom: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
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

