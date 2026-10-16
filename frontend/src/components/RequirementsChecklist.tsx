import { useState } from "react";
import { Link } from "react-router-dom";
import { EDUCATION_CAPABILITIES, SOCIETY_CAPABILITIES } from "../data/requirementsCapabilities";
import "./RequirementsChecklist.css";

type Product = "society" | "education";

export default function RequirementsChecklist() {
  const [product, setProduct] = useState<Product>("society");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const capabilities = product === "society" ? SOCIETY_CAPABILITIES : EDUCATION_CAPABILITIES;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const switchProduct = (next: Product) => {
    setProduct(next);
    setSelected(new Set());
  };

  const selectedLabels = capabilities.filter((c) => selected.has(c.id)).map((c) => c.label);
  const summaryNote =
    selectedLabels.length > 0
      ? `Capabilities I'm interested in: ${selectedLabels.join(", ")}.`
      : "";

  return (
    <div className="req-checklist">
      <div className="req-checklist-toggle" role="tablist" aria-label="Choose product">
        <button
          role="tab"
          aria-selected={product === "society"}
          className={`req-checklist-toggle-btn ${product === "society" ? "is-active" : ""}`}
          onClick={() => switchProduct("society")}
        >
          Society Management
        </button>
        <button
          role="tab"
          aria-selected={product === "education"}
          className={`req-checklist-toggle-btn ${product === "education" ? "is-active" : ""}`}
          onClick={() => switchProduct("education")}
        >
          Education Management
        </button>
      </div>

      <div className="req-checklist-grid">
        {capabilities.map((capability) => {
          const checked = selected.has(capability.id);
          return (
            <label key={capability.id} className={`req-checklist-item ${checked ? "is-checked" : ""}`}>
              <input type="checkbox" checked={checked} onChange={() => toggle(capability.id)} />
              <span>{capability.label}</span>
            </label>
          );
        })}
      </div>

      <div className="req-checklist-summary">
        <h4>Your Selected Requirements</h4>
        {selectedLabels.length === 0 ? (
          <p className="req-checklist-empty">Select the capabilities relevant to your organization above.</p>
        ) : (
          <ul>
            {selectedLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        )}
      </div>

      <Link
        to={`/contact?product=${product}&demo=true${summaryNote ? `&note=${encodeURIComponent(summaryNote)}` : ""}`}
        className="btn btn-primary btn-block"
        aria-disabled={selectedLabels.length === 0}
        onClick={(e) => {
          if (selectedLabels.length === 0) e.preventDefault();
        }}
        style={selectedLabels.length === 0 ? { opacity: 0.6, pointerEvents: "none" } : undefined}
      >
        Submit This Summary With an Enquiry
      </Link>
    </div>
  );
}
