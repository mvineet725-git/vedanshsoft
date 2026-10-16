import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardMockup from "./DashboardMockup";
import IllustrativeBadge from "./IllustrativeBadge";
import { SOCIETY_SAMPLE_METRICS, EDUCATION_SAMPLE_METRICS } from "../data/siteContent";
import "./InteractiveHeroDemo.css";

type Tab = "society" | "education";

export default function InteractiveHeroDemo() {
  const [tab, setTab] = useState<Tab>("society");
  const metrics = tab === "society" ? SOCIETY_SAMPLE_METRICS : EDUCATION_SAMPLE_METRICS;

  return (
    <div className="hero-demo">
      <div className="hero-demo-tabs" role="tablist" aria-label="Product preview">
        <button
          role="tab"
          aria-selected={tab === "society"}
          className={`hero-demo-tab ${tab === "society" ? "is-active" : ""}`}
          onClick={() => setTab("society")}
        >
          Society Management
        </button>
        <button
          role="tab"
          aria-selected={tab === "education"}
          className={`hero-demo-tab ${tab === "education" ? "is-active" : ""}`}
          onClick={() => setTab("education")}
        >
          Education Management
        </button>
      </div>

      <div className="hero-demo-panel" role="tabpanel">
        <div className="hero-demo-visual">
          <DashboardMockup />
        </div>

        <div className="hero-demo-metrics">
          <IllustrativeBadge text="Interactive Demo — Sample Data" />
          <div className="hero-demo-metric-grid">
            {metrics.map((m) => (
              <div className="hero-demo-metric" key={m.label}>
                <span className="hero-demo-metric-value">{m.value}</span>
                <span className="hero-demo-metric-label">{m.label}</span>
                {m.progress !== undefined && (
                  <div className="hero-demo-progress">
                    <div className="hero-demo-progress-fill" style={{ width: `${m.progress}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link
            to={tab === "society" ? "/demo/society" : "/demo/education"}
            className="btn btn-ghost btn-sm hero-demo-cta"
          >
            Explore Full Interactive Demo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
