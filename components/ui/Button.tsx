import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender";

const variants: Record<Variant, string> = {
  primary:
    "bg-lavender-500 text-white shadow-soft hover:bg-lavender-600 hover:shadow-card active:scale-[0.98]",
  secondary:
    "bg-white text-charcoal ring-1 ring-lavender-200 hover:ring-lavender-400 hover:shadow-soft",
  ghost:
    "text-charcoal hover:text-lavender-600",
  outline:
    "bg-transparent text-charcoal ring-1 ring-charcoal/15 hover:ring-charcoal/40",
  dark:
    "bg-charcoal text-white hover:bg-charcoal-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3.5",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", arrow, className = "", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2.25} />}
    </button>
  );
});

export type LinkButtonProps = SharedProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps | "href">;

export function LinkButton({
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  href,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2.25} />}
    </Link>
  );
}
