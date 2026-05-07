import type { Metadata } from 'next'
import { Bricolage_Grotesque, Urbanist, Poppins } from 'next/font/google'
import './globals.css'
import './option1.scss'
import SmoothScroll from '@/components/layout/SmoothScroll'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://newme.health').replace(/\/$/, '')

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
  metadataBase: new URL(siteUrl),
  title: 'NewME | Doctor-Led Care, Personalized For Your Body',
  description:
    'NewME combines clinical insights with structured care to better understand your body and provide the care it needs. A doctor-led clinical system for metabolic and gut regulation.',
  keywords: ['metabolic health', 'gut health', 'Dr Pal', 'NewME', 'clinical care'],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: 'NewME | Doctor-Led Care, Personalized For Your Body',
    description:
      'A doctor-led clinical system for metabolic and gut regulation by Dr. Palaniappan Manickam.',
    url: '/',
    siteName: "Dr. Pal's NewME",
    images: [
      {
        url: '/media/Media Hero.webp',
        width: 1880,
        height: 694,
        alt: "Dr. Pal's NewME",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewME | Doctor-Led Care, Personalized For Your Body',
    description:
      'A doctor-led clinical system for metabolic and gut regulation by Dr. Palaniappan Manickam.',
    images: ['/media/Media Hero.webp'],
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
