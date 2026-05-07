/**
 * Migration: `article` → `post`
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The old `article` schema (Media Article) carried full long-form content
 * — intro, sectionTitle/Lead, habits, disclaimer, tags, SEO. We've split
 * the model:
 *   • `mediaMention` — simple outbound brand-mention card (cover, outlet
 *     reference, external URL). NEW SCHEMA.
 *   • `post` — long-form authored content with full SEO. ENRICHED SCHEMA.
 *
 * Existing `article` documents map cleanly onto the enriched `post`
 * schema (the field shapes are identical — only `summary` becomes
 * `excerpt`, `heroImage` becomes `coverImage`, and the document `_type`
 * changes from `article` to `post`).
 *
 * This script:
 *   1. Reads every `article` document.
 *   2. Creates a corresponding `post` document with the mapped fields,
 *      keeping the same `_id` (so any cross-references still resolve).
 *   3. Deletes the original `article`.
 *
 * USAGE
 * ─────
 * 1. Generate a write token at https://sanity.io/manage → Tokens → Add
 *    API token (role: "Editor" or "Administrator").
 * 2. Add `SANITY_API_WRITE_TOKEN=...` to .env.local.
 * 3. Run a DRY RUN first:   npx tsx sanity/migrations/article-to-post.ts
 * 4. Once you're happy:     npx tsx sanity/migrations/article-to-post.ts --execute
 *
 * The script is idempotent — running --execute twice is safe; the second
 * run will find no `article` docs and exit.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in env");
  process.exit(1);
}

const EXECUTE = process.argv.includes("--execute");
if (EXECUTE && !token) {
  console.error("--execute requires SANITY_API_WRITE_TOKEN in env (role: Editor or Administrator)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

interface ArticleDoc {
  _id: string;
  _type: "article";
  title?: string;
  slug?: { current?: string };
  summary?: string;
  subtitle?: string;
  city?: string;
  publishedAt?: string;
  author?: { _ref: string; _type: "reference" };
  heroImage?: unknown;
  intro?: string[];
  sectionTitle?: string;
  sectionLead?: string;
  habits?: unknown[];
  disclaimer?: string;
  tags?: string[];
  seo?: Record<string, unknown>;
}

async function migrate() {
  const articles = await client.fetch<ArticleDoc[]>(
    `*[_type == "article"]{
      _id, _type, title, slug, summary, subtitle, city, publishedAt,
      author, heroImage, intro, sectionTitle, sectionLead, habits,
      disclaimer, tags, seo
    }`
  );

  console.log(`\nFound ${articles.length} article document${articles.length === 1 ? "" : "s"} to migrate.\n`);

  if (articles.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  const tx = client.transaction();

  for (const a of articles) {
    const newPost = {
      _id: a._id,
      _type: "post" as const,
      title: a.title,
      slug: a.slug,
      subtitle: a.subtitle,
      excerpt: a.summary,         // summary → excerpt
      coverImage: a.heroImage,    // heroImage → coverImage
      author: a.author,
      publishedAt: a.publishedAt,
      city: a.city,
      intro: a.intro,
      sectionTitle: a.sectionTitle,
      sectionLead: a.sectionLead,
      habits: a.habits,
      disclaimer: a.disclaimer,
      tags: a.tags,
      seo: a.seo,
      // body left undefined — only set when a post is genuinely free-form
    };

    console.log(`  • ${a.title ?? "(untitled)"}  →  post (${a._id})`);

    if (EXECUTE) {
      // Sanity doesn't allow changing _type on an existing doc, so we
      // delete the old article and createOrReplace the new post under
      // the same _id atomically in a single transaction.
      tx.delete(a._id);
      tx.createOrReplace(newPost);
    }
  }

  if (!EXECUTE) {
    console.log("\nDRY RUN — no changes written. Re-run with --execute to commit.\n");
    return;
  }

  await tx.commit();
  console.log(`\n✓ Migrated ${articles.length} document${articles.length === 1 ? "" : "s"}.\n`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
