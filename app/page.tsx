import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SpiceBadge } from "@/components/ui/Badge";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero placeholder — se reemplaza en Hito 1 con video y animaciones */}
      <main className="flex-1">
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 relative overflow-hidden">
          {/* Fondo degradado de marca */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at center, #E85D04 0%, #C1121F 40%, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-brand-accent font-bold uppercase tracking-[0.3em] text-sm mb-4">
              Bienvenido a
            </p>
            <h1 className="font-display text-7xl sm:text-9xl text-brand-cream leading-none tracking-wider mb-6">
              ALAS<br />
              <span className="text-brand-primary">BRAVAS</span>
            </h1>
            <p className="text-brand-cream/70 text-lg sm:text-xl mb-10 leading-relaxed">
              Alitas crujientes. Salsas que te desafían.<br />
              Una experiencia que no olvidarás.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Ver el Menú
              </Button>
              <Button size="lg" variant="ghost">
                Hacer Reservación
              </Button>
            </div>

            {/* Showcase del Design System — se elimina en Hito 1 */}
            <div className="mt-16 p-6 border border-brand-gray-700 rounded-sm bg-brand-gray-900/50 text-left">
              <p className="text-brand-accent text-xs uppercase tracking-widest font-bold mb-4">
                Design System — Tokens activos ✓
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <SpiceBadge level="mild" />
                <SpiceBadge level="medium" />
                <SpiceBadge level="hot" />
                <SpiceBadge level="inferno" />
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button size="sm" variant="primary">Primary</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {["#C1121F", "#E85D04", "#FFB703", "#0D0602", "#FFF8F0", "#1A0A00"].map((hex) => (
                  <div key={hex} className="text-center">
                    <div
                      className="w-8 h-8 rounded border border-white/10 mb-1"
                      style={{ background: hex }}
                    />
                    <p className="text-[9px] text-brand-cream/40 font-mono">{hex}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
