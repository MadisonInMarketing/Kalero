"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  animate?: boolean;
};

export function AirflowLines({
  className = "",
  color = "#9164D2",
  opacity = 0.35,
  strokeWidth = 1,
  animate = true,
}: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 600"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="airflow-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="45%" stopColor={color} stopOpacity={opacity} />
          <stop offset="55%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 40 + i * 46;
        const arc = 20 + (i % 3) * 12;
        const path = `M -80 ${y} C 360 ${y - arc} 1080 ${y + arc} 1520 ${y}`;
        return animate ? (
          <motion.path
            key={i}
            d={path}
            stroke="url(#airflow-fade)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 4 + (i % 4),
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ) : (
          <path
            key={i}
            d={path}
            stroke="url(#airflow-fade)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
