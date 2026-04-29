import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero (singleton)",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the headline.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subhead",
      title: "Subhead",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "eyebrow", media: "backgroundImage" },
  },
});
