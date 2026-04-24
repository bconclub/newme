'use client'

import Image from 'next/image'

const linkCols = [
  {
    title: 'Quick Links',
    links: ['Home', 'About us', 'Programs', 'Testimonials'],
  },
  {
    title: 'Care',
    links: ['Blog', 'FAQ', 'Team', 'Contact'],
  },
  {
    title: 'What We Offer',
    links: [
      'Complete Care',
      'Longevity Labs',
      'BYO Labs Review',
    ],
  },
  {
    title: 'Resources',
    links: ['FAQs', 'Insurance', 'Blog', 'Supplement Store'],
  },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#173B39] text-white pt-16 md:pt-24 pb-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Top — brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/15">
          <div className="lg:col-span-5">
            <Image
              src="/newme-logo.png"
              alt="NewME"
              width={520}
              height={130}
              unoptimized
              className="h-10 w-auto"
            />
            <p className="mt-6 text-white/75 text-[14.5px] leading-[1.6] max-w-[420px] font-[family-name:var(--font-bricolage)] font-light">
              Discover result-driven health solutions with a science-backed,
              doctor-led program for metabolic and gut health.
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="font-[family-name:var(--font-bricolage)] font-medium text-[15px] text-white">
              Sign up for our newsletter
            </p>
            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-full px-4 py-3 text-[14px] focus:outline-none focus:border-[#FEF272] font-[family-name:var(--font-bricolage)] font-light"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#FEF272] hover:bg-[#FDF185] text-[#173B39] rounded-full px-5 py-3 text-[14px] font-[family-name:var(--font-poppins)] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="lg:col-span-3">
            <p className="font-[family-name:var(--font-bricolage)] font-medium text-[15px] text-white">
              Follow us on
            </p>
            <div className="mt-4 flex items-center gap-3">
              {['IG', 'YT', 'X', 'LI'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/80 text-[11px] font-[family-name:var(--font-urbanist)] hover:bg-white/10 transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle — link columns + contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10 py-12">
          {linkCols.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <p className="font-[family-name:var(--font-bricolage)] font-semibold text-[14px] text-white">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white text-[14px] font-[family-name:var(--font-bricolage)] font-light transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-2">
            <p className="font-[family-name:var(--font-bricolage)] font-semibold text-[14px] text-white">
              Contact
            </p>
            <div className="mt-4 space-y-2 text-white/70 text-[14px] font-[family-name:var(--font-bricolage)] font-light">
              <p>3225 McLeod Dr, Suite 100<br />Las Vegas, NV 89121</p>
              <p>+91 99441 27006</p>
              <p>
                <a href="mailto:info@drpalsnewme.com" className="hover:text-white">
                  info@drpalsnewme.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-white/55 text-[12.5px] font-[family-name:var(--font-bricolage)] font-light">
          <p>© {new Date().getFullYear()} Dr. Pal&rsquo;s NewME. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
