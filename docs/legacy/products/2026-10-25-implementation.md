# Productselectie — lokale uitvoering, 25 oktober 2026

## Referentie onderzocht met Computer

Bekeken: de homepage van Maaierexpert, alle hoofdsecties (koopgidsen, vergelijkingen, kennisbank, merken, over ons en disclaimer), de opgegeven beste-robotmaaiergids en drie representatieve detailpagina’s. De keuzehulp is volledig doorlopen voor 250–500 m², passages/lichte helling, draadloos, €700–1000 en slimme functies. Dit is een beoordeling van de opbouw en bezoekerroute, geen controle van iedere artikelpagina of van hun prijsdatabase.

- [Koopgids](https://maaierexpert.nl/koopgids/beste-robotmaaier/): combinatie van korte selectie, specificaties, uitwerking en winkelknoppen.
- [Keuzehulp](https://maaierexpert.nl/keuzehulp/): vijf vragen, daarna concrete modellen en een directe winkelroute.
- [Vergelijking](https://maaierexpert.nl/vergelijking/segway-navimow-vs-worx-vision/): navigatie en tuinvoorwaarden staan centraal.

De bruikbare les voor Maaistro is de korte route naar concrete modellen. Teksten, prijzen, beoordelingen, affiliatecode en productbeelden van de concurrent zijn niet overgenomen.

## Wat lokaal is gebouwd

- `/robotmaaiers`: vier modellen met officiële fabrikantbeelden, specificaties en een knop **Check huidige prijs**. Drie compacte kaarten naast elkaar op desktop, twee op tablet en één op mobiel. Extra uitleg is uitklapbaar.
- Filter op draad/aandrijving en opgegeven gazoncapaciteit. Zonder bekende, vergelijkbare capaciteit valt een model buiten een actief oppervlaktefilter. Geen uitkomst als de selectie te klein is voor de tuin.
- De bestaande keuzehulp geeft de antwoorden mee aan de selectie. Er is geen budgetfilter toegevoegd zonder actuele prijsgegevens.
- De drie koopgidsen houden hun URL en advies. Op verzoek van de gebruiker staan de relevante productkaarten **onder** het advies.
- Eén korte affiliatevermelding per selectie; geen herhaalde disclaimers bij elke kaart. FAQ-vragen gaan over de aankoop en het gebruik.
- Lichtere koppen en een SVG-cookie-icoon in de cookiebanner.

## Bol-koppeling en grenzen

Maaistro’s websitecode **1553044** is afgelezen in de bestaande bol-partnersessie bij Account → Website. De status was **Nieuw**; toelating en commissieontvangst zijn niet bewezen.

Trackinglinks zijn opgebouwd volgens [bols officiële handleiding](https://affiliate.bol.com/nl/handleiding/tracking-url/), met `t=url`, het Maaistro-Site-ID, de exacte product-URL en `f=txl`. Geen antwoorden, e-mailadressen of andere persoonsgegevens in de links. Winkelknoppen hebben `rel="sponsored noopener noreferrer"`.

Fabrikantpagina’s en de exacte modelbeelden zijn opnieuw bekeken. De bol-productpagina’s konden in de onderzoeksbrowser niet worden geverifieerd. Er zijn daarom geen bedragen, voorraadclaims, verkopers of reviews ingevuld. De oudere JSON-shortlist blijft een onderzoeksmomentopname met die beperkingen.

## Controle

- Typecontrole, gerichte lint en productiebuild geslaagd.
- Alle vier productbeelden geladen op localhost.
- Browser: draadfilter toont GARDENA; 1.500 m² geeft geen model; keuzehulp met 350 m² en draadloos opent de selectie met twee modellen en de bijbehorende voorwaarden.
- Browser: drie gelijke kaartbreedtes/hoogtes op desktop; productselectie volgt na het volledige advies; één affiliatevermelding en geen horizontale pagina-overloop.
- Cookiebanner: lichtere titel en het daadwerkelijke SVG-icoon visueel gecontroleerd. Tijdelijke testaanpassing om de banner te tonen is verwijderd; de footer opent weer de voorkeuren.

Dit is de lokale devversie. Geen nieuwe push of productiepublicatie uitgevoerd tijdens deze wijziging.
