"use client";

import { useMemo, useState } from "react";
import { Check, Ruler, Search } from "lucide-react";
import { STANDARD_SIZES } from "@/lib/products";

const commonSizes = STANDARD_SIZES.slice(0, 6);

function normalize(v: string) {
  return v
    .replace(/[Xx×]/g, "×")
    .replace(/\s+/g, " ")
    .trim();
}

export function SizeFinder() {
  const [entered, setEntered] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  const activeSize = useMemo(() => {
    if (picked) return picked;
    const normalized = normalize(entered);
    return normalized.length > 2 ? normalized : "";
  }, [picked, entered]);

  const isStandard = useMemo(() => {
    if (!activeSize) return false;
    const clean = activeSize.replace(/\s/g, "").toLowerCase();
    return STANDARD_SIZES.some(
      (s) => s.replace(/\s/g, "").toLowerCase() === clean,
    );
  }, [activeSize]);

  const scrollToConcerns = () => {
    document
      .querySelector('section[aria-labelledby="shop-cats"]')
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white/85 p-6 shadow-card ring-1 ring-white/70 backdrop-blur sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lavender-200/50 blur-3xl"
      />

      <div className="relative grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-3 py-1 text-eyebrow text-lavender-700">
            <Ruler size={12} />
            Find your size
          </span>
          <h1 className="mt-4 font-display text-display-lg font-semibold text-charcoal text-balance">
            Start with the size on your filter frame.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal-mid text-pretty">
            Slide out your current filter, the size is printed on the edge. Every KALERO
            filter comes in the standard residential sizes below, and we&apos;ll source
            anything custom.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="size-input" className="sr-only">
            Filter size
          </label>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-mid"
              aria-hidden="true"
            />
            <input
              id="size-input"
              type="text"
              value={entered}
              onChange={(e) => {
                setEntered(e.target.value);
                setPicked(null);
              }}
              placeholder="e.g. 20 × 25 × 1"
              className="w-full rounded-full border border-lavender-200 bg-canvas py-3.5 pl-11 pr-32 text-sm text-charcoal shadow-inner transition-all placeholder:text-charcoal-light focus:border-lavender-500 focus:outline-none focus:ring-2 focus:ring-lavender-400/40"
            />
            <button
              type="button"
              onClick={scrollToConcerns}
              disabled={!activeSize}
              className="absolute right-1 top-1 rounded-full bg-charcoal px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-charcoal-soft disabled:opacity-40 disabled:cursor-not-allowed sm:px-5"
            >
              Check fit
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-eyebrow text-charcoal-light">Most common</span>
            {commonSizes.map((s) => {
              const isActive = picked === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setPicked(s);
                    setEntered(s);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "border-lavender-500 bg-lavender-100 text-lavender-800 shadow-soft"
                      : "border-lavender-200 bg-white text-charcoal-mid hover:border-lavender-300 hover:text-charcoal"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeSize && (
        <div
          className={`relative mt-6 flex flex-col items-start gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between ${
            isStandard
              ? "bg-lavender-50 ring-1 ring-lavender-200"
              : "bg-gold-soft/70 ring-1 ring-gold/40"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                isStandard
                  ? "bg-lavender-500 text-white"
                  : "bg-gold text-charcoal"
              }`}
            >
              <Check size={16} strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-charcoal sm:text-base">
                {isStandard ? (
                  <>
                    <span className="font-bold">{activeSize}</span> is in stock across every
                    KALERO filter.
                  </>
                ) : (
                  <>
                    We can source <span className="font-bold">{activeSize}</span> as a
                    custom cut.
                  </>
                )}
              </p>
              <p className="mt-0.5 text-xs text-charcoal-mid">
                {isStandard
                  ? "Pick the concern that sounds most like your home to see it."
                  : "Choose a concern below, we'll confirm the exact cut at checkout."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToConcerns}
            className="shrink-0 rounded-full bg-lavender-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-lavender-600"
          >
            Choose a concern →
          </button>
        </div>
      )}
    </div>
  );
}
