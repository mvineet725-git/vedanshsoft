interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  const textColor = variant === "dark" ? "#0b1f3a" : "#ffffff";
  const subColor = variant === "dark" ? "#51607a" : "#cbd8ea";

  return (
    <span className={`logo ${className ?? ""}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#0b1f3a" />
        <path d="M16 20 L32 46 L48 20" stroke="#2cc3a9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="16" cy="20" r="4" fill="#ffffff" />
        <circle cx="48" cy="20" r="4" fill="#ffffff" />
        <circle cx="32" cy="46" r="4" fill="#2cc3a9" />
      </svg>
      <span style={{ lineHeight: 1.1 }}>
        <span style={{ display: "block", fontWeight: 800, fontSize: "1.05rem", color: textColor, letterSpacing: "-0.01em" }}>
          Vedansh
        </span>
        <span style={{ display: "block", fontWeight: 600, fontSize: "0.7rem", color: subColor, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Software Services
        </span>
      </span>
    </span>
  );
}
