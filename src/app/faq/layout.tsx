import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'FAQ | Dr. Pal\'s NewME',
  description:
    'Answers to the most common questions about NewME\'s care pathways, virtual consult, pricing, how it works, and what to expect from your health journey.',
}

export default function FAQLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
