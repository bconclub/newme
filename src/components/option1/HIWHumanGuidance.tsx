'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const POINTS = [
  {
    heading: 'A real physician reviews your case',
    body: 'Not an algorithm. Dr. Pal\'s clinical team reviews your full intake — labs, symptoms, history — before any pathway is assigned.',
  },
  {
    heading: 'Care that adapts as you progress',
    body: 'Scheduled clinical reviews at each phase milestone mean your protocol is updated as your body responds, not held static for months.',
  },
  {
    heading: 'Coaches coordinated with clinicians',
    body: 'Your health coach works from the same clinical record. When something needs escalation, it happens in the same system — no information lost in handoffs.',
  },
  {
    heading: 'Specialist access without the wait',
    body: 'Dietitians, gastroenterologists, and metabolic specialists are part of the system — reachable when you need them, not gated behind a months-long referral.',
  },
  {
    heading: 'Accountability that holds over time',
    body: 'NewME is designed for long-term outcomes. The structures in place ensure your momentum doesn\'t collapse when motivation fluctuates.',
  },
]

const pointVariants = {
  hidden: { opacity: 0, x: 16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HIWHumanGuidance() {
  return (
    <section
      id="hiw-human-guidance"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(140 / 1920 * 100vw), 140px)',
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row items-center gap-[clamp(40px,calc(80/1920*100vw),80px)]"
        style={{ maxWidth: 1800 }}
      >
        {/* Left — image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 w-full lg:w-auto shrink-0"
          style={{
            maxWidth: 680,
            aspectRatio: '4 / 5',
            borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            overflow: 'hidden',
            minHeight: 'clamp(320px, calc(600 / 1920 * 100vw), 600px)',
          }}
        >
          <Image
            src="/images/home/Hero image.webp"
            alt="NewME care team working together"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          {/* Pine overlay to give it the right tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(1,62,55,0.40) 0%, rgba(1,62,55,0.10) 50%, transparent 75%)',
            }}
          />
        </motion.div>

        {/* Right — text content */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
          style={{ maxWidth: 800 }}
        >
          <EyebrowPill>Human-first care</EyebrowPill>

          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(60 / 1920 * 100vw), 60px)',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
            }}
          >
            Structured Care Needs Human Guidance
          </h2>

          <p
            className="font-[family-name:var(--font-urbanist)] text-white/65"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
              lineHeight: 1.65,
              marginTop: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
              maxWidth: 640,
            }}
          >
            The protocols are clinical. The oversight is human. NewME puts
            physicians, coaches, and specialists behind your pathway — not just
            an app and a weekly check-in email.
          </p>

          {/* Bullet list */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
            className="flex flex-col"
            style={{
              marginTop: 'clamp(28px, calc(44 / 1920 * 100vw), 44px)',
              gap: 'clamp(16px, calc(22 / 1920 * 100vw), 22px)',
            }}
          >
            {POINTS.map((point, i) => (
              <motion.li
                key={point.heading}
                custom={i}
                variants={{
                  hidden: { opacity: 0, x: 14 },
                  show: {
                    opacity: 1, x: 0,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex gap-4"
              >
                {/* Dot */}
                <span
                  className="shrink-0 rounded-full bg-[#629675] mt-[5px]"
                  style={{
                    width: 'clamp(8px, calc(10 / 1920 * 100vw), 10px)',
                    height: 'clamp(8px, calc(10 / 1920 * 100vw), 10px)',
                  }}
                />
                <div>
                  <p
                    className="font-[family-name:var(--font-bricolage)] text-white"
                    style={{
                      fontWeight: 600,
                      fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                      lineHeight: 1.25,
                    }}
                  >
                    {point.heading}
                  </p>
                  <p
                    className="font-[family-name:var(--font-urbanist)] text-white/55"
                    style={{
                      fontWeight: 400,
                      fontSize: 'clamp(12px, calc(15 / 1920 * 100vw), 15px)',
                      lineHeight: 1.6,
                      marginTop: 4,
                    }}
                  >
                    {point.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
