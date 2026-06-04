"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIAS, type ItemMenu, type Categoria } from "@/lib/menu-data";
import type { PromoDia } from "@/app/menu/page";

type TipoOrden = "delivery" | "recoger" | "comer-aqui";
type Sabor = "BB" | "Búfalo";

interface ItemOrden {
  cantidad: number;
  sabor?: Sabor;
}

const TIPOS = [
  { id: "delivery"   as TipoOrden, emoji: "🛵", label: "Delivery",     sub: "Vía Mandaditos" },
  { id: "recoger"    as TipoOrden, emoji: "🚶", label: "Para recoger", sub: "Yo lo busco"    },
  { id: "comer-aqui" as TipoOrden, emoji: "🍽️", label: "Comer aquí",  sub: "En La Cabaña"   },
];

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

function buildWaMsg(p: {
  tipo: TipoOrden;
  nombre: string;
  telefono: string;
  direccion: string;
  referencia: string;
  personas: number;
  notas: string;
  orden: Record<string, ItemOrden>;
  items: ItemMenu[];
  total: number;
}): string {
  const encabezado: Record<TipoOrden, string> = {
    delivery:    `Hola 👋 Mi nombre es ${p.nombre}. Quisiera ordenar con DELIVERY (vía Mandaditos):`,
    recoger:     `Hola 👋 Mi nombre es ${p.nombre}. Quisiera ordenar PARA RECOGER:`,
    "comer-aqui": `Hola 👋 Mi nombre es ${p.nombre}. Voy a comer en el restaurante y quisiera ordenar:`,
  };

  const lineas: string[] = [encabezado[p.tipo], ""];

  p.items.forEach((item) => {
    const ord = p.orden[item.id];
    if (!ord?.cantidad) return;
    const sabor  = necesitaSabor(item) && ord.sabor ? ` ${ord.sabor}` : "";
    const prefijo = ord.cantidad > 1 ? `${ord.cantidad}x ` : "";
    const precio  = ord.cantidad > 1 ? `L.${item.precio} c/u` : `L.${item.precio}`;
    lineas.push(`• ${prefijo}${item.nombre}${sabor} (${precio})`);
  });

  lineas.push("", `Subtotal: L.${p.total} 🍗`);

  if (p.tipo === "delivery") {
    lineas.push("(+ costo de delivery de Mandaditos según tu distancia)");
    lineas.push("", `📍 Dirección: ${p.direccion}`);
    if (p.referencia.trim()) lineas.push(`   Referencia: ${p.referencia}`);
    lineas.push(`📞 Tel: ${p.telefono}`);
  }

  if (p.tipo === "comer-aqui" && p.personas > 1) {
    lineas.push(`👥 Somos ${p.personas} personas`);
  }

  if (p.notas.trim()) lineas.push(`📝 Nota: ${p.notas.trim()}`);

  return `https://wa.me/50432462305?text=${encodeURIComponent(lineas.join("\n"))}`;
}

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ── Tarjeta de menú con stepper integrado ─────────────────────────────
function MenuCard({
  item, cantidad, sabor, disponible, onCambiar, onSabor,
}: {
  item: ItemMenu;
  cantidad: number;
  sabor?: Sabor;
  disponible: boolean;
  onCambiar: (d: number) => void;
  onSabor: (s: Sabor) => void;
}) {
  const esPromo = item.categoria === "promos";

  return (
    <article
      className={[
        "rounded-xl overflow-hidden border transition-all duration-200 flex flex-col",
        esPromo ? "col-span-2 sm:col-span-1" : "",
        !disponible ? "opacity-40" : "",
        cantidad > 0
          ? "border-brand-primary/50 shadow-lg shadow-brand-primary/10"
          : "border-white/5 hover:border-white/15",
      ].join(" ")}
    >
      {/* Imagen / gradiente */}
      <div className={`relative overflow-hidden ${esPromo ? "h-36 sm:h-44" : "h-28 sm:h-36"}`}>
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

        {/* Badges superiores */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.destacado && disponible && (
            <span className="bg-brand-accent text-brand-dark text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm leading-tight">
              ⭐ Top
            </span>
          )}
          {item.valorTag && disponible && (
            <span className="bg-brand-secondary text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm leading-tight">
              {item.valorTag}
            </span>
          )}
          {item.dia && (
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm leading-tight ${
              disponible ? "bg-brand-primary text-brand-cream" : "bg-brand-gray-800 text-brand-cream/40"
            }`}>
              {disponible ? item.dia : `Solo ${item.dia}`}
            </span>
          )}
        </div>

        {/* Burbuja de cantidad en imagen */}
        {cantidad > 0 && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-black leading-none">{cantidad}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className={`bg-brand-gray-900 flex flex-col flex-1 ${esPromo ? "p-4" : "p-3"}`}>
        <h3 className={`font-display text-brand-cream tracking-wide leading-tight mb-1 ${esPromo ? "text-xl" : "text-sm sm:text-base"}`}>
          {item.nombre.toUpperCase()}
        </h3>
        <p className={`text-brand-cream/50 leading-relaxed line-clamp-2 mb-1 ${esPromo ? "text-sm" : "text-[11px] sm:text-xs"}`}>
          {item.descripcion}
        </p>
        {item.acompanamientos && item.acompanamientos.length > 0 && (
          <p className={`text-brand-cream/25 leading-relaxed line-clamp-1 mb-2 ${esPromo ? "text-xs" : "text-[10px]"}`}>
            Con: {item.acompanamientos.join(" · ")}
          </p>
        )}

        {/* Precio + stepper */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <p className={`font-display text-brand-accent tracking-wider leading-none ${esPromo ? "text-3xl" : "text-2xl"}`}>
            L.{item.precio}
          </p>

          {disponible && (
            <div className="flex items-center gap-1.5 shrink-0">
              {cantidad > 0 ? (
                <>
                  <button
                    onClick={() => onCambiar(-1)}
                    aria-label="Reducir"
                    className="w-7 h-7 rounded-full bg-brand-gray-800 hover:bg-brand-gray-700 text-brand-cream text-sm font-bold transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                  >−</button>
                  <span className="w-5 text-center font-bold text-sm text-brand-cream tabular-nums">{cantidad}</span>
                  <button
                    onClick={() => onCambiar(1)}
                    aria-label="Aumentar"
                    className="w-7 h-7 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream text-sm font-bold transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                  >+</button>
                </>
              ) : (
                <button
                  onClick={() => onCambiar(1)}
                  aria-label={`Agregar ${item.nombre}`}
                  className="w-9 h-9 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream text-xl font-bold transition-all active:scale-90 cursor-pointer flex items-center justify-center shadow-lg shadow-brand-primary/40"
                >+</button>
              )}
            </div>
          )}
        </div>

        {/* Selector de salsa — aparece al agregar alitas */}
        <AnimatePresence>
          {necesitaSabor(item) && cantidad > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-brand-cream/30 text-[10px] shrink-0">Salsa:</p>
                {(["BB", "Búfalo"] as Sabor[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => onSabor(s)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      sabor === s
                        ? "bg-brand-primary text-brand-cream"
                        : "bg-brand-gray-800 text-brand-cream/55 hover:text-brand-cream"
                    }`}
                  >{s}</button>
                ))}
                {!sabor && (
                  <span className="text-brand-accent text-[10px] animate-pulse">← elegí</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

// ── Componente principal ──────────────────────────────────────────────
interface Props {
  items: ItemMenu[];
  promoDia: PromoDia;
}

export function MenuOrden({ items, promoDia }: Props) {
  const defaultCat: Categoria | "todos" = promoDia ? "promos" : "alitas";
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | "todos">(defaultCat);
  const [orden, setOrden] = useState<Record<string, ItemOrden>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Campos del checkout
  const [tipo, setTipo]           = useState<TipoOrden | null>(null);
  const [nombre, setNombre]       = useState("");
  const [telefono, setTelefono]   = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [personas, setPersonas]   = useState(2);
  const [notas, setNotas]         = useState("");

  const abierto = estaAbierto();

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const itemsFiltrados = useMemo(
    () => categoriaActiva === "todos" ? items : items.filter((i) => i.categoria === categoriaActiva),
    [items, categoriaActiva]
  );

  const { total, itemCount, sinSabor } = useMemo(() => {
    let total = 0, itemCount = 0, sinSabor = false;
    Object.entries(orden).forEach(([id, ord]) => {
      if (!ord.cantidad) return;
      const item = items.find((i) => i.id === id);
      if (!item) return;
      total += item.precio * ord.cantidad;
      itemCount += ord.cantidad;
      if (necesitaSabor(item) && !ord.sabor) sinSabor = true;
    });
    return { total, itemCount, sinSabor };
  }, [orden, items]);

  const tieneRefresco = !!(orden["refresco"]?.cantidad);

  function cambiarCantidad(id: string, delta: number) {
    setOrden((prev) => {
      const actual = prev[id]?.cantidad ?? 0;
      const nueva  = Math.max(0, Math.min(20, actual + delta));
      return { ...prev, [id]: { ...prev[id], cantidad: nueva } };
    });
  }

  function cambiarSabor(id: string, sabor: Sabor) {
    setOrden((prev) => ({ ...prev, [id]: { ...prev[id], sabor } }));
  }

  function agregarRefresco() {
    setOrden((prev) => ({
      ...prev,
      refresco: { cantidad: (prev.refresco?.cantidad ?? 0) + 1 },
    }));
  }

  const puedeEnviar =
    tipo !== null &&
    itemCount > 0 &&
    !sinSabor &&
    nombre.trim().length >= 2 &&
    (tipo !== "delivery" || (telefono.trim().length >= 7 && direccion.trim().length >= 5));

  const motivoInhabilitar =
    !tipo                                            ? "Elegí cómo querés tu orden"        :
    itemCount === 0                                  ? "Agregá algo a tu pedido"            :
    sinSabor                                         ? "Elegí la salsa para tus alitas"     :
    nombre.trim().length < 2                         ? "Escribí tu nombre"                  :
    tipo === "delivery" && telefono.trim().length < 7 ? "Escribí tu número de teléfono"    :
    tipo === "delivery" && direccion.trim().length < 5 ? "Escribí tu dirección"            :
    null;

  const waLink = puedeEnviar
    ? buildWaMsg({ tipo: tipo!, nombre, telefono, direccion, referencia, personas, notas, orden, items, total })
    : "#";

  const banner = promoDia ? BANNER[promoDia] : null;

  return (
    <section className="bg-brand-dark pb-8">

      {/* Banner contextual del día */}
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
        <div className="sticky top-16 z-30 bg-brand-dark/95 backdrop-blur-sm -mx-4 px-4 py-3 border-b border-white/5 mb-6">
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
                >{cat.label}</button>
              );
            })}
          </div>
        </div>

        {/* Grid de tarjetas */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {itemsFiltrados.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={item.categoria === "promos" ? "col-span-2 sm:col-span-1" : ""}
              >
                <MenuCard
                  item={item}
                  cantidad={orden[item.id]?.cantidad ?? 0}
                  sabor={orden[item.id]?.sabor}
                  disponible={isDisponible(item)}
                  onCambiar={(d) => cambiarCantidad(item.id, d)}
                  onSabor={(s) => cambiarSabor(item.id, s)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Barra flotante — aparece cuando hay ítems en el pedido */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
          >
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-full max-w-lg mx-auto flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-white shadow-2xl shadow-black/60 cursor-pointer transition-all active:scale-[0.98]"
              style={{ background: "#25D366", display: "flex" }}
            >
              <span className="text-sm opacity-85">
                {itemCount} {itemCount === 1 ? "ítem" : "ítems"}
              </span>
              <span className="flex items-center gap-2 text-base">
                <WaIcon />
                Ver pedido · L.{total}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer de checkout */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark rounded-t-3xl max-h-[88vh] flex flex-col"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              {/* Handle + header */}
              <div className="relative flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5 shrink-0">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/15" />
                <div>
                  <p className="font-display text-xl text-brand-cream tracking-wider">TU PEDIDO</p>
                  <p className="text-brand-cream/40 text-xs mt-0.5">
                    {itemCount} {itemCount === 1 ? "ítem" : "ítems"} · L.{total}
                  </p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-brand-gray-800 text-brand-cream/60 hover:text-brand-cream flex items-center justify-center transition-colors cursor-pointer text-lg leading-none"
                  aria-label="Cerrar"
                >×</button>
              </div>

              {/* Contenido scrolleable */}
              <div className="overflow-y-auto flex-1 px-5 py-5 space-y-5">

                {/* Aviso fuera de horario */}
                {!abierto && (
                  <div className="bg-brand-gray-900 border border-brand-accent/30 rounded-xl px-4 py-3 text-center">
                    <p className="text-brand-accent font-bold text-sm">🕐 Abrimos a la 1:00 PM</p>
                    <p className="text-brand-cream/45 text-xs mt-1">
                      Podés armar tu pedido ahora y enviarlo cuando abramos
                    </p>
                  </div>
                )}

                {/* Resumen del pedido */}
                <div className="bg-brand-gray-900 rounded-xl px-4 py-3 space-y-2">
                  {Object.entries(orden).map(([id, ord]) => {
                    if (!ord.cantidad) return null;
                    const item = items.find((i) => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-start justify-between gap-3 text-sm">
                        <p className="text-brand-cream/75 flex-1">
                          {ord.cantidad > 1 ? `${ord.cantidad}× ` : ""}
                          {item.nombre}
                          {necesitaSabor(item) && ord.sabor && (
                            <span className="text-brand-accent"> · {ord.sabor}</span>
                          )}
                          {necesitaSabor(item) && !ord.sabor && (
                            <span className="text-brand-primary animate-pulse"> · elige salsa ↑</span>
                          )}
                        </p>
                        <p className="text-brand-accent font-bold shrink-0">
                          L.{item.precio * ord.cantidad}
                        </p>
                      </div>
                    );
                  })}
                  <div className="border-t border-white/5 pt-2 flex justify-between items-center">
                    <p className="text-brand-cream/35 text-sm">Subtotal</p>
                    <p className="font-display text-3xl text-brand-accent tracking-wider">L.{total}</p>
                  </div>
                </div>

                {/* Upsell refresco */}
                {!tieneRefresco && (
                  <button
                    onClick={agregarRefresco}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dashed border-white/12 hover:border-brand-accent/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🥤</span>
                      <div className="text-left">
                        <p className="text-brand-cream/65 text-xs font-semibold group-hover:text-brand-cream transition-colors">
                          ¿Querés un Refresco?
                        </p>
                        <p className="text-brand-cream/30 text-[10px]">Para acompañar tu pedido</p>
                      </div>
                    </div>
                    <span className="text-brand-accent font-bold text-sm">+ L.30</span>
                  </button>
                )}

                {/* Paso 1 — Tipo de orden */}
                <div>
                  <p className="text-brand-cream/40 text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-primary text-brand-cream text-[9px] flex items-center justify-center font-black shrink-0">1</span>
                    ¿Cómo lo querés?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {TIPOS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTipo(t.id)}
                        className={[
                          "flex flex-col items-center justify-center gap-1 py-3 px-1.5 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center",
                          tipo === t.id
                            ? "border-brand-primary bg-brand-primary/15 text-brand-cream"
                            : "border-white/8 bg-brand-gray-900 text-brand-cream/50 hover:border-white/20 hover:text-brand-cream",
                        ].join(" ")}
                      >
                        <span className="text-xl">{t.emoji}</span>
                        <p className="font-bold text-[11px] leading-tight">{t.label}</p>
                        <p className={`text-[9px] leading-tight ${tipo === t.id ? "text-brand-cream/50" : "text-brand-cream/25"}`}>
                          {t.sub}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paso 2 — Datos */}
                <div>
                  <p className="text-brand-cream/40 text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-primary text-brand-cream text-[9px] flex items-center justify-center font-black shrink-0">2</span>
                    Tus datos
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre *"
                      className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                    />

                    {tipo === "delivery" && (
                      <>
                        <input
                          type="tel"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          placeholder="Teléfono de contacto *"
                          className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                        />
                        <input
                          type="text"
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                          placeholder="Dirección *"
                          className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                        />
                        <input
                          type="text"
                          value={referencia}
                          onChange={(e) => setReferencia(e.target.value)}
                          placeholder="Punto de referencia (opcional)"
                          className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                        />
                        <div className="bg-brand-gray-900 border border-brand-accent/20 rounded-xl px-4 py-3">
                          <p className="text-brand-accent text-xs font-bold">🛵 Sobre el costo del delivery</p>
                          <p className="text-brand-cream/40 text-xs mt-1 leading-relaxed">
                            Mandaditos cobra su tarifa según distancia — ese costo{" "}
                            <strong className="text-brand-cream/55">no está incluido</strong> en el subtotal.
                          </p>
                        </div>
                      </>
                    )}

                    {tipo === "comer-aqui" && (
                      <div className="flex items-center gap-4 bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3">
                        <p className="text-brand-cream/40 text-xs flex-1">¿Cuántos son?</p>
                        <button
                          onClick={() => setPersonas((p) => Math.max(1, p - 1))}
                          disabled={personas === 1}
                          className="w-8 h-8 rounded-full bg-brand-gray-800 text-brand-cream font-bold disabled:opacity-25 active:scale-90 cursor-pointer flex items-center justify-center"
                        >−</button>
                        <span className="font-display text-2xl text-brand-cream w-8 text-center leading-none">{personas}</span>
                        <button
                          onClick={() => setPersonas((p) => Math.min(30, p + 1))}
                          className="w-8 h-8 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream font-bold active:scale-90 cursor-pointer flex items-center justify-center"
                        >+</button>
                        <span className="text-brand-cream/30 text-xs">{personas === 1 ? "persona" : "personas"}</span>
                      </div>
                    )}

                    <textarea
                      value={notas}
                      onChange={(e) => setNotas(e.target.value)}
                      placeholder="Notas: sin encurtido, salsa aparte... (opcional)"
                      rows={2}
                      className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* CTA fijo al pie del drawer */}
              <div className="px-5 py-4 border-t border-white/5 shrink-0">
                {puedeEnviar ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "#25D366" }}
                  >
                    <WaIcon />
                    {abierto ? `Pedir ahora · L.${total}` : `Pre-ordenar · L.${total}`}
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase text-brand-cream/30 bg-brand-gray-800 cursor-not-allowed"
                  >
                    {motivoInhabilitar ?? "Completá tu pedido"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
