import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
  icon?: ReactNode;
};

export function Chip({ children, className = "", size = "sm", icon }: Props) {
  const sizeClass =
    size === "sm" ? "text-[11px] px-2.5 py-1" : "text-xs px-3 py-1.5";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-[0.14em] ${sizeClass} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
