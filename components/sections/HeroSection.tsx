import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-brand-dark">
        {/*
          SLOT DE VIDEO — descomenta cuando tengas el archivo MP4:
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        */}

        {/* Glow central estático */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 42%, #E85D04 0%, #C1121F 38%, transparent 68%)",
            opacity: 0.32,
          }}
        />

        {/* Glow flotante — CSS puro, sin JS */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 22% 58%, rgba(193,18,31,0.16) 0%, transparent 70%)",
            animation: "glow-left 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 78% 42%, rgba(232,93,4,0.16) 0%, transparent 70%)",
            animation: "glow-right 7s ease-in-out infinite",
          }}
        />

        {/* Oscurecimiento para legibilidad */}
        <div className="absolute inset-0 bg-brand-dark/45" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-36">
        <p
          className="text-brand-accent font-bold uppercase tracking-[0.42em] text-xs sm:text-sm mb-8"
          style={{ animation: "hero-fade-up 0.55s ease both" }}
        >
          El sabor que te reta
        </p>

        <div className="overflow-hidden">
          <h1
            className="font-display text-[clamp(5rem,18vw,11rem)] text-brand-cream leading-none tracking-wider"
            style={{ animation: "hero-slide-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}
          >
            ALITAS
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1
            className="font-display text-[clamp(5rem,18vw,11rem)] text-brand-primary leading-none tracking-wider"
            style={{ animation: "hero-slide-up 0.85s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}
          >
            BRAVAS
          </h1>
        </div>

        <p
          className="text-brand-cream/75 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg mx-auto"
          style={{ animation: "hero-fade-up 0.65s ease 0.55s both" }}
        >
          Crujientes por fuera. Explosivas por dentro.<br />
          Salsas que te desafían a terminarlas.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: "hero-fade-up 0.6s ease 0.72s both" }}
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
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: "hero-fade-in 0.6s ease 1.2s both" }}
      >
        <div
          className="w-5 h-8 rounded-full border-2 border-brand-cream/20 flex items-start justify-center pt-1.5"
          style={{ animation: "hero-bounce 1.6s ease-in-out infinite" }}
        >
          <div className="w-1 h-1.5 rounded-full bg-brand-cream/40" />
        </div>
      </div>
    </section>
  );
}
