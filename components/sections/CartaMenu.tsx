'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ItemMenu } from '@/lib/menu-data';

// ── Secciones ─────────────────────────────────────────────────────

const SECCIONES = [
  { id: 'alitas',  icon: '🍗', label: 'Alitas',  tema: 'fuego'  as const },
  { id: 'carnes',  icon: '🥩', label: 'Carnes',  tema: 'brasa'  as const },
  { id: 'tajadas', icon: '🍌', label: 'Tajadas', tema: 'tierra' as const },
  { id: 'pupusas', icon: '🫓', label: 'Pupusas', tema: 'tierra' as const },
  { id: 'bebidas', icon: '❄️', label: 'Bebidas', tema: 'hielo'  as const },
  { id: 'promos',  icon: '⚡', label: 'Promos',  tema: 'oro'    as const },
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
  const [seccionActiva, setSeccionActiva] = useState('alitas');
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
            return (
              <button
                key={id}
                onClick={() => irA(id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
                style={activo ? {
                  background: '#C1121F',
                  color: '#FFF8F0',
                  boxShadow: '0 0 12px rgba(193,18,31,0.45)',
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

      {/* ── Sección: Pupusas (tagline propio) ─── */}
      <section id="sec-pupusas">
        <SeccionHeader titulo="Pupusas" icon="🫓" tema="tierra" taglineOverride="Solo miércoles y jueves." />
        <div className="px-4 py-6 space-y-3" style={{ background: '#1A1000' }}>
          {cat('pupusas').map(i => <FilaItem key={i.id} item={i} mostrarPrecio tema="tierra" />)}
        </div>
      </section>

      {/* ── Sección: Bebidas — tema hielo ─── */}
      <section id="sec-bebidas">
        <SeccionHeader titulo="Bebidas" icon="❄️" tema="hielo" />
        <div className="px-4 py-6" style={{ background: '#071018' }}>
          {tieneSub ? (
            <>
              {refrescos.length > 0 && (
                <div className="mb-6">
                  <p className="text-center text-[11px] font-bold uppercase tracking-[0.4em] mb-4"
                    style={{ color: 'rgba(202,240,248,0.3)' }}>
                    ── REFRESCOS ──
                  </p>
                  <div className="space-y-3">
                    {refrescos.map(i => <FilaItem key={i.id} item={i} mostrarPrecio={mostrarPreciosBebidas} tema="hielo" />)}
                  </div>
                </div>
              )}
              {refrescos.length > 0 && cervezas.length > 0 && (
                <div className="flex items-center gap-3 my-5 px-2">
                  <div className="flex-1 h-px" style={{ background: 'rgba(0,180,216,0.12)' }} />
                  <span style={{ color: 'rgba(0,180,216,0.35)', fontSize: '10px' }}>❄</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(0,180,216,0.12)' }} />
                </div>
              )}
              {cervezas.length > 0 && (
                <div>
                  <p className="text-center text-[11px] font-bold uppercase tracking-[0.4em] mb-4"
                    style={{ color: 'rgba(202,240,248,0.3)' }}>
                    🍺 ── CERVEZAS ── 🍺
                  </p>
                  <div className="space-y-3">
                    {cervezas.map(i => <FilaItem key={i.id} item={i} mostrarPrecio={mostrarPreciosBebidas} tema="hielo" />)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              {todasBeb.map(i => <FilaItem key={i.id} item={i} mostrarPrecio={mostrarPreciosBebidas} tema="hielo" />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Sección: Promos — tema oro ─── */}
      <section id="sec-promos">
        <SeccionHeader titulo="Promos" icon="⚡" tema="oro" />
        <div className="px-4 py-6 space-y-3" style={{ background: '#0D0A00' }}>
          {cat('promos').map(i => <FilaItem key={i.id} item={i} mostrarPrecio tema="oro" />)}
        </div>
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
