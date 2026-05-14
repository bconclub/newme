'use client'

/**
 * /assessment — Dr. Pal's Clinical Assessment
 *
 * Mounts the client-only AssessmentApp SPA. The atmospheric background
 * (pine-teal + green wash + noise) is provided by the shared
 * `src/app/assessment/layout.tsx` so it's also applied to nested routes
 * like `/assessment/results`.
 */

import dynamic from 'next/dynamic'

const AssessmentApp = dynamic(
  () => import('@/assessment-app/AssessmentApp'),
  {
    ssr: false,
    loading: () => <Spinner label="Loading assessment…" />,
  }
)

function Spinner({ label }: { label: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 36, height: 36, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: '#FEF272', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, margin: 0, fontFamily: "var(--font-urbanist,'Urbanist',sans-serif)" }}>{label}</p>
      </div>
    </div>
  )
}

export default function AssessmentPage() {
  return <AssessmentApp />
}
