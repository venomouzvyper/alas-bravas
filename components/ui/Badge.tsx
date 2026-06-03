type SpiceLevel = "mild" | "medium" | "hot" | "inferno";

const spiceConfig: Record<SpiceLevel, { label: string; color: string; flames: number }> = {
  mild:    { label: "Suave",   color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", flames: 1 },
  medium:  { label: "Medio",   color: "bg-orange-500/20 text-orange-400 border-orange-500/30", flames: 2 },
  hot:     { label: "Picante", color: "bg-brand-primary/20 text-brand-primary border-brand-primary/30", flames: 3 },
  inferno: { label: "Infernal",color: "bg-red-900/40 text-red-400 border-red-500/50", flames: 4 },
};

export function SpiceBadge({ level }: { level: SpiceLevel }) {
  const config = spiceConfig[level];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-bold uppercase tracking-wider ${config.color}`}
    >
      {"🔥".repeat(config.flames)} {config.label}
    </span>
  );
}

export function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gray-800 text-brand-cream/70 text-xs font-medium uppercase tracking-widest border border-brand-gray-700">
      {children}
    </span>
  );
}
