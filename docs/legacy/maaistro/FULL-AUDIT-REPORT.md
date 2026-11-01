# Maaistro SEO-audit — 25 oktober 2026

**Conclusie:** de vastgestelde lokale technische launchproblemen zijn verholpen. De website is nog niet gedeployed en niet aan Google aangeboden. De inhoudelijke verdieping kan na de eerste lancering plaatsvinden.

De gevraagde [Agentic SEO Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) is expliciet gebruikt, vastgezet op commit `445c46c268d947fac25c4b57d38aaf723129fe62`. Bronbestanden, controles en beperkingen staan in [de provenance](docs/seo/maaistro-2026-10-25/SKILL-PROVENANCE.md).

## Reikwijdte en bewijs

Lokale audit van 43 URL’s; zeven bedoelde Maaistro-pagina’s. Ruwe HTML, headers, route-inventaris en bevindingen staan in `docs/seo/maaistro-2026-10-25/evidence/`. Dit is geen publieke crawl en geen bewijs van Google-indexatie.

| Onderdeel | Auditbasis | Huidige lokale status |
|---|---|---|
| Paspoot-erfenis | 18 onbedoelde pagina’s bereikbaar | Routebestanden verwijderd, niet in productiebuild |
| Redirects | Oude reisbestemmingen | Zeven oude regels verwijderd |
| Canonicals en previews | Origin/omgeving niet launchvast | Canonical maaistro.nl; development en previews noindex |
| Kleine hero-thumbnails | Vier grote originelen, samen 1.684.978 bytes | Responsieve kleine afbeeldingen, lazy geladen |
| Artikelcovers | Grote img zonder srcset | Next Image met responsieve formaten |
| FAQ | Verouderde zoekresultaatmarkup | FAQPage verwijderd; zes zichtbare vragen behouden |
| Vertrouwen | Contact ontbrak | lasse@puntwerk.nl op over- en privacypagina |
| Iconen | Oude bestanden | Aangeleverde faviconset geïntegreerd |
| Koopgidsen | 277, 315 en 309 woorden hoofdtekst | Bruikbare basis; meer scenario’s en vergelijkende bronnen gepland |

De zeven pagina’s hebben in de crawl een titel, beschrijving, canonical en één H1. De hoofdinhoud staat in de serverrespons. Geen kapotte interne route of ontbrekend anker gevonden op deze zeven pagina’s. Oude kapotte links zaten in inmiddels verwijderde legacyroutes.

## Bevindingen en afhandeling

De oorspronkelijke deelrapporten beschrijven de toestand vóór de fixes. Onderstaande tabel geeft de afhandeling weer. De 23 samengevoegde bevindingen zijn gecontroleerd op overlap en bewijs; het verificatiescript controleert op zichzelf niet de waarheid van iedere claim.

| ID | Oorspronkelijke ernst | Afhandeling |
|---|---|---|
| TECH-01 | Warning | Lokaal opgelost: legacyroutes verwijderd; publieke controle na deploy. |
| TECH-02 | Warning | Lokaal opgelost: oude redirects verwijderd. |
| TECH-04 | Warning | Lokaal opgelost: maaistro.nl als canonical; previews noindex. Publieke controle volgt. |
| C01 | Warning | Vervolg: drie koopgidsen inhoudelijk verdiepen. |
| C02 | Warning | Vervolg: bronnen van meerdere fabrikanten vergelijken. |
| C03 | Warning | Eerste tuinadvies is eerlijk begrensd; productselectie pas met dataset. |
| C04 | Warning | Contactadres toegevoegd; persoonlijke makerinformatie nog aanvullen wanneer beschikbaar. |
| C06 | Warning | Vervolg: contextuele links tussen gidsen. |
| SIP-02 | Warning | Lokaal opgelost: vier kleine thumbnails responsief en lazy geladen. |
| SIP-03 | Warning | Lokaal verbeterd: drie artikelcovers responsief. Overige beelden later meten. |
| TECH-08 | Info | Publieke prestaties en zoekdata nog onbekend. |
| C05 | Info | Beeldbeleid toegevoegd; geen eigen testervaring geclaimd. |
| SIP-04 | Info | Verouderde FAQPage-markup verwijderd; zichtbare FAQ blijft. |
| SIP-10 | Info | Validatorwaarschuwing over @graph-wrapper is geen bevestigd schemafout. |
| GSC-01 | Info | Connector vereist abonnement; gebruik gratis Search Console rechtstreeks. |
| TECH-05 | Pass | Hoofdinhoud servergerenderd. |
| TECH-06 | Pass | Sitemap beperkt tot zeven bedoelde routes; preview uitgesloten. |
| TECH-07 | Pass | Onbekende routes geven 404. |
| C07 | Pass | Transparante commerciële uitleg aanwezig. |
| C08 | Pass | Leesbare Nederlandse basis aanwezig; geen Engelse leesbaarheidsscore toegepast. |
| SIP-06 | Pass | Kernschema aanwezig, zonder verzonnen entiteiten. |
| SIP-07 | Pass | Geen fictieve reviewscores/productprijzen. |
| SIP-08 | Pass | Unieke bronbeelden en responsieve basis bevestigd. |

## Wat inhoudelijk het meeste oplevert

1. Verdiep de drie bestaande gidsen met tuinvoorbeelden, beperkingen, installatie en een afweging tussen meerdere systemen. De huidige vier bronlinks zijn allemaal van Husqvarna; dat is geen marktbrede vergelijking.
2. Maak vervolgstappen vanuit de keuzehulp concreter. De huidige drie vragen geven algemeen tuinadvies en verwijzen naar gidsen; ze kiezen geen model uit een productdatabase.
3. Bouw nuttige hulpmiddelen rond hellingen, doorgangen, meten en complete kosten. Publiceer brede “beste robotmaaier”-ranglijsten pas met een controleerbare dataset en methodiek.

Er zijn 40 ideeën, zeven briefs en twee uitgewerkte, ongepubliceerde concepten: een doorgangsgids en een tuincheck-werkblad. Dit zijn voorstellen, geen al bestaande publieke pagina’s. Zoekvolume en moeilijkheid zijn onbekend en niet ingevuld met schattingen.

## Niet gemeten of nog extern te controleren

- DNS, HTTPS, www-redirect en publieke headers na deployment.
- Core Web Vitals: geen publieke veld- of labmeting beschikbaar. De beeldfixes zijn geen bewijs van een geslaagde LCP/INP/CLS-meting.
- Search Console-verificatie, sitemapverwerking en daadwerkelijke indexatie. De connector gaf `payment_required/subscription_required`; dit is geen websitefout. Search Console zelf is gratis.
- Hostinglogs en feitelijk privacygedrag bij de gekozen host.

**Geen SEO-score toegekend: onvoldoende publieke data, lage zekerheid voor een totaalscore.** Geen ranking-, verkeers- of indexatiebelofte.

## Actuele broncorrecties

Google beëindigde FAQ-rich-results op 7 mei 2026; dit staat in [Google Search updates](https://developers.google.com/search/updates). De oudere skillreferentie was hier achterhaald. Het verwijderen van markup is geen beloofde rankingverbetering. Volgens [Google’s AI-optimalisatiegids](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) zijn geen speciale AI-bestanden of vaste paginalengtes nodig. Daarom geen llms.txt-rankingbelofte of woordenaantalquotum. De inhoudelijke aanpak volgt [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) en [hoogwaardige reviews](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews).

## Rapporten en uitvoering

- [Vandaag live](LAUNCH-TODAY.md) en [actieplan](ACTION-PLAN.md)
- [Interactieve planner](SEO-PLANNER.html), [strategie](SEO-STRATEGY.md), [12-wekenkalender](CONTENT-CALENDAR.md)
- [Concurrentie](COMPETITOR-ANALYSIS.md), [sitestructuur](SITE-STRUCTURE.md), [clusters](TOPIC-CLUSTERS.md), [roadmap](IMPLEMENTATION-ROADMAP.md)
- [Technisch bewijs](docs/seo/maaistro-2026-10-25/TECHNICAL-EVIDENCE.md), [contentbewijs](docs/seo/maaistro-2026-10-25/CONTENT-EVIDENCE.md), [schema en beelden](docs/seo/maaistro-2026-10-25/SCHEMA-IMAGES-PERFORMANCE.md)
- [Productiecontrole](docs/seo/maaistro-2026-10-25/evidence/production-launch-check.json) en [omgevingscontrole](docs/seo/maaistro-2026-10-25/evidence/indexing-environment-matrix.json)
