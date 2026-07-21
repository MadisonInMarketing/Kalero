import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { categories, categoryBySlug } from "@/lib/categories";
import { products, productsByCategory, type CategoryKey } from "@/lib/products";

const angleImages: Partial<Record<CategoryKey, { src: string; label: string }[]>> = {
  everyday: [
    { src: "/images/Everyday Merv 8.png", label: "Front view" },
    { src: "/images/Everyday Merv 8 2.png", label: "Airflow detail" },
    { src: "/images/Everyday Merv 8 3.png", label: "In the vent" },
  ],
  pet: [
    { src: "/images/Pet Product 1.png", label: "Front view" },
    { src: "/images/Pet Product 3.png", label: "Airflow detail" },
    { src: "/images/Pet Product 5.png", label: "In the vent" },
  ],
  allergy: [
    { src: "/images/Allergy Product 1.png", label: "Front view" },
    { src: "/images/Allergy Product 2.png", label: "Airflow detail" },
    { src: "/images/Allergy Product 3.png", label: "In the vent" },
  ],
  hotel: [
    { src: "/images/Hotel Product 1.png", label: "Front view" },
    { src: "/images/Hotel Product 2.png", label: "Airflow detail" },
    { src: "/images/Hotel Product 3.png", label: "In the vent" },
  ],
};
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Stars } from "@/components/ui/Stars";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return categories.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const c = categoryBySlug(collection);
  if (!c) return {};
  return {
    title: `${c.title} filters`,
    description: c.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const category = categoryBySlug(collection);
  if (!category) notFound();

  const inCategory = productsByCategory(category.key);
  const featured = inCategory[0];
  const others = products
    .filter((p) => p.category !== category.key && p.category !== "seasonal")
    .slice(0, 3);
  const otherCategories = categories.filter(
    (c) => c.key !== category.key && c.key !== "seasonal",
  );

  return (
    <>
      <PageHeader
        eyebrow={`Shop · ${category.shortTitle}`}
        title={`Filters for ${category.title.toLowerCase()}.`}
        description={category.description}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: category.softHex, color: category.deepHex }}
          >
            <CategoryIcon icon={category.icon} size={22} color={category.deepHex} />
          </span>
          <Link
            href="/shop"
            className="text-sm font-medium text-lavender-700 hover:text-lavender-800"
          >
            ← All filters
          </Link>
        </div>
      </PageHeader>

      {featured && (
        <section aria-labelledby="featured-title" className="relative py-10 sm:py-14">
          <div className="container-x">
            <div
              className="relative overflow-hidden rounded-2xl p-6 shadow-card ring-1 ring-white/60 sm:p-10 lg:p-14"
              style={{
                background: `linear-gradient(180deg, ${category.hex} 0%, ${category.softHex} 100%)`,
              }}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
                style={{ backgroundColor: `${category.hex}55` }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
                style={{ backgroundColor: `${category.hex}55` }}
                aria-hidden="true"
              />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
                <div className="text-white">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1 text-eyebrow text-white ring-1 ring-white/40 backdrop-blur">
                    <Sparkles size={12} />
                    The featured pick
                  </span>
                  <h2
                    id="featured-title"
                    className="mt-4 font-display text-display-xl font-semibold text-balance"
                    style={{ color: "#fff" }}
                  >
                    {featured.name}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-white/90 text-pretty">
                    {featured.tagline}
                  </p>
                  <Stars
                    value={featured.rating.value}
                    count={featured.rating.count}
                    className="mt-5 text-white [&_span]:text-white"
                    compact
                  />

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {featured.designedFor.slice(0, 4).map((line) => (
                      <li
                        key={line}
                        className="flex items-center gap-2 text-sm text-white"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/30">
                          <Check size={12} strokeWidth={2.5} className="text-white" />
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <LinkButton
                      href={`/products/${featured.slug}`}
                      size="lg"
                      variant="dark"
                      arrow
                    >
                      Choose your size
                    </LinkButton>
                    <span className="inline-flex items-center gap-2 rounded-pill bg-white/25 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur">
                      From ${featured.priceFrom} · {featured.merv}
                    </span>
                  </div>
                </div>

                {featured.image && (
                  <Link
                    href={`/products/${featured.slug}`}
                    aria-label={featured.name}
                    className="group relative mx-auto block w-full max-w-md"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={featured.image}
                        alt={featured.name}
                        fill
                        sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 85vw"
                        className="object-contain drop-shadow-[0_35px_60px_rgba(23,23,27,0.35)] transition-transform duration-500 group-hover:scale-[1.03]"
                        priority
                      />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {featured && (
        <section className="py-14">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
              <div className="rounded-card bg-white p-8 ring-1 ring-lavender-100 shadow-soft">
                <p className="eyebrow">What it helps capture</p>
                <p className="mt-3 font-display text-lg font-semibold text-charcoal text-balance">
                  Designed around real particles you actually notice.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-charcoal-mid">
                  {featured.helpsCapture.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: category.hex }}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-card bg-white p-8 ring-1 ring-lavender-100 shadow-soft">
                <p className="eyebrow">Best for</p>
                <p className="mt-3 font-display text-lg font-semibold text-charcoal text-balance">
                  Made for homes and homeowners like this.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.bestFor.map((line) => (
                    <span
                      key={line}
                      className="rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{
                        backgroundColor: category.softHex,
                        color: category.deepHex,
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-canvas p-4 ring-1 ring-lavender-100">
                  <p className="text-xs uppercase tracking-[0.14em] text-charcoal-light">
                    Replacement cadence
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-charcoal">
                    {featured.replacementCadence}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {featured && angleImages[category.key] && (
        <section className="pb-14">
          <div className="container-x">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">See how it works</p>
                <p className="mt-3 font-display text-display-md font-semibold text-charcoal text-balance">
                  {featured.name}, from every angle.
                </p>
              </div>
              <Link
                href={`/products/${featured.slug}`}
                className="link-underline text-sm font-medium text-lavender-700"
              >
                View full details →
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {angleImages[category.key]!.map((view) => (
                <div
                  key={view.src}
                  className="relative overflow-hidden rounded-card shadow-soft ring-1 ring-white/60"
                  style={{
                    background: `linear-gradient(180deg, ${category.hex} 0%, ${category.softHex} 100%)`,
                  }}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={view.src}
                      alt={`${featured.name} ${view.label.toLowerCase()}`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                      className="object-contain p-4 drop-shadow-[0_25px_45px_rgba(23,23,27,0.25)] transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/95">
                      {view.label}
                    </span>
                    <span className="inline-flex h-6 items-center rounded-full bg-white/25 px-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white ring-1 ring-white/40 backdrop-blur">
                      {featured.merv}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {inCategory.length > 1 && (
        <section className="pb-14">
          <div className="container-x">
            <p className="eyebrow">More in this concern</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inCategory.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-lavender-100/70 py-16">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Other concerns</p>
              <p className="mt-3 font-display text-display-md font-semibold text-charcoal text-balance">
                Every KALERO concern, one click away.
              </p>
            </div>
            <Link
              href="/shop"
              className="link-underline hidden items-center gap-2 text-sm font-medium text-lavender-700 sm:inline-flex"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {otherCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-white p-4 ring-1 ring-lavender-100 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: c.softHex, color: c.deepHex }}
                >
                  <CategoryIcon icon={c.icon} size={20} color={c.deepHex} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-charcoal">
                    {c.title}
                  </p>
                  <p className="truncate text-xs text-charcoal-light">
                    Shop the fit
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-lavender-500 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-3 rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-charcoal">
                Two-minute quiz. One filter, chosen for you.
              </p>
              <p className="mt-1 text-sm text-charcoal-mid">
                Answer a few questions about pets, allergies, and where you live.
              </p>
            </div>
            <LinkButton href="/find-your-filter" arrow>
              Find my filter
            </LinkButton>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="pb-24">
          <div className="container-x">
            <p className="eyebrow">You might also consider</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
