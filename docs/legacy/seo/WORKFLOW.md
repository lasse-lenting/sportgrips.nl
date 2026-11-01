# Paspoot SEO-werkwijze

Deze werkwijze vertaalt de volledige video van Vasco's SEO Tips naar Paspoot. Video: https://www.youtube.com/watch?v=GVxY8e2hAzs (18:06, 24 juni 2026).

## Vast kader

Paspoot is een Nederlandse informatie- en vergelijkingssite voor mensen die met hun hond of kat vliegen. De cabinecheck en de keuze van een geschikte reistas vormen de belangrijkste vervolgstap. Paspoot is geen airline, dierenarts of verkoper van de tassen. Affiliatelinks en broncontroles zijn zichtbaar. Gebruik geen verzonnen deskundigen of eigen testervaring.

De gebruiker heeft dagelijks onderzoek, technische controles, lokale verbeteringen en concepten gevraagd. Publicatie volgt pas na zijn akkoord. Geen automatische deployment, push naar een productietak of externe berichten. Leg een concreet concept of een gecontroleerde wijziging klaar; vraag alleen wat daadwerkelijk ontbreekt.

## Een dagelijkse run

1. Lees AGENTS en deze werkwijze. Controleer Git-status; behoud werk dat al klaarstaat. Bekijk `.data/seo/` en `src/content/news.json` om herhaling te voorkomen.
   Gebruik de nieuwste gedateerde GSC-export wanneer de connector niet beschikbaar is; vermeld de feitelijke meetperiode en behandel oude exports niet als actuele data. De andere chat verzorgt het uitgebreide SEO-rapport. Houd hier alleen de uitvoeringslog en korte wijzigingsupdate bij.
2. Voer `npm run seo:audit` uit tegen productie. Bekijk HTTP, robots, sitemap, canonicals, metadata, schema en linkpaden. Scheid een werkelijk productieprobleem van een lokaal nog niet uitgerolde verbetering. Los bevestigde problemen lokaal op. Vul de audit aan met een browser wanneer client rendering relevant is; raw HTML bevat hier het server-schema.
3. Voer `npm run news:research` uit. De officiële bronnen en Google News leveren onderzoekskandidaten. Open de originele publicatie en de officiële airline- of overheidsbron. Controleer publicatie-, wijzigings- en gebeurtenisdatum apart. Een wijzigingshash is geen bewijs van een nieuwe regel. Meld mislukte broncontroles.
4. Kies alleen onderwerpen met een concrete consequentie voor Nederlandse reizigers met een hond of kat. Een bestaand adviesartikel bijwerken is vaak beter dan een nieuwe pagina over hetzelfde onderwerp. Bekijk eerder geschreven `topicKey`-waarden en bronnen. Geen nieuws gevonden is een geldige uitkomst.
5. Schrijf zelfstandig een concept in `src/content/news.json`, met officiële bronnen, betekenis voor de reiziger en relevante interne links. `status: "draft"`, `publishedAt: null`. Brondatums zijn verifieerbaar; geen quota of geforceerde dagelijkse artikelen. Gebruik de structuur in STRATEGY.
6. Voer `npm run news:verify` uit. Bij codewijzigingen: typecheck, gerichte lint en productiebuild. Gebruik `npm run dev:review` voor lokale visuele controle van een concept; deze expliciete modus geeft concepten een noindex. De gewone build maakt geen conceptroutes. Bouw deze modus nooit voor deployment.
7. Geef een kort Nederlands resultaat: wat veranderde, wat gecontroleerd is, welke concepten op akkoord wachten en welke data ontbreken. Houd een compact voortgangsbestand bij in `.data/seo/run-log.md` met datum, bevindingen, aangepaste bestanden en open punten. Onderbouw met pad of echte bron, zonder een synthetische rankingscore.

## Publiceren na akkoord

Het akkoord moet verwijzen naar het artikel of de concrete wijziging. Leg de datum vast in `approvedAt` en een verwijzing naar dat menselijke akkoord in `approvalRef`. Zet vervolgens `status` op `published` en `publishedAt` op de werkelijke publicatiedatum. Pas `updatedAt` alleen aan bij echte inhoudelijke wijzigingen. Check de bronnen opnieuw als het concept inmiddels verouderd is.

De normale build neemt gepubliceerde artikelen automatisch op in de nieuwsindex en sitemap; gekoppelde adviesgidsen tonen teruglinks. Publiceren/deployen blijft een afzonderlijke stap met expliciete toestemming. Verifieer na deployment de publieke URL, canonical, robots en sitemap. Een geslaagde build of Git-push is geen bewijs dat de pagina live of geïndexeerd is.

## Skills kiezen en grenzen

Lees de relevante SKILL.md vóór gebruik. De gebruiker heeft hier de volledige SEO-structuur en autonoom werken gevraagd; herhaal onboardingvragen uit generieke skills niet wanneer deze context het antwoord al geeft.

- `seo-audit`, `web-quality-seo`, `rampify-seo-audit`: technische controles, met echte HTTP- en HTML-bewijzen. De meegeleverde Python-crawler vervangt geen Google Search Console, velddata of Rich Results Test.
- `site-architecture`, `website-structure`, `internal-links`, `content-strategy`: intentie per pagina, logische hubs en nuttige teruglinks.
- `schema`: zichtbare inhoud correct beschrijven. Article/NewsArticle en BreadcrumbList waar passend. Geen fictieve reviewsterren, auteur of verkoper; controleer Google's actuele ondersteuning voordat je een zoekresultaat belooft.
- `ecommerce-seo-audit`: alleen toepassen op onze vergelijkings- en productinformatie. Merchant feeds, winkelvoorraad en checkout zijn niet van Paspoot. Aanbiedingen alleen markeren als ze werkelijk zichtbaar en actueel geverifieerd zijn.
- `ai-seo`, `best-aeo`, `seo-geo-aeo`: duidelijke antwoorden en controleerbare bronnen. Scores, vaste percentages en claims over llms.txt zijn geen bewijs van Google- of AI-ranking. Controleer actuele primaire documentatie voor een concrete maatregel.
- `web-quality-core-web-vitals` en `web-quality-web-quality-audit`: gemeten prestaties. Een labmeting is geen velddata of INP-conclusie; optimaliseer de daadwerkelijk gemeten bottleneck.
- `google-search-console` en `google-search-console-tool`: eigen zoekdata en URL-inspectie indien toegankelijk. De querytabel verbergt sommige zeldzame zoektermen; 24-uursdata is voorlopig. Geen ontbrekende data invullen met aannames.
- `local-seo-audit`: geïnstalleerd voor eventueel passend later werk. Paspoot heeft hier geen aangetoonde fysieke vestiging; geen verzonnen GBP, adres of lokale landingspagina's.
- `distribb`: geïnstalleerd, niet aangesloten. Vereist een afzonderlijk account/API-key voor platformfuncties. Geen abonnement, betaalde backlinkplaatsing, linknetwerk, outreach of social publishing activeren zonder expliciete opdracht.
- `python-seo-automation-pack`: adapter rond de aangeleverde oudere scripts. Gebruik voor Paspoot onze actuele crawler; voer de oude GA-v3-code en hardcoded GSC-configuratie niet automatisch uit.

## Video naar uitvoering

| Videodeel                                     | Toepassing op Paspoot                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 0:00–2:03: nieuws als verkeersbron            | Behandel als experiment. De getoonde verkeerscijfers zijn geen verwachting voor Paspoot.                                 |
| 2:03–8:10: aparte nieuwssectie                | `/nieuws` naast bestaande advies-, airline- en tasstructuur. Geen lege nieuwsindex in de sitemap.                        |
| 8:10–9:36: aansluiting op producten/doelgroep | Alleen huisdierreizen en gevolgen voor voorbereiding; verwijs naar relevante gids/check, geen ongerelateerd massanieuws. |
| 9:36–12:01: onderzoek en bronselectie         | Officiële bronnenlijst, Google News-discovery, brondata en een controleerbare onderzoeksqueue.                           |
| 12:01–15:00: schrijven en herhaling vermijden | Unieke `topicKey`, bestaande inhoud verbeteren, conceptstatus en broncontrole.                                           |
| 15:00–18:06: dagelijkse automatisering        | Dagelijkse Codex-controle met lokaal werk en publicatie na akkoord. De betaalde ARVOW-pitch is geen vereiste.            |

## Databestanden en commando's

`src/content/news.json`: artikelen en status. `docs/seo/news-sources.json`: officiële bronnen. `.data/seo/news-research.json`: actuele onderzoeksqueue. `.data/seo/news-source-state.json`: bronfingerprints. `.data/seo/audit.json`: technische bevindingen. `.data/` is bewust geen publieke content en staat buiten Git.

`npm run seo:audit -- --base http://localhost:3017 --canonical-origin https://www.paspoot.nl` controleert lokaal gerenderde pagina's met de productiecanonical. `npm run news:verify` is ook de prebuild-controle. Nog niet geïndexeerd betekent niet automatisch dat de broncode kapot is: kijk naar individuele URL-inspectie voordat je redirects of canonicals opnieuw verandert.
