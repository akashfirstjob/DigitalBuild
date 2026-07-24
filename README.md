# BuildFleet marketplace frontend

A responsive, buyer-first construction equipment marketplace prototype for
India. The MVP is intentionally focused on curated backhoe-loader requests,
structured quotations, granular document-review facts, and human-assisted
matching.

## Included experiences

- `/` — public marketplace and quick request
- `/request` — five-step RFQ wizard with validation and draft autosave
- `/buyer` — buyer dashboard
- `/buyer/quotes` — responsive quote comparison
- `/supplier` — supplier onboarding checklist and RFQ invitation
- `/supplier/quote` — structured supplier quotation flow
- `/rental` — guided handover and incident reporting
- `/admin` — operations and verification workspace

The interface is a frontend prototype. It uses realistic local demonstration
data and browser state; it does not connect to production marketplace APIs,
payments, or identity systems.

## Visual system

- Brand navy: `#0B1F33`
- Safety amber: `#F4A62A`
- Canvas: `#F8FAFC`
- Typography: Inter-compatible system stack
- Minimum primary control height: 48px
- Mobile reflow breakpoint: 820px, with additional refinements below 640px

All construction photography and the backhoe-loader cutout were generated for
this project. Source PNGs and AVIF/WebP derivatives are in `public/images/`.
Crop, focal-point, dimensions, and alt-text guidance are recorded in
`public/images/asset-manifest.json`.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm test
```

`npm test` creates a production build and verifies server-rendered output for
all primary routes.
