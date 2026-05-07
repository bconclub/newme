import type { Metadata } from 'next'
import Header from '@/components/option1/Header'
import Footer from '@/components/option1/Footer'
import BlogHero from '@/components/option1/BlogHero'
import BlogArticles from '@/components/option1/BlogArticles'
import { postsQuery } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: "Blog | Dr. Pal's NewME",
  description:
    'Long-form articles on metabolic health, gut regulation, and structured care from the NewME team.',
}

/** ISR — revalidate the listing every 60s so newly published posts surface
 *  without needing a fresh deploy. */
export const revalidate = 60

export type BlogPostCard = {
  _id: string
  title: string
  slug: string
  subtitle?: string
  excerpt?: string
  publishedAt: string
  city?: string
  coverImage?: { asset?: { _ref?: string }; alt?: string } & Record<string, unknown>
  tags?: string[]
  author?: {
    name?: string
    role?: string
    avatar?: { asset?: { _ref?: string } } & Record<string, unknown>
  }
}

async function loadPosts(): Promise<BlogPostCard[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const data = await client.fetch<BlogPostCard[]>(postsQuery)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await loadPosts()

  return (
    <>
      <Header />
      <main className="newme-page">
        {/* Page atmosphere — mirrors /media (same artboard pattern). */}
        <div
          aria-hidden
          className="newme-bg-media pointer-events-none"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 1920,
            height: 3218,
            transform: 'translateX(-50%) scale(min(1, calc(100vw / 1920px)))',
            transformOrigin: 'top center',
            zIndex: 0,
            clipPath: 'inset(0 -200vw 0 -200vw)',
          }}
        >
          <span
            className="absolute rounded-full"
            style={{
              width: 4480,
              height: 4480,
              top: 1807,
              left: -1306,
              background: 'linear-gradient(180deg, #629675 0%, #013E37 100%)',
              filter: 'blur(280px)',
              opacity: 0.32,
              maskImage: 'radial-gradient(closest-side, black 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(closest-side, black 0%, transparent 100%)',
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              width: 1100,
              height: 1100,
              top: 1785,
              left: 1500,
              background: '#FEF272',
              filter: 'blur(300px)',
              opacity: 0.40,
            }}
          />
        </div>

        <div className="newme-frame">
          <BlogHero />
          <BlogArticles posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  )
}
