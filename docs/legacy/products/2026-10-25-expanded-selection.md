# Uitgebreide selectie en keuzehulp — lokale versie

Brononderzoek: 25 oktober 2026. Geen eigen praktijktest. Nog niet gepubliceerd.

## Selectie

Acht uitvoeringen, zeven modelseries: de bestaande Navimow i105E, GARDENA SILENO minimo 500, MOVA 1000 en LUBA mini 2 AWD 1000, aangevuld met:

| Uitvoering | Fabrikantbron | Gecontroleerde afweging |
| --- | --- | --- |
| Husqvarna Aspire R4 | https://www.husqvarna.com/nl/robotmaaiers/automower-aspire-r4/ | 400 m²; draad; 25% werkgebied / 10% rand; standaardpakket en installatiekit onderscheiden |
| Worx Vision M600 WR206E | https://eu.worx.com/en/robot-mower-landroid-vision-ai-for-lawns-up-to-600-m2-wr206e/ | 600 m²; camera; 30%; één zone als ideale situatie; RFID/magneetstrips en accupakket controleren |
| eufy E15 / E18 | https://www.eufy.com/nl/robot-lawn-mower-e-series | 800 / 1.200 m²; camera; 18° / circa 32%. Productpagina https://www.eufy.com/nl/products/t2880ga1 noemt ook 40% bij 18°: tegenstrijdigheid expliciet; lagere grens gebruikt. Garage verschilt per pakket. |

Exacte afbeeldingen, retailer-product-ID’s en bestaande fabrikantbronnen staan in `src/content/mowers.ts`. bol-bestemmingen geïdentificeerd; actuele prijs, voorraad, verkoper en pakket zijn niet rechtstreeks bevestigd. Geen vaste prijzen, reviews of beschikbaarheidsclaims.

Niet toegevoegd: Husqvarna 320 NERA. De huidige fabrikantpagina beschrijft een 2026-uitvoering met andere capaciteit/installatie dan de gevonden oudere bol-aanbieding. Die gegevens mogen niet worden gecombineerd. LUBA mini 2 AWD 1500 is een kandidaat, geen actieve kaart zolang de precieze winkeluitvoering niet is vastgesteld.

## Keuzehulp

Vijf vragen: oppervlak, draadvoorkeur, terrein (optioneel percentage), indeling, omgeving. Een gemeten helling en capaciteit zijn uitsluitingscriteria. Onbekende waarden worden niet geschat. Een limiet in het werkgebied is geen bewijs van geschiktheid aan de rand.

Draad toestaan betekent beide installatieprincipes toelaten. Alleen het expliciete catalogusfilter “Met draad” beperkt tot draad. Losse velden blijven een installatiecheck; app-zones garanderen geen autonoom transport. Beschutting verandert de leesvolgorde van RTK-modellen, sluit ze niet automatisch uit.

Geen sterren, matchpercentages of algemene winnaar. Volgorde bij beschutting: eerst geen extra satellietcontrole, daarna kleinste toereikende capaciteitsopgave. Geen sortering op prijs/commissie. Geen dekking voor gazons boven 1.200 m². MOVA heeft geen vergelijkbare maximumcapaciteit in de gebruikte bron en valt af zodra oppervlak is opgegeven.

## Autoriteit en vervolg

De eigen toevoeging is de uitlegbare selectie op tuinvoorwaarden en expliciete bronconflicten. Voor echte ervaringskennis zijn eigen installaties, originele beelden en gedocumenteerde praktijktests nodig. Die ervaring wordt niet gesuggereerd. Richtlijn: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews

Volgende inhoudelijke gaten: geverifieerde uitvoeringen voor grotere tuinen; concrete installatievoorbeelden met een deskundige; budgetvergelijking pas met betrouwbare actuele prijsdata. Geen fictieve deskundige, testdatum of keurmerk.

## Verificatie

- Zes gerichte tests voor capaciteitsgrenzen, onbekende gegevens, hellingen, draadfilters, beschutting, losse velden en unieke producten.
- TypeScript en gerichte lintcontrole geslaagd; productiebuild geslaagd in tijdelijke kopie.
- Browserroute door alle vijf vragen tot gefilterde producten gecontroleerd; drie kolommen en normaal H1-gewicht behouden.
- Geen push/deploy en geen affiliate-aankoop of commissie geverifieerd.
