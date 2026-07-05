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
