// Media article data — in-code fallback store.
// The /media/[slug] route prefers Sanity; if no document exists for a slug,
// it falls back to this map. Authors create new articles via /studio.
//
// Future cleanup: once content lives in Sanity, this file shrinks to types
// + a small set of demo articles for local/dev work.

export type ArticleHabit = {
  num: string
  title: string
  body: string
}

export type ArticleCardData = {
  slug: string
  image: string
  title: string
  summary: string
  authorName: string
  avatar: string
  city: string
  date: string
}

export type Article = ArticleCardData & {
  subtitle: string
  heroImage: string
  intro: string[]
  sectionTitle: string
  sectionLead?: string
  habits: ArticleHabit[]
  disclaimer: string
}

const AVATAR = {
  lifestyle: '/media/avatars/lifestyle-desk.png',
  debapriya: '/media/avatars/debapriya.png',
}

const IMG = {
  weightLoss: '/media/Weight Loss.webp',
  media03: '/media/Media 03.webp',
  virtualClinic: '/media/Virtual CLinic.webp',
}

// Card-only metadata — same set used by MediaArticles listing.
// Order matches the listing so "related" pulls are stable.
export const articleCards: ArticleCardData[] = [
  {
    slug: 'gastroenterologist-key-mistake-weight-loss',
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
    slug: 'dr-pal-stress-management-habits',
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
    slug: 'gastroenterologist-warns-aging-gut',
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
    slug: 'gastroenterologist-sleep-not-optional',
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
    slug: 'gastroenterologist-7-daily-habits-block-weight-loss',
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
    slug: 'gastroenterologist-classic-breakfasts-harm-gut',
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

// Full article bodies. Only the featured Figma article is fully populated; the
// rest fall back to a generic "coming soon" body so any slug routes cleanly.
export const articles: Record<string, Article> = {
  'gastroenterologist-7-daily-habits-block-weight-loss': {
    ...articleCards[4],
    subtitle:
      'According to Dr Manickam, both eating less and snacking all day is detrimental to losing weight. Proper sleep, diet, hydration, and less stress are key.',
    heroImage: IMG.media03,
    intro: [
      'With 2026 less than two weeks away, it is time to start planning our New Year’s resolutions. And one of the more popular ones every year, since time immemorial, is losing weight and hitting fitness goals.',
      'However, as many of us have painstakingly discovered, it is easier said than done. While we often blame a lack of motivation and willpower, American board-certified gastroenterologist Dr Palaniappan Manickam disagrees. In an Instagram post on 18 December, he observed, “It’s the daily habits silently blocking your fat loss.” He went on to highlight the habits that stand in our way.',
    ],
    sectionTitle: 'Under-eating to lose weight',
    sectionLead:
      'While reaching calorie deficit is important for losing weight, not eating enough is the wrong path to follow. “Chronic calorie restriction slows metabolism, raises cortisol, and trains the body to store fat,” stated Dr Manickam.',
    habits: [
      {
        num: '01',
        title: 'Snacking all day',
        body: 'Snacking, or eating in between meals, is also detrimental to achieving weight-loss goals. Eating frequently keeps our insulin levels elevated, explained Dr Manickam. This blocks the burning of fat and metabolic flexibility.',
      },
      {
        num: '02',
        title: 'Skipping strength training',
        body: 'Strength training, also known as resistance training, is exercising muscles against an external force to help grow and build strength and endurance. “Muscle drives metabolism,” noted the gastroenterologist. Working on cardio alone to hasten weight loss leads to muscle loss and failure to lose fat in the long term.',
      },
      {
        num: '03',
        title: 'Ignoring sleep quality',
        body: 'Our body needs to rest well in order to function properly. Lack of quality sleep disrupts the hunger hormones, which increases craving and reduces the oxidation of fat, thereby obstructing weight loss.',
      },
      {
        num: '04',
        title: 'Low protein intake',
        body: 'Lack of protein in the diet “reduces satiety, accelerates muscle loss, and slows down metabolic rate,” warned Dr Manickam.',
      },
      {
        num: '05',
        title: 'Normalising chronic stress',
        body: 'Chronic stress is harmful to both mental and physical health. In terms of weight loss, it keeps cortisol levels persistently high, which triggers the storage of fat, especially around the abdomen.',
      },
      {
        num: '06',
        title: 'Poor hydration',
        body: 'Low water intake impairs fat metabolism, digestion, and appetite regulation,” shared Dr Manickam. This results in a false sensation of hunger, which is detrimental to weight loss.',
      },
    ],
    disclaimer:
      'Note to readers: This article is for informational purposes only and not a substitute for professional medical advice. Always seek the advice of your doctor with any questions about a medical condition.',
  },
}

export function getArticle(slug: string): Article | undefined {
  return articles[slug]
}

export function getRelatedCards(currentSlug: string, n: number = 3): ArticleCardData[] {
  return articleCards.filter((c) => c.slug !== currentSlug).slice(0, n)
}

// Sanity → Article mapper. Maps a `article` document fetched via
// articleBySlugQuery into the Article shape the UI components consume.
// Falls back to in-code defaults for fields the editor hasn't filled.
type SanityImageRef = { asset?: { _ref?: string }; alt?: string } | null | undefined
type SanityArticleDoc = {
  title?: string
  slug?: string
  summary?: string
  subtitle?: string
  city?: string
  publishedAt?: string
  heroImage?: SanityImageRef
  intro?: string[]
  sectionTitle?: string
  sectionLead?: string
  habits?: { num?: string; title?: string; body?: string }[]
  disclaimer?: string
  author?: {
    name?: string
    role?: string
    avatar?: SanityImageRef
  }
}

function formatDate(iso: string): string {
  // Match the in-code date format ("Dec 20, 2025 08:17")
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const month = d.toLocaleString('en-US', { month: 'short' })
  const day = d.getDate()
  const year = d.getFullYear()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${month} ${day}, ${year} ${hours}:${minutes}`
}

export function articleFromSanity(
  doc: SanityArticleDoc,
  imageUrl: (ref: SanityImageRef) => string | undefined,
): Article | undefined {
  if (!doc.slug || !doc.title) return undefined
  const heroImage = imageUrl(doc.heroImage) || IMG.media03
  const avatar = imageUrl(doc.author?.avatar) || AVATAR.debapriya
  return {
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary || doc.subtitle?.slice(0, 80) || '',
    image: heroImage,
    authorName: doc.author?.name || 'NewMe Editorial',
    avatar,
    city: doc.city || '',
    date: doc.publishedAt ? formatDate(doc.publishedAt) : '',
    subtitle: doc.subtitle || '',
    heroImage,
    intro: doc.intro?.filter((p): p is string => Boolean(p)) || [],
    sectionTitle: doc.sectionTitle || '',
    sectionLead: doc.sectionLead,
    habits:
      doc.habits
        ?.filter(
          (h): h is { num: string; title: string; body: string } =>
            Boolean(h.num && h.title && h.body),
        )
        .map((h) => ({ num: h.num, title: h.title, body: h.body })) || [],
    disclaimer: doc.disclaimer || '',
  }
}
