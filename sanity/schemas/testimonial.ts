import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "personName",
      title: "Person name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "personRole",
      title: "Person role",
      type: "string",
    }),
    defineField({
      name: "personAvatar",
      title: "Person avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "personName", subtitle: "personRole", media: "personAvatar" },
  },
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
