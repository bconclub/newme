import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'GastroIntestinal Care Pathways | Dr. Pal\'s NewME',
  description:
    'NewME\'s GI Care Pathways provide structured support for digestive conditions including IBS, GERD, bloating, and food intolerances — guided by clinical oversight and continuous symptom monitoring.',
}

export default function GILayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
