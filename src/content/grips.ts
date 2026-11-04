import data from './grips.json';
export type GripLink = { title: string; href: string; description?: string };
export type GripTable = { headings: string[]; rows: string[][] };
export type GripPage = {
  path: string;
  title: string;
  description: string;
  summary: string;
  kind: string;
  menuLabel?: string;
  parent: string | null;
  image: string;
  tags: string[];
  sections: { heading: string; paragraphs: string[]; links?: GripLink[] }[];
  products?: string[];
  related: string[];
  sources: { name: string; url: string }[];
  table: GripTable | null;
};
export const gripPages = data as GripPage[];
export const sportHubs = gripPages.filter((p) => p.kind === 'hub');
export const pageByPath = (path: string) => gripPages.find((p) => p.path === path);
export const replacementPages = gripPages.filter((p) => p.path.endsWith('/vervangen/'));
export type GripCollection = {
  path: string;
  title: string;
  description: string;
  pages: GripPage[];
  groups?: { id: string; title: string; pages: GripPage[] }[];
};
export const collections: GripCollection[] = [
  {
    path: '/grips/',
    title: 'Sportgrips per sport',
    description:
      'Begin bij jouw sport en vergelijk de eigenschappen die bij jouw gripkeuze passen.',
    pages: sportHubs,
  },
  {
    path: '/kennis/',
    title: 'Gripkennis: lagen, onderhoud en gevoel',
    description: 'Begrijp het verschil tussen griptypen en lees hoe je sportgrips onderhoudt.',
    pages: [...gripPages.filter((p) => p.path.startsWith('/kennis/')), ...replacementPages],
    groups: [
      {
        id: 'gripkeuze-en-onderhoud',
        title: 'Gripkeuze en onderhoud',
        pages: gripPages.filter((p) => p.parent === '/kennis/'),
      },
      { id: 'grips-vervangen', title: 'Grips vervangen per sport', pages: replacementPages },
    ],
  },
  {
    path: '/vergelijken/',
    title: 'Grips vergelijken op eigenschappen',
    description: 'Vergelijk functie, laagopbouw en gevoel voordat je een andere grip kiest.',
    pages: gripPages.filter((p) => p.path.startsWith('/vergelijken/')),
  },
  {
    path: '/blog/',
    title: 'Sportgrips blog: gripkeuze in de praktijk',
    description:
      'Lees achtergrond bij je gripkeuze en vind de passende vergelijking voor jouw racket, club of stick.',
    pages: gripPages.filter((p) => p.parent === '/blog/'),
  },
];
export const labelForPath = (path: string) =>
  pageByPath(path)?.menuLabel ??
  pageByPath(path)?.title.split(':')[0] ??
  collections.find((p) => p.path === path)?.title ??
  'Sportgrips';

// URL hierarchy stays independent from placement in the navigation.
export function pageBreadcrumbs(page: GripPage): { name: string; path: string }[] {
  const parents = page.parent
    ? pageByPath(page.parent)
      ? pageBreadcrumbs(pageByPath(page.parent)!)
      : [
          { name: 'Home', path: '/' },
          { name: labelForPath(page.parent), path: page.parent },
        ]
    : [{ name: 'Home', path: '/' }];
  return [...parents, { name: labelForPath(page.path), path: page.path }];
}
