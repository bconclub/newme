'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ContactThankYouPage() {
  useEffect(() => {
    // ── Conversion tracking ───────────────────────────────────────────
    // GA4 — uncomment once gtag is loaded via GTM or next/script:
    // window.gtag?.('event', 'contact_form_submit', {
    //   event_category: 'lead',
    //   event_label: 'contact_us',
    // })

    // Meta Pixel — uncomment once pixel is initialised:
    // window.fbq?.('track', 'Lead', { content_name: 'contact_us' })

    // GTM dataLayer push (works even before GA4/Meta are wired up):
    if (typeof window !== 'undefined') {
      ;(window as any).dataLayer = (window as any).dataLayer ?? []
      ;(window as any).dataLayer.push({
        event: 'contact_form_submit',
        event_category: 'lead',
        event_label: 'contact_us',
      })
    }
  }, [])

  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Atmospheric background */}
        <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: 'clamp(600px, 90vw, 1400px)', height: 'clamp(600px, 90vw, 1400px)',
            top: '-20%', left: '-20%',
            background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
            filter: 'blur(200px)', opacity: 0.42,
          }} />
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: 'clamp(300px, 40vw, 700px)', height: 'clamp(300px, 40vw, 700px)',
            bottom: '5%', right: '-10%',
            background: '#FEF272',
            filter: 'blur(180px)', opacity: 0.22,
          }} />
        </div>

        <section
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 680 }}>
            {/* Check icon */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1.2, 0.36, 1] }}
              style={{
                width: 'clamp(72px, calc(96 / 1920 * 100vw), 96px)',
                height: 'clamp(72px, calc(96 / 1920 * 100vw), 96px)',
                borderRadius: '50%',
                background: 'rgba(98,150,117,0.25)',
                border: '2px solid rgba(98,150,117,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto clamp(28px, calc(40 / 1920 * 100vw), 40px)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                style={{ width: '45%', height: '45%' }}
              >
                <path
                  d="M5 12.5L10 17.5L19 8"
                  stroke="#629675"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(32px, calc(64 / 1920 * 100vw), 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              }}
            >
              Thank You for<br />Reaching Out.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
              className="font-[family-name:var(--font-urbanist)] text-white"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
                lineHeight: 1.65,
                opacity: 0.78,
                marginBottom: 'clamp(36px, calc(56 / 1920 * 100vw), 56px)',
              }}
            >
              Your message has been received. A member of the NewME team
              will be in touch within 1 business day. In the meantime, you&apos;re
              welcome to explore our programs or take the free assessment below.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link
                href="/assessment"
                className="font-[family-name:var(--font-bricolage)]"
                style={{
                  background: '#FEF272',
                  color: '#013E37',
                  borderRadius: 60,
                  padding: 'clamp(14px, calc(18 / 1920 * 100vw), 18px) clamp(28px, calc(40 / 1920 * 100vw), 40px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'opacity 0.2s',
                }}
              >
                Start Free Assessment
              </Link>
              <Link
                href="/"
                className="font-[family-name:var(--font-bricolage)]"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: 60,
                  padding: 'clamp(14px, calc(18 / 1920 * 100vw), 18px) clamp(28px, calc(40 / 1920 * 100vw), 40px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'background 0.2s',
                }}
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
