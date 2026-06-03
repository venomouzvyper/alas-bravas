'use client';

import { useState } from 'react';

interface Reservacion {
  id: string;
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: number;
  notas: string | null;
  estado: string;
  created_at: string;
}

const ESTADO_STYLES: Record<string, string> = {
  pendiente: 'bg-yellow-900/30 text-yellow-400 border-yellow-700/40',
  confirmada: 'bg-green-900/30 text-green-400 border-green-700/40',
  cancelada: 'bg-red-900/30 text-red-400 border-red-700/40',
};

const FILTROS = ['todas', 'pendiente', 'confirmada', 'cancelada'];

export function ReservacionesTable({ initial }: { initial: Reservacion[] }) {
  const [rows, setRows] = useState(initial);
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState<string | null>(null);

  const visible = filtro === 'todas' ? rows : rows.filter(r => r.estado === filtro);

  async function cambiarEstado(id: string, estado: string) {
    setLoading(id);
    const res = await fetch(`/api/admin/reservaciones/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    });
    if (res.ok) {
      setRows(prev => prev.map(r => r.id === id ? { ...r, estado } : r));
    }
    setLoading(null);
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {FILTROS.map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
              filtro === f
                ? 'bg-brand-primary text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-white/30 text-sm self-center">{visible.length} reservas</span>
      </div>

      {/* Tabla */}
      {visible.length === 0 ? (
        <div className="text-center py-16 text-white/30">No hay reservaciones en este filtro.</div>
      ) : (
        <div className="rounded-xl border border-white/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-4 py-3 text-white/40 font-medium">Nombre</th>
                <th className="px-4 py-3 text-white/40 font-medium">Pers.</th>
                <th className="px-4 py-3 text-white/40 font-medium">Fecha</th>
                <th className="px-4 py-3 text-white/40 font-medium">Hora</th>
                <th className="px-4 py-3 text-white/40 font-medium hidden md:table-cell">Teléfono</th>
                <th className="px-4 py-3 text-white/40 font-medium hidden lg:table-cell">Notas</th>
                <th className="px-4 py-3 text-white/40 font-medium">Estado</th>
                <th className="px-4 py-3 text-white/40 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r, i) => (
                <tr
                  key={r.id}
                  className={`${i < visible.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/3 transition-colors`}
                >
                  <td className="px-4 py-3 text-brand-cream font-medium">{r.nombre}</td>
                  <td className="px-4 py-3 text-white/60">{r.personas}</td>
                  <td className="px-4 py-3 text-white/60 whitespace-nowrap">{r.fecha}</td>
                  <td className="px-4 py-3 text-white/60">{r.hora}</td>
                  <td className="px-4 py-3 text-white/60 hidden md:table-cell">
                    <a href={`tel:${r.telefono}`} className="hover:text-brand-accent transition-colors">
                      {r.telefono}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-white/40 hidden lg:table-cell max-w-40 truncate">
                    {r.notas ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${ESTADO_STYLES[r.estado] ?? ''}`}>
                      {r.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {r.estado !== 'confirmada' && (
                        <button
                          onClick={() => cambiarEstado(r.id, 'confirmada')}
                          disabled={loading === r.id}
                          className="text-xs px-2 py-1 rounded bg-green-900/40 text-green-400 hover:bg-green-900/70 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          Confirmar
                        </button>
                      )}
                      {r.estado !== 'cancelada' && (
                        <button
                          onClick={() => cambiarEstado(r.id, 'cancelada')}
                          disabled={loading === r.id}
                          className="text-xs px-2 py-1 rounded bg-red-900/40 text-red-400 hover:bg-red-900/70 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                      )}
                      {r.estado !== 'pendiente' && (
                        <button
                          onClick={() => cambiarEstado(r.id, 'pendiente')}
                          disabled={loading === r.id}
                          className="text-xs px-2 py-1 rounded bg-yellow-900/40 text-yellow-400 hover:bg-yellow-900/70 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          Pendiente
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
