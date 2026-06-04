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

function getSpeed(): number {
  const w = window.innerWidth;
  if (w < 640) return 150;
  if (w < 1024) return 100;
  return 80;
}

export function UrgencyTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...ITEMS, ...ITEMS];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function updateSpeed() {
      if (!el) return;
      const halfWidth = el.scrollWidth / 2;
      el.style.animationDuration = `${halfWidth / getSpeed()}s`;
    }

    updateSpeed();
    window.addEventListener('resize', updateSpeed);
    return () => window.removeEventListener('resize', updateSpeed);
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-brand-primary py-3 border-y border-brand-secondary/20"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 24s linear infinite" }}
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
