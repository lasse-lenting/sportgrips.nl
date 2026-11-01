# Meetplan Maaistro

Datum: 28 oktober 2026 · Status: voorstel, nog niet geïmplementeerd of gepubliceerd.

Website: `https://www.maaistro.nl` · Google Tag Manager: `GTM-NJBV8NBC`.

## 1. Wat willen we weten?

Maaistro helpt bezoekers een robotmaaier te kiezen en verwijst voor de aankoop naar bol. De belangrijkste uitkomst op de eigen website is daarom een klik naar de winkel. Een winkelklik bewijst geen aankoop of commissie.

Dit meetplan beantwoordt vier vragen:

1. Welke pagina’s en verkeersbronnen leveren bezoekers op die naar bol doorklikken?
2. Beginnen bezoekers aan de keuzehulp, maken ze die af en bekijken ze daarna de selectie?
3. Welke modellen krijgen aandacht en winkelklikken, en op welke plek op de website?
4. Waar lopen bezoekers vast: een ongeldige invoer, een verlaten stap of een lege selectie?

## 2. Huidige situatie en gewenste inrichting

De huidige code laadt Vercel Web Analytics na toestemming. De actieve Maaistro-keuzehulp en productkaarten hebben nog geen eigen meetevents. Er staan ook oude, ongebruikte Paspoot-helpers met Google Analytics- en Clarity-ID’s in de repository. Die mogen niet voor Maaistro worden geactiveerd.

De gewenste inrichting is één Maaistro GTM-container met een Google-tag en GA4-eventtags. Vercel kan de bestaande paginastatistieken blijven leveren; de keuzehulpfunnel en winkelklikken beoordelen we in GA4. Cijfers uit beide systemen tellen we niet bij elkaar op.

Het juiste **GA4-meet-ID voor Maaistro (`G-…`) moet nog worden vastgesteld** voordat de Google-tag kan worden ingericht. Het GTM-ID is geen GA4-meet-ID. Google Ads, remarketing en Clarity vallen buiten deze eerste inrichting.

## 3. Events

Alle events gaan uitsluitend na toestemming voor statistieken naar de `dataLayer`. `page_path` bevat alleen het pad, zonder queryparameters of hash. Het starten van de keuzehulp betekent een echte klik op ‘Start de keuzehulp’, niet een klik op een navigatielink die naar de keuzehulp scrolt.

| Event | Wanneer versturen? | Extra parameters | Doel |
| --- | --- | --- | --- |
| `page_view` | Eerste pagina na toestemming en iedere volgende wijziging van het paginapad | `page_location`, `page_referrer`, `page_title` | Bereik, landingspagina’s en routes |
| `chooser_start` | Klik op ‘Start de keuzehulp’ | `placement` | Start van de funnel |
| `chooser_step_complete` | Geldige stap bevestigd met ‘Volgende’ of ‘Bekijk mijn tuinadvies’ | `step_number`, `step_name` | Uitval per stap |
| `chooser_validation_error` | Stap kan niet verder door ongeldige of ontbrekende invoer | `step_number`, `step_name`, `error_type` | Frictie vinden |
| `chooser_complete` | Na de vijfde geldige stap verschijnt het tuinadvies | `placement` | Afgeronde keuzehulp |
| `chooser_selection_click` | Klik op ‘Bekijk mijn selectie’ bij het tuinadvies | `placement` | Overgang van advies naar producten |
| `chooser_restart` | Klik op ‘Opnieuw beginnen’ | `placement` | Hergebruik begrijpen |
| `selection_view` | Selectieblok minimaal 50% zichtbaar gedurende één seconde; ook na een bevestigde wijziging van filters of invoer | `selection_source`, `result_count` | Gebruik van de vergelijking |
| `selection_filter_change` | Bezoeker kiest een andere filterknop | `filter_name`, `filter_value`, `result_count` | Filtergebruik begrijpen |
| `selection_no_results` | Geldige, bevestigde selectie levert nul modellen op en de lege staat is zichtbaar | `selection_source`, `result_count` | Hiaten in de selectie vinden |
| `product_details_open` | ‘Meer over dit model’ wordt geopend | `product_id`, `product_name`, `product_brand`, `placement` | Interesse per model |
| `affiliate_click` | Klik op ‘Check huidige prijs’ richting bol | `product_id`, `product_name`, `product_brand`, `placement`, `retailer` | Primaire conversie |

### Vaste waarden en telregels

- `placement`: `home_chooser`, `selection` of de vaste slug van de adviespagina waar de productkaart staat.
- `selection_source`: `chooser` of `direct`. Dit gaat over de herkomst van de selectie, niet over marketingattributie.
- `step_name`: `gazon`, `grenzen`, `terrein`, `indeling`, `omgeving`; `step_number`: 1 t/m 5.
- `error_type`: `required` of `out_of_range`; nooit de ingevulde waarde of volledige fouttekst.
- `product_id`: bestaande modelslug; `product_name` en `product_brand`: vaste waarden uit de productcatalogus; `retailer`: `bol`.
- `filter_name`: `installation_drive`; `filter_value`: `all`, `wireless`, `wire` of `awd`. Deze waarden komen van de losse filterknoppen; antwoorden uit de keuzehulp worden niet als filterevent meegestuurd.
- Elke stap telt maximaal eenmaal per poging. Teruggaan en opnieuw bevestigen telt niet opnieuw. ‘Opnieuw beginnen’ start een nieuwe poging; een nieuwe start telt mee in de funnel.
- De afronding telt eenmaal per poging, ook als iemand teruggaat en het advies opnieuw opent.
- Validatiefouten tellen eenmaal per stap en fouttype per poging, zodat herhaald klikken de cijfers niet opblaast.
- Een selectie telt eenmaal per zichtbare, bevestigde toestand. Getalinvoer bevestigen we bij verlaten van het veld; geen event bij iedere toetsaanslag. Ongeldige of ongewijzigde invoer telt niet als nieuwe selectie. De eerste render en React-hermontages veroorzaken geen dubbeltelling.
- Productdetails tellen maximaal eenmaal per model en plaatsing per paginabezoek. Winkelklikken blijven afzonderlijke echte klikken.
- Nieuwe toestemming start de meting op de huidige pagina. Eerdere acties worden niet achteraf verstuurd; de funnel geldt dus voor acties die na toestemming plaatsvinden.

## 4. Conversies en rapportage

**Primair GA4-key-event: `affiliate_click`.** Dit is een doorverwijzing naar bol. Geen fictieve omzet, orderwaarde, `purchase`, `add_to_cart` of `begin_checkout` registreren: die handelingen vinden niet op Maaistro plaats.

**Secundair GA4-key-event: `chooser_complete`.** Dit meet of Maaistro een bezoeker tot een tuinadvies brengt. Houd beide key-events afzonderlijk zichtbaar; hun som is geen aantal unieke conversies.

| Rapport | Wat bekijken? |
| --- | --- |
| Verkeerskwaliteit | Sessies en sessies met winkelklik per bron/medium en landingspagina |
| Keuzehulpfunnel | Unieke gebruikers: start → stap 1 t/m 5 → afgerond → selectieklik → winkelklik; volgorde binnen dezelfde sessie |
| Productinteresse | Details geopend en winkelklikken per model en plaatsing |
| Selectieproblemen | Aandeel zichtbare selectietoestanden zonder resultaten en validatiefouten per stap |

Belangrijkste KPI’s: sessies met een winkelklik / gemeten sessies; gebruikers die de keuzehulp afronden / gebruikers die starten; en starters die vanuit de keuzehulproute naar bol klikken / starters. Gebruik voor deze verhoudingen dezelfde periode en doelgroep. Tel ruwe events niet als unieke bezoekers.

Begin met een nulmeting zodra de inrichting werkt. Stel daarna pas doelen vast op basis van voldoende verkeer; er is nog geen onderbouwde conversiebaseline.

## 5. GTM-tags, triggers en variabelen

| Onderdeel | Inrichting |
| --- | --- |
| Google-tag | `Google tag - Maaistro - GA4`, met het geverifieerde Maaistro-meet-ID; eenmaal bij containerinitialisatie na toestemming |
| Pageview-tag | `GA4 - page_view`, custom-eventtrigger op exact `page_view` |
| Keuzehulptag | `GA4 - Keuzehulp`, custom-eventtrigger met expliciete lijst van de zeven `chooser_*`-events hierboven |
| Selectietag | `GA4 - Selectie`, custom-eventtrigger op `selection_view`, `selection_filter_change` en `selection_no_results` |
| Producttag | `GA4 - Productdetails`, custom-eventtrigger op `product_details_open` |
| Winkelkliktag | `GA4 - Affiliate click`, custom-eventtrigger op `affiliate_click` |
| Eventnaam | De ingebouwde GTM-variabele `Event`; geen onbeperkte trigger die alle dataLayer-events doorstuurt |
| Data Layer-variabelen | Alleen de parameters uit dit meetplan; elke eventtag krijgt uitsluitend de relevante parameters |
| Consent | Extra toestemming `analytics_storage` vereist voor alle GA4-tags; advertentietoestemming blijft geweigerd |

Automatische pageviews van de Google-tag uitschakelen (`send_page_view: false`). Automatische geschiedenis-, formulier-, uitgaande klik- en scrollmetingen in GA4 uitschakelen, zodat ze geen tweede event of ongeschoond webadres versturen. Interne Next.js-navigatie meten we expliciet via `page_view` bij een gewijzigd pad; uitsluitend een andere hash of tuinquery is geen nieuwe pageview.

Registreer in GA4 als event-scoped aangepaste dimensies: `placement`, `selection_source`, `step_name`, `error_type`, `product_id`, `product_brand` en `filter_value`. Registreer `result_count` als aangepaste metriek. Gebruik standaard GA4-dimensies voor pagina, bron/medium en apparaat. `product_name`, `retailer`, `filter_name` en `step_number` blijven beschikbaar in de events; breid registraties pas uit als een rapport dat nodig heeft.

## 6. Toestemming en gegevens

- De bestaande cookiebanner blijft leidend. GTM en GA4 laden pas na toestemming voor statistieken: basic consent mode. Bij weigering geen GTM-/GA4-netwerkverzoeken, analyticscookies of cookieless pings.
- Vraag bestaande bezoekers opnieuw om toestemming door de consentrevision te verhogen: hun vorige keuze ging over Vercel, niet over GA4. Werk tegelijkertijd de cookiebanner en `/privacy` bij met de werkelijk gebruikte diensten en cookies.
- Zet de standaard Consent Mode v2-status vóór het laden van GTM op geweigerd. Geef na statistiekentoestemming alleen `analytics_storage` vrij; `ad_storage`, `ad_user_data` en `ad_personalization` blijven geweigerd.
- Trek bij intrekken van toestemming de analyticsstatus direct in, verwijder GA-cookies voor de gebruikte domeinen en herlaad vervolgens zonder analytics. De keuzehulp blijft bruikbaar.
- Verstuur geen naam, e-mail, adres, vrije tekst, grasoppervlakte, hellingspercentage of antwoorden uit de keuzehulp. Meet alleen de voortgang, vaste productgegevens en aantallen resultaten.
- `page_location` bevat origin + pad; `page_referrer` alleen de verwijzende origin. Stuur geen queryparameters, hashes, volledige affiliatelinks of uitgaande link-URL’s mee. Pas deze regels ook op automatische metadata toe.
- Marketingcampagneparameters worden in deze eerste versie niet doorgestuurd. Betaalde campagneattributie vraagt later een afzonderlijke, gecontroleerde uitbreiding.
- Geen sessieopnames, User-ID, Google Signals, advertentietags of remarketing activeren.

## 7. Implementatie en acceptatie

Na akkoord op het meetplan:

1. Verifieer toegang tot `GTM-NJBV8NBC` en het juiste Maaistro GA4-meet-ID. Controleer bestaande tags voordat er nieuwe worden toegevoegd.
2. Voeg één gedeelde consentgestuurde dataLayer-helper en GTM-loader toe. Instrumenteer `GardenForm`, `MowerSelection` en `MowerCard`; verwijder of vervang de oude Paspoot-analyticskoppeling.
3. Werk de consentrevision, banner en privacy-uitleg bij. Voeg de genoemde GTM-variabelen, triggers en tags toe en registreer de GA4-dimensies en key-events.
4. Test weigeren, accepteren, terugkerend bezoek en intrekken. Controleer netwerkverzoeken én cookies. Controleer expliciet dat een webadres met tuinantwoorden geen invoer naar Google lekt.
5. Test de volledige keuzehulp, teruggaan, herstarten, fouten, een lege selectie, filters, productdetails en winkelklikken. Test ook een directe ingang op een adviespagina en interne paginanavigatie. Elke actie moet volgens de telregels verschijnen, zonder dubbele pageviews.
6. Controleer GTM Preview/Tag Assistant en GA4 DebugView: een dataLayer-event of afgevuurde tag alleen bewijst nog geen ontvangst in GA4. Houd testverkeer herkenbaar via debugmodus.
7. Publiceer de gecontroleerde code op `main` en de GTM-container als afzonderlijke publicaties. Verifieer vervolgens op `https://www.maaistro.nl` dezelfde consent- en eventflow en controleer ontvangst in GA4.

Succes betekent: de code is live, de juiste GTM-versie is gepubliceerd, toestemming wordt gerespecteerd en de geplande events zijn daadwerkelijk ontvangen in Maaistro GA4. Aankopen en affiliate-inkomsten blijven een afzonderlijke bron bij bol.

Bron voor de consentopzet: [Google — basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic).
