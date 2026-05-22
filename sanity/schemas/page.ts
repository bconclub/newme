import { defineField, defineType } from "sanity";

/**
 * Page — SEO & metadata overrides for every hardcoded marketing route.
 *
 * Editors pick the route from a fixed list (no free-form slugs) and fill
 * in the SEO fieldset. The Next.js page components read this document at
 * build / request time and merge it into their <Metadata> export.
 *
 * One document per route. Validation prevents duplicate entries.
 */
export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fieldsets: [
    {
      name: "seo",
      title: "SEO & social sharing",
      description: "Search engine and social card overrides for this page.",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ── Identity ────────────────────────────────────────────────────────
    defineField({
      name: "route",
      title: "Page / Route",
      type: "string",
      description: "The URL path this entry controls. One entry per route.",
      options: {
        list: [
          { title: "Home  (/)", value: "/" },
          { title: "How It Works  (/how-it-works)", value: "/how-it-works" },
          { title: "Pathways  (/pathways)", value: "/pathways" },
          { title: "Pathway — Metabolic  (/pathways/metabolic)", value: "/pathways/metabolic" },
          { title: "Pathway — GI  (/pathways/gi)", value: "/pathways/gi" },
          { title: "Pathway — Continuity  (/pathways/continuity)", value: "/pathways/continuity" },
          { title: "Virtual Consult  (/virtual-consult)", value: "/virtual-consult" },
          { title: "Research Lab  (/research-lab)", value: "/research-lab" },
          { title: "Team  (/team)", value: "/team" },
          { title: "Contact  (/contact)", value: "/contact" },
          { title: "FAQ  (/faq)", value: "/faq" },
          { title: "Media  (/media)", value: "/media" },
          { title: "Blog  (/blogs)", value: "/blogs" },
          { title: "Terms  (/terms)", value: "/terms" },
          { title: "Cookie Policy  (/cookie-policy)", value: "/cookie-policy" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),

    // ── Display order (set programmatically; hidden from editors) ────────
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in the Studio list. Set automatically.",
      hidden: true,
      initialValue: 50,
    }),

    // ── Hero / OG image ─────────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero / OG image",
      description: "Primary image for this page — used as the OpenGraph share image if no override is set below. Recommended 1200 × 630.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),

    // ── SEO & social sharing ─────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Title shown in Google results and the browser tab. ~50-60 characters ideal.",
      validation: (r) => r.max(70).warning("Aim for roughly 50-60 characters."),
      fieldset: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Search result summary. ~140-160 characters.",
      validation: (r) => r.max(170).warning("Aim for roughly 140-160 characters."),
      fieldset: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
      description: "Optional. Only needed when this page should point to a different canonical URL.",
      fieldset: "seo",
    }),
    defineField({
      name: "ogTitle",
      title: "OpenGraph title",
      type: "string",
      description: "Social sharing title. Falls back to meta title.",
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
      title: "OpenGraph image override",
      type: "image",
      description: "Overrides the hero image for social sharing only. Recommended 1200 × 630.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
      fieldset: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Adds noindex / nofollow after the global pre-launch block is removed.",
      initialValue: false,
      fieldset: "seo",
    }),
    defineField({
      name: "keywords",
      title: "Keyword tags",
      type: "array",
      description: "Internal SEO tags — not rendered on the page.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      fieldset: "seo",
    }),
  ],

  preview: {
    select: { title: "route", media: "heroImage" },
    prepare({ title, media }) {
      return {
        title: title ?? "Untitled page",
        media,
      };
    },
  },
});
