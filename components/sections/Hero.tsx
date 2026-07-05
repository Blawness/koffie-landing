"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero, marqueeItems } from "@/lib/content";
import Marquee from "@/components/Marquee";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[var(--color-cream)]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-12 md:py-20">
        {/* Kolom kiri: teks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {hero.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-medium text-[var(--color-forest)]/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-5 text-6xl font-extrabold leading-[0.92] tracking-tight text-[var(--color-forest)] sm:text-7xl">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-md text-lg text-[var(--color-ink)]/80">
            {hero.paragraph}
          </p>

          <a
            href={hero.ctaHref}
            className="mt-8 inline-block rounded-full bg-[var(--color-marigold)] px-8 py-3 font-semibold text-[var(--color-forest)] shadow-sm transition hover:brightness-105"
          >
            {hero.ctaLabel}
          </a>
        </motion.div>

        {/* Kolom kanan: foto + badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md md:mx-0"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-[var(--color-forest)]/10">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 flex h-28 w-28 rotate-[-8deg] items-center justify-center rounded-full bg-[var(--color-forest)] p-3 text-center shadow-lg ring-4 ring-[var(--color-cream)]">
            <span className="font-display text-[10px] font-bold uppercase leading-tight text-[var(--color-marigold)]">
              {hero.badgeText.join(" · ")}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="bg-[var(--color-forest)]">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
