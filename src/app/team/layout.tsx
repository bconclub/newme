import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'NewME Care Team | Dr. Pal\'s NewME',
  description:
    'Meet the clinical team behind NewME — doctors, coaches, and specialists committed to delivering structured, evidence-based metabolic and gut health care.',
}

export default function TeamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
