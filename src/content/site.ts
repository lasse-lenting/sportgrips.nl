// Photorealistic AI illustrations; no product-test or customer photography claims.
import { photo } from './media';
export const images = {
  hero: photo('hero'),
  purpose: photo('textures'),
  sky: photo('court-evening'),
};
export const avatars = ['tennis', 'golf', 'padel', 'hockey'].map(photo);
export const logos = ['Golf', 'Tennis', 'Padel', 'Badminton', 'Squash', 'Hockey'].map((name) => ({
  name,
}));
export const purposes = [
  {
    title: 'Jouw sport',
    icon: 'home',
    text: 'Voor welke sport zoek je een grip?',
    image: photo('textures'),
  },
  {
    title: 'De onderlaag',
    icon: 'education',
    text: 'Een basisgrip vervangen of een buitenlaag kiezen?',
    image: photo('rewrap'),
  },
  {
    title: 'Het gevoel',
    icon: 'water',
    text: 'Wat telt voor jou: dikte, oppervlak of vocht?',
    image: photo('golf'),
  },
  {
    title: 'Jouw keuze',
    icon: 'check',
    text: 'Lees de uitleg die aansluit bij jouw gripvraag.',
    image: photo('padel'),
  },
];
export const missions = [
  {
    title: 'Begin bij jouw sport',
    description:
      'Een club, racket of stick heeft een eigen opbouw. Kies eerst je sport en bekijk welke griplaag je wilt vernieuwen.',
    note: 'Stap 1 · jouw sport',
    image: photo('tennis'),
    color: 'sand',
  },
  {
    title: 'Ontdek wat voor jou telt',
    description:
      'Vergelijk dikte, oppervlak en vochtopname. Bekijk het complete handvat: de onderlaag en buitenlaag bepalen samen het gevoel.',
    note: 'Stap 2 · jouw wensen',
    image: photo('textures'),
    color: 'lemon',
  },
  {
    title: 'Kies met een helder verhaal',
    description:
      'Gebruik de uitleg om gerichter te vergelijken. Controleer bij een concreet product de afmetingen, montage en eigenschappen.',
    note: 'Stap 3 · jouw grip',
    image: photo('rewrap'),
    color: 'blue',
  },
];
export const impacts = [
  {
    text: 'Jouw sport staat voorop',
    image: photo('hockey'),
    color: 'lemon',
  },
  {
    text: 'Heldere afwegingen',
    image: photo('textures'),
    color: 'sand',
  },
  {
    text: 'Duidelijk over onze bronnen',
    image: photo('badminton'),
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
    'Verkoopt Sportgrips zelf grips?',
    'Deze versie biedt keuzeuitleg en praktische gidsen. Er is geen webshop, winkelvoorraad of betaalfunctie ingericht.',
  ],
  [
    'Zijn de grips door Sportgrips getest?',
    'Nee. De uitleg is gebaseerd op de genoemde bronnen. We tonen geen eigen testscores, reviews of ranglijst van winnaars.',
  ],
] as const;
