"use client";
import { useEffect, useRef } from "react";

const ITEMS = [
  "🍗 6 ALITAS DESDE L.180",
  "🔥 MIÉ Y JUE: 14 ALITAS POR L.300",
  "🎉 VIERNES: 2 PLATOS POR L.300",
  "📍 LA CABAÑA, SAN LORENZO",
  "🕐 ABIERTO 1 PM — 11 PM",
  "🛵 PIDE POR MANDADITOS",
];

// Más veloz en pantalla pequeña: el usuario ve menos ítems a la vez
function pxPerSec(): number {
  const w = window.innerWidth;
  if (w < 640)  return 90;
  if (w < 1024) return 65;
  return 45;
}

export function UrgencyTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...ITEMS, ...ITEMS];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let x = 0;
    let lastTs: number | null = null;
    let raf: number;
    let halfWidth = el.scrollWidth / 2;
    let speed = pxPerSec();

    // Re-mide si las fuentes web aún no cargaron al montar
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) halfWidth = el.scrollWidth / 2;
    });

    // Actualiza velocidad en resize/orientación sin reiniciar posición
    const onResize = () => { speed = pxPerSec(); };
    window.addEventListener("resize", onResize, { passive: true });

    function tick(ts: number) {
      if (lastTs !== null) {
        // Limita delta a 100ms: evita salto brusco al volver del background
        const delta = Math.min(ts - lastTs, 100);
        x -= speed * delta / 1000;
        if (x <= -halfWidth) x += halfWidth;
        el!.style.transform = `translateX(${x}px)`;
      }
      lastTs = ts;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-brand-primary py-3 border-y border-brand-secondary/20"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center flex-shrink-0 text-brand-cream font-bold text-xs sm:text-sm uppercase tracking-widest px-6 sm:px-10"
          >
            {item}
            <span className="text-brand-accent ml-6 sm:ml-10 select-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
