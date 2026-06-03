import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { UrgencyTicker } from "@/components/sections/UrgencyTicker";
import { MenuPreview } from "@/components/sections/MenuPreview";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <UrgencyTicker />
        <MenuPreview />
      </main>
      <Footer />
    </>
  );
}
