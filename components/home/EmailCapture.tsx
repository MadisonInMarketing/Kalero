"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

/**
 * Homepage §17 — email capture strip above the footer.
 * Local-only submission in development; wire to your ESP later.
 */
export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to Klaviyo / Mailchimp / whatever ESP is chosen.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      aria-labelledby="email-capture-title"
      className="relative isolate py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-iris-wash"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white/85 p-8 text-center shadow-card ring-1 ring-sky-100 backdrop-blur sm:p-10">
          <h2
            id="email-capture-title"
            className="font-display text-2xl font-semibold text-charcoal text-balance sm:text-3xl"
          >
            Better air starts with remembering the filter.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-mid text-pretty sm:text-base">
            Get replacement reminders and practical home-air tips.
          </p>

          {submitted ? (
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-sky-100 px-5 py-2.5 text-sm font-medium text-sky-800">
              <Check size={16} strokeWidth={2.25} />
              You&apos;re on the list. Talk soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="email-capture-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-capture-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@home.com"
                className="h-12 flex-1 rounded-full border border-sky-200 bg-white px-5 text-sm text-charcoal placeholder:text-charcoal-mid/60 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-charcoal px-6 text-sm font-semibold text-white transition-colors hover:bg-charcoal-soft"
              >
                Keep Me Posted
                <Send size={14} strokeWidth={2} />
              </button>
            </form>
          )}
          <p className="mt-4 text-[11px] text-charcoal-light">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}
