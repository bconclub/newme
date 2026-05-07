import type { StructureBuilder } from "sanity/structure";

/**
 * Custom Studio sidebar structure.
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
 *   • Site
 *     └ Redirects
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

      S.divider(),

      // ── Site operations ─────────────────────────────────────────────
      S.listItem()
        .title("Site")
        .icon(() => "⚙️")
        .child(
          S.list()
            .title("Site")
            .items([
              S.documentTypeListItem("redirect").title("Redirects"),
            ])
        ),
    ]);
