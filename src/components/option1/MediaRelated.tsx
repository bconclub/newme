'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ArticleCardData } from '@/lib/articles'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Related News — Figma 107:69 bottom zone.
 *
 * Heading + lead + "View All Related News" CTA on top row, then 3 article
 * cards using the same card recipe as MediaArticles (587×637, hover scrim).
 */
export default function MediaRelated({
  cards,
}: {
  cards: ArticleCardData[]
}) {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(56px, calc(96 / 1920 * 100vw), 96px)',
        paddingBottom: 'clamp(80px, calc(144 / 1920 * 100vw), 144px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1800 }}>
        {/* Header row — heading+lead on left, CTA on right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div style={{ maxWidth: 'clamp(320px, calc(917 / 1920 * 100vw), 917px)' }}>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontWeight: 600,
                fontSize: 'clamp(32px, calc(64 / 1920 * 100vw), 64px)',
                lineHeight: 1.1,
              }}
            >
              Related News
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-[family-name:var(--font-urbanist)] text-white/80"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(15px, calc(22 / 1920 * 100vw), 22px)',
                lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
                marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
              }}
            >
              This is a structured post-program accountability and relapse
              prevention system that provides continued lifestyle guidance and
              monitoring.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="shrink-0"
          >
            <Link
              href="/media"
              className="inline-flex items-center justify-center font-[family-name:var(--font-poppins)] transition-colors duration-200"
              style={{
                background: '#FEF272',
                color: '#013E37',
                fontWeight: 500,
                fontSize: 'clamp(14px, calc(16 / 1920 * 100vw), 16px)',
                lineHeight: 1,
                padding: '14px 24px',
                borderRadius: 999,
                height: 48,
              }}
            >
              View All Related News
            </Link>
          </motion.div>
        </div>

        {/* Cards — 3 columns desktop, 2 tablet, 1 mobile. Reuses the
            MediaArticles card pattern with default-image-on-top + hover-fill. */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            marginTop: 'clamp(40px, calc(56 / 1920 * 100vw), 56px)',
            gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
          }}
        >
          {cards.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="group relative bg-white overflow-hidden flex flex-col"
              style={{
                borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
                padding: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
                minHeight: 'clamp(420px, calc(637 / 1920 * 100vw), 637px)',
              }}
            >
              <Link
                href={`/media/${a.slug}`}
                aria-label={a.title}
                className="absolute inset-0 z-10"
              />
              <div
                aria-hidden
                className="relative overflow-hidden bg-cover bg-center w-full"
                style={{
                  borderRadius: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                  aspectRatio: '571 / 320',
                  backgroundImage: `url('${a.image}')`,
                }}
              />
              <div
                aria-hidden
                className="absolute pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  inset: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
                  borderRadius: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                  backgroundImage: `url('${a.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)',
                  }}
                />
              </div>
              <div
                className="relative flex flex-col flex-1"
                style={{
                  zIndex: 2,
                  paddingLeft: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                  paddingRight: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                  paddingTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                  paddingBottom: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)] text-[#013E37] transition-colors duration-500 ease-out group-hover:text-white"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                    lineHeight: 'clamp(22px, calc(32 / 1920 * 100vw), 32px)',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {a.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-urbanist)] text-[#444] transition-colors duration-500 ease-out group-hover:text-white/85"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                    lineHeight: 'clamp(18px, calc(24 / 1920 * 100vw), 24px)',
                    marginTop: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.summary}
                </p>
                <div
                  className="flex items-center mt-auto"
                  style={{
                    paddingTop: 'clamp(20px, calc(37 / 1920 * 100vw), 37px)',
                    gap: 'clamp(10px, calc(12 / 1920 * 100vw), 12px)',
                  }}
                >
                  <div
                    className="rounded-full overflow-hidden bg-cover bg-center shrink-0 ring-0 ring-white/30 transition-[box-shadow] duration-500 ease-out group-hover:ring-2"
                    style={{
                      width: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                      height: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                      backgroundImage: `url('${a.avatar}')`,
                    }}
                    aria-hidden
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-[family-name:var(--font-bricolage)] text-black transition-colors duration-500 ease-out group-hover:text-white truncate"
                      style={{
                        fontWeight: 400,
                        fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                        lineHeight: 1,
                      }}
                    >
                      {a.authorName}
                    </span>
                    <span
                      className="font-[family-name:var(--font-bricolage)] text-black transition-colors duration-500 ease-out group-hover:text-white/80"
                      style={{
                        fontWeight: 400,
                        fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                        lineHeight: 1,
                        marginTop: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
                      }}
                    >
                      {a.city}{' '}
                      <span
                        className="text-[#333] transition-colors duration-500 ease-out group-hover:text-white/80"
                        style={{ fontWeight: 300 }}
                      >
                        {a.date}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
