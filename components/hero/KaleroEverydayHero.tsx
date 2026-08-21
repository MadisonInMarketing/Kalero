"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Star } from "lucide-react";
import { businessConfig } from "@/lib/business";

/**
 * Full-bleed auto-cycling gallery hero.
 * Frames cross-fade every ~4s; copy + CTAs sit on a bottom-left overlay.
 */

const RATING_VALUE = 4.9;
const RATING_COUNT = "12,000+";

const heroFrameIds = [1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 14, 15];
const heroFrames = heroFrameIds.map((id) => {
  const n = String(id).padStart(2, "0");
  return {
    src: `/images/hero/animated/hero-${n}.png`,
    alt: `Kalero premium air filter — scene ${id}`,
  };
});

const AUTO_ADVANCE_MS = 4500;

export function KaleroEverydayHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % heroFrames.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [activeIdx, reducedMotion]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate h-[calc(100dvh-4rem)] min-h-[560px] w-full overflow-hidden bg-charcoal sm:h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-8rem)]"
    >
      {/* Frame stack — full bleed, absolute, cross-fade on activeIdx */}
      {heroFrames.map((frame, i) => (
        <div
          key={frame.src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: i === activeIdx ? 1 : 0 }}
          aria-hidden={i !== activeIdx}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={i === 0}
            loading={i === 0 ? undefined : i === 1 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Bottom gradient wash for legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-charcoal/85 via-charcoal/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-charcoal/70 via-charcoal/25 to-transparent"
      />

      {/* Copy overlay — bottom-left */}
      <div className="container-x relative z-10 flex h-full flex-col justify-end pb-14 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl text-white">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.28em] text-sky-300">
            Cleaner Air. Better Living.
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.5rem,5.6vw,4.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-white text-balance"
          >
            The right filter.
            <br />
            The right fit.
            <br />
            <span className="text-sky-300">Cleaner air.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 text-pretty sm:text-lg">
            Premium replacement air filters made simple. Find your size, choose
            your filtration level, and get fresh filters delivered when you
            need them.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/find-your-filter"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-charcoal transition-colors hover:bg-white/90"
            >
              Find My Filter
              <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
            <Link
              href="/air-filters"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Shop All Filters
              <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
          </div>

          {/* Trust band */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-white/85">
            {businessConfig.shippingMessage && (
              <>
                <span className="flex items-center gap-2">
                  <Truck size={14} strokeWidth={2} className="text-sky-300" />
                  {businessConfig.shippingMessage}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block"
                />
              </>
            )}
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="#F5B301" stroke="#F5B301" />
                ))}
              </span>
              <span className="text-white">
                <span className="font-semibold">{RATING_VALUE}</span> ·{" "}
                {RATING_COUNT} homes filtered
              </span>
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-6 right-6 z-10 hidden gap-1.5 sm:flex">
          {heroFrames.map((f, i) => (
            <button
              key={f.src}
              type="button"
              aria-label={`Show frame ${i + 1}`}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIdx ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
