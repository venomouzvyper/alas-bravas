'use client';

import { useState } from 'react';

function isValidHNPhone(tel: string): boolean {
  return /^[3789]\d{7}$/.test(tel);
}

function Toggle({ label, desc, value, onChange, loading }: {
  label: string; desc: string; value: boolean;
  onChange: (v: boolean) => void; loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-brand-cream text-sm font-medium">{label}</p>
        <p className="text-white/40 text-xs mt-0.5 leading-snug">{desc}</p>
      </div>
      <button
        onClick={() => !loading && onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
          value ? 'bg-brand-primary' : 'bg-white/15'
        } ${loading ? 'opacity-50' : 'cursor-pointer'}`}
        aria-label={value ? 'Activado' : 'Desactivado'}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
          value ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
    </div>
  );
}

interface Props {
  mandaditosTel: string;
  horaApertura: string;
  horaCierre: string;
  mostrarPreciosBebidas: boolean;
  compraBebidas: boolean;
}

export function ConfiguracionAdmin(props: Props) {
  // ── Mandaditos ──────────────────────────────────────
  const cleanInitial = props.mandaditosTel.replace(/^504/, '');
  const [telefono, setTelefono] = useState(cleanInitial);
  const [guardandoTel, setGuardandoTel] = useState(false);
  const [msgTel, setMsgTel] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);
  const validoTel = isValidHNPhone(telefono);

  // ── Horario ─────────────────────────────────────────
  const [apertura, setApertura] = useState(props.horaApertura);
  const [cierre,   setCierre]   = useState(props.horaCierre);
  const [guardandoHorario, setGuardandoHorario] = useState(false);
  const [msgHorario, setMsgHorario] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  // ── Bebidas ─────────────────────────────────────────
  const [mostrarPrecios, setMostrarPrecios] = useState(props.mostrarPreciosBebidas);
  const [compraBebidas,  setCompraBebidas]  = useState(props.compraBebidas);
  const [loadingBebidas, setLoadingBebidas] = useState(false);

  async function guardar(clave: string, valor: string): Promise<boolean> {
    const res = await fetch('/api/admin/configuracion', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clave, valor }),
    });
    return res.ok;
  }

  async function guardarTelefono() {
    if (!validoTel || guardandoTel) return;
    setGuardandoTel(true); setMsgTel(null);
    const ok = await guardar('mandaditos_telefono', `504${telefono}`).catch(() => false);
    setMsgTel(ok
      ? { tipo: 'ok',    texto: 'Número actualizado.' }
      : { tipo: 'error', texto: 'No se pudo guardar. Intentá de nuevo.' }
    );
    setGuardandoTel(false);
  }

  async function guardarHorario() {
    if (guardandoHorario) return;
    setGuardandoHorario(true); setMsgHorario(null);
    const [okA, okC] = await Promise.all([
      guardar('hora_apertura', apertura).catch(() => false),
      guardar('hora_cierre',   cierre).catch(() => false),
    ]);
    setMsgHorario(okA && okC
      ? { tipo: 'ok',    texto: 'Horario actualizado.' }
      : { tipo: 'error', texto: 'No se pudo guardar. Intentá de nuevo.' }
    );
    setGuardandoHorario(false);
  }

  async function toggleBebidas(clave: 'mostrar_precios_bebidas' | 'compra_bebidas', valor: boolean) {
    setLoadingBebidas(true);
    await guardar(clave, valor ? 'true' : 'false').catch(() => null);
    setLoadingBebidas(false);
  }

  const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h1 className="font-display text-3xl text-brand-cream tracking-wider">Configuración</h1>
        <p className="text-white/40 text-sm mt-0.5">Ajustes generales del sistema</p>
      </div>

      {/* ── Mandaditos ──────────────────────────────── */}
      <div className="rounded-xl border border-white/10 p-5 space-y-4">
        <div>
          <p className="text-brand-cream font-medium">Número de Mandaditos</p>
          <p className="text-white/40 text-sm mt-0.5">
            Los pedidos de delivery serán redirigidos a este WhatsApp.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm font-mono bg-white/5 px-3 py-2.5 rounded-lg border border-white/10 shrink-0">+504</span>
            <input type="tel" value={telefono}
              onChange={e => { setTelefono(e.target.value.replace(/\D/g, '').slice(0, 8)); setMsgTel(null); }}
              placeholder="89010135"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream font-mono text-sm outline-none focus:border-brand-primary/60 transition-colors"
            />
          </div>
          {telefono.length > 0 && !validoTel && (
            <p className="text-red-400 text-xs pl-1">8 dígitos, debe empezar con 3, 7, 8 o 9.</p>
          )}
          {validoTel && <p className="text-white/25 text-xs pl-1">wa.me/504{telefono}</p>}
        </div>
        <button onClick={guardarTelefono} disabled={!validoTel || guardandoTel}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
            validoTel && !guardandoTel
              ? 'bg-brand-primary text-white hover:bg-red-700 cursor-pointer'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}>
          {guardandoTel ? 'Guardando...' : 'Guardar número'}
        </button>
        {msgTel && <p className={`text-sm ${msgTel.tipo === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{msgTel.texto}</p>}
      </div>

      {/* ── Horario ──────────────────────────────────── */}
      <div className="rounded-xl border border-white/10 p-5 space-y-4">
        <div>
          <p className="text-brand-cream font-medium">Horario del restaurante</p>
          <p className="text-white/40 text-sm mt-0.5">
            Controla cuándo se muestra "abierto" en el menú. Medianoche = 00:00.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Apertura</p>
            <input type="time" value={apertura} onChange={e => { setApertura(e.target.value); setMsgHorario(null); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm outline-none focus:border-brand-primary/60 transition-colors"
            />
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1.5">Cierre</p>
            <input type="time" value={cierre} onChange={e => { setCierre(e.target.value); setMsgHorario(null); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-brand-cream text-sm outline-none focus:border-brand-primary/60 transition-colors"
            />
          </div>
        </div>
        <button onClick={guardarHorario} disabled={guardandoHorario}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
            !guardandoHorario
              ? 'bg-brand-primary text-white hover:bg-red-700 cursor-pointer'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}>
          {guardandoHorario ? 'Guardando...' : 'Guardar horario'}
        </button>
        {msgHorario && <p className={`text-sm ${msgHorario.tipo === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{msgHorario.texto}</p>}
      </div>

      {/* ── Días activos ─────────────────────────────── */}
      <div className="rounded-xl border border-white/10 p-5 space-y-3 opacity-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-brand-cream font-medium">Días activos</p>
            <p className="text-white/40 text-sm mt-0.5">Próximamente — en revisión</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 border border-white/15 rounded px-2 py-0.5">Pronto</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {DIAS.map(d => (
            <div key={d} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/30 border border-white/8 cursor-not-allowed">{d}</div>
          ))}
        </div>
      </div>

      {/* ── Bebidas ──────────────────────────────────── */}
      <div className="rounded-xl border border-white/10 p-5 divide-y divide-white/5">
        <div className="pb-3">
          <p className="text-brand-cream font-medium">Bebidas</p>
          <p className="text-white/40 text-sm mt-0.5">Controla visibilidad y compra en el menú.</p>
        </div>
        <Toggle
          label="Mostrar precios de bebidas"
          desc="Cuando está desactivado, los precios no se muestran en el menú."
          value={mostrarPrecios}
          loading={loadingBebidas}
          onChange={v => {
            setMostrarPrecios(v);
            toggleBebidas('mostrar_precios_bebidas', v);
          }}
        />
        <Toggle
          label="Habilitar compra de bebidas"
          desc="Permite a los clientes agregar bebidas a su pedido de WhatsApp."
          value={compraBebidas}
          loading={loadingBebidas}
          onChange={v => {
            setCompraBebidas(v);
            toggleBebidas('compra_bebidas', v);
          }}
        />
      </div>
    </div>
  );
}
