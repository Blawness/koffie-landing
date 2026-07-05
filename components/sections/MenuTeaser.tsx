import Image from "next/image";
import Link from "next/link";
import { menuCategories, formatPrice } from "@/lib/content";

const teaserItems = menuCategories[0].items.slice(0, 3);

export default function MenuTeaser() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-extrabold text-[var(--color-forest)] sm:text-5xl">
          Jelajahi Menu
        </h2>
        <span className="font-display text-2xl font-bold text-[var(--color-forest)]/60">
          /2025
        </span>
      </div>

      <p className="mt-4 max-w-xl text-[var(--color-ink)]/70">
        Cicipi menu andalan kami — dari signature series hingga hidangan dapur.
        Lihat daftar lengkapnya di halaman menu.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teaserItems.map((item) => (
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
      </div>

      <div className="mt-10">
        <Link
          href="/menu"
          className="inline-flex rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-semibold text-[var(--color-cream)] transition hover:bg-[var(--color-forest-deep)]"
        >
          Lihat Menu Lengkap
        </Link>
      </div>
    </section>
  );
}
