'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

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
// Hero — Figma 122:12618 — 1880×694 card at y=152
// "Get In Touch With The NewMe Team."
// ─────────────────────────────────────────────────────────────────────────────
function ContactHero() {
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
          height: 'clamp(280px, calc(694 / 1920 * 100vw), 694px)',
          background: '#0E2827',
        }}
      >
        {/* Hero image */}
        <div className="absolute inset-0">
          <Image
            src="/clinic/virtual-clinic-hero.webp"
            alt="NewME clinical team consultation"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1880px"
            className="object-cover [object-position:65%_center] md:object-center"
          />
        </div>

        {/* Pine gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
            opacity: 0.9,
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0.1) 56%, rgba(0,0,0,0) 64%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0.1) 56%, rgba(0,0,0,0) 64%)',
          }}
        />

        {/* Content — Figma: heading at x=120 y=370, body at x=120 y=538 */}
        <div
          className="relative z-10 flex flex-col justify-end h-full"
          style={{
            padding: 'clamp(24px, calc(60 / 1920 * 100vw), 60px) clamp(24px, calc(120 / 1920 * 100vw), 120px) clamp(48px, calc(88 / 1920 * 100vw), 88px)',
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
            Get In Touch With<br />The NewMe Team.
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
              maxWidth: 'clamp(260px, calc(618 / 1920 * 100vw), 618px)',
              marginTop: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            Connect with the NewME team any time you need guidance, support, or if
            you have questions about our structured care programs.
          </motion.p>
        </div>
      </div>
    </section>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: 'clamp(48px, calc(80 / 1920 * 100vw), 80px)',
          alignItems: 'start',
          maxWidth: 1800,
          margin: '0 auto',
        }}
      >
        {/* ── Left column — contact info ── */}
        <div>
          {/* Reach Out pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)' }}
          >
            <span
              className="font-[family-name:var(--font-bricolage)]"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.50)',
                borderRadius: 9999,
                padding: '0 clamp(16px, calc(20 / 1920 * 100vw), 20px)',
                height: 44,
                fontSize: 'clamp(12px, calc(14 / 1920 * 100vw), 14px)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.90)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Reach Out
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(56 / 1920 * 100vw), 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
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

        {/* ── Right column — form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
            backdropFilter: 'blur(20px) saturate(85%)',
            WebkitBackdropFilter: 'blur(20px) saturate(85%)',
            border: '1.5px solid rgba(255,255,255,0.18)',
            borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            padding: 'clamp(28px, calc(60 / 1920 * 100vw), 60px)',
          }}
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)' }}>
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="font-[family-name:var(--font-urbanist)] text-white placeholder:text-white/40 w-full outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                    borderRadius: 'clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                    padding: 'clamp(14px, calc(22 / 1920 * 100vw), 22px) clamp(16px, calc(22 / 1920 * 100vw), 22px)',
                    fontSize: 'clamp(14px, calc(16 / 1920 * 100vw), 16px)',
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="font-[family-name:var(--font-urbanist)] text-white placeholder:text-white/40 w-full outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                    borderRadius: 'clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                    padding: 'clamp(14px, calc(22 / 1920 * 100vw), 22px) clamp(16px, calc(22 / 1920 * 100vw), 22px)',
                    fontSize: 'clamp(14px, calc(16 / 1920 * 100vw), 16px)',
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Leave a Message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="font-[family-name:var(--font-urbanist)] text-white placeholder:text-white/40 w-full outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                    borderRadius: 'clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                    padding: 'clamp(14px, calc(22 / 1920 * 100vw), 22px) clamp(16px, calc(22 / 1920 * 100vw), 22px)',
                    fontSize: 'clamp(14px, calc(16 / 1920 * 100vw), 16px)',
                  }}
                />
              </div>

              {/* Send Now */}
              <button
                type="submit"
                disabled={sending}
                className="font-[family-name:var(--font-bricolage)] self-start"
                style={{
                  background: sending ? 'rgba(254,242,114,0.6)' : '#FEF272',
                  color: '#013E37',
                  border: 'none',
                  borderRadius: 9999,
                  padding: 'clamp(14px, calc(20 / 1920 * 100vw), 20px) clamp(28px, calc(44 / 1920 * 100vw), 44px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  fontWeight: 600,
                  cursor: sending ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, transform 0.15s',
                  marginTop: 'clamp(4px, calc(8 / 1920 * 100vw), 8px)',
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
