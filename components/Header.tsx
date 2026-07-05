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
