"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import type { Category } from "@/lib/categories";

const credentials = [
  "MERV 8 · 11 · 13",
  "Every standard HVAC size",
  "Free shipping on subscriptions",
];

type HeroProduct = {
  name: string;
  image: string;
  productSlug: string;
  tagline: string;
  merv: string;
  pillLabel: string;
  pillIcon: Category["icon"];
  hex: string;
  softHex: string;
  categorySlug: string;
};

const heroProducts: HeroProduct[] = [
  {
    name: "Pet Defense",
    image: "/images/Pet Filter.png",
    productSlug: "pet-defense",
    tagline: "For homes with paws.",
    merv: "MERV 11",
    pillLabel: "Pets",
    pillIcon: "paw",
    hex: "#96B83B",
    softHex: "#EDF3D9",
    categorySlug: "pets-and-dander",
  },
  {
    name: "Everyday All Seasons",
    image: "/images/Everyday Filter.png",
    productSlug: "everyday-defense",
    tagline: "Everyday air, quietly cared for.",
    merv: "MERV 8",
    pillLabel: "Everyday Dust",
    pillIcon: "dust",
    hex: "#67B7F2",
    softHex: "#E5F2FD",
    categorySlug: "everyday-dust",
  },
  {
    name: "Allergy Defense",
    image: "/images/Allergy FIlter.png",
    productSlug: "allergy-defense",
    tagline: "For pollen weeks and stuffy mornings.",
    merv: "MERV 13",
    pillLabel: "Allergies",
    pillIcon: "flower",
    hex: "#E95774",
    softHex: "#FBE1E7",
    categorySlug: "allergies-and-pollen",
  },
  {
    name: "Hotel Collection",
    image: "/images/Hotel Collection.png",
    productSlug: "hotel-collection",
    tagline: "For hospitality and property supply.",
    merv: "MERV 11",
    pillLabel: "Hotels",
    pillIcon: "sparkles",
    hex: "#E9B95C",
    softHex: "#FBEFD3",
    categorySlug: "hotel-property",
  },
];

const AUTO_ADVANCE_MS = 5500;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = heroProducts[activeIndex];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, activeIndex]);

  return (
    <section
      className="relative isolate flex min-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden bg-canvas sm:min-h-[calc(100dvh-8rem)]"
      aria-labelledby="hero-title"
      style={{
        backgroundImage: [
          "radial-gradient(80% 60% at 78% 42%, rgba(228,212,252,0.55) 0%, rgba(228,212,252,0) 70%)",
          "linear-gradient(180deg, #FAF7F2 0%, #F3EEF6 55%, #E9E1EF 100%)",
        ].join(", "),
      }}
    >
      <div className="pointer-events-none absolute -left-60 top-1/4 h-[500px] w-[500px] -translate-y-1/4 rounded-full bg-lavender-300/20 blur-[120px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(74,46,122,0) 0%, rgba(74,46,122,0.08) 55%, rgba(74,46,122,0.16) 100%)",
        }}
      />

      <div className="container-x relative flex-1 grid gap-10 pb-6 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-end lg:gap-8 lg:pb-4 lg:pt-8">
        <div className="relative z-10 max-w-2xl lg:self-center lg:pb-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-lavender-700"
          >
            <span className="h-px w-8 bg-lavender-400/70" aria-hidden="true" />
            Premium residential air filtration
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-5 font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-charcoal text-balance"
          >
            <span className="block">The right filter</span>
            <span className="mt-1 block">
              for{" "}
              <em className="font-serif font-normal italic text-lavender-600">
                real life.
              </em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-6 max-w-md text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg"
          >
            Air filters built around the way your home actually breathes —
            pets, allergies, smoke, dust. Delivered on the schedule your HVAC
            needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <LinkButton href="/find-your-filter" size="lg" arrow>
              Find my filter
            </LinkButton>
            <LinkButton
              href="/shop"
              size="lg"
              variant="outline"
              arrow
              className="bg-white/70 backdrop-blur"
            >
              Shop the collection
            </LinkButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.48 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] leading-tight text-charcoal-mid"
          >
            {credentials.map((label, i) => (
              <li key={label} className="flex items-center gap-5">
                <span className="font-medium tracking-[0.02em] text-charcoal">
                  {label}
                </span>
                {i < credentials.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-3 w-px bg-charcoal/20 sm:inline-block"
                  />
                )}
              </li>
            ))}
          </motion.ul>
        </div>

        <div
          className="relative flex flex-col items-center justify-center py-8 lg:py-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-700"
            style={{
              background: `radial-gradient(closest-side, ${active.hex}26 0%, ${active.hex}12 40%, rgba(255,255,255,0) 72%)`,
              filter: "blur(20px)",
            }}
          />

          <div className="relative aspect-[4/5] w-[220px] sm:w-[300px] md:w-[380px] lg:w-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.productSlug}
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Link
                  href={`/products/${active.productSlug}`}
                  aria-label={active.name}
                  className="group relative block outline-none"
                >
                  <div className="relative aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="(min-width: 1024px) 460px, (min-width: 768px) 380px, (min-width: 640px) 300px, 220px"
                      className="relative object-contain [filter:drop-shadow(0_18px_28px_rgba(23,23,27,0.16))_drop-shadow(0_44px_60px_rgba(74,46,122,0.28))]"
                      priority
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="mx-auto mt-2 h-6 w-[70%] rounded-[50%] blur-[14px]"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(23,23,27,0.55), rgba(23,23,27,0))",
                    }}
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
