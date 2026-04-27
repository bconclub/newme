import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'Metabolic Care Pathway | Dr. Pal\'s NewME',
  description:
    'A structured metabolic pathway of care — assessment, intervention, and continuity for weight resistance, plateau, and metabolic dysregulation.',
}

export default function MetabolicPathwayPage() {
  return (
    <PageStub
      eyebrow="Pathway · Metabolic"
      title="The Metabolic Care Pathway"
      blurb="A structured pathway for weight resistance, metabolic plateau, and dysregulation — built around assessment, intervention, and continuity."
    />
  )
}
