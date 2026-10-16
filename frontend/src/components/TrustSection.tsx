import { Link } from "react-router-dom";
import Icon from "./Icon";
import { VERIFIED_METRICS } from "../data/siteContent";
import "./TrustSection.css";

const VALUE_PILLARS = [
  { icon: "layers" as const, text: "Built around real society and institution workflows" },
  { icon: "shield" as const, text: "Role-based access for every user type" },
  { icon: "mobile" as const, text: "Works on desktop, tablet, and mobile" },
  { icon: "check" as const, text: "Direct support during implementation" },
];

export default function TrustSection() {
  if (VERIFIED_METRICS.length > 0) {
    return (
      <div className="trust-section">
        <div className="trust-metrics-grid">
          {VERIFIED_METRICS.map((m) => (
            <div className="trust-metric" key={m.label}>
              <span className="trust-metric-value">{m.value}</span>
              <span className="trust-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="trust-section">
      <p className="trust-tagline">Designed for growing communities and institutions across India</p>
      <div className="trust-pillars">
        {VALUE_PILLARS.map((p) => (
          <div className="trust-pillar" key={p.text}>
            <Icon name={p.icon} size={22} />
            <span>{p.text}</span>
          </div>
        ))}
      </div>
      <Link to="/demo/society" className="btn btn-ghost btn-sm">
        Explore an interactive product demo &rarr;
      </Link>
    </div>
  );
}
