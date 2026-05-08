'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const skipLenis = pathname?.startsWith('/studio')

  useEffect(() => {
    if (skipLenis) return
    // Respect reduced motion and skip Lenis in headless / automated browsers
    // (the endless RAF loop breaks network-idle-based screenshot tools).
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const headless =
      /HeadlessChrome|Headless|Puppeteer|Playwright/i.test(navigator.userAgent) ||
      (navigator as Navigator & { webdriver?: boolean }).webdriver === true
    if (reduced || headless) return

    // Lerp mode (not duration/easing) — frame-based linear interpolation that
    // follows input velocity directly. Feels physics-based: scroll fast and it
    // moves fast; stop and it settles quickly. Removes the long exponential
    // tail of duration:1.2s that read as "lazy."
    //
    // lerp 0.12 sits a touch snappier than Lenis's 0.1 default. wheelMultiplier
    // 1.15 sharpens wheel response without overshooting; touchMultiplier 1.8
    // keeps mobile feeling immediate without being twitchy.
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
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

  // Reset scroll to top on every route change. Without this, navigating
  // from /how-it-works → / would land at the same Y the user left
  // /how-it-works at — the home page would appear to "scroll to a
  // section" (e.g. mid-page Pathways) instead of starting at the hero.
  // We skip hash navigation (#anchor) so in-page anchor links still work.
  useEffect(() => {
    if (skipLenis) return
    if (typeof window === 'undefined') return
    if (window.location.hash) return // honor anchor links
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, skipLenis])

  return <>{children}</>
}
