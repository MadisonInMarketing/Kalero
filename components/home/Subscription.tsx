"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, RefreshCw, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ProductRender } from "@/components/product/ProductRender";
import { productBySlug } from "@/lib/products";

type Mode = "onetime" | "subscribe";

export function Subscription() {
  const [mode, setMode] = useState<Mode>("subscribe");
  const [cadence, setCadence] = useState<30 | 60 | 90>(60);
  const base = 32;
  const savings = 0.15;
  const price =
    mode === "subscribe"
      ? Math.round(base * (1 - savings) * 100) / 100
      : base;

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-canvas via-lavender-50/40 to-canvas py-24 sm:py-28"
      aria-labelledby="subscription-title"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div className="max-w-lg">
            <p className="eyebrow">Subscribe & save</p>
            <h2
              id="subscription-title"
              className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
            >
              Your next filter, right when you need it.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Select your size, choose your schedule, and let KALERO take filter
              replacement off your mental checklist.
            </p>

            <ul className="mt-8 grid gap-3 text-sm text-charcoal-mid sm:grid-cols-2">
              {[
                "Delivery every 30, 60, or 90 days",
                "Multiple-filter households",
                "Pause or cancel anytime",
                "Save 15% every filter",
                "Free shipping",
                "Replacement reminders",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-lavender-100 text-lavender-700">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <LinkButton href="/subscriptions" size="lg" arrow>
                Build my filter plan
              </LinkButton>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="rounded-xl bg-white p-6 ring-1 ring-lavender-100 shadow-card sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Your plan preview</p>
                  <p className="mt-2 font-display text-xl font-semibold text-charcoal">
                    Allergy Defense
                  </p>
                  <p className="mt-0.5 text-sm text-charcoal-mid">MERV 13 · 20 × 25 × 1</p>
                </div>
                <div className="pointer-events-none">
                  <ProductRender
                    name="Allergy Defense"
                    subtitle="For pollen weeks"
                    merv="MERV 13"
                    category="allergy"
                    image={productBySlug("allergy-defense")?.image}
                    size="sm"
                    floating={false}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-canvas p-1 ring-1 ring-lavender-100">
                {(["onetime", "subscribe"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                      mode === m ? "text-charcoal" : "text-charcoal-light"
                    }`}
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="sub-toggle"
                        className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-lavender-100"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative">
                      {m === "onetime" ? "One-time purchase" : "Subscribe & save 15%"}
                    </span>
                  </button>
                ))}
              </div>

              {mode === "subscribe" && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-charcoal">Delivery cadence</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {([30, 60, 90] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCadence(c)}
                        className={`rounded-2xl border px-3 py-3 text-center text-sm font-medium transition-all ${
                          cadence === c
                            ? "border-lavender-500 bg-lavender-50 text-charcoal"
                            : "border-lavender-100 bg-white text-charcoal-mid hover:border-lavender-300"
                        }`}
                      >
                        <span className="block font-display text-lg font-semibold">
                          {c} days
                        </span>
                        <span className="text-xs text-charcoal-light">
                          {c === 30 ? "Heavy use" : c === 60 ? "Most homes" : "Light use"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-end justify-between border-t border-lavender-100 pt-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-charcoal-light">
                    {mode === "subscribe" ? "Every filter" : "One-time"}
                  </p>
                  <p className="mt-1 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-semibold text-charcoal">
                      ${price.toFixed(2)}
                    </span>
                    {mode === "subscribe" && (
                      <span className="text-sm text-charcoal-light line-through">
                        ${base.toFixed(2)}
                      </span>
                    )}
                  </p>
                  {mode === "subscribe" && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-lavender-700">
                      <Sparkles size={12} /> Save 15% + free shipping
                    </p>
                  )}
                </div>
                <div className="text-right text-xs text-charcoal-light">
                  <div className="flex items-center justify-end gap-1.5">
                    <RefreshCw size={12} />
                    <span>Pause or skip anytime</span>
                  </div>
                  <div className="mt-1">No lock-in</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-4 rounded-2xl bg-charcoal p-5 text-white shadow-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-lavender-300">
                    Reminder
                  </p>
                  <p className="mt-1 font-display text-sm font-medium">
                    Your next Allergy Defense ships in 4 weeks.
                  </p>
                </div>
                <span className="rounded-full bg-lavender-500 px-3 py-1 text-xs font-medium">
                  Confirmed
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
