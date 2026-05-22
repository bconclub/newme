import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import PageHero from '@/components/option1/PageHero'
import VCHeroCta from './VCHeroCta'
import { VCWhatIs, VCHowItWorks, VCDoctorCard } from './VCSections'

export const metadata: Metadata = {
  title: 'Virtual Consult | Dr. Pal\'s NewME',
  description:
    'Doctor-led virtual clinic from NewME. Consult with our clinical team from wherever you are — focused, evidence-based care without referral chains or waiting.',
}

// Figma node 83:49 — "Dr pals Newme - Virtual clinic". 1920×3881 artboard.
// Sections (artboard y → y):
//   Header        39  → 113
//   Hero card    152  → 846   (1880×694, radius 48)
//   What Is      966  → 1690  (centered title + Who-It's-For card)
//   How It Works 1810 → 2656  (4 steps with hairlines)
//   Doctor Card  2797 → 3271  (1192×474, gold heading + 2 contact pills)
//   Footer       3391 → 3881
export default function VirtualClinicPage() {
  return (
    <>
      <Header />
      <main className="newme-page vc-page">
        <VCBlobs />
        <VCHero />
        <VCWhatIs />
        <VCHowItWorks />
        <VCDoctorCard />
      </main>
      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-level gradient blobs — Figma 83:51 / 83:2430 / 83:2426.
// Each ellipse is exported from Figma as an SVG with the linear gradient and
// the gaussian blur baked in. We place each at its exact artboard position
// (1920×3881 reference), scaled to fit the viewport via .vc-frame transform.
//
//   Ellipse 28 (83:51):    artboard (-1306, 1807) + 800px blur halo each side
//                          → SVG at (-2106, 1007), 6080×6080 viewBox
//                          fill: #629675 → #013E37 linear, blur σ=400
//   Ellipse 34 (83:2430):  artboard (1610, 1845)  + 800px blur halo
//                          → SVG at (810, 1045), 2495×2581.94
//                          fill: #FEF272, blur σ=400
//   Ellipse 39 (83:2426):  artboard (721, 2726)   + 300px blur halo
//                          → SVG at (421, 2426), 1025×1066
//                          fill: #FF8547 (tangerine!), blur σ=150
// ─────────────────────────────────────────────────────────────────────────────
function VCBlobs() {
  return (
    <div
      aria-hidden
      className="vc-bg pointer-events-none absolute inset-x-0 top-0 z-0"
    >
      <div className="vc-frame">
        {/* CSS-driven ellipses (recipes in option1.scss). The pre-baked SVGs
            had visible curved seams where the σ=400 halo terminated — the
            CSS approach uses multi-stop masks + heavier blur so the wash
            dissolves smoothly into the page bg. */}
        <span className="vc-bg-ellipse vc-bg-ellipse-28" />
        <span className="vc-bg-noise-28" />
        <span className="vc-bg-ellipse vc-bg-ellipse-34" />
        <span className="vc-bg-ellipse vc-bg-ellipse-39" />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — composes <PageHero> (Figma 121:93 template) with a CTA pair.
// ─────────────────────────────────────────────────────────────────────────────
function VCHero() {
  return (
    <PageHero
      imageSrc="/clinic/virtual-clinic-hero.webp"
      imageAlt="NewME clinician on a virtual consultation"
      imagePosition="65% center"
      heading={<>Doctor-led Care,<br />Without The Wait.</>}
      subheading="Consult with NewME's clinical team from wherever you are. Focused, evidence-based care without referral chains or waiting."
      headingMaxWidthPx={1086}
      bodyMaxWidthPx={783}
      cta={<VCHeroCta />}
    />
  )
}

// VCHeroCta lives in ./VCHeroCta.tsx as a separate client component
// because this page is a server component (exports `metadata`) and can't
// import framer-motion directly.

