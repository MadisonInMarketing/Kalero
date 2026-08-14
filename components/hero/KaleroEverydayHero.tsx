"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Star, Truck } from "lucide-react";
import { STANDARD_SIZES } from "@/lib/products";

const RATING_VALUE = 4.9;
const RATING_COUNT = "12,000+";

export function KaleroEverydayHero() {
  const router = useRouter();
  const [size, setSize] = useState<string>(STANDARD_SIZES[4]); // 20 × 25 × 1 default

  const handleShop = () => {
    const slug = size.replace(/\s×\s/g, "x");
    router.push(`/shop?size=${encodeURIComponent(slug)}`);
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white"
    >
      {/* Iridescent packaging-inspired wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-iris-wash"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-sky-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-40 h-[480px] w-[480px] rounded-full bg-mint-soft/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-iris-soft/50 blur-3xl"
      />

      <div className="container-x relative grid gap-10 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          {/* Free shipping + rating band */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-charcoal-mid">
            <span className="flex items-center gap-2 text-sky-700">
              <Truck size={14} strokeWidth={2} />
              Always free shipping
            </span>
            <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-charcoal/25 sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="#F5B301" stroke="#F5B301" />
                ))}
              </span>
              <span className="text-charcoal">
                <span className="font-semibold">{RATING_VALUE}</span> · {RATING_COUNT}{" "}
                homes filtered
              </span>
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-charcoal text-balance"
          >
            Premium Air
            <br />
            <span className="text-sky-600">Filters, Delivered.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            Every standard HVAC size. MERV 8, 11, and 13. Delivered on your
            schedule with free shipping and 15% off subscriptions.
          </p>

          {/* Inline size selector card */}
          <div className="mt-8 max-w-xl rounded-2xl bg-white p-5 shadow-card ring-1 ring-sky-100 sm:p-6">
            <label
              htmlFor="hero-size"
              className="text-eyebrow font-semibold text-sky-700"
            >
              Choose your filter size
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="relative flex-1">
                <select
                  id="hero-size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="h-12 w-full appearance-none rounded-full border border-sky-200 bg-white px-5 pr-11 text-base font-medium text-charcoal shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  {STANDARD_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="custom">Custom size…</option>
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sky-600"
                >
                  ▾
                </span>
              </div>
              <button
                type="button"
                onClick={handleShop}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-sky-700 sm:px-7"
              >
                Shop this size
                <ArrowRight size={16} strokeWidth={2.25} />
              </button>
            </div>
            <p className="mt-3 text-xs text-charcoal-light">
              Don&apos;t know your size?{" "}
              <Link href="/find-your-filter" className="link-underline text-sky-700">
                Take the two-minute quiz
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Product visual */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            <Image
              src="/images/hero/animated/hero-01.png"
              alt="Kalero premium air filters"
              fill
              sizes="(min-width: 1024px) 620px, 90vw"
              className="object-contain drop-shadow-[0_30px_60px_rgba(11,90,148,0.25)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
