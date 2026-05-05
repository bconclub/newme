import type { Metadata } from 'next'
import Link from 'next/link'
import { articleCards } from '@/lib/articles'

export const metadata: Metadata = {
  title: "Admin — Pages | Dr. Pal's NewME",
  robots: { index: false, follow: false },
}

export const revalidate = 30

type Page = {
  name: string
  path: string
  source: 'Code' | 'Sanity' | 'Hybrid'
  group: string
  studioPath?: string
  note?: string
}

type SanityArticle = { slug: string; title: string; _id: string }

const STUDIO_BASE = '/studio/structure'

const STATIC_PAGES: Page[] = [
  { group: 'Marketing', name: 'Home', path: '/', source: 'Code' },
  { group: 'Marketing', name: 'How It Works', path: '/how-it-works', source: 'Code' },
  { group: 'Marketing', name: 'Pathways', path: '/pathways', source: 'Code' },
  { group: 'Marketing', name: 'Pathways · Metabolic', path: '/pathways/metabolic', source: 'Code' },
  { group: 'Marketing', name: 'Pathways · GI', path: '/pathways/gi', source: 'Code' },
  { group: 'Marketing', name: 'Pathways · Continuity', path: '/pathways/continuity', source: 'Code' },
  { group: 'Marketing', name: 'Virtual Clinic', path: '/virtual-clinic', source: 'Code' },
  { group: 'Marketing', name: 'Research Lab', path: '/research-lab', source: 'Code' },
  { group: 'Content', name: 'Media (listing)', path: '/media', source: 'Code', note: 'Cards still hardcoded — Sanity wiring pending' },
]

export default async function AdminPage() {
  // Only attempt a Sanity fetch when the project env vars are present.
  // We use a dynamic import so the Sanity client module is never evaluated
  // at build time on environments that don't have the vars configured —
  // a top-level import would throw inside env.ts before any try/catch runs.
  let cmsArticles: SanityArticle[] = []
  let sanityOk = false
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const [{ client }, { articlesQuery }] = await Promise.all([
        import('@/lib/sanity/client'),
        import('@/lib/sanity/queries'),
      ])
      cmsArticles = await client.fetch<SanityArticle[]>(articlesQuery)
      sanityOk = true
    } catch {
      // Sanity not reachable (CORS / token missing) — leave cmsArticles empty.
    }
  }

  // Merge CMS + in-code articles, dedup by slug. CMS wins on title/source.
  const cmsBySlug = new Map(cmsArticles.map((a) => [a.slug, a]))
  const articleRows = [
    ...cmsArticles.map((a) => ({
      name: a.title,
      slug: a.slug,
      source: 'Sanity' as const,
      studioPath: `${STUDIO_BASE}/article;${a._id}`,
    })),
    ...articleCards
      .filter((c) => !cmsBySlug.has(c.slug))
      .map((c) => ({
        name: c.title,
        slug: c.slug,
        source: 'Code' as const,
        studioPath: undefined,
      })),
  ]

  return (
    <main className="min-h-screen bg-[#F7F6F2] text-[#0E2827]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <p className="font-[family-name:var(--font-urbanist)] text-xs uppercase tracking-widest text-[#629675]">
              NewME Admin
            </p>
            <h1 className="font-[family-name:var(--font-bricolage)] text-3xl font-semibold md:text-4xl mt-2">
              Pages
            </h1>
            <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#444] mt-2 max-w-2xl">
              Quick directory of every page on the site. Use <strong>View</strong> to
              open the live page; <strong>Edit</strong> deep-links into Sanity Studio
              when the page is CMS-backed.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/studio"
              className="inline-flex h-10 items-center rounded-md bg-[#013E37] px-4 text-sm font-medium text-white transition hover:bg-[#0E2827]"
            >
              Open Studio
            </Link>
          </div>
        </header>

        {/* Sanity status pill */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E0DDD2] bg-white px-3 py-1.5 text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              sanityOk ? 'bg-[#4D8060]' : 'bg-[#FFA033]'
            }`}
          />
          <span className="font-[family-name:var(--font-urbanist)] text-[#444]">
            Sanity:{' '}
            {sanityOk
              ? `connected · ${cmsArticles.length} article${cmsArticles.length === 1 ? '' : 's'}`
              : 'not reachable (check CORS / login)'}
          </span>
        </div>

        {/* Marketing + Content sections */}
        <Section title="Marketing pages" pages={STATIC_PAGES.filter((p) => p.group === 'Marketing')} />
        <Section title="Content surfaces" pages={STATIC_PAGES.filter((p) => p.group === 'Content')} />

        {/* Media articles */}
        <section className="mt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="font-[family-name:var(--font-bricolage)] text-xl font-semibold">
              Media articles
            </h2>
            <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#666]">
              {articleRows.length} total
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-[#E0DDD2] bg-white">
            {articleRows.length === 0 && (
              <div className="px-4 py-6 text-sm text-[#666] font-[family-name:var(--font-urbanist)]">
                No articles yet.
              </div>
            )}
            {articleRows.map((a, i) => (
              <div
                key={a.slug}
                className={`flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between ${
                  i > 0 ? 'border-t border-[#EEECE3]' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate font-[family-name:var(--font-urbanist)] text-sm font-medium"
                    title={a.name}
                  >
                    {a.name}
                  </p>
                  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#666]">
                    /media/{a.slug} · <SourceTag source={a.source} />
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <ActionLink href={`/media/${a.slug}`}>View</ActionLink>
                  {a.studioPath ? (
                    <ActionLink href={a.studioPath} primary>
                      Edit
                    </ActionLink>
                  ) : (
                    <span className="inline-flex h-8 items-center rounded-md border border-[#E0DDD2] px-3 text-xs text-[#888] font-[family-name:var(--font-urbanist)]">
                      Code-only
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sanity quick-jump */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-bricolage)] text-xl font-semibold">
            Sanity content types
          </h2>
          <p className="mt-1 font-[family-name:var(--font-urbanist)] text-sm text-[#666]">
            Jump straight into a content type in Studio.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { name: 'Media Articles', type: 'article' },
              { name: 'Blog Posts', type: 'post' },
              { name: 'Authors', type: 'author' },
              { name: 'Testimonials', type: 'testimonial' },
              { name: 'Team', type: 'teamMember' },
              { name: 'FAQs', type: 'faq' },
              { name: 'Hero', type: 'hero' },
              { name: 'Landing Sections', type: 'landingSection' },
            ].map((t) => (
              <Link
                key={t.type}
                href={`${STUDIO_BASE}/${t.type}`}
                className="rounded-lg border border-[#E0DDD2] bg-white px-4 py-3 transition hover:border-[#013E37] hover:bg-[#FAF9F4]"
              >
                <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium">
                  {t.name}
                </p>
                <p className="mt-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#888]">
                  {t.type}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-[#E0DDD2] pt-6 font-[family-name:var(--font-urbanist)] text-xs text-[#888]">
          Internal admin · noindex · {new Date().toISOString().slice(0, 10)}
        </footer>
      </div>
    </main>
  )
}

function Section({ title, pages }: { title: string; pages: Page[] }) {
  if (pages.length === 0) return null
  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between">
        <h2 className="font-[family-name:var(--font-bricolage)] text-xl font-semibold">
          {title}
        </h2>
        <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#666]">
          {pages.length} pages
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-[#E0DDD2] bg-white">
        {pages.map((p, i) => (
          <div
            key={p.path}
            className={`flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between ${
              i > 0 ? 'border-t border-[#EEECE3]' : ''
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-urbanist)] text-sm font-medium">
                {p.name}
              </p>
              <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#666]">
                {p.path} · <SourceTag source={p.source} />
                {p.note && <span className="ml-2 italic text-[#888]">{p.note}</span>}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <ActionLink href={p.path}>View</ActionLink>
              {p.studioPath ? (
                <ActionLink href={p.studioPath} primary>
                  Edit
                </ActionLink>
              ) : (
                <span className="inline-flex h-8 items-center rounded-md border border-[#E0DDD2] px-3 text-xs text-[#888] font-[family-name:var(--font-urbanist)]">
                  Code-only
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SourceTag({ source }: { source: Page['source'] }) {
  const styles: Record<Page['source'], string> = {
    Code: 'bg-[#F0EEE5] text-[#666]',
    Sanity: 'bg-[#E3FFED] text-[#3F6D52]',
    Hybrid: 'bg-[#FFF4D9] text-[#7A5B16]',
  }
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${styles[source]}`}
    >
      {source}
    </span>
  )
}

function ActionLink({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? 'inline-flex h-8 items-center rounded-md bg-[#013E37] px-3 text-xs font-medium text-white transition hover:bg-[#0E2827]'
          : 'inline-flex h-8 items-center rounded-md border border-[#E0DDD2] bg-white px-3 text-xs font-medium text-[#0E2827] transition hover:border-[#013E37]'
      }
    >
      {children}
    </Link>
  )
}
