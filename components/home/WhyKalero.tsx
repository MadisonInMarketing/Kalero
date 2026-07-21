import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const typical = [
  "Technical packaging",
  "Too many unexplained ratings",
  "Generic products",
  "Easy to forget replacements",
  "Designed like a hardware product",
];

const kalero = [
  "Shop by your actual air concerns",
  "Clear product guidance",
  "Filters for different lifestyles",
  "Delivered when needed",
  "Designed as part of home wellness",
];

export function WhyKalero() {
  return (
    <section
      className="relative isolate py-24 sm:py-28"
      aria-labelledby="why-title"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">The KALERO way</p>
          <h2
            id="why-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Air filters should not be this confusing.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Two ways of buying a filter for your home. One of them should feel a lot
            more like the rest of how you take care of your house.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-card bg-canvas p-8 ring-1 ring-charcoal/5">
              <div className="flex items-center gap-3">
                <span className="rounded-pill bg-charcoal/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-charcoal-mid">
                  Typical filter shopping
                </span>
              </div>
              <p className="mt-6 font-display text-xl font-semibold text-charcoal-mid">
                Feels like the hardware aisle.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-charcoal-mid">
                {typical.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal/10 text-charcoal-mid">
                      <X size={12} strokeWidth={2.5} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-card bg-gradient-to-br from-lavender-500 to-lavender-700 p-8 text-white shadow-card">
              <div className="flex items-center gap-3">
                <span className="rounded-pill bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white">
                  The KALERO way
                </span>
              </div>
              <p className="mt-6 font-display text-xl font-semibold">
                Feels like the rest of home wellness.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/90">
                {kalero.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-white">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-display text-lg font-semibold text-balance">
                Better air starts with making the right choice easier.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
