'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Phase = 'idle' | 'burning' | 'flash' | 'revealed';

export function HeroReveal() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('ab-hero-revealed')) setPhase('revealed');
  }, []);

  function handleChoice() {
    if (phase !== 'idle') return;
    setPhase('burning');
    setTimeout(() => setPhase('flash'), 420);
    setTimeout(() => {
      setPhase('revealed');
      sessionStorage.setItem('ab-hero-revealed', '1');
    }, 750);
  }

  if (!mounted) return null;

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-24 pb-36 min-h-screen flex flex-col items-center justify-center">

      {/* Flash de impacto */}
      {phase === 'flash' && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #FFB703 0%, #E85D04 40%, #C1121F 70%, transparent 100%)',
            animation: 'screen-flash 0.35s ease-out forwards',
          }}
        />
      )}

      {/* ── IDLE / BURNING: pregunta ── */}
      {(phase === 'idle' || phase === 'burning') && (
        <div className="flex flex-col items-center gap-10 text-center">
          <div style={{ animation: 'question-fade-in 0.8s ease 0.2s both' }}>
            <p className="text-brand-accent/60 text-xs sm:text-sm uppercase tracking-[0.35em] mb-5 font-semibold">
              Solo hay una respuesta correcta
            </p>
            <h2 className="font-display text-[clamp(3rem,10vw,6rem)] text-brand-cream leading-[0.95] tracking-wider">
              ¿A las buenas…
            </h2>
            <h2 className="font-display text-[clamp(3rem,10vw,6rem)] text-brand-cream leading-[0.95] tracking-wider">
              …o a las malas?
            </h2>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{ animation: 'btn-appear 0.6s ease 0.9s both' }}
          >
            <button
              onClick={handleChoice}
              style={phase === 'burning' ? { animation: 'btn-ignite 0.42s ease forwards' } : {}}
              className="px-10 py-4 border border-brand-cream/25 text-brand-cream font-display text-2xl tracking-widest hover:border-brand-cream/60 transition-colors cursor-pointer"
            >
              A LAS BUENAS
            </button>
            <button
              onClick={handleChoice}
              style={phase === 'burning' ? { animation: 'btn-ignite 0.42s ease 0.07s forwards' } : {}}
              className="px-10 py-4 bg-brand-primary text-brand-cream font-display text-2xl tracking-widest hover:bg-red-700 transition-colors cursor-pointer"
            >
              A LAS MALAS
            </button>
          </div>
        </div>
      )}

      {/* ── REVEALED: logo + botones ── */}
      {phase === 'revealed' && (
        <div
          className="flex flex-col items-center text-center w-full"
          style={{ animation: 'impact-shake 0.45s ease both' }}
        >
          {/* Logo */}
          <div
            className="overflow-hidden"
            style={{ animation: 'title-impact 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            <Image
              src="/logo-hero.png"
              alt="Alas Bravas"
              width={520}
              height={520}
              priority
              className="w-[260px] sm:w-[360px] md:w-[460px] h-auto drop-shadow-[0_0_60px_rgba(232,93,4,0.6)]"
            />
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            style={{ animation: 'reveal-fade-up 0.5s ease 0.6s both' }}
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
        </div>
      )}
    </div>
  );
}
