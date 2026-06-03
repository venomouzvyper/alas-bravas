import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos del menú, promos y el ambiente de Alas Bravas en La Cabaña, San Lorenzo.",
  openGraph: {
    title: "Galería — Alas Bravas",
    description: "Mira nuestras promos, platos y el ambiente del restaurante.",
    images: [{ url: "/galeria/promo-alitas-miercoles.jpg" }],
  },
};

const FOTOS = [
  {
    src: "/galeria/promo-alitas-miercoles.jpg",
    alt: "Promoción Miércoles y Jueves — 14 Alitas por L.300",
    titulo: "Promo Miércoles y Jueves",
    subtitulo: "14 alitas por L.300",
    ancho: 2,
  },
  {
    src: "/galeria/super-menu.jpg",
    alt: "Súper Menú Alas Bravas",
    titulo: "Súper Menú",
    subtitulo: "Alitas, carnes, tajadas y más",
    ancho: 1,
  },
  {
    src: "/galeria/promo-pupusas.jpg",
    alt: "Pupusas — Miércoles y Jueves",
    titulo: "Pupusas Especiales",
    subtitulo: "Miércoles y Jueves desde L.100",
    ancho: 1,
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

        {/* Grid de fotos */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Primera fila: imagen grande + pequeña */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-2 group relative overflow-hidden rounded-sm border border-white/5 hover:border-brand-primary/40 transition-colors">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={FOTOS[0].src}
                    alt={FOTOS[0].alt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 66vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4">
                  <p className="font-display text-lg text-brand-cream tracking-wide">{FOTOS[0].titulo}</p>
                  <p className="text-brand-accent text-sm">{FOTOS[0].subtitulo}</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-sm border border-white/5 hover:border-brand-primary/40 transition-colors">
                <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-full min-h-[200px]">
                  <Image
                    src={FOTOS[1].src}
                    alt={FOTOS[1].alt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4">
                  <p className="font-display text-lg text-brand-cream tracking-wide">{FOTOS[1].titulo}</p>
                  <p className="text-brand-accent text-sm">{FOTOS[1].subtitulo}</p>
                </div>
              </div>
            </div>

            {/* Segunda fila: imagen ancha */}
            <div className="group relative overflow-hidden rounded-sm border border-white/5 hover:border-brand-primary/40 transition-colors">
              <div className="relative w-full aspect-[16/7] sm:aspect-[16/6]">
                <Image
                  src={FOTOS[2].src}
                  alt={FOTOS[2].alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="100vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4">
                <p className="font-display text-lg text-brand-cream tracking-wide">{FOTOS[2].titulo}</p>
                <p className="text-brand-accent text-sm">{FOTOS[2].subtitulo}</p>
              </div>
            </div>

            {/* Nota de más fotos próximamente */}
            <div className="mt-12 text-center py-10 border border-dashed border-brand-gray-700 rounded-sm">
              <span className="text-4xl block mb-3">📸</span>
              <p className="font-display text-2xl text-brand-cream/50 tracking-wider uppercase">
                Más fotos próximamente
              </p>
              <p className="text-brand-cream/30 text-sm mt-2">
                Seguinos en redes para ver todo el contenido
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
