'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// Extract plain text from Portable Text blocks for speech synthesis
function extractSpeechText(body: unknown[]): string {
  const lines: string[] = []
  for (const block of body) {
    if (!block || typeof block !== 'object') continue
    const b = block as Record<string, unknown>
    if (b._type === 'block' && Array.isArray(b.children)) {
      const text = (b.children as Array<{ text?: string }>)
        .map((c) => c.text ?? '')
        .join('')
        .trim()
      if (text) lines.push(text)
    }
  }
  return lines.join('. ')
}

type State = 'idle' | 'playing' | 'paused'

export default function BlogListen({ body }: { body: unknown[] }) {
  const [state, setState] = useState<State>('idle')
  const [supported, setSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const text = useRef('')

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    text.current = extractSpeechText(body)
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [body])

  const play = useCallback(() => {
    if (state === 'paused') {
      window.speechSynthesis.resume()
      setState('playing')
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.current)
    u.rate = 0.92
    u.pitch = 1
    u.lang = 'en-US'
    u.onend = () => setState('idle')
    u.onerror = () => setState('idle')
    utteranceRef.current = u
    window.speechSynthesis.speak(u)
    setState('playing')
  }, [state])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
    setState('paused')
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setState('idle')
  }, [])

  if (!supported || !text.current) return null

  const isActive = state !== 'idle'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 18px',
        borderRadius: 50,
        background: isActive ? 'rgba(254,242,114,0.10)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${isActive ? 'rgba(254,242,114,0.35)' : 'rgba(255,255,255,0.18)'}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'background 0.3s, border-color 0.3s',
        userSelect: 'none',
      }}
    >
      {/* Speaker icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: isActive ? '#FEF272' : 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }}>
        <path d="M2 5.5h2.5l4-3v11l-4-3H2V5.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        {state === 'playing' ? (
          <>
            <path d="M10.5 5.5C11.4 6.2 12 7.03 12 8s-.6 1.8-1.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M12.5 3.5C14.1 4.8 15 6.3 15 8s-.9 3.2-2.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </>
        ) : (
          <path d="M10.5 5.5C11.4 6.2 12 7.03 12 8s-.6 1.8-1.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        )}
      </svg>

      {/* Label / wave */}
      {state === 'playing' ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 3,
                borderRadius: 2,
                background: '#FEF272',
                animation: `blog-wave 0.8s ease-in-out ${i * 0.12}s infinite alternate`,
                height: [8, 14, 10, 16, 6][i],
              }}
            />
          ))}
        </span>
      ) : (
        <span
          className="font-[family-name:var(--font-urbanist)]"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: state === 'paused' ? '#FEF272' : 'rgba(255,255,255,0.75)',
          }}
        >
          {state === 'paused' ? 'Paused' : 'Listen'}
        </span>
      )}

      {/* Controls */}
      {!isActive ? (
        <button
          onClick={play}
          aria-label="Listen to article"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.85)' }}
        >
          <PlayIcon />
        </button>
      ) : (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={state === 'playing' ? pause : play}
            aria-label={state === 'playing' ? 'Pause' : 'Resume'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#FEF272' }}
          >
            {state === 'playing' ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={stop}
            aria-label="Stop"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.5)' }}
          >
            <StopIcon />
          </button>
        </span>
      )}

      <style>{`
        @keyframes blog-wave {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 3.5l8 4.5-8 4.5V3.5Z"/>
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="4" y="3" width="2.5" height="10" rx="1"/>
      <rect x="9.5" y="3" width="2.5" height="10" rx="1"/>
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <rect x="2" y="2" width="10" height="10" rx="1.5"/>
    </svg>
  )
}
