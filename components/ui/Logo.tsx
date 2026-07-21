import Link from "next/link";

type Props = {
  className?: string;
  variant?: "dark" | "light" | "brand";
  size?: "sm" | "md" | "lg";
  withMark?: boolean;
  stacked?: boolean;
  href?: string;
};

const wordSize: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-base tracking-[0.28em]",
  md: "text-lg tracking-[0.32em]",
  lg: "text-2xl tracking-[0.36em]",
};

const stackedWordSize: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-xl tracking-[0.28em]",
  md: "text-3xl tracking-[0.32em]",
  lg: "text-4xl tracking-[0.34em]",
};

const stackedTaglineSize: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-[9px] tracking-[0.32em]",
  md: "text-[10px] tracking-[0.36em]",
  lg: "text-[11px] tracking-[0.4em]",
};

const markSize: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function Logo({
  className = "",
  variant = "dark",
  size = "md",
  withMark = true,
  stacked = false,
  href = "/",
}: Props) {
  const colorClass =
    variant === "light"
      ? "text-white"
      : variant === "brand"
        ? "text-lavender-600"
        : "text-charcoal";
  const taglineColor =
    variant === "light"
      ? "text-white/70"
      : variant === "brand"
        ? "text-lavender-500/80"
        : "text-charcoal-mid";

  const mark = withMark && !stacked && (
    <svg
      viewBox="0 0 32 32"
      className={markSize[size]}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9164D2" />
          <stop offset="100%" stopColor="#623D9E" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#logoMark)" />
      <path
        d="M 7 12 Q 16 6 25 12"
        stroke="#FAFAFC"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 7 16 Q 16 10 25 16"
        stroke="#FAFAFC"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 7 20 Q 16 14 25 20"
        stroke="#FAFAFC"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const content = stacked ? (
    <span
      className={`inline-flex flex-col items-start leading-none ${className}`}
    >
      <span
        className={`font-display font-extrabold ${stackedWordSize[size]} ${colorClass}`}
      >
        KALERO
      </span>
      <span
        className={`mt-1.5 font-medium uppercase ${stackedTaglineSize[size]} ${taglineColor}`}
      >
        Premium Air Filters
      </span>
    </span>
  ) : (
    <span
      className={`inline-flex items-center gap-2.5 font-display font-bold ${wordSize[size]} ${colorClass} ${className}`}
    >
      {mark}
      <span>KALERO</span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus-visible:outline-none"
        aria-label="KALERO home"
      >
        {content}
      </Link>
    );
  }
  return content;
}
