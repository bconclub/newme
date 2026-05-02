import { defineField, defineType } from "sanity";

/**
 * Media article — structured editorial piece with a hero image, an intro,
 * a section heading + lead, and a numbered list of items (habits/steps/etc.)
 * followed by an optional disclaimer.
 *
 * Distinct from `post` (which uses free-form Portable Text) so editors can
 * fill the same visual layout the design uses without wrestling with rich
 * text. Renders via /media/[slug].
 */
export default defineType({
  name: "article",
  title: "Media Article",
  type: "document",
  fields: [
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
      name: "summary",
      title: "Card summary",
      description: "One-line teaser used on the /media listing card.",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      description: "Lead paragraph shown under the article title.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      description: "Author location — e.g. 'Bangalore,'",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
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
      name: "heroImage",
      title: "Hero image",
      description: "Featured article image shown under the author meta.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro paragraphs",
      description: "Opening paragraphs shown before the first section heading.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "sectionTitle",
      title: "Section heading",
      description: "Heading shown above the numbered list (e.g. 'Under-eating to lose weight').",
      type: "string",
    }),
    defineField({
      name: "sectionLead",
      title: "Section lead",
      description: "Paragraph between the section heading and the numbered list.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "habits",
      title: "Numbered list",
      description: "Items in the body's numbered list — habits, steps, tips, etc.",
      type: "array",
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
          preview: {
            select: { title: "title", subtitle: "num" },
          },
        },
      ],
    }),
    defineField({
      name: "disclaimer",
      title: "Disclaimer",
      description: "Optional note shown at the bottom of the article body.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "heroImage",
    },
  },
});
