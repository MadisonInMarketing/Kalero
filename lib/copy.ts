export const faqs = [
  {
    q: "How do I know which filter I need?",
    a: "Start with what's actually in your air. If you have pets, we suggest Pet Defense. If pollen is the big story, Allergy Defense. If smoke is on your radar, Smoke Defense. Not sure? Take the two-minute Find Your Filter quiz and we'll match you.",
  },
  {
    q: "How do I find my filter size?",
    a: "Slide out your current filter and look at the frame. There's almost always a printed size (like 20 × 25 × 1). If your size isn't listed, enter it in the custom size field at checkout and our team will confirm the fit.",
  },
  {
    q: "What does MERV mean?",
    a: "MERV stands for Minimum Efficiency Reporting Value. It's an industry rating that describes how small a particle a filter is designed to capture. Higher MERV filters catch smaller particles, but the best filter is the one that matches both your air concerns and your HVAC system.",
  },
  {
    q: "How often should I replace my filter?",
    a: "Every 30 to 90 days, depending on your home, pets, and season. Pet Defense and Smoke Defense are usually replaced more often. Subscriptions arrive on the cadence you choose, so replacements stop being something to remember.",
  },
  {
    q: "How does the subscription work?",
    a: "Pick your filter, your size, how many you use, and how often you want a replacement. We deliver on that schedule, free of charge. Skip, pause, or swap products anytime from your account.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "I finally know which filter my house is supposed to have. That alone was worth it.",
    author: "Priya M.",
    detail: "Allergy Defense subscriber",
    category: "allergy" as const,
  },
  {
    quote:
      "Two goldens, one toddler. Pet Defense actually keeps the vents from looking like fur sweaters.",
    author: "Cameron & Alex",
    detail: "Pet Defense subscriber",
    category: "pet" as const,
  },
  {
    quote:
      "During fire season I don't have to think about it anymore. The box just shows up.",
    author: "J. Ortega",
    detail: "Smoke Defense subscriber",
    category: "smoke" as const,
  },
  {
    quote:
      "The packaging honestly convinced me. Then the reminder emails kept me.",
    author: "Riya S.",
    detail: "Everyday Defense subscriber",
    category: "everyday" as const,
  },
  {
    quote:
      "Our kitchen opens to the living room. Carbon Defense makes the whole floor feel less lingering.",
    author: "The Duquette House",
    detail: "Carbon Defense subscriber",
    category: "carbon" as const,
  },
  {
    quote:
      "The Fall Dust drop is a genuine home ritual now. Nobody warned me a filter would do that.",
    author: "Halley T.",
    detail: "Seasonal Defense subscriber",
    category: "seasonal" as const,
  },
];

export const seasonalDrops = [
  {
    slug: "spring-pollen",
    name: "Pollen Season",
    tagline: "Peak tree, grass, and weed pollen at MERV 13.",
    palette: "from-lavender-100 via-white to-blush-soft",
    image: "/images/Spring pollen new.png",
  },
  {
    slug: "summer-smoke",
    name: "Wildfire Season",
    tagline: "Wildfire smoke and urban haze. Fine particulate capture.",
    palette: "from-smoke-soft via-white to-lavender-100",
    image: "/images/Summer Smoke.png",
  },
  {
    slug: "fall-dust",
    name: "Dust Season",
    tagline: "Fall dust and heavier HVAC load.",
    palette: "from-gold-soft via-white to-lavender-100",
    image: "/images/Fall Dust.png",
  },
  {
    slug: "winter-fresh",
    name: "Cold Season",
    tagline: "Sealed-up homes and forced-air heating.",
    palette: "from-canvas via-white to-lavender-100",
    image: "/images/Winter Smog.png",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Tell us about your home",
    body: "Answer a few quick questions about your concerns, pets, and filter size.",
  },
  {
    step: "02",
    title: "Get the right filter",
    body: "We recommend a filter made for the way you actually live, not a generic option.",
  },
  {
    step: "03",
    title: "Replace it on time",
    body: "Your next filter arrives before the current one needs to come out.",
  },
];

export const particleReference = [
  { name: "Lint & carpet fibers", size: "Large", key: "lint" as const },
  { name: "Household dust", size: "Medium", key: "dust" as const },
  { name: "Pet dander", size: "Medium", key: "dander" as const },
  { name: "Pollen", size: "Medium", key: "pollen" as const },
  { name: "Mold spores", size: "Small", key: "mold" as const },
  { name: "Fine smoke particles", size: "Very small", key: "smoke" as const },
];

export const filterPerformanceMatrix: Record<
  "everyday" | "pet" | "allergy" | "smoke" | "carbon",
  Partial<Record<"lint" | "dust" | "dander" | "pollen" | "mold" | "smoke", 1 | 2 | 3>>
> = {
  everyday: { lint: 3, dust: 3, pollen: 2, dander: 1, mold: 1 },
  pet: { lint: 3, dust: 3, dander: 3, pollen: 2, mold: 2 },
  allergy: { lint: 3, dust: 3, pollen: 3, dander: 3, mold: 3, smoke: 2 },
  smoke: { lint: 3, dust: 3, pollen: 3, dander: 3, mold: 3, smoke: 3 },
  carbon: { lint: 3, dust: 3, dander: 2, pollen: 2, mold: 2, smoke: 2 },
};

export const quizConcerns = [
  { id: "pets", label: "I have pets", suggests: ["pet"] as const },
  { id: "allergies", label: "I deal with seasonal allergies", suggests: ["allergy"] as const },
  { id: "smoke", label: "I live near wildfire smoke", suggests: ["smoke"] as const },
  { id: "odors", label: "My home holds onto odors", suggests: ["carbon"] as const },
  { id: "everyday", label: "I mainly need everyday protection", suggests: ["everyday"] as const },
  { id: "seasonal", label: "I rotate with the seasons", suggests: ["seasonal"] as const },
];
