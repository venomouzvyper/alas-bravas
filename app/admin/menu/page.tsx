import { getSupabaseAdmin } from '@/lib/supabase';
import { MenuCrud } from './MenuCrud';

async function getMenuItems() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from('menu_items')
    .select('id, nombre, categoria, precio, descripcion, emoji, spice, dia, orden, activo, image_url')
    .order('orden');

  return data ?? [];
}

export default async function MenuAdminPage() {
  const items = await getMenuItems();

  return (
    <div>
      {items.length === 0 && (
        <p className="text-white/30 text-sm">No se pudieron cargar los ítems del menú.</p>
      )}
      <MenuCrud initial={items} />
    </div>
  );
}
