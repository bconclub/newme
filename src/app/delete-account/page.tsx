'use client'

import { useState } from 'react'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import type { Metadata } from 'next'
import { ENDPOINTS } from '@/assessment-app/constants/urlConstants'

// Note: metadata must be in a server component; this page is 'use client' so
// the meta is set via a sibling layout or the title tag below (browsers still
// read <title> in client components via the document API).

const DATA_ITEMS = [
  'Full name, email address, and phone number',
  'Health profile (height, weight, date of birth, gender)',
  'Assessment answers and pathway recommendation',
  'Appointment and consultation history',
  'All associated CRM records and communications',
]

const RETAIN_ITEMS = [
  'Anonymised, aggregated usage statistics (no personal identifiers)',
  'Financial transaction records required by applicable tax law (7 years)',
  'Any data we are legally required to retain under applicable regulations',
]

export default function DeleteAccountPage() {
  const [email,       setEmail]       = useState('')
  const [confirmed,   setConfirmed]   = useState(false)
  const [reason,      setReason]      = useState('')
  const [step,        setStep]        = useState<'form' | 'success' | 'error'>('form')
  const [submitting,  setSubmitting]  = useState(false)
  const [errorMsg,    setErrorMsg]    = useState('')

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = emailOk && confirmed && !submitting

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setErrorMsg('')
    try {
      const message =
        `ACCOUNT DELETION REQUEST\n\nEmail: ${email}\n` +
        (reason.trim() ? `Reason: ${reason.trim()}\n` : '') +
        `\nThe user has confirmed they understand all data associated with this account will be permanently deleted within 30 days.`
      const res = await fetch(ENDPOINTS.CRM_LEAD_CONTACT_US, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Account Deletion Request',
          email,
          message,
        }),
      })
      if (!res.ok) throw new Error(`${res.status}`)
      setStep('success')
    } catch (err) {
      setErrorMsg('Something went wrong. Please email us directly at support@drpalsnewme.com.')
      setStep('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main style={{ background: '#fff', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,40px) clamp(64px,10vw,120px)',
          }}
        >

          {/* ── Page header ── */}
          <div style={{ marginBottom: 40 }}>
            <span
              className="font-[family-name:var(--font-poppins)]"
              style={{
                display: 'inline-block',
                background: 'rgba(23,59,57,0.08)',
                color: '#173B39',
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Account Management
            </span>
            <h1
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: 14 }}
            >
              Delete Your Account
            </h1>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 16, color: '#555', lineHeight: 1.7 }}
            >
              You can request permanent deletion of your Dr.&nbsp;Pal&apos;s NewME account and all associated personal data at any time. Submit the form below and our team will process your request within <strong>30 days</strong>.
            </p>
          </div>

          {/* ── What will be deleted ── */}
          <div
            style={{
              background: '#FFF9F0',
              border: '1.5px solid rgba(239,177,67,0.35)',
              borderRadius: 14,
              padding: 'clamp(20px,3vw,28px)',
              marginBottom: 28,
            }}
          >
            <h2
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 12 }}
            >
              Data that will be permanently deleted
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DATA_ITEMS.map(item => (
                <li
                  key={item}
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#333', lineHeight: 1.55 }}
                >
                  <span style={{ color: '#e53e3e', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── What will be retained ── */}
          <div
            style={{
              background: '#F7FDFB',
              border: '1.5px solid rgba(23,59,57,0.15)',
              borderRadius: 14,
              padding: 'clamp(20px,3vw,28px)',
              marginBottom: 40,
            }}
          >
            <h2
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 12 }}
            >
              Data we are legally required to retain
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {RETAIN_ITEMS.map(item => (
                <li
                  key={item}
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#444', lineHeight: 1.55 }}
                >
                  <span style={{ color: '#173B39', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Form / states ── */}
          {step === 'success' ? (
            <div
              style={{
                background: '#F7FDFB',
                border: '1.5px solid rgba(23,59,57,0.2)',
                borderRadius: 16,
                padding: 'clamp(28px,4vw,40px)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 22, fontWeight: 700, color: '#173B39', marginBottom: 10 }}
              >
                Request Received
              </h2>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 15, color: '#444', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 10px' }}
              >
                We have received your account deletion request for <strong>{email}</strong>. Your account and all associated personal data will be permanently deleted within <strong>30 days</strong>.
              </p>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}
              >
                You will receive a confirmation email once the deletion is complete. If you have questions, contact us at{' '}
                <a href="mailto:support@drpalsnewme.com" style={{ color: '#173B39', fontWeight: 600 }}>
                  support@drpalsnewme.com
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Email */}
                <div>
                  <label
                    htmlFor="da-email"
                    className="font-[family-name:var(--font-poppins)]"
                    style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#173B39', marginBottom: 7, letterSpacing: '0.03em' }}
                  >
                    Account email address <span style={{ color: '#e53e3e' }}>*</span>
                  </label>
                  <input
                    id="da-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1.5px solid ${email.length > 0 && !emailOk ? '#e53e3e' : '#d1d5db'}`,
                      borderRadius: 10,
                      fontSize: 15,
                      outline: 'none',
                      color: '#111',
                      background: '#fff',
                      boxSizing: 'border-box',
                      transition: 'border-color .2s',
                    }}
                  />
                  {email.length > 0 && !emailOk && (
                    <p className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, color: '#e53e3e', marginTop: 5 }}>
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Optional reason */}
                <div>
                  <label
                    htmlFor="da-reason"
                    className="font-[family-name:var(--font-poppins)]"
                    style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#173B39', marginBottom: 7, letterSpacing: '0.03em' }}
                  >
                    Reason for leaving <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    id="da-reason"
                    rows={3}
                    placeholder="Help us improve by sharing why you are deleting your account…"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1.5px solid #d1d5db',
                      borderRadius: 10,
                      fontSize: 15,
                      outline: 'none',
                      color: '#111',
                      background: '#fff',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Confirmation checkbox */}
                <label
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={e => setConfirmed(e.target.checked)}
                    style={{ marginTop: 3, width: 18, height: 18, accentColor: '#173B39', flexShrink: 0, cursor: 'pointer' }}
                  />
                  <span
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}
                  >
                    I understand that this action is <strong>permanent and irreversible</strong>. All my personal data, health records, and assessment history will be deleted and cannot be recovered.
                  </span>
                </label>

                {/* Error */}
                {step === 'error' && errorMsg && (
                  <p
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ fontSize: 14, color: '#e53e3e', background: 'rgba(229,62,62,0.06)', border: '1px solid rgba(229,62,62,0.2)', borderRadius: 8, padding: '10px 14px' }}
                  >
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="font-[family-name:var(--font-poppins)]"
                    style={{
                      background: canSubmit ? '#c53030' : '#e2e8f0',
                      color: canSubmit ? '#fff' : '#999',
                      border: 'none',
                      borderRadius: 999,
                      padding: '14px 36px',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: canSubmit ? 'pointer' : 'not-allowed',
                      transition: 'background .2s',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Submit Deletion Request'}
                  </button>
                  <p
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ fontSize: 13, color: '#888' }}
                  >
                    Processed within 30 days
                  </p>
                </div>

              </div>
            </form>
          )}

          {/* ── Help line ── */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}
            >
              Need help or have questions? Contact our support team at{' '}
              <a href="mailto:support@drpalsnewme.com" style={{ color: '#173B39', fontWeight: 600 }}>
                support@drpalsnewme.com
              </a>{' '}
              or review our{' '}
              <a href="/privacy-policy" style={{ color: '#173B39', fontWeight: 600 }}>
                Privacy Policy
              </a>{' '}
              to learn more about how we handle your data.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
