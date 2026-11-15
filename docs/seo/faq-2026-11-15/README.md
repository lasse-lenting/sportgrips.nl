# Think-fase FAQ's — 15 november 2026

Opdracht: de aangeleverde FAQ's toevoegen en daarna live zetten. Bron:
`../source/Sportgrips_Think_Fase_FAQs-v2.xlsx` (ongewijzigde kopie).

## Inhoud en implementatie

- Alle **41** vragen en antwoorden uit `Alle FAQs` zijn woordelijk overgenomen op de **15** aangegeven, al bestaande URLs. Het overzichtsblad noemt nog 40; de extra chamoisvraag staat wel in de inhoud en is meegenomen. De aangeleverde HTML/JSON-LD-voorbeelden bevatten dezelfde 41 paren.
- Bestaande paginainhoud, routes, producten, media, fonts, metadata en indexeringsregels zijn behouden.
- `src/content/grips.json` bevat de vragen, antwoorden en sectietitels. `CategoryFaqSection` rendert native `details`/`summary` en één `FAQPage`-JSON-LD-blok uit dezelfde gegevens.
- De FAQ staat na de uitleg/productselectie en vóór bronnen/verder lezen. De inhoudsopgave verwijst naar de FAQ-kop. Alle antwoorden staan direct in de gegenereerde HTML; uitklappen werkt zonder JavaScript en met Enter/Spatie.
- Styling gebruikt bestaande ontwerptokens; H1-gewicht blijft 400. De technische voorbeeldcode uit Excel is als referentie gebruikt, niet uitgevoerd of rechtstreeks als HTML ingevoegd.
- Dit is een implementatie van aangeleverde redactionele tekst; geen nieuwe producttest, medische beoordeling of claim over zoekresultaten.

## Lokale controle

- `npm run lint`, `npm run typecheck`, `npm run build` en `git diff --check`: geslaagd.
- Controle van de brongegevens: alle 41 vraag/antwoord-paren exact gelijk aan Excel; bestaande paginagegevens verder gelijk aan de vorige commit.
- HTTP-controle: 49 pagina's, 2.783 interne linkverwijzingen, canonicals, JSON-LD, noindex op lokaal, sitemap/robots, 404's en behoud van de 160 oorspronkelijke media-assets: geslaagd (`check-local-http.json`).
- Chromium: alle 15 FAQ-pagina's zonder JavaScript gecontroleerd op inhoud, schema, inhoudsopgave, positie en toetsenbordbediening. Een pagina buiten de bron krijgt geen FAQ.
- Padelpagina op 1440, 390 en 320 px: uitklappen werkt, fonts geladen, H1 400, geen horizontale overflow of runtimefouten (`check-local-browser.json`). Desktop- en mobiele screenshots visueel beoordeeld.

Productie wordt na deze controles gepubliceerd en daarna afzonderlijk gecontroleerd.
