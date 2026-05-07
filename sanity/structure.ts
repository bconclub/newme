import type { StructureBuilder } from "sanity/structure";

/**
 * Custom Studio sidebar structure.
 *
 * Default `structureTool()` lists every document type in flat alphabetical
 * order. Here we group related items under category folders so editors can
 * find content faster and the sidebar reflects the v2 schema layout
 * (see docs/sanity-schemas.md).
 *
 * Order (top to bottom):
 *   • Content
 *     ├ Media          ← Media Mentions + Media Outlets together
 *     ├ Blog Posts
 *     ├ FAQs
 *     └ Testimonials
 *   • People
 *     ├ Authors
 *     └ Team Members
 */
export const customStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // ── Content group ───────────────────────────────────────────────
      S.listItem()
        .title("Media")
        .icon(() => "📰")
        .child(
          S.list()
            .title("Media")
            .items([
              S.documentTypeListItem("mediaMention").title("Media Mentions"),
              S.documentTypeListItem("mediaOutlet").title("Media Outlets"),
            ])
        ),
      S.documentTypeListItem("post").title("Blog Posts").icon(() => "📝"),
      S.documentTypeListItem("faq").title("FAQs").icon(() => "❓"),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(() => "💬"),

      S.divider(),

      // ── People group ────────────────────────────────────────────────
      S.listItem()
        .title("People")
        .icon(() => "👥")
        .child(
          S.list()
            .title("People")
            .items([
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("teamMember").title("Team Members"),
            ])
        ),
    ]);
