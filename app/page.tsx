import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { UrgencyTicker } from "@/components/sections/UrgencyTicker";
import { PivotSection } from "@/components/sections/PivotSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <UrgencyTicker />
        <PivotSection />
      </main>
      <Footer />
    </>
  );
}
