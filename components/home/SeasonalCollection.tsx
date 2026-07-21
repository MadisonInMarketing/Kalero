import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { seasonalDrops } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";

export function SeasonalCollection() {
  return (
    <section
      className="relative isolate py-24 sm:py-28"
      aria-labelledby="seasonal-title"
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Home & seasonal</p>
            <h2
              id="seasonal-title"
              className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
            >
              Fresh air for the season you&apos;re in.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Four limited-run filters, each built for how a home actually feels through
              the year. Optional scent-enhancement layer available as a home-fragrance
              add-on (it doesn&apos;t change filtration).
            </p>
          </div>
          <Link
            href="/shop/seasonal-air"
            className="inline-flex items-center gap-2 rounded-pill bg-lavender-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-lavender-600"
          >
            Discover seasonal drops
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {seasonalDrops.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-card bg-gradient-to-br ${d.palette} p-6 ring-1 ring-lavender-100 shadow-soft transition-transform hover:-translate-y-1`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={d.image}
                    alt={`${d.name} editorial`}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-eyebrow text-lavender-700">Limited drop</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-charcoal">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal-mid text-pretty">{d.tagline}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal">
                    From $34
                  </span>
                  <span className="link-underline text-sm text-lavender-700">
                    Shop the drop
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
