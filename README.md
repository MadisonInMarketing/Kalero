# KALERO — Premium Air Filters

A polished Next.js prototype for KALERO, a premium-but-accessible air-filter brand for everyday homeowners. Designed to feel like shopping for premium skincare or home wellness — not the hardware aisle.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** for subtle, calm motion
- **Lucide** icons
- **next/font** — Manrope (display) + Inter (body)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

```bash
npm run build     # production build
npm run start     # run production build
npm run typecheck # tsc --noEmit
```

## Routes

| Route                                | Purpose |
| ------------------------------------ | ------- |
| `/`                                  | Homepage (13 sections) |
| `/shop`                              | All filters |
| `/shop/[collection]`                 | Category / concern collection page |
| `/products/[slug]`                   | Product detail (reusable template) |
| `/find-your-filter`                  | Interactive quiz experience |
| `/subscriptions`                     | Filter subscription plan builder |
| `/hotel-property`                    | Hotel & Property Supply program |
| `/how-it-works`                      | KALERO process page |

The collection and product routes are pre-generated with `generateStaticParams` from the shared product / category data.

## File structure

```
app/
├── layout.tsx                # Root layout (fonts, header, footer)
├── page.tsx                  # Homepage composition
├── globals.css               # Tailwind base + tokens
├── not-found.tsx             # Branded 404
├── shop/
│   ├── page.tsx
│   └── [collection]/page.tsx
├── products/[slug]/page.tsx
├── find-your-filter/page.tsx
├── subscriptions/page.tsx
├── hotel-property/page.tsx
└── how-it-works/page.tsx

components/
├── layout/
│   ├── Header.tsx            # Sticky, transparent-to-solid on scroll
│   ├── Footer.tsx
│   └── AnnouncementBar.tsx   # "Free shipping on filter subscriptions"
├── home/                     # Homepage sections (1 file per section)
│   ├── Hero.tsx
│   ├── ShopByAir.tsx
│   ├── ProductCollection.tsx
│   ├── QuizPreview.tsx
│   ├── HowItWorks.tsx
│   ├── FilterPerformance.tsx
│   ├── Subscription.tsx
│   ├── SeasonalCollection.tsx
│   ├── WhyKalero.tsx
│   ├── HotelSupply.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── FinalCTA.tsx
├── product/
│   ├── ProductCard.tsx
│   └── ProductDetail.tsx
├── quiz/
│   └── Quiz.tsx              # 5-step matcher
└── ui/                       # Design-system primitives
    ├── Button.tsx
    ├── AirflowLines.tsx      # Signature curved airflow SVG
    ├── FilterBox.tsx         # Stylized SVG product render
    ├── Logo.tsx
    ├── Placeholder.tsx       # Labeled image placeholder
    ├── PageHeader.tsx
    ├── Reveal.tsx            # Motion scroll-reveal wrapper
    ├── Stars.tsx
    ├── Chip.tsx
    └── CategoryIcon.tsx

lib/
├── products.ts               # Product data + colors + sizes
├── categories.ts             # "Shop by concern" categories
└── copy.ts                   # FAQs, testimonials, seasonal drops, quiz options,
                              # how-it-works steps, filter-performance matrix

public/images/                # Empty — see "Assets to replace" below
```

## Editing content

- **Products** — `lib/products.ts`. Each product entry drives its product card, its product-detail page, category collections, and the quiz result. Update `priceFrom`, `sizes`, `rating`, `helpsCapture`, etc. Add new products by pushing to the `products` array.
- **Categories / concerns** — `lib/categories.ts`. Each entry drives a shop-by-concern card and generates a `/shop/[slug]` collection page.
- **FAQs, testimonials, seasonal drops, quiz steps, how-it-works, filter-performance matrix** — all in `lib/copy.ts`.
- **Header navigation** — `components/layout/Header.tsx` (`links` array).
- **Footer navigation, newsletter copy, social links** — `components/layout/Footer.tsx`.

## Assets to replace

`components/ui/FilterBox.tsx` currently renders a stylized SVG of the KALERO packaging so product cards and hero images look intentional without waiting for real renders. Swap the FilterBox for a `next/image` render as assets arrive.

The `Placeholder` component renders labeled, brand-appropriate image placeholders wherever a real photograph will eventually go. Each placeholder specifies a recommended dimension in a `hint` prop.

Assets still needed:

| Location                           | Placeholder label                     | Recommended | Notes                                      |
| ---------------------------------- | ------------------------------------- | ----------- | ------------------------------------------ |
| Hero — three filter renders        | (currently SVG)                       | 800×1000    | Front-facing filter box renders            |
| Seasonal Collection — 4 drops      | Spring / Summer / Fall / Winter       | 1200×1500   | Editorial home photography                 |
| Hotel Supply hero                  | Premium hotel guest room              | 1600×900    | Bright, editorial hotel photography         |
| Product Detail — 4 gallery images  | Front / Lifestyle / Angle / Detail    | 1200×1200   | Product renders + lifestyle shots           |
| Product Collection card renders    | (currently SVG)                       | 800×1000    | Individual product renders                 |

Suggested asset directories:

```
public/images/
├── logo/
├── products/{product-slug}/{front, lifestyle, angle, detail}.jpg
├── interiors/
├── categories/
└── icons/
```

## Design system

- **Colors** — Configured in `tailwind.config.ts`. Every custom color used in the design (lavender scale, charcoal, canvas, sky, grass, blush, smoke, graphite, gold) is available as a Tailwind class.
- **Typography** — Manrope (display) via `font-display`, Inter (body) via default. Editorial display sizes are defined as `text-display-2xl / xl / lg / md`.
- **Motion** — `Reveal` is the canonical scroll-reveal component. `AirflowLines` is the ambient decorative SVG. Both defer to `motion` variants so they respect user reduced-motion preferences on modern browsers.
- **Focus states** — Global focus-visible outline on interactive elements (`app/globals.css`). Accessibility helpers include the skip link in `app/layout.tsx` and semantic labels throughout.

## Accessibility & responsiveness

- Mobile-first breakpoints. Every layout is verified at 375, 768, and 1280 widths.
- Keyboard-navigable across nav, quiz, subscription toggles, size selectors, filter performance switcher, and FAQ accordion.
- Skip-to-content link on load.
- Semantic headings and landmark roles.

## Verify

- `npm run typecheck` — passes.
- `npm run build` — passes.

Once installed, `npm run dev` and click through:

1. Homepage — scroll all 13 sections.
2. `/shop/pets-and-dander` — category collection.
3. `/products/pet-defense` — reusable product detail template.
4. `/find-your-filter` — 5-step quiz, view the recommendation.
5. `/subscriptions` — subscribe / one-time toggle, cadence picker.
6. `/hotel-property` — Hotel Supply program.

## Notes on claims

Following the brand brief:

- No medical / cure / prevention language.
- No made-up certifications, awards, exact particle-removal percentages, or customer totals.
- Filter comparison uses "designed for", "helps capture", "made for homes with" language.
- The filter performance chart is presented as a product comparison, not a medical claim, with an inline HVAC disclaimer.
