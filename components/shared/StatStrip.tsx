import { CalendarClock, PackageCheck, Ruler, ShieldCheck } from "lucide-react";

const stats = [
  {
    Icon: Ruler,
    title: "8 standard sizes",
    body: "Every residential size, plus custom on request.",
  },
  {
    Icon: PackageCheck,
    title: "Ships in 3-5 days",
    body: "Free on any subscription, always tracked.",
  },
  {
    Icon: ShieldCheck,
    title: "Real-home tested",
    body: "Made for the way houses actually breathe.",
  },
  {
    Icon: CalendarClock,
    title: "Cancel anytime",
    body: "No contracts, no phone calls, no fine print.",
  },
];

type Props = {
  className?: string;
};

export function StatStrip({ className = "" }: Props) {
  return (
    <section
      aria-label="Why KALERO customers pick us"
      className={`relative isolate py-10 sm:py-12 ${className}`}
    >
      <div className="container-x">
        <div className="grid gap-3 rounded-card bg-white p-4 ring-1 ring-lavender-100 shadow-soft sm:grid-cols-2 sm:gap-0 sm:p-6 lg:grid-cols-4">
          {stats.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className={`flex items-start gap-3 px-2 py-2 sm:px-4 ${
                i > 0 ? "lg:border-l lg:border-lavender-100" : ""
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-charcoal sm:text-base">
                  {title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-charcoal-mid text-pretty">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
