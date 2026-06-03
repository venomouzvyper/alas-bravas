import { EmberParticles } from "@/components/ui/EmberParticles";
import { HeroReveal } from "@/components/sections/HeroReveal";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-brand-dark">
        {/* Glow central */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 42%, #E85D04 0%, #C1121F 38%, transparent 68%)",
            opacity: 0.32,
          }}
        />
        {/* Glows flotantes */}
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
        <div className="absolute inset-0 bg-brand-dark/45" />
      </div>

      {/* Brasas flotantes */}
      <EmberParticles />

      {/* Contenido interactivo */}
      <HeroReveal />
    </section>
  );
}
