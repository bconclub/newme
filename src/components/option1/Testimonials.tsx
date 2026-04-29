'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const testimonials = [
  {
    quote:
      'After years of poor gut health and binge eating, my fasting blood sugar improved and my cravings completely stopped. Physically and mentally, I feel much better now.',
    name: 'Nithya',
    pathway: 'GI Core Pathway',
    avatar: '/testimonials/nithya.jpg',
    variant: 'white' as const,
  },
  {
    quote:
      'In 2 years, my HbA1c dropped from 6.1 to 5.7, LDL from 146 to 86, and my liver size reduced from 16.7 cm to 14.0 cm. I feel healthier and more confident than ever.',
    name: 'Kat',
    pathway: 'Sustain Pathway',
    avatar: '/testimonials/kat.jpg',
    variant: 'glass' as const,
  },
  {
    quote:
      "From being worried about diabetes and fatty liver, I've seen my HbA1c come down from 7.2 to 5.7 and my blood sugar stabilize. I'm now navigating my health with much more confidence.",
    name: 'Thamarai',
    pathway: 'Rebuild Pathway',
    avatar: '/testimonials/thamarai.jpg',
    variant: 'glass' as const,
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative"
      style={{
        paddingTop: 'clamp(80px, calc(160 / 1920 * 100vw), 160px)',
        /* Page-bg offset between the rating card and the footer's darker bg,
           per Figma. Without this the rating card looks fused to the footer. */
        paddingBottom: 'clamp(48px, calc(96 / 1920 * 100vw), 96px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1801 }}>
        {/* Header row — eyebrow + heading left, body text right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              {/* Figma 1:6291 — Bricolage Light 24px white, pill: backdrop-blur-[2px]
                  border border-solid border-white h-[48px] rounded-[40px] w-[179px] */}
              <EyebrowPill>Testimonials</EyebrowPill>
            </motion.div>

            {/* Figma 1:6288 — Bricolage SemiBold 72px white, 2 lines */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
                lineHeight: 1,
                letterSpacing: 0,
                marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                maxWidth: 611,
              }}
            >
              Real Patients.
              <br />
              Real Experiences.
            </motion.h2>
          </div>

          {/* Figma 1:6287 — Urbanist Regular 24px / lh 30px white, 698px wide */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/85 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
              maxWidth: 698,
              marginTop: 'clamp(40px, calc(96 / 1920 * 100vw), 96px)',
            }}
          >
            Structured care produces measurable, sustained outcomes. These are
            not before-and-after stories. They are accounts of bodies returning
            to regulation.
          </motion.p>
        </div>

        {/* Cards row — Figma: 3 cards 587×402 each, gap 20px */}
        <div
          className="grid sm:grid-cols-3"
          style={{
            gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden"
              style={
                t.variant === 'white'
                  ? {
                      /* Figma 1:6292 — bg-white rounded-[40px] */
                      background: '#FFFFFF',
                      borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
                      minHeight: 'clamp(280px, calc(402 / 1920 * 100vw), 402px)',
                    }
                  : {
                      /* Figma 1:6293 / 1:6294 — frosted-glass over the green wash.
                         Slight bump in white opacity + stronger blur + saturate
                         desaturation softens the green bleed-through so the
                         cards read as light frost (Figma) instead of full green. */
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 100%), linear-gradient(90deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.30) 100%)',
                      backdropFilter: 'blur(18px) saturate(85%)',
                      WebkitBackdropFilter: 'blur(18px) saturate(85%)',
                      border: '2px solid rgba(255,255,255,0.85)',
                      borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
                      minHeight: 'clamp(280px, calc(402 / 1920 * 100vw), 402px)',
                    }
              }
            >
              {/* Decorative ellipse glow behind glass cards */}
              {i > 0 && (
                <div
                  aria-hidden
                  className="absolute pointer-events-none inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 120% 110% at 50% 30%, rgba(254,242,114,0.07) 0%, transparent 70%)',
                  }}
                />
              )}

              <div
                className="relative h-full flex flex-col"
                style={{
                  paddingTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
                  paddingBottom: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
                  paddingLeft: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                  paddingRight: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                }}
              >
                {/* Quote — Figma: Urbanist Regular 24px / lh 30px, 491px wide */}
                <p
                  className="font-[family-name:var(--font-urbanist)]"
                  style={{
                    color: t.variant === 'white' ? '#000000' : '#FFFFFF',
                    fontWeight: 400,
                    fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                    lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                    maxWidth: 491,
                  }}
                >
                  {t.quote}
                </p>

                {/* Avatar + name — Figma: avatar 64×64 masked circle */}
                <div
                  className="flex items-center mt-auto"
                  style={{
                    gap: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                    paddingTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                  }}
                >
                  <div
                    className="rounded-full bg-cover bg-center shrink-0"
                    style={{
                      width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                      height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                      backgroundImage: `url('${t.avatar}')`,
                    }}
                  />
                  <div>
                    {/* Figma: name in Bricolage Light 24px
                        Card 1 → black; Cards 2&3 → #fef272 yellow */}
                    <p
                      className="font-[family-name:var(--font-bricolage)]"
                      style={{
                        color: t.variant === 'white' ? '#000000' : '#FEF272',
                        fontWeight: 300,
                        fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                        lineHeight: 1,
                      }}
                    >
                      {t.name}
                    </p>
                    {/* Figma: pathway in Bricolage Regular 16px
                        Card 1 → #629675; Cards 2&3 → white */}
                    <p
                      className="font-[family-name:var(--font-bricolage)] mt-1"
                      style={{
                        color: t.variant === 'white' ? '#629675' : '#FFFFFF',
                        fontWeight: 400,
                        fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                        lineHeight: 1.2,
                      }}
                    >
                      {t.pathway}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots — Figma 1:6319 (yellow active) 1:6320 1:6321 (grey)
            Order: grey | yellow | grey. Middle dot is active. */}
        <div
          className="flex items-center justify-center"
          style={{
            gap: 'clamp(4px, calc(6 / 1920 * 100vw), 6px)',
            marginTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden
              className="block rounded-full"
              style={{
                width: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                height: 'clamp(10px, calc(16 / 1920 * 100vw), 16px)',
                background: i === 1 ? '#FEF272' : 'rgba(255,255,255,0.30)',
              }}
            />
          ))}
        </div>

        {/* Ratings card — solid white bg, shield center, orange stars+scores */}
        <RatingsCard />
      </div>
    </section>
  )
}

function RatingsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      /* Figma 1:3957 — bg-white border-2 border-white backdrop-blur-[10.25px]
         overflow-clip rounded-[34px] h=348 */
      className="relative overflow-hidden bg-white border-2 border-white"
      style={{
        marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
        borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
        backdropFilter: 'blur(10.25px)',
        WebkitBackdropFilter: 'blur(10.25px)',
      }}
    >
      <div className="relative grid grid-cols-1 sm:grid-cols-3 items-center py-12 sm:py-14 gap-10 sm:gap-0">
        <RatingBlock score="4.6" label="Patient Satisfaction on" trustpilot />
        {/* Figma 1:6354 — shield center */}
        <div className="flex items-center justify-center">
          <ShieldIcon size="clamp(90px, calc(130 / 1920 * 100vw), 130px)" />
        </div>
        <RatingBlock score="4.7" label="Program Completion Rate" />
      </div>
    </motion.div>
  )
}

function RatingBlock({
  score,
  label,
  trustpilot,
}: {
  score: string
  label: string
  trustpilot?: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      {/* 5 orange stars */}
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size="clamp(20px, calc(28 / 1920 * 100vw), 28px)" />
        ))}
      </div>
      {/* Score — Figma: Poppins SemiBold 80px #629675 */}
      <p
        className="font-[family-name:var(--font-poppins)]"
        style={{
          color: '#629675',
          fontWeight: 600,
          fontSize: 'clamp(52px, calc(80 / 1920 * 100vw), 80px)',
          lineHeight: 1,
          marginTop: 8,
        }}
      >
        {score}
      </p>
      {/* Label — Figma: Urbanist Medium 24px #013e37 */}
      <p
        className="font-[family-name:var(--font-urbanist)]"
        style={{
          color: '#013e37',
          fontWeight: 500,
          fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 22px)',
          lineHeight: 1.3,
          marginTop: 10,
        }}
      >
        {label}
      </p>
      {trustpilot && (
        /* Trustpilot on its own line — black ★ svg + "Trustpilot" text */
        <div
          className="flex items-center justify-center gap-1 font-[family-name:var(--font-poppins)]"
          style={{
            color: '#191919',
            fontWeight: 400,
            fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 22px)',
            marginTop: 4,
          }}
        >
          <TrustpilotStar />
          Trustpilot
        </div>
      )}
    </div>
  )
}

/* Trustpilot logo star — exact Trustpilot green #00B67A */
function TrustpilotStar() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#00B67A"
      aria-hidden
      style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function Star({ size }: { size: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="#FF8547"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* Figma 1:6354 — noun-trusted-1902111 3
   Shield: #013e37 fill, white circle badge with #013e37 checkmark.
   Group inset: 5% top, 14.91% right, 6% bottom, 14% left. */
function ShieldIcon({ size }: { size: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 200 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Shield body */}
      <path
        d="M100 6L188 36V108C188 162 150 206 100 220C50 206 12 162 12 108V36L100 6Z"
        fill="#013e37"
      />
      {/* White circle badge */}
      <circle cx="100" cy="130" r="52" fill="white" />
      {/* Checkmark */}
      <path
        d="M76 130L92 147L126 112"
        stroke="#013e37"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
