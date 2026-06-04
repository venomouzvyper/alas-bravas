import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({})) as { activo?: boolean };

  if (typeof body.activo !== 'boolean') {
    return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });

  const { error } = await supabase.from('menu_items').update({ activo: body.activo }).eq('id', id);
  if (error) return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  if (!body?.nombre || !body?.categoria || body?.precio == null) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });

  const { data, error } = await supabase
    .from('menu_items')
    .update({
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
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });

  const { error } = await supabase.from('menu_items').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });

  return NextResponse.json({ ok: true });
}
