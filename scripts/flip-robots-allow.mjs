#!/usr/bin/env node
/**
 * One-shot launch-day script: updates the Sanity `robotsTxt` singleton to
 * allow all crawlers (was pre-launch `Disallow: /`). Adds a Sitemap line
 * so crawlers auto-discover the URL list.
 *
 * Idempotent: re-running with the same content is a no-op (Sanity doesn't
 * change `_updatedAt` if the document content matches).
 *
 * Run: SANITY_API_TOKEN=$SANITY_API_WRITE_TOKEN node scripts/flip-robots-allow.mjs
 */
import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sljf1wfa'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN

if (!TOKEN) {
  console.error('ERROR: SANITY_API_TOKEN (or SANITY_API_WRITE_TOKEN) env var required.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-10-01',
  token: TOKEN,
  useCdn: false,
})

const NEW_CONTENT = `# Site is live. All crawlers welcome.
#
# Note: indexing is also controlled at two other layers — the X-Robots-Tag
# response header in next.config.ts and the robots metadata in
# src/app/layout.tsx. Both should also be flipped to allow indexing.

User-agent: *
Allow: /

Sitemap: https://drpalsnewme.com/sitemap.xml
`

await client
  .patch('site-robots-txt')
  .set({
    content: NEW_CONTENT,
    lastEditedBy: 'launch-day flip',
    note: 'Opened indexing to all crawlers. Site went live.',
  })
  .commit()

console.log('✓ Updated site-robots-txt. New /robots.txt content will serve within ~60s.')
