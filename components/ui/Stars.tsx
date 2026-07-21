import { Star } from "lucide-react";

type Props = {
  value: number;
  count?: number;
  size?: number;
  compact?: boolean;
  className?: string;
};

export function Stars({ value, count, size = 14, compact, className = "" }: Props) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className={`inline-flex items-center gap-1.5 text-sm text-charcoal-mid ${className}`}>
      <span className="inline-flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && hasHalf);
          return (
            <Star
              key={i}
              size={size}
              strokeWidth={1.5}
              className={
                filled
                  ? "fill-lavender-500 text-lavender-500"
                  : "fill-lavender-100 text-lavender-200"
              }
            />
          );
        })}
      </span>
      {!compact && (
        <>
          <span className="font-medium text-charcoal">{value.toFixed(1)}</span>
          {typeof count === "number" && (
            <span className="text-charcoal-light">({count.toLocaleString()})</span>
          )}
        </>
      )}
      {compact && count && (
        <span className="text-charcoal-light">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
