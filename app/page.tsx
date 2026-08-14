import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { ProductCollection } from "@/components/home/ProductCollection";
import { ShopByAir } from "@/components/home/ShopByAir";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { FilterPerformance } from "@/components/home/FilterPerformance";
import { Subscription } from "@/components/home/Subscription";
import { ScentUpgradeStrip } from "@/components/home/ScentUpgradeStrip";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <KaleroEverydayHero />
      <ProductCollection />
      <ShopByAir />
      <HvacCompatibility />
      <FilterPerformance />
      <Subscription />
      <ScentUpgradeStrip />
      <FAQ />
    </>
  );
}
