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
    text: 'Bij welke sport wil je de grip gaan gebruiken?',
    image: photo('textures'),
  },
  {
    title: 'De onderlaag',
    icon: 'education',
    text: 'Wil je de basis vernieuwen of zoek je iets voor de buitenkant?',
    image: photo('rewrap'),
  },
  {
    title: 'Het gevoel',
    icon: 'water',
    text: 'Wat weegt voor jou het zwaarst bij een grip, de dikte, het oppervlak of de omgang met vocht?',
    image: photo('golf'),
  },
  {
    title: 'Jouw keuze',
    icon: 'check',
    text: 'Raadpleeg de uitleg die aansluit bij jouw gripvraag.',
    image: photo('padel'),
  },
];
export const missions = [
  {
    title: 'Begin bij jouw sport',
    description:
      'De grip zit op een club anders in elkaar dan op een racket of een stick. Kies eerst je sport en bekijk welke griplaag je wilt vernieuwen.',
    note: 'Stap 1 · jouw sport',
    image: photo('tennis'),
    color: 'sand',
  },
  {
    title: 'Ontdek wat voor jou telt',
    description:
      'Je kunt dikte, oppervlak en vochtopname vergelijken. Bekijk het complete handvat: de onderlaag en buitenlaag bepalen samen het gevoel.',
    note: 'Stap 2 · jouw wensen',
    image: photo('textures'),
    color: 'lemon',
  },
  {
    title: 'Kies met een helder verhaal',
    description:
      'Je gebruikt de uitleg om gerichter te vergelijken. Controleer bij een concreet product de maten, montage en eigenschappen.',
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
    'Start bij je sport en de laag die je wilt vervangen. Je kunt daarna dikte, oppervlak en vochtopname vergelijken. De keuzehulp wijst je naar relevante uitleg; hij selecteert geen geteste producten.',
  ],
  [
    'Wat is het verschil tussen basisgrip en overgrip?',
    'Direct om het rackethandvat zit de basisgrip. Een overgrip is een dunnere laag daaroverheen. Wil je de onderlaag vernieuwen, controleer dan of je een replacement grip koopt.',
  ],
  [
    'Is een dikkere grip altijd beter?',
    'De juiste dikte hangt af van je hand en je voorkeur. Extra lagen veranderen het handvat. Probeer de complete opbouw voor je beslist.',
  ],
  [
    'Hoe vaak moet ik een grip vervangen?',
    'Kijk of de grip slijt of loslaat en voel of het oppervlak nog prettig is. Materiaal en gebruik verschillen; er is geen vaste termijn voor alle sportgrips.',
  ],
  [
    'Verkoopt Sportgrips zelf grips?',
    'Je vindt hier gidsen en uitleg om zelf een grip te kiezen. Er is geen webshop, winkelvoorraad of betaalfunctie ingericht.',
  ],
  [
    'Zijn de grips door Sportgrips getest?',
    'Nee. Bij de uitleg staat welke bronnen we hebben geraadpleegd. We tonen geen eigen testscores, reviews of ranglijst van winnaars.',
  ],
] as const;
