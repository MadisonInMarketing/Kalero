import { Droplet, Sparkles, Wind } from "lucide-react";
import { scentCopy } from "@/lib/scentStrips";

type HowScentStripsWorkProps = {
  /** Compact horizontal variant for slim in-page slots. */
  variant?: "compact" | "full";
  className?: string;
};

const stepIcons = [Droplet, Sparkles, Wind] as const;

export function HowScentStripsWork({
  variant = "full",
  className,
}: HowScentStripsWorkProps) {
  const compact = variant === "compact";
  return (
    <section
      aria-labelledby="scent-how-it-works-title"
      className={[
        "rounded-2xl border border-lavender-100/70 bg-white/60 backdrop-blur-sm",
        compact ? "p-5" : "p-6 sm:p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={
          compact
            ? "flex flex-wrap items-center justify-between gap-3"
            : "max-w-md"
        }
      >
        <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-lavender-600">
          {scentCopy.eyebrow}
        </p>
        {!compact && (
          <>
            <h3
              id="scent-how-it-works-title"
              className="mt-3 font-display text-2xl font-semibold leading-tight text-charcoal text-balance sm:text-3xl"
            >
              {scentCopy.howItWorksHeadline}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
              {scentCopy.howItWorksBody}
            </p>
          </>
        )}
        {compact && (
          <h3
            id="scent-how-it-works-title"
            className="font-display text-lg font-semibold text-charcoal"
          >
            {scentCopy.howItWorksHeadline}
          </h3>
        )}
      </div>

      <ol
        className={
          compact
            ? "mt-4 grid gap-3 sm:grid-cols-3"
            : "mt-6 grid gap-4 sm:grid-cols-3"
        }
      >
        {scentCopy.steps.map((step, i) => {
          const Icon = stepIcons[i] ?? Droplet;
          return (
            <li
              key={step.key}
              className="flex items-start gap-3 rounded-xl bg-lavender-100/40 p-4"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lavender-700 ring-1 ring-lavender-200/70"
              >
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lavender-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-charcoal">
                  {step.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-charcoal-mid text-pretty">
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
