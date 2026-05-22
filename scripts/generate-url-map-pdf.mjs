#!/usr/bin/env node
/**
 * Generates docs/url-map.pdf — the complete URL surface for Dr. Pal's NewME.
 *
 * Combines four layers:
 *   1. Live routes (from src/app/sitemap.ts)
 *   2. Code-level redirects (from next.config.ts)
 *   3. Planned legacy WordPress migration redirects (from old drpalsnewme.com)
 *   4. Sanity-driven editorial redirects (reference only — managed in Studio)
 *
 * Re-run anytime URLs change:
 *   npm install --no-save pdfkit
 *   node scripts/generate-url-map-pdf.mjs
 *
 * Replaces the older scripts/generate-legacy-redirects-pdf.mjs which only
 * covered the WordPress migration list — this script supersedes that.
 */
import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'docs', 'url-map.pdf')

// ─────────────────────────────────────────────────────────────────────────────
// 1. LIVE ROUTES — keep in sync with src/app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
const liveRoutes = [
  { path: '/', label: 'Home', priority: 1.0 },
  { path: '/how-it-works', label: 'How It Works', priority: 0.9 },
  { path: '/pathways', label: 'Pathways (index)', priority: 0.9 },
  { path: '/assessment', label: 'Clinical Assessment SPA', priority: 0.9 },
  { path: '/pathways/metabolic', label: 'Pathway · Metabolic', priority: 0.8 },
  { path: '/pathways/gi', label: 'Pathway · GI', priority: 0.8 },
  { path: '/pathways/continuity', label: 'Pathway · Continuity', priority: 0.8 },
  { path: '/virtual-consult', label: 'Virtual Consult', priority: 0.8 },
  { path: '/blog', label: 'Blog (index)', priority: 0.8 },
  { path: '/research-lab', label: 'Research Lab', priority: 0.7 },
  { path: '/team', label: 'NewME Care Team', priority: 0.7 },
  { path: '/media', label: 'Media mentions', priority: 0.6 },
  { path: '/faq', label: 'FAQ', priority: 0.6 },
  { path: '/contact', label: 'Contact Us', priority: 0.5 },
  { path: '/terms', label: 'Terms of Service', priority: 0.3 },
  { path: '/privacy-policy', label: 'Privacy Policy', priority: 0.3 },
  { path: '/cookie-policy', label: 'Cookie Policy', priority: 0.3 },
]

const dynamicRoutes = [
  { path: '/blog/[slug]', label: 'Blog post pages — dynamic from Sanity, one per published post' },
]

const excluded = [
  { path: '/assessment/results', why: 'Session-gated deep link; redirects fresh visitors back to /assessment' },
  { path: '/contact/thank-you', why: 'Post-conversion confirmation page; should never be indexed' },
  { path: '/studio/[[...tool]]', why: 'Sanity Studio admin; noindexed' },
]

// ─────────────────────────────────────────────────────────────────────────────
// 2. CODE-LEVEL REDIRECTS — from next.config.ts
// ─────────────────────────────────────────────────────────────────────────────
const codeRedirects = [
  {
    source: '/?zoho_payment=success',
    destination: '/assessment?zoho_payment=success',
    status: '307',
    note: 'Zoho payment-success landing forwarded to the assessment SPA handler.',
  },
  {
    source: '/virtual-clinic',
    destination: '/virtual-consult',
    status: '308',
    note: 'Rebrand. Old URL preserves SEO authority for existing inbound links.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 3. LEGACY WORDPRESS MIGRATION REDIRECTS — to be seeded into Sanity at launch
//    Source: extracted from drpalsnewme.com/sitemap_index.xml (the old site)
// ─────────────────────────────────────────────────────────────────────────────
const legacyTiers = [
  {
    label: 'Tier 1 — Program pages (high SEO priority)',
    desc: '9 condition-specific program pages from the previous business framing. Likely have the most accumulated SEO authority and inbound links.',
    rows: [
      ['/diabetes-care-program/', '/pathways/metabolic', 'Diabetes — metabolic'],
      ['/fatty-liver-program/', '/pathways/metabolic', 'Fatty liver — metabolic'],
      ['/hypertension-and-heart-care-program/', '/pathways/metabolic', 'Heart / BP — metabolic'],
      ['/thyroid-care-program/', '/pathways/metabolic', 'Thyroid — endocrine / metabolic'],
      ['/hormonal-care-program/', '/pathways/metabolic', 'Hormonal — metabolic'],
      ['/combat-cholestral/', '/pathways/metabolic', 'Cholesterol (typo preserved)'],
      ['/healthy-gut-program/', '/pathways/gi', 'Direct match — gut'],
      ['/pcos-care-program/', '/pathways/metabolic', 'PCOS — metabolic / hormonal'],
      ['/fat-to-fit-program/', '/pathways/metabolic', 'Weight loss — metabolic'],
    ],
  },
  {
    label: 'Tier 2 — Direct equivalents',
    desc: 'URL rename or same-content match on new site. Trivial.',
    rows: [
      ['/faq/', '/faq', 'Trailing-slash strip'],
      ['/privacy-policy/', '/privacy-policy', 'Trailing-slash strip'],
      ['/newme-team/', '/team', 'URL renamed'],
      ['/blogs/', '/blog', 'Plural → singular'],
      ['/terms-and-conditions/', '/terms', 'URL renamed'],
    ],
  },
  {
    label: 'Tier 3 — Loose match (closest sensible destination)',
    desc: 'No 1:1 equivalent on new site. Sending to closest topical fit.',
    rows: [
      ['/why-newme/', '/how-it-works', 'About-page content'],
      ['/testimonials/', '/', 'Home has testimonials section'],
      ['/transform-your-health-with-dr-pal/', '/assessment', 'Old campaign landing page'],
      ['/schedule-a-call/', '/virtual-consult', 'Updated post-rebrand'],
      ['/podcast/', '/media', 'Podcast → media features'],
      ['/form-thanks-page/', '/contact/thank-you', 'Direct replacement'],
      ['/sixty-days-health-reset-challenge/', '/assessment', 'Old campaign'],
      ['/60-days-health-reset-challenge-india/', '/assessment', 'Old campaign'],
      ['/60-days-health-reset-challenge-india-actual/', '/assessment', 'Old campaign'],
      ['/terms-and-conditions-of-newme-fit-llc/', '/terms', 'Entity-specific T&C'],
      ['/terms-and-conditions-of-gutmansquad/', '/terms', 'Entity-specific T&C'],
      ['/shipping-policy/', '/terms', 'Or skip if no shipping policy on new site'],
      ['/feed-2/', '/blog', 'Old WordPress RSS feed'],
      ['/category/podcasts/', '/media', 'Category archive'],
      ['/author/infodrpalsnewme-com/', '/', 'Author archive — no equivalent'],
    ],
  },
  {
    label: 'Tier 4 — Blog interview posts',
    desc: '14 long-form interview / podcast posts. Most have weak topical match to new site; send to closest pathway or home.',
    rows: [
      ['/your-habits-are-killing-your-gut-ft-sivasankaran-i-dr-pal/', '/pathways/gi', 'Gut topic'],
      ['/stress-eating-post-pregnancy-depression-and-weight-gain-lgbtq-i-ft-dr-sonal-top-psychiatrist/', '/pathways/metabolic', 'Weight / stress eating'],
      ['/heart-attacks-in-young-people-is-your-lifestyle-to-blame-top-cardiologist-dr-anup/', '/pathways/metabolic', 'Heart / lifestyle'],
      ['/the-diet-fix-you-need-celebrity-nutritionist-shiny-surendran-dr-pal/', '/pathways/metabolic', 'Diet'],
      ['/dont-ignore-these-health-red-flags-time-for-a-wake-up-call-dr-pal/', '/how-it-works', 'Generic health awareness'],
      ['/pcos-fertility-what-every-woman-needs-to-know/', '/pathways/metabolic', 'PCOS'],
      ['/the-silent-killers-of-eye-health-shocking-facts-revealed-by-dr-ashvin-indias-top-eye-expert/', '/', 'No topical match'],
      ['/shocking-truths-about-ear-health-dr-shree-rao-dr-raos-ent-hospitals-dr-pa/', '/', 'No topical match'],
      ['/actress-anu-hasan-breaking-myths-on-life-mental-wellbeing-and-fitness-dr-pal/', '/', 'Celebrity interview, no match'],
      ['/the-1-mistake-in-your-skincare-routine-that-no-one-talks-about-dr-renita-rajan-dr-pal/', '/', 'No topical match'],
      ['/99-of-women-dont-know-this-about-pregnancy-dr-pal-dr-sandhya-vasan-drpal-pregnancy/', '/', 'No topical match'],
      ['/why-dhoni-is-unstoppable-cricitwithbadri-dr-pal-csk/', '/', 'Sports interview'],
      ['/back-pain-knee-pain-drs-advice-for-healthy-bones-i-dr-pal-dr-sathish/', '/', 'Musculoskeletal, no match'],
      ['/why-are-you-addicted-to-red-flags-validation-chaos-dr-pal-gayathri/', '/', 'Mental health interview, no match'],
    ],
  },
  {
    label: 'Tier 5 — SKIP (let these 404)',
    desc: 'Internal pages, drafts, theme builder templates. Not user-facing or duplicated.',
    rows: [
      ['/home-new-copy-4668/', '— 404 —', 'WordPress draft duplicate of home'],
      ['/social-media-team/', '— 404 —', 'Internal team page'],
      ['/social-media-team-duplicate-1/', '— 404 —', 'Internal dupe'],
      ['/social-media-team-duplicate-2/', '— 404 —', 'Internal dupe'],
      ['/elementor-hf/header-white/', '— 404 —', 'Elementor template, not user-facing'],
      ['/elementor-hf/header-template/', '— 404 —', 'Elementor template'],
      ['/elementor-hf/footer-template/', '— 404 —', 'Elementor template'],
      ['/?post_type=xpro-themer&p=3578', '— 404 —', 'Theme-builder internal'],
      ['/?post_type=xpro-themer&p=4597', '— 404 —', 'Theme-builder internal'],
      ['/?post_type=xpro-themer&p=2229', '— 404 —', 'Theme-builder internal'],
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────
const doc = new PDFDocument({
  size: 'A4',
  margin: 40,
  info: {
    Title: "Dr. Pal's NewME — URL Map",
    Author: 'BCON / Dev Team',
    Subject: 'Complete URL surface — live routes, code redirects, planned legacy redirects',
    CreationDate: new Date(),
  },
})
doc.pipe(fs.createWriteStream(OUT))

// ─── Title page ────────────────────────────────────────────────────────────
doc.font('Helvetica-Bold').fontSize(22).fillColor('#013E37')
   .text("Dr. Pal's NewME", { align: 'left' })
doc.moveDown(0.15)
doc.font('Helvetica').fontSize(14).fillColor('#0A5A47')
   .text('Complete URL Map', { align: 'left' })
doc.moveDown(0.4)
doc.font('Helvetica').fontSize(10).fillColor('#555')
   .text(`Generated ${new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC — re-run scripts/generate-url-map-pdf.mjs anytime URLs change.`)

doc.moveDown(0.8)
doc.font('Helvetica-Bold').fontSize(11).fillColor('#013E37').text('Sections in this document')
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#222')
   .text(`1. Live canonical routes (${liveRoutes.length} static + ${dynamicRoutes.length} dynamic + ${excluded.length} intentionally excluded)`)
doc.text(`2. Code-level redirects from next.config.ts (${codeRedirects.length})`)
doc.text(`3. Planned legacy WordPress migration redirects — to seed into Sanity at launch (${legacyTiers.slice(0, 4).reduce((s, t) => s + t.rows.length, 0)} active + ${legacyTiers[4].rows.length} to-skip)`)
doc.text(`4. Sanity-driven editorial redirects (reference only)`)

doc.moveDown(0.6)
doc.font('Helvetica-Bold').fontSize(11).fillColor('#013E37').text('Pre-launch indexing block (reminder)')
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#222')
   .text('All routes are currently blocked from search engines via three layers (src/app/robots.ts, X-Robots-Tag header in next.config.ts, robots metadata in layout.tsx). All three must be removed in a single commit on launch day before any of the URLs in this document will appear in search results.')

// Helpers ────────────────────────────────────────────────────────────────────
const FONT = 8
function ensureSpace(rowH = 14) {
  if (doc.y + rowH > doc.page.height - 50) doc.addPage()
}
function sectionHeader(title, desc) {
  ensureSpace(60)
  doc.moveDown(0.8)
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#013E37').text(title)
  if (desc) {
    doc.moveDown(0.15)
    doc.font('Helvetica').fontSize(9).fillColor('#555').text(desc, { width: doc.page.width - 80 })
  }
  doc.moveDown(0.35)
}
function tableHeader(cols) {
  ensureSpace(20)
  const top = doc.y
  doc.rect(40, top, doc.page.width - 80, 16).fill('#013E37')
  doc.fillColor('#FEF272').font('Helvetica-Bold').fontSize(9)
  let x = 44
  for (const c of cols) {
    doc.text(c.label, x, top + 4, { width: c.width - 8 })
    x += c.width
  }
  doc.y = top + 18
  doc.fillColor('#222')
}
function tableRow(cells, alt) {
  doc.font('Courier').fontSize(FONT)
  const rowH = Math.max(
    ...cells.map((c, i) => doc.heightOfString(c.text, { width: c.width - 8 }))
  ) + 10
  ensureSpace(rowH + 4)
  const top = doc.y
  if (alt) doc.rect(40, top, doc.page.width - 80, rowH).fill('#F4F4F1')
  let x = 44
  for (const c of cells) {
    const font = c.mono ? 'Courier' : 'Helvetica'
    const color = c.color ?? '#222'
    doc.fillColor(color).font(font).fontSize(FONT)
    doc.text(c.text, x, top + 5, { width: c.width - 8 })
    x += c.width
  }
  doc.y = top + rowH
}

// ─── Section 1: Live Routes ────────────────────────────────────────────────
doc.addPage()
sectionHeader(
  '1. Live canonical routes',
  'Pages currently served by the Next.js app. Listed in src/app/sitemap.ts; this PDF must be regenerated whenever sitemap.ts changes.',
)
tableHeader([
  { label: 'URL path',  width: 240 },
  { label: 'Page',      width: 195 },
  { label: 'Priority',  width: 80 },
])
let alt = false
for (const r of liveRoutes) {
  tableRow([
    { text: r.path, mono: true, color: '#0A5A47', width: 240 },
    { text: r.label, width: 195 },
    { text: r.priority.toFixed(1), width: 80 },
  ], alt)
  alt = !alt
}

doc.moveDown(0.6)
doc.font('Helvetica-Bold').fontSize(11).fillColor('#013E37').text('Dynamic routes')
doc.moveDown(0.2)
for (const d of dynamicRoutes) {
  doc.font('Courier').fontSize(9).fillColor('#0A5A47').text(`  ${d.path}`)
  doc.font('Helvetica').fontSize(9).fillColor('#555').text(`    ${d.label}`)
}

doc.moveDown(0.6)
doc.font('Helvetica-Bold').fontSize(11).fillColor('#013E37').text('Excluded from sitemap (intentional)')
doc.moveDown(0.2)
for (const e of excluded) {
  doc.font('Courier').fontSize(9).fillColor('#A33').text(`  ${e.path}`)
  doc.font('Helvetica').fontSize(9).fillColor('#555').text(`    ${e.why}`)
}

// ─── Section 2: Code-level Redirects ──────────────────────────────────────
doc.addPage()
sectionHeader(
  '2. Code-level redirects (next.config.ts)',
  'Permanent (308) or temporary (307) redirects baked into the Next.js config. Requires a redeploy to change. Best used for permanent URL changes tied to the codebase.',
)
tableHeader([
  { label: 'Source',      width: 200 },
  { label: 'Destination', width: 180 },
  { label: 'Status',      width: 50 },
  { label: 'Note',        width: 85 },
])
alt = false
for (const r of codeRedirects) {
  tableRow([
    { text: r.source, mono: true, width: 200 },
    { text: r.destination, mono: true, color: '#0A5A47', width: 180 },
    { text: r.status, mono: true, width: 50 },
    { text: r.note, width: 85 },
  ], alt)
  alt = !alt
}

// ─── Section 3: Legacy WordPress Migration ────────────────────────────────
doc.addPage()
sectionHeader(
  '3. Planned legacy WordPress migration redirects',
  'Extracted from drpalsnewme.com/sitemap_index.xml (the old WordPress site). These are NOT live yet — they will be seeded into the Sanity "redirect" doctype at launch so the middleware picks them up. Each is a 308 permanent redirect.',
)
for (const tier of legacyTiers) {
  ensureSpace(60)
  doc.moveDown(0.4)
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#013E37').text(tier.label)
  doc.moveDown(0.15)
  doc.font('Helvetica').fontSize(9).fillColor('#555').text(tier.desc, { width: doc.page.width - 80 })
  doc.moveDown(0.3)
  tableHeader([
    { label: 'Old URL',         width: 240 },
    { label: 'New destination', width: 130 },
    { label: 'Notes',           width: 145 },
  ])
  alt = false
  for (const [oldUrl, newUrl, note] of tier.rows) {
    tableRow([
      { text: oldUrl, mono: true, width: 240 },
      { text: newUrl, mono: true, color: newUrl.startsWith('—') ? '#A33' : '#0A5A47', width: 130 },
      { text: note, width: 145 },
    ], alt)
    alt = !alt
  }
}

// ─── Section 4: Sanity-driven editorial redirects ─────────────────────────
doc.addPage()
sectionHeader(
  '4. Sanity-driven editorial redirects (reference only)',
  'Managed in Sanity Studio under the "Redirect" document type. Picked up by src/middleware.ts and refreshed every 60 seconds — no redeploy needed. Best used for content-driven changes (renamed blog slugs, moved articles).',
)
doc.font('Helvetica').fontSize(10).fillColor('#222')
doc.text('How to add one (for editors):', { continued: false })
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#222')
doc.text('1. Open /studio')
doc.text('2. Click "Redirect" in the sidebar')
doc.text('3. Click "Create new" — fill in source, destination, permanent toggle, optional note')
doc.text('4. Publish — middleware picks it up within ~60 seconds')
doc.moveDown(0.5)
doc.font('Helvetica-Oblique').fontSize(9).fillColor('#888')
doc.text("This PDF doesn't enumerate Sanity-driven redirects because they're managed in Studio. Check sanity.io/manage → project sljf1wfa → Studio for the live list.", { width: doc.page.width - 80 })

// Footer
doc.moveDown(2)
doc.font('Helvetica-Oblique').fontSize(9).fillColor('#888')
doc.text('Generated by scripts/generate-url-map-pdf.mjs', { align: 'center' })

doc.end()
console.log(`✓ Wrote ${OUT}`)
