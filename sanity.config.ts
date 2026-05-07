import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./sanity/schemas";
import { customStructure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.SANITY_API_VERSION || "2024-10-01";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://newme-web.vercel.app").replace(/\/$/, "");

/**
 * Map a Sanity document to its live URL on the marketing site.
 * Used by Studio's "Open in production" action.
 *
 * - `mediaMention` documents have NO in-site detail page — they link
 *   directly to the publication's external URL. We point editors at
 *   /media (the listing) so they can confirm the card renders.
 * - `mediaOutlet` is a reference-only document; no public page.
 * - `post` opens at /blog/{slug}.
 * - `teamMember` opens at /care-team/{slug} (route in progress).
 */
function pathForDocument(document?: { _type?: string; slug?: { current?: string } }) {
  if (!document) return undefined;

  if (document._type === "mediaMention") {
    return "/media";
  }

  if (document._type === "post" && document.slug?.current) {
    return `/blog/${document.slug.current}`;
  }

  if (document._type === "teamMember" && document.slug?.current) {
    return `/care-team/${document.slug.current}`;
  }

  return undefined;
}

export default defineConfig({
  name: "default",
  title: "NewME",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure: customStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    productionUrl: async (prev, { document }) => {
      const path = pathForDocument(document);
      return path ? `${siteUrl}${path}` : prev;
    },
  },
});
