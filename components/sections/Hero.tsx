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
