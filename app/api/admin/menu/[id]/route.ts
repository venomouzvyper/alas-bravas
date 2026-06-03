import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({})) as { activo?: boolean };

  if (typeof body.activo !== 'boolean') {
    return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
  }

  const { error } = await supabase
    .from('menu_items')
    .update({ activo: body.activo })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
