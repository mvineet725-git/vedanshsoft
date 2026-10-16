interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  markOnly?: boolean;
  size?: number;
}

export default function Logo({ variant = "dark", className, markOnly = false, size = 40 }: LogoProps) {
  const textColor = variant === "dark" ? "#0b1f3a" : "#ffffff";
  const subColor = variant === "dark" ? "#51607a" : "#cbd8ea";
  const gradientId = `vss-mark-gradient-${variant}`;

  return (
    <span className={`logo ${className ?? ""}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem" }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#163a6b" />
            <stop offset="100%" stopColor="#0b1f3a" />
          </linearGradient>
        </defs>

        <rect width="64" height="64" rx="16" fill={`url(#${gradientId})`} />

        {/* Connection lines - network/community motif, drawn first so nodes sit on top */}
        <path
          d="M18 22 L32 40 L46 22"
          stroke="#1a4f8f"
          strokeOpacity="0.55"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* The "V" stroke itself, in the brand teal */}
        <path
          d="M18 20 L32 40 L46 20"
          stroke="#2cc3a9"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Network nodes at each vertex, with a soft outer ring for depth */}
        <circle cx="18" cy="20" r="5.5" fill="#0b1f3a" />
        <circle cx="18" cy="20" r="4" fill="#ffffff" />
        <circle cx="46" cy="20" r="5.5" fill="#0b1f3a" />
        <circle cx="46" cy="20" r="4" fill="#ffffff" />
        <circle cx="32" cy="40" r="6.5" fill="#0b1f3a" />
        <circle cx="32" cy="40" r="5" fill="#2cc3a9" />
      </svg>

      {!markOnly && (
        <span style={{ lineHeight: 1.1 }}>
          <span style={{ display: "block", fontWeight: 800, fontSize: "1.1rem", color: textColor, letterSpacing: "-0.01em" }}>
            Vedansh
          </span>
          <span style={{ display: "block", fontWeight: 600, fontSize: "0.7rem", color: subColor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Software Services
          </span>
        </span>
      )}
    </span>
  );
}
