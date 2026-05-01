import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

export const metadata: Metadata = {
  title: 'Virtual Clinic | Dr. Pal\'s NewME',
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
// Hero — Figma 83:58 / 83:63 / 83:2431 / 83:2439 / 83:2432
// 1880×694 rounded card; doctor photo on right, pine wash on left, gold pill
// CTA with tangerine arrow circle (same overlap pattern as HIWHero).
// ─────────────────────────────────────────────────────────────────────────────
function VCHero() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(88px, calc(113 / 1920 * 100vw), 113px)',
        paddingLeft: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        paddingRight: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
          minHeight: 'clamp(420px, calc(694 / 1880 * 100vw), 694px)',
          background: '#0E2827',
        }}
      >
        {/* Doctor photo — pre-cropped to 1880×694 (Figma 83:62). */}
        <div className="absolute inset-0">
          <Image
            src="/clinic/virtual-clinic-hero.webp"
            alt="NewME clinician on a virtual consultation"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1880px"
            className="object-cover [object-position:65%_center] md:object-center"
          />
        </div>

        {/* Pine gradient wash, fading out around 60% so the doctor reads through
            on the right while the left stays dark for legible copy. Mirrors the
            HIWHero treatment for visual continuity. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(118deg, #629675 0%, #2F7269 30%, #144F49 55%, #013E37 80%)',
            opacity: 0.92,
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 44%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0) 62%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 44%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0) 62%)',
          }}
        />

        {/* Soft monotone noise on the wash side only. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.18,
            mixBlendMode: 'multiply',
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: '220px 220px',
            maskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 46%, rgba(0,0,0,0.05) 56%, rgba(0,0,0,0) 64%)',
            WebkitMaskImage:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.4) 46%, rgba(0,0,0,0.05) 56%, rgba(0,0,0,0) 64%)',
          }}
        />

        {/* Content. Figma:
            heading 83:2431 at x=120 y=341 — 1086×144, Bricolage SemiBold 80/96
            body    83:2439 at x=120 y=509 — 783×60,  Urbanist 20/30
            CTA     83:2432 at x=120 y=593 — 344×64
        */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            paddingTop: 'clamp(88px, calc(189 / 1920 * 100vw), 189px)',
            paddingLeft: 'clamp(28px, calc(120 / 1920 * 100vw), 120px)',
            paddingRight: 'clamp(20px, calc(20 / 1920 * 100vw), 20px)',
            paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          }}
        >
          <h1
            className="font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(34px, calc(80 / 1920 * 100vw), 80px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              maxWidth: 'clamp(320px, calc(1086 / 1920 * 100vw), 1086px)',
            }}
          >
            Doctor-led Care,
            <br />
            Without The Wait.
          </h1>

          <p
            className="text-white font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 1.6,
              maxWidth: 'clamp(280px, calc(783 / 1920 * 100vw), 783px)',
              marginTop: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
            }}
          >
            Consult with NewME&rsquo;s clinical team from wherever you are.
            Focused, evidence-based care without referral chains or waiting.
          </p>

          {/* CTA — gold pill (Bricolage Medium 24) + tangerine 64 arrow circle.
              Figma: pill 289×64, arrow circle 64×64 with -7px overlap onto pill. */}
          <div
            className="group/cta flex items-center flex-row-reverse justify-end"
            style={{
              marginTop: 'clamp(20px, calc(36 / 1920 * 100vw), 36px)',
            }}
          >
            <a
              href="#contact"
              aria-label="Book a consultation"
              className="relative z-0 rounded-full bg-[#F08B55] hover:bg-[#FF8547] text-white flex items-center justify-center shrink-0 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors"
              style={{
                width: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
              }}
            >
              <svg
                viewBox="0 0 30 30"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover/cta:translate-x-[2px] group-hover/cta:-translate-y-[2px]"
                style={{
                  width: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                  height: 'clamp(20px, calc(30 / 1920 * 100vw), 30px)',
                }}
              >
                <path
                  d="M9 21L21 9M21 9H11M21 9V19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="relative z-10 inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FDF185] text-black font-medium font-[family-name:var(--font-bricolage)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors"
              style={{
                height: 'clamp(48px, calc(64 / 1920 * 100vw), 64px)',
                paddingLeft: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                paddingRight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                fontSize: 'clamp(15px, calc(24 / 1920 * 100vw), 24px)',
                lineHeight: 1,
                marginRight: 'clamp(-12px, calc(-9 / 1920 * 100vw), -9px)',
              }}
            >
              Book A Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// What Is The NewME Virtual Clinic? — Figma 83:2387 / 83:2388 / 83:2389
// Centered title (706 wide) + paragraph (917 wide) + Who-It's-For card
// (1194×374, radius 48, white/28 border, gold heading, 3 bullet rows).
// ─────────────────────────────────────────────────────────────────────────────
function VCWhatIs() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(40px, calc(60 / 1920 * 100vw), 60px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1194 }}>
        <h2
          className="text-center font-[family-name:var(--font-bricolage)] text-white mx-auto"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(32px, calc(56 / 1920 * 100vw), 56px)',
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            maxWidth: 'clamp(280px, calc(706 / 1920 * 100vw), 706px)',
          }}
        >
          What Is The NewME Virtual Clinic?
        </h2>
        <p
          className="text-center mx-auto text-white/85 font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 400,
            fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
            lineHeight: 1.7,
            maxWidth: 'clamp(280px, calc(917 / 1920 * 100vw), 917px)',
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          The NewME Virtual Clinic offers direct access point to qualified
          doctors for focused medical consultations. It is designed for
          individuals who need clinical clarity, guidance, or evaluation.
        </p>

        {/* Who It's For card — Figma 83:2389. Glass surface with green internal
            glow, 48px radius, 1px white-28% border. */}
        <div
          className="vc-glass relative overflow-hidden"
          style={{
            marginTop: 'clamp(48px, calc(80 / 1920 * 100vw), 80px)',
            borderRadius: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
            border: '1px solid rgba(255, 255, 255, 0.28)',
            padding:
              'clamp(28px, calc(80 / 1920 * 100vw), 80px) clamp(24px, calc(80 / 1920 * 100vw), 80px)',
            minHeight: 'clamp(280px, calc(374 / 1920 * 100vw), 374px)',
          }}
        >
          <h3
            className="font-[family-name:var(--font-bricolage)]"
            style={{
              fontWeight: 600,
              color: '#FEF272',
              fontSize: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Who It&rsquo;s For:
          </h3>

          <ul
            className="space-y-0"
            style={{ marginTop: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)' }}
          >
            {[
              'Individuals seeking clarity on existing metabolic & gut conditions',
              'Those considering structured care but want a deeper understanding',
              'Patients looking for a second opinion or medical guidance',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 text-white font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
                  lineHeight: 'clamp(28px, calc(34 / 1920 * 100vw), 34px)',
                  paddingTop: 'clamp(8px, calc(16 / 1920 * 100vw), 16px)',
                }}
              >
                <span
                  aria-hidden
                  className="rounded-full bg-[#FEF272] shrink-0"
                  style={{
                    width: 8,
                    height: 8,
                    marginTop: 'clamp(11px, calc(13 / 1920 * 100vw), 13px)',
                  }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works? — Figma 83:2422 + 83:2414/2405/2408/2411
// Section title left-aligned in gold; 4 step rows with bottom hairline at
// y=2090, 2288, 2496. Step label (Urbanist 28) on left, title + body stack
// on the right, 917px wide.
// ─────────────────────────────────────────────────────────────────────────────
function VCHowItWorks() {
  const steps = [
    {
      n: 'Step 1',
      title: 'Book and complete a short form',
      body:
        'Secure your consultation and share your basic health details in advance so your session is focused and efficient.',
    },
    {
      n: 'Step 2',
      title: 'Schedule your consultation',
      body:
        'Your information is reviewed by the team, and your appointment is confirmed based on availability.',
    },
    {
      n: 'Step 3',
      title: 'Speak with your doctor',
      body:
        'A 30–45 minute video consultation. Gastrointestinal cases are handled by a senior specialist; all other concerns by field-specific experts.',
    },
    {
      n: 'Step 4',
      title: 'Receive your care plan',
      body:
        'You receive clinical notes, a personalized care plan, and follow-up guidance after your session.',
    },
  ]

  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(40px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1194 }}>
        <h2
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 600,
            color: '#FEF272',
            fontSize: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          How It Works?
        </h2>

        <ol
          className="mt-10"
          style={{ marginTop: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)' }}
        >
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-2 gap-x-8"
              style={{
                paddingTop: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                paddingBottom: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                borderBottom:
                  i < steps.length - 1
                    ? '1px solid rgba(255, 255, 255, 0.18)'
                    : 'none',
              }}
            >
              <span
                className="text-white/55 font-[family-name:var(--font-urbanist)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                  lineHeight: 1.4,
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="text-white font-[family-name:var(--font-bricolage)]"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-white/80 font-[family-name:var(--font-urbanist)]"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
                    lineHeight: 1.55,
                    marginTop: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
                    maxWidth: 'clamp(280px, calc(917 / 1920 * 100vw), 917px)',
                  }}
                >
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// The Doctor Will See You Now — Figma 83:2426 / 83:2427 / 83:2429 / 83:2440
// Big rounded card 1192×474 with a gold/amber radial behind the heading,
// gold display heading (~96px), white subline, two pill contact buttons.
// ─────────────────────────────────────────────────────────────────────────────
function VCDoctorCard() {
  return (
    <section
      id="contact"
      className="relative"
      style={{
        paddingTop: 'clamp(40px, calc(60 / 1920 * 100vw), 60px)',
        paddingBottom: 'clamp(56px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="vc-glass relative mx-auto overflow-hidden"
        style={{
          maxWidth: 1192,
          borderRadius: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          paddingTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          paddingBottom: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
          paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        }}
      >
        <div className="relative">
          <h2
            className="text-center mx-auto font-[family-name:var(--font-bricolage)]"
            style={{
              fontWeight: 600,
              color: '#FEF272',
              fontSize: 'clamp(34px, calc(80 / 1920 * 100vw), 80px)',
              lineHeight: 0.9,
              letterSpacing: '-0.015em',
              maxWidth: 'clamp(280px, calc(1011 / 1920 * 100vw), 1011px)',
            }}
          >
            The Doctor Will See You Now.
          </h2>
          <p
            className="text-center mx-auto text-white/90 font-[family-name:var(--font-urbanist)]"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              lineHeight: 1.45,
              marginTop: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
            }}
          >
            Get in touch. We&rsquo;re just a message away.
          </p>

          {/* Contact pills — Figma 83:2440. Mail us 526×88, Whatsapp 349×88,
              16px gap, both rounded-80. Icon circle 80×80 inside left edge. */}
          <div
            className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4"
            style={{
              marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
            }}
          >
            <ContactPill
              kind="mail"
              eyebrow="Mail us"
              value="consult@drpalmanickam.com"
              href="mailto:consult@drpalmanickam.com"
            />
            <ContactPill
              kind="whatsapp"
              eyebrow="Whatsapp"
              value="+91 99441 27006"
              href="https://wa.me/919944127006"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPill({
  kind,
  eyebrow,
  value,
  href,
}: {
  kind: 'mail' | 'whatsapp'
  eyebrow: string
  value: string
  href: string
}) {
  const iconBg =
    kind === 'mail' ? 'rgba(255, 133, 71, 0.23)' : 'rgba(98, 150, 117, 0.36)'
  const iconColor = kind === 'mail' ? '#F08B55' : '#629675'

  return (
    <a
      href={href}
      target={kind === 'whatsapp' ? '_blank' : undefined}
      rel={kind === 'whatsapp' ? 'noopener noreferrer' : undefined}
      className="group/pill flex items-center bg-white rounded-full transition-shadow hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)]"
      style={{
        height: 'clamp(64px, calc(88 / 1920 * 100vw), 88px)',
        paddingLeft: 4,
        paddingRight: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
        gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
      }}
    >
      <span
        aria-hidden
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: 'clamp(56px, calc(80 / 1920 * 100vw), 80px)',
          height: 'clamp(56px, calc(80 / 1920 * 100vw), 80px)',
          background: iconBg,
          color: iconColor,
        }}
      >
        {kind === 'mail' ? (
          <svg
            viewBox="0 0 40 40"
            fill="none"
            style={{
              width: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
              height: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
            }}
          >
            <path
              d="M6.667 11.667a3.333 3.333 0 013.333-3.333h20a3.333 3.333 0 013.333 3.333v16.666A3.333 3.333 0 0130 31.667H10a3.333 3.333 0 01-3.333-3.334V11.667z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M8 12l12 8.333L32 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 49 49"
            fill="currentColor"
            style={{
              width: 'clamp(34px, calc(49 / 1920 * 100vw), 49px)',
              height: 'clamp(34px, calc(49 / 1920 * 100vw), 49px)',
            }}
          >
            <path d="M24.5 4.083C13.245 4.083 4.083 13.245 4.083 24.5c0 3.605.952 7.135 2.762 10.236L4.124 44.916l10.405-2.7a20.371 20.371 0 0 0 9.97 2.534h.001c11.255 0 20.417-9.162 20.417-20.417 0-5.456-2.124-10.585-5.98-14.443A20.297 20.297 0 0 0 24.5 4.083zm0 37.396a16.97 16.97 0 0 1-8.652-2.367l-.62-.368-6.18 1.604 1.65-6.022-.404-.642A16.945 16.945 0 0 1 7.55 24.5c0-9.345 7.605-16.95 16.95-16.95 4.527 0 8.78 1.764 11.978 4.967a16.84 16.84 0 0 1 4.972 11.984c0 9.346-7.604 16.951-16.95 16.978zm9.296-12.701c-.51-.255-3.013-1.487-3.479-1.658-.466-.17-.806-.255-1.146.255-.34.51-1.317 1.658-1.614 1.998-.297.34-.594.382-1.103.127-.51-.255-2.151-.793-4.099-2.531-1.515-1.353-2.538-3.025-2.834-3.535-.297-.51-.032-.785.224-1.04.23-.229.51-.595.764-.892.255-.297.34-.51.51-.85.17-.34.085-.637-.043-.892-.127-.255-1.146-2.762-1.572-3.78-.413-.991-.834-.857-1.146-.873-.297-.014-.637-.017-.977-.017a1.876 1.876 0 0 0-1.36.638c-.467.51-1.785 1.745-1.785 4.252 0 2.508 1.827 4.93 2.082 5.27.255.34 3.595 5.49 8.711 7.7 1.218.526 2.169.84 2.91 1.075 1.222.388 2.334.333 3.213.202.98-.146 3.013-1.232 3.439-2.422.425-1.19.425-2.21.297-2.422-.127-.213-.467-.34-.977-.595z" />
          </svg>
        )}
      </span>
      <div className="flex flex-col min-w-0">
        <span
          className="font-[family-name:var(--font-bricolage)]"
          style={{
            fontWeight: 400,
            color: '#173B39',
            fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
            lineHeight: 1.25,
          }}
        >
          {eyebrow}
        </span>
        <span
          className="truncate font-[family-name:var(--font-urbanist)]"
          style={{
            fontWeight: 500,
            color: '#000',
            fontSize: 'clamp(14px, calc(22 / 1920 * 100vw), 22px)',
            lineHeight: 1.3,
            marginTop: 2,
          }}
        >
          {value}
        </span>
      </div>
    </a>
  )
}
