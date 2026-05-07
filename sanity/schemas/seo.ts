import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Title shown in search results and browser previews. Falls back to the page title.",
      validation: (r) => r.max(70).warning("Aim for roughly 50-60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Search result summary. Falls back to subtitle/excerpt where available.",
      validation: (r) => r.max(170).warning("Aim for roughly 140-160 characters."),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "Optional. Use only when this page should point search engines to another canonical URL.",
    }),
    defineField({
      name: "ogTitle",
      title: "OpenGraph title",
      type: "string",
      description: "Social sharing title. Falls back to meta title/page title.",
      validation: (r) => r.max(95).warning("Shorter usually shares better."),
    }),
    defineField({
      name: "ogDescription",
      title: "OpenGraph description",
      type: "text",
      rows: 3,
      description: "Social sharing description. Falls back to meta description.",
      validation: (r) => r.max(200).warning("Shorter usually shares better."),
    }),
    defineField({
      name: "ogImage",
      title: "OpenGraph image",
      type: "image",
      description: "Image used when this page is shared. Recommended ratio: 1200 x 630.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Adds noindex/nofollow for this page after the global pre-launch block is removed.",
      initialValue: false,
    }),
    defineField({
      name: "keywords",
      title: "Keyword tags",
      type: "array",
      description: "Internal SEO taxonomy tags. These are not shown on the page.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
