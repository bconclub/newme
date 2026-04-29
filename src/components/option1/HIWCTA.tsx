'use client'

import { motion } from 'framer-motion'

export default function HIWCTA() {
  return (
    <section
      id="hiw-cta"
      className="relative"
      style={{
        paddingTop: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(80px, calc(140 / 1920 * 100vw), 140px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden flex flex-col items-center text-center"
          style={{
            borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
            padding: 'clamp(56px, calc(120 / 1920 * 100vw), 120px) clamp(24px, calc(80 / 1920 * 100vw), 80px)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Gold glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(400px, calc(900 / 1920 * 100vw), 900px)',
              height: 'clamp(400px, calc(900 / 1920 * 100vw), 900px)',
              borderRadius: '50%',
              background: '#FEF272',
              filter: 'blur(clamp(160px, calc(340 / 1920 * 100vw), 340px))',
              opacity: 0.1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="relative inline-flex items-center gap-2 rounded-full font-[family-name:var(--font-urbanist)] text-white/75"
            style={{
              padding: '6px 18px',
              fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
              fontWeight: 500,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              background: 'rgba(254,242,114,0.08)',
              border: '1px solid rgba(254,242,114,0.22)',
              marginBottom: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
            }}
          >
            <span
              className="rounded-full bg-[#FEF272] animate-pulse"
              style={{ width: 6, height: 6, display: 'inline-block' }}
            />
            Free Assessment
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, calc(72 / 1920 * 100vw), 72px)',
              lineHeight: 1.04,
              letterSpacing: '-0.015em',
              maxWidth: 860,
            }}
          >
            Let&apos;s Discover Your Path
            <br />To Better Health In 3 Minutes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="relative font-[family-name:var(--font-urbanist)] text-white/60"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 1.6,
              maxWidth: 580,
              marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
            }}
          >
            Answer a short intake questionnaire and our clinical team will
            review your responses within 24 hours.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="relative flex flex-wrap items-center justify-center gap-4"
            style={{ marginTop: 'clamp(32px, calc(52 / 1920 * 100vw), 52px)' }}
          >
            <a
              href="/pathways"
              className="inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] font-medium font-[family-name:var(--font-bricolage)] transition-colors duration-200"
              style={{
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                paddingLeft: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                paddingRight: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
              }}
            >
              Start Your Assessment
            </a>
            <a
              href="/virtual-clinic"
              className="inline-flex items-center rounded-full text-white font-[family-name:var(--font-bricolage)] transition-colors duration-200 hover:bg-white/10"
              style={{
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                paddingLeft: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                paddingRight: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Talk to the team
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
