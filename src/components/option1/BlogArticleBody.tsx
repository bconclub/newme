import Image from 'next/image'
import type { BlogPost } from '@/app/blogs/[slug]/page'
import { urlFor } from '@/lib/sanity/image'
import BlogTOC from './BlogTOC'

function hasAsset(img: unknown): img is { asset: { _ref: string }; [k: string]: unknown } {
  return typeof (img as { asset?: { _ref?: string } } | null)?.asset?._ref === 'string'
}

type Span = { _type: 'span'; text: string; marks?: string[]; _key?: string }
type PtBlock = {
  _type: 'block' | 'image'
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  listItem?: 'bullet' | 'number'
  level?: number
  children?: Span[]
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
  _key?: string
  // image fields
  asset?: { _ref?: string; _id?: string }
  alt?: string
  caption?: string
}

export function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export type TOCEntry = { id: string; text: string; level: 2 | 3 }

export function extractTOCHeadings(body: unknown[]): TOCEntry[] {
  if (!Array.isArray(body)) return []
  return body
    .filter((n): n is PtBlock => typeof n === 'object' && n !== null && (n as PtBlock)._type === 'block' && ((n as PtBlock).style === 'h2' || (n as PtBlock).style === 'h3'))
    .map((b) => {
      const text = (b.children ?? []).map((s) => s.text).join('')
      return { id: slugifyHeading(text), text, level: (b.style === 'h2' ? 2 : 3) as 2 | 3 }
    })
    .filter((e) => e.text.trim())
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

type Group =
  | { kind: 'block'; block: PtBlock }
  | { kind: 'image'; block: PtBlock }
  | { kind: 'ul'; items: PtBlock[] }
  | { kind: 'ol'; items: PtBlock[] }

function groupBlocks(blocks: PtBlock[]): Group[] {
  const groups: Group[] = []
  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]
    if (b._type === 'image') {
      groups.push({ kind: 'image', block: b })
      i++
    } else if (b.listItem === 'bullet') {
      const items: PtBlock[] = []
      while (i < blocks.length && blocks[i].listItem === 'bullet') items.push(blocks[i++])
      groups.push({ kind: 'ul', items })
    } else if (b.listItem === 'number') {
      const items: PtBlock[] = []
      while (i < blocks.length && blocks[i].listItem === 'number') items.push(blocks[i++])
      groups.push({ kind: 'ol', items })
    } else {
      groups.push({ kind: 'block', block: b })
      i++
    }
  }
  return groups
}

const BODY_SIZE = 'clamp(16px, calc(19 / 1920 * 100vw), 19px)'
const BODY_FONT = 'font-[family-name:var(--font-urbanist)]'
const HEAD_FONT = 'font-[family-name:var(--font-bricolage)]'

/* Pre-scan: number h3s only inside h2 sections whose title contains a
   digit (e.g. "6 Common Reasons", "5 Steps"). Other h3s keep the gold
   left-border treatment to show hierarchy without implying a count. */
function buildH3NumberMap(blocks: PtBlock[]): Map<string, number> {
  const map = new Map<string, number>()
  let currentH2HasNumber = false
  let sectionH3s: { key: string }[] = []

  const flush = () => {
    if (currentH2HasNumber) {
      sectionH3s.forEach(({ key }, i) => map.set(key, i + 1))
    }
    sectionH3s = []
  }

  for (const b of blocks) {
    if (b._type !== 'block') continue
    if (b.style === 'h2') {
      flush()
      const text = (b.children ?? []).map(s => s.text).join('')
      currentH2HasNumber = /\d/.test(text)
    } else if (b.style === 'h3' && b._key) {
      sectionH3s.push({ key: b._key })
    }
  }
  flush()
  return map
}

function PortableText({ value }: { value: unknown[] }) {
  if (!Array.isArray(value)) return null
  const blocks = value.filter((n): n is PtBlock => typeof n === 'object' && n !== null)
  const h3Numbers = buildH3NumberMap(blocks)
  const groups = groupBlocks(blocks)

  return (
    <>
      {groups.map((g, gi) => {
        /* ── Inline image ── */
        if (g.kind === 'image') {
          if (!g.block.asset) return null
          const src = urlFor(g.block as object).width(1200).auto('format').url()
          return (
            <figure
              key={g.block._key ?? `img-${gi}`}
              style={{ margin: '40px 0', borderRadius: 16, overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <Image
                  src={src}
                  alt={g.block.alt ?? ''}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
              {g.block.caption && (
                <figcaption
                  className={`${BODY_FONT} text-white/50`}
                  style={{ fontSize: 13, marginTop: 10, textAlign: 'center', fontStyle: 'italic' }}
                >
                  {g.block.caption}
                </figcaption>
              )}
            </figure>
          )
        }

        /* ── Bullet list ── */
        if (g.kind === 'ul') {
          return (
            <ul key={`ul-${gi}`} style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {g.items.map((item, ii) => (
                <li
                  key={item._key ?? `ul-${gi}-${ii}`}
                  className={`${BODY_FONT} text-white/85`}
                  style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: BODY_SIZE, lineHeight: 1.65 }}
                >
                  <span aria-hidden style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: '#FEF272', marginTop: '0.55em' }} />
                  <span>{renderSpans(item.children, item.markDefs)}</span>
                </li>
              ))}
            </ul>
          )
        }

        /* ── Numbered list ── */
        if (g.kind === 'ol') {
          return (
            <ol key={`ol-${gi}`} style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {g.items.map((item, ii) => (
                <li
                  key={item._key ?? `ol-${gi}-${ii}`}
                  className={`${BODY_FONT} text-white/85`}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: BODY_SIZE, lineHeight: 1.65 }}
                >
                  <span
                    aria-hidden
                    className={HEAD_FONT}
                    style={{
                      flexShrink: 0, width: 26, height: 26, borderRadius: '50%',
                      background: 'rgba(254,242,114,0.15)', border: '1px solid rgba(254,242,114,0.4)',
                      color: '#FEF272', fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.2em',
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

        /* ── Single block ── */
        const block = g.block
        const key = block._key ?? `b-${gi}`
        const children = renderSpans(block.children, block.markDefs)

        switch (block.style) {
          case 'h2': {
            const headingText = (block.children ?? []).map(s => s.text).join('')
            const id = slugifyHeading(headingText)
            return (
              <h2
                key={key}
                id={id}
                className={`${HEAD_FONT} text-white`}
                style={{
                  fontSize: 'clamp(22px, calc(34 / 1920 * 100vw), 34px)',
                  lineHeight: 1.2, fontWeight: 600, letterSpacing: '-0.01em',
                  marginTop: 64, marginBottom: 18,
                  paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.12)',
                  scrollMarginTop: 100,
                }}
              >
                {children}
              </h2>
            )
          }
          case 'h3': {
            const headingText = (block.children ?? []).map(s => s.text).join('')
            const id = slugifyHeading(headingText)
            const num = block._key ? h3Numbers.get(block._key) : undefined
            return (
              <h3
                key={key}
                id={id}
                className={`${HEAD_FONT} text-white`}
                style={{
                  fontSize: 'clamp(18px, calc(26 / 1920 * 100vw), 26px)',
                  lineHeight: 1.3, fontWeight: 600,
                  marginTop: 44, marginBottom: 12,
                  display: 'flex', alignItems: 'baseline', gap: 14,
                  scrollMarginTop: 100,
                }}
              >
                {num !== undefined && (
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      fontSize: 'clamp(13px, calc(16 / 1920 * 100vw), 16px)',
                      fontWeight: 700,
                      color: '#FEF272',
                      background: 'rgba(254,242,114,0.12)',
                      border: '1px solid rgba(254,242,114,0.35)',
                      borderRadius: 6,
                      padding: '2px 8px',
                      lineHeight: 1.6,
                    }}
                  >
                    {num}
                  </span>
                )}
                <span style={num === undefined ? { paddingLeft: 14, borderLeft: '3px solid #FEF272' } : undefined}>
                  {children}
                </span>
              </h3>
            )
          }
          case 'h4':
            return (
              <h4
                key={key}
                className={HEAD_FONT}
                style={{
                  fontSize: 'clamp(16px, calc(20 / 1920 * 100vw), 20px)',
                  lineHeight: 1.3, fontWeight: 600,
                  marginTop: 32, marginBottom: 8,
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
                  borderLeft: '3px solid #FEF272', paddingLeft: 22, paddingTop: 4, paddingBottom: 4,
                  marginTop: 32, marginBottom: 32, fontStyle: 'italic',
                  fontSize: 'clamp(18px, calc(22 / 1920 * 100vw), 22px)', lineHeight: 1.55,
                  background: 'rgba(254,242,114,0.04)', borderRadius: '0 8px 8px 0',
                }}
              >
                {children}
              </blockquote>
            )
          case 'normal':
          default: {
            const isEmpty = !block.children?.some(s => s.text?.trim())
            if (isEmpty) return <div key={key} style={{ height: 8 }} />
            return (
              <p
                key={key}
                className={`${BODY_FONT} text-white/80`}
                style={{ fontSize: BODY_SIZE, lineHeight: 1.75, marginTop: 20, fontWeight: 400 }}
              >
                {children}
              </p>
            )
          }
        }
      })}
    </>
  )
}

/* ── Body component ─────────────────────────────────────────────────────── */

export default function BlogArticleBody({ post, tocEntries }: { post: BlogPost; tocEntries?: TOCEntry[] }) {
  const hasIntro = post.intro && post.intro.length > 0
  const hasSection = !!(post.sectionTitle || post.sectionLead || (post.habits && post.habits.length > 0))
  const hasBody = post.body && Array.isArray(post.body) && post.body.length > 0

  return (
    <div style={{ maxWidth: 800, marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)' }}>
      {tocEntries && tocEntries.length > 1 && <BlogTOC entries={tocEntries} />}
      {hasIntro && (
        <div>
          {post.intro!.map((para, i) => (
            <p
              key={`intro-${i}`}
              className={`${BODY_FONT} text-white/90`}
              style={{ fontSize: 'clamp(17px, calc(20 / 1920 * 100vw), 20px)', lineHeight: 1.7, marginTop: i === 0 ? 0 : 20, fontWeight: 400 }}
            >
              {para}
            </p>
          ))}
        </div>
      )}

      {hasSection && (
        <section style={{ marginTop: hasIntro ? 56 : 0 }}>
          {post.sectionTitle && (
            <h2
              className={`${HEAD_FONT} text-white`}
              style={{ fontSize: 'clamp(24px, calc(40 / 1920 * 100vw), 40px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 16 }}
            >
              {post.sectionTitle}
            </h2>
          )}
          {post.sectionLead && (
            <p
              className={`${BODY_FONT} text-white/85`}
              style={{ fontSize: 'clamp(16px, calc(19 / 1920 * 100vw), 19px)', lineHeight: 1.7, marginTop: 12, fontWeight: 400 }}
            >
              {post.sectionLead}
            </p>
          )}
          {post.habits && post.habits.length > 0 && (
            <ol className="list-none" style={{ marginTop: 36, padding: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
              {post.habits.map((h, i) => (
                <li key={`habit-${i}`} className="flex gap-6 items-start">
                  <span className={`${HEAD_FONT} shrink-0`} aria-hidden style={{ color: '#FEF272', fontSize: 'clamp(28px, calc(40 / 1920 * 100vw), 40px)', lineHeight: 1, fontWeight: 500, minWidth: 56 }}>{h.num}</span>
                  <div className="flex-1">
                    <h3 className={`${HEAD_FONT} text-white`} style={{ fontSize: 'clamp(18px, calc(24 / 1920 * 100vw), 24px)', lineHeight: 1.3, fontWeight: 600, marginBottom: 8 }}>{h.title}</h3>
                    <p className={`${BODY_FONT} text-white/80`} style={{ fontSize: 'clamp(15px, calc(17 / 1920 * 100vw), 17px)', lineHeight: 1.65, fontWeight: 400 }}>{h.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {hasBody && (
        <div style={{ marginTop: hasSection || hasIntro ? 56 : 0 }}>
          <PortableText value={post.body as unknown[]} />
        </div>
      )}

      {post.disclaimer && (
        <aside
          className={`${BODY_FONT} text-white/60`}
          style={{ marginTop: 64, padding: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, background: 'rgba(255,255,255,0.04)', fontSize: 13, lineHeight: 1.6, fontStyle: 'italic' }}
        >
          <span style={{ display: 'block', fontStyle: 'normal', fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, color: 'rgba(255,255,255,0.45)' }}>Disclaimer</span>
          {post.disclaimer}
        </aside>
      )}

      {post.author?.bio && (
        <footer style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <p className={`${BODY_FONT} text-white/60`} style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>About the author</p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {hasAsset(post.author.avatar) && (() => {
              const avatarUrl = urlFor(post.author!.avatar!).width(120).height(120).fit('crop').url()
              return (
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
                  backgroundImage: `url('${avatarUrl}')`,
                  backgroundSize: 'cover', backgroundPosition: 'top center',
                  border: '2px solid rgba(254,242,114,0.35)',
                }} />
              )
            })()}
            <div style={{ flex: 1 }}>
              {post.author.name && <p className={`${HEAD_FONT} text-white`} style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{post.author.name}</p>}
              {post.author.role && <p className={`${BODY_FONT}`} style={{ fontSize: 13, color: '#FEF272', fontWeight: 600, marginBottom: 10, letterSpacing: '.04em' }}>{post.author.role}</p>}
              <p className={`${BODY_FONT} text-white/80`} style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 400 }}>{post.author.bio}</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
