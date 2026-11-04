# Sportgrips: structuur en vergelijkingscontent — 4 november 2026

Lokale uitwerking van de feedback op navigatie, ontbrekende URL’s, sportpillars en think-content. Bron: `source/workbook.json`, werkblad **Menustructuur + URL**, kolom C. Na de lokale controle heeft de gebruiker expliciet opdracht gegeven deze wijzigingen naar GitHub te pushen. De bestaande GitHub/Vercel-koppeling en noindex-instelling blijven behouden.

## Navigatie en URL’s

- Golfgrips, Tennisgrips, Padelgrips, Badmintongrips, Squashgrips en Hockeygrips zijn rechtstreeks aanklikbare hoofdmenu-items en afzonderlijke footerlinks.
- Sportmenu’s groeperen de beschikbare typen, merken en maatvarianten. Groepslabels zonder eigen pagina maken geen extra URL aan. Een aparte knop opent het submenu; de sportnaam gaat naar de pillarpage.
- Gripkennis bevat gripkeuze en onderhoud, **Grips vervangen**, vergelijkingen en Blog. Over Sportgrips blijft in de footer; de keuzehulp blijft via de headerknop bereikbaar.
- Alle zes vervangingsgidsen staan onder Gripkennis, ook op `/kennis/#grips-vervangen`. Hun URL en kruimelpad blijven sportgebonden, zoals `/golfgrips/vervangen/`. Ze staan niet in sportdropdowns. Contextuele links vanuit de sport blijven beschikbaar.
- Squash heeft aanvullend `/squashgrips/vervangen/`, zodat de instructie geen onderdeel van de commerciële pillar hoeft te blijven.
- Het kruimelpad volgt alle URL-niveaus, ook `Home → Golfgrips → Gripmaat golf → Midsize`, met hetzelfde pad in JSON-LD.

Alle **43 concrete URL’s** uit het werkblad zijn aanwezig. De aanvullende bestaande routes `/grips/`, `/over-sportgrips/`, `/privacy/` en de squashvervangingsgids brengen het totaal op **47 inhoudelijke pagina’s**. Het onbepaalde `(n.t.b.)` bij ‘Nog in te delen’ is geen URL. Er zijn 19 pagina’s bijgekomen ten opzichte van de vorige 28. Zie `SPORTGRIPS-URL-COVERAGE.csv` voor de broncel en bestemming per URL.

De tien nieuwe merkenpagina’s zijn Golf Pride, Lamkin, SuperStroke, Wilson, Babolat, Tourna, HEAD, Yonex, Bullpadel en adidas. Ook de drie golfmaatvarianten, twee ontbrekende vergelijkingen, de gids over stroef maken, het blogoverzicht en het achtergrondartikel zijn toegevoegd.

## Pillars en vergelijkingscontent

Iedere sportpillar combineert een korte vergelijking, een tabel, aanklikbare blokken voor relevante subpagina’s en een modelselectie. Bij sporten zonder aparte type- of merkenpagina’s bundelt de pillar de keuzevragen, overeenkomstig het onderzoek. Er zijn geen extra padelovergrip- of kleine merkenroutes voor dezelfde intentie gemaakt.

Categorieën, maatvarianten, merken en de drie directe vergelijkingen hebben ieder vijf redactionele H2’s. De koppen en afwegingen verschillen per onderwerp. Definities blijven bij Gripkennis; de commerciële pagina’s behandelen pasvorm, materiaal, contactgevoel, vergelijking en een concrete shortlist. Vergelijkingstabellen staan bij het eerste inhoudelijke onderdeel; de modelselectie staat bij de laatste keuzevraag. Bronnen en vervolglinks blijven afzonderlijke ondersteunende onderdelen.

## Producten en bol.com

`src/content/products.json` bevat 26 echte modellen/uitvoeringen met hun fabrikantbron. Er worden geen prijzen, voorraden, reviews, testscores of onbewezen winnaars getoond. De bronnen zijn op 4 november 2026 geraadpleegd via de websites van de fabrikanten en de LTA; het achtergrondartikel verwijst aanvullend naar de NHS.

Een relevante bronwijziging: de huidige Lamkin-site verwijst naar SuperStroke. De oorspronkelijke Crossline-modellen zijn onderbouwd met de herkenbaar gelabelde Lamkin-catalogus; Crossline 2.0 wordt als afwijkende opvolger uitgelegd, niet als identieke uitvoering.

De knoppen **Zoek bij bol.com** gebruiken zoeklinks met de specifieke productnaam of modelcode. Het zijn gewone zoeklinks, geen geactiveerde affiliate-trackinglinks. Er is geen partner-ID aangeleverd. Er wordt niet beweerd dat elk model op bol.com beschikbaar is. Overpagina en footer zijn aangepast aan de winkellinks. De productgegevens en bestemmingen zijn centraal beheerd, zodat gecontroleerde bol.com-product/partnerlinks later kunnen worden gekoppeld.

## Behoud en verificatie

Layout, bestaande media, logo, lokale fonts en centrale H1-weight 400 blijven behouden. Nieuwe inhoudsblokken gebruiken de bestaande ontwerptokens. Alle omgevingen blijven noindex; de sitemap blijft leeg. Er zijn geen nieuwe analyticsdiensten of trackingcookies ingeschakeld.

Verificatie:

- `npm run typecheck`, `npm run lint` en `npm run build`.
- `python3 scripts/check-sportgrips.py --base http://localhost:3028`: alle 47 pagina’s, 2.548 interne linkverwijzingen, metadata, canonicals, JSON-LD, anchors, noindex-meta/headers, 404’s, robots, sitemap en de behouden media.
- `scripts/check-sportgrips-browser.mjs`: desktop/mobiel, sportlinks, vervangingsgroep, directe navigatie, toetsenbord, hoververtraging, footer, pillarblokken, vijf inhoudelijke H2’s, modelselectie, bol.com-bestemmingen en het aangepaste squashresultaat in de keuzehulp. Rapport: `check-refresh-browser.json`; screenshots: `visual-checks/refresh-*`.

Browsercheck gebruikt Playwright via `PLAYWRIGHT_MODULE` en desgewenst `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Het basisadres is instelbaar met `SPORTGRIPS_BASE_URL`.
