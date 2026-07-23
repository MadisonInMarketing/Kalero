import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplet, Sparkles, Wind } from "lucide-react";
import { scentCopy } from "@/lib/scentStrips";

const stepIcons = [Droplet, Sparkles, Wind] as const;

/**
 * Slim homepage section positioning the scent strip as an optional upgrade.
 * Kept restrained — no loud banner, no CTA-heavy layout.
 */
export function ScentUpgradeStrip() {
  return (
    <section
      aria-labelledby="scent-upgrade-title"
      className="relative pb-6 pt-2 sm:pb-10 sm:pt-4"
    >
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-lavender-100 bg-gradient-to-br from-white via-lavender-50/60 to-white p-6 shadow-soft sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-3/5 opacity-30 sm:opacity-40"
          >
            <Image
              src="/images/hero/animated/scent-strip-hero.png"
              alt=""
              fill
              sizes="60vw"
              className="object-cover object-right"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20"
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_1.4fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-lavender-600">
                {scentCopy.eyebrow}
              </p>
              <h2
                id="scent-upgrade-title"
                className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-charcoal text-balance sm:text-4xl"
              >
                An optional fresh-home upgrade.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-mid text-pretty">
                {scentCopy.supporting}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/scent-strips"
                  className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-lavender-700"
                >
                  Explore scents
                  <ArrowRight size={14} />
                </Link>
                <span className="text-xs text-charcoal-light">
                  Filter first. Fresh scent, optional.
                </span>
              </div>
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              {scentCopy.steps.map((step, i) => {
                const Icon = stepIcons[i] ?? Droplet;
                return (
                  <li
                    key={step.key}
                    className="rounded-2xl bg-white/80 p-5 ring-1 ring-lavender-100/70"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 text-lavender-700"
                      >
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lavender-600">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-charcoal">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal-mid text-pretty">
                      {step.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
