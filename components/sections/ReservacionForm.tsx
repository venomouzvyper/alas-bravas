"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

type Estado = "idle" | "enviando" | "exito" | "error";

const HORAS = [
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM",
];

const inputClass =
  "w-full bg-brand-gray-900 border border-brand-gray-700 rounded-sm px-4 py-3 text-brand-cream placeholder-brand-cream/30 text-sm focus:outline-none focus:border-brand-accent transition-colors";

const labelClass = "block text-brand-cream/60 text-xs font-bold uppercase tracking-wider mb-2";

export function ReservacionForm() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value.trim(),
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value.trim(),
      fecha: (form.elements.namedItem("fecha") as HTMLInputElement).value,
      hora: (form.elements.namedItem("hora") as HTMLSelectElement).value,
      personas: Number((form.elements.namedItem("personas") as HTMLSelectElement).value),
      notas: (form.elements.namedItem("notas") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/reservaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Error al enviar la reservación");
      }

      setEstado("exito");
    } catch (err) {
      setEstado("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  if (estado === "exito") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-6 border border-brand-accent/30 rounded-sm bg-brand-gray-900"
      >
        <span className="text-5xl block mb-4">🎉</span>
        <h2 className="font-display text-3xl text-brand-accent tracking-wider mb-3">
          ¡RESERVACIÓN RECIBIDA!
        </h2>
        <p className="text-brand-cream/70 text-sm leading-relaxed max-w-xs mx-auto">
          Te contactaremos pronto para confirmar tu mesa. ¡Nos vemos en Alas Bravas!
        </p>
        <button
          onClick={() => setEstado("idle")}
          className="mt-6 text-brand-cream/40 text-xs underline hover:text-brand-cream transition-colors"
        >
          Hacer otra reservación
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder="Tu nombre"
          className={inputClass}
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className={labelClass}>Teléfono / WhatsApp *</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          required
          placeholder="+504 0000-0000"
          className={inputClass}
        />
      </div>

      {/* Fecha + Hora */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fecha" className={labelClass}>Fecha *</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="hora" className={labelClass}>Hora *</label>
          <select id="hora" name="hora" required className={inputClass}>
            <option value="">Elegir hora</option>
            {HORAS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Personas */}
      <div>
        <label htmlFor="personas" className={labelClass}>Número de personas *</label>
        <select id="personas" name="personas" required className={inputClass}>
          <option value="">¿Cuántas personas?</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "persona" : "personas"}
            </option>
          ))}
        </select>
      </div>

      {/* Notas */}
      <div>
        <label htmlFor="notas" className={labelClass}>Notas adicionales (opcional)</label>
        <textarea
          id="notas"
          name="notas"
          rows={3}
          placeholder="Cumpleaños, alergias, peticiones especiales..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {estado === "error" && (
        <p className="text-brand-primary text-sm bg-brand-primary/10 border border-brand-primary/30 rounded-sm px-4 py-3">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={estado === "enviando"}
      >
        {estado === "enviando" ? "Enviando..." : "Confirmar Reservación"}
      </Button>

      <p className="text-brand-cream/30 text-xs text-center">
        Abierto Lun — Dom · 1:00 PM — 11:00 PM · La Cabaña, San Lorenzo
      </p>
    </form>
  );
}
