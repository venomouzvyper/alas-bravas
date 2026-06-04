import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuPageClient } from "@/components/sections/MenuPageClient";
import { WingCalculator } from "@/components/sections/WingCalculator";
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

export default async function MenuPage() {
  const [items, promoDia] = await Promise.all([
    fetchMenuItems(),
    Promise.resolve(getPromoDia()),
  ]);

  return (
    <>
      <Header />
      <main className="pt-16">
        <MenuPageClient items={items} promoDia={promoDia} />
        <WingCalculator />
      </main>
      <Footer />
    </>
  );
}
