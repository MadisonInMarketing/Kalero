/**
 * KALERO filter sizes.
 * The other primary axis of the tier + size commerce model.
 * Slugs match URL segments: /air-filters/[slug]
 */
export type FilterSize = {
  slug: string;
  nominalWidth: number;
  nominalHeight: number;
  nominalDepth: number;
  actualWidth?: number;
  actualHeight?: number;
  actualDepth?: number;
  /** Whether this size is featured on the homepage Popular Sizes grid. */
  popular?: boolean;
};

/** Format a size record as the display label ("16 × 25 × 1"). */
export function formatSize(s: FilterSize): string {
  return `${s.nominalWidth} × ${s.nominalHeight} × ${s.nominalDepth}`;
}

/** Format actual (post-manufacture) size when available. */
export function formatActualSize(s: FilterSize): string | null {
  if (s.actualWidth == null || s.actualHeight == null || s.actualDepth == null) {
    return null;
  }
  return `${s.actualWidth} × ${s.actualHeight} × ${s.actualDepth}`;
}

/** Derive slug from raw dimensions. */
export function sizeSlug(w: number, h: number, d: number): string {
  return `${w}x${h}x${d}`;
}

export const sizes: FilterSize[] = [
  {
    slug: "12x12x1",
    nominalWidth: 12,
    nominalHeight: 12,
    nominalDepth: 1,
    actualWidth: 11.5,
    actualHeight: 11.5,
    actualDepth: 0.75,
  },
  {
    slug: "12x20x1",
    nominalWidth: 12,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 11.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
  },
  {
    slug: "14x20x1",
    nominalWidth: 14,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 13.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "14x25x1",
    nominalWidth: 14,
    nominalHeight: 25,
    nominalDepth: 1,
    actualWidth: 13.5,
    actualHeight: 24.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "16x20x1",
    nominalWidth: 16,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 15.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "16x25x1",
    nominalWidth: 16,
    nominalHeight: 25,
    nominalDepth: 1,
    actualWidth: 15.5,
    actualHeight: 24.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "20x20x1",
    nominalWidth: 20,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 19.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "20x25x1",
    nominalWidth: 20,
    nominalHeight: 25,
    nominalDepth: 1,
    actualWidth: 19.5,
    actualHeight: 24.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "20x30x1",
    nominalWidth: 20,
    nominalHeight: 30,
    nominalDepth: 1,
    actualWidth: 19.5,
    actualHeight: 29.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "16x25x4",
    nominalWidth: 16,
    nominalHeight: 25,
    nominalDepth: 4,
    actualWidth: 15.5,
    actualHeight: 24.5,
    actualDepth: 3.75,
    popular: true,
  },
  {
    slug: "20x25x4",
    nominalWidth: 20,
    nominalHeight: 25,
    nominalDepth: 4,
    actualWidth: 19.5,
    actualHeight: 24.5,
    actualDepth: 3.75,
  },
];

export const popularSizes = sizes.filter((s) => s.popular);

/** Legacy alias — keeps STANDARD_SIZES imports working during migration. */
export const STANDARD_SIZES = sizes.map(formatSize);

export function sizeBySlug(slug: string): FilterSize | undefined {
  return sizes.find((s) => s.slug === slug);
}

/** Distinct depth values available across the catalog. */
export const availableDepths = Array.from(
  new Set(sizes.map((s) => s.nominalDepth)),
).sort((a, b) => a - b);

/** Distinct widths / heights for the FilterFinder selects. */
export const availableWidths = Array.from(
  new Set(sizes.map((s) => s.nominalWidth)),
).sort((a, b) => a - b);

export const availableHeights = Array.from(
  new Set(sizes.map((s) => s.nominalHeight)),
).sort((a, b) => a - b);
