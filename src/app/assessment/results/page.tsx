'use client'

/**
 * /assessment/results?email=… — Shareable deep-link to a completed assessment.
 *
 * Fetches results from CRM by email URL param. SharedResultsPage owns all
 * loading, error, and screen-switching logic (results → order → payment_success).
 *
 * To share: /assessment/results?email=user@example.com
 */

import dynamic from 'next/dynamic'

const SharedResultsPage = dynamic(
  () =>
    import('@/assessment-app/pages/SharedResultsPage/SharedResultsPage').then(
      (mod) => ({ default: mod.SharedResultsPage })
    ),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
)

export default function ResultsRoute() {
  return <SharedResultsPage />
}

function Spinner() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(255,255,255,0.2)',
          borderTopColor: '#FEF272',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
