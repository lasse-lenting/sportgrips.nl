# Maaistro — content- en intentieaudit

Auditdatum: 25 oktober 2026. Scope: `article` + contentonderdeel van `full-site`, op de lokale Maaistro-broncode. Beoogd domein: **maaistro.nl**; gebruiker bevestigt dat de site nog niet online staat. Deze audit beoordeelt de huidige drie koopgidsen, de keuzehulp, auteurschap en commerciële uitleg. Geen uitspraak over publieke indexatie, rankings, verkeer, conversie of reputatie.

Expliciet toegepast: de aangeleverde **[Agentic SEO Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill)**, lokaal in `skill-source/`, met `resources/agents/seo-content.md`, `resources/skills/seo-plan.md`, `resources/references/llm-audit-rubric.md`, `eeat-framework.md` en `quality-gates.md`. De skillreferenties van 14 mei 2026 zijn ouder dan 90 dagen. Onbewezen algoritmeclaims, vaste woordquota, vermeende verkeersdalingen na updates en garanties voor AI-vermeldingen zijn niet als feiten toegepast. De vergelijkingstemplate voor publishers past bij redactionele gidsen; webshopvereisten zoals voorraad, retouren en checkout horen bij de verkoper, niet bij Maaistro.

## A. Samenvatting

**Oordeel: bruikbare eerlijke basis, nog onvoldoende inhoud om een volwaardige productvergelijker te zijn.** Sterk zijn het beginnen bij de tuin, beperkte maar relevante fabrikantbronnen, herkenbare vervolgstappen en de expliciete uitleg dat er geen praktijktests of modelselectie zijn. Zwak zijn de geringe beslisdiepte, het ontbreken van geverifieerde vergelijkingsdata en het ontbreken van een verantwoordelijke persoon/contactmogelijkheid op de over-pagina.

Drie prioriteiten:

1. Maak de bestaande gidsen beslisvaardig: laat zien wat iemand moet meten, hoe die meting zijn keuze verandert, welke gegevens vergelijkbaar zijn en wat nog onzeker blijft.
2. Bouw bron- en selectiemethodiek vóór een “beste robotmaaier”-lijst: meerdere merken, exacte uitvoeringen, onderscheid tussen fabrikantclaim, documentcontrole en eigen test.
3. Laat keuzehulpuitkomsten aansluiten op alle antwoorden; de huidige uitkomst verwijst bij draadloos altijd naar dezelfde gids en gebruikt terrein niet voor de keuze van de link.

Drie kansen: een eigen tuinmeetblad, een eerlijke vergelijking van installatie/navigatie en een kostencalculator met zichtbare aannames. Daarmee helpt Maaistro de keuze concreter dan met meer algemene blogs.

## B. Huidige inhoud: reproduceerbare bronmetingen

De telling hieronder betreft alleen de tekst in `body` van `src/content/advice.json`, met HTML-tags verwijderd en daarna gesplitst op witruimte. Samenvatting, titel, navigatie en gedeelde CTA tellen niet mee. Dit is een diepte-indicatie, geen Google-norm.

| Bestaande route | Woorden body | Aantal bronlinks | Bedoelde vraag | Wat nu werkelijk beantwoord wordt |
|---|---:|---:|---|---|
| `/advies/robotmaaier-zonder-draad` | 277 | 2 | Past zonder begrenzingsdraad bij mijn tuin? | Begripsuitleg, waarschuwing GPS ≠ automatisch draadloos, vier controlepunten; geen techniekvergelijking of concrete geschiktheidsbeslissing. |
| `/advies/robotmaaier-kleine-tuin` | 315 | 1 | Welke robotmaaier is praktisch voor een klein gazon? | Meten, doorgangen, laadstation en één modelvoorbeeld; geen invulvoorbeeld, afweging tegen andere maaiers of shortlist. |
| `/advies/robotmaaier-grote-tuin` | 309 | 1 | Welke capaciteit/uitvoering heb ik nodig bij veel gras? | Zones, capaciteit, hellingen en servicevragen; geen rekencasus, werktijdscenario of vergelijkbare modeldata. |

Alle vier links verwijzen naar **Husqvarna**. Dat is een passende primaire bron voor eigen specificaties, geen brede onafhankelijke marktvergelijking. De drie gidsen linken in hun eigen `body` niet naar elkaar; gedeelde navigatie en CTA bestaan wel. De zichtbare auteur is “Maaistro”, gelinkt naar `/over-maaistro` (`src/components/page-sections.tsx`, `AdviceDetail`, regels 353–384). Alle gidsen dragen `updatedAt: 2026-10-25`; dat bewijst een inhoudsdatum in de broncode en geen publieke publicatiedatum.

### Broncontrole van bestaande voorbeelden

Op deze auditdatum via de eigen fabrikantpagina's geopend:

- [Aspire R4](https://www.husqvarna.com/nl/robotmaaiers/automower-aspire-r4/): de tabel noemt 400 m² en fysieke draad. Het voorbeeld in de kleine-tuingids is daarmee ondersteund. Geen eigen oordeel over prestaties afgeleid.
- [320 NERA](https://www.husqvarna.com/nl/robotmaaiers/automower-320nera/): de geopende uitvoering 970 81 98-30 noemt 2.200 m² onregelmatig en 3.300 m² systematisch. Dat ondersteunt de waarschuwing in de grote-tuingids om het maaipatroon mee te nemen. Niet veralgemenen naar elke uitvoering of jaargang.
- [Installatiemethoden](https://www.husqvarna.com/nl/leer-en-ontdek/hoe-robotmaaier-installeren/): beschrijft fysieke en virtuele grenzen. Ondersteunt het onderscheid in de draadloosgids.
- [Installatieplanning zonder draad](https://www.husqvarna.com/nl/leer-en-ontdek/plan-draadloze-robotmaaier-installatiegids/): benoemt satellietzicht, connectiviteit en modelafhankelijke ondersteuning bij zwak signaal. Ondersteunt de huidige voorzichtige formulering over bomen en bebouwing; geen universele eisen voor andere merken.

Deze controle valideert bovenstaande specifieke claims. De datum van een eerdere broncontrole in de content is niet herschreven; alle vier pagina's moeten bij een nieuwe inhoudelijke versie opnieuw aan het juiste model en de betreffende claim worden gekoppeld.

## C. Bevindingen

| ID | Gebied | Ernst | Zekerheid | Bevinding en bewijs | Gevolg en aanpak |
|---|---|---|---|---|---|
| C01 | Intentie | Warning | Confirmed | Alle drie gidsen hebben 277–315 bodywoorden en verwijzen vooral naar vragen die de lezer zelf moet uitzoeken. Geen eigen vergelijkingstabel of doorgerekend voorbeeld in `advice.json`. | Informatieve oriëntatie wordt geholpen; een commerciële keuze blijft onaf. Breid uit met concrete meet-/besliscases en controleerbare modellen; beloof nog geen winnaar. |
| C02 | Bronnen | Warning | Confirmed | Vier bronlinks, alle van één fabrikant. | Onvoldoende basis voor een onafhankelijke marktbrede shortlist. Voeg primaire documentatie van relevante andere systemen toe en registreer per claim URL, uitvoering, controle- en wijzigingsdatum. |
| C03 | Keuzehulp | Warning | Confirmed | `garden-form.tsx:208`: `wireless` wint altijd, anders `area <= 500`; `terrain` verandert alleen een advieszin. Er is geen productdataset. | Drie vragen geven beperkt gepersonaliseerde oriëntatie. Benoem dat eerlijk en toon naast hoofdgids ook relevante terrein-/capaciteitsinformatie. Geen algoritmische geschiktheid claimen. |
| C04 | Verantwoordelijkheid | Warning | Confirmed | `AdviceDetail` gebruikt merkbyline; over-pagina beschrijft aanpak en inkomsten maar geen verantwoordelijke maker, biografie of contact-/correctiekanaal. | Een lezer kan expertise of correcties beperkt toetsen. Voeg echte naam/rol, relevante aantoonbare ervaring en werkend contact toe. Geen titels of certificaten verzinnen. |
| C05 | Visueel bewijs | Warning | Confirmed | `docs/photography-prompts.json` registreert gegenereerde stockachtige foto's, ook installatie- en tuininspectiescènes. In `AdviceDetail` is de headerafbeelding decoratief (`alt=""`). | Illustratie bewijst geen test of inspectie. Voeg transparante uitleg over illustratief gegenereerd beeld toe aan de werkwijze; label contextueel als een beeld voor een echte test zou kunnen worden aangezien. Gebruik later echte foto-/meetlogs voor bewijs. |
| C06 | Interne links | Warning | Confirmed | De `body` van de drie gidsen bevat alleen externe bronlinks, geen contextuele links naar de andere twee gidsen. | De overstap van techniek naar tuinindeling kost een omweg. Voeg alleen inhoudelijk relevante kruislinks toe, bijvoorbeeld zonder draad → kleine/grote tuin na de techniekkeuze. |
| C07 | Eerlijkheid | Pass | Confirmed | Over-pagina zegt geen eigen praktijktest te claimen en geen actieve affiliatecodes te hebben; keuzehulp zegt geen specifieke modellen te selecteren. | Goede huidige begrenzing. Behouden; vóór winkelintegratie actuele disclosure bij commerciële links en concrete selectiemethodiek toevoegen. |
| C08 | Leesbaarheid | Pass | Confirmed | Korte paragrafen, herkenbare H2's, samenvatting en praktische opsommingen in alle gidsen. | Geschikt voor oriënterende tuinbezitters. Behoud deze vorm bij verdieping; voeg geen tekst toe om een woordquotum te halen. |
| C09 | Autoriteit | Info | Hypothesis | Site is nog niet online; er zijn geen eigen openbare reputatie-/verkeersgegevens beschikbaar gesteld. | Geen DA-, E-E-A-T-, AI-citatie- of rankingscore. Eerst echte publicatie en daarna eigen data verzamelen. |

De JSON-versie staat in `content-findings.json`. De meegeleverde `finding_verifier.py` kan duplicaten samenvoegen, maar bewijst niet zelfstandig dat SEO-consequenties optreden; handmatige broncontrole blijft vereist.

## D. E-E-A-T en leesbaarheid zonder schijnprecisie

| Aspect | Huidig bewijs | Oordeel | Noodzakelijke volgende stap |
|---|---|---|---|
| Ervaring | Geen gedocumenteerde eigen maaitest; gegenereerde fotografie; expliciete ontkenning van fictieve testervaring. | Eigen gebruikservaring niet aangetoond; transparantie is positief. | Begin eventueel met één echte tuinmeting/installatielog met eigenaarstoestemming, datum, omstandigheden, model, beperkingen en onbewerkte meetresultaten. |
| Deskundigheid | Juist afgebakende Husqvarna-voorbeelden en praktisch bruikbare vragen. | Basiskennis zichtbaar; diepgang en verantwoordelijke maker beperkt aantoonbaar. | Laat claims door een echte bevoegde vakpersoon controleren indien beschikbaar; anders documentcontrole correct benoemen. |
| Autoriteit | Geen openbare site; geen onafhankelijke verwijzingen onderzocht of aangeleverd. | **Unknown**, niet nul of een slechte reputatie. | Na publicatie echte citaties/links bekijken; geen awards, testimonials of perslogo's toevoegen zonder bewijs. |
| Vertrouwen | Over- en privacypagina, beperkingen, bronnen en commercieel model zichtbaar. | Goede start met een contact-/identiteitsgat. | Verantwoordelijke en correctiepad, beeldbeleid, vergelijkingsbeleid en later commerciële labels laten aansluiten op de werkelijke uitvoering. |

Geen numerieke totaalscore: externe reputatie en publieke werking zijn niet meetbaar in deze prelaunchsituatie. Geen AI-detector gebruikt. Geen Flesch-Kincaid-score als Nederlands leesniveau gepresenteerd; een Engels syllabemodel is hier geen valide eindmeting. De observeerbare korte paragrafen en scanstructuur zijn wél beoordeeld.

## E. Eerst de bestaande drie gidsen verbeteren

### P1 — zonder draad: één centrale navigatie-/installatiegids

Behouden URL: `/advies/robotmaaier-zonder-draad`. Hoofdintentie: nagaan of draadloos bij de tuin past, vóór een modelkeuze. Zet “robotmaaier met GPS”, “GPS vs RTK”, “zonder draad en zonder GPS” en “met of zonder begrenzingsdraad” eerst als duidelijk afgebakende onderdelen op deze pagina. Geen tweede generieke GPS-landingspagina met dezelfde shortlist.

Benodigde nieuwe onderdelen:

- Direct antwoord: zonder begrenzingsdraad beschrijft de afbakening, niet één universele navigatietechniek.
- Compacte vergelijking van fysieke draad, satelliet/RTK, camera, LiDAR en hybride systemen: wat doet de techniek, wat moet je plaatsen, wat kan de tuin verhinderen, welke kosten/verbindingen zijn modelafhankelijk.
- Drie expliciet fictieve **reken-/beslisscenario's**: open gazon, beschutte stadstuin en gazon met smalle doorgang. Geen verzonnen gebruikers of testresultaten.
- Checklist vóór aankoop: exacte uitvoering, apparatuur in doos, connectiviteit, abonnementen, support, randafwerking, retourmogelijkheid bij een ongeschikte installatie.
- Primair bewijs van ten minste twee werkelijk vergeleken merken; ieder cijfer aan het model koppelen. Geen generieke nauwkeurigheid, perfecte veiligheid of gegarandeerde dekking beloven.

Klaar als de lezer de techniek kan uitsluiten of gericht kan laten controleren en begrijpt wat nog onzekerder is. Toekomstige productselectie pas na bewijs in de vergelijkingstabel.

### P1 — kleine tuin: van vierkante meters naar een praktische shortlist

Behouden URL: `/advies/robotmaaier-kleine-tuin`. Hoofdintentie: voor een beperkte tuin kiezen zonder onnodige functies of installatiekosten.

- Uitgewerkt meetvoorbeeld van een gazon met terras/border die niet meetellen; downloads/invulblad liever dan extra blog.
- Voorbeeldsituaties: klein open gazon, smalle achterom, los voortuintje. Beschrijf waarom ieder een ander probleem vormt.
- Beslistabel: robotmaaier versus gewone accu-/handmaaier bij weinig gras; benoem meerwerk voor randen en onderhoud zonder universele kosten te verzinnen.
- Per kandidaat exacte uitvoering en bron voor capaciteit, minimale passage, stationseisen en inbegrepen materiaal. Een onvindbare passagebreedte blijft “niet bevestigd”.
- Geen pagina's voor 50/100/200/300/400/500 m² zolang die alleen dezelfde tekst zouden herhalen; gebruik passende secties/filters.

Klaar als minimaal een volledig met voorbeelddata ingevuld vergelijkingssjabloon beschikbaar is en grenzen, kosten en uitsluitingen begrijpelijk zijn.

### P1 — grote tuin: beschikbare maaitijd maakt capaciteit betekenisvol

Behouden URL: `/advies/robotmaaier-grote-tuin`. Hoofdintentie: kiezen voor veel gras, complexe zones en beperkte maaitijden.

- Case met meerdere grasvlakken en verbindingspaden; toon wat gemaaid wordt versus alleen wordt overgestoken.
- Scenario voor beschikbare maaitijd en planning. Geen algemene veiligheidsmarge van bijvoorbeeld 20/30% als natuurwet; fabrikantmethodiek en eigen aannames apart tonen.
- Verschil tussen helling in het werkgebied en bij een rand; ondersteun percentage/graden met een rekenhulp.
- Gecontroleerde tabel met capaciteit per maaipatroon, installatieopties en extra onderdelen van exacte uitvoeringen.
- Downloadbare offertechecklist met installatiewerk, ondersteuning, terugkerende kosten en uitsluitingen. Complex terrein kan een beoordeling ter plaatse nodig maken.

Klaar als een lezer advertenties met verschillende capaciteitsdefinities niet meer rechtstreeks naast elkaar zet en een concreet tuinprofiel aan een verkoper kan meegeven.

## F. Contextgedreven zoekvragen en passende formats

Dit is een **onderzoeksbacklog** op basis van de huidige keuzehulp en de onderzochte eigen concurrentpagina's, geen gemeten zoekvolumelijst, PAA-export of kalender die verplicht moet worden gevuld. Nieuwe URL's hieronder zijn voorstellen en bestaan nog niet. Begin met P1; publiceer pas na broncontrole en menselijke goedkeuring.

| Prio | Zoekvraag / taak | Intentie | Format en eigenaar | Unieke waarde / bewijsvoorwaarde |
|---|---|---|---|---|
| P1 | Robotmaaier zonder draad: past dat bij mijn tuin? | Overwegen | Bestaande draadloosgids | Techniek-/installatiematrix, meerdere primaire merken. |
| P1 | Is GPS hetzelfde als zonder begrenzingsdraad? | Begrijpen | Sectie draadloosgids | Navigatie, diefstaltracking en virtuele grenzen apart verklaren. |
| P1 | Robotmaaier met of zonder begrenzingsdraad? | Afwegen | Sectie draadloosgids | Praktische beslisboom inclusief kosten en tuinveranderingen. |
| P1 | Werkt een draadloze robotmaaier onder bomen? | Geschiktheid | Sectie draadloosgids | Modelafhankelijke beperkingen en fabrikantdocumentatie. |
| P1 | Heb ik wifi, 4G of een abonnement nodig? | Kosten/geschiktheid | Sectie draadloosgids | Connectiviteitstabel per systeem/uitvoering, revisiedatum. |
| P1 | Welke robotmaaier past bij mijn kleine tuin? | Kiezen | Bestaande kleine-tuingids | Meetblad + beperkende tuinfeatures, geen m²-doorwaypages. |
| P1 | Hoe meet ik het gazon voor een robotmaaier? | Doen | Meetblad/tool gekoppeld aan kleine/grote gids | Berekening zichtbaar, uitsluiting terras/border, geen verborgen tracking. |
| P1 | Waar kan het laadstation staan? | Installeren | Checklist in kleine-tuingids | Ruimte/stroom/ontvangst per exact model; geen universele afstand. |
| P1 | Welke robotmaaier voor een grote tuin met meerdere zones? | Kiezen | Bestaande grote-tuingids | Zoneschets en beschikbare-maaitijdscenario. |
| P1 | Kan een robotmaaier twee losse gazons maaien? | Geschiktheid | Sectie grote-tuingids | Bijgebied, transportpad en tillen expliciet uit elkaar. |
| P1 | Robotmaaier voor hellingen: procenten of graden? | Meten/kiezen | Voorstel `/advies/robotmaaier-hellingen`, met omrekenhulp | Eerst rekenmethode + rand-/werkgebiedonderscheid; later kandidaten op primaire specs. |
| P1 | Wat kost een robotmaaier inclusief installatie en gebruik? | Budgetteren | Voorstel `/advies/robotmaaier-kosten`, calculator | Aanschaf, aanleg, onderdelen, energie en eventuele abonnementen als zichtbare invoeraannames. |
| P2 | Hoe vergelijk ik robotmaaiers eerlijk? | Vergelijken | Voorstel `/robotmaaiers`, interactieve vergelijking | Alleen modellen met compleet gecontroleerde datasheet; selectiebeleid vóór ranglijst. |
| P2 | Wat is de beste robotmaaier voor mijn tuin? | Commercieel onderzoek | Dezelfde vergelijking/keuzehub, niet meteen extra “beste”-URL | Scenario-uitkomst met uitleg en onzekerheden; geen universele winnaar. |
| P2 | Segway Navimow of Mammotion: wat past bij mijn situatie? | Vergelijken | Pas later specifieke vergelijking | Exacte actuele modellen, officieel bronregister en werkelijk relevante verschillen. Geen generieke merkcategorie invullen. |
| P2 | Robotmaaier voor een tuin met smalle doorgangen? | Geschiktheid | Eerst secties kleine/grote gids; eigen gids alleen bij genoeg diepte | Meetbare passage-, transport- en randvoorwaarden per model. |
| P2 | Maait een robotmaaier tot aan de rand? | Verwachtingen | Voorstel `/advies/robotmaaier-grasranden` | Randtypes en bijknipwerk; claims uit handleiding, later echte randmetingen. |
| P2 | Robotmaaier zelf installeren of laten doen? | Beslissen | Voorstel `/advies/robotmaaier-installeren` | Vergelijk werkstappen en offertechecklist; link terug naar draadloosgids voor techniek. |
| P2 | Robotmaaier zonder GPS: camera of LiDAR? | Techniek kiezen | Eerst sectie draadloosgids | Geen duplicaat van GPS/draadloos-shortlist; splits alleen bij eigen diepere gebruikersvraag. |
| P2 | Kan een robotmaaier over een tuinpad rijden? | Geschiktheid | Sectie zones in grote-tuingids | Ondergrond, hoogteverschil, transportpad en modelhandleiding. |
| P2 | Wat gebeurt er als het satellietsignaal wegvalt? | Betrouwbaarheid | Sectie draadloosgids | Exact systeemgedrag, documentcontrole, geen garantie op doorwerken. |
| P3 | Robotmaaier winterklaar maken en accu opslaan? | Onderhoud | Seizoenschecklist/voorstel `/advies/robotmaaier-winter` | Fabrikantinstructies voor exact model; geen generiek temperatuurbereik. |
| P3 | Robotmaaier in de regen of bij nat gras? | Gebruik | Onderhoudsgids, niet automatisch nieuwe URL | Waterbestendigheid, grasconditie en aanbevolen gebruik onderscheiden. |
| P3 | Robotmaaier en egels, kinderen of huisdieren? | Veilig gebruiken | Onderbouwde veiligheidsgids | Actuele natuur-/veiligheidsbronnen en handleidingen; geen “veilig dankzij AI”-claim. |
| P3 | Welke mesjes/accessoires zijn compatibel? | Na aankoop/transactie | Compatibiliteitsmodule | Alleen exact gecontroleerde model-/onderdeelnummers; geen willekeurige affiliate upsell. |
| P3 | Hoeveel stroom gebruikt mijn robotmaaier? | Kosten/duurzaamheid | Sectie kostencalculator | kWh/jaar-aannames zichtbaar; geen duurzaamheidsoordeel zonder reikwijdte. |

### Anti-cannibalisatiebesluiten

- Eén eigenaar voor “zonder draad”, “draadloos”, “GPS vs RTK” en “zonder GPS”: de huidige draadloosgids. Een apart navigatieartikel pas bij aantoonbaar andere taak, genoeg inhoud en eigen vergelijking.
- Kleine en grote tuin hebben elk een eigen gebruikssituatie; geen identieke modelranglijst op beide.
- “Robotmaaier vergelijken” en “beste robotmaaier” starten als één keuze-/vergelijkingshub. De redactionele gidsen leren afwegen; de hub vergelijkt concrete producten.
- Kosten, installatie en onderhoud krijgen alleen zelfstandige pagina's wanneer ze een complete eigen taak afhandelen. Geen automatische publicatiequota.
- Product-/merk-/modelpagina's bestaan alleen met exact gecontroleerde uitvoeringen, eigen toegevoegde uitleg en relevante vergelijking. Geen lege landingspagina's om een zoekwoord af te vinken.

## G. Prioriteiten, afhankelijkheden en acceptatie

1. **Voor launch — vertrouwen en redactionele methode**: echte verantwoordelijke/contact, bronregister per claim, generatieve-beeldtoelichting en correctiebeleid. Toets: geen suggestie van maaitests zonder log; alle zichtbare namen/claims controleerbaar.
2. **Voor launch — drie gidsen verdiepen** met bovengenoemde beslisblokken en onderlinge contextlinks. Toets: bestaande hoofdvragen beantwoorden zonder de lezer uitsluitend naar een handleiding door te sturen; elke specifieke technische claim heeft primaire bron en juiste uitvoering.
3. **Voor launch — belofte keuzehulp afstemmen**: hoofduitkomst + relevante extra gidsen, expliciete beperking eerste tuinadvies. Toets: minimaal kleine/vlak/draad, klein/draadloos/helling en groot/onzeker testen; geen willekeurige modelranking.
4. **Na dataset/bronwerk — vergelijking als productfunctie**: per model capaciteit, navigatie, rand-/terreinvoorwaarden, pakket, terugkerende kosten, bron en laatst gecontroleerd. Toets: ontbrekende waarden zichtbaar; geen sortering op commissie; `rel="sponsored"` waar daadwerkelijk commercieel.
5. **Na echte gebruikersvragen/data — uitbreiden**: vraaglog, vrijwillige feedback en Search Console gebruiken om backlog te kiezen. Toets: geen pagina zonder andere hoofdtaak dan een bestaande pagina; echte resultaten met meetperiode rapporteren.

Onbekend blijven: zoekvolumes, exacte SERP-verdeling per query, resultaten van publiek gebruik, productgeschiktheid buiten de gecontroleerde specificaties, bedrijfsidentiteit/contactgegevens en beschikbare echte testcapaciteit. Deze ontbreken niet door een aangetoonde Google-penalty: Maaistro is nog niet publiek.
