"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { shops } from "@/lib/content";

export default function Shops() {
  return (
    <section id="kunjungi" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold text-[var(--color-forest)] sm:text-5xl">
          Kunjungi Kami
        </h2>
        <div className="mt-10 flex gap-5 overflow-x-auto pb-4">
          {shops.map((shop, i) => (
            <motion.figure
              key={shop.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="w-64 shrink-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src={shop.photo.src}
                  alt={shop.photo.alt}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-semibold text-[var(--color-forest)]">
                  {shop.name}
                </p>
                <p className="text-sm text-[var(--color-ink)]/70">
                  {shop.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
