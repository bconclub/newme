import type { SchemaTypeDefinition } from "sanity";

import author from "./author";
import faq from "./faq";
import hero from "./hero";
import landingSection from "./landingSection";
import post from "./post";
import teamMember from "./teamMember";
import testimonial from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  testimonial,
  teamMember,
  faq,
  hero,
  landingSection,
];
