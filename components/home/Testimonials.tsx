import { testimonials } from "@/lib/copy";
import { productColors } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section
      className="relative isolate py-24 sm:py-28"
      aria-labelledby="testimonials-title"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">From KALERO homes</p>
          <h2
            id="testimonials-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Quiet reviews from real households.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Because a home-air ritual should feel steady, not shouted.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => {
            const c = productColors[t.category];
            return (
              <Reveal key={i} delay={i * 0.03}>
                <blockquote className="relative rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft">
                  <div className="pointer-events-none absolute right-6 top-6 font-display text-6xl leading-none text-lavender-100">
                    &ldquo;
                  </div>
                  <p className="relative font-display text-lg leading-snug text-charcoal text-pretty">
                    {t.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-3 border-t border-lavender-50 pt-4 text-sm">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-semibold text-white"
                      style={{ backgroundColor: c.deep }}
                    >
                      {t.author
                        .split(" ")
                        .map((s) => s[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <div className="font-medium text-charcoal">{t.author}</div>
                      <div className="text-charcoal-light">{t.detail}</div>
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
