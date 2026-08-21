import { Truck } from "lucide-react";
import { businessConfig } from "@/lib/business";

/**
 * Sitewide announcement bar. Renders null when no copy is configured
 * so we never fabricate promo claims.
 */
export function AnnouncementBar() {
  const copy = businessConfig.announcementBar;
  if (!copy) return null;

  return (
    <div className="relative isolate w-full overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sky-500 blur-3xl" />
        <div className="absolute -right-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sky-700 blur-3xl" />
      </div>
      <div className="container-x flex items-center justify-center gap-2 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/90 sm:text-xs">
        <Truck size={14} strokeWidth={1.75} className="text-sky-300" />
        <span>{copy}</span>
      </div>
    </div>
  );
}
