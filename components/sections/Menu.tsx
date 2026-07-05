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
            aria-pressed={c.id === active}
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
