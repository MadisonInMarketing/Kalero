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
          {/* Brand-kit spectrum: 5 stops, linear 0°, even quarters */}
          <linearGradient id="iw-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#37B2E6" stopOpacity="0.65" />
            <stop offset="25%" stopColor="#72CBCA" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#86CCA8" stopOpacity="0.6" />
            <stop offset="75%" stopColor="#C1A1CC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7E3E98" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="iw-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#37B2E6" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#72CBCA" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#86CCA8" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#C1A1CC" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7E3E98" stopOpacity="0.4" />
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
