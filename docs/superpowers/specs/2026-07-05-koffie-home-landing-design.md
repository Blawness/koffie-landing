# Koffie Home Landing Page — Design

## Purpose

A single-page marketing landing site for "Koffie Home", a coffee shop brand. Static content only (no backend, no CMS) — all copy and menu data live in code and are meant to be swapped for real data later.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind v4
- Framer Motion for section-entry / hover animations
- Deployed as a static/SSR Next.js app (Vercel-ready, no DB)

## Content & Language

- Indonesian only, no language toggle.
- All copy, menu items, prices, and contact info are placeholder/dummy data, centralized in `lib/content.ts` so they're easy to find and replace with real brand data later.
- No images are sourced externally at build time; use local placeholder assets or solid-color blocks via `next/image`, swappable later.

## Page Structure (single page, `app/page.tsx`)

Sections rendered top to bottom, each as its own component under `components/sections/`:

1. **Header/Nav** (`components/Header.tsx`) — sticky, logo "Koffie Home", anchor links to Menu / Tentang / Kontak sections.
2. **Hero** (`components/sections/Hero.tsx`) — headline, subheadline, primary CTA button ("Lihat Menu"), hero image/illustration.
3. **Menu** (`components/sections/Menu.tsx`) — grid of product cards (name, short description, dummy price), grouped by category (Kopi / Non-Kopi / Pastry).
4. **Tentang** (`components/sections/About.tsx`) — short brand story plus 2-3 value points (e.g. "Biji Pilihan", "Diseduh Segar"), paired with a placeholder image.
5. **Kontak** (`components/sections/Contact.tsx`) — dummy address, opening hours, WhatsApp/phone CTA button. Map embed is optional/out of scope for v1.
6. **Footer** (`components/Footer.tsx`) — copyright, dummy social links.

## Visual Design

- Warm & earthy palette: dark brown, cream/off-white, burnt-orange accent for CTAs.
- Serif typeface for headings (classic café feel), sans-serif for body text.
- Smooth scroll to anchors; subtle fade/slide-in animations on section entry via Framer Motion.

## Data Model

`lib/content.ts` exports typed constants:

```ts
export const brand = { name: "Koffie Home", tagline: "..." }
export const menuCategories: { name: string; items: { name: string; description: string; price: number }[] }[]
export const aboutValues: { title: string; description: string }[]
export const contact: { address: string; hours: string; whatsapp: string }
```

No database, no admin, no server actions.

## Testing

- No automated e2e suite for v1 (static landing page). Verify manually via `pnpm dev` in a browser before calling the build done: check hero renders, menu grid, anchor nav scrolling, and mobile responsiveness.

## Out of Scope (v1)

- CMS / editable content
- Bilingual support
- Map embed
- Real brand assets/photos (placeholders only)
- Order/checkout flow
