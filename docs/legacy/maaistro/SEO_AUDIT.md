# Paspoot — SEO- en technische audit

Datum: 13–14 september 2026
Uitgevoerd door: Claude Code (geautomatiseerde audit- en implementatieronde)

## 1. Executive summary

Paspoot is een Next.js 16 (App Router) site die reizigers helpt controleren of hun hond of kat
mee mag in de cabine, met een stapsgewijze checker, airline-regelpagina's, reistas-aanbevelingen
en blogs. De basis was al gezond: Server Components als standaard, een duidelijke content-laag
(`src/content`), een werkende Tailwind v4-config en een client-side checker zonder onnodige
round-trips.

De belangrijkste bevindingen waren:

- **Ontbrekende sitemap/robots** en geen `next/font`-integratie (fonts liepen via handmatige
  `@font-face` in plaats van geoptimaliseerde laadstrategie).
- **Duplicate content**: dezelfde airline-artikelen waren op twee URL's publiceerbaar
  (`/blogs/[slug]` en `/events/[slug]`) met eigen, elkaar tegensprekende metadata/canonical.
- **Onvolledige metadata**: geen Twitter-kaarten, geen consistente OG-afbeeldingen, geen
  `metadataBase`-fallback voor Vercel-previews, geen structured data.
- **Dode server-code**: een ongebruikte `/api/applications`-route die dezelfde logica
  dupliceerde als de client-side checker.
- **Geen affiliate-disclosure** in de footer, terwijl er wel affiliate-links zijn.
- **Styling grotendeels in globale CSS** (3600+ regels) in plaats van Tailwind-utilities.

Kritieke en hoge bevindingen zijn opgelost. De productiebuild, typecheck, lint en databronnentests
slagen. De visuele uitstraling is gecontroleerd met screenshot-vergelijkingen (desktop/tablet/
mobiel) vóór en na de wijzigingen; het enige structurele verschil is de nieuw toegevoegde
affiliate-disclosuretekst in de footer.

## 2. Technische uitgangssituatie

- **Framework**: Next.js 16.3.5, App Router, React 19.2.3, Webpack-build (`next build --webpack`).
- **Router**: App Router met bestaande routegroepen `/`, `/volunteer`, `/projects[/slug]`,
  `/events[/slug]`, `/blogs[/slug]`. Geen routermigratie uitgevoerd (niet nodig, wel gecontroleerd).
- **Rendering**: alle content-pagina's zijn Server Components; `"use client"` alleen waar nodig
  (navigatie, checker-wizard, FAQ-accordeon, marquee-ribbon, hero-video, motion-reveal).
- **Databronnen**: statische JSON in `src/content/` (`airlines.json`, `events.json`,
  `projects.json`, `data-status.json`), gesynchroniseerd via `scripts/sync-travel-data.mjs` en
  gecontroleerd via `scripts/verify-travel-data.mjs` (`npm run data:verify`).
- **Styling**: Tailwind v4 (`@tailwindcss/postcss`) naast een grote handgeschreven `site.css`.
  Geen CSS Modules, geen styled-jsx, geen inline `style`-attributen aangetroffen (op één
  dynamische SVG-pad in `ribbon.tsx` na, wat correct is voor een berekende animatie).
- **Fonts**: twee custom variable fonts (Golos, Stack Sans Notch) als lokale `.ttf`-bestanden.
- **Lint/typecheck/tests**: `eslint`, `tsc --noEmit`, `prettier`, en twee losse Node-scripts
  (`data:sync`, `data:verify`) die als enige geautomatiseerde tests dienen. Er is geen
  component/E2E-testsuite.
- **Analytics/externe scripts**: geen gevonden (geen GA/GTM/Sentry etc.).

## 3. Routeoverzicht

| Route                 | Type                                                | Metadata                                 | Opmerking                                  |
| --------------------- | --------------------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| `/`                   | Static                                              | ✅ eigen title/description/OG/FAQ-schema | Homepage met checker-CTA                   |
| `/volunteer`          | Static                                              | ✅                                       | De cabinecheck (checker-wizard)            |
| `/projects`           | Static                                              | ✅                                       | Reistassen-overzicht                       |
| `/projects/[slug]`    | SSG (`generateStaticParams`, `dynamicParams=false`) | ✅ per product                           | 7 producten                                |
| `/events`             | Static                                              | ✅                                       | Airline-overzicht                          |
| `/events/[slug]`      | SSG                                                 | ✅ + Article + BreadcrumbList JSON-LD    | 5 airlines                                 |
| `/blogs`              | Static                                              | ✅                                       | Blog-hub, linkt door naar `/events/[slug]` |
| `/blogs/[slug]`       | **301/308-redirect** naar `/events/[slug]`          | n.v.t.                                   | Was duplicate content, nu opgelost         |
| `/sitemap.xml`        | Nieuw                                               | —                                        | Bevat alle canonieke routes                |
| `/robots.txt`         | Nieuw                                               | —                                        | Staat alles toe behalve `/api/`            |
| 404 (`not-found.tsx`) | ✅ `robots: noindex`                                | Duidelijke terugknop naar home           |

Er is geen aparte `/api/*`-route meer: `/api/applications` werd nergens aangeroepen (de checker
rekent volledig client-side via `evaluateCabinCheck`) en dupliceerde de validatielogica. Verwijderd
als dode code.

## 4. Bevindingen per prioriteit

### Kritiek — opgelost

1. **Duplicate content tussen `/blogs/[slug]` en `/events/[slug]`.**
   Beide routes rendereerden dezelfde `EventDetail`-content op twee URL's, met eigen
   (verschillende!) title/description/canonical. Dit splitst linkwaarde en kan door Google als
   duplicate content worden gezien.
   **Oplossing:** `/events/[slug]` is de canonieke airline-pagina; `/blogs/[slug]` doet nu een
   permanente 308-redirect (`next.config.ts` `redirects()` + `permanentRedirect` als fallback).
   Bestanden: `next.config.ts`, `src/app/blogs/[slug]/page.tsx`.
   Status: **opgelost**.

2. **Geen sitemap of robots.txt.**
   Crawlers hadden geen expliciete lijst van canonieke URL's en geen crawl-richtlijnen.
   **Oplossing:** `src/app/sitemap.ts` en `src/app/robots.ts` toegevoegd via de Next.js Metadata
   Route-conventies, met `lastModified` gebaseerd op de echte controle-/publicatiedata uit de
   content, en `Disallow: /api/`.
   Status: **opgelost**.

3. **Geen `metadataBase`-fallback / afhankelijk van één env-var.**
   `NEXT_PUBLIC_SITE_URL` was de enige bron voor absolute URL's; zonder die var vielen OG-tags
   terug op `localhost:3000`, ook in Vercel-previews.
   **Oplossing:** `src/lib/seo.ts` voegt een fallback toe op `VERCEL_PROJECT_PRODUCTION_URL` zodat
   preview- en productiedeployments altijd een correcte absolute origin hebben.
   Status: **opgelost** (env-var voor productie blijft een **handmatige actie**, zie §12).

### Hoog — opgelost

4. **Geen structured data.**
   Er was geen `Organization`, `WebSite`, `BreadcrumbList`, `Article` of `FAQPage` schema, terwijl
   de content zich daar goed voor leent (zichtbare FAQ, airline-artikelen met publicatie-/
   controledatum, duidelijke breadcrumbs op detailpagina's).
   **Oplossing:** toegevoegd, met alleen velden die al zichtbaar op de pagina staan (geen
   verzonnen reviews/ratings/prijzen):
   - `Organization` + `WebSite` in `src/app/layout.tsx` (op elke pagina, één keer).
   - `FAQPage` op de homepage (`src/app/page.tsx`), gevuld met de zichtbare FAQ-content.
   - `Article` + `BreadcrumbList` op elke airline-pagina (`src/app/events/[slug]/page.tsx`).
   - `BreadcrumbList` op elke reistas-detailpagina (`src/app/projects/[slug]/page.tsx`).
     Status: **opgelost**.

5. **Onvolledige Open Graph / Twitter-metadata.**
   Alleen de homepage had een OG-afbeelding; er was geen Twitter-kaart, geen `siteName` op
   detailpagina's, en titels werden niet consistent via een `%s | Paspoot`-template opgebouwd.
   **Oplossing:** `src/lib/seo.ts` (`pageMetadata()`) genereert voor elke pagina consistente
   title/description/canonical/OG/Twitter-metadata via de officiële Metadata API. Elke
   detailpagina geeft zijn eigen productafbeelding/airline-hero mee als OG-afbeelding.
   Status: **opgelost**.

6. **Fonts niet via `next/font`.**
   De twee merkfonts liepen via een handmatige `@font-face` in `fonts.css`, zonder
   preload/self-hosting-optimalisatie van Next.js en zonder fallback-metrics (kans op CLS).
   **Oplossing:** gemigreerd naar `next/font/local` in `src/app/layout.tsx` (Golos en
   Stack Sans Notch), met `display: swap` en een expliciete fallbackstack. De oude
   `src/styles/fonts.css` is niet meer nodig en niet meer geïmporteerd.
   Status: **opgelost**.

7. **Dode server-route `/api/applications`.**
   Volledige duplicatie van de client-side validatielogica, nooit aangeroepen vanuit de UI.
   Onnodige onderhoudslast en aanvalsoppervlak.
   **Oplossing:** verwijderd (`src/app/api` weg).
   Status: **opgelost**.

8. **Geen affiliate-disclosure in de footer.**
   De resultaatkaart met tas-aanbevelingen had al een disclosure-zin
   (`product-data-note`), maar de footer — zichtbaar op élke pagina — niet.
   **Oplossing:** extra alinea toegevoegd in `Footer` ("Links naar reistassen kunnen
   affiliatelinks zijn…").
   Status: **opgelost**.

### Middel — opgelost of gedeeltelijk

9. **`next/image` niet gebruikt voor de belangrijkste herhaalde afbeeldingen.**
   Reistas-, airline- en blogkaarten (de content die het vaakst herhaald wordt in grids/marquees)
   gebruikten `<img>` zonder responsive `sizes`, zonder automatische AVIF/WebP en zonder
   ingebouwde lazy-loading strategie.
   **Oplossing:** `ProjectCard`, `EventCard` en `BlogCard` (`src/components/cards.tsx`) gebruiken nu
   `next/image` met `fill` + `sizes`. `next.config.ts` staat AVIF/WebP toe en whitelist het
   Shopify-CDN-domein (`cdn.shopify.com`) voor de productafbeeldingen via `remotePatterns`.
   **Nog niet gemigreerd** (zie §11): decoratieve/marquee-afbeeldingen (logo's, avatars,
   sky-achtergronden, mission-art) en de losse hero-/detailafbeeldingen buiten de kaarten — dit is
   bewust uitgesteld omdat ze `position:absolute`/`object-fit`-patronen gebruiken die eerst
   zorgvuldig 1-op-1 met `next/image`'s `fill`-model moeten worden getest om geen layoutshift te
   veroorzaken.
   Status: **gedeeltelijk opgelost**.

10. **Onduidelijke/afgeleide route-titels.**
    Sommige `<title>`-teksten waren generiek (“Blogs over vliegen met huisdieren”,
    “Luchtvaartmaatschappijen”) en sloten niet aan bij de zoekintentie van de pagina.
    **Oplossing:** titels herschreven naar specifiekere, zoekintentie-gerichte varianten
    (bijv. “Cabineregels voor huisdieren per airline”, “Reistassen voor hond en kat in de
    cabine”, “Cabinecheck voor hond en kat”) zonder de content zelf te herschrijven.
    Status: **opgelost**.

11. **`poweredByHeader` en cachingheaders.**
    Next.js stuurde standaard de `X-Powered-By: Next.js`-header mee.
    **Oplossing:** `poweredByHeader: false` in `next.config.ts`.
    Status: **opgelost**.

### Laag

12. **CSS-tokens niet gecentraliseerd.**
    Kleuren/radii/shadows stonden verspreid als losse `:root`-variabelen los van de
    Tailwind-config, waardoor Tailwind en de custom CSS twee aparte bronnen van waarheid hadden.
    **Oplossing:** alle kleuren, radii, shadows, breakpoints en containerbreedte zijn nu
    Tailwind `@theme`-tokens in `src/styles/site.css` (`--color-brand`, `--radius-card`,
    `--shadow-card`, `--breakpoint-md`, `--container-site`, …), zodat zowel de gemigreerde
    Tailwind-componenten als de resterende custom CSS (via `var(--color-brand)` etc.) uit
    dezelfde bron putten.
    Status: **opgelost**.

13. **Losse `Heading`/`Text`-componenten die één element abstraheerden.**
    `src/components/ui.tsx` had `Heading` en `Text`-wrappers die niets toevoegden aan een kale
    `<h2>`/`<p>`.
    **Oplossing:** verwijderd; de twee aanroepplekken (`sections.tsx`) gebruiken nu direct
    `<h3>`/`<p>`. Dit is een vereenvoudiging, geen gedragswijziging.
    Status: **opgelost**.

## 5. SEO-problemen per paginatype

- **Homepage** — H1 is uniek (“Mag jouw huisdier mee aan boord? Paspoot checkt het.”), duidelijke
  zoekintentie (checker), FAQ nu ook als structured data. Geen wijzigingen aan content.
- **`/volunteer` (checker)** — H1 “Past jouw reis in de cabine?”, duidelijke conversie-intentie.
  Titel/description herschreven naar “Cabinecheck voor hond en kat” zodat de pagina niet meer
  klinkt als een vrijwilligerspagina (legacy naam uit een eerdere sitecontext) terwijl de URL zelf
  ongewijzigd blijft.
- **`/events` + `/events/[slug]`** — canonieke airline-pagina's; elk artikel heeft nu een
  `Article`-schema met `datePublished`/`dateModified` gelijk aan de echte controle-datum uit
  `airlines.json`/`events.json`, en een zichtbare "Gecheckt {datum}"-badge (bestond al in
  `EventCard`, nu ook consistent in metadata).
- **`/blogs` + `/blogs/[slug]`** — `/blogs` blijft een eigen contenthub (andere insteek/kopij dan
  `/events`) en linkt door naar de canonieke `/events/[slug]`-URL's; de oude losse
  `/blogs/[slug]`-pagina redirect nu 308 in plaats van dubbele content te serveren.
  **Aandachtspunt (niet gewijzigd):** `/blogs` en `/events` tonen gedeeltelijk overlappende content
  (dezelfde vijf airlines) met een andere titel/intro. Dit is functioneel zoals de site is opgezet
  (twee ingangen: “blog” vs “regel-overzicht”) en is geen technische duplicate-content-fout omdat
  beide op hun eigen canonieke URL indexeren, maar het verdient op termijn duidelijker
  onderscheidende copy per hub — gemarkeerd als aanbeveling, niet aangepast om content niet
  eigenmachtig te herschrijven.
- **`/projects` + `/projects/[slug]`** — elk product heeft een unieke title/description met de
  echte buitenmaten en leeggewicht; canonical en OG-afbeelding per product ingesteld.
- **404** — nu met `noindex`-robots-meta en een duidelijke link terug naar home (was al aanwezig,
  metadata toegevoegd).

## 6. Structured-data-audit

| Schema           | Waar                                 | Bron van de velden                                                                |
| ---------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| `Organization`   | Elke pagina (layout)                 | Naam, e-mailadres en logo staan al zichtbaar in de footer                         |
| `WebSite`        | Elke pagina (layout)                 | Sitenaam + taal (`nl-NL`)                                                         |
| `FAQPage`        | `/`                                  | De zes zichtbare FAQ-items uit `src/content/site.ts` (`faqs`)                     |
| `Article`        | `/events/[slug]`                     | Titel, samenvatting, hero-afbeelding, publicatie-/controledatum uit `events.json` |
| `BreadcrumbList` | `/events/[slug]`, `/projects/[slug]` | De zichtbare breadcrumb (Home → sectie → item)                                    |

Geen `Product`-schema toegevoegd voor de reistassen: dat vereist een betrouwbare, actuele
prijs/beschikbaarheid-garantie en een `AggregateRating`/`Review` die er niet is — toevoegen zonder
die garantie zou verzonnen/onbetrouwbare structured data opleveren, wat expliciet uit de opdracht
verboden is. **Aanbeveling, niet uitgevoerd:** `Product`-schema toevoegen zodra de
`sync-travel-data.mjs`-pijplijn prijs/voorraad met een garantie op actualiteit publiceert (bijv.
via een `priceValidUntil`-veld).

## 7. Interne-linkaudit

- Navigatie dekt alle hoofdroutes (`/volunteer`, `/projects`, `/events`, `/blogs`, `/#faq`).
- Footer linkt door naar dezelfde hoofdroutes plus de homepage-ankers (`#our-purpose`, `#goals`,
  `#faq`) — deze ankers bestaan en zijn functioneel.
- Airline- en blogartikelen linken naar `/volunteer` (checker) via een duidelijke, beschrijvende
  CTA-tekst (“Doe de check”, “Doe de Paspoot-check”) — geen “klik hier”-teksten aangetroffen.
  Reistas- en airline-kaarten linken met beschrijvende ankerteksten (producttitel, airline-naam).
- Reistasdetail → checker: elke `ProjectDetail`-pagina heeft een ingebedde `ApplicationForm`
  (compact) zodat een bezoeker direct kan controleren of het product bij zijn combinatie past.
- Checkerresultaat → reistasaanbevelingen: `findMatchingProducts()` filtert alleen tassen die
  qua airline, huisdiertype, afmetingen én gewicht daadwerkelijk passen, en toont per match een
  onderbouwde reden (“Past binnen de gepubliceerde maximale afmetingen van X…”). Geen suggestie
  van garantie: de resultaatkaart en de checker-copy benadrukken expliciet dat de luchtvaart-
  maatschappij de uiteindelijke beslissing neemt (`demo-note`-teksten, ongewijzigd).
- Breadcrumbs aanwezig op reistas- en airline-detailpagina's (`Breadcrumb`-component), nu ook als
  `BreadcrumbList` JSON-LD.
- Geen kapotte interne links aangetroffen: alle `href`'s in navigatie, footer, kaarten en
  detailpagina's zijn gecontroleerd tegen de daadwerkelijke routes/anchors en getest met
  HTTP-statuscontroles (zie §14).

## 8. Performance- en toegankelijkheidsbevindingen

- **Core Web Vitals-risico opgelost:** fonts lopen nu via `next/font/local` (self-hosted,
  preconnect/preload automatisch, `display: swap`), wat CLS-risico van laattijdig ladende
  merkfonts vermindert.
  De belangrijkste herhaalde afbeeldingen (reistas-, airline- en blogkaarten) zijn gemigreerd naar
  `next/image` met correcte `sizes`, wat automatische AVIF/WebP-serving en betere LCP-kandidaten
  oplevert op de grid-pagina's.
- **Niet aangepast (bewust):** de hero-video, marquee-logo's/avatars en decoratieve
  sky-achtergronden blijven `<img>`/`<video>`. Dit zijn ofwel animaties die native `<video>` nodig
  hebben, ofwel kleine, veelvuldig herhaalde decoratieve elementen (`aria-hidden`/`alt=""`) waarvan
  een `next/image`-migratie geen meetbare LCP/CLS-winst geeft en wel het risico op layoutshift
  vergroot gegeven hun `position:absolute`-opzet. Aanbevolen vervolgstap, zie §11.
- **Toegankelijkheid:** bestaande focus-states (`outline: 3px solid var(--color-focus)`),
  toetsenbordnavigatie in de checker-wizard (stap-navigatie met `tabIndex`/`aria-live`), de
  FAQ-accordeon (`aria-expanded`/`aria-controls`) en de tab-lijst in `PurposeTabs`
  (volledige rovende-tabindex-implementatie met pijltjestoetsen) waren al correct en zijn
  ongewijzigd gelaten.
- **`prefers-reduced-motion`:** was al volledig geïmplementeerd (marquees, hero-animaties,
  ribbon-animatie, wizard-panel-transitie) en is intact gebleven.
- **Formuliervalidatie:** elk veld in de checker-wizard heeft een gekoppeld `aria-describedby`/
  `aria-invalid` en een zichtbare foutmelding — ongewijzigd, was al correct.
- **Externe links:** affiliate-links naar Zoospot gebruiken `target="_blank"` met
  `rel="sponsored noopener noreferrer"` (voldoet aan de eis); bronverwijzingen naar officiële
  airline-pagina's gebruiken `rel="noopener noreferrer"`.
- **Geen kapotte links/assets gevonden** bij het doorlopen van alle routes (200/308/404 zoals
  verwacht, zie §14).

## 9. CSS-naar-Tailwind-migratie

Gemigreerd naar Tailwind-utilities (volledig herschreven, geen losse CSS-klassen meer nodig):

- `src/components/ui.tsx` — `Container`, `Section`, `Button`, `Eyebrow`, `SectionHeader`, `Icon`.
- `src/components/navigation.tsx` — volledige header/nav inclusief mobiel hamburgermenu.
- `src/components/footer.tsx` — volledige footer inclusief kolommen en onderbalk.
- `src/components/cards.tsx` — `ProjectCard`, `EventCard`, `BlogCard`, inclusief `next/image`.
- `src/app/not-found.tsx` — 404-pagina.

Een kleine `cn()`-helper (`src/lib/cn.ts`) is toegevoegd omdat er nog geen classnames-helper in de
codebase bestond; dit voorkomt onleesbare template-literal-classNames en is de enige nieuwe
"dependency" (een lokale 3-regelige util, geen package).

**Bewust niet (volledig) gemigreerd naar Tailwind:** `forms.tsx` (de checker-wizard, 700+ regels
met complexe stap-states, keuzegrids en resultaatweergave), `interactions.tsx` (FAQ + PurposeTabs),
`ribbon.tsx` (berekende SVG-animatie), `motion.tsx`, `hero-video.tsx`, `sections.tsx` en
`page-sections.tsx`. Deze blijven op de bestaande, functioneel identieke CSS-klassen draaien.
**Reden:** dit zijn de grootste, meest interactieve/visueel precieze onderdelen van de site
(marquees met exacte breedte-/gap-berekeningen, een wizard met 4 stappen en tientallen states,
een handmatig berekend sinusvormig lint). Een volledige 1-op-1 Tailwind-rewrite van dit deel in
dezelfde sessie zou het risico op subtiele visuele regressies sterk vergroten zonder dat er een
functionele of onderhoudswinst tegenover staat die opweegt tegen dat risico. De bestaande CSS is
overzichtelijk per component gegroepeerd en gebruikt al de gecentraliseerde design tokens.
**Aanbevolen vervolgstap:** dit in een aparte, gerichte sessie per component migreren, met
screenshot-diffing per stap (zoals in deze audit gedaan voor de wel-gemigreerde componenten).

**CSS-herstructurering (wel uitgevoerd):**

- `src/styles/site.css` is opnieuw ingedeeld in `@theme` (design tokens), `@layer base`
  (resets/globale elementen) en `@layer components` (de resterende component-CSS), zodat Tailwind
  en de custom CSS één consistente laagstructuur delen in plaats van twee losse "systemen".
- Alle merk-, tekst-, achtergrond-, rand-, focus-, status- (positive/negative/neutral) en
  schaduwkleuren zijn nu Tailwind `@theme`-tokens (`--color-brand`, `--color-ink`,
  `--color-line`, `--radius-card`, `--shadow-card`, …) in plaats van losse `:root`-variabelen.
- Dode CSS verwijderd die door een eerdere, generieke contactformulier-opzet was achtergelaten en
  nergens meer aan gekoppeld was: `.form-grid`, `.name-field`/`.location-field`/`.message-field`/
  `.phone-field`, `.form-status`, `.honeypot`, `.checker-result` (en de oude
  `.result-positive`/`.result-negative`/`.result-neutral`-tint, niet te verwarren met de wél actief
  gebruikte `.result-summary.result-suitable` e.a.), plus de nu overbodige
  `.application-form select`/`textarea`-stijlen (de wizard heeft geen `<select>`/`<textarea>`).
- `src/styles/fonts.css` is niet meer nodig (fonts lopen via `next/font`) en niet meer
  geïmporteerd; het bestand zelf is laten staan zodat de geschiedenis zichtbaar blijft, maar wordt
  nergens meer aangeroepen. **Aanbeveling:** verwijderen in een volgende opschoning zodra bevestigd
  is dat niemand er nog naar linkt.

**Resterende, bewust laten staan CSS-uitzonderingen** (zoals gevraagd in §5 van de opdracht):

- De marquee-, ribbon- en wizard-`@keyframes` (zeer specifieke, berekende animaties).
- De `@font-face`-achtige logica is vervangen door `next/font`, maar de merk-`font-family`-tokens
  (`--font-sans`, `--font-brand`) blijven in CSS gedefinieerd omdat ze verwijzen naar de door
  `next/font` gegenereerde CSS-variabelen (`--font-golos`, `--font-stack-sans-notch`) — dit is de
  aanbevolen manier om `next/font` met Tailwind te combineren.
- Component-CSS voor `forms.tsx`, `interactions.tsx`, `ribbon.tsx`, `page-sections.tsx` en
  `sections.tsx` (zie hierboven).

**Nog aanwezige, mogelijk overbodige CSS-selectors:** een klein aantal responsive
media-query-regels die uitsluitend de nu-verwijderde generieke formulierklassen aanspraken (in
`@media`-blokken) kon niet met volledige zekerheid geautomatiseerd worden opgeschoond zonder de
structuur van de overige, wél actieve media-queries in dezelfde blokken te riskeren. Deze regels
hebben geen effect (ze matchen geen enkel element meer) maar zijn niet fysiek verwijderd.
**Aanbeveling:** in een losse, kleine PR met een CSS-coverage-tool (bijv. Chrome DevTools
"Coverage" op alle routes) definitief opschonen.

## 10. Reeds uitgevoerde fixes (samenvatting)

| #   | Fix                                                                   | Bestanden                                                                   | Status                |
| --- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------- |
| 1   | 308-redirect `/blogs/[slug]` → `/events/[slug]`                       | `next.config.ts`, `src/app/blogs/[slug]/page.tsx`                           | Opgelost              |
| 2   | Sitemap + robots.txt                                                  | `src/app/sitemap.ts`, `src/app/robots.ts`                                   | Opgelost              |
| 3   | `metadataBase`-fallback op Vercel-productie-URL                       | `src/lib/seo.ts`                                                            | Opgelost              |
| 4   | `Organization`/`WebSite`/`FAQPage`/`Article`/`BreadcrumbList` JSON-LD | `layout.tsx`, `page.tsx`, `events/[slug]`, `projects/[slug]`, `json-ld.tsx` | Opgelost              |
| 5   | Consistente OG/Twitter-metadata per route                             | `src/lib/seo.ts` + alle `page.tsx`                                          | Opgelost              |
| 6   | `next/font/local` voor Golos en Stack Sans Notch                      | `src/app/layout.tsx`                                                        | Opgelost              |
| 7   | Verwijderen dode `/api/applications`-route                            | `src/app/api/*` (verwijderd)                                                | Opgelost              |
| 8   | Affiliate-disclosure in footer                                        | `src/components/footer.tsx`                                                 | Opgelost              |
| 9   | `next/image` op kaartcomponenten + Shopify-CDN whitelist              | `src/components/cards.tsx`, `next.config.ts`                                | Gedeeltelijk opgelost |
| 10  | Zoekintentie-gerichtere titles/descriptions                           | alle `page.tsx`                                                             | Opgelost              |
| 11  | `poweredByHeader: false`                                              | `next.config.ts`                                                            | Opgelost              |
| 12  | Design tokens gecentraliseerd in Tailwind `@theme`                    | `src/styles/site.css`                                                       | Opgelost              |
| 13  | Tailwind-migratie ui/nav/footer/cards + dode CSS opgeruimd            | zie §9                                                                      | Opgelost/gedeeltelijk |
| 14  | Overbodige `Heading`/`Text`-wrappercomponenten verwijderd             | `src/components/ui.tsx`, `sections.tsx`                                     | Opgelost              |

## 11. Niet uitgevoerde aanbevelingen (met reden)

- **`Product`-schema voor reistassen** — niet toegevoegd zonder een betrouwbare
  prijs-actualiteitsgarantie (zie §6). Vereist eerst een `priceValidUntil`/actualiteitsveld in de
  syncpijplijn.
- **Volledige `next/image`-migratie** (marquees, hero, sky-achtergronden, mission-art) — bewust
  uitgesteld vanwege het risico op layoutshift bij `position:absolute`-patronen; vereist een eigen
  visuele regressietest per sectie (zie §8/§9).
- **Volledige Tailwind-migratie van `forms.tsx`, `interactions.tsx`, `ribbon.tsx`,
  `sections.tsx`, `page-sections.tsx`** — bewust uitgesteld, zie §9 (risico/batenafweging).
- **`/blogs`- en `/events`-overlap herschrijven tot duidelijker onderscheidende content** — vereist
  redactionele input (nieuwe kopij) die buiten de scope van deze technische audit valt; alleen
  gemarkeerd in §5.
- **Verwijderen van `src/styles/fonts.css`** — bestand laten staan (niet meer geïmporteerd) in
  plaats van hard te verwijderen, om geen bestand weg te gooien dat mogelijk nog ergens extern
  gedocumenteerd staat; aanbevolen als opschoning in een losse commit.
- **Losse, inactieve CSS-regels in bestaande media-queries** — zie toelichting in §9.

## 12. Handmatige acties

Deze punten vereisen een keuze of toegang die niet uit de codebase kon worden afgeleid, en zijn
daarom **niet** automatisch aangepast:

1. **`NEXT_PUBLIC_SITE_URL` instellen in productie** (Vercel-projectinstellingen of `.env`). De
   code valt terug op `VERCEL_PROJECT_PRODUCTION_URL`, maar een expliciete, stabiele
   `NEXT_PUBLIC_SITE_URL=https://www.paspoot.nl` blijft de betrouwbaarste bron voor
   canonicals or als het domein afwijkt van het automatische Vercel-productiedomein.
2. **Social-share-afbeelding controleren op daadwerkelijke beeldverhouding.** De huidige
   OG-afbeelding (`airport-pets.png`, 1672×941) is ingesteld als standaard-share-image; controleer
   handmatig hoe deze wordt bijgesneden op LinkedIn/X/Facebook, aangezien deze bestanden niet in
   deze sessie zijn geopend/gewijzigd.
3. **Airline-broncontrole**: `data-status.json` toont drie actieve `sourceFetchWarnings`
   (Transavia, Lufthansa, Brussels Airlines gaven HTTP 403 bij de laatste geautomatiseerde
   broncontrole) en één airline in handmatige review (Air France, ontbrekende afmetingen). Dit is
   inhoudelijke data-onzekerheid die een mens met toegang tot de officiële pagina's moet
   valideren — niet iets wat deze technische audit kan of mag "oplossen" door cijfers te verzinnen.
4. **Analytics/consent**: er is geen analytics/consent-tooling aangetroffen. Als die alsnog wordt
   toegevoegd, hoort daar een cookiebanner/consent-mechanisme bij — buiten scope van deze audit.

## 13. Aanbevolen vervolgstappen

1. Migreer `forms.tsx` (de checker-wizard) in een aparte sessie naar Tailwind, met
   screenshot-diffing per wizard-stap — dit is verreweg het grootste resterende CSS-bestand qua
   gedrag/interactiviteit.
2. Rond de `next/image`-migratie af voor hero-, mission- en marquee-afbeeldingen, met aandacht
   voor de bestaande `mask-image`/`object-fit`-effecten.
3. Voeg `Product`-schema toe zodra de sync-pijplijn een betrouwbare `priceValidUntil` publiceert.
4. Schrijf onderscheidende copy voor `/blogs` versus `/events` zodat de twee hubs niet inhoudelijk
   overlappen (redactioneel werk, geen technische taak).
5. Voeg een lichte E2E-smoketest toe (bijv. Playwright) die de checker-flow (stap 1 t/m 4) en de
   belangrijkste routes op HTTP-status test, zodat toekomstige wijzigingen niet alleen op
   `data:verify` hoeven te vertrouwen.

## 14. Resultaten van lint, typecheck, tests en productiebuild

Alle checks zijn na de implementatie opnieuw gedraaid en slagen:

```
$ npm run format        # prettier --write .   → geslaagd, geen resterende diffs
$ npm run lint           # eslint .             → 0 problemen
$ npm run typecheck      # tsc --noEmit         → 0 fouten
$ npm run data:verify    # travel-data tests    → "Travel-data checks passed: matching, weight,
                                                    dimensions, stock and affiliate URLs."
$ npm run build          # next build --webpack → Compiled successfully
```

Build-output (routes, ná opschoning van `/api/applications`):

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /blogs
├   /blogs/[slug]                → 308 redirect naar /events/[slug]
├ ○ /events
├   /events/[slug]               → 5 statisch gegenereerde airline-pagina's
├ ○ /projects
├   /projects/[slug]             → 7 statisch gegenereerde productpagina's
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /volunteer
```

Handmatige routecontrole op de productiebuild (`next start`):

| Route                           | Verwacht             | Resultaat |
| ------------------------------- | -------------------- | --------- |
| `/`                             | 200                  | ✅        |
| `/volunteer`                    | 200                  | ✅        |
| `/projects`, `/projects/[slug]` | 200                  | ✅        |
| `/events`, `/events/[slug]`     | 200                  | ✅        |
| `/blogs`                        | 200                  | ✅        |
| `/blogs/klm`                    | 308 → `/events/klm`  | ✅        |
| `/bestaat-niet`                 | 404                  | ✅        |
| `/robots.txt`, `/sitemap.xml`   | 200, correcte inhoud | ✅        |

Visuele regressiecontrole: alle routes zijn vóór en ná de wijzigingen gefotografeerd op
1440px/900px/390px-breedte (desktop/tablet/mobiel), inclusief de volledige checker-wizardflow
(stap 1 t/m resultaat met productaanbevelingen). Pixelvergelijking toont geen onbedoelde
verschillen; het enige structurele hoogteverschil op elke pagina is de bewust toegevoegde
affiliate-disclosurezin in de footer.
