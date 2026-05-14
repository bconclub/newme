/**
 * One-time script: seed 25 mediaMention + 4 mediaOutlet docs into Sanity.
 * Run: node scripts/seed-media-mentions.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sljf1wfa',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: 'skfdz8UNXRoThOspoVGP4uSXHAn6o0lmkscAgYyXXIiah7NNk8O7evh99Gd6gj8krROAbFwRYOVTvJJfK5uzs9Td0joYW31oO5DYHUn9oXB5AuK8nWoSabqPBMxauJJwEaEOUjg9lg8JmZvJJUxBmOoCb9tFyosND4wYJVb4tgP0Jf4wHWXe',
  useCdn: false,
})

// ─── Article data ────────────────────────────────────────────────────────────
const ARTICLES = [
  { num: 1,  title: "Make sure you don't repeat it': Gastroenterologist reveals key mistake made during weight loss journey", url: 'https://indianexpress.com/article/lifestyle/health/gastroenterologist-mistake-weight-loss-fasting-10624975/lite/' },
  { num: 2,  title: "Stop blaming your boss: Dr. Pal's 5 stress management habits for working professionals to reclaim mental peace", url: 'https://timesofindia.indiatimes.com/relationships/stop-blaming-your-boss-dr-pals-5-stress-management-habits-for-working-professionals-to-reclaim-mental-peace/amp_etphotostory/129101824.cms' },
  { num: 3,  title: 'Gastroenterologist warns against common habit that ages the gut, and one simple solution for the problem', url: 'https://www.hindustantimes.com/lifestyle/health/gastroenterologist-warns-against-common-habit-that-ages-the-gut-and-one-simple-solution-for-the-problem-101766128034420-amp.html' },
  { num: 4,  title: "Gastroenterologist explains why sleep is not optional: 'It is an active phase for…'", url: 'https://www.hindustantimes.com/lifestyle/health/gastroenterologist-explains-why-sleep-is-not-optional-it-is-an-active-phase-for-metabolic-repair-101768127214561-amp.html' },
  { num: 5,  title: 'Gastroenterologist reveals 7 daily habits that block weight loss, explains how eating less is a bad strategy', url: 'https://www.hindustantimes.com/lifestyle/health/gastroenterologist-reveals-7-daily-habits-that-block-weight-loss-explains-how-eating-less-is-a-bad-strategy-101766241077720-amp.html' },
  { num: 6,  title: 'Gastroenterologist reveals 5 classic breakfasts that secretly harm the gut: Bread and butter, instant noodles, and more', url: 'https://www.hindustantimes.com/lifestyle/health/gastroenterologist-reveals-5-classic-breakfasts-that-secretly-harm-the-gut-bread-and-butter-instant-noodles-and-more-101773574432617-amp.html' },
  { num: 7,  title: 'Gastroenterologist shares 5 muscle and metabolic health changes that occur after 30 and how protect yourself from risk', url: 'https://www.hindustantimes.com/lifestyle/health/gastroenterologist-shares-5-muscle-and-metabolic-health-changes-that-occur-after-30-and-how-protect-yourself-from-risk-101773991336321-amp.html' },
  { num: 8,  title: 'US-based gut expert Dr Pal reveals surprising facts: Are soya chunks really as protein-rich as chicken?', url: 'https://m.economictimes.com/news/new-updates/us-based-gut-expert-dr-pal-reveals-surprising-facts-are-soya-chunks-really-as-protein-rich-as-chicken/amp_articleshow/129982851.cms' },
  { num: 9,  title: "Gastro doc Dr. Pal lists 5 best 'tune-ups' to change your gut health", url: 'https://m.economictimes.com/news/india/gastro-doctor-dr-pal-lists-5-best-tune-ups-to-change-your-gut-health/dr-palthe-doctor-with-a-funny-bone/slideshow/127906060.cms' },
  { num: 10, title: "Gastro doctor Dr Pal reacts to Ajith Kumar's '2-hour sleep' claim, warns about gut health risks", url: 'https://m.economictimes.com/magazines/panache/it-may-work-for-ajith-kumar-not-for-you-gastro-doctor-dr-pal-warns-after-reacting-to-tamil-superstars-sleep-pattern/amp_articleshow/126410976.cms' },
  { num: 11, title: 'No medicine. No strict diet. Gastro doctor Dr Pal shares 6 habits to fix gas and bloating for better gut health', url: 'https://m.economictimes.com/magazines/panache/no-medicine-no-strict-diet-gastro-doctor-dr-pal-shares-6-habits-to-fix-gas-and-bloating-for-better-gut-health/amp_articleshow/127854994.cms' },
  { num: 12, title: "US Doctor Warns Against Using DOLO-650, Says It Is Not A 'Candy': Liver, Kidney-Related Side Effects To Know", url: 'https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/us-doctor-warns-against-using-dolo-650-says-it-is-not-a-candy-liver-kidney-related-side-effects-to-know/amp_articleshow/120339814.cms' },
  { num: 13, title: "Don't eat fruit alone! Dr. Pal's 3 breakfast combos for blood sugar control", url: 'https://m.economictimes.com/news/india/dont-eat-fruit-alone-dr-pals-3-breakfast-combos-for-blood-sugar-control/egg-omelette-with-moong-sprouts/slideshow/124569663.cms' },
  { num: 14, title: 'What is the right time to have dinner? Gastroenterologist explains benefits of fixing schedule', url: 'https://www.hindustantimes.com/lifestyle/health/what-is-the-right-time-to-have-dinner-gastroenterologist-explains-benefits-of-fixing-schedule-101772517186183-amp.html' },
  { num: 15, title: 'Gastroenterologist shares 6 guidelines to safely approach intermittent fasting: Start slow, hydrate properly…', url: 'https://www.hindustantimes.com/lifestyle/health/gastroenterologist-shares-6-guidelines-to-safely-approach-intermittent-fasting-start-slow-hydrate-properly-101771515495277-amp.html' },
  { num: 16, title: '5 Delicious fasting dishes recommended by Dr. Pal for last day of Navratri', url: 'https://m.economictimes.com/news/india/5-delicious-fasting-dishes-recommended-by-dr-pal-for-last-day-of-navratri/navratri-fasting-made-simple/slideshow/124225222.cms' },
  { num: 17, title: 'Stop eating samosas, namkeen mixtures, and vada pav at 6 pm. Dr Pal suggests healthier snack swaps instead', url: 'https://m.economictimes.com/magazines/panache/stop-eating-samosas-namkeen-and-vada-pav-at-6-pm-dr-pal-suggests-healthier-snack-swaps/amp_articleshow/123722821.cms' },
  { num: 18, title: 'Gastro doctor Dr Pal flags 5 everyday habits quietly raising blood sugar levels', url: 'https://m.economictimes.com/news/india/gastro-doctor-dr-pal-lists-5-everyday-habits-that-are-quietly-raising-blood-sugar-levels/latenight-screens-blue-light-and-sleep-loss/slideshow/125272683.cms' },
  { num: 19, title: '"Don\'t expect a healthy gut when you don\'t eat fiber": Dr. Pal lists top fiber-rich foods your gut will love', url: 'https://m.economictimes.com/news/india/dont-expect-a-healthy-gut-when-you-dont-eat-fiber-dr-pal-lists-top-fiberrich-foods-your-gut-will-love/how-to-ramp-up-without-discomfort/slideshow/123671542.cms' },
  { num: 20, title: "Dr Pal praises Janhvi Kapoor's eating habits - The science behind her eating habits", url: 'https://m.economictimes.com/news/india/dr-pal-praises-janhvi-kapoors-eating-habits-the-science-behind-her-eating-habits/small-bites-big-benefitsnbsp/slideshow/125581715.cms' },
  { num: 21, title: 'Brown rice vs white rice: Gastro doctor Dr Pal breaks down their impact on energy levels, blood sugar and metabolic health', url: 'https://m.economictimes.com/magazines/panache/brown-rice-vs-white-rice-gastro-doctor-dr-pal-breaks-down-their-impact-on-energy-levels-blood-sugar-and-metabolic-health/amp_articleshow/125533602.cms' },
  { num: 22, title: 'Gastro specialist Dr Pal reveals three simple steps to shed belly fat at home without extreme diet or intense exercise', url: 'https://m.economictimes.com/news/new-updates/gastro-specialist-dr-pal-reveals-three-simple-steps-to-shed-belly-fat-at-home-without-extreme-diet-or-intense-exercise/amp_articleshow/125634912.cms' },
  { num: 23, title: 'Always waking up tired? Dr Pal shares 7 bedtime habits for better health', url: 'https://m.economictimes.com/magazines/panache/always-waking-up-tired-dr-pal-shares-7-bedtime-habits-for-better-health/amp_articleshow/125652938.cms' },
  { num: 24, title: "Secret behind 56-year-old Bobby Doel's lean physique decoded by Dr Pal: Here's what the 'Animal' actor eats in his diet", url: 'https://m.economictimes.com/news/new-updates/secret-behind-56-year-old-bobby-doels-lean-physique-decoded-by-dr-pal-heres-what-the-animal-actor-eats-in-his-diet/amp_articleshow/125888580.cms' },
  { num: 25, title: 'Dr. Pal shares 5 foods a gastroenterologist avoids for a healthier gut', url: 'https://m.economictimes.com/news/india/dr-pal-shares-5-foods-a-gastroenterologist-avoids-for-a-healthier-gut/dont-eat-list/slideshow/124332025.cms' },
]

// ─── Outlet definitions ───────────────────────────────────────────────────────
const OUTLETS = {
  ie: {
    name: 'Indian Express',
    slug: 'indian-express',
    website: 'https://indianexpress.com',
    logoUrl: 'https://indianexpress.com/wp-content/themes/indianexpress/images/IE-OGimage.jpg',
    match: (u) => u.includes('indianexpress.com'),
  },
  toi: {
    name: 'Times of India',
    slug: 'times-of-india',
    website: 'https://timesofindia.indiatimes.com',
    logoUrl: 'https://static.toiimg.com/photo/111986287.cms',
    match: (u) => u.includes('timesofindia.indiatimes.com'),
  },
  ht: {
    name: 'Hindustan Times',
    slug: 'hindustan-times',
    website: 'https://www.hindustantimes.com',
    logoUrl: 'https://www.hindustantimes.com/res/images/logo.png',
    match: (u) => u.includes('hindustantimes.com'),
  },
  et: {
    name: 'Economic Times',
    slug: 'economic-times',
    website: 'https://economictimes.indiatimes.com',
    logoUrl: 'https://economictimes.indiatimes.com/photo/89824128.cms',
    match: (u) => u.includes('economictimes.com'),
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function fetchWithTimeout(url, opts = {}, ms = 18000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    const r = await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      redirect: 'follow',
    })
    clearTimeout(t)
    return r
  } catch (e) {
    clearTimeout(t)
    throw e
  }
}

function extractMeta(html, ...props) {
  for (const prop of props) {
    const m =
      html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, 'i'))
    if (m?.[1]) return m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim()
  }
  return null
}

async function fetchOGData(url) {
  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })
    if (!res.ok) return null
    const html = await res.text()

    const image = extractMeta(html, 'og:image', 'twitter:image', 'twitter:image:src')
    const description = extractMeta(html, 'og:description', 'description', 'twitter:description')
    const rawDate = extractMeta(html, 'article:published_time', 'datePublished', 'article:modified_time')
      || html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1]
      || html.match(/publishedAt[^"]*"([0-9]{4}-[0-9]{2}-[0-9]{2})/)?.[1]

    const publishedAt = rawDate ? rawDate.slice(0, 10) : null

    return {
      image: image?.startsWith('http') ? image : null,
      description: description?.slice(0, 280) || null,
      publishedAt,
    }
  } catch (e) {
    console.warn(`    OG fetch error: ${e.message}`)
    return null
  }
}

async function uploadUrl(imageUrl, filename) {
  const res = await fetchWithTimeout(imageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Referer: 'https://www.google.com/',
    },
  }, 25000)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const ct = res.headers.get('content-type') || 'image/jpeg'
  return client.assets.upload('image', buf, { filename, contentType: ct })
}

// ─── Outlet setup ─────────────────────────────────────────────────────────────
async function ensureOutlet(key, def) {
  const existing = await client.fetch(
    `*[_type == "mediaOutlet" && slug.current == $slug][0]._id`,
    { slug: def.slug }
  )
  if (existing) {
    console.log(`  ✓ outlet exists: ${def.name} (${existing})`)
    return existing
  }

  console.log(`  ↑ uploading logo for ${def.name} ...`)
  const logoAsset = await uploadUrl(def.logoUrl, `logo-${def.slug}.png`)

  const doc = await client.create({
    _type: 'mediaOutlet',
    name: def.name,
    slug: { _type: 'slug', current: def.slug },
    logo: {
      _type: 'image',
      asset: { _type: 'reference', _ref: logoAsset._id },
      alt: def.name,
    },
    website: def.website,
  })
  console.log(`  ✓ created outlet: ${def.name} (${doc._id})`)
  return doc._id
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n══════════════════════════════════════════')
  console.log('  NewME — Media Mentions Seed Script')
  console.log('══════════════════════════════════════════\n')

  // 1. Ensure all outlets exist
  console.log('── Step 1: Media Outlets ──')
  const outletIds = {}
  for (const [key, def] of Object.entries(OUTLETS)) {
    outletIds[key] = await ensureOutlet(key, def)
  }

  // 2. Process each article
  console.log('\n── Step 2: Articles (25 total) ──')
  const results = { created: 0, skipped: 0, failed: [] }

  for (const article of ARTICLES) {
    console.log(`\n[${String(article.num).padStart(2, '0')}/25] ${article.title.slice(0, 70)}`)

    // Idempotency check
    const exists = await client.fetch(
      `*[_type == "mediaMention" && externalUrl == $url][0]._id`,
      { url: article.url }
    )
    if (exists) {
      console.log('  → already exists, skipping')
      results.skipped++
      continue
    }

    // Detect outlet
    const outletKey = Object.keys(OUTLETS).find(k => OUTLETS[k].match(article.url))
    if (!outletKey) {
      console.warn('  ✗ outlet not detected')
      results.failed.push({ num: article.num, reason: 'outlet not detected' })
      continue
    }
    const outletId = outletIds[outletKey]

    // Fetch OG metadata
    console.log('  → fetching OG metadata ...')
    const og = await fetchOGData(article.url)
    const publishedAt = og?.publishedAt || '2025-01-01'
    const excerpt = og?.description || null
    console.log(`     date: ${publishedAt}  image: ${og?.image ? 'found' : 'missing'}`)

    // Upload cover image
    let coverImage = null
    if (og?.image) {
      try {
        console.log('  → uploading cover image ...')
        const asset = await uploadUrl(og.image, `cover-${article.num}.jpg`)
        coverImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: article.title,
        }
        console.log(`     uploaded: ${asset._id}`)
      } catch (e) {
        console.warn(`     image upload failed: ${e.message}`)
      }
    }

    // Fallback: use outlet logo as cover if no image found
    if (!coverImage) {
      console.warn('  → no cover image; attempting outlet logo fallback ...')
      try {
        const logoAsset = await uploadUrl(OUTLETS[outletKey].logoUrl, `fallback-cover-${article.num}.png`)
        coverImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: logoAsset._id },
          alt: OUTLETS[outletKey].name,
        }
        console.log('     logo fallback used')
      } catch (e) {
        console.warn(`     fallback also failed: ${e.message}`)
        results.failed.push({ num: article.num, reason: 'no image' })
        continue
      }
    }

    // Create Sanity document
    try {
      const doc = await client.create({
        _type: 'mediaMention',
        title: article.title,
        outlet: { _type: 'reference', _ref: outletId },
        coverImage,
        externalUrl: article.url,
        publishedAt,
        ...(excerpt ? { excerpt } : {}),
      })
      console.log(`  ✓ created: ${doc._id}`)
      results.created++
    } catch (e) {
      console.error(`  ✗ Sanity create failed: ${e.message}`)
      results.failed.push({ num: article.num, reason: e.message })
    }
  }

  // Summary
  console.log('\n══════════════════════════════════════════')
  console.log(`  Done!`)
  console.log(`  Created : ${results.created}`)
  console.log(`  Skipped : ${results.skipped}`)
  console.log(`  Failed  : ${results.failed.length}`)
  if (results.failed.length) {
    console.log('\n  Failed articles:')
    results.failed.forEach(f => console.log(`    #${f.num}: ${f.reason}`))
  }
  console.log('══════════════════════════════════════════\n')
}

main().catch(err => { console.error(err); process.exit(1) })
