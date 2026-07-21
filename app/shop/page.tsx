import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Reveal } from "@/components/ui/Reveal";
import { productBySlug } from "@/lib/products";

const concernImage: Record<string, string> = {
  "everyday-dust": "/images/New - fresh everyday home.png",
  "pets-and-dander": "/images/Pet - new.png",
  "allergies-and-pollen": "/images/Allergy Homepage.png",
  "smoke-and-pollution": "/images/Smoke Homepage.png",
  "odors-and-vocs": "/images/Carbon Homepage.png",
  "hotel-collection": "/images/New Hotel Image .png",
};

export const metadata: Metadata = {
  title: "Shop Home Air Filters | MERV 8, 11, 13 by Concern",
  description:
    "Shop every KALERO home air filter, sorted by concern — pet dander, allergies, smoke, dust, odors, and hotel supply. Available in 14x20x1, 16x20x1, 16x25x1, 20x20x1, 20x25x1, 20x30x1 and custom sizes. Free shipping on subscriptions.",
  alternates: { canonical: "/shop" },
  keywords: [
    "home air filters",
    "shop air filters",
    "HVAC air filter",
    "furnace filter",
    "MERV 8 filter",
    "MERV 11 filter",
    "MERV 13 filter",
    "20x25x1 air filter",
    "16x25x1 air filter",
    "20x20x1 air filter",
    "pet air filter",
    "allergy air filter",
    "smoke air filter",
    "KALERO air filters",
  ],
};

const visibleCategories = (() => {
  const list = categories.filter((c) => c.key !== "seasonal");
  const hotel = list.find((c) => c.key === "hotel");
  const rest = list.filter((c) => c.key !== "hotel");
  return hotel ? [...rest, hotel] : rest;
})();

export default function ShopPage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-lavender-200 via-lavender-100/70 to-canvas"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-96 w-96 rounded-full bg-lavender-300/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-lavender-400/30 blur-3xl"
      />

      <section aria-labelledby="shop-cats" className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p id="shop-cats" className="eyebrow justify-center">
              Browse by concern
            </p>
            <h2 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
              Start with what&apos;s in your air.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Six clearly named concerns for six clearly named filters. Pick the one that
              sounds most like your home and we&apos;ll take it from there.
            </p>
            <Link
              href="/find-your-filter"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-lavender-700 hover:text-lavender-800"
            >
              Not sure? Take the two-minute quiz
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCategories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="group relative flex aspect-[4/5] flex-col overflow-hidden rounded-xl p-7 shadow-card ring-1 ring-white/60 transition-all hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(74,46,122,0.45)] sm:p-8"
                  style={{
                    background: `linear-gradient(180deg, ${c.hex} 0%, ${c.softHex} 100%)`,
                  }}
                >
                  {concernImage[c.slug] && (
                    <Image
                      src={concernImage[c.slug]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
                      className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${c.hex}80 0%, ${c.hex}CC 55%, ${c.deepHex}E6 100%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-40 blur-3xl"
                    style={{ backgroundColor: `${c.hex}66` }}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
                    style={{ backgroundColor: `${c.hex}55` }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center justify-between">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 ring-1 ring-white/70 backdrop-blur"
                      style={{ color: c.deepHex }}
                    >
                      <CategoryIcon icon={c.icon} size={26} color={c.deepHex} />
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-charcoal shadow-soft transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={18} strokeWidth={2.25} />
                    </span>
                  </div>

                  <div className="relative mt-auto">
                    <p className="font-display text-3xl font-bold leading-tight text-white drop-shadow-sm sm:text-4xl">
                      {c.title}
                    </p>
                    <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-white/90 text-pretty">
                      {c.description}
                    </p>
                    {productBySlug(c.productSlug) && (
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/40 backdrop-blur">
                        <span className="uppercase tracking-[0.12em] text-white/85">
                          Filter
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/60" />
                        <span className="font-semibold">
                          {productBySlug(c.productSlug)!.name}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="shop-products" className="border-t border-lavender-100/70 py-12 sm:py-14">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">The full lineup</p>
              <h2
                id="shop-products"
                className="mt-3 font-display text-2xl font-semibold text-charcoal text-balance sm:text-3xl"
              >
                {products.length} filters, ready to ship.
              </h2>
            </div>
            <Link
              href="/subscriptions"
              className="link-underline text-sm font-medium text-lavender-700"
            >
              Build a household plan →
            </Link>
          </div>

          <div
            className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((p) => (
              <div
                key={p.slug}
                className="w-[240px] shrink-0 snap-start sm:w-[260px] lg:w-[280px]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
