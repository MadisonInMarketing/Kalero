"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const portfolioOptions = [
  "1 property",
  "2 - 9 properties",
  "10 - 49 properties",
  "50 - 199 properties",
  "200+ properties",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function HotelRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    portfolio: portfolioOptions[1],
    notes: "",
  });

  const update =
    <K extends keyof typeof form>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [k]: e.target.value }));
      if (status === "error") setStatus("idle");
    };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setStatus("error"), setError("Please enter your name.");
    if (!form.company.trim())
      return setStatus("error"), setError("Please enter your company.");
    if (!EMAIL_RE.test(form.email.trim()))
      return setStatus("error"), setError("Please enter a valid work email.");

    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        id="contact"
        className="rounded-card bg-white p-8 ring-1 ring-lavender-100 shadow-card sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft text-gold-deep">
            <CheckCircle2 size={26} strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold uppercase text-charcoal text-balance">
            Thanks, {form.name.split(" ")[0]}.
          </h3>
          <p className="mt-2 max-w-sm text-sm text-charcoal-mid text-pretty">
            A KALERO account lead will follow up at{" "}
            <span className="font-medium text-charcoal">{form.email}</span> within one
            business day.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                company: "",
                email: "",
                portfolio: portfolioOptions[1],
                notes: "",
              });
              setStatus("idle");
            }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-lavender-700 hover:text-lavender-800"
          >
            Submit another request →
          </button>
        </div>
      </div>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-lavender-200 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light focus:border-lavender-500 focus:outline-none focus:ring-2 focus:ring-lavender-400/40";

  return (
    <div
      id="contact"
      className="rounded-card bg-white p-6 ring-1 ring-lavender-100 shadow-card sm:p-8"
    >
      <p className="text-eyebrow text-gold-deep">Request a plan</p>
      <h3 className="mt-3 font-display text-2xl font-semibold uppercase text-charcoal">
        Tell us about your properties.
      </h3>
      <p className="mt-2 text-sm text-charcoal-mid">
        We&apos;ll follow up within one business day with next steps for your
        customized filter program.
      </p>
      <form className="mt-6 grid gap-4" onSubmit={submit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-charcoal-mid">
              Contact name <span className="text-lavender-600">*</span>
            </span>
            <input
              type="text"
              value={form.name}
              onChange={update("name")}
              required
              autoComplete="name"
              className={inputCls}
            />
          </label>
          <label className="text-sm">
            <span className="text-charcoal-mid">
              Company <span className="text-lavender-600">*</span>
            </span>
            <input
              type="text"
              value={form.company}
              onChange={update("company")}
              required
              autoComplete="organization"
              className={inputCls}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-charcoal-mid">
              Work email <span className="text-lavender-600">*</span>
            </span>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              required
              autoComplete="email"
              className={inputCls}
            />
          </label>
          <label className="text-sm">
            <span className="text-charcoal-mid">Portfolio size</span>
            <select
              value={form.portfolio}
              onChange={update("portfolio")}
              className={inputCls}
            >
              {portfolioOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="text-sm">
          <span className="text-charcoal-mid">Additional information</span>
          <textarea
            value={form.notes}
            onChange={update("notes")}
            rows={4}
            placeholder="Property locations, known filter sizes, number of units, target start date, or anything else that will help us prepare."
            className={inputCls}
          />
        </label>

        {status === "error" && error && (
          <p
            role="alert"
            className="rounded-xl bg-blush-soft/60 px-4 py-2.5 text-xs font-medium text-blush-deep ring-1 ring-blush/30"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal-light sm:max-w-[24ch]">
            By submitting, you agree to be contacted about a KALERO program.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-charcoal px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-charcoal-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                Request a plan
                <ArrowRight size={16} strokeWidth={2.25} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
