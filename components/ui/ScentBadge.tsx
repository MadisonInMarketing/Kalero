import { scentCopy } from "@/lib/scentStrips";

type ScentBadgeProps = {
  /** Override label if the surface calls for different microcopy. */
  label?: string;
  variant?: "outline" | "soft";
  size?: "xs" | "sm";
  className?: string;
};

/**
 * Small "Scent Strip Compatible" chip. Kept visually secondary — thin ring,
 * restrained lavender, minimal icon.
 */
export function ScentBadge({
  label = scentCopy.badge,
  variant = "outline",
  size = "sm",
  className,
}: ScentBadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium tracking-[0.02em]";
  const variantClass =
    variant === "outline"
      ? "bg-white/70 text-lavender-700 ring-1 ring-lavender-200/80 backdrop-blur-sm"
      : "bg-lavender-100/70 text-lavender-700 ring-1 ring-lavender-200/70";
  const sizeClass =
    size === "xs"
      ? "px-2 py-0.5 text-[10px]"
      : "px-2.5 py-1 text-[11px]";
  return (
    <span
      className={[base, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      <ScentStripIcon
        className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"}
      />
      {label}
    </span>
  );
}

function ScentStripIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3.25"
        y="1"
        width="5.5"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M5.25 3.5h1.5M5.25 6h1.5M5.25 8.5h1.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
