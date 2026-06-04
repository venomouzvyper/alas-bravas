"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIAS, type ItemMenu, type Categoria } from "@/lib/menu-data";
import type { PromoDia } from "@/app/menu/page";

const WA_PEDIDO =
  "https://wa.me/50432462305?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%97";

const BANNER: Record<NonNullable<PromoDia>, { titulo: string; sub: string }> = {
  "mie-jue": {
    titulo: "🔥 HOY: 14 ALITAS POR L.300 · 7 ALITAS POR L.180",
    sub: "Promos activas hoy — solo miércoles y jueves",
  },
  viernes: {
    titulo: "🎉 VIERNES: 2 PLATOS POR L.300",
    sub: "Solo hoy · Aprovecha antes de que se acabe",
  },
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface Props {
  items: ItemMenu[];
  promoDia: PromoDia;
}

export function MenuPageClient({ items, promoDia }: Props) {
  const defaultCat: Categoria | "todos" = promoDia ? "promos" : "alitas";
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | "todos">(defaultCat);

  const itemsFiltrados =
    categoriaActiva === "todos"
      ? items
      : items.filter((i) => i.categoria === categoriaActiva);

  const banner = promoDia ? BANNER[promoDia] : null;

  return (
    <section className="bg-brand-dark pb-20">

      {/* Banner contextual — solo en días de promo */}
      {banner && (
        <div className="bg-brand-primary py-3 px-4 text-center">
          <p className="text-brand-cream font-bold text-sm uppercase tracking-wider leading-tight">
            {banner.titulo}
          </p>
          <p className="text-brand-cream/70 text-xs mt-1">{banner.sub}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">

        {/* Tabs de categoría — sticky */}
        <div className="sticky top-16 z-30 bg-brand-dark/95 backdrop-blur-sm -mx-4 px-4 py-3 border-b border-brand-gray-800 mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 max-w-6xl mx-auto">
            {CATEGORIAS.map((cat) => {
              const active = categoriaActiva === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id)}
                  className={[
                    "flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    active
                      ? "bg-brand-primary text-brand-cream"
                      : "bg-brand-gray-800 text-brand-cream/60 hover:text-brand-cream hover:bg-brand-gray-700",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de platos */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {itemsFiltrados.map((item) => {
              const esPromo = item.categoria === "promos";
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  // Promos: ancho completo en móvil para darles jerarquía
                  className={[
                    "rounded-sm overflow-hidden border border-white/5 hover:border-brand-primary/40 transition-colors",
                    esPromo ? "col-span-2 sm:col-span-1" : "",
                  ].join(" ")}
                >
                  {/* Imagen / gradiente */}
                  <div className={`relative overflow-hidden ${esPromo ? "h-36 sm:h-44" : "h-28 sm:h-40"}`}>
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.nombre}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="h-full flex items-center justify-center text-4xl sm:text-5xl"
                        style={{
                          background: `linear-gradient(135deg, ${item.gradientFrom ?? "#2A1400"} 0%, ${item.gradientTo ?? "#C1121F"} 100%)`,
                        }}
                      >
                        {item.emoji}
                      </div>
                    )}

                    {/* Badges — esquina superior izquierda */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {item.destacado && (
                        <span className="bg-brand-accent text-brand-dark text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm leading-tight">
                          ⭐ Top
                        </span>
                      )}
                      {item.dia && (
                        <span className="bg-brand-primary text-brand-cream text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm leading-tight">
                          {item.dia}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className={`bg-brand-gray-900 ${esPromo ? "p-4" : "p-3"}`}>
                    <h3 className={`font-display text-brand-cream tracking-wide leading-tight mb-1 ${esPromo ? "text-xl" : "text-sm sm:text-xl"}`}>
                      {item.nombre.toUpperCase()}
                    </h3>
                    <p className={`text-brand-cream/55 leading-relaxed mb-2 line-clamp-2 ${esPromo ? "text-sm" : "text-[11px] sm:text-sm"}`}>
                      {item.descripcion}
                    </p>
                    {item.acompanamientos && esPromo && (
                      <p className="text-brand-cream/35 text-xs mb-3 leading-relaxed line-clamp-1">
                        Incluye: {item.acompanamientos.join(" · ")}
                      </p>
                    )}
                    <p className={`font-display text-brand-accent tracking-wider ${esPromo ? "text-3xl" : "text-2xl sm:text-3xl"}`}>
                      L. {item.precio}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA WhatsApp — cierra el loop */}
        <div className="mt-12 mb-2">
          <a
            href={WA_PEDIDO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-full font-bold text-base tracking-widest uppercase text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon />
            Hacer pedido por WhatsApp
          </a>
          <p className="text-center text-brand-cream/30 text-xs mt-3">
            📍 La Cabaña, San Lorenzo · 🕐 1 PM – 11 PM · 🛵 Delivery por Mandaditos
          </p>
        </div>

        {/* Info del restaurante */}
        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-gray-800 pt-10">
          {[
            { icon: "📍", titulo: "Ubicación", detalle: "La Cabaña, San Lorenzo" },
            { icon: "🕐", titulo: "Horario", detalle: "1 PM — 11 PM" },
            { icon: "🛵", titulo: "Delivery", detalle: "Mandaditos" },
          ].map(({ icon, titulo, detalle }) => (
            <div key={titulo} className="text-center">
              <span className="text-2xl block mb-1">{icon}</span>
              <p className="font-display text-sm text-brand-accent tracking-widest uppercase">
                {titulo}
              </p>
              <p className="text-brand-cream/60 text-xs mt-0.5">{detalle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
