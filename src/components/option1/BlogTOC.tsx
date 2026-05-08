'use client'

import { useState, useEffect } from 'react'
import type { TOCEntry } from './BlogArticleBody'

export default function BlogTOC({ entries }: { entries: TOCEntry[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!entries.length) return
    const observer = new IntersectionObserver(
      (obs) => {
        const visible = obs.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    entries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [entries])

  if (!entries.length) return null

  return (
    <nav
      aria-label="Table of contents"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        padding: '24px 28px',
        marginBottom: 48,
        backdropFilter: 'blur(12px)',
      }}
    >
      <p
        className="font-[family-name:var(--font-bricolage)] text-white"
        style={{ fontSize: 18, fontWeight: 600, marginBottom: 18, letterSpacing: '-0.01em' }}
      >
        Table of Contents
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {entries.map((entry, i) => {
          const isActive = activeId === entry.id
          return (
            <li key={entry.id} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
              <a
                href={`#${entry.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="font-[family-name:var(--font-urbanist)] transition-colors"
                style={{
                  display: 'block',
                  padding: '11px 0',
                  fontSize: entry.level === 3 ? 14 : 15,
                  paddingLeft: entry.level === 3 ? 16 : 0,
                  color: isActive ? '#FEF272' : 'rgba(255,255,255,0.72)',
                  fontWeight: isActive ? 500 : 400,
                  textDecoration: 'none',
                  borderLeft: entry.level === 3 ? '2px solid rgba(254,242,114,0.2)' : 'none',
                }}
              >
                {entry.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
