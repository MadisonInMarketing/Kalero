"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCw,
  Ruler,
  Sparkles,
  Timer,
} from "lucide-react";
import { ProductRender } from "@/components/product/ProductRender";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { LinkButton } from "@/components/ui/Button";
import {
  STANDARD_SIZES,
  products,
  productColors,
  type CategoryKey,
} from "@/lib/products";
import { categoryByKey } from "@/lib/categories";

type Answers = {
  concerns: string[];
  pets: string;
  climate: string;
  home: string;
  size: string;
};

const initial: Answers = {
  concerns: [],
  pets: "",
  climate: "",
  home: "",
  size: "",
};

type Step = {
  key: keyof Answers;
  title: string;
  subtitle: string;
  multi?: boolean;
  options: {
    label: string;
    value: string;
    hint?: string;
    category?: CategoryKey;
  }[];
};

const steps: Step[] = [
  {
    key: "concerns",
    title: "Which of these sound like your home?",
    subtitle: "Select all that apply.",
    multi: true,
    options: [
      { label: "I have pets", value: "pets", hint: "One or more", category: "pet" },
      {
        label: "Seasonal allergies",
        value: "allergies",
        hint: "Pollen, dust mites",
        category: "allergy",
      },
      {
        label: "Wildfire smoke",
        value: "smoke",
        hint: "Or urban air pollution",
        category: "smoke",
      },
      {
        label: "Household odors",
        value: "odors",
        hint: "Cooking, pets, VOCs",
        category: "carbon",
      },
      {
        label: "Everyday protection",
        value: "everyday",
        hint: "No specific concern",
        category: "everyday",
      },
      {
        label: "Rotate with seasons",
        value: "seasonal",
        hint: "Change with the year",
        category: "seasonal",
      },
    ],
  },
  {
    key: "pets",
    title: "Any pets at home?",
    subtitle: "Helps us match dander levels.",
    options: [
      { label: "No pets", value: "none", category: "everyday" },
      { label: "One dog or cat", value: "one", category: "pet" },
      { label: "Multiple pets", value: "many", category: "pet" },
    ],
  },
  {
    key: "climate",
    title: "Where does your home live?",
    subtitle: "Regional air matters as much as the room.",
    options: [
      { label: "Wildfire-prone West", value: "west", category: "smoke" },
      {
        label: "Pollen-heavy South or East",
        value: "pollen",
        category: "allergy",
      },
      { label: "Dense urban area", value: "urban", category: "smoke" },
      { label: "Everyday suburbs", value: "suburb", category: "everyday" },
    ],
  },
  {
    key: "home",
    title: "How big is your home?",
    subtitle: "So we can size how often you replace.",
    options: [
      { label: "Apartment / condo", value: "apartment", category: "everyday" },
      { label: "Small home (< 1,500 sq ft)", value: "small", category: "everyday" },
      {
        label: "Mid-size home (1,500-3,000 sq ft)",
        value: "mid",
        category: "everyday",
      },
      { label: "Large home (3,000+ sq ft)", value: "large", category: "everyday" },
    ],
  },
  {
    key: "size",
    title: "Do you know your filter size?",
    subtitle: "Pull out your current filter, the size is printed on the frame.",
    options: [
      ...STANDARD_SIZES.slice(0, 6).map((s) => ({ label: s, value: s })),
      { label: "I'll check later", value: "later" },
    ],
  },
];

const iconForCategory: Record<
  CategoryKey,
  "dust" | "paw" | "flower" | "flame" | "leaf" | "sparkles"
> = {
  everyday: "dust",
  pet: "paw",
  allergy: "flower",
  hotel: "sparkles",
  smoke: "flame",
  carbon: "sparkles",
  seasonal: "leaf",
};

function scoreAnswers(a: Answers) {
  const score: Record<CategoryKey, number> = {
    everyday: 0,
    pet: 0,
    allergy: 0,
    hotel: 0,
    smoke: 0,
    carbon: 0,
    seasonal: 0,
  };
  a.concerns.forEach((c) => {
    if (c === "pets") score.pet += 3;
    if (c === "allergies") score.allergy += 3;
    if (c === "smoke") score.smoke += 3;
    if (c === "odors") score.carbon += 3;
    if (c === "everyday") score.everyday += 2;
    if (c === "seasonal") score.seasonal += 3;
  });
  if (a.pets === "one") score.pet += 2;
  if (a.pets === "many") score.pet += 4;
  if (a.climate === "west") score.smoke += 2;
  if (a.climate === "pollen") score.allergy += 2;
  if (a.climate === "urban") score.smoke += 1;
  if (a.climate === "suburb") score.everyday += 1;

  const ranked = (Object.keys(score) as CategoryKey[])
    .map((k) => ({ key: k, val: score[k] }))
    .sort((a, b) => b.val - a.val);

  return {
    primary: ranked[0].val > 0 ? ranked[0].key : ("everyday" as CategoryKey),
    secondary: ranked[1].val > 0 ? ranked[1].key : null,
    hasAnswers: ranked[0].val > 0,
  };
}

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [done, setDone] = useState(false);

  const step = steps[current];
  const value = answers[step?.key ?? "concerns"];
  const canAdvance = step?.multi
    ? (value as string[])?.length > 0
    : !!value;

  const running = useMemo(() => scoreAnswers(answers), [answers]);
  const runningProduct = products.find((p) => p.category === running.primary);
  const primary = running;
  const primaryProduct = runningProduct;
  const secondaryProduct = primary.secondary
    ? products.find((p) => p.category === primary.secondary)
    : null;
  const primaryCategory = categoryByKey(primary.primary);

  const handleSelect = (val: string) => {
    if (step.multi) {
      const cur = answers[step.key] as string[];
      const next = cur.includes(val)
        ? cur.filter((v) => v !== val)
        : [...cur, val];
      setAnswers((a) => ({ ...a, [step.key]: next }));
    } else {
      setAnswers((a) => ({ ...a, [step.key]: val }));
    }
  };

  const nextStep = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
    else setDone(true);
  };
  const back = () => setCurrent((c) => Math.max(0, c - 1));
  const restart = () => {
    setAnswers(initial);
    setCurrent(0);
    setDone(false);
  };

  return (
    <section className="relative isolate overflow-hidden py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-lavender-100 via-lavender-50/70 to-canvas" />
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-lavender-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 -z-10 h-96 w-96 rounded-full bg-lavender-400/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-72 w-[80vw] -translate-x-1/2 rounded-full bg-lavender-200/40 blur-3xl" />

      <div className="container-x relative">
        {!done ? (
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-eyebrow text-lavender-700 ring-1 ring-white/70 backdrop-blur">
                  <Sparkles size={12} />
                  Find your filter
                </span>
                <h1 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
                  Two minutes to a filter that fits your home.
                </h1>
                <p className="mt-3 flex items-center gap-2 text-sm text-charcoal-mid">
                  <Timer size={14} className="text-lavender-600" />
                  Five short questions. Sizing help built in.
                </p>
              </div>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-charcoal-mid ring-1 ring-lavender-100 backdrop-blur transition-all hover:text-charcoal hover:ring-lavender-300"
              >
                <RefreshCw size={12} />
                Start over
              </button>
            </div>

            <div className="mb-6 flex items-center gap-2 sm:gap-3">
              {steps.map((_, i) => {
                const isDone = i < current;
                const isActive = i === current;
                return (
                  <div key={i} className="flex flex-1 items-center gap-2 sm:gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-lavender-500 text-white shadow-soft ring-4 ring-lavender-200/60"
                          : isDone
                            ? "bg-lavender-500 text-white"
                            : "bg-white text-charcoal-light ring-1 ring-lavender-200"
                      }`}
                    >
                      {isDone ? <Check size={14} strokeWidth={2.5} /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 rounded-full transition-all ${
                          isDone ? "bg-lavender-500" : "bg-lavender-100"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex min-h-[580px] flex-col overflow-hidden rounded-xl bg-white/95 p-6 shadow-card ring-1 ring-white/70 backdrop-blur sm:min-h-[680px] sm:p-10"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lavender-200/50 blur-3xl" />

                  <div className="relative flex-1">
                    <p className="eyebrow">
                      Question {current + 1} of {steps.length}
                    </p>
                    <h2 className="mt-3 font-display text-display-lg font-semibold text-charcoal text-balance">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm text-charcoal-mid">
                      {step.subtitle}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {step.options.map((o, i) => {
                        const isSelected = step.multi
                          ? (answers[step.key] as string[]).includes(o.value)
                          : answers[step.key] === o.value;
                        const cat = o.category
                          ? productColors[o.category]
                          : null;
                        const iconKey = o.category
                          ? iconForCategory[o.category]
                          : null;
                        return (
                          <motion.button
                            key={o.value}
                            type="button"
                            onClick={() => handleSelect(o.value)}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: 0.12 + i * 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ y: -2 }}
                            className={`group relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-shadow ${
                              isSelected
                                ? "shadow-soft"
                                : "border-lavender-100 bg-white hover:border-lavender-300 hover:bg-lavender-50/40"
                            }`}
                            style={
                              isSelected && cat
                                ? {
                                    borderColor: cat.base,
                                    background: `linear-gradient(180deg, ${cat.soft} 0%, #FFFFFF 100%)`,
                                  }
                                : isSelected
                                  ? {
                                      borderColor: "#9164D2",
                                      background:
                                        "linear-gradient(180deg, #F1EAFE 0%, #FFFFFF 100%)",
                                    }
                                  : undefined
                            }
                          >
                            {iconKey && cat && (
                              <span
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors"
                                style={{
                                  backgroundColor: isSelected
                                    ? cat.base
                                    : cat.soft,
                                  color: isSelected ? "#FFFFFF" : cat.deep,
                                }}
                              >
                                <CategoryIcon
                                  icon={iconKey}
                                  size={20}
                                  color={isSelected ? "#FFFFFF" : cat.deep}
                                />
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-display text-base font-semibold text-charcoal">
                                {o.label}
                              </p>
                              {o.hint && (
                                <p className="mt-0.5 text-xs text-charcoal-mid">
                                  {o.hint}
                                </p>
                              )}
                            </div>
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? "text-white"
                                  : "border-lavender-200 text-transparent group-hover:border-lavender-400"
                              }`}
                              style={
                                isSelected && cat
                                  ? {
                                      backgroundColor: cat.base,
                                      borderColor: cat.base,
                                    }
                                  : undefined
                              }
                            >
                              <Check size={12} strokeWidth={2.5} />
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative mt-8 flex items-center justify-between border-t border-lavender-100/70 pt-6">
                    <button
                      type="button"
                      onClick={back}
                      disabled={current === 0}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-charcoal-mid transition-colors hover:bg-lavender-50 hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canAdvance}
                      className="inline-flex items-center gap-2 rounded-pill bg-charcoal px-6 py-3 text-sm font-medium text-white transition-all hover:bg-charcoal-soft disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {current === steps.length - 1 ? "See my match" : "Next"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              <MatchPreview
                hasAnswers={running.hasAnswers}
                categoryKey={running.primary}
                product={runningProduct}
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl"
          >
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-eyebrow text-lavender-700 ring-1 ring-white/70 backdrop-blur">
                <Sparkles size={12} />
                Your KALERO match
              </span>
              <h2 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
                {primaryProduct?.name}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-charcoal-mid text-pretty">
                Based on your answers, {primaryProduct?.name} is the closest fit
                to how your home actually breathes.{" "}
                {primaryCategory && `We focused on "${primaryCategory.title}" first.`}
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
              <div
                className="relative overflow-hidden rounded-xl p-8 shadow-card ring-1 ring-white/60 sm:p-10"
                style={{
                  background: primaryProduct
                    ? `linear-gradient(180deg, ${primaryProduct.color.base} 0%, ${primaryProduct.color.soft} 100%)`
                    : undefined,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-60 blur-3xl"
                  style={{
                    backgroundColor: primaryProduct
                      ? `${primaryProduct.color.base}55`
                      : undefined,
                  }}
                />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="w-40 shrink-0 sm:w-56">
                    {primaryProduct && (
                      <ProductRender
                        name={primaryProduct.name}
                        subtitle={primaryProduct.tagline}
                        merv={
                          primaryProduct.merv === "Rotating"
                            ? "Drop"
                            : primaryProduct.merv === "Activated Carbon"
                              ? "Carbon"
                              : primaryProduct.merv
                        }
                        category={primaryProduct.category}
                        image={primaryProduct.image}
                        size="md"
                        floating={false}
                      />
                    )}
                  </div>
                  <div className="text-white">
                    <p className="text-eyebrow text-white/80">Primary match</p>
                    <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                      {primaryProduct?.name}
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {primaryProduct?.concern}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/40 backdrop-blur">
                      <Ruler size={12} />
                      Suggested size:{" "}
                      {answers.size !== "later" && answers.size
                        ? answers.size
                        : "we'll help you confirm at checkout"}
                    </p>
                  </div>
                </div>

                <div className="relative mt-8 flex flex-wrap items-center gap-3">
                  {primaryProduct && (
                    <LinkButton
                      href={`/products/${primaryProduct.slug}`}
                      variant="dark"
                      arrow
                    >
                      Set up my plan
                    </LinkButton>
                  )}
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 rounded-pill bg-white/25 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur transition-colors hover:bg-white/35"
                  >
                    Compare filters
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                {secondaryProduct && (
                  <div className="rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-soft">
                    <p className="eyebrow">Also consider</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div
                        className="pointer-events-none relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl"
                        style={{
                          background: `linear-gradient(180deg, ${secondaryProduct.color.soft} 0%, #FFFFFF 100%)`,
                        }}
                      >
                        {secondaryProduct.image && (
                          <Image
                            src={secondaryProduct.image}
                            alt={secondaryProduct.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg font-semibold text-charcoal">
                          {secondaryProduct.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-charcoal-mid">
                          {secondaryProduct.concern}
                        </p>
                        <Link
                          href={`/products/${secondaryProduct.slug}`}
                          className="mt-3 inline-flex text-xs font-medium text-lavender-700 hover:text-lavender-800"
                        >
                          Learn more →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className="rounded-card bg-gradient-to-br from-lavender-500 to-lavender-700 p-6 text-white shadow-card">
                  <p className="text-eyebrow text-lavender-100">Save & sync</p>
                  <p className="mt-2 font-display text-lg font-semibold text-balance">
                    Add these to a subscription and stop tracking filter dates.
                  </p>
                  <LinkButton
                    href="/subscriptions"
                    className="mt-4 bg-white text-charcoal ring-0"
                    variant="secondary"
                    arrow
                  >
                    Build my plan
                  </LinkButton>
                </div>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-2 text-sm text-charcoal-mid transition-colors hover:text-charcoal"
                >
                  <RefreshCw size={14} />
                  Retake the quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

type MatchPreviewProps = {
  hasAnswers: boolean;
  categoryKey: CategoryKey;
  product: ReturnType<typeof products.find> | undefined;
};

function MatchPreview({ hasAnswers, categoryKey, product }: MatchPreviewProps) {
  const category = categoryByKey(categoryKey);
  const color = productColors[categoryKey];
  const iconKey = iconForCategory[categoryKey];

  return (
    <motion.div
      layout
      className="relative flex h-full flex-col overflow-hidden rounded-xl p-6 shadow-card ring-1 ring-white/70 sm:p-8"
      style={{
        background: `linear-gradient(180deg, ${color.base} 0%, ${color.soft} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-3xl"
        style={{ backgroundColor: `${color.base}55` }}
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-eyebrow text-white ring-1 ring-white/40 backdrop-blur">
          <Sparkles size={12} />
          {hasAnswers ? "Your match, so far" : "Preview"}
        </span>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/25 ring-1 ring-white/40 backdrop-blur"
          style={{ color: "#FFFFFF" }}
        >
          <CategoryIcon icon={iconKey} size={20} color="#FFFFFF" />
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={categoryKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="relative mt-6 flex flex-1 flex-col items-center justify-center text-center text-white"
        >
          <p className="text-eyebrow text-white/80">
            {category?.title ?? "Everyday Dust"}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-balance sm:text-3xl">
            {product?.name ?? "Everyday Defense"}
          </p>
          <p className="mt-2 max-w-[24ch] text-sm text-white/90 text-pretty">
            {product?.tagline}
          </p>

          {product?.image ? (
            <div className="relative mt-6 w-full max-w-[340px] flex-1">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="340px"
                className="object-contain drop-shadow-[0_25px_45px_rgba(23,23,27,0.35)]"
              />
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <p className="relative mt-6 text-center text-[11px] text-white/85">
        {hasAnswers
          ? "This preview updates as you answer."
          : "Pick an answer to see your live match."}
      </p>
    </motion.div>
  );
}
