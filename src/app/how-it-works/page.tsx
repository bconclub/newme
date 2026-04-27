import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'How It Works | Dr. Pal\'s NewME',
  description:
    'How NewME structures care across assessment, pathways, and continuity — a doctor-led clinical system for metabolic and gut regulation.',
}

export default function HowItWorksPage() {
  return (
    <PageStub
      eyebrow="How It Works"
      title="The NewME System"
      blurb="A doctor-led, structured clinical system that brings your symptoms, history, and responses into one cohesive pathway of care."
    />
  )
}
