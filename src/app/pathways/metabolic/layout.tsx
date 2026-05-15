import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Metabolic Care Pathways | Dr. Pal\'s NewME',
  description:
    'NewME\'s Metabolic Care Pathways address metabolic health through structured lifestyle correction, guided accountability, and continuous monitoring — from foundational stabilisation to long-term sustainability.',
}

export default function MetabolicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
