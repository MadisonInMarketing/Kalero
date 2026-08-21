"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { sizeBySlug, formatSize } from "@/lib/sizes";
import { tierById } from "@/lib/tiers";
import { businessConfig } from "@/lib/business";

export function CartDrawer() {
  const {
    items,
    drawerOpen,
    itemCount,
    subtotal,
    updateQuantity,
    remove,
    closeDrawer,
  } = useCart();

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  // Escape to close
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-label="Cart"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-sky-100 px-6 py-5">
              <div>
                <p className="text-eyebrow text-sky-700">Your cart</p>
                <p className="font-display text-lg font-semibold text-charcoal">
                  {itemCount === 0
                    ? "Empty"
                    : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeDrawer}
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-soft hover:bg-canvas"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="font-display text-xl font-semibold text-charcoal">
                  Your cart is quiet.
                </p>
                <p className="max-w-xs text-sm text-charcoal-mid">
                  Add a filter by size and tier, and it&apos;ll show up here.
                </p>
                <Link
                  href="/air-filters"
                  onClick={closeDrawer}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-soft"
                >
                  Shop all filters
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-sky-100 overflow-y-auto px-6">
                  {items.map((item) => {
                    const size = sizeBySlug(item.sizeSlug);
                    const tier = tierById(item.tierId);
                    return (
                      <li key={item.id} className="flex gap-4 py-5">
                        <div
                          aria-hidden="true"
                          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-white shadow-soft"
                          style={{ backgroundColor: tier.hex }}
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                            MERV
                          </span>
                          <span className="ml-1 font-display text-lg font-bold leading-none">
                            {tier.merv}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-charcoal">
                            {size ? formatSize(size) : item.sizeSlug} · {tier.name}
                          </p>
                          <p className="mt-0.5 text-xs text-charcoal-mid">
                            {item.packQty}-pack ·{" "}
                            {item.purchaseType === "subscribe"
                              ? `Ships every ${item.subscribeCadenceDays ?? 60} days`
                              : "One-time"}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <QuantityStepper
                              qty={item.quantity}
                              onChange={(q) => updateQuantity(item.id, q)}
                            />
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              className="text-xs font-medium text-charcoal-mid hover:text-charcoal"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <footer className="border-t border-sky-100 bg-canvas/40 px-6 py-5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-charcoal-mid">Subtotal</span>
                    <span className="font-display text-lg font-semibold text-charcoal">
                      {subtotal == null ? "—" : `$${subtotal.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal == null && (
                    <p className="mt-2 text-[11px] text-charcoal-light">
                      Pricing is being finalized. You&apos;ll see totals here once
                      variants are priced.
                    </p>
                  )}
                  {businessConfig.shippingMessage && (
                    <p className="mt-2 text-[11px] text-sky-700">
                      {businessConfig.shippingMessage}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={subtotal == null}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-charcoal text-sm font-semibold text-white transition-colors hover:bg-charcoal-soft disabled:cursor-not-allowed disabled:bg-charcoal/40"
                  >
                    {subtotal == null ? "Checkout unavailable" : "Checkout"}
                  </button>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="mt-3 block text-center text-xs font-medium text-sky-700 underline-offset-2 hover:underline"
                  >
                    View full cart →
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuantityStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-sky-200">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(qty - 1)}
        className="flex h-7 w-7 items-center justify-center text-charcoal-mid hover:text-charcoal"
      >
        <Minus size={12} strokeWidth={2} />
      </button>
      <span className="w-6 text-center text-xs font-semibold text-charcoal">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="flex h-7 w-7 items-center justify-center text-charcoal-mid hover:text-charcoal"
      >
        <Plus size={12} strokeWidth={2} />
      </button>
    </div>
  );
}
