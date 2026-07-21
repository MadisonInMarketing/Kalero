"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/copy";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative isolate py-24 sm:py-28"
      aria-labelledby="faq-title"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Good questions</p>
            <h2
              id="faq-title"
              className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
            >
              Everything you might wonder before you subscribe.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Filter shopping should feel obvious. If something here doesn&apos;t,
              our team can help by email or chat.
            </p>
          </div>

          <div className="divide-y divide-lavender-100 rounded-card bg-white ring-1 ring-lavender-100 shadow-soft">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-charcoal sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-lavender-500 text-white"
                          : "bg-canvas text-charcoal-mid group-hover:bg-lavender-100 group-hover:text-lavender-700"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-charcoal-mid text-pretty">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
