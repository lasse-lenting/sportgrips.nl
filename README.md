# Sportgrips

Productiedomein: https://sportgrips.nl

GitHub: https://github.com/lasse-lenting/sportgrips.nl

Vercel-project: https://vercel.com/lasselentings-projects/sportgrips

Sportgrips gebruikt `https://sportgrips.nl` als canoniek domein. Alleen op dit domein is de productiebuild van Vercel indexeerbaar. Andere hosts houden de `X-Robots-Tag: noindex`. Lokale builds en previews hebben ook noindex-meta en een lege sitemap.

```sh
npm ci
npm run dev -- --port 3025
npm run lint
npm run typecheck
npm run build
```

Op deze Mac: http://localhost:3025. Een devserver in een cloudomgeving is niet via localhost op je eigen computer bereikbaar; daarvoor is een expliciete preview-/portforwardlink nodig.

Zie `docs/seo/SPORTGRIPS-IMPLEMENTATION.md` voor broninventaris, keuzes en controles. `docs/legacy/` bevat bewaard Maaistro-/Paspoot-werk en is geen SPORTGRIPS-strategie. Alle bestaande public-media blijven ongewijzigd. Meetdiensten staan standaard uit; gebruik alleen eigen codes uit `.env.example`.
