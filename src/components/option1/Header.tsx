'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type NavLink = { label: string; href: string; hasMenu?: boolean }

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pathways', href: '/pathways' },
  { label: 'Virtual Clinic', href: '/virtual-clinic' },
  { label: 'NewME Care Team', href: '/care-team' },
  { label: 'Resources', href: '#resources', hasMenu: true },
  { label: 'Contact Us', href: '#contact' },
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
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 1920,
            paddingLeft: 'clamp(20px, 3.13vw, 60px)',
            paddingRight: 'clamp(20px, 3.13vw, 60px)',
          }}
        >
          <div className="relative h-[62px] flex items-center justify-between gap-6 px-6 md:px-10">
          <Link href="/" className="flex items-center shrink-0" aria-label="Dr. Pal's NewME — home">
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={520}
              height={130}
              priority
              unoptimized
              className="h-10 md:h-12 w-auto block"
            />
          </Link>

          {/* Figma: nav text spans 1124px between logo and CTA, Urbanist 500 14px, 32px gap. */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
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
            ))}
          </nav>

          {/* Figma: CTA 214×48 pill, padding 14×24.
              Typography (verified from Figma inspect panel):
                color: #013E37
                font-family: Bricolage Grotesque
                font-weight: 500 (medium)
                font-size: 16px
                line-height: normal
              Background #FEF272 → #FDF185 hover. */}
          <div className="hidden lg:flex items-center">
            <a
              href="#assessment"
              className="inline-flex items-center justify-center bg-[#FEF272] hover:bg-[#FDF185] text-[#013E37] rounded-full text-[16px] transition-colors duration-200 font-[family-name:var(--font-bricolage)]"
              style={{ padding: '14px 24px', minHeight: 48, fontWeight: 500, lineHeight: 'normal' }}
            >
              Start My Assessment
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
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
            <motion.a
              href="#assessment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.04 }}
              onClick={() => setMobileOpen(false)}
              className="mt-3 bg-[#FEF272] text-[#173B39] px-7 py-3 rounded-full text-base font-semibold"
            >
              Start My Assessment
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
