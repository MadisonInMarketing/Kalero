"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FilterBox } from "@/components/ui/FilterBox";
import type { CategoryKey } from "@/lib/products";

type Size = "sm" | "md" | "lg" | "xl";

const widthClass: Record<Size, string> = {
  sm: "w-40",
  md: "w-56",
  lg: "w-72",
  xl: "w-[22rem]",
};

const sizesAttr: Record<Size, string> = {
  sm: "160px",
  md: "224px",
  lg: "288px",
  xl: "352px",
};

type Props = {
  name: string;
  subtitle?: string;
  merv?: string;
  category: CategoryKey;
  image?: string | null;
  size?: Size;
  className?: string;
  floating?: boolean;
  showBadge?: boolean;
  priority?: boolean;
};

export function ProductRender({
  name,
  subtitle,
  merv,
  category,
  image,
  size = "md",
  className = "",
  floating = true,
  showBadge = true,
  priority = false,
}: Props) {
  if (image) {
    const content = (
      <div
        className={`relative aspect-[4/5] ${widthClass[size]} ${className}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes={sizesAttr[size]}
          className="object-contain drop-shadow-[0_25px_45px_rgba(74,46,122,0.28)]"
          priority={priority}
        />
      </div>
    );
    if (!floating) return content;
    return (
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block"
      >
        {content}
      </motion.div>
    );
  }

  const fbSize: "sm" | "md" | "lg" =
    size === "xl" ? "lg" : (size as "sm" | "md" | "lg");
  return (
    <FilterBox
      name={name}
      subtitle={subtitle}
      merv={merv}
      category={category}
      size={fbSize}
      className={className}
      floating={floating}
      showBadge={showBadge}
    />
  );
}
