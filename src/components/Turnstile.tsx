'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
      getResponse: (widgetId?: string) => string | undefined
    }
  }
}

let scriptPromise: Promise<void> | null = null

// Loads the Turnstile script once even if multiple widgets mount on the
// same page (Footer + ResearchEvidence newsletter forms can both appear).
function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Turnstile script'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

export type TurnstileHandle = {
  reset: () => void
}

type TurnstileProps = {
  /** Called with a fresh token once solved, or '' when it expires/errors. */
  onToken: (token: string) => void
  /** Cloudflare Turnstile action label, shown in the dashboard analytics. */
  action?: string
}

/**
 * Invisible Cloudflare Turnstile widget. Renders on mount and hands a token
 * to `onToken` in the background — no visible challenge for most visitors.
 * Renders nothing if NEXT_PUBLIC_TURNSTILE_SITE_KEY isn't configured, so
 * forms keep working (unverified) until the key is set.
 */
export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { onToken, action },
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | undefined>(undefined)

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current)
    },
  }))

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return
    let cancelled = false

    loadTurnstileScript().then(() => {
      if (cancelled || !window.turnstile || !containerRef.current || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        size: 'invisible',
        action,
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      })
    })

    return () => {
      cancelled = true
      if (window.turnstile && widgetIdRef.current) window.turnstile.remove(widgetIdRef.current)
      widgetIdRef.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!SITE_KEY) return null
  return <div ref={containerRef} />
})
