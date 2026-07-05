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
