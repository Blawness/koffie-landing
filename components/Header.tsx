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
