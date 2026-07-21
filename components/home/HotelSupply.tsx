import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, CalendarClock, Layers, Truck } from "lucide-react";
import { ProductRender } from "@/components/product/ProductRender";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  { Icon: Truck, text: "Recurring filter supply" },
  { Icon: CalendarClock, text: "Custom delivery schedules" },
  { Icon: Building2, text: "Multi-property management" },
  { Icon: Layers, text: "Volume programs" },
];

export function HotelSupply() {
  return (
    <section
      className="relative isolate overflow-hidden py-24 sm:py-28"
      aria-labelledby="hotel-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas via-gold-soft/40 to-canvas" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="relative overflow-hidden rounded-card ring-1 ring-gold/30 shadow-card">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/New Hotel Image .png"
                    alt="Premium hotel interior"
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -right-2 rotate-3 sm:-right-8">
                <ProductRender
                  name="Hotel Collection"
                  subtitle="Property supply program"
                  merv="MERV 13"
                  category="hotel"
                  image="/images/Hotel Collection.png"
                  size="md"
                  showBadge={false}
                />
              </div>
              <div className="absolute -bottom-6 left-4 hidden max-w-xs rounded-2xl bg-white/95 p-4 shadow-card ring-1 ring-lavender-100 backdrop-blur sm:block">
                <p className="text-eyebrow text-gold-deep">Hotel Collection</p>
                <p className="mt-2 font-display text-sm font-semibold text-charcoal">
                  Serving 34 properties across 8 states
                </p>
              </div>
            </div>
          </Reveal>

          <div className="max-w-lg">
            <p className="eyebrow text-gold-deep">Hotel & property supply</p>
            <h2
              id="hotel-title"
              className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
            >
              Better air, built into every stay.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              KALERO supplies hospitality groups, property managers, and residential
              communities with a consistent filter program designed around their
              buildings, replacement schedules, and service standards.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-sm text-charcoal-mid ring-1 ring-lavender-100 shadow-soft"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-soft text-gold-deep">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="font-medium text-charcoal">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/hotel-property"
                className="inline-flex items-center gap-2 rounded-pill bg-charcoal px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-soft"
              >
                Explore property supply
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
