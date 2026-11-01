# SPORTGRIPS

Live: https://sportgrips.vercel.app

GitHub: https://github.com/lasse-lenting/sportgrips.nl

Vercel-project: https://vercel.com/lasselentings-projects/sportgrips

Het domein wordt door de eigenaar gekoppeld; canonicals gebruiken https://sportgrips.nl.

SPORTGRIPS op basis van de Maaistro-layout. Indexering is voor alle omgevingen uitgeschakeld: noindex-meta, X-Robots-Tag en een lege sitemap. Verwijder dit uitsluitend na expliciete opdracht.

```sh
npm ci
npm run dev -- --port 3025
npm run lint
npm run typecheck
npm run build
```

Op deze Mac: http://localhost:3025. Een devserver in een cloudomgeving is niet via localhost op je eigen computer bereikbaar; daarvoor is een expliciete preview-/portforwardlink nodig.

Zie `docs/seo/SPORTGRIPS-IMPLEMENTATION.md` voor broninventaris, keuzes en controles. `docs/legacy/` bevat bewaard Maaistro-/Paspoot-werk en is geen SPORTGRIPS-strategie. Alle bestaande public-media blijven ongewijzigd. Meetdiensten staan standaard uit; gebruik alleen eigen codes uit `.env.example`.
