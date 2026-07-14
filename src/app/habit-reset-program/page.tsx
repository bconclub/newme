import type { Metadata } from 'next'
import HabitResetClient from './HabitResetClient'

export const metadata: Metadata = {
  title: 'Habit Reset Program | Dr. Pal\'s NewME',
  description:
    'Reset your energy, sleep & digestion in 60 days with the NewME 9-Habit Reset — no strict diets, no supplements, no complicated routines. Doctor-led, science-backed.',
  openGraph: {
    title: 'Habit Reset Program | Dr. Pal\'s NewME',
    description:
      'Feel more energetic, lighter & sharper. Join the NewME 9-Habit Reset — a 60-day, doctor-led health reset challenge. Starts August 1st. Limited seats.',
    type: 'website',
  },
}

export default function HabitResetProgramPage() {
  return <HabitResetClient />
}
