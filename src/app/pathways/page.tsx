'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import EyebrowPill from '@/components/option1/EyebrowPill'
import PageHero from '@/components/option1/PageHero'

const EASE = [0.22, 1, 0.36, 1] as const

// Images downloaded from Figma
const HERO_IMG = '/images/pathways/hero-doctor.jpg'
const SECTION_IMG = '/pathways/one%20system%20multiple%20pathways.webp'

type Tab = 'metabolic' | 'gi' | 'continuity'

const TABS: { id: Tab; label: string; href: string }[] = [
  { id: 'metabolic',   label: 'Metabolic Care Pathway',       href: '/pathways/metabolic' },
  { id: 'gi',          label: 'GastroIntestinal Care Pathway', href: '/pathways/gi' },
  { id: 'continuity',  label: 'Continuity Pathways',           href: '/pathways/continuity' },
]

const SUB_PILLS: Record<Tab, { label: string; href: string }[]> = {
  metabolic: [
    { label: 'Reset',   href: '/pathways/metabolic#reset' },
    { label: 'Rebuild', href: '/pathways/metabolic#rebuild' },
    { label: 'Sustain', href: '/pathways/metabolic#sustain' },
  ],
  gi: [
    { label: 'GastroIntestinal Core',     href: '/pathways/gi#gi-core' },
    { label: 'GastroIntestinal Advanced', href: '/pathways/gi#gi-advanced' },
  ],
  continuity: [
    { label: 'NewME 360',      href: '/pathways/continuity#newme360' },
    { label: 'NewME Movement', href: '/pathways/continuity#movement' },
  ],
}

export default function PathwaysPage() {
  const [hoveredTab, setHoveredTab] = useState<Tab | null>(null)
  const [activeMobileIdx, setActiveMobileIdx] = useState(0)

  return (
    <>
      <Header />
      <main className="pathway-page">
      {/* ─── ATMOSPHERIC BACKGROUND — 1920px artboard, scrolls with page ─── */}
      <div className="pathway-bg" aria-hidden style={{ height: 5000 }}>
        <span className="pathway-ellipse pathway-green-wash" style={{ top: 400, opacity: 0.40 }} />
        <span className="pathway-noise pathway-green-noise" style={{ top: 400 }} />
        <span className="pathway-ellipse pathway-gold-accent" style={{ top: 200, left: 1268 }} />
        <span className="pathway-ellipse pathway-green-wash pathway-green-wash-2" style={{ top: 2800, opacity: 0.32 }} />
        <span className="pathway-noise pathway-green-noise pathway-green-noise-2" style={{ top: 2800 }} />
        <span className="pathway-ellipse pathway-gold-accent pathway-gold-accent-2" style={{ top: 2500, left: -625 }} />
      </div>

      {/* ─── HERO SECTION — composes <PageHero> (Figma 121:93 template) ─ */}
      <PageHero
        imageSrc={HERO_IMG}
        imageAlt="Dr. Pal with patient"
        imagePosition="60% center"
        heading={<>You Don&apos;t Choose A Program. You&apos;re Prescribed A Path.</>}
        subheading="NewME is a structured clinical system. Your assessment maps your health patterns and guides you into the pathway designed for your body's needs."
        headingMaxWidthPx={1086}
        bodyMaxWidthPx={783}
        cta={<PathwaysHeroCta />}
      />

      {/* ─── INTRODUCTION SECTION ────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,5.2vw,100px) clamp(16px,6.25vw,120px)' }}>

        {/* Eyebrow pill — uses the shared site EyebrowPill component so
            the entrance animation, gradient border with bottom-right fade,
            and frosted-glass treatment match every other section. */}
        <div className="flex justify-start md:justify-center" style={{ marginBottom: 'clamp(16px,1.25vw,24px)' }}>
          <EyebrowPill>Introduction To The Pathways</EyebrowPill>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)] text-left md:text-center"
          style={{ fontSize: 'clamp(28px,3.75vw,72px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: 'clamp(20px,1.56vw,30px)' }}
        >
          One System. Multiple Pathways.
        </motion.h2>

        {/* Body paragraph 1 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="font-[family-name:var(--font-urbanist)] text-left md:text-center md:mx-auto"
          style={{ fontSize: 'clamp(15px,1.46vw,28px)', fontWeight: 500, color: '#fff', lineHeight: 1.45, maxWidth: 'clamp(280px,calc(1275/1920*100vw),1275px)', marginBottom: 'clamp(32px,3.13vw,60px)' }}
        >
          NewME is designed as a structured clinical system where care is delivered through distinct pathways. Each pathway is built for a different level of metabolic, gastrointestinal, or long-term support.
        </motion.p>

        {/* Interior photo — edge-to-edge on mobile, centered+rounded on md+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="pathways-section-img"
        >
          <Image
            src={SECTION_IMG}
            alt="Clinical team reviewing patient data"
            width={1194}
            height={533}
            unoptimized
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        {/* Body paragraph 2 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="font-[family-name:var(--font-urbanist)] text-left md:text-center md:mx-auto"
          style={{ fontSize: 'clamp(14px,1.25vw,24px)', fontWeight: 400, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, maxWidth: 'clamp(280px,calc(1275/1920*100vw),1275px)' }}
        >
          Some individuals require foundational stabilization. Others need deeper metabolic correction or focused gastrointestinal support. Each pathway is defined by its purpose, duration, and level of clinical involvement.
        </motion.p>
      </section>

      {/* ─── PATHWAY SELECTOR ────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 clamp(20px,10.4vw,200px) clamp(60px,5.2vw,100px)' }}>

        {/* "Pathways" label box */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(20px,1.56vw,30px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            style={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, padding: 'clamp(10px,0.83vw,16px) clamp(20px,1.87vw,36px)', backdropFilter: 'blur(8px)' }}
          >
            <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 'clamp(18px,2.08vw,40px)', fontWeight: 600, color: '#fff' }}>Pathways</span>
          </motion.div>
        </div>

        {/* Connector: vertical line from box → horizontal branch.
            Hidden on mobile (md+ only) — the tree-diagram visual doesn't
            scale to 1-column stack and just renders as orphan vertical
            lines, so we drop it on small screens. */}
        <div className="hidden md:flex" style={{ justifyContent: 'center', marginBottom: 2 }}>
          <div style={{ width: 1, height: 'clamp(24px,2.08vw,40px)', background: 'rgba(255,255,255,0.25)' }} />
        </div>
        <div className="hidden md:flex" style={{ position: 'relative', justifyContent: 'center', marginBottom: 2 }}>
          {/* Horizontal bar spanning all 3 columns */}
          <div style={{ position: 'absolute', top: 0, left: '16.67%', right: '16.67%', height: 1, background: 'rgba(255,255,255,0.25)' }} />
        </div>
        {/* 3 vertical drops from horizontal bar */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: 4 }}>
          {TABS.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 1, height: 'clamp(18px,1.56vw,30px)', background: 'rgba(255,255,255,0.25)' }} />
            </div>
          ))}
        </div>

        {/* Dots above cards (md+ only — hidden on mobile with the tree) */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: 4 }}>
          {TABS.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', background: 'transparent' }} />
            </div>
          ))}
        </div>

        {/* ── Mobile: centered single-tab view with prev/next nav + connecting lines ── */}
        <div className="md:hidden flex flex-col items-center" style={{ marginBottom: 16 }}>
          {/* Vertical line from "Pathways" box down */}
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.30)' }} />

          {/* Active pathway card + prev/next buttons */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 10 }}>
            {/* Prev */}
            <button
              type="button"
              aria-label="Previous pathway"
              onClick={() => setActiveMobileIdx(i => (i - 1 + TABS.length) % TABS.length)}
              style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden><path d="M11.25 3.75 6 9l5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
            </button>

            {/* Active tab pill */}
            <Link href={TABS[activeMobileIdx].href} style={{ flex: 1, textDecoration: 'none' }}>
              <motion.div
                key={activeMobileIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ borderRadius: 28, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0) 100%), rgba(255,255,255,0.13)', border: '2px solid rgba(255,255,255,0.60)', backdropFilter: 'blur(10px)' }}
              >
                <span className="font-[family-name:var(--font-bricolage)]" style={{ fontSize: 15, fontWeight: 600, color: '#fff', textAlign: 'center', lineHeight: 1.25, padding: '0 12px' }}>
                  {TABS[activeMobileIdx].label}
                </span>
              </motion.div>
            </Link>

            {/* Next */}
            <button
              type="button"
              aria-label="Next pathway"
              onClick={() => setActiveMobileIdx(i => (i + 1) % TABS.length)}
              style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden><path d="M6.75 3.75 12 9l-5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
            </button>
          </div>

          {/* Vertical line from active card to sub-pills */}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.30)' }} />

          {/* Sub-pills for active tab */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {SUB_PILLS[TABS[activeMobileIdx].id].map((pill, pi) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: pi * 0.05 }}
              >
                <Link
                  href={pill.href}
                  className="font-[family-name:var(--font-bricolage)] inline-flex items-center justify-center text-white"
                  style={{
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.45)',
                    borderRadius: 9999,
                    height: 48,
                    padding: '0 24px',
                    fontSize: 20,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pill.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 3 Pathway cards — desktop only (mobile uses the lanes above) ── */}
        <div className="hidden md:grid md:grid-cols-3" style={{ gap: 'clamp(10px,0.625vw,12px)', marginBottom: 'clamp(14px,0.83vw,16px)' }}>
          {TABS.map((t, i) => {
            const isActive = hoveredTab === t.id
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredTab(t.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Link href={t.href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{
                      // Bumped from clamp(14,1.25vw,24) → clamp(20,2vw,40) per
                      // request — softer, more pill-like cards.
                      borderRadius: 'clamp(20px,2vw,40px)',
                      height: 'clamp(80px,6.25vw,120px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      ...(isActive
                        ? { background: '#FEF272', border: '2px solid #FEF272' }
                        : { background: 'linear-gradient(180deg,rgba(255,255,255,0.20) 0%,rgba(255,255,255,0) 100%), rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.55)', backdropFilter: 'blur(10px)' }
                      ),
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-bricolage)]"
                      style={{ fontSize: 'clamp(13px,1.25vw,24px)', fontWeight: 600, color: isActive ? '#013E37' : '#fff', textAlign: 'center', lineHeight: 1.25, padding: '0 12px', transition: 'color 0.25s' }}
                    >
                      {t.label.split(' ').slice(0, -1).join(' ')}<br />{t.label.split(' ').slice(-1)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Connector drops from cards to pills (md+ only) */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: 4 }}>
          {TABS.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 1, height: 'clamp(14px,1.25vw,24px)', background: 'rgba(255,255,255,0.20)' }} />
            </div>
          ))}
        </div>

        {/* ── Sub-pathway pills — desktop only (mobile renders pills inside
              each lane above). 3-column tree-style layout on md+. ── */}
        <div className="hidden md:grid md:grid-cols-3" style={{ gap: 'clamp(10px,0.625vw,12px)', alignItems: 'start', marginTop: 'clamp(8px, calc(8 / 1920 * 100vw), 8px)' }}>
          {TABS.map((t, ci) => (
            <div key={t.id} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,0.625vw,12px)', alignItems: 'center' }}>
              {SUB_PILLS[t.id].map((pill, pi) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, ease: EASE, delay: ci * 0.06 + pi * 0.05 }}
                >
                  <Link
                    href={pill.href}
                    className="font-[family-name:var(--font-bricolage)] inline-flex items-center justify-center text-white hover:text-[#FEF272] hover:border-[#FEF272] transition-colors duration-200"
                    style={{
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.45)',
                      borderRadius: 9999,
                      height: 'clamp(48px,4vw,72px)',
                      padding: '0 clamp(20px,1.875vw,36px)',
                      fontSize: 'clamp(16px,1.25vw,24px)',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {pill.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <Footer />
    </main>
    </>
  )
}

// CTA pair — gold pill + tangerine arrow, used only by the /pathways hero.
// Lives outside <PageHero> via the `cta` prop so the template stays generic.
function PathwaysHeroCta() {
  return (
    <div className="group/cta flex items-center flex-row-reverse justify-end">
      <motion.a
        href="/assessment"
        aria-hidden
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-0 rounded-full bg-[#FF8547] hover:bg-[#F08B55] text-white flex items-center justify-center shrink-0 transition-colors will-change-transform"
        style={{
          width: 'clamp(44px, calc(64 / 1920 * 100vw), 64px)',
          height: 'clamp(44px, calc(64 / 1920 * 100vw), 64px)',
        }}
      >
        <svg
          viewBox="0 0 30 30"
          fill="none"
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
          style={{
            width: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
            height: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
          }}
        >
          <path
            d="M9 21L21 9M21 9H11M21 9V19"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
      <motion.a
        href="/assessment"
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-[#013E37] font-semibold font-[family-name:var(--font-bricolage)] shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] transition-[background-color,box-shadow] duration-300 ease-out will-change-transform"
        style={{
          height: 'clamp(44px, calc(64 / 1920 * 100vw), 64px)',
          paddingLeft: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
          paddingRight: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
          fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
          lineHeight: 1.3,
          marginRight: 'clamp(-10px, calc(-7 / 1920 * 100vw), -7px)',
        }}
      >
        Find Your Pathway
      </motion.a>
    </div>
  )
}
