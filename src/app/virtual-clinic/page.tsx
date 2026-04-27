import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'Virtual Clinic | Dr. Pal\'s NewME',
  description:
    'The NewME virtual clinic — assessment, consultations, monitoring, and care across distance, with the structure of a clinical system.',
}

export default function VirtualClinicPage() {
  return (
    <PageStub
      eyebrow="Virtual Clinic"
      title="Care, Without The Distance"
      blurb="Assessment, consultations, monitoring, and ongoing care — delivered with the structure of a clinical system, anywhere you are."
    />
  )
}
