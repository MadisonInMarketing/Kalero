import { AirflowLines } from "@/components/ui/AirflowLines";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: "lavender" | "gold" | "blush";
  children?: React.ReactNode;
};

const accents: Record<NonNullable<Props["accent"]>, string> = {
  lavender: "from-lavender-50 via-canvas to-canvas",
  gold: "from-gold-soft via-canvas to-canvas",
  blush: "from-blush-soft via-canvas to-canvas",
};

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  accent = "lavender",
  children,
}: Props) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-gradient-to-b ${accents[accent]} pt-14 sm:pt-20`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70">
        <AirflowLines className="h-full w-full" opacity={0.22} />
      </div>
      <div className="container-x relative pb-14 sm:pb-20">
        <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
          <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-charcoal-mid text-pretty">
              {description}
            </p>
          )}
          {children && <div className={`mt-8 ${align === "center" ? "flex justify-center" : ""}`}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
