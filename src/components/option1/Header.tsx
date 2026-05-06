'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// motion-enhanced Link — avoids the deprecated legacyBehavior wrapper pattern
const MotionLink = motion(Link)

type NavLink = { label: string; href: string; hasMenu?: boolean; live?: boolean }

const navLinks: NavLink[] = [
  { label: 'Home', href: '/', live: true },
  { label: 'How It Works', href: '/how-it-works', live: true },
  { label: 'Pathways', href: '/pathways', live: true },
  { label: 'Virtual Clinic', href: '/virtual-clinic', live: true },
  { label: 'NewME Care Team', href: '/team', live: true },
  { label: 'Resources', href: '/faq', live: true },
  { label: 'Contact Us', href: '/contact', live: true },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        // Original full-width fixed-bar behavior (transparent over hero,
        // pine bg + blur when scrolled). Inner content is sized to the
        // Figma spec: 1800 × 74, 60px left gutter on a 1920 artboard.
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#013E37]/90 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        style={{ paddingTop: 'clamp(6px, calc(10 / 1920 * 100vw), 10px)', paddingBottom: 'clamp(4px, calc(6 / 1920 * 100vw), 6px)' }}
      >
        {/* Figma 58:132 — Header is 1800×74 inside the 1920 artboard with a
            60px gutter on each side (1920 − 1800 = 120 / 2 = 60). The inner
            row had an extra `px-6 md:px-10` that was eating another 80px of
            content width, compressing the nav/CTA. Drop that so the row uses
            the full 1800px max-width per Figma. */}
        <div
          className="mx-auto"
          style={{
            maxWidth: 1920,
            paddingLeft: 'clamp(20px, 3.13vw, 60px)',
            paddingRight: 'clamp(20px, 3.13vw, 60px)',
          }}
        >
          <div className="relative h-[62px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center shrink-0" aria-label="Dr. Pal's NewME — home">
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={520}
              height={130}
              priority
              unoptimized
              /* h-10 (40px) on mobile fell below the 44px tap-target floor.
                 h-11 = 44px exactly, then h-12 (48px) at md+ matches Figma. */
              className="h-11 md:h-12 w-auto block"
            />
          </Link>

          {/* Figma: nav text spans 1124px between logo and CTA, Urbanist 500 14px, 32px gap.
              Only `live` links are real <Link>s; the rest render as <span> with
              gray text, no cursor, and a small lighten-on-hover so the user
              still gets feedback even though the click is a no-op. */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) =>
              link.live ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-white/85 hover:text-white text-[14px] font-medium transition-colors duration-200 font-[family-name:var(--font-urbanist)]"
                >
                  {link.label}
                  {link.hasMenu && (
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-70">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </Link>
              ) : (
                <span
                  key={link.href}
                  aria-disabled="true"
                  title="Coming soon"
                  className="inline-flex items-center gap-1 text-white/35 hover:text-white/55 text-[14px] font-medium transition-colors duration-200 font-[family-name:var(--font-urbanist)] cursor-not-allowed select-none"
                >
                  {link.label}
                  {link.hasMenu && (
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-50">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              )
            )}
          </nav>

          {/* Figma: CTA 214×48 pill, padding 14×24.
              Typography (verified from Figma inspect panel):
                color: #013E37
                font-family: Bricolage Grotesque
                font-weight: 500 (medium)
                font-size: 16px
                line-height: normal
              Background #FEF272 → #FDF185 hover.
              Added subtle scale + shadow lift so the CTA pops against the
              dark header without leaving the Figma spec. */}
          <div className="hidden lg:flex items-center">
            <MotionLink
              href="/assessment"
              whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(254,242,114,0.40)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center justify-center bg-[#FEF272] text-[#013E37] rounded-full text-[16px] font-[family-name:var(--font-bricolage)]"
              style={{
                width: 214,
                height: 48,
                borderRadius: 60,
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              Start My Assessment
            </MotionLink>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            /* min-h/w 44 to clear the WCAG tap-target floor (was 40×34
               from p-2 + 6×0.5 stack which is unreachable for big thumbs). */
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 min-w-[44px] min-h-[44px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
          </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#013E37] flex flex-col items-center justify-center gap-7 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-2xl font-medium font-[family-name:var(--font-bricolage)] hover:text-[#FEF272] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <MotionLink
              href="/assessment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.96 }}
              transition={{ delay: navLinks.length * 0.04 }}
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center bg-[#FEF272] text-[#013E37] rounded-full font-[family-name:var(--font-bricolage)]"
              style={{ padding: '14px 28px', minHeight: 52, fontWeight: 500, fontSize: 16 }}
            >
              Start My Assessment
            </MotionLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
