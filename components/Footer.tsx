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
