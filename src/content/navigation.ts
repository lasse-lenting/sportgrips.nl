import { gripPages, replacementPages, sportHubs, labelForPath } from './grips';

export type NavigationLink = { title: string; href: string };
export type NavigationGroup = { title: string; href?: string; links: NavigationLink[] };
export type NavigationItem = NavigationLink & { groups?: NavigationGroup[] };

const links = (pages: typeof gripPages): NavigationLink[] =>
  pages.map((p) => ({ title: labelForPath(p.path), href: p.path }));

// Menu placement stays independent of URL ancestry. Only labels/URLs reach the client.
export const navigation: NavigationItem[] = [
  ...sportHubs.map((hub) => {
    const children = gripPages.filter((p) => p.parent === hub.path && p.kind !== 'guide');
    const groups: NavigationGroup[] = [
      { title: 'Typen en maat', links: links(children.filter((p) => p.kind === 'category')) },
      { title: 'Merken', links: links(children.filter((p) => p.kind === 'brand')) },
      {
        title: 'Maatvarianten',
        links: links(gripPages.filter((p) => p.parent === `${hub.path}maat/`)),
      },
    ].filter((group) => group.links.length > 0);
    return { title: labelForPath(hub.path), href: hub.path, groups };
  }),
  {
    title: 'Gripkennis',
    href: '/kennis/',
    groups: [
      {
        title: 'Gripkeuze en onderhoud',
        href: '/kennis/',
        links: links(gripPages.filter((p) => p.parent === '/kennis/')),
      },
      {
        title: 'Grips vervangen',
        href: '/kennis/#grips-vervangen',
        links: links(replacementPages),
      },
      {
        title: 'Grips vergelijken',
        href: '/vergelijken/',
        links: links(gripPages.filter((p) => p.parent === '/vergelijken/')),
      },
    ],
  },
];
