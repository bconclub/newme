# Environment Variables

> Every env var the site reads. Set these in **Vercel → Project → Settings → Environment Variables** under **Production**, **Preview**, and **Development** environments. After adding or changing any `NEXT_PUBLIC_*` var, **trigger a redeploy** — they're inlined into the client bundle at build time.

---

## Required

### `NEXT_PUBLIC_ASSESSMENT_API_URL`
Base URL of the NewMe assessment / CRM backend. **No trailing slash.**
- **Example:** `https://api.drpalsnewme.com`
- **Read by:** `src/assessment-app/constants/urlConstants.ts`
- **What breaks if missing:** Every assessment API call falls back to `http://localhost:4000` and fails on production. Console emits a one-time warning at runtime.

### `NEXT_PUBLIC_LEAD_SOURCE`
Short tag attached to every CRM lead. Helps the CRM team filter where leads originated.
- **Example:** `website-assessment`
- **Read by:** `src/assessment-app/services/crmService.ts`
- **What breaks if missing:** Leads are created without a source tag. CRM filtering becomes manual.

### `NEXT_PUBLIC_SANITY_PROJECT_ID`
Sanity project ID. Find it at `https://sanity.io/manage` → Project Settings.
- **Example:** `abcd1234`
- **Read by:** `sanity.config.ts`, `src/lib/sanity/client.ts`, `src/middleware.ts`
- **What breaks if missing:** Studio fails to mount, `/blog` and `/media` return empty lists, redirects middleware silently no-ops.

### `NEXT_PUBLIC_SANITY_DATASET`
Sanity dataset name.
- **Example:** `production`
- **Read by:** Same as `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **What breaks if missing:** Same as above.

---

## Optional

### `NEXT_PUBLIC_SITE_URL`
Canonical domain of the site. Used for the sitemap, OG canonical URLs, Studio "Open in production" deeplinks.
- **Example:** `https://newme.health`
- **Default if missing:** `https://newme.health`

### `SANITY_API_VERSION`
GROQ API version pinned to a date.
- **Example:** `2024-10-01`
- **Default if missing:** `2024-10-01`

### `SANITY_API_READ_TOKEN`
Read-only token for fetching draft content (preview mode — currently scaffolded but not active).
- **Read by:** `src/lib/sanity/env.ts`

### `SANITY_API_WRITE_TOKEN`
Write token used by **migration scripts only** (e.g. `sanity/migrations/article-to-post.ts`). Never set this in production env.

---

## Backend contract — endpoints the assessment expects

Below the `NEXT_PUBLIC_ASSESSMENT_API_URL`, the backend team must expose these endpoints. All return JSON. CORS must allow `https://newme.health` (and the Vercel preview domain pattern).

| Method | Path | Purpose |
|---|---|---|
| POST   | `/api/crm/lead/profile`           | Save first-name / phone / DOB / gender on the profile step |
| POST   | `/api/crm/lead/pre-quiz`          | Save name + email before the quiz starts |
| GET    | `/api/crm/lead/check?email={email}` | Lookup existing lead by email — returns `{lead: {id, status}}` or `null` |
| GET    | `/api/crm/lead/results?email={email}` | Fetch existing results for a lead (currently unused on the client) |
| DELETE | `/api/crm/lead/{id}`              | Remove a stale duplicate lead |
| PATCH  | `/api/crm/lead/{id}/submit`       | Save full quiz responses + recommended pathway |
| POST   | `/api/crm/lead/{id}/attach-results` | Attach the results PDF / JSON to the lead |
| POST   | `/api/crm/lead/{id}/appointment`  | Save Calendly booking against the lead |
| PATCH  | `/api/crm/lead/{id}/select`       | Mark which pathway the user picked |
| PATCH  | `/api/crm/lead/{id}/convert`      | Mark lead as paid (called after Zoho redirect) |
| POST   | `/api/crm/lead`                   | Fallback path to create a lead with quiz data in one shot |
| GET    | `/api/assessment/check?email={email}` | Returns `{allowed, attemptsUsed, attemptsLeft}` — limits to 2 attempts |
| GET    | `/api/assessment/verify-email?email={email}` | Returns `{valid: boolean, reason: string}` — MX / disposable check |
| POST   | `/api/assessment/record`          | Body `{email, pathway}` — logs an attempt |
| POST   | `/api/payment/create-intent`      | Currently unused — Stripe leftover (Zoho is what's actually wired) |

### CORS

The deployed assessment runs at:
- `https://newme.health/assessment` (production)
- `https://newme-web.vercel.app/assessment` (Vercel preview)

The backend's `Access-Control-Allow-Origin` must include both, plus `Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS` and `Access-Control-Allow-Headers: Content-Type`.

### Email used for testing

When verifying with the backend team, hit:
```
GET  {API_BASE}/api/assessment/verify-email?email=test@gmail.com
GET  {API_BASE}/api/assessment/check?email=test@gmail.com
```
Both should return JSON. If they return HTML or a CORS error, the backend isn't ready yet.

---

## Setting env vars in Vercel — runbook

1. **Get the value** (from the backend team, Sanity dashboard, etc.).
2. **Vercel → Project → Settings → Environment Variables**.
3. Paste the **Key** (e.g. `NEXT_PUBLIC_ASSESSMENT_API_URL`) and **Value** (the URL).
4. Tick **Production**, **Preview**, **Development** (all three unless there's a reason to scope it).
5. Click **Save**.
6. Go to **Deployments** → find the latest deployment → click ⋯ → **Redeploy** (uncheck "use existing build cache" so the new value gets baked into the client bundle).
7. Wait for the deploy to finish, then verify in the browser console — the warning from `urlConstants.ts` should be gone.

---

## Local development

For local dev, copy these into `.env.local` (file is git-ignored):

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=...

# Assessment backend (point at staging or a local mock)
NEXT_PUBLIC_ASSESSMENT_API_URL=https://api-staging.drpalsnewme.com
NEXT_PUBLIC_LEAD_SOURCE=website-assessment

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
