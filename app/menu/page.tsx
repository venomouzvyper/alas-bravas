import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MenuPageClient } from "@/components/sections/MenuPageClient";
import { getSupabase } from "@/lib/supabase";
import { MENU_ITEMS, type ItemMenu } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menú — Alas Bravas",
  description: "Alitas BB o Búfalo, carnes, tajadas, pupusas y promos especiales. Alas Bravas, La Cabaña, San Lorenzo.",
};

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
  const items = await fetchMenuItems();

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero compacto */}
        <div className="relative py-16 px-4 text-center overflow-hidden bg-brand-dark">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 50% 50%, #E85D04 0%, #C1121F 40%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="text-brand-accent font-bold uppercase tracking-[0.35em] text-xs sm:text-sm mb-3">
              Lo que hacemos mejor
            </p>
            <h1 className="font-display text-6xl sm:text-8xl text-brand-cream tracking-wider leading-none">
              NUESTRO MENÚ
            </h1>
            <p className="text-brand-cream/60 mt-4 text-base sm:text-lg max-w-md mx-auto">
              Alitas BB o Búfalo · Carnes · Tajadas · Pupusas · Promos especiales
            </p>
          </div>
        </div>

        <MenuPageClient items={items} />
      </main>
      <Footer />
    </>
  );
}
