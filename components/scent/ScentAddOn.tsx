"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  scentCopy,
  scentStripPrice,
  scents,
  type ScentKey,
} from "@/lib/scentStrips";

type ScentAddOnValue = {
  scentKey: ScentKey | null;
  quantity: number;
};

type ScentAddOnProps = {
  value?: ScentAddOnValue;
  onChange?: (v: ScentAddOnValue) => void;
  className?: string;
};

/**
 * Optional "Add a Scent Strip" module for PDP purchase area.
 * Default selection is "No scent" so the feature reads as optional.
 */
export function ScentAddOn({
  value,
  onChange,
  className,
}: ScentAddOnProps) {
  const [internal, setInternal] = useState<ScentAddOnValue>(
    value ?? { scentKey: null, quantity: 1 },
  );
  const state = value ?? internal;

  const update = (next: ScentAddOnValue) => {
    if (onChange) onChange(next);
    else setInternal(next);
  };

  return (
    <section
      aria-labelledby="scent-add-on-title"
      className={[
        "rounded-2xl border border-lavender-100/80 bg-white/70 p-5 backdrop-blur-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            id="scent-add-on-title"
            className="font-display text-base font-semibold text-charcoal"
          >
            Add a Scent Strip
          </p>
          <p className="mt-0.5 text-xs text-charcoal-mid">
            Optional fragrance upgrade for your filter
          </p>
        </div>
        <span className="rounded-full bg-lavender-100/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-lavender-700">
          Optional
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        <ScentOption
          selected={state.scentKey === null}
          title="No scent"
          subtitle="Filter only."
          priceLabel="Included"
          onClick={() => update({ ...state, scentKey: null })}
        />
        {scents.map((s) => (
          <ScentOption
            key={s.key}
            selected={state.scentKey === s.key}
            disabled={!s.available}
            title={s.name}
            subtitle={s.description}
            priceLabel={
              s.available
                ? `+$${scentStripPrice.toFixed(2)}`
                : (s.note ?? "Coming soon")
            }
            onClick={() =>
              s.available && update({ ...state, scentKey: s.key })
            }
          />
        ))}
      </div>

      {state.scentKey !== null && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-lavender-100/40 px-4 py-2.5">
          <span className="text-xs font-medium text-charcoal">
            Strips
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease strips"
              onClick={() =>
                update({
                  ...state,
                  quantity: Math.max(1, state.quantity - 1),
                })
              }
              className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-mid ring-1 ring-lavender-200/80 transition-colors hover:text-charcoal"
            >
              −
            </button>
            <span className="min-w-6 text-center text-sm font-medium text-charcoal tabular-nums">
              {state.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase strips"
              onClick={() =>
                update({
                  ...state,
                  quantity: Math.min(6, state.quantity + 1),
                })
              }
              className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-mid ring-1 ring-lavender-200/80 transition-colors hover:text-charcoal"
            >
              +
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-charcoal-mid">
        Peel to activate, slide into the filter, and enjoy a subtle
        fresh-home scent.
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-charcoal-light">
        {scentCopy.disclaimer}
      </p>
    </section>
  );
}

type ScentOptionProps = {
  selected: boolean;
  disabled?: boolean;
  title: string;
  subtitle: string;
  priceLabel: string;
  onClick: () => void;
};

function ScentOption({
  selected,
  disabled = false,
  title,
  subtitle,
  priceLabel,
  onClick,
}: ScentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        "group flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-all",
        selected
          ? "bg-white ring-2 ring-lavender-500"
          : "bg-white/60 ring-1 ring-lavender-100 hover:ring-lavender-300",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      ].join(" ")}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-charcoal">
          {title}
        </p>
        <p className="truncate text-xs text-charcoal-mid">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span
          className={
            selected
              ? "text-xs font-semibold text-lavender-700"
              : "text-xs font-medium text-charcoal-mid"
          }
        >
          {priceLabel}
        </span>
        {selected && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lavender-500 text-white">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
      </div>
    </button>
  );
}
