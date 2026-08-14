import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { ProductCollection } from "@/components/home/ProductCollection";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { FilterPerformance } from "@/components/home/FilterPerformance";
import { Subscription } from "@/components/home/Subscription";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <KaleroEverydayHero />
      <ProductCollection />
      <HvacCompatibility />
      <FilterPerformance />
      <Subscription />
      <FAQ />
    </>
  );
}
