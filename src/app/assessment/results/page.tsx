'use client'

/**
 * /assessment/results — Deep-link entry point for users returning to
 * their completed assessment results.
 *
 * Gate logic:
 *   1. On mount, read `sessionStorage.newme_session`.
 *   2. Require BOTH a routing result (`res`) AND a CRM lead id stored
 *      in localStorage (`newme_lead_id`). Either alone isn't enough —
 *      the ResultsPage component renders pricing + pathway info that
 *      requires both.
 *   3. If the gate passes → render <AssessmentApp initialScreen="results" />
 *      which boots the SPA directly into the results screen.
 *   4. If the gate fails (no session, partial session, fresh visitor)
 *      → redirect to /assessment so they can start the quiz properly.
 *
 * Why a route, not just an SPA screen: lets users bookmark / share /
 * revisit their results URL after closing the tab without losing the
 * results to a "back to intro" reset.
 */

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const AssessmentApp = dynamic(
  () => import('@/assessment-app/AssessmentApp'),
  {
    ssr: false,
    loading: () => <Spinner label="Loading your results…" />,
  }
)

type Status = 'checking' | 'allowed' | 'redirecting'

export default function ResultsRoute() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('newme_session')
      const leadId = localStorage.getItem('newme_lead_id')

      if (!raw || !leadId) {
        setStatus('redirecting')
        router.replace('/assessment')
        return
      }

      const session = JSON.parse(raw)
      // Need the routing result to render anything meaningful. Without
      // `res` the ResultsPage component would crash on `pw.badge` etc.
      if (!session?.res) {
        setStatus('redirecting')
        router.replace('/assessment')
        return
      }

      setStatus('allowed')
    } catch {
      setStatus('redirecting')
      router.replace('/assessment')
    }
  }, [router])

  if (status !== 'allowed') {
    return (
      <Spinner
        label={
          status === 'checking'
            ? 'Loading your results…'
            : "Looks like you haven't completed the assessment yet — redirecting…"
        }
      />
    )
  }

  return <AssessmentApp initialScreen="results" />
}

function Spinner({ label }: { label: string }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
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
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
            margin: 0,
            textAlign: 'center',
            maxWidth: 320,
            fontFamily: "var(--font-urbanist,'Urbanist',sans-serif)",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
