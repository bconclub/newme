import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Contact Us | Dr. Pal\'s NewME',
  description:
    'Get in touch with the NewME team. Whether you have questions about our care pathways, virtual clinic, or want to book a consultation — we\'re here to help.',
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
