import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read the noindex meta tag and HTTP header.
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/go/'] } };
}
