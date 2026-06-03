import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos del ambiente, menú y promos de Alas Bravas en La Cabaña, San Lorenzo.",
  openGraph: {
    title: "Galería — Alas Bravas",
    description: "Mirá el ambiente y los platos que te esperan en Alas Bravas.",
    images: [{ url: "/galeria/restaurante-noche.jpg" }],
  },
};

const FOTOS = [
  {
    src: "/galeria/restaurante-noche.jpg",
    alt: "Interior de Alas Bravas de noche — luces, mesas y ambiente",
    titulo: "Nuestro espacio",
    width: 1280, height: 960,
  },
  {
    src: "/galeria/promo-alitas-miercoles.jpg",
    alt: "Promoción Miércoles y Jueves — 14 Alitas por L.300",
    titulo: "Promo Mié y Jue — 14 alitas por L.300",
    width: 758, height: 906,
  },
  {
    src: "/galeria/restaurante-exterior.jpg",
    alt: "Exterior de Alas Bravas al atardecer en Playa La Cabaña",
    titulo: "Frente a la playa",
    width: 1079, height: 1439,
  },
  {
    src: "/galeria/promo-pupusas.jpg",
    alt: "Pupusas especiales — Miércoles y Jueves",
    titulo: "Pupusas especiales Mié y Jue desde L.100",
    width: 1024, height: 1535,
  },
  {
    src: "/galeria/super-menu.jpg",
    alt: "Súper Menú Alas Bravas",
    titulo: "Súper Menú completo",
    width: 1024, height: 1536,
  },
];

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-brand-dark">
        {/* Hero */}
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, #FFB703 0%, #E85D04 40%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-brand-accent font-bold uppercase tracking-[0.35em] text-xs sm:text-sm mb-3">
              Mirá lo que te espera
            </p>
            <h1 className="font-display text-6xl sm:text-8xl text-brand-cream tracking-wider leading-none">
              GALERÍA
            </h1>
          </div>
        </section>

        {/* Columnas masonry — cada foto a su tamaño natural */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto columns-1 sm:columns-2 gap-4">
            {FOTOS.map((foto) => (
              <div key={foto.src} className="break-inside-avoid mb-4">
                <div className="relative overflow-hidden rounded-sm border border-white/5 group">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={foto.width}
                    height={foto.height}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/80 to-transparent px-4 py-3">
                    <p className="text-brand-cream text-sm font-medium">{foto.titulo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
