import Link from 'next/link';
import { Container, SectionHeader } from '@/components/ui';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
export const metadata = pageMetadata({
  title: 'Over Sportgrips: werkwijze en bronnen',
  description:
    'Lees wat Sportgrips biedt, hoe de gripuitleg wordt onderbouwd en hoe je contact opneemt bij een vraag of correctie.',
  path: '/over-sportgrips/',
});
export default function About() {
  return (
    <>
      <section className="listing-hero">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Over Sportgrips"
            title="Goed kiezen begint bij begrijpen."
            description="Uitleg over grips voor clubs, rackets en sticks. Begin bij je sport en ontdek wat voor jou telt."
          />
        </Container>
      </section>
      <section className="listing-body">
        <Container className="max-w-[850px]">
          <div className="rich-content">
            <h2>Wat je op Sportgrips vindt</h2>
            <p>
              Sportgrips biedt keuzeuitleg over golf-, tennis-, padel-, badminton-, squash- en
              hockeygrips. De <Link href="/grips/">sportcategorieën</Link> helpen je op weg. De{' '}
              <Link href="/keuzehulp/">keuzehulp</Link> geeft op basis van vijf antwoorden een route
              naar passende uitleg.
            </p>
            <h2>Hoe we de uitleg onderbouwen</h2>
            <p>
              Bij de gidsen staan verwijzingen naar sportorganisaties en fabrikanten.
              Productspecificaties en montage-instructies kunnen per uitvoering verschillen.
              Controleer daarom altijd het concrete product. De keuzehulp verklaart geen product
              automatisch geschikt.
            </p>
            <h2>Onderzoek en praktijktests</h2>
            <p>
              De huidige uitleg is gebaseerd op documentonderzoek. Er zijn geen eigen vergelijkende
              praktijktests, klantreviews of testscores gepubliceerd. De fotorealistische
              sportbeelden zijn met AI gemaakte illustraties. Ze zijn geen foto’s van geteste
              producten of eigen praktijksessies, en zijn niet werkelijk met een iPhone gemaakt.
            </p>
            <h2>Winkels en samenwerkingen</h2>
            <p>
              Deze versie heeft geen winkelassortiment, voorraad, bestelproces of actieve
              affiliatelinks. We publiceren geen prijzen of verkooppunten zonder controleerbare
              productgegevens. Als er later een commerciële samenwerking bijkomt, moet die zichtbaar
              worden vermeld bij de verwijzing.
            </p>
            <h2>Vragen of een correctie</h2>
            <p>
              Mail naar <a href="mailto:lasse@puntwerk.nl">lasse@puntwerk.nl</a>. Vermeld bij een
              correctie de pagina en de informatie die volgens jou moet worden aangepast. Lees ook
              de <Link href="/privacy/">privacy-uitleg</Link>.
            </p>
          </div>
        </Container>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Over Sportgrips', path: '/over-sportgrips/' },
        ])}
      />
    </>
  );
}
