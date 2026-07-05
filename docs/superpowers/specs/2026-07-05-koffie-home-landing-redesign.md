# Koffie Home Landing Page — Redesign Design Spec

**Date:** 2026-07-05
**Status:** Approved (design), pending implementation plan
**Supersedes:** the visual/structural direction of `2026-07-05-koffie-home-landing-design.md` (that build shipped; this redesigns it).

## Goal

Rebuild the existing Koffie Home landing page into a bold, editorial, photo-rich
single page that matches the brand's real logo (forest green + golden yellow,
"Coffee & Kitchen") and the Kopag "Coffee Break" reference aesthetic. Full
structural restructure — not a restyle.

## What changes vs. the current site

The current site (`app/page.tsx` composing Header · Hero · Menu · About · Contact
· Footer) uses a warm brown/orange palette, serif headings, and CSS gradient
placeholder blocks with no images. All of that is replaced:

- **Palette:** brown/orange/cream → forest green / marigold yellow / warm cream.
- **Type:** system serif/sans → Bricolage Grotesque (display) + Inter (body).
- **Imagery:** CSS placeholder blocks → real royalty-free stock photos + the brand logo.
- **Structure:** 4 sections → 8 sections (adds tabbed menu, featured/ratings, split
  panel, shops gallery, FAQ).
- **Language:** stays Indonesian; all copy stays centralized in `lib/content.ts`.

## Global constraints

- Content language: Indonesian only, no language toggle.
- No CMS, no database, no server actions, no API routes. Static site.
- **Images are now allowed** (reversal of the prior spec). Royalty-free stock
  photos are downloaded once into `public/images/` and committed to the repo;
  served via `next/image` from local paths (no remote-image config needed). The
  brand logo lives at `public/logo.jpg`.
- All copy, menu items, prices, ratings, FAQ, and contact info live in
  `lib/content.ts` as typed constants — never hardcoded in components.
- Tech stack unchanged: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind
  CSS v4, Framer Motion 12, pnpm, Node 24. Fonts via `next/font/google`.
- Path alias `@/*` → repo root.
- Verification gate (no automated test suite): `pnpm exec tsc --noEmit`, `pnpm lint`,
  `pnpm build`, plus a manual/browser check.

## Design tokens

Defined as CSS custom properties in `app/globals.css` and referenced via Tailwind
arbitrary values `bg-[var(--color-forest)]` etc. (same pattern the current code uses).

| Token | Value | Use |
|---|---|---|
| `--color-forest` | `#123a2a` | primary dark green — hero text, dark panels, headings on cream |
| `--color-forest-deep` | `#0d2c20` | deeper green for footer / contrast panels |
| `--color-marigold` | `#f2b705` | golden yellow — CTAs, the "best coffee" panel, accents, badge |
| `--color-cream` | `#f4ecdd` | page background (warm off-white) |
| `--color-paper` | `#ffffff` | card surfaces |
| `--color-moss` | `#c9d6c4` | muted green tint for secondary photo frames / placeholders |
| `--color-ink` | `#1b2620` | near-black body text on light surfaces |

## Typography

- **Display:** `Bricolage_Grotesque` from `next/font/google` (variable, weights up
  to 800), exposed as CSS var `--font-display`. Used for all `h1`–`h3`, hero
  headline, section titles. Set large, tight tracking, heavy weight.
- **Body/UI:** `Inter` from `next/font/google`, exposed as `--font-body`. Applied
  to `body`. Used for paragraphs, nav, buttons, captions.
- Wired in `app/layout.tsx`; font CSS vars added to `<html>`/`<body>` className and
  mapped in `app/globals.css` (`font-sans` → Inter, plus a `.font-display` utility
  or `font-[family-name:var(--font-display)]`).

## Motion (Framer Motion)

- Hero: staggered entrance (headline, paragraph, CTA, photo, badge).
- Sections: `whileInView` scroll-reveal, `viewport={{ once: true }}`.
- **Marquee:** an infinite horizontal loop of specialty labels (CSS/Framer
  transform loop), reduced-motion aware.
- **Menu tabs:** animated crossfade/slide when switching category (client state).
- **FAQ accordion:** height/opacity animation on expand/collapse.
- Respect `prefers-reduced-motion` (disable marquee auto-scroll and large moves).

## Page structure (8 sections)

Rendered by `app/page.tsx` in this order:

### 1. Header (`components/Header.tsx`)
Sticky, translucent cream with backdrop-blur. Three-part layout: left = `Menu`
label with a hamburger glyph (visual only; anchors below it are the nav on desktop),
center = the **logo** (`public/logo.jpg` via `next/image`, links to top), right =
a marigold pill `Kontak` button linking to `#kontak`. On mobile the nav links
collapse under the `Menu` affordance (simple: links wrap / show as a row — no JS
drawer required for v1; keep it CSS-only).

### 2. Hero (`components/sections/Hero.tsx`, client)
- Giant Bricolage headline in forest green on cream: **"Waktunya Ngopi"**.
- Hashtag row: `#KopiNusantara`, `#NgopiSantai`, `#FreshRoast`, `#CoffeeAndKitchen`.
- Brand paragraph (2–3 lines) + `Mulai Pesan` marigold CTA pill (→ `#menu`).
- Large rounded hero **photo** (hand holding iced/latte coffee) with `next/image`.
- Circular **badge** ("Koffie Home · Coffee & Kitchen · Est.") overlapping the photo,
  rendered as an inline SVG/CSS circle (not a photo).
- Bottom: infinite **marquee** strip (`components/Marquee.tsx`) of specialties.

### 3. Explore Menu (`components/sections/Menu.tsx`, client)
- Heading "Jelajahi Menu" + a `/2025` marker (reference detail).
- **Tab bar** of categories: `Signature`, `Kopi`, `Non-Kopi`, `Makanan`, `Pastry`.
  Active tab is a marigold/forest pill; selection held in `useState`.
- Product grid for the active tab: card = photo + name + short desc + price
  (`formatPrice`). Animate items on tab change.

### 4. Featured / Ratings (`components/sections/Featured.tsx`, client)
- 3 highlighted products as larger cards: photo, name, one-line desc, **star rating
  row** + review count (e.g. "4.9/5 · 2.540 ulasan"). Data-driven from `featured`.

### 5. Kopi Terbaik split panel (`components/sections/BestCoffee.tsx`, client)
- Two-column: a **marigold** panel with big Bricolage copy ("Gunakan Kopi Terbaik" —
  premium arabica / fresh roast story, absorbing the old Tentang narrative) + a
  `Selengkapnya` CTA, paired with a warm interior/kitchen **photo** column.

### 6. Kunjungi Kami / Shops (`components/sections/Shops.tsx`, client)
- "Kunjungi Kami" heading + a horizontal **gallery** of storefront/interior photos
  with captions/labels. Scroll-reveal per item.

### 7. FAQ (`components/sections/Faq.tsx`, client)
- "Pertanyaan Umum" + an **accordion** of 4–6 Indonesian Q&As (jam buka,
  pesan-antar, reservasi, asal biji, dll). One item open at a time; animated.

### 8. Footer (`components/Footer.tsx`)
- Forest-deep background, logo, address, jam buka, WhatsApp CTA, social links
  (Instagram/TikTok), copyright with current year.

## Components inventory

| File | Type | Responsibility |
|---|---|---|
| `app/layout.tsx` | server | fonts + metadata + globals |
| `app/globals.css` | — | tokens, font mapping, smooth scroll |
| `app/page.tsx` | server | compose sections |
| `lib/content.ts` | data | all copy/menu/featured/faq/shops/contact + `formatPrice` |
| `components/Header.tsx` | server | sticky nav + logo |
| `components/Marquee.tsx` | client | reusable infinite marquee strip |
| `components/sections/Hero.tsx` | client | hero |
| `components/sections/Menu.tsx` | client | tabbed menu |
| `components/sections/Featured.tsx` | client | rated products |
| `components/sections/BestCoffee.tsx` | client | split panel |
| `components/sections/Shops.tsx` | client | shops gallery |
| `components/sections/Faq.tsx` | client | accordion |
| `components/Footer.tsx` | server | footer |

## Data model (`lib/content.ts`)

Extends the current module. New/changed exported shapes:

```ts
brand: { name; tagline; logoSrc: "/logo.jpg" }
hero: { headline; hashtags: string[]; paragraph; ctaLabel; ctaHref;
        photo: ImageAsset; badgeText: string[] }
marqueeItems: string[]                       // specialty labels
type ImageAsset = { src: string; alt: string }
type MenuItem = { name; description; price: number; image: ImageAsset }
type MenuCategory = { id; name; items: MenuItem[] }  // id used as tab key
menuCategories: MenuCategory[]               // Signature, Kopi, Non-Kopi, Makanan, Pastry
type FeaturedProduct = MenuItem & { rating: number; reviews: number }
featured: FeaturedProduct[]                  // 3 items
bestCoffee: { eyebrow; heading; body; ctaLabel; ctaHref; photo: ImageAsset }
type Shop = { name; caption; photo: ImageAsset }
shops: Shop[]                                // 4 items
type Faq = { question; answer }
faqs: Faq[]                                  // 4–6 items
contact: { address; hours; whatsapp; whatsappLabel }  // unchanged
formatPrice(price): string                   // unchanged (IDR)
```

`ImageAsset.src` points at committed files under `public/images/`. Every image
carries Indonesian `alt` text for accessibility.

## Imagery plan

- Source: royalty-free stock (Unsplash/Pexels licence, free for commercial use).
  A curated set of coffee/cafe/food/interior photos is downloaded once into
  `public/images/` with descriptive filenames and committed. Rough set: 1 hero,
  ~10–12 menu-item shots, 3 featured, 1 kitchen/interior, 4 storefront/interior.
- Served via `next/image` with explicit `width`/`height` (or `fill` in fixed-aspect
  containers) and `alt`. Because files are local, no `next.config` remote-pattern
  changes are required.
- The logo (`public/logo.jpg`) is used as-is in Header and Footer.

## Accessibility & responsive

- Semantic landmarks (`header`/`main`/`section`/`footer`), heading hierarchy.
- All images have meaningful `alt`; decorative-only shapes are `aria-hidden`.
- Tabs: buttons with `aria-selected`; FAQ: buttons with `aria-expanded`.
- Fully responsive: hero, menu grid, split panel, and shops gallery reflow to a
  single column at mobile widths with no horizontal overflow. Marquee and gallery
  scroll within their own overflow container, never the page body.
- `prefers-reduced-motion` honored.

## Testing / verification

No automated suite. Gate = `pnpm exec tsc --noEmit` + `pnpm lint` + `pnpm build`
clean, plus a browser pass (Playwright) verifying: logo renders, hero photo + badge
+ marquee present, menu tabs switch content, featured ratings show, split panel and
shops gallery render, FAQ expands/collapses, WhatsApp link works, and no horizontal
overflow at 375px.

## Out of scope (YAGNI)

- Mobile hamburger drawer with JS (CSS-only nav for v1).
- Cart / ordering / checkout.
- Real CMS, i18n toggle, dark mode.
- Image optimization tuning beyond `next/image` defaults.
