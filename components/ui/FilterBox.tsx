"use client";

import { motion } from "framer-motion";
import type { CategoryKey } from "@/lib/products";

type Props = {
  name: string;
  subtitle?: string;
  merv?: string;
  category: CategoryKey;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  floating?: boolean;
  showBadge?: boolean;
};

const palette: Record<
  CategoryKey,
  { base: string; deep: string; soft: string; accent: string; label: string }
> = {
  everyday: { base: "#67B7F2", deep: "#3A8FC9", soft: "#E5F2FD", accent: "#9164D2", label: "Everyday" },
  pet: { base: "#96B83B", deep: "#6E8B27", soft: "#EDF3D9", accent: "#9164D2", label: "Pet" },
  allergy: { base: "#1E3A6B", deep: "#0F1F42", soft: "#DCE3F0", accent: "#9164D2", label: "Allergy" },
  smoke: { base: "#7566A5", deep: "#4E4278", soft: "#E6E2EF", accent: "#F1EAFE", label: "Smoke" },
  carbon: { base: "#4A4A55", deep: "#2B2B33", soft: "#E7E5EB", accent: "#9164D2", label: "Carbon" },
  hotel: { base: "#E9B95C", deep: "#B78A2E", soft: "#FBEFD3", accent: "#9164D2", label: "Hotel" },
  seasonal: { base: "#9164D2", deep: "#623D9E", soft: "#F1EAFE", accent: "#E9B95C", label: "Seasonal" },
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "w-40",
  md: "w-56",
  lg: "w-72",
  xl: "w-[22rem]",
};

/**
 * Stylized SVG representation of the KALERO packaging.
 * Acts as a design-appropriate placeholder until real product renders replace it.
 */
export function FilterBox({
  name,
  subtitle,
  merv,
  category,
  size = "md",
  className = "",
  floating = true,
  showBadge = true,
}: Props) {
  const p = palette[category];
  const gid = `grad-${category}`;
  const inner = `inner-${category}`;
  const air = `air-${category}`;

  const boxContent = (
    <svg
      viewBox="0 0 360 460"
      className="h-auto w-full drop-shadow-[0_30px_60px_rgba(74,46,122,0.25)]"
      role="img"
      aria-label={`${name} filter packaging`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor={p.soft} />
          <stop offset="100%" stopColor={p.base} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={inner} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.base} stopOpacity="0.25" />
          <stop offset="100%" stopColor={p.deep} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={air} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0" />
          <stop offset="50%" stopColor={p.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Soft glow */}
      <ellipse cx="180" cy="420" rx="140" ry="18" fill={p.deep} opacity="0.18" />

      {/* Box body */}
      <rect
        x="30"
        y="30"
        width="300"
        height="400"
        rx="26"
        fill={`url(#${gid})`}
        stroke="#FFFFFF"
        strokeWidth="1"
      />
      <rect
        x="30"
        y="30"
        width="300"
        height="400"
        rx="26"
        fill="none"
        stroke={p.base}
        strokeOpacity="0.18"
        strokeWidth="1"
      />

      {/* Top brand strip */}
      <rect x="30" y="30" width="300" height="70" rx="26" fill="#FFFFFF" opacity="0.7" />
      <rect x="30" y="82" width="300" height="18" fill="#FFFFFF" opacity="0.7" />
      <text
        x="180"
        y="72"
        textAnchor="middle"
        fontFamily="Manrope, Inter, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="4"
        fill="#17171B"
      >
        KALERO
      </text>

      {/* Inner filter panel */}
      <rect
        x="60"
        y="130"
        width="240"
        height="180"
        rx="18"
        fill={`url(#${inner})`}
        stroke={p.base}
        strokeOpacity="0.3"
      />

      {/* Airflow arcs */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = 150 + i * 32;
        return (
          <path
            key={i}
            d={`M 70 ${y} C 150 ${y - 12} 230 ${y + 12} 290 ${y}`}
            stroke={`url(#${air})`}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        );
      })}

      {/* Bottom text block */}
      <text
        x="180"
        y="350"
        textAnchor="middle"
        fontFamily="Manrope, Inter, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="#17171B"
      >
        {name}
      </text>
      {subtitle && (
        <text
          x="180"
          y="374"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="11"
          fill={p.deep}
        >
          {subtitle}
        </text>
      )}
      {merv && (
        <g>
          <rect x="120" y="390" width="120" height="26" rx="13" fill={p.deep} />
          <text
            x="180"
            y="407"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.5"
            fill="#FFFFFF"
          >
            {merv.toUpperCase()}
          </text>
        </g>
      )}

      {/* Corner tag */}
      {showBadge && (
        <g>
          <circle cx="300" cy="60" r="20" fill={p.deep} />
          <text
            x="300"
            y="65"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1"
            fill="#FFFFFF"
          >
            {p.label.toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );

  const wrapClass = `relative ${sizeClasses[size]} ${className}`;

  if (!floating) {
    return <div className={wrapClass}>{boxContent}</div>;
  }
  return (
    <motion.div
      className={wrapClass}
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {boxContent}
    </motion.div>
  );
}
