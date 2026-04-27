import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

type Props = {
  eyebrow: string
  title: string
  blurb?: string
}

export default function PageStub({ eyebrow, title, blurb }: Props) {
  return (
    <>
      <Header />
      <main className="newme-page">
        <span aria-hidden className="newme-blob-2" />
        <span aria-hidden className="newme-blob-3" />
        <section className="relative px-5 sm:px-6 md:px-10 lg:px-16 pt-[120px] md:pt-[160px] pb-[120px] md:pb-[180px] min-h-[80vh] flex items-center">
          <div className="max-w-[1200px] mx-auto w-full text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/25 text-[12px] md:text-[13px] text-white/85 tracking-[0.06em] uppercase font-[family-name:var(--font-urbanist)]">
              {eyebrow}
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-bricolage)] font-semibold text-white text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.04] tracking-[-0.015em]">
              {title}
            </h1>
            {blurb && (
              <p className="mt-6 max-w-[640px] mx-auto text-white/70 text-[15px] md:text-[16px] leading-[1.6] font-[family-name:var(--font-poppins)]">
                {blurb}
              </p>
            )}
            <p className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF272]/10 border border-[#FEF272]/30 text-[#FEF272] text-[12px] tracking-[0.08em] uppercase font-[family-name:var(--font-urbanist)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FEF272] animate-pulse" />
              Page in development
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
