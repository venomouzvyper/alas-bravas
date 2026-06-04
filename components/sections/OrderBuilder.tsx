'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, CATEGORIAS, type ItemMenu, type Categoria } from '@/lib/menu-data';

// ── Types ─────────────────────────────────────────────────────────────
type TipoOrden = 'delivery' | 'recoger' | 'comer-aqui';
type Sabor = 'BB' | 'Búfalo';

interface ItemOrden {
  cantidad: number;
  sabor?: Sabor;
}

// ── Config ────────────────────────────────────────────────────────────
const TIPOS = [
  { id: 'delivery'    as TipoOrden, emoji: '🛵', label: 'Delivery',     sub: 'Vía Mandaditos' },
  { id: 'recoger'     as TipoOrden, emoji: '🚶', label: 'Para recoger', sub: 'Yo lo busco'    },
  { id: 'comer-aqui'  as TipoOrden, emoji: '🍽️', label: 'Comer aquí',  sub: 'En La Cabaña'   },
];

// ── Helpers ───────────────────────────────────────────────────────────
function estaAbierto(): boolean {
  const h = new Date().getHours();
  return h >= 13 && h < 23;
}

function isDisponible(item: ItemMenu): boolean {
  if (!item.dia) return true;
  const d = new Date().getDay(); // 0=Dom..6=Sáb
  if (item.dia.includes('Mié') && (d === 3 || d === 4)) return true;
  if (item.dia === 'Viernes' && d === 5) return true;
  return false;
}

function buildWaMsg(p: {
  tipo: TipoOrden;
  nombre: string;
  direccion: string;
  referencia: string;
  personas: number;
  notas: string;
  items: Record<string, ItemOrden>;
  total: number;
}): string {
  const encabezado: Record<TipoOrden, string> = {
    'delivery':    `Hola 👋 Mi nombre es ${p.nombre}. Quisiera ordenar con DELIVERY (vía Mandaditos):`,
    'recoger':     `Hola 👋 Mi nombre es ${p.nombre}. Quisiera ordenar PARA RECOGER:`,
    'comer-aqui':  `Hola 👋 Mi nombre es ${p.nombre}. Voy a comer en el restaurante y quisiera ordenar:`,
  };

  const lineas: string[] = [encabezado[p.tipo], ''];

  MENU_ITEMS.forEach(item => {
    const ord = p.items[item.id];
    if (!ord || ord.cantidad === 0) return;
    const sabor  = item.categoria === 'alitas' && ord.sabor ? ` ${ord.sabor}` : '';
    const prefijo = ord.cantidad > 1 ? `${ord.cantidad}x ` : '';
    const precio  = ord.cantidad > 1 ? `L.${item.precio} c/u` : `L.${item.precio}`;
    lineas.push(`• ${prefijo}${item.nombre}${sabor} (${precio})`);
  });

  lineas.push('', `Subtotal: L.${p.total} 🍗`);

  if (p.tipo === 'delivery') {
    lineas.push('(+ costo de delivery de Mandaditos según tu distancia)');
    lineas.push('', `📍 Dirección: ${p.direccion}`);
    if (p.referencia.trim()) lineas.push(`   Referencia: ${p.referencia}`);
  }

  if (p.tipo === 'comer-aqui' && p.personas > 1) {
    lineas.push(`👥 Somos ${p.personas} personas`);
  }

  if (p.notas.trim()) lineas.push(`📝 Nota: ${p.notas.trim()}`);

  return `https://wa.me/50432462305?text=${encodeURIComponent(lineas.join('\n'))}`;
}

// ── Sub-componente: fila de item ──────────────────────────────────────
function ItemRow({
  item, cantidad, sabor, disponible, onCambiar, onSabor,
}: {
  item: ItemMenu;
  cantidad: number;
  sabor?: Sabor;
  disponible: boolean;
  onCambiar: (d: number) => void;
  onSabor: (s: Sabor) => void;
}) {
  const esAlita = item.categoria === 'alitas';

  return (
    <div className={`py-4 border-b border-white/5 last:border-0 transition-opacity ${!disponible ? 'opacity-35' : ''}`}>
      <div className="flex items-center gap-3">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-semibold text-sm leading-tight ${cantidad > 0 ? 'text-brand-cream' : 'text-brand-cream/70'}`}>
              {item.nombre}
            </p>
            {!disponible && (
              <span className="text-[9px] bg-brand-gray-800 text-brand-cream/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide shrink-0">
                Solo {item.dia}
              </span>
            )}
            {item.destacado && disponible && (
              <span className="text-[9px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-bold uppercase tracking-wide shrink-0">
                ⭐ Top
              </span>
            )}
          </div>
          <p className="text-brand-accent font-bold text-sm mt-0.5">L.{item.precio}</p>
        </div>

        {/* Contador */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onCambiar(-1)}
            disabled={cantidad === 0 || !disponible}
            aria-label="Reducir cantidad"
            className="w-8 h-8 rounded-full bg-brand-gray-800 hover:bg-brand-gray-700 text-brand-cream text-base font-bold disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer flex items-center justify-center"
          >−</button>
          <span className={`w-5 text-center font-bold text-sm tabular-nums ${cantidad > 0 ? 'text-brand-cream' : 'text-brand-cream/25'}`}>
            {cantidad}
          </span>
          <button
            onClick={() => onCambiar(1)}
            disabled={!disponible || cantidad >= 20}
            aria-label="Aumentar cantidad"
            className="w-8 h-8 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream text-base font-bold disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 cursor-pointer flex items-center justify-center"
          >+</button>
        </div>
      </div>

      {/* Selector de sabor — aparece cuando alitas tiene cantidad > 0 */}
      <AnimatePresence>
        {esAlita && cantidad > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-brand-cream/35 text-xs shrink-0">Salsa:</p>
              {(['BB', 'Búfalo'] as Sabor[]).map(s => (
                <button
                  key={s}
                  onClick={() => onSabor(s)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    sabor === s
                      ? 'bg-brand-primary text-brand-cream'
                      : 'bg-brand-gray-800 text-brand-cream/60 hover:text-brand-cream'
                  }`}
                >
                  {s}
                </button>
              ))}
              {!sabor && (
                <span className="text-brand-accent text-xs animate-pulse">← elige una</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Icono WhatsApp ────────────────────────────────────────────────────
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── Componente principal ──────────────────────────────────────────────
export function OrderBuilder() {
  const [tipo, setTipo]           = useState<TipoOrden | null>(null);
  const [items, setItems]         = useState<Record<string, ItemOrden>>({});
  const [catActiva, setCatActiva] = useState<Categoria | 'todos'>('todos');
  const [nombre, setNombre]       = useState('');
  const [direccion, setDireccion] = useState('');
  const [referencia, setReferencia] = useState('');
  const [personas, setPersonas]   = useState(2);
  const [notas, setNotas]         = useState('');

  const abierto = estaAbierto();

  const itemsFiltrados = useMemo(() =>
    catActiva === 'todos'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(i => i.categoria === catActiva),
    [catActiva]
  );

  const { total, itemCount, sinSabor } = useMemo(() => {
    let total = 0, itemCount = 0, sinSabor = false;
    Object.entries(items).forEach(([id, ord]) => {
      if (!ord.cantidad) return;
      const item = MENU_ITEMS.find(i => i.id === id);
      if (!item) return;
      total += item.precio * ord.cantidad;
      itemCount += ord.cantidad;
      if (item.categoria === 'alitas' && !ord.sabor) sinSabor = true;
    });
    return { total, itemCount, sinSabor };
  }, [items]);

  function cambiarCantidad(id: string, delta: number) {
    setItems(prev => {
      const actual = prev[id]?.cantidad ?? 0;
      const nueva  = Math.max(0, Math.min(20, actual + delta));
      return { ...prev, [id]: { ...prev[id], cantidad: nueva } };
    });
  }

  function cambiarSabor(id: string, sabor: Sabor) {
    setItems(prev => ({ ...prev, [id]: { ...prev[id], sabor } }));
  }

  // Validación progresiva del CTA
  const puedeEnviar =
    tipo !== null &&
    itemCount > 0 &&
    !sinSabor &&
    nombre.trim().length >= 2 &&
    (tipo !== 'delivery' || direccion.trim().length >= 5);

  const motivoInhabilitar =
    !tipo           ? 'Elige cómo querés tu orden'     :
    itemCount === 0 ? 'Agregá algo a tu pedido'         :
    sinSabor        ? 'Elige la salsa para tus alitas'  :
    nombre.trim().length < 2 ? 'Escribí tu nombre'      :
    tipo === 'delivery' && direccion.trim().length < 5
                    ? 'Escribí tu dirección'             :
    null;

  const waLink = puedeEnviar
    ? buildWaMsg({ tipo: tipo!, nombre, direccion, referencia, personas, notas, items, total })
    : '#';

  return (
    <section className="bg-brand-dark border-t border-white/5 py-14 px-4">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Encabezado */}
        <div className="text-center">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Listo para ordenar
          </p>
          <h2 className="font-display text-5xl sm:text-6xl text-brand-cream tracking-wider leading-none">
            ARMA TU PEDIDO
          </h2>
          <p className="text-brand-cream/40 text-sm mt-3 max-w-sm mx-auto">
            Elegí qué querés, cómo lo querés, y te abrimos WhatsApp con todo listo
          </p>
        </div>

        {/* Aviso fuera de horario */}
        {!abierto && (
          <div className="bg-brand-gray-900 border border-brand-accent/30 rounded-2xl px-5 py-4 text-center">
            <p className="text-brand-accent font-bold text-sm">🕐 Abrimos a la 1:00 PM</p>
            <p className="text-brand-cream/45 text-xs mt-1">
              Podés armar tu pedido ahora y enviarlo cuando abramos
            </p>
          </div>
        )}

        {/* Paso 1 — Tipo de orden */}
        <div>
          <p className="text-brand-cream/45 text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-primary text-brand-cream text-[10px] flex items-center justify-center font-black shrink-0">1</span>
            ¿Cómo lo querés?
          </p>
          <div className="grid grid-cols-3 gap-3">
            {TIPOS.map(t => (
              <button
                key={t.id}
                onClick={() => setTipo(t.id)}
                className={[
                  'flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center',
                  tipo === t.id
                    ? 'border-brand-primary bg-brand-primary/15 text-brand-cream'
                    : 'border-white/8 bg-brand-gray-900 text-brand-cream/55 hover:border-white/20 hover:text-brand-cream',
                ].join(' ')}
              >
                <span className="text-2xl">{t.emoji}</span>
                <p className="font-bold text-xs leading-tight">{t.label}</p>
                <p className={`text-[10px] leading-tight ${tipo === t.id ? 'text-brand-cream/55' : 'text-brand-cream/25'}`}>
                  {t.sub}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Paso 2 — Items */}
        <div>
          <p className="text-brand-cream/45 text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-primary text-brand-cream text-[10px] flex items-center justify-center font-black shrink-0">2</span>
            ¿Qué querés pedir?
          </p>

          {/* Tabs de categoría */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 mb-3">
            {CATEGORIAS.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCatActiva(cat.id)}
                className={[
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                  catActiva === cat.id
                    ? 'bg-brand-primary text-brand-cream'
                    : 'bg-brand-gray-800 text-brand-cream/55 hover:text-brand-cream',
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Lista de ítems */}
          <div className="bg-brand-gray-900 rounded-2xl px-5 py-2">
            <AnimatePresence mode="popLayout">
              {itemsFiltrados.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ItemRow
                    item={item}
                    cantidad={items[item.id]?.cantidad ?? 0}
                    sabor={items[item.id]?.sabor}
                    disponible={isDisponible(item)}
                    onCambiar={d => cambiarCantidad(item.id, d)}
                    onSabor={s => cambiarSabor(item.id, s)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Paso 3 — Detalles (aparece cuando hay ítems) */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-brand-cream/45 text-xs uppercase tracking-widest font-bold mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-primary text-brand-cream text-[10px] flex items-center justify-center font-black shrink-0">3</span>
                Tus datos
              </p>
              <div className="space-y-4">

                {/* Nombre — siempre */}
                <div>
                  <label className="text-brand-cream/45 text-xs uppercase tracking-wider block mb-1.5">
                    Tu nombre <span className="text-brand-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="¿Cómo te llamás?"
                    className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                  />
                </div>

                {/* Dirección — solo delivery */}
                {tipo === 'delivery' && (
                  <>
                    <div>
                      <label className="text-brand-cream/45 text-xs uppercase tracking-wider block mb-1.5">
                        Dirección <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}
                        placeholder="Ej: Barrio San José, frente a la cancha"
                        className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-brand-cream/45 text-xs uppercase tracking-wider block mb-1.5">
                        Punto de referencia <span className="text-brand-cream/25">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={referencia}
                        onChange={e => setReferencia(e.target.value)}
                        placeholder="Ej: Casa color verde, portón negro"
                        className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors"
                      />
                    </div>
                    <div className="bg-brand-gray-900 border border-brand-accent/20 rounded-xl px-4 py-3">
                      <p className="text-brand-accent text-xs font-bold">🛵 Sobre el costo del delivery</p>
                      <p className="text-brand-cream/45 text-xs mt-1 leading-relaxed">
                        El delivery lo gestiona Mandaditos — ellos cobran su tarifa según tu distancia.
                        Ese costo <strong className="text-brand-cream/60">no está incluido</strong> en el total de tu pedido.
                      </p>
                    </div>
                  </>
                )}

                {/* Personas — solo comer aquí */}
                {tipo === 'comer-aqui' && (
                  <div>
                    <label className="text-brand-cream/45 text-xs uppercase tracking-wider block mb-3">
                      ¿Cuántos son?
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setPersonas(p => Math.max(1, p - 1))}
                        disabled={personas === 1}
                        className="w-10 h-10 rounded-full bg-brand-gray-800 text-brand-cream font-bold text-lg disabled:opacity-25 transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                      >−</button>
                      <span className="font-display text-4xl text-brand-cream w-12 text-center leading-none">{personas}</span>
                      <button
                        onClick={() => setPersonas(p => Math.min(30, p + 1))}
                        className="w-10 h-10 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream font-bold text-lg transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                      >+</button>
                      <span className="text-brand-cream/40 text-sm">{personas === 1 ? 'persona' : 'personas'}</span>
                    </div>
                  </div>
                )}

                {/* Notas — siempre, opcional */}
                <div>
                  <label className="text-brand-cream/45 text-xs uppercase tracking-wider block mb-1.5">
                    Notas especiales <span className="text-brand-cream/20">(opcional)</span>
                  </label>
                  <textarea
                    value={notas}
                    onChange={e => setNotas(e.target.value)}
                    placeholder="Sin encurtido, salsa aparte, alergias, horario de llegada..."
                    rows={2}
                    className="w-full bg-brand-gray-900 border border-white/10 rounded-xl px-4 py-3 text-brand-cream text-sm placeholder:text-brand-cream/20 focus:outline-none focus:border-brand-primary/60 transition-colors resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA final */}
        <div>
          {/* Resumen de ítems */}
          {itemCount > 0 && (
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-brand-cream/40 text-sm">
                {itemCount} {itemCount === 1 ? 'ítem' : 'ítems'} seleccionados
              </p>
              <p className="font-display text-3xl text-brand-accent tracking-wider">
                L.{total}
              </p>
            </div>
          )}

          {puedeEnviar ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full font-bold text-sm tracking-wider uppercase text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#25D366' }}
            >
              <WaIcon />
              {abierto ? `Pedir ahora · L.${total}` : `Pre-ordenar · L.${total}`}
            </a>
          ) : (
            <button
              disabled
              className="w-full py-4 rounded-full font-bold text-sm tracking-wider uppercase text-brand-cream/30 bg-brand-gray-800 cursor-not-allowed"
            >
              {motivoInhabilitar ?? 'Completá tu pedido'}
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
