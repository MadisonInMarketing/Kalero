"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Mode = "pinned" | "mobile" | "static" | null;

const MOBILE_ADVANCE_MS = 5500;
const PER_FRAME = 10;
const TOTAL_TIMELINE = PER_FRAME * everydayHeroFrames.length;

export function KaleroEverydayHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqLarge = window.matchMedia("(min-width: 1024px)");
    const evaluate = () => {
      if (mqReduce.matches) setMode("static");
      else if (mqLarge.matches) setMode("pinned");
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

  useGSAP(
    () => {
      if (mode !== "pinned") return;
      const root = sectionRef.current;
      if (!root) return;

      const pinContainer = root.querySelector<HTMLElement>("[data-hero-pin]");
      if (!pinContainer) return;

      const trackHeight = Math.round(window.innerHeight * 1.4);

      const frames = gsap.utils.toArray<HTMLElement>("[data-hero-frame]", root);
      const chapters = gsap.utils.toArray<HTMLElement>(
        "[data-chapter-key]",
        root,
      );
      const progressCount = root.querySelector<HTMLElement>(
        "[data-hero-progress-count]",
      );
      const progressFill = root.querySelector<HTMLElement>(
        "[data-hero-progress-fill]",
      );
      const progressChapters = gsap.utils.toArray<HTMLElement>(
        "[data-hero-progress-chapter]",
        root,
      );
      const callouts = gsap.utils.toArray<HTMLElement>(
        "[data-hero-callout]",
        root,
      );
      const transitionLabels = gsap.utils.toArray<HTMLElement>(
        "[data-hero-transition-label]",
        root,
      );
      const closing = root.querySelector<HTMLElement>("[data-hero-closing]");

      // Frame entry state
      frames.forEach((frame, i) => {
        if (i === 0) {
          gsap.set(frame, {
            opacity: 1,
            scale: 1,
            xPercent: 0,
            filter: "blur(0px)",
          });
        } else {
          gsap.set(frame, {
            opacity: 0,
            scale: 1.025,
            xPercent: i % 2 === 0 ? 1.5 : -1.5,
            filter: "blur(2px)",
          });
        }
      });

      chapters.forEach((chapter, i) => {
        gsap.set(chapter, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 6 });
      });
      callouts.forEach((el) => gsap.set(el, { opacity: 0, y: 4 }));
      transitionLabels.forEach((el) => gsap.set(el, { opacity: 0, y: 4 }));
      if (closing) gsap.set(closing, { opacity: 0, y: 6 });

      const chapterElementByKey = (key: string) =>
        chapters.find((c) => c.dataset.chapterKey === key);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pinContainer,
          start: "top top",
          end: `+=${trackHeight}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(
              everydayHeroFrames.length - 1,
              Math.floor(p * everydayHeroFrames.length),
            );
            if (progressCount) {
              progressCount.textContent = (idx + 1)
                .toString()
                .padStart(2, "0");
            }
            if (progressFill) {
              progressFill.style.transform = `scaleX(${p})`;
            }
            const activeChapterKey =
              everydayHeroFrames[idx]?.chapterKey ?? "intro";
            progressChapters.forEach((el) => {
              el.style.opacity =
                el.dataset.heroProgressChapter === activeChapterKey ? "1" : "0";
            });
          },
        },
      });

      // Frame cross-fades
      frames.forEach((frame, i) => {
        if (i > 0) {
          const enterAt = Math.max(0, i * PER_FRAME - 3);
          tl.to(
            frame,
            {
              opacity: 1,
              scale: 1,
              xPercent: 0,
              filter: "blur(0px)",
              duration: 3.5,
              ease: "power2.out",
            },
            enterAt,
          );
        }
        if (i < frames.length - 1) {
          const exitAt = (i + 1) * PER_FRAME - 3;
          tl.to(
            frame,
            {
              opacity: 0,
              duration: 3.5,
              ease: "power2.out",
            },
            exitAt,
          );
        }
      });

      // Chapter copy fades
      everydayHeroChapters.forEach((chapter, ci) => {
        const el = chapterElementByKey(chapter.key);
        if (!el) return;
        const startAt = (chapter.startFrameId - 1) * PER_FRAME;
        const endAt = chapter.endFrameId * PER_FRAME;
        if (ci > 0) {
          tl.to(
            el,
            {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power2.out",
            },
            startAt,
          );
        }
        if (ci < everydayHeroChapters.length - 1) {
          tl.to(
            el,
            {
              opacity: 0,
              y: -6,
              duration: 2,
              ease: "power2.inOut",
            },
            endAt - 2,
          );
        }
      });

      // Callouts (frames 6 & 7)
      const cf6 = callouts.filter((c) => c.dataset.heroCalloutFrame === "6");
      const cf7 = callouts.filter((c) => c.dataset.heroCalloutFrame === "7");
      const startFrame6 = (6 - 1) * PER_FRAME + 1.5;
      const startFrame7 = (7 - 1) * PER_FRAME + 1.5;
      cf6.forEach((el, i) => {
        tl.to(
          el,
          { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" },
          startFrame6 + i * 0.4,
        );
        tl.to(
          el,
          { opacity: 0, duration: 1.2, ease: "power2.inOut" },
          startFrame7 - 1.2,
        );
      });
      cf7.forEach((el, i) => {
        tl.to(
          el,
          { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" },
          startFrame7 + i * 0.4,
        );
        tl.to(
          el,
          { opacity: 0, duration: 1.2, ease: "power2.inOut" },
          (8 - 1) * PER_FRAME - 1.5,
        );
      });

      // Transition label on frame 9
      transitionLabels.forEach((el) => {
        tl.to(
          el,
          { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" },
          (9 - 1) * PER_FRAME + 1.5,
        );
        tl.to(
          el,
          { opacity: 0, duration: 1.2, ease: "power2.inOut" },
          (10 - 1) * PER_FRAME - 1.5,
        );
      });

      // Closing overlay on frame 10
      if (closing) {
        tl.to(
          closing,
          {
            opacity: 1,
            y: 0,
            duration: 2.4,
            ease: "power2.out",
          },
          (10 - 1) * PER_FRAME + 1.5,
        );
      }

      // Ensure end pad matches our arithmetic
      tl.to({}, { duration: 0.01 }, TOTAL_TIMELINE);
    },
    { scope: sectionRef, dependencies: [mode] },
  );

  if (mode === null) {
    // Server + first paint. Render skeleton with real copy so layout is stable.
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

  // pinned
  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative">
      <div
        data-hero-pin
        className="relative h-[100dvh] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FAFAFC 0%, #F4EFFA 100%)",
        }}
      >
        <div className="container-x relative grid h-full items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
          <div className="relative z-10 py-10">
            <CopyColumn />
            <HeroProgress
              totalFrames={everydayHeroFrames.length}
              chapters={everydayHeroChapters}
            />
          </div>
          <div className="relative">
            <HeroSequenceStage frames={everydayHeroFrames} />
            <HeroChapterCopy chapters={everydayHeroChapters} />
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
        {/* Fallback for when JS hasn't hydrated: still show a valid image */}
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
