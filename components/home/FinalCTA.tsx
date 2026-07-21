"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { AirflowLines } from "@/components/ui/AirflowLines";
import { ProductRender } from "@/components/product/ProductRender";
import { productBySlug } from "@/lib/products";

export function FinalCTA() {
  return (
    <section
      className="relative isolate overflow-hidden py-24 sm:py-32"
      aria-labelledby="final-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-lavender-50 to-white" />
      <div className="pointer-events-none absolute inset-0 bg-lavender-glow opacity-80" />
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <AirflowLines className="h-full w-full" opacity={0.28} />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow justify-center"
          >
            Made for the way you live
          </motion.p>
          <motion.h2
            id="final-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.05 }}
            className="mt-4 font-display text-display-2xl font-semibold text-charcoal text-balance"
          >
            Your home has specific air problems.{" "}
            <span className="bg-gradient-to-r from-lavender-600 to-blush bg-clip-text text-transparent">
              Your filter should be specific too.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-charcoal-mid text-pretty"
          >
            Two minutes to match, one click to subscribe, and a home-air ritual that
            takes care of itself.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <LinkButton href="/find-your-filter" size="lg" arrow>
              Find my filter
            </LinkButton>
            <LinkButton href="/shop" size="lg" variant="secondary">
              Shop all filters
            </LinkButton>
          </motion.div>
        </div>

        <div className="pointer-events-none mt-16 flex items-end justify-center gap-3 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="translate-y-4"
          >
            <ProductRender
              name="Everyday Defense"
              subtitle="The everyday one"
              merv="MERV 8"
              category="everyday"
              image={productBySlug("everyday-defense")?.image}
              size="sm"
              floating={false}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProductRender
              name="Pet Defense"
              subtitle="For paw households"
              merv="MERV 11"
              category="pet"
              image={productBySlug("pet-defense")?.image}
              size="md"
              floating={false}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="translate-y-6"
          >
            <ProductRender
              name="Allergy Defense"
              subtitle="For pollen weeks"
              merv="MERV 13"
              category="allergy"
              image={productBySlug("allergy-defense")?.image}
              size="sm"
              floating={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
