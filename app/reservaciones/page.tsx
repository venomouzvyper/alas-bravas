import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReservacionForm } from "@/components/sections/ReservacionForm";

export const metadata: Metadata = {
  title: "Reservaciones — Alas Bravas",
  description: "Reservá tu mesa en Alas Bravas. La Cabaña, San Lorenzo. Abierto 1 PM - 11 PM.",
};

export default function ReservacionesPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-brand-dark min-h-screen">
        {/* Hero */}
        <div className="relative py-16 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, #C1121F 0%, #E85D04 40%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-brand-accent font-bold uppercase tracking-[0.35em] text-xs sm:text-sm mb-3">
              Asegurá tu lugar
            </p>
            <h1 className="font-display text-6xl sm:text-8xl text-brand-cream tracking-wider leading-none">
              RESERVÁ TU<br />
              <span className="text-brand-primary">MESA</span>
            </h1>
            <p className="text-brand-cream/60 mt-4 text-base max-w-sm mx-auto">
              Completá el formulario y te confirmamos en breve.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="px-4 pb-20">
          <div className="max-w-xl mx-auto">
            <ReservacionForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
