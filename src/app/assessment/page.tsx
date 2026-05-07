'use client'

/**
 * /assessment — Dr. Pal's Clinical Assessment
 *
 * Wraps the client-only AssessmentApp with the NewME atmospheric dark
 * background (pine-teal, green gradient blobs, grain noise) so it matches
 * the rest of the site's design system.
 *
 * ssr: false on the inner app avoids hydration mismatches from sessionStorage /
 * localStorage access in component state initializers.
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

/* ── Noise data-URL (matches option1.scss .newme-noise recipe) ── */
const NOISE_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`

export default function AssessmentPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#013E37', color: '#fff', isolation: 'isolate', overflow: 'hidden' }}>

      {/* ── Atmospheric background blobs ── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

        {/* Green gradient wash — top-left, mirrors home .newme-ellipse-28 */}
        <div style={{
          position: 'absolute',
          width: '260vw', height: '260vw',
          top: '-80vw', left: '-100vw',
          background: 'linear-gradient(180deg,#629675 0%,#013E37 100%)',
          borderRadius: '50%',
          filter: 'blur(clamp(120px,18vw,260px))',
          opacity: 0.35,
          maskImage: 'radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.85) 60%,rgba(0,0,0,.5) 80%,rgba(0,0,0,.2) 92%,transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.85) 60%,rgba(0,0,0,.5) 80%,rgba(0,0,0,.2) 92%,transparent 100%)',
        }} />

        {/* Noise grain on the green wash */}
        <div style={{
          position: 'absolute',
          width: '260vw', height: '260vw',
          top: '-80vw', left: '-100vw',
          borderRadius: '50%',
          pointerEvents: 'none',
          backgroundImage: NOISE_SVG,
          backgroundSize: '220px 220px',
          mixBlendMode: 'soft-light',
          opacity: 0.45,
          maskImage: 'radial-gradient(closest-side,black 0%,black 65%,rgba(0,0,0,.6) 82%,rgba(0,0,0,.25) 92%,transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side,black 0%,black 65%,rgba(0,0,0,.6) 82%,rgba(0,0,0,.25) 92%,transparent 100%)',
        }} />

        {/* Yellow accent — top right */}
        <div style={{
          position: 'absolute',
          width: '70vw', height: '70vw',
          top: '-20vw', right: '-25vw',
          background: '#FEF272',
          borderRadius: '50%',
          filter: 'blur(clamp(60px,10vw,180px))',
          opacity: 0.18,
        }} />

        {/* Secondary green wash — bottom left */}
        <div style={{
          position: 'absolute',
          width: '200vw', height: '200vw',
          bottom: '-100vw', left: '-80vw',
          background: 'linear-gradient(180deg,#629675 0%,#013E37 100%)',
          borderRadius: '50%',
          filter: 'blur(clamp(100px,15vw,220px))',
          opacity: 0.25,
          maskImage: 'radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.6) 70%,transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side,black 0%,black 35%,rgba(0,0,0,.6) 70%,transparent 100%)',
        }} />

      </div>

      {/* ── Assessment app on top of bg ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AssessmentApp />
      </div>

    </div>
  )
}
