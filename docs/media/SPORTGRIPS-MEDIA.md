# Sportgrips media-update — 1 november 2026

Opdracht: volledige mediafix met hoogwaardige fotorealistische sportfotografie, een bold hero met leesbare tekst, merknaam geschreven als **Sportgrips**, en behoud van de logohoogte.

## Beelden en werkwijze

Elf afzonderlijke beelden gemaakt met de ingebouwde `image_gen`-tool. Geen externe stockfoto's of merkproductfoto's gebruikt. De prompts vragen om natuurlijk licht, echte materiaaltextuur en de uitstraling van hoogwaardige iPhone 17 Pro Max-fotografie. Dit zijn AI-illustraties; er wordt niet beweerd dat ze werkelijk met een iPhone zijn gefotografeerd of uit eigen praktijktests komen. De overpagina vermeldt dat expliciet.

De volledige prompts en bronpaden staan in [sportgrips-media-prompts.json](sportgrips-media-prompts.json). Definitieve assets staan onder `public/assets/sportgrips/photos/`; oorspronkelijke gegenereerde PNG's blijven bewaard in de Codex-generated-imagesmap. WebP-bestanden zijn verliesgevend geoptimaliseerd met quality 85, heroes 88. Elf volledige beelden samen ongeveer 2 MB; bestaande afbeeldingen, video, fonts en oude logo's blijven als archief intact.

| Asset                 | Inzet                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| hero-v1.webp          | Donkere sportbaan met lime tennisgrip, witte padelgrip en golfgrip aan de randen; rustige centrale tekstzone |
| hero-mobile-v1.webp   | Eigen portretcompositie met zichtbaar sportmateriaal en donkere tekstzone                                    |
| golf-v1.webp          | Golfcategorie, golfadvies en homepagekaart                                                                   |
| tennis-v1.webp        | Tenniscategorie, gripmaat/basisgrip/overgrips, homepagekaart en eerste stap                                  |
| padel-v1.webp         | Padelcategorie, vervangen en homepagekaart                                                                   |
| badminton-v1.webp     | Badminton, badstof en adviessectie                                                                           |
| squash-v1.webp        | Squashcategorie                                                                                              |
| hockey-v1.webp        | Hockeycategorie, chamois, vergelijken en adviessectie                                                        |
| rewrap-v1.webp        | Aanbrengen, laagopbouw, tennis-vervangingsgids en derde stap                                                 |
| textures-v1.webp      | Materiaalkeuze, onderhoud, kennisgidsen en tweede stap                                                       |
| court-evening-v1.webp | Rustige donkere achtergrond achter keuzehulp en witte tekst                                                  |

Alle actieve tuin-/robotmaaierfoto's zijn uit de zichtbare routes gehaald. Purpose-tabs, missionbeelden, impactcarrousel, kleine decoratieve afbeeldingen, categoriekaarten en de 21 inhoudelijke categorie-/adviespagina's gebruiken nu passende sportbeelden. Oude lokale fontbestandsnamen en het bestaande cookie-icoon hoeven niet te veranderen om hun functie correct uit te voeren.

## Leesbaarheid en responsive beelden

Sectievolgorde, maatvoering, componentvormen, spacing en breakpoints behouden. De hero gebruikt `getImageProps` met `<picture>` voor een eigen mobiele foto, in plaats van de brede foto blind bij te snijden. De browser haalt daardoor het passende bestand op. Grote tekst blijft wit boven een rustige donkere zone; de kleine tekst onder de CTA is wit gemaakt met een subtiele schaduw. De bestaande fade onderaan de hero blijft behouden. H1-gewicht blijft 400.

Informatieve detailbeelden hebben beschrijvende alt-tekst; decoratieve achtergrond-/kaartbeelden gebruiken lege alt-tekst. Open Graph/Twitter gebruiken de relevante sportfoto of de hero als standaardbeeld.

## Merk en logo

Merknaam in interface, metadata, cookievenster, auteurslabels en manifest: **Sportgrips**. Een geforceerde uppercase-stijl in de advieszijbalk is verwijderd.

`public/assets/sportgrips/logo-v2.svg` gebruikt hetzelfde lokale Barlow Condensed Black Italic-lettertype, met vectorpaden voor Sportgrips. Canvas 170.72 × 33 en optische inkthoogte 28.64 eenheden blijven behouden; header/logo-vak blijft 140 × 34 px. De letters worden rechts-naar-links getekend zodat de linkerletter boven de rechterbuur ligt. Geen roze/terracotta in het logo. Het nieuwe woordmerk blijft links uitgelijnd.

Nieuwe website-/appiconen zijn afgeleid van de eigen S-vector, lime op de bestaande donkere merkkleur. Oude iconbestanden blijven onaangeroerd bewaard; de actieve metadata en het manifest verwijzen naar de nieuwe bestanden.

## Controle

- Lint, TypeScript en productiebuild.
- Browsercontrole op 1440, 390 en 320 px, over acht representatieve routes (24 weergaven).
- Hero toont de desktop- respectievelijk mobiele bron; H1 400, logo-vakken gelijk, geen horizontale overflow of ontbrekende beelden.
- Geen actieve tuinmedia of onbedoelde uppercase-merknaam in de gecontroleerde routes.
- Originele public-media vergeleken met hun SHA-256-baseline; alleen het tekst-/iconenmanifest is aangepast.
- HTTP-controle van alle 28 inhoudelijke routes, canonicals, OG, schema en interne links.
- Noindex-meta, noindex-HTTP-header en lege sitemap blijven ingeschakeld.

Screenshots en het browserrapport staan in `checks/`. De publicatie volgt via de bestaande GitHub/Vercel-koppeling.
