import type { Metadata } from 'next'
import PageStub from '@/components/option1/PageStub'

export const metadata: Metadata = {
  title: 'Gastrointestinal Care Pathway | Dr. Pal\'s NewME',
  description:
    'A structured gastrointestinal pathway of care for gut health, digestive instability, and microbiome rebalance.',
}

export default function GIPathwayPage() {
  return (
    <PageStub
      eyebrow="Pathway · Gastrointestinal"
      title="The Gastrointestinal Pathway"
      blurb="A structured pathway for gut health, digestive instability, and microbiome rebalance — clinically guided across each phase."
    />
  )
}
