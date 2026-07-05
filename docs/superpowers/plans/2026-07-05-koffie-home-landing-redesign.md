# Koffie Home Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing Koffie Home landing page into a bold, editorial, photo-rich single page matching the brand's forest-green/marigold logo and the Kopag "Coffee Break" reference.

**Architecture:** A single Next.js App Router page (`app/page.tsx`) composes a server `Header`/`Footer` plus seven client section components under `components/sections/*` and a reusable `components/Marquee.tsx`. All copy/menu/featured/faq/shops/contact data stays centralized in `lib/content.ts`. Imagery is real royalty-free stock photos committed under `public/images/`, served via `next/image`. Fonts load via `next/font/google` (Bricolage Grotesque + Inter). No database, CMS, API routes, or server actions.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12, `next/font/google`, `next/image`, pnpm, Node 24. **No new dependencies** — everything is already installed.

## Global Constraints

- Content language: Indonesian only, no language toggle.
- No CMS, no database, no server actions, no API routes. Static site.
- Images allowed: royalty-free stock photos downloaded once into `public/images/` and committed; served via `next/image` from local paths (no `next.config` remote-image config needed). Brand logo is `public/logo.jpg` (already present).
- All copy, menu items, prices, ratings, FAQ, shops, and contact info live in `lib/content.ts` as typed constants — never hardcoded in components.
- No new dependencies: `framer-motion`, `next`, `react`, `react-dom` already installed; fonts and image come from Next built-ins.
- Path alias `@/*` → repo root.
- Design tokens are CSS custom properties on `:root`, referenced via Tailwind arbitrary values `bg-[var(--color-forest)]`:
  `--color-forest: #123a2a` · `--color-forest-deep: #0d2c20` · `--color-marigold: #f2b705` · `--color-cream: #f4ecdd` · `--color-paper: #ffffff` · `--color-moss: #c9d6c4` · `--color-ink: #1b2620`.
- Display font var `--font-display` (Bricolage Grotesque), body font var `--font-body` (Inter).
- Verification gate (no automated test suite): `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build` all clean, plus a browser check.
- Section anchors: Menu `#menu`, Featured `#unggulan`, Shops `#kunjungi`, FAQ `#faq`, Footer `#kontak`.

---

### Task 1: Foundation — tokens, fonts, reset

Replace the old brown theme + serif fonts with the new tokens and Bricolage/Inter, and reset the page to a placeholder so the codebase compiles cleanly while old components are removed and rebuilt in later tasks.

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Delete: `components/Header.tsx`, `components/Footer.tsx`, `components/sections/Hero.tsx`, `components/sections/Menu.tsx`, `components/sections/About.tsx`, `components/sections/Contact.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: global tokens (`--color-*`) and font vars (`--font-display`, `--font-body`) plus a `.font-display` utility class, available to all later tasks. `lib/content.ts` is left untouched here and is unused by the placeholder page (rewritten in Task 3).

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

:root {
  --color-forest: #123a2a;
  --color-forest-deep: #0d2c20;
  --color-marigold: #f2b705;
  --color-cream: #f4ecdd;
  --color-paper: #ffffff;
  --color-moss: #c9d6c4;
  --color-ink: #1b2620;
}

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-body), system-ui, sans-serif;
}

.font-display {
  font-family: var(--font-display), system-ui, sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Koffie Home — Coffee & Kitchen",
  description: "Kopi specialty Nusantara dan hidangan dapur yang menghangatkan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx` with a placeholder**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-display text-6xl font-extrabold text-[var(--color-forest)]">
        Koffie Home
      </h1>
    </main>
  );
}
```

- [ ] **Step 4: Delete the old components**

```bash
git rm components/Header.tsx components/Footer.tsx \
  components/sections/Hero.tsx components/sections/Menu.tsx \
  components/sections/About.tsx components/sections/Contact.tsx
```

- [ ] **Step 5: Verify build**

Run: `pnpm build`
Expected: build succeeds; route `/` listed; the placeholder heading renders in Bricolage green. (`lib/content.ts` still contains old exports but is now unused — no type errors.)

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx app/page.tsx components
git commit -m "chore: reset theme to forest/marigold tokens + Bricolage/Inter fonts"
```

---

### Task 2: Acquire imagery

Download a curated set of royalty-free coffee/cafe/food/interior photos into `public/images/` and commit them. All URLs below are Unsplash images (free for commercial use, no attribution required). **These are starting candidates — you MUST open each downloaded file and confirm it depicts the labelled subject; if any URL 404s or the photo is wrong, replace it with a suitable free photo for that subject from unsplash.com or pexels.com before continuing.**

**Files:**
- Create: `public/images/*.jpg` (21 files, listed below)

**Interfaces:**
- Produces: the exact image paths that `lib/content.ts` (Task 3) references. Filenames are fixed contract:
  `hero.jpg`, `signature-eskopi.jpg`, `kopisusu.jpg`, `coldbrew.jpg`, `espresso.jpg`, `cappuccino.jpg`, `americano.jpg`, `matcha.jpg`, `cokelat.jpg`, `esteh.jpg`, `nasgor.jpg`, `miegoreng.jpg`, `ayamgeprek.jpg`, `croissant.jpg`, `bananabread.jpg`, `cinnamonroll.jpg`, `kitchen.jpg`, `shop-1.jpg`, `shop-2.jpg`, `shop-3.jpg`, `shop-4.jpg`.

- [ ] **Step 1: Write the download script**

Create `scripts/fetch-images.sh` (temporary helper; not committed to app runtime):

```bash
#!/usr/bin/env bash
set -euo pipefail
mkdir -p public/images
Q="?auto=format&fit=crop&w=1000&q=80"

declare -A IMG=(
  [hero]="photo-1461023058943-07fcbe16d735"
  [signature-eskopi]="photo-1517701550927-30cf4ba1dba5"
  [kopisusu]="photo-1541167760496-1628856ab772"
  [coldbrew]="photo-1521302080334-4bebac2763a6"
  [espresso]="photo-1510707577719-ae7c14805e3a"
  [cappuccino]="photo-1481391319762-47dff72954d9"
  [americano]="photo-1447933601403-0c6688de566e"
  [matcha]="photo-1515823662972-da6a2e4d3002"
  [cokelat]="photo-1542990253-0d0f5be5f0ed"
  [esteh]="photo-1499638673689-79a0b5115d87"
  [nasgor]="photo-1603133872878-684f208fb84b"
  [miegoreng]="photo-1612929633738-8fe44f7ec841"
  [ayamgeprek]="photo-1626645738196-c2a7c87a8f58"
  [croissant]="photo-1555507036-ab1f4038808a"
  [bananabread]="photo-1509440159596-0249088772ff"
  [cinnamonroll]="photo-1509365465985-25d11c17e812"
  [kitchen]="photo-1554118811-1e0d58224f24"
  [shop-1]="photo-1453614512568-c4024d13c247"
  [shop-2]="photo-1501339847302-ac426a4a7cbb"
  [shop-3]="photo-1559925393-8be0ec4767c8"
  [shop-4]="photo-1521017432531-fbd92d768814"
)

for name in "${!IMG[@]}"; do
  url="https://images.unsplash.com/${IMG[$name]}${Q}"
  echo "Fetching $name ..."
  curl -fsSL "$url" -o "public/images/$name.jpg"
done
echo "Done."
```

- [ ] **Step 2: Run the download**

Run: `bash scripts/fetch-images.sh`
Expected: 21 files created under `public/images/`. If any `curl` fails (non-zero exit), replace that entry's photo ID with a working Unsplash photo ID for the same subject and re-run.

- [ ] **Step 3: Verify each file is a real JPEG and non-trivial size**

Run:
```bash
for f in public/images/*.jpg; do
  printf '%s ' "$f"; file -b "$f" | cut -d, -f1; \
  test "$(stat -c%s "$f")" -gt 5000 || echo "  !! $f too small — re-fetch";
done
```
Expected: every file reports "JPEG image data" and > 5 KB. Re-fetch any that fail.

- [ ] **Step 4: Visually confirm subjects**

Open the files (e.g. `xdg-open public/images/hero.jpg` or view in editor). Confirm each roughly matches its label (hero = coffee in hand/glass; `nasgor` = fried rice / Indonesian food; `shop-*` = cafe interior or storefront). Replace any mismatch with a suitable free photo and re-run Step 3 for it.

- [ ] **Step 5: Commit the images**

```bash
rm -f scripts/fetch-images.sh
git add public/images
git commit -m "assets: add royalty-free stock photos for landing sections"
```

---

### Task 3: Content data model

Replace `lib/content.ts` entirely with the new typed model. Self-contained (no consumers yet — the page is a placeholder), so `tsc` passes on its own.

**Files:**
- Modify (replace): `lib/content.ts`

**Interfaces:**
- Consumes: image paths from Task 2.
- Produces (used by Tasks 4-11):
  - `brand: { name: string; tagline: string; logoSrc: string }`
  - `navLinks: { label: string; href: string }[]`
  - `type ImageAsset = { src: string; alt: string }`
  - `hero: { headline: string; hashtags: string[]; paragraph: string; ctaLabel: string; ctaHref: string; photo: ImageAsset; badgeText: string[] }`
  - `marqueeItems: string[]`
  - `type MenuItem = { name: string; description: string; price: number; image: ImageAsset }`
  - `type MenuCategory = { id: string; name: string; items: MenuItem[] }`
  - `menuCategories: MenuCategory[]`
  - `type FeaturedProduct = MenuItem & { rating: number; reviews: number }`
  - `featured: FeaturedProduct[]`
  - `bestCoffee: { eyebrow: string; heading: string; body: string; ctaLabel: string; ctaHref: string; photo: ImageAsset }`
  - `type Shop = { name: string; caption: string; photo: ImageAsset }`
  - `shops: Shop[]`
  - `type Faq = { question: string; answer: string }`
  - `faqs: Faq[]`
  - `contact: { address: string; hours: string; whatsapp: string; whatsappLabel: string }`
  - `formatPrice(price: number): string`

- [ ] **Step 1: Replace `lib/content.ts`**

```ts
export type ImageAsset = { src: string; alt: string };

export const brand = {
  name: "Koffie Home",
  tagline: "Coffee & Kitchen",
  logoSrc: "/logo.jpg",
};

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Unggulan", href: "#unggulan" },
  { label: "Kunjungi", href: "#kunjungi" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  headline: "Waktunya Ngopi",
  hashtags: ["#KopiNusantara", "#NgopiSantai", "#FreshRoast", "#CoffeeAndKitchen"],
  paragraph:
    "Koffie Home menyeduh kopi specialty dari biji pilihan Nusantara dan menyajikan hidangan dapur yang menghangatkan. Setiap cangkir dibuat segar, penuh cerita.",
  ctaLabel: "Mulai Pesan",
  ctaHref: "#menu",
  photo: {
    src: "/images/hero.jpg",
    alt: "Segelas kopi susu dingin di atas meja kafe",
  },
  badgeText: ["KOFFIE HOME", "COFFEE & KITCHEN", "EST. 2020"],
};

export const marqueeItems = [
  "Kopi Susu Gula Aren",
  "Es Kopi Signature",
  "Matcha Latte",
  "Nasi Goreng Kampung",
  "Croissant Butter",
  "Cold Brew",
];

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  image: ImageAsset;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "signature",
    name: "Signature",
    items: [
      {
        name: "Es Kopi Signature",
        description: "Racikan khas Koffie Home dengan gula aren dan susu segar.",
        price: 26000,
        image: { src: "/images/signature-eskopi.jpg", alt: "Es kopi signature dengan gula aren" },
      },
      {
        name: "Kopi Susu Gula Aren",
        description: "Perpaduan espresso, susu segar, dan gula aren pilihan.",
        price: 25000,
        image: { src: "/images/kopisusu.jpg", alt: "Segelas kopi susu gula aren" },
      },
      {
        name: "Cold Brew Botolan",
        description: "Kopi seduh dingin 12 jam, ringan dan menyegarkan.",
        price: 30000,
        image: { src: "/images/coldbrew.jpg", alt: "Cold brew dalam botol" },
      },
    ],
  },
  {
    id: "kopi",
    name: "Kopi",
    items: [
      {
        name: "Espresso",
        description: "Espresso murni dari biji arabika pilihan.",
        price: 20000,
        image: { src: "/images/espresso.jpg", alt: "Secangkir espresso" },
      },
      {
        name: "Cappuccino",
        description: "Espresso dengan foam susu lembut bertekstur.",
        price: 28000,
        image: { src: "/images/cappuccino.jpg", alt: "Secangkir cappuccino dengan latte art" },
      },
      {
        name: "Americano",
        description: "Espresso yang dilarutkan dengan air panas, hitam dan bersih.",
        price: 22000,
        image: { src: "/images/americano.jpg", alt: "Secangkir americano hitam" },
      },
    ],
  },
  {
    id: "non-kopi",
    name: "Non-Kopi",
    items: [
      {
        name: "Matcha Latte",
        description: "Matcha premium dengan susu segar.",
        price: 27000,
        image: { src: "/images/matcha.jpg", alt: "Segelas matcha latte" },
      },
      {
        name: "Cokelat Panas",
        description: "Cokelat Belgia kental yang menghangatkan.",
        price: 24000,
        image: { src: "/images/cokelat.jpg", alt: "Secangkir cokelat panas" },
      },
      {
        name: "Es Teh Leci",
        description: "Teh segar dengan leci manis, dingin dan menyegarkan.",
        price: 21000,
        image: { src: "/images/esteh.jpg", alt: "Es teh leci dengan es batu" },
      },
    ],
  },
  {
    id: "makanan",
    name: "Makanan",
    items: [
      {
        name: "Nasi Goreng Kampung",
        description: "Nasi goreng khas dengan telur, ayam suwir, dan kerupuk.",
        price: 32000,
        image: { src: "/images/nasgor.jpg", alt: "Sepiring nasi goreng kampung" },
      },
      {
        name: "Mie Goreng Spesial",
        description: "Mie goreng dengan sayuran segar dan topping telur mata sapi.",
        price: 30000,
        image: { src: "/images/miegoreng.jpg", alt: "Sepiring mie goreng spesial" },
      },
      {
        name: "Ayam Geprek Sambal Matah",
        description: "Ayam goreng renyah dengan sambal matah pedas segar.",
        price: 35000,
        image: { src: "/images/ayamgeprek.jpg", alt: "Ayam geprek dengan sambal matah" },
      },
    ],
  },
  {
    id: "pastry",
    name: "Pastry",
    items: [
      {
        name: "Croissant Butter",
        description: "Croissant renyah dengan lapisan mentega premium.",
        price: 18000,
        image: { src: "/images/croissant.jpg", alt: "Croissant butter di atas piring" },
      },
      {
        name: "Banana Bread",
        description: "Roti pisang lembut dengan taburan kenari.",
        price: 20000,
        image: { src: "/images/bananabread.jpg", alt: "Irisan banana bread" },
      },
      {
        name: "Cinnamon Roll",
        description: "Roti gulung kayu manis dengan glaze manis.",
        price: 22000,
        image: { src: "/images/cinnamonroll.jpg", alt: "Cinnamon roll dengan glaze" },
      },
    ],
  },
];

export type FeaturedProduct = MenuItem & { rating: number; reviews: number };

export const featured: FeaturedProduct[] = [
  {
    name: "Kopi Susu Gula Aren",
    description: "Menu paling dicari, manis pas dan creamy.",
    price: 25000,
    image: { src: "/images/kopisusu.jpg", alt: "Segelas kopi susu gula aren" },
    rating: 4.9,
    reviews: 2540,
  },
  {
    name: "Matcha Latte",
    description: "Matcha premium yang lembut dan menyegarkan.",
    price: 27000,
    image: { src: "/images/matcha.jpg", alt: "Segelas matcha latte" },
    rating: 4.8,
    reviews: 1320,
  },
  {
    name: "Nasi Goreng Kampung",
    description: "Favorit dapur dengan cita rasa rumahan.",
    price: 32000,
    image: { src: "/images/nasgor.jpg", alt: "Sepiring nasi goreng kampung" },
    rating: 4.7,
    reviews: 980,
  },
];

export const bestCoffee = {
  eyebrow: "Gunakan",
  heading: "Kopi Terbaik",
  body: "Biji arabika premium, di-roasting segar setiap minggu, dan diracik dengan rempah pilihan untuk cita rasa yang tak terlupakan.",
  ctaLabel: "Selengkapnya",
  ctaHref: "#kunjungi",
  photo: {
    src: "/images/kitchen.jpg",
    alt: "Suasana dapur dan interior hangat Koffie Home",
  },
};

export type Shop = { name: string; caption: string; photo: ImageAsset };

export const shops: Shop[] = [
  {
    name: "Koffie Home Kenanga",
    caption: "Outlet utama dengan ruang kerja nyaman.",
    photo: { src: "/images/shop-1.jpg", alt: "Tampak depan outlet Koffie Home Kenanga" },
  },
  {
    name: "Koffie Home Dago",
    caption: "Suasana asri dengan area outdoor.",
    photo: { src: "/images/shop-2.jpg", alt: "Interior outlet Koffie Home Dago" },
  },
  {
    name: "Koffie Home Riau",
    caption: "Spot favorit untuk nongkrong sore.",
    photo: { src: "/images/shop-3.jpg", alt: "Storefront outlet Koffie Home Riau" },
  },
  {
    name: "Koffie Home Braga",
    caption: "Nuansa klasik di pusat kota.",
    photo: { src: "/images/shop-4.jpg", alt: "Interior klasik outlet Koffie Home Braga" },
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Jam berapa Koffie Home buka?",
    answer: "Kami buka setiap hari pukul 08.00 hingga 22.00 WIB di seluruh outlet.",
  },
  {
    question: "Apakah menerima pesan-antar?",
    answer: "Ya, pesan-antar tersedia melalui WhatsApp dan aplikasi ojek online favorit Anda.",
  },
  {
    question: "Bisakah memesan tempat untuk acara?",
    answer: "Tentu. Hubungi kami via WhatsApp untuk reservasi area atau acara privat.",
  },
  {
    question: "Dari mana biji kopi berasal?",
    answer: "Seluruh biji kopi kami bersumber dari petani lokal Nusantara dan di-roasting segar.",
  },
  {
    question: "Apakah tersedia menu makanan?",
    answer: "Ya, sebagai Coffee & Kitchen kami menyajikan beragam hidangan dari nasi goreng hingga pastry.",
  },
];

export const contact = {
  address: "Jl. Kenanga No. 12, Bandung, Jawa Barat",
  hours: "Setiap hari, 08.00 - 22.00 WIB",
  whatsapp: "https://wa.me/6281234567890",
  whatsappLabel: "Hubungi via WhatsApp",
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: rewrite content model for redesigned sections"
```

---

### Task 4: Header + page shell

**Files:**
- Create: `components/Header.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `brand`, `navLinks` from `@/lib/content`; `next/image`.
- Produces: `Header` (default export, no props), rendered at the top of `app/page.tsx`.

- [ ] **Step 1: Write `components/Header.tsx`**

```tsx
import Image from "next/image";
import { brand, navLinks } from "@/lib/content";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-forest)]/10 bg-[var(--color-cream)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <nav className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-forest)] transition hover:text-[var(--color-marigold)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#" className="shrink-0" aria-label={`${brand.name} beranda`}>
          <Image
            src={brand.logoSrc}
            alt={`Logo ${brand.name}`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full"
            priority
          />
        </a>
        <div className="flex flex-1 justify-end">
          <a
            href="#kontak"
            className="rounded-full bg-[var(--color-forest)] px-5 py-2 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-forest-deep)]"
          >
            Kontak
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Replace `app/page.tsx` to render the Header**

```tsx
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center">
        <h1 className="font-display text-6xl font-extrabold text-[var(--color-forest)]">
          Koffie Home
        </h1>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build` then `pnpm dev` and open `http://localhost:3000`.
Expected: build succeeds; sticky header shows nav links (Menu, Unggulan, Kunjungi, FAQ), the centered round logo, and a green "Kontak" pill.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx app/page.tsx
git commit -m "feat: add header with logo and anchor nav"
```

---

### Task 5: Marquee + Hero

**Files:**
- Create: `components/Marquee.tsx`
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `hero`, `marqueeItems` from `@/lib/content`; `motion` from `framer-motion`; `next/image`.
- Produces: `Marquee` (default export, props `{ items: string[] }`) and `Hero` (default export, no props). `Hero` is rendered as the first child of `<main>`.

- [ ] **Step 1: Write `components/Marquee.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Marquee({ items }: { items: string[] }) {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className="overflow-x-auto py-4">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm font-medium uppercase tracking-widest text-[var(--color-cream)]/85"
          >
            {item}
            <span aria-hidden className="text-[var(--color-marigold)]">
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/sections/Hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero, marqueeItems } from "@/lib/content";
import Marquee from "@/components/Marquee";

export default function Hero() {
  return (
    <section className="bg-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {hero.hashtags.map((tag) => (
            <span key={tag} className="text-sm font-medium text-[var(--color-forest)]/70">
              {tag}
            </span>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display mt-6 text-6xl font-extrabold leading-[0.95] tracking-tight text-[var(--color-forest)] sm:text-7xl md:text-8xl"
        >
          {hero.headline}
        </motion.h1>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="max-w-md text-[var(--color-ink)]/80">{hero.paragraph}</p>
            <a
              href={hero.ctaHref}
              className="mt-6 inline-block rounded-full bg-[var(--color-marigold)] px-8 py-3 font-semibold text-[var(--color-forest)] transition hover:brightness-105"
            >
              {hero.ctaLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -left-3 bottom-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-forest)] p-3 text-center">
              <span className="font-display text-[9px] font-bold uppercase leading-tight text-[var(--color-marigold)]">
                {hero.badgeText.join(" · ")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 bg-[var(--color-forest)]">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Modify `app/page.tsx` to render Hero**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: hero shows hashtags, a huge "Waktunya Ngopi" headline, paragraph + marigold "Mulai Pesan" CTA, the rounded hero photo with an overlapping green badge, and a scrolling marquee on the forest strip below. No horizontal page scroll.

- [ ] **Step 5: Commit**

```bash
git add components/Marquee.tsx components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add hero section with marquee and badge"
```

---

### Task 6: Tabbed Menu

**Files:**
- Create: `components/sections/Menu.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `menuCategories`, `formatPrice` from `@/lib/content`; `useState` from `react`; `AnimatePresence`, `motion` from `framer-motion`; `next/image`.
- Produces: `Menu` (default export, no props), section `id="menu"`. Rendered after `Hero`.

- [ ] **Step 1: Write `components/sections/Menu.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { menuCategories, formatPrice } from "@/lib/content";

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].id);
  const category =
    menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <section id="menu" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-extrabold text-[var(--color-forest)] sm:text-5xl">
          Jelajahi Menu
        </h2>
        <span className="font-display text-2xl font-bold text-[var(--color-forest)]/40">
          /2025
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {menuCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            aria-selected={c.id === active}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              c.id === active
                ? "bg-[var(--color-forest)] text-[var(--color-cream)]"
                : "bg-[var(--color-paper)] text-[var(--color-forest)] hover:bg-[var(--color-moss)]/40"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {category.items.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-2xl bg-[var(--color-paper)] shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-[var(--color-forest)]">
                    {item.name}
                  </h3>
                  <span className="text-sm font-bold text-[var(--color-forest)]">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-ink)]/70">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx` to render Menu after Hero**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: menu shows "Jelajahi Menu" + "/2025", five tab pills; clicking a tab animates and swaps the 3-card grid; prices render as `Rp20.000` etc.; photos load.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Menu.tsx app/page.tsx
git commit -m "feat: add tabbed menu section"
```

---

### Task 7: Featured / ratings

**Files:**
- Create: `components/sections/Featured.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `featured` from `@/lib/content`; `motion` from `framer-motion`; `next/image`.
- Produces: `Featured` (default export, no props), section `id="unggulan"`. Rendered after `Menu`.

- [ ] **Step 1: Write `components/sections/Featured.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featured } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} dari 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden
          className={
            n <= Math.round(rating)
              ? "text-[var(--color-marigold)]"
              : "text-[var(--color-moss)]"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Featured() {
  return (
    <section id="unggulan" className="bg-[var(--color-cream)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold text-[var(--color-forest)] sm:text-5xl">
          Menu Unggulan
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {featured.map((product, i) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-4 font-semibold text-[var(--color-forest)]">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-ink)]/70">
                {product.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-sm font-medium text-[var(--color-forest)]">
                  {product.rating.toFixed(1)}/5 · {product.reviews.toLocaleString("id-ID")} ulasan
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx` to render Featured after Menu**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: three featured cards with square photos, star rows (filled marigold to the rating), and text like "4.9/5 · 2.540 ulasan".

- [ ] **Step 4: Commit**

```bash
git add components/sections/Featured.tsx app/page.tsx
git commit -m "feat: add featured products with ratings"
```

---

### Task 8: Kopi Terbaik split panel

**Files:**
- Create: `components/sections/BestCoffee.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `bestCoffee` from `@/lib/content`; `motion` from `framer-motion`; `next/image`.
- Produces: `BestCoffee` (default export, no props). Rendered after `Featured`.

- [ ] **Step 1: Write `components/sections/BestCoffee.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { bestCoffee } from "@/lib/content";

export default function BestCoffee() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--color-marigold)] p-10 md:p-14"
        >
          <p className="font-display text-lg font-bold uppercase tracking-wide text-[var(--color-forest)]/70">
            {bestCoffee.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-4xl font-extrabold uppercase leading-[0.95] text-[var(--color-forest)] sm:text-5xl">
            {bestCoffee.heading}
          </h2>
          <p className="mt-6 max-w-sm text-[var(--color-forest)]/80">
            {bestCoffee.body}
          </p>
          <a
            href={bestCoffee.ctaHref}
            className="mt-8 inline-block rounded-full bg-[var(--color-forest)] px-7 py-3 font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-forest-deep)]"
          >
            {bestCoffee.ctaLabel}
          </a>
        </motion.div>
        <div className="relative min-h-[300px]">
          <Image
            src={bestCoffee.photo.src}
            alt={bestCoffee.photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx` to render BestCoffee after Featured**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
        <BestCoffee />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: a rounded split card — marigold panel ("Gunakan / KOPI TERBAIK" + body + green "Selengkapnya" button) beside the kitchen photo; stacks to one column on mobile.

- [ ] **Step 4: Commit**

```bash
git add components/sections/BestCoffee.tsx app/page.tsx
git commit -m "feat: add best coffee split panel"
```

---

### Task 9: Shops gallery

**Files:**
- Create: `components/sections/Shops.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `shops` from `@/lib/content`; `motion` from `framer-motion`; `next/image`.
- Produces: `Shops` (default export, no props), section `id="kunjungi"`. Rendered after `BestCoffee`.

- [ ] **Step 1: Write `components/sections/Shops.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { shops } from "@/lib/content";

export default function Shops() {
  return (
    <section id="kunjungi" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold text-[var(--color-forest)] sm:text-5xl">
          Kunjungi Kami
        </h2>
        <div className="mt-10 flex gap-5 overflow-x-auto pb-4">
          {shops.map((shop, i) => (
            <motion.figure
              key={shop.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="w-64 shrink-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src={shop.photo.src}
                  alt={shop.photo.alt}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-semibold text-[var(--color-forest)]">
                  {shop.name}
                </p>
                <p className="text-sm text-[var(--color-ink)]/70">
                  {shop.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx` to render Shops after BestCoffee**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";
import Shops from "@/components/sections/Shops";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
        <BestCoffee />
        <Shops />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: "Kunjungi Kami" heading + a horizontally scrollable row of four tall shop cards with name + caption. The row scrolls within itself; the page body does not scroll horizontally.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Shops.tsx app/page.tsx
git commit -m "feat: add shops gallery section"
```

---

### Task 10: FAQ accordion

**Files:**
- Create: `components/sections/Faq.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `faqs` from `@/lib/content`; `useState` from `react`; `AnimatePresence`, `motion` from `framer-motion`.
- Produces: `Faq` (default export, no props), section `id="faq"`. Rendered after `Shops`.

- [ ] **Step 1: Write `components/sections/Faq.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-extrabold text-[var(--color-forest)] sm:text-5xl">
          Pertanyaan Umum
        </h2>
        <div className="mt-10 border-y border-[var(--color-forest)]/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className="border-b border-[var(--color-forest)]/10 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-[var(--color-forest)]">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden
                    className={`text-2xl leading-none text-[var(--color-marigold)] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[var(--color-ink)]/75">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx` to render Faq after Shops**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";
import Shops from "@/components/sections/Shops";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
        <BestCoffee />
        <Shops />
        <Faq />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: "Pertanyaan Umum" + accordion; first item open by default; clicking a question toggles it (animated), the `+` rotates to `×`, and only one item is open at a time.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Faq.tsx app/page.tsx
git commit -m "feat: add FAQ accordion section"
```

---

### Task 11: Footer

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `brand`, `contact` from `@/lib/content`; `next/image`.
- Produces: `Footer` (default export, no props), element `id="kontak"` (target of the Header "Kontak" button). Rendered after `</main>`.

- [ ] **Step 1: Write `components/Footer.tsx`**

```tsx
import Image from "next/image";
import { brand, contact } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontak"
      className="bg-[var(--color-forest-deep)] px-6 py-14 text-[var(--color-cream)]"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <Image
            src={brand.logoSrc}
            alt={`Logo ${brand.name}`}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
          />
          <p className="mt-4 max-w-xs text-sm text-[var(--color-cream)]/70">
            {brand.name} — {brand.tagline}
          </p>
        </div>
        <div className="text-sm">
          <h3 className="font-display text-lg font-bold text-[var(--color-marigold)]">
            Kunjungi
          </h3>
          <p className="mt-3 text-[var(--color-cream)]/80">{contact.address}</p>
          <p className="mt-1 text-[var(--color-cream)]/80">{contact.hours}</p>
        </div>
        <div className="text-sm">
          <h3 className="font-display text-lg font-bold text-[var(--color-marigold)]">
            Terhubung
          </h3>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-full bg-[var(--color-marigold)] px-6 py-2.5 font-semibold text-[var(--color-forest)] transition hover:brightness-105"
          >
            {contact.whatsappLabel}
          </a>
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-[var(--color-cream)]/80 hover:text-[var(--color-marigold)]">
              Instagram
            </a>
            <a href="#" className="text-[var(--color-cream)]/80 hover:text-[var(--color-marigold)]">
              TikTok
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-[var(--color-cream)]/15 pt-6 text-xs text-[var(--color-cream)]/60">
        &copy; {year} {brand.name}. Seluruh hak cipta dilindungi.
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx` to render Footer**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import Featured from "@/components/sections/Featured";
import BestCoffee from "@/components/sections/BestCoffee";
import Shops from "@/components/sections/Shops";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Featured />
        <BestCoffee />
        <Shops />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build and browser**

Run: `pnpm build`, then `pnpm dev`.
Expected: forest-deep footer with logo, address/hours, marigold WhatsApp button (opens `wa.me` in a new tab), social links, and copyright with the current year. The Header "Kontak" button scrolls here.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add footer with contact and socials"
```

---

### Task 12: Final verification pass

**Files:** none (verification only).

**Interfaces:** exercises the fully assembled page from Tasks 1-11.

- [ ] **Step 1: Full gate — types, lint, build**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build`
Expected: all three pass with no errors.

- [ ] **Step 2: Browser check at desktop (1280px)**

Run `pnpm dev`, open `http://localhost:3000`, and confirm:
- Sticky header with logo + nav (Menu, Unggulan, Kunjungi, FAQ) + "Kontak" pill.
- Hero: hashtags, "Waktunya Ngopi", paragraph + "Mulai Pesan", hero photo + badge, scrolling marquee.
- Menu: five tabs switch the 3-card grid with animation; IDR prices formatted.
- Featured: three cards with star ratings + "N ulasan".
- Best Coffee: marigold split panel + kitchen photo.
- Shops: horizontal gallery of four cards.
- FAQ: accordion opens/closes, one at a time.
- Footer: logo, address, WhatsApp (opens new tab), current year.
- All stock photos load (no broken images); no console errors except a possible `/favicon.ico` 404.

- [ ] **Step 3: Anchor navigation**

Click "Mulai Pesan" and each nav link; confirm smooth-scroll to `#menu`, `#unggulan`, `#kunjungi`, `#faq`, and that "Kontak" scrolls to the footer.

- [ ] **Step 4: Mobile check (375px)**

Resize to ~375px and confirm hero, menu grid, featured, split panel all reflow to a single column; the marquee and shops gallery scroll within their own containers; there is no horizontal page scroll (`document.documentElement.scrollWidth === clientWidth`).

- [ ] **Step 5: Final production build**

Run: `pnpm build`
Expected: succeeds, route `/` prerendered, no warnings about the page.

No commit for this task — verification only over already-committed code from Tasks 1-11.
