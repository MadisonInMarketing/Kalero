import { ImageIcon } from "lucide-react";

type Props = {
  label: string;
  ratio?: "square" | "landscape" | "portrait" | "cinema" | "wide";
  tone?: "lavender" | "canvas" | "warm";
  className?: string;
  hint?: string;
};

const ratioClasses: Record<NonNullable<Props["ratio"]>, string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
  cinema: "aspect-[16/9]",
  wide: "aspect-[21/9]",
};

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  lavender:
    "bg-gradient-to-br from-lavender-100 via-white to-canvas ring-1 ring-lavender-200/70",
  canvas:
    "bg-gradient-to-br from-canvas via-white to-canvas ring-1 ring-lavender-100",
  warm: "bg-gradient-to-br from-gold-soft via-white to-canvas ring-1 ring-gold/20",
};

export function Placeholder({
  label,
  ratio = "landscape",
  tone = "lavender",
  className = "",
  hint,
}: Props) {
  return (
    <div
      className={`relative isolate flex flex-col items-center justify-center overflow-hidden rounded-card ${ratioClasses[ratio]} ${toneClasses[tone]} ${className}`}
    >
      <div className="absolute inset-0 bg-grid-soft opacity-40" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-lavender-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-lavender-300/30 blur-3xl" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-lavender-600 shadow-soft">
          <ImageIcon size={20} strokeWidth={1.75} />
        </div>
        <p className="text-eyebrow text-lavender-700">Image placeholder</p>
        <p className="max-w-[26ch] text-sm font-medium text-charcoal-mid">{label}</p>
        {hint && <p className="text-xs text-charcoal-light">{hint}</p>}
      </div>
    </div>
  );
}
