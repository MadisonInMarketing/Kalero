"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

type Frame = {
  src: string;
  alt: string;
  focal?: string;
};

// Every product moment in /public/images/hero/animated/, sequenced to
// flow through product intro → detail → construction → performance →
// lifestyle.
const heroFrames: Frame[] = [
  {
    src: "/images/hero/animated/9.png",
    alt: "Kalero filter with unfiltered particles entering and cleaner airflow exiting",
    focal: "center",
  },
  {
    src: "/images/hero/animated/hvac-install.png",
    alt: "Kalero filter being inserted into an HVAC vent with airflow into a living room",
    focal: "center",
  },
  {
    src: "/images/hero/animated/filter-scented-pair.png",
    alt: "Kalero pleated filter with Scented Strip on a light studio floor",
    focal: "center",
  },
  {
    src: "/images/hero/animated/8.png",
    alt: "Kalero filter capturing airborne dust and particles",
    focal: "center",
  },
  {
    src: "/images/hero/animated/everyday-4-breakdown.png",
    alt: "Exploded view of the Kalero filter in the brand's purple-blue gradient",
    focal: "center",
  },
  {
    src: "/images/hero/animated/scented-strip.png",
    alt: "Kalero Scented Strip being unwrapped over an air filter",
    focal: "center",
  },
  {
    src: "/images/hero/animated/3.png",
    alt: "Kalero filter revealed beside its packaging",
    focal: "center",
  },
  {
    src: "/images/hero/animated/7.png",
    alt: "Detail of Kalero filter internal construction",
    focal: "center",
  },
  {
    src: "/images/hero/animated/4.png",
    alt: "Front view of the Kalero pleated air filter",
    focal: "center",
  },
  {
    src: "/images/hero/animated/allergy-open.png",
    alt: "Kalero Allergy Defense box lifted to reveal the filter inside",
    focal: "center",
  },
  {
    src: "/images/hero/animated/5.png",
    alt: "Exploded view of the Kalero filter on a cream studio floor",
    focal: "center",
  },
  {
    src: "/images/hero/animated/allergy-pedestal.png",
    alt: "Kalero Allergy Defense packaging on a lavender pedestal",
    focal: "center",
  },
  {
    src: "/images/hero/animated/everyday-2-open.png",
    alt: "Kalero Everyday All Seasons box opening to reveal the filter",
    focal: "center",
  },
  {
    src: "/images/hero/animated/everyday-3-filter.png",
    alt: "Kalero pleated filter media detail",
    focal: "center",
  },
  {
    src: "/images/hero/animated/10.png",
    alt: "Cleaner air moving through a comfortable interior",
    focal: "center",
  },
];

const AUTO_ADVANCE_MS = 4500;

export function KaleroEverydayHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
    const onChange = () => setPaused(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % heroFrames.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, activeIdx]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100dvh-6.5rem)] w-full flex-col justify-end overflow-hidden bg-charcoal sm:min-h-[calc(100dvh-8rem)]"
    >
      {/* Image stack */}
      <div className="absolute inset-0">
        {heroFrames.map((frame, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={frame.src}
              className="absolute inset-0 transition-all duration-[1600ms] ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translate3d(0,0,0) scale(1)"
                  : "translate3d(0,0,0) scale(1.02)",
                willChange: "opacity, transform",
              }}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="100vw"
                className="object-contain"
                style={frame.focal ? { objectPosition: frame.focal } : undefined}
                priority={i === 0}
                loading={i === 0 ? undefined : i === 1 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
      </div>

      {/* Directional shading for contrast + drama */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,20,0.6) 0%, rgba(15,15,20,0.15) 30%, rgba(15,15,20,0.5) 65%, rgba(15,15,20,0.92) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-3/4"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.78) 30%, rgba(10,10,15,0.5) 55%, rgba(10,10,15,0.15) 80%, rgba(10,10,15,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full opacity-45 blur-[160px]"
        style={{ background: "radial-gradient(closest-side, rgba(145,100,210,0.55), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 h-[480px] w-[480px] rounded-full opacity-35 blur-[160px]"
        style={{ background: "radial-gradient(closest-side, rgba(103,183,242,0.4), transparent 70%)" }}
      />

      {/* Content */}
      <div className="container-x relative z-10 pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="flex flex-col gap-8 lg:max-w-3xl">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-lavender-200/90">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-lavender-300/70"
          />
          Introducing Kalero Everyday
        </p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
        >
          <span className="block">Air, engineered</span>
          <span className="block">
            for how you <em className="not-italic bg-gradient-to-r from-lavender-300 via-lavender-400 to-sky-soft bg-clip-text text-transparent">actually live</em>.
          </span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-white/85 text-pretty [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] sm:text-lg">
          Premium all-season filtration designed to capture everyday dust, lint, and airborne particles — without restricting the way your home breathes.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <LinkButton
            href="/find-your-filter"
            size="lg"
            arrow
            className="!bg-white !text-charcoal hover:!bg-lavender-50"
          >
            Find your filter
          </LinkButton>
          <LinkButton
            href="/shop"
            size="lg"
            variant="ghost"
            arrow
            className="!text-white/85 hover:!bg-white/10 hover:!text-white"
          >
            Shop the collection
          </LinkButton>
        </div>

        </div>
      </div>

      {/* Subtle frame progress rail — no NN/10, no chapters */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center gap-1.5 pb-6 sm:pb-8"
      >
        {heroFrames.map((_, i) => (
          <span
            key={i}
            className="h-[2px] rounded-full bg-white/25 transition-all duration-500 ease-out"
            style={{
              width: i === activeIdx ? "36px" : "8px",
              backgroundColor: i === activeIdx ? "rgba(255,255,255,0.85)" : undefined,
            }}
          />
        ))}
      </div>
    </section>
  );
}
