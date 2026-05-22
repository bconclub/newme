import type { StructureBuilder } from "sanity/structure";
import {
  MediaIcon,
  BlogIcon,
  FaqIcon,
  PagesIcon,
  TestimonialIcon,
  PeopleIcon,
  SiteIcon,
} from "./icons";

/**
 * Custom Studio sidebar structure.
 *
 * Icons are solid SVG components (sanity/icons.tsx) — replaced the
 * previous emoji set which read as childish next to a real CMS.
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
        .icon(MediaIcon)
        .child(
          S.list()
            .title("Media")
            .items([
              S.documentTypeListItem("mediaMention").title("Media Mentions"),
              S.documentTypeListItem("mediaOutlet").title("Media Outlets"),
            ])
        ),
      S.documentTypeListItem("post").title("Blog Posts").icon(BlogIcon),
      S.listItem()
        .title("Pages")
        .icon(PagesIcon)
        .child(
          S.documentList()
            .title("Pages")
            .filter('_type == "page"')
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),
      S.documentTypeListItem("faq").title("FAQs").icon(FaqIcon),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(TestimonialIcon),

      S.divider(),

      // ── People group ────────────────────────────────────────────────
      S.listItem()
        .title("People")
        .icon(PeopleIcon)
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
        .icon(SiteIcon)
        .child(
          S.list()
            .title("Site")
            .items([
              S.documentTypeListItem("redirect").title("Redirects"),
              // robots.txt and llms.txt are singletons — exactly one document
              // of each type, opened directly into its editor (no list view,
              // no "create new" affordance). The fixed document IDs match
              // what the route handlers query for.
              S.listItem()
                .title("robots.txt")
                .child(
                  S.editor()
                    .id("robotsTxt")
                    .schemaType("robotsTxt")
                    .documentId("site-robots-txt")
                ),
              S.listItem()
                .title("llms.txt")
                .child(
                  S.editor()
                    .id("llmsTxt")
                    .schemaType("llmsTxt")
                    .documentId("site-llms-txt")
                ),
            ])
        ),
    ]);
