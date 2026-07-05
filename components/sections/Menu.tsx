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
