import type { Metadata } from 'next';
import {
  Hero,
  Recognition,
  Purpose,
  OngoingProjects,
  Mission,
  Impacts,
  Questions,
  VolunteerSection,
} from '@/components/sections';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'SPORTGRIPS — kies de grip voor jouw sport',
    description:
      'Vind je weg in sportgrips. Begin bij jouw sport, ontdek de verschillen in dikte en gevoel en gebruik de gratis keuzehulp.',
    path: '/',
  }),
  title: { absolute: 'SPORTGRIPS — kies de grip voor jouw sport' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Recognition />
      <Purpose />
      <OngoingProjects />
      <Mission />
      <Impacts />
      <Questions />
      <VolunteerSection />
    </>
  );
}
