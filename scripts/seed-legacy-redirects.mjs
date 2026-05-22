#!/usr/bin/env node
/**
 * Seeds the 42 legacy WordPress migration redirects into Sanity.
 *
 * The old site at drpalsnewme.com (WordPress + Yoast SEO) had URLs that
 * won't exist on the new Next.js site. This script creates `redirect`
 * documents in Sanity so the Next.js middleware (src/middleware.ts)
 * issues 308 permanent redirects for each old URL on launch day. SEO
 * authority preserved; old inbound links keep working.
 *
 * Source data:
 *   Same 42-entry list as scripts/generate-url-map-pdf.mjs Tier 1–4.
 *   Tier 5 entries (10 URLs) are intentionally skipped — they were
 *   internal/draft/template URLs that should 404.
 *
 * Idempotency:
 *   Each document uses a deterministic ID `redirect-<slugified-source>`
 *   so re-running the script doesn't create duplicates. `createIfNotExists`
 *   means existing docs are NOT overwritten — if an editor has tweaked a
 *   destination in Studio, your manual change wins. To force a refresh,
 *   delete the doc in Studio first, then re-run.
 *
 * How to run:
 *   1. Generate a fresh Sanity write token at
 *      https://sanity.io/manage/personal/project/sljf1wfa/api/tokens
 *      (Editor or Deploy Studio role; needs write access to the redirect type)
 *   2. Install the SDK if not already:  npm install --no-save @sanity/client
 *   3. Run:
 *        SANITY_API_TOKEN=skXXXX... node scripts/seed-legacy-redirects.mjs
 *   4. Verify in Studio:
 *        /studio → Redirect → should see 42 entries with note "Migrated from
 *        WordPress site (drpalsnewme.com sitemap_index.xml)"
 *
 * Safety:
 *   - This script does NOT publish or activate anything beyond creating the
 *     `enabled: true` docs. The redirects start working immediately because
 *     the middleware queries for `enabled == true`.
 *   - To stage them, change `enabled: true` to `enabled: false` below
 *     before running, then toggle individual ones on in Studio when ready.
 */
import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sljf1wfa'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN
const API_VERSION = '2024-10-01'

if (!TOKEN) {
  console.error(
    'ERROR: SANITY_API_TOKEN env var is required.\n' +
    'Generate a fresh write token at:\n' +
    `  https://sanity.io/manage/personal/project/${PROJECT_ID}/api/tokens\n` +
    'Then run:\n' +
    '  SANITY_API_TOKEN=skXXXX... node scripts/seed-legacy-redirects.mjs',
  )
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
})

// ─────────────────────────────────────────────────────────────────────────────
// The 42 redirects. Each entry: [source, destination, note]
// Format matches the schema in sanity/schemas/redirect.ts.
// Keep this list in sync with scripts/generate-url-map-pdf.mjs (Tier 1–4).
// ─────────────────────────────────────────────────────────────────────────────
const REDIRECTS = [
  // ─── Tier 1 — Condition-specific program pages (high SEO priority) ───────
  ['/diabetes-care-program/', '/pathways/metabolic', 'WordPress: diabetes care program → metabolic pathway'],
  ['/fatty-liver-program/', '/pathways/metabolic', 'WordPress: fatty liver program → metabolic pathway'],
  ['/hypertension-and-heart-care-program/', '/pathways/metabolic', 'WordPress: heart/BP program → metabolic pathway'],
  ['/thyroid-care-program/', '/pathways/metabolic', 'WordPress: thyroid care program → metabolic pathway'],
  ['/hormonal-care-program/', '/pathways/metabolic', 'WordPress: hormonal care program → metabolic pathway'],
  ['/combat-cholestral/', '/pathways/metabolic', 'WordPress: cholesterol program (typo preserved) → metabolic pathway'],
  ['/healthy-gut-program/', '/pathways/gi', 'WordPress: gut health program → GI pathway'],
  ['/pcos-care-program/', '/pathways/metabolic', 'WordPress: PCOS program → metabolic pathway'],
  ['/fat-to-fit-program/', '/pathways/metabolic', 'WordPress: weight loss program → metabolic pathway'],

  // ─── Tier 2 — Direct equivalents (URL rename or trailing-slash strip) ────
  ['/faq/', '/faq', 'WordPress: FAQ — trailing slash strip'],
  ['/privacy-policy/', '/privacy-policy', 'WordPress: privacy policy — trailing slash strip'],
  ['/newme-team/', '/team', 'WordPress: team page renamed'],
  ['/terms-and-conditions/', '/terms', 'WordPress: terms page renamed'],

  // ─── Tier 3 — Loose match (sensible closest destination) ─────────────────
  ['/why-newme/', '/how-it-works', 'WordPress: about-page content → how-it-works'],
  ['/testimonials/', '/', 'WordPress: testimonials listing → home (testimonials section embedded)'],
  ['/transform-your-health-with-dr-pal/', '/assessment', 'WordPress: old campaign landing page → assessment funnel'],
  ['/schedule-a-call/', '/virtual-consult', 'WordPress: schedule call → virtual consult (post-rebrand)'],
  ['/podcast/', '/media', 'WordPress: podcast listing → media features'],
  ['/form-thanks-page/', '/contact/thank-you', 'WordPress: form thank-you page'],
  ['/sixty-days-health-reset-challenge/', '/assessment', 'WordPress: 60-day reset campaign → assessment'],
  ['/60-days-health-reset-challenge-india/', '/assessment', 'WordPress: 60-day reset India variant → assessment'],
  ['/60-days-health-reset-challenge-india-actual/', '/assessment', 'WordPress: 60-day reset India actual variant → assessment'],
  ['/terms-and-conditions-of-newme-fit-llc/', '/terms', 'WordPress: entity-specific T&C (NewME Fit LLC) → unified terms'],
  ['/terms-and-conditions-of-gutmansquad/', '/terms', 'WordPress: entity-specific T&C (GutmansSquad) → unified terms'],
  ['/shipping-policy/', '/terms', 'WordPress: shipping policy → terms (confirm if shipping policy is added separately)'],
  ['/feed-2/', '/blogs', 'WordPress: old RSS feed → blog index (RSS may be re-added later)'],
  ['/category/podcasts/', '/media', 'WordPress: podcast category archive → media features'],
  ['/author/infodrpalsnewme-com/', '/', 'WordPress: author archive — no equivalent on new site'],

  // ─── Tier 4 — Blog interview / podcast posts (topical or home) ───────────
  ['/your-habits-are-killing-your-gut-ft-sivasankaran-i-dr-pal/', '/pathways/gi', 'WordPress blog interview: gut topic → GI pathway'],
  ['/stress-eating-post-pregnancy-depression-and-weight-gain-lgbtq-i-ft-dr-sonal-top-psychiatrist/', '/pathways/metabolic', 'WordPress blog interview: weight/stress eating → metabolic pathway'],
  ['/heart-attacks-in-young-people-is-your-lifestyle-to-blame-top-cardiologist-dr-anup/', '/pathways/metabolic', 'WordPress blog interview: heart/lifestyle → metabolic pathway'],
  ['/the-diet-fix-you-need-celebrity-nutritionist-shiny-surendran-dr-pal/', '/pathways/metabolic', 'WordPress blog interview: diet → metabolic pathway'],
  ['/dont-ignore-these-health-red-flags-time-for-a-wake-up-call-dr-pal/', '/how-it-works', 'WordPress blog interview: generic health awareness → how-it-works'],
  ['/pcos-fertility-what-every-woman-needs-to-know/', '/pathways/metabolic', 'WordPress blog interview: PCOS → metabolic pathway'],
  ['/the-silent-killers-of-eye-health-shocking-facts-revealed-by-dr-ashvin-indias-top-eye-expert/', '/', 'WordPress blog interview: eye health — no topical match → home'],
  ['/shocking-truths-about-ear-health-dr-shree-rao-dr-raos-ent-hospitals-dr-pa/', '/', 'WordPress blog interview: ENT — no topical match → home'],
  ['/actress-anu-hasan-breaking-myths-on-life-mental-wellbeing-and-fitness-dr-pal/', '/', 'WordPress blog interview: celebrity → home'],
  ['/the-1-mistake-in-your-skincare-routine-that-no-one-talks-about-dr-renita-rajan-dr-pal/', '/', 'WordPress blog interview: skincare — no match → home'],
  ['/99-of-women-dont-know-this-about-pregnancy-dr-pal-dr-sandhya-vasan-drpal-pregnancy/', '/', 'WordPress blog interview: pregnancy — no match → home'],
  ['/why-dhoni-is-unstoppable-cricitwithbadri-dr-pal-csk/', '/', 'WordPress blog interview: cricket — no match → home'],
  ['/back-pain-knee-pain-drs-advice-for-healthy-bones-i-dr-pal-dr-sathish/', '/', 'WordPress blog interview: musculoskeletal — no match → home'],
  ['/why-are-you-addicted-to-red-flags-validation-chaos-dr-pal-gayathri/', '/', 'WordPress blog interview: mental health — no match → home'],
]

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic document IDs so re-running is idempotent (createIfNotExists
// skips already-created docs). Slugify the source path into something safe.
// ─────────────────────────────────────────────────────────────────────────────
function makeId(source) {
  const slug = source
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '') // strip leading/trailing slashes
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric → dash
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return `redirect-${slug || 'root'}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Main: build documents and createIfNotExists for each.
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Seeding ${REDIRECTS.length} redirects to Sanity (${PROJECT_ID} / ${DATASET})…\n`)
  let created = 0
  let skipped = 0
  let failed = 0
  for (const [source, destination, note] of REDIRECTS) {
    const _id = makeId(source)
    const doc = {
      _id,
      _type: 'redirect',
      source,
      destination,
      permanent: true,
      enabled: true,
      note,
    }
    try {
      const result = await client.createIfNotExists(doc)
      if (result._createdAt === result._updatedAt) {
        created += 1
        console.log(`  ✓ created  ${source}  →  ${destination}`)
      } else {
        skipped += 1
        console.log(`  · existing ${source}  →  ${destination}  (left alone)`)
      }
    } catch (err) {
      failed += 1
      console.error(`  ✗ failed   ${source}  (${err.message ?? err})`)
    }
  }
  console.log(`\nDone. ${created} created, ${skipped} already existed, ${failed} failed.`)
  console.log('Verify in Studio: /studio → Redirect')
  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
