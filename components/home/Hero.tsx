"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, ShieldCheck, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import type { Category } from "@/lib/categories";

const trustPoints = [
  { Icon: ShieldCheck, label: "MERV 8-13 Filtration" },
  { Icon: Truck, label: "Delivered on Schedule" },
  { Icon: Home, label: "Made for Real Home Concerns" },
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

      <div className="container-x relative flex-1 grid gap-10 pb-6 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-end lg:gap-8 lg:pb-4 lg:pt-8">
        <div className="relative z-10 max-w-2xl lg:self-center lg:pb-6">
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
          className="relative flex flex-col items-center justify-end"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-[70%] -translate-x-1/2 rounded-2xl transition-colors duration-700"
            style={{
              background: `radial-gradient(55% 55% at 50% 55%, ${active.hex}22 0%, rgba(255,255,255,0) 70%)`,
            }}
          />

          <div className="relative flex items-end justify-end pb-10 translate-x-4 sm:translate-x-6 md:translate-x-8 lg:translate-x-10">
            <div className="relative aspect-[4/5] w-[210px] sm:w-[280px] md:w-[350px] lg:w-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.productSlug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                        sizes="(min-width: 1024px) 500px, (min-width: 768px) 410px, (min-width: 640px) 330px, 250px"
                        className="relative object-contain drop-shadow-[0_28px_50px_rgba(23,23,27,0.35)]"
                        priority
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="mx-auto -mt-2 h-3 w-[55%] rounded-[50%] blur-[6px]"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                      }}
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
