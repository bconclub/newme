'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const skipLenis = pathname?.startsWith('/studio') || pathname?.startsWith('/assessment')

  useEffect(() => {
    if (skipLenis) return
    // Respect reduced motion and skip Lenis in headless / automated browsers
    // (the endless RAF loop breaks network-idle-based screenshot tools).
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const headless =
      /HeadlessChrome|Headless|Puppeteer|Playwright/i.test(navigator.userAgent) ||
      (navigator as Navigator & { webdriver?: boolean }).webdriver === true
    if (reduced || headless) return

    // lerp 0.08 is noticeably smoother than the default 0.1 without feeling
    // sluggish. syncTouch enables Lenis on touch screens and momentum trackpads
    // (the default false leaves those devices on native, jarring scroll).
    // syncTouchLerp 0.05 gives a slightly longer glide on touch than the
    // 0.075 default.  wheelMultiplier stays at 1 (no amplification).
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.05,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      orientation: 'vertical',
    })

    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [skipLenis])

  // Prevent browser scroll-restoration from overriding our reset.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Reset scroll to top on every route change. Without this, navigating
  // from /how-it-works → / would land at the same Y the user left
  // /how-it-works at — the home page would appear to "scroll to a
  // section" (e.g. mid-page Pathways) instead of starting at the hero.
  // We skip hash navigation (#anchor) so in-page anchor links still work.
  useEffect(() => {
    if (skipLenis) return
    if (typeof window === 'undefined') return
    if (window.location.hash) return // honor anchor links
    // Reset DOM scroll position immediately (beats browser restoration timing)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [pathname, skipLenis])

  return <>{children}</>
}
