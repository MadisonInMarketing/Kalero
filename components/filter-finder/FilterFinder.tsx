"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Ruler } from "lucide-react";
import {
  availableDepths,
  availableHeights,
  availableWidths,
  sizeSlug,
  sizes,
} from "@/lib/sizes";

/**
 * Big three-select filter finder — the conversion primitive from
 * filterbuy.com, expressed in KALERO's visual language.
 *
 * Selecting W/H/D and clicking "Find My Filter" navigates to
 * /air-filters/[slug] (the PDP). If the combination isn't a known
 * standard size, we route to /custom-filters with the dimensions
 * pre-filled via query params.
 */
export function FilterFinder() {
  const router = useRouter();
  const [width, setWidth] = useState<number>(20);
  const [height, setHeight] = useState<number>(25);
  const [depth, setDepth] = useState<number>(1);
  const [guideOpen, setGuideOpen] = useState(false);

  const slug = useMemo(() => sizeSlug(width, height, depth), [width, height, depth]);
  const isStandard = useMemo(() => sizes.some((s) => s.slug === slug), [slug]);

  const handleFind = () => {
    if (isStandard) {
      router.push(`/air-filters/${slug}`);
    } else {
      router.push(
        `/custom-filters?width=${width}&height=${height}&depth=${depth}`,
      );
    }
  };

  return (
    <section
      aria-labelledby="find-filter-title"
      className="relative isolate"
    >
      <div className="container-x">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-card ring-1 ring-sky-100 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-eyebrow text-sky-700">Find Your Filter</p>
            <h2
              id="find-filter-title"
              className="font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
            >
              Find your filter in seconds.
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <SizeSelect
              label="Width"
              value={width}
              options={availableWidths}
              onChange={setWidth}
            />
            <SizeSelect
              label="Height"
              value={height}
              options={availableHeights}
              onChange={setHeight}
            />
            <SizeSelect
              label="Depth"
              value={depth}
              options={availableDepths}
              onChange={setDepth}
            />
            <button
              type="button"
              onClick={handleFind}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-7 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-sky-700"
            >
              Find My Filter
              <ArrowRight size={16} strokeWidth={2.25} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-mid">
            <span>
              Your selection:{" "}
              <span className="font-semibold text-charcoal">
                {width} × {height} × {depth}
              </span>
              {!isStandard && (
                <span className="ml-2 text-sky-700">
                  (we&apos;ll route you to a custom filter build)
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="inline-flex items-center gap-1.5 font-medium text-sky-700 hover:text-sky-800"
            >
              <Ruler size={14} strokeWidth={2} />
              Don&apos;t know your size?
            </button>
          </div>
        </div>
      </div>

      {guideOpen && <MeasurementGuideModal onClose={() => setGuideOpen(false)} />}
    </section>
  );
}

function SizeSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: number[];
  onChange: (v: number) => void;
}) {
  const id = `finder-${label.toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-mid"
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-12 w-full appearance-none rounded-full border border-sky-200 bg-white pl-5 pr-11 text-base font-semibold text-charcoal shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sky-600"
        >
          ▾
        </span>
      </div>
    </div>
  );
}

function MeasurementGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-label="How to measure your filter"
    >
      <div
        className="mx-4 w-full max-w-lg rounded-2xl bg-white p-8 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-eyebrow text-sky-700">Filter size guide</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-charcoal">
          Read the frame of your current filter.
        </h3>
        <ol className="mt-6 flex flex-col gap-3 text-sm text-charcoal-mid">
          <li>
            <span className="font-semibold text-charcoal">1. Pull it out.</span>{" "}
            Slide the filter out of your return vent or air handler.
          </li>
          <li>
            <span className="font-semibold text-charcoal">2. Read the edge.</span>{" "}
            The three dimensions are printed on the cardboard frame (e.g.{" "}
            <span className="font-mono">16 × 25 × 1</span>).
          </li>
          <li>
            <span className="font-semibold text-charcoal">3. Enter it above.</span>{" "}
            If your size isn&apos;t in the dropdowns, we&apos;ll build a custom
            one to fit.
          </li>
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-charcoal text-sm font-medium text-white hover:bg-charcoal-soft"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
