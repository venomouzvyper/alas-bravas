"use client";

import { motion } from "framer-motion";
import { SpiceBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type SpiceLevel = "mild" | "medium" | "hot" | "inferno";

interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  spice: SpiceLevel;
  gradientFrom: string;
  gradientTo: string;
  emoji: string;
}

const PLATOS: Plato[] = [
  {
    id: 1,
    nombre: "Alitas Clásicas BBQ",
    descripcion: "6 alitas bañadas en salsa BBQ ahumada de la casa",
    precio: "L. 189",
    spice: "mild",
    gradientFrom: "#2A1400",
    gradientTo: "#E85D04",
    emoji: "🍗",
  },
  {
    id: 2,
    nombre: "Alitas Buffalo",
    descripcion: "6 alitas en la clásica salsa Buffalo con mantequilla de ajo",
    precio: "L. 189",
    spice: "medium",
    gradientFrom: "#1A0000",
    gradientTo: "#C1121F",
    emoji: "🌶️",
  },
  {
    id: 3,
    nombre: "Mango Habanero",
    descripcion: "Dulce y picante. 6 alitas con salsa de mango y habanero",
    precio: "L. 199",
    spice: "hot",
    gradientFrom: "#1A0500",
    gradientTo: "#E85D04",
    emoji: "🥭",
  },
  {
    id: 4,
    nombre: "Combo Bravo x12",
    descripcion: "12 alitas + papas fritas + 2 dips de tu elección",
    precio: "L. 339",
    spice: "medium",
    gradientFrom: "#0D0602",
    gradientTo: "#856404",
    emoji: "🔥",
  },
  {
    id: 5,
    nombre: "Alitas Inferno",
    descripcion: "Solo para valientes. Ghost pepper. ¿Te atreves?",
    precio: "L. 199",
    spice: "inferno",
    gradientFrom: "#1A0010",
    gradientTo: "#8B0000",
    emoji: "💀",
  },
  {
    id: 6,
    nombre: "Ajo Parmesano",
    descripcion: "6 alitas con mantequilla de ajo y queso parmesano rallado",
    precio: "L. 199",
    spice: "mild",
    gradientFrom: "#1A1400",
    gradientTo: "#5A4200",
    emoji: "🧄",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function MenuPreview() {
  return (
    <section className="py-20 px-4 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-accent font-bold uppercase tracking-[0.35em] text-xs sm:text-sm mb-3">
            Nuestras especialidades
          </p>
          <h2 className="font-display text-6xl sm:text-7xl text-brand-cream tracking-wider leading-none">
            EL MENÚ
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PLATOS.map((plato) => (
            <motion.article
              key={plato.id}
              variants={cardVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="group rounded-sm overflow-hidden border border-white/5 hover:border-brand-primary/40 transition-colors cursor-pointer"
            >
              {/* Imagen placeholder */}
              <div
                className="h-44 flex items-center justify-center text-6xl"
                style={{
                  background: `linear-gradient(135deg, ${plato.gradientFrom} 0%, ${plato.gradientTo} 100%)`,
                }}
              >
                <span className="drop-shadow-lg">{plato.emoji}</span>
              </div>

              {/* Info */}
              <div className="p-5 bg-brand-gray-900">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-[1.4rem] text-brand-cream tracking-wide leading-tight">
                    {plato.nombre.toUpperCase()}
                  </h3>
                  <SpiceBadge level={plato.spice} />
                </div>
                <p className="text-brand-cream/55 text-sm leading-relaxed mb-4">
                  {plato.descripcion}
                </p>
                <p className="font-display text-3xl text-brand-accent tracking-wider">
                  {plato.precio}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="primary">Ver Menú Completo</Button>
        </motion.div>
      </div>
    </section>
  );
}
