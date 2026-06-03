'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Phase = 'idle' | 'burning' | 'flash' | 'revealed';
type Choice = 'buenas' | 'malas' | null;

const MESSAGES: Record<'buenas' | 'malas', string> = {
  buenas: 'Y mira adónde llegaste. 😏',
  malas:  'Con esa energía, vas a necesitar más de una orden. 🔥',
};

export function HeroReveal() {
  const [phase, setPhase]   = useState<Phase>('idle');
  const [choice, setChoice] = useState<Choice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('ab-hero-revealed')) setPhase('revealed');
  }, []);

  function handleChoice(picked: 'buenas' | 'malas') {
    if (phase !== 'idle') return;
    setChoice(picked);
    setPhase('burning');

    // Botones se expanden y desaparecen → flash
    setTimeout(() => setPhase('flash'), 420);
    // Flash → título revienta
    setTimeout(() => {
      setPhase('revealed');
      sessionStorage.setItem('ab-hero-revealed', '1');
    }, 750);
  }

  if (!mounted) return null;

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-24 pb-36 min-h-screen flex flex-col items-center justify-center">

      {/* ── Flash de impacto ── */}
      {phase === 'flash' && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #FFB703 0%, #E85D04 40%, #C1121F 70%, transparent 100%)',
            animation: 'screen-flash 0.35s ease-out forwards',
          }}
        />
      )}

      {/* ── ESTADO IDLE + BURNING: pregunta y botones ── */}
      {(phase === 'idle' || phase === 'burning') && (
        <div className="flex flex-col items-center gap-10 text-center">

          <div style={{ animation: 'question-fade-in 0.8s ease 0.2s both' }}>
            <p className="text-brand-accent/70 text-xs sm:text-sm uppercase tracking-[0.35em] mb-4 font-semibold">
              Solo hay una respuesta correcta
            </p>
            <h2 className="font-display text-[clamp(3rem,10vw,6.5rem)] text-brand-cream leading-[0.9] tracking-wider">
              ¿A las buenas…
            </h2>
            <h2 className="font-display text-[clamp(3rem,10vw,6.5rem)] text-brand-cream leading-[0.9] tracking-wider">
              …o a las malas?
            </h2>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-5"
            style={{ animation: 'btn-appear 0.6s ease 0.9s both' }}
          >
            {/* A las buenas */}
            <button
              onClick={() => handleChoice('buenas')}
              style={phase === 'burning' && choice === 'buenas'
                ? { animation: 'btn-ignite 0.42s ease forwards' }
                : phase === 'burning' && choice === 'malas'
                ? { animation: 'btn-ignite 0.42s ease 0.07s forwards' }
                : {}}
              className="relative group px-10 py-5 border-2 border-brand-cream/25 text-brand-cream font-display text-2xl sm:text-3xl tracking-widest hover:border-brand-cream/60 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">A LAS BUENAS</span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* A las malas */}
            <button
              onClick={() => handleChoice('malas')}
              style={phase === 'burning' && choice === 'malas'
                ? { animation: 'btn-ignite 0.42s ease forwards' }
                : phase === 'burning' && choice === 'buenas'
                ? { animation: 'btn-ignite 0.42s ease 0.07s forwards' }
                : {}}
              className="relative group px-10 py-5 bg-brand-primary text-brand-cream font-display text-2xl sm:text-3xl tracking-widest hover:bg-red-700 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">A LAS MALAS</span>
              <span className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      )}

      {/* ── ESTADO REVEALED: título + contenido rediseñado ── */}
      {phase === 'revealed' && (
        <div
          className="flex flex-col items-center text-center w-full"
          style={{ animation: 'impact-shake 0.45s ease both' }}
        >
          {/* Título que revienta */}
          <div className="overflow-hidden mb-1">
            <h1
              className="font-display text-[clamp(5.5rem,20vw,13rem)] text-brand-cream leading-none tracking-wider"
              style={{ animation: 'title-impact 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
            >
              ALAS
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1
              className="font-display text-[clamp(5.5rem,20vw,13rem)] text-brand-primary leading-none tracking-wider"
              style={{
                animation: 'title-impact 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both, glow-pulse 2.5s ease-in-out 0.8s infinite',
              }}
            >
              BRAVAS
            </h1>
          </div>

          {/* Mensaje personalizado según elección */}
          {choice && (
            <p
              className="text-brand-accent font-semibold text-sm sm:text-base uppercase tracking-[0.25em] mb-6"
              style={{ animation: 'reveal-fade-up 0.5s ease 0.55s both' }}
            >
              {MESSAGES[choice]}
            </p>
          )}

          {/* Divisor */}
          <div
            className="w-16 h-px bg-brand-primary/60 mb-6"
            style={{ animation: 'reveal-fade-up 0.5s ease 0.65s both' }}
          />

          {/* Descripción — reescrita con más actitud */}
          <p
            className="text-brand-cream/70 text-base sm:text-lg mb-10 leading-relaxed max-w-md mx-auto"
            style={{ animation: 'reveal-fade-up 0.5s ease 0.75s both' }}
          >
            Aquí no hay término medio.<br />
            Las alitas que te hacen dudar si pedir más…<br />
            <span className="text-brand-cream/90 font-semibold">y siempre terminas pidiendo más.</span>
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: 'reveal-fade-up 0.5s ease 0.9s both' }}
          >
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-primary hover:bg-red-700 text-brand-cream font-display text-xl tracking-widest uppercase transition-colors duration-200"
            >
              Ver el Menú
            </Link>
            <Link
              href="/reservaciones"
              className="inline-flex items-center justify-center px-10 py-4 border border-brand-cream/30 hover:border-brand-accent text-brand-cream hover:text-brand-accent font-display text-xl tracking-widest uppercase transition-colors duration-200"
            >
              Reservar
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{ animation: 'hero-fade-in 0.6s ease 1.4s both' }}
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
