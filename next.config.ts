import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
