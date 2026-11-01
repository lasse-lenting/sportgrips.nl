# Maaistro: schema, beelden en prestatievoorbereiding

Auditdatum: 25 oktober 2026. Scope: de lokale homepage, adviesindex, drie koopgidsen en Over Maaistro. Bestemming: `https://maaistro.nl`; volgens de gebruiker nog niet publiek online. Dit is een voorbereiding op lancering, geen oordeel over huidige Google-indexatie of gemeten productieprestaties.

## A. Samenvatting

De schema-basis staat: servergerenderde JSON-LD met Organization, WebSite, Article en BreadcrumbList, passende zichtbare artikelen en geen verzonnen productsterren. De belangrijkste beeldoptimalisatie is concreet: vier kleine decoratieve foto's bovenaan laden samen **1.684.978 bytes** aan originele beelden van 1536 × 1024 en krijgen in de HTML ook preload-links. Verder laden de artikelhero's nog vaste bronbestanden zonder responsive selectie.

De huidige 22 rasterbestanden zijn samen **12.242.100 bytes** op schijf. Dat is de bibliotheekomvang, **niet** het netwerkgewicht van één paginabezoek. De homepage bevat aanvankelijk 25 img-elementen, waarvan 7 met srcset en 16 met lazy loading. Alle 25 hebben een alt-attribuut; 14 zijn leeg, grotendeels passend bij decoratieve achtergronden, duplicaten en logo's in benoemde links.

Beoordeling: bruikbare basis met duidelijke optimalisatiepunten vóór lancering. **Geen totale SEO-, image- of performancescore**: het aantal beeldfouten is niet hetzelfde als een prestatiemeting. CWV, Lighthouse, CrUX, daadwerkelijke downloadselectie en productiecache zijn niet gemeten.

Top 3 acties:

1. Productie-origin bij de goedgekeurde lancering expliciet op maaistro.nl zetten en alle schema-URLs controleren.
2. Kleine hero-details en artikel-/lifestylebeelden responsive maken zonder de geaccepteerde vormgeving te veranderen.
3. Illustratieve AI-fotografie onderscheiden van eigen testbewijs en de werkelijke herkomst behouden.

Top 3 kansen: kleinere mobiele downloads; duidelijke redactionele herkomst; later eerlijke productspecificaties en echte praktijkwaarnemingen op specifieke modelpagina's.

## B. Bevindingen

| ID | Gebied | Ernst | Zekerheid | Bevinding en bewijs | Aanpak |
|---|---|---|---|---|---|
| SIP-01 | Schema/lancering | Warning | Confirmed | Alle zes lokale captures gebruiken localhost in Organization-, WebSite- en Article-identiteiten. `src/lib/seo.ts` heeft een omgevingsafhankelijke origin. Dit is lokaal verwacht. | Bij lancering de definitieve origin instellen; canonical, OG en JSON-LD daarna op de publieke host opnieuw controleren. |
| SIP-02 | Beeld/netwerk | Warning | Confirmed | Vier hero-thumbnailbronnen zijn elk 1536 × 1024, samen 1.684.978 bytes. Geen srcset/sizes; vier preload-links in home.html. | Kleine passende varianten maken of next/image gebruiken. Alleen de echte kritieke hero voorrang geven. |
| SIP-03 | Responsive beelden | Warning | Confirmed | De drie artikelhero's en diverse purpose-, impact- en achtergrondbeelden zijn plain img zonder srcset. `urban-courtyard.webp` is 675.768 bytes. | Responsive bronselectie met realistische sizes. Behoud reservering van ruimte. |
| SIP-04 | FAQ-schema | Info | Confirmed | Homepage bevat FAQPage; de actuele Google-changelog meldt beëindiging van FAQ rich results per 7 mei 2026. | Zichtbare FAQ behouden. Markup mag voor eenvoud weg, maar dit is geen bewezen rankingfix. |
| SIP-05 | Beeldherkomst | Warning | Confirmed | 21 WebP's zijn aantoonbaar gegenereerd volgens prompts-log. Geen EXIF/IPTC/XMP in de afgeleide bestanden; publieke werkwijzepagina noemt beeldcreatie niet. | Passende uitleg over illustratieve beelden; metadata/provenance bewaren. Echte testfoto's gebruiken voor echte testclaims. |
| SIP-06 | JSON-LD | Pass | Confirmed | Zes captures zijn HTTP 200; alle JSON-LD parsebaar. Drie Article-objecten en sequentiële breadcrumbs. Graph-aware baseline geeft geen fouten. | Behouden; bij lancering Rich Results Test en URL Inspection. |
| SIP-07 | Review-integriteit | Pass | Confirmed | Op deze zes pagina's geen Product, Offer, Review of AggregateRating. Over Maaistro beschrijft de beperkingen eerlijk. | Geen sterren, prijzen of ervaring toevoegen zonder zichtbare geverifieerde inhoud. |
| SIP-08 | Bestaande beeldbasis | Pass | Confirmed | Hero, drie categoriekaarten en drie missiefoto's gebruiken Next Image met responsive attributen. Alle 22 bronbestanden hebben een unieke SHA-256. | Dit patroon doortrekken. Uniciteit is geen gegarandeerde rankingfactor. |
| SIP-09 | CWV | Info / niet gemeten | Confirmed | Alleen lokale devserver beoordeeld; geen veld- of productie-labdata. | Apart meten na productiebuild; velddata verzamelen zodra de site live is. |
| SIP-10 | Audittool | Info | Confirmed | Bundled validator meldt onterecht Missing @type bij een legale @graph-envelope en gebruikt verouderde FAQ-eligibility. | Scriptmeldingen interpreteren met bron- en actuele documentatiecontrole. |

### Schema: wat klopt en wat nog volgt

`src/components/json-ld.tsx` schrijft JSON-LD server-side en escaped `<`. `src/app/layout.tsx` levert de merkorganisatie en website. De koopgidsen leveren Article met headline, representatieve afbeelding, dateModified, taal, mainEntityOfPage, Organization-auteur en publisherverwijzing. Breadcrumbposities starten op 1. Auteursnaam en wijzigingsdatum zijn ook zichtbaar. Geen syntaxisfouten gevonden in de zes captures.

Een organisatie mag auteur zijn; een ontbrekende fictieve persoonsauteur is geen technisch defect. De zichtbare verantwoordelijkheid kan inhoudelijk wel concreter met de echte maker, broncontrole en werkwijze. `datePublished` ontbreekt bij deze nog niet gelanceerde koopgidsen. Vul pas de werkelijke eerste publicatiedatum in bij publicatie, niet de auditdatum. Google noemt de Article-eigenschappen aanbevolen, niet verplicht. Meerdere passende beeldverhoudingen zijn een latere verbetering, geen huidige validatiefout. [Google Article-documentatie](https://developers.google.com/search/docs/appearance/structured-data/article).

De zichtbare FAQ en JSON-LD komen uit dezelfde zes antwoorden. De markup zelf is geen aangetoonde penalty. FAQ rich results bestaan inmiddels niet meer: de documentatie is in juni 2026 verwijderd na beëindiging in mei. De aangeleverde skill noemt alleen de oudere beperking uit 2023 en is op dit punt achterhaald. [Google-documentatie-updates](https://developers.google.com/search/updates).

Voor toekomstige modelreviews moeten de zichtbare beoordeling, reviewer en het beoordeelde product overeenkomen met de markup. Geen beoordelingen van andere websites aggregeren en geen niet-uitgevoerde ervaring in sterren vertalen. Een specifieke productpagina is een andere toepassing dan een algemene koopgids. [Google review-snippetregels](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

### Beelden: levering, toegankelijkheid en herkomst

Inventaris: één aangeleverde hero-JPEG van 2048 × 1152 en 2.072.166 bytes, plus 21 WebP's van 1536 × 1024. De WebP's variëren van 287.626 tot 675.768 bytes. De hero gebruikt Next Image met sizes=100vw en preload. De oorspronkelijke 2 MB is daardoor niet automatisch de grootte die een mobiele browser downloadt. Die feitelijke resourcekeuze is nog niet gemeten.

De kleine hero-details zijn gewone img-elementen en laden hun volledige WebP. Hier is de besparingskans rechtstreeks uit bestand en markup af te leiden. De drie artikelcovers laden ook directe WebP's. Op die covers ontbreekt width/height, maar de CSS reserveert min-height en een grid; dit is **geen bewijs van CLS-falen**. Optimaliseer bronselectie én aspectratio samen. Impactkaarten hebben een vaste CSS-omvang; hun herhaalde bronnen worden normaal door browsercache gedeeld, niet negen keer als negen unieke foto's gedownload.

De huidige imgs zijn in HTML vindbaar. Bronselectie via srcset/sizes en passende betekenisvolle alt helpt browsers en zoekmachines. Een leeg alt is correct wanneer de foto slechts decoratie is naast dezelfde titel of een herhaling van hetzelfde kaartje; voeg geen zoekwoorden aan alle decoraties toe. Herzie de lege artikelhero-alt alleen als de foto inhoudelijke informatie toevoegt die niet elders staat. [Google image SEO](https://developers.google.com/search/docs/appearance/google-images).

`docs/photography-prompts.json` is expliciet: gegenereerde illustratieve lifestylefotografie, geen tests en geen foto's van identificeerbare modellen. Dat is nuttig intern bewijs. De realistische uitstraling is geen bewijs dat Maaistro die situatie of maaier heeft getest. Advies: vermeld passend op de werkwijzepagina dat zulke beelden illustratief zijn; gebruik verifieerbare eigen foto's en testnotities wanneer later praktijkervaring wordt geclaimd.

De afgeleide WebP's hebben volgens Sharp geen EXIF/IPTC/XMP. Google moedigt context over creatie aan. De expliciete IPTC DigitalSourceType-verplichting voor AI-beelden in de aangehaalde documentatie heeft betrekking op Merchant Center. Maaistro gebruikt dat nu niet, dus geen huidige Merchant Center-overtreding of algemene Search-blokkade concluderen. Metadata behouden of juist toevoegen blijft een passende herkomstmaatregel. [Google over generatieve content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

AI-training en Search zijn afzonderlijke controls: Google-Extended regelt gebruik voor bepaalde Gemini-training/grounding, en beïnvloedt de inclusie of ranking in Google Search niet. Botregels aanpassen is dus geen vervanging voor beeldmetadata of image SEO. [Officiële Google crawlerdocumentatie](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended).

### Prestatievoorbereiding

Positief: lokale fonts met font-display=swap, geen actieve analytics-rendering in de rootlayout, lazy voor diverse onder-de-vouwbeelden, CSS-maatvoering voor kaarten, en de echte hero heeft responsive selectie plus preload. Er draaien wel animaties, wisselende purposebeelden en een herhalende impacttrack; zonder trace is hun invloed op INP/CLS onbekend. Niet speculeren dat een bibliotheek of animatie op zichzelf slecht scoort.

De toets na productiebuild gebruikt een aparte poort zodat de meekijkserver bruikbaar blijft. Meet homepage, drie gidsen en keuzehulp op mobiel en desktop. Verzamel networktransfers, LCP-element en laadfasen, lange taken tijdens formulier/FAQ/tabinteracties en layout shifts. Daarna de echte publieke URL nogmaals meten met de werkelijke cache en headers. Een lokale devmeting is geen productiebenchmark.

De huidige CWV-doelen zijn LCP ≤ 2,5 s, INP ≤ 200 ms en CLS ≤ 0,1 op het 75e percentiel, uitgesplitst naar mobiel en desktop. Labdata helpt diagnose; een labscore bewijst geen veld-INP. Een nieuwe site kan nog onvoldoende CrUX-data hebben: noteer dat als niet beschikbaar, niet als fail. [Google Web Vitals](https://web.dev/articles/vitals).

## C. Actievolgorde en acceptatie

1. **Vóór lancering, afhankelijk van de centrale technische audit:** origin maaistro.nl en hostredirectbeleid vastleggen. Acceptatie: canonical, OG, Organization, WebSite, Article en breadcrumbs gebruiken overal de gekozen HTTPS-host; geen localhost/Vercel-preview in publieke metadata.
2. **Quick win, circa een kleine beeldronde:** hero-thumbnailvarianten en artikelcover-/lifestyle-srcset implementeren met dezelfde foto's en uitsneden. Acceptatie: een mobiele resource-opname toont kleinere gekozen bronnen; uitstraling en inhoud blijven gelijk. Geen vaste universele KB-SEOlimiet opleggen.
3. **Vóór productclaims:** publieke werkwijze, beeldcontext en echte verantwoordelijkheid afmaken. Acceptatie: geen gegenereerde afbeelding wordt als testfoto of bewijs voor prestaties gebruikt; echte bronnen ondersteunen specificaties.
4. **Onderhoud:** FAQPage eventueel verwijderen; geen zichtbare FAQ verwijderen voor een richresult-optimalisatie. Article-publicatiedatums alleen bij feitelijke publicatie aanvullen.
5. **Meetronde:** productiebuild buiten de huidige devpoort; representatieve labscenario's, daarna publieke verificatie na expliciete toestemming voor lancering. Acceptatie: opgeslagen rapporten met omstandigheden, URL, datum en gemeten waarden; geen verzonnen score of verkeersverwachting.

## D. Onbekend, beperkingen en toolcontrole

- Niet gemeten: productie-TTFB/cache/CDN, compressie, werkelijke mobiele beeldselectie, JS-kosten, LCP/INP/CLS, velddata, Rich Results Test en Google URL Inspection.
- Bundled `parse_html.py`, `validate_schema.py` en `readability.py` zijn op alle zes opgeslagen HTMLcaptures gedraaid. De readability-uitvoer is niet als Nederlands leesbaarheidsrapport of rankingfactor gebruikt: de Engelse formule is daarvoor onvoldoende passend.
- `validate_schema.py` geeft op alle captures exit 1 wegens Missing @type op de @graph-envelope. Een getypeerde node is daar niet vereist. Eigen graph-aware basiscontrole toont alle daadwerkelijke types en valide JSON; dit is geen vervanging voor de volledige Schema.org-validator of Rich Results Test.
- Eerste directe localhostfetch werd door de sandbox geblokkeerd; één geautoriseerde retry leverde zes HTTP 200-captures. Dit was een omgevingsbeperking, geen websitefout. Geen PageSpeedaanroep op een onbereikbaar localhostadres gedaan.
- De skillreferenties zijn ouder dan 90 dagen en bevatten onder meer ononderbouwde vaste AI-citatiepercentages, update-effecten en vervallen FAQ-ondersteuning. Die claims zijn niet als Google-regel, scorestraf of prognose overgenomen.
- Audituitvoer is gecontroleerd met de meegeleverde finding_verifier: tien unieke bevindingen, geen gedropte dubbelen. Die verifier dedupliceert; de broncontrole hierboven levert de inhoudelijke verificatie.

## Bewijsbestanden

Map `evidence/schema-images/` bevat zes HTMLcaptures, HTTPheaders/status, de gebundelde parse-/schema-/readability-uitvoer, asset-inventory.json met maatvoering/bytes/herkomstvelden/hashes, rendered-inventory.json met img/preload/schema, graph-aware-validation.json en findings-verified.json. `schema-images-findings.json` bevat de bevindingen als herbruikbare records. Geen productcode gewijzigd, geen build op poort 3000, geen push of deployment uitgevoerd.
