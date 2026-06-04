'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRICE_12       = 320;
const PRICE_6        = 180;
const PRICE_PROMO_14 = 300;

function calcular(personas: number) {
  const total        = personas * 6;
  const packs12      = Math.floor(total / 12);
  const resto        = total % 12;
  const packs6       = resto > 0 ? 1 : 0;
  const precio       = packs12 * PRICE_12 + packs6 * PRICE_6;
  const alitas       = packs12 * 12 + packs6 * 6;
  const porAlita     = Math.round(precio / alitas);
  return { packs12, packs6, precio, alitas, porAlita };
}

// Detecta en cliente si hoy es día de promo (mié=3 o jue=4)
function esPromoDia() {
  const d = new Date().getDay();
  return d === 3 || d === 4;
}

function buildWaMsg(personas: number, packs12: number, packs6: number, precio: number) {
  const lineas = [
    `Hola 👋 Somos ${personas} ${personas === 1 ? 'persona' : 'personas'} y quisiéramos pedir:`,
    ...(packs12 > 0 ? [`• ${packs12} ${packs12 === 1 ? 'orden' : 'órdenes'} de 12 Alitas (L.${PRICE_12} c/u)`] : []),
    ...(packs6  > 0 ? [`• 1 orden de 6 Alitas (L.${PRICE_6})`] : []),
    `\nTotal estimado: L.${precio} 🍗`,
  ];
  return `https://wa.me/50432462305?text=${encodeURIComponent(lineas.join('\n'))}`;
}

// Visualización de personas como emojis (máx 6 visible)
function PersonasEmoji({ n }: { n: number }) {
  const visible = Math.min(n, 6);
  const extra   = n > 6 ? n - 6 : 0;
  return (
    <div className="flex items-center justify-center gap-0.5 h-8">
      <AnimatePresence mode="popLayout">
        {Array.from({ length: visible }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, delay: i * 0.025 }}
            className="text-xl leading-none select-none"
          >
            🙋
          </motion.span>
        ))}
        {extra > 0 && (
          <motion.span
            key="extra"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-brand-cream/40 text-sm ml-1"
          >
            +{extra}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function WingCalculator() {
  const [personas, setPersonas] = useState(2);
  const promoDia = esPromoDia();

  const { packs12, packs6, precio, alitas, porAlita } = calcular(personas);

  // Mostrar hint de promo cuando sale más caro que la promo y se obtendrían menos alitas
  const hintPromo = promoDia && precio >= PRICE_PROMO_14 && alitas <= 12;
  const alitasExtra = hintPromo ? 14 - alitas : 0;
  const ahorro      = hintPromo ? precio - PRICE_PROMO_14 : 0;

  const waLink = buildWaMsg(personas, packs12, packs6, precio);

  function cambiar(delta: number) {
    setPersonas(p => Math.min(20, Math.max(1, p + delta)));
  }

  return (
    <section
      className="relative overflow-hidden py-16 px-4"
      style={{ background: 'linear-gradient(180deg, #0D0602 0%, #180900 50%, #0D0602 100%)' }}
    >
      {/* Emoji decorativo de fondo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] text-[18rem] leading-none"
        aria-hidden="true"
      >
        🍗
      </div>

      <div className="relative max-w-lg mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-10">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.35em] mb-3">
            ¿Cuántos son hoy?
          </p>
          <h2 className="font-display text-5xl sm:text-6xl text-brand-cream tracking-wider leading-none">
            CALCULA TU ORDEN
          </h2>
          <p className="text-brand-cream/40 text-sm mt-3 max-w-xs mx-auto">
            Dinos cuántos son y te decimos exactamente qué pedir
          </p>
        </div>

        {/* Selector ± */}
        <div className="flex items-center justify-center gap-6 mb-3">
          {/* Restar — gris neutro */}
          <button
            onClick={() => cambiar(-1)}
            disabled={personas === 1}
            aria-label="Reducir personas"
            className="w-14 h-14 rounded-full bg-brand-gray-800 hover:bg-brand-gray-700 text-brand-cream text-2xl font-bold disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer active:scale-90"
          >
            −
          </button>

          {/* Número animado */}
          <div className="text-center w-28">
            <AnimatePresence mode="wait">
              <motion.span
                key={personas}
                initial={{ opacity: 0, y: -14, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.85 }}
                transition={{ duration: 0.14 }}
                className="font-display text-[5.5rem] text-brand-cream leading-none block"
              >
                {personas}
              </motion.span>
            </AnimatePresence>
            <p className="text-brand-cream/35 text-xs uppercase tracking-widest -mt-1">
              {personas === 1 ? 'persona' : 'personas'}
            </p>
          </div>

          {/* Sumar — rojo prominente (aumenta ticket promedio) */}
          <button
            onClick={() => cambiar(1)}
            disabled={personas === 20}
            aria-label="Agregar persona"
            className="w-14 h-14 rounded-full bg-brand-primary hover:bg-red-700 text-brand-cream text-2xl font-bold disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer active:scale-90 shadow-lg shadow-brand-primary/25"
          >
            +
          </button>
        </div>

        {/* Emojis de personas */}
        <PersonasEmoji n={personas} />

        {/* Tarjeta de resultado — se pulsa al cambiar */}
        <motion.div
          key={precio}
          initial={{ scale: 0.97, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="mt-8 rounded-2xl border border-brand-primary/30 bg-brand-gray-900 overflow-hidden"
        >
          {/* Header de la tarjeta */}
          <div className="bg-brand-primary/12 border-b border-brand-primary/20 px-6 py-3 text-center">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">
              Tu pedido perfecto 🎯
            </p>
          </div>

          <div className="p-6">

            {/* Detalle de órdenes */}
            <div className="space-y-4 mb-5">
              {packs12 > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍗</span>
                    <div>
                      <p className="text-brand-cream font-semibold text-sm leading-tight">
                        {packs12} {packs12 === 1 ? 'orden' : 'órdenes'} de 12 Alitas
                      </p>
                      <p className="text-brand-cream/35 text-xs mt-0.5">BB o Búfalo a tu gusto</p>
                    </div>
                  </div>
                  <span className="text-brand-cream/45 text-sm tabular-nums">L.{PRICE_12}{packs12 > 1 ? ' c/u' : ''}</span>
                </div>
              )}
              {packs6 > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍗</span>
                    <div>
                      <p className="text-brand-cream font-semibold text-sm leading-tight">
                        1 orden de 6 Alitas
                      </p>
                      <p className="text-brand-cream/35 text-xs mt-0.5">BB o Búfalo a tu gusto</p>
                    </div>
                  </div>
                  <span className="text-brand-cream/45 text-sm tabular-nums">L.{PRICE_6}</span>
                </div>
              )}
            </div>

            {/* Total + anclaje de precio por alita */}
            <div className="border-t border-white/8 pt-5 mb-5 flex items-end justify-between">
              <div>
                <p className="text-brand-cream/30 text-xs uppercase tracking-widest mb-1">Total estimado</p>
                <p className="font-display text-5xl text-brand-accent tracking-wider leading-none">
                  L.{precio}
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-brand-cream/30 text-xs">{alitas} alitas · 6 por persona</p>
                <p className="text-brand-secondary text-xs font-bold">
                  solo L.{porAlita} por alita 🔥
                </p>
              </div>
            </div>

            {/* Hint de promo mié/jue — solo cuando es mejor deal */}
            {hintPromo && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl px-4 py-3 mb-5"
              >
                <p className="text-brand-accent text-xs font-bold leading-tight">
                  💡 HOY: 14 alitas por L.{PRICE_PROMO_14}
                </p>
                <p className="text-brand-cream/50 text-xs mt-1">
                  {alitasExtra} alitas más y encima ahorras L.{ahorro} — pide la promo del día
                </p>
              </motion.div>
            )}

            {/* CTA WhatsApp con total pre-llenado */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#25D366' }}
            >
              <WhatsAppIcon />
              Pedir ahora · L.{precio}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
