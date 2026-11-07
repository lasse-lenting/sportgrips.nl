import type { Metadata } from 'next';
import { photo, photoAlt } from '@/content/media';
import { siteUrl } from './indexing';

export { siteUrl, siteIndexable } from './indexing';
export const siteName = 'Sportgrips';

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

/** Consistent title, description, canonical, Open Graph and Twitter metadata for one page. */
export function pageMetadata({
  title,
  description,
  path,
  image = photo('hero'),
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const images = [{ url: image, alt: photoAlt(image) }];
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type,
      locale: 'nl_NL',
      siteName,
      url: absoluteUrl(path),
      title,
      description,
      images,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: images.map((item) => item.url),
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
