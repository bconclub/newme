import { defineField, defineType } from "sanity";

/**
 * Blog Post — long-form authored content rendered at /blog/[slug].
 *
 * Has full SEO controls (title/description/OG/canonical/noindex/keywords),
 * a rich Portable Text body, optional structured editorial blocks
 * (intro paragraphs, named section, numbered habit list), and a
 * disclaimer slot. Indexable by search engines once launched.
 *
 * Layout: a single scrollable form with three fieldsets (Editorial
 * structure / Body / SEO & sharing). Fieldsets are inline collapsibles —
 * unlike groups they're never hidden behind tabs, so editors always see
 * the SEO section by scrolling down.
 */
export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fieldsets: [
    {
      name: "structure",
      title: "Editorial structure",
      description: "Optional structured layout — intro, named section, numbered habits.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "body",
      title: "Body",
      description: "Free-form Portable Text body. Use this when the structured layout above doesn't fit.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seo",
      title: "SEO & social sharing",
      description: "Search engine and social card overrides. Falls back to the post's title / cover image when blank.",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ── Top-level / required ────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      description: "Lead paragraph shown under the title.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "excerpt",
      title: "Card excerpt",
      description: "Short summary used on the /blog listing card.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      description: "Hero image at the top of the post and on the /blog listing card. Recommended 16:9, min 1600×900.",
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      description: "Optional location tag — e.g. 'Bangalore'.",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    // ── Editorial structure (optional, structured layout) ───────────────
    defineField({
      name: "intro",
      title: "Intro paragraphs",
      description: "Opening paragraphs shown before the main body.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      fieldset: "structure",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section heading",
      description: "Optional heading shown above the numbered list (e.g. 'Five things to try').",
      type: "string",
      fieldset: "structure",
    }),
    defineField({
      name: "sectionLead",
      title: "Section lead",
      description: "Paragraph between the section heading and the numbered list.",
      type: "text",
      rows: 4,
      fieldset: "structure",
    }),
    defineField({
      name: "habits",
      title: "Numbered list",
      description: "Items in the body's numbered list — habits, steps, tips, etc.",
      type: "array",
      fieldset: "structure",
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

    // ── Body (rich text) ────────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Body (rich text)",
      description: "Free-form rich content. Use this for posts that don't fit the structured layout.",
      type: "array",
      fieldset: "body",
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
      fieldset: "body",
    }),

    // ── SEO & social sharing ────────────────────────────────────────────
    // Inlined directly (not via the reusable seo object) so editors see
    // every field flat under the fieldset, no extra "click-to-expand"
    // step. Mirrors `sanity/schemas/seo.ts` field-for-field.
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Title shown in Google search results and the browser tab. Falls back to the post title.",
      validation: (r) => r.max(70).warning("Aim for roughly 50-60 characters."),
      fieldset: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Search result summary. Falls back to excerpt → subtitle.",
      validation: (r) => r.max(170).warning("Aim for roughly 140-160 characters."),
      fieldset: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "Optional. Use only when this page should point search engines to another URL.",
      fieldset: "seo",
    }),
    defineField({
      name: "ogTitle",
      title: "OpenGraph title",
      type: "string",
      description: "Social sharing title. Falls back to meta title → post title.",
      validation: (r) => r.max(95).warning("Shorter usually shares better."),
      fieldset: "seo",
    }),
    defineField({
      name: "ogDescription",
      title: "OpenGraph description",
      type: "text",
      rows: 3,
      description: "Social sharing description. Falls back to meta description.",
      validation: (r) => r.max(200).warning("Shorter usually shares better."),
      fieldset: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "OpenGraph image",
      type: "image",
      description: "Image used when this post is shared. Recommended 1200 × 630.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      fieldset: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Adds noindex/nofollow for this page after the global pre-launch block is removed.",
      initialValue: false,
      fieldset: "seo",
    }),
    defineField({
      name: "keywords",
      title: "Keyword tags",
      type: "array",
      description: "Internal SEO taxonomy tags. These are not shown on the page.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      fieldset: "seo",
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
