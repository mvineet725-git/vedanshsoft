import { useState } from "react";
import Icon from "./Icon";
import "./BeforeAfterComparison.css";

const MANUAL_POINTS = [
  "Paper registers and physical files",
  "Spreadsheet-based records scattered across devices",
  "Manual follow-ups for payments and requests",
  "Information scattered across people and formats",
  "Time-consuming, manually compiled reports",
];

const SOFTWARE_POINTS = [
  "Centralized digital records in one system",
  "Easier information retrieval when you need it",
  "Structured tracking of follow-ups and requests",
  "Organized, role-based administrative workflows",
  "More accessible, ready-to-view reports",
];

export default function BeforeAfterComparison() {
  const [tab, setTab] = useState<"manual" | "software">("manual");

  return (
    <div className="comparison">
      <div className="comparison-toggle" role="tablist" aria-label="Process comparison">
        <button
          role="tab"
          aria-selected={tab === "manual"}
          className={`comparison-toggle-btn ${tab === "manual" ? "is-active manual" : ""}`}
          onClick={() => setTab("manual")}
        >
          Traditional Manual Process
        </button>
        <button
          role="tab"
          aria-selected={tab === "software"}
          className={`comparison-toggle-btn ${tab === "software" ? "is-active software" : ""}`}
          onClick={() => setTab("software")}
        >
          Software-Assisted Process
        </button>
      </div>

      <div className="comparison-panel" role="tabpanel">
        <ul className="comparison-list">
          {(tab === "manual" ? MANUAL_POINTS : SOFTWARE_POINTS).map((point) => (
            <li key={point} className={tab === "manual" ? "tone-manual" : "tone-software"}>
              <Icon name={tab === "manual" ? "clock" : "check"} size={18} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="comparison-note text-muted">
          This comparison describes typical qualitative differences organizations may experience.
          It is not a guarantee of specific time savings, cost reductions, or performance outcomes.
        </p>
      </div>
    </div>
  );
}
