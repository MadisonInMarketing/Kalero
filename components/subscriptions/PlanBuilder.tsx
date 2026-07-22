"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";

type Cadence = 30 | 60 | 90;

type PlanFilter = {
  slug: string;
  name: string;
  merv: string;
  price: number;
  image: string;
  hex: string;
  soft: string;
};

const catalog: PlanFilter[] = [
  {
    slug: "everyday-defense",
    name: "Everyday Defense",
    merv: "MERV 8",
    price: 22,
    image: "/images/Everyday Filter.png",
    hex: "#67B7F2",
    soft: "#E5F2FD",
  },
  {
    slug: "pet-defense",
    name: "Pet Defense",
    merv: "MERV 11",
    price: 28,
    image: "/images/Pet Filter.png",
    hex: "#96B83B",
    soft: "#EDF3D9",
  },
  {
    slug: "allergy-defense",
    name: "Allergy Defense",
    merv: "MERV 13",
    price: 32,
    image: "/images/hero/animated/allergy-pair.png",
    hex: "#E95774",
    soft: "#FBE1E7",
  },
  {
    slug: "smoke-defense",
    name: "Smoke Defense",
    merv: "MERV 13",
    price: 34,
    hex: "#7566A5",
    soft: "#E6E2EF",
    image: "/images/Everyday Filter.png",
  },
  {
    slug: "carbon-defense",
    name: "Carbon Defense",
    merv: "Carbon",
    price: 38,
    hex: "#4A4A55",
    soft: "#E7E5EB",
    image: "/images/Everyday Filter.png",
  },
];

const cadenceOptions: {
  value: Cadence;
  label: string;
  hint: string;
  perYear: number;
}[] = [
  { value: 30, label: "Every 30 days", hint: "Wildfire season, heavy pet homes", perYear: 12 },
  { value: 60, label: "Every 60 days", hint: "Most homes, a good rhythm", perYear: 6 },
  { value: 90, label: "Every 90 days", hint: "Low-traffic homes, apartments", perYear: 4 },
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const deliveryMonths = (cadence: Cadence) => {
  const step = cadence / 30;
  const months: string[] = [];
  for (let i = 0; i < 12; i += step) months.push(MONTH_LABELS[Math.floor(i)]);
  return months;
};

const SUBSCRIBE_DISCOUNT = 0.15;

export function PlanBuilder() {
  const [selected, setSelected] = useState<Record<string, number>>({
    "pet-defense": 1,
  });
  const [cadence, setCadence] = useState<Cadence>(60);

  const totals = useMemo(() => {
    const list = catalog.filter((f) => (selected[f.slug] ?? 0) > 0);
    const subtotal = list.reduce(
      (sum, f) => sum + f.price * (selected[f.slug] ?? 0),
      0,
    );
    const discounted = subtotal * (1 - SUBSCRIBE_DISCOUNT);
    const saved = subtotal - discounted;
    const perYear =
      discounted * (cadenceOptions.find((c) => c.value === cadence)?.perYear ?? 0);
    const oneTimeYear =
      subtotal * (cadenceOptions.find((c) => c.value === cadence)?.perYear ?? 0);
    const savedYear = oneTimeYear - perYear;
    return {
      list,
      subtotal,
      discounted,
      saved,
      perYear,
      savedYear,
      count: Object.values(selected).reduce((a, b) => a + b, 0),
    };
  }, [selected, cadence]);

  const update = (slug: string, delta: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      const current = next[slug] ?? 0;
      const value = Math.max(0, Math.min(6, current + delta));
      if (value === 0) delete next[slug];
      else next[slug] = value;
      return next;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-card ring-1 ring-lavender-100 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lavender-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-lavender-100/70 blur-3xl"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-lavender-500 text-[11px] font-semibold text-white">
              1
            </span>
            <p className="text-eyebrow text-charcoal-light">Pick your filters</p>
          </div>
          <p className="mt-2 text-sm text-charcoal-mid">
            Add one for each return vent. Different concerns and sizes are welcome.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {catalog.map((f) => {
              const qty = selected[f.slug] ?? 0;
              const isSelected = qty > 0;
              return (
                <motion.div
                  key={f.slug}
                  layout
                  className={`relative flex items-center gap-3 rounded-2xl p-3 pr-4 ring-1 transition-all ${
                    isSelected
                      ? "bg-white ring-lavender-400 shadow-soft"
                      : "bg-canvas ring-lavender-100 hover:ring-lavender-300"
                  }`}
                  style={
                    isSelected
                      ? {
                          background: `linear-gradient(180deg, ${f.soft}66 0%, #FFFFFF 100%)`,
                        }
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      qty === 0 ? update(f.slug, 1) : update(f.slug, -qty)
                    }
                    className="relative flex-shrink-0"
                    aria-label={`${isSelected ? "Remove" : "Add"} ${f.name}`}
                  >
                    <div
                      className="relative aspect-[4/5] w-14 overflow-hidden rounded-xl"
                      style={{
                        background: `linear-gradient(180deg, ${f.soft} 0%, #FFFFFF 100%)`,
                      }}
                    >
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-charcoal">
                      {f.name}
                    </p>
                    <p className="text-[11px] text-charcoal-light">
                      {f.merv} · ${f.price}
                    </p>
                  </div>
                  {isSelected ? (
                    <div className="flex items-center gap-1.5 rounded-full bg-white px-1.5 py-1 ring-1 ring-lavender-200">
                      <button
                        type="button"
                        onClick={() => update(f.slug, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-canvas text-charcoal-mid hover:bg-lavender-100"
                        aria-label={`Decrease ${f.name}`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="min-w-[16px] text-center text-xs font-semibold text-charcoal">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => update(f.slug, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-500 text-white hover:bg-lavender-600"
                        aria-label={`Increase ${f.name}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => update(f.slug, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-charcoal-soft"
                      aria-label={`Add ${f.name}`}
                    >
                      <Plus size={14} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-lavender-500 text-[11px] font-semibold text-white">
              2
            </span>
            <p className="text-eyebrow text-charcoal-light">Pick your cadence</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {cadenceOptions.map((c) => {
              const isActive = cadence === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCadence(c.value)}
                  className={`rounded-2xl p-4 text-left ring-1 transition-all ${
                    isActive
                      ? "bg-lavender-500 text-white ring-lavender-500 shadow-soft"
                      : "bg-canvas text-charcoal ring-lavender-100 hover:ring-lavender-300"
                  }`}
                >
                  <p className="font-display text-sm font-semibold">{c.label}</p>
                  <p
                    className={`mt-0.5 text-xs ${
                      isActive ? "text-white/80" : "text-charcoal-light"
                    }`}
                  >
                    {c.hint}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="relative flex h-full flex-col rounded-xl bg-charcoal p-6 text-white shadow-card sm:p-7 lg:sticky lg:top-28 lg:self-start">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lavender-500/30 blur-3xl"
          />

          <div className="relative">
            <p className="text-eyebrow text-lavender-300">Your plan</p>
            <p className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              ${totals.discounted.toFixed(2)}
              <span className="ml-2 align-middle text-sm font-medium text-white/70">
                per delivery
              </span>
            </p>
            {totals.saved > 0 && (
              <p className="mt-2 text-sm text-lavender-200">
                Saving ${totals.saved.toFixed(2)} vs one-time
              </p>
            )}
          </div>

          <div className="relative mt-6 flex-1 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10 backdrop-blur">
            <p className="text-eyebrow text-white/60">In this shipment</p>
            <div className="mt-3 flex flex-col gap-2">
              {totals.list.length === 0 && (
                <p className="text-sm text-white/60">
                  Pick a filter to build your plan.
                </p>
              )}
              <AnimatePresence initial={false}>
                {totals.list.map((f) => {
                  const qty = selected[f.slug] ?? 0;
                  return (
                    <motion.div
                      key={f.slug}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="inline-flex items-center gap-2 text-white">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: f.hex }}
                        />
                        {f.name}
                        {qty > 1 && (
                          <span className="text-white/60">× {qty}</span>
                        )}
                      </span>
                      <span className="font-medium text-white/85">
                        ${(f.price * qty).toFixed(2)}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative mt-4 rounded-2xl bg-lavender-500/15 p-4 ring-1 ring-lavender-400/30">
            <div className="flex items-center justify-between">
              <p className="text-eyebrow text-lavender-200">Delivery preview</p>
              <span className="text-[11px] font-medium text-lavender-200">
                {totals.perYear} / year
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/90">
              {deliveryMonths(cadence).join(" · ")}
            </p>
            <p className="mt-2 text-[11px] text-lavender-200/90">
              Free shipping on every delivery
            </p>
          </div>

          <div className="relative mt-4 space-y-3 border-t border-white/10 pt-4 text-sm">
            <div className="flex items-center justify-between text-white/70">
              <span>Yearly cost</span>
              <span className="text-white">${totals.perYear.toFixed(2)}</span>
            </div>
            {totals.savedYear > 0 && (
              <div className="flex items-center justify-between font-medium text-lavender-200">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={14} /> You save
                </span>
                <span>${totals.savedYear.toFixed(2)} / year</span>
              </div>
            )}
          </div>

          <Link
            href="/cart"
            className={`relative mt-6 inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-sm font-semibold transition-all ${
              totals.count > 0
                ? "bg-lavender-500 text-white hover:bg-lavender-400"
                : "cursor-not-allowed bg-white/10 text-white/50"
            }`}
            aria-disabled={totals.count === 0}
            onClick={(e) => totals.count === 0 && e.preventDefault()}
          >
            {totals.count === 0
              ? "Add a filter to continue"
              : `Start plan · $${totals.discounted.toFixed(2)}`}
            {totals.count > 0 && <ArrowRight size={16} />}
          </Link>
        </aside>
      </div>
    </div>
  );
}
