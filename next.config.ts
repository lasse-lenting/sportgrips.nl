import type { NextConfig } from 'next';
import { siteIndexable, siteUrl } from './src/lib/indexing';

const canonicalHost = new URL(siteUrl).hostname.replaceAll('.', '\\.');

const config: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'media.s-bol.com', search: '' }],
  },
  async redirects() {
    return [{ source: '/blog/', destination: '/kennis/', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        missing: siteIndexable ? [{ type: 'host', value: canonicalHost }] : undefined,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },
};
export default config;
