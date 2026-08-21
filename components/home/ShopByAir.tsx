import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tiers, type TierId } from "@/lib/tiers";
import { concerns } from "@/lib/concerns";
import { MervShield } from "@/components/ui/MervShield";

/**
 * Homepage §10 (§43 defining idea) — "Shop by what's in your air."
 *
 * Three tier cards (Standard / Pro / Max), each with the concern chips
 * that map to it underneath. Clicking a concern chip routes to that
 * concern's hub; clicking the tier CTA routes to the MERV landing page.
 */
export function ShopByAir() {
  return (
    <section
      aria-labelledby="shop-by-air-title"
      className="relative isolate py-20 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">Shop by air</p>
          <h2
            id="shop-by-air-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Shop by what&apos;s in your air.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            Choose the level of filtration that fits your home. Dust, pollen,
            pets, smoke, everyday life — pick your reality and we&apos;ll match
            it to the right MERV.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => {
            const matchedConcerns = concerns.filter(
              (c) => c.recommendedTier === t.id,
            );
            return (
              <article
                key={t.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-7 shadow-soft ring-1 ring-sky-100 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: t.hex }}
                />
                <div className="flex items-start justify-between gap-4">
                  <MervShield
                    rating={String(t.merv)}
                    label="Standard"
                    size="sm"
                  />
                  {t.id === "pro" && (
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-700">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <p
                    className="text-eyebrow font-semibold"
                    style={{ color: t.deepHex }}
                  >
                    {t.name}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-charcoal sm:text-3xl">
                    MERV {t.merv}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-mid text-pretty">
                    {t.positioning}
                  </p>
                </div>

                {matchedConcerns.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal-light">
                      For
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {matchedConcerns.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/shop-by/${c.slug}`}
                            className="inline-flex rounded-full border border-sky-100 bg-sky-50/50 px-2.5 py-1 text-[11px] font-medium text-charcoal transition-colors hover:border-sky-400 hover:bg-white"
                          >
                            {c.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="mt-5 flex flex-col gap-1.5 text-xs text-charcoal-mid">
                  {t.captures.slice(0, 4).map((cap) => (
                    <li key={cap} className="flex items-start gap-1.5">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-1 w-1 rounded-full"
                        style={{ backgroundColor: t.hex }}
                      />
                      {cap}
                    </li>
                  ))}
                </ul>

                {t.heroImage && (
                  <div className="relative mt-6 aspect-[5/4] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={t.heroImage}
                      alt={`Kalero ${t.name} MERV ${t.merv} filter`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <Link
                  href={`/merv-${t.merv}`}
                  className="mt-6 inline-flex h-11 items-center justify-center gap-1.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: t.hex }}
                >
                  Shop {t.name}
                  <ArrowRight size={14} strokeWidth={2.25} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type ShopByAirTierId = TierId;
