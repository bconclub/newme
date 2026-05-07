import { defineField, defineType } from "sanity";

/**
 * Redirect — used by the Next.js middleware (`src/middleware.ts`) to
 * issue 301/302 (308/307) redirects on incoming requests.
 *
 * Edited entirely from Studio. New / changed redirects propagate within
 * ~60 s thanks to the middleware's revalidate cache. Disabled redirects
 * are excluded from the query, so toggling `enabled` is the safe way to
 * temporarily turn one off without losing the record.
 *
 * Common use case: migrating from a previous website — paste the old
 * URL paths in `source` and the new on-site path or external URL in
 * `destination`.
 */
export default defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Old / source path",
      description:
        "Path on the previous site (or the path you no longer want to serve). Must start with '/'. " +
        "Examples: /old-blog/post-name · /services/legacy-page · /contact-us",
      type: "string",
      validation: (r) =>
        r.required().custom((value) => {
          if (!value) return "Required";
          if (!value.startsWith("/")) return "Must start with /";
          if (value === "/") return "Cannot redirect the root /";
          if (value.includes("?") || value.includes("#")) return "Strip query strings and hashes — match the path only";
          return true;
        }),
    }),
    defineField({
      name: "destination",
      title: "New destination",
      description:
        "Where the request should be redirected. Either a relative path on this site (e.g. /blog/new-post) " +
        "or a full external URL (https://example.com/page).",
      type: "string",
      validation: (r) =>
        r.required().custom((value, ctx) => {
          if (!value) return "Required";
          const startsWithSlash = value.startsWith("/");
          const isAbsolute = /^https?:\/\//.test(value);
          if (!startsWithSlash && !isAbsolute) return "Must start with / or with http(s)://";
          if (startsWithSlash && value === (ctx.document?.source as string | undefined)) return "Destination cannot equal source (would create an infinite redirect)";
          return true;
        }),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (301 / 308)",
      description:
        "ON  → 308 Permanent Redirect — passes ~95% of SEO authority. Use when the page has moved for good.\n" +
        "OFF → 307 Temporary Redirect — does NOT transfer SEO authority. Use only for short-term redirects.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      description: "Quick toggle. Disabled redirects are ignored without losing the record.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "note",
      title: "Internal note",
      description:
        "Why does this redirect exist? Examples: 'Migrated from old WordPress site', " +
        "'Renamed slug from launch-2024 to gut-microbiome-explained'. Not shown to visitors.",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { source: "source", destination: "destination", enabled: "enabled", permanent: "permanent" },
    prepare({ source, destination, enabled, permanent }) {
      const arrow = permanent ? "→" : "⇢";
      const status = enabled === false ? " · disabled" : "";
      return {
        title: `${source ?? "(missing source)"} ${arrow} ${destination ?? "(missing destination)"}`,
        subtitle: `${permanent ? "308 Permanent" : "307 Temporary"}${status}`,
      };
    },
  },
  orderings: [
    { title: "Source path A→Z", name: "sourceAsc", by: [{ field: "source", direction: "asc" }] },
    { title: "Recently updated", name: "updatedDesc", by: [{ field: "_updatedAt", direction: "desc" }] },
  ],
});
