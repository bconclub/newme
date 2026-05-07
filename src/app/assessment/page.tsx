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

/* Atmospheric blobs as a real <style> block so we can use @media queries */
const ATMOSPHERIC_CSS = `
.assess-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.assess-blob, .assess-noise {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
/* Top-left green wash — primary atmospheric */
.assess-blob-green-1 {
  width: 220vw; height: 220vw;
  top: -60vw; left: -90vw;
  background: linear-gradient(180deg,#629675 0%,#013E37 100%);
  filter: blur(clamp(120px,18vw,260px));
  opacity: 0.40;
  mask-image: radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.85) 60%,rgba(0,0,0,.5) 80%,rgba(0,0,0,.2) 92%,transparent 100%);
  -webkit-mask-image: radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.85) 60%,rgba(0,0,0,.5) 80%,rgba(0,0,0,.2) 92%,transparent 100%);
}
.assess-noise-1 {
  width: 220vw; height: 220vw;
  top: -60vw; left: -90vw;
  background-image: ${NOISE_URL};
  background-size: 220px 220px;
  mix-blend-mode: soft-light;
  opacity: 0.45;
  mask-image: radial-gradient(closest-side,black 0%,black 65%,rgba(0,0,0,.6) 82%,rgba(0,0,0,.25) 92%,transparent 100%);
  -webkit-mask-image: radial-gradient(closest-side,black 0%,black 65%,rgba(0,0,0,.6) 82%,rgba(0,0,0,.25) 92%,transparent 100%);
}
/* Top-right gold accent */
.assess-blob-gold {
  width: 60vw; height: 60vw;
  top: -15vw; right: -20vw;
  background: #FEF272;
  filter: blur(clamp(60px,10vw,180px));
  opacity: 0.20;
}
/* Bottom-left secondary green wash */
.assess-blob-green-2 {
  width: 180vw; height: 180vw;
  bottom: -90vw; left: -70vw;
  background: linear-gradient(180deg,#629675 0%,#013E37 100%);
  filter: blur(clamp(100px,15vw,220px));
  opacity: 0.28;
  mask-image: radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.6) 70%,transparent 100%);
  -webkit-mask-image: radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.6) 70%,transparent 100%);
}
/* Mobile — keep only the primary green wash + grain. Hide secondary green
   and gold accent (they downscale poorly under 768px and crowd the form). */
@media (max-width: 767px) {
  .assess-blob-green-1 {
    width: 320vw; height: 320vw;
    top: -130vw; left: -110vw;
    opacity: 0.32;
  }
  .assess-noise-1 {
    width: 320vw; height: 320vw;
    top: -130vw; left: -110vw;
    opacity: 0.30;
  }
  .assess-blob-gold,
  .assess-blob-green-2 {
    display: none;
  }
}
`

export default function AssessmentPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#013E37', color: '#fff', isolation: 'isolate', overflow: 'hidden' }}>
      <style>{ATMOSPHERIC_CSS}</style>

      {/* Atmospheric layer — fixed behind content */}
      <div className="assess-bg" aria-hidden>
        <div className="assess-blob assess-blob-green-1" />
        <div className="assess-noise assess-noise-1" />
        <div className="assess-blob assess-blob-gold" />
        <div className="assess-blob assess-blob-green-2" />
      </div>

      {/* Assessment app */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AssessmentApp />
      </div>
    </div>
  )
}
