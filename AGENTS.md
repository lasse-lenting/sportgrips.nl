<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sportgrips design

Read DESIGN.md before visual changes. Preserve existing layouts, media and local fonts. H1s use --font-weight-page-heading: 400.

## Sportgrips content

Use docs/seo/SPORTGRIPS-IMPLEMENTATION.md and docs/seo/source/workbook.json. docs/legacy is preserved historical work, not current strategy. Do not invent products, prices, reviews, test results or business identifiers. Do not publish or deploy without explicit user instruction.

The user authorized a comprehensive media refresh on 1 November 2026. Use the new photo assets under public/assets/sportgrips/photos; preserve the original assets as an archive. Brand spelling in ordinary text and metadata is Sportgrips. The SVG wordmark is uppercase SPORTGRIPS. Keep the logo canvas and optical height, page layout, and H1 weight 400.

Only the canonical production domain sportgrips.nl is indexable. Preserve noindex on other hosts and outside Vercel production.
