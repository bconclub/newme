'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_accepted')) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_accepted', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'min(560px, calc(100vw - 32px))',
        background: 'rgba(12,37,35,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}
    >
      <p
        className="font-[family-name:var(--font-urbanist)]"
        style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, flex: 1, margin: 0 }}
      >
        We use cookies to improve your experience.{' '}
        <Link href="/cookie-policy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
          Learn more
        </Link>
      </p>
      <button
        onClick={accept}
        className="font-[family-name:var(--font-poppins)]"
        style={{
          flexShrink: 0,
          background: 'var(--color-light-gold, #d4af6a)',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: 8,
          padding: '7px 18px',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Accept
      </button>
    </div>
  )
}
