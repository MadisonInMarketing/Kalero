import Link from "next/link";
import { Facebook, Instagram, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AirflowLines } from "@/components/ui/AirflowLines";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/find-your-filter", label: "Find Your Filter" },
  { href: "/cart", label: "Cart" },
];

const supportLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
];

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
];

export function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <AirflowLines
          color="#B58EE8"
          opacity={0.18}
          animate={false}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[70vw] -translate-x-1/2 rounded-full bg-lavender-500/20 blur-3xl" />

      <div className="container-x relative pb-12 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Logo variant="light" size="lg" />
            <p className="mt-6 text-2xl font-display font-medium leading-snug text-white">
              Better air, delivered.
            </p>
            <form className="mt-6 flex items-center gap-2 rounded-pill bg-white/8 p-1.5 ring-1 ring-white/15 backdrop-blur">
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-pill bg-lavender-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lavender-400"
              >
                Subscribe <Send size={14} />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:justify-end">
            <div>
              <p className="text-eyebrow text-lavender-300">Shop</p>
              <ul className="mt-4 flex flex-col gap-3">
                {primaryLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-eyebrow text-lavender-300">Help</p>
              <ul className="mt-4 flex flex-col gap-3">
                {supportLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} KALERO Air, Inc.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
