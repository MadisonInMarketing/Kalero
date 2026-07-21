import type { Category } from "@/lib/categories";

type Props = {
  icon: Category["icon"];
  size?: number;
  color?: string;
  className?: string;
};

export function CategoryIcon({ icon, size = 28, color = "currentColor", className = "" }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (icon) {
    case "dust":
      return (
        <svg {...common}>
          <circle cx="9" cy="10" r="1.2" fill={color} />
          <circle cx="18" cy="7" r="1" fill={color} />
          <circle cx="23" cy="12" r="1.4" fill={color} />
          <circle cx="14" cy="15" r="0.9" fill={color} />
          <circle cx="20" cy="19" r="1.2" fill={color} />
          <circle cx="10" cy="22" r="1" fill={color} />
          <path d="M4 26 C 12 22, 20 22, 28 26" />
        </svg>
      );
    case "paw":
      return (
        <svg {...common}>
          <ellipse cx="16" cy="21" rx="6" ry="5" />
          <circle cx="8" cy="15" r="2.4" />
          <circle cx="24" cy="15" r="2.4" />
          <circle cx="12" cy="10" r="2" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      );
    case "flower":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="2.4" />
          <path d="M16 13.6 C 14 8, 8 8, 8 12 C 8 15, 13.6 15.4, 16 13.6" />
          <path d="M18.4 16 C 24 14, 24 8, 20 8 C 17 8, 16.6 13.6, 18.4 16" />
          <path d="M16 18.4 C 18 24, 24 24, 24 20 C 24 17, 18.4 16.6, 16 18.4" />
          <path d="M13.6 16 C 8 18, 8 24, 12 24 C 15 24, 15.4 18.4, 13.6 16" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M16 4 C 20 10, 22 12, 22 17 A 6 6 0 0 1 10 17 C 10 14, 12 12, 13 10 C 14 14, 16 12, 16 4 Z" />
          <path d="M13.5 20 C 15 22, 17 22, 18.5 20" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M6 22 C 8 12, 18 6, 26 6 C 26 16, 20 24, 10 26 C 8 22, 6 22, 6 22 Z" />
          <path d="M9 24 C 14 20, 20 14, 24 9" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M10 6 L 11 10 L 15 11 L 11 12 L 10 16 L 9 12 L 5 11 L 9 10 Z" />
          <path d="M22 14 L 23 18 L 27 19 L 23 20 L 22 24 L 21 20 L 17 19 L 21 18 Z" />
          <path d="M15 22 L 15.6 24 L 17.6 24.6 L 15.6 25.2 L 15 27.2 L 14.4 25.2 L 12.4 24.6 L 14.4 24 Z" />
        </svg>
      );
  }
}
