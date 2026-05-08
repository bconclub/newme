'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── HTML5 Audio player (supports multiple sources played in sequence) ─────────

type AudioState = 'idle' | 'playing' | 'paused'

function AudioPlayer({ srcs }: { srcs: string[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackIdxRef = useRef(0)
  const [state, setState] = useState<AudioState>('idle')
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [durations, setDurations] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    Promise.all(srcs.map(src => new Promise<number>(resolve => {
      const a = new Audio()
      a.preload = 'metadata'
      a.onloadedmetadata = () => resolve(a.duration)
      a.onerror = () => resolve(0)
      a.src = src
    }))).then(d => { if (!cancelled) setDurations(d) })
    return () => { cancelled = true }
  }, [srcs])

  const totalDuration = durations.reduce((a, b) => a + b, 0)
  const offsetBefore = (idx: number) => durations.slice(0, idx).reduce((a, b) => a + b, 0)

  const loadTrack = useCallback((idx: number, autoplay = false) => {
    const el = audioRef.current
    if (!el || idx >= srcs.length) return
    trackIdxRef.current = idx
    el.src = srcs[idx]
    el.load()
    if (autoplay) el.play()
  }, [srcs])

  useEffect(() => {
    const el = new Audio()
    el.preload = 'metadata'
    el.onended = () => {
      const next = trackIdxRef.current + 1
      if (next < srcs.length) {
        loadTrack(next, true)
      } else {
        setState('idle'); setProgress(0); setCurrentTime(0)
        trackIdxRef.current = 0
      }
    }
    audioRef.current = el
    loadTrack(0)
    return () => { el.pause(); el.src = '' }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcs])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.ontimeupdate = () => {
      const t = offsetBefore(trackIdxRef.current) + el.currentTime
      setCurrentTime(t)
      setProgress(totalDuration > 0 ? t / totalDuration : 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durations, totalDuration])

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (state === 'playing') { el.pause(); setState('paused') }
    else { el.play(); setState('playing') }
  }, [state])

  const stop = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    el.pause(); trackIdxRef.current = 0; loadTrack(0)
    setState('idle'); setProgress(0); setCurrentTime(0)
  }, [loadTrack])

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (totalDuration === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const target = ratio * totalDuration
    let acc = 0
    for (let i = 0; i < srcs.length; i++) {
      const d = durations[i] ?? 0
      if (target <= acc + d || i === srcs.length - 1) {
        const el = audioRef.current
        if (!el) return
        const wasPlaying = state === 'playing'
        trackIdxRef.current = i
        el.src = srcs[i]; el.load()
        el.currentTime = target - acc
        if (wasPlaying) el.play()
        break
      }
      acc += d
    }
    setProgress(ratio); setCurrentTime(target)
  }, [totalDuration, durations, srcs, state])

  const isActive = state !== 'idle'
  const isPlaying = state === 'playing'
  const fmt = (s: number) => { const t = Math.floor(s); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 16px 9px 12px',
        borderRadius: 50,
        background: 'rgba(255,255,255,0.06)',
        border: '1.5px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        userSelect: 'none',
        minWidth: 220,
      }}
    >
      {/* Listen badge */}
      <span
        className="font-[family-name:var(--font-urbanist)]"
        style={{
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '.10em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          padding: '3px 9px',
          borderRadius: 50,
          border: '1px solid rgba(255,255,255,0.16)',
          background: 'rgba(255,255,255,0.06)',
          whiteSpace: 'nowrap',
        }}
      >
        Listen
      </span>

      {/* Play / Pause */}
      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.22)',
          background: 'rgba(255,255,255,0.08)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.85)',
          padding: 0,
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Time — current */}
      <span
        className="font-[family-name:var(--font-urbanist)]"
        style={{ flexShrink: 0, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.55)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}
      >
        {fmt(currentTime)}
      </span>

      {/* Progress bar */}
      <div
        onClick={seek}
        style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', minWidth: 80 }}
      >
        <div
          style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            borderRadius: 2,
            width: `${progress * 100}%`,
            background: 'rgba(255,255,255,0.70)',
          }}
        />
      </div>

      {/* Time — total */}
      <span
        className="font-[family-name:var(--font-urbanist)]"
        style={{ flexShrink: 0, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}
      >
        {totalDuration > 0 ? fmt(totalDuration) : '--:--'}
      </span>

      {/* Volume icon (decorative) */}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'rgba(255,255,255,0.40)' }}>
        <path d="M2 5.5h2.5l4-3v11l-4-3H2V5.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M10.5 5.5C11.4 6.2 12 7.03 12 8s-.6 1.8-1.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>

      {/* Stop — only when active */}
      {isActive && (
        <button
          onClick={stop}
          aria-label="Stop"
          style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.28)' }}
        >
          <StopIcon />
        </button>
      )}
    </div>
  )
}

// ── TTS fallback ──────────────────────────────────────────────────────────────

function extractSpeechText(body: unknown[]): string {
  const lines: string[] = []
  for (const block of body) {
    if (!block || typeof block !== 'object') continue
    const b = block as Record<string, unknown>
    if (b._type === 'block' && Array.isArray(b.children)) {
      const text = (b.children as Array<{ text?: string }>).map(c => c.text ?? '').join('').trim()
      if (text) lines.push(text)
    }
  }
  return lines.join('. ')
}

function TTSPlayer({ body }: { body: unknown[] }) {
  const [state, setState] = useState<AudioState>('idle')
  const [supported, setSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const text = useRef('')

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    text.current = extractSpeechText(body)
    return () => { window.speechSynthesis?.cancel() }
  }, [body])

  const play = useCallback(() => {
    if (state === 'paused') { window.speechSynthesis.resume(); setState('playing'); return }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.current)
    u.rate = 0.92; u.pitch = 1; u.lang = 'en-US'
    u.onend = () => setState('idle'); u.onerror = () => setState('idle')
    utteranceRef.current = u
    window.speechSynthesis.speak(u)
    setState('playing')
  }, [state])

  const pause = useCallback(() => { window.speechSynthesis.pause(); setState('paused') }, [])
  const stop = useCallback(() => { window.speechSynthesis.cancel(); setState('idle') }, [])

  if (!supported || !text.current) return null

  const isActive = state !== 'idle'
  const isPlaying = state === 'playing'

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '9px 16px 9px 12px', borderRadius: 50,
        background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', userSelect: 'none',
      }}
    >
      <button
        onClick={isActive ? (isPlaying ? pause : play) : play}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.08)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.85)', padding: 0,
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <span className="font-[family-name:var(--font-urbanist)]" style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '.04em' }}>
        {isPlaying ? 'Playing…' : state === 'paused' ? 'Paused' : 'Listen'}
      </span>

      {isActive && (
        <button onClick={stop} aria-label="Stop" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.28)' }}>
          <StopIcon />
        </button>
      )}
    </div>
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

export default function BlogListen({ body, audioSrc }: { body: unknown[]; audioSrc?: string | string[] }) {
  if (audioSrc) {
    const srcs = Array.isArray(audioSrc) ? audioSrc : [audioSrc]
    return <AudioPlayer srcs={srcs} />
  }
  return <TTSPlayer body={body} />
}

function PlayIcon() {
  return <svg width="12" height="13" viewBox="0 0 12 13" fill="currentColor"><path d="M2 1.5L11 6.5L2 11.5V1.5Z"/></svg>
}
function PauseIcon() {
  return <svg width="12" height="13" viewBox="0 0 12 13" fill="currentColor"><rect x="1.5" y="1.5" width="3" height="10" rx="1.2"/><rect x="7.5" y="1.5" width="3" height="10" rx="1.2"/></svg>
}
function StopIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="8" height="8" rx="1.2"/></svg>
}
