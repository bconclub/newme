import type { SchemaTypeDefinition } from "sanity";

import author from "./author";
import faq from "./faq";
import llmsTxt from "./llmsTxt";
import mediaMention from "./mediaMention";
import mediaOutlet from "./mediaOutlet";
import page from "./page";
import post from "./post";
import redirect from "./redirect";
import robotsTxt from "./robotsTxt";
import seo from "./seo";
import teamMember from "./teamMember";
import testimonial from "./testimonial";

/**
 * Schema registry. Order here drives the order in the Studio sidebar.
 *
 * `seo` is a reusable object embedded inside other schemas, so it's
 * registered first. Document types follow.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable object types
  seo,

  // Content
  mediaMention,
  mediaOutlet,
  page,
  post,

  // Reusable people / FAQ
  author,
  testimonial,
  teamMember,
  faq,

  // Site operations
  redirect,
  robotsTxt,
  llmsTxt,
];
