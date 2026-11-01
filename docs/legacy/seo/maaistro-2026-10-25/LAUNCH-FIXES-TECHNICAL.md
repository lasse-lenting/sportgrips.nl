# Lokale launchfixes — oude Paspoot-publicatieroutes verwijderd

Datum: 25 oktober 2026. Dit is een **aanvulling na de auditbaseline**, naar aanleiding van de opdracht om Maaistro vandaag na controle live te zetten. Het oorspronkelijke `TECHNICAL-EVIDENCE.md`, `technical-findings.json` en de eerste raw crawl zijn bewust niet herschreven: zij beschrijven de situatie vóór deze fixes.

## Gewijzigd

Acht oude publieke `page.tsx`-bestanden verwijderd:

- `src/app/cabinecheck/page.tsx`
- `src/app/reistassen/page.tsx`
- `src/app/reistassen/[slug]/page.tsx`
- `src/app/luchtvaartmaatschappijen/page.tsx`
- `src/app/luchtvaartmaatschappijen/[slug]/page.tsx`
- `src/app/over-paspoot/page.tsx`
- `src/app/nieuws/page.tsx`
- `src/app/nieuws/[slug]/page.tsx`

Hiermee vervallen de achttien ongewenste Paspoot-publicatie-URL’s uit de baseline. De zeven bedoelde Maaistro-URL’s behouden hun bestaande routebestanden en vormgeving.

Uit `next.config.ts` is de volledige oude `redirects()`-lijst met zeven Paspoot-routepatronen verwijderd: `/volunteer`, `/projects`, `/projects/:slug`, `/events`, `/events/:slug`, `/blogs` en `/blogs/:slug`. Er zijn geen vervangende redirects naar inhoudelijk ongerelateerde Maaistro-pagina’s toegevoegd. De normale framework-normalisatie blijft beschikbaar.

## API-inventaris en bronbehoud

Er bestaat geen `src/app/api` en geen `src/pages/api`; er hoefden geen legacy-API’s verwijderd te worden. In de actieve Maaistro-routebestanden, navigatie, footer, homepagecontent en `garden-form.tsx` zijn geen links naar de verwijderde routegroepen gevonden.

Gedeelde componenten, fonts, foto's, contentdatabestanden en opmaak zijn behouden om de ingeperkte scope en bestaande UI te respecteren. Het gekopieerde Paspoot-nieuwsbestand heeft geen publieke route meer. De drie actieve Maaistro-gids-slugs komen ook niet voor in de `relatedAdvice`-koppelingen van dat legacy-nieuws; er verschijnt dus geen gerelateerd Paspoot-bericht onder deze gidsen. Een historische Paspoot-publicatiegoedkeuring is nergens als Maaistro-publicatie geactiveerd.

De kopieherkomst blijft vastgelegd in `docs/CLONE.md`: Paspoot-broncommit `ee46f3d7af303f672416542dc5fcf4ee8bb114ea`. De verwijderde oorspronkelijke routebestanden zijn bovendien herstelbaar uit Maaistro’s eigen begincommit `ff33415c418724807b2d8f36bc51116bd437fa63` (`Initial Maaistro snapshot with complete branding, content and photography`). Er is geen duplicaatarchief onder `public/` gemaakt.

Let op: de eerdere migratiebeschrijving in `docs/CLONE.md` vertelt nog de historische situatie waarin de reisroutes aanwezig waren. Deze aanvullende launchfixnotitie beschrijft de huidige route-opruiming. Het bronarchief is geen nieuwe publicatiequeue; gebruik oude Paspoot-goedkeuringen niet voor Maaistro-artikelen.

## Gerichte controles

- De huidige Next.js-documentatie voor filesystempagina’s en `redirects` is vóór de wijziging gelezen.
- `npx eslint next.config.ts`: geslaagd.
- Read-only HTTP-controle op de bestaande lokale devserver: **32/32 controles geslaagd**.
- Alle zeven bedoelde Maaistro-URL’s geven HTTP 200.
- Alle achttien voormalige Paspoot-URL’s geven nu HTTP 404.
- Zeven voormalige redirectvoorbeelden geven nu HTTP 404, geen redirect naar Paspoot.
- Onbekende legacy-URL’s tonen de bestaande Maaistro-not-foundpagina met noindex.

De precieze URL’s, statuscodes, titels, canonicals en robotswaarden staan in [local-route-check.json](evidence/technical/launch-validation/local-route-check.json). De controle is reproduceerbaar met [check_routes.py](evidence/technical/launch-validation/check_routes.py).

## Nog te verifiëren door de coördinerende agent

Dit deel heeft geen productiebuild, Git-push of deployment uitgevoerd. De coördinerende agent beheert de canonical-host-/robots-/sitemap-/layoutwijzigingen en de uiteindelijke build. Na die gezamenlijke build moet dezelfde route-denylist nog tegen de productie-preview en, na goedgekeurde deployment, tegen `https://maaistro.nl` worden gecontroleerd. Controleer ook dat de buildmanifesten alleen de bedoelde Maaistro-routegroepen bevatten. Een lokale 404 is geen bewijs van een publieke 404 vóór deployment.
