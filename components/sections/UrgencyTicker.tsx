"use client";

const ITEMS = [
  "🔥 ALITAS CRUJIENTES TODOS LOS DÍAS",
  "🌶️ 8 SALSAS QUE TE RETAN",
  "⚡ ORDENA Y RECOGE EN 15 MIN",
  "🏆 LAS MEJORES ALITAS DE HONDURAS",
  "🍗 SIEMPRE FRESCAS, NUNCA CONGELADAS",
  "🎉 PROMOCIONES Y COMBOS DIARIOS",
];

export function UrgencyTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden bg-brand-primary py-3 border-y border-brand-secondary/20"
      aria-hidden="true"
    >
      <div
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
