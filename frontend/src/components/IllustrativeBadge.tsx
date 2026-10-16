import "./IllustrativeBadge.css";

export default function IllustrativeBadge({ text = "Illustrative Demo Data" }: { text?: string }) {
  return (
    <span className="illustrative-badge">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-5M12 8h.01" strokeLinecap="round" />
      </svg>
      {text}
    </span>
  );
}
