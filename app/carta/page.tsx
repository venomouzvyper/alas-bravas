import { Metadata } from "next";
import { CartaMenu } from "@/components/sections/CartaMenu";
import { getSupabase } from "@/lib/supabase";
import { MENU_ITEMS, type ItemMenu } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Carta — Alas Bravas",
  description: "Menú completo de Alas Bravas · La Cabaña, San Lorenzo",
  robots: { index: false, follow: false },
};

async function fetchItems(): Promise<ItemMenu[]> {
  const supabase = getSupabase();
  if (!supabase) return MENU_ITEMS;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("activo", true)
    .order("orden");

  if (error || !data || data.length === 0) return MENU_ITEMS;

  return data.map(row => ({
    ...row,
    gradientFrom:  row.gradient_from,
    gradientTo:    row.gradient_to,
    valorTag:      row.valor_tag      ?? undefined,
    precioRegular: row.precio_regular ?? undefined,
  })) as ItemMenu[];
}

async function fetchMostrarPreciosBebidas(): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return true;

  const { data } = await supabase
    .from("configuracion")
    .select("valor")
    .eq("clave", "mostrar_precios_bebidas")
    .single();

  return data?.valor !== "false";
}

export default async function CartaPage() {
  const [items, mostrarPreciosBebidas] = await Promise.all([
    fetchItems(),
    fetchMostrarPreciosBebidas(),
  ]);

  return <CartaMenu items={items} mostrarPreciosBebidas={mostrarPreciosBebidas} />;
}
