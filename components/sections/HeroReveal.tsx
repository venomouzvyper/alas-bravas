'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Phase = 'idle' | 'burning' | 'revealed';

export function HeroReveal() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('ab-hero-revealed')) {
      setPhase('revealed');
    }
  }, []);

  function handleChoice() {
    if (phase !== 'idle') return;
    setPhase('burning');
    setTimeout(() => {
      setPhase('revealed');
      sessionStorage.setItem('ab-hero-revealed', '1');
    }, 600);
  }

  // Evita flash de contenido antes de montar
  if (!mounted) return null;

  return (
    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-36 min-h-screen flex flex-col items-center justify-center">

      {/* ── ESTADO IDLE: pregunta + botones ── */}
      {(phase === 'idle' || phase === 'burning') && (
        <div className="flex flex-col items-center gap-8">
          {/* Pregunta */}
          <div style={{ animation: 'question-fade-in 0.7s ease both' }}>
            <p className="text-brand-cream/50 font-barlow text-sm sm:text-base uppercase tracking-[0.3em] mb-2">
              Solo hay una respuesta a la pregunta:
            </p>
            <h2 className="font-display text-[clamp(2.4rem,8vw,5rem)] text-brand-cream leading-tight tracking-wider">
              ¿A las buenas…
            </h2>
            <h2 className="font-display text-[clamp(2.4rem,8vw,5rem)] text-brand-cream leading-tight tracking-wider">
              …o a las malas?
            </h2>
          </div>

          {/* Botones */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: 'btn-appear 0.6s ease 0.5s both' }}
          >
            <button
              onClick={handleChoice}
              style={phase === 'burning' ? { animation: 'btn-burn 0.55s ease forwards' } : {}}
              className="px-10 py-4 rounded-sm border-2 border-brand-cream/30 text-brand-cream font-display text-2xl tracking-widest hover:border-brand-cream/70 hover:text-brand-cream transition-all duration-200 cursor-pointer"
            >
              A LAS BUENAS
            </button>
            <button
              onClick={handleChoice}
              style={phase === 'burning' ? { animation: 'btn-burn 0.55s ease 0.06s forwards' } : {}}
              className="px-10 py-4 rounded-sm bg-brand-primary text-brand-cream font-display text-2xl tracking-widest hover:bg-red-700 transition-all duration-200 cursor-pointer"
            >
              A LAS MALAS
            </button>
          </div>
        </div>
      )}

      {/* ── ESTADO REVEALED: título + slogan + CTAs ── */}
      {phase === 'revealed' && (
        <div className="flex flex-col items-center gap-0 w-full">
          {/* Título que revienta */}
          <div className="overflow-hidden">
            <h1
              className="font-display text-[clamp(5rem,18vw,11rem)] text-brand-cream leading-none tracking-wider"
              style={{ animation: 'title-crash 0.75s cubic-bezier(0.22,1,0.36,1) both' }}
            >
              ALITAS
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1
              className="font-display text-[clamp(5rem,18vw,11rem)] text-brand-primary leading-none tracking-wider"
              style={{ animation: 'title-crash 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
            >
              BRAVAS
            </h1>
          </div>

          {/* Slogan */}
          <p
            className="text-brand-cream/75 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg mx-auto"
            style={{ animation: 'reveal-fade-up 0.6s ease 0.5s both' }}
          >
            Crujientes por fuera. Explosivas por dentro.<br />
            Salsas que te desafían a terminarlas.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: 'reveal-fade-up 0.6s ease 0.7s both' }}
          >
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-sm px-8 py-4 text-lg bg-brand-primary hover:bg-red-700 text-brand-cream font-bold tracking-wide uppercase transition-colors duration-200"
            >
              Ver el Menú
            </Link>
            <Link
              href="/reservaciones"
              className="inline-flex items-center justify-center rounded-sm px-8 py-4 text-lg border border-brand-cream/40 hover:border-brand-accent text-brand-cream hover:text-brand-accent transition-colors duration-200"
            >
              Hacer Reservación
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{ animation: 'hero-fade-in 0.6s ease 1.2s both' }}
          >
            <div
              className="w-5 h-8 rounded-full border-2 border-brand-cream/20 flex items-start justify-center pt-1.5"
              style={{ animation: 'hero-bounce 1.6s ease-in-out infinite' }}
            >
              <div className="w-1 h-1.5 rounded-full bg-brand-cream/40" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
