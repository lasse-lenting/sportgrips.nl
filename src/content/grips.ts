import data from './grips.json';
export type GripPage = {
  path: string;
  title: string;
  description: string;
  summary: string;
  kind: string;
  parent: string | null;
  image: string;
  tags: string[];
  sections: { heading: string; paragraphs: string[] }[];
  related: string[];
  sources: { name: string; url: string }[];
  table: { headings: string[]; rows: string[][] } | null;
};
export const gripPages = data as GripPage[];
export const sportHubs = gripPages.filter((p) => p.kind === 'hub');
export const pageByPath = (path: string) => gripPages.find((p) => p.path === path);
export const collections = [
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
    pages: gripPages.filter((p) => p.path.startsWith('/kennis/')),
  },
  {
    path: '/vergelijken/',
    title: 'Grips vergelijken op eigenschappen',
    description: 'Vergelijk functie, laagopbouw en gevoel voordat je een andere grip kiest.',
    pages: gripPages.filter((p) => p.path.startsWith('/vergelijken/')),
  },
];
export const labelForPath = (path: string) =>
  pageByPath(path)?.title.split(':')[0] ??
  collections.find((p) => p.path === path)?.title ??
  'SPORTGRIPS';
