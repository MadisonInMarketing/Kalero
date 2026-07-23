import type { Product } from "@/lib/products";

export type ScentKey = "hotel-clean" | "fresh-linen" | "seasonal";

export type Scent = {
  key: ScentKey;
  name: string;
  description: string;
  /** Marketing note shown near the option. */
  note?: string;
  available: boolean;
};

/** Add new scents here as they launch. Structure supports future expansion. */
export const scents: Scent[] = [
  {
    key: "hotel-clean",
    name: "Hotel Clean",
    description: "Soft, elevated, laundered-linen freshness.",
    available: true,
  },
  {
    key: "fresh-linen",
    name: "Fresh Linen",
    description: "Bright, subtle, everyday clean.",
    available: true,
  },
  {
    key: "seasonal",
    name: "Seasonal",
    description: "A rotating seasonal fragrance.",
    note: "Coming soon",
    available: false,
  },
];

/** Price per scent strip. Same across scents for now. */
export const scentStripPrice = 8;

/**
 * Whether a given product accepts a scent strip. Every standard Kalero
 * filter is compatible; keep this centralized so future exceptions
 * (e.g. carbon activated) can be flipped off in one place.
 */
export function isScentCompatible(product: Product): boolean {
  return product.category !== "carbon";
}

/** Copy shared across the site so voice stays consistent. */
export const scentCopy = {
  eyebrow: "A fresh-home upgrade",
  headline: "Filter first. Fresh scent, optional.",
  supporting:
    "Add a Kalero scent strip for a subtle, elevated fragrance experience through your home's airflow.",
  badge: "Scent Strip Compatible",
  microcopy: "Optional scent upgrade available",
  disclaimer:
    "Scent strength may vary depending on home size, HVAC runtime, and system airflow.",
  howItWorksHeadline: "How Kalero scent strips work",
  howItWorksBody:
    "Each strip is activated, inserted into the filter, and gently distributed through your home's airflow system.",
  steps: [
    {
      key: "activate",
      title: "Activate",
      body: "Peel to activate the scent strip.",
    },
    {
      key: "slide-in",
      title: "Slide in",
      body: "Insert it into the designated filter slot.",
    },
    {
      key: "enjoy",
      title: "Enjoy",
      body: "Let airflow carry the fragrance through your home.",
    },
  ] as const,
};
