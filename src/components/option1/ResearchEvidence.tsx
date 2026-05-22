'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'
import { ENDPOINTS } from '@/assessment-app/constants/urlConstants'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Research Lab — "Built On Clinical Evidence" section.
 *
 * Figma node 83:2498 (page) — content centered on the 1920 artboard.
 *  · Heading "Built On Clinical Evidence"  : y=966, Bricolage SemiBold 72/72 white
 *  · Subhead "All NewME research…"        : y=1062, Urbanist SemiBold 28/34 white
 *  · Body two paragraphs                  : y=1120, Urbanist Regular 28/34 white
 *  · CTA pair                             : y=1280, height 80, total width 1100
 *      - Left:  white pill 440×80, "Learn more about our research"
 *      - Right: glass pill 644×80 with "Email address" placeholder + green
 *               "Notify me" inner pill 190×72 (#013E37) inset 4px
 */
export default function ResearchEvidence() {
  const [email, setEmail] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Optimistic UI — clear the input immediately, fire-and-forget POST.
    // Same shape as the Footer newsletter handler (which uses the same
    // CRM endpoint) so behavior stays consistent across both subscribe
    // surfaces. No dedicated success state in this design — the cleared
    // input is the only visual confirmation.
    setEmail('')
    trackEvent('email_subscribed', { location: 'research_evidence_notify' })
    fetch(ENDPOINTS.CRM_LEAD_NEWSLETTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch((err) => console.error('[ResearchEvidence Notify]', err))
  }

  return (
    <section
      className="relative"
      style={{
        // 120 from hero card bottom (y=846) to heading top (y=966)
        paddingTop: 'clamp(64px, calc(120 / 1920 * 100vw), 120px)',
        // Bottom space before the footer band starts (y=1480)
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto text-left md:text-center" style={{ maxWidth: 1186 }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, calc(58 / 1920 * 100vw), 58px)',
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          Built From Real-World Care.
        </motion.h2>

        {/* Subhead — 24px gap below heading bottom (heading h=72, +24 = y=1062) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white font-[family-name:var(--font-urbanist)] mx-auto"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
            letterSpacing: 0,
            maxWidth: 917,
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          NewME&apos;s research initiatives are centered around understanding lifestyle care and health outcomes through structured program data and clinical observations.
        </motion.p>

        {/* Body — 24px gap below subhead bottom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-white font-[family-name:var(--font-urbanist)] mx-auto"
          style={{
            fontWeight: 400,
            fontSize: 'clamp(15px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
            letterSpacing: 0,
            maxWidth: 1076,
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          <p>
            Our ongoing research aims to better understand the relationship
            between behavior change, coaching, client journeys, lifestyle
            interventions, and long-term health outcomes.
          </p>
          <p>
            By building structured research frameworks and datasets, our goal is
            to contribute meaningful observations and outcome-driven research in
            gut health, preventive health and lifestyle medicine, while working
            towards future clinical publications grounded in everyday clinical
            practice.
          </p>
          {/* Figma 83:4837 includes a trailing empty paragraph — preserves
              the 136px block height and the 24px CTA gap below it. */}
          <p aria-hidden>&#8203;</p>
        </motion.div>

        {/* CTA pair — Figma Group 410: 1100×80 centered (x=410..1510).
            Left pill 440 + 16 gap + right glass pill 644. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
          className="mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4"
          style={{
            maxWidth: 1100,
            // Figma: body block ends y=1256, CTA at y=1280 → 24px gap
            marginTop: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          {/* CTA — frosted glass pill with email input + green Notify pill */}
          <form
            onSubmit={onSubmit}
            className="relative inline-flex items-center"
            style={{
              width: 'clamp(280px, calc(644 / 1920 * 100vw), 644px)',
              height: 'clamp(64px, calc(80 / 1920 * 100vw), 80px)',
              borderRadius: 9999,
              border: '1px solid rgba(255,255,255,0.85)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              padding: 'clamp(3px, calc(4 / 1920 * 100vw), 4px)',
              paddingLeft: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/85 font-[family-name:var(--font-bricolage)]"
              style={{
                fontWeight: 300,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'normal',
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center bg-[#013E37] hover:bg-[#0B5650] transition-colors duration-300 text-white font-[family-name:var(--font-bricolage)] shrink-0"
              style={{
                width: 'clamp(108px, calc(190 / 1920 * 100vw), 190px)',
                height: 'clamp(56px, calc(72 / 1920 * 100vw), 72px)',
                borderRadius: 9999,
                fontWeight: 300,
                fontSize: 'clamp(14px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 'normal',
              }}
            >
              Notify me
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

