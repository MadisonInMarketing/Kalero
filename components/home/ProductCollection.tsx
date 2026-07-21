import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProductCollection() {
  return (
    <section
      className="relative isolate py-24 sm:py-28"
      aria-labelledby="collection-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 h-96 bg-lavender-glow"
      />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">The lineup</p>
            <h2
              id="collection-title"
              className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
            >
              A filter for every kind of home.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Six clearly named filters, one for each real-life air concern. Sizes are
              standard residential, and every one is subscription-ready.
            </p>
          </div>
          <Link
            href="/shop"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-lavender-700"
          >
            View all filters
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-charcoal">
              For hotels, property groups, and multi-building supply
            </p>
            <p className="mt-1 text-sm text-charcoal-mid">
              KALERO&apos;s Hotel Collection is our separate hospitality and property-management offering.
            </p>
          </div>
          <Link
            href="/hotel-property"
            className="inline-flex items-center gap-2 rounded-pill bg-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold-deep hover:text-white"
          >
            Explore property supply
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
