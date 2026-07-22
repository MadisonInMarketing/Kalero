"use client";

import { forwardRef } from "react";
import type { EverydayHeroChapter } from "@/lib/everydayHeroFrames";

type HeroProgressProps = {
  totalFrames: number;
  chapters: EverydayHeroChapter[];
};

/**
 * Progress row: NN / 10 · thin line · active chapter name.
 * Refs are captured via data attributes so the GSAP timeline can write
 * to them without triggering React re-renders on every scroll tick.
 */
export const HeroProgress = forwardRef<HTMLDivElement, HeroProgressProps>(
  function HeroProgress({ totalFrames, chapters }, ref) {
    const totalLabel = totalFrames.toString().padStart(2, "0");
    return (
      <div
        ref={ref}
        className="mt-6 flex items-center gap-4 text-xs font-medium text-charcoal-mid sm:mt-8"
        aria-hidden="true"
      >
        <div className="flex items-baseline gap-1.5">
          <span
            data-hero-progress-count
            className="text-lg font-semibold tabular-nums tracking-tight text-charcoal"
          >
            01
          </span>
          <span className="text-charcoal-light">/ {totalLabel}</span>
        </div>
        <div className="relative h-px w-24 flex-shrink-0 bg-charcoal/15 sm:w-32">
          <div
            data-hero-progress-fill
            className="absolute inset-y-0 left-0 bg-lavender-500 origin-left"
            style={{ width: "100%", transform: "scaleX(0)" }}
          />
        </div>
        <div className="relative min-w-0 flex-1">
          {chapters.map((chapter, i) => (
            <span
              key={chapter.key}
              data-hero-progress-chapter={chapter.key}
              className={`${
                i === 0 ? "relative" : "absolute inset-0"
              } truncate text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-charcoal`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {chapter.label}
            </span>
          ))}
        </div>
      </div>
    );
  },
);
