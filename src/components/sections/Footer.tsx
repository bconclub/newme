import Image from 'next/image'

const columns = [
  {
    title: 'Product',
    links: ['How It Works', 'Pathways', 'Pillars', 'Virtual Clinic'],
  },
  {
    title: 'Company',
    links: ['About Dr. Pal', 'Care Team', 'Careers', 'Press'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Research', 'FAQ', 'Contact'],
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="newme-footer relative px-5 sm:px-6 md:px-10 lg:px-16 pt-16 md:pt-20 pb-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div>
            <Image
              src="/newme-logo.png"
              alt="Dr. Pal's NewME"
              width={520}
              height={130}
              className="h-10 md:h-11 w-auto"
            />
            <p className="mt-4 md:mt-5 text-white/70 text-[14px] leading-[1.6] max-w-[360px] font-[family-name:var(--font-poppins)]">
              A doctor-led clinical system for metabolic and gut regulation
              from Dr. Palaniappan Manickam.
            </p>
            <a
              href="#assessment"
              className="mt-5 md:mt-6 inline-flex items-center rounded-full bg-[#FEF272] hover:bg-[#FFF8B8] text-[#043C39] px-5 py-2.5 text-[13px] font-semibold font-[family-name:var(--font-urbanist)] transition-colors"
            >
              Start My Assessment
            </a>
          </div>

          {/* Columns — always 3 columns so no orphan row on phones */}
          <div className="grid grid-cols-3 gap-5 sm:gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] uppercase font-[family-name:var(--font-urbanist)]">
                  {col.title}
                </h4>
                <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/70 hover:text-white text-[12.5px] sm:text-[13.5px] font-[family-name:var(--font-poppins)] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="text-white/55 text-[12px] md:text-[12.5px] font-[family-name:var(--font-poppins)]">
            © {new Date().getFullYear()} Dr. Pal&apos;s NewME. All rights
            reserved.
          </p>
          <div className="flex gap-4 md:gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/55 hover:text-white text-[12px] md:text-[12.5px] font-[family-name:var(--font-poppins)] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
