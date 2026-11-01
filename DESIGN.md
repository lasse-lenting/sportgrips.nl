# SPORTGRIPS designsysteem

De uitvoerbare ontwerptokens staan in `src/styles/site.css` onder `@theme`. Componenten gebruiken deze tokens; voorkom losse afwijkende waarden voor dezelfde ontwerpkeuze.

## Paginatitels (H1)

- Alle H1’s gebruiken normaal gewicht: **400**.
- Centraal token: `--font-weight-page-heading: 400`.
- Dit geldt voor de homepage, overzichtspagina’s, koopgidsen, de productselectie, Over SPORTGRIPS, privacy en foutpagina’s.
- Maak H1’s niet bold of semibold via componentstijlen, inline stijlen of klassen zoals `font-bold`, `font-semibold` en `font-extrabold`.
- Grootte, regelhoogte en letterafstand kunnen per paginatype verschillen. Gewicht blijft gekoppeld aan het centrale token.
- Het oorspronkelijke Maaistro-logo blijft bewaard. `public/assets/sportgrips/logo.svg` gebruikt SPORTGRIPS als echte vectorpaden in hetzelfde lokale Barlow Condensed Black Italic-lettertype, met de oorspronkelijke donkere contour. Geen roze of terracotta in het logo.

## Overige typografie

Paginatitels en lopende tekst gebruiken de bestaande lokale lettertypen. Knoppen en kleine labels mogen hun bestaande nadruk behouden. De koppen in de cookiebanner en het voorkeurenvenster blijven normaal (400).

## Behoud bij rebranding

De bestaande componentvormen, spacing, responsive regels, fonts en achtergronden blijven behouden. De drie merkkleurwaarden zijn primary `#D4F542`, primary hover `#E4FF76` en accent `#BC4825`. Focus gebruikt dezelfde accentkleur. Donkere/lichte achtergronden, tekstkleuren en overige kleuren blijven behouden. Alle 161 bestaande public-bestanden worden met checksums gecontroleerd; de 160 media-assets blijven identiek. Alleen de tekst in site.webmanifest mag veranderen.
