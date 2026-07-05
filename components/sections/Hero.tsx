"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero, marqueeItems } from "@/lib/content";
import Marquee from "@/components/Marquee";

export default function Hero() {
  return (
    <section className="bg-[var(--color-cream)]">
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {hero.hashtags.map((tag) => (
            <span key={tag} className="text-sm font-medium text-[var(--color-forest)]/70">
              {tag}
            </span>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display mt-6 text-6xl font-extrabold leading-[0.95] tracking-tight text-[var(--color-forest)] sm:text-7xl md:text-8xl"
        >
          {hero.headline}
        </motion.h1>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="max-w-md text-[var(--color-ink)]/80">{hero.paragraph}</p>
            <a
              href={hero.ctaHref}
              className="mt-6 inline-block rounded-full bg-[var(--color-marigold)] px-8 py-3 font-semibold text-[var(--color-forest)] transition hover:brightness-105"
            >
              {hero.ctaLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -left-3 bottom-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-forest)] p-3 text-center">
              <span className="font-display text-[9px] font-bold uppercase leading-tight text-[var(--color-marigold)]">
                {hero.badgeText.join(" · ")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 bg-[var(--color-forest)]">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
