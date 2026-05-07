import { defineField, defineType } from "sanity";

/**
 * Media mention — a brand mention / press feature where Dr. Pal or
 * NewMe was covered by an external publication.
 *
 * The /media page renders these as cards. Clicking the card opens the
 * external URL in a new tab. There is NO in-site detail page for a
 * mention (compare with `post`, which is fully authored long-form
 * content with its own /blog/[slug] page).
 */
export default defineType({
  name: "mediaMention",
  title: "Media Mention",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article headline",
      description: "The headline of the press article — shown on the card.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "outlet",
      title: "Outlet",
      description: "Publication that ran the article. Add new outlets under 'Media Outlet' first.",
      type: "reference",
      to: [{ type: "mediaOutlet" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      description: "Card image. Recommended ratio 16:9, minimum 1200×675.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and search engines.",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "External article URL",
      description: "Where the card click takes the user — the full URL of the article on the publication's site.",
      type: "url",
      validation: (r) =>
        r.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description: "Date the article appeared in the publication. Used for ordering on /media.",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Optional 1–2 sentence teaser shown under the headline on the card.",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Published date (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "outlet.name",
      media: "coverImage",
    },
  },
});
