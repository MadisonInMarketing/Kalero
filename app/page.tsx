import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { ShopByAir } from "@/components/home/ShopByAir";
import { QuizPreview } from "@/components/home/QuizPreview";
import { FilterPerformance } from "@/components/home/FilterPerformance";
import { SeasonalCollection } from "@/components/home/SeasonalCollection";
import { HotelSupply } from "@/components/home/HotelSupply";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <KaleroEverydayHero />
      <ShopByAir />
      <QuizPreview />
      <FilterPerformance />
      <SeasonalCollection />
      <HotelSupply />
      <FAQ />
    </>
  );
}
