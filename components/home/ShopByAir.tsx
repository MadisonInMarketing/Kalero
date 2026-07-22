"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import type { Category } from "@/lib/categories";

type Feature = {
  slug: string;
  productSlug: string;
  categorySlug: string;
  title: string;
  tagline: string;
  image: string;
  /** When true, the image fills the card with object-cover (zooms in on the packaging). */
  zoom?: boolean;
  objectPosition?: string;
  hex: string;
  softHex: string;
  deepHex: string;
  icon: Category["icon"];
};

const features: Feature[] = [
  {
    slug: "everyday",
    productSlug: "everyday-defense",
    categorySlug: "everyday-dust",
    title: "Everyday Defense",
    tagline: "For daily dust + lint",
    image: "/images/Everyday Filter.png",
    hex: "#67B7F2",
    softHex: "#DFF0FE",
    deepHex: "#3A8FC9",
    icon: "dust",
  },
  {
    slug: "pet",
    productSlug: "pet-defense",
    categorySlug: "pets-and-dander",
    title: "Pet Defense",
    tagline: "For pet dander + odors",
    image: "/images/Pet Filter.png",
    hex: "#96B83B",
    softHex: "#E4EEC5",
    deepHex: "#6E8B27",
    icon: "paw",
  },
  {
    slug: "allergy",
    productSlug: "allergy-defense",
    categorySlug: "allergies-and-pollen",
    title: "Allergy Defense",
    tagline: "For pollen + allergens",
    image: "/images/hero/animated/allergy-hero.png",
    zoom: true,
    objectPosition: "50% 50%",
    hex: "#E95774",
    softHex: "#FBD8DF",
    deepHex: "#B93755",
    icon: "flower",
  },
  {
    slug: "hotel",
    productSlug: "hotel-collection",
    categorySlug: "hotel-property",
    title: "Hotel Collection",
    tagline: "For hospitality spaces",
    image: "/images/hero/animated/1.png",
    zoom: true,
    objectPosition: "50% 50%",
    hex: "#E9B95C",
    softHex: "#FBEBC7",
    deepHex: "#B78A2E",
    icon: "sparkles",
  },
];

export function ShopByAir() {
  return (
    <section
      className="relative isolate py-20 sm:py-24"
      aria-labelledby="find-your-filter-title"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <h2
            id="find-your-filter-title"
            className="font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Find Your <span className="text-lavender-500">Filter</span>
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Choose the filter designed for the way you live.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  href={`/products/${f.productSlug}`}
                  aria-label={`Shop ${f.title} filters`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-charcoal/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-card hover:ring-charcoal/15"
                >
                  <div
                    aria-hidden="true"
                    className="h-1 w-full bg-lavender-500"
                  />

                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas"
                    />
                    <Image
                      src={f.image}
                      alt={`${f.title} filter`}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                      className={
                        f.zoom
                          ? "relative object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                          : "relative object-contain px-4 pt-8 drop-shadow-[0_20px_35px_rgba(23,23,27,0.18)] transition-transform duration-500 group-hover:scale-[1.03]"
                      }
                      style={
                        f.objectPosition
                          ? { objectPosition: f.objectPosition }
                          : undefined
                      }
                    />
                  </div>

                  <div className="relative mt-auto border-t border-charcoal/8 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700"
                        aria-hidden="true"
                      >
                        <CategoryIcon icon={f.icon} size={18} color="#7A4EBC" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-bold leading-tight text-charcoal sm:text-xl">
                          {f.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs font-medium text-charcoal-mid">
                          {f.tagline}
                        </p>
                      </div>
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-white transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        <ArrowRight size={16} strokeWidth={2.25} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-medium text-charcoal shadow-soft ring-1 ring-lavender-100 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            Shop by Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
