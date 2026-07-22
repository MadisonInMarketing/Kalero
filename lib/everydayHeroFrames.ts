export type ChapterKey = "intro" | "construction" | "performance" | "result";

export type Callout = {
  key: string;
  label: string;
  /** Percentage across the stage's inner bounding box, 0-100 */
  x: number;
  /** Percentage down the stage's inner bounding box, 0-100 */
  y: number;
  anchorSide: "left" | "right";
};

export type EverydayHeroFrame = {
  id: number;
  src: string;
  alt: string;
  chapterKey: ChapterKey;
  objectFit: "cover" | "contain";
  objectPosition?: string;
  callouts?: Callout[];
  transitionLabel?: string;
  includeOnMobile: boolean;
};

export type EverydayHeroChapter = {
  key: ChapterKey;
  number: "01" | "02" | "03" | "04";
  label: string;
  description: string;
  startFrameId: number;
  endFrameId: number;
};

const constructionCallouts: Callout[] = [
  { key: "frame", label: "Durable Frame", x: 20, y: 42, anchorSide: "left" },
  { key: "mesh", label: "Support Mesh", x: 46, y: 60, anchorSide: "right" },
  { key: "media", label: "Pleated Media", x: 72, y: 40, anchorSide: "right" },
];

export const everydayHeroFrames: EverydayHeroFrame[] = [
  {
    id: 1,
    src: "/images/hero/animated/1.png",
    alt: "Kalero Everyday All Seasons filter, packaging in a bright residential setting",
    chapterKey: "intro",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: true,
  },
  {
    id: 2,
    src: "/images/hero/animated/2.png",
    alt: "Kalero Everyday All Seasons filter packaging on display",
    chapterKey: "intro",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: false,
  },
  {
    id: 3,
    src: "/images/hero/animated/3.png",
    alt: "Kalero Everyday All Seasons filter revealed beside its packaging",
    chapterKey: "intro",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: true,
  },
  {
    id: 4,
    src: "/images/hero/animated/4.png",
    alt: "Front view of the Kalero pleated air filter",
    chapterKey: "construction",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: false,
  },
  {
    id: 5,
    src: "/images/hero/animated/5.png",
    alt: "Angled view showing the depth of the Kalero filter's pleated media",
    chapterKey: "construction",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: false,
  },
  {
    id: 6,
    src: "/images/hero/animated/6.png",
    alt: "Exploded view of the Kalero filter showing frame, support mesh, and pleated media layers",
    chapterKey: "construction",
    objectFit: "contain",
    objectPosition: "center",
    callouts: constructionCallouts,
    includeOnMobile: false,
  },
  {
    id: 7,
    src: "/images/hero/animated/7.png",
    alt: "Detail of Kalero filter internal construction",
    chapterKey: "construction",
    objectFit: "contain",
    objectPosition: "center",
    callouts: constructionCallouts,
    includeOnMobile: false,
  },
  {
    id: 8,
    src: "/images/hero/animated/8.png",
    alt: "Kalero filter capturing airborne dust and particles",
    chapterKey: "performance",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: false,
  },
  {
    id: 9,
    src: "/images/hero/animated/9.png",
    alt: "Kalero filter with unfiltered particles entering and cleaner airflow exiting",
    chapterKey: "performance",
    objectFit: "cover",
    objectPosition: "center",
    transitionLabel: "Everyday particles in.  Cleaner airflow out.",
    includeOnMobile: true,
  },
  {
    id: 10,
    src: "/images/hero/animated/10.png",
    alt: "Clean, comfortable interior showing the result of Kalero filtration",
    chapterKey: "result",
    objectFit: "cover",
    objectPosition: "center",
    includeOnMobile: true,
  },
];

export const everydayHeroChapters: EverydayHeroChapter[] = [
  {
    key: "intro",
    number: "01",
    label: "The Everyday Filter",
    description:
      "Premium filtration designed for the air your home lives in every day.",
    startFrameId: 1,
    endFrameId: 3,
  },
  {
    key: "construction",
    number: "02",
    label: "Built From The Inside Out",
    description:
      "A durable frame, support mesh, and pleated media work together for reliable airflow and longer filter life.",
    startFrameId: 4,
    endFrameId: 7,
  },
  {
    key: "performance",
    number: "03",
    label: "Capture What You Don't Want",
    description:
      "Designed to capture common household dust, lint, fibers, and airborne debris before they continue through your home.",
    startFrameId: 8,
    endFrameId: 9,
  },
  {
    key: "result",
    number: "04",
    label: "Cleaner Air, Room to Room",
    description: "A simple upgrade for a fresher, more comfortable home.",
    startFrameId: 10,
    endFrameId: 10,
  },
];

export const closingHeadline = "Find the Kalero filter built for your home.";

export const everydayHeroCopy = {
  eyebrow: "Kalero Everyday · MERV 11",
  headlineLead: "Everyday air.",
  headlineAccent: "Elevated.",
  supporting:
    "Premium all-season filtration designed to capture everyday dust, lint, and airborne particles, without restricting the way your home breathes.",
  primaryCtaLabel: "Find Your Filter",
  primaryCtaHref: "/find-your-filter",
  secondaryCtaLabel: "See How It Works",
  secondaryCtaHref: "/find-your-filter",
  productInfo: ["20 × 25 × 1", "MERV 11", "All-Season Filtration"],
} as const;
