import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'Pathways | Dr. Pal\'s NewME',
  description:
    'Three structured pathways of care — Metabolic, Gastrointestinal, and Continuity — each aligned to a specific level of complexity.',
}

export default function PathwaysPage() {
  return (
    <PageStub
      eyebrow="Pathways"
      title="The Pathways To Better Health"
      blurb="Each defined pathway of care is aligned to a specific level of metabolic and gastrointestinal complexity. Your assessment determines the pathway."
    />
  )
}
