'use client'

// Client-side sections for the Virtual Clinic page. Extracted from
// page.tsx (which stays a server component because it exports metadata)
// so we can use framer-motion for subtle entry animations on the
// What-Is, How-It-Works, and Doctor cards.

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// What Is The NewME Virtual Clinic?
// ─────────────────────────────────────────────────────────────────────────────
export function VCWhatIs() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(40px, calc(60 / 1920 * 100vw), 60px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1194 }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-left md:text-center font-[family-name:var(--font-bricolage)] text-white md:mx-auto"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(26px, calc(46 / 1920 * 100vw), 46px)',
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            maxWidth: 'clamp(280px, calc(706 / 1920 * 100vw), 706px)',
          }}
        >
          What Is The NewME Virtual Clinic?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="text-left md:text-center md:mx-auto text-white/85 font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 400,
            fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
            lineHeight: 1.7,
            maxWidth: 'clamp(280px, calc(917 / 1920 * 100vw), 917px)',
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          The NewME Virtual Clinic offers direct access point to qualified
          doctors for focused medical consultations. It is designed for
          individuals who need clinical clarity, guidance, or evaluation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="vc-glass relative overflow-hidden"
          style={{
            marginTop: 'clamp(48px, calc(80 / 1920 * 100vw), 80px)',
            borderRadius: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
            border: '1px solid rgba(255, 255, 255, 0.28)',
            padding:
              'clamp(28px, calc(80 / 1920 * 100vw), 80px) clamp(24px, calc(80 / 1920 * 100vw), 80px)',
            minHeight: 'clamp(280px, calc(374 / 1920 * 100vw), 374px)',
          }}
        >
          <h3
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontWeight: 600,
              color: '#FEF272',
              fontSize: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Who It&rsquo;s For:
          </h3>
          <ul
            className="space-y-0"
            style={{ marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}
          >
            {[
              'Individuals seeking clarity on existing metabolic & gut conditions',
              'Those considering structured care but want a deeper understanding',
              'Patients looking for a second opinion or medical guidance',
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-4 text-white font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
                  lineHeight: 'clamp(28px, calc(34 / 1920 * 100vw), 34px)',
                  paddingTop: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
                }}
              >
                <span
                  aria-hidden
                  className="rounded-full bg-[#FEF272] shrink-0"
                  style={{
                    width: 8,
                    height: 8,
                    marginTop: 'clamp(11px, calc(13 / 1920 * 100vw), 13px)',
                  }}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works
// ─────────────────────────────────────────────────────────────────────────────
export function VCHowItWorks() {
  const steps = [
    {
      n: 'Step 1',
      title: 'Book and complete a short form',
      body:
        'Secure your consultation and share your basic health details in advance so your session is focused and efficient.',
    },
    {
      n: 'Step 2',
      title: 'Schedule your consultation',
      body:
        'Your information is reviewed by the team, and your appointment is confirmed based on availability.',
    },
    {
      n: 'Step 3',
      title: 'Speak with your doctor',
      body:
        'A 30–45 minute video consultation. Gastrointestinal cases are handled by a senior specialist; all other concerns by field-specific experts.',
    },
    {
      n: 'Step 4',
      title: 'Receive your care plan',
      body:
        'You receive clinical notes, a personalized care plan, and follow-up guidance after your session.',
    },
  ]

  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(40px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1194 }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 600,
            color: '#FEF272',
            fontSize: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          How It Works?
        </motion.h2>

        <ol
          className="mt-10"
          style={{ marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)' }}
        >
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-2 gap-x-8"
              style={{
                paddingTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                paddingBottom: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                borderBottom:
                  i < steps.length - 1
                    ? '1px solid rgba(255, 255, 255, 0.18)'
                    : 'none',
              }}
            >
              <span
                className="text-white/55 font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                  lineHeight: 1.4,
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="text-white font-[family-name:var(--font-bricolage)]"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-white/80 font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
                    lineHeight: 1.55,
                    marginTop: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
                    maxWidth: 'clamp(280px, calc(917 / 1920 * 100vw), 917px)',
                  }}
                >
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// The Doctor Will See You Now
// ─────────────────────────────────────────────────────────────────────────────
export function VCDoctorCard() {
  return (
    <section
      id="contact"
      className="relative"
      style={{
        paddingTop: 'clamp(40px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="vc-glass relative mx-auto overflow-hidden"
        style={{
          maxWidth: 1192,
          borderRadius: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          paddingTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        }}
      >
        <div className="relative">
          <h2
            className="text-left md:text-center md:mx-auto font-[family-name:var(--font-bricolage)]"
            style={{
              fontWeight: 600,
              color: '#FEF272',
              fontSize: 'clamp(28px, calc(64 / 1920 * 100vw), 64px)',
              lineHeight: 0.9,
              letterSpacing: '-0.015em',
              maxWidth: 'clamp(280px, calc(1011 / 1920 * 100vw), 1011px)',
            }}
          >
            The Doctor Will See You Now.
          </h2>
          <p
            className="text-left md:text-center md:mx-auto text-white/90 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 1.45,
              marginTop: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            }}
          >
            Get in touch. We&rsquo;re just a message away.
          </p>

          <div
            className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4"
            style={{
              marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
            }}
          >
            <ContactPill
              kind="mail"
              eyebrow="Mail us"
              value="consult@drpalmanickam.com"
              href="mailto:consult@drpalmanickam.com"
              delay={0.2}
            />
            <ContactPill
              kind="whatsapp"
              eyebrow="Whatsapp"
              value="+91 97906 27006"
              href="https://wa.me/919790627006"
              delay={0.3}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function ContactPill({
  kind,
  eyebrow,
  value,
  href,
  delay = 0,
}: {
  kind: 'mail' | 'whatsapp'
  eyebrow: string
  value: string
  href: string
  delay?: number
}) {
  const iconBg =
    kind === 'mail' ? 'rgba(255, 133, 71, 0.23)' : 'rgba(98, 150, 117, 0.36)'
  const iconColor = kind === 'mail' ? '#F08B55' : '#629675'

  return (
    <motion.a
      href={href}
      target={kind === 'whatsapp' ? '_blank' : undefined}
      rel={kind === 'whatsapp' ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      whileHover={{ y: -2 }}
      className="group/pill flex items-center bg-white rounded-full transition-shadow hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)]"
      style={{
        height: 'clamp(64px, calc(88 / 1920 * 100vw), 88px)',
        paddingLeft: 4,
        paddingRight: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
        gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
      }}
    >
      <span
        aria-hidden
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 'clamp(56px, calc(80 / 1920 * 100vw), 80px)',
          height: 'clamp(56px, calc(80 / 1920 * 100vw), 80px)',
          background: iconBg,
          color: iconColor,
        }}
      >
        {kind === 'mail' ? (
          <svg
            viewBox="0 0 40 40"
            fill="none"
            style={{
              width: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
              height: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            <path
              d="M6.667 11.667a3.333 3.333 0 013.333-3.333h20a3.333 3.333 0 013.333 3.333v16.666A3.333 3.333 0 0130 31.667H10a3.333 3.333 0 01-3.333-3.334V11.667z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M8 12l12 8.333L32 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 49 49"
            fill="currentColor"
            style={{
              width: 'clamp(34px, calc(49 / 1920 * 100vw), 49px)',
              height: 'clamp(34px, calc(49 / 1920 * 100vw), 49px)',
            }}
          >
            <path d="M24.5 4.083C13.245 4.083 4.083 13.245 4.083 24.5c0 3.605.952 7.135 2.762 10.236L4.124 44.916l10.405-2.7a20.371 20.371 0 0 0 9.97 2.534h.001c11.255 0 20.417-9.162 20.417-20.417 0-5.456-2.124-10.585-5.98-14.443A20.297 20.297 0 0 0 24.5 4.083zm0 37.396a16.97 16.97 0 0 1-8.652-2.367l-.62-.368-6.18 1.604 1.65-6.022-.404-.642A16.945 16.945 0 0 1 7.55 24.5c0-9.345 7.605-16.95 16.95-16.95 4.527 0 8.78 1.764 11.978 4.967a16.84 16.84 0 0 1 4.972 11.984c0 9.346-7.604 16.951-16.95 16.978zm9.296-12.701c-.51-.255-3.013-1.487-3.479-1.658-.466-.17-.806-.255-1.146.255-.34.51-1.317 1.658-1.614 1.998-.297.34-.594.382-1.103.127-.51-.255-2.151-.793-4.099-2.531-1.515-1.353-2.538-3.025-2.834-3.535-.297-.51-.032-.785.224-1.04.23-.229.51-.595.764-.892.255-.297.34-.51.51-.85.17-.34.085-.637-.043-.892-.127-.255-1.146-2.762-1.572-3.78-.413-.991-.834-.857-1.146-.873-.297-.014-.637-.017-.977-.017a1.876 1.876 0 0 0-1.36.638c-.467.51-1.785 1.745-1.785 4.252 0 2.508 1.827 4.93 2.082 5.27.255.34 3.595 5.49 8.711 7.7 1.218.526 2.169.84 2.91 1.075 1.222.388 2.334.333 3.213.202.98-.146 3.013-1.232 3.439-2.422.425-1.19.425-2.21.297-2.422-.127-.213-.467-.34-.977-.595z" />
          </svg>
        )}
      </span>
      <div className="flex flex-col min-w-0">
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 400,
            color: '#173B39',
            fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
            lineHeight: 1.25,
          }}
        >
          {eyebrow}
        </span>
        <span
          className="truncate font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 500,
            color: '#000',
            fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
            lineHeight: 1.3,
            marginTop: 2,
          }}
        >
          {value}
        </span>
      </div>
    </motion.a>
  )
}
