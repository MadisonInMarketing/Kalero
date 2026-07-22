"use client";

import type { ChapterKey, EverydayHeroChapter } from "@/lib/everydayHeroFrames";

type HeroProgressProps = {
  totalFrames: number;
  chapters: EverydayHeroChapter[];
  activeCount: number;
  activeChapterKey: ChapterKey;
  progress: number;
};

/**
 * NN / NN · thin fill line · active chapter name. Purely presentational.
 */
export function HeroProgress({
  totalFrames,
  chapters,
  activeCount,
  activeChapterKey,
  progress,
}: HeroProgressProps) {
  const totalLabel = totalFrames.toString().padStart(2, "0");
  const activeLabel = activeCount.toString().padStart(2, "0");
  return (
    <div
      className="mt-8 flex items-center gap-4 text-xs font-medium text-charcoal-mid sm:mt-10"
      aria-hidden="true"
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-semibold tabular-nums tracking-tight text-charcoal transition-colors duration-300">
          {activeLabel}
        </span>
        <span className="text-charcoal-light">/ {totalLabel}</span>
      </div>
      <div className="relative h-px w-24 flex-shrink-0 bg-charcoal/15 sm:w-32">
        <div
          className="absolute inset-y-0 left-0 origin-left bg-lavender-500 transition-transform duration-[700ms] ease-out"
          style={{
            width: "100%",
            transform: `scaleX(${Math.max(0, Math.min(1, progress))})`,
          }}
        />
      </div>
      <div className="relative min-w-0 flex-1">
        {chapters.map((chapter, i) => {
          const isActive = chapter.key === activeChapterKey;
          return (
            <span
              key={chapter.key}
              className={`${
                i === 0 ? "relative" : "absolute inset-0"
              } truncate text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-charcoal transition-opacity duration-500 ease-out`}
              style={{ opacity: isActive ? 1 : 0 }}
            >
              {chapter.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
