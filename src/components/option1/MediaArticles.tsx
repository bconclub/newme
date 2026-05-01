'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

type Article = {
  image: string
  title: string
  summary: string
  authorName: string
  avatar: string
  city: string
  date: string
}

// Article copy + image mapping derived from Figma 100:980. The 6 placeholder
// images come from /public/media — the user's drop-in source. Cycle the 3
// supplied images across the 6 cards until the real per-article art lands.
const IMG = {
  weightLoss: '/media/Weight Loss.webp',
  media03: '/media/Media 03.webp',
  virtualClinic: '/media/Virtual CLinic.webp',
}

const AVATAR = {
  lifestyle: '/media/avatars/lifestyle-desk.png',
  debapriya: '/media/avatars/debapriya.png',
}

const articles: Article[] = [
  {
    image: IMG.weightLoss,
    title:
      'Make sure you don’t repeat it’: Gastroenterologist reveals key mistake made during weight loss journey',
    summary: 'Learn how to optimise your metabolism and avoid fitness...',
    authorName: 'Lifestyle desk',
    avatar: AVATAR.lifestyle,
    city: 'Bangalore,',
    date: 'Apr 11, 2026 05:02 PM',
  },
  {
    image: IMG.media03,
    title:
      'Stop blaming your boss: Dr. Pal’s 5 stress management habits for working professionals to reclaim mental peace',
    summary: 'We’ve all been there: It’s 3:00 PM, you’ve got 14 tabs open...',
    authorName: 'Lifestyle desk',
    avatar: AVATAR.lifestyle,
    city: 'Bangalore,',
    date: 'Apr 11, 2026 05:02 PM',
  },
  {
    image: IMG.virtualClinic,
    title:
      'Gastroenterologist warns against common habit that ages the gut, and one simple solution for the problem',
    summary: 'Sitting right after eating causes sugar spikes, sluggish...',
    authorName: 'Debapriya Bhattacharya',
    avatar: AVATAR.debapriya,
    city: 'Bangalore,',
    date: 'Dec 19, 2025 01:11 pm',
  },
  {
    image: IMG.weightLoss,
    title:
      'Gastroenterologist explains why sleep is not optional: ‘It is an active phase for…’',
    summary: 'Gastroenterologist Dr Manickam explains the importance....',
    authorName: 'Debapriya Bhattacharya',
    avatar: AVATAR.debapriya,
    city: 'Bangalore,',
    date: 'Jan 11, 2026 04:24',
  },
  {
    image: IMG.media03,
    title:
      'Gastroenterologist reveals 7 daily habits that block weight loss, explains how eating less is a bad strategy',
    summary: 'According to Dr Manickam, both eating less and snacking...',
    authorName: 'Debapriya Bhattacharya',
    avatar: AVATAR.debapriya,
    city: 'Bangalore,',
    date: 'Dec 20, 2025 08:17',
  },
  {
    image: IMG.virtualClinic,
    title:
      'Gastroenterologist reveals 5 classic breakfasts that secretly harm the gut: Bread and butter, instant noodles, and more',
    summary: 'Sitting right after eating causes sugar spikes, sluggish...',
    authorName: 'Debapriya Bhattacharya',
    avatar: AVATAR.debapriya,
    city: 'Bangalore,',
    date: 'Mar 15, 2026 05:22 pm',
  },
]

/**
 * Media page — "NewMe In The Media" section + 3×2 article card grid + pagination.
 * Figma node 100:980. Card spec from 100:3323+. All artboard-relative clamp().
 */
export default function MediaArticles() {
  const [page, setPage] = useState(2) // Figma shows page 2 active

  return (
    <section
      className="relative"
      style={{
        // Figma: hero card bottom y=846, heading top y=966 → 120px gap
        paddingTop: 'clamp(64px, calc(120 / 1920 * 100vw), 120px)',
        // Bottom space before the footer band starts (y=2728)
        paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      {/* Intro — 100:3322 heading + 100:3321 body. Centered on artboard. */}
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
            // Figma 100:3321 — Urbanist Medium 28/34 white center, width 1020
            fontWeight: 500,
            fontSize: 'clamp(16px, calc(28 / 1920 * 100vw), 28px)',
            lineHeight: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
            letterSpacing: 0,
            maxWidth: 1020,
            marginTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
          }}
        >
          Our work has been featured across a range of publications. Each
          mention captures how we use structure care to approach long-term
          health and well-being.
        </motion.p>
      </div>

      {/* Card grid — 3×2, gap 20px, total width 1800 (60+587+20+587+20+587-... = 1800).
          Card 587×637, white rounded-[40px]. */}
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{
          maxWidth: 1800,
          // Figma: intro body bottom (y=1130) → first card top y=1210 = 80px
          marginTop: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
          gap: 'clamp(12px, calc(20 / 1920 * 100vw), 20px)',
        }}
      >
        {articles.map((a, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
            className="group relative bg-white overflow-hidden flex flex-col"
            style={{
              // Card 587×637, radius 40
              borderRadius: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
              padding: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
              minHeight: 'clamp(420px, calc(637 / 1920 * 100vw), 637px)',
            }}
          >
            {/* Image — 571×320 inside the 8px padded card */}
            <div
              className="relative overflow-hidden bg-cover bg-center w-full"
              style={{
                borderRadius: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                aspectRatio: '571 / 320',
                backgroundImage: `url('${a.image}')`,
              }}
            />

            {/* Hover overlay — same image but full-card, with dark bottom
                gradient + white text. Crossfades over the default layout
                so the card "opens up" gracefully on hover. */}
            <div
              aria-hidden
              className="absolute opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none overflow-hidden"
              style={{
                inset: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
                borderRadius: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                backgroundImage: `url('${a.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Bottom-anchored dark gradient for legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)',
                }}
              />
              {/* Hover text block — same content, white tone */}
              <div
                className="absolute left-0 right-0 bottom-0 flex flex-col"
                style={{
                  padding: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                  gap: 'clamp(10px, calc(14 / 1920 * 100vw), 14px)',
                }}
              >
                <h3
                  className="font-[family-name:var(--font-bricolage)] text-white"
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
                  {a.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-urbanist)] text-white/85"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                    lineHeight: 'clamp(17px, calc(22 / 1920 * 100vw), 22px)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.summary}
                </p>
                <div
                  className="flex items-center"
                  style={{
                    marginTop: 'clamp(4px, calc(8 / 1920 * 100vw), 8px)',
                    gap: 'clamp(10px, calc(12 / 1920 * 100vw), 12px)',
                  }}
                >
                  <div
                    className="rounded-full overflow-hidden bg-cover bg-center shrink-0 ring-2 ring-white/30"
                    style={{
                      width: 'clamp(36px, calc(44 / 1920 * 100vw), 44px)',
                      height: 'clamp(36px, calc(44 / 1920 * 100vw), 44px)',
                      backgroundImage: `url('${a.avatar}')`,
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-[family-name:var(--font-bricolage)] text-white truncate"
                      style={{
                        fontWeight: 500,
                        fontSize: 'clamp(13px, calc(18 / 1920 * 100vw), 18px)',
                        lineHeight: 1,
                      }}
                    >
                      {a.authorName}
                    </span>
                    <span
                      className="font-[family-name:var(--font-bricolage)] text-white/80"
                      style={{
                        fontWeight: 300,
                        fontSize: 'clamp(11px, calc(14 / 1920 * 100vw), 14px)',
                        lineHeight: 1,
                        marginTop: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
                      }}
                    >
                      {a.city + ' ' + a.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text block — 24px below image, 32px inset L/R inside card */}
            <div
              className="flex flex-col flex-1"
              style={{
                paddingLeft: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                paddingRight: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                paddingTop: 'clamp(16px, calc(24 / 1920 * 100vw), 24px)',
                paddingBottom: 'clamp(20px, calc(24 / 1920 * 100vw), 24px)',
              }}
            >
              {/* Title — Bricolage SemiBold 28/32 #013E37, 4-line clamp */}
              <h3
                className="font-[family-name:var(--font-bricolage)] text-[#013E37]"
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
                {a.title}
              </h3>

              {/* Summary — Urbanist Regular 20/24 #444 — single line truncate */}
              <p
                className="font-[family-name:var(--font-urbanist)] text-[#444]"
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

              {/* Author block — pushed to bottom; avatar 48 + 12 gap + name/date */}
              <div
                className="flex items-center mt-auto"
                style={{
                  paddingTop: 'clamp(20px, calc(37 / 1920 * 100vw), 37px)',
                  gap: 'clamp(10px, calc(12 / 1920 * 100vw), 12px)',
                }}
              >
                <div
                  className="rounded-full overflow-hidden bg-cover bg-center shrink-0"
                  style={{
                    width: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                    height: 'clamp(40px, calc(48 / 1920 * 100vw), 48px)',
                    backgroundImage: `url('${a.avatar}')`,
                  }}
                  aria-hidden
                />
                <div className="flex flex-col min-w-0">
                  {/* Name — Bricolage Regular 20/20 black */}
                  <span
                    className="font-[family-name:var(--font-bricolage)] text-black truncate"
                    style={{
                      fontWeight: 400,
                      fontSize: 'clamp(14px, calc(20 / 1920 * 100vw), 20px)',
                      lineHeight: 1,
                    }}
                  >
                    {a.authorName}
                  </span>
                  {/* Date — Bricolage Regular 16 black + Light 16 #333 */}
                  <span
                    className="font-[family-name:var(--font-bricolage)] text-black"
                    style={{
                      fontWeight: 400,
                      fontSize: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
                      lineHeight: 1,
                      marginTop: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
                    }}
                  >
                    {a.city + ' '}
                    <span style={{ fontWeight: 300, color: '#333' }}>
                      {a.date}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination — Figma 100:3381. Back · 1 · [2 active] · 3 · 4 · Next */}
      <motion.nav
        aria-label="Pagination"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-auto flex items-center justify-center"
        style={{
          gap: 'clamp(6px, calc(8 / 1920 * 100vw), 8px)',
          // Figma: grid bottom y=2504 → pagination y=2560 = 56px gap
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
        {[1, 2, 3, 4].map((n) => (
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
          onClick={() => setPage((p) => Math.min(4, p + 1))}
          disabled={page === 4}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight />
        </PageBtn>
      </motion.nav>
    </section>
  )
}

// Pagination atoms ----------------------------------------------------------

function PageBtn({
  variant,
  active = false,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'ctrl' | 'num'
  active?: boolean
}) {
  // Active state: solid pine (#013E37) bg + bold white text. Inactive: white
  // bg + #E9E9E9 1px border + #313131 text. From Figma 100:3383..3388.
  const base =
    'inline-flex items-center justify-center font-[family-name:var(--font-urbanist)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const sizing =
    variant === 'ctrl'
      ? { gap: 6, height: 48, padding: '10px 16px', fontSize: 18, fontWeight: 400 as const }
      : { width: 44, height: 48, padding: '10px 14px', fontSize: 18, fontWeight: active ? 700 : 400 as const }
  const colorStyles = active
    ? { background: '#013E37', color: '#FFFFFF', border: '0' }
    : { background: '#FFFFFF', color: '#313131', border: '1px solid #E9E9E9' }
  return (
    <button
      type="button"
      {...rest}
      className={base}
      style={{
        ...sizing,
        ...colorStyles,
        borderRadius: 4,
        lineHeight: 'normal',
      }}
    >
      {children}
    </button>
  )
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M9 2.5L4.5 7L9 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M5 2.5L9.5 7L5 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
