/**
 * Solid SVG icons for the Sanity Studio sidebar.
 *
 * Replaces the previous emoji icons (📰 📝 ❓ 💬 👥 ⚙️) which read as
 * childish next to a real CMS. These are 24×24 stroke-style icons —
 * same visual language as lucide / heroicons so the sidebar feels like
 * a professional admin tool.
 *
 * Each component is a tiny pure SVG; no library dependency. Sized via
 * `1em` so they pick up the surrounding font-size set by Sanity Studio.
 */
import type { SVGProps } from 'react'

const baseProps: SVGProps<SVGSVGElement> = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// Newspaper — for "Media".
export function MediaIcon() {
  return (
    <svg {...baseProps}>
      <rect x="2" y="4" width="16" height="16" rx="1.5" />
      <path d="M18 8h3v9.5a2.5 2.5 0 0 1-2.5 2.5h0" />
      <line x1="6" y1="9" x2="14" y2="9" />
      <line x1="6" y1="13" x2="14" y2="13" />
      <line x1="6" y1="17" x2="11" y2="17" />
    </svg>
  )
}

// Pencil writing on a page — for "Blog Posts".
export function BlogIcon() {
  return (
    <svg {...baseProps}>
      <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M14 4v5h5" />
      <path d="M8 14l3.2-3.2a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L11 17H8v-3z" />
    </svg>
  )
}

// Speech bubble with question mark — for "FAQs".
export function FaqIcon() {
  return (
    <svg {...baseProps}>
      <path d="M21 12a8 8 0 1 1-3.2-6.4" />
      <path d="M3 21l1.5-4.5" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.4" />
      <circle cx="12" cy="16.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Quote marks — for "Testimonials".
export function TestimonialIcon() {
  return (
    <svg {...baseProps}>
      <path d="M5 9.5C5 7 7 5 9.5 5h0L8 9h2.5v6H4V9.5z" />
      <path d="M14 9.5C14 7 16 5 18.5 5h0L17 9h2.5v6H13V9.5z" />
    </svg>
  )
}

// Two figures — for "People".
export function PeopleIcon() {
  return (
    <svg {...baseProps}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M16 14.5c2.7 0 5 2 5 4.5" />
    </svg>
  )
}

// Cog — for "Site".
export function SiteIcon() {
  return (
    <svg {...baseProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 14.5a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.1a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.1a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.1a1 1 0 0 0-.9.6z" />
    </svg>
  )
}
