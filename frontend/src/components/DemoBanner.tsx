import "./DemoBanner.css";

export default function DemoBanner() {
  return (
    <div className="demo-banner" role="status">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-5M12 8h.01" strokeLinecap="round" />
      </svg>
      <span>
        <strong>Demo Environment — Fictional Data.</strong> All names, records, and figures shown here
        are illustrative examples for exploration only. No real customer data is used or displayed,
        and no changes you make here affect any real system.
      </span>
    </div>
  );
}
