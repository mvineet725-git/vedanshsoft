/** Original inline-SVG dashboard illustration used in place of stock photography. */
export default function DashboardMockup() {
  return (
    <svg viewBox="0 0 560 420" width="100%" height="100%" role="img" aria-label="Preview of a society and education management dashboard showing resident records, fee collection, and attendance statistics">
      <defs>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#163a6b" />
          <stop offset="100%" stopColor="#0b1f3a" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="560" height="420" rx="20" fill="#f4f7fb" />

      <rect x="24" y="24" width="512" height="56" rx="12" fill="url(#panelGrad)" />
      <circle cx="52" cy="52" r="10" fill="#2cc3a9" />
      <rect x="76" y="44" width="140" height="16" rx="8" fill="rgba(255,255,255,0.85)" />
      <rect x="420" y="40" width="88" height="24" rx="12" fill="#2cc3a9" />

      <rect x="24" y="96" width="162" height="100" rx="14" fill="#fff" stroke="#dde5f0" />
      <rect x="40" y="114" width="60" height="10" rx="5" fill="#7a879c" />
      <rect x="40" y="136" width="90" height="22" rx="6" fill="#0b1f3a" />
      <rect x="40" y="168" width="110" height="8" rx="4" fill="#2cc3a9" />

      <rect x="198" y="96" width="162" height="100" rx="14" fill="#fff" stroke="#dde5f0" />
      <rect x="214" y="114" width="70" height="10" rx="5" fill="#7a879c" />
      <rect x="214" y="136" width="80" height="22" rx="6" fill="#1e4fa3" />
      <rect x="214" y="168" width="100" height="8" rx="4" fill="#3f7fe0" />

      <rect x="372" y="96" width="164" height="100" rx="14" fill="#fff" stroke="#dde5f0" />
      <rect x="388" y="114" width="64" height="10" rx="5" fill="#7a879c" />
      <rect x="388" y="136" width="70" height="22" rx="6" fill="#12a58d" />
      <rect x="388" y="168" width="90" height="8" rx="4" fill="#2cc3a9" />

      <rect x="24" y="212" width="330" height="184" rx="14" fill="#fff" stroke="#dde5f0" />
      <rect x="44" y="232" width="120" height="12" rx="6" fill="#163a6b" />
      <polyline
        points="44,360 90,330 136,345 182,300 228,315 274,260 320,280"
        fill="none"
        stroke="#2cc3a9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="320" cy="280" r="6" fill="#0e8a76" />

      <rect x="372" y="212" width="164" height="184" rx="14" fill="#fff" stroke="#dde5f0" />
      <rect x="388" y="232" width="100" height="12" rx="6" fill="#163a6b" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="404" cy={268 + i * 30} r="14" fill="#e8f1fd" />
          <rect x="426" y={260 + i * 30} width="92" height="8" rx="4" fill="#51607a" />
          <rect x="426" y={272 + i * 30} width="60" height="6" rx="3" fill="#dde5f0" />
        </g>
      ))}
    </svg>
  );
}
