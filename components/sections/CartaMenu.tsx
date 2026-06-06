'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ItemMenu } from '@/lib/menu-data';

// ── Secciones ─────────────────────────────────────────────────────

const SECCIONES = [
  { id: 'promos',  icon: '⚡', label: 'Promos',  tema: 'oro'    as const },
  { id: 'alitas',  icon: '🍗', label: 'Alitas',  tema: 'fuego'  as const },
  { id: 'carnes',  icon: '🥩', label: 'Carnes',  tema: 'brasa'  as const },
  { id: 'tajadas', icon: '🍌', label: 'Tajadas', tema: 'tierra' as const },
  { id: 'pupusas', icon: '🫓', label: 'Pupusas', tema: 'tierra' as const },
  { id: 'bebidas', icon: '❄️', label: 'Bebidas', tema: 'hielo'  as const },
];

type Tema = 'fuego' | 'brasa' | 'tierra' | 'hielo' | 'oro';

interface TemaConfig {
  sectionBg: string;
  headerBg: string;
  headerGlow: string;
  titleColor: string;
  tagline: string;
  taglineColor: string;
  accentColor: string;
  cardBg: string;
  cardBorder: string;
}

const TEMAS: Record<Tema, TemaConfig> = {
  fuego: {
    sectionBg: '#1A0400',
    headerBg: 'linear-gradient(175deg, #3D0C00 0%, #A01015 45%, #1A0400 100%)',
    headerGlow: 'radial-gradient(ellipse at 50% -20%, rgba(232,93,4,0.55) 0%, transparent 65%)',
    titleColor: '#FFB703',
    tagline: 'Crujientes. Jugosas. Bravas.',
    taglineColor: 'rgba(255,183,3,0.65)',
    accentColor: '#FFB703',
    cardBg: 'rgba(193,18,31,0.07)',
    cardBorder: 'rgba(193,18,31,0.28)',
  },
  brasa: {
    sectionBg: '#120800',
    headerBg: 'linear-gradient(175deg, #1A0F00 0%, #4A2000 45%, #120800 100%)',
    headerGlow: 'radial-gradient(ellipse at 50% -20%, rgba(139,58,0,0.55) 0%, transparent 65%)',
    titleColor: '#E85D04',
    tagline: 'A las brasas, como debe ser.',
    taglineColor: 'rgba(232,93,4,0.65)',
    accentColor: '#E85D04',
    cardBg: 'rgba(232,93,4,0.05)',
    cardBorder: 'rgba(232,93,4,0.22)',
  },
  tierra: {
    sectionBg: '#1A1000',
    headerBg: 'linear-gradient(175deg, #2D1B00 0%, #5A3500 45%, #1A1000 100%)',
    headerGlow: 'radial-gradient(ellipse at 50% -20%, rgba(212,160,23,0.4) 0%, transparent 65%)',
    titleColor: '#D4A017',
    tagline: 'El complemento perfecto.',
    taglineColor: 'rgba(212,160,23,0.65)',
    accentColor: '#D4A017',
    cardBg: 'rgba(212,160,23,0.05)',
    cardBorder: 'rgba(212,160,23,0.2)',
  },
  hielo: {
    sectionBg: '#071018',
    headerBg: 'linear-gradient(175deg, #041020 0%, #0D2540 45%, #071018 100%)',
    headerGlow: 'radial-gradient(ellipse at 50% -20%, rgba(0,180,216,0.45) 0%, transparent 65%)',
    titleColor: '#CAF0F8',
    tagline: 'Frío que quema.',
    taglineColor: 'rgba(202,240,248,0.55)',
    accentColor: '#00B4D8',
    cardBg: 'rgba(255,255,255,0.04)',
    cardBorder: 'rgba(0,180,216,0.22)',
  },
  oro: {
    sectionBg: '#0D0A00',
    headerBg: 'linear-gradient(175deg, #100C00 0%, #1F1600 45%, #0D0A00 100%)',
    headerGlow: 'radial-gradient(ellipse at 50% -20%, rgba(255,183,3,0.35) 0%, transparent 65%)',
    titleColor: '#FFB703',
    tagline: 'La razón por la que volvés.',
    taglineColor: 'rgba(255,183,3,0.55)',
    accentColor: '#FFB703',
    cardBg: 'rgba(255,183,3,0.06)',
    cardBorder: 'rgba(255,183,3,0.28)',
  },
};

// ── Encabezado especial: Las Promos Más Bravas ────────────────────

const SPARKLES = [
  { char: '✦', top: '18%', left: '11%',  delay: '0s',    size: '1rem'   },
  { char: '✧', top: '13%', left: '83%',  delay: '0.8s',  size: '0.8rem' },
  { char: '✦', top: '66%', left: '5%',   delay: '1.5s',  size: '0.7rem' },
  { char: '✧', top: '60%', left: '89%',  delay: '0.4s',  size: '0.9rem' },
  { char: '✦', top: '40%', left: '2%',   delay: '2.1s',  size: '0.6rem' },
  { char: '✧', top: '32%', left: '94%',  delay: '1.1s',  size: '0.75rem'},
];

const BRASAS = [
  { left:  '7%', top: '88%', dur: '2.1s', delay: '0s',    color: '#FF4500', size: '3px' },
  { left: '16%', top: '82%', dur: '2.8s', delay: '0.7s',  color: '#FFB703', size: '2px' },
  { left: '25%', top: '90%', dur: '1.9s', delay: '1.4s',  color: '#FF6B00', size: '4px' },
  { left: '34%', top: '85%', dur: '3.0s', delay: '0.3s',  color: '#FF4500', size: '2px' },
  { left: '43%', top: '87%', dur: '2.4s', delay: '2.1s',  color: '#FF3000', size: '3px' },
  { left: '52%', top: '83%', dur: '2.0s', delay: '1.0s',  color: '#FFB703', size: '2px' },
  { left: '61%', top: '89%', dur: '2.7s', delay: '0.5s',  color: '#FF6B00', size: '4px' },
  { left: '70%', top: '84%', dur: '1.8s', delay: '1.8s',  color: '#FF4500', size: '2px' },
  { left: '79%', top: '86%', dur: '3.2s', delay: '0.9s',  color: '#FFB703', size: '3px' },
  { left: '88%', top: '91%', dur: '2.3s', delay: '2.6s',  color: '#FF3000', size: '2px' },
  { left: '12%', top: '76%', dur: '2.6s', delay: '3.2s',  color: '#FF6B00', size: '2px' },
  { left: '55%', top: '79%', dur: '1.7s', delay: '1.6s',  color: '#FFB703', size: '3px' },
];

function SeccionHeaderPromos() {
  return (
    <div className="relative py-16 px-6 text-center overflow-hidden"
      style={{ background: '#090100' }}>

      {/* Capa 1 — brasa profunda y lenta */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 65% at 50% 105%, #5C1100 0%, #2A0500 42%, transparent 68%)',
          animation: 'carbon-brasa-a 5.1s ease-in-out infinite',
        }} />

      {/* Capa 2 — núcleo más caliente, ritmo distinto */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 112%, #9B2000 0%, #4A0800 35%, transparent 62%)',
          animation: 'carbon-brasa-b 3.7s ease-in-out infinite',
        }} />

      {/* Capa 3 — corazón del carbón, el más rápido */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 28% 22% at 50% 118%, #C83700 0%, #7A1500 28%, transparent 52%)',
          animation: 'carbon-brasa-c 2.3s ease-in-out infinite',
        }} />

      {/* Calor que sube — glow superior sutil */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% -10%, rgba(120,20,0,0.28) 0%, transparent 65%)',
          animation: 'carbon-brasa-a 4.3s ease-in-out infinite reverse',
        }} />

      {/* Brasas que suben */}
      {BRASAS.map((b, i) => (
        <span key={`b${i}`} className="absolute rounded-full pointer-events-none"
          style={{
            left: b.left, top: b.top,
            width: b.size, height: b.size,
            background: b.color,
            boxShadow: `0 0 4px 2px ${b.color}80`,
            animation: `chispa-sube ${b.dur} ease-out infinite`,
            animationDelay: b.delay,
          }} />
      ))}

      {/* Destellos ✦✧ */}
      {SPARKLES.map((s, i) => (
        <span key={`sp${i}`} className="absolute destello"
          style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay }}>
          {s.char}
        </span>
      ))}

      {/* Contenido */}
      <div className="relative z-10">
        <h2 className="shimmer-oro font-display leading-none tracking-widest mb-0"
          style={{ fontSize: 'clamp(2.2rem, 9vw, 4rem)' }}>
          LAS PROMOS
        </h2>
        <h2 className="shimmer-oro font-display leading-none tracking-widest mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 5.5rem)' }}>
          MÁS BRAVAS
        </h2>
        <div className="flex justify-center">
          <Ornamento color="rgba(255,183,3,0.4)" />
        </div>
      </div>
    </div>
  );
}

// ── Card de promo — formato ticket ────────────────────────────────

function FilaPromo({ item }: { item: ItemMenu }) {
  return (
    <div className="rounded-2xl p-4 relative"
      style={{
        background: 'rgba(100,10,5,0.14)',
        border: '1px solid rgba(193,18,31,0.32)',
        boxShadow: '0 0 18px rgba(193,18,31,0.08), inset 0 1px 0 rgba(255,70,30,0.06)',
      }}>

      {/* Ribbon de día */}
      {item.dia && (
        <div className="absolute top-3 right-3">
          <span className="font-display text-[10px] tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(193,18,31,0.14)', color: '#FF8060', border: '1px solid rgba(193,18,31,0.28)' }}>
            {item.dia}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4"
        style={{ paddingRight: item.dia ? '4.5rem' : '0' }}>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {item.valorTag && (
            <div className="inline-flex items-center gap-1 mb-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
              style={{ background: 'rgba(193,18,31,0.18)', color: '#FF8060', border: '1px solid rgba(193,18,31,0.28)' }}>
              🔥 {item.valorTag}
            </div>
          )}
          <h3 className="font-display text-brand-cream tracking-wide leading-tight"
            style={{ fontSize: '1.1rem' }}>
            {item.nombre.toUpperCase()}
          </h3>
          {item.descripcion && (
            <p className="text-brand-cream/45 text-xs mt-1 leading-relaxed">{item.descripcion}</p>
          )}
          {item.acompanamientos && item.acompanamientos.length > 0 && (
            <p className="text-[11px] mt-2 leading-relaxed">
              <span className="font-bold text-[10px] uppercase tracking-wider" style={{ color: '#E85D04' }}>INCLUYE </span>
              <span className="text-brand-cream/55">{item.acompanamientos.join(' · ')}</span>
            </p>
          )}
        </div>

        {/* Precio — proporcional, inline */}
        <div className="text-right shrink-0 pt-0.5">
          {item.precioRegular && (
            <p className="text-brand-cream/30 text-xs line-through leading-tight">L.{item.precioRegular}</p>
          )}
          <p className="font-display leading-none"
            style={{ fontSize: '1.75rem', color: '#FF7050', textShadow: '0 0 14px rgba(193,18,31,0.5)' }}>
            L.{item.precio}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Ornamento decorativo ───────────────────────────────────────────

function Ornamento({ color }: { color: string }) {
  return (
    <svg width="140" height="10" viewBox="0 0 140 10" fill="none">
      <line x1="0" y1="5" x2="58" y2="5" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      <rect x="64" y="2" width="6" height="6" transform="rotate(45 67 5)" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="76" y1="5" x2="140" y2="5" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

// ── Encabezado de sección ──────────────────────────────────────────

function SeccionHeader({ titulo, icon, tema, taglineOverride }: {
  titulo: string;
  icon: string;
  tema: Tema;
  taglineOverride?: string;
}) {
  const t = TEMAS[tema];
  const tagline = taglineOverride ?? t.tagline;

  return (
    <div className="relative py-14 px-6 text-center overflow-hidden" style={{ background: t.headerBg }}>
      {/* Glow superior */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: t.headerGlow }} />

      {/* Efecto de hielo — bordes y esquinas frías */}
      {tema === 'hielo' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(202,240,248,0.55), transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,180,216,0.38), transparent)' }} />
          <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none opacity-50"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(202,240,248,0.25) 0%, transparent 70%)' }} />
          <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-50"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(202,240,248,0.25) 0%, transparent 70%)' }} />
        </>
      )}

      {/* Contenido */}
      <div className="relative z-10">
        <div className="text-5xl sm:text-6xl mb-4 leading-none"
          style={{ filter: `drop-shadow(0 0 20px ${t.accentColor}70)` }}>
          {icon}
        </div>
        <h2
          className="font-display leading-none tracking-widest mb-3"
          style={{
            color: t.titleColor,
            fontSize: 'clamp(3.5rem, 14vw, 5.5rem)',
            textShadow: `0 0 50px ${t.accentColor}40`,
          }}
        >
          {titulo.toUpperCase()}
        </h2>
        <div className="flex justify-center mb-3">
          <Ornamento color={t.accentColor} />
        </div>
        <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: tagline === t.tagline ? t.taglineColor : 'rgba(212,160,23,0.65)' }}>
          {tagline}
        </p>
      </div>
    </div>
  );
}

// ── Sección de bebidas — dos paneles ─────────────────────────────

function SeccionBebidas({ refrescos, cervezas, todasBeb, tieneSub, mostrarPrecios }: {
  refrescos: ItemMenu[];
  cervezas: ItemMenu[];
  todasBeb: ItemMenu[];
  tieneSub: boolean;
  mostrarPrecios: boolean;
}) {
  function FilaBebida({ item, acento }: { item: ItemMenu; acento: string }) {
    return (
      <div className="flex items-center gap-2.5 py-2.5 border-b last:border-b-0"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <span className="text-sm shrink-0" style={{ opacity: 0.65 }}>{item.emoji}</span>
        <span className="font-display text-brand-cream/82 text-sm tracking-wide flex-1 leading-snug">
          {item.nombre.toUpperCase()}
        </span>
        {mostrarPrecios && (
          <span className="font-display text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 leading-none"
            style={{ color: acento, background: acento + '16', border: `1px solid ${acento}28` }}>
            L.{item.precio}
          </span>
        )}
      </div>
    );
  }

  function Panel({ titulo, icon, items, acento, borderColor, bgColor }: {
    titulo: string; icon: string; items: ItemMenu[];
    acento: string; borderColor: string; bgColor: string;
  }) {
    if (items.length === 0) return null;
    return (
      <div className="rounded-2xl p-4" style={{ background: bgColor, border: `1px solid ${borderColor}` }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 pb-2 flex items-center gap-1.5"
          style={{ color: acento + 'AA', borderBottom: `1px solid ${borderColor}` }}>
          {icon} {titulo}
        </p>
        {items.map(i => <FilaBebida key={i.id} item={i} acento={acento} />)}
      </div>
    );
  }

  return (
    <div className="px-4 py-5" style={{ background: '#071018' }}>
      {tieneSub ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Panel titulo="REFRESCOS" icon="🧊" items={refrescos} acento="#00B4D8"
            borderColor="rgba(0,180,216,0.15)" bgColor="rgba(0,180,216,0.04)" />
          <Panel titulo="CERVEZAS"  icon="🍺" items={cervezas}  acento="#D4A017"
            borderColor="rgba(212,160,23,0.2)" bgColor="rgba(212,160,23,0.05)" />
        </div>
      ) : (
        <Panel titulo="BEBIDAS" icon="🧊" items={todasBeb} acento="#00B4D8"
          borderColor="rgba(0,180,216,0.15)" bgColor="rgba(0,180,216,0.04)" />
      )}
    </div>
  );
}

// ── Fila de ítem ──────────────────────────────────────────────────

function FilaItem({ item, mostrarPrecio, tema }: {
  item: ItemMenu;
  mostrarPrecio: boolean;
  tema: Tema;
}) {
  const t = TEMAS[tema];
  const esPromo = tema === 'oro';

  return (
    <div
      className="rounded-xl p-4 transition-colors"
      style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Badges */}
          {(item.destacado || item.valorTag || item.dia) && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {item.destacado && (
                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,183,3,0.12)', color: '#FFB703', border: '1px solid rgba(255,183,3,0.25)' }}>
                  ★ TOP
                </span>
              )}
              {item.valorTag && (
                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(193,18,31,0.15)', color: '#FF7070', border: '1px solid rgba(193,18,31,0.25)' }}>
                  {item.valorTag}
                </span>
              )}
              {item.dia && (
                <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,183,3,0.1)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.25)' }}>
                  {item.dia}
                </span>
              )}
            </div>
          )}

          {/* Nombre */}
          <h3 className="font-display text-brand-cream tracking-wide leading-tight"
            style={{ fontSize: esPromo ? '1.05rem' : '0.95rem' }}>
            {item.nombre.toUpperCase()}
          </h3>

          {/* Descripción — omitida en bebidas (el nombre ya lo dice todo) */}
          {item.categoria !== 'bebidas' && (
            <p className="text-brand-cream/50 text-xs leading-snug mt-1">
              {item.descripcion}
            </p>
          )}

          {/* Acompañamientos */}
          {item.acompanamientos && item.acompanamientos.length > 0 && (
            <p className="text-[11px] mt-2 leading-relaxed">
              <span className="font-bold text-[10px] uppercase tracking-wider" style={{ color: t.accentColor }}>INCLUYE </span>
              <span className="text-brand-cream/55">{item.acompanamientos.join(' · ')}</span>
            </p>
          )}
        </div>

        {/* Precio */}
        {mostrarPrecio && (
          <div className="text-right shrink-0 pt-0.5">
            {item.precioRegular && (
              <p className="text-brand-cream/30 text-xs line-through leading-tight">L.{item.precioRegular}</p>
            )}
            <p className="font-display tracking-wider leading-none"
              style={{ color: t.accentColor, fontSize: esPromo ? '1.75rem' : '1.5rem' }}>
              L.{item.precio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────

interface CartaMenuProps {
  items: ItemMenu[];
  mostrarPreciosBebidas: boolean;
}

export function CartaMenu({ items, mostrarPreciosBebidas }: CartaMenuProps) {
  const [seccionActiva, setSeccionActiva] = useState('promos');
  const navRef = useRef<HTMLDivElement>(null);

  // Detectar sección visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECCIONES.forEach(({ id }) => {
      const el = document.getElementById(`sec-${id}`);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSeccionActiva(id); },
        { threshold: 0.12, rootMargin: '-8% 0px -75% 0px' }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  function irA(id: string) {
    const el = document.getElementById(`sec-${id}`);
    if (!el) return;
    const offset = navRef.current?.offsetHeight ?? 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset - 4, behavior: 'smooth' });
  }

  // Agrupar ítems
  const cat       = (c: string) => items.filter(i => i.categoria === c);
  const refrescos = items.filter(i => i.subcategoria === 'refrescos');
  const cervezas  = items.filter(i => i.subcategoria === 'cervezas');
  const todasBeb  = cat('bebidas');
  const tieneSub  = refrescos.length > 0 || cervezas.length > 0;

  return (
    <div style={{ background: '#160500', minHeight: '100vh' }}>

      {/* ── Sticky header ─── */}
      <div ref={navRef} className="sticky top-0 z-50">

        {/* Barra de logo */}
        <div className="flex items-center gap-3 px-4 py-3"
          style={{ background: '#0D0602', borderBottom: '1px solid rgba(193,18,31,0.18)' }}>
          <Image src="/logo.jpg" alt="Alas Bravas" width={34} height={34} className="rounded-full shrink-0" />
          <div className="flex items-baseline gap-2">
            <span className="font-display text-brand-cream text-lg tracking-wider leading-none">ALAS BRAVAS</span>
            <span className="font-display text-brand-accent/45 text-xs tracking-widest">· LA CARTA</span>
          </div>
        </div>

        {/* Navegación de secciones */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-none"
          style={{ background: 'rgba(13,6,2,0.97)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {SECCIONES.map(({ id, icon, label }) => {
            const activo = seccionActiva === id;
            const esPromos = id === 'promos';
            return (
              <button
                key={id}
                onClick={() => irA(id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
                style={activo ? {
                  background: esPromos ? '#FFB703' : '#C1121F',
                  color: esPromos ? '#0D0A00' : '#FFF8F0',
                  boxShadow: esPromos
                    ? '0 0 14px rgba(255,183,3,0.55)'
                    : '0 0 12px rgba(193,18,31,0.45)',
                } : esPromos ? {
                  background: 'rgba(255,183,3,0.12)',
                  color: 'rgba(255,183,3,0.85)',
                  border: '1px solid rgba(255,183,3,0.22)',
                } : {
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,248,240,0.55)',
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sección: Las Promos Más Bravas — PRIMERA ─── */}
      <section id="sec-promos">
        <SeccionHeaderPromos />
        <div className="px-4 py-6 space-y-4" style={{ background: '#0A0100' }}>
          {cat('promos').map(i => <FilaPromo key={i.id} item={i} />)}
        </div>
      </section>

      {/* ── Sección: Alitas ─── */}
      <section id="sec-alitas">
        <SeccionHeader titulo="Alitas" icon="🍗" tema="fuego" />
        <div className="px-4 py-6 space-y-3" style={{ background: '#1A0400' }}>
          {cat('alitas').map(i => <FilaItem key={i.id} item={i} mostrarPrecio tema="fuego" />)}
        </div>
      </section>

      {/* ── Sección: Carnes ─── */}
      <section id="sec-carnes">
        <SeccionHeader titulo="Carnes" icon="🥩" tema="brasa" />
        <div className="px-4 py-6 space-y-3" style={{ background: '#120800' }}>
          {cat('carnes').map(i => <FilaItem key={i.id} item={i} mostrarPrecio tema="brasa" />)}
        </div>
      </section>

      {/* ── Sección: Tajadas ─── */}
      <section id="sec-tajadas">
        <SeccionHeader titulo="Tajadas" icon="🍌" tema="tierra" />
        <div className="px-4 py-6 space-y-3" style={{ background: '#1A1000' }}>
          {cat('tajadas').map(i => <FilaItem key={i.id} item={i} mostrarPrecio tema="tierra" />)}
        </div>
      </section>

      {/* ── Sección: Pupusas ─── */}
      <section id="sec-pupusas">
        <SeccionHeader titulo="Pupusas" icon="🫓" tema="tierra" taglineOverride="Solo miércoles y jueves." />
        <div className="px-4 py-6 space-y-3" style={{ background: '#1A1000' }}>
          {cat('pupusas').map(i => <FilaItem key={i.id} item={i} mostrarPrecio tema="tierra" />)}
        </div>
      </section>

      {/* ── Sección: Bebidas — dos paneles ─── */}
      <section id="sec-bebidas">
        <SeccionHeader titulo="Bebidas" icon="❄️" tema="hielo" />
        <SeccionBebidas
          refrescos={refrescos}
          cervezas={cervezas}
          todasBeb={todasBeb}
          tieneSub={tieneSub}
          mostrarPrecios={mostrarPreciosBebidas}
        />
      </section>

      {/* ── Footer ─── */}
      <div className="px-4 py-10 text-center" style={{ background: '#0D0602', borderTop: '1px solid rgba(193,18,31,0.18)' }}>
        <div className="flex justify-center mb-4">
          <Ornamento color="rgba(255,183,3,0.28)" />
        </div>
        <p className="font-display text-brand-cream/50 text-sm tracking-[0.3em] uppercase mb-2">Alas Bravas</p>
        <p className="text-brand-cream/25 text-xs">La Cabaña, San Lorenzo</p>
        <p className="text-brand-cream/25 text-xs mt-1">Lunes a Domingo · 11 AM – 12 AM</p>
      </div>
    </div>
  );
}
