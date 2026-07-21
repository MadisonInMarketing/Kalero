import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, RefreshCw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { categories } from "@/lib/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export const metadata: Metadata = {
  title: "Your cart",
  description:
    "Review the filters in your cart. Adjust cadence, sizes, or add another concern before you check out.",
};

const trustPoints = [
  { Icon: Truck, label: "Free shipping on any subscription" },
  { Icon: RefreshCw, label: "Skip, pause, or cancel anytime" },
  { Icon: ShieldCheck, label: "30-day filter guarantee" },
];

const suggestedConcerns = categories
  .filter((c) => c.key !== "seasonal")
  .slice(0, 4);

export default function CartPage() {
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

      <section className="relative pt-14 pb-8 sm:pt-20">
        <div className="container-x">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-charcoal-mid" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-charcoal">
              Home
            </Link>
            <span>/</span>
            <span className="text-charcoal">Cart</span>
          </nav>

          <div className="max-w-2xl">
            <p className="eyebrow">Your cart</p>
            <h1 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
              Nothing in your cart yet.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Start by picking the concern that sounds most like your home, take the
              two-minute quiz, or build a subscription plan around the way your house
              actually breathes.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-card ring-1 ring-lavender-100 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lavender-200/50 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-lavender-100/70 blur-3xl"
              />

              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender-100 text-lavender-700 ring-1 ring-lavender-200">
                  <ShoppingBag size={26} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-2xl font-semibold text-charcoal text-balance">
                    Your KALERO cart is empty.
                  </p>
                  <p className="mt-2 text-sm text-charcoal-mid text-pretty">
                    Everything you add will live here, one plan across every vent in your
                    home.
                  </p>
                </div>
              </div>

              <div className="relative mt-8 flex flex-wrap items-center gap-3">
                <LinkButton href="/shop" size="lg" arrow>
                  Shop all filters
                </LinkButton>
                <LinkButton href="/find-your-filter" size="lg" variant="secondary" arrow>
                  Take the quiz
                </LinkButton>
              </div>

              <div className="relative mt-8 border-t border-lavender-100 pt-6">
                <p className="text-eyebrow text-charcoal-light">Start with a concern</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {suggestedConcerns.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}`}
                      className="group flex items-center gap-3 rounded-2xl bg-canvas p-3.5 text-sm ring-1 ring-lavender-100 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: c.softHex, color: c.deepHex }}
                      >
                        <CategoryIcon icon={c.icon} size={18} color={c.deepHex} />
                      </span>
                      <span className="flex-1 font-medium text-charcoal">{c.title}</span>
                      <ArrowRight
                        size={16}
                        className="text-charcoal-mid transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="rounded-xl bg-white p-6 shadow-card ring-1 ring-lavender-100 sm:p-7">
                <p className="text-eyebrow text-charcoal-light">Order summary</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between text-charcoal-mid">
                    <dt>Subtotal</dt>
                    <dd>$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between text-charcoal-mid">
                    <dt>Shipping</dt>
                    <dd className="text-lavender-700">Free with subscription</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-lavender-100 pt-3 text-charcoal">
                    <dt className="font-medium">Estimated total</dt>
                    <dd className="font-display text-base font-semibold">$0.00</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  disabled
                  className="mt-6 inline-flex w-full items-center justify-center rounded-pill bg-charcoal/40 px-5 py-3.5 text-sm font-medium text-white cursor-not-allowed"
                >
                  Checkout
                </button>
                <p className="mt-3 text-center text-xs text-charcoal-light">
                  Add a filter to unlock checkout.
                </p>
              </div>

              <div className="rounded-xl bg-lavender-50 p-6 ring-1 ring-lavender-100 sm:p-7">
                <p className="text-eyebrow text-lavender-700">The KALERO promise</p>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-charcoal">
                  {trustPoints.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lavender-700 ring-1 ring-lavender-200">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-charcoal to-charcoal-soft p-6 text-white shadow-card sm:p-7">
                <p className="text-eyebrow text-lavender-300">Multi-vent household?</p>
                <p className="mt-3 font-display text-lg font-semibold text-balance">
                  Build one subscription across every room.
                </p>
                <p className="mt-2 text-sm text-white/75 text-pretty">
                  Different sizes, different concerns, one delivery. Skip or pause anytime.
                </p>
                <Link
                  href="/subscriptions"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-lavender-100"
                >
                  Build a plan
                  <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
