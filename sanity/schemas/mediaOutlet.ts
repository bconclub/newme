import { defineField, defineType } from "sanity";

/**
 * Media outlet — reusable record for a publication where Dr. Pal /
 * NewME has been featured. One outlet can be referenced by many
 * `mediaMention` documents so logos and brand details are entered once.
 *
 * Examples: "Forbes", "The Hindu", "Vogue", "Lancet", "TechCrunch".
 *
 * Editors should add a new outlet here BEFORE creating a Media Mention
 * that references it.
 */
export default defineType({
  name: "mediaOutlet",
  title: "Media Outlet",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Outlet name",
      description: "Display name shown next to the logo on /media cards.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Used internally for sorting/grouping. Not shown to readers.",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Outlet brand logo. Prefer a transparent PNG/SVG. Will appear on the /media card.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Accessibility text — usually the outlet name.",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "website",
      title: "Outlet website",
      description: "Optional homepage of the publication (NOT the article URL — that goes on the Media Mention).",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
