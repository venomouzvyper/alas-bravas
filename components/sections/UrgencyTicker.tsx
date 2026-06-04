const ITEMS = [
  "🍗 6 ALITAS DESDE L.180",
  "🔥 MIÉ Y JUE: 14 ALITAS POR L.300",
  "🎉 VIERNES: 2 PLATOS POR L.300",
  "📍 LA CABAÑA, SAN LORENZO",
  "🕐 ABIERTO 1 PM — 11 PM",
  "🛵 PIDE POR MANDADITOS",
];

export function UrgencyTicker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden bg-brand-primary py-3 border-y border-brand-secondary/20"
      aria-hidden="true"
    >
      <div className="ticker-track flex whitespace-nowrap">
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
