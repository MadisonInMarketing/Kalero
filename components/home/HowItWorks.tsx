import { howItWorks } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { AirflowLines } from "@/components/ui/AirflowLines";

export function HowItWorks() {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-canvas via-lavender-50/60 to-canvas py-24 sm:py-28"
      aria-labelledby="how-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70">
        <AirflowLines opacity={0.18} strokeWidth={1} className="h-full w-full" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How KALERO works</p>
          <h2
            id="how-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Cleaner air without another thing to remember.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Three quiet steps between you and the filter your home actually needs.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-8 top-14 hidden h-px md:block">
            <div className="h-full w-full bg-gradient-to-r from-lavender-200/0 via-lavender-400/60 to-lavender-200/0" />
          </div>

          {howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-card bg-white p-8 ring-1 ring-lavender-100 shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender-100 font-display text-2xl font-semibold text-lavender-700">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-eyebrow text-charcoal-light">Step {i + 1}</div>
                    <div className="mt-1 font-display text-lg font-semibold text-charcoal">
                      {s.title}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-charcoal-mid text-pretty">
                  {s.body}
                </p>

                {i === 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Pets", "Allergies", "Smoke", "Odors"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-canvas px-3 py-1 text-xs text-charcoal-mid ring-1 ring-lavender-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {i === 1 && (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-canvas p-4 ring-1 ring-lavender-100">
                    <div className="h-10 w-10 rounded-xl bg-lavender-100" />
                    <div>
                      <div className="text-sm font-medium text-charcoal">Pet Defense</div>
                      <div className="text-xs text-charcoal-light">MERV 11 · 20 × 25 × 1</div>
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="mt-6 flex items-center justify-between rounded-2xl bg-canvas p-4 ring-1 ring-lavender-100">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-charcoal-light">
                        Next delivery
                      </div>
                      <div className="mt-1 text-sm font-medium text-charcoal">Sep 12</div>
                    </div>
                    <div className="rounded-full bg-lavender-500 px-3 py-1 text-xs font-medium text-white">
                      On its way
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
