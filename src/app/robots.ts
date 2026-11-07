import type { MetadataRoute } from 'next';
import { siteIndexable, siteUrl } from '@/lib/indexing';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/go/'] },
    sitemap: siteIndexable ? new URL('/sitemap.xml', siteUrl).href : undefined,
  };
}
