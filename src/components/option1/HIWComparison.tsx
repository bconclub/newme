'use client'

import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

const typical = [
  'You pick a program that sounds right',
  'One diet plan for everyone on the programme',
  'Coaching only — no clinical oversight',
  'Isolated interventions: diet or supplements',
  'No structured follow-up after week one',
  'Progress measured by weight alone',
]

const newme = [
  "A physician reviews your history and prescribes your path",
  'Protocol personalised to your labs, gut health, and history',
  'Doctor-led oversight coordinated with coaches and specialists',
  'Integrated approach across gut, metabolic, and lifestyle systems',
  'Scheduled clinical reviews at every phase transition',
  'Progress tracked across metabolic markers, symptoms, and energy',
]

export default function HIWComparison() {
  return (
    <section
      id="hiw-comparison"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(140 / 1920 * 100vw), 140px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 0,
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Outer glass card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            paddingTop: 'clamp(80px, calc(180 / 1920 * 100vw), 180px)',
            paddingBottom: 'clamp(60px, calc(100 / 1920 * 100vw), 100px)',
            paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
            paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          }}
        >
          {/* Background gradient blob */}
          <div
            aria-hidden
            className="absolute pointer-events-none overflow-hidden"
            style={{
              left: '-1px', right: '-1px', top: 0, bottom: 0,
              borderRadius: 'clamp(20px, calc(34 / 1920 * 100vw), 34px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-20%',
                top: '-30%',
                width: '140%',
                height: '140%',
                borderRadius: '50%',
                background: 'linear-gradient(0deg, #629675 0%, #013E37 100%)',
                filter: 'blur(clamp(160px, calc(500 / 1920 * 100vw), 500px))',
                opacity: 0.55,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                backgroundSize: '180px 180px',
                mixBlendMode: 'overlay',
                opacity: 0.5,
              }}
            />
          </div>

          {/* Eyebrow */}
          <div className="relative flex justify-center" style={{ marginBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)' }}>
            <EyebrowPill>Reality check</EyebrowPill>
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-[family-name:var(--font-bricolage)] text-white text-center mx-auto"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(64 / 1920 * 100vw), 64px)',
              lineHeight: 1.06,
              maxWidth: 820,
              marginBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            }}
          >
            Unstructured Care Hasn&apos;t
            <br />Led To Results, Right?
          </motion.h2>

          {/* Comparison cards */}
          <div
            className="relative mx-auto flex flex-col md:flex-row items-stretch md:items-start"
            style={{ maxWidth: 'clamp(600px, calc(1260 / 1920 * 100vw), 1260px)' }}
          >
            {/* Left — What Most People See */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col overflow-hidden md:mt-[clamp(40px,calc(90/1920*100vw),90px)]"
              style={{
                flex: '1 1 0',
                borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.25)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-center text-center flex-shrink-0"
                style={{
                  minHeight: 'clamp(70px, calc(150 / 1920 * 100vw), 150px)',
                  padding: 'clamp(16px, calc(24 / 1920 * 100vw), 24px) clamp(20px, calc(36 / 1920 * 100vw), 36px)',
                  background: '#173b39',
                  borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px) clamp(20px, calc(40 / 1920 * 100vw), 40px) 0 0',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)] text-white"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(15px, calc(30 / 1920 * 100vw), 30px)',
                    lineHeight: 1.2,
                  }}
                >
                  What Most People Experience
                </h3>
              </div>

              <ul className="flex flex-col flex-1">
                {typical.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      padding: 'clamp(14px, calc(22/1920*100vw), 22px) clamp(16px, calc(44 / 1920 * 100vw), 44px)',
                      borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.75)',
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-urbanist)] text-white"
                      style={{
                        fontWeight: 500,
                        fontSize: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
                        lineHeight: 1.4,
                        opacity: 0.88,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — You + NewME */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col overflow-hidden mt-4 md:mt-0"
              style={{
                flex: '1.18 1 0',
                marginLeft: 'clamp(-10px, calc(-24 / 1920 * 100vw), -24px)',
                borderRadius: 'clamp(24px, calc(48 / 1920 * 100vw), 48px)',
                background: '#ffffff',
                zIndex: 2,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-center text-center flex-shrink-0"
                style={{
                  minHeight: 'clamp(80px, calc(190 / 1920 * 100vw), 190px)',
                  padding: 'clamp(20px, calc(32 / 1920 * 100vw), 32px) clamp(20px, calc(44 / 1920 * 100vw), 44px)',
                  background: '#013e37',
                  borderRadius: 'clamp(24px, calc(48 / 1920 * 100vw), 48px) clamp(24px, calc(48 / 1920 * 100vw), 48px) 0 0',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)]"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(18px, calc(36 / 1920 * 100vw), 36px)',
                    lineHeight: 1.2,
                    color: '#FEF272',
                  }}
                >
                  You + NewME
                </h3>
              </div>

              <ul className="flex flex-col flex-1" style={{ background: '#ffffff' }}>
                {newme.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      padding: 'clamp(14px, calc(22/1920*100vw), 22px) clamp(20px, calc(56 / 1920 * 100vw), 56px)',
                      background: '#ffffff',
                      borderTop: i === 0 ? 'none' : '1px solid rgba(98,150,117,0.35)',
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-urbanist)]"
                      style={{
                        fontWeight: 600,
                        fontSize: 'clamp(12px, calc(22 / 1920 * 100vw), 22px)',
                        lineHeight: 1.4,
                        color: '#013e37',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
