import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { isAdminRequest } from '@/lib/admin-auth';
import { cloudinary } from '@/lib/cloudinary';

type Params = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!await isAdminRequest(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });

  // Obtener cloudinary_id antes de eliminar
  const { data: photo } = await supabase
    .from('gallery_photos')
    .select('cloudinary_id')
    .eq('id', id)
    .single();

  if (photo?.cloudinary_id && process.env.CLOUDINARY_API_SECRET) {
    await cloudinary.uploader.destroy(photo.cloudinary_id).catch(() => null);
  }

  const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });

  return NextResponse.json({ ok: true });
}
