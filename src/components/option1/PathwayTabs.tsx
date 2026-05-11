'use client'

import Link from 'next/link'

/**
 * PathwayTabs — the 3-tab switcher shared across the 3 pathway pages.
 *
 * Pass `active` as the current page's route so the correct tab is
 * highlighted (white pill, dark text).  Inactive tabs get a glass border.
 */
const TABS = [
  { label: 'Metabolic Care Pathways',       href: '/pathways/metabolic' },
  { label: 'GastroIntestinal Care Pathways', href: '/pathways/gi' },
  { label: 'Continuity Pathways',            href: '/pathways/continuity' },
] as const

type PathwayTabsProps = {
  active: '/pathways/metabolic' | '/pathways/gi' | '/pathways/continuity'
}

export default function PathwayTabs({ active }: PathwayTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const isActive = tab.href === active
        return (
          <Link key={tab.href} href={tab.href} style={{ textDecoration: 'none' }}>
            <span
              className="font-[family-name:var(--font-urbanist)]"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                padding: '0 clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                borderRadius: 40,
                fontSize: 'clamp(12px, calc(15 / 1920 * 100vw), 15px)',
                fontWeight: 400,
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.35)',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#013E37' : 'rgba(255,255,255,0.80)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
