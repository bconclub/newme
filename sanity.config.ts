import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./sanity/schemas";
import { customStructure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.SANITY_API_VERSION || "2024-10-01";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://drpalsnewme.com").replace(/\/$/, "");

/**
 * Map a Sanity document to its live URL on the marketing site.
 * Used by Studio's "Open in production" action.
 *
 * - `mediaMention` documents have NO in-site detail page — they link
 *   directly to the publication's external URL. We point editors at
 *   /media (the listing) so they can confirm the card renders.
 * - `mediaOutlet` is a reference-only document; no public page.
 * - `post` opens at /blogs/{slug}.
 * - `teamMember` opens at /team because the public site currently has
 *   one team listing, not individual profile pages.
 */
function pathForDocument(document?: { _type?: string; slug?: { current?: string } }) {
  if (!document) return undefined;

  if (document._type === "mediaMention") {
    return "/media";
  }

  if (document._type === "post" && document.slug?.current) {
    return `/blogs/${document.slug.current}`;
  }

  if (document._type === "teamMember") {
    return "/team";
  }

  return undefined;
}

// Singleton document types — exactly one document of each type exists,
// edited from a fixed entry under "Site". We hide them from global "New
// document" templates AND strip Duplicate/Delete actions so editors
// can't accidentally create dupes or wipe them out.
const SINGLETONS = new Set(["robotsTxt", "llmsTxt"]);

export default defineConfig({
  name: "default",
  title: "NewME",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Prevent singletons from appearing in the global "create new" template list.
    templates: (prev) => prev.filter((t) => !SINGLETONS.has(t.schemaType)),
  },
  plugins: [
    structureTool({ structure: customStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    productionUrl: async (prev, { document }) => {
      const path = pathForDocument(document);
      return path ? `${siteUrl}${path}` : prev;
    },
    // For singleton types, strip the actions that could break the
    // "exactly one doc with a fixed id" assumption: duplicate, delete,
    // unpublish. Publish + edit + restore are preserved.
    actions: (prev, ctx) => {
      if (SINGLETONS.has(ctx.schemaType)) {
        return prev.filter(
          (a) => !["duplicate", "delete", "unpublish"].includes(a.action ?? ""),
        );
      }
      return prev;
    },
  },
});
