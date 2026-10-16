import { useState } from "react";
import { INSTITUTION_TYPES } from "../data/educationFeatures";
import { COACHING_INSTITUTE_SAMPLE_METRICS, EDUCATION_SAMPLE_METRICS } from "../data/siteContent";
import IllustrativeBadge from "./IllustrativeBadge";
import "./InstitutionTypeSelector.css";

export default function InstitutionTypeSelector() {
  const [selected, setSelected] = useState(INSTITUTION_TYPES[0].id);
  const active = INSTITUTION_TYPES.find((t) => t.id === selected) ?? INSTITUTION_TYPES[0];

  // Coaching/tuition profiles show the coaching sample metrics; others show the general education sample metrics.
  const metrics = ["coaching", "tuition", "home-tuition"].includes(active.id)
    ? COACHING_INSTITUTE_SAMPLE_METRICS
    : EDUCATION_SAMPLE_METRICS;

  return (
    <div className="institution-selector">
      <div className="institution-selector-chips" role="tablist" aria-label="Institution type">
        {INSTITUTION_TYPES.map((type) => (
          <button
            key={type.id}
            role="tab"
            aria-selected={type.id === selected}
            className={`institution-chip ${type.id === selected ? "is-active" : ""}`}
            onClick={() => setSelected(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="institution-detail">
        <p className="text-muted">{active.description}</p>
        <div className="institution-metrics">
          <IllustrativeBadge />
          <div className="institution-metrics-grid">
            {metrics.map((m) => (
              <div className="institution-metric" key={m.label}>
                <span className="institution-metric-value">{m.value}</span>
                <span className="institution-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
