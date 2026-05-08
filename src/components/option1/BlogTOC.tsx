'use client'

import { useState, useEffect } from 'react'
import type { TOCEntry } from './BlogArticleBody'

type TOCGroup = {
  entry: TOCEntry
  children: TOCEntry[]
}

function buildGroups(entries: TOCEntry[]): TOCGroup[] {
  const groups: TOCGroup[] = []
  for (const e of entries) {
    if (e.level === 2) {
      groups.push({ entry: e, children: [] })
    } else if (groups.length > 0) {
      groups[groups.length - 1].children.push(e)
    }
  }
  return groups
}

export default function BlogTOC({ entries }: { entries: TOCEntry[] }) {
  const [open, setOpen] = useState(true)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [activeId, setActiveId] = useState('')
  const groups = buildGroups(entries)

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleGroup = (id: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (!entries.length) return null

  return (
    <nav
      aria-label="Table of contents"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        marginBottom: 48,
        overflow: 'hidden',
      }}
    >
      {/* Header row — toggles whole TOC */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between font-[family-name:var(--font-bricolage)] text-white"
        style={{
          padding: '18px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          textAlign: 'left',
        }}
      >
        <span>Table of Contents</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', flexShrink: 0 }}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Body */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '4px 0 8px' }}>
          {groups.map((g) => {
            const hasChildren = g.children.length > 0
            const isGroupCollapsed = collapsed.has(g.entry.id)
            const isActive = activeId === g.entry.id || g.children.some(c => c.id === activeId)

            return (
              <div key={g.entry.id}>
                {/* H2 row */}
                <div className="flex items-center" style={{ gap: 0 }}>
                  <button
                    onClick={() => scrollTo(g.entry.id)}
                    className="font-[family-name:var(--font-urbanist)] transition-colors flex-1 text-left"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '10px 24px',
                      fontSize: 14,
                      color: isActive ? '#FEF272' : 'rgba(255,255,255,0.75)',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {g.entry.text}
                  </button>
                  {hasChildren && (
                    <button
                      onClick={() => toggleGroup(g.entry.id)}
                      aria-label={isGroupCollapsed ? 'Expand' : 'Collapse'}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '10px 20px 10px 8px',
                        color: 'rgba(255,255,255,0.35)',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                        style={{ transition: 'transform 0.2s ease', transform: isGroupCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>

                {/* H3 children */}
                {hasChildren && !isGroupCollapsed && (
                  <div style={{ borderLeft: '2px solid rgba(254,242,114,0.15)', marginLeft: 24, marginBottom: 2 }}>
                    {g.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => scrollTo(child.id)}
                        className="font-[family-name:var(--font-urbanist)] w-full text-left transition-colors"
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          display: 'block',
                          padding: '7px 16px',
                          fontSize: 13,
                          color: activeId === child.id ? '#FEF272' : 'rgba(255,255,255,0.50)',
                          fontWeight: activeId === child.id ? 500 : 400,
                        }}
                      >
                        {child.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </nav>
  )
}
