import { defineField, defineType } from "sanity";

/**
 * Blog Post — long-form authored content rendered at /blog/[slug].
 *
 * Has full SEO controls (title/description/OG/canonical/noindex/keywords),
 * a rich Portable Text body, optional structured editorial blocks
 * (intro paragraphs, named section, numbered habit list), and a
 * disclaimer slot. Indexable by search engines once launched.
 */
export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & sharing" },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      description: "Lead paragraph shown under the title.",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Card excerpt",
      description: "Short summary used on the /blog listing card.",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      description: "Hero image at the top of the post and on the /blog listing card. Recommended 16:9, min 1600×900.",
      type: "image",
      options: { hotspot: true },
      group: "content",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      description: "Optional location tag — e.g. 'Bangalore'.",
      type: "string",
      group: "content",
    }),

    // Rich body
    defineField({
      name: "intro",
      title: "Intro paragraphs",
      description: "Opening paragraphs shown before the main body.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "content",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section heading",
      description: "Optional heading shown above the numbered list (e.g. 'Five things to try').",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "sectionLead",
      title: "Section lead",
      description: "Paragraph between the section heading and the numbered list.",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "habits",
      title: "Numbered list",
      description: "Items in the body's numbered list — habits, steps, tips, etc.",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "habit",
          fields: [
            defineField({
              name: "num",
              title: "Number",
              type: "string",
              description: "e.g. '01', '02'",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 4,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "num" } },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body (rich text)",
      description: "Free-form rich content. Use this for posts that don't fit the structured intro/section/habits layout.",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "disclaimer",
      title: "Disclaimer",
      description: "Optional note shown at the bottom of the post.",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "content",
    }),

    // ── SEO ─────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO & social sharing",
      type: "seo",
      group: "seo",
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
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
