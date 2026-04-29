import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    "author": author->{ name, role, avatar }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    body,
    tags,
    "author": author->{ name, role, avatar, bio }
  }
`;

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

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const heroQuery = groq`
  *[_type == "hero"][0] {
    eyebrow,
    headline,
    subhead,
    ctaLabel,
    ctaHref,
    backgroundImage
  }
`;

export const landingSectionQuery = groq`
  *[_type == "landingSection" && sectionKey == $key][0] {
    sectionKey,
    eyebrow,
    heading,
    body,
    items
  }
`;
