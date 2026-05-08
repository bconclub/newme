import type { StructureBuilder } from "sanity/structure";
import {
  MediaIcon,
  BlogIcon,
  FaqIcon,
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
            ])
        ),
    ]);
