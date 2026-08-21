import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { popularSizes, formatSize } from "@/lib/sizes";

/**
 * Homepage §9 — grid of the most common HVAC filter sizes.
 * Links each size to /air-filters/[slug]. Complete size database
 * lives behind the "View all sizes" link.
 */
export function PopularSizes() {
  return (
    <section
      aria-labelledby="popular-sizes-title"
      className="relative isolate py-16 sm:py-20"
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-eyebrow text-sky-700">Shop Popular Sizes</p>
            <h2
              id="popular-sizes-title"
              className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
            >
              The sizes homes are asking for.
            </h2>
          </div>
          <Link
            href="/air-filters"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 transition-colors hover:text-sky-800"
          >
            View All Sizes
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {popularSizes.map((s) => (
            <Link
              key={s.slug}
              href={`/air-filters/${s.slug}`}
              className="group flex flex-col items-center rounded-2xl border border-sky-100 bg-white px-4 py-5 text-center transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-soft"
            >
              <span className="font-display text-2xl font-bold text-charcoal">
                {formatSize(s)}
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal-light">
                Air Filter
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-700 transition-transform group-hover:translate-x-0.5">
                Shop this size
                <ArrowRight size={12} strokeWidth={2.25} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
