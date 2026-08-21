"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { sizes, formatSize } from "@/lib/sizes";
import { tiers } from "@/lib/tiers";
import { useCart } from "@/lib/cart";

const shopFiltersMenu = [
  { href: "/air-filters", label: "Shop All Filters", eyebrow: "Everything" },
  { href: "/merv-8", label: "Standard · MERV 8", eyebrow: "Everyday" },
  { href: "/merv-11", label: "Pro · MERV 11", eyebrow: "Pets + Allergies" },
  { href: "/merv-13", label: "Max · MERV 13", eyebrow: "Maximum Filtration" },
  { href: "/custom-filters", label: "Custom Sizes", eyebrow: "Not standard?" },
];

const learnMenu = [
  { href: "/learn/merv-guide", label: "MERV Guide" },
  { href: "/learn/filter-size-guide", label: "Filter Size Guide" },
  { href: "/learn/replacement-guide", label: "How Often to Replace" },
  { href: "/learn/air-quality-guide", label: "Air Quality Guide" },
  { href: "/faq", label: "FAQ" },
];

type ActiveMenu = null | "shop" | "learn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { itemCount, openDrawer } = useCart();

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

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], categories: [] };
    const matchedProducts = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q),
      )
      .slice(0, 5);
    const matchedCategories = categories
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      )
      .slice(0, 4);
    return { products: matchedProducts, categories: matchedCategories };
  }, [query]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-lg ring-1 ring-sky-100/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center gap-3 sm:h-20 sm:gap-6">
        <Logo variant="brand" size="md" stacked />
        {/* Inline search bar — filterbuy-style prominent */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search filters, sizes, or concerns"
          className="hidden h-11 flex-1 items-center gap-3 rounded-full border border-sky-200 bg-white/80 px-5 text-left text-sm text-charcoal-mid shadow-inner transition-colors hover:border-sky-400 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-sky-500 sm:flex"
        >
          <Search size={16} strokeWidth={1.75} className="text-sky-600" />
          <span>Search filters, sizes, or concerns…</span>
        </button>
        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((s) => !s)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-white hover:text-sky-700 sm:hidden"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-white hover:text-sky-700 lg:flex"
          >
            <User size={18} strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            aria-label={`Cart (${itemCount} item${itemCount === 1 ? "" : "s"})`}
            onClick={openDrawer}
            className="relative flex h-10 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-medium text-white transition-colors hover:bg-charcoal-soft"
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                itemCount > 0 ? "bg-sky-500" : "bg-white/20"
              }`}
            >
              {itemCount}
            </span>
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-soft transition-colors hover:bg-white hover:text-sky-700 lg:hidden"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
      {/* Secondary nav row — Shop Filters + Learn megamenus */}
      <div className="hidden border-t border-sky-100/60 lg:block">
        <div
          className="container-x relative flex h-11 items-center justify-center gap-8"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button
            type="button"
            onClick={() => setActiveMenu(activeMenu === "shop" ? null : "shop")}
            onMouseEnter={() => setActiveMenu("shop")}
            aria-expanded={activeMenu === "shop"}
            className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-sky-700"
          >
            Shop Filters
            <ChevronDown
              size={14}
              className={`transition-transform ${activeMenu === "shop" ? "rotate-180" : ""}`}
            />
          </button>
          <Link
            href="/find-your-filter"
            onMouseEnter={() => setActiveMenu(null)}
            className="text-sm font-medium text-charcoal transition-colors hover:text-sky-700"
          >
            Find Your Filter
          </Link>
          <Link
            href="/air-filters"
            onMouseEnter={() => setActiveMenu(null)}
            className="text-sm font-medium text-charcoal transition-colors hover:text-sky-700"
          >
            Shop by Size
          </Link>
          <Link
            href="/why-kalero"
            onMouseEnter={() => setActiveMenu(null)}
            className="text-sm font-medium text-charcoal transition-colors hover:text-sky-700"
          >
            Why KALERO
          </Link>
          <button
            type="button"
            onClick={() => setActiveMenu(activeMenu === "learn" ? null : "learn")}
            onMouseEnter={() => setActiveMenu("learn")}
            aria-expanded={activeMenu === "learn"}
            className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-sky-700"
          >
            Learn
            <ChevronDown
              size={14}
              className={`transition-transform ${activeMenu === "learn" ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {activeMenu === "shop" && (
              <motion.div
                key="shop-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-full z-30 mt-2 grid w-[860px] -translate-x-1/2 grid-cols-[1.1fr_1fr] gap-6 rounded-2xl bg-white p-6 shadow-card ring-1 ring-sky-100"
              >
                <div>
                  <p className="text-eyebrow font-semibold text-sky-700">
                    Shop Filters
                  </p>
                  <ul className="mt-3 grid gap-1">
                    {shopFiltersMenu.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-baseline justify-between rounded-xl px-3 py-2.5 text-sm text-charcoal transition-colors hover:bg-sky-50"
                        >
                          <span className="font-medium">{l.label}</span>
                          <span className="text-[11px] uppercase tracking-[0.14em] text-charcoal-light">
                            {l.eyebrow}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-eyebrow font-semibold text-sky-700">
                    Popular sizes
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {sizes
                      .filter((s) => s.popular)
                      .map((s) => (
                        <Link
                          key={s.slug}
                          href={`/air-filters/${s.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="rounded-xl border border-sky-100 bg-sky-50/50 px-3 py-2.5 text-center text-sm font-semibold text-charcoal transition-colors hover:border-sky-400 hover:bg-white"
                        >
                          {formatSize(s)}
                        </Link>
                      ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-sky-100 pt-3 text-xs">
                    <Link
                      href="/air-filters"
                      onClick={() => setActiveMenu(null)}
                      className="link-underline font-medium text-sky-700"
                    >
                      Shop all sizes →
                    </Link>
                    <Link
                      href="/find-your-filter"
                      onClick={() => setActiveMenu(null)}
                      className="text-charcoal-light hover:text-sky-700"
                    >
                      Not sure? Take the quiz →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
            {activeMenu === "learn" && (
              <motion.div
                key="learn-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-full z-30 mt-2 w-[420px] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-card ring-1 ring-sky-100"
              >
                <p className="text-eyebrow font-semibold text-sky-700">
                  Learn
                </p>
                <ul className="mt-3 grid gap-1">
                  {learnMenu.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setActiveMenu(null)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sky-50"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-sky-100 pt-3">
                  {tiers.map((t) => (
                    <Link
                      key={t.id}
                      href={`/merv-${t.merv}`}
                      onClick={() => setActiveMenu(null)}
                      className="rounded-xl border border-sky-100 px-3 py-2 text-center text-[11px] font-semibold text-charcoal transition-colors hover:bg-sky-50"
                    >
                      MERV {t.merv} · {t.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-overlay"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
              onClick={closeSearch}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-x-0 top-0 bg-white shadow-card"
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -32, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label="Search"
            >
              <div className="container-x flex items-center gap-3 py-5">
                <Search size={20} strokeWidth={1.75} className="text-charcoal-mid" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search filters, sizes, or concerns…"
                  aria-label="Search filters, sizes, or concerns"
                  className="flex-1 bg-transparent text-base text-charcoal placeholder:text-charcoal-mid/60 focus:outline-none sm:text-lg"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-soft hover:bg-canvas"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              {query.trim() && (
                <div className="border-t border-sky-100 bg-canvas/40">
                  <div className="container-x max-h-[60vh] overflow-y-auto py-4">
                    {results.products.length === 0 &&
                    results.categories.length === 0 ? (
                      <p className="py-6 text-center text-sm text-charcoal-mid">
                        No matches for &ldquo;{query}&rdquo;. Try a concern like
                        &ldquo;pet&rdquo;, &ldquo;allergy&rdquo;, or a MERV rating.
                      </p>
                    ) : (
                      <div className="grid gap-6 sm:grid-cols-2">
                        {results.products.length > 0 && (
                          <div>
                            <p className="text-eyebrow px-1 text-sky-700">
                              Filters
                            </p>
                            <ul className="mt-2 flex flex-col gap-1">
                              {results.products.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={`/products/${p.slug}`}
                                    onClick={closeSearch}
                                    className="block rounded-2xl px-3 py-2.5 text-sm text-charcoal transition-colors hover:bg-white"
                                  >
                                    <span className="block font-medium">
                                      {p.name}
                                    </span>
                                    <span className="mt-0.5 block text-xs text-charcoal-mid">
                                      {p.tagline}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {results.categories.length > 0 && (
                          <div>
                            <p className="text-eyebrow px-1 text-sky-700">
                              Concerns
                            </p>
                            <ul className="mt-2 flex flex-col gap-1">
                              {results.categories.map((c) => (
                                <li key={c.slug}>
                                  <Link
                                    href={`/shop/${c.slug}`}
                                    onClick={closeSearch}
                                    className="block rounded-2xl px-3 py-2.5 text-sm text-charcoal transition-colors hover:bg-white"
                                  >
                                    <span className="block font-medium">
                                      {c.title}
                                    </span>
                                    <span className="mt-0.5 block text-xs text-charcoal-mid">
                                      {c.description}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
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
              <div className="flex items-center justify-between border-b border-sky-100 px-6 py-5">
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
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
                <p className="px-4 pt-2 text-eyebrow text-sky-700">Shop</p>
                {shopFiltersMenu.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-canvas"
                  >
                    {l.label}
                  </Link>
                ))}
                <p className="mt-4 px-4 pt-2 text-eyebrow text-sky-700">
                  Discover
                </p>
                <Link
                  href="/find-your-filter"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-canvas"
                >
                  Find Your Filter
                </Link>
                <Link
                  href="/why-kalero"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-canvas"
                >
                  Why KALERO
                </Link>
                <p className="mt-4 px-4 pt-2 text-eyebrow text-sky-700">
                  Learn
                </p>
                {learnMenu.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-canvas"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-sky-100 p-6">
                <p className="text-eyebrow text-sky-700">Extras</p>
                <div className="mt-3 flex flex-col gap-2">
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-charcoal-mid hover:text-sky-700"
                  >
                    Your account
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-charcoal-mid hover:text-sky-700"
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
