'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import EyebrowPill from './EyebrowPill'

export default function HIWWhyEarly() {
  return (
    <section
      id="hiw-why-early"
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
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
          style={{ maxWidth: 740 }}
        >
          <EyebrowPill>Why it matters</EyebrowPill>

          <h2
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, calc(64 / 1920 * 100vw), 64px)',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
            }}
          >
            Why Starting Early Matters
          </h2>

          {/* Divider */}
          <div
            className="h-px bg-white/20"
            style={{ marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}
          />

          <div style={{ marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}>
            {[
              'Metabolic and gut conditions don\'t resolve on their own — they compound. Every month without structured intervention is another month of systems drifting further from balance.',
              'The patients who see the most durable outcomes are the ones who started before the dysfunction became entrenched. Early structured care means a shorter pathway, fewer corrections, and faster stability.',
              'Waiting for a crisis isn\'t a strategy. A prescribed path now prevents the conditions that require far more intensive care later — and protects the quality of life in between.',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="font-[family-name:var(--font-urbanist)] text-white/75"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                  lineHeight: 1.65,
                  marginTop: i === 0 ? 0 : 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Stat callouts */}
          <div
            className="flex flex-wrap gap-4"
            style={{ marginTop: 'clamp(32px, calc(52 / 1920 * 100vw), 52px)' }}
          >
            {[
              { stat: '3×', label: 'better outcomes with structured intake vs self-directed' },
              { stat: '6 wks', label: 'average time to first measurable metabolic shift' },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                className="flex flex-col"
                style={{
                  padding: 'clamp(16px, calc(24 / 1920 * 100vw), 24px) clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                  borderRadius: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  minWidth: 160,
                }}
              >
                <span
                  className="font-[family-name:var(--font-bricolage)] text-[#FEF272]"
                  style={{ fontWeight: 600, fontSize: 'clamp(22px, calc(40 / 1920 * 100vw), 40px)', lineHeight: 1 }}
                >
                  {stat}
                </span>
                <span
                  className="font-[family-name:var(--font-urbanist)] text-white/60"
                  style={{ fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)', lineHeight: 1.4, marginTop: 6 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 w-full lg:w-auto"
          style={{
            maxWidth: 780,
            aspectRatio: '3 / 4',
            borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            overflow: 'hidden',
            minHeight: 'clamp(360px, calc(640 / 1920 * 100vw), 640px)',
          }}
        >
          <Image
            src="/images/home/Dr Pal.webp"
            alt="Dr. Pal — physician and co-founder of NewME"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle gradient overlay bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(0deg, rgba(1,62,55,0.60) 0%, rgba(1,62,55,0.05) 40%, transparent 60%)',
            }}
          />
          {/* Caption tag bottom-left */}
          <div
            className="absolute bottom-0 left-0"
            style={{ padding: 'clamp(16px, calc(28/1920*100vw), 28px)' }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full font-[family-name:var(--font-urbanist)] text-white"
              style={{
                padding: '8px 18px',
                fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
                fontWeight: 500,
                background: 'rgba(1,62,55,0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <span
                className="rounded-full bg-[#629675]"
                style={{ width: 7, height: 7, display: 'inline-block', flexShrink: 0 }}
              />
              Dr. Palaniappan Manickam
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
