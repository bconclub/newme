'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import type { MediaMention } from '@/app/media/page'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Local fallback (used when Sanity is empty / unreachable so the page
//    still has something to show during dev). Each item shape mirrors
//    `MediaMention` so the same render path can handle either source. ──
type LocalMention = {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  externalUrl: string
  coverFallback: string
  outletName: string
  outletLogoFallback: string
}

const FALLBACK: LocalMention[] = [
  {
    _id: 'fallback-1',
    title:
      "'Make sure you don't repeat it': Gastroenterologist reveals key mistake made during weight-loss journey",
    excerpt: 'Learn how to optimise your metabolism and avoid fitness traps.',
    publishedAt: '2026-04-11',
    externalUrl: 'https://www.hindustantimes.com/lifestyle',
    coverFallback: '/media/Weight Loss.webp',
    outletName: 'Hindustan Times',
    outletLogoFallback: '/media/avatars/lifestyle-desk.png',
  },
  {
    _id: 'fallback-2',
    title:
      "Stop blaming your boss: Dr. Pal's 5 stress-management habits for working professionals",
    excerpt: "We've all been there: it's 3:00 PM and you've got 14 tabs open.",
    publishedAt: '2026-04-11',
    externalUrl: 'https://www.hindustantimes.com/lifestyle',
    coverFallback: '/media/Media 03.webp',
    outletName: 'Hindustan Times',
    outletLogoFallback: '/media/avatars/lifestyle-desk.png',
  },
  {
    _id: 'fallback-3',
    title:
      'Gastroenterologist warns against common habit that ages the gut, and one simple solution',
    excerpt: 'Sitting right after eating causes sugar spikes, sluggish digestion.',
    publishedAt: '2025-12-19',
    externalUrl: 'https://www.hindustantimes.com/lifestyle',
    coverFallback: '/media/Virtual CLinic.webp',
    outletName: 'Hindustan Times',
    outletLogoFallback: '/media/avatars/debapriya.png',
  },
]

const PER_PAGE = 6

type Card = {
  key: string
  title: string
  excerpt?: string
  publishedAt: string
  externalUrl: string
  cover: string
  coverAlt: string
  outletName: string
  outletLogo?: string
  outletLogoAlt: string
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Map either a Sanity `MediaMention` or a `LocalMention` fallback into
 * a single `Card` shape that the JSX below renders.
 */
function toCard(m: MediaMention | LocalMention): Card {
  // LocalMention has a discriminator field
  if ('coverFallback' in m) {
    return {
      key: m._id,
      title: m.title,
      excerpt: m.excerpt,
      publishedAt: m.publishedAt,
      externalUrl: m.externalUrl,
      cover: m.coverFallback,
      coverAlt: m.title,
      outletName: m.outletName,
      outletLogo: m.outletLogoFallback,
      outletLogoAlt: m.outletName,
    }
  }
  const cover = m.coverImage ? urlFor(m.coverImage).width(900).height(506).fit('crop').url() : ''
  const logo = m.outlet?.logo ? urlFor(m.outlet.logo).width(140).height(140).fit('max').url() : undefined
  return {
    key: m._id,
    title: m.title,
    excerpt: m.excerpt,
    publishedAt: m.publishedAt,
    externalUrl: m.externalUrl,
    cover,
    coverAlt: (m.coverImage as { alt?: string } | undefined)?.alt ?? m.title,
    outletName: m.outlet?.name ?? '',
    outletLogo: logo,
    outletLogoAlt: (m.outlet?.logo as { alt?: string } | undefined)?.alt ?? m.outlet?.name ?? '',
  }
}

/**
 * Media page — "NewMe In The Media" section.
 * Grid of cards; each card opens the publication's article URL in a new tab.
 * Data comes from Sanity (`mediaMention[]`); falls back to a small local
 * sample when Sanity is empty / unreachable.
 */
export default function MediaArticles({ mentions = [] }: { mentions?: MediaMention[] }) {
  const cards = useMemo<Card[]>(() => {
    const source: Array<MediaMention | LocalMention> = mentions.length > 0 ? mentions : FALLBACK
    return source.map(toCard)
  }, [mentions])

  const totalPages = Math.max(1, Math.ceil(cards.length / PER_PAGE))
  const [page, setPage] = useState(1)

  const visible = useMemo(
    () => cards.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [cards, page]
  )

  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(64px, calc(120 / 1920 * 100vw), 120px)',
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 1186 }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-[family-name:var(--font-bricolage)] text-white"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(32px, calc(72 / 1920 * 100vw), 72px)',
            lineHeight: 1,
            letterSpacing: 0,
          }}
        >
          NewMe In The Media
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white font-[family-name:var(--font-urbanist)] mx-auto"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
            letterSpacing: 0,
            maxWidth: 1020,
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          Our work has been featured across a range of publications. Each mention captures how we use structured care to approach long-term health and well-being.
        </motion.p>
      </div>

      {/* Card grid — each card is a single anchor that opens the
          publication's article URL in a new tab. */}
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{
          maxWidth: 1800,
          marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        }}
      >
        {visible.map((card, i) => (
          <motion.a
            key={card.key}
            href={card.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read "${card.title}" on ${card.outletName} (opens in a new tab)`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
            className="group relative bg-white overflow-hidden flex flex-col no-underline"
            style={{
              borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
              padding: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
              minHeight: 'clamp(420px, calc(637 / 1920 * 100vw), 637px)',
            }}
          >
            {/* Cover image */}
            <div
              aria-hidden
              className="relative overflow-hidden bg-cover bg-center w-full"
              style={{
                borderRadius: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                aspectRatio: '571 / 320',
                backgroundImage: card.cover ? `url('${card.cover}')` : undefined,
                backgroundColor: card.cover ? undefined : '#0a4a45',
              }}
            />

            {/* Hover fill — same image with a dark scrim */}
            <div
              aria-hidden
              className="absolute pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              style={{
                inset: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
                borderRadius: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                backgroundImage: card.cover ? `url('${card.cover}')` : undefined,
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

            {/* Text block */}
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
                  letterSpacing: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {card.title}
              </h3>

              {card.excerpt && (
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
                  {card.excerpt}
                </p>
              )}

              {/* Outlet block — logo + name + date, pinned to bottom */}
              <div
                className="flex items-center mt-auto"
                style={{
                  paddingTop: 'clamp(20px, calc(37 / 1920 * 100vw), 37px)',
                  gap: 'clamp(10px, calc(12 / 1920 * 100vw), 12px)',
                }}
              >
                {card.outletLogo && (
                  <div
                    className="rounded-full overflow-hidden bg-cover bg-center shrink-0 ring-0 ring-white/30 transition-[box-shadow] duration-500 ease-out group-hover:ring-2"
                    style={{
                      width: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                      height: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                      backgroundImage: `url('${card.outletLogo}')`,
                    }}
                    role="img"
                    aria-label={card.outletLogoAlt}
                  />
                )}
                <div className="flex flex-col min-w-0">
                  <span
                    className="font-[family-name:var(--font-bricolage)] text-black transition-colors duration-500 ease-out group-hover:text-white truncate"
                    style={{
                      fontWeight: 500,
                      fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                      lineHeight: 1,
                    }}
                  >
                    {card.outletName}
                  </span>
                  <span
                    className="font-[family-name:var(--font-bricolage)] text-[#333] transition-colors duration-500 ease-out group-hover:text-white/80"
                    style={{
                      fontWeight: 300,
                      fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                      lineHeight: 1,
                      marginTop: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
                    }}
                  >
                    {formatDate(card.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Pagination — only render when there's more than one page */}
      {totalPages > 1 && (
        <motion.nav
          aria-label="Pagination"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto flex items-center justify-center"
          style={{
            gap: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
            marginTop: 'clamp(32px, calc(56 / 1920 * 100vw), 56px)',
          }}
        >
          <PageBtn
            variant="ctrl"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft />
            <span>Back</span>
          </PageBtn>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
            <PageBtn
              key={n}
              variant="num"
              active={page === n}
              onClick={() => setPage(n)}
              aria-current={page === n ? 'page' : undefined}
            >
              {n}
            </PageBtn>
          ))}
          <PageBtn
            variant="ctrl"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight />
          </PageBtn>
        </motion.nav>
      )}
    </section>
  )
}

// ── Pagination atoms (unchanged) ────────────────────────────────────────

function PageBtn({
  variant,
  active = false,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'ctrl' | 'num'
  active?: boolean
}) {
  const base =
    'inline-flex items-center justify-center font-[family-name:var(--font-urbanist)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const sizing =
    variant === 'ctrl'
      ? { gap: 6, height: 48, padding: '10px 16px', fontSize: 18, fontWeight: 400 as const, minHeight: 44, boxSizing: 'border-box' as const }
      : { width: 48, minWidth: 48, height: 48, padding: '10px 14px', fontSize: 18, fontWeight: active ? 700 : 400 as const, boxSizing: 'border-box' as const, flex: '0 0 auto' }
  const colorStyles = active
    ? { background: '#013E37', color: '#FFFFFF', border: '0' }
    : { background: '#FFFFFF', color: '#313131', border: '1px solid #E9E9E9' }
  return (
    <button
      type="button"
      {...rest}
      className={base}
      style={{ ...sizing, ...colorStyles, borderRadius: 4, lineHeight: 'normal' }}
    >
      {children}
    </button>
  )
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
