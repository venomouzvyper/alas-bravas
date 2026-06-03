import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });

  const { data, error } = await supabase
    .from('gallery_photos')
    .select('id, cloudinary_id, url, titulo, orden, activo, created_at')
    .order('orden')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Error al cargar' }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.cloudinary_id || !body?.url) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });

  const { data, error } = await supabase
    .from('gallery_photos')
    .insert({
      cloudinary_id: body.cloudinary_id,
      url: body.url,
      titulo: body.titulo ?? null,
      orden: body.orden ? Number(body.orden) : 99,
      activo: true,
    })
    .select('id, cloudinary_id, url, titulo, orden, activo, created_at')
    .single();

  if (error) return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
