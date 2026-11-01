# Lokale beeld- en schemawijzigingen vóór lancering

25 oktober 2026. Uitgevoerd na opdracht om de site klaar te maken voor een gecontroleerde lancering. Geen push, deploy, serverstart of productiebuild uitgevoerd door deze subtaak. De oorspronkelijke auditbewijzen blijven ongewijzigd.

## Gewijzigd

- `src/components/sections.tsx`: alleen de vier kleine decoratieve hero-foto's omgezet van gewone img naar het bestaande Next Image-component. Bronfoto's behouden; intrinsieke verhouding 42 × 28, `sizes="28px"` en `loading="lazy"`. De bestaande CSS rendert de rondjes nog steeds 28 × 28 met dezelfde crop. Deze foto's krijgen geen preload. De grote hero en alle andere secties zijn ongemoeid gelaten.
- `src/components/page-sections.tsx`: alleen de cover in `AdviceDetail` omgezet naar Next Image met de bronafmetingen 1536 × 1024, responsive sizes passend bij de bestaande artikelkolom en `loading="eager"`. Bestaande wrapper, lege decoratieve alt, foto, randradius en CSS blijven behouden. De cover blijft direct laadbaar en wordt niet onbedoeld lazy.
- `src/app/page.tsx`: FAQPage-JSON-LD, de bijbehorende constante en ongebruikte imports verwijderd. De zichtbare `Questions`-sectie met de zes FAQ's is behouden. Organization-/WebSite-schema blijft via de rootlayout beschikbaar.

De oorspronkelijke beeldbestanden zijn niet bewerkt. Geen kleurfilter, nieuwe generatie of wijziging aan metadata, robots of CSS toegevoegd.

## Controle

- Gerichte ESLint op de drie bestanden: geslaagd.
- Prettiercontrole op de drie bestanden: geslaagd.
- Bestaande lokale devserver uitgelezen: homepage en drie koopgidsen geven HTTP 200.
- Homepage-HTML: vier hero-detailbeelden hebben responsive bronselectie en lazy loading; **nul** preload-links voor deze details.
- Homepage-HTML: geen FAQPage-schema; alle **zes** zichtbare FAQ-items staan er nog.
- Alle drie artikelcovers: gegenereerde srcset/sizes aanwezig, vaste bronafmetingen aanwezig en eager loading.

Raw verificatie: `evidence/schema-images/launch-image-checks.json`. Dit controleert de gewijzigde HTML, niet de daadwerkelijke netwerkbesparing, uitsnede in iedere viewport of Core Web Vitals. De parent voert de gezamenlijke productiebuild en uiteindelijke visuele/launchcontrole uit.
