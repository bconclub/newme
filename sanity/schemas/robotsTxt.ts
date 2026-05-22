import { defineField, defineType } from "sanity";

/**
 * robots.txt — singleton document, edited entirely from Studio.
 *
 * The Next.js route handler at `src/app/robots.txt/route.ts` fetches
 * this document on every request (cached ~60s) and serves the `content`
 * field as the response body. If the doc is missing or Sanity is
 * unreachable, the handler falls back to "User-agent: * / Disallow: /"
 * (safe default — keeps the site noindexed).
 *
 * Singleton: there is exactly ONE document of this type, with the fixed
 * id `site-robots-txt`. The Studio structure (sanity/structure.ts) opens
 * the editor directly to this doc instead of showing a list — editors
 * cannot create additional copies.
 *
 * Common edits:
 *   • Pre-launch: keep as `Disallow: /` to block all crawlers.
 *   • Launch day: change to `Allow: /` (and remember to also flip the
 *     X-Robots-Tag header in next.config.ts + the metadata robots in
 *     src/app/layout.tsx — three-layer block).
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
      // Sensible pre-launch default: block everything.
      initialValue:
        "# Pre-launch — all crawlers blocked.\n" +
        "# To allow indexing at launch, replace 'Disallow: /' with 'Allow: /'\n" +
        "# AND remove the X-Robots-Tag header from next.config.ts\n" +
        "# AND set robots: { index: true, follow: true } in src/app/layout.tsx.\n" +
        "\n" +
        "User-agent: *\n" +
        "Disallow: /\n",
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
