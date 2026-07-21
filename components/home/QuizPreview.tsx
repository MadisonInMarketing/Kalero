"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Timer, Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { AirflowLines } from "@/components/ui/AirflowLines";

const highlights = [
  {
    Icon: Compass,
    title: "One question at a time",
    body: "No decision fatigue. Each step asks the smallest thing we need to make a good match.",
  },
  {
    Icon: Timer,
    title: "Two minutes, tops",
    body: "Five short prompts. Skip the sizing step if you don't know it yet — we help at checkout.",
  },
  {
    Icon: Sparkles,
    title: "Clear reasoning",
    body: "You see why we recommended a filter, not just which one. Change your mind anytime.",
  },
];

const checklist = [
  "Match by pets, allergies, smoke, and odors",
  "Sizing help built in",
  "Turns into a subscription in one click",
];

export function QuizPreview() {
  return (
    <section
      className="relative isolate overflow-hidden py-14 sm:py-16"
      aria-labelledby="quiz-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: "url('/images/Cozy home.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-lavender-200/55 via-lavender-100/40 to-lavender-200/55" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-lavender-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-lavender-400/40 blur-3xl" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="eyebrow justify-center"
          >
            Guided filter matching
          </motion.p>
          <motion.h2
            id="quiz-title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Not sure which filter belongs in your home?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-charcoal-mid text-pretty sm:text-xl"
          >
            Tell us about your pets, allergies, location, and everyday air concerns.
            We&apos;ll recommend the best KALERO match — usually in under two minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <LinkButton href="/find-your-filter" size="lg" arrow>
              Find my filter
            </LinkButton>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 rounded-pill bg-white px-5 py-3 text-sm font-medium text-charcoal ring-1 ring-lavender-200 transition-colors hover:ring-lavender-400"
            >
              Browse all filters
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-charcoal-mid"
          >
            {checklist.map((line) => (
              <li key={line} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lavender-100 text-lavender-700">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                {line}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">
          {highlights.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className="rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender-100 text-lavender-700">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-display text-base font-semibold text-charcoal">
                {title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-mid text-pretty">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
