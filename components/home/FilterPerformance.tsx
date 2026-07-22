"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Flower2, Info, PawPrint, Sparkles, Sprout, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { filterPerformanceMatrix, particleReference } from "@/lib/copy";
import { productColors } from "@/lib/products";

type Filter = "everyday" | "pet" | "allergy" | "smoke" | "carbon";

const filterOptions: {
  key: Filter;
  label: string;
  merv: string;
  tagline: string;
}[] = [
  { key: "everyday", label: "Everyday", merv: "MERV 8", tagline: "Everyday dust, lint, and calm circulation." },
  { key: "pet", label: "Pet", merv: "MERV 11", tagline: "Dander and hair from active pet households." },
  { key: "allergy", label: "Allergy", merv: "MERV 13", tagline: "Pollen, dust mites, and mold spores." },
  { key: "smoke", label: "Smoke", merv: "MERV 13", tagline: "Wildfire smoke and urban particulates." },
  { key: "carbon", label: "Carbon", merv: "Activated Carbon", tagline: "Everyday household odors and VOCs." },
];

const strengthLabel: Record<0 | 1 | 2 | 3, string> = {
  0: "Not designed for this",
  1: "Some coverage",
  2: "Solid coverage",
  3: "Designed around this",
};

const CIRCLE_SIZE = 56;
const particleSize: Record<string, number> = {
  lint: CIRCLE_SIZE,
  dust: CIRCLE_SIZE,
  dander: CIRCLE_SIZE,
  pollen: CIRCLE_SIZE,
  mold: CIRCLE_SIZE,
  smoke: CIRCLE_SIZE,
};

const particleIcon: Record<string, LucideIcon> = {
  lint: Feather,
  dust: Sparkles,
  dander: PawPrint,
  pollen: Flower2,
  mold: Sprout,
  smoke: Wind,
};

const heroParticle: Record<Filter, string[]> = {
  everyday: ["lint", "dust"],
  pet: ["dander", "lint"],
  allergy: ["pollen", "mold", "dust"],
  smoke: ["smoke", "mold", "pollen"],
  carbon: ["dust", "dander"],
};

const backgroundImage: Record<Filter, string> = {
  everyday: "/images/New - fresh everyday home.png",
  pet: "/images/Pet - new.png",
  allergy: "/images/hero/animated/allergy-pedestal.png",
  smoke: "/images/Smoke Homepage.png",
  carbon: "/images/Carbon Homepage.png",
};

const AUTO_ADVANCE_MS = 4200;

export function FilterPerformance() {
  const [active, setActive] = useState<Filter>("everyday");
  const [paused, setPaused] = useState(false);
  const matrix = filterPerformanceMatrix[active];
  const color = productColors[active];
  const option = filterOptions.find((o) => o.key === active)!;

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setActive((current) => {
        const idx = filterOptions.findIndex((o) => o.key === current);
        const next = filterOptions[(idx + 1) % filterOptions.length];
        return next.key;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [paused, active]);

  return (
    <section
      className="relative isolate overflow-hidden py-14 sm:py-16"
      aria-labelledby="performance-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas via-white to-canvas" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">See it clearly</p>
          <h2
            id="performance-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            See what your filter is working on.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            An honest, side-by-side view of the household particles each KALERO filter is
            designed around. Not medical claims, just clear product comparisons.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((f) => {
            const isActive = active === f.key;
            const c = productColors[f.key];
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                aria-pressed={isActive}
                className={`rounded-pill px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-soft scale-[1.03]"
                    : "bg-white text-charcoal-mid ring-1 ring-lavender-100 hover:ring-lavender-300 hover:-translate-y-0.5"
                }`}
                style={isActive ? { backgroundColor: c.deep } : undefined}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div
            layout
            className="relative overflow-hidden rounded-card p-8 shadow-card ring-1 ring-white/50 sm:p-10"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={`${active}-card-bg`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `url('${backgroundImage[active]}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden="true"
              />
            </AnimatePresence>
            <div
              className="pointer-events-none absolute inset-0 transition-colors duration-500"
              style={{
                background:
                  "linear-gradient(180deg, rgba(23,23,27,0.94) 0%, rgba(42,42,50,0.94) 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px] transition-colors duration-500"
              style={{ backgroundColor: color.base }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-30 blur-3xl transition-colors duration-500"
              style={{ backgroundColor: color.base }}
              aria-hidden="true"
            />

            <div className="relative flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-eyebrow text-white ring-1 ring-white/40 backdrop-blur">
                <Sparkles size={12} />
                {option.merv}
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${active}-name`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-eyebrow text-white/80"
                >
                  {option.label} Defense
                </motion.p>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.h3
                key={`${active}-title`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="relative mt-8 font-display text-3xl font-semibold text-white text-balance sm:text-4xl"
              >
                {option.tagline}
              </motion.h3>
            </AnimatePresence>

            <div className="relative mt-10">
              <p className="text-eyebrow text-white/80">Common home particles</p>
              <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6">
                {[...particleReference]
                  .sort((a, b) => {
                    const heroes = heroParticle[active];
                    const hA = heroes.indexOf(a.key);
                    const hB = heroes.indexOf(b.key);
                    const inA = hA !== -1;
                    const inB = hB !== -1;
                    if (inA && inB) return hA - hB;
                    if (inA) return -1;
                    if (inB) return 1;
                    const sA = (matrix[a.key] ?? 0) as number;
                    const sB = (matrix[b.key] ?? 0) as number;
                    if (sA !== sB) return sB - sA;
                    return (particleSize[b.key] ?? 0) - (particleSize[a.key] ?? 0);
                  })
                  .map((p) => {
                  const strength = (matrix[p.key] ?? 0) as 0 | 1 | 2 | 3;
                  const size = particleSize[p.key] ?? 40;
                  const Icon = particleIcon[p.key] ?? Sparkles;
                  const isCovered = strength >= 2;
                  return (
                    <motion.div
                      key={p.key}
                      layout
                      transition={{ layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
                      className="flex flex-col items-center text-center"
                    >
                      <motion.div
                        layout
                        className="relative flex items-center justify-center"
                        style={{ width: 64, height: 64 }}
                      >
                        {isCovered && (
                          <motion.span
                            key={`${active}-${p.key}-ring`}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute inset-0 rounded-full ring-2 ring-white/70"
                          />
                        )}
                        <motion.span
                          layout
                          animate={{
                            opacity: strength === 0 ? 0.4 : 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-center justify-center rounded-full bg-white shadow-[0_6px_12px_rgba(23,23,27,0.18)]"
                          style={{ width: size, height: size }}
                        >
                          <Icon
                            size={Math.round(size * 0.55)}
                            strokeWidth={1.75}
                            style={{ color: color.deep }}
                          />
                        </motion.span>
                      </motion.div>
                      <span
                        className={`mt-3 text-[11px] font-medium leading-tight ${
                          strength === 0 ? "text-white/60" : "text-white"
                        }`}
                      >
                        {p.name.split(/[ &]/)[0]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p className="relative mt-8 text-xs leading-relaxed text-white/85">
              Larger, brighter dots are what {option.label} Defense is built around. Muted
              dots aren&apos;t what this filter targets.
            </p>
          </motion.div>

          <div className="rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft sm:p-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Coverage breakdown</p>
              <span
                className="rounded-pill px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: color.soft, color: color.deep }}
              >
                {option.merv}
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {particleReference.map((p) => {
                const strength = (matrix[p.key] ?? 0) as 0 | 1 | 2 | 3;
                const percent = strength * 33.33;
                return (
                  <li key={p.key}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-display font-semibold text-charcoal">
                        {p.name}
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: color.deep }}
                      >
                        {strengthLabel[strength]}
                      </span>
                    </div>
                    <div className="mt-2 relative h-2 overflow-hidden rounded-full bg-canvas ring-1 ring-lavender-100">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${active}-${p.key}`}
                          className="absolute inset-y-0 left-0 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${percent + (strength ? 8 : 0)}%`,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ backgroundColor: color.base }}
                        />
                      </AnimatePresence>
                    </div>
                    <p className="mt-1 text-[11px] text-charcoal-light">
                      Particle size: {p.size}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-start gap-2 rounded-2xl bg-canvas p-4 text-xs leading-relaxed text-charcoal-mid ring-1 ring-lavender-100">
              <Info size={14} className="mt-0.5 shrink-0 text-lavender-600" />
              Real-world performance depends on your HVAC compatibility, airflow, filter
              size, usage, and replacement schedule. This chart is a product-comparison
              tool, not a medical claim.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
