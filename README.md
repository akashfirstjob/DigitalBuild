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

## Tech stack

A client-side single-page app built with **React 19 + Vite** and
**React Router** (client-side routing). Styling is **Tailwind CSS v4**. There is
no server runtime — it deploys as static assets (e.g. Vercel, Netlify, any CDN).

## Project structure

Each screen is a clearly named component under `src/pages/`:

| Route | File |
| --- | --- |
| `/` | `src/pages/Home.tsx` |
| `/request` | `src/pages/RequestWizard.tsx` |
| `/buyer` | `src/pages/BuyerDashboard.tsx` |
| `/buyer/quotes` | `src/pages/QuoteComparison.tsx` |
| `/rental` | `src/pages/RentalHandover.tsx` |
| `/supplier` | `src/pages/SupplierDashboard.tsx` |
| `/supplier/quote` | `src/pages/SupplierQuote.tsx` |
| `/admin` | `src/pages/AdminDashboard.tsx` |

- `src/App.tsx` — route table, per-route page titles, hash/scroll handling
- `src/main.tsx` — app entry (`BrowserRouter` + `createRoot`)
- `src/components/SiteChrome.tsx` — shared header, footer, app shell, nav
- `src/components/Link.tsx` — `href`-based link that routes via React Router
- `src/globals.css` — design tokens and Tailwind entry

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

The dev server prints a local URL (default `http://localhost:5173`).

## Validation

```bash
npm run lint    # TypeScript type-check (tsc --noEmit)
npm run build   # type-check + production build to dist/
npm run preview # serve the production build locally
```

## Deployment

The production build in `dist/` is fully static. On Vercel the framework preset
is **Vite**; `vercel.json` rewrites all paths to `index.html` so client-side
routes (e.g. `/buyer/quotes`) resolve on direct load and refresh.
