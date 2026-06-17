/**
 * UTM / attribution capture — first-touch, persisted, injected everywhere.
 *
 * Problem this solves: a visitor lands on (say) `/?utm_source=google&
 * utm_medium=cpc&utm_campaign=metabolic`, then clicks through home →
 * pathways → /assessment → Zoho checkout. Next.js client navigation and
 * the assessment SPA drop the query string on the very first hop, so by
 * the time we create a CRM lead or fire a GA "payment" event, the UTM is
 * already gone. Marketing can't tell which campaign produced the lead.
 *
 * Fix: capture the UTM (+ click ids + referrer + landing page) ONCE on the
 * first page that carries them, store it in localStorage, and read it back
 * from storage everywhere we push data (GA events, CRM lead payloads, the
 * Zoho redirect URL). Storage survives every in-app navigation, the SPA,
 * the external payment round-trip, and even a full browser restart.
 *
 * Attribution model: FIRST-TOUCH. Once a value is stored we never
 * overwrite it — we record where the user ORIGINALLY came from. (We also
 * stamp the latest landing page/referrer under `last_*` for debugging, but
 * the campaign attribution itself is locked to the first touch.)
 */

const STORAGE_KEY = 'newme_utm'

/** Standard UTM params + the ad-platform click ids we care about. */
const TRACKED_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid', // Google Ads click id
  'fbclid', // Meta / Facebook click id
] as const

export type UtmData = Partial<Record<(typeof TRACKED_KEYS)[number], string>> & {
  /** Referring URL at first touch (document.referrer). */
  referrer?: string
  /** Path the visitor first landed on. */
  landing_page?: string
  /** ISO timestamp of first touch. */
  first_seen?: string
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function readStored(): UtmData {
  if (!isBrowser()) return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UtmData) : {}
  } catch {
    return {}
  }
}

function writeStored(data: UtmData): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* storage disabled (private mode / quota) — degrade silently */
  }
}

/**
 * Read the current URL for any tracked params. Call on every page load —
 * it only writes on the FIRST page that actually carries attribution, and
 * never overwrites an existing first-touch record.
 *
 * Returns the stored (post-capture) attribution object so callers can use
 * the result directly if they want.
 */
export function captureUtm(): UtmData {
  if (!isBrowser()) return {}

  const stored = readStored()

  // Already have a first-touch record → done. First-touch wins forever.
  if (stored.first_seen) return stored

  const params = new URLSearchParams(window.location.search)
  const fresh: UtmData = {}
  for (const key of TRACKED_KEYS) {
    const val = params.get(key)
    if (val) fresh[key] = val
  }

  const hasAttribution = Object.keys(fresh).length > 0

  // No UTM/click-id present AND nothing stored yet. We still want to record
  // the original landing context (organic / direct visitors matter too), but
  // we only "lock" first_seen so future UTM-carrying hops in the same session
  // can still be captured if THIS hop had none.
  if (!hasAttribution) {
    // Don't lock first_seen yet — a later hop in this visit may carry UTM
    // (e.g. user opens home organically, then clicks an internal ad link).
    // But do remember the very first landing page/referrer if unset.
    if (!stored.landing_page) {
      const seed: UtmData = {
        ...stored,
        referrer: document.referrer || undefined,
        landing_page: window.location.pathname || '/',
      }
      writeStored(seed)
      return seed
    }
    return stored
  }

  const record: UtmData = {
    ...fresh,
    referrer: stored.referrer || document.referrer || undefined,
    landing_page: stored.landing_page || window.location.pathname || '/',
    first_seen: new Date().toISOString(),
  }
  writeStored(record)
  return record
}

/**
 * Get the stored attribution as a flat params object, ready to merge into a
 * GA event or a CRM JSON body. Returns `{}` when nothing captured / SSR.
 *
 * Only non-empty values are returned, so spreading it into a payload never
 * adds empty keys.
 */
export function getUtm(): UtmData {
  const stored = readStored()
  const out: UtmData = {}
  for (const [k, v] of Object.entries(stored)) {
    if (v) (out as Record<string, string>)[k] = v as string
  }
  return out
}

/** True when we have real campaign attribution (not just a landing page). */
export function hasUtm(): boolean {
  const u = getUtm()
  return TRACKED_KEYS.some((k) => Boolean(u[k]))
}

/**
 * Append the stored UTM params to an absolute URL (e.g. the Zoho checkout
 * link) so attribution carries across an external redirect. Only the real
 * UTM/click-id keys are appended — not referrer/landing_page. Existing query
 * params on the URL are preserved; we never clobber a key already present.
 */
export function appendUtmToUrl(url: string): string {
  if (!url) return url
  const utm = getUtm()
  try {
    const u = new URL(url)
    for (const key of TRACKED_KEYS) {
      const val = utm[key]
      if (val && !u.searchParams.has(key)) u.searchParams.set(key, val)
    }
    return u.toString()
  } catch {
    // Relative URL or unparseable — leave it untouched rather than risk
    // producing a malformed link.
    return url
  }
}
