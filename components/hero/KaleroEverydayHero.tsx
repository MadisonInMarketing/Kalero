"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import {
  everydayHeroChapters,
  everydayHeroCopy,
  everydayHeroFrames,
} from "@/lib/everydayHeroFrames";
import { HeroChapterCopy } from "./HeroChapterCopy";
import { HeroProgress } from "./HeroProgress";
import { HeroSequenceStage } from "./HeroSequenceStage";

type Mode = "auto" | "mobile" | "static" | null;

const DESKTOP_ADVANCE_MS = 3600;
const MOBILE_ADVANCE_MS = 5000;

export function KaleroEverydayHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqLarge = window.matchMedia("(min-width: 1024px)");
    const evaluate = () => {
      if (mqReduce.matches) setMode("static");
      else if (mqLarge.matches) setMode("auto");
      else setMode("mobile");
    };
    evaluate();
    mqReduce.addEventListener("change", evaluate);
    mqLarge.addEventListener("change", evaluate);
    return () => {
      mqReduce.removeEventListener("change", evaluate);
      mqLarge.removeEventListener("change", evaluate);
    };
  }, []);

  if (mode === null) {
    return (
      <section
        ref={sectionRef}
        aria-labelledby="hero-title"
        className="container-x relative flex min-h-[calc(100dvh-6.5rem)] items-center gap-10 py-12 sm:min-h-[calc(100dvh-8rem)]"
      >
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-center">
          <CopyColumn />
          <div className="aspect-[16/10] w-full rounded-3xl bg-lavender-100/50" />
        </div>
      </section>
    );
  }

  if (mode === "static") {
    return <StaticHero />;
  }

  if (mode === "mobile") {
    return <MobileHero sectionRef={sectionRef} />;
  }

  return <AutoDesktopHero sectionRef={sectionRef} />;
}

/* ---------- Desktop autoplay ---------- */

function AutoDesktopHero({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % everydayHeroFrames.length);
    }, DESKTOP_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, activeIdx]);

  const activeFrame = everydayHeroFrames[activeIdx];
  const activeChapterKey = activeFrame.chapterKey;

  const progress = useMemo(
    () => (activeIdx + 1) / everydayHeroFrames.length,
    [activeIdx],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FAFAFC 0%, #F4EFFA 100%)",
      }}
    >
      <div className="container-x relative grid min-h-[calc(100dvh-6.5rem)] items-center gap-10 pt-16 pb-10 sm:min-h-[calc(100dvh-8rem)] sm:pt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-12">
        <div className="relative z-10 flex flex-col justify-center">
          <CopyColumn />
          <HeroProgress
            totalFrames={everydayHeroFrames.length}
            chapters={everydayHeroChapters}
            activeCount={activeIdx + 1}
            activeChapterKey={activeChapterKey}
            progress={progress}
          />
        </div>
        <div className="relative flex h-full items-center justify-center">
          <div className="relative w-full">
            <HeroSequenceStage
              frames={everydayHeroFrames}
              activeIdx={activeIdx}
            />
            <HeroChapterCopy
              chapters={everydayHeroChapters}
              activeChapterKey={activeChapterKey}
            />
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play sequence" : "Pause sequence"}
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-soft ring-1 ring-charcoal/10 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lavender-500"
            >
              {paused ? (
                <Play size={14} strokeWidth={2.25} />
              ) : (
                <Pause size={14} strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sub-layouts ---------- */

function CopyColumn() {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-lavender-700">
        <span aria-hidden="true" className="h-px w-8 bg-lavender-400/70" />
        {everydayHeroCopy.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mt-5 font-display text-[clamp(2.75rem,5.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.028em] text-charcoal text-balance"
      >
        <span className="block">{everydayHeroCopy.headlineLead}</span>
        <span className="mt-1 block text-lavender-600">
          {everydayHeroCopy.headlineAccent}
        </span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
        {everydayHeroCopy.supporting}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <LinkButton
          href={everydayHeroCopy.primaryCtaHref}
          size="lg"
          arrow
        >
          {everydayHeroCopy.primaryCtaLabel}
        </LinkButton>
        <LinkButton
          href={everydayHeroCopy.secondaryCtaHref}
          size="lg"
          variant="outline"
          arrow
        >
          {everydayHeroCopy.secondaryCtaLabel}
        </LinkButton>
      </div>
      <ProductInfoRow />
    </div>
  );
}

function ProductInfoRow() {
  return (
    <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-charcoal-mid sm:mt-10">
      {everydayHeroCopy.productInfo.map((entry, i) => (
        <li key={entry} className="flex items-center gap-6">
          <span className="tracking-[0.03em] text-charcoal">{entry}</span>
          {i < everydayHeroCopy.productInfo.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-charcoal/20 sm:inline-block"
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function StaticHero() {
  const staticFrame =
    everydayHeroFrames.find((f) => f.id === 2) ?? everydayHeroFrames[0];
  return (
    <section
      aria-labelledby="hero-title"
      className="container-x relative flex min-h-[calc(100dvh-6.5rem)] items-center gap-10 py-12 sm:min-h-[calc(100dvh-8rem)]"
    >
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-center">
        <CopyColumn />
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-canvas ring-1 ring-white/60 shadow-card">
          <Image
            src={staticFrame.src}
            alt={staticFrame.alt}
            fill
            sizes="(min-width: 1024px) 780px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function MobileHero({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const mobileFrames = everydayHeroFrames.filter((f) => f.includeOnMobile);
  const staticFrame =
    everydayHeroFrames.find((f) => f.id === 3) ?? everydayHeroFrames[0];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setIdx((i) => (i + 1) % mobileFrames.length);
    }, MOBILE_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, idx, mobileFrames.length]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="container-x flex flex-col gap-7 pb-12 pt-6"
    >
      <div>
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-lavender-700">
          <span aria-hidden="true" className="h-px w-8 bg-lavender-400/70" />
          {everydayHeroCopy.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-charcoal text-balance"
        >
          <span className="block">{everydayHeroCopy.headlineLead}</span>
          <span className="mt-1 block text-lavender-600">
            {everydayHeroCopy.headlineAccent}
          </span>
        </h1>
      </div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-canvas ring-1 ring-white/60 shadow-card">
        {mobileFrames.map((frame, i) => (
          <div
            key={frame.id}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
            />
          </div>
        ))}
        <noscript>
          <Image
            src={staticFrame.src}
            alt={staticFrame.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </noscript>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play sequence" : "Pause sequence"}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-charcoal shadow-soft ring-1 ring-charcoal/10 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lavender-500"
        >
          {paused ? (
            <Play size={14} strokeWidth={2.25} />
          ) : (
            <Pause size={14} strokeWidth={2.25} />
          )}
        </button>
      </div>
      <p className="text-base leading-relaxed text-charcoal-mid text-pretty">
        {everydayHeroCopy.supporting}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <LinkButton
          href={everydayHeroCopy.primaryCtaHref}
          size="lg"
          arrow
        >
          {everydayHeroCopy.primaryCtaLabel}
        </LinkButton>
        <LinkButton
          href={everydayHeroCopy.secondaryCtaHref}
          size="lg"
          variant="outline"
          arrow
        >
          {everydayHeroCopy.secondaryCtaLabel}
        </LinkButton>
      </div>
      <ProductInfoRow />
    </section>
  );
}
