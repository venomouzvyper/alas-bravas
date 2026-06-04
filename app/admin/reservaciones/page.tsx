import { getSupabaseAdmin } from '@/lib/supabase';
import { ReservacionesTable } from './ReservacionesTable';

async function getReservaciones() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from('reservaciones')
    .select('id, nombre, telefono, fecha, hora, personas, notas, estado, created_at')
    .order('fecha', { ascending: false })
    .order('hora', { ascending: false });

  return data ?? [];
}

export default async function ReservacionesPage() {
  const reservaciones = await getReservaciones();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-brand-cream tracking-wider">Reservaciones</h1>
        <p className="text-white/40 text-sm mt-0.5">Confirma o cancela las reservas recibidas</p>
      </div>

      {reservaciones.length === 0 && (
        <p className="text-white/30 text-sm">No hay reservaciones registradas todavía.</p>
      )}

      {reservaciones.length > 0 && (
        <ReservacionesTable initial={reservaciones} />
      )}
    </div>
  );
}
