/**
 * update-author-avatar.mjs
 * Uploads dr-pal-portrait.png to Sanity and patches the author-dr-pal doc.
 * Run: node scripts/update-author-avatar.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const envPath = resolve(__dirname, '..', '.env.local')
const envLines = readFileSync(envPath, 'utf-8').split('\n')
for (const line of envLines) {
  const [k, ...rest] = line.split('=')
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim()
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-10-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const imgPath = resolve(__dirname, '..', 'public', 'dr-pal-portrait.png')
const imgBuffer = readFileSync(imgPath)

console.log('Uploading dr-pal-portrait.png...')
const asset = await client.assets.upload('image', imgBuffer, {
  filename: 'dr-pal-portrait.png',
  contentType: 'image/png',
})
console.log('  ✓ asset uploaded:', asset._id)

console.log('Patching author-dr-pal with avatar...')
await client
  .patch('author-dr-pal')
  .set({
    avatar: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    },
  })
  .commit()
console.log('  ✓ author-dr-pal updated')
console.log('\n✅ Done — Dr. Pal author now has avatar.')
