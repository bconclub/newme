'use client'

import type { BlogPost } from '@/app/blog/[slug]/page'

type Span = { _type: 'span'; text: string; marks?: string[]; _key?: string }
type PtBlock = {
  _type: 'block'
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  listItem?: 'bullet' | 'number'
  level?: number
  children?: Span[]
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
  _key?: string
}

function renderSpans(spans: Span[] | undefined, markDefs: PtBlock['markDefs']) {
  if (!spans) return null
  return spans.map((span, i) => {
    let node: React.ReactNode = span.text
    const marks = span.marks ?? []
    for (const m of marks) {
      if (m === 'strong') node = <strong key={`s-${i}-${m}`} style={{ fontWeight: 700, color: 'rgba(255,255,255,0.97)' }}>{node}</strong>
      else if (m === 'em') node = <em key={`s-${i}-${m}`}>{node}</em>
      else if (m === 'code')
        node = (
          <code
            key={`s-${i}-${m}`}
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: '0.88em',
              padding: '2px 7px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {node}
          </code>
        )
      else {
        const def = markDefs?.find((d) => d._key === m)
        if (def?._type === 'link' && def.href) {
          const isExternal = /^https?:\/\//i.test(def.href)
          node = (
            <a
              key={`s-${i}-${m}`}
              href={def.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-[#FEF272] underline underline-offset-4 hover:text-white transition-colors"
            >
              {node}
            </a>
          )
        }
      }
    }
    return <span key={span._key ?? i}>{node}</span>
  })
}

/* Groups consecutive list blocks into <ul> / <ol> runs */
type Group =
  | { kind: 'block'; block: PtBlock; index: number }
  | { kind: 'ul'; items: PtBlock[] }
  | { kind: 'ol'; items: PtBlock[] }

function groupBlocks(blocks: PtBlock[]): Group[] {
  const groups: Group[] = []
  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]
    if (b.listItem === 'bullet') {
      const items: PtBlock[] = []
      while (i < blocks.length && blocks[i].listItem === 'bullet') {
        items.push(blocks[i++])
      }
      groups.push({ kind: 'ul', items })
    } else if (b.listItem === 'number') {
      const items: PtBlock[] = []
      while (i < blocks.length && blocks[i].listItem === 'number') {
        items.push(blocks[i++])
      }
      groups.push({ kind: 'ol', items })
    } else {
      groups.push({ kind: 'block', block: b, index: i })
      i++
    }
  }
  return groups
}

const BODY_SIZE = 'clamp(16px, calc(19 / 1920 * 100vw), 19px)'
const BODY_FONT = "font-[family-name:var(--font-urbanist)]"
const HEAD_FONT = "font-[family-name:var(--font-bricolage)]"

function PortableText({ value }: { value: unknown[] }) {
  if (!Array.isArray(value)) return null
  const blocks = value.filter((n): n is PtBlock => typeof n === 'object' && n !== null && (n as PtBlock)._type === 'block')
  const groups = groupBlocks(blocks)

  return (
    <>
      {groups.map((g, gi) => {
        if (g.kind === 'ul') {
          return (
            <ul
              key={`ul-${gi}`}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {g.items.map((item, ii) => (
                <li
                  key={item._key ?? `ul-${gi}-${ii}`}
                  className={`${BODY_FONT} text-white/85`}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    fontSize: BODY_SIZE,
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#FEF272',
                      marginTop: '0.55em',
                    }}
                  />
                  <span>{renderSpans(item.children, item.markDefs)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (g.kind === 'ol') {
          return (
            <ol
              key={`ol-${gi}`}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                counterReset: 'pt-ol',
              }}
            >
              {g.items.map((item, ii) => (
                <li
                  key={item._key ?? `ol-${gi}-${ii}`}
                  className={`${BODY_FONT} text-white/85`}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    fontSize: BODY_SIZE,
                    lineHeight: 1.65,
                  }}
                >
                  <span
                    aria-hidden
                    className={HEAD_FONT}
                    style={{
                      flexShrink: 0,
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'rgba(254,242,114,0.15)',
                      border: '1px solid rgba(254,242,114,0.4)',
                      color: '#FEF272',
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.2em',
                    }}
                  >
                    {ii + 1}
                  </span>
                  <span>{renderSpans(item.children, item.markDefs)}</span>
                </li>
              ))}
            </ol>
          )
        }

        /* Single block */
        const block = g.block
        const key = block._key ?? `b-${gi}`
        const children = renderSpans(block.children, block.markDefs)

        switch (block.style) {
          case 'h2':
            return (
              <h2
                key={key}
                className={`${HEAD_FONT} text-white`}
                style={{
                  fontSize: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  marginTop: 64,
                  marginBottom: 18,
                  paddingBottom: 14,
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {children}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={key}
                className={`${HEAD_FONT} text-white`}
                style={{
                  fontSize: 'clamp(18px, calc(26 / 1920 * 100vw), 26px)',
                  lineHeight: 1.3,
                  fontWeight: 600,
                  marginTop: 44,
                  marginBottom: 12,
                  paddingLeft: 14,
                  borderLeft: '3px solid #FEF272',
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                {children}
              </h3>
            )
          case 'h4':
            return (
              <h4
                key={key}
                className={`${HEAD_FONT}`}
                style={{
                  fontSize: 'clamp(16px, calc(20 / 1920 * 100vw), 20px)',
                  lineHeight: 1.3,
                  fontWeight: 600,
                  marginTop: 32,
                  marginBottom: 8,
                  color: '#FEF272',
                }}
              >
                {children}
              </h4>
            )
          case 'blockquote':
            return (
              <blockquote
                key={key}
                className={`${HEAD_FONT} text-white/85`}
                style={{
                  borderLeft: '3px solid #FEF272',
                  paddingLeft: 22,
                  paddingTop: 4,
                  paddingBottom: 4,
                  marginTop: 32,
                  marginBottom: 32,
                  fontStyle: 'italic',
                  fontSize: 'clamp(18px, calc(22 / 1920 * 100vw), 22px)',
                  lineHeight: 1.55,
                  background: 'rgba(254,242,114,0.04)',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                {children}
              </blockquote>
            )
          case 'normal':
          default:
            /* Empty paragraph = spacer */
            const isEmpty = !block.children?.some(s => s.text?.trim())
            if (isEmpty) return <div key={key} style={{ height: 8 }} />
            return (
              <p
                key={key}
                className={`${BODY_FONT} text-white/80`}
                style={{
                  fontSize: BODY_SIZE,
                  lineHeight: 1.75,
                  marginTop: 20,
                  fontWeight: 400,
                }}
              >
                {children}
              </p>
            )
        }
      })}
    </>
  )
}

/* ── Body component ─────────────────────────────────────────────────────── */

export default function BlogArticleBody({ post }: { post: BlogPost }) {
  const hasIntro = post.intro && post.intro.length > 0
  const hasSection = !!(post.sectionTitle || post.sectionLead || (post.habits && post.habits.length > 0))
  const hasBody = post.body && Array.isArray(post.body) && post.body.length > 0

  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: 800,
        marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
      }}
    >
      {/* Intro paragraphs */}
      {hasIntro && (
        <div>
          {post.intro!.map((para, i) => (
            <p
              key={`intro-${i}`}
              className={`${BODY_FONT} text-white/90`}
              style={{
                fontSize: 'clamp(17px, calc(20 / 1920 * 100vw), 20px)',
                lineHeight: 1.7,
                marginTop: i === 0 ? 0 : 20,
                fontWeight: 400,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Structured section (habits) */}
      {hasSection && (
        <section style={{ marginTop: hasIntro ? 56 : 0 }}>
          {post.sectionTitle && (
            <h2
              className={`${HEAD_FONT} text-white`}
              style={{
                fontSize: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)',
                lineHeight: 1.15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                marginBottom: 16,
              }}
            >
              {post.sectionTitle}
            </h2>
          )}
          {post.sectionLead && (
            <p
              className={`${BODY_FONT} text-white/85`}
              style={{
                fontSize: 'clamp(16px, calc(19 / 1920 * 100vw), 19px)',
                lineHeight: 1.7,
                marginTop: 12,
                fontWeight: 400,
              }}
            >
              {post.sectionLead}
            </p>
          )}

          {post.habits && post.habits.length > 0 && (
            <ol
              className="list-none"
              style={{ marginTop: 36, padding: 0, display: 'flex', flexDirection: 'column', gap: 28 }}
            >
              {post.habits.map((h, i) => (
                <li key={`habit-${i}`} className="flex gap-6 items-start">
                  <span
                    className={`${HEAD_FONT} shrink-0`}
                    aria-hidden
                    style={{
                      color: '#FEF272',
                      fontSize: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)',
                      lineHeight: 1,
                      fontWeight: 500,
                      minWidth: 56,
                    }}
                  >
                    {h.num}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`${HEAD_FONT} text-white`}
                      style={{
                        fontSize: 'clamp(18px, calc(24 / 1920 * 100vw), 24px)',
                        lineHeight: 1.3,
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {h.title}
                    </h3>
                    <p
                      className={`${BODY_FONT} text-white/80`}
                      style={{
                        fontSize: 'clamp(15px, calc(17 / 1920 * 100vw), 17px)',
                        lineHeight: 1.65,
                        fontWeight: 400,
                      }}
                    >
                      {h.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* Free-form Portable Text body */}
      {hasBody && (
        <div style={{ marginTop: hasSection || hasIntro ? 56 : 0 }}>
          <PortableText value={post.body as unknown[]} />
        </div>
      )}

      {/* Disclaimer */}
      {post.disclaimer && (
        <aside
          className={`${BODY_FONT} text-white/60`}
          style={{
            marginTop: 64,
            padding: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            fontSize: 13,
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          <span style={{ display: 'block', fontStyle: 'normal', fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, color: 'rgba(255,255,255,0.45)' }}>Disclaimer</span>
          {post.disclaimer}
        </aside>
      )}

      {/* Author bio footer */}
      {post.author?.bio && (
        <footer
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <p
            className={`${BODY_FONT} text-white/60`}
            style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600 }}
          >
            About the author
          </p>
          {post.author.name && (
            <p
              className={`${HEAD_FONT} text-white`}
              style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}
            >
              {post.author.name}
            </p>
          )}
          <p
            className={`${BODY_FONT} text-white/80`}
            style={{ fontSize: 16, lineHeight: 1.65, marginTop: 12, fontWeight: 400 }}
          >
            {post.author.bio}
          </p>
        </footer>
      )}
    </div>
  )
}
