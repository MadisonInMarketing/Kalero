import { ShieldCheck } from "lucide-react";

const brands = [
  "Carrier",
  "Trane",
  "Lennox",
  "Honeywell",
  "Bryant",
  "Rheem",
  "Goodman",
  "Aprilaire",
  "Trion",
  "York",
];

type Props = {
  variant?: "band" | "plain";
  className?: string;
};

export function HvacCompatibility({ variant = "band", className = "" }: Props) {
  if (variant === "plain") {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-eyebrow text-charcoal-light">
          Fits every major residential HVAC system
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium tracking-[0.06em] text-charcoal-mid">
          {brands.map((b) => (
            <li key={b} className="uppercase">
              {b}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="hvac-compat"
      className={`relative isolate overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lavender-50 via-white to-lavender-50"
      />
      <div className="container-x relative py-8 sm:py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
              <ShieldCheck size={16} strokeWidth={1.75} />
            </span>
            <p
              id="hvac-compat"
              className="text-sm font-medium text-charcoal sm:max-w-[16ch]"
            >
              Fits every major residential HVAC system.
            </p>
          </div>

          <ul className="grid w-full grid-cols-2 items-center gap-x-6 gap-y-3 sm:flex sm:flex-1 sm:flex-wrap sm:justify-end">
            {brands.map((b) => (
              <li
                key={b}
                className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal-mid transition-colors hover:text-charcoal sm:text-sm"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
