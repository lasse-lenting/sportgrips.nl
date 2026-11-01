# Redactionele launchcontrole — Maaistro

Datum: 25 oktober 2026. Status: **lokaal aangepast, nog geen bewijs van deployment**. Scope uitsluitend `src/app/over-maaistro/page.tsx` en `src/app/privacy/page.tsx`; geen layoutwijzigingen, nieuwe gidsen, tools of verzonnen bedrijfsgegevens.

## Gereed

- Preview-/eerste-versieformuleringen uit over- en privacypagina en privacy-metadata verwijderd. Tekst beschrijft de huidige website zonder een publieke versie ten onrechte een lokale preview te noemen.
- Over-pagina benoemt expliciet dat de huidige gidsen documentonderzoek zijn op basis van fabrikantspecificaties en installatie-informatie; geen eigen praktijktest geclaimd.
- Korte eerlijke beeldherkomstregel toegevoegd: met AI gegenereerde sfeerbeelden zijn illustratief en vormen geen bewijs van gebruik, installatie of praktijktest.
- Beperking van de keuzehulp behouden: eerste tuinadvies, geen selectie van specifieke modellen.
- Affiliatemodel transparant gehouden; huidige afwezigheid van actieve affiliatecodes/winkelverwijzingen behouden.
- Privacy-uitleg over browserinvoer, geen account en niet-aangesloten Google Analytics/Microsoft Clarity/Vercel Analytics behouden.
- Door gebruiker geautoriseerd publicatieadres `lasse@puntwerk.nl` als zichtbare mailtolink toegevoegd op beide pagina's: vragen/correcties op de over-pagina en privacyvragen op de privacypagina. Geen juridische eigenaar, volledige persoonsnaam of kwalificaties uit het adres afgeleid.

## Feitelijk gecontroleerd

- `src/app/layout.tsx` rendert navigatie, pagina, footer en JSON-LD; geen analytics- of consentcomponent gemount.
- De legacy analytics-/consentmodules bestaan in de code, maar zijn geen bewijs van actieve tracking. Zoekcontrole vond hun onderlinge import; geen mounting vanuit de huidige pagina's/layout.
- Actieve homepagekaarten linken via `ctaHref` naar `/advies/...`; `useAffiliate` is standaard false. Geen Maaistro-winkelcodes toegevoegd.
- `GardenForm` verwerkt antwoorden in React-state en beschrijft de uitkomst als eerste tuinadvies.
- Gegenereerde illustraties zijn aantoonbaar vastgelegd in `docs/photography-prompts.json`; ze zijn niet als echte testbeelden benoemd.
- Gerichte lintcontrole op beide aangepaste TSX-bestanden geslaagd. Gerichte formattering uitgevoerd. Gezamenlijke typecheck/build en publieke controle worden door de hoofdagent gedaan.

## Nog benodigde echte input

Het openbare contact-/correctie- en privacykanaal is nu ingevuld met het door de gebruiker aangeleverde `lasse@puntwerk.nl`. De mailtolinks zijn lokaal toegevoegd; dit bewijst niet dat een e-mail daadwerkelijk is ontvangen. Geen tijdelijke naam, telefoonnummer of bedrijfsadres in de website verzonnen. Nog te bevestigen:

1. Wie inhoudelijk verantwoordelijk is voor Maaistro: gewenste echte naam en rol/bedrijfsnaam.
2. Verantwoordelijke organisatie voor privacyvragen, aansluitend op de feitelijke bedrijfsinrichting; het contactadres is al bekend.
3. De definitieve hostinginrichting en eventuele technische toegangslogs/bewaarinstellingen; de huidige tekstcontrole bewijst geen hostingbeleid of juridische volledigheid van de privacyverklaring.

Dit zijn expliciete open punten voor de hoofdagent; geen nieuwe gebruiker-vragen vanuit dit deelonderzoek gesteld. Toevoegen zodra echte gegevens beschikbaar zijn.

## Concepten blijven concept

De twee bestanden `drafts/tuincheck-werkblad.md` en `drafts/robotmaaier-smalle-doorgang.md` zijn gelezen. Beiden dragen `status: draft` en `publishedAt: null`; nergens naar productiecontent gekopieerd of aan routes/sitemap toegevoegd. Het werkblad bevat expliciet fictieve rekenvoorbeelden; de doorgangsgids noemt documentonderzoek en geen eigen praktijktest. De eigen externe broncheck en uiteindelijke publicatiegoedkeuring blijven afzonderlijke stappen. Geen van deze concepten is voor de huidige launch noodzakelijk.
