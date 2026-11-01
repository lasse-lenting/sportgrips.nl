# MAAISTRO

Nederlandse keuzehulp en koopgidsen voor robotmaaiers. Deze zelfstandige repository bevat de volledige huidige Maaistro-versie, inclusief alle aanpassingen aan branding, content, keuzehulp en fotografie.

Repository: https://github.com/lasse-lenting/maaistro (privé).

## Lokaal starten

```sh
npm ci
npm run dev -- --port 3000
```

Open http://localhost:3000. Voor een andere site-URL kun je `.env.example` naar `.env.local` kopiëren en `NEXT_PUBLIC_SITE_URL` instellen.

## Controles

```sh
npm run typecheck
npm run lint
npm run build
```

## Herkomst en huidige status

De basis is gekopieerd uit Paspoot, zonder de Git-geschiedenis of remote over te nemen. Maaistro heeft een eigen begincommit. De oorspronkelijke Paspoot-repository blijft zelfstandig.

De site is lokaal voorbereid voor maaistro.nl en nog niet gedeployed. De oude publieke Paspoot-routes en redirects zijn verwijderd; gedeelde bronmodules zijn behouden. Er zijn geen actieve affiliatecodes of productfeeds. Zie [livegangstappen](LAUNCH-TODAY.md), [audit](FULL-AUDIT-REPORT.md) en [planner](SEO-PLANNER.html).

Zie [de aanpassingen](docs/CLONE.md), [fotografieprompts](docs/photography-prompts.json) en [beeldgebruik](docs/photography-usage.json).
