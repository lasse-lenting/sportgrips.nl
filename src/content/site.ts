// Bestaande media blijven bewust behouden; deze zijn geen SPORTGRIPS-productfoto’s.
export const images = {
  hero: '/assets/maaistro/hero-grass.jpg',
  purpose: '/assets/maaistro/photos/measure-lawn.webp',
  sky: '/assets/maaistro/photos/quiet-garden-background.webp',
};
export const avatars = [
  'detail-dew-grass.webp',
  'detail-planter.webp',
  'detail-mower-wheel.webp',
  'detail-lawn-edge.webp',
].map((p) => `/assets/maaistro/photos/${p}`);
export const logos = ['Golf', 'Tennis', 'Padel', 'Badminton', 'Squash', 'Hockey'].map((name) => ({
  name,
}));
export const purposes = [
  {
    title: 'Jouw sport',
    icon: 'home',
    text: 'Voor welke sport zoek je een grip?',
    image: '/assets/maaistro/photos/measure-lawn.webp',
  },
  {
    title: 'De onderlaag',
    icon: 'education',
    text: 'Een basisgrip vervangen of een buitenlaag kiezen?',
    image: '/assets/maaistro/photos/boundary-installation.webp',
  },
  {
    title: 'Het gevoel',
    icon: 'water',
    text: 'Wat telt voor jou: dikte, oppervlak of vocht?',
    image: '/assets/maaistro/photos/sloping-terrain.webp',
  },
  {
    title: 'Jouw keuze',
    icon: 'check',
    text: 'Lees de uitleg die aansluit bij jouw gripvraag.',
    image: '/assets/maaistro/photos/weekend-patio.webp',
  },
];
export const missions = [
  {
    title: 'Begin bij jouw sport',
    description:
      'Een club, racket of stick heeft een eigen opbouw. Kies eerst je sport en bekijk welke griplaag je wilt vernieuwen.',
    note: 'Stap 1 · jouw sport',
    image: '/assets/maaistro/photos/garden-plan.webp',
    color: 'sand',
  },
  {
    title: 'Ontdek wat voor jou telt',
    description:
      'Vergelijk dikte, oppervlak en vochtopname. Bekijk het complete handvat: de onderlaag en buitenlaag bepalen samen het gevoel.',
    note: 'Stap 2 · jouw wensen',
    image: '/assets/maaistro/photos/narrow-passage.webp',
    color: 'lemon',
  },
  {
    title: 'Kies met een helder verhaal',
    description:
      'Gebruik de uitleg om gerichter te vergelijken. Controleer bij een concreet product de afmetingen, montage en eigenschappen.',
    note: 'Stap 3 · jouw grip',
    image: '/assets/maaistro/photos/owner-inspection.webp',
    color: 'blue',
  },
];
export const impacts = [
  {
    text: 'Jouw sport staat voorop',
    image: '/assets/maaistro/photos/family-garden.webp',
    color: 'lemon',
  },
  {
    text: 'Heldere afwegingen',
    image: '/assets/maaistro/photos/comparison-notes.webp',
    color: 'sand',
  },
  {
    text: 'Duidelijk over onze bronnen',
    image: '/assets/maaistro/photos/garden-consultation.webp',
    color: 'blue',
  },
];
export const faqs = [
  [
    'Welke sportgrip past bij mij?',
    'Begin bij je sport en de laag die je wilt vervangen. Vergelijk daarna dikte, oppervlak en vochtopname. De keuzehulp wijst je naar relevante uitleg; hij selecteert geen geteste producten.',
  ],
  [
    'Wat is het verschil tussen basisgrip en overgrip?',
    'Een basisgrip vormt de onderlaag op een rackethandvat. Een overgrip is een dunnere laag daaroverheen. Wil je de onderlaag vernieuwen, controleer dan of je een replacement grip koopt.',
  ],
  [
    'Is een dikkere grip altijd beter?',
    'De juiste dikte hangt af van je hand en je voorkeur. Extra lagen veranderen het handvat. Probeer de complete opbouw voordat je beslist.',
  ],
  [
    'Hoe vaak moet ik een grip vervangen?',
    'Let op slijtage, loslaten en een oppervlak dat niet meer prettig aanvoelt. Materiaal en gebruik verschillen; er is geen vaste termijn voor alle sportgrips.',
  ],
  [
    'Verkoopt SPORTGRIPS zelf grips?',
    'Deze versie biedt keuzeuitleg en praktische gidsen. Er is geen webshop, winkelvoorraad of betaalfunctie ingericht.',
  ],
  [
    'Zijn de grips door SPORTGRIPS getest?',
    'Nee. De uitleg is gebaseerd op de genoemde bronnen. We tonen geen eigen testscores, reviews of ranglijst van winnaars.',
  ],
] as const;
