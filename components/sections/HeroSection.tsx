"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

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

        {/* Glow flotante animado */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 55% 45% at 22% 58%, rgba(193,18,31,0.16) 0%, transparent 70%)",
              "radial-gradient(ellipse 55% 45% at 78% 42%, rgba(232,93,4,0.16) 0%, transparent 70%)",
              "radial-gradient(ellipse 55% 45% at 22% 58%, rgba(193,18,31,0.16) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Oscurecimiento para legibilidad */}
        <div className="absolute inset-0 bg-brand-dark/45" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-36">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-brand-accent font-bold uppercase tracking-[0.42em] text-xs sm:text-sm mb-8"
        >
          El sabor que te reta
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(5rem,18vw,11rem)] text-brand-cream leading-none tracking-wider"
          >
            ALITAS
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(5rem,18vw,11rem)] text-brand-primary leading-none tracking-wider"
          >
            BRAVAS
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          className="text-brand-cream/75 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg mx-auto"
        >
          Crujientes por fuera. Explosivas por dentro.<br />
          Salsas que te desafían a terminarlas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" variant="primary">Ver el Menú</Button>
          <Button size="lg" variant="ghost">Hacer Reservación</Button>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-brand-cream/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-brand-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
