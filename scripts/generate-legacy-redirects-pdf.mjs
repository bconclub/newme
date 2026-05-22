#!/usr/bin/env node
/**
 * Generates docs/legacy-redirects.pdf — the migration redirect list for
 * the old WordPress site at drpalsnewme.com.
 *
 * Run: npx pdfkit-cli ... or just `node scripts/generate-legacy-redirects-pdf.mjs`
 * after `npm install --no-save pdfkit`.
 *
 * One-shot deliverable. Not intended to live in the build pipeline.
 */
import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'docs', 'legacy-redirects.pdf')

// ── Data ─────────────────────────────────────────────────────────────────────
const tiers = [
  {
    label: 'Tier 1 — Program pages (high SEO priority)',
    desc: '9 condition-specific program pages from the previous business framing. These likely have the most accumulated SEO authority and inbound links.',
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
      ['/schedule-a-call/', '/virtual-clinic', 'Or /contact — confirm'],
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

// ── Render ───────────────────────────────────────────────────────────────────
const doc = new PDFDocument({ size: 'A4', margin: 40, info: {
  Title: 'NewME — Legacy URL Redirects',
  Author: 'BCON / Dev Team',
  Subject: 'Migration redirect list from drpalsnewme.com (WordPress) to new site',
  CreationDate: new Date(),
}})
doc.pipe(fs.createWriteStream(OUT))

// Title
doc.font('Helvetica-Bold').fontSize(20).fillColor('#013E37')
   .text("Dr. Pal's NewME — Legacy URL Redirects", { align: 'left' })
doc.moveDown(0.3)
doc.font('Helvetica').fontSize(10).fillColor('#444')
   .text(`Migration plan from old WordPress site (drpalsnewme.com) to the new Next.js site.`)
doc.moveDown(0.2)
doc.text(`Source: drpalsnewme.com/sitemap_index.xml — extracted ${new Date().toISOString().slice(0, 10)}.`)
doc.moveDown(0.6)

// Summary
const totalRedirects = tiers.slice(0, 4).reduce((s, t) => s + t.rows.length, 0)
const totalSkip = tiers[4].rows.length
doc.font('Helvetica-Bold').fontSize(11).fillColor('#013E37').text('Summary')
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#222')
   .text(`• ${totalRedirects} redirects to create (Tiers 1–4)`)
doc.text(`• ${totalSkip} URLs to let 404 (Tier 5)`)
doc.text(`• Mechanism: Sanity "redirect" document type → Next.js middleware (308 permanent)`)
doc.text(`• Editable from Sanity Studio after seed; no redeploy needed to change destinations`)
doc.moveDown(0.8)

// Column layout helpers
const COL_OLD = 40
const COL_NEW = 305
const COL_NOTE = 425
const COL_OLD_W = 260
const COL_NEW_W = 115
const COL_NOTE_W = 130
const ROW_PADDING = 5
const FONT_SIZE = 8

function ensureSpace(rowH = 14) {
  if (doc.y + rowH > doc.page.height - 50) doc.addPage()
}

function drawHeader() {
  ensureSpace(22)
  const top = doc.y
  doc.rect(COL_OLD, top, doc.page.width - 80, 16).fill('#013E37')
  doc.fillColor('#FEF272').font('Helvetica-Bold').fontSize(9)
  doc.text('Old URL', COL_OLD + 4, top + 4, { width: COL_OLD_W - 8 })
  doc.text('New destination', COL_NEW + 4, top + 4, { width: COL_NEW_W - 8 })
  doc.text('Notes', COL_NOTE + 4, top + 4, { width: COL_NOTE_W - 8 })
  doc.y = top + 18
  doc.fillColor('#222')
}

function drawRow(oldUrl, newUrl, note, alt) {
  doc.font('Courier').fontSize(FONT_SIZE)
  // Measure height by old URL since it's the longest
  const oldH = doc.heightOfString(oldUrl, { width: COL_OLD_W - 8 })
  const newH = doc.heightOfString(newUrl, { width: COL_NEW_W - 8 })
  doc.font('Helvetica').fontSize(FONT_SIZE)
  const noteH = doc.heightOfString(note, { width: COL_NOTE_W - 8 })
  const rowH = Math.max(oldH, newH, noteH) + ROW_PADDING * 2

  ensureSpace(rowH + 4)
  const top = doc.y

  if (alt) doc.rect(COL_OLD, top, doc.page.width - 80, rowH).fill('#F4F4F1')

  doc.fillColor('#222').font('Courier').fontSize(FONT_SIZE)
  doc.text(oldUrl, COL_OLD + 4, top + ROW_PADDING, { width: COL_OLD_W - 8 })
  doc.fillColor(newUrl.startsWith('—') ? '#A33' : '#0A5A47').font('Courier').fontSize(FONT_SIZE)
  doc.text(newUrl, COL_NEW + 4, top + ROW_PADDING, { width: COL_NEW_W - 8 })
  doc.fillColor('#555').font('Helvetica').fontSize(FONT_SIZE)
  doc.text(note, COL_NOTE + 4, top + ROW_PADDING, { width: COL_NOTE_W - 8 })

  doc.y = top + rowH
}

// Iterate tiers
for (const tier of tiers) {
  ensureSpace(60)
  doc.moveDown(0.6)
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#013E37').text(tier.label)
  doc.moveDown(0.15)
  doc.font('Helvetica').fontSize(9).fillColor('#555').text(tier.desc, { width: doc.page.width - 80 })
  doc.moveDown(0.4)
  drawHeader()
  let alt = false
  for (const r of tier.rows) {
    drawRow(...r, alt)
    alt = !alt
  }
}

// Outstanding decisions
ensureSpace(120)
doc.moveDown(1)
doc.font('Helvetica-Bold').fontSize(12).fillColor('#013E37').text('Outstanding decisions before seeding')
doc.moveDown(0.3)
doc.font('Helvetica').fontSize(10).fillColor('#222')
const decisions = [
  '/shipping-policy/ — does new site need a shipping policy, or redirect to /terms?',
  '/schedule-a-call/ — /virtual-clinic or /contact?',
  '/testimonials/ — / (home) or /#testimonials anchor? Requires id="testimonials" on home.',
  'Tier 4 no-match blog posts (eye, ear, pregnancy, skincare, sports, mental health interviews) — all → / or all → /blog?',
  'Are these the only legacy URLs? If Google Ads / social bio / email campaigns link to other paths, those need separate redirects.',
]
decisions.forEach((d, i) => {
  doc.text(`${i + 1}. ${d}`, { width: doc.page.width - 80 })
  doc.moveDown(0.2)
})

doc.moveDown(1)
doc.font('Helvetica-Oblique').fontSize(9).fillColor('#888')
   .text('Generated by scripts/generate-legacy-redirects-pdf.mjs — re-run anytime the mapping changes.', { align: 'center' })

doc.end()
console.log(`✓ Wrote ${OUT}`)
