# Maaistro — eerste productselectie en instroom

Onderzocht op 25 oktober 2026 met Computer: bol-partneromgeving, Google-resultaten en officiële fabrikantpagina’s. Dit is een redactionele shortlist voor de eerste inrichting, geen eigen praktijktest, definitieve ranglijst of gepubliceerde selectie.

**Latere lokale uitvoering:** de productpagina, koppeling aan de keuzehulp en bol-trackinglinks zijn inmiddels lokaal gebouwd. De gebruiker koos daarna voor compacte kaarten en producten onderaan de koopgidsen. Zie [uitvoering en verificatie](2026-10-25-implementation.md). De tekst hieronder beschrijft het eerdere onderzoeksmoment; er is nog geen nieuwe productiepublicatie uitgevoerd.

## Instroom: producten eerst bij koopgerichte vragen

Aanbevolen route: zoekvraag of tuinsituatie → relevante productvergelijking → winkel. De keuzehulp is een alternatief voor wie nog niet weet wat past. Een blogindex hoeft geen tussenstap te zijn.

De drie bestaande `/advies/`-URL’s kunnen hybride landingspagina’s worden: korte introductie, concrete modellen en vergelijking bovenaan; uitleg, bronnen en FAQ eronder. Behoud bestaande URL’s. Geen extra vrijwel gelijke pagina’s voor dezelfde intentie maken. Een eventuele algemene `/robotmaaiers`-hub bundelt de producten met filters.

Op de homepage blijven de drie bestaande tuinkaarten staan. Verander bij uitvoering hun CTA naar **Bekijk de selectie**. Toon echte modelnamen en echte productbeelden op de bestemmingspagina. Productcards krijgen capaciteit met voorwaarden, navigatie/installatie, waarom het model hier staat, één concreet nadeel en een winkelknop. Geen verzonnen sterren of testwinnaarlabels.

## Wat de zoekresultaten lieten zien

Momentopname, geen vaste ranking of zoekvolumemeting. Alleen de zichtbare zoekresultaattypen zijn beoordeeld; dit is geen inhoudelijke audit van alle gevonden concurrenten.

| Zoekvraag | Voorbeelden in de organische resultaten | Gevolg voor Maaistro |
|---|---|---|
| Robotmaaier zonder draad | Coolblue draadloze categorie, HDS collectie, Husqvarna draadloze modellen; daarnaast gidsen | Vergelijking en modellen direct bovenaan; uitleg over RTK, LiDAR en camera eronder |
| Robotmaaier kleine tuin | Tink topselectie, Coolblue categorie, Husqvarna keuzehulp, Kress advies met modellen | Korte keuzehulp en een compacte productselectie naast elkaar; formaat alleen is onvoldoende |
| Robotmaaier hellingen | GARDENA uitleg, Eufy/Sunseeker gidsen, Husqvarna installatieadvies en AWD-selecties | Eerst kort helpen de helling en situatie te beoordelen, daarna passende modellen; geen onvoorwaardelijke AWD-belofte |

Voorbeelden: [Coolblue zonder draad](https://www.coolblue.nl/robotmaaiers/draadloze-robotmaaiers), [Coolblue kleine tuin](https://www.coolblue.nl/robotmaaiers/voor-kleine-tuin), [GARDENA hellingen](https://www.gardena.com/nl/c/ondersteuning/planning-en-advies/robotmaaier-support-center/informatie/robotmaaier-en-hellingen).

## Eerste shortlist

| Model | Rol in de selectie | Belangrijkste afweging | Fabrikantbron |
|---|---|---|---|
| GARDENA SILENO minimo 500 | Compact gazon met draad | Draad aanleggen; Bluetooth-bediening in de buurt, niet via internet op afstand | [Productpagina](https://www.gardena.com/nl/producten/gazononderhoud/robotmaaiers/robotmaaier-sileno-minimo-500-m/970462906.html) |
| Segway Navimow i105E | Compact gazon zonder draad | RTK + Vision; installatie, signaal en exacte uitvoering controleren | [i1-serie in assortiment](https://nl.navimow.com/collections/navimow-i-series-robot-lawn-mower) |
| MOVA 1000 | Draadloos alternatief zonder RTK-station | LiDAR; capaciteit niet los zien van modus en beschikbare maaitijd | [Productpagina](https://www.mova.tech/products/mova-1000-robot-lawn-mower) |
| Mammotion LUBA mini 2 AWD 1000 | Meer gazon en behoefte aan AWD | NetRTK + AI Vision; dekking, verbindingsvoorwaarden en terrein controleren | [Fabrikantcollectie](https://nl.mammotion.com/collections/all) |

De volledige bol-URL’s, product-ID’s, feiten en controles staan in [first-selection.json](2026-10-25-first-selection.json). Er zijn geen affiliate-URL’s gegenereerd.

## Concrete bevindingen die de vergelijking beter maken

- GARDENA specificeert voor de minimo 500: 500 m², 25% binnen het werkgebied en 10% bij de draad. Een randhelling is dus een andere limiet.
- MOVA onderscheidt bij de 1000 **800 m²/24 uur in Standard Mode** en **1.200 m²/24 uur in Efficient Mode**. Dit zijn fabrikantscijfers voor dagelijkse maaiprestatie; niet automatisch de tuinoppervlakte waarvoor elke situatie geschikt is.
- De actuele Mammotion-collectie beschrijft de mini 2 AWD **1000** met **NetRTK + AI Vision**, terwijl de mini 2 AWD **1500** **LiDAR + AI Vision** gebruikt. De namen lijken op elkaar, maar de techniek verschilt.
- Bij Navimow verwijst de oude product-URL naar een 404 en is de huidige i105E-detailpagina voor een gereviseerd exemplaar. Er staan ook tegenstrijdige vertaalde maaihoogte-/hellingteksten. Daarom die waarden niet overnemen voordat de juiste handleiding en bol-uitvoering zijn vergeleken.
- Een paar merkloze/generieke bol-vermeldingen zijn niet opgenomen: exacte fabrikant, model en onderbouwing waren onvoldoende duidelijk.

## Voor gebruik in de publieke site

De bol-productpagina’s waren in de onderzoeksbrowser geblokkeerd. De gevonden Google-vermeldingen zijn bruikbaar om kandidaten en product-ID’s te identificeren, niet om actuele voorraad, prijs, verkoper of conditie vast te stellen. De shortlist is daarom nog niet publicatieklaar.

1. Open de vier exacte bol-producten in de bestaande gebruikerssessie; vergelijk EAN/model, conditie, verkoper, garantie en pakketinhoud.
2. Bevestig welk bol-Site-ID bij **Maaistro** hoort. Gebruik door bol gegenereerde links; hergebruik geen Paspoot-referral of Google Shopping-referrer.
3. Haal productafbeeldingen via toegestaan bol-promotiemateriaal. Gegenereerde tuinbeelden niet als modelafbeelding gebruiken.
4. Zonder actuele prijsbron: knop **Bekijk actuele prijs bij bol** en geen vaste prijs/voorraadclaim.
5. Zet disclosure bij de selectie en `rel="sponsored noopener"` op affiliate-winkelverwijzingen. Kies en rangschik op tuinsituatie en controleerbare gegevens, niet op commissie.
6. Publiceer pas wanneer de bovenstaande gegevens zijn gecontroleerd. De huidige site, sitemap en bestaande koopgidsen zijn in dit onderzoek niet gewijzigd.
