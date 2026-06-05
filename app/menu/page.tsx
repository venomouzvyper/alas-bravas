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

export type PromoDia = "mie-jue" | "dom" | "viernes" | null;

function getPromoDia(): PromoDia {
  const ahora = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Tegucigalpa" })
  );
  const dia = ahora.getDay();
  if (dia === 3 || dia === 4) return "mie-jue";
  if (dia === 0) return "dom";
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

interface Config {
  mandaditosTel: string;
  horaApertura: string;
  horaCierre: string;
  mostrarPreciosBebidas: boolean;
  compraBebidas: boolean;
}

async function fetchConfig(): Promise<Config> {
  const defaults: Config = {
    mandaditosTel: "50489010135",
    horaApertura: "11:00",
    horaCierre: "00:00",
    mostrarPreciosBebidas: true,
    compraBebidas: false,
  };

  const supabase = getSupabase();
  if (!supabase) return defaults;

  const { data } = await supabase.from("configuracion").select("clave, valor");
  if (!data) return defaults;

  const cfg: Record<string, string> = Object.fromEntries(data.map(r => [r.clave, r.valor]));

  return {
    mandaditosTel:        cfg.mandaditos_telefono ?? defaults.mandaditosTel,
    horaApertura:         cfg.hora_apertura       ?? defaults.horaApertura,
    horaCierre:           cfg.hora_cierre         ?? defaults.horaCierre,
    mostrarPreciosBebidas: cfg.mostrar_precios_bebidas !== "false",
    compraBebidas:        cfg.compra_bebidas === "true",
  };
}

export default async function MenuPage() {
  const [items, config] = await Promise.all([fetchMenuItems(), fetchConfig()]);
  const promoDia = getPromoDia();

  return (
    <>
      <Header />
      <main className="pt-16 pb-44">
        <MenuOrden
          items={items}
          promoDia={promoDia}
          mandaditosTel={config.mandaditosTel}
          horaApertura={config.horaApertura}
          horaCierre={config.horaCierre}
          mostrarPreciosBebidas={config.mostrarPreciosBebidas}
          compraBebidas={config.compraBebidas}
        />
      </main>
      <Footer />
    </>
  );
}
