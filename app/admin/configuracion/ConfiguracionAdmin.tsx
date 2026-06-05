'use client';

import { useState } from 'react';

function isValidHNPhone(tel: string): boolean {
  return /^[3789]\d{7}$/.test(tel);
}

export function ConfiguracionAdmin({ mandaditosTel }: { mandaditosTel: string }) {
  const cleanInitial = mandaditosTel.replace(/^504/, '');
  const [telefono, setTelefono] = useState(cleanInitial);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  const valido = isValidHNPhone(telefono);

  async function guardar() {
    if (!valido || guardando) return;
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch('/api/admin/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clave: 'mandaditos_telefono', valor: `504${telefono}` }),
      });
      setMensaje(res.ok
        ? { tipo: 'ok',    texto: 'Número actualizado correctamente.' }
        : { tipo: 'error', texto: 'No se pudo guardar. Intentá de nuevo.' }
      );
    } catch {
      setMensaje({ tipo: 'error', texto: 'Error de conexión.' });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h1 className="font-display text-3xl text-brand-cream tracking-wider">Configuración</h1>
        <p className="text-white/40 text-sm mt-0.5">Ajustes generales del sistema</p>
      </div>

      <div className="rounded-xl border border-white/10 p-5 space-y-4">
        <div>
          <p className="text-brand-cream font-medium">Número de Mandaditos</p>
          <p className="text-white/40 text-sm mt-0.5">
            Los pedidos de delivery serán redirigidos a este número de WhatsApp.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm font-mono bg-white/5 px-3 py-2.5 rounded-lg border border-white/10 shrink-0">
              +504
            </span>
            <input
              type="tel"
              value={telefono}
              onChange={e => {
                setTelefono(e.target.value.replace(/\D/g, '').slice(0, 8));
                setMensaje(null);
              }}
              placeholder="89010135"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream font-mono text-sm outline-none focus:border-brand-primary/60 transition-colors"
            />
          </div>
          {telefono.length > 0 && !valido && (
            <p className="text-red-400 text-xs pl-1">
              8 dígitos, debe empezar con 3, 7, 8 o 9.
            </p>
          )}
          {valido && (
            <p className="text-white/30 text-xs pl-1">
              WhatsApp: wa.me/504{telefono}
            </p>
          )}
        </div>

        <button
          onClick={guardar}
          disabled={!valido || guardando}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
            valido && !guardando
              ? 'bg-brand-primary text-white hover:bg-red-700 cursor-pointer'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          {guardando ? 'Guardando...' : 'Guardar número'}
        </button>

        {mensaje && (
          <p className={`text-sm ${mensaje.tipo === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
            {mensaje.texto}
          </p>
        )}
      </div>
    </div>
  );
}
