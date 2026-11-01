# Maaistro-kopie van Paspoot

Bron: https://github.com/lasse-lenting/paspoot
Broncommit: ee46f3d7af303f672416542dc5fcf4ee8bb114ea

Volledige GitHub-bron opgehaald op 25 oktober 2026. De bestaande opbouw, componentvormgeving, typografie, tabs, FAQ en bewegingen zijn behouden.

Op verzoek stap voor stap aangepast:
- Groen/mint kleurenschema, met roze als beperkt accent.
- Aangeleverde grasfoto als hero-achtergrond.
- Nagemaakt schaalbaar SVG-woordmerk in navigatie en footer.
- Maaistro-content op de homepage, in de navigatie en footer.
- Drie koopgidsen en pagina's over de werkwijze en de huidige privacy-inrichting.
- Tuinvragen en een eerste tuinadvies in de oorspronkelijke formuliervormgeving. Geen automatische modelselectie of productranglijst.

De gazondiagrammen zijn op verzoek vervangen door 21 gegenereerde fotorealistische tuinbeelden in public/assets/maaistro/photos. De afbeeldingen hebben natuurlijke kleuren en zijn zonder kleurfilters als WebP opgeslagen. De generatieprompts en herkomst staan in docs/photography-prompts.json. De 22 inhoudelijke beeldplekken op de landingspagina gebruiken elk een eigen bestand, inclusief de aangeleverde hero. Alleen de afbeelding van een tab binnen hetzelfde component, kaarten in hun doorlopende carrousel en de eigen cover van een koopgids mogen terugkomen. De toewijzing staat in docs/photography-usage.json en is gecontroleerd op unieke bestandspaden en bestandsinhoud. De merknamen in de balk zijn gewone tekst, geen nagebootste logo's of partnerbadges. Er zijn geen affiliatecodes, winkelkoppelingen, prijsfeeds of praktijktests geclaimd. De Paspoot-trackers zijn niet gekoppeld in de layout.

Bij de launch-audit op 25 oktober zijn de oorspronkelijke publieke Paspoot-reisroutes en redirects verwijderd. Gedeelde bronmodules zijn behouden. Er is nog geen publieke productieoplevering uitgevoerd.

Typecheck en productiebuild geslaagd. Lint geslaagd na het verwijderen van een ongebruikte indexvariabele. De keuzehulp is in de browser gecontroleerd met lege invoer en een volledige invoer van 350 m², draadloos en hellingen.

Eigen privé-repository: https://github.com/lasse-lenting/maaistro. Alle huidige bestanden en Maaistro-aanpassingen zijn samengebracht in een zelfstandige Git-repository met een eigen begincommit, zonder de Paspoot-Git-geschiedenis of remote. De gekopieerde bronbestanden zijn behouden. Er is geen productieomgeving gekoppeld of gedeployed.
