import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia de Alas Bravas, el restaurante de alitas en La Cabaña, San Lorenzo.",
  openGraph: {
    title: "Nuestra Historia — Alas Bravas",
    description: "Nació en La Cabaña, San Lorenzo, con una misión: servir las mejores alitas de Honduras.",
    images: [{ url: "/logo.jpg" }],
  },
};

const VALORES = [
  {
    emoji: "🔥",
    titulo: "Sabor sin compromisos",
    descripcion:
      "Cada alita se prepara con las mejores salsas y el punto exacto de cocción. No hay atajos cuando se trata de sabor.",
  },
  {
    emoji: "🍗",
    titulo: "Siempre fresco",
    descripcion:
      "Ingredientes frescos cada día. Nada viene congelado a tu mesa. La calidad se siente en cada mordida.",
  },
  {
    emoji: "❤️",
    titulo: "Atención que se nota",
    descripcion:
      "Más que comer alitas, queremos que vivas una experiencia. Desde que llegas hasta que te vas, tu satisfacción es nuestra prioridad.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-brand-dark">
        {/* Hero */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, #E85D04 0%, #C1121F 45%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-brand-accent font-bold uppercase tracking-[0.35em] text-xs sm:text-sm mb-4">
              Quiénes somos
            </p>
            <h1 className="font-display text-6xl sm:text-8xl text-brand-cream tracking-wider leading-none mb-6">
              NUESTRA<br />
              <span className="text-brand-primary">HISTORIA</span>
            </h1>
          </div>
        </section>

        {/* Historia */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              {/* Foto del restaurante */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl aspect-[4/3]">
                <Image
                  src="/galeria/restaurante-noche.jpg"
                  alt="Interior de Alas Bravas de noche"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Texto */}
              <div>
                <h2 className="font-display text-4xl sm:text-5xl text-brand-cream tracking-wider mb-6 leading-tight">
                  NACIÓ UNA<br />
                  <span className="text-brand-accent">PASIÓN</span>
                </h2>
                <p className="text-brand-cream/70 leading-relaxed mb-4">
                  Alas Bravas nació en La Cabaña, San Lorenzo, con una misión simple: servir las mejores
                  alitas de Honduras. Lo que empezó como un amor por el sabor auténtico se convirtió en
                  un lugar donde amigos y familias vienen a compartir momentos que no se olvidan.
                </p>
                <p className="text-brand-cream/70 leading-relaxed mb-8">
                  Cada plato que sale de nuestra cocina lleva el mismo cuidado y la misma pasión del
                  primer día. Porque para nosotros, cocinar bien no es una opción — es una obligación.
                </p>
                <Button variant="primary" size="md">
                  Ver el Menú
                </Button>
              </div>
            </div>

            {/* Valores */}
            <div className="border-t border-brand-gray-800 pt-16">
              <h2 className="font-display text-4xl sm:text-5xl text-brand-cream tracking-wider text-center mb-12 leading-none">
                LO QUE NOS <span className="text-brand-primary">MUEVE</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {VALORES.map((v) => (
                  <div
                    key={v.titulo}
                    className="text-center p-6 rounded-sm border border-brand-gray-800 bg-brand-gray-900"
                  >
                    <span className="text-4xl block mb-4">{v.emoji}</span>
                    <h3 className="font-display text-xl text-brand-accent tracking-wider uppercase mb-3">
                      {v.titulo}
                    </h3>
                    <p className="text-brand-cream/60 text-sm leading-relaxed">
                      {v.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info de contacto */}
            <div className="border-t border-white/10 pt-16 mt-16">
              <h2 className="font-display text-4xl sm:text-5xl text-brand-cream tracking-wider text-center mb-12 leading-none">
                ENCUÉNTRANOS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-10">
                {[
                  { icon: "📍", titulo: "Ubicación", detalle: "Playa La Cabaña\nSan Lorenzo, Valle" },
                  { icon: "🕐", titulo: "Horario", detalle: "Lun — Dom\n1:00 PM — 11:00 PM" },
                  { icon: "🛵", titulo: "Delivery", detalle: "Pide por Mandaditos" },
                ].map(({ icon, titulo, detalle }) => (
                  <div key={titulo} className="p-6 rounded-xl border border-white/10">
                    <span className="text-3xl block mb-3">{icon}</span>
                    <p className="font-display text-lg text-brand-accent tracking-widest uppercase mb-2">
                      {titulo}
                    </p>
                    <p className="text-brand-cream/70 text-sm whitespace-pre-line">{detalle}</p>
                  </div>
                ))}
              </div>

              {/* Mapa embebido */}
              <div className="rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src="https://maps.google.com/maps?q=13.4148563,-87.4450208&z=17&output=embed&hl=es"
                  width="100%"
                  height="340"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Alas Bravas en Google Maps"
                  className="block"
                />
              </div>
              <div className="text-center mt-4">
                <a
                  href="https://maps.app.goo.gl/6mF7ZbRwVntGKyQA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-secondary text-sm transition-colors"
                >
                  Abrir en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
