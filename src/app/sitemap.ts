import type { MetadataRoute } from 'next';
import { gripPages, collections } from '@/content/grips';
import { absoluteUrl, siteIndexable } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];
  return [
    '/',
    '/keuzehulp/',
    '/over-sportgrips/',
    '/privacy/',
    ...collections.map((p) => p.path),
    ...gripPages.map((p) => p.path),
  ].map((path) => ({ url: absoluteUrl(path) }));
}
