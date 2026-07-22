"use client";

import type { ChapterKey, EverydayHeroChapter } from "@/lib/everydayHeroFrames";

type HeroChapterCopyProps = {
  chapters: EverydayHeroChapter[];
  activeChapterKey: ChapterKey;
};

/**
 * Renders every chapter block stacked absolutely; the one matching
 * `activeChapterKey` fades in, the rest fade out.
 */
export function HeroChapterCopy({
  chapters,
  activeChapterKey,
}: HeroChapterCopyProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-6 bottom-6 z-10 sm:inset-x-8 sm:bottom-8"
      aria-live="polite"
    >
      <div className="relative">
        {chapters.map((chapter, i) => {
          const isActive = chapter.key === activeChapterKey;
          return (
            <div
              key={chapter.key}
              className={`${
                i === 0 ? "relative" : "absolute inset-0"
              } max-w-md text-white transition-all duration-[700ms] ease-out`}
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(6px)",
              }}
            >
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.24em] text-white/85">
                <span className="text-white/70">{chapter.number}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-white/50"
                />
                <span>{chapter.label}</span>
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90 text-pretty sm:text-base">
                {chapter.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
