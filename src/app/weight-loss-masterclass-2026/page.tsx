import type { Metadata } from 'next'
import MasterclassClient from './MasterclassClient'

export const metadata: Metadata = {
  title: 'Weight Loss Masterclass 2026 | Dr. Pal\'s NewME',
  description:
    'Doctor-led, science-backed weight loss masterclass. Discover the real root causes behind your weight-loss struggles and fix them for good. Register now for just $9.',
  openGraph: {
    title: 'Weight Loss Masterclass 2026 | Dr. Pal\'s NewME',
    description:
      'Join Dr. Pal — US-based gastroenterologist with 5M+ followers — to uncover why you\'re stuck and how to finally fix it. $9 (Regular $97).',
    type: 'website',
  },
}

export default function WeightLossMasterclassPage() {
  return <MasterclassClient />
}
