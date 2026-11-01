import { gripPages, sportHubs } from './grips';

export type NavigationLink = { title: string; href: string };
export type NavigationGroup = NavigationLink & { links: NavigationLink[] };
export type NavigationItem = NavigationLink & { groups?: NavigationGroup[] };

const sportNames: Record<string, string> = {
  '/golfgrips/': 'Golfgrips',
  '/tennisgrips/': 'Tennisgrips',
  '/padelgrips/': 'Padelgrips',
  '/badmintongrips/': 'Badmintongrips',
  '/squashgrips/': 'Squashgrips',
  '/hockeygrips/': 'Hockeygrips',
};

// Build the menu on the server and pass only labels and URLs to the client.
export const navigation: NavigationItem[] = [
  { title: 'Keuzehulp', href: '/keuzehulp/' },
  {
    title: 'Grips per sport',
    href: '/grips/',
    groups: sportHubs.map((hub) => ({
      title: sportNames[hub.path],
      href: hub.path,
      links: gripPages
        .filter((page) => page.parent === hub.path)
        .map((page) => ({ title: page.title.split(':')[0], href: page.path })),
    })),
  },
  {
    title: 'Gripkennis',
    href: '/kennis/',
    groups: [
      {
        title: 'Gripkennis',
        href: '/kennis/',
        links: gripPages
          .filter((page) => page.parent === '/kennis/')
          .map((page) => ({ title: page.title, href: page.path })),
      },
      {
        title: 'Grips vergelijken',
        href: '/vergelijken/',
        links: gripPages
          .filter((page) => page.parent === '/vergelijken/')
          .map((page) => ({ title: page.title.split(':')[0], href: page.path })),
      },
    ],
  },
  { title: 'Over Sportgrips', href: '/over-sportgrips/' },
];
