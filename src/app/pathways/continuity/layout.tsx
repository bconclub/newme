import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Continuity Pathways | Dr. Pal\'s NewME',
  description:
    'NewME\'s Continuity Pathways support long-term stability through ongoing accountability, lifestyle monitoring, and relapse prevention — recommended after completing a core care pathway.',
}

export default function ContinuityLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
