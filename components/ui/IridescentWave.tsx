/**
 * Iridescent packaging wave — blue → mint → iris.
 * Used as hero band and section divider across the site.
 */
export function IridescentWave({
  className = "",
  flip = false,
  intensity = "default",
}: {
  className?: string;
  /** Flip vertically for use as a bottom divider. */
  flip?: boolean;
  /** "default" for hero bands, "subtle" for between sections. */
  intensity?: "default" | "subtle";
}) {
  const opacity = intensity === "subtle" ? 0.35 : 1;
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined, opacity }}
    >
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="iw-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3AA8E2" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#6DCFA7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8A6FD1" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="iw-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A6FD1" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#3AA8E2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6DCFA7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0,120 C240,60 480,180 720,120 C960,60 1200,180 1440,120 L1440,0 L0,0 Z"
          fill="url(#iw-a)"
        />
        <path
          d="M0,180 C240,120 480,220 720,170 C960,120 1200,220 1440,170 L1440,0 L0,0 Z"
          fill="url(#iw-b)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
