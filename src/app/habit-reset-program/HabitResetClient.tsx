'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { captureUtm, appendUtmToUrl } from '@/lib/utm'

// ── External checkout — Razorpay payment page ──────────────────────────
const CHECKOUT_URL = 'https://pages.razorpay.com/DrPalsHealthChallenge'

// ── SvgIcon — renders any SVG in any color via CSS mask ───────────────
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

// ── CTA Button ─────────────────────────────────────────────────────────
function JoinBtn({
  onClick,
  full = false,
  label = 'Yes, I Want My 60-Day Reset',
  variant = 'dark',
}: {
  onClick: () => void
  full?: boolean
  label?: string
  variant?: 'dark' | 'gold'
}) {
  
  const isGold = variant === 'gold'
  return (
    <button
      onClick={onClick}
      style={{
        background: isGold ? '#EFB143' : '#173B39',
        color: isGold ? '#173B39' : '#FEF272',
        borderRadius: 9999,
        padding: '14px 32px',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        border: 'none',
        width: full ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        textAlign: 'center',
      }}
      className="font-[family-name:var(--font-poppins)]"
    >
      <SvgIcon src="/images/masterclass/sparkle.svg" size={16} color={isGold ? '#173B39' : '#FEF272'} />
      {label}
    </button>
  )
}

// ── Sticky Bottom Bar ──────────────────────────────────────────────────
function StickyBar({ onRegister }: { onRegister: () => void }) {
  return (
    <div
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 18, fontWeight: 800, color: '#FEF272', lineHeight: 1 }}
        >
          60-Day Habit Reset
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
          Starts <strong style={{ color: '#fff' }}>August 1st</strong> · Limited Seats
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
        Join Now!
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE SECTIONS
// ═══════════════════════════════════════════════════════════════════════

// ── No-entry (prohibition) icon for the "not included" pills ───────────
function NoEntryIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" stroke="#FF6B5E" strokeWidth="2" fill="rgba(192,22,13,0.18)" />
      <line x1="6.5" y1="17.5" x2="17.5" y2="6.5" stroke="#FF6B5E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ── Bell icon for the "Reward Alert!" badge ─────────────────────────────
function BellIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" style={{ flexShrink: 0 }}>
      <path d="M12 2c-1.3 0-2.4.9-2.8 2.1C6.4 5 4.5 7.6 4.5 10.5V15L3 17v1h18v-1l-1.5-2v-4.5c0-2.9-1.9-5.5-4.7-6.4C14.4 2.9 13.3 2 12 2Zm0 19c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Z" />
    </svg>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────
const HERO_CHECKLIST = [
  {
    lead: 'The "9-Habit Stack"',
    text: 'that makes healthy living feel as automatic as brushing your teeth',
  },
  {
    lead: 'The "Week 4 Shift"',
    text: 'where most people notice their energy and sleep changing at the same time',
  },
  {
    lead: 'The "Never Start Over" system',
    text: 'where missing one day never derails everything you’ve built',
  },
  {
    lead: 'The 2-Minute Daily Check-In',
    text: 'that keeps you accountable without adding to your to-do list',
  },
]

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <section
      id="hero"
      style={{
        background: '#173B39',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint diagonal grid texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 42px)',
          maskImage: 'radial-gradient(circle at 20% 85%, black 0%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 20% 85%, black 0%, transparent 60%)',
        }}
      />

      <div
        style={{
          ...WRAP,
          position: 'relative',
          zIndex: 1,
          paddingTop: 'clamp(40px,6vw,72px)',
          paddingBottom: 'clamp(48px,7vw,88px)',
        }}
      >
        {/* Logo — centered */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(24px,4vw,40px)' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={160}
              height={54}
              style={{ height: 44, width: 'auto' }}
              priority
            />
          </Link>
        </div>

        {/* Eyebrow pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <span
            className="font-[family-name:var(--font-poppins)]"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(254,242,114,0.45)',
              borderRadius: 9999,
              padding: '10px 24px',
              fontSize: 'clamp(13px,1.3vw,16px)',
              fontWeight: 700,
              color: '#FEF272',
              background: 'rgba(254,242,114,0.06)',
            }}
          >
            Feel More Energetic, Lighter &amp; Sharper
          </span>
        </div>

        {/* H1 */}
        <h2
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(28px,4.6vw,36px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            textAlign: 'center',
            maxWidth: 1000,
            margin: '0 auto 28px',
          }}
        >
          Reset Your Energy, Sleep &amp; Digestion in 60 Days
          <br />
          With The <span style={{ color: '#FEF272' }}>&apos;NewME 9-Habit Reset&apos;</span>
        </h2>

        {/* Not-included pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 14,
            marginBottom: 28,
          }}
        >
          {['Strict Diets', 'Supplements', 'Complicated Routines'].map((label) => (
            <div
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(192,22,13,0.14)',
                border: '1px solid rgba(255,107,94,0.45)',
                borderRadius: 9999,
                padding: '10px 20px',
              }}
            >
              <NoEntryIcon />
              <span
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Subheadline */}
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.75)',
            fontSize: 'clamp(15px,1.7vw,19px)',
            lineHeight: 1.6,
            maxWidth: 1080,
            margin: '0 auto clamp(40px,6vw,64px)',
          }}
        >
          Get The Exact Week-By-Week Habit System &amp;{' '}
          <span style={{ color: '#FEF272', fontWeight: 600 }}>Science-Backed Guidance</span>{' '}
          to Finally Improve Your Energy, Health &amp; Sleep
        </p>

        {/* Photo + Checklist card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,480px) minmax(0,1fr)',
            gap: 'clamp(28px,4vw,56px)',
            alignItems: 'center',
            marginBottom: 'clamp(32px,5vw,48px)',
          }}
          className="habit-hero-grid"
        >
          {/* Photo — the source PNG already bakes in the yellow disc + transparent bg */}
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            className="habit-hero-img"
          >
            <Image
              src="/images/health-reset/drpalhealth.png"
              alt="Dr. Pal"
              width={400}
              height={396}
              style={{
                width: 'clamp(260px, 30vw, 400px)',
                height: 'auto',
              }}
              priority
            />
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                lineHeight: 1.8,
                marginTop: 14,
                maxWidth: 400,
              }}
            >
              U.S.-Based Gastroenterologist &nbsp;|&nbsp; Founder, NewME Method &nbsp;|&nbsp; 10,000+
              Lives Transformed &nbsp;|&nbsp; Certified Lifestyle Medicine Expert
            </p>
          </div>

          {/* Checklist card */}
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <div
              style={{
                background: '#FFF8B8',
                padding: 'clamp(18px,2.4vw,26px) clamp(20px,3vw,32px)',
              }}
            >
              <h3
                className="font-[family-name:var(--font-bricolage)]"
                style={{
                  fontSize: 'clamp(17px,2vw,24px)',
                  fontWeight: 800,
                  color: '#111',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                The Science-Backed System to Reset Your Health in 60 Days
              </h3>
            </div>
            <div style={{ background: '#0E2827', padding: 'clamp(20px,3vw,32px)' }}>
              {HERO_CHECKLIST.map(({ lead, text }, i) => (
                <div
                  key={lead}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '14px 0',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                     // background: '#FEF272',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <SvgIcon src="/images/health-reset/checkrest.svg" size={20} color="#FEF272" />
                  </span>
                  <p
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55 }}
                  >
                    <strong className="font-[family-name:var(--font-bricolage)]" style={{ color: '#fff' }}>
                      {lead}
                    </strong>{' '}
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <JoinBtn onClick={onRegister} variant="gold" />
        </div>
      </div>
    </section>
  )
}

// ── REWARD / CHALLENGE BANNER ───────────────────────────────────────────
function RewardBanner() {
  return (
    <section style={{ background: '#FFF9F0', padding: 'clamp(40px,6vw,72px) 0' }}>
      <div style={WRAP}>
        <div
          style={{
            position: 'relative',
            background: '#fff',
            border: '2px solid #EFB143',
            borderRadius: 24,
            padding: 'clamp(32px,4vw,44px) clamp(24px,3.5vw,44px) clamp(24px,3.5vw,32px)',
            maxWidth: 820,
            margin: '0 auto',
          }}
        >
          {/* Badge — straddles the top border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#EFB143',
              borderRadius: 9999,
              padding: '8px 22px 8px 8px',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BellIcon size={16} />
            </span>
            <span
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontSize: 16, fontWeight: 800, color: '#111' }}
            >
              Reward Alert!
            </span>
          </div>

          {/* Main row: days box + heading/description */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(20px,3vw,32px)',
              marginBottom: 28,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                border: '2px dashed #EFB143',
                borderRadius: 16,
                padding: '18px 28px',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <div
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 44, fontWeight: 800, color: '#111', lineHeight: 1 }}
              >
                60
              </div>
              <div
                className="font-[family-name:var(--font-poppins)]"
                style={{ fontSize: 13, fontWeight: 700, color: '#666', letterSpacing: '0.06em' }}
              >
                DAYS
              </div>
            </div>

            <div style={{ flex: '1 1 320px' }}>
              <h3
                className="font-[family-name:var(--font-bricolage)]"
                style={{ fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 800, color: '#111', marginBottom: 8 }}
              >
                Health Reset <span style={{ color: '#EFB143' }}>Challenge</span>
              </h3>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 16, color: '#555', lineHeight: 1.6, margin: 0 }}
              >
                Stay consistent through all <strong style={{ color: '#333' }}>60 days</strong> and
                complete the daily polls for a chance to win an exclusive bonus.
              </p>
            </div>
          </div>

          <p
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(15px,1.6vw,19px)',
              fontWeight: 800,
              color: '#111',
              textTransform: 'uppercase',
              margin: '0 0 10px',
              lineHeight: 1.4,
            }}
          >
            Exclusive 30-Minute Virtual Group Session With Dr. Pal.
          </p>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{ fontSize: 15, color: '#777', margin: 0 }}
          >
            Show up daily, stay committed, and celebrate your journey towards better health.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── DISCLAIMERS ──────────────────────────────────────────────────────────
function DisclaimersSection({ onRegister }: { onRegister: () => void }) {
  const items = [
    {
      title: 'This is NOT a diet plan or meal program',
      text: 'No diet charts, no food restrictions, just daily habits that improve how your body feels from the inside out.',
    },
    {
      title: 'This is NOT a weight loss program',
      text: 'Weight changes may happen but the real goal is fixing how you feel every single day.',
    },
    {
      title: 'This is NOT a medical treatment',
      text: "This does not replace your doctor's advice or treat any medical condition.",
    },
    {
      title: 'This is NOT a fitness training program',
      text: 'Movement is part of the journey but this is not a gym program or workout plan.',
    },
    {
      title: 'This is NOT a quick fix',
      text: 'The program gives you the structure, you bring the consistency.',
    },
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
              lineHeight: 1.25,
              marginBottom: 14,
            }}
          >
            Good to Know <span style={{ color: '#EFB143' }}>Before You Start</span>
          </h2>
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 64, height: 3, background: '#EFB143', borderRadius: 9999 }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
            maxWidth: 1000,
            margin: '0 auto 36px',
          }}
          className="habit-disclaimer-grid"
        >
          {items.slice(0, 4).map(({ title, text }) => (
            <div
              key={title}
              style={{
                background: '#fff',
                border: '1.5px solid #EFB143',
                borderRadius: 16,
                padding: 'clamp(20px,2.5vw,26px)',
              }}
            >
              <h3
                className="font-[family-name:var(--font-bricolage)]"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 'clamp(16px,1.6vw,19px)',
                  fontWeight: 800,
                  color: '#111',
                  margin: '0 0 8px',
                  lineHeight: 1.35,
                }}
              >
				
                <span style={{ color: '#E5342A', fontWeight:'bolder', flexShrink: 0 }}>❌</span>
                {title}
              </h3>
              <p
                className="font-[family-name:var(--font-urbanist)]"
                style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: 0 }}
              >
                {text}
              </p>
            </div>
          ))}

          <div
            style={{
              background: '#fff',
              border: '1.5px solid #EFB143',
              borderRadius: 16,
              padding: 'clamp(20px,2.5vw,26px)',
              gridColumn: '1 / -1',
              maxWidth: 620,
              margin: '0 auto',
              width: '100%',
            }}
            className="habit-disclaimer-last"
          >
            <h3
              className="font-[family-name:var(--font-bricolage)]"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: 'clamp(16px,1.6vw,19px)',
                fontWeight: 800,
                color: '#111',
                margin: '0 0 8px',
                lineHeight: 1.35,
              }}
            >
              <span style={{ color: '#E5342A', fontWeight: 800, flexShrink: 0 }}>❌</span>
              {items[4].title}
            </h3>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 15, color: '#666', lineHeight: 1.6, margin: 0 }}
            >
              {items[4].text}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onRegister}
            className="font-[family-name:var(--font-poppins)]"
            style={{
              background: '#EFB143',
              color: '#111',
              borderRadius: 9999,
              padding: '16px 44px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Yes, I Want My 60-Day Reset
          </button>
        </div>
      </div>
    </section>
  )
}

// ── WHO IS THIS FOR ────────────────────────────────────────────────────
function WhoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div
      style={{
        background: '#FFFBE7',
        borderLeft: '4px solid #EFB143',
        borderRadius: 12,
        padding: 'clamp(20px,2.5vw,26px)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
      }}
    >
      <SvgIcon src={icon} size={34} color="#EFB143" style={{ marginTop: 2 }} />
      <div>
        <h3
          className="font-[family-name:var(--font-bricolage)]"
          style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 6px' }}
        >
          {title}
        </h3>
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 15, color: '#555', lineHeight: 1.6, margin: 0 }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

function WhoForSection({ onRegister }: { onRegister: () => void }) {
  const items = [
    {
      icon: '/images/health-reset/svg1.svg',
      title: 'The Busy Professional',
      text: 'Long hours, back-to-back meetings, running on caffeine and willpower alone.',
    },
    {
      icon: '/images/health-reset/steth.svg',
      title: 'The "My Doctor Just Warned Me" Person',
      text: 'A wake-up call at the last check-up, and a real plan is needed before it becomes a diagnosis.',
    },
    {
      icon: '/images/health-reset/tiredmom.svg',
      title: 'The Tired Mom or Dad',
      text: 'Putting everyone else first all day and running on empty by 3pm.',
    },
    {
      icon: '/images/health-reset/battery.svg',
      title: 'The Always Tired One',
      text: 'Sleeping a full eight hours and still waking up exhausted.',
    },
    {
      icon: '/images/health-reset/down.svg',
      title: 'The "Nothing Has Worked For Me" Person',
      text: 'Every diet, every app, every 21-day challenge tried — and always back at square one.',
    },
  ]

  return (
    <section style={{ background: '#FFF9F0', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3.5vw,42px)',
              fontWeight: 800,
              color: '#111',
              lineHeight: 1.25,
              maxWidth: 900,
              margin: '0 auto 12px',
            }}
          >
            Who This <span style={{ color: '#EFB143' }}>60-Day Health Reset</span>{' '}
            Is Really For&hellip;
          </h2>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{ fontSize: 16, color: '#666', margin: '0 0 16px' }}
          >
            (The Blueprint for the &quot;Modern Indian&quot; Health Crisis)
          </p>
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 64, height: 3, background: '#EFB143', borderRadius: 9999 }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
            maxWidth: 1000,
            margin: '0 auto 36px',
          }}
          className="habit-disclaimer-grid"
        >
          {items.slice(0, 4).map((item) => (
            <WhoCard key={item.title} {...item} />
          ))}

          <div
            style={{ gridColumn: '1 / -1', maxWidth: 620, margin: '0 auto', width: '100%' }}
            className="habit-disclaimer-last"
          >
            <WhoCard {...items[4]} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onRegister}
            className="font-[family-name:var(--font-poppins)]"
            style={{
              background: '#EFB143',
              color: '#111',
              borderRadius: 9999,
              padding: '16px 44px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Yes, I Want My 60-Day Reset
          </button>
        </div>
      </div>
    </section>
  )
}

// ── BEFORE / AFTER ──────────────────────────────────────────────────────
// right.svg / block.svg are already fully-colored, self-contained icons
// (a filled circle + checkmark/slash with no transparent cutout between
// them) — rendering them through SvgIcon's mask would only see one opaque
// blob and paint it flat, losing the check/slash. Render as plain images.
function StatusIcon({ type, size = 26 }: { type: 'no' | 'yes'; size?: number }) {
  return (
    <img
      src={type === 'yes' ? '/images/health-reset/right.svg' : '/images/health-reset/block.svg'}
      width={size}
      height={size}
      alt=""
      style={{ marginTop: 2, flexShrink: 0 }}
    />
  )
}

function BeforeAfterSection({ onRegister }: { onRegister: () => void }) {
  const before = [
    {
      title: 'The "Tired of Being Tired" Cycle',
      text: 'You rely on 3-4 cups of chai or coffee just to survive the afternoon.',
    },
    {
      title: 'The "Yo-Yo" Diet Struggle',
      text: 'You lose 5kg on a crash diet only to gain back 7kg two weeks later.',
    },
    {
      title: 'The "Construction Zone" Gut',
      text: 'You feel bloated, heavy, and gassy after almost every meal.',
    },
    {
      title: 'Information Overload',
      text: 'You\'re confused by 100 different fitness influencers and "health hacks"',
    },
  ]
  const after = [
    {
      title: 'Natural, All-Day Energy',
      text: 'You wake up refreshed and have steady energy without the caffeine crashes.',
    },
    {
      title: 'Sustainable Habit Stacking',
      text: 'You build small habits that stick, supporting you with your weight management journey',
    },
    {
      title: 'Smooth & Quiet Digestion',
      text: 'You feel light and comfortable, with a gut that finally feels "at peace."',
    },
    {
      title: 'Doctor-Led Clarity',
      text: 'You follow one clear, science-backed roadmap by US-based GI specialist, delivered step-by-step by his team',
    },
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
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            Stop Managing Symptoms - <span style={{ color: '#EFB143' }}>Start Resetting Your Health</span>
          </h2>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{ fontSize: 16, color: '#666', margin: '0 0 16px' }}
          >
            See the &lsquo;difference&rsquo; between managing symptoms and actually resetting your health.
          </p>
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 64, height: 3, background: '#EFB143', borderRadius: 9999 }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(16px,3vw,32px)',
          }}
          className="habit-beforeafter-grid"
        >
          {/* BEFORE */}
          <div
            style={{
              position: 'relative',
              background: '#FDF3F3',
              border: '1px solid #F6D4D4',
              borderRadius: 20,
              padding: 'clamp(28px,3vw,32px) clamp(16px,2.5vw,22px) clamp(16px,2.5vw,22px)',
            }}
          >
            <span
              className="font-[family-name:var(--font-poppins)]"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#E5342A',
                color: '#fff',
                borderRadius: 10,
                padding: '10px 32px',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              BEFORE
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {before.map(({ title, text }) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    background: '#FEFAFA',
                    border: '1px solid #F7DEDE',
                    borderRadius: 14,
                    padding: '16px 18px',
                  }}
                >
                  <StatusIcon type="no" />
                  <div>
                    <h3
                      className="font-[family-name:var(--font-bricolage)]"
                      style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 4px' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{ fontSize: 14, color: '#666', lineHeight: 1.55, margin: 0 }}
                    >
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AFTER */}
          <div
            style={{
              position: 'relative',
              background: '#F3FBF5',
              border: '1px solid #D7EEDB',
              borderRadius: 20,
              padding: 'clamp(28px,3vw,32px) clamp(16px,2.5vw,22px) clamp(16px,2.5vw,22px)',
            }}
          >
            <span
              className="font-[family-name:var(--font-poppins)]"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#22A559',
                color: '#fff',
                borderRadius: 10,
                padding: '10px 32px',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              AFTER
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {after.map(({ title, text }) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    background: '#FAFFFB',
                    border: '1px solid #DFF0E3',
                    borderRadius: 14,
                    padding: '16px 18px',
                  }}
                >
                  <StatusIcon type="yes" />
                  <div>
                    <h3
                      className="font-[family-name:var(--font-bricolage)]"
                      style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 4px' }}
                    >
                      {title}
                    </h3>
                    <p
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{ fontSize: 14, color: '#666', lineHeight: 1.55, margin: 0 }}
                    >
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button
            onClick={onRegister}
            className="font-[family-name:var(--font-poppins)]"
            style={{
              background: '#EFB143',
              color: '#111',
              borderRadius: 9999,
              padding: '16px 44px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Yes, I Want My 60-Day Reset
          </button>
        </div>
      </div>
    </section>
  )
}

// ── 60-DAY TIMELINE ──────────────────────────────────────────────────────
function TargetIcon({ size = 30, color = '#EFB143' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="13" r="8" stroke={color} strokeWidth="1.6" />
      <circle cx="11" cy="13" r="4.5" stroke={color} strokeWidth="1.6" />
      <circle cx="11" cy="13" r="1.2" fill={color} />
      <path d="M15.5 8.5 21 3m0 0h-4m4 0v4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TimelineCard({
  label,
  title,
  text,
  icon,
}: {
  label: string
  title: string
  text: string
  icon: string
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: '#fff',
        border: '1px solid #F3E6BE',
        borderRadius: 16,
        padding: 'clamp(28px,3vw,32px) clamp(18px,2.2vw,22px) clamp(18px,2.2vw,22px)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 84,
          height: 84,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon === 'target' ? (
          <TargetIcon size={50} color="#EFB143" />
        ) : (
          <SvgIcon src={icon} size={60} color="#EFB143" />
        )}
      </div>

      <span
        className="font-[family-name:var(--font-poppins)]"
        style={{
          position: 'absolute',
          top: 0,
          left: 20,
          transform: 'translateY(-50%)',
          background: '#EFB143',
          color: '#111',
          fontSize: 13,
          fontWeight: 800,
          padding: '8px 18px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>

      <h3
        className="font-[family-name:var(--font-bricolage)]"
        style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '10px 0 8px', maxWidth: '80%' }}
      >
        {title}
      </h3>
      <p
        className="font-[family-name:var(--font-urbanist)]"
        style={{ fontSize: 14, color: '#666', lineHeight: 1.6, margin: 0 }}
      >
        {text}
      </p>
    </div>
  )
}

function TimelineSection({ onRegister }: { onRegister: () => void }) {
  const weeks = [
    {
      label: 'Week 1-2',
      title: 'The Energy Boost',
      text: 'The first big win is realising you can have steady energy all day without needing extra tea or coffee to survive.',
      icon: '/images/health-reset/1.svg',
    },
    {
      label: 'Week 3-4',
      title: 'Better Rest & Focus',
      text: 'We focus on getting your body the rest it needs. You’ll notice you’re thinking faster and feeling more "alert."',
      icon: '/images/health-reset/2.svg',
    },
    {
      label: 'Week 5-6',
      title: 'Feeling Lighter',
      text: 'You’ll start to feel less "stuffed" or bloated. Your clothes might start to feel a little looser as your body heals.',
      icon: '/images/health-reset/3.svg',
    },
    {
      label: 'Week 7-8',
      title: 'Building Real Strength',
      text: 'You’ll learn how to fuel your body correctly so you feel full, satisfied, and strong every single day.',
      icon: '/images/health-reset/4.svg',
    },
    {
      label: 'Week 9',
      title: 'Ready for Anything',
      text: 'Nine habits. Running together. On autopilot. You’ll end Day 60 with a clear path for the rest of your life.',
      icon: '/images/health-reset/5.svg',
    },
    {
      label: 'Bonus',
      title: 'Exclusive Meditation Community',
      text: '8 week access to an exclusive meditation community. Learn to manage stress in a sustainable way.',
      icon: '/images/health-reset/5.svg',
    },
  ]

  return (
    <section style={{ background: '#FFF9F0', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={WRAP}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3.5vw,42px)',
              fontWeight: 800,
              color: '#111',
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            What Your <span style={{ color: '#EFB143' }}>60-Day Progress</span> Will Actually Look Like
          </h2>
          <p
            className="font-[family-name:var(--font-urbanist)]"
            style={{ fontSize: 16, color: '#666', margin: '0 0 16px' }}
          >
            Small weekly wins that add up to a permanent lifestyle shift.
          </p>
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 64, height: 3, background: '#EFB143', borderRadius: 9999 }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 40,
          }}
          className="habit-timeline-grid"
        >
          {weeks.map((week) => (
            <TimelineCard key={week.label} {...week} />
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
              padding: '16px 44px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Yes, I Want My 60-Day Reset
          </button>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ────────────────────────────────────────────────────────
const TESTIMONIAL_SHOTS = [
  { src: '/images/health-reset/testimonials/testinomial5.png', w: 1320, h: 727, alt: 'WhatsApp testimonial from Jayasree' },
  { src: '/images/health-reset/testimonials/testinomial2.png', w: 1068, h: 962, alt: 'WhatsApp testimonial from Suchitra Balu' },
  { src: '/images/health-reset/testimonials/testinomial3.png', w: 1320, h: 908, alt: 'WhatsApp testimonial from Gowri Satish' },
  { src: '/images/health-reset/testimonials/testinomial.png', w: 806, h: 811, alt: 'WhatsApp testimonial from Sud, Bharathi and Caroline Gladys J' },
  { src: '/images/health-reset/testimonials/testinomial6.png', w: 1320, h: 890, alt: 'WhatsApp testimonial from Ambika (Lakshmi)' },
  { src: '/images/health-reset/testimonials/testinomial7.png', w: 1320, h: 847, alt: 'WhatsApp testimonial from Jaya Lakshmi' },
  { src: '/images/health-reset/testimonials/testinomial8.png', w: 1320, h: 511, alt: 'WhatsApp testimonial from Chitra R' },
]

// Rendered twice back-to-back so the auto-scroll can loop seamlessly —
// once scrollLeft passes the first copy's width, it's reset by that same
// width and the visuals don't jump (the second copy is identical).
const TESTIMONIAL_LOOP = [...TESTIMONIAL_SHOTS, ...TESTIMONIAL_SHOTS]

function TestimonialSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const pauseThenResume = useCallback((ms: number) => {
    pausedRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
    }, ms)
  }, [])

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current
      if (!el) return
      pauseThenResume(3000)
      el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
    },
    [pauseThenResume],
  )

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let rafId: number

    function step() {
      if (el && !pausedRef.current) {
        el.scrollLeft += 0.6
        const halfWidth = el.scrollWidth / 2
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth
        }
      }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onTouchStart={() => { pausedRef.current = true }}
      onTouchEnd={() => pauseThenResume(2000)}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        className="habit-testimonial-track"
      >
        {TESTIMONIAL_LOOP.map(({ src, w, h, alt }, i) => (
          <div
            key={`${src}-${i}`}
            style={{ flex: '0 0 clamp(220px, 25vw, 360px)' }}
          >
            <Image
              src={src}
              alt={alt}
              width={w}
              height={h}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>

      <button
        aria-label="Previous testimonials"
        onClick={() => scrollByCard(-1)}
        className="habit-testimonial-arrow"
        style={{
          position: 'absolute',
          top: '50%',
          left: 12,
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#EFB143',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        aria-label="Next testimonials"
        onClick={() => scrollByCard(1)}
        className="habit-testimonial-arrow"
        style={{
          position: 'absolute',
          top: '50%',
          right: 12,
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#EFB143',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="#111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
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
              marginBottom: 12,
            }}
          >
            <span style={{ color: '#EFB143' }}>10,000+</span> Success Stories (And Counting)
          </h2>
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 64, height: 3, background: '#EFB143', borderRadius: 9999 }}
          />
        </div>
      </div>

      {/* Full-bleed, edge-to-edge slider — not constrained by WRAP */}
      <TestimonialSlider />

      <div style={WRAP}>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button
            onClick={onRegister}
            className="font-[family-name:var(--font-poppins)]"
            style={{
              background: '#EFB143',
              color: '#111',
              borderRadius: 9999,
              padding: '16px 44px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Yes, I Want My 60-Day Reset
          </button>
        </div>
      </div>
    </section>
  )
}

// ── ABOUT DR. PAL ──────────────────────────────────────────────────────
const DRPAL_HIGHLIGHTS = [
  {
    emoji: '🎯',
    label: 'Health Reset Approach:',
    text: 'Using lifestyle habits to address common triggers of bloating, acidity, and low energy, not just mask the symptoms.',
  },
  {
    emoji: '🚀',
    label: 'Science-Backed Habits:',
    text: 'Replacing "internet myths" with medical evidence that actually works for busy, real-world lifestyles.',
  },
  {
    emoji: '💧',
    label: 'Deep Recovery:',
    text: 'Improving sleep, hydration, and nutrition so your body can rest and reset the way it was designed to.',
  },
  {
    emoji: '📋',
    label: 'Habit Architecture:',
    text: 'Helping you move away from the "willpower struggle" to a structured framework where health runs on autopilot.',
  },
  {
    emoji: '🌍',
    label: 'Proven at Scale:',
    text: '10,000+ people have transformed their health with real, measurable results.',
  },
]

function DrPalSection({ onRegister }: { onRegister: () => void }) {
  return (
    <section style={{ background: '#173B39', position: 'relative', overflow: 'hidden', padding: 'clamp(48px,7vw,96px) 0' }}>
      {/* Faint diagonal grid texture — echoes the Hero */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 42px)',
          maskImage: 'radial-gradient(circle at 85% 15%, black 0%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 85% 15%, black 0%, transparent 60%)',
        }}
      />

      <div style={{ ...WRAP, position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <h2
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3.5vw,42px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Meet the Expert Behind the Program
          </h2>
          <p
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontSize: 'clamp(24px,3vw,34px)',
              fontWeight: 800,
              color: '#FEF272',
              margin: '4px 0 14px',
            }}
          >
            Dr. Pal
          </p>
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 64, height: 3, background: '#FEF272', borderRadius: 9999 }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,420px) minmax(0,1fr)',
            gap: 'clamp(32px,5vw,56px)',
            alignItems: 'flex-start',
            marginBottom: 'clamp(32px,5vw,48px)',
          }}
          className="habit-drpal-grid"
        >
          {/* Photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image
              src="/images/health-reset/drpalhealth.png"
              alt="Dr. Pal"
              width={440}
              height={436}
              style={{ width: 'clamp(220px, 24vw, 420px)', height: 'auto' }}
            />
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.68)',
                fontSize: 14,
                lineHeight: 1.7,
                marginTop: 16,
                maxWidth: 340,
              }}
            >
              U.S.-Based Gastroenterologist &nbsp;|&nbsp; 3.5 Years of Lifestyle Medicine &nbsp;|&nbsp;
              10,000+ Lives Transformed
            </p>
          </div>

          {/* Bio card */}
          <div
            style={{
              background: '#0A4A45',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 20,
              padding: 'clamp(24px,3vw,36px)',
            }}
          >
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 16, color: '#fff', lineHeight: 1.7, margin: '0 0 14px' }}
            >
              <strong className="font-[family-name:var(--font-bricolage)]">Dr. Palaniappan Manickam</strong>{' '}
              is a practising gastroenterologist based in the United States who focuses on improving
              health by addressing root causes, not just managing symptoms.
            </p>
            <p
              className="font-[family-name:var(--font-urbanist)]"
              style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, margin: '0 0 22px' }}
            >
              After years of seeing patients rely on medications without lasting results, he shifted his
              approach toward science-backed lifestyle changes that actually support long-term health.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {DRPAL_HIGHLIGHTS.map(({ emoji, label, text }, i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '14px 0',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span aria-hidden style={{ fontSize: 18, lineHeight: 1.5, flexShrink: 0 }}>
                    {emoji}
                  </span>
                  <p
                    className="font-[family-name:var(--font-urbanist)]"
                    style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}
                  >
                    <strong className="font-[family-name:var(--font-bricolage)]" style={{ color: '#FEF272' }}>
                      {label}
                    </strong>{' '}
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <JoinBtn onClick={onRegister} variant="gold" />
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who is this challenge for?',
    a: "This is for anyone who wants to improve their health with a structured, practical approach — especially if you've struggled to stay consistent in the past.",
  },
  {
    q: 'Is this a diet plan or weight loss program?',
    a: "No. This is not a restrictive diet or a quick weight loss program. It's a habit-based system focused on improving your overall health in a sustainable way.",
  },
  {
    q: 'Will this fit into my busy schedule?',
    a: 'Yes. The habits are designed to be simple, practical, and easy to follow alongside work and daily responsibilities.',
  },
  {
    q: 'Will there be a personal consultation with the doctor?',
    a: 'No. This is a group-based challenge with structured guidance and community support, not a 1-on-1 medical consultation.',
  },
  {
    q: 'What kind of support will I get during the 60 days?',
    a: "You'll receive daily motivational messages, weekly habit challenges, daily progress polls, and support from Dr. Pal's trained nutritionists for challenge-related queries via a shared Google Sheet (8 AM – 8 PM IST).",
  },
  {
    q: 'I have a medical condition. Can I still join?',
    a: "This program does not replace your doctor's advice and is not designed as medical treatment. Please check with your physician before starting if you have an existing condition.",
  },
  {
    q: 'What happens if I complete all 60 days?',
    a: "You'll unlock an exclusive 30-minute virtual group session with Dr. Pal, plus 8 weeks of access to our exclusive meditation community.",
  },
]

function FAQItem({
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
    <div style={{ borderBottom: '1px solid #EBEBEB' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(15px,1.6vw,18px)',
            color: isOpen ? '#173B39' : '#111',
            flex: 1,
          }}
        >
          {question}
        </span>
        <span
          aria-hidden
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            color: isOpen ? '#EFB143' : '#999',
            flexShrink: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
            <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            {!isOpen && <path d="M12 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
        </span>
      </button>
      {isOpen && (
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{ fontSize: 15, color: '#555', lineHeight: 1.7, paddingBottom: 20, margin: 0, maxWidth: 800 }}
        >
          {answer}
        </p>
      )}
    </div>
  )
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section style={{ background: '#fff', padding: 'clamp(48px,7vw,96px) 0' }}>
      <div style={{ ...WRAP, maxWidth: 860 }}>
        <h2
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(24px,3.5vw,42px)',
            fontWeight: 800,
            color: '#111',
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 1.2,
          }}
        >
          Frequently Asked Questions
        </h2>
        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              question={item.q}
              answer={item.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA ────────────────────────────────────────────────────────────
function FinalCtaSection({ onRegister }: { onRegister: () => void }) {
  return (
    <section style={{ background: '#173B39', padding: 'clamp(48px,7vw,88px) 0' }}>
      <div style={{ ...WRAP, textAlign: 'center' }}>
        <span
          className="font-[family-name:var(--font-poppins)]"
          style={{
            display: 'inline-block',
            background: 'rgba(254,242,114,0.14)',
            color: '#FEF272',
            borderRadius: 9999,
            padding: '8px 20px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Starts August 1st · Limited Seats
        </span>
        <h2
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontSize: 'clamp(26px,3.6vw,44px)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Your 60-Day Reset Starts Now
        </h2>
        <p
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontSize: 'clamp(15px,1.6vw,18px)',
            color: 'rgba(255,255,255,0.72)',
            marginBottom: 32,
            maxWidth: 620,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Seats are limited to keep the group accountable. Reserve yours before
          the August 1st start date.
        </p>
        <button
          onClick={onRegister}
          className="font-[family-name:var(--font-poppins)]"
          style={{
            background: '#FEF272',
            color: '#173B39',
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
          Join Now! <span style={{ fontSize: '1.1em' }}>→</span>
        </button>
      </div>
    </section>
  )
}

// ── RESPONSIVE STYLES ─────────────────────────────────────────────────
const RESPONSIVE_CSS = `
  @media (max-width: 767px) {
    .habit-hero-grid {
      grid-template-columns: 1fr !important;
    }
    .habit-drpal-grid {
      grid-template-columns: 1fr !important;
    }
    .habit-beforeafter-grid {
      grid-template-columns: 1fr !important;
    }
    .habit-disclaimer-grid {
      grid-template-columns: 1fr !important;
    }
    .habit-disclaimer-last {
      max-width: 100% !important;
    }
    .habit-timeline-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .habit-timeline-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  .habit-testimonial-track {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .habit-testimonial-track::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 640px) {
    .habit-testimonial-arrow {
      display: none !important;
    }
  }
`

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════
export default function HabitResetClient() {
  const goToCheckout = useCallback(() => {
    // Carry first-touch UTM across the external Razorpay redirect so the
    // payment can be attributed to the original campaign.
    window.location.href = appendUtmToUrl(CHECKOUT_URL)
  }, [])

  useEffect(() => {
    captureUtm()
  }, [])

  return (
    <>
      <style>{RESPONSIVE_CSS}</style>

      <StickyBar onRegister={goToCheckout} />

      {/* Main page — white background, bottom padding for sticky bar */}
      <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 70 }}>
        <Hero onRegister={goToCheckout} />
        <RewardBanner />
        <DisclaimersSection onRegister={goToCheckout} />
        <WhoForSection onRegister={goToCheckout} />
        <BeforeAfterSection onRegister={goToCheckout} />
        <TimelineSection onRegister={goToCheckout} />
        <TestimonialsSection onRegister={goToCheckout} />
        <DrPalSection onRegister={goToCheckout} />
        <FAQSection />
        <FinalCtaSection onRegister={goToCheckout} />

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
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
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
