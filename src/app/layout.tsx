import type { Metadata } from 'next'
import { Bricolage_Grotesque, Urbanist, Poppins } from 'next/font/google'
import './globals.css'
import './option1.scss'
import SmoothScroll from '@/components/layout/SmoothScroll'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500'],
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NewMe | Doctor-Led Care, Personalized For Your Body',
  description:
    'NewMe combines clinical insights with structured care to better understand your body and provide the care it needs. A doctor-led clinical system for metabolic and gut regulation.',
  keywords: ['metabolic health', 'gut health', 'Dr Pal', 'NewMe', 'clinical care'],
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: 'NewMe | Doctor-Led Care, Personalized For Your Body',
    description:
      'A doctor-led clinical system for metabolic and gut regulation by Dr. Palaniappan Manickam.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${urbanist.variable} ${poppins.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
