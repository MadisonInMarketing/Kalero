import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ClipboardList,
  Layers,
  MessageSquare,
} from "lucide-react";
import { ProductRender } from "@/components/product/ProductRender";
import { HotelRequestForm } from "@/components/hotel/HotelRequestForm";

export const metadata: Metadata = {
  title: "Hotel & Commercial Air Filter Supply | Bulk HVAC Filter Programs",
  description:
    "KALERO builds recurring bulk air filter supply programs for hotels, property managers, multi-family communities, and hospitality groups. MERV-rated HVAC filters delivered on custom schedules to every property.",
  alternates: { canonical: "/hotel-property" },
  keywords: [
    "commercial air filter supply",
    "hotel HVAC filter",
    "bulk air filter",
    "property management air filter",
    "multi-property filter program",
    "commercial MERV 11 filter",
    "commercial MERV 13 filter",
    "hospitality air filter",
  ],
};

const services = [
  {
    Icon: ClipboardList,
    title: "Property-specific filter planning",
    body: "We document the products, sizes, quantities, and replacement needs across every room, unit, return vent, and rooftop system.",
  },
  {
    Icon: Layers,
    title: "Recurring supply and delivery",
    body: "Filters ship according to your housekeeping, engineering, turnover, and maintenance schedules, not a generic retail calendar.",
  },
  {
    Icon: Building2,
    title: "Portfolio-level management",
    body: "Manage one boutique property or a portfolio of locations with consolidated invoicing, volume pricing, and property-level visibility.",
  },
  {
    Icon: MessageSquare,
    title: "Named account support",
    body: "Work with one account contact for sizing questions, schedule changes, supply updates, and recurring program reviews.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Onboarding audit",
    body: "We document every filter, size, quantity, and location.",
  },
  {
    step: "02",
    title: "Program design",
    body: "We build the product mix, delivery schedule, and commercial pricing.",
  },
  {
    step: "03",
    title: "Recurring supply",
    body: "Filters ship on schedule and remain organized by property or building.",
  },
  {
    step: "04",
    title: "Ongoing review",
    body: "We adjust the program as your properties, occupancy, and maintenance needs change.",
  },
];

const faqs = [
  {
    q: "What types of properties do you support?",
    a: "KALERO can support hotels, serviced apartments, residential communities, property-management groups, and other multi-unit buildings with recurring filter needs.",
  },
  {
    q: "Can different properties use different filter sizes?",
    a: "Yes. Each property, building, unit, or HVAC system can have its own products, sizes, quantities, and replacement schedule within the same overall program.",
  },
  {
    q: "Can delivery schedules vary by property?",
    a: "Yes. Deliveries can be aligned with the operating and maintenance needs of individual properties or groups of locations.",
  },
  {
    q: "Do you offer volume pricing?",
    a: "Yes. Commercial pricing is based on product mix, order volume, delivery frequency, and portfolio requirements.",
  },
  {
    q: "Can KALERO work from an existing HVAC audit?",
    a: "Yes. We can review an existing audit or help organize your current filter records during onboarding.",
  },
  {
    q: "Do you provide consolidated invoicing?",
    a: "Yes. Depending on the program, billing can be consolidated while still maintaining property-level organization and visibility.",
  },
  {
    q: "How quickly will someone contact us?",
    a: "A KALERO representative will follow up within one business day after the request form is submitted.",
  },
];

export default function HotelPropertyPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background:
            "radial-gradient(85% 70% at 90% 20%, rgba(251,239,211,0.75) 0%, rgba(251,239,211,0) 65%), linear-gradient(180deg, #FFFFFF 0%, #FBEFD3 55%, #FAFAFC 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-16 -z-10 h-96 w-96 rounded-full bg-gold-soft/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-24 -z-10 h-96 w-96 rounded-full bg-gold/25 blur-3xl"
        />
        {/* subtle architectural linework */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
        >
          <defs>
            <linearGradient id="hotelLines" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E9B95C" stopOpacity="0" />
              <stop offset="60%" stopColor="#E9B95C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E9B95C" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M -40 ${60 + i * 48} L 1480 ${60 + i * 48}`}
              stroke="url(#hotelLines)"
              strokeWidth="0.5"
              fill="none"
            />
          ))}
        </svg>

        <div className="container-x relative py-14 sm:py-18 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-eyebrow text-gold-deep ring-1 ring-gold/30 backdrop-blur">
              Hotel & Property Supply
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-charcoal text-balance">
              Better air, built into{" "}
              <span className="text-gold-deep">every stay.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
              KALERO builds recurring filter programs for hospitality groups,
              property managers, and residential communities. We organize
              products, sizes, replacement schedules, and deliveries around the
              way your properties operate.
            </p>
            <div className="mt-7">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-pill bg-charcoal px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.06em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-charcoal-soft hover:shadow-card"
              >
                Request a plan
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOSPITALITY POSITIONING */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
            <div className="relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card ring-1 ring-gold/30 shadow-card">
                <Image
                  src="/images/New Hotel Image .png"
                  alt="Premium hotel guest room"
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-2 rotate-2 sm:-right-6">
                <div className="w-32 sm:w-40">
                  <ProductRender
                    name="Hotel Collection"
                    subtitle="Property supply"
                    merv="MERV 13"
                    category="hotel"
                    image="/images/Hotel Collection.png"
                    size="sm"
                    floating={false}
                    showBadge={false}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:pl-6">
              <p className="eyebrow text-gold-deep">Portfolio program</p>
              <p className="font-display text-display-lg font-semibold uppercase text-charcoal text-balance">
                Air is part of hospitality.
              </p>
              <p className="text-lg leading-relaxed text-charcoal-mid text-pretty">
                Guests notice fresh air the way they notice clean linens,
                quietly. KALERO builds a filter program around your properties,
                schedules, building specifications, and service standards.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {[
                  "Property-specific sizing",
                  "Contract and net terms",
                  "Named account support",
                  "Quarterly reviews",
                ].map((l) => (
                  <li
                    key={l}
                    className="flex items-center gap-2 rounded-full bg-canvas px-4 py-2 text-sm text-charcoal ring-1 ring-lavender-100"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CAPABILITIES */}
      <section
        className="relative isolate overflow-hidden py-14 sm:py-16"
        aria-labelledby="services-title"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas via-gold-soft/25 to-canvas" />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-deep justify-center">
              What we manage
            </p>
            <h2
              id="services-title"
              className="mt-4 font-display text-display-md font-semibold uppercase text-charcoal text-balance sm:text-display-lg"
            >
              Everything your team needs to keep replacement on schedule.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
              From the first HVAC audit to recurring deliveries, KALERO keeps
              every product, size, property, and replacement schedule organized
              under one program.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex h-full items-start gap-4 rounded-card bg-white p-5 ring-1 ring-lavender-100 shadow-soft sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold-deep">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold uppercase text-charcoal sm:text-lg">
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-mid text-pretty">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + REQUEST FORM */}
      <section className="py-14 sm:py-16" aria-labelledby="process-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <p className="eyebrow text-gold-deep">How the program works</p>
              <h2
                id="process-title"
                className="mt-4 font-display text-display-md font-semibold uppercase text-charcoal text-balance sm:text-display-lg"
              >
                One program. Every property. One predictable schedule.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
                We audit your filter needs, build a replacement plan, and manage
                recurring supply across every unit, building, and property.
              </p>

              <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                {processSteps.map((s) => (
                  <li
                    key={s.step}
                    className="rounded-2xl bg-canvas p-4 ring-1 ring-lavender-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-xs font-semibold text-charcoal">
                        {s.step}
                      </span>
                      <span className="font-display text-sm font-semibold uppercase text-charcoal">
                        {s.title}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal-mid text-pretty">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <HotelRequestForm />
          </div>
        </div>
      </section>

      {/* COMMERCIAL FAQ */}
      <section
        aria-labelledby="hotel-faq-title"
        className="border-t border-lavender-100/70 py-14 sm:py-16"
      >
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-deep justify-center">
              Commercial FAQ
            </p>
            <h2
              id="hotel-faq-title"
              className="mt-4 font-display text-display-md font-semibold uppercase text-charcoal text-balance sm:text-display-lg"
            >
              Questions about your property program?
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <ul className="flex flex-col gap-3">
              {faqs.map((item) => (
                <li key={item.q}>
                  <details className="group rounded-2xl bg-white ring-1 ring-lavender-100 shadow-soft transition-shadow open:shadow-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left">
                      <span className="font-display text-base font-semibold uppercase text-charcoal sm:text-lg">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-charcoal-mid text-pretty">
                      {item.a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
