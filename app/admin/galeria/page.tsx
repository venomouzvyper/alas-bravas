import { getSupabaseAdmin } from '@/lib/supabase';
import { GaleriaAdmin } from './GaleriaAdmin';

async function getPhotos() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from('gallery_photos')
    .select('id, cloudinary_id, url, titulo, orden, activo, created_at')
    .order('orden')
    .order('created_at', { ascending: false });

  return data ?? [];
}

export default async function GaleriaAdminPage() {
  const photos = await getPhotos();
  return <GaleriaAdmin initial={photos} />;
}
