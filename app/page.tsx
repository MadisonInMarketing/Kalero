import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { PopularSizes } from "@/components/home/PopularSizes";
import { ShopByAir } from "@/components/home/ShopByAir";
import { TierComparison } from "@/components/home/TierComparison";
import { WhyKalero } from "@/components/home/WhyKalero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Subscription } from "@/components/home/Subscription";
import { Testimonials } from "@/components/home/Testimonials";
import { AirGuidesTeaser } from "@/components/home/AirGuidesTeaser";
import { EmailCapture } from "@/components/home/EmailCapture";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { IridescentWave } from "@/components/ui/IridescentWave";

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <KaleroEverydayHero />

      {/* 2 — Popular Filter Sizes */}
      <PopularSizes />

      {/* 4 — Shop by what's in your air (tier cards + concern chips) */}
      <ShopByAir />

      {/* HVAC brands trust strip */}
      <HvacCompatibility />

      {/* 5 — Which KALERO is right for you? (Standard vs Pro vs Max) */}
      <TierComparison />

      <IridescentWave intensity="subtle" className="h-16 w-full sm:h-20" />

      {/* 6 — Brand / Lifestyle */}
      <WhyKalero />

      {/* 7 — How KALERO works */}
      <HowItWorks />

      {/* 8 — Subscription */}
      <Subscription />

      {/* 9 — Social proof */}
      <Testimonials />

      <IridescentWave intensity="subtle" className="h-16 w-full sm:h-20" flip />

      {/* 10 — Air Guides */}
      <AirGuidesTeaser />

      {/* 11 — Email capture */}
      <EmailCapture />
    </>
  );
}
