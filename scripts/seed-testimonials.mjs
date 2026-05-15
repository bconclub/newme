/**
 * One-time script: push the 3 originally-hardcoded testimonials (Nithya,
 * Karan, Thamarai) into Sanity with their local images uploaded as assets.
 *
 * Reads creds from .env.local. Run:
 *   node scripts/seed-testimonials.mjs
 *
 * Idempotent: looks up existing testimonial by personName before creating.
 */
import { createClient } from '@sanity/client'
import { readFileSync, createReadStream } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// Tiny .env.local parser (no extra deps).
const env = Object.fromEntries(
  readFileSync(resolve(root, '.env.local'), 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    }),
)

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET
const token = env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity creds in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

const SEED = [
  {
    personName: 'Nithya',
    personRole: 'GI Core Pathway',
    imageFile: 'public/testimonials/nithya.jpg',
    order: 1,
    quote:
      'After years of poor gut health and binge eating, my fasting blood sugar improved and my cravings completely stopped. Physically and mentally, I feel much better now.',
  },
  {
    personName: 'Karan',
    personRole: 'Sustain Pathway',
    imageFile: 'public/testimonials/kat.jpg',
    order: 2,
    quote:
      'In 2 years, my HbA1c dropped from 6.1 to 5.7, LDL from 146 to 86, and my liver size reduced from 16.7 cm to 14.0 cm. I feel healthier and more confident than ever.',
  },
  {
    personName: 'Thamarai',
    personRole: 'Rebuild Pathway',
    imageFile: 'public/testimonials/thamarai.jpg',
    order: 3,
    quote:
      "From being worried about diabetes and fatty liver, I've seen my HbA1c come down from 7.2 to 5.7 and my blood sugar stabilize. I'm now navigating my health with much more confidence.",
  },
]

async function findExisting(name) {
  return client.fetch(`*[_type == "testimonial" && personName == $name][0]{_id}`, {
    name,
  })
}

async function uploadImage(file) {
  const abs = resolve(root, file)
  const stream = createReadStream(abs)
  const asset = await client.assets.upload('image', stream, {
    filename: file.split('/').pop(),
  })
  return asset._id
}

async function run() {
  for (const t of SEED) {
    const existing = await findExisting(t.personName)
    if (existing?._id) {
      console.log(`✓ ${t.personName} already exists (${existing._id}) — skipping`)
      continue
    }
    console.log(`→ Uploading image for ${t.personName} …`)
    const assetId = await uploadImage(t.imageFile)

    console.log(`→ Creating testimonial doc for ${t.personName} …`)
    const doc = await client.create({
      _type: 'testimonial',
      quote: t.quote,
      personName: t.personName,
      personRole: t.personRole,
      personAvatar: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      },
      order: t.order,
    })
    console.log(`  created ${doc._id}`)
  }
  console.log('\nDone.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
