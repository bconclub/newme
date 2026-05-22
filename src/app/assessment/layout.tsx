import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Health Assessment | Dr. Pal\'s NewME',
  description:
    'Start your NewME health assessment. Answer a few questions about your lifestyle and health goals so we can recommend the right care pathway for you.',
}

/* Noise SVG — matches option1.scss .newme-noise recipe */
const NOISE_URL = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

/* Atmospheric layer — shared across every page under /assessment so the
   intro flow and the standalone /assessment/results route both render
   on the same dark pine-teal background. Previously the wrapper lived
   in page.tsx; moved here so the nested route inherits it for free. */
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
    radial-gradient(ellipse 60% 50% at 90% 100%,
      rgba(254,242,114,0.16) 0%,
      rgba(254,242,114,0.08) 30%,
      rgba(254,242,114,0.02) 55%,
      transparent 80%),
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
  -webkit-mask-image: radial-gradient(ellipse 140% 100% at 50% 115%, black 0%, rgba(0,0,0,0.6) 50%, transparent 90%);
  mask-image: radial-gradient(ellipse 140% 100% at 50% 115%, black 0%, rgba(0,0,0,0.6) 50%, transparent 90%);
}
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

export default function AssessmentLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#013E37', color: '#fff', isolation: 'isolate', overflow: 'hidden' }}>
      <style>{ATMOSPHERIC_CSS}</style>

      {/* Atmospheric layer — fixed behind content, shared by every
          /assessment/* page so the background never resets between
          the intro flow and the /results entry point. */}
      <div className="assess-bg" aria-hidden>
        <div className="assess-glow" />
        <div className="assess-noise" />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
