import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative isolate w-full overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-lavender-500 blur-3xl" />
        <div className="absolute -right-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-lavender-700 blur-3xl" />
      </div>
      <div className="container-x flex items-center justify-center gap-2 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/90 sm:text-xs">
        <Truck size={14} strokeWidth={1.75} className="text-lavender-300" />
        <span>Free shipping on filter subscriptions</span>
      </div>
    </div>
  );
}
