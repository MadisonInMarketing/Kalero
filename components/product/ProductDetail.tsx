"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Info, Leaf, Minus, Plus, Star } from "lucide-react";
import { ProductRender } from "@/components/product/ProductRender";
import { Stars } from "@/components/ui/Stars";
import { Chip } from "@/components/ui/Chip";
import { Button, LinkButton } from "@/components/ui/Button";
import { AirflowLines } from "@/components/ui/AirflowLines";
import { Placeholder } from "@/components/ui/Placeholder";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { ScentBadge } from "@/components/ui/ScentBadge";
import { ScentAddOn } from "@/components/scent/ScentAddOn";
import { categoryByKey } from "@/lib/categories";
import { STANDARD_SIZES, products, type Product } from "@/lib/products";
import { isScentCompatible, scentStripPrice, type ScentKey } from "@/lib/scentStrips";

type Mode = "onetime" | "subscribe";

type Props = {
  product: Product;
};

const galleryBySlug: Record<string, { src: string; label: string }[]> = {
  "everyday-defense": [
    { src: "/images/hero/animated/Everyday/everyday_filter_1.png", label: "Front" },
    { src: "/images/hero/animated/Everyday/everyday_filter_2.png", label: "Angle" },
    { src: "/images/hero/animated/Everyday/everyday_filter_5.png", label: "Studio" },
    { src: "/images/hero/animated/Everyday/everyday_filter_10.png", label: "Detail" },
    { src: "/images/hero/animated/Everyday/everyday_filter_15.png", label: "In use" },
  ],
  "pet-defense": [
    { src: "/images/hero/animated/Pet/pet_filter_1.png", label: "Front" },
    { src: "/images/hero/animated/Pet/pet_filter_2.png", label: "Angle" },
    { src: "/images/hero/animated/Pet/pet_filter_5.png", label: "Studio" },
    { src: "/images/hero/animated/Pet/pet_filter_10.png", label: "Detail" },
    { src: "/images/hero/animated/Pet/pet_filter_15.png", label: "In use" },
  ],
  "allergy-defense": [
    { src: "/images/hero/animated/Allergy/allergy_filter_7.png", label: "Front" },
    { src: "/images/hero/animated/Allergy/allergy_filter_8.png", label: "Angle" },
    { src: "/images/hero/animated/Allergy/allergy_filter_10.png", label: "Studio" },
    { src: "/images/hero/animated/Allergy/allergy_filter_15.png", label: "Detail" },
  ],
  "smoke-defense": [
    { src: "/images/hero/animated/Smoke/smoke_filter_1.png", label: "Front" },
    { src: "/images/hero/animated/Smoke/smoke_filter_2.png", label: "Angle" },
    { src: "/images/hero/animated/Smoke/smoke_filter_3.png", label: "Studio" },
    { src: "/images/hero/animated/Smoke/smoke_filter_4.png", label: "Detail" },
  ],
  "carbon-defense": [
    { src: "/images/hero/animated/Carbon/carbon_filter_1.png", label: "Front" },
    { src: "/images/hero/animated/Carbon/carbon_filter_2.png", label: "Angle" },
    { src: "/images/hero/animated/Carbon/carbon_filter_3.png", label: "Studio" },
    { src: "/images/hero/animated/Carbon/carbon_filter_4.png", label: "Detail" },
  ],
  "hotel-collection": [
    { src: "/images/hero/animated/Hotel/hotel_filter_1.png", label: "Front" },
    { src: "/images/hero/animated/Hotel/hotel_filter_2.png", label: "Angle" },
    { src: "/images/hero/animated/Hotel/hotel_filter_5.png", label: "Studio" },
    { src: "/images/hero/animated/Hotel/hotel_filter_10.png", label: "Detail" },
    { src: "/images/hero/animated/Hotel/hotel_filter_15.png", label: "In use" },
  ],
};

export function ProductDetail({ product }: Props) {
  const category = categoryByKey(product.category)!;
  const [size, setSize] = useState<string>(STANDARD_SIZES[4]);
  const [customSize, setCustomSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<Mode>("subscribe");
  const [cadence, setCadence] = useState<30 | 60 | 90>(60);
  const [scentSelection, setScentSelection] = useState<{
    scentKey: ScentKey | null;
    quantity: number;
  }>({ scentKey: null, quantity: 1 });
  const gallery = useMemo(() => {
    const base = galleryBySlug[product.slug] ?? [];
    if (base.length > 0) return base;
    if (product.image) return [{ src: product.image, label: "Front" }];
    return [];
  }, [product.slug, product.image]);
  const [activeThumb, setActiveThumb] = useState(0);
  const activeImage = gallery[activeThumb]?.src ?? product.image;

  const unitPrice = useMemo(() => {
    const base = product.priceFrom;
    return mode === "subscribe"
      ? Math.round(base * (1 - product.subscriptionSavings / 100) * 100) / 100
      : base;
  }, [mode, product]);

  const scentTotal = useMemo(
    () =>
      scentSelection.scentKey === null
        ? 0
        : scentStripPrice * scentSelection.quantity,
    [scentSelection],
  );

  const total = useMemo(
    () => Math.round((unitPrice * quantity + scentTotal) * 100) / 100,
    [unitPrice, quantity, scentTotal],
  );

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, ${product.color.soft} 0%, #FFFFFF 65%, #FFFFFF 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <AirflowLines className="h-full w-full" color={product.color.base} opacity={0.22} />
        </div>

        <div className="container-x relative pb-16 pt-10 sm:pt-14 lg:pt-16">
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-charcoal-light" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-charcoal">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-charcoal">
              Shop
            </Link>
            <span>/</span>
            <Link href={`/shop/${category.slug}`} className="hover:text-charcoal">
              {category.title}
            </Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="relative flex flex-col gap-4">
              <div
                className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-card ring-1 ring-lavender-100 shadow-soft"
                style={{
                  background: `linear-gradient(180deg, ${product.color.soft} 0%, #FFFFFF 65%, #FFFFFF 100%)`,
                }}
              >
                <div className="pointer-events-none absolute inset-x-4 top-4 h-1/2 bg-lavender-glow opacity-70" />
                {activeImage ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <NextImage
                        src={activeImage}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 620px, (min-width: 640px) 90vw, 100vw"
                        className="object-contain p-6 drop-shadow-[0_35px_60px_rgba(74,46,122,0.25)] sm:p-10"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <ProductRender
                      name={product.name}
                      subtitle={product.tagline}
                      merv={
                        product.merv === "Activated Carbon"
                          ? "Carbon"
                          : product.merv === "Rotating"
                            ? "Drop"
                            : product.merv
                      }
                      category={product.category}
                      size="xl"
                      priority
                    />
                  </motion.div>
                )}
              </div>
              {gallery.length > 1 && (
                <div
                  className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-2 pb-2 [&::-webkit-scrollbar]:hidden"
                  style={{ scrollbarWidth: "none" }}
                  aria-label="Product images"
                >
                  {gallery.map((thumb, i) => (
                    <button
                      key={thumb.src}
                      type="button"
                      aria-label={thumb.label}
                      aria-pressed={i === activeThumb}
                      onClick={() => setActiveThumb(i)}
                      className={`relative aspect-square w-[calc((100%-2.25rem)/4)] shrink-0 snap-start overflow-hidden rounded-2xl bg-white ring-1 transition-all ${
                        i === activeThumb
                          ? "ring-2 ring-lavender-500 shadow-soft"
                          : "ring-lavender-100 hover:ring-lavender-300 hover:-translate-y-0.5"
                      }`}
                      style={
                        i === activeThumb
                          ? {
                              background: `linear-gradient(180deg, ${product.color.soft} 0%, #FFFFFF 100%)`,
                            }
                          : undefined
                      }
                    >
                      <NextImage
                        src={thumb.src}
                        alt={`${product.name} ${thumb.label.toLowerCase()}`}
                        fill
                        sizes="120px"
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
              {gallery.length === 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map(
                    (_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="aspect-square overflow-hidden rounded-2xl ring-1 ring-lavender-100"
                      >
                        <Placeholder
                          label="Coming soon"
                          ratio="square"
                          tone={i % 2 === 0 ? "lavender" : "canvas"}
                          className="rounded-2xl border-none ring-0 shadow-none"
                        />
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip className={product.color.chip}>
                  {product.merv === "Rotating" ? "Rotating drop" : product.merv}
                </Chip>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-eyebrow"
                  style={{ backgroundColor: category.softHex, color: category.deepHex }}
                >
                  <CategoryIcon icon={category.icon} size={12} color={category.deepHex} />
                  {category.title}
                </span>
                {mode === "subscribe" && (
                  <Chip className="bg-lavender-100 text-lavender-700">
                    Save {product.subscriptionSavings}% subscribing
                  </Chip>
                )}
                {isScentCompatible(product) && <ScentBadge size="xs" />}
              </div>

              <h1 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
                {product.name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-charcoal-mid text-pretty">
                {product.tagline}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <Stars value={product.rating.value} count={product.rating.count} />
                <span className="text-sm text-charcoal-light">|</span>
                <Link
                  href="#reviews"
                  className="text-sm text-lavender-700 hover:text-lavender-800"
                >
                  Read reviews
                </Link>
              </div>

              <div className="mt-8 rounded-card border border-lavender-100 bg-white p-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-charcoal-light">
                      {mode === "subscribe" ? "Per filter" : "One-time"}
                    </p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-semibold text-charcoal">
                        ${unitPrice.toFixed(2)}
                      </span>
                      {mode === "subscribe" && (
                        <span className="text-sm text-charcoal-light line-through">
                          ${product.priceFrom.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-xs text-charcoal-light">
                    Total: <span className="font-medium text-charcoal">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor={`${product.slug}-size`}
                    className="text-sm font-medium text-charcoal"
                  >
                    Filter size
                  </label>
                  <div className="relative mt-2">
                    <select
                      id={`${product.slug}-size`}
                      value={STANDARD_SIZES.includes(size as (typeof STANDARD_SIZES)[number]) ? size : "__custom"}
                      onChange={(e) => {
                        if (e.target.value === "__custom") return;
                        setSize(e.target.value);
                      }}
                      className="w-full appearance-none rounded-xl border border-lavender-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-charcoal shadow-soft transition-all hover:border-lavender-300 focus:border-lavender-500 focus:outline-none focus:ring-2 focus:ring-lavender-400/40"
                    >
                      {STANDARD_SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                      {!STANDARD_SIZES.includes(size as (typeof STANDARD_SIZES)[number]) && (
                        <option value="__custom" disabled>
                          Custom: {size}
                        </option>
                      )}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-mid"
                      aria-hidden="true"
                    />
                  </div>
                  <details className="mt-3 text-sm text-charcoal-mid">
                    <summary className="cursor-pointer text-lavender-700 hover:text-lavender-800">
                      Enter a custom size
                    </summary>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 12 × 24 × 1"
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="flex-1 rounded-xl border border-lavender-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-400"
                      />
                      <button
                        type="button"
                        onClick={() => customSize && setSize(customSize)}
                        className="rounded-xl bg-lavender-500 px-3 py-2 text-xs font-medium text-white hover:bg-lavender-600"
                      >
                        Use
                      </button>
                    </div>
                  </details>
                </div>

                <div className="mt-5">
                  <div className="grid grid-cols-2 gap-2 rounded-full bg-canvas p-1 ring-1 ring-lavender-100">
                    {(["onetime", "subscribe"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`relative rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                          mode === m ? "text-charcoal" : "text-charcoal-light"
                        }`}
                      >
                        {mode === m && (
                          <motion.span
                            layoutId={`toggle-${product.slug}`}
                            className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-lavender-100"
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                          />
                        )}
                        <span className="relative">
                          {m === "onetime"
                            ? "One-time purchase"
                            : `Subscribe & save ${product.subscriptionSavings}%`}
                        </span>
                      </button>
                    ))}
                  </div>

                  {mode === "subscribe" && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-charcoal">Delivery cadence</p>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {([30, 60, 90] as const).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCadence(c)}
                            className={`rounded-2xl border px-3 py-3 text-center text-sm transition-all ${
                              cadence === c
                                ? "border-lavender-500 bg-lavender-50 text-charcoal"
                                : "border-lavender-100 bg-white text-charcoal-mid hover:border-lavender-300"
                            }`}
                          >
                            <span className="block font-display font-semibold">
                              {c} days
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isScentCompatible(product) && (
                  <div className="mt-5">
                    <ScentAddOn
                      value={scentSelection}
                      onChange={setScentSelection}
                    />
                  </div>
                )}

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex items-center rounded-pill bg-canvas ring-1 ring-lavender-100">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-10 w-10 items-center justify-center text-charcoal-mid hover:text-charcoal"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-medium text-charcoal">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(24, q + 1))}
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center text-charcoal-mid hover:text-charcoal"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <Button size="lg" className="flex-1" arrow>
                    Add to cart · ${total.toFixed(2)}
                  </Button>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 text-sm text-charcoal-mid sm:grid-cols-2">
                {[
                  "Free shipping on subscriptions",
                  "Pause or cancel anytime",
                  "Replacement reminders",
                  `Ships in 3-5 business days`,
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <Check size={14} className="text-lavender-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HvacCompatibility />

      <section className="border-t border-lavender-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="eyebrow">Designed for</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.designedFor.map((d) => (
                    <div
                      key={d}
                      className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-lavender-100 shadow-soft"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ backgroundColor: category.softHex, color: category.deepHex }}
                      >
                        <Leaf size={16} />
                      </span>
                      <span className="text-sm font-medium text-charcoal">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow">What it helps capture</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.helpsCapture.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-white px-4 py-2 text-sm text-charcoal ring-1 ring-lavender-100"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <p className="mt-4 flex items-start gap-2 rounded-2xl bg-canvas p-4 text-xs leading-relaxed text-charcoal-mid ring-1 ring-lavender-100">
                  <Info size={14} className="mt-0.5 shrink-0 text-lavender-600" />
                  Performance depends on your HVAC compatibility, airflow, filter size, usage, and
                  replacement schedule. This is a product comparison, not a medical claim.
                </p>
              </div>

              <div>
                <p className="eyebrow">Long description</p>
                <p className="mt-4 text-base leading-relaxed text-charcoal-mid text-pretty">
                  {product.longDescription}
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft">
                <p className="eyebrow">Replacement guidance</p>
                <p className="mt-3 font-display text-lg font-semibold text-charcoal">
                  {product.replacementCadence}
                </p>
                <p className="mt-2 text-sm text-charcoal-mid">
                  Homes with pets, allergies, or smoke exposure benefit from more frequent
                  replacements.
                </p>
              </div>
              <div className="rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft">
                <p className="eyebrow">Compatibility</p>
                <p className="mt-3 text-sm text-charcoal-mid text-pretty">
                  Sized for standard residential HVAC returns. If your system is older or
                  smaller, we recommend MERV 8-11 filters, your technician can confirm.
                </p>
              </div>
              <div className="rounded-card bg-gradient-to-br from-lavender-500 to-lavender-700 p-6 text-white shadow-card">
                <p className="text-eyebrow text-lavender-100">Compare</p>
                <p className="mt-3 font-display text-lg font-semibold">
                  How does {product.name} fit next to the rest?
                </p>
                <LinkButton
                  href="/find-your-filter"
                  variant="secondary"
                  className="mt-4 bg-white text-charcoal ring-0"
                  arrow
                >
                  Compare filters
                </LinkButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="reviews" className="border-t border-lavender-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow">Reviews</p>
              <p className="mt-3 font-display text-display-md font-semibold text-charcoal">
                {product.rating.value.toFixed(1)}
              </p>
              <Stars value={product.rating.value} />
              <p className="mt-2 text-sm text-charcoal-mid">
                Based on {product.rating.count.toLocaleString()} verified reviews.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  author: "The Wallace family",
                  text: `We swapped from a big-box filter and the difference was immediate, fewer sneezes on pollen days and no more mystery replacement dates.`,
                },
                {
                  author: "L. Nguyen",
                  text: `The subscription is the whole point. New filter shows up, old one comes out, done.`,
                },
                {
                  author: "K. Ito",
                  text: `The packaging alone made this feel like a real product, not a generic disposable.`,
                },
                {
                  author: "Andrea R.",
                  text: `Simple to understand, easy to reorder, and it looks nice in the utility closet.`,
                },
              ].map((r) => (
                <div key={r.author} className="rounded-card bg-white p-5 ring-1 ring-lavender-100 shadow-soft">
                  <div className="flex items-center gap-1.5 text-lavender-500">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={12} className="fill-lavender-500 text-lavender-500" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-mid text-pretty">{r.text}</p>
                  <p className="mt-3 text-xs text-charcoal-light">{r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-lavender-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Compare</p>
              <p className="mt-3 font-display text-2xl font-semibold text-charcoal">
                Other KALERO filters
              </p>
            </div>
            <Link
              href="/shop"
              className="link-underline text-sm font-medium text-lavender-700"
            >
              Shop all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <div key={p.slug} className="[&>*]:h-full">
                <Link href={`/products/${p.slug}`}>
                  <div className="flex items-center gap-4 rounded-card bg-white p-5 ring-1 ring-lavender-100 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
                    <div
                      className="pointer-events-none relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl"
                      style={{
                        background: `linear-gradient(180deg, ${p.color.soft} 0%, #FFFFFF 100%)`,
                      }}
                    >
                      {p.image ? (
                        <NextImage
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <ProductRender
                          name={p.name}
                          merv={p.merv === "Rotating" ? "Drop" : p.merv === "Activated Carbon" ? "Carbon" : p.merv}
                          category={p.category}
                          size="sm"
                          floating={false}
                          showBadge={false}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-base font-semibold text-charcoal">
                        {p.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-charcoal-mid text-pretty">{p.concern}</p>
                      <p className="mt-2 text-xs font-medium text-lavender-700">
                        From ${p.priceFrom}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-lavender-100 bg-white/95 p-3 shadow-card backdrop-blur lg:hidden">
        <div className="container-x flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm font-semibold text-charcoal">{product.name}</p>
            <p className="text-xs text-charcoal-light">
              ${unitPrice.toFixed(2)} · {size}
            </p>
          </div>
          <Button size="md" arrow>
            Add to cart
          </Button>
        </div>
      </div>
    </>
  );
}

