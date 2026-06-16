'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { captureUtm, getUtm } from '@/lib/utm'

/**
 * Mounts once at the layout root. Captures first-touch UTM/attribution on
 * the initial load AND re-checks on every client navigation, so a UTM that
 * only appears on a deep-linked internal page (or an ad that drops the user
 * mid-funnel) is still recorded.
 *
 * Renders nothing. Capture writes to localStorage (see lib/utm.ts).
 *
 * In dev it also mirrors the captured object onto `window.__newmeUtm` so it
 * can be inspected from the console / preview tools while testing.
 */
export default function UtmCapture() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const data = captureUtm()
    if (process.env.NODE_ENV !== 'production') {
      ;(window as unknown as { __newmeUtm?: unknown }).__newmeUtm = getUtm()
      // eslint-disable-next-line no-console
      console.debug('[UTM] captured', data)
    }
    // Re-run on path/query change so mid-funnel UTM hops are caught.
  }, [pathname, searchParams])

  return null
}
