'use client'

/**
 * /assessment — Dr. Pal's Clinical Assessment
 *
 * The assessment app is a fully client-side React application with its own
 * multi-step routing (intro → quiz → calc → results → order → payment_success).
 * It uses sessionStorage and localStorage for session persistence, so it must
 * render only on the client (ssr: false) to avoid hydration mismatches.
 */

import dynamic from 'next/dynamic'

const AssessmentApp = dynamic(
  () => import('@/assessment-app/AssessmentApp'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        minHeight: '100vh',
        background: '#f5f7f4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif",
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 36, height: 36, border: '3px solid #b4c8b0', borderTopColor: '#2d4a28', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: '#7a9475', fontSize: 14, margin: 0 }}>Loading assessment…</p>
        </div>
      </div>
    ),
  }
)

export default function AssessmentPage() {
  return <AssessmentApp />
}
