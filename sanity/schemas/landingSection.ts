import { defineField, defineType } from "sanity";

export default defineType({
  name: "landingSection",
  title: "Landing Section",
  type: "document",
  fields: [
    defineField({
      name: "sectionKey",
      title: "Section key",
      type: "string",
      description: "Stable identifier the site uses to look up this section.",
      options: {
        list: [
          { title: "Structured Care", value: "structuredCare" },
          { title: "Stats", value: "stats" },
          { title: "Pathways", value: "pathways" },
          { title: "How It Works", value: "howItWorks" },
          { title: "Virtual Clinic", value: "virtualClinic" },
          { title: "Research Lab", value: "researchLab" },
          { title: "Footer CTA", value: "footerCta" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "items",
      title: "Items",
      description: "Repeatable items (cards, stats, steps, etc.) — usage depends on section.",
      type: "array",
      of: [
        {
          type: "object",
          name: "item",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "value", title: "Value", type: "string", description: "For stats / numeric items." }),
            defineField({ name: "icon", title: "Icon", type: "image", options: { hotspot: true } }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "value" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "sectionKey" },
  },
});
