import Link from "next/link";
import { ArrowRight, Ruler, Sparkles, Wind } from "lucide-react";

const guides = [
  {
    icon: Wind,
    title: "What is MERV?",
    body: "Understand filtration ratings without the technical jargon.",
    href: "/learn/merv-guide",
  },
  {
    icon: Sparkles,
    title: "How often should I change my filter?",
    body: "A simple replacement guide based on your home and your season.",
    href: "/learn/replacement-guide",
  },
  {
    icon: Ruler,
    title: "What size air filter do I need?",
    body: "Learn how to read the dimensions on your current filter in seconds.",
    href: "/learn/filter-size-guide",
  },
];

/**
 * Homepage §16 — editorial guides teaser. Cleaner than a blog grid.
 */
export function AirGuidesTeaser() {
  return (
    <section
      aria-labelledby="air-guides-title"
      className="relative isolate py-16 sm:py-20"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">Learn</p>
          <h2
            id="air-guides-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Air, explained simply.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {guides.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-sky-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-soft sm:p-7"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-charcoal sm:text-xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                {body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 transition-transform group-hover:translate-x-0.5">
                Read guide
                <ArrowRight size={12} strokeWidth={2.25} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Explore Air Guides
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
