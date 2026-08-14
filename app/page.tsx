import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { ProductCollection } from "@/components/home/ProductCollection";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { FilterPerformance } from "@/components/home/FilterPerformance";
import { Subscription } from "@/components/home/Subscription";
import { FAQ } from "@/components/home/FAQ";
import { IridescentWave } from "@/components/ui/IridescentWave";

export default function Home() {
  return (
    <>
      <KaleroEverydayHero />
      <ProductCollection />
      <IridescentWave intensity="subtle" className="h-16 w-full sm:h-20" />
      <HvacCompatibility />
      <FilterPerformance />
      <IridescentWave intensity="subtle" className="h-16 w-full sm:h-20" flip />
      <Subscription />
      <FAQ />
    </>
  );
}
