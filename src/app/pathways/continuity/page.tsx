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
    id: '360',
    tag: 'NewME 360',
    duration: 'Ongoing Continuity Program',
    badge: 'FULL WRAP-AROUND',
    heading: 'Complete clinical continuity after your phase.',
    body: "NewME 360 is for clients who have completed a core pathway phase and want to maintain momentum, accountability and clinical access without starting a new phase from scratch. It's structured support that keeps your results intact as your life evolves.",
    who: 'Clients who have completed Reset, Rebuild, Sustain, GI Core or GI Advanced.',
    tags: ['Post-phase continuity', 'Ongoing accountability', 'Clinical access retained'],
    bullets: [
      'Continued clinical health coach access with regular check-ins and progress reviews',
      'Ongoing blood work interpretation and metabolic monitoring',
      'Maintenance nutrition and lifestyle framework adapted as your life changes',
      'Priority access to Dr. Pal\'s monthly live education sessions',
      'Full Virtual Gym access with 180+ sessions per week',
      'Specialist check-ins if symptoms re-emerge or new concerns arise',
    ],
    price: 'From $150 / month',
    priceNote: 'Flexible continuity · cancel anytime',
    accent: '#FEF272',
  },
  {
    id: 'movement',
    tag: 'NewME Movement',
    duration: 'Movement & Recovery Program',
    badge: 'BODY-FOCUSED',
    heading: 'Movement and recovery as clinical tools.',
    body: 'NewME Movement is a clinically supervised movement and physiotherapy program designed to complement any metabolic or GI phase. It addresses joint pain, stiffness, recovery, and physical performance as clinical outcomes — not afterthoughts.',
    who: 'Any client experiencing joint pain, stiffness, poor recovery, or wanting structured physical support alongside their pathway.',
    tags: ['Physio-led sessions', 'Movement as medicine', 'Integrated with your pathway'],
    bullets: [
      'Weekly 1:1 virtual physiotherapist sessions focused on your specific movement concerns',
      'Personalised mobility and recovery protocol built around your health history',
      'Breathwork and nervous system regulation practices included',
      'Coordination with your clinical health coach to align movement with nutrition and recovery',
      'Progress tracked across strength, mobility, pain levels and energy',
      'Can run alongside any active pathway phase or as a standalone program',
    ],
    price: 'From $180 / month',
    priceNote: 'Movement-focused · flexible scheduling',
    accent: '#629675',
  },
]

export default function ContinuityPathwayPage() {
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
          <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 13, fontWeight: 300, color: '#fff' }}>Continuity Pathways</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(30px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.05, maxWidth: 860, marginBottom: 20 }}>
          After Your Phase. The Work Continues.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 'clamp(15px,1.15vw,22px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 700 }}>
          Continuity Pathways are designed to maintain results, prevent relapse, and provide structured support beyond the core phases. Available standalone or as a follow-on to any pathway.
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
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(16px,1.25vw,24px) clamp(20px,2.08vw,40px)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(20px,1.87vw,36px)', fontWeight: 700, color: phase.accent }}>{phase.tag}</span>
                <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 9, fontWeight: 800, color: '#013E37', background: phase.accent, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.10em' }}>{phase.badge}</span>
                <span className="font-[family-name:var(--font-urbanist)]" style={{ marginLeft: 'auto', fontSize: 11, color: '#629675', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{phase.duration}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,2.08vw,40px)', padding: 'clamp(20px,2.08vw,40px)' }}>
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
