import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'Continuity Pathway | Dr. Pal\'s NewME',
  description:
    'A long-term consolidation pathway that reinforces metabolic and gut stability, with ongoing clinical oversight and accountability.',
}

export default function ContinuityPathwayPage() {
  return (
    <PageStub
      eyebrow="Pathway · Continuity"
      title="The NewME Continuity Pathway"
      blurb="A consolidation pathway that reinforces stability over time — sustained accountability, clinical oversight, and long-term care."
    />
  )
}
