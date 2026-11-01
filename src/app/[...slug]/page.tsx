import { notFound } from 'next/navigation';
import { gripPages, collections } from '@/content/grips';
import { GripDetail, GripListing, GripHelperPage } from '@/components/grip-pages';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
const pathFor = (slug: string[]) => `/${slug.join('/')}/`;
export const dynamicParams = false;
export function generateStaticParams() {
  return [...gripPages, ...collections, { path: '/keuzehulp/' }].map((p) => ({
    slug: p.path.split('/').filter(Boolean),
  }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = pathFor((await params).slug);
  const p =
    gripPages.find((p) => p.path === path) ??
    collections.find((p) => p.path === path) ??
    (path === '/keuzehulp/'
      ? {
          title: 'Welke grip past bij mij? Gebruik de keuzehulp',
          description:
            'Beantwoord vijf vragen en vind uitleg over sportgrips die aansluit bij jouw sport, griplaag en voorkeuren.',
        }
      : undefined);
  if (!p) return { title: 'Pagina niet gevonden', robots: { index: false, follow: true } };
  return pageMetadata({
    title: p.title,
    description: p.description,
    path,
    image: 'image' in p ? p.image : undefined,
  });
}
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = pathFor((await params).slug);
  const p = gripPages.find((p) => p.path === path);
  const c = collections.find((p) => p.path === path);
  if (!p && !c && path !== '/keuzehulp/') notFound();
  const title = p?.title ?? c?.title ?? 'Welke grip past bij mij?';
  const parent = p?.parent;
  const parentTitle =
    gripPages.find((p) => p.path === parent)?.title ??
    collections.find((p) => p.path === parent)?.title;
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(parent && parentTitle ? [{ name: parentTitle, path: parent }] : []),
    { name: title, path },
  ];
  return (
    <>
      {p ? <GripDetail page={p} /> : c ? <GripListing {...c} /> : <GripHelperPage />}
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': p
            ? p.kind === 'guide'
              ? 'Article'
              : 'WebPage'
            : c
              ? 'CollectionPage'
              : 'WebPage',
          '@id': absoluteUrl(`${path}#content`),
          name: title,
          ...(p?.kind === 'guide'
            ? { headline: title, author: { '@id': absoluteUrl('/#organization') } }
            : {}),
          description: p?.description ?? c?.description ?? 'Keuzehulp voor sportgrips',
          url: absoluteUrl(path),
          inLanguage: 'nl-NL',
          isPartOf: { '@id': absoluteUrl('/#website') },
        }}
      />
    </>
  );
}
