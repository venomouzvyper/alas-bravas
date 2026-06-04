"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIAS, type ItemMenu, type Categoria } from "@/lib/menu-data";
import type { PromoDia } from "@/app/menu/page";
import { EmberParticles } from "@/components/ui/EmberParticles";

// ── Types ─────────────────────────────────────────────────────────────
type TipoOrden = "delivery" | "recoger";
type Sabor = "BB" | "Búfalo";
interface ItemOrden { cantidad: number; sabor?: Sabor; }

type BannerTipo = "hoy" | "prox";
interface BannerData {
  titulo: string; sub: string; tipo: BannerTipo;
  ofertas?: { label: string; precio: string }[];
}

const CAT_ICONS: Record<string, string> = {
  promos: '⚡', alitas: '🍗', carnes: '🥩',
  tajadas: '🍌', pupusas: '🫓', bebidas: '🥤', todos: '◈',
};

// ── Constantes ────────────────────────────────────────────────────────
const TIPOS = [
  { id: "delivery" as TipoOrden, emoji: "🛵", label: "Delivery",     sub: "Vía Mandaditos" },
  { id: "recoger"  as TipoOrden, emoji: "🚶", label: "Para recoger", sub: "Yo lo busco"    },
];

const ACOMP_EMOJI: Record<string, string> = {
  "Tajadas": "🍌", "Frijoles fritos": "🫘", "Encurtido": "🥒", "Aderezos": "🥣",
  "Carne molida": "🥩", "Ensalada": "🥗", "Salsa": "🌶️", "Papas": "🍟",
  "Kétchup": "🍅", "Aderezo de la casa": "🥣",
};

const CROSS_SELL: Record<string, string[]> = {
  alitas:  ["tajadas-preparadas", "refresco"],
  carnes:  ["tajadas-preparadas", "refresco"],
  tajadas: ["alitas-6", "refresco"],
  pupusas: ["refresco", "alitas-6"],
  bebidas: ["alitas-6", "carne-cerdo-chorizo"],
  promos:  ["tajadas-preparadas", "refresco"],
};

// ── Helpers ───────────────────────────────────────────────────────────
function getHondurasTime() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Tegucigalpa" }));
}
function estaAbierto(): boolean {
  const h = getHondurasTime().getHours();
  return h >= 13 && h < 23;
}
function isDisponible(item: ItemMenu): boolean {
  if (!item.dia) return true;
  const d = getHondurasTime().getDay();
  if (item.dia.includes("Mié") && (d === 3 || d === 4)) return true;
  if (item.dia === "Viernes" && d === 5) return true;
  return false;
}
function necesitaSabor(item: ItemMenu): boolean {
  return item.categoria === "alitas" || item.nombre.toLowerCase().includes("alitas");
}
function getCrossSell(item: ItemMenu, items: ItemMenu[]): ItemMenu[] {
  return (CROSS_SELL[item.categoria] ?? [])
    .filter(id => id !== item.id)
    .map(id => items.find(i => i.id === id))
    .filter((i): i is ItemMenu => !!i && isDisponible(i));
}
function getUpsell(orden: Record<string, ItemOrden>, items: ItemMenu[]): { item: ItemMenu; label: string } | null {
  const activos = items.filter(i => (orden[i.id]?.cantidad ?? 0) > 0);
  if (!activos.length) return null;
  const totalCant = activos.reduce((s, i) => s + (orden[i.id]?.cantidad ?? 0), 0);
  if (totalCant >= 5) return null;
  const cats = new Set(activos.map(i => i.categoria));
  const tieneBebida   = cats.has("bebidas");
  const tieneTajadas  = (orden["tajadas-preparadas"]?.cantidad ?? 0) > 0;
  const tieneProteina = cats.has("alitas") || cats.has("carnes") || activos.some(i => i.nombre.toLowerCase().includes("alitas"));
  if (tieneProteina && !tieneTajadas && !tieneBebida) {
    const tajadas = items.find(i => i.id === "tajadas-preparadas");
    if (tajadas) return { item: tajadas, label: "¿Algo para acompañar?" };
  }
  if (!tieneBebida) {
    const refresco = items.find(i => i.id === "refresco");
    if (refresco) return { item: refresco, label: "¿Querés un refresco?" };
  }
  return null;
}
function getBannerData(): BannerData | null {
  const d = getHondurasTime().getDay();
  if (d === 3 || d === 4) return {
    titulo: "🔥 HOY ES DÍA DE ALITAS",
    sub: "Solo miércoles y jueves · ¡Aprovechá!",
    tipo: "hoy",
    ofertas: [
      { label: "14 ALITAS BB O BÚFALO", precio: "L.300" },
      { label: "7 ALITAS BB O BÚFALO",  precio: "L.180" },
    ],
  };
  if (d === 5) return {
    titulo: "🎉 PROMO VIERNES",
    sub: "Solo hoy · Aprovechá antes de que se acabe",
    tipo: "hoy",
    ofertas: [{ label: "2 PLATOS A ELEGIR", precio: "L.300" }],
  };
  if (d === 2) return { titulo: "🔥 Mañana: 14 alitas por L.300 — ¿volvés?", sub: "Promo activa mié y jue · Trae a tus amigos", tipo: "prox" };
  return { titulo: "🔥 El miércoles: 14 alitas por L.300 — ¿lo anotás?", sub: "Promos todos los mié, jue y viernes", tipo: "prox" };
}
function buildWaMsg(p: {
  tipo: TipoOrden; nombre: string; telefono: string; direccion: string;
  referencia: string; notas: string;
  orden: Record<string, ItemOrden>; items: ItemMenu[]; total: number;
}): string {
  const enc: Record<TipoOrden, string> = {
    delivery: `Hola 👋 Mi nombre es ${p.nombre}. Quisiera ordenar con DELIVERY (vía Mandaditos):`,
    recoger:  `Hola 👋 Mi nombre es ${p.nombre}. Quisiera ordenar PARA RECOGER:`,
  };
  const lineas: string[] = [enc[p.tipo], ""];
  p.items.forEach(item => {
    const ord = p.orden[item.id];
    if (!ord?.cantidad) return;
    const sabor  = necesitaSabor(item) && ord.sabor ? ` ${ord.sabor}` : "";
    const pref   = ord.cantidad > 1 ? `${ord.cantidad}x ` : "";
    const precio = ord.cantidad > 1 ? `L.${item.precio} c/u` : `L.${item.precio}`;
    lineas.push(`• ${pref}${item.nombre}${sabor} (${precio})`);
  });
  lineas.push("", `Subtotal: L.${p.total} 🍗`);
  if (p.tipo === "delivery") {
    lineas.push("(+ costo de delivery de Mandaditos según tu distancia)");
    lineas.push("", `📍 Dirección: ${p.direccion}`);
    if (p.referencia.trim()) lineas.push(`   Referencia: ${p.referencia}`);
    lineas.push(`📞 Tel: ${p.telefono}`);
  }
  if (p.notas.trim()) lineas.push(`📝 Nota: ${p.notas.trim()}`);
  return `https://wa.me/50432462305?text=${encodeURIComponent(lineas.join("\n"))}`;
}

// ── Iconos ────────────────────────────────────────────────────────────
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Wizard helpers ────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

function FloatingInput({ id, label, type = "text", value, onChange, required = false }: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isUp = focused || value.length > 0;
  return (
    <div className="relative">
      <label htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 select-none ${
          isUp
            ? "top-2 text-[10px] font-bold uppercase tracking-wider text-brand-accent"
            : "top-1/2 -translate-y-1/2 text-sm text-brand-cream/40"
        }`}>
        {label}{required && " *"}
      </label>
      <input id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-xl px-4 pt-6 pb-3 text-brand-cream text-sm border transition-all duration-200 outline-none ${
          focused ? "border-brand-primary" : "border-brand-primary/25"
        }`}
        style={{
          background: "#1A0600",
          ...(focused ? { boxShadow: "0 0 0 3px rgba(193,18,31,0.22)" } : {})
        }}
      />
    </div>
  );
}

// ── MenuCard ──────────────────────────────────────────────────────────
function MenuCard({ item, cantidad, sabor, disponible, onTap, onCambiar, onSabor }: {
  item: ItemMenu; cantidad: number; sabor?: Sabor; disponible: boolean;
  onTap: () => void; onCambiar: (d: number) => void; onSabor: (s: Sabor) => void;
}) {
  const esPromo = item.categoria === "promos";
  const saborPendiente = necesitaSabor(item) && cantidad > 0 && !sabor;

  return (
    <article
      onClick={disponible ? onTap : undefined}
      role={disponible ? "button" : undefined}
      tabIndex={disponible ? 0 : undefined}
      onKeyDown={disponible ? e => { if (e.key === "Enter" || e.key === " ") onTap(); } : undefined}
      className={[
        // Altura fija para uniformidad — todos los cards idénticos
        "h-[290px] sm:h-[340px]",
        "rounded-xl overflow-hidden border transition-all duration-200 flex flex-col",
        disponible ? "cursor-pointer" : "opacity-40",
        cantidad > 0
          ? "border-brand-primary/50 shadow-lg shadow-brand-primary/10"
          : "border-white/5 hover:border-white/20",
      ].join(" ")}
    >
      {/* Imagen — altura fija */}
      <div className={`relative shrink-0 overflow-hidden ${esPromo ? "h-36 sm:h-40" : "h-28 sm:h-36"}`}>
        {item.image_url ? (
          <Image src={item.image_url} alt={item.nombre} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
        ) : (
          <div className="h-full flex items-center justify-center text-4xl sm:text-5xl"
            style={{ background: `linear-gradient(135deg, ${item.gradientFrom ?? "#2A1400"} 0%, ${item.gradientTo ?? "#C1121F"} 100%)` }}>
            {item.emoji}
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.destacado && disponible && <span className="bg-brand-accent text-brand-dark text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">⭐ Top</span>}
          {item.valorTag && disponible && <span className="bg-brand-secondary text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">{item.valorTag}</span>}
          {item.dia && <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm ${disponible ? "bg-brand-primary text-brand-cream" : "bg-brand-gray-800 text-brand-cream/40"}`}>{disponible ? item.dia : `Solo ${item.dia}`}</span>}
        </div>
        {/* Burbuja cantidad — dorada si falta salsa */}
        {cantidad > 0 && (
          <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${saborPendiente ? "bg-brand-accent" : "bg-brand-primary"}`}>
            <span className={`text-xs font-black leading-none ${saborPendiente ? "text-brand-dark" : "text-white"}`}>{cantidad}</span>
          </div>
        )}
      </div>

      {/* Contenido — overflow-hidden para no romper la altura fija */}
      <div className={`bg-brand-gray-900 flex flex-col flex-1 overflow-hidden justify-between ${esPromo ? "p-4" : "p-3"}`}>
        <div>
          <h3 className={`font-display text-brand-cream tracking-wide leading-tight mb-1 line-clamp-1 ${esPromo ? "text-xl" : "text-base sm:text-lg"}`}>
            {item.nombre.toUpperCase()}
          </h3>
          <p className={`text-brand-cream/50 leading-snug line-clamp-2 mb-1 ${esPromo ? "text-sm" : "text-xs sm:text-sm"}`}>
            {item.descripcion}
          </p>
          {!!item.acompanamientos?.length && (
            <p className={`text-brand-cream/30 leading-tight line-clamp-1 ${esPromo ? "text-xs" : "text-[11px] sm:text-xs"}`}>
              Con: {item.acompanamientos.join(" · ")}
            </p>
          )}
        </div>
        {/* Precio + stepper */}
        <div className="flex items-center justify-between gap-2">
          <p className={`font-display text-brand-accent tracking-wider leading-none ${esPromo ? "text-3xl" : "text-2xl"}`}>
            L.{item.precio}
          </p>
          {disponible && (
            <div onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 shrink-0">
              {cantidad > 0 ? (
                <>
                  <button onClick={() => onCambiar(-1)} aria-label="Reducir" className="w-7 h-7 rounded-full bg-brand-gray-800 hover:bg-brand-gray-700 text-brand-cream text-sm font-bold transition-all active:scale-90 cursor-pointer flex items-center justify-center">−</button>
                  <span className="w-5 text-center font-bold text-sm text-brand-cream tabular-nums">{cantidad}</span>
                  <button onClick={() => onCambiar(1)} aria-label="Aumentar" className="w-7 h-7 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream text-sm font-bold transition-all active:scale-90 cursor-pointer flex items-center justify-center">+</button>
                </>
              ) : (
                <button onClick={e => { e.stopPropagation(); onCambiar(1); }} aria-label={`Agregar ${item.nombre}`}
                  className="btn-breathe w-9 h-9 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream text-xl font-bold transition-colors active:scale-90 cursor-pointer flex items-center justify-center">+</button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── ItemDetailSheet ───────────────────────────────────────────────────
function ItemDetailSheet({ item, items, local, saborError, onLocalChange, onAgregar, onClose, onOpenDetalle, onQuickAdd }: {
  item: ItemMenu; items: ItemMenu[];
  local: { cantidad: number; sabor?: Sabor }; saborError: boolean;
  onLocalChange: (l: { cantidad: number; sabor?: Sabor }) => void;
  onAgregar: () => void; onClose: () => void;
  onOpenDetalle: (item: ItemMenu) => void; onQuickAdd: (item: ItemMenu) => void;
}) {
  const crossSell = getCrossSell(item, items);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" style={{ zIndex: 60 }} onClick={onClose} />
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-brand-dark rounded-t-3xl max-h-[92vh] flex flex-col"
        style={{ zIndex: 60, paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Imagen */}
        <div className={`relative shrink-0 rounded-t-3xl overflow-hidden ${item.categoria === "promos" ? "h-56 sm:h-64" : "h-48 sm:h-60"}`}>
          {item.image_url ? (
            <Image src={item.image_url} alt={item.nombre} fill className="object-cover" />
          ) : (
            <div className="h-full flex items-center justify-center text-7xl sm:text-8xl"
              style={{ background: `linear-gradient(135deg, ${item.gradientFrom ?? "#2A1400"} 0%, ${item.gradientTo ?? "#C1121F"} 100%)` }}>
              {item.emoji}
            </div>
          )}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/40" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center text-xl leading-none cursor-pointer" aria-label="Cerrar">×</button>
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {item.destacado && <span className="bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">⭐ Top</span>}
            {item.valorTag && <span className="bg-brand-secondary text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">{item.valorTag}</span>}
            {item.dia && isDisponible(item) && <span className="bg-brand-primary text-brand-cream text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">{item.dia}</span>}
          </div>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto flex-1 px-5 pt-5 pb-3 space-y-5">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-cream tracking-wider leading-tight">{item.nombre.toUpperCase()}</h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="font-display text-4xl text-brand-accent tracking-wider">L.{item.precio}</p>
              {item.precioRegular && (
                <div className="flex flex-col leading-tight">
                  <span className="text-brand-cream/30 text-base line-through">L.{item.precioRegular}</span>
                  <span className="text-brand-secondary text-xs font-bold">Ahorrás L.{item.precioRegular - item.precio}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-brand-cream/60 text-sm leading-relaxed">{item.descripcion}</p>
          {!!item.acompanamientos?.length && (
            <div>
              <p className="text-brand-cream/30 text-[10px] uppercase tracking-widest font-bold mb-2">Incluye</p>
              <div className="flex flex-wrap gap-2">
                {item.acompanamientos.map(a => (
                  <span key={a} className="flex items-center gap-1.5 bg-brand-gray-800 text-brand-cream/70 text-xs px-3 py-1.5 rounded-full">
                    <span>{ACOMP_EMOJI[a] ?? "•"}</span>{a}
                  </span>
                ))}
              </div>
            </div>
          )}
          {necesitaSabor(item) && (
            <div>
              <p className={`text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors ${saborError ? "text-brand-primary" : "text-brand-cream/30"}`}>
                Salsa{saborError && " — elegí una para continuar"}
              </p>
              <div className="flex gap-2">
                {(["BB", "Búfalo"] as Sabor[]).map(s => (
                  <button key={s} onClick={() => onLocalChange({ ...local, sabor: s })}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border-2 ${
                      local.sabor === s ? "border-brand-primary bg-brand-primary/15 text-brand-cream" :
                      saborError ? "border-brand-primary/40 bg-brand-gray-900 text-brand-cream/60" :
                      "border-white/10 bg-brand-gray-900 text-brand-cream/60 hover:border-white/25 hover:text-brand-cream"
                    }`}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {crossSell.length > 0 && (
            <div>
              <p className="text-brand-cream/30 text-[10px] uppercase tracking-widest font-bold mb-3">Va bien con esto</p>
              <div className="grid grid-cols-2 gap-2">
                {crossSell.map(cs => (
                  <div key={cs.id} onClick={() => onOpenDetalle(cs)}
                    className="flex items-center gap-2 bg-brand-gray-900 rounded-xl p-3 cursor-pointer border border-white/5 hover:border-white/15 transition-all">
                    <span className="text-2xl shrink-0">{cs.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-cream/70 text-xs font-semibold truncate">{cs.nombre}</p>
                      <p className="text-brand-accent text-xs font-bold">L.{cs.precio}</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); onQuickAdd(cs); }}
                      className="w-7 h-7 rounded-full bg-brand-primary hover:bg-red-700 text-white text-sm font-bold shrink-0 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
                      aria-label={`Agregar ${cs.nombre}`}>+</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => onLocalChange({ ...local, cantidad: Math.max(1, local.cantidad - 1) })} disabled={local.cantidad <= 1}
                className="w-10 h-10 rounded-full bg-brand-gray-800 hover:bg-brand-gray-700 text-brand-cream font-bold text-lg disabled:opacity-25 active:scale-90 cursor-pointer flex items-center justify-center transition-all">−</button>
              <span className="font-display text-3xl text-brand-cream w-8 text-center leading-none tabular-nums">{local.cantidad}</span>
              <button onClick={() => onLocalChange({ ...local, cantidad: Math.min(20, local.cantidad + 1) })} disabled={local.cantidad >= 20}
                className="w-10 h-10 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream font-bold text-lg disabled:opacity-20 active:scale-90 cursor-pointer flex items-center justify-center transition-all">+</button>
            </div>
            <button onClick={onAgregar}
              className="flex-1 py-3.5 rounded-2xl font-bold text-sm tracking-wider uppercase text-white transition-all hover:opacity-90 active:scale-95 cursor-pointer"
              style={{ background: "#25D366" }}>
              Agregar · L.{item.precio * local.cantidad}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Componente principal ──────────────────────────────────────────────
interface Props { items: ItemMenu[]; promoDia: PromoDia; }

export function MenuOrden({ items, promoDia }: Props) {
  const defaultCat: Categoria | "todos" = promoDia ? "promos" : "alitas";
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | "todos">(defaultCat);
  const [orden, setOrden] = useState<Record<string, ItemOrden>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Detail sheet
  const [detalleItem, setDetalleItem]   = useState<ItemMenu | null>(null);
  const [detalleLocal, setDetalleLocal] = useState<{ cantidad: number; sabor?: Sabor }>({ cantidad: 1 });
  const [saborError, setSaborError]     = useState(false);

  // Checkout
  const [tipo, setTipo]             = useState<TipoOrden | null>(null);
  const [nombre, setNombre]         = useState("");
  const [telefono, setTelefono]     = useState("");
  const [direccion, setDireccion]   = useState("");
  const [referencia, setReferencia] = useState("");
  const [notas, setNotas]           = useState("");
  const [paso, setPaso]             = useState<1 | 2 | 3>(1);
  const [direction, setDirection]   = useState(1);

  const abierto     = estaAbierto();
  const bannerData  = useMemo(() => getBannerData(), []);

  useEffect(() => {
    document.body.style.overflow = (drawerOpen || !!detalleItem) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, detalleItem]);

  const itemsFiltrados = useMemo(() => {
    let filtered = categoriaActiva === "todos" ? items : items.filter(i => i.categoria === categoriaActiva);
    // En la tab de promos, solo mostrar las del día
    if (categoriaActiva === "promos") filtered = filtered.filter(i => isDisponible(i));
    return filtered;
  }, [items, categoriaActiva]);

  const { total, itemCount, sinSabor } = useMemo(() => {
    let total = 0, itemCount = 0, sinSabor = false;
    Object.entries(orden).forEach(([id, ord]) => {
      if (!ord.cantidad) return;
      const item = items.find(i => i.id === id);
      if (!item) return;
      total += item.precio * ord.cantidad;
      itemCount += ord.cantidad;
      if (necesitaSabor(item) && !ord.sabor) sinSabor = true;
    });
    return { total, itemCount, sinSabor };
  }, [orden, items]);

  const upsell = useMemo(() => getUpsell(orden, items), [orden, items]);
  const itemsEnOrden = useMemo(() =>
    Object.entries(orden)
      .filter(([, ord]) => ord.cantidad > 0)
      .flatMap(([id, ord]) => {
        const item = items.find(i => i.id === id);
        return item ? [{ item, ord }] : [];
      }),
    [orden, items]
  );
  const pasoCompleto = useMemo(() => {
    if (paso !== 2) return true;
    if (nombre.trim().length < 2) return false;
    if (tipo === "delivery" && (telefono.trim().length < 7 || direccion.trim().length < 5)) return false;
    return true;
  }, [paso, nombre, tipo, telefono, direccion]);

  function cambiarCantidad(id: string, delta: number) {
    setOrden(prev => {
      const nueva = Math.max(0, Math.min(20, (prev[id]?.cantidad ?? 0) + delta));
      return { ...prev, [id]: { ...prev[id], cantidad: nueva } };
    });
  }
  function cambiarSabor(id: string, sabor: Sabor) {
    setOrden(prev => ({ ...prev, [id]: { ...prev[id], sabor } }));
  }
  function abrirDetalle(item: ItemMenu) {
    if (!isDisponible(item)) return;
    const enCarrito = orden[item.id];
    setDetalleLocal({ cantidad: Math.max(1, enCarrito?.cantidad ?? 1), sabor: enCarrito?.sabor });
    setSaborError(false);
    setDetalleItem(item);
  }
  function aplicarDetalle() {
    if (!detalleItem) return;
    if (necesitaSabor(detalleItem) && !detalleLocal.sabor) { setSaborError(true); return; }
    setOrden(prev => ({ ...prev, [detalleItem.id]: detalleLocal }));
    setDetalleItem(null);
  }
  function quickAdd(item: ItemMenu) {
    setOrden(prev => ({ ...prev, [item.id]: { ...prev[item.id], cantidad: (prev[item.id]?.cantidad ?? 0) + 1 } }));
  }

  const tipoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function openDrawer() { setPaso(1); setDirection(1); setDrawerOpen(true); }
  function avanzar()    { setDirection(1); setPaso(p => (Math.min(3, p + 1)) as 1 | 2 | 3); }
  function retroceder() { setDirection(-1); setPaso(p => (Math.max(1, p - 1)) as 1 | 2 | 3); }
  function elegirTipo(t: TipoOrden) {
    if (tipoTimerRef.current) clearTimeout(tipoTimerRef.current);
    setTipo(t);
    tipoTimerRef.current = setTimeout(() => avanzar(), 250);
  }

  const puedeEnviar =
    tipo !== null && itemCount > 0 && !sinSabor && nombre.trim().length >= 2 &&
    (tipo !== "delivery" || (telefono.trim().length >= 7 && direccion.trim().length >= 5));

  const motivoInhabilitar =
    !tipo                                              ? "Elegí cómo querés tu orden"    :
    itemCount === 0                                    ? "Agregá algo a tu pedido"        :
    sinSabor                                           ? "Elegí la salsa para tus alitas" :
    nombre.trim().length < 2                           ? "Escribí tu nombre"              :
    tipo === "delivery" && telefono.trim().length < 7  ? "Escribí tu teléfono"            :
    tipo === "delivery" && direccion.trim().length < 5 ? "Escribí tu dirección"           :
    null;

  const waLink = puedeEnviar
    ? buildWaMsg({ tipo: tipo!, nombre, telefono, direccion, referencia, notas, orden, items, total })
    : "#";

  return (
    <section className="pb-8" style={{ background: "#160500" }}>

      {/* Banner contextual del día — ticket físico */}
      {bannerData && (
        <div className="relative">
          {/* Muescas — ilusión de boleto perforado */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full z-10" style={{ background: "#160500" }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full z-10" style={{ background: "#160500" }} />

          {/* Cuerpo del ticket */}
          <div
            className="relative overflow-hidden py-5 px-12 sm:px-20 text-center"
            style={{
              background: "#FFF8F0",
              borderTop: "2px dashed rgba(193,18,31,0.5)",
              borderBottom: "2px dashed rgba(193,18,31,0.5)",
            }}
          >
            {/* Llamas en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(193,18,31,0.22), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(232,93,4,0.22), transparent)" }} />

            {/* Sello VÁLIDO HOY */}
            {bannerData.tipo === "hoy" && (
              <div className="absolute top-3 right-4 rotate-[-10deg] border-2 rounded px-2 py-0.5 opacity-60 pointer-events-none"
                style={{ borderColor: "#C1121F" }}>
                <span className="font-display text-[9px] tracking-widest" style={{ color: "#C1121F" }}>VÁLIDO HOY</span>
              </div>
            )}

            {/* Título */}
            <p className="relative z-10 font-display tracking-widest leading-tight text-base sm:text-lg mb-3"
              style={{ color: bannerData.tipo === "hoy" ? "#C1121F" : "#E85D04" }}>
              {bannerData.titulo}
            </p>

            {/* Bloques de oferta */}
            {bannerData.ofertas ? (
              <div className="relative z-10 flex gap-3 justify-center flex-wrap mb-2">
                {bannerData.ofertas.map((o, i) => (
                  <div key={i} className="flex flex-col items-center px-5 py-2.5 rounded-lg"
                    style={{ border: "1.5px solid rgba(193,18,31,0.35)", background: "rgba(193,18,31,0.05)" }}>
                    <span className="font-display text-[11px] tracking-widest uppercase" style={{ color: "#4A0A00" }}>{o.label}</span>
                    <span className="font-display text-3xl tracking-wider leading-tight" style={{ color: "#C1121F" }}>{o.precio}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Subtítulo */}
            <p className="relative z-10 text-xs mt-1" style={{ color: "rgba(13,6,2,0.5)" }}>{bannerData.sub}</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Tabs sticky */}
        <div className="sticky top-16 z-30 backdrop-blur-sm -mx-4 px-4 py-3 border-b border-white/8 mb-6"
          style={{ background: "rgba(22,5,0,0.96)" }}>
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 max-w-6xl mx-auto">
              {CATEGORIAS.map(cat => {
                const active = categoriaActiva === cat.id;
                const isPromo = cat.id === "promos";
                return (
                  <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}
                    className={[
                      "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                      active
                        ? "bg-brand-primary text-brand-cream"
                        : isPromo
                          ? "bg-brand-gray-800 text-brand-accent hover:bg-brand-gray-700"
                          : "bg-brand-gray-800 text-brand-cream/60 hover:text-brand-cream hover:bg-brand-gray-700",
                    ].join(" ")}
                    style={active ? { boxShadow: "0 0 12px 3px rgba(193,18,31,0.45)" } : undefined}
                  >
                    <span>{CAT_ICONS[cat.id] ?? ""}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Fade derecho — hint de scroll */}
            <div className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, rgba(22,5,0,0.9), transparent)" }} />
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {itemsFiltrados.length > 0 ? itemsFiltrados.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
                className={item.categoria === "promos" ? "col-span-2 sm:col-span-1" : ""}>
                <MenuCard
                  item={item}
                  cantidad={orden[item.id]?.cantidad ?? 0}
                  sabor={orden[item.id]?.sabor}
                  disponible={isDisponible(item)}
                  onTap={() => abrirDetalle(item)}
                  onCambiar={d => cambiarCantidad(item.id, d)}
                  onSabor={s => cambiarSabor(item.id, s)}
                />
              </motion.div>
            )) : categoriaActiva === "promos" ? (
              <motion.div key="empty-promos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 lg:col-span-3 py-16 text-center">
                <p className="text-5xl mb-4">🔥</p>
                <p className="font-display text-2xl text-brand-cream tracking-wider">VOLVÉ EL MIÉRCOLES</p>
                <p className="text-brand-cream/40 text-sm mt-2">Promos especiales los mié, jue y viernes</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Barra flotante */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-3"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
            <button onClick={openDrawer}
              className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden cursor-pointer transition-transform active:scale-[0.98] block"
              style={{ boxShadow: "0 8px 32px rgba(193,18,31,0.45)" }}>
              {/* Zona 1 — ítems: panel oscuro, legible */}
              <div className="px-5 pt-3 pb-3 bg-black/80">
                {itemsEnOrden.slice(0, 3).map(({ item, ord }) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-0.5">
                    <span className="text-white text-xs font-medium">{item.nombre}</span>
                    <span className="text-brand-accent text-xs font-bold shrink-0">×{ord.cantidad}</span>
                  </div>
                ))}
                {itemsEnOrden.length > 3 && (
                  <p className="text-brand-cream/40 text-[10px] mt-1">+{itemsEnOrden.length - 3} más</p>
                )}
              </div>
              {/* Zona 2 — CTA: fuego real, rojo a naranja */}
              <div className="relative overflow-hidden"
                style={{ background: "linear-gradient(to right, #C1121F 0%, #E85D04 100%)" }}>
                <EmberParticles mini colors={["#FFD700", "#FFED4A", "#FFF176", "#FFB703"]} />
                <div className="relative z-10 flex items-center justify-between px-5 py-4">
                  <span className="text-white/80 text-sm font-medium">{itemCount} {itemCount === 1 ? "ítem" : "ítems"}</span>
                  <span className="font-display text-xl tracking-wider text-white">VER PEDIDO · L.{total}</span>
                </div>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer de checkout — wizard */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl max-h-[88vh] flex flex-col"
              style={{ background: "radial-gradient(ellipse 100% 30% at 50% 0%, rgba(193,18,31,0.18) 0%, transparent 65%), linear-gradient(180deg, #1A0400 0%, #0D0602 55%)", paddingBottom: "env(safe-area-inset-bottom)" }}>

              {/* Header fijo */}
              <div className="relative shrink-0 px-5 pt-5 pb-3 border-b border-brand-primary/15">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                    {paso > 1 && (
                      <button onClick={retroceder} className="w-8 h-8 flex items-center justify-center text-brand-cream/50 hover:text-brand-cream cursor-pointer transition-colors">
                        <ChevronLeft />
                      </button>
                    )}
                  </div>
                  <div className="flex-1 text-center">
                    <AnimatePresence mode="wait">
                      <motion.p key={paso} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                        className="font-display text-lg text-brand-cream tracking-wider">
                        {paso === 1 ? "¿CÓMO LO QUERÉS?" : paso === 2 ? "TUS DATOS" : "CONFIRMÁ TU PEDIDO"}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-brand-cream/35 text-xs mt-0.5">{itemCount} {itemCount === 1 ? "ítem" : "ítems"} · L.{total}</p>
                  </div>
                  <button onClick={() => setDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-brand-gray-800 text-brand-cream/60 hover:text-brand-cream flex items-center justify-center shrink-0 cursor-pointer text-lg leading-none">×</button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="shrink-0 flex items-center justify-center gap-2.5 py-3">
                {([1, 2, 3] as const).map(n => (
                  <div key={n}
                    className={`rounded-full transition-all duration-300 ${
                      n === paso ? "w-5 h-1.5 bg-brand-accent" :
                      n < paso  ? "w-2 h-2 bg-brand-primary" :
                                  "w-2 h-2 bg-white/15"
                    }`}
                    style={n === paso ? { boxShadow: "0 0 10px rgba(255,183,3,0.7)" } : {}} />
                ))}
              </div>

              {/* Aviso horario */}
              {!abierto && (
                <div className="shrink-0 mx-5 mb-1 flex items-center gap-2 bg-brand-gray-900 border border-brand-accent/25 rounded-xl px-4 py-2.5">
                  <span className="text-brand-accent text-sm shrink-0">🕐</span>
                  <p className="text-brand-accent/80 text-xs font-medium">Abrimos a la 1:00 PM — podés pre-ordenar ahora</p>
                </div>
              )}

              {/* Contenido animado por paso */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div key={paso} custom={direction} variants={stepVariants}
                    initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="h-full overflow-y-auto">

                    {/* ── Paso 1: ¿Cómo lo querés? ── */}
                    {paso === 1 && (
                      <div className="px-5 py-6">
                        <p className="text-brand-cream/35 text-center text-sm mb-6">Elegí cómo recibir tu pedido</p>
                        <div className="grid grid-cols-2 gap-4">
                          {TIPOS.map(t => (
                            <button key={t.id} onClick={() => elegirTipo(t.id)}
                              className="flex flex-col items-center justify-center gap-3 py-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer active:scale-[0.97]"
                              style={tipo === t.id ? {
                                background: "linear-gradient(135deg, #C1121F 0%, #E85D04 100%)",
                                borderColor: "transparent",
                                boxShadow: "0 0 30px rgba(232,93,4,0.40)"
                              } : {
                                background: "linear-gradient(135deg, rgba(193,18,31,0.12) 0%, rgba(232,93,4,0.07) 100%)",
                                borderColor: "rgba(193,18,31,0.25)"
                              }}>
                              <span className="text-5xl">{t.emoji}</span>
                              <div className="text-center">
                                <p className="font-display text-xl text-brand-cream tracking-wider">{t.label.toUpperCase()}</p>
                                <p className="text-brand-cream/40 text-xs mt-0.5">{t.sub}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── Paso 2: Tus datos ── */}
                    {paso === 2 && (
                      <div className="px-5 py-6 space-y-4">
                        <FloatingInput id="nombre" label="Tu nombre" value={nombre} onChange={setNombre} required />
                        {tipo === "delivery" && (
                          <>
                            <FloatingInput id="telefono" label="Teléfono de contacto" type="tel" value={telefono} onChange={setTelefono} required />
                            <FloatingInput id="direccion" label="Dirección" value={direccion} onChange={setDireccion} required />
                            <FloatingInput id="referencia" label="Punto de referencia (opcional)" value={referencia} onChange={setReferencia} />
                            <div className="flex items-start gap-2.5 bg-white/4 rounded-xl px-4 py-3">
                              <span className="text-base shrink-0 mt-0.5">🛵</span>
                              <p className="text-brand-cream/40 text-xs leading-relaxed">El costo de delivery lo cobra Mandaditos según distancia — no está incluido en el total.</p>
                            </div>
                          </>
                        )}
                        <FloatingInput id="notas" label="Notas opcionales (sin encurtido, salsa aparte...)" value={notas} onChange={setNotas} />
                        <button onClick={avanzar} disabled={!pasoCompleto}
                          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all ${
                            pasoCompleto
                              ? "text-white cursor-pointer active:scale-[0.98]"
                              : "text-brand-cream/30 cursor-not-allowed"
                          }`}
                          style={pasoCompleto
                            ? { background: "linear-gradient(to right, #C1121F 0%, #E85D04 100%)" }
                            : { background: "rgba(255,255,255,0.05)" }}>
                          {pasoCompleto ? "Confirmar pedido →" :
                            nombre.trim().length < 2 ? "Escribí tu nombre" :
                            tipo === "delivery" && telefono.trim().length < 7 ? "Escribí tu teléfono" :
                            tipo === "delivery" && direccion.trim().length < 5 ? "Escribí tu dirección" :
                            "Completá los datos"}
                        </button>
                      </div>
                    )}

                    {/* ── Paso 3: Confirmá ── */}
                    {paso === 3 && (
                      <div className="px-5 py-6 space-y-4">
                        {/* Resumen de ítems */}
                        <div className="rounded-2xl px-4 py-4 space-y-3 border border-brand-primary/20" style={{ background: "#1A0400" }}>
                          {itemsEnOrden.map(({ item, ord }) => (
                            <div key={item.id}>
                              <div className="flex items-center gap-3 justify-between">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="text-xl shrink-0">{item.emoji}</span>
                                  <div className="min-w-0">
                                    <p className="text-brand-cream/85 text-sm font-medium leading-tight">{item.nombre}</p>
                                    {necesitaSabor(item) && ord.sabor && (
                                      <p className="text-brand-accent text-xs mt-0.5">Salsa: {ord.sabor}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="shrink-0 text-right">
                                  <p className="text-brand-cream/40 text-xs">×{ord.cantidad}</p>
                                  <p className="text-brand-accent text-sm font-bold">L.{item.precio * ord.cantidad}</p>
                                </div>
                              </div>
                              {necesitaSabor(item) && !ord.sabor && (
                                <div className="flex items-center gap-2 mt-2 pl-9">
                                  <span className="text-brand-primary text-[10px] font-bold animate-pulse shrink-0">Salsa:</span>
                                  {(["BB", "Búfalo"] as Sabor[]).map(s => (
                                    <button key={s} onClick={() => cambiarSabor(item.id, s)}
                                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-gray-800 hover:bg-brand-primary text-brand-cream/70 hover:text-brand-cream transition-all cursor-pointer border border-brand-primary/40">
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="border-t border-white/8 pt-3 flex justify-between items-center">
                            <p className="text-brand-cream/35 text-sm">Total</p>
                            <p className="font-display text-4xl text-brand-accent tracking-wider">L.{total}</p>
                          </div>
                        </div>

                        {/* Tipo + nombre confirmación */}
                        <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/8" style={{ background: "#1A0400" }}>
                          <span className="text-2xl shrink-0">{TIPOS.find(t => t.id === tipo)?.emoji}</span>
                          <div>
                            <p className="text-brand-cream/40 text-[10px] uppercase tracking-widest font-bold">{TIPOS.find(t => t.id === tipo)?.label}</p>
                            <p className="text-brand-cream/85 text-sm font-medium">{nombre}</p>
                            {tipo === "delivery" && direccion && <p className="text-brand-cream/45 text-xs mt-0.5">{direccion}</p>}
                          </div>
                        </div>

                        {/* Aviso de pago */}
                        <div className="flex items-center gap-3 bg-brand-gray-900 border border-brand-accent/25 rounded-xl px-4 py-3">
                          <span className="text-xl shrink-0">💵</span>
                          <div>
                            <p className="text-brand-cream text-sm font-bold">Pagás al recibir tu pedido</p>
                            <p className="text-brand-cream/45 text-xs mt-0.5">Sin cobro online · sin tarjeta necesaria</p>
                          </div>
                        </div>

                        {/* CTA */}
                        {puedeEnviar ? (
                          <a href={waLink} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase text-white transition-all hover:opacity-90 active:scale-95"
                            style={{ background: "#25D366", boxShadow: "0 0 24px rgba(37,211,102,0.35)" }}>
                            <WaIcon />{abierto ? `Pedir ahora · L.${total}` : `Pre-ordenar · L.${total}`}
                          </a>
                        ) : (
                          <button disabled className="w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase text-brand-cream/30 bg-brand-gray-800 cursor-not-allowed">
                            {motivoInhabilitar ?? "Completá tu pedido"}
                          </button>
                        )}
                        <p className="text-brand-cream/20 text-xs text-center pb-2">← Cerrá para editar el pedido</p>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Detail sheet */}
      <AnimatePresence>
        {detalleItem && (
          <ItemDetailSheet
            item={detalleItem} items={items} local={detalleLocal} saborError={saborError}
            onLocalChange={l => { setDetalleLocal(l); setSaborError(false); }}
            onAgregar={aplicarDetalle}
            onClose={() => setDetalleItem(null)}
            onOpenDetalle={abrirDetalle}
            onQuickAdd={quickAdd}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
