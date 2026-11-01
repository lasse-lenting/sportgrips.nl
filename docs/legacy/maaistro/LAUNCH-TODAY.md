# Maaistro — publicatiestatus, 25 oktober 2026

Deze status is na de eerste audit bijgewerkt. De oorspronkelijke audit- en lokale bewijsbestanden beschrijven hun eigen meetmoment; ze bewijzen niet op zichzelf de latere publicatie.

## Gepubliceerd en publiek gecontroleerd

- Hoofddomein: https://www.maaistro.nl. https://maaistro.nl verwijst met 308 naar www.
- Git-publicatie: `b7c7f8f` (productselectie en keuzehulp) en `67b7397` (Bing-verificatietag). Vercel meldde de laatste deployment als geslaagd.
- Acht bedoelde publieke pagina’s: homepage, `/robotmaaiers`, `/advies`, de drie koopgidsen, `/over-maaistro` en `/privacy`.
- Productiebuild, zes gerichte selectietests en 48 publieke HTTP-controles geslaagd. Productie geeft `index, follow`; previews/development houden noindex.
- Sitemap: https://www.maaistro.nl/sitemap.xml bevat de acht publieke pagina’s. Queryvarianten van `/robotmaaiers` verwijzen met canonical naar de schone URL.
- De vijfvragenflow, acht modeluitvoeringen, bronlinks, controledatum, bol-knoppen, contact en cookietoestemming staan live.
- Contact: lasse@puntwerk.nl. Een ander e-maildomein is geen blokkade.
- De aangeleverde `msvalidate.01`-tag staat op de publieke homepage en productpagina.

De productselectie is gebaseerd op documentonderzoek, geen eigen praktijktest. Niet elke specificatie is bevestigd; de bekende gazoncapaciteiten lopen tot 1.200 m². De MOVA-capaciteitsdefinitie en tegenstrijdige eufy-hellingcijfers zijn expliciet behandeld.

## Nog in de platforms bevestigen

1. Google Search Console: domeinproperty **maaistro.nl**, eigendomsverificatie en verwerking van de ingediende sitemap controleren.
2. Nieuwe URL eerst inspecteren: **https://www.maaistro.nl/robotmaaiers**. De homepage en drie bijgewerkte koopgidsen kunnen opnieuw worden bekeken. Gebruik adressen zonder filters/fragmenten.
3. Bing Webmaster Tools: op Verifiëren klikken voor de nu live tag. Een aanwezige tag is nog geen bevestigde accountverificatie.
4. Indexatie daarna via URL-inspectie/rapporten vaststellen. Sitemapacceptatie of een indexeringsverzoek is geen bewijs van indexatie.
5. Bol: uiteindelijke accountgoedkeuring en echte commissie afzonderlijk vaststellen. Links bevatten Site-ID 1553044; prijs, voorraad en verkoper zijn niet live gekoppeld.

De eerdere Google-aanvragen en platformstatussen zijn niet ingezien. De GSC Wizard-koppeling is verlopen; de gratis Search Console-interface blijft bruikbaar. Vercel Analytics laadt na toestemming; keuzehulpafrondingen en winkelklikken zijn nog geen afzonderlijk gemeten events.

## Vervolg

De [kalender](CONTENT-CALENDAR.md) en [planner](SEO-PLANNER.html) beginnen bij de live basis. Ze plannen de vergelijking niet opnieuw als toekomstige bouwtaak. Breed grasadvies blijft uitgesteld. Nieuwe content wordt niet automatisch gepubliceerd.

Google: [opnieuw crawlen aanvragen](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [sitemap indienen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [canonicals](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
