import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.nombre || !body?.categoria || body?.precio == null) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('menu_items')
    .insert({
      nombre: body.nombre,
      categoria: body.categoria,
      precio: Number(body.precio),
      descripcion: body.descripcion ?? null,
      emoji: body.emoji || '🍗',
      spice: body.spice || null,
      dia: body.dia || null,
      orden: body.orden ? Number(body.orden) : 99,
      activo: body.activo ?? true,
      image_url: body.image_url ?? null,
    })
    .select('id, nombre, categoria, precio, descripcion, emoji, spice, dia, orden, activo, image_url')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Error al crear' }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
