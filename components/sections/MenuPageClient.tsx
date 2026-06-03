"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIAS, type ItemMenu, type Categoria } from "@/lib/menu-data";
import { SpiceBadge } from "@/components/ui/Badge";

interface Props {
  items: ItemMenu[];
}

export function MenuPageClient({ items }: Props) {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | "todos">("todos");

  const itemsFiltrados =
    categoriaActiva === "todos"
      ? items
      : items.filter((item) => item.categoria === categoriaActiva);

  return (
    <section className="bg-brand-dark px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Tabs de categoría */}
        <div className="sticky top-16 z-30 bg-brand-dark/95 backdrop-blur-sm py-4 mb-10 -mx-4 px-4 border-b border-brand-gray-800">
          <div className="flex gap-2 overflow-x-auto scrollbar-none max-w-6xl mx-auto pb-1">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  categoriaActiva === cat.id
                    ? "bg-brand-primary text-brand-cream"
                    : "bg-brand-gray-800 text-brand-cream/60 hover:text-brand-cream hover:bg-brand-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de items */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {itemsFiltrados.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="rounded-sm overflow-hidden border border-white/5 hover:border-brand-primary/40 transition-colors"
              >
                {/* Imagen placeholder */}
                <div
                  className="h-40 flex items-center justify-center text-5xl relative"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                  }}
                >
                  <span>{item.emoji}</span>
                  {item.dia && (
                    <span className="absolute top-3 right-3 bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
                      {item.dia}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 bg-brand-gray-900">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-display text-xl text-brand-cream tracking-wide leading-tight">
                      {item.nombre.toUpperCase()}
                    </h3>
                    {item.spice && <SpiceBadge level={item.spice} />}
                  </div>
                  <p className="text-brand-cream/55 text-sm leading-relaxed mb-3">
                    {item.descripcion}
                  </p>
                  {item.acompanamientos && (
                    <p className="text-brand-cream/35 text-xs mb-3 leading-relaxed">
                      Incluye: {item.acompanamientos.join(" · ")}
                    </p>
                  )}
                  <p className="font-display text-3xl text-brand-accent tracking-wider">
                    L. {item.precio}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Info del restaurante */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-brand-gray-800 pt-12">
          {[
            { icon: "📍", titulo: "Ubicación", detalle: "La Cabaña, San Lorenzo" },
            { icon: "🕐", titulo: "Horario", detalle: "1:00 PM — 11:00 PM" },
            { icon: "🛵", titulo: "Delivery", detalle: "Pide por Mandaditos" },
          ].map(({ icon, titulo, detalle }) => (
            <div key={titulo} className="text-center">
              <span className="text-3xl block mb-2">{icon}</span>
              <p className="font-display text-lg text-brand-accent tracking-widest uppercase">
                {titulo}
              </p>
              <p className="text-brand-cream/70 text-sm mt-1">{detalle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
