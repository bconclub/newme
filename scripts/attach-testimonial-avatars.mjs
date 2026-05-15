/**
 * One-time script: for the 5 Sanity testimonials missing personAvatar
 * (Abilash, Jyoti/Jyothi, Kavita/Kavitha, Ramya, Sai Deepthi/Deepti),
 * upload the matching local image as a Sanity asset and patch the doc.
 *
 * Run: node scripts/attach-testimonial-avatars.mjs
 *
 * Idempotent: skips docs that already have a personAvatar.
 */
import { createClient } from '@sanity/client'
import { readFileSync, createReadStream } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const env = Object.fromEntries(
  readFileSync(resolve(root, '.env.local'), 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    }),
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-10-01',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Name-prefix match → local image file. Same rules as resolveLocalAvatar()
// in src/app/page.tsx so Jyoti/Jyothi and Sai Deepti/Deepthi both work.
const MATCHERS = [
  { match: 'abilash',  file: 'public/testimonials/abilash.webp' },
  { match: 'jyoti',    file: 'public/testimonials/jyothi.webp' },
  { match: 'kavit',    file: 'public/testimonials/kavitha.webp' },
  { match: 'ramya',    file: 'public/testimonials/ramya.webp' },
  { match: 'saideep',  file: 'public/testimonials/sai deepti.webp' },
]

function findFile(name) {
  const key = name.toLowerCase().replace(/\s+/g, '').trim()
  for (const m of MATCHERS) {
    if (key.startsWith(m.match) || m.match.startsWith(key)) return m.file
  }
  return null
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
  const docs = await client.fetch(
    `*[_type == "testimonial" && !defined(personAvatar)]{_id, personName}`,
  )
  if (docs.length === 0) {
    console.log('No testimonials missing personAvatar. Nothing to do.')
    return
  }

  for (const doc of docs) {
    const file = findFile(doc.personName ?? '')
    if (!file) {
      console.log(`✗ ${doc.personName}: no local file match — skipping`)
      continue
    }
    console.log(`→ ${doc.personName}: uploading ${file} …`)
    const assetId = await uploadImage(file)
    await client
      .patch(doc._id)
      .set({
        personAvatar: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      })
      .commit()
    console.log(`  ✓ patched ${doc._id}`)
  }
  console.log('\nDone.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
