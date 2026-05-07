import type { BlogPost } from '@/app/blog/[slug]/page'

/* ── Minimal Portable Text → JSX renderer ──────────────────────────────────
   Handles `block` types with mark-decorators (strong, em, code) and link
   marks. Skips other block types. Good enough for a v1 blog body — if we
   ever need lists, callouts, or custom blocks, replace this with the
   official @portabletext/react package (single dep). */

type Span = { _type: 'span'; text: string; marks?: string[]; _key?: string }
type Block = {
  _type: 'block'
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children?: Span[]
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
  _key?: string
}

function renderSpans(spans: Span[] | undefined, markDefs: Block['markDefs']) {
  if (!spans) return null
  return spans.map((span, i) => {
    let node: React.ReactNode = span.text
    const marks = span.marks ?? []
    for (const m of marks) {
      // Decorator marks
      if (m === 'strong') node = <strong key={`s-${i}-${m}`}>{node}</strong>
      else if (m === 'em') node = <em key={`s-${i}-${m}`}>{node}</em>
      else if (m === 'code')
        node = (
          <code
            key={`s-${i}-${m}`}
            style={{
              fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
              fontSize: '0.92em',
              padding: '2px 6px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            {node}
          </code>
        )
      else {
        // Annotation mark (e.g. link). Look up in markDefs.
        const def = markDefs?.find((d) => d._key === m)
        if (def?._type === 'link' && def.href) {
          const isExternal = /^https?:\/\//i.test(def.href)
          node = (
            <a
              key={`s-${i}-${m}`}
              href={def.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-[#FEF272] underline underline-offset-4 hover:text-white"
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

function PortableText({ value }: { value: unknown[] }) {
  if (!Array.isArray(value)) return null

  return (
    <>
      {value.map((node, i) => {
        if (typeof node !== 'object' || node == null) return null
        const block = node as Block
        if (block._type !== 'block') return null
        const key = block._key ?? `b-${i}`
        const children = renderSpans(block.children, block.markDefs)

        switch (block.style) {
          case 'h2':
            return (
              <h2
                key={key}
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontSize: 'clamp(24px, calc(36 / 1920 * 100vw), 36px)',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  letterSpacing: '-0.005em',
                  marginTop: 56,
                  marginBottom: 16,
                }}
              >
                {children}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={key}
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontSize: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
                  lineHeight: 1.3,
                  fontWeight: 600,
                  marginTop: 40,
                  marginBottom: 12,
                }}
              >
                {children}
              </h3>
            )
          case 'h4':
            return (
              <h4
                key={key}
                className="font-[family-name:var(--font-bricolage)] text-white"
                style={{
                  fontSize: 20,
                  lineHeight: 1.3,
                  fontWeight: 600,
                  marginTop: 32,
                  marginBottom: 8,
                }}
              >
                {children}
              </h4>
            )
          case 'blockquote':
            return (
              <blockquote
                key={key}
                className="font-[family-name:var(--font-bricolage)] text-white/85"
                style={{
                  borderLeft: '3px solid #FEF272',
                  paddingLeft: 20,
                  marginTop: 32,
                  marginBottom: 32,
                  fontStyle: 'italic',
                  fontSize: 'clamp(18px, calc(22 / 1920 * 100vw), 22px)',
                  lineHeight: 1.55,
                }}
              >
                {children}
              </blockquote>
            )
          case 'normal':
          default:
            return (
              <p
                key={key}
                className="font-[family-name:var(--font-urbanist)] text-white/85"
                style={{
                  fontSize: 'clamp(16px, calc(19 / 1920 * 100vw), 19px)',
                  lineHeight: 1.7,
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
        maxWidth: 880,
        marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
      }}
    >
      {/* Intro paragraphs */}
      {hasIntro && (
        <div>
          {post.intro!.map((para, i) => (
            <p
              key={`intro-${i}`}
              className="font-[family-name:var(--font-urbanist)] text-white/90"
              style={{
                fontSize: 'clamp(17px, calc(20 / 1920 * 100vw), 20px)',
                lineHeight: 1.65,
                marginTop: i === 0 ? 0 : 18,
                fontWeight: 400,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Structured section */}
      {hasSection && (
        <section style={{ marginTop: hasIntro ? 56 : 0 }}>
          {post.sectionTitle && (
            <h2
              className="font-[family-name:var(--font-bricolage)] text-white"
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
              className="font-[family-name:var(--font-urbanist)] text-white/85"
              style={{
                fontSize: 'clamp(16px, calc(19 / 1920 * 100vw), 19px)',
                lineHeight: 1.65,
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
                    className="font-[family-name:var(--font-bricolage)] shrink-0"
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
                      className="font-[family-name:var(--font-bricolage)] text-white"
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
                      className="font-[family-name:var(--font-urbanist)] text-white/80"
                      style={{
                        fontSize: 'clamp(15px, calc(17 / 1920 * 100vw), 17px)',
                        lineHeight: 1.6,
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
          className="font-[family-name:var(--font-urbanist)] text-white/65"
          style={{
            marginTop: 64,
            padding: 'clamp(20px, calc(28 / 1920 * 100vw), 28px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            fontSize: 14,
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          {post.disclaimer}
        </aside>
      )}

      {/* Author bio footer (if present) */}
      {post.author?.bio && (
        <footer
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <p
            className="font-[family-name:var(--font-urbanist)] text-white/60"
            style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600 }}
          >
            About the author
          </p>
          {post.author.name && (
            <p
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}
            >
              {post.author.name}
            </p>
          )}
          <p
            className="font-[family-name:var(--font-urbanist)] text-white/80"
            style={{ fontSize: 16, lineHeight: 1.6, marginTop: 12, fontWeight: 400 }}
          >
            {post.author.bio}
          </p>
        </footer>
      )}
    </div>
  )
}
