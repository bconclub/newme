'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

// Figma "Group 252" (1:6285) at y=7744. Heading + subhead row, then 3 cards
// 587×402 each, then 3 pagination dots, then a 1801×348 ratings card with
// Trustpilot center.
const testimonials = [
  {
    quote:
      'After years of poor gut health and binge eating, my fasting blood sugar improved and my cravings completely stopped. Physically and mentally, I feel much better now.',
    name: 'Nithya',
    pathway: 'GI Core Pathway',
    avatar:
      'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    quote:
      'In 2 years, my HbA1c dropped from 6.1 to 5.7, LDL from 146 to 86, and my liver size reduced from 16.7 cm to 14.0 cm. I feel healthier and more confident than ever.',
    name: 'Kat',
    pathway: 'Sustain Pathway',
    avatar:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    quote:
      'From being worried about diabetes and fatty liver, I’ve seen my HbA1c come down from 7.2 to 5.7 and my blood sugar stabilize. I’m now navigating my health with much more confidence.',
    name: 'Thamarai',
    pathway: 'Rebuild Pathway',
    avatar:
      'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative pb-0"
      style={{
        // Testimonials frame top y=7744; previous (StructuredCare cards end
        // y=7469) → 275px artboard gap. Tuned for visual breathing.
        paddingTop: 'clamp(80px, calc(160 / 1920 * 100vw), 160px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1801 }}>
        {/* Top row — Figma: heading on left (x=212), subhead on right (x=969).
            Heading top y=7816, subhead top y=7828 (heading 12px above). */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div>
            {/* Eyebrow pill — shared component. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
            >
              <EyebrowPill>Testimonials</EyebrowPill>
            </motion.div>
            {/* Heading — Figma 1:6288: x=212, y=7816, 611×144 (2 lines × 72).
                72 - 48 (pill) - 16 (gap) = ... actual gap from pill to heading
                = 7816-(7744+48) = 24px. */}
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
          {/* Subhead — Figma 1:6287: x=969, y=7828, w=698, h=90 (3 lines × 30).
              Urbanist 24px lh 30. */}
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
              letterSpacing: 0,
              maxWidth: 698,
              marginTop: 'clamp(40px, calc(96 / 1920 * 100vw), 96px)', // align baseline-ish with H2
            }}
          >
            Structured care produces measurable, sustained outcomes. These are
            not before-and-after stories. They are accounts of bodies returning
            to regulation.
          </motion.p>
        </div>

        {/* Cards row — Figma: 3 cards 587×402, gap 20px between, total 1801. */}
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
              className="relative overflow-hidden border border-white/8"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                minHeight: 'clamp(280px, calc(402 / 1920 * 100vw), 402px)',
              }}
            >
              {/* Decorative ellipse on cards 2/3 — Figma Ellipse 55/59 */}
              {i > 0 && (
                <div
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    top: 'clamp(-80px, calc(22 / 1920 * 100vw), 22px)',
                    left: 'clamp(-60px, calc(114 / 1920 * 100vw), 114px)',
                    width: 'clamp(180px, calc(351 / 1920 * 100vw), 351px)',
                    height: 'clamp(180px, calc(351 / 1920 * 100vw), 351px)',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(254,242,114,0.10) 0%, rgba(254,242,114,0) 70%)',
                  }}
                />
              )}
              {/* Quote — Figma: Urbanist 24px lh 30, 491 wide, top 48px from card top */}
              <div
                className="relative h-full flex flex-col"
                style={{
                  paddingTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
                  paddingBottom: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
                  paddingLeft: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                  paddingRight: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                }}
              >
                <p
                  className="text-white font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontWeight: 500,
                    fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                    lineHeight: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                    maxWidth: 491,
                  }}
                >
                  {t.quote}
                </p>
                {/* Avatar + name — Figma: avatar 64×64 at x=107 (=48 from card
                    edge), name+meta to right. */}
                <div
                  className="flex items-center mt-auto"
                  style={{
                    gap: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)',
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
                    <p
                      className="text-white font-[family-name:var(--font-bricolage)]"
                      style={{
                        fontWeight: 500,
                        fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                        lineHeight: 1.2,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-white/60 font-[family-name:var(--font-urbanist)] mt-1"
                      style={{
                        fontWeight: 400,
                        fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
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

        {/* Pagination dots — Figma: 3 ellipses 16×16 at y=8450 centered */}
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
                background:
                  i === 1 ? '#FEF272' : 'rgba(255, 255, 255, 0.25)',
              }}
            />
          ))}
        </div>

        {/* Ratings card — Figma 1:3957 (Rectangle 110): 1801×348, with
            Trustpilot logo center and 4.6 / 4.7 ratings on left/right. */}
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
      className="relative overflow-hidden border border-white/8"
      style={{
        marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
        minHeight: 'clamp(220px, calc(348 / 1920 * 100vw), 348px)',
      }}
    >
      <div className="relative h-full grid grid-cols-3 items-center">
        {/* Left rating: 4.6 — Figma at x=421, label at x=310. Block ~348 wide.
            Stars 144×24 above, number 125×72 (= 72px font), label 28px tall. */}
        <RatingBlock score="4.6" label="Patient Satisfaction on" trustpilot />
        {/* Center: Trustpilot brand — Figma 1:3961: 225×242 icon + noun-trusted
            172×172 badge. Use a styled trust badge as visual placeholder. */}
        <div className="flex flex-col items-center justify-center">
          <span
            className="font-[family-name:var(--font-bricolage)] text-white/90 tracking-tight"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(56 / 1920 * 100vw), 56px)',
              lineHeight: 1.05,
            }}
          >
            Trusted by
          </span>
          <span
            className="font-[family-name:var(--font-bricolage)] text-[#FEF272]"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(56 / 1920 * 100vw), 56px)',
              lineHeight: 1.05,
            }}
          >
            thousands
          </span>
          <span
            className="text-white/60 font-[family-name:var(--font-urbanist)]"
            style={{
              marginTop: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
              fontSize: 'clamp(12px, calc(14 / 1920 * 100vw), 14px)',
            }}
          >
            verified outcomes
          </span>
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
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div className="flex items-center" style={{ gap: 'clamp(2px, calc(4 / 1920 * 100vw), 4px)' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={'clamp(16px, calc(24 / 1920 * 100vw), 24px)'} />
        ))}
      </div>
      <p
        className="text-white font-[family-name:var(--font-bricolage)]"
        style={{
          fontWeight: 600,
          fontSize: 'clamp(40px, calc(72 / 1920 * 100vw), 72px)',
          lineHeight: 1,
          marginTop: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)',
        }}
      >
        {score}
      </p>
      <p
        className="text-white/85 font-[family-name:var(--font-urbanist)]"
        style={{
          fontWeight: 500,
          fontSize: 'clamp(13px, calc(20 / 1920 * 100vw), 20px)',
          lineHeight: 1.3,
          marginTop: 'clamp(12px, calc(24 / 1920 * 100vw), 24px)',
        }}
      >
        {label}
        {trustpilot && (
          <span className="ml-1 text-[#00B67A] font-semibold">Trustpilot</span>
        )}
      </p>
    </div>
  )
}

function Star({ size }: { size: string }) {
  return (
    <svg
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="#FEF272"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
