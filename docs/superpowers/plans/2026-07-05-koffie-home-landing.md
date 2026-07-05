# Koffie Home Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, static Next.js landing site for "Koffie Home" (a coffee shop brand) with Hero, Menu, Tentang, and Kontak sections, warm-earthy styling, and Framer Motion entry animations.

**Architecture:** A single Next.js App Router page (`app/page.tsx`) composes independent section components (`components/sections/*.tsx`) plus a shared `Header` and `Footer`. All copy/menu/contact data is centralized in one typed data module (`lib/content.ts`) so content edits never touch component code. No database, no CMS, no API routes.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12, pnpm, Node 24.

## Global Constraints

- Content language: Indonesian only, no language toggle (per spec).
- No CMS, no database, no server actions, no API routes (per spec).
- No externally-sourced images; use local CSS-based placeholder blocks (gradients/solid color divs), not `next/image` with binary assets (per spec — "no images sourced externally at build time").
- All copy, menu items, prices, and contact info live in `lib/content.ts` as typed constants (per spec's Data Model section) — never hardcode copy directly inside a section component.
- No automated test suite for v1; verification is `pnpm build` / `pnpm lint` / `tsc --noEmit` plus a manual browser check in `pnpm dev` (per spec's Testing section).
- Package versions pinned to match versions already validated in the sibling `vorca-studio-website` project: `next@^16.2.7`, `react@^19.2.7`, `react-dom@^19.2.7`, `typescript@^5.8.3`, `tailwindcss@^4.1.11`, `@tailwindcss/postcss@^4.1.11`, `framer-motion@^12.23.0`.
- Path alias `@/*` → repo root (matches sibling project convention).

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

**Interfaces:**
- Produces: a running Next.js dev server at `http://localhost:3000` rendering a placeholder page; `@/*` path alias resolving to repo root; Tailwind v4 utility classes available in any `.tsx` file via `app/globals.css`'s `@import "tailwindcss"`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "koffie-landing",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=24"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^12.23.0",
    "next": "^16.2.7",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.11",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.5.10",
    "tailwindcss": "^4.1.11",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Write `postcss.config.mjs`**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 5: Write `.gitignore`**

```
node_modules
.next
out
.env
.env.local
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 6: Write `app/globals.css`**

```css
@import "tailwindcss";

:root {
  --color-coffee-dark: #3b2419;
  --color-coffee-brown: #6f4e37;
  --color-cream: #f5efe6;
  --color-accent: #c1611a;
}

body {
  background-color: var(--color-cream);
  color: var(--color-coffee-dark);
}
```

- [ ] **Step 7: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koffie Home",
  description: "Kopi pilihan, diseduh dengan cinta.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Write placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Koffie Home</h1>
    </main>
  );
}
```

- [ ] **Step 9: Install dependencies**

Run: `cd ~/projects/koffie-landing && pnpm install`
Expected: installs without error, creates `pnpm-lock.yaml` and `node_modules/`.

- [ ] **Step 10: Verify build**

Run: `pnpm build`
Expected: build succeeds, prints a route table including `/`.

- [ ] **Step 11: Commit**

```bash
git add package.json tsconfig.json next.config.mjs postcss.config.mjs .gitignore app pnpm-lock.yaml
git commit -m "chore: scaffold Next.js + Tailwind v4 project"
```

---

### Task 2: Content data model

**Files:**
- Create: `lib/content.ts`

**Interfaces:**
- Consumes: nothing (pure data module).
- Produces (used by Tasks 3-7):
  - `brand: { name: string; tagline: string }`
  - `navLinks: { label: string; href: string }[]`
  - `hero: { heading: string; subheading: string; ctaLabel: string; ctaHref: string }`
  - `menuCategories: { name: string; items: { name: string; description: string; price: number }[] }[]`
  - `aboutValues: { title: string; description: string }[]`
  - `aboutStory: { heading: string; paragraphs: string[] }`
  - `contact: { address: string; hours: string; whatsapp: string; whatsappLabel: string }`
  - `formatPrice(price: number): string`

- [ ] **Step 1: Write `lib/content.ts`**

```ts
export const brand = {
  name: "Koffie Home",
  tagline: "Kopi pilihan, diseduh dengan cinta.",
};

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export const hero = {
  heading: "Secangkir Kehangatan di Setiap Kunjungan",
  subheading:
    "Koffie Home menyajikan kopi specialty dari biji pilihan Nusantara, diseduh segar setiap hari.",
  ctaLabel: "Lihat Menu",
  ctaHref: "#menu",
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    name: "Kopi",
    items: [
      {
        name: "Espresso",
        description: "Espresso murni dari biji arabika pilihan.",
        price: 20000,
      },
      {
        name: "Kopi Susu Gula Aren",
        description: "Perpaduan espresso, susu segar, dan gula aren.",
        price: 25000,
      },
      {
        name: "Cappuccino",
        description: "Espresso dengan foam susu lembut bertekstur.",
        price: 28000,
      },
    ],
  },
  {
    name: "Non-Kopi",
    items: [
      {
        name: "Matcha Latte",
        description: "Matcha premium dengan susu segar.",
        price: 27000,
      },
      {
        name: "Cokelat Panas",
        description: "Cokelat Belgia kental yang menghangatkan.",
        price: 24000,
      },
    ],
  },
  {
    name: "Pastry",
    items: [
      {
        name: "Croissant Butter",
        description: "Croissant renyah dengan lapisan mentega premium.",
        price: 18000,
      },
      {
        name: "Banana Bread",
        description: "Roti pisang lembut dengan taburan kenari.",
        price: 20000,
      },
    ],
  },
];

export const aboutValues = [
  {
    title: "Biji Pilihan",
    description:
      "Kami memilih biji kopi terbaik dari petani lokal Nusantara.",
  },
  {
    title: "Diseduh Segar",
    description: "Setiap cangkir diseduh saat dipesan, bukan disimpan lama.",
  },
  {
    title: "Suasana Hangat",
    description: "Tempat nyaman untuk bekerja, bersantai, atau berkumpul.",
  },
];

export const aboutStory = {
  heading: "Tentang Koffie Home",
  paragraphs: [
    "Koffie Home lahir dari kecintaan pada kopi Nusantara dan keinginan untuk menghadirkan ruang yang hangat bagi siapa saja.",
    "Sejak awal, kami berkomitmen menyajikan kopi berkualitas dengan harga yang bersahabat, ditemani suasana yang membuat betah.",
  ],
};

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
git commit -m "feat: add centralized content data model"
```

---

### Task 3: Header component

**Files:**
- Create: `components/Header.tsx`

**Interfaces:**
- Consumes: `brand`, `navLinks` from `@/lib/content`.
- Produces: `Header` (default export, no props) — rendered by Task 9's `app/page.tsx`.

- [ ] **Step 1: Write `components/Header.tsx`**

```tsx
import Link from "next/link";
import { brand, navLinks } from "@/lib/content";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-coffee-brown)]/20 bg-[var(--color-cream)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="font-serif text-xl font-bold text-[var(--color-coffee-dark)]"
        >
          {brand.name}
        </Link>
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-coffee-brown)] transition hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add sticky header with anchor nav"
```

---

### Task 4: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `hero` from `@/lib/content`; `motion` from `framer-motion`.
- Produces: `Hero` (default export, no props) — rendered by Task 9's `app/page.tsx`.

- [ ] **Step 1: Write `components/sections/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-coffee-dark)] text-[var(--color-cream)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            {hero.heading}
          </h1>
          <p className="mt-6 text-lg text-[var(--color-cream)]/80">
            {hero.subheading}
          </p>
          <a
            href={hero.ctaHref}
            className="mt-8 inline-block rounded-full bg-[var(--color-accent)] px-8 py-3 font-semibold text-white transition hover:brightness-110"
          >
            {hero.ctaLabel}
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="aspect-square w-full rounded-3xl bg-gradient-to-br from-[var(--color-coffee-brown)] to-[var(--color-accent)]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add hero section with entry animation"
```

---

### Task 5: Menu section

**Files:**
- Create: `components/sections/Menu.tsx`

**Interfaces:**
- Consumes: `menuCategories`, `formatPrice` from `@/lib/content`; `motion` from `framer-motion`.
- Produces: `Menu` (default export, no props) — rendered by Task 9's `app/page.tsx`. Section has `id="menu"` (target of `hero.ctaHref` and nav link from Task 3).

- [ ] **Step 1: Write `components/sections/Menu.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { menuCategories, formatPrice } from "@/lib/content";

export default function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center font-serif text-3xl font-bold text-[var(--color-coffee-dark)]">
        Menu Kami
      </h2>
      <div className="mt-12 space-y-14">
        {menuCategories.map((category) => (
          <div key={category.name}>
            <h3 className="mb-6 font-serif text-xl font-semibold text-[var(--color-accent)]">
              {category.name}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl border border-[var(--color-coffee-brown)]/15 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-semibold text-[var(--color-coffee-dark)]">
                      {item.name}
                    </h4>
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-coffee-brown)]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Menu.tsx
git commit -m "feat: add menu section grouped by category"
```

---

### Task 6: About section

**Files:**
- Create: `components/sections/About.tsx`

**Interfaces:**
- Consumes: `aboutStory`, `aboutValues` from `@/lib/content`; `motion` from `framer-motion`.
- Produces: `About` (default export, no props) — rendered by Task 9's `app/page.tsx`. Section has `id="tentang"` (target of nav link from Task 3).

- [ ] **Step 1: Write `components/sections/About.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { aboutStory, aboutValues } from "@/lib/content";

export default function About() {
  return (
    <section
      id="tentang"
      className="bg-[var(--color-coffee-brown)]/5 px-6 py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="aspect-video w-full rounded-3xl bg-gradient-to-tr from-[var(--color-coffee-dark)] to-[var(--color-coffee-brown)]"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold text-[var(--color-coffee-dark)]">
            {aboutStory.heading}
          </h2>
          {aboutStory.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-[var(--color-coffee-brown)]"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutValues.map((value) => (
              <div key={value.title}>
                <h3 className="font-semibold text-[var(--color-accent)]">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-coffee-brown)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add about section with brand values"
```

---

### Task 7: Contact section and Footer

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `components/Footer.tsx`

**Interfaces:**
- Consumes: `contact`, `brand` from `@/lib/content`; `motion` from `framer-motion`.
- Produces: `Contact` (default export, no props, section `id="kontak"`) and `Footer` (default export, no props) — both rendered by Task 9's `app/page.tsx`.

- [ ] **Step 1: Write `components/sections/Contact.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="kontak" className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[var(--color-coffee-dark)] px-8 py-12 text-center text-[var(--color-cream)]"
      >
        <h2 className="font-serif text-3xl font-bold">Kunjungi Kami</h2>
        <p className="mt-4 text-[var(--color-cream)]/80">{contact.address}</p>
        <p className="mt-1 text-[var(--color-cream)]/80">{contact.hours}</p>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-[var(--color-accent)] px-8 py-3 font-semibold text-white transition hover:brightness-110"
        >
          {contact.whatsappLabel}
        </a>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/Footer.tsx`**

```tsx
import { brand } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-coffee-brown)]/15 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[var(--color-coffee-brown)] sm:flex-row">
        <p>
          &copy; {year} {brand.name}. Seluruh hak cipta dilindungi.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[var(--color-accent)]">
            Instagram
          </a>
          <a href="#" className="hover:text-[var(--color-accent)]">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify types**

Run: `pnpm exec tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx components/Footer.tsx
git commit -m "feat: add contact section and footer"
```

---

### Task 8: Assemble the page

**Files:**
- Modify: `app/page.tsx` (replace placeholder from Task 1)
- Modify: `app/globals.css` (add smooth scroll behavior)

**Interfaces:**
- Consumes: `Header` (Task 3), `Hero` (Task 4), `Menu` (Task 5), `About` (Task 6), `Contact` (Task 7), `Footer` (Task 7).
- Produces: the final rendered `/` route.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Menu from "@/components/sections/Menu";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add smooth scroll to `app/globals.css`**

Add this rule right after the `@import "tailwindcss";` line:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: build succeeds, route `/` listed in output, no type errors.

- [ ] **Step 4: Verify lint**

Run: `pnpm lint`
Expected: no errors (Next's default ESLint config; warnings about lint config prompts should be accepted with defaults if this is the first run).

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: assemble landing page from sections"
```

---

### Task 9: Manual verification pass

**Files:** none (verification only).

**Interfaces:** none — this task exercises the fully assembled app from Task 8.

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`
Expected: server starts at `http://localhost:3000` with no console errors.

- [ ] **Step 2: Manually check in browser**

Open `http://localhost:3000` and confirm:
- Header stays sticky on scroll and shows "Koffie Home" plus 3 nav links.
- Clicking "Lihat Menu" (hero CTA) and each nav link smooth-scrolls to the matching section (`#menu`, `#tentang`, `#kontak`).
- Menu section shows 3 categories (Kopi, Non-Kopi, Pastry) with correctly formatted IDR prices (e.g. "Rp20.000").
- About section shows the brand story paragraphs and 3 value cards.
- Contact section shows the dummy address, hours, and a working WhatsApp link (opens `wa.me` in a new tab).
- Footer shows the current year and brand name.
- Resize the browser to a mobile width (~375px) and confirm the hero, menu grid, and about section reflow to a single column without horizontal scrolling.

- [ ] **Step 3: Stop the dev server**

Press `Ctrl+C` in the terminal running `pnpm dev`.

- [ ] **Step 4: Final production build check**

Run: `pnpm build`
Expected: build succeeds with no errors or warnings about the new page.

No commit for this task — it's verification-only over already-committed code from Tasks 1-8.
