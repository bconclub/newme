import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Care Pathways | Dr. Pal\'s NewME',
  description:
    'Explore NewME\'s structured care pathways for metabolic health, gastrointestinal conditions, and long-term continuity — each designed around clinical oversight and personalised lifestyle correction.',
}

export default function PathwaysLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
