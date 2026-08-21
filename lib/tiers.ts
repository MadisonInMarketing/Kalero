/**
 * KALERO performance tiers.
 * The primary product axis for the new tier + size commerce model.
 * Each SIZE × TIER × PACK is a variant; tier is the fixed 3-way choice.
 */
export type TierId = "standard" | "pro" | "max";
export type MervRating = 8 | 11 | 13;

export type FilterTier = {
  id: TierId;
  name: string;
  merv: MervRating;
  tagline: string;
  positioning: string;
  bestFor: string[];
  captures: string[];
  colorToken: "merv-standard" | "merv-pro" | "merv-max";
  hex: string;
  softHex: string;
  deepHex: string;
  /** Default hero render for the tier. Points to a category folder proxy for now. */
  heroImage: string;
};

export const tiers: FilterTier[] = [
  {
    id: "standard",
    name: "Standard",
    merv: 8,
    tagline: "Everyday clean air.",
    positioning: "Everyday protection for cleaner home air.",
    bestFor: ["Everyday homes", "Baseline filtration", "Households without pets"],
    captures: ["Household dust", "Pollen", "Lint", "Larger airborne particles"],
    colorToken: "merv-standard",
    hex: "#37B2E6",
    softHex: "#DDF1FB",
    deepHex: "#0C74B0",
    heroImage: "/images/hero/animated/Everyday/everyday_filter_1.png",
  },
  {
    id: "pro",
    name: "Pro",
    merv: 11,
    tagline: "More protection for the home you live in.",
    positioning: "Extra protection for pets, pollen, and everyday allergens.",
    bestFor: [
      "Homes with pets",
      "Pollen-sensitive households",
      "Allergy-aware homes",
    ],
    captures: [
      "Everything in Standard",
      "Pet dander",
      "Finer dust",
      "Common allergens",
    ],
    colorToken: "merv-pro",
    hex: "#4FA968",
    softHex: "#DBEEE1",
    deepHex: "#2C6C41",
    heroImage: "/images/hero/animated/Pet/pet_filter_1.png",
  },
  {
    id: "max",
    name: "Max",
    merv: 13,
    tagline: "When cleaner air matters most.",
    positioning: "Our strongest filtration for homes where air quality matters most.",
    bestFor: [
      "Homes near wildfire smoke",
      "Maximum-filtration households",
      "Finer-particle capture",
    ],
    captures: [
      "Everything in Pro",
      "Smoke and smog",
      "Finer particles",
      "Common airborne particles at high efficiency",
    ],
    colorToken: "merv-max",
    hex: "#8A6FD1",
    softHex: "#E4DBF7",
    deepHex: "#4B2FA0",
    heroImage: "/images/hero/animated/Allergy/allergy_filter_10.png",
  },
];

export function tierById(id: TierId): FilterTier {
  const t = tiers.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown tier id: ${id}`);
  return t;
}

export function tierByMerv(merv: MervRating): FilterTier {
  const t = tiers.find((x) => x.merv === merv);
  if (!t) throw new Error(`No tier for MERV ${merv}`);
  return t;
}
