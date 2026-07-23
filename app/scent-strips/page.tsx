import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { HowScentStripsWork } from "@/components/scent/HowScentStripsWork";
import { ScentBadge } from "@/components/ui/ScentBadge";
import { scentCopy, scentStripPrice, scents } from "@/lib/scentStrips";

export const metadata: Metadata = {
  title: "Kalero Scent Strips",
  description:
    "An optional fresh-home upgrade for your Kalero air filter. Peel to activate, slide into the filter, and let airflow carry a subtle fragrance through your home.",
};

export default function ScentStripsPage() {
  return (
    <>
      <section className="border-b border-lavender-100/70 bg-gradient-to-b from-lavender-50/70 via-canvas to-canvas">
        <div className="container-x py-16 sm:py-20">
          <div className="max-w-2xl">
            <ScentBadge label="Optional scent add-on" />
            <h1 className="mt-6 font-display text-display-xl font-semibold text-charcoal text-balance">
              Filter first.{" "}
              <span className="text-lavender-600">Fresh scent, optional.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal-mid text-pretty">
              {scentCopy.supporting}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-pill bg-lavender-500 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-lavender-600"
              >
                Shop compatible filters
                <ArrowRight size={16} />
              </Link>
              <span className="text-xs text-charcoal-light">
                Scent strips ship with any Kalero filter subscription.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <HowScentStripsWork />
        </div>
      </section>

      <section className="border-t border-lavender-100/60 bg-white/60 py-16 sm:py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-lavender-600">
              Available scents
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl">
              A short, restrained scent library.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {scents.map((scent) => (
              <div
                key={scent.key}
                className="flex h-full flex-col rounded-2xl border border-lavender-100 bg-white p-6 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-lg font-semibold text-charcoal">
                    {scent.name}
                  </p>
                  {scent.available ? (
                    <span className="text-sm font-semibold text-lavender-700">
                      ${scentStripPrice.toFixed(2)}
                    </span>
                  ) : (
                    <span className="rounded-full bg-lavender-100/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-lavender-700">
                      {scent.note ?? "Coming soon"}
                    </span>
                  )}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-mid text-pretty">
                  {scent.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-charcoal-light">
            {scentCopy.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
