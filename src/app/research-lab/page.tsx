import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'Research Lab | Dr. Pal\'s NewME',
  description:
    'Our clinical research lab — measurable outcomes, structured studies, and evidence-led protocols.',
}

export default function ResearchLabPage() {
  return (
    <PageStub
      eyebrow="Research Lab"
      title="Evidence Behind Every Pathway"
      blurb="The clinical research that informs our protocols — measurable outcomes, structured studies, and ongoing iteration."
    />
  )
}
