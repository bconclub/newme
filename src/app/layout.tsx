import type { Metadata } from 'next'
import { Bricolage_Grotesque, Urbanist, Poppins } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import './option1.scss'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CookieBanner from '@/components/layout/CookieBanner'

/**
 * Resolves the canonical site URL used for OG images, sitemap entries,
 * and other metadata that needs an absolute URL.
 *
 * Fallback chain (first match wins):
 *   1. NEXT_PUBLIC_SITE_URL — explicit override (set this in Vercel env
 *      to lock the canonical to the production domain at launch).
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's configured production
 *      alias for the project (set automatically on production deploys
 *      once a custom domain is attached).
 *   3. VERCEL_URL — Vercel's per-deployment URL (e.g.
 *      `newme-web.vercel.app`). Set automatically on every deploy,
 *      including previews — so OG images on the preview URL
 *      auto-resolve to the preview domain without manual config.
 *   4. Hard-coded production fallback for local dev when none of the
 *      above are set.
 *
 * Why this matters: WhatsApp / Facebook / Twitter scrapers fetch the
 * absolute og:image URL. If metadataBase points at the wrong domain,
 * the image 404s and link previews show no thumbnail.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://drpalsnewme.com'
}
const siteUrl = resolveSiteUrl()

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
  keywords: ['metabolic health', 'gut health', 'Dr Pal', 'NewME', 'clinical care'],
  alternates: {
    canonical: '/',
  },
  // Opened up at launch (2026-05-23) — was index: false / follow: false
  // during pre-launch as one of the three indexing-block layers. The
  // other two (X-Robots-Tag header in next.config.ts + robots.txt via
  // the Sanity-driven route handler) were also flipped at the same time.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'NewME | Doctor-Led Care, Personalized For Your Body',
    description:
      'A doctor-led clinical system for metabolic and gut regulation by Dr. Palaniappan Manickam.',
    url: '/',
    siteName: "Dr. Pal's NewME",
    images: [
      {
        // Homepage hero photo. 2752×1536 ≈16:9 renders cleanly in WhatsApp /
        // Facebook link previews — closer to FB's recommended 1200×630 than
        // the previous 1880×694 (≈2.7:1) which got awkward letterboxing.
        url: '/home/Homepage Hero.webp',
        width: 2752,
        height: 1536,
        alt: "Dr. Pal's NewME",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewME | Doctor-Led Care, Personalized For Your Body',
    description:
      'A doctor-led clinical system for metabolic and gut regulation by Dr. Palaniappan Manickam.',
    images: ['/home/Homepage Hero.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '75x74' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${urbanist.variable} ${poppins.variable}`}
    >
      <body>
        {/* ------------------------------------------------------------------
            Scroll-reveal fallback for non-JS DOM reconstruction.

            Our Framer Motion `whileInView` reveals render their *initial*
            state (inline `opacity:0`, plus a translate/scale) into the SSR
            HTML. Real browsers run the JS and reveal each element on scroll.
            But tools that reconstruct the page from the serialized DOM
            WITHOUT running its JS — Microsoft Clarity's session-replay and
            heatmap renderer (sandboxed, scripts off), and non-JS SEO
            crawlers — never fire those reveals, so every below-the-fold
            heading/paragraph/card stays invisible. That's why Clarity
            recordings/heatmaps looked "broken" (green panels, missing
            content).

            A <noscript> <style> applies ONLY when scripting is disabled —
            exactly that reconstruction context. Real users (JS enabled)
            never parse this block, so animations are 100% unchanged and it
            adds zero JS / zero network cost. It forces the reveal elements
            to their final visible state.

            Selectors target the Framer reveal signature (`opacity:0` as a
            full declaration) while deliberately NOT matching decorative
            layers that rest at a fractional opacity (e.g. `opacity:0.22`
            noise, `opacity:0.9` washes). Transform is reset only on
            elements that ALSO carry `opacity:0`, so the scaled background
            blob (`.newme-bg`, which has a transform but no opacity:0) is
            left intact. ------------------------------------------------ */}
        <noscript>
          <style>{`
            [style*="opacity:0;"],[style$="opacity:0"],
            [style*="opacity: 0;"],[style$="opacity: 0"]{opacity:1!important;}
            [style*="opacity:0;"][style*="transform"],
            [style*="opacity: 0;"][style*="transform"]{transform:none!important;}
          `}</style>
        </noscript>
        {/* TODO: Replace with permanent GA setup before launch */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5ENFCY7VJ3"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5ENFCY7VJ3');
        `}</Script>
        {/* Microsoft Clarity — free session recordings + heatmaps + UX
            insights. Project id wvk2hptfrl. Dashboard:
            https://clarity.microsoft.com/projects/view/wvk2hptfrl
            By default Clarity masks all form inputs (input/select/textarea)
            and text content marked sensitive, so it does NOT record PII
            from the assessment quiz — only clicks, scrolls, and rage-tap
            patterns. To opt in to recording a specific element, add
            data-clarity-unmask. Loads after page interactive so it never
            blocks LCP. */}
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wvk2hptfrl");
        `}</Script>
        <SmoothScroll>{children}</SmoothScroll>
        <CookieBanner />
        {/* Vercel Analytics — auto-tracks page views, bounce rate, geo,
            referrers etc. Pro plan feature; data shows up in Vercel
            dashboard → Analytics tab. Lightweight (~1KB script). */}
        <Analytics />
        {/* Vercel Speed Insights — real-user Core Web Vitals (LCP, CLS,
            INP). Pro plan feature; data shows up in Vercel dashboard →
            Speed Insights tab. Google uses CWV as a ranking factor so
            this also doubles as SEO instrumentation. */}
        <SpeedInsights />
      </body>
    </html>
  )
}
