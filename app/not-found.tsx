import Link from "next/link";
import { AirflowLines } from "@/components/ui/AirflowLines";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-wash py-32">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <AirflowLines className="h-full w-full" opacity={0.28} />
      </div>
      <div className="container-x relative text-center">
        <p className="eyebrow justify-center">Nothing to breathe here</p>
        <h1 className="mt-4 font-display text-display-2xl font-semibold text-charcoal">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-charcoal-mid text-pretty">
          The page you were after has drifted out of the vents. Let&apos;s get you
          back to cleaner air.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/" arrow>
            Back to home
          </LinkButton>
          <Link
            href="/shop"
            className="text-sm font-medium text-lavender-700 hover:text-lavender-800"
          >
            Shop filters →
          </Link>
        </div>
      </div>
    </section>
  );
}
