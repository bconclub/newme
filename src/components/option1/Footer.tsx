'use client'

import Image from 'next/image'
import Link from 'next/link'

const quickLinks: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pathways', href: '/pathways' },
  { label: 'Virtual Clinic', href: '/virtual-clinic' },
  { label: 'Research Lab', href: '/research-lab' },
]
const resources: { label: string; href: string }[] = [
  { label: 'Blog', href: '#' },
  { label: 'Podcast', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'NewME App', href: '#' },
]

const socials = [
  {
    key: 'fb',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    key: 'x',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    key: 'ig',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    key: 'wa',
    path: 'M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.822 11.822 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.667 5.616l-.999 3.648 3.821-.963zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
  },
  {
    key: 'yt',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative px-5 sm:px-6 md:px-10 lg:px-16 pt-4 pb-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Ratings band */}
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden px-6 py-8 md:py-12"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,74,69,0.9) 0%, rgba(4,60,57,0.9) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 md:divide-x md:divide-white/15">
            <RatingBlock value="4.6" label="Patient Satisfaction on Trustpilot" />
            <RatingBlock value="4.7" label="Program Completion Rate" />
          </div>
        </div>

        {/* Main footer row */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + socials */}
          <div className="col-span-2 md:col-span-4">
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={520}
              height={130}
              className="h-9 md:h-10 w-auto"
            />
            <p className="mt-4 text-white/65 text-[13px] leading-[1.6] max-w-[280px] font-[family-name:var(--font-poppins)]">
              A doctor-led clinical system for metabolic and gut regulation.
            </p>

            <p className="mt-6 text-white/75 text-[13px] font-medium font-[family-name:var(--font-urbanist)]">
              Follow us on
            </p>
            <div className="mt-3 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href="#"
                  aria-label={s.key}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[13px] font-[family-name:var(--font-bricolage)] font-medium text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/65 hover:text-white text-[13px] font-[family-name:var(--font-poppins)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="text-[13px] font-[family-name:var(--font-bricolage)] font-medium text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {resources.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/65 hover:text-white text-[13px] font-[family-name:var(--font-poppins)] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="text-[13px] font-[family-name:var(--font-bricolage)] font-medium text-white">
              Connect
            </h4>
            <p className="mt-4 text-white/65 text-[13px] leading-[1.55] font-[family-name:var(--font-poppins)] max-w-[280px]">
              Receive structured health insights from Dr Pal&apos;s clinical team. No spam. Just science.
            </p>
            <form
              className="mt-5 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 font-[family-name:var(--font-poppins)] focus:outline-none focus:border-[#FEF272]/40"
              />
              <button
                type="submit"
                className="shrink-0 bg-white text-[#043C39] px-5 py-2.5 rounded-full text-[13px] font-medium font-[family-name:var(--font-urbanist)] hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom legal row */}
        <div className="mt-12 md:mt-16 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-white/55 text-[12px] font-[family-name:var(--font-poppins)]">
            © 2026 Dr Pal&apos;s NewME. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/55 hover:text-white text-[12px] font-[family-name:var(--font-poppins)] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/55 hover:text-white text-[12px] font-[family-name:var(--font-poppins)] transition-colors">
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
