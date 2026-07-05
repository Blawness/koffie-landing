"use client";

import { motion } from "framer-motion";
import { aboutStory, aboutValues } from "@/lib/content";

export default function About() {
  return (
    <section
      id="tentang"
      className="bg-[var(--color-coffee-brown)]/5 px-6 py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="aspect-video w-full rounded-3xl bg-gradient-to-tr from-[var(--color-coffee-dark)] to-[var(--color-coffee-brown)]"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl font-bold text-[var(--color-coffee-dark)]">
            {aboutStory.heading}
          </h2>
          {aboutStory.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-[var(--color-coffee-brown)]"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutValues.map((value) => (
              <div key={value.title}>
                <h3 className="font-semibold text-[var(--color-accent)]">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-coffee-brown)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
