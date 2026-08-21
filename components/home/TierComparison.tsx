import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { tiers, type TierId } from "@/lib/tiers";

type Row = {
  label: string;
  cells: Record<TierId, "yes" | "limited" | "no">;
};

const rows: Row[] = [
  {
    label: "Everyday dust",
    cells: { standard: "yes", pro: "yes", max: "yes" },
  },
  {
    label: "Pollen",
    cells: { standard: "yes", pro: "yes", max: "yes" },
  },
  {
    label: "Lint & fine fibers",
    cells: { standard: "yes", pro: "yes", max: "yes" },
  },
  {
    label: "Pet dander",
    cells: { standard: "no", pro: "yes", max: "yes" },
  },
  {
    label: "Fine particles",
    cells: { standard: "no", pro: "yes", max: "yes" },
  },
  {
    label: "Smoke & smog",
    cells: { standard: "no", pro: "limited", max: "yes" },
  },
];

const bestFor: Record<TierId, string> = {
  standard: "Everyday homes",
  pro: "Pets + allergies",
  max: "Maximum filtration",
};

/**
 * Homepage §11 — Standard / Pro / Max at-a-glance comparison.
 * Driven from lib/tiers.ts so adding a tier or feature never
 * requires touching JSX.
 */
export function TierComparison() {
  return (
    <section
      aria-labelledby="tier-compare-title"
      className="relative isolate py-16 sm:py-20"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">Compare</p>
          <h2
            id="tier-compare-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Which KALERO is right for you?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal-mid">
            Three levels of filtration. One easy choice.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-sky-100">
          {/* Table header — tier tiles */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-stretch">
            <div className="border-r border-sky-100 bg-canvas p-5 sm:p-6">
              <p className="text-eyebrow text-charcoal-light">Filtration</p>
              <p className="mt-2 text-sm text-charcoal-mid">
                What each tier is built to handle.
              </p>
            </div>
            {tiers.map((t) => (
              <div
                key={t.id}
                className="border-r border-sky-100 p-4 text-center last:border-r-0 sm:p-6"
                style={{ backgroundColor: t.softHex }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: t.deepHex }}
                >
                  {t.name}
                </p>
                <p
                  className="mt-1 font-display text-lg font-bold sm:text-xl"
                  style={{ color: t.deepHex }}
                >
                  MERV {t.merv}
                </p>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-t border-sky-100 ${
                i % 2 === 0 ? "bg-white" : "bg-canvas/40"
              }`}
            >
              <div className="border-r border-sky-100 p-4 text-sm font-medium text-charcoal sm:p-5">
                {row.label}
              </div>
              {tiers.map((t) => (
                <div
                  key={t.id}
                  className="border-r border-sky-100 p-4 text-center text-charcoal last:border-r-0 sm:p-5"
                >
                  <Cell state={row.cells[t.id]} />
                </div>
              ))}
            </div>
          ))}

          {/* Best-for footer row */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-t-2 border-sky-100 bg-canvas/60">
            <div className="border-r border-sky-100 p-4 text-eyebrow text-charcoal-light sm:p-5">
              Best For
            </div>
            {tiers.map((t) => (
              <div
                key={t.id}
                className="border-r border-sky-100 p-4 text-center text-xs font-semibold text-charcoal last:border-r-0 sm:p-5"
              >
                {bestFor[t.id]}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/air-filters"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-charcoal px-6 text-sm font-medium text-white transition-colors hover:bg-charcoal-soft"
          >
            Compare Filters
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
          <Link
            href="/find-your-filter"
            className="text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Not sure? Take the quiz →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Cell({ state }: { state: "yes" | "limited" | "no" }) {
  if (state === "yes") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700">
        <Check size={14} strokeWidth={2.5} />
      </span>
    );
  }
  if (state === "limited") {
    return (
      <span className="inline-flex h-7 items-center justify-center rounded-full bg-canvas px-2 text-[11px] font-medium text-charcoal-mid ring-1 ring-charcoal/10">
        Limited
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center text-charcoal-light">
      <Minus size={16} strokeWidth={2} />
    </span>
  );
}
