import type { Metadata } from 'next';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-7.5 px-5 pt-35 pb-15">
      <h1>Pagina niet gevonden</h1>
      <p>Deze pagina is niet gevonden. Ontdek de gripuitleg op SPORTGRIPS.</p>
      <Button href="/">Naar de homepage</Button>
    </section>
  );
}
