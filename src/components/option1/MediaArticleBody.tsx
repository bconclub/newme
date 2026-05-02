'use client'

import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Article-detail body — Figma node 107:69 middle zone.
 *
 * Two intro paragraphs, a section heading, a section lead, a numbered habits
 * list (number on left, title + body on right) with hairline dividers
 * between items, then a tinted disclaimer card. White text on the dark page bg.
 */
export default function MediaArticleBody({ article }: { article: Article }) {
  return (
    <section
      className="relative"
      style={{
        paddingTop: 'clamp(48px, calc(96 / 1920 * 100vw), 96px)',
        paddingBottom: 'clamp(64px, calc(120 / 1920 * 100vw), 120px)',
        paddingLeft: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
        paddingRight: 'clamp(20px, calc(60 / 1920 * 100vw), 60px)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 'clamp(320px, calc(1194 / 1920 * 100vw), 1194px)',
        }}
      >
        {/* Intro paragraphs — Urbanist 400 22/34 */}
        {article.intro.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="font-[family-name:var(--font-urbanist)] text-white/85"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 'clamp(24px, calc(34 / 1920 * 100vw), 34px)',
              marginTop:
                i === 0 ? 0 : 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
            }}
          >
            {para}
          </motion.p>
        ))}

        {/* Section heading — render only if filled (CMS editors may skip it
            for short-form articles that have no numbered list section). */}
        {article.sectionTitle && (
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center font-[family-name:var(--font-bricolage)] text-white"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(22px, calc(36 / 1920 * 100vw), 36px)',
              lineHeight: 1.25,
              marginTop: 'clamp(40px, calc(72 / 1920 * 100vw), 72px)',
            }}
          >
            {article.sectionTitle}
          </motion.h3>
        )}

        {/* Section lead paragraph */}
        {article.sectionLead && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="font-[family-name:var(--font-urbanist)] text-white/85"
            style={{
              fontWeight: 400,
              fontSize: 'clamp(15px, calc(20 / 1920 * 100vw), 20px)',
              lineHeight: 'clamp(24px, calc(34 / 1920 * 100vw), 34px)',
              marginTop: 'clamp(20px, calc(36 / 1920 * 100vw), 36px)',
            }}
          >
            {article.sectionLead}
          </motion.p>
        )}

        {/* Numbered habits list — number column 132px, content flexes.
            Each item separated by hairline divider (Vector 240..244).
            Skip the entire <ol> if the editor hasn't added any items. */}
        {article.habits.length > 0 && (
        <ol
          className="list-none"
          style={{
            marginTop: 'clamp(28px, calc(48 / 1920 * 100vw), 48px)',
            paddingLeft: 0,
          }}
        >
          {article.habits.map((h, i) => (
            <motion.li
              key={h.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: EASE }}
              className="flex"
              style={{
                gap: 'clamp(16px, calc(32 / 1920 * 100vw), 32px)',
                paddingTop: i === 0 ? 0 : 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                paddingBottom: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                borderBottom:
                  i === article.habits.length - 1
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.16)',
              }}
            >
              {/* Number — Bricolage 500 28/34 light gold */}
              <span
                className="shrink-0 font-[family-name:var(--font-bricolage)]"
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                  lineHeight: 1.25,
                  color: '#FEF272',
                  width: 'clamp(40px, calc(80 / 1920 * 100vw), 80px)',
                }}
              >
                {h.num}
              </span>
              <div className="min-w-0 flex-1">
                {/* Habit title — Bricolage 600 28/36 white */}
                <h4
                  className="font-[family-name:var(--font-bricolage)] text-white"
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(18px, calc(28 / 1920 * 100vw), 28px)',
                    lineHeight: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                  }}
                >
                  {h.title}
                </h4>
                {/* Habit body — Urbanist 400 18/28 white/80 */}
                <p
                  className="font-[family-name:var(--font-urbanist)] text-white/80"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(14px, calc(18 / 1920 * 100vw), 18px)',
                    lineHeight: 'clamp(22px, calc(28 / 1920 * 100vw), 28px)',
                    marginTop: 'clamp(8px, calc(12 / 1920 * 100vw), 12px)',
                  }}
                >
                  {h.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
        )}

        {/* Disclaimer card — Figma 107:2457 / 107:2458. Soft moss-tinted
            rounded box with muted body text. Skip if empty. */}
        {article.disclaimer && (
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-[family-name:var(--font-urbanist)] text-white/85"
            style={{
              marginTop: 'clamp(40px, calc(56 / 1920 * 100vw), 56px)',
              padding: 'clamp(20px, calc(24 / 1920 * 100vw), 24px) clamp(20px, calc(32 / 1920 * 100vw), 32px)',
              background:
                'linear-gradient(180deg, rgba(98,150,117,0.18) 0%, rgba(98,150,117,0.08) 100%)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 'clamp(12px, calc(16 / 1920 * 100vw), 16px)',
              fontWeight: 400,
              fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
              lineHeight: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
            }}
          >
            {article.disclaimer}
          </motion.aside>
        )}
      </div>
    </section>
  )
}
