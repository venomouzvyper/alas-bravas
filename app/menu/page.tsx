import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuOrden } from "@/components/sections/MenuOrden";
import { getSupabase } from "@/lib/supabase";
import { MENU_ITEMS, type ItemMenu } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menú",
  description: "Alitas BB o Búfalo, carnes, tajadas, pupusas y promos especiales. Alas Bravas, La Cabaña, San Lorenzo.",
  openGraph: {
    title: "Menú — Alas Bravas",
    description: "Alitas crujientes, salsas explosivas y promos que no te puedes perder.",
    images: [{ url: "/galeria/promo-alitas-miercoles.jpg" }],
  },
};

export type PromoDia = "mie-jue" | "viernes" | null;

function getPromoDia(): PromoDia {
  // Convertir a zona horaria de Honduras (UTC-6)
  const ahora = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Tegucigalpa" })
  );
  const dia = ahora.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
  if (dia === 3 || dia === 4) return "mie-jue";
  if (dia === 5) return "viernes";
  return null;
}

const MANDADITOS_DEFAULT = "50489010135";

async function fetchMenuItems(): Promise<ItemMenu[]> {
  const supabase = getSupabase();
  if (!supabase) return MENU_ITEMS;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("activo", true)
    .order("orden");

  if (error || !data || data.length === 0) return MENU_ITEMS;
  return data as ItemMenu[];
}

async function fetchMandaditosTel(): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) return MANDADITOS_DEFAULT;

  const { data } = await supabase
    .from("configuracion")
    .select("valor")
    .eq("clave", "mandaditos_telefono")
    .single();

  return data?.valor ?? MANDADITOS_DEFAULT;
}

export default async function MenuPage() {
  const [items, mandaditosTel] = await Promise.all([
    fetchMenuItems(),
    fetchMandaditosTel(),
  ]);
  const promoDia = getPromoDia();

  return (
    <>
      <Header />
      <main className="pt-16 pb-44">
        <MenuOrden items={items} promoDia={promoDia} mandaditosTel={mandaditosTel} />
      </main>
      <Footer />
    </>
  );
}
