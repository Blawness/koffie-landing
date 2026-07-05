"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Marquee({ items }: { items: string[] }) {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className="overflow-x-auto py-4">
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 text-sm font-medium uppercase tracking-widest text-[var(--color-cream)]/85"
          >
            {item}
            <span aria-hidden className="text-[var(--color-marigold)]">
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
