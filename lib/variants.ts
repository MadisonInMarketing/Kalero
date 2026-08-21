/**
 * Variant configuration for the KALERO tier + size + pack model.
 *
 * Pricing is intentionally NULL until the business confirms it. The UI hides
 * price rows and disables cart actions when variantPrice() returns null.
 */
import type { TierId } from "./tiers";
import type { FilterSize } from "./sizes";

export type PackQty = 1 | 2 | 4 | 6 | 12;
export type PurchaseType = "onetime" | "subscribe";
export type SubscribeCadenceDays = 30 | 60 | 90 | 180;

export const PACK_QUANTITIES: PackQty[] = [1, 2, 4, 6, 12];
export const SUBSCRIBE_CADENCES: SubscribeCadenceDays[] = [30, 60, 90, 180];

/**
 * Best-value pack — surfaced with a "Best value" chip in the pack selector.
 * Marked here rather than fabricated at render time so it can be turned off
 * per business decision later.
 */
export const BEST_VALUE_PACK: PackQty = 4;

/**
 * Pricing matrix. All entries default to null until confirmed by business.
 * When null, the UI:
 *   - hides the price row on cards / configurators
 *   - disables the Add to Cart button
 *   - shows a "Pricing coming soon" microcopy line
 *
 * Structure keeps future population straightforward — index is [tier][pack].
 */
type TierPriceMatrix = Partial<Record<TierId, Partial<Record<PackQty, number | null>>>>;

const priceMatrix: TierPriceMatrix = {
  standard: {},
  pro: {},
  max: {},
};

/**
 * Returns the base price for a size × tier × pack variant.
 * Depth can drive a multiplier once we're confident (4" filters generally
 * cost more than 1"), but until pricing is confirmed everything returns null.
 */
export function variantPrice(
  _size: FilterSize,
  tier: TierId,
  pack: PackQty,
): number | null {
  const base = priceMatrix[tier]?.[pack];
  return typeof base === "number" ? base : null;
}

/** Convenience: does this variant have a confirmed price? */
export function hasVariantPrice(
  size: FilterSize,
  tier: TierId,
  pack: PackQty,
): boolean {
  return variantPrice(size, tier, pack) !== null;
}
