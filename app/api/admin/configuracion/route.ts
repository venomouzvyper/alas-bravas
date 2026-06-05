import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.clave || typeof body.valor !== 'string') {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'DB no disponible' }, { status: 503 });
  }

  const { error } = await supabase
    .from('configuracion')
    .upsert({ clave: body.clave, valor: body.valor, updated_at: new Date().toISOString() });

  if (error) {
    console.error('[configuracion] Error al guardar:', error);
    return NextResponse.json({ error: 'No se pudo guardar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
