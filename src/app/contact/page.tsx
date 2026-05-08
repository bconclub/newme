'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import PageHero from '@/components/option1/PageHero'
import EyebrowPill from '@/components/option1/EyebrowPill'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="newme-page">
        <ContactHero />
        <ContactBody />
      </main>
      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — composes <PageHero> (Figma 121:93 template).
// ─────────────────────────────────────────────────────────────────────────────
function ContactHero() {
  return (
    <PageHero
      imageSrc="/clinic/virtual-clinic-hero.webp"
      imageAlt="NewME clinical team consultation"
      imagePosition="65% center"
      heading={<>Get In Touch With<br />The NewME Team.</>}
      subheading="Connect with the NewME team any time you need guidance, support, or if you have questions about our structured care programs."
      headingMaxWidthPx={760}
      bodyMaxWidthPx={618}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Two-column body — left: contact info  |  right: contact form
// Figma: left content x=63, right form x=970 y=966 w=890 h=902
// ─────────────────────────────────────────────────────────────────────────────
function ContactBody() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1200)
  }

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(60px, calc(120 / 1920 * 100vw), 120px) clamp(20px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 140px)',
      }}
    >
      {/* Atmospheric blobs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {/* Green gradient wash — left/center */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: 'clamp(600px, 80vw, 1400px)', height: 'clamp(600px, 80vw, 1400px)',
          top: '-10%', left: '-15%',
          background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
          filter: 'blur(180px)', opacity: 0.38,
          maskImage: 'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.7) 65%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side, black 0%, black 35%, rgba(0,0,0,0.7) 65%, transparent 100%)',
        }} />
        {/* Gold accent — right */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: 'clamp(300px, 40vw, 700px)', height: 'clamp(300px, 40vw, 700px)',
          top: '5%', right: '-8%',
          background: '#FEF272',
          filter: 'blur(160px)', opacity: 0.28,
        }} />
        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: '220px 220px',
          mixBlendMode: 'soft-light',
          opacity: 0.35,
        }} />
      </div>
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(48px, calc(110 / 1920 * 100vw), 110px)',
          alignItems: 'start',
          maxWidth: 1800,
          margin: '0 auto',
        }}
      >
        {/* ── Left column — contact info ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}
          >
            <EyebrowPill>Reach Out</EyebrowPill>
          </motion.div>

          {/* Heading */}
          {/* "We're Here To Help." — Figma: 72px SemiBold, line-height 72px */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(58 / 1920 * 100vw), 58px)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(20px, calc(36 / 1920 * 100vw), 36px)',
            }}
          >
            We&rsquo;re Here<br />To Help.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="font-[family-name:var(--font-urbanist)] text-white"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
              lineHeight: 1.65,
              opacity: 0.78,
              maxWidth: 'clamp(280px, calc(640 / 1920 * 100vw), 640px)',
              marginBottom: 'clamp(32px, calc(60 / 1920 * 100vw), 60px)',
            }}
          >
            Our team of doctors, coaches, and healthcare professionals are with you
            every step of the way, during your journey to better health.
          </motion.p>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}
          >
            <div>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)', color: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}
              >
                Write to us:
              </p>
              <a
                href="mailto:support@drpalsnewme.com"
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)', color: '#FEF272', fontWeight: 500, textDecoration: 'none' }}
              >
                support@drpalsnewme.com
              </a>
            </div>
            <div>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)', color: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}
              >
                Call us:
              </p>
              <a
                href="tel:+919944127006"
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)', color: '#FEF272', fontWeight: 500, textDecoration: 'none' }}
              >
                +91 99441 27006
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Right column — minimal form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(22px, calc(40 / 1920 * 100vw), 40px)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
            }}
          >
            Start The Conversation.
          </h2>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{
              fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
              color: 'rgba(255,255,255,0.68)',
              lineHeight: 1.6,
              marginBottom: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            Have a question about your health, pathways, or next steps? Share your
            details and our team will get back to you.
          </p>

          {sent ? (
            <div
              className="font-[family-name:var(--font-urbanist)] text-white"
              style={{
                background: 'rgba(98,150,117,0.35)',
                border: '1px solid rgba(254,242,114,0.4)',
                borderRadius: 16,
                padding: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                fontSize: 'clamp(15px, calc(18 / 1920 * 100vw), 18px)',
                lineHeight: 1.6,
              }}
            >
              ✓ &nbsp;Message received. Our team will be in touch within 1 business day.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)' }}>
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="font-[family-name:var(--font-urbanist)] text-white placeholder:text-white/35 w-full outline-none bg-transparent"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.30)',
                  borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                  height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                  padding: '0 0 clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderBottomColor = 'rgba(254,242,114,0.7)')}
                onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.30)')}
              />

              <input
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="font-[family-name:var(--font-urbanist)] text-white placeholder:text-white/35 w-full outline-none bg-transparent"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.30)',
                  borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                  height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                  padding: '0 0 clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderBottomColor = 'rgba(254,242,114,0.7)')}
                onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.30)')}
              />

              <textarea
                placeholder="Leave a message"
                required
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="font-[family-name:var(--font-urbanist)] text-white placeholder:text-white/35 w-full outline-none resize-none bg-transparent"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.30)',
                  borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                  height: 'clamp(120px, calc(180 / 1920 * 100vw), 180px)',
                  padding: '0 0 clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderBottomColor = 'rgba(254,242,114,0.7)')}
                onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.30)')}
              />

              <button
                type="submit"
                disabled={sending}
                className="font-[family-name:var(--font-bricolage)] hover:bg-[#FEF272] active:scale-95"
                style={{
                  background: sending ? 'rgba(255,255,255,0.7)' : '#ffffff',
                  color: '#013E37',
                  border: 'none',
                  borderRadius: 60,
                  width: 'clamp(150px, calc(197 / 1920 * 100vw), 197px)',
                  height: 'clamp(52px, calc(64 / 1920 * 100vw), 64px)',
                  fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
                  fontWeight: 500,
                  cursor: sending ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, transform 0.15s',
                  marginTop: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
                  flexShrink: 0,
                }}
              >
                {sending ? 'Sending…' : 'Send Now'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

