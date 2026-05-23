import { defineField, defineType } from "sanity";

/**
 * robots.txt — singleton document, edited entirely from Studio.
 *
 * The Next.js route handler at `src/app/robots.txt/route.ts` fetches
 * this document on every request (cached ~60s) and serves the `content`
 * field as the response body. If the doc is missing or Sanity is
 * unreachable, the handler falls back to a minimal `Allow: /` + sitemap
 * line so a brief Sanity outage doesn't accidentally noindex the site.
 *
 * Singleton: there is exactly ONE document of this type, with the fixed
 * id `site-robots-txt`. The Studio structure (sanity/structure.ts) opens
 * the editor directly to this doc instead of showing a list — editors
 * cannot create additional copies.
 *
 * Common edits:
 *   • Default (live site): `Allow: /` + Sitemap line so search engines
 *     can crawl every public page.
 *   • Block all crawlers: change to `Disallow: /` (e.g., if migrating
 *     content to a new platform or taking the site offline). Also
 *     remember to flip the metadata robots in src/app/layout.tsx for
 *     consistency.
 */
export default defineType({
  name: "robotsTxt",
  title: "robots.txt",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "robots.txt content",
      description:
        "Raw text served at https://drpalsnewme.com/robots.txt. Standard robots.txt syntax — see https://www.robotstxt.org/robotstxt.html for the spec. Changes propagate to the live site within ~60 seconds (the route handler revalidates that often).",
      type: "text",
      rows: 12,
      // Minimal default — allow everything, link the sitemap. Editors
      // can replace this entirely from Studio if they need to block
      // crawlers (e.g., on a staging dataset). Kept short on purpose:
      // robots.txt is a directive file, not a place for commentary.
      initialValue:
        "User-agent: *\n" +
        "Allow: /\n" +
        "\n" +
        "Sitemap: https://drpalsnewme.com/sitemap.xml\n",
      validation: (r) =>
        r.required().custom((value) => {
          if (!value || typeof value !== "string") return "Content is required";
          if (!/User-agent:/i.test(value)) return "Should include at least one 'User-agent:' line";
          return true;
        }),
    }),
    defineField({
      name: "lastEditedBy",
      title: "Last edited by",
      description: "Optional: who made the most recent change, for audit purposes.",
      type: "string",
    }),
    defineField({
      name: "note",
      title: "Internal note",
      description:
        "Why was this last changed? Examples: 'Site launched — opened indexing', 'Blocked staging.drpalsnewme.com subpath'. Not shown to visitors.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      const firstLine = typeof content === "string"
        ? content.split("\n").find((l) => l.trim() && !l.trim().startsWith("#")) ?? "(empty)"
        : "(empty)";
      return {
        title: "robots.txt",
        subtitle: firstLine.slice(0, 80),
      };
    },
  },
});
