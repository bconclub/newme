#!/usr/bin/env node
/**
 * Seeds the two singleton documents that drive /robots.txt and /llms.txt.
 *
 * Without this step, the route handlers fall back to a minimal default
 * until an editor opens each singleton in Studio for the first time
 * (which triggers the schema's `initialValue` insert). Running this
 * script up-front populates both singletons immediately so the live
 * site serves the full content right away.
 *
 * Idempotent: uses `createIfNotExists` with the same fixed IDs the
 * route handlers query for. If the docs already exist (manually edited
 * in Studio), this script leaves them alone — editor changes win.
 *
 * How to run:
 *   SANITY_API_TOKEN=skXXXX... node scripts/seed-site-singletons.mjs
 *
 * (or with SANITY_API_WRITE_TOKEN from .env.local — same effect.)
 */
import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sljf1wfa'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN
const API_VERSION = '2024-10-01'

if (!TOKEN) {
  console.error('ERROR: SANITY_API_TOKEN (or SANITY_API_WRITE_TOKEN) env var required.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
})

// ─── robots.txt content (post-launch — open to crawlers) ─────────────────
const ROBOTS_TXT =
  'User-agent: *\n' +
  'Allow: /\n' +
  '\n' +
  'Sitemap: https://drpalsnewme.com/sitemap.xml\n'

// ─── llms.txt content (mirrors what was at public/llms.txt) ──────────────
const LLMS_TXT = `# Dr. Pal's NewME

> A doctor-led clinical system for metabolic and gut regulation, founded by
> Dr. Palaniappan Manickam, MD (gastroenterologist). NewME combines clinical
> insights with structured care to better understand your body and provide
> the care it needs.

NewME is a structured clinical system. The journey begins with a free
3-minute clinical assessment that maps metabolic and gut patterns, then
guides you into the appropriate phase of care. Every program is reviewed
by a medical committee before it begins, and each member is assigned a
Clinical Health Coach who works with them throughout the program.

## Core pages

- [Home](https://drpalsnewme.com/): Overview of the NewME clinical system
- [How It Works](https://drpalsnewme.com/how-it-works): Step-by-step explanation of the assessment → pathway → care flow
- [Pathways](https://drpalsnewme.com/pathways): All five clinical pathways at a glance
- [Clinical Assessment](https://drpalsnewme.com/assessment): Free 3-minute assessment that maps the user to a pathway
- [Virtual Consult](https://drpalsnewme.com/virtual-consult): Doctor-led virtual consultations
- [Research Lab](https://drpalsnewme.com/research-lab): Ongoing clinical observations and research
- [Team](https://drpalsnewme.com/team): NewME clinical team
- [FAQ](https://drpalsnewme.com/faq): Detailed answers about pathways, pricing, and care

## Clinical pathways

NewME offers three main pathway tracks. Each is doctor-led, time-bound, and
includes a Clinical Health Coach plus medical committee oversight.

- [Metabolic Pathway](https://drpalsnewme.com/pathways/metabolic): For those experiencing metabolic dysregulation — weight, energy, blood sugar, and related concerns.
- [GI Pathway](https://drpalsnewme.com/pathways/gi): For those with gut conditions such as IBS, SIBO, bloating, constipation, and reflux. Available in 1-month monthly or 3-month upfront billing.
- [Continuity Pathway](https://drpalsnewme.com/pathways/continuity): Ongoing maintenance care for members who have completed an initial pathway.

### Post-Pathway Programs (Optional)
After the structured pathway, members can transition to these optional programs (not part of the core pathway purchase):
- **NewME 360:** Ongoing health coaching and relapse prevention.
- **NewME Movement:** Fitness programming and live workout sessions.

## Content & editorial

- [Blog](https://drpalsnewme.com/blogs): Long-form articles on gut health, metabolic health, and preventive medicine
- [Media](https://drpalsnewme.com/media): Press features and brand mentions
- [Contact](https://drpalsnewme.com/contact): Get in touch with the NewME team

## About Dr. Pal

Dr. Palaniappan Manickam, MD is a gastroenterologist and the founder of
NewME. He leads a system that focuses on restoring metabolic and gut
health through structured, evidence-based care — not generic wellness
advice. His clinical perspective drives every pathway design decision.

## Important context

- **Medical Disclaimer:** Not a substitute for emergency medical care or acute emergency interventions.
- **Billing & Insurance:** Not an insurance-billable service in most regions; operates on a direct-pay model.

## Legal

- [Terms](https://drpalsnewme.com/terms)
- [Privacy Policy](https://drpalsnewme.com/privacy-policy)
- [Cookie Policy](https://drpalsnewme.com/cookie-policy)
`

const docs = [
  { _id: 'site-robots-txt', _type: 'robotsTxt', content: ROBOTS_TXT },
  { _id: 'site-llms-txt', _type: 'llmsTxt', content: LLMS_TXT },
]

async function main() {
  console.log(`Seeding site singletons to Sanity (${PROJECT_ID} / ${DATASET})…\n`)
  for (const doc of docs) {
    try {
      const result = await client.createIfNotExists(doc)
      console.log(`  ✓ ${result._id}  (${doc._type})`)
    } catch (err) {
      console.error(`  ✗ ${doc._id}  failed: ${err.message ?? err}`)
      process.exit(1)
    }
  }
  console.log('\nDone. Verify in Studio: /studio → Site → robots.txt / llms.txt')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
