import { groq } from "next-sanity";

// ── Media mentions ────────────────────────────────────────────────────────
// Press features / brand mentions. Each card opens an external URL.
// No in-site detail page — only a listing query is needed.

export const mediaMentionsQuery = groq`
  *[_type == "mediaMention"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    publishedAt,
    externalUrl,
    coverImage,
    "outlet": outlet->{
      _id,
      name,
      "slug": slug.current,
      logo,
      website
    }
  }
`;

// ── Blog posts ────────────────────────────────────────────────────────────
// Long-form authored content. Full SEO + structured editorial fields.

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    excerpt,
    publishedAt,
    city,
    coverImage,
    tags,
    "author": author->{ name, role, avatar }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    excerpt,
    publishedAt,
    city,
    coverImage,
    intro,
    sectionTitle,
    sectionLead,
    habits,
    body,
    disclaimer,
    tags,
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      noIndex,
      keywords
    },
    "author": author->{ name, role, avatar, bio }
  }
`;

// ── Testimonials / Team / FAQs ────────────────────────────────────────────

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    personName,
    personRole,
    personAvatar
  }
`;

export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    photo,
    bio
  }
`;

export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    role,
    photo,
    bio
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;
