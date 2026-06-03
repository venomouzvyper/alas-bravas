'use client';

import { useState } from 'react';

const PRICE_12 = 320;
const PRICE_6  = 180;

function calcular(personas: number, hambre: boolean) {
  const porPersona = hambre ? 8 : 6;
  const total = personas * porPersona;
  const packs12 = Math.floor(total / 12);
  const resto   = total % 12;
  const packs6  = resto > 0 ? 1 : 0;
  const precio  = packs12 * PRICE_12 + packs6 * PRICE_6;
  const alitas  = packs12 * 12 + packs6 * 6;
  return { packs12, packs6, precio, alitas };
}

export function WingCalculator() {
  const [personas, setPersonas] = useState(2);
  const [hambre, setHambre]     = useState(false);

  const { packs12, packs6, precio, alitas } = calcular(personas, hambre);

  function cambiar(delta: number) {
    setPersonas(p => Math.min(20, Math.max(1, p + delta)));
  }

  return (
    <section className="bg-brand-dark border-y border-white/5 py-14 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Título */}
        <div className="text-center mb-10">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.35em] mb-2">
            Calculadora de alitas
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-cream tracking-wider">
            ¿CUÁNTOS SON?
          </h2>
        </div>

        {/* Selector de personas */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <button
            onClick={() => cambiar(-1)}
            disabled={personas === 1}
            className="w-14 h-14 rounded-full border border-white/20 text-brand-cream text-2xl font-bold hover:border-brand-primary hover:text-brand-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            −
          </button>

          <div className="text-center w-24">
            <span className="font-display text-[5rem] text-brand-cream leading-none">
              {personas}
            </span>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
              {personas === 1 ? 'persona' : 'personas'}
            </p>
          </div>

          <button
            onClick={() => cambiar(1)}
            disabled={personas === 20}
            className="w-14 h-14 rounded-full border border-white/20 text-brand-cream text-2xl font-bold hover:border-brand-primary hover:text-brand-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Toggle hambre */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setHambre(h => !h)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold transition-all cursor-pointer ${
              hambre
                ? 'border-brand-secondary bg-brand-secondary/15 text-brand-secondary'
                : 'border-white/15 text-white/40 hover:border-white/30 hover:text-white/60'
            }`}
          >
            <span>🔥</span>
            <span>Venimos con MUCHA hambre</span>
          </button>
        </div>

        {/* Recomendación */}
        <div className="rounded-sm border border-brand-primary/30 bg-brand-gray-900 p-6 sm:p-8">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-5 text-center">
            Recomendamos pedir
          </p>

          <div className="space-y-3 mb-6">
            {packs12 > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍗</span>
                  <span className="text-brand-cream font-semibold">
                    {packs12} {packs12 === 1 ? 'orden' : 'órdenes'} de 12 Alitas
                  </span>
                </div>
                <span className="text-white/40 text-sm">
                  L.{PRICE_12} c/u
                </span>
              </div>
            )}
            {packs6 > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍗</span>
                  <span className="text-brand-cream font-semibold">
                    1 orden de 6 Alitas
                  </span>
                </div>
                <span className="text-white/40 text-sm">
                  L.{PRICE_6}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-5 flex items-end justify-between">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest">Total estimado</p>
              <p className="font-display text-4xl text-brand-accent tracking-wider mt-1">
                L.{precio}
              </p>
            </div>
            <p className="text-white/30 text-sm text-right">
              ~{alitas} alitas<br />en total
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
