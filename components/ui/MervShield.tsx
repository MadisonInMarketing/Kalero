/**
 * MERV shield badge — pulled directly from Kalero packaging.
 * Sky-blue shield with rating + STANDARD/PREMIUM label.
 */
type Props = {
  rating: string;
  label?: string;
  size?: "xs" | "sm" | "md";
  className?: string;
};

const dims = {
  xs: {
    box: "h-14 w-11",
    top: "text-[7px]",
    rating: "text-lg",
    bottom: "text-[6px]",
  },
  sm: {
    box: "h-20 w-16",
    top: "text-[8px]",
    rating: "text-2xl",
    bottom: "text-[7px]",
  },
  md: {
    box: "h-24 w-20 sm:h-28 sm:w-24",
    top: "text-[9px]",
    rating: "text-3xl sm:text-4xl",
    bottom: "text-[8px]",
  },
};

export function MervShield({
  rating,
  label = "Standard",
  size = "sm",
  className = "",
}: Props) {
  const d = dims[size];
  return (
    <div
      aria-label={`MERV ${rating} ${label}`}
      className={`relative flex flex-col items-center justify-center bg-sky-500 pt-1.5 text-white shadow-soft ${d.box} ${className}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
      }}
    >
      <span
        className={`${d.top} font-semibold uppercase tracking-[0.14em]`}
      >
        MERV
      </span>
      <span
        className={`${d.rating} font-display font-bold leading-none`}
      >
        {rating}
      </span>
      <span
        className={`mt-0.5 ${d.bottom} font-medium uppercase tracking-[0.14em]`}
      >
        {label}
      </span>
    </div>
  );
}
