"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { EverydayHeroFrame } from "@/lib/everydayHeroFrames";
import { closingHeadline } from "@/lib/everydayHeroFrames";

type HeroSequenceStageProps = {
  frames: EverydayHeroFrame[];
  activeIdx: number;
};

/**
 * Absolutely-stacked image frames + callouts + transition label + closing
 * overlay. Fade + subtle scale/drift driven by `activeIdx`.
 */
export const HeroSequenceStage = forwardRef<
  HTMLDivElement,
  HeroSequenceStageProps
>(function HeroSequenceStage({ frames, activeIdx }, ref) {
  const isClosing = frames[activeIdx]?.id === frames[frames.length - 1].id;
  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-canvas ring-1 ring-white/60 shadow-[0_40px_80px_-30px_rgba(23,23,27,0.35)] lg:aspect-auto lg:h-[calc(100dvh-9rem)] lg:max-h-[720px]"
    >
      {/* Ambient lavender-blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, rgba(145,100,210,0.14) 0%, rgba(103,183,242,0.08) 45%, rgba(255,255,255,0) 75%)",
        }}
      />

      {/* Frame stack */}
      {frames.map((frame, i) => {
        const isActive = i === activeIdx;
        // Alternate drift direction per frame for subtle parallax
        const dir = i % 2 === 0 ? 1 : -1;
        return (
          <div
            key={frame.id}
            className="absolute inset-0 transition-all duration-[1100ms] ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "translate3d(0,0,0) scale(1)"
                : `translate3d(${dir * 1.5}%,0,0) scale(1.025)`,
              filter: isActive ? "blur(0px)" : "blur(2px)",
              willChange: "opacity, transform, filter",
            }}
          >
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              sizes="(min-width: 1024px) 780px, (min-width: 768px) 90vw, 100vw"
              className={
                frame.objectFit === "contain" ? "object-contain" : "object-cover"
              }
              style={
                frame.objectPosition
                  ? { objectPosition: frame.objectPosition }
                  : undefined
              }
              priority={i === 0}
              loading={i === 0 ? undefined : i === 1 ? "eager" : "lazy"}
            />

            {/* Callouts for this frame — only render while active to reduce paint cost */}
            {isActive &&
              frame.callouts?.map((callout, ci) => (
                <div
                  key={callout.key}
                  className="pointer-events-none absolute z-10"
                  style={{
                    left: `${callout.x}%`,
                    top: `${callout.y}%`,
                  }}
                >
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender-500"
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 h-px bg-lavender-500/60 ${
                        callout.anchorSide === "right"
                          ? "left-1/2 w-16"
                          : "right-1/2 w-16"
                      }`}
                    />
                    <p
                      className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal ${
                        callout.anchorSide === "right"
                          ? "left-[calc(50%+4.5rem)]"
                          : "right-[calc(50%+4.5rem)]"
                      }`}
                    >
                      {callout.label}
                    </p>
                  </div>
                </div>
              ))}

            {/* Transition label */}
            {isActive && frame.transitionLabel && (
              <div className="pointer-events-none absolute inset-x-6 top-1/2 z-10 -translate-y-1/2 text-center">
                <p className="mx-auto max-w-md text-[13px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-sm">
                  {frame.transitionLabel}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom gradient wash — makes chapter copy readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
      />

      {/* Closing overlay — shown on the final frame */}
      <div
        className="pointer-events-none absolute inset-x-6 bottom-24 z-20 text-center transition-all duration-[900ms] ease-out sm:inset-x-12 sm:bottom-32"
        style={{
          opacity: isClosing ? 1 : 0,
          transform: isClosing ? "translateY(0)" : "translateY(6px)",
        }}
      >
        <p className="mx-auto max-w-lg font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-3xl">
          {closingHeadline}
        </p>
      </div>
    </div>
  );
});
