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
    subtitulo: "Un ambiente que invita a quedarse",
    cols: 2,
  },
  {
    src: "/galeria/restaurante-exterior.jpg",
    alt: "Exterior de Alas Bravas al atardecer en Playa La Cabaña",
    titulo: "Frente a la playa",
    subtitulo: "Playa La Cabaña, San Lorenzo",
    cols: 1,
  },
  {
    src: "/galeria/promo-alitas-miercoles.jpg",
    alt: "Promoción Miércoles y Jueves — 14 Alitas por L.300",
    titulo: "Promo Mié y Jue",
    subtitulo: "14 alitas por L.300",
    cols: 1,
  },
  {
    src: "/galeria/promo-pupusas.jpg",
    alt: "Pupusas especiales — Miércoles y Jueves",
    titulo: "Pupusas especiales",
    subtitulo: "Desde L.100 los Mié y Jue",
    cols: 1,
  },
  {
    src: "/galeria/super-menu.jpg",
    alt: "Súper Menú Alas Bravas",
    titulo: "Súper Menú",
    subtitulo: "Alitas, carnes, tajadas y más",
    cols: 1,
  },
];

function FotoCard({ foto, className = "" }: { foto: (typeof FOTOS)[0]; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-sm border border-white/5 hover:border-brand-primary/40 transition-colors ${className}`}>
      <div className="relative w-full h-full min-h-[220px]">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4">
        <p className="font-display text-lg text-brand-cream tracking-wide">{foto.titulo}</p>
        <p className="text-brand-accent text-sm">{foto.subtitulo}</p>
      </div>
    </div>
  );
}

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

        {/* Grid */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Fila 1: foto noche (grande) + exterior */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-auto sm:h-72">
              <FotoCard foto={FOTOS[0]} className="sm:col-span-2" />
              <FotoCard foto={FOTOS[1]} />
            </div>

            {/* Fila 2: tres fotos de promos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-auto sm:h-64">
              <FotoCard foto={FOTOS[2]} />
              <FotoCard foto={FOTOS[3]} />
              <FotoCard foto={FOTOS[4]} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
