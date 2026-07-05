"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featured } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" className="flex gap-0.5" aria-label={`${rating} dari 5`}>
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
