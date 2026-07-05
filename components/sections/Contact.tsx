"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="kontak" className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[var(--color-coffee-dark)] px-8 py-12 text-center text-[var(--color-cream)]"
      >
        <h2 className="font-serif text-3xl font-bold">Kunjungi Kami</h2>
        <p className="mt-4 text-[var(--color-cream)]/80">{contact.address}</p>
        <p className="mt-1 text-[var(--color-cream)]/80">{contact.hours}</p>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-[var(--color-accent)] px-8 py-3 font-semibold text-white transition hover:brightness-110"
        >
          {contact.whatsappLabel}
        </a>
      </motion.div>
    </section>
  );
}
