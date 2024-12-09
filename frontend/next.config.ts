import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin(
  './src/modules/i18n/request.ts'
);

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/summary',
        permanent: true,
      },
    ]
  },
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

};

export default withNextIntl(nextConfig);
