import { HelpCircle } from "lucide-react";

const steps = [
  {
    n: "1",
    title: "Pull it out",
    body: "Slide out the filter behind your return vent or in your air handler.",
  },
  {
    n: "2",
    title: "Read the frame",
    body: "The size is printed on the cardboard edge (e.g. 20 × 25 × 1).",
  },
  {
    n: "3",
    title: "Enter or select",
    body: "Type it into the finder or pick your size on the product page.",
  },
];

type Props = {
  className?: string;
  compact?: boolean;
};

export function HowToFindSize({ className = "", compact = false }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-card bg-white p-5 ring-1 ring-lavender-100 shadow-soft sm:p-6 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lavender-100/70 blur-3xl"
      />

      <div className="relative flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
          <HelpCircle size={16} strokeWidth={1.75} />
        </span>
        <p className="text-eyebrow text-charcoal-light">Not sure of your size?</p>
      </div>
      <p className={`relative mt-3 font-display font-semibold text-charcoal text-balance ${compact ? "text-lg" : "text-xl sm:text-2xl"}`}>
        Find it in three quick steps.
      </p>

      <ol
        className={`relative mt-4 grid gap-3 ${
          compact ? "sm:grid-cols-3" : "sm:grid-cols-3"
        }`}
      >
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex flex-col gap-2 rounded-2xl bg-canvas p-4 ring-1 ring-lavender-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender-500 text-xs font-semibold text-white">
              {s.n}
            </span>
            <p className="font-display text-sm font-semibold text-charcoal">
              {s.title}
            </p>
            <p className="text-xs leading-relaxed text-charcoal-mid text-pretty">
              {s.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="relative mt-4 text-xs text-charcoal-light">
        Custom size? Type it into the finder and we&apos;ll source it.
      </p>
    </div>
  );
}
