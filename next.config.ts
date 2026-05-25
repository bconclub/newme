import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Zoho payment success lands on /?zoho_payment=success — forward to
        // the assessment SPA where the handler actually lives.
        source: '/',
        has: [{ type: 'query', key: 'zoho_payment', value: 'success' }],
        destination: '/assessment?zoho_payment=success',
        permanent: false,
      },
      {
        // Rebranded the page from "Virtual Clinic" to "Virtual Consult"
        // (text + URL). Old URL preserved as a 308 so any external
        // backlinks, Google index, or shared links keep working.
        // Code-level redirect (not Sanity) because this is a permanent
        // URL change tied to the codebase, not an editorial decision.
        source: '/virtual-clinic',
        destination: '/virtual-consult',
        permanent: true,
      },
      {
        // Renamed the blog section from /blog → /blogs (plural reads more
        // naturally for a multi-post index). Both the index AND individual
        // post URLs need to redirect — splitting into two rules so the
        // exact match for /blog also covers (otherwise the wildcard would
        // accidentally consume bare /blog requests too).
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/blogs/:slug*',
        permanent: true,
      },
    ]
  },
  // headers() removed at launch (2026-05-23) — used to send a global
  // X-Robots-Tag: noindex, nofollow header on every response as one of
  // the three pre-launch indexing-block layers. Now that the site is
  // live and ready for SEO, search engines should be able to crawl.
  // The other two layers (robots.txt via Sanity + robots metadata in
  // src/app/layout.tsx) were also opened up at the same time.
};

export default nextConfig;
