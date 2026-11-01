# Maaistro — aanbevolen site- en URL-structuur

25 oktober 2026. **Dit is een voorstel.** Alleen de eerste zeven hieronder bestaan als bedoelde Maaistro-pagina’s. Een URL in dit plan is geen gepubliceerde pagina.

## Huidige launchbasis

| URL | Huidige functie | Actie |
|---|---|---|
| / | Merk, uitleg en eerste keuzehulp via #volunteer-apply | Behouden; de verwijderde dubbele koopgidsencarrousel blijft weg |
| /advies | Overzicht van de drie gidsen | Uitbouwen met inhoudelijk passende categorieën zodra die content bestaat |
| /advies/robotmaaier-zonder-draad | Navigatie/afbakening | Verdiepen; GPS/RTK eerst hier |
| /advies/robotmaaier-kleine-tuin | Kleine tuin | Verdiepen; geen dunne m²-varianten |
| /advies/robotmaaier-grote-tuin | Grote tuin/capaciteit | Verdiepen |
| /over-maaistro | Identiteit, aanpak, affiliate-uitleg | Echte verantwoordelijke en contactroute toevoegen |
| /privacy | Huidige gegevensverwerking | Op werkelijke meting en integraties laten aansluiten |

Bij de eerste audit waren 18 legacy-Paspoot-pagina’s bereikbaar. Die zijn inmiddels lokaal uit de publicatie verwijderd; oude redirectvoorbeelden geven lokaal 404. De publieke deploy moet dit nog bevestigen. Geen irrelevante massaredirect naar home.

## Uitbreiding in volgorde van bruikbaarheid

```text
/
├── keuzehulp                         eigen taakpagina; hetzelfde adviescomponent
├── advies                           redactionele hub
│   ├── robotmaaier-zonder-draad      bestaand
│   ├── robotmaaier-kleine-tuin       bestaand
│   ├── robotmaaier-grote-tuin        bestaand
│   ├── robotmaaier-hellingen
│   ├── robotmaaier-smalle-doorgang
│   ├── robotmaaier-meerdere-gazons
│   ├── robotmaaier-bomen-schaduw
│   ├── wat-kost-een-robotmaaier
│   ├── gazon-oppervlakte-meten
│   └── robotmaaier-winterklaar
├── tools
│   ├── helling-berekenen
│   └── robotmaaier-kosten
├── robotmaaiers                      later: echte vergelijker/dataset
│   └── [merk-model]                  later: volledig modeldossier
├── beste-robotmaaier                 later: onderbouwde selectiegids
├── merken/[merk]                    later: inhoudelijk gevulde merkhub
├── vergelijken/[model-a]-vs-[model-b] later: bewuste selectie, geen kruislings massawerk
├── werkwijze
├── contact
├── over-maaistro
└── privacy
```

Vierkante haakjes zijn templates, geen indexeerbare pagina’s. Hulpmiddelen hoeven niet automatisch elk een SEO-landingspagina te krijgen: een tuincheck kan eerst als download in de keuzehulp worden aangeboden.

## Navigatie en interne links

Behoud het geaccepteerde ontwerp en de huidige hoofdnavigatie. Bij een zelfstandige keuzehulppagina kan de bestaande link later van hash naar /keuzehulp wijzen. Verander “Robotmaaiers” pas naar een vergelijker wanneer die werkelijk bestaat; nu verwijst die link naar de categoriekaarten.

De adviesindex linkt naar iedere gepubliceerde gids. Een gids linkt terug naar de hub en op het afwegingsmoment naar de passende naburige gids of tool. Iedere nieuwe publicatie krijgt minimaal één relevante link vanaf een bestaande bereikbare pagina; een sitemap is geen vervanging daarvoor.

Voorbeelden:
- Zonder draad → kleine tuin/grote tuin; bij ontvangstvragen → bomen.
- Kleine tuin → gazon meten, smalle doorgang en randafwerking.
- Grote tuin → meerdere gazons, hellingen en kosten.
- Hellinggids ↔ hellingcalculator.
- Kostengids ↔ kostenplanner; methodiek bij de vergelijking.
- Modeldossier → alleen relevante gidsen en werkelijk vergelijkbare modellen.

Geen exacte-linkquota. Kies links die de volgende vraag oplossen.

## Canonical, filters en sitemap

Voorkeursorigin als werkvoorstel: https://www.maaistro.nl. Bevestig hosting/DNS en redirectbeleid bij lancering. Alle canonicals, OG-URLs, JSON-LD-identiteiten en sitemap-URLs moeten diezelfde origin gebruiken.

Geen geïndexeerde filtervarianten per oppervlakte × merk × navigatie. Niet-indexeerbare UI-filters krijgen passende technische verwerking na ontwerp; canonical is geen universele oplossing voor inhoudelijk verschillende resultaten. Geen lege merk- of modelpagina’s in sitemap. Laat alleen goedgekeurde routes met echte inhoud HTTP 200 geven.

Concepten staan in docs, buiten src/app en sitemap. Publieke preview beschermen. Bij het verwijderen van legacy-onderdelen blijven gedeelde Maaistro-componenten en huisstijl behouden.

## Nieuw of samenvoegen?

1. Dezelfde vraag met een ander woord? Werk de bestaande pagina bij.
2. Nieuwe vraag met eigen afweging/uitkomst? Overweeg een eigen gids.
3. Alleen één ontbrekend detail of korte definitie? Voeg een sectie toe.
4. Geen bronnen/data of geen duidelijke volgende stap? Nog niet publiceren.
5. Querydata kunnen later andere clusters aantonen; herzie de indeling op bewijs.
