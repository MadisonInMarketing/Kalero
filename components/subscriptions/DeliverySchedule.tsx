"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, PackageOpen } from "lucide-react";

type Cadence = 30 | 60 | 90;

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const cadences: { value: Cadence; label: string; every: string; perYear: number }[] = [
  { value: 30, label: "Every 30 days", every: "12 deliveries a year", perYear: 12 },
  { value: 60, label: "Every 60 days", every: "6 deliveries a year", perYear: 6 },
  { value: 90, label: "Every 90 days", every: "4 deliveries a year", perYear: 4 },
];

const deliveryDots = (cadence: Cadence) => {
  const dots: number[] = [];
  const step = cadence / 30;
  for (let i = 0; i < 12; i += step) {
    dots.push(Math.floor(i));
  }
  return dots;
};

export function DeliverySchedule() {
  const [cadence, setCadence] = useState<Cadence>(60);
  const active = deliveryDots(cadence);
  const info = cadences.find((c) => c.value === cadence)!;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lavender-100 via-lavender-50 to-canvas p-6 shadow-soft ring-1 ring-lavender-100 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-lavender-300/40 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-eyebrow text-lavender-700 ring-1 ring-lavender-200 backdrop-blur">
            <CalendarDays size={12} />
            A year at a glance
          </span>
          <h2 className="mt-4 font-display text-display-md font-semibold text-charcoal text-balance sm:text-display-lg">
            Here&apos;s when your filters arrive.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-mid text-pretty sm:text-base">
            Pick a cadence and see the year lay out. Every drop is free shipping, and we
            email you a heads-up a few days before each one ships.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {cadences.map((c) => {
            const isActive = c.value === cadence;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCadence(c.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-charcoal text-white shadow-soft"
                    : "bg-white text-charcoal-mid ring-1 ring-lavender-200 hover:ring-lavender-400 hover:text-charcoal"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10 rounded-xl bg-white/85 p-6 ring-1 ring-white/70 shadow-soft backdrop-blur sm:p-8">
        <div className="flex items-center justify-between text-eyebrow text-charcoal-light">
          <span>Your year</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={cadence}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-3 py-1 text-eyebrow text-lavender-700"
            >
              <PackageOpen size={12} />
              {info.every}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative mt-6">
          <div className="pointer-events-none absolute left-0 right-0 top-[22px] h-0.5 rounded-full bg-lavender-100" />
          <div className="grid grid-cols-12 gap-1.5">
            {months.map((m, i) => {
              const isDrop = active.includes(i);
              return (
                <div
                  key={m}
                  className="relative flex flex-col items-center"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isDrop ? (
                      <motion.div
                        key={`${m}-drop-${cadence}`}
                        layout
                        initial={{ scale: 0, opacity: 0, y: 4 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                          delay: i * 0.02,
                        }}
                        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-lavender-500 text-white shadow-[0_10px_20px_-8px_rgba(145,100,210,0.7)] ring-4 ring-white"
                      >
                        <PackageOpen size={16} strokeWidth={2} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`${m}-blank-${cadence}`}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 mt-3.5 h-4 w-4 rounded-full bg-lavender-100 ring-2 ring-white"
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  <span
                    className={`mt-3 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors ${
                      isDrop ? "text-charcoal" : "text-charcoal-light"
                    }`}
                  >
                    {m}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            {
              stat: `${info.perYear}`,
              label: "Deliveries a year",
            },
            { stat: "Free", label: "Shipping on every order" },
            { stat: "48h", label: "Cancel or pause window before ship" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-canvas p-4 text-center ring-1 ring-lavender-100"
            >
              <p className="font-display text-2xl font-bold text-charcoal">
                {s.stat}
              </p>
              <p className="mt-1 text-xs text-charcoal-mid">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
