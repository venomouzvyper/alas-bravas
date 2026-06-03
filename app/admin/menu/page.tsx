import { getSupabaseAdmin } from '@/lib/supabase';
import { MenuToggleList } from './MenuToggleList';

async function getMenuItems() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from('menu_items')
    .select('id, nombre, categoria, precio, emoji, activo')
    .order('orden');

  return data ?? [];
}

export default async function MenuAdminPage() {
  const items = await getMenuItems();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bebas text-3xl text-brand-cream tracking-wider">Menú</h1>
        <p className="text-white/40 text-sm mt-0.5">
          Activa o desactiva platos — los desactivados no aparecen en el menú público
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-white/30 text-sm">No se pudieron cargar los ítems del menú.</p>
      ) : (
        <MenuToggleList initial={items} />
      )}
    </div>
  );
}
