import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { scentCopy, scentStripPrice, scents } from "@/lib/scentStrips";

type CartScentUpsellProps = {
  /** Compact rail (used inside sidebar) vs full-width block. */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * "Complete your setup" cart upsell. Kept understated — one small block,
 * 1-3 scent options with quick-add affordance.
 */
export function CartScentUpsell({
  variant = "full",
  className,
}: CartScentUpsellProps) {
  const available = scents.filter((s) => s.available).slice(0, 3);
  const compact = variant === "compact";

  return (
    <section
      aria-labelledby="cart-scent-upsell-title"
      className={[
        "rounded-2xl border border-lavender-100/80 bg-white p-6 shadow-soft",
        compact ? "sm:p-6" : "sm:p-7",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-lavender-600">
            Complete your setup
          </p>
          <p
            id="cart-scent-upsell-title"
            className="mt-2 font-display text-lg font-semibold text-charcoal"
          >
            Optional fresh-home upgrade.
          </p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-charcoal-mid text-pretty">
            Add a Kalero scent strip to pair with your filter.
          </p>
        </div>
        <Link
          href="/scent-strips"
          className="link-underline hidden shrink-0 items-center gap-1 text-xs font-medium text-lavender-700 sm:inline-flex"
        >
          See all scents
          <ArrowRight size={12} />
        </Link>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {available.map((scent) => (
          <li
            key={scent.key}
            className="flex h-full flex-col justify-between gap-3 rounded-xl bg-lavender-50/60 p-4 ring-1 ring-lavender-100"
          >
            <div>
              <p className="text-sm font-semibold text-charcoal">
                {scent.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-charcoal-mid text-pretty">
                {scent.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-lavender-700">
                +${scentStripPrice.toFixed(2)}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-pill bg-white px-3 py-1.5 text-xs font-medium text-charcoal ring-1 ring-lavender-200 transition-colors hover:bg-lavender-100"
              >
                <Plus size={12} strokeWidth={2.25} />
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[11px] leading-relaxed text-charcoal-light">
        {scentCopy.disclaimer}
      </p>
    </section>
  );
}
