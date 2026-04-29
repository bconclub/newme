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

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
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

  return <>{children}</>
}
