'use client'

/**
 * /assessment — Dr. Pal's Clinical Assessment
 *
 * Wraps the client-only AssessmentApp with the NewME atmospheric dark
 * background (pine-teal, green gradient blobs, grain noise) so it matches
 * the rest of the site's design system.
 *
 * Atmospheric blobs use CSS classes (with @media query for mobile) so
 * secondary blobs hide gracefully below 768px instead of crowding the
 * viewport.
 */

import dynamic from 'next/dynamic'

const AssessmentApp = dynamic(
  () => import('@/assessment-app/AssessmentApp'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 36, height: 36, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: '#FEF272', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, margin: 0, fontFamily: "var(--font-urbanist,'Urbanist',sans-serif)" }}>Loading assessment…</p>
        </div>
      </div>
    ),
  }
)

/* Noise SVG — matches option1.scss .newme-noise recipe */
const NOISE_URL = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

/* Atmospheric layer — uses a CSS radial-gradient as the background of
   a fixed full-viewport div. No mask edge, no DOM circle — the gradient
   IS the alpha falloff, so there's no perceptible curved seam. The
   ellipse is anchored at the bottom-center and fades out smoothly in
   every direction, brightening the lower portion while the top of the
   viewport stays as the underlying dark pine-teal. */
const ATMOSPHERIC_CSS = `
.assess-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.assess-glow {
  position: absolute;
  inset: 0;
  background:
    /* Soft gold halo from the bottom-right corner */
    radial-gradient(ellipse 60% 50% at 90% 100%,
      rgba(254,242,114,0.16) 0%,
      rgba(254,242,114,0.08) 30%,
      rgba(254,242,114,0.02) 55%,
      transparent 80%),
    /* Primary green wash — anchored at the bottom, brightens the lower
       half of the viewport with a smooth elliptical alpha falloff. */
    radial-gradient(ellipse 130% 95% at 50% 115%,
      rgba(98,150,117,0.55) 0%,
      rgba(98,150,117,0.40) 18%,
      rgba(98,150,117,0.26) 35%,
      rgba(98,150,117,0.14) 52%,
      rgba(98,150,117,0.06) 70%,
      rgba(98,150,117,0.02) 85%,
      transparent 100%);
}
.assess-noise {
  position: absolute;
  inset: 0;
  background-image: ${NOISE_URL};
  background-size: 220px 220px;
  mix-blend-mode: soft-light;
  opacity: 0.22;
  /* Mask the noise so it only shows in the lit zone (matches the wash
     glow above) — keeps the dark top free of grain too. */
  -webkit-mask-image: radial-gradient(ellipse 140% 100% at 50% 115%, black 0%, rgba(0,0,0,0.6) 50%, transparent 90%);
  mask-image: radial-gradient(ellipse 140% 100% at 50% 115%, black 0%, rgba(0,0,0,0.6) 50%, transparent 90%);
}
/* Mobile — slightly tighter wash so the brightening sits a bit higher
   to compensate for the shorter viewport. */
@media (max-width: 767px) {
  .assess-glow {
    background:
      radial-gradient(ellipse 80% 40% at 90% 105%,
        rgba(254,242,114,0.10) 0%,
        rgba(254,242,114,0.04) 40%,
        transparent 75%),
      radial-gradient(ellipse 150% 85% at 50% 110%,
        rgba(98,150,117,0.45) 0%,
        rgba(98,150,117,0.30) 22%,
        rgba(98,150,117,0.16) 42%,
        rgba(98,150,117,0.06) 65%,
        rgba(98,150,117,0.02) 82%,
        transparent 100%);
  }
  .assess-noise {
    opacity: 0.16;
  }
}
`

export default function AssessmentPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#013E37', color: '#fff', isolation: 'isolate', overflow: 'hidden' }}>
      <style>{ATMOSPHERIC_CSS}</style>

      {/* Atmospheric layer — fixed behind content */}
      <div className="assess-bg" aria-hidden>
        <div className="assess-glow" />
        <div className="assess-noise" />
      </div>

      {/* Assessment app */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AssessmentApp />
      </div>
    </div>
  )
}
