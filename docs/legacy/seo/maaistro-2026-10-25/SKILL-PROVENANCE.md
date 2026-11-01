# Skill, bronnen en beperkingen

Expliciet gebruikte bron: https://github.com/Bhanunamikaze/Agentic-SEO-Skill
Commit: `445c46c268d947fac25c4b57d38aaf723129fe62`.
SKILL.md blob: `c5dae5f7d57db4f2b93bf0e5508ca17569db6336`.
Geraadpleegde bronkopie: `skill-source/`, inclusief audit, plan, content, technical, schema, competitor-pages, publisher en verificatiereferenties. Geen globale installatie uitgevoerd.

De auditworkflow is toegepast met afzonderlijke technische, content- en schema/beeldcontroles, gevolgd door verificatie. Bewijs en conclusies zijn gekoppeld aan Maaistro, niet aan de oude Paspoot-doelgroep.

Beperkingen en correcties:
- Netwerkscripts blokkeren private localhost-IP’s. Hun foutmeldingen of nulresultaten zijn geen siteproblemen. Lokale routechecks en offline HTML-parsing zijn afzonderlijk uitgevoerd.
- De schema-validator meldde onterecht een ontbrekend @type op een legale @context/@graph-wrapper. De nodes zijn apart gecontroleerd.
- finding_verifier normaliseert en ontdubbelt; dit vervangt geen broncontrole.
- Verouderde FAQ- en llms.txt-claims zijn gecorrigeerd met actuele Google-documentatie. Geen unsupported E-E-A-T-verkeerspercentages overgenomen.
- Geen Engelse Flesch-score voor Nederlandse teksten gebruikt. Geen verzonnen zoekvolumes, DA-scores, organisch verkeer, testervaring of Core Web Vitals.
- GSC-connector vereist een abonnement; publieke zoekdata ontbreken. Dit staat los van gratis toegang tot Search Console zelf.

Het hoofdrapport toont lokale fixes afzonderlijk van de oorspronkelijke deelrapporten. Publicatie, daadwerkelijke indexatie en organische resultaten zijn niet vastgesteld.
