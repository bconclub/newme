'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { captureUtm } from '@/lib/utm'

// ── Countdown ──────────────────────────────────────────────────────────
function useCountdown(initial: number) {
  const [secs, setSecs] = useState(initial)
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  return {
    display: `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`,
    expired: secs === 0,
  }
}

// ── Country codes (matches original form exactly) ─────────────────────
const COUNTRY_CODES = [
  'United States (+1)',
  'India (+91)',
  'Canada (+1)',
  'United Kingdom (+44)',
  'Australia (+61)',
  'New Zealand (+64)',
  'UAE (+971)',
  'Saudi Arabia (+966)',
  'Qatar (+974)',
  'Kuwait (+965)',
  'Oman (+968)',
  'Bahrain (+973)',
  'Singapore (+65)',
  'Malaysia (+60)',
  'Indonesia (+62)',
  'Thailand (+66)',
  'Philippines (+63)',
  'Vietnam (+84)',
  'China (+86)',
  'Hong Kong (+852)',
  'Japan (+81)',
  'South Korea (+82)',
  'Pakistan (+92)',
  'Bangladesh (+880)',
  'Sri Lanka (+94)',
  'Nepal (+977)',
  'Afghanistan (+93)',
  'Germany (+49)',
  'France (+33)',
  'Italy (+39)',
  'Spain (+34)',
  'Portugal (+351)',
  'Netherlands (+31)',
  'Belgium (+32)',
  'Switzerland (+41)',
  'Austria (+43)',
  'Sweden (+46)',
  'Norway (+47)',
  'Denmark (+45)',
  'Finland (+358)',
  'Ireland (+353)',
  'Poland (+48)',
  'Czech Republic (+420)',
  'Slovakia (+421)',
  'Hungary (+36)',
  'Romania (+40)',
  'Bulgaria (+359)',
  'Greece (+30)',
  'Turkey (+90)',
  'Russia (+7)',
  'Ukraine (+380)',
  'Brazil (+55)',
  'Argentina (+54)',
  'Chile (+56)',
  'Colombia (+57)',
  'Peru (+51)',
  'Mexico (+52)',
  'South Africa (+27)',
  'Nigeria (+234)',
  'Kenya (+254)',
  'Egypt (+20)',
  'Morocco (+212)',
  'Ghana (+233)',
  'Israel (+972)',
  'Iran (+98)',
  'Iraq (+964)',
]

// ── SvgIcon — renders any SVG in any color via CSS mask ───────────────
// Works because mask-image uses the SVG as a stencil: opaque SVG shapes
// reveal backgroundColor; fill="#whatever" in the SVG file is irrelevant.
// Usage: <SvgIcon src="/images/masterclass/refresh.svg" size={28} color="#EFB143" />
function SvgIcon({
  src,
  size = 24,
  color = 'currentColor',
  style,
}: {
  src: string
  size?: number
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: color,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        flexShrink: 0,
        ...style,
      }}
    />
  )
}

// ── Shared layout constants ────────────────────────────────────────────
const WRAP: React.CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 80px)',
}

const INPUT: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  border: '1px solid #D5D5D5',
  borderRadius: 8,
  fontSize: 15,
  outline: 'none',
  background: '#fff',
  color: '#111',
  boxSizing: 'border-box',
}

// ── CTA Button ─────────────────────────────────────────────────────────
function ReserveBtn({
  onClick,
  full = false,
  label = 'Reserve My Spot At $9',
}: {
  onClick: () => void
  full?: boolean
  label?: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#173B39',
        color: '#FEF272',
        borderRadius: 9999,
        padding: '14px 32px',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        border: 'none',
        width: full ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
      }}
      className="font-[family-name:var(--font-poppins)]"
    >
      <SvgIcon src="/images/masterclass/sparkle.svg" size={16} color="#FEF272" />
      {label}
    </button>
  )
}

// ── Registration Modal ─────────────────────────────────────────────────
function RegModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    CountryCode: 'India (+91)',
    Phone: '',
    City: '',
    Country: '',
    DOB: '',
  })
  const [dobError, setDobError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  function onDobChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setForm((p) => ({ ...p, DOB: value }))
    if (value) {
      const year = parseInt(value.split('-')[0], 10)
      const currentYear = new Date().getFullYear()
      if (String(year).length < 4 || year < 1900 || year > currentYear) {
        setDobError(`Enter a valid 4-digit year between 1900 and ${currentYear}`)
      } else {
        setDobError('')
      }
    } else {
      setDobError('')
    }
  }

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (dobError) return
    setLoading(true)
    // TODO: replace setTimeout with POST to registration endpoint
    // payload shape: { ...form, FullPhone, DateCus, TimeCus, ...getUtm() }
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: 'clamp(24px,4vw,36px)',
          maxWidth: 480,
          width: '100%',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: '#999',
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <span
            style={{
              display: 'inline-block',
              background: '#173B39',
              color: '#FEF272',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: 12,
            }}
            className="font-[family-name:var(--font-poppins)]"
          >
            🌸 Our Spring Sale Has Started
          </span>
          <h3
            style={{ fontSize: 22, fontWeight: 800, color: '#173B39', margin: 0, lineHeight: 1.2 }}
            className="font-[family-name:var(--font-bricolage)]"
          >
            Reserve My Spot Today
          </h3>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '28px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
            <h4
              style={{ color: '#173B39', fontSize: 20, marginBottom: 8 }}
              className="font-[family-name:var(--font-bricolage)]"
            >
              You&apos;re Registered!
            </h4>
            <p
              style={{ color: '#666', fontSize: 15 }}
              className="font-[family-name:var(--font-urbanist)]"
            >
              Check your inbox for Zoom details. See you at the masterclass!
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div>
              <p
                style={{ fontSize: 13, color: '#555', marginBottom: 5 }}
                className="font-[family-name:var(--font-urbanist)]"
              >
                Your Name
              </p>
              <input
                name="Name"
                type="text"
                placeholder="Name"
                required
                value={form.Name}
                onChange={onChange}
                style={INPUT}
                className="font-[family-name:var(--font-urbanist)]"
              />
            </div>
            <div>
              <p
                style={{ fontSize: 13, color: '#555', marginBottom: 5 }}
                className="font-[family-name:var(--font-urbanist)]"
              >
                Your Email Address
              </p>
              <input
                name="Email"
                type="email"
                placeholder="Email"
                required
                value={form.Email}
                onChange={onChange}
                style={INPUT}
                className="font-[family-name:var(--font-urbanist)]"
              />
            </div>
            <div>
              <p
                style={{ fontSize: 13, color: '#555', marginBottom: 5 }}
                className="font-[family-name:var(--font-urbanist)]"
              >
                Phone Number
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <select
                  name="CountryCode"
                  value={form.CountryCode}
                  onChange={onChange}
                  style={{
                    ...INPUT,
                    width: 'auto',
                    flexShrink: 0,
                    maxWidth: 170,
                    padding: '11px 10px',
                  }}
                  className="font-[family-name:var(--font-urbanist)]"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  name="Phone"
                  type="tel"
                  placeholder="Phone number"
                  required
                  minLength={9}
                  maxLength={13}
                  value={form.Phone}
                  onChange={onChange}
                  style={{ ...INPUT, flex: 1 }}
                  className="font-[family-name:var(--font-urbanist)]"
                />
              </div>
            </div>
            <div>
              <p
                style={{ fontSize: 13, color: '#555', marginBottom: 5 }}
                className="font-[family-name:var(--font-urbanist)]"
              >
                Your City
              </p>
              <input
                name="City"
                type="text"
                placeholder="Your City"
                required
                value={form.City}
                onChange={onChange}
                style={INPUT}
                className="font-[family-name:var(--font-urbanist)]"
              />
            </div>
            <div>
              <p
                style={{ fontSize: 13, color: '#555', marginBottom: 5 }}
                className="font-[family-name:var(--font-urbanist)]"
              >
                Your Country
              </p>
              <input
                name="Country"
                type="text"
                placeholder="Your Country"
                required
                value={form.Country}
                onChange={onChange}
                style={INPUT}
                className="font-[family-name:var(--font-urbanist)]"
              />
            </div>
            <div>
              <p
                style={{ fontSize: 13, color: '#555', marginBottom: 5 }}
                className="font-[family-name:var(--font-urbanist)]"
              >
                Date of Birth
              </p>
              <input
                name="DOB"
                type="date"
                required
                min="1900-01-01"
                max={`${new Date().getFullYear()}-12-31`}
                value={form.DOB}
                onChange={onDobChange}
                style={{
                  ...INPUT,
                  borderColor: dobError ? '#e53e3e' : '#D5D5D5',
                  colorScheme: 'light',
                }}
                className="font-[family-name:var(--font-urbanist)]"
              />
              {dobError && (
                <p
                  style={{ fontSize: 12, color: '#e53e3e', marginTop: 5 }}
                  className="font-[family-name:var(--font-urbanist)]"
                >
                  {dobError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#173B39',
                color: '#FEF272',
                borderRadius: 9999,
                padding: '14px 24px',
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.75 : 1,
                border: 'none',
                marginTop: 4,
                width: '100%',
              }}
              className="font-[family-name:var(--font-poppins)]"
            >
              {loading ? 'Registering…' : 'Reserve Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Sticky Bottom Bar ──────────────────────────────────────────────────
function StickyBar({
  onRegister,
  countdown,
  expired,
}: {
  onRegister: () => void
  countdown: string
  expired: boolean
}) {
  return (
    <div
      id="fixed-containerr"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#173B39',
        borderTop: '2px solid rgba(254,242,114,0.25)',
        padding: '12px clamp(16px,4vw,48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(12px,3vw,32px)',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 26, fontWeight: 800, color: '#FEF272', lineHeight: 1 }}
        >
          $9
        </span>
        <span
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.40)',
            textDecoration: 'line-through',
          }}
        >
          $97/-
        </span>
        <span
          style={{
            width: 1,
            height: 22,
            background: 'rgba(255,255,255,0.18)',
          }}
        />
        <span
          className="font-[family-name:var(--font-urbanist)]"
          style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14 }}
        >
          Offer Expires in{' '}
          <strong style={{ color: '#FEF272' }}>
            {expired ? '00:00' : countdown}
          </strong>
        </span>
      </div>
      <button
        onClick={onRegister}
        style={{
          background: '#FEF272',
          color: '#173B39',
          borderRadius: 9999,
          padding: '10px 28px',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          border: 'none',
          whiteSpace: 'nowrap',
        }}
        className="font-[family-name:var(--font-poppins)]"
      >
        Register Now
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE SECTIONS
// ═══════════════════════════════════════════════════════════════════════

// ── HERO ──────────────────────────────────────────────────────────────
function Hero({ onRegister }: { onRegister: () => void }) {
  const heroDetails: [string, string, string, string][] = [
    ['/images/masterclass/calendar.svg', 'DATE', 'June 28, 2026', 'rgba(255,255,255,0.85)'],
    ['/images/masterclass/clock.svg', 'TIME', '10:00 AM IST', 'rgba(255,255,255,0.85)'],
    ['/images/masterclass/sparkle.svg', 'LANGUAGE', 'English', '#EFB143'],
    ['/images/masterclass/broadcast.svg', 'PLATFORM', 'Zoom', '#EFB143'],
  ]

  return (
    <section id="hero" style={{ background: '#173B39' }}>
      <div
        style={{
          ...WRAP,
          paddingTop: 'clamp(32px,5vw,64px)',
          paddingBottom: 'clamp(32px,5vw,64px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,480px)',
          gap: 'clamp(24px,4vw,56px)',
          alignItems: 'center',
        }}
        className="masterclass-hero-grid"
      >
        {/* Left column */}
        <div>
          <Link href="/" style={{ display: 'inline-block', marginBottom: 28 }}>
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={140}
              height={48}
              style={{ height: 40, width: 'auto' }}
              priority
            />
          </Link>

          <h3
            className="font-[family-name:var(--font-urbanist)]"
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(15px,1.8vw,20px)',
              fontWeight: 400,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            Doing everything &quot;right&quot; but not dropping kilos?
          </h3>

          <h1
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(28px,4vw,52px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 18,
            }}
          >
            The Only{' '}
            <b style={{ color: '#FEF272', fontWeight: 800 }}>Doctor-led,</b>{' '}
            Science-backed{' '}
            <span style={{ display: 'inline-block' }}>
              <b style={{ color: '#FEF272', fontWeight: 800 }}>
                Weight Loss Masterclass
              </b>
              <img
                src="/images/masterclass/wave.svg"
                width={191}
                height={7}
                alt=""
                style={{ display: 'block', maxWidth: '100%', marginTop: 2 }}
              />
            </span>
          </h1>

          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{
              color: 'rgba(255,255,255,0.70)',
              fontSize: 'clamp(15px,1.6vw,18px)',
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            The real root causes behind your weight-loss struggles — and how to
            fix them for good
          </p>

          {/* Masterclass Details card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 16,
              padding: 'clamp(16px,2.5vw,24px)',
              marginBottom: 28,
            }}
          >
            <h4
              className="font-[family-name:var(--font-poppins)]"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#FEF272',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}
            >
              Masterclass Details
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
              }}
            >
              {heroDetails.map(([iconSrc, label, value, color]) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <SvgIcon src={iconSrc} size={22} color={color} />
                  <div>
                    <div
                      className="font-[family-name:var(--font-poppins)]"
                      style={{
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.42)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {label}
                    </div>
                    <div
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.90)',
                        fontWeight: 500,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ReserveBtn onClick={onRegister} full />
        </div>

        {/* Right column: photo */}
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          className="masterclass-hero-img"
        >
          <Image
            src="/dr-pal-portrait.png"
            alt="Dr. Pal"
            width={440}
            height={540}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 24,
              objectFit: 'cover',
            }}
            priority
          />
        </div>
      </div>
    </section>
  )
}

// ── NOT-GET STRIP ──────────────────────────────────────────────────────
function NotGetStrip() {
  return (
    <div style={{ background: '#F3F3F3', padding: '20px 0', borderBottom: '1px solid #E8E8E8' }}>
      <div
        style={{
          ...WRAP,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(16px,4vw,40px)',
        }}
      >
        {[
          'No quick fix shortcuts',
          'No extreme diets',
          'No killer workouts',
        ].map((item) => (
          <div
            key={item}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <img
              src="/images/masterclass/cross.svg"
              width={24}
              height={24}
              alt=""
              style={{ flexShrink: 0 }}
            />
            <span
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 15, fontWeight: 500, color: '#333' }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── "LET ME GUESS" (Failed attempts) ──────────────────────────────────
function FailedAttemptsSection({ onRegister }: { onRegister: () => void }) {
  const items = [
    {
      icon: '/images/masterclass/batterylow.svg',
      bold: 'Eating less',
      rest: '(but feeling hungrier and more tired)',
    },
    {
      icon: '/images/masterclass/community.svg',
      bold: 'Cutting carbs',
      rest: '(lost a few pounds, then hit a wall)',
    },
    {
      icon: '/images/masterclass/broadcast.svg',
      bold: 'Working out more',
      rest: '(scale barely moved)',
    },
    {
      icon: '/images/masterclass/tea.svg',
      bold: 'Trying every new diet trend',
      rest: '(worked temporarily, then stopped)',
    },
  ]

  return (
    <section style={{ background: '#FFF9F0', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        {/* Heading with gold highlight + wave */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3.5vw,42px)',
              fontWeight: 800,
              color: '#111',
              lineHeight: 1.25,
              display: 'inline',
            }}
          >
            Let Me Guess What{' '}
            <span style={{ color: '#EFB143' }}>You&apos;ve Already Tried:</span>
          </h2>
          <div style={{ marginTop: 8 }}>
            <img
              src="/images/masterclass/wave.svg"
              width={191}
              height={7}
              alt=""
              
              style={{ display: 'inline-block' }}
            />
            
          </div>
        </div>

        {/* 2×2 grid matching original */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            maxWidth: 960,
            margin: '0 auto 44px',
          }}
          className="masterclass-failed-grid"
        >
          {items.map(({ icon, bold, rest }) => (
            <div
              key={bold}
              style={{
                background: '#fff',
                border: '1.5px solid rgba(239,177,67,0.45)',
                borderRadius: 14,
                padding: 'clamp(16px,2.5vw,22px) clamp(18px,3vw,26px)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Icon in soft amber pill */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'rgba(239,177,67,0.12)',
                  border: '1px solid rgba(239,177,67,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SvgIcon src={icon} size={28} color="#EFB143" />
              </div>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ margin: 0, fontSize: 'clamp(14px,1.5vw,16px)', color: '#444', lineHeight: 1.55 }}
              >
                <strong
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{ fontWeight: 700, color: '#111' }}
                >
                  {bold}
                </strong>{' '}
                {rest}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <ReserveBtn onClick={onRegister} />
        </div>
      </div>
    </section>
  )
}

// ── ROOT CAUSES ────────────────────────────────────────────────────────
function RootCausesSection({ onRegister }: { onRegister: () => void }) {
  const causes = [
    {
      icon: '/images/masterclass/body.svg',
      text: 'Your body is in survival mode — years of dieting have slowed your metabolism, making the body burn less and store more fat.',
    },
    {
      icon: '/images/masterclass/rocket.svg',
      text: 'You have also lost muscle — low protein and crash diets cost you muscle which is your main calorie burning engine.',
    },
    {
      icon: '/images/masterclass/new2.svg',
      text: 'Your hormones are saying "store fat" — stress, poor sleep, and insulin resistance keep signalling the body to "save fat."',
    },
    {
      icon: '/images/masterclass/personthink.svg',
      text: 'You are using only 2 of 6 crucial lifestyle pillars — you tweak food and workouts but ignore sleep, stress, circadian rhythm, and recovery.',
    },
  ]

  return (
    <section style={{ background: '#F7FDFB', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <h2
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(24px,3.5vw,42px)',
            fontWeight: 800,
            color: '#111',
            textAlign: 'center',
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          Doing everything &quot;right&quot; but not dropping kilos?
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))',
            gap: 20,
            marginBottom: 44,
          }}
        >
          {causes.map(({ icon, text }, i) => (
            <div
              key={i}
              style={{
                background:
                  'linear-gradient(135deg, rgba(23,59,57,0.05) 0%, rgba(23,59,57,0.11) 100%)',
                borderRadius: 18,
                padding: 'clamp(20px,3vw,28px)',
                border: '1px solid rgba(23,59,57,0.09)',
              }}
            >
              <SvgIcon src={icon} size={44} color="#EFB143" style={{ marginBottom: 16 }} />
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 15, color: '#333', lineHeight: 1.68, margin: 0 }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <ReserveBtn onClick={onRegister} />
        </div>
      </div>
    </section>
  )
}

// ── BONUSES ────────────────────────────────────────────────────────────
function BonusesSection({ onRegister }: { onRegister: () => void }) {
  const bonuses = [
    { title: 'Bonus: E-Book', desc: 'Small habits, big health wins.' },
    { title: 'Bonus: E-Book', desc: '100 Science - Backed tips for better gut health.' },
    { title: 'Bonus: Checklist', desc: 'One week healthy habit checklist.' },
    { title: undefined, desc: '1 hour of doctor-led, science-backed health strategies.' },
    { title: undefined, desc: 'Proven tips you can start the same day.' },
    { title: undefined, desc: 'Live Q and A' },
  ]

  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3.5vw,42px)',
              fontWeight: 800,
              color: '#111',
              lineHeight: 1.2,
              display: 'inline',
            }}
          >
            Get{' '}
            <span style={{ color: '#EFB143' }}>FREE Bonuses</span>
            {' '}Worth $999/-
          </h2>
          <div style={{ marginTop: 8 }}>
            <img src="/images/masterclass/wave.svg" width={191} height={7} alt="" style={{ display: 'inline-block' }} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            maxWidth: 960,
            margin: '0 auto 44px',
          }}
          className="masterclass-failed-grid"
        >
          {bonuses.map(({ title, desc }, i) => (
            <div
              key={i}
              style={{
                background: '#FFFBE7',
                borderRadius: 14,
                padding: 'clamp(16px,2.5vw,22px) clamp(18px,3vw,26px)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <SvgIcon
                src="/images/masterclass/sparkle.svg"
                size={32}
                color="#EFB143"
                style={{ flexShrink: 0 }}
              />
              <div>
                {title && (
                  <p
                    className="font-[family-name:var(--font-bricolage)]"
                    style={{ margin: '0 0 2px', fontSize: 'clamp(14px,1.5vw,16px)', fontWeight: 700, color: '#111' }}
                  >
                    {title}
                  </p>
                )}
                <p
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{ margin: 0, fontSize: 'clamp(13px,1.4vw,15px)', color: '#555', lineHeight: 1.5 }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onRegister}
            className="font-[family-name:var(--font-poppins)]"
            style={{
              background: '#EFB143',
              color: '#111',
              borderRadius: 9999,
              padding: '16px 48px',
              fontSize: 'clamp(15px,1.6vw,18px)',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            Reserve My Spot At $9 <span style={{ fontSize: '1.1em' }}>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

// ── WHO IS THIS FOR ────────────────────────────────────────────────────
function WhoForSection({ onRegister }: { onRegister: () => void }) {
  const items = [
    {
      icon: '/images/masterclass/who1.svg',
      text: "You're stuck in the yo-yo weight and crash-diet cycle.",
    },
    {
      icon: '/images/masterclass/who2.svg',
      text: "You're living on autopilot: work → family → stress → repeat.",
    },
    {
      icon: '/images/masterclass/who3.svg',
      text: 'Your motivation is dipping.',
    },
    {
      icon: '/images/masterclass/heartbeat.svg',
      text: "You're worried about your future health complications.",
    },
  ]

  return (
    <section style={{ background: '#F7FDFB', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <h2
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(24px,3.5vw,42px)',
            fontWeight: 800,
            color: '#111',
            textAlign: 'center',
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          Who is this for?
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))',
            gap: 20,
            marginBottom: 44,
          }}
        >
          {items.map(({ icon, text }) => (
            <div
              key={text}
              style={{
                background:
                  'linear-gradient(135deg, rgba(23,59,57,0.05) 0%, rgba(23,59,57,0.11) 100%)',
                borderRadius: 18,
                padding: 'clamp(20px,3vw,28px)',
                border: '1px solid rgba(23,59,57,0.09)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <SvgIcon src={icon} size={44} color="#EFB143" />
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 15, color: '#333', lineHeight: 1.68, margin: 0 }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <ReserveBtn onClick={onRegister} />
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ────────────────────────────────────────────────────────
const YT_SHORTS = [
  'tX1AQcKczrw',
  'rNHxazT6eR4',
  '_P8qGBPa-TQ',
  'bSb3aItkOXI',
  'FQfRUSV8KtU',
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7L8 1z"
            fill="#EFB143"
          />
        </svg>
      ))}
    </div>
  )
}

function TestimonialsSection({ onRegister }: { onRegister: () => void }) {
  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3.5vw,42px)',
              fontWeight: 800,
              color: '#111',
              lineHeight: 1.2,
              display: 'inline-block',
            }}
          >
            What Past Clients Say
          </h2>
          <div style={{ marginTop: 8 }}>
            <img
              src="/images/masterclass/wave.svg"
              width={191}
              height={7}
              alt=""
              style={{ display: 'inline-block' }}
            />
          </div>
        </div>

        {/* Quote cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
            gap: 20,
            marginBottom: 32,
          }}
        >
          {[
            {
              name: 'Pandian',
              color: '#C3E8CE',
              quote:
                '"In just 3 months, my BP normalized, I lost weight and inches, and I finally sleep peacefully. Thanks to Dr. Pal and NewME, I\'ve built sustainable habits that gave me confidence and lifelong wellness."',
            },
            {
              name: 'Lesley Charles',
              color: '#FEE4B8',
              quote:
                '"After years of restrictive diets, NewME showed me a lifestyle I enjoy. I\'m at my best health and lowest weight in a decade and it never felt like a burden. This program truly introduced me to a \'New Me\'."',
            },
          ].map(({ name, color, quote }) => (
            <div
              key={name}
              style={{
                background: '#fff',
                border: '1px solid #EBEBEB',
                borderRadius: 16,
                padding: 'clamp(20px,3vw,28px)',
                boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
              }}
            >
              <img
                src="/images/masterclass/quote.svg"
                width={32}
                height={32}
                alt=""
                style={{ display: 'block', marginBottom: 10 }}
              />
              <Stars />
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{
                  fontSize: 15,
                  color: '#444',
                  lineHeight: 1.72,
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}
              >
                {quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: color,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#173B39',
                    flexShrink: 0,
                  }}
                >
                  {name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <strong
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{ fontSize: 15, color: '#111' }}
                >
                  {name}
                </strong>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Shorts grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: 12,
            marginBottom: 44,
          }}
          className="masterclass-video-grid"
        >
          {YT_SHORTS.map((id) => (
            <div
              key={id}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: '9/16',
                background: '#000',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Testimonial video"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <ReserveBtn onClick={onRegister} />
        </div>
      </div>
    </section>
  )
}

// ── MASTERCLASS TOPICS ─────────────────────────────────────────────────
function TopicsSection({ onRegister }: { onRegister: () => void }) {
  const topics = [
    {
      title: 'The Metabolism-Hormone Interplay Which No One Talks About',
      points: [
        { stop: true,  text: 'Stop chasing new diets and fat-burners while ignoring your hormones' },
        { stop: false, text: 'Learn how to calm inflamed fat tissue and reset key hormones (insulin, cortisol, leptin) to fix cravings, energy crashes, brain fog, and stubborn weight all at once' },
      ],
    },
    {
      title: 'The ABCD Breakthrough That Explains Your Stubborn Weight',
      points: [
        { stop: true,  text: 'Stop thinking weight is just about BMI, age, or willpower' },
        { stop: false, text: 'Discover how Adiposity-Based Chronic Disease (ABCD) – unhealthy fat tissue around organs – drives diabetes, fatty liver, PCOS, and fatigue, and what to change so your body can finally start releasing fat again' },
      ],
    },
    {
      title: 'The Daily Routine That Resets Your Entire System',
      points: [
        { stop: true,  text: 'Stop thinking you need hours of meal prep and gym time' },
        { stop: false, text: 'Discover the simple daily practices that regulate blood sugar, reduce inflammation, and trigger natural weight loss' },
      ],
    },
    {
      title: 'How to Make Healthy Living Fit Your Real Life',
      points: [
        { stop: true,  text: 'Stop forcing rigid programs that ignore your schedule and preferences' },
        { stop: false, text: 'Get a flexible framework that works with your favorite foods, busy calendar, and family commitments' },
      ],
    },
    {
      title: 'How to Make Your Body Work WITH You, Not Against You',
      points: [
        { stop: true,  text: 'Stop the yo-yo cycle of restriction and bingeing' },
        { stop: false, text: 'Learn the science-backed system to lose weight sustainably and never need another "diet" again' },
      ],
    },
  ]

  const CARD: React.CSSProperties = {
    background: '#FFFBE7',
    borderRadius: 16,
    padding: 'clamp(20px,2.5vw,28px)',
  }

  function TopicCard({ title, points, num }: { title: string; points: { stop: boolean; text: string }[]; num: number }) {
    return (
      <div style={CARD}>
        <div
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 26, fontWeight: 700, color: '#EFB143', marginBottom: 10, lineHeight: 1 }}
        >
          {String(num).padStart(2, '0')}
        </div>
        <h3
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 'clamp(15px,1.4vw,17px)', fontWeight: 700, color: '#111', marginBottom: 16, lineHeight: 1.35 }}
        >
          {title}
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {points.map(({ stop, text }, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <img
                src={stop ? '/images/masterclass/cross.svg' : '/images/masterclass/check.svg'}
                width={22}
                height={22}
                alt=""
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 'clamp(13px,1.3vw,15px)', color: '#444', lineHeight: 1.6, margin: 0 }}
              >
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section style={{ background: '#FFF9F0', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(22px,3vw,38px)',
              fontWeight: 800,
              color: '#111',
              maxWidth: 860,
              margin: '0 auto',
              lineHeight: 1.25,
              display: 'inline',
            }}
          >
            In This Masterclass, You&apos;ll Discover What&apos;s Really Blocking
            Your Weight Loss, And{' '}
            <span style={{ color: '#EFB143' }}>How to Fix It</span>
          </h2>
          <div style={{ marginTop: 10 }}>
            <img src="/images/masterclass/wave.svg" width={191} height={7} alt="" style={{ display: 'inline-block' }} />
          </div>
        </div>

        {/* Row 1: 3 columns */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}
          className="masterclass-topics-3col"
        >
          {topics.slice(0, 3).map((t, i) => (
            <TopicCard key={i} num={i + 1} title={t.title} points={t.points} />
          ))}
        </div>

        {/* Row 2: 2 cards centered at the same column width */}
        <div
          style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 44 }}
          className="masterclass-topics-2col"
        >
          {topics.slice(3).map((t, i) => (
            <div key={i + 3} style={{ flex: '0 0 calc((100% - 32px) / 3)' }} className="masterclass-topics-2col-item">
              <TopicCard num={i + 4} title={t.title} points={t.points} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <ReserveBtn onClick={onRegister} />
        </div>
      </div>
    </section>
  )
}

// ── ABOUT DR. PAL ──────────────────────────────────────────────────────
function DrPalSection() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,340px) minmax(0,1fr)',
            gap: 'clamp(32px,5vw,64px)',
            alignItems: 'flex-start',
          }}
          className="masterclass-drpal-grid"
        >
          {/* Photo */}
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/dr-pal-portrait.png"
              alt="Dr. Pal"
              width={340}
              height={420}
              style={{
                borderRadius: 20,
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Bio */}
          <div>
            <h2
              className="font-[family-name:var(--font-bricolage)]"
              style={{
                fontSize: 'clamp(28px,3.5vw,44px)',
                fontWeight: 800,
                color: '#111',
                marginBottom: 20,
              }}
            >
              Dr. Pal
            </h2>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {[
                '5M+ Social Media Followers',
                '10,000+ Lives Transformed',
                '3.5 Years of NewME Success Stories',
              ].map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <img
                    src="/images/masterclass/check.svg"
                    width={22}
                    height={22}
                    alt="✓"
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ fontSize: 16, color: '#333', fontWeight: 500 }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {[
                "I'm a U.S.-based gastroenterologist who got tired of watching patients get sicker despite following medical advice.",
                'More medications. More procedures. But never actually healing.',
                "That's when I realized: we're treating symptoms instead of addressing root causes. We're managing disease instead of creating health.",
                "Over the past 3.5 years, I've helped more than 10,000 people reverse chronic conditions, lose stubborn weight, and reclaim the energy and vitality they thought was gone forever.",
                'So I developed a different approach — one that combines evidence-based medicine with holistic lifestyle intervention. Real science. Real results. No gimmicks.',
                "And here's what matters most: 100% of the proceeds from this masterclass will go to foundation to provide medical care to underserved children who can't afford it.",
              ].map((para, i) => (
                <p
                  key={i}
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{ fontSize: 15, color: '#444', lineHeight: 1.72, margin: 0 }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── RESPONSIVE STYLES ─────────────────────────────────────────────────
const RESPONSIVE_CSS = `
  @media (max-width: 767px) {
    .masterclass-hero-grid {
      grid-template-columns: 1fr !important;
    }
    .masterclass-hero-img {
      display: none !important;
    }
    .masterclass-drpal-grid {
      grid-template-columns: 1fr !important;
    }
    .masterclass-video-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .masterclass-failed-grid {
      grid-template-columns: 1fr !important;
    }
    .masterclass-topics-3col {
      grid-template-columns: 1fr !important;
    }
    .masterclass-topics-2col {
      flex-direction: column !important;
    }
    .masterclass-topics-2col-item {
      flex: unset !important;
    }
  }
  @media (max-width: 480px) {
    .masterclass-video-grid {
      grid-template-columns: 1fr !important;
    }
  }
`

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════
export default function MasterclassClient() {
  const { display: countdown, expired } = useCountdown(900)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    captureUtm()
  }, [])

  return (
    <>
      <style>{RESPONSIVE_CSS}</style>

      <RegModal open={modalOpen} onClose={closeModal} />
      <StickyBar onRegister={openModal} countdown={countdown} expired={expired} />

      {/* Main page — white background, bottom padding for sticky bar */}
      <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 70 }}>
        <Hero onRegister={openModal} />
        <NotGetStrip />
        <FailedAttemptsSection onRegister={openModal} />
        <RootCausesSection onRegister={openModal} />
        <BonusesSection onRegister={openModal} />
        <WhoForSection onRegister={openModal} />
        <TestimonialsSection onRegister={openModal} />
        <TopicsSection onRegister={openModal} />
        <DrPalSection />

        {/* Footer */}
        <footer
          style={{
            background: '#F3F3F3',
            borderTop: '1px solid #E0E0E0',
            padding: '32px 0',
            textAlign: 'center',
          }}
        >
          <div style={WRAP}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <Image
                src="/newme-logo.png"
                alt="Dr. Pal's NewME"
                width={100}
                height={34}
                style={{ height: 28, width: 'auto', opacity: 0.55 }}
              />
            </div>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 13, color: '#999', marginBottom: 10 }}
            >
              © 2026 Dr. Pal&apos;s NewME. All rights reserved.
            </p>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: 20 }}
            >
              {(
                [
                  ['Privacy Policy', '/privacy-policy'],
                  ['Terms', '/terms'],
                  ['Contact', '/contact'],
                ] as const
              ).map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontSize: 13,
                    color: '#999',
                    textDecoration: 'underline',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
