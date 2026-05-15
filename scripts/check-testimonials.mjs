/**
 * Diagnostic: list every testimonial doc in Sanity with the resolved
 * avatar URL so we can confirm where the breakage is between Sanity
 * and the live site.
 *
 * Run: node scripts/check-testimonials.mjs
 */
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { readFileSync } from 'node:fs'
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

const builder = imageUrlBuilder(client)

const docs = await client.fetch(`
  *[_type == "testimonial"] | order(order asc) {
    _id, personName, personRole, order, personAvatar
  }
`)

console.log(`\nFound ${docs.length} testimonial docs:\n`)
for (const d of docs) {
  const url = d.personAvatar
    ? builder.image(d.personAvatar).width(120).height(120).fit('crop').url()
    : '(no personAvatar)'
  console.log(`  order ${d.order ?? '?'}  ${d.personName}`)
  console.log(`    role: ${d.personRole}`)
  console.log(`    avatar: ${url}`)
  console.log(`    _id: ${d._id}\n`)
}
