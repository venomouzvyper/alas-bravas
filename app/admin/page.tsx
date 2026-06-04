import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';

interface Reservacion {
  id: string;
  nombre: string;
  personas: number;
  fecha: string;
  hora: string;
  estado: string;
}

async function getStats() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const hoy = new Date().toISOString().split('T')[0];
  const semanaStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data: todas } = await supabase
    .from('reservaciones')
    .select('id, nombre, personas, fecha, hora, estado')
    .order('fecha', { ascending: false })
    .order('hora', { ascending: false })
    .limit(200);

  if (!todas) return null;

  const hoyCount = todas.filter(r => r.fecha === hoy).length;
  const semanaCount = todas.filter(r => r.fecha >= semanaStart).length;
  const pendientes = todas.filter(r => r.estado === 'pendiente').length;
  const ultimas = todas.slice(0, 8);

  return { hoyCount, semanaCount, pendientes, ultimas: ultimas as Reservacion[] };
}

const ESTADO_STYLES: Record<string, string> = {
  pendiente: 'bg-yellow-900/30 text-yellow-400 border-yellow-700/40',
  confirmada: 'bg-green-900/30 text-green-400 border-green-700/40',
  cancelada: 'bg-red-900/30 text-red-400 border-red-700/40',
};

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-brand-cream tracking-wider">Dashboard</h1>
        <p className="text-white/40 text-sm mt-0.5">Vista general del restaurante</p>
      </div>

      {!stats ? (
        <div className="text-white/40 text-sm">Supabase no configurado.</div>
      ) : (
        <>
          {/* Tarjetas de stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Reservas hoy" value={stats.hoyCount} color="text-brand-accent" />
            <StatCard label="Últimos 7 días" value={stats.semanaCount} color="text-blue-400" />
            <StatCard label="Pendientes" value={stats.pendientes} color="text-yellow-400" />
          </div>

          {/* Accesos rápidos */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/reservaciones"
              className="group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all"
            >
              <div>
                <p className="text-brand-cream font-medium">Reservaciones</p>
                <p className="text-white/40 text-sm mt-0.5">Ver y gestionar reservas</p>
              </div>
              <span className="text-white/30 group-hover:text-brand-primary transition-colors text-xl">→</span>
            </Link>
            <Link
              href="/admin/menu"
              className="group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all"
            >
              <div>
                <p className="text-brand-cream font-medium">Menú</p>
                <p className="text-white/40 text-sm mt-0.5">Activar / desactivar platos</p>
              </div>
              <span className="text-white/30 group-hover:text-brand-primary transition-colors text-xl">→</span>
            </Link>
          </div>

          {/* Últimas reservaciones */}
          {stats.ultimas.length > 0 && (
            <div>
              <h2 className="text-brand-cream font-semibold mb-3">Últimas reservaciones</h2>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                {stats.ultimas.map((r, i) => (
                  <div
                    key={r.id}
                    className={`flex items-center justify-between px-4 py-3 ${
                      i < stats.ultimas.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-brand-cream font-medium truncate">{r.nombre}</span>
                      <span className="text-white/30 text-sm shrink-0">{r.personas} pers.</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-white/40 text-sm hidden sm:block">
                        {r.fecha} {r.hora}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${ESTADO_STYLES[r.estado] ?? ''}`}>
                        {r.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <p className={`font-display text-4xl ${color}`}>{value}</p>
      <p className="text-white/50 text-sm mt-0.5">{label}</p>
    </div>
  );
}
