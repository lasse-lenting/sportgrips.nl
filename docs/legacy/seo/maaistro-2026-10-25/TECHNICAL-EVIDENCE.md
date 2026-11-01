# Maaistro — technische audit vóór lancering

**Scope:** full-site technische subaudit van de huidige werkboom en de lokale ontwikkelserver `http://localhost:3000`, op 25 oktober 2026. Bedoeld domein: `maaistro.nl`; volgens de gebruiker is Maaistro nog niet online. Dit rapport bewijst lokale werking en launchrisico’s, geen publieke indexatie of SEO-resultaten. De expliciet gevraagde [Agentic SEO Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) is toegepast met broncontrole, HTTP-bewijs, offline HTML-parser en finding verifier. Geen productcode gewijzigd en geen build, push of deployment uitgevoerd.

## A) Audit summary

**Oordeel:** nuttige technische basis voor zeven Maaistro-pagina’s; de gekopieerde Paspoot-publicatie is nog niet verwijderd. Een publieke launch moet wachten op de legacy-opruiming en de definitieve host-/previewconfiguratie. **Technical score: Insufficient data** voor een volledige score: productie-HTTPS, productie-rendering, veld-CWV en indexatie zijn nog onbekend. Er wordt geen schijnprecisie uit een lokale ontwikkelserver afgeleid.

| Meting | Uitkomst |
|---|---:|
| Lokaal opgevraagde URL’s | 43 |
| Actieve Maaistro-pagina’s | 7; alle HTTP 200 |
| Actieve Maaistro-pagina’s met één H1, title, description, canonical | 7/7 |
| Paspoot-pagina’s met HTTP 200 zonder noindex | 18 |
| Kapotte interne linkinstanties op legacy-pagina’s | 5, naar 3 verschillende 404-doelen |
| Kapotte interne links/ankers gevonden op de zeven actieve pagina’s | 0 binnen deze crawl |
| Waargenomen permanente redirects | 8: 7 oude routevoorbeelden + 1 slash-normalisatie |
| Sitemap | 7 Maaistro-URL’s, lokaal HTTP 200 |

**Top drie issues:** (1) achttien reispagina’s kunnen bij een ongewijzigde launch onder Maaistro verschijnen; (2) oude redirects houden die reisinhoud bereikbaar; (3) de definitieve canonical host en previewbescherming zijn nog niet ingesteld. Dit zijn **launch gates**, geen bewezen huidige Google- of rankingproblemen.

**Top drie kansen:** publiceer één thematisch schone site; behoud de huidige servergerenderde gidsen en duidelijke HTML-links; neem een kleine reproduceerbare launchcontrole mee voor alle nieuwe pagina’s.

## B) Findings table

De volledige Evidence/Impact/Fix-velden staan in [technical-findings.json](technical-findings.json). De skill-verifier heeft acht unieke bevindingen behouden; zie [verified-findings.json](evidence/technical/verified-findings.json). De verifier dedupliceert en vervangt geen menselijke inhoudelijke beoordeling.

| ID | Area | Severity | Confidence | Finding | Evidence | Fix |
|---|---|---|---|---|---|---|
| TECH-01 | Indexability / migratie | Warning | Confirmed | 18 legacy-pagina’s geven 200 zonder noindex. | [Route-inventaris](evidence/technical/route-summary.json); robots staat `/` toe. | Verwijder legacy-publieke routes en archiveer buiten publicatie. P0 vóór launch. |
| TECH-02 | Redirects | Warning | Confirmed | 6 van 7 oude redirectregels wijzen inhoudelijk naar reisroutes. | [Redirect-map](evidence/technical/redirect-map.json), `next.config.ts`. | Verwijder Paspoot-specifieke redirects; geen ongerelateerde massaredirects naar home. |
| TECH-03 | Interne links | Warning | Confirmed | 5 legacy-links geven 404. | [Linkfouten](evidence/technical/internal-link-issues.json). | Legacy-opruiming, daarna opnieuw crawlen. Geen huisdiergidsen voor Maaistro bijschrijven. |
| TECH-04 | Canonical host / preview | Warning | Confirmed | Lokaal correcte localhostmetadata; geen generieke noindex voor een later publieke preview. | [Sitemap](evidence/technical/raw/sitemap.xml.txt), [robots](evidence/technical/raw/robots.txt.txt), `src/lib/seo.ts`. | Bij launch expliciete `https://maaistro.nl`-origin; hostredirects en previewbescherming verifiëren. |
| TECH-05 | HTML / on-page basis | Pass | Confirmed | Alle 7 actieve pagina’s hebben hoofdinhoud en metadata in raw HTML. | [Samenvatting](evidence/technical/technical-summary.json), raw HTML. | Servergerenderde structuur behouden; productie opnieuw controleren. |
| TECH-06 | Sitemap-scope | Pass | Confirmed | Alleen de 7 bedoelde Maaistro-pagina’s staan in sitemap. | [Sitemap-HTTP-respons](evidence/technical/raw/sitemap.xml.txt). | Scope behouden, host instellen, wijzigingsdatum later per echte wijziging. |
| TECH-07 | 404 / normalisatie | Pass | Confirmed | 404’s zijn echte 404’s met noindex; slash normaliseert met 308. | [Route-summary](evidence/technical/route-summary.json). | Behouden; ook legacy-404/410 expliciet testen na opruiming. |
| TECH-08 | Bewijsgrenzen | Info | Confirmed | Publieke SEO/prestaties/security zijn nog onbekend. | Gebruikersbevestiging + lokale scope. | Na goedgekeurde lancering publiek opnieuw meten. |

### Bevestigd legacy-oppervlak

Alle onderstaande paden geven lokaal HTTP 200 met een eigen canonical en zonder noindex. Canonicals op `localhost` zijn in deze lokale context te verwachten. Het risico ontstaat bij ongewijzigde publicatie op het nieuwe domein.

- `/cabinecheck`, `/reistassen`, `/luchtvaartmaatschappijen`, `/over-paspoot`, `/nieuws`.
- Zeven detailpagina’s onder `/reistassen/`.
- Vijf detailpagina’s onder `/luchtvaartmaatschappijen/`.
- `/nieuws/huisdier-groot-brittannie-goedgekeurde-vliegroutes`.

De precieze achttien URL’s staan in [route-summary.json](evidence/technical/route-summary.json). Het nieuwsbericht heeft in `src/content/news.json` nog `status: published`, een publicatiedatum en een historisch `approvalRef` uit Paspoot. Dat is geen aparte goedkeuring voor Maaistro-publicatie. Het bericht is dus geen verborgen concept: het wordt momenteel lokaal zonder noindex weergegeven.

### Redirect-map

| Bronvoorbeeld | HTTP | Doel | Lokaal einddoel |
|---|---:|---|---:|
| `/volunteer` | 308 | `/cabinecheck` | 200 |
| `/projects` | 308 | `/reistassen` | 200 |
| `/projects/reistas-hond-vliegtuig-klm-afmetingen-46x28x24cm` | 308 | `/reistassen/reistas-hond-vliegtuig-klm-afmetingen-46x28x24cm` | 200 |
| `/events` | 308 | `/luchtvaartmaatschappijen` | 200 |
| `/events/klm` | 308 | `/luchtvaartmaatschappijen/klm` | 200 |
| `/blogs` | 308 | `/advies` | 200 |
| `/blogs/klm` | 308 | `/luchtvaartmaatschappijen/klm` | 200 |
| `/advies/robotmaaier-zonder-draad/` | 308 | `/advies/robotmaaier-zonder-draad` | 200 |

308 is permanent en op zichzelf geen SEO-fout. De inhoudelijke Paspoot-bestemmingen zijn het probleem. Er is bij deze voorbeelden één stap naar een 200-einddoel waargenomen, geen lus. Gedrag voor willekeurige onbekende slugs is niet volledig getest.

### Metadata, robots en sitemap

De huidige metadata-helper bouwt canonicals, Open Graph, schema-ID’s en sitemap-URL’s vanuit `NEXT_PUBLIC_SITE_URL`, daarna eventueel de Vercel-productiehost, anders localhost. Een productiecanonical is daarom configureerbaar, maar nog niet publiek aangetoond. Stel de definitieve origin expliciet in en test de uiteindelijke host; neem niet automatisch aan dat de hostingfallback `maaistro.nl` is.

`robots.txt` geeft `User-Agent: *`, `Allow: /`, `Disallow: /api/` en een localhost-sitemap. Er zijn geen aparte AI-crawlerregels. Die afwezigheid is geen automatische Google-indexeringsfout en vereist een beleidskeuze, geen willekeurige lijst met bots. Een publiek bereikbare preview moet afzonderlijk worden afgeschermd; alleen robots blokkeren is geen afdoende vervanging voor passende previewbescherming/noindex.

De sitemap bevat zeven bedoelde pagina’s. Alle `lastmod`-waarden zijn momenteel vast `2026-10-25`; voor deze eerste inhoud is dat niet als fout bewezen. Bij latere wijzigingen moeten echte paginawijzigingen de waarde bepalen. Verwijder geen nuttige pagina uitsluitend wegens een arbitraire woordentelling.

`/llms.txt` geeft 404; dit wordt als context gemeld, niet als launch blocker of bewezen factor voor ranking/indexatie. Schema-eligibility en contentkwaliteit worden in het centrale auditrapport apart beoordeeld. Een zichtbare FAQ of geldige JSON-LD bewijst geen recht op een Google FAQ rich result.

## C) Prioritized action plan

1. **P0 / voor lancering — legacy-opruiming:** verwijder de publieke Paspoot-routegroepen, oude redirects, het reisnieuws en bijbehorende publicatieconfiguratie. Deelbare Maaistro-componenten en fonts behouden; ongebruikte bronarchieven buiten publieke routes bewaren. Geen ongerelateerde redirectmapping verzinnen.
2. **P0 / releaseconfiguratie:** definitieve origin `https://maaistro.nl` vastleggen, voorkeur voor wel/geen www bevestigen in hosting, publieke preview afschermen. Na publieke deployment HTTP→HTTPS en alias→canonical-host in één permanente stap testen. Productie mag juist geen onbedoelde noindex bevatten.
3. **Quick win / regressie:** crawler opnieuw draaien op de publicatiebuild; alle bedoelde URL’s 200, één canonical, correcte host in robots/sitemap/schema, geen legacy-200’s, geen kapotte links/ankers.
4. **Onderhoud:** nieuwe publicatiepagina’s met intentie, metadata, echte updategegevens en sitemap-toevoeging opnemen; publicatie pas na expliciet gebruikersakkoord.
5. **Na lancering:** Search Console eigendom en sitemap instellen; URL-inspectie, echte publieke headers en labmetingen apart verzamelen. Later veld-CWV en zoekdata beoordelen zodra beschikbaar. Een ingediende sitemap is geen bewijs van indexatie.

## D) Unknowns en omgevingslimieten

- Geen publieke versie bezocht of geïnspecteerd; geen DNS-, TLS-, www/geen-www-, hosting-, Search Console-, rank- of bezoekersconclusies.
- Ontwikkelserverheaders en laadtijden zijn geen betrouwbare productie-/CWV-meting. Geen INP/LCP/CLS-scores verzonnen.
- Geen hydrationconsole- of uitgebreide visuele/mobiele test in deze subaudit. De HTML heeft een viewport en Nederlandse taalinstelling; dat bewijst niet alle mobiele interacties.
- Geen volledige externe-link- of affiliatevalidatie in deze lokale routecrawl; alleen interne pagina-URL’s en ankers zijn gecontroleerd.
- De gevraagde skill-fetcher weigert localhost door zijn private-IP-bescherming. Die bescherming is niet gewijzigd. De fout staat in [skill-fetch-attempt.txt](evidence/technical/skill-fetch-attempt.txt). De gebruiker heeft de lokale preview als auditdoel aangewezen; een afzonderlijke, exact tot `localhost:3000` beperkte read-only crawler bewaart raw responses. De originele skill-parser is vervolgens **offline** op dat HTML-bewijs gebruikt.
- De runtime is de huidige dirty werkboom; lopende UI-wijzigingen zijn behouden. Er is niet gebouwd of gedeployed. Source snapshots met regelnummers en SHA-256 staan in [source-snapshots.json](evidence/technical/source-snapshots.json).

## Bewijsbestanden en reproduceerbaarheid

- [Volledige HTTP/HTML-inventaris](evidence/technical/route-inventory.json): status, headers, raw-pad, SHA-256, metadata, bodytekst en links per URL.
- [Compacte route-inventaris](evidence/technical/route-summary.json).
- [Raw responses + parseroutput](evidence/technical/raw/).
- [Linkfouten](evidence/technical/internal-link-issues.json).
- [Redirect-map](evidence/technical/redirect-map.json).
- [Samenvattende tellingen](evidence/technical/technical-summary.json).
- [Read-only lokale crawler](evidence/technical/crawl_local.py); requests gaan uitsluitend naar `localhost:3000`.
- [Gestructureerde bevindingen](technical-findings.json) en [skill-verificatie](evidence/technical/verified-findings.json).
