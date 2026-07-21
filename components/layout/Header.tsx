"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/find-your-filter", label: "Find Your Filter" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-lg ring-1 ring-lavender-100/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-x grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 sm:h-24">
        <Logo variant="brand" size="md" stacked />
        <nav
          className="hidden items-center justify-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-lavender-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-white hover:text-lavender-700"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-10 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-medium text-white transition-colors hover:bg-charcoal-soft"
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            <span className="hidden sm:inline">Cart</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lavender-500 px-1.5 text-[11px] font-semibold">
              0
            </span>
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-white hover:text-lavender-700 lg:hidden"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-card"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-lavender-100 px-6 py-5">
                <Logo size="sm" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-soft hover:bg-canvas"
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 px-4 py-6" aria-label="Mobile">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3.5 text-base font-medium text-charcoal transition-colors hover:bg-canvas"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-lavender-100 p-6">
                <p className="text-eyebrow text-lavender-700">Extras</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-charcoal-mid hover:text-lavender-700"
                  >
                    Your account
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-charcoal-mid hover:text-lavender-700"
                  >
                    Cart
                  </Link>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
