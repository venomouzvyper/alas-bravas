"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CARDS = [
  {
    id: "menu",
    icon: "🍗",
    title: "El Menú",
    desc: "Alitas, carnes y promos",
    href: "/menu",
    external: false,
  },
  {
    id: "reservar",
    icon: "🗓️",
    title: "Reservar",
    desc: "Asegura tu mesa",
    href: "/reservaciones",
    external: false,
  },
  {
    id: "llegar",
    icon: "📍",
    title: "Cómo Llegar",
    desc: "Playa La Cabaña, San Lorenzo",
    href: "https://maps.app.goo.gl/6mF7ZbRwVntGKyQA6",
    external: true,
  },
  {
    id: "galeria",
    icon: "📸",
    title: "La Galería",
    desc: "El local y el ambiente",
    href: "/galeria",
    external: false,
  },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CARD_CLASSES =
  "group flex flex-col justify-between min-h-[160px] sm:min-h-[180px] p-5 sm:p-6 rounded-2xl border border-white/8 bg-brand-gray-900 hover:border-brand-primary/50 hover:bg-brand-gray-800 transition-all duration-200";

export function PivotSection() {
  return (
    <section className="px-4 py-16 bg-brand-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {CARDS.map((c) => {
            const content = (
              <>
                <div>
                  <span className="text-4xl block mb-3">{c.icon}</span>
                  <h3 className="font-display text-2xl sm:text-3xl text-brand-cream leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-brand-cream/50 text-xs mt-1.5 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <span className="text-brand-accent text-lg mt-4 self-start group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </>
            );

            return (
              <motion.div
                key={c.id}
                variants={item}
                whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
              >
                {c.external ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CARD_CLASSES}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={c.href} className={CARD_CLASSES}>
                    {content}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
