/**
 * KALERO business configuration.
 * All fields default to null so the UI never renders unsupported claims.
 * Fill in a value only when it's been confirmed with the business.
 */
export type BusinessConfig = {
  /** Sitewide announcement bar copy. Null hides the bar entirely. */
  announcementBar: string | null;
  /** Short line displayed on PDPs under Add to Cart. */
  shippingMessage: string | null;
  /** e.g. "Free shipping on orders over $50" threshold amount. */
  shippingThreshold: number | null;
  /** Returns / satisfaction copy near cart or PDP. */
  returnsMessage: string | null;
  /** Manufacturing origin claim (e.g. "Made in USA"). */
  manufacturingMessage: string | null;
  /** Percentage discount applied when subscribing (0-100). */
  subscriptionDiscount: number | null;
  supportEmail: string | null;
  supportPhone: string | null;
};

export const businessConfig: BusinessConfig = {
  announcementBar: null,
  shippingMessage: null,
  shippingThreshold: null,
  returnsMessage: null,
  manufacturingMessage: null,
  subscriptionDiscount: null,
  supportEmail: null,
  supportPhone: null,
};

/**
 * Convenience helper — returns the subscription discount as a decimal
 * (e.g. 15 → 0.15) or null if no discount is configured.
 */
export function subscriptionMultiplier(): number | null {
  const d = businessConfig.subscriptionDiscount;
  if (d == null) return null;
  return 1 - d / 100;
}
