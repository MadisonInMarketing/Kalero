"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, ShieldCheck, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

const trustPoints = [
  { Icon: ShieldCheck, label: "MERV 8-13 Filtration" },
  { Icon: Truck, label: "Delivered on Schedule" },
  { Icon: Home, label: "Made for Real Home Concerns" },
];

// Featured product for the hero story cycle. The right-side panel
// walks through this product's packaging → filter → anatomy.
const featured = {
  name: "Everyday Defense",
  productSlug: "everyday-defense",
  merv: "MERV 8",
  hex: "#67B7F2",
  softHex: "#E5F2FD",
};

// The 4-frame story cycle. Replace each `src` with the corresponding
// Everyday Defense-branded photograph once available.
const heroStory: {
  key: string;
  src: string;
  caption: string;
  alt: string;
}[] = [
  {
    key: "box",
    src: "/images/hero/animated/everyday-1-box.png",
    caption: "The packaging",
    alt: "Everyday Defense filter packaging",
  },
  {
    key: "open",
    src: "/images/hero/animated/everyday-2-open.png",
    caption: "Inside the box",
    alt: "Everyday Defense box open, filter visible",
  },
  {
    key: "filter",
    src: "/images/hero/animated/everyday-3-filter.png",
    caption: "Precision engineering",
    alt: "Everyday Defense pleated filter",
  },
  {
    key: "breakdown",
    src: "/images/hero/animated/everyday-4-breakdown.png",
    caption: "Layered filtration",
    alt: "Everyday Defense filter anatomy exploded view",
  },
];

const AUTO_ADVANCE_MS = 4200;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = heroStory[activeIndex];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % heroStory.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, activeIndex]);

  return (
    <section
      className="relative isolate flex min-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden sm:min-h-[calc(100dvh-8rem)]"
      aria-labelledby="hero-title"
      style={{
        backgroundImage: [
          "radial-gradient(60% 80% at 0% 50%, rgba(145,100,210,0.14) 0%, rgba(228,212,252,0.04) 55%, rgba(241,234,254,0) 90%)",
          "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 25%, rgba(255,255,255,0.4) 48%, rgba(255,255,255,0.1) 65%, rgba(255,255,255,0) 80%)",
          "url('/images/hero/New Hero Background.png')",
        ].join(", "),
        backgroundSize: "cover, cover, cover",
        backgroundPosition: "center, center, center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
      }}
    >
      <div className="pointer-events-none absolute -left-60 top-1/4 h-[500px] w-[500px] -translate-y-1/4 rounded-full bg-lavender-300/10 blur-[120px]" />

      <div className="container-x relative flex-1 grid gap-10 pb-6 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-center lg:gap-8 lg:pb-4 lg:pt-8">
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-charcoal text-balance"
          >
            <span className="block">The right filter for</span>
            <span className="mt-2 block text-lavender-500">
              the way you live.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal-mid text-pretty sm:text-xl"
          >
            Air filters designed around your home&apos;s real concerns, from
            everyday dust and pet dander to allergies, smoke, and odors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <LinkButton href="/find-your-filter" size="lg" arrow>
              Find My Filter
            </LinkButton>
            <LinkButton
              href="/shop"
              size="lg"
              variant="outline"
              arrow
              className="bg-white/70 backdrop-blur"
            >
              Shop All Filters
            </LinkButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal-mid"
          >
            {trustPoints.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-100 text-lavender-700 ring-1 ring-lavender-200/70">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span className="text-xs font-semibold uppercase leading-tight tracking-[0.06em] text-charcoal sm:text-sm">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div
          className="relative flex flex-col items-stretch justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Link
            href={`/products/${featured.productSlug}`}
            aria-label={`${featured.name} — see product`}
            className="group relative block outline-none"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-white/60 shadow-[0_40px_80px_-30px_rgba(23,23,27,0.35)] transition-transform duration-500 group-hover:scale-[1.005] sm:aspect-[16/11] lg:aspect-[16/10]">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${featured.softHex} 0%, #FAF7F2 100%)`,
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="(min-width: 1024px) 780px, (min-width: 640px) 100vw, 100vw"
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active.key}-caption`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-5 left-5 flex items-center gap-2.5 sm:bottom-6 sm:left-6"
                >
                  <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-lavender-700 shadow-soft ring-1 ring-white/70">
                    {featured.merv}
                  </span>
                  <span className="text-sm font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:text-base">
                    {active.caption}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-5 right-5 flex items-center gap-1.5 sm:bottom-6 sm:right-6">
                {heroStory.map((frame, i) => (
                  <button
                    key={frame.key}
                    type="button"
                    aria-label={`Show ${frame.caption}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                        : "w-1.5 bg-white/60 hover:bg-white/85"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
