import Link from 'next/link'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'

export const metadata = {
  title: 'Page Not Found — NewME',
}

/**
 * Global 404. App Router fires this when no route matches. Composes the
 * same dark-green `.newme-page` shell + atmospheric ellipses as the home
 * so the 404 sits inside the brand world instead of falling back to a
 * stock Next page.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Atmospheric ellipses — same family as the home so the 404 doesn't
            land on a flat slab of green. */}
        <div className="newme-bg" aria-hidden>
          <span className="newme-ellipse newme-ellipse-28" />
          <span className="newme-noise newme-noise-28" />
          <span className="newme-ellipse newme-ellipse-38" />
          <span className="newme-noise newme-noise-38" />
          <span className="newme-ellipse newme-ellipse-34" />
          <span className="newme-ellipse newme-ellipse-39" />
          <span className="newme-ellipse newme-ellipse-40" />
        </div>

        <div className="newme-frame">
          <section
            style={{
              position: 'relative',
              zIndex: 1,
              padding:
                'clamp(80px, calc(140 / 1920 * 100vw), 160px) clamp(16px, calc(60 / 1920 * 100vw), 60px) clamp(80px, calc(140 / 1920 * 100vw), 160px)',
            }}
          >
            <div
              className="mx-auto relative overflow-hidden flex flex-col items-center justify-center text-center"
              style={{
                maxWidth: 1480,
                minHeight: 'clamp(360px, calc(560 / 1920 * 100vw), 600px)',
                borderRadius: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(14px) saturate(85%)',
                WebkitBackdropFilter: 'blur(14px) saturate(85%)',
                padding:
                  'clamp(40px, calc(80 / 1920 * 100vw), 96px) clamp(24px, calc(60 / 1920 * 100vw), 60px)',
              }}
            >
              <h1
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(96px, calc(220 / 1920 * 100vw), 220px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
                }}
              >
                404
              </h1>

              <p
                className="font-[family-name:var(--font-urbanist)] text-white"
                style={{
                  fontWeight: 400,
                  fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
                  lineHeight: 1.45,
                  opacity: 0.82,
                  marginBottom: 'clamp(28px, calc(44 / 1920 * 100vw), 44px)',
                  maxWidth: 560,
                }}
              >
                The requested page could not be found.
              </p>

              <Link
                href="/"
                className="font-[family-name:var(--font-bricolage)] inline-flex items-center justify-center hover:opacity-90 active:scale-95"
                style={{
                  background: '#ffffff',
                  color: '#013E37',
                  border: 'none',
                  borderRadius: 999,
                  height: 'clamp(48px, calc(60 / 1920 * 100vw), 60px)',
                  padding: '0 clamp(24px, calc(38 / 1920 * 100vw), 38px)',
                  fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s, transform 0.15s',
                }}
              >
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
