import Link from 'next/link';
import { Container, SectionHeader } from '@/components/ui';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
import {
  analyticsEnabled,
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  VERCEL_ANALYTICS_ENABLED,
} from '@/lib/analytics';
export const metadata = pageMetadata({
  title: 'Privacy en cookies bij Sportgrips',
  description:
    'Lees hoe de Sportgrips-keuzehulp antwoorden verwerkt, welke cookies worden gebruikt en hoe je contact opneemt over privacy.',
  path: '/privacy/',
});
export default function PrivacyPage() {
  return (
    <section className="listing-body">
      <Container>
        <SectionHeader
          as="h1"
          eyebrow="Privacy"
          title="Jouw gripadvies, zonder account."
          description="Zo gaat Sportgrips om met de informatie die je invult."
        />
        <div className="rich-content mt-10 max-w-[720px]">
          <h2>Contact over privacy</h2>
          <p>
            Voor vragen over de verwerking op sportgrips.nl kun je contact opnemen via{' '}
            <a href="mailto:lasse@puntwerk.nl">lasse@puntwerk.nl</a>. Beschrijf je vraag of verzoek
            zonder onnodige persoonlijke gegevens mee te sturen.
          </p>
          <h2>De antwoorden in de keuzehulp</h2>
          <p>
            De keuzehulp vraagt naar sport, griplaag, vocht, gevoel en je doel. De antwoorden worden
            tijdens het gebruik in je browser verwerkt. Het formulier verstuurt ze niet naar een
            database of formulierendienst en zet ze niet in het webadres. Ze verdwijnen wanneer je
            de pagina opnieuw laadt. Je hebt geen account nodig.
          </p>
          <h2>Cookies en voorkeuren</h2>
          <p>
            Het noodzakelijke cookie sportgrips_consent bewaart je cookievoorkeur maximaal 182
            dagen. Via Cookie-instellingen onderaan de pagina kun je je voorkeur aanpassen.
            Optionele metingen staan standaard uit. Intrekken van toestemming herlaadt de pagina
            zodat de diensten niet opnieuw laden.
          </p>
          <h2>Optionele meetdiensten</h2>
          {!analyticsEnabled ? (
            <p>
              Er zijn momenteel geen optionele meetdiensten ingeschakeld. Google Analytics,
              Microsoft Clarity en Vercel Web Analytics laden niet. Een keuze voor statistieken
              activeert op zichzelf geen ontbrekende meetcode.
            </p>
          ) : (
            <>
              <p>
                De hieronder genoemde diensten zijn ingericht en laden alleen nadat je toestemming
                voor statistieken geeft. De keuzehulp verstuurt zelf geen antwoorden als
                meetgebeurtenis.
              </p>
              <ul>
                {GA_MEASUREMENT_ID && (
                  <li>
                    Google Analytics verwerkt informatie over websitegebruik. Zie{' '}
                    <a href="https://policies.google.com/privacy">Google Privacy</a>.
                  </li>
                )}
                {CLARITY_PROJECT_ID && (
                  <li>
                    Microsoft Clarity kan klikgedrag, scrollgedrag en sessieopnames verwerken. Zie{' '}
                    <a href="https://privacy.microsoft.com/privacystatement">Microsoft Privacy</a>.
                  </li>
                )}
                {VERCEL_ANALYTICS_ENABLED && (
                  <li>
                    Vercel Web Analytics verwerkt bezoekersstatistieken zonder analyticscookies. Zie{' '}
                    <a href="https://vercel.com/docs/analytics/privacy-policy">
                      Vercel Analytics Privacy
                    </a>
                    .
                  </li>
                )}
              </ul>
            </>
          )}
          <h2>Technische verwerking</h2>
          <p>
            Bij het opvragen van een webpagina ontvangt de webserver onder meer het IP-adres, de
            opgevraagde URL en technische browsergegevens om de pagina te kunnen leveren. De website
            wordt gehost bij Vercel. Technische verwerking voor het leveren van de website staat los
            van de optionele meetdiensten hierboven.
          </p>
          <h2>Externe bronnen en e-mail</h2>
          <p>
            Bronlinks openen een andere website, waar de eigen privacy- en cookievoorwaarden gelden.
            Klik je op het e-mailadres, dan opent je mailprogramma. De inhoud van een door jou
            verstuurde e-mail kan worden gebruikt om je vraag te beantwoorden; vul geen
            persoonsgegevens in de keuzehulp in.
          </p>
          <h2>Bij verdere ontwikkeling</h2>
          <p>
            Bij het toevoegen van een webshop of andere gegevensverwerking moet deze uitleg worden
            aangepast aan de feitelijke inrichting. Lees meer over de werkwijze op de{' '}
            <Link href="/over-sportgrips/">overpagina</Link>.
          </p>
        </div>
      </Container>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy/' },
        ])}
      />
    </section>
  );
}
