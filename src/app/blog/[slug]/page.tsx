import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import BlogArticleBody, { extractTOCHeadings } from '@/components/option1/BlogArticleBody'
import BlogListen from '@/components/option1/BlogListen'
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

type SanityImg = { asset?: { _ref?: string }; alt?: string } & Record<string, unknown>

export type BlogPost = {
  _id: string
  title: string
  slug: string
  subtitle?: string
  excerpt?: string
  publishedAt: string
  city?: string
  coverImage?: SanityImg
  intro?: string[]
  sectionTitle?: string
  sectionLead?: string
  habits?: { num: string; title: string; body: string }[]
  body?: unknown[] // Portable Text
  disclaimer?: string
  tags?: string[]
  // SEO fields (now flat on the post document)
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: SanityImg
  noIndex?: boolean
  keywords?: string[]
  author?: {
    name?: string
    role?: string
    avatar?: SanityImg
    bio?: string
  }
}

async function loadPost(slug: string): Promise<BlogPost | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const { client } = await import('@/lib/sanity/client')
    const data = await client.fetch<BlogPost | null>(postBySlugQuery, { slug })
    return data ?? null
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const slugs = await client.fetch<string[]>(postSlugsQuery)
    return (slugs ?? []).filter(Boolean).map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return { title: 'Post not found' }

  const title = post.metaTitle ?? post.title
  const description = post.metaDescription ?? post.excerpt ?? post.subtitle ?? ''
  const ogTitle = post.ogTitle ?? title
  const ogDescription = post.ogDescription ?? description
  const ogImageRef = post.ogImage ?? post.coverImage
  const ogImageUrl = ogImageRef ? urlFor(ogImageRef).width(1200).height(630).fit('crop').url() : undefined

  return {
    title: title.includes('NewME') ? title : `${title} | Dr. Pal's NewME`,
    description,
    keywords: post.keywords && post.keywords.length > 0 ? post.keywords.join(', ') : undefined,
    alternates: {
      canonical: post.canonicalUrl || `/blog/${post.slug}`,
    },
    robots: post.noIndex ? { index: false, follow: false, googleBot: { index: false, follow: false } } : undefined,
    openGraph: {
      type: 'article',
      title: ogTitle,
      description: ogDescription,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: (post.ogImage as { alt?: string } | undefined)?.alt ?? (post.coverImage as { alt?: string } | undefined)?.alt ?? post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(1800).height(1012).fit('crop').url() : null
  const coverAlt = (post.coverImage as { alt?: string } | undefined)?.alt ?? post.title
  const authorAvatarUrl = post.author?.avatar
    ? urlFor(post.author.avatar).width(120).height(120).fit('crop').url()
    : null
  const tocEntries = post.body ? extractTOCHeadings(post.body as unknown[]) : []

  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Page atmosphere */}
        <div aria-hidden className="pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
          {/* Base green wash — bottom of page */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 130% 95% at 50% 130%, rgba(98,150,117,0.55) 0%, rgba(98,150,117,0.30) 30%, rgba(98,150,117,0.10) 60%, transparent 100%)' }} />
          {/* Green ellipse behind hero image area — centered ~60vh from top */}
          <div style={{ position: 'absolute', top: '18vh', left: '50%', transform: 'translateX(-50%)', width: 'min(900px, 90vw)', height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(98,150,117,0.28) 0%, rgba(1,62,55,0.12) 50%, transparent 75%)', filter: 'blur(60px)' }} />
          {/* Gold accent — top right */}
          <div style={{ position: 'absolute', top: '8vh', right: '-8vw', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(254,242,114,0.10) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          {/* Soft green — bottom left of content */}
          <div style={{ position: 'absolute', top: '70vh', left: '-6vw', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(98,150,117,0.18) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        </div>

        <article
          className="relative mx-auto"
          style={{
            maxWidth: 1100,
            paddingTop: 'clamp(120px, calc(160 / 1920 * 100vw), 160px)',
            paddingLeft: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            paddingRight: 'clamp(20px, calc(40 / 1920 * 100vw), 40px)',
            paddingBottom: 'clamp(72px, calc(120 / 1920 * 100vw), 120px)',
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 40 }}>
            <ol
              className="flex flex-wrap items-center font-[family-name:var(--font-urbanist)] text-white/55"
              style={{ listStyle: 'none', padding: 0, margin: 0, gap: '6px 4px', fontSize: 13 }}
            >
              <li>
                <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
              </li>
              <li aria-hidden style={{ opacity: 0.4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white/90 transition-colors">Blog</Link>
              </li>
              <li aria-hidden style={{ opacity: 0.4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </li>
              <li aria-current="page" className="text-white/85" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '40ch' }}>
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Header block */}
          <header>
            {post.tags && post.tags.length > 0 && (
              <div
                className="flex flex-wrap"
                style={{ gap: 8, marginBottom: 24 }}
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center font-[family-name:var(--font-urbanist)]"
                    style={{
                      fontSize: 11,
                      letterSpacing: '.09em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      padding: '7px 16px',
                      height: 32,
                      borderRadius: 50,
                      border: '1px solid rgba(255,255,255,0.30)',
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: 'rgba(255,255,255,0.80)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="font-[family-name:var(--font-bricolage)] text-white"
              style={{
                fontSize: 'clamp(32px, calc(64 / 1920 * 100vw), 64px)',
                lineHeight: 'clamp(38px, calc(72 / 1920 * 100vw), 72px)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              {post.title}
            </h1>

            {post.subtitle && (
              <p
                className="font-[family-name:var(--font-urbanist)] text-white/80"
                style={{
                  fontSize: 'clamp(18px, calc(24 / 1920 * 100vw), 24px)',
                  lineHeight: 1.5,
                  marginTop: 24,
                  fontWeight: 400,
                }}
              >
                {post.subtitle}
              </p>
            )}

            {/* Author + date row */}
            <div
              className="flex items-center"
              style={{ gap: 16, marginTop: 32 }}
            >
              {authorAvatarUrl && (
                <div
                  className="rounded-full overflow-hidden shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    backgroundImage: `url('${authorAvatarUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    border: '2px solid rgba(255,255,255,0.2)',
                  }}
                  aria-hidden
                />
              )}
              <div className="flex flex-col" style={{ gap: 4 }}>
                {post.author?.name && (
                  <span
                    className="font-[family-name:var(--font-bricolage)] text-white"
                    style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}
                  >
                    {post.author.name}
                  </span>
                )}
                <span
                  className="font-[family-name:var(--font-urbanist)] text-white/60"
                  style={{ fontSize: 13, lineHeight: 1.2, fontWeight: 400 }}
                >
                  {[post.author?.role, post.city, formatDate(post.publishedAt)].filter(Boolean).join(' · ')}
                </span>
              </div>
            </div>
          </header>

          {/* Cover image */}
          {coverUrl && (
            <div
              className="relative w-full overflow-hidden"
              style={{
                marginTop: 'clamp(40px, calc(64 / 1920 * 100vw), 64px)',
                borderRadius: 'clamp(20px, calc(32 / 1920 * 100vw), 32px)',
                aspectRatio: '16 / 9',
              }}
            >
              <Image
                src={coverUrl}
                alt={coverAlt}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                priority
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          )}

          <BlogArticleBody post={post} tocEntries={tocEntries} />
        </article>
      </main>
      <Footer />
    </>
  )
}
