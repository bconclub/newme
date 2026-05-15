# Changelog

## 2026-05-15 · Home: ISR + bypass Sanity CDN so testimonial photos appear

- **`src/app/page.tsx`**:
  - Added `export const revalidate = 60` so the statically-generated home page rebuilds itself every minute, picking up Sanity edits without needing a fresh deploy
  - `loadTestimonials()` now calls `client.fetch(query, {}, { useCdn: false })` to bypass the Sanity CDN at build/revalidation time — the CDN's ~60s cache was serving stale "no avatar" rows even though the live Sanity docs already had `personAvatar` attached
- Diagnostics: `scripts/check-testimonials.mjs` (new) lists every testimonial in Sanity with its resolved avatar URL — used to verify the fix
- User-facing: Abilash, Ramya, Jyoti, Sai Deepthi, Kavita avatars will appear within ~60s of the deploy reaching production (no longer stuck on initial-letter placeholders)

## 2026-05-15 · SEO metadata for route segments + .gitignore env hardening

- **`.gitignore`**: added `.env*.local` so any `.env.local`, `.env.development.local` etc. stay out of git (defensive — Next already gitignores `.env*` by default but this is explicit)
- **`src/app/contact/layout.tsx`** (new): adds `metadata` (title + description) for `/contact`
- **`src/app/faq/layout.tsx`** (new): adds `metadata` for `/faq`
- **`src/app/team/layout.tsx`** (new): adds `metadata` for `/team` (NewME Care Team)
- **`src/app/pathways/layout.tsx`** (new): adds `metadata` for the parent `/pathways` page
- **`src/app/pathways/metabolic/layout.tsx`** (new): adds `metadata` for `/pathways/metabolic`
- **`src/app/pathways/gi/layout.tsx`** (new): adds `metadata` for `/pathways/gi`
- **`src/app/pathways/continuity/layout.tsx`** (new): adds `metadata` for `/pathways/continuity`
- User-facing: each route now ships a proper `<title>` and meta-description for search engines and social previews

## 2026-05-15 · Add branded 404 page

- **`src/app/not-found.tsx`** (new): App Router global 404. Composes the `.newme-page` shell + atmospheric ellipse blobs (same family as the home) so the page sits inside the brand world rather than falling back to a stock Next page. Centered glass card with the big "404" headline, "The requested page could not be found." body, and a white "Back to Home" pill linking to `/`

## 2026-05-15 · GI card images on home + FAQ page redesign

- **`src/components/option1/Pathways.tsx`**: GI Core and GI Advanced cards on the home Pathways carousel now use `/home/GI Core.webp` and `/home/GI Advanced.webp` (were sharing placeholder paths)
- **`src/app/faq/page.tsx`**: rebuilt the FAQ layout to match the reference
  - Replaced the centered stacked-sections layout with a 2-column grid: section nav on the left (sticky on desktop, stacks on mobile), accordion content on the right
  - Active section name turns gold; clicking a section swaps the visible content and auto-opens the first item (page never reads "empty" after category change)
  - Question text turns gold when its panel is open
  - Replaced the circular-bordered +/− icons with borderless +/− glyphs that match the design reference

## 2026-05-15 · HIW comparison parity + team name fixes + continuity card images + team-card half-panel on desktop

- **`src/components/option1/HIWComparison.tsx`**: refactored the right "NewME Approach" card to mirror the home StructuredCare structure exactly — outer `motion.div` owns the scroll-entry (`scale: 0.88 → 1`, `opacity: 0 → 1`, 0.8s ease), inner card owns only the click-to-swap `animate`. Previously the entry and the click state were on the SAME `motion.div`, so Framer's `animate` clobbered `whileInView` the moment the parent re-rendered with `active` and the entry pop never read. Now click-to-swap + entry animation behave identically to the home page section
- **`src/app/team/page.tsx`**:
  - Names: "Shakeela" → "Shakeela Ranjithkum"; "Reshmi Sinha" → "Rashmi Sinha" (corrected spelling)
  - Desktop team card: inset panel now opens to BOTTOM HALF only (`top: 52%`) so the face stays visible above the panel; photo dim reduced to `brightness(0.95)` on desktop hover. Mobile/touch behaviour unchanged — panel still fills the card as before
- **`src/components/option1/Pathways.tsx`**: continuity-pathway cards on the home Pathways carousel now use the new images: NewME 360 → `/home/NEwME 360.webp`, NewME Movement → `/home/NEw ME MOvement.webp` (was sharing placeholder paths with the Metabolic cards by index, which would have shown the same image on Reset and NewME 360)

## 2026-05-15 · Contact page: remove duplicate atmospheric blobs in body

- **`src/app/contact/page.tsx`**: Removed the ContactBody's own atmospheric blobs (green-gradient blob, yellow blob, noise overlay). They created a visible green wash that didn't exist in the area above (around the hero card), producing a noticeable horizontal seam between the hero section and the body. The page already has the global `.newme-page` background, so the body now reads continuously with the hero zone

## 2026-05-15 · Image swaps: home metabolic pathway cards + contact hero

- **`src/components/option1/Pathways.tsx`**: Reset / Rebuild / Sustain card images on the home pathway carousel now use `/home/reset.webp`, `/home/rebuild.webp`, `/home/sustain.webp` (replaces the placeholder /how it works/ assets that were standing in)
- **`src/app/contact/page.tsx`**: contact-page hero image switched from `/clinic/virtual-clinic-hero.webp` to `/contact/contact us opt1.webp` (URL-encoded space)

## 2026-05-15 · HIW comparison card now matches home behavior

- **`src/components/option1/HIWComparison.tsx`**: removed the mobile-stack layout (`flex flex-col md:flex-row`) — the comparison cards are now always side-by-side at every breakpoint, matching `StructuredCare` on the home page. The click-to-swap scale/dim was effectively invisible on mobile because users only saw one card at a time
- Converted the `md:`-only Tailwind utilities (`md:flex-[…]`, `md:mt-[…]`, `md:h-[…]`, `md:ml-[…]`, `mt-4`) to single inline `style` values that apply at all widths
- Switched from fixed `height` to `minHeight` so cards still match the home pattern (home uses `minHeight` and `flex: '… 1 0'`)
- User-facing: click-to-swap now reads correctly on mobile — clicking either card brings it forward, dims the other

## 2026-05-15 · Image swaps: RESET banner + "why starting early matters"

- **`src/app/pathways/metabolic/page.tsx`**: RESET prescription banner → `/pathways/MC 3 Inside vertical banners.webp` (was `/images/pathways/reset-banner.jpg`)
- **`src/components/option1/HIWWhyEarly.tsx`**: "Why starting early matters" image → `/how it works/why starting early matters.webp` (was the typo'd `Why astarting early matters.webp`)

## 2026-05-15 · Unify hero card height across pathway pages

- **`src/components/option1/PageHero.tsx`**: Changed the card sizing from `minHeight` → `height` with floor `560px` and the same `clamp(560px, calc(694/1880 * 100vw), 694px)` formula. Previously each pathway hero (Continuity / Metabolic / GI) grew to fit its own content length, which made the three sibling cards visually different. Now every PageHero-based page renders the exact same card dimensions — only the content inside changes
- User-facing: the Continuity / Metabolic / GI hero cards are now the same size; no more drift

## 2026-05-15 · GI pathway: swap both prescription-banner images

- **`src/app/pathways/gi/page.tsx`**: GI Core banner → `/pathways/GI 1 vertical banners.webp`; GI Advanced banner → `/pathways/GI 2 vertical banners.webp`. URL-encoded the spaces. Replaces the old `gi-core-banner.jpg` and `gi-advanced-banner.jpg` refs

## 2026-05-15 · Continuity pathway: swap both prescription-banner images

- **`src/app/pathways/continuity/page.tsx`**: NewME 360 banner now uses `/pathways/cp1 vertical banners.webp`; NewME Movement banner now uses `/pathways/cp 2 vertical banners.webp`. URL-encoded the spaces in each path. Old refs to `/images/pathways/newme360-banner.jpg` and `/images/pathways/movement-banner.jpg` removed

## 2026-05-15 · Replace Pathways "One System" section image

- **`src/app/pathways/page.tsx`**: `SECTION_IMG` swapped from `/images/pathways/section-clinical.jpg` to `/pathways/one%20system%20multiple%20pathways.webp` (URL-encoded spaces). User-facing image under the "One System. Multiple Pathways." heading is now the new asset

## 2026-05-15 · All testimonial avatars now live in Sanity (single source of truth)

- **`scripts/attach-testimonial-avatars.mjs`**: New one-off — finds testimonial docs missing `personAvatar`, matches them against local files via the same normalized-prefix rule used previously (`Jyoti`→`jyothi.webp`, `Sai Deepthi`→`sai deepti.webp`, etc.), uploads each as a Sanity asset, and patches the doc. Idempotent — re-runs skip already-attached docs
- Ran the script: patched 5 docs (Sai Deepthi, Kavita, Jyoti, Abilash, Ramya)
- **`page.tsx`**: Removed `LOCAL_AVATAR_FILES` map and `resolveLocalAvatar()` helper — `loadTestimonials()` now uses *only* the Sanity `personAvatar` field with no local-file fallback
- User-facing: every testimonial photo is now editable from Sanity Studio; nothing in `/public/testimonials/` is read at runtime anymore

## 2026-05-15 · Move 3 hardcoded testimonials into Sanity, drop fallback list

- **`scripts/seed-testimonials.mjs`**: New one-off script — uploads `nithya.jpg`, `kat.jpg`, `thamarai.jpg` as Sanity assets and creates 3 testimonial documents (Nithya / Karan / Thamarai) with `order: 1, 2, 3`. Idempotent — skips if a doc with the same `personName` already exists. Reads creds from `.env.local`
- **`Testimonials.tsx`**: Removed the `FALLBACK_TESTIMONIALS` array entirely — the component now renders only what's passed in from Sanity
- **`page.tsx`**: Section is conditionally rendered only when Sanity returns at least 1 testimonial
- User-facing: all testimonial content is now editable from `/studio` — no more code edits needed to change Nithya/Karan/Thamarai's quotes or photos

## 2026-05-15 · Fix testimonial avatar fallback matching

- **`page.tsx`**: Replaced exact-name `LOCAL_AVATARS` map with `resolveLocalAvatar()` that normalizes names (lowercase, strip spaces) and matches by prefix — handles spelling variants like "Jyoti"/"Jyothi" and "Sai Deepthi"/"Sai Deepti" that previously fell through to the initial-letter placeholder
- Encoded the space in `sai%20deepti.webp` so the CSS `url()` value is safe across browsers
- User-facing: Abilash, Ramya, Kavita, Jyoti, Sai Deepthi testimonials now show their photos

## 2026-05-15 · Testimonial images + drag/touch scroll

- **`page.tsx`**: Added `LOCAL_AVATARS` map — Sanity testimonials without an uploaded `personAvatar` now fall back to matching local `/public/testimonials/*.webp|jpg` files (covers Abilash, Jyothi, Kavita/Kavitha, Ramya, Sai Deepti, plus existing 3)
- **`Testimonials.tsx`**: Added pointer-event drag handlers to the carousel viewport — left/right swipe now advances or retreats the carousel; works on both touch and mouse; `touchAction: pan-y` preserves vertical page scroll on mobile
- User-facing: all testimonial avatars now show photos; carousel is swipeable

## 2026-05-15 · Fix testimonial avatar face centering

- **`Testimonials.tsx`**: Changed avatar background-position from `center` to `50% 15%` so portrait photos show the face rather than the chest/body area in the circular avatar crop
- User-facing: testimonial avatars now frame faces correctly (abc0000)

## 2026-05-15 · Merge branch 14/sai: assessment scroll fix + Lenis skip

- **`SharedResultsPage.tsx`**: removed `bodyVisible` state + scroll listener `getBoundingClientRect` check; `bodyVisible` is now hardcoded `true` — eliminates erratic scroll/layout jumps on the results page
- **`SmoothScroll.tsx`**: Lenis smooth scroll now also disabled for `/assessment` routes (was only `/studio`) — fixes conflict between Lenis and the assessment SPA's own scroll container (f2d55dc)

## 2026-05-14 20:30 IST · Contact form CRM integration + thank-you page

- **`urlConstants.ts`**: `CRM_LEAD_CONTACT_US` endpoint already present from prior session
- **`contact/page.tsx`**: removed fake `setTimeout` submit; real `fetch` POST to CRM with `{name, email, message}`; on success `router.push('/contact/thank-you')`; on failure shows inline red error above submit button
- **`contact/thank-you/page.tsx`**: new page — atmospheric dark design, animated check icon, "Thank You for Reaching Out." heading, `useEffect` fires `dataLayer.push({ event: 'contact_form_submit' })` on mount with commented stubs for GA4 `gtag` and Meta Pixel `fbq`; two CTAs: "Start Free Assessment" → `/assessment`, "Back to Home" → `/`
- **`Testimonials.tsx`**: fixed TypeScript error — `typeof testimonials` reference replaced with `TestimonialItem` (be4f660)

## 2026-05-14 20:00 IST · Wire Contact Us form to CRM endpoint

- **`urlConstants.ts`**: added `CRM_LEAD_CONTACT_US` endpoint (`/api/crm/lead/contact-us`) to the shared ENDPOINTS map
- **`contact/page.tsx`**: replaced fake `setTimeout` submit with real `fetch` POST to CRM; added `error` state that shows a fallback message if the request fails; success/sending/error states all handled
- User-facing: form now stores leads in the CRM on submission; errors surface inline above the Send button

## 2026-05-14 19:30 IST · Fix missing circle icon, Order Summary favicon, and 8-testimonial carousel

- **`public/icons/pillar-1.svg`**: created missing icon file (copy of digestion SVG) — fixes blank yellow circle in WhatIsNewMe section
- **`OrderPage.tsx`**: replaced `LogoMark` asterisk SVG with `<img src="/favicon.png">` in Order Summary card header — shows actual brand favicon
- **`Testimonials.tsx`**: exported `TestimonialItem` type; component now accepts `initialTestimonials` prop; Sanity data is merged after the 3 hardcoded testimonials (which keep their photos); no-avatar testimonials render an initials circle (gold ring + first initial)
- **`page.tsx`**: `Home` is now an async server component that fetches testimonials from Sanity via guarded dynamic import and passes them as props
- **Sanity**: 5 new testimonials seeded (Abilash, Ramya, Jyoti, Sai Deepthi, Kavita) — carousel now shows 8 total

## 2026-05-14 18:00 IST · Seed 25 media mentions + 4 outlets into Sanity

- **scripts/seed-media-mentions.mjs**: one-time migration script that reads 25 Dr. Pal press articles from the spreadsheet and populates Sanity
- **4 mediaOutlet docs created**: Indian Express, Times of India, Hindustan Times, Economic Times — each with logo uploaded as a Sanity image asset
- **25 mediaMention docs created**: all articles from the spreadsheet, with OG cover images scraped and uploaded, article dates from `article:published_time` meta, and excerpts from `og:description`; 8 articles that had no OG image use the outlet logo as fallback cover
- **User-facing**: /media page now shows 25 real press articles sorted newest-first, each card links out to the original article

## 2026-05-14 · Merge branch 14/sai: shareable results + email update

- **`src/app/assessment/results/page.tsx`**: removed session gate; results page now accepts `?email=` param and is fully shareable as a deep link
- **`SharedResultsPage`**: new component that fetches results from CRM by email, manages results → order → payment_success screen flow, and handles Zoho payment redirect
- **Support email** updated from `hello@newme.com` → `support@drpalsnewme.com` in ChatBot, PhaseDetailPage, and QuizPage (two spots)

## 2026-05-13 · `/assessment/results` deep-link route with session gate

- **New route `src/app/assessment/results/page.tsx`**: returning visitors who completed the quiz can now share/bookmark/revisit their results at `/assessment/results`. Fresh visitors (no session, partial session, or missing CRM lead) are redirected to `/assessment` to start the quiz properly.
- **AssessmentApp**: added `initialScreen?: "results"` prop. When set AND `sessionStorage.newme_session` has `res` plus a `newme_lead_id` in localStorage, the SPA boots directly into the results screen with `res`, `selectedPhase`, `step`, `info`, `profile`, and `ans` all restored from session.
- **Atmospheric shell hoisted**: the pine-teal + green wash + noise background previously lived in `assessment/page.tsx` only. Moved to `assessment/layout.tsx` so both `/assessment` and `/assessment/results` render on the same dark background without duplicating the CSS.
- **Sitemap**: `/assessment/results` is intentionally NOT advertised (session-gated, no public crawlable content). Comment updated.
- **TypeScript**: explicit `<number>` and `<string>` types on the `step`/`screen` `useState` calls so the new `savedSession?.step` init value (which is `any` from `JSON.parse`) doesn't leak into the `setStep(s => s + 1)` callbacks. Removes 3 pre-existing implicit-`any` warnings.

## 2026-05-13 · Calendly link updated to the program-specific booking page

- `CALENDLY_URL` in `src/assessment-app/components/ChatBot/ChatBot.tsx` was pointing at `/dr-pal-s-newme` (the older event). Switched to `/dr-pal-s-newme-program` per the new Calendly URL.
- The booking flow (popup widget + the `calendly.event_scheduled` postMessage listener that writes the appointment back to the CRM via `saveCalendlyAppointment`) is unchanged — same constant, two booking buttons in the chatbot ("📅 Book a call" in the main menu and in the menu after answering a question) now point at the right event.

## 2026-05-13 · Blog card fallback, "Physical Therapy" pillar rename, foundation icon

- **Blog cards**: posts without a coverImage no longer render as an empty dark green slab. Fallback now uses a 135° moss-to-pine gradient + soft fractal-noise overlay + the post title in gold so the card still communicates what the post is about. (Editors should still upload real cover images in Studio for the 3 new posts — this is a graceful fallback, not a replacement.)
- **Pillars**: renamed "Mobility" → "Physical Therapy" (label + description). Description now reads "Restores joint range, functional movement, and physical independence through structured rehabilitation."
- **Assessment OrderPage / Foundation note**: replaced the 🌱 plant emoji with a heart-in-hand SVG so the icon clearly reads as "charitable giving" instead of a wellness/growth cue.

## 2026-05-13 · Footer: Resources column now actually clickable

- Previous commit (`8010d43`) marked the Resources items `live: true` in the data array, but the Resources column rendering still hardcoded all entries as disabled `<span>`s — so FAQ / Blog / Media / Research Lab / Take the Assessment all looked greyed-out and didn't navigate. Now mirrors the Quick Links column rendering: respects each item's `live` flag, renders real `<Link>`s for live items and disabled `<span>`s for unbuilt ones.

## 2026-05-13 · Sitemap: add /assessment and /cookie-policy, reorder by priority

- Added `/assessment` (priority 0.9, monthly) — primary conversion route, was missing.
- Added `/cookie-policy` (priority 0.3, yearly) — legal page, was missing.
- Reordered routes by intent (top-of-funnel → pathway detail → other primary → conversion-adjacent → legal) and grouped with section comments. No priorities changed for existing routes.
- Documented intentional exclusions: `/page1` (dev scratch), `/studio/...` (admin, noindexed), `/blog/[slug]` (dynamic via Sanity, already wired).

## 2026-05-13 · Seed 3 new blog posts to Sanity

- Added `scripts/seed-blogs-batch2.mjs` (idempotent, mirrors the existing `seed-blogs.mjs` pattern) to push 3 new posts authored by Dr. Pal:
  - `/blog/constipation-remedies-relief-guide` — *Effective Constipation Remedies: How to Relieve Constipation on the Toilet Immediately*
  - `/blog/how-to-calculate-maintenance-calories` — *How to Calculate Maintenance Calories* (BMR + TDEE walkthrough)
  - `/blog/sibo-symptoms-guide` — *SIBO Symptoms: 10 Warning Signs You Shouldn't Ignore*
- Source: 3 `.docx` files from the client. Each post converted to Portable Text (h2/h3/para/bullet/bold/em helpers), tagged, SEO-loaded (metaTitle, metaDescription, keywords), and given a disclaimer. Cover image is intentionally blank — editors will set the hero photo in Studio (same flow as the original 3 posts).

## 2026-05-13 · Assessment badge fix, mobile carousel active=left, shield 2× bigger

- **Assessment pricing badge**: when GI billing toggle is "3 months upfront", the inner pill now reads "GI Core · 3 months Clinical Pathway" (was stuck at "1 month" because `PHASE_META` hardcodes monthly units). Switched to a derived `displayBadge` that rewrites "1 month" → "3 months" when upfront is active.
- **Mobile testimonial carousel**: active card is now the LEFTMOST card in view (with a peek of the next on the right) instead of being virtually centered. Desktop still has 3 cards visible with the middle one active. Implemented via a viewport-aware `activeOffset` (0 mobile, 1 desktop), wired through `isActive`, `activeOrigIdx`, and `goTo`.
- **Trust badge shield**: doubled the shield/check icon size — `clamp(28→56 px, 48→96 px, 48→96 px)`.

## 2026-05-13 · Homepage scroll bug, duration pill, mobile tabs carousel, VC animations

- **Bug fix (Pathways.tsx)**: scrollIntoView no longer fires on initial mount — replaced with an internal horizontal `scrollTo` that only triggers on real tab changes and only when the tab is actually overflowing horizontally. Stops the homepage from auto-scrolling to the "8 Pillars" section on load.
- **Duration pill** on all 3 pathway pages (Metabolic, GI, Continuity): now renders via the shared `<EyebrowPill variant="gold" />` to match the rest of the site's pill style.
- **PathwayTabs**: mobile layout is now a horizontal scroll-snap carousel (no more stacking). Desktop keeps the wrap layout. Scrollbar hidden via `.pathway-tabs-row::-webkit-scrollbar`.
- **Anatomy overlay**: unified `overlayStyle` across all 3 pathway pages (`right: -5%, bottom: -15%, height: 125%`). On mobile, `.pathway-hero-overlay` is shrunk to 78% height, pushed further right (-22%), and dimmed to 55% opacity so it sits behind the heading and tab carousel instead of overlapping them.
- **Virtual Clinic animations**: VCWhatIs, VCHowItWorks, and VCDoctorCard sections extracted into `VCSections.tsx` (client component) with entry animations — heading fades + rises, list items stagger from the left, contact pills lift on hover. Previously these were fully static.

## 2026-05-13 · Ratings card centered + compact, footer hooked up to real pages

- **Ratings card**: now `max-width: clamp(320px, 720/1920×100vw, 720px)` + `mx-auto` so the trust badge sits centered and compact instead of stretching edge-to-edge
- **Footer Quick Links**: expanded to Home, How it Works, Pathways, Virtual Clinic, Dr Pal & Team, Contact — all live with real routes
- **Footer Resources**: replaced placeholder Podcast/NewME App with FAQ, Blog, Media, Research Lab, Take the Assessment — all live
- **Footer bottom row**: Privacy → `/cookie-policy`, Terms → `/terms` (was `#`); switched to `<Link>` for client-side nav
- **Dr Pal & Team href fix**: was `/care-team` (404), now `/team` (matches the actual route)

## 2026-05-13 · Testimonial carousel: Figma-spec inactive cards + real sliding motion

- **Testimonials**: rebuilt as a true sliding carousel — cards now physically translate horizontally on each cycle (5 s auto-advance), with the centered card flipping to active. Active dot is wired to the centered card's testimonial.
- **Inactive card surface (Figma 1:6293)**: restored to translucent white-glass — `linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%)` + `rgba(255,255,255,0.30)`, `2px solid white` border, `backdrop-blur(10.25px)`, `rounded-34`
- **Sage tint (Figma 1:6296)**: Ellipse 55 sage-green radial sized at 128% so it bleeds beyond the card and diffuses through the blur
- **Active card**: scales 0.96 → 1, picks up gold box-shadow (2 px ring + 36 px drop), inactive cards stay at 0.96 with a softer shadow
- **Track**: 12 copies × 3 testimonials = 36 cards rendered; seamless snap-back near end via one-frame `duration: 0` transition
- **Card width**: `78vw` mobile (peek of next card), `clamp(220px, 587/1920×100vw, 587px)` desktop — three visible per row at 1920 ceiling matches Figma

## 2026-05-13 · Testimonials hover fix, darker inactive cards, compact ratings banner

- **Testimonials – option1.scss**: removed `:hover` CSS rules; only `[data-active="true"]` now triggers the white flip, eliminating conflict with the auto-advance timer
- **Testimonials card**: inactive card background deepened to `rgba(3,28,24,0.78)` for stronger contrast against the active white card
- **Ratings card**: reduced py padding (py-5→py-4 mobile, py-8→py-5 desktop), score max 52→38 px, stars max 18→14 px, labels max 22→15 px, shield max 72→48 px — reads as a compact trust badge rather than a tall banner

## 2026-05-13 · Fix pillar count, assessment plan label, and add NewME card entrance animation

- **Pillars**: removed Metabolism pillar; section now shows 8 pillars (heading, body copy, and orbit all updated)
- **Assessment – OrderPage**: "3 months · Save $51" tab now correctly shows "GI Core · 3 month Clinical Pathway" (duration was hardcoded to "1 month" regardless of billing toggle)
- **StructuredCare**: NewME card scales up from 0.88→1 as the section scrolls into view (`whileInView` entrance wrapper, `once: true`, 0.8 s ease)
