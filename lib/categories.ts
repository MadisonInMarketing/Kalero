import type { CategoryKey } from "./products";

export type Category = {
  key: CategoryKey;
  slug: string;
  title: string;
  shortTitle: string;
  concern: string;
  description: string;
  productSlug: string;
  gradient: string;
  chipClass: string;
  ringClass: string;
  hex: string;
  softHex: string;
  deepHex: string;
  icon: "dust" | "paw" | "flower" | "flame" | "leaf" | "sparkles";
};

export const categories: Category[] = [
  {
    key: "everyday",
    slug: "everyday-dust",
    title: "Everyday Dust",
    shortTitle: "Everyday",
    concern: "Everyday Dust",
    description:
      "Fresh air for daily dust, lint, and steady household circulation.",
    productSlug: "everyday-defense",
    gradient: "from-sky-soft via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-sky/30",
    hex: "#67B7F2",
    softHex: "#E5F2FD",
    deepHex: "#3A8FC9",
    icon: "dust",
  },
  {
    key: "pet",
    slug: "pets-and-dander",
    title: "Pets & Dander",
    shortTitle: "Pets",
    concern: "Pets & Dander",
    description:
      "Fresh air for pet-active homes. Dander, hair, and daily circulation.",
    productSlug: "pet-defense",
    gradient: "from-grass-soft via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-grass/30",
    hex: "#96B83B",
    softHex: "#EDF3D9",
    deepHex: "#6E8B27",
    icon: "paw",
  },
  {
    key: "allergy",
    slug: "allergies-and-pollen",
    title: "Allergies & Pollen",
    shortTitle: "Allergies",
    concern: "Allergies & Pollen",
    description:
      "Fresh air through pollen season. Pollen, dust mites, and mold spores at MERV 13.",
    productSlug: "allergy-defense",
    gradient: "from-blush-soft via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-blush/30",
    hex: "#1E3A6B",
    softHex: "#DCE3F0",
    deepHex: "#0F1F42",
    icon: "flower",
  },
  {
    key: "hotel",
    slug: "hotel-collection",
    title: "Hotel Collection",
    shortTitle: "Hotel",
    concern: "Hotel Collection",
    description:
      "Hospitality-grade air for hotels, serviced apartments, and property portfolios.",
    productSlug: "hotel-collection",
    gradient: "from-gold-soft via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-gold/30",
    hex: "#E9B95C",
    softHex: "#FBEFD3",
    deepHex: "#B78A2E",
    icon: "sparkles",
  },
  {
    key: "smoke",
    slug: "smoke-and-pollution",
    title: "Smoke & Pollution",
    shortTitle: "Smoke",
    concern: "Smoke & Pollution",
    description:
      "Clean air on wildfire days and in dense cities. Fine smoke and urban particulates.",
    productSlug: "smoke-defense",
    gradient: "from-smoke-soft via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-smoke/30",
    hex: "#7566A5",
    softHex: "#E6E2EF",
    deepHex: "#4E4278",
    icon: "flame",
  },
  {
    key: "carbon",
    slug: "odors-and-vocs",
    title: "Odors & VOCs",
    shortTitle: "Odors",
    concern: "Odors & VOCs",
    description:
      "Fresh air for cooking, pet, paint, and everyday household VOCs. Activated carbon layer.",
    productSlug: "carbon-defense",
    gradient: "from-graphite-soft via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-graphite/30",
    hex: "#4A4A55",
    softHex: "#E7E5EB",
    deepHex: "#2B2B33",
    icon: "sparkles",
  },
  {
    key: "seasonal",
    slug: "seasonal-air",
    title: "Seasonal Air",
    shortTitle: "Seasonal",
    concern: "Seasonal Air",
    description:
      "Limited drops for how the season actually feels, Spring Pollen, Summer Smoke, Fall Dust, Winter Fresh.",
    productSlug: "seasonal-defense",
    gradient: "from-lavender-100 via-white to-white",
    chipClass: "bg-lavender-100 text-lavender-700",
    ringClass: "ring-lavender-300/30",
    hex: "#9164D2",
    softHex: "#F1EAFE",
    deepHex: "#623D9E",
    icon: "leaf",
  },
];

export const categoryByKey = (key: CategoryKey) =>
  categories.find((c) => c.key === key);
export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
