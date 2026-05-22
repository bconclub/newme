/**
 * Analytics — thin typed wrapper over the gtag.js global.
 *
 * Why a wrapper instead of `window.gtag(...)` calls inline?
 *   1. Typed EventName prevents silent typos ("assesment_started" etc.)
 *   2. One place to swap GA for GTM/PostHog/Segment later
 *   3. Easy to no-op in tests / SSR (no `window`, no gtag)
 *   4. Lets us add cross-cutting behavior (debug logging, sampling) later
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics'
 *   trackEvent('cta_click', { location: 'header', label: 'Start My Assessment' })
 *
 * The GA tag itself is mounted globally in `src/app/layout.tsx`.
 */

export type EventName =
  // Page-level CTA clicks across marketing pages. Use `params.location` +
  // `params.label` to disambiguate (e.g. header / hero / pathways / how-it-works).
  | 'cta_click'

  // Assessment funnel.
  // Fires when the user enters the quiz flow (either fresh start or "Start over"
  // from the resume card on IntroPage).
  | 'assessment_started'

  // Each quiz step completion — useful for drop-off analysis. Include
  // `step_index` (0 = profile, 1+ = quiz questions) and `step_id` in params.
  | 'assessment_step_completed'

  // Fires when the results screen mounts (calc finished, pathway routed).
  | 'assessment_completed'

  // Calendly booking confirmed via the chatbot widget.
  | 'call_booked'

  // User clicked the "Start now" pricing CTA and was sent to checkout/order.
  | 'payment_initiated'

  // PaymentSuccessPage mounted — gtag's de-facto "purchase" equivalent
  // for our flow. Pair with a `value` param once we wire revenue tracking.
  | 'payment_completed'

  // Share-results link clicked from the results page.
  | 'share_results_clicked'

  // Newsletter / waitlist email subscribe submitted. Use `params.location`
  // to disambiguate (footer / research_evidence / research_lab_waitlist).
  | 'email_subscribed'

  // Contact-us form submission (the /contact page). Fires when the user
  // hits Send — wired before the network call so it captures intent even
  // if the CRM endpoint is down.
  | 'contact_form_submitted'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Fire a GA event. Safe to call from SSR, tests, or environments where
 * gtag.js failed to load — it's a no-op when `window.gtag` is missing.
 */
export function trackEvent(name: EventName, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params ?? {})
  } catch {
    // Never let analytics break the app.
  }
}
