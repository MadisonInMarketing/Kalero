"use client";

import { forwardRef } from "react";
import type { EverydayHeroChapter } from "@/lib/everydayHeroFrames";

type HeroChapterCopyProps = {
  chapters: EverydayHeroChapter[];
};

/**
 * Renders every chapter's label + description stacked absolutely.
 * The parent GSAP timeline fades them in/out by targeting
 * `[data-chapter-key="<key>"]`.
 */
export const HeroChapterCopy = forwardRef<HTMLDivElement, HeroChapterCopyProps>(
  function HeroChapterCopy({ chapters }, ref) {
    return (
      <div
        ref={ref}
        className="pointer-events-none absolute inset-x-6 bottom-6 z-10 sm:inset-x-8 sm:bottom-8"
        aria-live="polite"
      >
        <div className="relative">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.key}
              data-chapter-key={chapter.key}
              className={`${
                i === 0 ? "relative" : "absolute inset-0"
              } max-w-md text-white`}
              style={{ opacity: i === 0 ? 1 : 0 }}
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
          ))}
        </div>
      </div>
    );
  },
);
