# SPORTGRIPS — lokale implementatie

Uitgevoerd op 1 november 2026. Geen deployment, publicatie of push uitgevoerd. Bestemd voor `lasse-lenting/sportgrips.nl`; de lokale werkmap heet nog `gripvergelijken.nl`. De Git-remote `origin` is ingesteld op de opgegeven Sportgrips-repository; er is niet gecommit of gepusht.

## Aangetroffen toestand en behoud

- Huidige werkmap: leeg, Git `main`, geen commits en geen remote. Geen `.codegraph/` aangetroffen; daarom geen index aangemaakt.
- GitHub `lasse-lenting/sportgrips.nl` gaf via de GitHub-connector expliciet “This repository is empty”.
- Basis: de volledige lokale werkbestanden van `/Users/lasselenting/Documents/ChatGPT/MAAISTRO`, zonder `.git`, caches, dependencies, `.env`-bestanden en lokale Vercel-koppeling. De oorspronkelijke map is niet aangepast. Het ongecommitte documentwerk is mee bewaard onder `docs/legacy/`.
- De genoemde cloudvoorbereidingen waren niet aanwezig in deze lokale bron. Een apart cloudwerkbestand of cloudwerkboom was niet als bijlage beschikbaar. Er is daarom niets uit die omgeving overschreven of als teruggevonden gepresenteerd. Eventuele cloudwijzigingen moeten nog met deze lokale uitwerking worden vergeleken zodra die beschikbaar zijn.
- De oude actieve inhoud en ongebruikte scripts/componenten zijn bewaard onder `docs/legacy/source/` met `.txt` achter de oorspronkelijke bestandsnaam. Daardoor worden oude gegevens niet door TypeScript of de website geladen. Oude strategieën blijven expliciet historische Maaistro-/Paspoot-documenten.

## Inhoudelijke bron

Bronbestand: `source/Zoekwoordenonderzoek_sportgrips_URL-structuur.xlsx`, gevonden in de lokale Downloads-map. De oorspronkelijke Excel is ongewijzigd bewaard. Alle vijf werkbladen zijn uitgelezen met de XML-relaties, shared strings en cached celwaarden uit het xlsx-bestand:

| Werkblad              | Niet-lege rijen | Gebruik                                                         |
| --------------------- | --------------: | --------------------------------------------------------------- |
| Longlist zoekwoorden  |             210 | Termen, vraagvormen en expliciete uitsluitingen                 |
| Gecategoriseerd       |             243 | Zes sporten, type/maat/vervangen en definitievragen             |
| Menustructuur + URL   |              59 | Navigatie, URL-vorm, samenvoegingen en voorgestelde paginatypen |
| URL-zoekwoord mapping |             218 | Toewijzing van zoekwoorden aan intentie-URLs                    |
| Kannibalisatie        |              20 | Bewuste scheiding van algemene/sportspecifieke termen           |

Alle werkbladen staan ook als CSV in `source/`; de volledige celwaarden staan in `source/workbook.json`. De oude `CONTENT-IDEAS.csv` is niet als Sportgrips-bron gebruikt en staat alleen in het legacy-archief.

Doelgroep afgeleid uit dit onderzoek: Nederlandstalige spelers die een grip voor hun club, racket of stick willen kiezen, onderhouden of vervangen. Het bestand beschrijft een vergelijkings-/adviesconcept; het bevestigt geen werkelijk assortiment, verkoperscontract, eigen testprogramma of affiliaterelatie. Deze versie biedt daarom keuzeuitleg en bronverwijzingen zonder bestelknoppen, prijzen, voorraad, reviews of productwinnaars.

## Onderwerpbesluiten

`SPORTGRIPS-TOPIC-DECISIONS.csv` bevat 448 beslisregels met werkblad/cel, term, voorgestelde URL, bestemming en reden. Dezelfde term kan terugkomen in longlist en mapping; dit zijn geen 448 afzonderlijke pagina’s.

- Home richt zich op algemene sportgrips. De zes sportintenties hebben eigen hubs: golf, tennis, padel, badminton, squash en hockey.
- Tennisgrip-synoniemen delen één hub. Tennisovergrips, basisgrips, gripmaat en vervangen hebben aparte, verschillende functies. Definitievragen staan in de algemene kennisgids.
- Padel grip en padel overgrip delen één hub; er is geen extra `/padelgrips/overgrips/`.
- Golf “beste” blijft op de hub als keuzevraag zonder onbewezen winnaar. Zelf/laten vervangen en kosten zijn secties van dezelfde vervangingsgids.
- Undersize, midsize en oversize/jumbo zijn samengevoegd op `/golfgrips/maat/`: geen afzonderlijke productgegevens om drie extra pagina’s te dragen. Dames is geen afzonderlijke maat of verplichte pagina.
- Squash vervangen is een sectie van de squashhub.
- “Grip weer stroef maken” en schoonmaken zijn gecombineerd op `/kennis/grips-schoonmaken/`; geen aparte URL voor dezelfde onderhoudsvraag.
- Hoe-vaak-vervangenvragen blijven bij de eigen sport, zonder universele termijn.
- Chamois hockeygrips en de montage ervan hebben elk een passende bestemming. De vergelijking chamois/rubber legt het verschil in laagfunctie uit, zonder testwinnaar.
- Merken/modelvergelijkingen uitgesteld: eerst voldoende controleerbare modelinformatie. Ze krijgen geen lege route of sitemapvermelding. Kleine merktermen op een sporthub zijn geen claim van een assortiment.
- Medische zoekintenties (tenniselleboog/artrose) overgeslagen; geen medische belofte of blog zonder geschikte deskundige inhoudelijke basis.
- Fiets, fitness, gaming, griptechniek, ijshockeytape en pickleball overgeslagen of buiten huidige scope gehouden, conform de uitsluitingen en aanvullende intentiecontrole die het bestand vraagt.
- Geen jaartal of verzonnen actualiteitsclaim aan titles/URLs toegevoegd. Alle inhoudelijke routes gebruiken kleine letters en een trailing slash.
- De generieke overgrip-toewijzing aan tennis volgt het aangeleverde onderzoek. Dit is een redactionele keuze, geen aangetoonde Google-ranking. De aanbevolen SERP-validatie van het Excelbestand blijft werk vóór eventuele livegang.

## Uitgevoerde sitewijzigingen

28 inhoudelijke routes: homepage, zes sporthubs, vijftien aanvullende gidsen, drie overzichten, keuzehulp, overpagina en privacy. Plus robots, sitemap en echte 404-responses.

De homepage behoudt de oorspronkelijke acht secties en volgorde: Hero → Recognition → Purpose → OngoingProjects → Mission → Impacts → Questions → VolunteerSection. Bestaande CTA’s, navigatie, footer, tabinhoud, FAQ en ribbons hebben Sportgrips-inhoud. De interactieve keuzehulp behoudt de wizardvorm, vijf vragen en resultaat, maar geeft nu een leesroute voor gripkeuzes. Antwoorden worden niet verzonden, opgeslagen of in queryparameters gezet.

De overpagina maakt documentonderzoek en het ontbreken van eigen tests duidelijk. Het door de gebruiker bevestigde contactadres is `lasse@puntwerk.nl`. Een juridische bedrijfsnaam of adres is niet aangeleverd en niet overgenomen van Maaistro. De privacytekst beschrijft de huidige lokale techniek; de uiteindelijke verantwoordelijke en hostinggegevens moeten vóór livegang worden aangevuld waar toepasselijk.

## Ontwerp en media

- Alle vier bestanden onder `src/styles/` zijn byte voor byte gelijk aan de bron. Geen nieuwe palette, achtergrond, font, spacingtoken of breakpoint toegevoegd.
- Primaire kleuren zijn ongewijzigd gebleven omdat er geen bevestigd Sportgrips-palettoken is aangeleverd.
- Alle H1’s blijven gekoppeld aan het centrale gewicht 400; dit is ook als computed style gecontroleerd.
- Bestaande logo-SVG’s blijven onaangeroerd. De interface toont een tekstmerk binnen de bestaande logo-vakken; de footer houdt de oorspronkelijke aspectverhouding.
- Alle 160 oorspronkelijke media-assets (inclusief logo’s, favicons, fonts en eventuele video) blijven aanwezig met identieke SHA-256-checksum. Het 161e public-bestand is `site.webmanifest`; alleen de merknaam daarin veranderde.
- De bestaande tuinbeelden blijven zichtbaar zoals gevraagd. Ze gelden niet als Sportgrips-productfoto’s of bewijs van eigen gebruik. Alt-teksten maken geen sportproductclaims over die beelden. Er is geen sportbeeld gegenereerd of oud asset overschreven.
- Een bestaande server/clientverschilmelding in `Reveal` bij verminderde beweging is verholpen door dezelfde initiële animatiestijl te renderen en de overgang bij deze voorkeur direct te laten aflopen. Normaal animatiegedrag en componentvorm blijven behouden.

## SEO en tracking

- Canonical origin is vast `https://sportgrips.nl`, ook bij lokaal reviewen. De oude `NEXT_PUBLIC_SITE_URL`-waarde kan dit niet veranderen.
- Iedere inhoudelijke pagina heeft één H1, een unieke title/description, eigen canonical en Open Graph URL/merknaam. Er zijn logische interne vervolglinks en zichtbare kruimelpaden met overeenkomstig BreadcrumbList-schema.
- Organization/WebSite-schema noemt alleen SPORTGRIPS en de site-URL; geen oude bedrijfsgegevens of logo. Gidsen gebruiken Article; hubs en keuzehulp WebPage; overzichten CollectionPage. Geen Product, Offer, Review, rating, oude publicatie- of controledatum.
- Geen oud tuinbeeld als standaard Open Graph-productbeeld ingesteld. Ontbrekende merkgeschikte OG-afbeelding is optioneel, geen misleidend beeld met sportbeschrijving toegevoegd.
- Productiesitemap bevat alleen de 28 echte pagina’s. Geen legacy-, uitgestelde merk-, medische of foutpagina. Geen overgenomen `lastmod`.
- Dev/preview is noindex, heeft een lege sitemap en robots met `Disallow: /`. Productie verwijst naar de juiste sitemap en sluit `/api/` en toekomstige `/go/` uit.
- Vaste Maaistro-/Paspoot-GA-, Clarity- en Bing-codes verwijderd uit actieve code. Google/Bing-verificatie en GA/Clarity/Vercel Analytics zijn optioneel via `.env.example`. Zonder eigen configuratie zijn alle optionele meetdiensten uit. Ze laden ook na toestemming niet zonder ingestelde dienst.
- Geconfigureerde optionele diensten laden uitsluitend na opt-in. Privacy en cookievenster passen hun uitleg aan de daadwerkelijke buildconfiguratie aan. Er is geen eigen meetcode aangeleverd of geactiveerd.

## Validatie en bekijken

Uitgevoerd: `npm ci`, `npm run lint`, `npm run typecheck` en `npm run build`. Gebundelde Next.js 16.3.5-documentatie over metadata, fonts en not-found is gelezen, plus de officiële metadata-/sitemapdocumentatie. De gebruikte skills zijn Next.js, Spreadsheets en React Best Practices; er zijn geen subagents ingezet.

Reproduceerbare HTTP-controle:

```sh
python3 scripts/check-sportgrips.py --base http://localhost:3028
python3 scripts/check-sportgrips.py --base http://localhost:3025 --development
```

Rapporten: `check-production.json`, `check-development.json`, `check-browser.json`. De HTTP-controle inspecteert echte responses van alle 28 pagina’s, 474 interne links, titles, descriptions, H1-aantallen, canonicals, OG, JSON-LD, sitemap, robots en zes oude/onbekende URLs met 404/noindex. De media-check vergelijkt alle oorspronkelijke public-bestanden met `media-baseline.json`.

De browsercontrole gebruikt Chromium op 1440, 390 en 320 pixels. Desktop/mobiel zijn vergeleken met een afzonderlijke originele bronkopie: sectievolgorde, klassen, padding, achtergronden, H1-font en de oorspronkelijke homepage-afbeeldingen. Next.js image-URLs zijn genormaliseerd voor de extra trailing slash; de bronbeelden en checksums zijn gelijk. Negen wizardscenario’s behandelen alle sporten, validatie, teruggaan en resetten. Cookiekeuzes, intrekken, menu/Escape, geladen fonts, beeldfouten en horizontale overflow zijn gecontroleerd. Screenshots en baseline staan onder `visual-checks/`. Dit is functionele en technische verificatie, geen bewijs van ranking, indexatie of visuele pixelgelijkheid van gewijzigde tekst.

De devserver draait op deze Mac op **http://localhost:3025**. `localhost` werkt hier op dezelfde computer als deze Codex-sessie. Een cloudserver op localhost zou niet via localhost op je eigen computer bereikbaar zijn; er is hier geen cloud-previewlink of publieke tunnel ingesteld. De tijdelijke productiecontrole gebruikte poort 3028; deze tijdelijke controleserver wordt na de controle gestopt. De devserver blijft de aanbevolen reviewlink.

## Nog open vóór een eventuele publicatie

1. Eventueel bestaand ongecommitte cloudwerk beschikbaar maken en vergelijken; deze sessie kon dat niet inzien.
2. Juridische verantwoordelijke/bedrijfsgegevens en definitieve hosting-/privacy-inrichting bevestigen. Alleen het opgegeven contactadres is verwerkt.
3. Indien gewenst: eigen analytics/verificatie, commerciële partners/productdata en merkgeschikte OG-media aanleveren. Geen daarvan is noodzakelijk om de lokale adviesversie te bekijken; ontbreken is geen reden geweest om gegevens te verzinnen.
4. Uitgestelde onderwerpen pas toevoegen met voldoende eigen inhoudelijke onderbouwing, productgegevens en toepasselijke broncontrole.
5. Voor deployen, publiceren of pushen is een nieuwe expliciete opdracht nodig. Dit werk staat uitsluitend lokaal en bevat geen claim van SEO-resultaten.


## Correctie logo en merkkleuren — 1 november 2026

Op verzoek is het tekstlogo vervangen door `public/assets/sportgrips/logo.svg`: echte SVG-paden uit het oorspronkelijke, lokaal aanwezige Barlow Condensed Black Italic-lettertype. Het oude logo blijft ongewijzigd bewaard. Het nieuwe logo heeft een lime vulling en de oorspronkelijke donkere contour, zonder roze of terracotta.

Drie merkkleurwaarden vervangen de eerdere kleuren: primary `#D4F542`, hover `#E4FF76`, accent `#BC4825`. Focus verwijst naar het accent; vaste oude primary/hover-kleuren in componentregels en het cookievenster verwijzen nu naar de gedeelde tokens. Achtergronden, overige kleuren, vormgeving, fonts en spacing blijven behouden. De eerdere vermelding dat alle vier stylesheets identiek zijn, beschrijft de eerste versie; `site.css` en `consent.css` bevatten nu uitsluitend deze kleurcorrecties. Er is een nieuw logo-asset toegevoegd; de oorspronkelijke 160 media-assets zijn nog steeds identiek.


## Dropdownnavigatie — 1 november 2026

Op verzoek hebben ‘Grips per sport’ en ‘Gripkennis’ nu dropdowns. Het sportmenu groepeert de zes sporten met hun bestaande subpagina’s; Gripkennis bevat de kennisgidsen en de vergelijking. De menugegevens worden op de server uit de bestaande pagina’s opgebouwd en als uitsluitend labels/URLs naar de client gestuurd.

Desktop ondersteunt hover en klikken; toetsenbordbediening ondersteunt Tab, Enter, pijltje omhoog/omlaag en Escape met focusherstel. Klikken buiten de navigatie sluit de menu’s. Op mobiel/tablet zijn de groepen uitklapbaar, past de navigatie in de viewport en kan de inhoud scrollen. Een pagina kiezen sluit het menu. Bestaande kleuren, logo, fonts, headerpositie en pagina-indeling blijven behouden.

Gecontroleerd: lint, typecheck, productiebuild, 27 unieke menulinks met HTTP 200, desktop 1440px en mobiel/tablet 390/320/768px. Geen runtimefouten of horizontale overflow. De volledige ontwikkel-HTTP-controle is opnieuw geslaagd voor 28 pagina’s en nu 1015 interne linkverwijzingen. Screenshots en browserrapport: `visual-checks/navigation-*`. Niet gepubliceerd of gepusht.


## Publicatieopdracht en noindex — 1 november 2026

De gebruiker heeft expliciet opdracht gegeven om alles op noindex te zetten, de code naar `lasse-lenting/sportgrips.nl` te pushen, de repository met Vercel te verbinden en te deployen. Domeinkoppeling doet de gebruiker zelf. De eerdere instructie om niet te publiceren geldt niet voor deze expliciet aangevraagde release.

Indexering staat nu vast uit in `src/lib/seo.ts`, onafhankelijk van omgeving of ontbrekende variabelen. Alle pagina’s hebben noindex-meta; `next.config.ts` voegt aan iedere route en public-file response `X-Robots-Tag: noindex, nofollow, noarchive` toe. De sitemap is leeg. Robots staat crawlen van de pagina’s toe zodat zoekmachines de noindex-instructie kunnen lezen; `/api/` en `/go/` blijven uitgesloten. Dit is een instructie voor zoekmachines, geen toegangsbeveiliging.

De privacytekst is aangepast aan hosting bij Vercel. Eigen analytics- en verificatiecodes zijn niet aangeleverd en blijven uit. `.vercelignore` laat het behouden bronarchief en onderzoeksbestanden buiten de deployment-upload; de bestanden blijven wel in Git bewaard. Er zijn geen bestaande media-assets verwijderd.
