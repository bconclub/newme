'use client'

import Image from 'next/image'
import Link from 'next/link'

// Figma "Group 139" (1:2834) at y=9054, 1920×490. Figma Quick Links column
// labels (1:3944): Home / How it Works / Your Phase of Care / Results /
// Dr Pal & Team.
//
// `live: true` means the page exists and the link is clickable. Non-live
// items render grayed out with a no-op click and a small lighten-on-hover.
type FooterLink = { label: string; href: string; live?: boolean }

const quickLinks: FooterLink[] = [
  { label: 'Home', href: '/', live: true },
  { label: 'How it Works', href: '/how-it-works', live: true },
  { label: 'Your Phase of Care', href: '/pathways' },
  { label: 'Results', href: '#testimonials' },
  { label: 'Dr Pal & Team', href: '/care-team' },
]
const resources: FooterLink[] = [
  { label: 'Blog', href: '#' },
  { label: 'Podcast', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'NewME App', href: '#' },
]

// Order: Facebook, X, Instagram, LinkedIn, WhatsApp, YouTube
const socials = [
  {
    key: 'fb',
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    key: 'x',
    label: 'X (Twitter)',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    key: 'ig',
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    key: 'li',
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    key: 'wa',
    label: 'WhatsApp',
    path: 'M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.822 11.822 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.667 5.616l-.999 3.648 3.821-.963zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
  },
  {
    key: 'yt',
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="newme-footer relative"
      style={{
        // Figma: footer rect y=9054, h=490; previous rating card ends ~y=8934
        // → 120px artboard gap above. Inside the rect, logo top y=9117 (63px
        // from top), bottom row y=9495 (49px to bottom of frame).
        paddingTop: 'clamp(40px, calc(63 / 1920 * 100vw), 63px)',
        paddingBottom: 'clamp(32px, calc(49 / 1920 * 100vw), 49px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Main footer row — Figma columns:
            Brand at x=60 (col 1, span ~340)
            Quick Links at x=689 (col 2)
            Resources at x=1121 (col 3)
            Connect at x=1438 (col 4, w=422 to right edge x=1860). */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + socials */}
          <div className="col-span-2 md:col-span-4">
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={240}
              height={74}
              unoptimized
              className="h-10 md:h-[52px] w-auto"
            />
            <p className="mt-4 text-white/65 text-[13px] leading-[1.6] max-w-[280px] font-[family-name:var(--font-poppins)]">
              A doctor-led clinical system for metabolic and gut regulation.
            </p>

            {/* Figma 1:3954 — Bricolage Medium 500 24px #FDF185 */}
            <p
              className="font-[family-name:var(--font-bricolage)]"
              style={{ marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)', fontWeight: 500, fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)', lineHeight: '24px', color: '#FDF185' }}
            >
              Follow us on
            </p>
            {/* Figma social icons (58:1493–58:1498): 24×24 each, white fill,
                spaced 56px center-to-center → 32px gap between adjacent
                icons. Order: FB, X, IG, LI, WA, YT. */}
            <div className="mt-4 flex items-center gap-8">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href="#"
                  aria-label={s.label}
                  className="text-white hover:text-[#FEF272] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-5">
            {/* Figma 1:3951 — Bricolage Medium 500 24px #FDF185 lh=24px */}
            <h4
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontWeight: 500, fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)', lineHeight: '24px', color: '#FDF185' }}
            >
              Quick Links
            </h4>
            {/* Figma: Poppins Regular 400 20px lh=48px white */}
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  {l.live ? (
                    <Link
                      href={l.href}
                      className="text-white/65 hover:text-white font-[family-name:var(--font-poppins)] transition-colors"
                      style={{ fontWeight: 400, fontSize: 'clamp(13px, calc(20 / 1920 * 100vw), 20px)', lineHeight: '1.6' }}
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className="text-white/30 hover:text-white/50 font-[family-name:var(--font-poppins)] transition-colors cursor-not-allowed select-none"
                      style={{ fontWeight: 400, fontSize: 'clamp(13px, calc(20 / 1920 * 100vw), 20px)', lineHeight: '1.6' }}
                    >
                      {l.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            {/* Figma — Bricolage Medium 500 24px #FDF185 */}
            <h4
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontWeight: 500, fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)', lineHeight: '24px', color: '#FDF185' }}
            >
              Resources
            </h4>
            {/* Figma: Poppins Regular 400 20px white */}
            <ul className="mt-4 space-y-2">
              {resources.map((l) => (
                <li key={l.label}>
                  {/* All Resources items are unbuilt — render as disabled. */}
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="text-white/30 hover:text-white/50 font-[family-name:var(--font-poppins)] transition-colors cursor-not-allowed select-none"
                    style={{ fontWeight: 400, fontSize: 'clamp(13px, calc(20 / 1920 * 100vw), 20px)', lineHeight: '1.6' }}
                  >
                    {l.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-4">
            {/* Figma — Bricolage Medium 500 24px #FDF185 */}
            <h4
              className="font-[family-name:var(--font-bricolage)]"
              style={{ fontWeight: 500, fontSize: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)', lineHeight: '24px', color: '#FDF185' }}
            >
              Connect
            </h4>
            <p className="mt-4 text-white/65 text-[13px] leading-[1.55] font-[family-name:var(--font-poppins)] max-w-[280px]">
              Receive structured health insights from Dr Pal&apos;s clinical team. No spam. Just science.
            </p>
            {/*
              Figma 58:2604 — Subscribe pill: 417×64 outer container with
              bg #629675 rounded-60. Inside on the right sits Figma 58:2606
              — Subscribe button: 128×56 white pill inside the green pill.
              The input is the green pill itself (placeholder text inside),
              with the button overlapping the right side.
            */}
            <form
              className="mt-5 relative flex items-center"
              onSubmit={(e) => e.preventDefault()}
              style={{
                background: '#629675',
                borderRadius: 9999,
                height: 64,
                paddingLeft: 24,
                paddingRight: 4,
                maxWidth: 417,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/80 font-[family-name:var(--font-poppins)] focus:outline-none"
                style={{
                  fontSize: 14,
                  paddingRight: 8,
                }}
              />
              <button
                type="submit"
                className="shrink-0 bg-white text-[#173B39] font-medium font-[family-name:var(--font-bricolage)] hover:bg-white/95 transition-colors"
                style={{
                  height: 56,
                  paddingLeft: 24,
                  paddingRight: 24,
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom legal row — Figma 58:2612 uses a DASHED divider line, not
            a solid one. Tailwind's border-dashed gives the right visual. */}
        <div
          className="border-t border-dashed border-white/25 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{
            marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
            paddingTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          {/* Figma 1:3942 — Bricolage Regular 400 16px white */}
          <p
            className="text-white/70 font-[family-name:var(--font-bricolage)]"
            style={{ fontWeight: 400, fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)', lineHeight: '24px' }}
          >
            © 2026 Dr Pal&apos;s NewME. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-white/55 hover:text-white font-[family-name:var(--font-bricolage)] transition-colors"
              style={{ fontWeight: 400, fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)' }}
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/55 hover:text-white font-[family-name:var(--font-bricolage)] transition-colors"
              style={{ fontWeight: 400, fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)' }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function RatingBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center md:px-6">
      <div className="flex gap-1 text-[#FEF272]">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 md:w-[18px] md:h-[18px]" fill="currentColor">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
        ))}
      </div>
      <p className="mt-3 md:mt-4 font-[family-name:var(--font-bricolage)] text-white text-[44px] md:text-[56px] font-light leading-none">
        {value}
      </p>
      <p className="mt-2 md:mt-3 text-white/70 text-[13px] md:text-[14px] font-[family-name:var(--font-poppins)]">
        {label}
      </p>
    </div>
  )
}
