export type MervRating = "MERV 8" | "MERV 11" | "MERV 13";

export type FilterSize =
  | "14 × 20 × 1"
  | "16 × 20 × 1"
  | "16 × 25 × 1"
  | "20 × 20 × 1"
  | "20 × 25 × 1"
  | "20 × 30 × 1"
  | "16 × 25 × 4"
  | "20 × 25 × 4";

export type ProductColor = {
  base: string;
  soft: string;
  deep: string;
  gradientFrom: string;
  gradientTo: string;
  glowFrom: string;
  glowTo: string;
  ring: string;
  text: string;
  chip: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  concern: string;
  category: CategoryKey;
  merv: MervRating | "Activated Carbon" | "Rotating";
  color: ProductColor;
  priceFrom: number;
  subscriptionSavings: number;
  rating: { value: number; count: number };
  sizes: FilterSize[];
  designedFor: string[];
  helpsCapture: string[];
  bestFor: string[];
  replacementCadence: string;
  longDescription: string;
  image?: string;
  cardImage?: string;
  hero: {
    label: string;
    accentEmoji?: string;
  };
};

export type CategoryKey =
  | "everyday"
  | "pet"
  | "allergy"
  | "hotel"
  | "smoke"
  | "carbon"
  | "seasonal";

export const productColors: Record<CategoryKey, ProductColor> = {
  everyday: {
    base: "#67B7F2",
    soft: "#E5F2FD",
    deep: "#3A8FC9",
    gradientFrom: "from-sky-soft",
    gradientTo: "to-white",
    glowFrom: "rgba(103,183,242,0.35)",
    glowTo: "rgba(103,183,242,0)",
    ring: "ring-sky/30",
    text: "text-sky-deep",
    chip: "bg-lavender-100 text-lavender-700",
  },
  pet: {
    base: "#96B83B",
    soft: "#EDF3D9",
    deep: "#6E8B27",
    gradientFrom: "from-grass-soft",
    gradientTo: "to-white",
    glowFrom: "rgba(150,184,59,0.35)",
    glowTo: "rgba(150,184,59,0)",
    ring: "ring-grass/30",
    text: "text-grass-deep",
    chip: "bg-lavender-100 text-lavender-700",
  },
  allergy: {
    base: "#E95774",
    soft: "#FBE1E7",
    deep: "#B93755",
    gradientFrom: "from-blush-soft",
    gradientTo: "to-white",
    glowFrom: "rgba(233,87,116,0.32)",
    glowTo: "rgba(233,87,116,0)",
    ring: "ring-blush/30",
    text: "text-blush-deep",
    chip: "bg-lavender-100 text-lavender-700",
  },
  smoke: {
    base: "#7566A5",
    soft: "#E6E2EF",
    deep: "#4E4278",
    gradientFrom: "from-smoke-soft",
    gradientTo: "to-white",
    glowFrom: "rgba(117,102,165,0.35)",
    glowTo: "rgba(117,102,165,0)",
    ring: "ring-smoke/30",
    text: "text-smoke-deep",
    chip: "bg-lavender-100 text-lavender-700",
  },
  carbon: {
    base: "#4A4A55",
    soft: "#E7E5EB",
    deep: "#2B2B33",
    gradientFrom: "from-graphite-soft",
    gradientTo: "to-white",
    glowFrom: "rgba(74,74,85,0.35)",
    glowTo: "rgba(74,74,85,0)",
    ring: "ring-graphite/30",
    text: "text-graphite-deep",
    chip: "bg-lavender-100 text-lavender-700",
  },
  hotel: {
    base: "#E9B95C",
    soft: "#FBEFD3",
    deep: "#B78A2E",
    gradientFrom: "from-gold-soft",
    gradientTo: "to-white",
    glowFrom: "rgba(233,185,92,0.35)",
    glowTo: "rgba(233,185,92,0)",
    ring: "ring-gold/30",
    text: "text-gold-deep",
    chip: "bg-lavender-100 text-lavender-700",
  },
  seasonal: {
    base: "#9164D2",
    soft: "#F1EAFE",
    deep: "#623D9E",
    gradientFrom: "from-lavender-100",
    gradientTo: "to-white",
    glowFrom: "rgba(145,100,210,0.35)",
    glowTo: "rgba(145,100,210,0)",
    ring: "ring-lavender-300/30",
    text: "text-lavender-700",
    chip: "bg-lavender-100 text-lavender-700",
  },
};

export const STANDARD_SIZES: FilterSize[] = [
  "14 × 20 × 1",
  "16 × 20 × 1",
  "16 × 25 × 1",
  "20 × 20 × 1",
  "20 × 25 × 1",
  "20 × 30 × 1",
  "16 × 25 × 4",
  "20 × 25 × 4",
];

export const products: Product[] = [
  {
    slug: "everyday-defense",
    name: "Everyday Defense",
    tagline: "Fresh everyday air. Steady airflow.",
    concern: "Basic dust, lint, and everyday air circulation.",
    category: "everyday",
    merv: "MERV 8",
    color: productColors.everyday,
    priceFrom: 22,
    subscriptionSavings: 15,
    rating: { value: 4.7, count: 812 },
    sizes: STANDARD_SIZES,
    designedFor: [
      "Everyday household dust",
      "Lint and fibers",
      "Regular HVAC airflow",
      "Homes without pets or allergies",
    ],
    helpsCapture: [
      "Household dust",
      "Lint",
      "Larger pollen fragments",
      "Carpet fibers",
    ],
    bestFor: ["Newer builds", "Single-story homes", "Apartments", "Low-traffic living"],
    replacementCadence: "Every 60 to 90 days",
    longDescription:
      "The quiet workhorse of the KALERO lineup. Everyday Defense keeps regular household dust and lint moving through your HVAC cleanly, without over-restricting airflow. A great fit for homes that don't have specific concerns like pets, allergies, or smoke, just steady, easy air.",
    image: "/images/Everyday Filter.png",
    cardImage: "/images/everyday 4 pack - 2.png",
    hero: {
      label: "The everyday one",
      accentEmoji: "💧",
    },
  },
  {
    slug: "pet-defense",
    name: "Pet Defense",
    tagline: "Fresh air for pet-active homes.",
    concern: "Pet hair, dander, active homes, and everyday pet-related air concerns.",
    category: "pet",
    merv: "MERV 11",
    color: productColors.pet,
    priceFrom: 28,
    subscriptionSavings: 15,
    rating: { value: 4.8, count: 1264 },
    sizes: STANDARD_SIZES,
    designedFor: [
      "Pet dander",
      "Everyday dust",
      "Active households",
      "Common pet-related air concerns",
    ],
    helpsCapture: [
      "Pet dander",
      "Pet hair fragments",
      "Household dust",
      "Some pollen",
    ],
    bestFor: ["Homes with dogs", "Homes with cats", "Multi-pet households", "Homes with kids and pets"],
    replacementCadence: "Every 45 to 60 days",
    longDescription:
      "Built around the reality of pet-friendly homes, the shedding season, the play sessions, the sunlight catching all the dander in the air. Pet Defense captures the fine dander and hair fragments that everyday filters let pass, while staying compatible with standard HVAC systems.",
    image: "/images/Pet Filter.png",
    cardImage: "/images/Pet 4 Pack - 2.png",
    hero: {
      label: "The pet-home one",
      accentEmoji: "🐾",
    },
  },
  {
    slug: "allergy-defense",
    name: "Allergy Defense",
    tagline: "Fresh air through pollen season.",
    concern: "Pollen, dust mites, mold spores, and seasonal allergy concerns.",
    category: "allergy",
    merv: "MERV 13",
    color: productColors.allergy,
    priceFrom: 32,
    subscriptionSavings: 15,
    rating: { value: 4.9, count: 1543 },
    sizes: STANDARD_SIZES,
    designedFor: [
      "Seasonal pollen surges",
      "Dust mites",
      "Mold spores",
      "Sensitive family members",
    ],
    helpsCapture: [
      "Tree, grass, and weed pollen",
      "Dust mite fragments",
      "Mold spores",
      "Fine indoor dust",
    ],
    bestFor: ["Allergy-prone households", "Homes near green spaces", "Spring and fall", "Homes with young kids"],
    replacementCadence: "Every 45 to 60 days",
    longDescription:
      "Allergy Defense is our go-to for households that feel every pollen count. Available in MERV 11 for balanced airflow or MERV 13 for higher capture, always designed to work with standard residential HVAC systems.",
    image: "/images/Allergy FIlter.png",
    cardImage: "/images/Allergy 4 pack - 2.png",
    hero: {
      label: "The allergy one",
      accentEmoji: "🌸",
    },
  },
  {
    slug: "hotel-collection",
    name: "Hotel Collection",
    tagline: "Hospitality-grade air, everywhere your guests breathe.",
    concern: "Hotel guest rooms, serviced apartments, and property portfolios.",
    category: "hotel",
    merv: "MERV 11",
    color: productColors.hotel,
    priceFrom: 36,
    subscriptionSavings: 15,
    rating: { value: 4.9, count: 512 },
    sizes: STANDARD_SIZES,
    designedFor: [
      "Guest room comfort",
      "Consistent portfolio quality",
      "Extended replacement cycles",
      "Property engineering teams",
    ],
    helpsCapture: [
      "Everyday dust and lint",
      "Fine allergens",
      "Common cooking and lounge odors",
      "General particulate build-up",
    ],
    bestFor: [
      "Hotels and boutique properties",
      "Serviced apartments",
      "Residential communities",
      "Multi-building operators",
    ],
    replacementCadence: "Every 90 to 120 days",
    longDescription:
      "The Hotel Collection is our program for hospitality groups and property managers. Filters ship on a cadence aligned to your building specs and service standards, with room to scale across portfolios and consistent supply so engineering teams never guess what belongs in a return vent.",
    image: "/images/Hotel Collection.png",
    cardImage: "/images/Hotel 4 pack - 2.png",
    hero: {
      label: "The hospitality one",
      accentEmoji: "🏨",
    },
  },
  {
    slug: "smoke-defense",
    name: "Smoke Defense",
    tagline: "Clean air on wildfire days and in dense cities.",
    concern: "Wildfire smoke, urban pollution, and high-smoke areas.",
    category: "smoke",
    merv: "MERV 13",
    color: productColors.smoke,
    priceFrom: 34,
    subscriptionSavings: 15,
    rating: { value: 4.8, count: 987 },
    sizes: STANDARD_SIZES,
    designedFor: [
      "Wildfire smoke season",
      "Urban air pollution",
      "Fine particulate matter",
      "Homes near freeways",
    ],
    helpsCapture: [
      "Fine smoke particles",
      "Urban particulate matter",
      "Pollen",
      "Fine dust",
    ],
    bestFor: ["West-coast homes", "Wildfire-prone regions", "Dense urban areas", "Late summer and fall"],
    replacementCadence: "Every 30 to 60 days during smoke season",
    longDescription:
      "When the sky turns amber, Smoke Defense is what you want in your return vent. Designed around fine smoke particles and urban particulates, this filter is a strong fit for homes in wildfire-prone regions and dense urban areas.",
    hero: {
      label: "The wildfire one",
      accentEmoji: "🌫️",
    },
  },
  {
    slug: "carbon-defense",
    name: "Carbon Defense",
    tagline: "Fresh air through cooking, pets, and stubborn odors.",
    concern: "Cooking smells, pet smells, odors, and VOC-related concerns.",
    category: "carbon",
    merv: "Activated Carbon",
    color: productColors.carbon,
    priceFrom: 38,
    subscriptionSavings: 15,
    rating: { value: 4.7, count: 662 },
    sizes: STANDARD_SIZES,
    designedFor: [
      "Kitchen and cooking odors",
      "Pet-related smells",
      "Household VOCs",
      "Homes that hold onto scents",
    ],
    helpsCapture: [
      "Everyday household odors",
      "Cooking smells",
      "Pet-adjacent smells",
      "Common VOC-related concerns",
    ],
    bestFor: ["Open-plan kitchens", "Homes with pets", "Recent paint or reno", "Frequent home-cooking"],
    replacementCadence: "Every 45 to 60 days",
    longDescription:
      "Carbon Defense pairs standard particulate filtration with an activated carbon layer, which helps address the everyday odors that leave a house feeling less than fresh. Great for open-plan homes where the kitchen, living room, and family space breathe together.",
    hero: {
      label: "The odor one",
      accentEmoji: "🍋",
    },
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (category: CategoryKey) =>
  products.filter((p) => p.category === category);
